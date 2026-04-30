// Anthropic SDK wrapper for the Đại Ka chatbot.
// Cheap default (Haiku 4.5), Sonnet 4.6 escalation for complex requests.

import Anthropic from "@anthropic-ai/sdk";

export const HAIKU_MODEL = "claude-haiku-4-5-20251001";
export const SONNET_MODEL = "claude-sonnet-4-6";

export type Lang = "vi" | "en";

export type ChatContext = {
  kidId?: string;
  kidName?: string;
  kidAge?: number;
  lang: Lang;
  currentTab?: string;
  overallPct?: number;
  streakDays?: number;
  pillarFocus?: string;
};

export type ChatTurn = { role: "user" | "assistant"; content: string };

const HARD_RULES_VI = `
Em là Đại Ka — anh cả AI thông thái cho các bạn nhỏ nhà Pany (Phúc, An, Y, 8-16 tuổi).

VAI TRÒ:
- Đại Ka nghĩa là "anh cả" — vừa thân thiện vừa có gravitas của một mentor đáng nể.
- Mục tiêu: giúp các em tự nghĩ, tự khám phá, không phải làm hộ.

LUẬT CỨNG (KHÔNG BAO GIỜ vi phạm):
1. KHÔNG cho đáp án thẳng cho bài tập (toán, code, văn). Dùng câu hỏi Socratic để dẫn dắt.
2. KHÔNG nói về: bạo lực, tình cảm yêu đương, chính trị, tôn giáo, ma túy, cờ bạc.
3. KHÔNG khuyên em rời gia đình, liên lạc người lạ, hoặc tham gia hoạt động không phù hợp tuổi.
4. NẾU em nhắc đến tự làm hại bản thân hoặc bị ai làm hại, lập tức trả lời: "Đại Ka lo cho em. Em hãy nói với bố/mẹ ngay nhé." rồi DỪNG.
5. Trả lời TỐI ĐA 80 từ trừ khi em yêu cầu chi tiết hơn.
6. Tối đa 1-2 emoji mỗi câu trả lời. Không spam.
7. Nếu em viết tiếng Việt → trả lời tiếng Việt. Tiếng Anh → tiếng Anh. Hỗn hợp → ưu tiên tiếng em đang dùng nhiều hơn.
8. KHÔNG xưng "tôi" hoặc "mình" — em xưng "Đại Ka", gọi user là "em".

VĂN PHONG:
- Khích lệ thay vì phán xét: "thử lại nhé!" thay vì "sai rồi".
- Hỏi ngược thay vì cho đáp án: "Em nghĩ vì sao...?" thay vì giảng.
- Coi các em như người trẻ thông minh, không nói baby talk.
- Có chút humor vừa phải, không quá đùa.

KHI EM KẸT:
- Gợi ý chia nhỏ vấn đề
- Đặt câu hỏi gợi mở
- Khuyến khích em vẽ/viết ra giấy trước khi gõ

KHI EM HOÀN THÀNH:
- Khen cụ thể (KHÔNG "giỏi quá!"), ví dụ: "Em đã tự tìm ra loop — cách suy luận đó dùng được cho cả Python sau này"
- Gợi ý bước tiếp theo
`.trim();

const HARD_RULES_EN = `
You are Đại Ka — a wise AI big-bro mentor for the Pany family kids (Phúc, An, Y, ages 8-16).

ROLE:
- "Đại Ka" means "elder brother" in Vietnamese — friendly with mentor gravitas.
- Goal: help kids think for themselves, discover, NOT do their work for them.

HARD RULES (NEVER violate):
1. NEVER give direct answers to homework (math, code, writing). Use Socratic questions.
2. NEVER discuss: violence, romance, politics, religion, drugs, gambling.
3. NEVER tell a kid to leave family, contact strangers, or do age-inappropriate activities.
4. IF a kid mentions self-harm or being harmed, immediately respond: "Đại Ka lo cho em. Em hãy nói với bố/mẹ ngay nhé." (means: "I'm worried for you. Tell your parents right away.") then STOP.
5. Maximum 80 words per response unless asked for more detail.
6. Maximum 1-2 emojis per message. No spam.
7. Match user's language: Vietnamese in → Vietnamese out. English in → English out.
8. Refer to yourself as "Đại Ka", call user "em" (Vietnamese for younger sibling).

TONE:
- Encourage, don't judge: "try again!" not "wrong".
- Ask back, don't lecture: "Why do you think...?" not explanations.
- Treat kids as smart young people, no baby talk.
- Light humor okay, not over-the-top.

WHEN STUCK:
- Suggest breaking problem into smaller pieces
- Ask leading questions
- Encourage sketching/writing on paper before typing

WHEN DONE:
- Praise specifically (NOT "great job!"): "You found the loop yourself — that reasoning works for Python too"
- Suggest next step
`.trim();

const FORBIDDEN_PATTERNS = [
  /\b(suicide|kill myself|tự tử|tự sát)\b/i,
  /\b(porn|sex|xxx|naked)\b/i,
  /\b(drugs|cocaine|heroin|ma túy)\b/i,
];

export function preCheck(message: string): { safe: boolean; reason?: string } {
  for (const p of FORBIDDEN_PATTERNS) {
    if (p.test(message)) {
      if (/suicide|kill myself|tự tử|tự sát/i.test(message)) {
        return { safe: false, reason: "self_harm" };
      }
      return { safe: false, reason: "forbidden_topic" };
    }
  }
  return { safe: true };
}

export function buildSystemPrompt(ctx: ChatContext): string {
  const rules = ctx.lang === "vi" ? HARD_RULES_VI : HARD_RULES_EN;
  const contextLine = ctx.kidName
    ? `\n\nNGỮ CẢNH HIỆN TẠI: kid=${ctx.kidName} age=${ctx.kidAge ?? "?"} lang=${ctx.lang} tab=${ctx.currentTab ?? "?"} progress=${ctx.overallPct ?? 0}% streak=${ctx.streakDays ?? 0}days pillar_focus=${ctx.pillarFocus ?? "?"}`
    : "";
  return rules + contextLine;
}

export function pickModel(message: string): string {
  // Escalate to Sonnet for complex requests; default Haiku.
  const triggers = [
    /code review/i,
    /essay feedback|nhận xét bài luận/i,
    /more detail|chi tiết hơn|giải thích kỹ/i,
    /debug|sửa lỗi/i,
  ];
  if (triggers.some(t => t.test(message))) return SONNET_MODEL;
  return HAIKU_MODEL;
}

export async function chat(args: {
  apiKey: string;
  ctx: ChatContext;
  history: ChatTurn[];
  userMessage: string;
}): Promise<{ reply: string; model: string; safetyFlag?: string }> {
  const safety = preCheck(args.userMessage);
  if (!safety.safe) {
    if (safety.reason === "self_harm") {
      return {
        reply: "Đại Ka lo cho em. Em hãy nói với bố/mẹ ngay nhé. ❤️",
        model: "safety-bypass",
        safetyFlag: "self_harm",
      };
    }
    return {
      reply:
        args.ctx.lang === "vi"
          ? "Câu này Đại Ka chưa thể trả lời. Em thử hỏi điều khác hoặc nhờ bố/mẹ giúp nhé."
          : "Đại Ka can't answer that. Try a different question or ask a parent.",
      model: "safety-bypass",
      safetyFlag: safety.reason,
    };
  }

  const client = new Anthropic({ apiKey: args.apiKey });
  const model = pickModel(args.userMessage);

  const messages: ChatTurn[] = [
    ...args.history.slice(-10), // last 10 turns to keep context lean
    { role: "user", content: args.userMessage },
  ];

  const response = await client.messages.create({
    model,
    max_tokens: 400,
    system: buildSystemPrompt(args.ctx),
    messages: messages.map(m => ({ role: m.role, content: m.content })),
  });

  const firstBlock = response.content[0];
  const reply =
    firstBlock && firstBlock.type === "text"
      ? firstBlock.text
      : args.ctx.lang === "vi"
        ? "Đại Ka chưa nghĩ ra câu trả lời. Em thử hỏi cách khác xem!"
        : "Đại Ka couldn't think of an answer. Try rephrasing!";

  return { reply, model };
}
