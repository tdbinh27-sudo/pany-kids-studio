// English writing grader — Đại Ka voice + structured JSON output
// Used by EnglishSkillsTab Write mode. Rate-limited per kid.

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { SONNET_MODEL } from "@/lib/claude";

// Same rate limit pattern as /api/chat (100 grades/hour/kid is generous)
const RATE_LIMIT = 30; // grades — slower than chat since each is heavier
const WINDOW_MS = 60 * 60 * 1000;
const buckets = new Map<string, number[]>();

function rateLimited(kidId: string): boolean {
  const now = Date.now();
  const arr = (buckets.get(kidId) ?? []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= RATE_LIMIT) return true;
  arr.push(now);
  buckets.set(kidId, arr);
  return false;
}

const SYSTEM_PROMPT_VI = `Bạn là Đại Ka — đại diện AI của bố Bình, đang chấm bài viết tiếng Anh của các con nhà Pany.

QUY TẮC CHẤM:
- Tone: ấm áp, khuyến khích, gọi "con" — không dùng "em" hoặc "bạn"
- Khen điểm tốt TRƯỚC (specific, không generic)
- Sửa lỗi NGẮN GỌN (max 3 lỗi quan trọng nhất)
- Đề xuất 1-2 câu cải thiện cụ thể
- Phản hồi BẰNG TIẾNG VIỆT (cha mẹ + kid VN đọc)
- Mức điểm: 0-100, hào phóng cho effort, khắt khe cho intentional sloppiness

OUTPUT BẮT BUỘC dưới dạng JSON thuần (không markdown fences):
{
  "score": <0-100>,
  "strengths": "<1-2 câu khen cụ thể bằng tiếng Việt>",
  "improvements": "<1-3 câu góp ý ngắn bằng tiếng Việt>",
  "corrected": "<phiên bản tiếng Anh được sửa, giữ ý của con>",
  "encouragement": "<1 câu động viên cuối bằng tiếng Việt>"
}`;

const SYSTEM_PROMPT_EN = `You are Đại Ka — Bố Bình's AI representative, grading the Pany kids' English writing.

GRADING RULES:
- Tone: warm, encouraging, call them "con" — never "em" or "bạn"
- Praise specific strengths FIRST (not generic)
- Correct ONLY top 3 most important mistakes (don't overwhelm)
- Suggest 1-2 concrete improvements
- Reply in ENGLISH (kid is practicing English)
- Score: 0-100, generous for effort, strict for intentional sloppiness

OUTPUT MUST be raw JSON (no markdown fences):
{
  "score": <0-100>,
  "strengths": "<1-2 specific praise sentences>",
  "improvements": "<1-3 short improvement notes>",
  "corrected": "<corrected English version, keeping kid's intent>",
  "encouragement": "<final encouragement sentence>"
}`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "missing_api_key", reply: "API key chưa được cài. Bố ơi giúp với! 🙏" },
      { status: 500 }
    );
  }

  let body: {
    text?: string;
    prompt?: string;
    level?: "A1" | "A2" | "B1";
    kidName?: string;
    kidAge?: number;
    kidId?: string;
    lang?: "vi" | "en";
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { text, prompt, level = "A1", kidName, kidAge, kidId = "anon", lang = "vi" } = body;
  if (!text?.trim() || !prompt?.trim()) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  if (rateLimited(kidId)) {
    return NextResponse.json(
      {
        error: "rate_limited",
        reply:
          lang === "vi"
            ? "Con đã chấm nhiều bài rồi — nghỉ 1 tiếng nhé!"
            : "Lots of grading already — take an hour break, con!",
      },
      { status: 429 }
    );
  }

  if (text.length > 2000) {
    return NextResponse.json({ error: "text_too_long" }, { status: 400 });
  }

  try {
    const client = new Anthropic({ apiKey });

    const userMessage = `${kidName || "Con"} (${kidAge || "?"} tuổi, level ${level}) viết bài này:

PROMPT: ${prompt}

KID'S ANSWER:
${text}

Chấm theo format JSON. Đừng wrap trong markdown.`;

    const response = await client.messages.create({
      model: SONNET_MODEL,
      max_tokens: 600,
      system: lang === "vi" ? SYSTEM_PROMPT_VI : SYSTEM_PROMPT_EN,
      messages: [{ role: "user", content: userMessage }],
    });

    const firstBlock = response.content[0];
    const raw = firstBlock?.type === "text" ? firstBlock.text : "";

    // Try to parse JSON, gracefully handle if Claude wrapped in markdown anyway
    let parsed: any = null;
    try {
      const jsonStr = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      // Fallback — return raw text in encouragement field
      parsed = {
        score: 50,
        strengths: lang === "vi" ? "Con đã viết hoàn thành — tốt lắm!" : "You finished writing — well done!",
        improvements: lang === "vi" ? "Đại Ka chưa parse được output, nhưng bài con OK." : "Couldn't parse output, but your work is fine.",
        corrected: text,
        encouragement: raw.slice(0, 200),
      };
    }

    return NextResponse.json({
      ...parsed,
      model: SONNET_MODEL,
      level,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: "grading_failed", message: e?.message || "unknown" },
      { status: 500 }
    );
  }
}
