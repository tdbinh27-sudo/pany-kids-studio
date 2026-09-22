/**
 * @file app/api/family/progress/route.ts
 * @description D-046 (2026-09-22) — syncs a kid's local progress snapshot to
 *              Supabase `family_progress` (already existed in schema since
 *              2026-05-14 migration, never wired into the running app until
 *              now) and recomputes the distilled `family_kids.learning_summary`
 *              used to personalize the Đại Ka/Cô Pany chatbot in /api/chat.
 *
 *              Called by PanyKidsStudio.tsx's persist() wrapper — fire-and-
 *              forget, best-effort, never blocks the UI. Client still keeps
 *              localStorage as the fast local cache; this is the durable copy.
 *
 *              Rule-based summary (no LLM call — cost control): counts
 *              completed items across the 4 track-progress-shaped keys and
 *              keeps the 5 most recent as "recent_topics".
 */
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { KidLearningSummary } from "@/lib/claude";

const TRACK_PROGRESS_KEYS = ["spaceProgress", "gamedevProgress", "fashionProgress", "stemProgress"] as const;

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function POST(req: NextRequest) {
  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ ok: false, error: "supabase_unavailable" }, { status: 503 });
  }

  let body: { kidId?: string; key?: string; value?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const { kidId, key, value } = body;
  if (!kidId || !key) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  // Resolve family_id server-side — never trust a client-supplied value.
  const { data: kidRow, error: kidErr } = await admin
    .from("family_kids")
    .select("family_id")
    .eq("id", kidId)
    .maybeSingle();
  if (kidErr || !kidRow) {
    return NextResponse.json({ ok: false, error: "kid_not_found" }, { status: 404 });
  }
  const familyId = kidRow.family_id as string;
  const date = todayISO();

  // Carry forward the latest known snapshot so today's row still has
  // yesterday's other keys — each incoming `value` is itself the FULL
  // cumulative map for that key (that's how PanyKidsStudio.tsx state works),
  // so merging just needs the other keys, not a deep merge of this one.
  const { data: latestRow } = await admin
    .from("family_progress")
    .select("data")
    .eq("family_id", familyId)
    .eq("kid_id", kidId)
    .order("date", { ascending: false })
    .limit(1)
    .maybeSingle();

  const mergedData: Record<string, unknown> = { ...(latestRow?.data as Record<string, unknown> | undefined ?? {}), [key]: value };

  const { error: upsertErr } = await admin
    .from("family_progress")
    .upsert({ family_id: familyId, kid_id: kidId, date, data: mergedData }, { onConflict: "family_id,kid_id,date" });
  if (upsertErr) {
    console.error("[/api/family/progress] upsert failed:", upsertErr.message);
    return NextResponse.json({ ok: false, error: "upsert_failed" }, { status: 500 });
  }

  // Rule-based distillation → family_kids.learning_summary.
  const items: { itemId: string; track: string; date: string }[] = [];
  for (const trackKey of TRACK_PROGRESS_KEYS) {
    const perKid = mergedData[trackKey] as Record<string, Record<string, string>> | undefined;
    const kidMap = perKid?.[kidId];
    if (!kidMap) continue;
    for (const [itemId, isoDate] of Object.entries(kidMap)) {
      if (typeof isoDate === "string") items.push({ itemId, track: trackKey.replace("Progress", ""), date: isoDate });
    }
  }
  items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  const summary: KidLearningSummary = {
    total_completed: items.length,
    recent_topics: items.slice(0, 5).map((i) => `${i.track}:${i.itemId}`),
    last_active_date: date,
    updated_at: new Date().toISOString(),
  };

  const { error: summaryErr } = await admin.from("family_kids").update({ learning_summary: summary }).eq("id", kidId);
  if (summaryErr) {
    console.error("[/api/family/progress] learning_summary update failed:", summaryErr.message);
  }

  return NextResponse.json({ ok: true, summary });
}
