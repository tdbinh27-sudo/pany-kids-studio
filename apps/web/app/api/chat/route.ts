import { NextRequest, NextResponse } from "next/server";
import { chat, ChatContext, ChatTurn } from "@/lib/claude";

// In-memory rate limiter (per kidId): 30 messages / hour.
const RATE_LIMIT = 30;
const WINDOW_MS = 60 * 60 * 1000;
const buckets = new Map<string, number[]>();

function rateLimited(kidId: string): boolean {
  const now = Date.now();
  const arr = (buckets.get(kidId) ?? []).filter(t => now - t < WINDOW_MS);
  if (arr.length >= RATE_LIMIT) return true;
  arr.push(now);
  buckets.set(kidId, arr);
  return false;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "missing_api_key",
        reply:
          "Đại Ka chưa được cài API key. Bố ơi, vào Vercel env vars set ANTHROPIC_API_KEY giúp con với! 🙏",
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

  const kidId = ctx.kidId ?? "anonymous";
  if (rateLimited(kidId)) {
    return NextResponse.json(
      {
        reply:
          ctx.lang === "vi"
            ? "Em chat hơi nhiều rồi đó! Đại Ka cần nghỉ một xíu. Quay lại sau 1 tiếng nhé. 😴"
            : "You've been chatting a lot! Đại Ka needs a break. Come back in an hour. 😴",
        rateLimited: true,
      },
      { status: 429 }
    );
  }

  try {
    const result = await chat({
      apiKey,
      ctx,
      history,
      userMessage: message.trim(),
    });
    return NextResponse.json(result);
  } catch (e) {
    const errMsg = e instanceof Error ? e.message : "unknown_error";
    console.error("[/api/chat] error:", errMsg);
    return NextResponse.json(
      {
        error: "claude_error",
        reply:
          ctx.lang === "vi"
            ? "Đại Ka đang gặp trục trặc kỹ thuật. Em thử lại sau ít phút nhé!"
            : "Đại Ka has a technical hiccup. Try again in a few minutes!",
      },
      { status: 502 }
    );
  }
}
