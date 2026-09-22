/**
 * @file app/api/chat/route.ts
 * @description Cô Pany / Đại Ka chat endpoint with daily rate limit.
 *
 * @rate-limit (D-034, 2026-05-15)
 *   - 20 messages/day PER FAMILY (sliding 24h window)
 *   - Default bucket = "default-family" (covers anh's solo 3-con setup pre-multitenancy)
 *   - Each family gets 20/day shared across all kids in that family
 *   - When exceeded → 429 + upgrade CTA (Zalo + brief explanation)
 *
 *   Pre-D-034 limit was 100/hour PER KID (~$15/mo cap). With 5 kids that meant
 *   500 msg/hour theoretical max — unsustainable for free standard tier.
 *   D-033 (free long-term) requires conservative quotas to keep Anthropic cost
 *   under control while still being useful for daily guidance (20/day = ~2-4
 *   meaningful conversations covering most onboarding/guidance use cases).
 *
 *   In-memory bucket = process-local. Acceptable for skeleton phase (low traffic).
 *   When traffic justifies, swap to Supabase `family_chat_quota` table for
 *   cross-instance persistence + per-day reset at VN midnight (Block 2 wire).
 */
import { NextRequest, NextResponse } from "next/server";
import { chat, ChatContext, ChatTurn } from "@/lib/claude";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

/**
 * D-046 (2026-09-22) — "AI gia sư riêng cho từng bé". Loads the kid's stored
 * profile + distilled learning_summary from Supabase and merges it into ctx
 * server-side (client never supplies bio/goals directly — can't be edited via
 * localStorage). Fails open: any Supabase/env issue → chat proceeds exactly as
 * before this feature existed, just without personalization for that turn.
 */
async function enrichWithKidMemory(ctx: ChatContext): Promise<{ ctx: ChatContext; familyId: string | null }> {
  if (!ctx.kidId) return { ctx, familyId: null };
  const admin = getSupabaseAdmin();
  if (!admin) return { ctx, familyId: null };
  try {
    const { data, error } = await admin
      .from("family_kids")
      .select("family_id, hobbies, goals, favorite_subject, bio, learning_summary")
      .eq("id", ctx.kidId)
      .maybeSingle();
    if (error || !data) return { ctx, familyId: null };
    return {
      ctx: {
        ...ctx,
        kidHobbies: data.hobbies ?? undefined,
        kidGoals: data.goals ?? undefined,
        kidFavoriteSubject: data.favorite_subject ?? undefined,
        kidBio: data.bio ?? undefined,
        learningSummary: data.learning_summary ?? undefined,
      },
      familyId: data.family_id ?? null,
    };
  } catch {
    return { ctx, familyId: null };
  }
}

/** Fire-and-forget chat log — never blocks or fails the user-facing reply. */
function logChatTurns(opts: {
  familyId: string | null;
  kidId?: string;
  model: string;
  userMessage: string;
  reply: string;
}) {
  if (!opts.familyId) return; // no family resolved (solo/legacy ctx) — skip, nothing to scope rows to
  const admin = getSupabaseAdmin();
  if (!admin) return;
  admin
    .from("family_chat_history")
    .insert([
      { family_id: opts.familyId, kid_id: opts.kidId ?? null, role: "user", content: opts.userMessage },
      { family_id: opts.familyId, kid_id: opts.kidId ?? null, role: "assistant", content: opts.reply, model: opts.model },
    ])
    .then(({ error }) => {
      if (error) console.error("[/api/chat] chat_history insert failed:", error.message);
    });
}

// D-034: 20 messages/day per family (sliding 24h)
const DAILY_LIMIT = 20;
const WINDOW_MS = 24 * 60 * 60 * 1000;
const buckets = new Map<string, number[]>();

function rateLimitCheck(familyKey: string): {
  limited: boolean;
  used: number;
  remaining: number;
  resetInMs: number;
} {
  const now = Date.now();
  const arr = (buckets.get(familyKey) ?? []).filter(t => now - t < WINDOW_MS);
  const used = arr.length;
  const remaining = Math.max(0, DAILY_LIMIT - used);

  if (used >= DAILY_LIMIT) {
    const oldest = arr[0] ?? now;
    return { limited: true, used, remaining, resetInMs: WINDOW_MS - (now - oldest) };
  }

  arr.push(now);
  buckets.set(familyKey, arr);
  return { limited: false, used: used + 1, remaining: remaining - 1, resetInMs: WINDOW_MS };
}

function formatResetWindow(ms: number, lang: "vi" | "en"): string {
  const hours = Math.ceil(ms / (60 * 60 * 1000));
  if (lang === "vi") {
    return hours <= 1 ? "khoảng 1 tiếng nữa" : `khoảng ${hours} tiếng nữa`;
  }
  return hours <= 1 ? "in ~1 hour" : `in ~${hours} hours`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "missing_api_key",
        reply:
          "Cô Pany chưa được cài API key. Bố ơi, vào Vercel env vars set ANTHROPIC_API_KEY giúp con với! 🙏",
      },
      { status: 500 }
    );
  }

  let body: {
    ctx?: ChatContext;
    history?: ChatTurn[];
    message?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { ctx, history = [], message } = body;
  if (!ctx || !message?.trim()) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  // D-034 rate limit — keyed by familyId (multi-tenant) or fallback "default-family" (solo)
  const familyKey = ctx.familyId?.trim() || "default-family";
  const quota = rateLimitCheck(familyKey);

  if (quota.limited) {
    const resetText = formatResetWindow(quota.resetInMs, ctx.lang ?? "vi");
    const botLabel = ctx.botName ?? "Cô Pany";
    const replyVi = [
      `Gia đình mình đã dùng hết ${DAILY_LIMIT} lượt chat ${botLabel} cho hôm nay rồi! 😊`,
      ``,
      `🕒 Reset ${resetText}.`,
      ``,
      `💡 Trong lúc chờ, các con có thể:`,
      `• Làm Quest hôm nay (tab Tổng quan)`,
      `• Làm Math Quiz (tab Toán) — 1060 câu chờ con`,
      `• Đọc Bilingual Stories (tab Thư viện) — 50 truyện song ngữ Việt-Anh`,
      `• Khám phá 60 nghề (tab La bàn nghề)`,
      ``,
      `🌟 Cần gia sư AI riêng cho từng con + chat không giới hạn?`,
      `Nhắn Zalo PANY: 0983 179 109 để nâng cấp gói cá nhân hóa.`,
    ].join("\n");

    const replyEn = [
      `Your family has used all ${DAILY_LIMIT} ${botLabel} chats for today! 😊`,
      ``,
      `🕒 Resets ${resetText}.`,
      ``,
      `💡 While you wait, kids can:`,
      `• Do today's Quest (Overview tab)`,
      `• Practice Math Quiz (Math tab) — 1060 questions waiting`,
      `• Read Bilingual Stories (Library tab) — 50 VN-EN stories`,
      `• Explore 60 careers (Career Compass tab)`,
      ``,
      `🌟 Need a dedicated AI tutor per kid + unlimited chat?`,
      `Zalo PANY: 0983 179 109 to upgrade.`,
    ].join("\n");

    return NextResponse.json(
      {
        reply: ctx.lang === "en" ? replyEn : replyVi,
        rateLimited: true,
        quota: {
          dailyLimit: DAILY_LIMIT,
          used: quota.used,
          remaining: 0,
          resetInMs: quota.resetInMs,
        },
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": String(DAILY_LIMIT),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(quota.resetInMs / 1000)),
        },
      }
    );
  }

  try {
    const { ctx: enrichedCtx, familyId } = await enrichWithKidMemory(ctx);
    const result = await chat({
      apiKey,
      ctx: enrichedCtx,
      history,
      userMessage: message.trim(),
    });

    logChatTurns({
      familyId,
      kidId: ctx.kidId,
      model: result.model,
      userMessage: message.trim(),
      reply: result.reply,
    });

    return NextResponse.json(
      {
        ...result,
        quota: {
          dailyLimit: DAILY_LIMIT,
          used: quota.used,
          remaining: quota.remaining,
        },
      },
      {
        headers: {
          "X-RateLimit-Limit": String(DAILY_LIMIT),
          "X-RateLimit-Remaining": String(quota.remaining),
        },
      }
    );
  } catch (e) {
    const errMsg = e instanceof Error ? e.message : "unknown_error";
    console.error("[/api/chat] error:", errMsg);
    return NextResponse.json(
      {
        error: "claude_error",
        reply:
          ctx.lang === "vi"
            ? "Cô Pany đang gặp trục trặc kỹ thuật. Con thử lại sau ít phút nhé!"
            : "Cô Pany has a technical hiccup. Try again in a few minutes, con!",
      },
      { status: 502 }
    );
  }
}
