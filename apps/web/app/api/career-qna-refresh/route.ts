// Career Q&A auto-refresh endpoint.
// Triggered by Vercel Cron every 3 days at 03:00 UTC.
//
// What it does:
// 1. Loads existing seed Q&A (lib/career-qna.ts)
// 2. Picks 1-2 underrepresented topics + ages
// 3. Asks Claude (Sonnet 4.6) to draft 1-2 NEW Q&A entries based on
//    real research/news/expert-verified sources
// 4. Returns suggestions as JSON — bố reviews and commits to repo
//
// Why review-then-commit (not auto-merge):
// - Source URL verification (no hallucinated experts)
// - Educational content needs human gate
// - Audit trail in git
//
// Manual run: GET /api/career-qna-refresh?secret=<CRON_SECRET>
// Vercel Cron sends Bearer token automatically.

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { SEED_QNA, getQnAStats } from '@/lib/career-qna';

const SYSTEM_PROMPT = `You are a curator for "Pany Kids Studio" — a family education dashboard in Vietnam for kids ages 4-15 (Như Ý 5, Bình An 9, Hạnh Phúc 11). Your job: draft NEW expert-verified Q&A entries on parenting + career guidance topics that are NOT already in the existing bank.

HARD RULES:
- ONLY cite real, named experts you are 95%+ confident about. No "Dr. Smith" placeholders.
- Each Q&A MUST include 1-2 real, working URLs (research papers, books, established VN/intl. publications).
- Prefer Vietnamese sources (VnExpress, Vinschool, VAS, MindX, HOCMAI, VOV, Tuổi Trẻ) + classic international research (Harvard, Stanford, UCLA, OECD, WEF, AAP).
- Quality > quantity. 1 great Q&A > 5 mediocre.
- Match age group: K (4-6), P (7-11), T (12-15), or 'all' (cross-age advice for parents).
- Mix topics: rotate across choosing-major, career-exploration, early-interests, parenting-style, riasec-self-discovery, major-to-career-pivot, resilience-failure, money-business-early, screen-time-tech, social-emotional, study-habits, family-communication.

OUTPUT FORMAT — strict JSON array of CareerQnA objects:
{
  "id": "q-<topic>-<n>",
  "topic": "<one of 12 topics>",
  "ageGroup": "K|P|T|all",
  "question_vi": "...", "question_en": "...",
  "answer_vi": "180-300 từ Vietnamese, có data/research cụ thể",
  "answer_en": "180-300 word English equivalent",
  "expert": { "name": "Real Name", "credentials": "Title, Institution", "affiliation": "Institution" },
  "sources": [
    { "title": "Real article title", "url": "https://real-url.com", "type": "article|research|book|interview|data-analysis|guideline", "publisher": "Real Publisher", "date": "YYYY-MM-DD optional" }
  ],
  "tags": ["<3-5 short tags>"],
  "added": "<today's ISO date>",
  "verified": true
}

Wrap in: { "suggestions": [...] }
NO markdown, NO commentary. Pure JSON.`;

export async function GET(req: NextRequest) {
  // Auth: cron secret OR Vercel cron Bearer
  const secret = req.nextUrl.searchParams.get('secret');
  const auth = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  const isVercelCron = auth === `Bearer ${cronSecret}`;
  const isManual = secret === cronSecret;
  if (!isVercelCron && !isManual) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'no api key' }, { status: 500 });
  }

  // Identify gaps — which topics or age groups are underrepresented?
  const stats = getQnAStats();
  const allTopics = [
    'choosing-major', 'career-exploration', 'early-interests', 'parenting-style',
    'riasec-self-discovery', 'major-to-career-pivot', 'resilience-failure',
    'money-business-early', 'screen-time-tech', 'social-emotional', 'study-habits', 'family-communication',
  ];
  const topicCounts: Record<string, number> = {};
  allTopics.forEach(t => { topicCounts[t] = (stats.byTopic as any)[t] || 0; });
  // Pick 2 topics with lowest count
  const underTopics = allTopics
    .sort((a, b) => topicCounts[a] - topicCounts[b])
    .slice(0, 2);

  // Existing question signatures for de-duplication
  const existingSignatures = SEED_QNA.map(q => `[${q.topic}/${q.ageGroup}] ${q.question_vi}`).join('\n');

  const userPrompt = `EXISTING ${SEED_QNA.length} Q&A (DO NOT DUPLICATE):
${existingSignatures}

UNDERREPRESENTED TOPICS (focus here): ${underTopics.join(', ')}
TODAY: ${new Date().toISOString().slice(0, 10)}

Draft 2 NEW Q&A entries across the 2 underrepresented topics — different ages and perspectives. Use the strict JSON format from system prompt.`;

  const client = new Anthropic({ apiKey });

  try {
    const resp = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const text = resp.content
      .filter(c => c.type === 'text')
      .map(c => (c as any).text)
      .join('');

    // Extract JSON object
    const jsonMatch = text.match(/\{[\s\S]*"suggestions"[\s\S]*\}/);
    let parsed: any = null;
    let parseError: string | null = null;
    if (jsonMatch) {
      try {
        parsed = JSON.parse(jsonMatch[0]);
      } catch (e: any) {
        parseError = e.message;
      }
    }

    return NextResponse.json({
      ok: true,
      runAt: new Date().toISOString(),
      stats: {
        existing: SEED_QNA.length,
        underTopics,
        verifiedRate: `${Math.round((stats.verified / stats.total) * 100)}%`,
      },
      suggestions: parsed?.suggestions || [],
      rawIfParseFailed: parseError ? text : undefined,
      parseError,
      reviewNote: 'Bố Bình: review the suggestions, verify URLs work, then commit chosen entries to lib/career-qna.ts SEED_QNA[].',
    });
  } catch (err: any) {
    return NextResponse.json({
      ok: false,
      error: err?.message || String(err),
    }, { status: 500 });
  }
}
