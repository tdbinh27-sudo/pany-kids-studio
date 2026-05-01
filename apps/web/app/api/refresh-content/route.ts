// Monthly content refresh endpoint.
// Triggered by Vercel Cron (configured in vercel.json) on the 1st of each month at 03:00 UTC.
//
// What it does:
// 1. Loads current curated.ts resources (passed via static import)
// 2. Asks Claude to suggest 3-5 NEW resources per pillar based on what's missing
// 3. Returns suggestions as JSON for review (does NOT auto-merge — bố reviews + commits)
//
// Why review-then-merge instead of auto-update:
// - Education content needs human curation (avoid AI-hallucinated bad sources)
// - Keeps repo audit trail clean
// - Bố can re-prompt Claude if suggestions are weak
//
// To run manually: GET /api/refresh-content?secret=<CRON_SECRET>
// Vercel Cron sends Bearer token automatically.

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { CURATED_RESOURCES } from "@/lib/curated";

const PILLARS = ['tech', 'english', 'finance', 'thinking', 'business', 'life'] as const;

const SYSTEM_PROMPT = `You are a curator for an open-source educational dashboard for kids 6-16 in Vietnam.

Your job: suggest 3-5 NEW educational resources for each pillar that are NOT already in the curated list. Quality > quantity.

Hard rules:
- ONLY suggest resources you are 95%+ confident exist (real URL, real source).
- Prefer: free, no-signup, kid-safe, COPPA-compliant.
- Mix sources: not all from one platform.
- Vietnamese-friendly when possible (VN subs, VN platforms, VN cases).
- Each resource must have measurable value: course, video series, tool, dataset, book, channel.
- Avoid: paid SaaS, sketchy "kids hacks" sites, anything ad-heavy.

Output format: JSON array of objects with fields:
{ "id": "kebab-case", "title_vi": "...", "title_en": "...", "source": "...", "url": "...",
  "type": "video|article|tool|game|book|course|channel",
  "pillar": "tech|english|finance|thinking|business|life",
  "age_min": 6-16, "age_max": 6-16,
  "duration_min": (optional, integer minutes),
  "why_vi": "1-2 sentences why this matters",
  "why_en": "1-2 sentences why this matters",
  "prompt_vi": (optional reflection prompt for thinking/business),
  "prompt_en": (optional reflection prompt) }
`;

export async function GET(req: NextRequest) {
  // Auth: Vercel Cron sends Bearer token
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  const queryToken = req.nextUrl.searchParams.get('secret');

  if (cronSecret) {
    const ok =
      authHeader === `Bearer ${cronSecret}` ||
      queryToken === cronSecret;
    if (!ok) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'missing_api_key' }, { status: 500 });
  }

  const client = new Anthropic({ apiKey });

  const existing = CURATED_RESOURCES.map(r => `- ${r.pillar}: ${r.title_en} (${r.source})`).join('\n');

  const userMessage = `Current curated list (${CURATED_RESOURCES.length} resources):
${existing}

Suggest 3-5 NEW resources per pillar (${PILLARS.join(', ')}) that complement (not duplicate) the existing list.

Return ONLY a JSON array. No prose, no markdown code fences.`;

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    });

    const firstBlock = response.content[0];
    const raw = firstBlock && firstBlock.type === 'text' ? firstBlock.text : '';

    // Strip code fences if Claude added them
    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

    let suggestions;
    try {
      suggestions = JSON.parse(cleaned);
    } catch {
      return NextResponse.json({
        error: 'parse_failed',
        raw: raw.slice(0, 500),
      }, { status: 502 });
    }

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      existingCount: CURATED_RESOURCES.length,
      suggestionsCount: Array.isArray(suggestions) ? suggestions.length : 0,
      suggestions,
      mergeInstructions: {
        vi: 'Bố review + thêm vào lib/curated.ts → commit + push → auto-deploy',
        en: 'Parent reviews + adds to lib/curated.ts → commit + push → auto-deploy',
      },
    });
  } catch (e) {
    const errMsg = e instanceof Error ? e.message : 'unknown';
    console.error('[/api/refresh-content] error:', errMsg);
    return NextResponse.json({ error: 'claude_error', detail: errMsg }, { status: 502 });
  }
}
