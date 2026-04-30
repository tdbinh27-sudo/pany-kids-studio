# Pany Kids Studio — Implementation Plan

## Architecture

```
pany-kids-studio/
├── apps/web/                  # Next.js 16 app
│   ├── app/
│   │   ├── page.tsx           # Single-page dashboard
│   │   ├── api/chat/route.ts  # Anthropic API proxy
│   │   └── layout.tsx
│   ├── components/
│   │   ├── PanyKidsStudio.tsx # Main dashboard (from v3 JSX)
│   │   └── ChatBot.tsx        # Floating widget
│   ├── lib/
│   │   ├── storage.ts         # localStorage shim for window.storage
│   │   └── claude.ts          # Anthropic SDK wrapper
│   └── package.json
├── artifacts/                 # Source materials
│   └── PanyKidsStudio_Dashboard_v3.jsx
└── docs/                      # User guides
```

## Phases

### Phase 1: Local dev setup (target: 1 hour)
- [ ] Init Next.js 16 + TypeScript + Tailwind in apps/web
- [ ] Install lucide-react, @anthropic-ai/sdk
- [ ] Configure Google Fonts (Fredoka, Quicksand, Caveat)
- [ ] Convert PanyKidsStudio_Dashboard_v3.jsx → components/PanyKidsStudio.tsx
- [ ] Implement window.storage shim → localStorage in lib/storage.ts
- [ ] Run `pnpm dev` → verify dashboard renders + persists

### Phase 2: Vercel deploy (target: 30 min)
- [ ] Create GitHub repo `pany-kids-studio` (private)
- [ ] Push code
- [ ] Connect Vercel project
- [ ] Choose subdomain: `pany-kids-studio.vercel.app` (free) or new domain like `panykids.app`
- [ ] Deploy → verify live
- [ ] Set environment vars (CLAUDE_API_KEY placeholder)

### Phase 3: ChatBot integration (target: 2-3 hours)
See "Chatbot Specification" below.

### Phase 4: QA + iteration (target: 1 week of real usage)
- [ ] Each kid uses dashboard daily
- [ ] Bố observes pain points, broken interactions
- [ ] Iterate based on feedback
- [ ] Optional: Move to VPS if Vercel limits hit

---

## CHATBOT SPECIFICATION (anh input vào cuối project)

### Tên đề xuất (anh chọn 1)

| Option | Vibe | VN feel | EN feel |
|--------|------|---------|---------|
| **Pany-chan** ⭐ | Anime mascot, friendly | "Bạn Pany-chan" cute | Anime familiar |
| **Sensei Pany** | Wise mentor | "Thầy Pany" respect | Pop culture savvy |
| **Studio Bot** | Neutral, professional | "Bot Studio" ok | Plain |
| **Kido** | Short, modern | "Anh Kido" gần gũi | Memorable |
| **PKB (Pany Kid Buddy)** | Acronym, brand | "PKB" technical | Brand-able |
| **Mochi** 🍡 | Soft, cute, anime | "Bạn Mochi" yummy | Universal cute |

**Em recommend: `Pany-chan`** — match anime/funny visual, các bạn nhỏ dễ tương tác, vừa VN vừa EN đọc tự nhiên.

### Văn phong tương tác (Tone)

**Core principles:**
1. **Kid-friendly nhưng không trẻ con** — không "baby talk", coi các bạn như người trẻ thông minh
2. **Khích lệ thay vì phán xét** — sai → "thử lại nhé!" thay vì "sai rồi"
3. **Hỏi ngược thay vì cho đáp án** — Socratic method, gợi ý thay vì giải sẵn
4. **Bilingual seamless** — kid hỏi VN trả VN, hỏi EN trả EN, hỗn hợp cũng OK
5. **Emoji có chừng mực** — 1-2 per message, không spam
6. **Ngắn gọn** — mặc định < 80 từ, expand khi kid yêu cầu

**Sample:**
```
Kid: "Em không hiểu loop trong Scratch là gì"
Pany-chan: "Loop = lặp lại! 🔁
Em đã từng đếm cừu nhảy qua hàng rào lúc đi ngủ chưa? Đếm 1, 2, 3... mãi mãi cho đến khi ngủ — đó là 'forever loop'.
Trong Scratch em thử kéo block 'repeat 10' xem điều gì xảy ra nhé!"
```

**Anti-patterns (cấm):**
- "Không, sai rồi"
- Trả lời homework bằng đáp án sẵn ("3 + 5 = 8")
- "Là người lớn em có thể..." (giảng đạo)
- Quá dài (> 200 từ trừ khi kid hỏi giải thích chi tiết)

### AI Model Selection

| Model | Cost (1M tokens) | Best for | Recommend |
|-------|------------------|----------|-----------|
| **Claude Haiku 4.5** | $1 input / $5 output | Default chat, quick Q&A | ⭐ Default |
| **Claude Sonnet 4.6** | $3 input / $15 output | Complex reasoning, code review | Fallback for hard questions |
| **Claude Opus 4.7** | $15 input / $75 output | Rarely needed | NO — too expensive |

**Strategy:** Haiku 4.5 cho 95% conversations, route to Sonnet 4.6 chỉ khi:
- Kid asks for code review/debug
- Kid asks for essay feedback (>200 words context)
- Kid explicitly requests "more detailed" follow-up

**Cost estimate:** 50 chats/week × 3 kids × ~500 tokens avg × Haiku = **~$5/tháng**. Bố trả qua Anthropic Console (anh đã có account).

### Use Cases (chatbot làm gì)

1. **Homework help** — Socratic, không cho đáp án sẵn
2. **Quiz generator** — "Tạo 3 câu hỏi Python cho An" → outputs ngay vào Quiz tab
3. **Journal prompts** — "Hôm nay em không biết viết gì" → gợi ý 3 prompts
4. **Career advice** — "Em thích vẽ và code, làm nghề gì?" → suggest từ CAREER_PATHS
5. **Vocabulary helper** — VN word → EN word + example sentence
6. **Encouragement** — kid stuck/frustrated → empathy + small win suggestion
7. **Bố mode** — bố type `/parent` → switches to advisor tone, gives data insights

### Safety Filters

**System prompt sẽ include:**
```
You are Pany-chan, a friendly AI mentor for kids 8-12 in the Pany family.
HARD RULES:
- Never provide direct answers to math/coding homework. Use Socratic questions.
- Never discuss: violence, romance, politics, religion, drugs, gambling.
- Never recommend the kid leave the family or contact strangers.
- If the kid mentions self-harm or abuse, respond with: "Mình lo cho em.
  Em hãy nói với bố/mẹ ngay nhé." then STOP.
- Default language matches the kid's last message (Vietnamese or English).
- Maximum 80 words per response unless asked for detail.
- Use 1-2 emojis maximum per message.
```

**Client-side filters:**
- Pre-send: scan for inappropriate keywords (block before API call)
- Post-receive: scan response, redact if any safety flag triggers
- Rate limit: 30 messages/hour per kid (prevent overuse)

### Integration Points

**Chat widget UI:**
- Position: floating bottom-right, 60×60px button → expands to 380×600px panel
- Auto-detect lang: match `lang` state in dashboard
- Persistence: messages saved to `pks3-chat-{kidId}` localStorage
- Avatar: Pany-chan emoji 🌸 floating animation

**Context injection:**
Mỗi message gửi đến API kèm context:
```
[CONTEXT: kid=An age=10 lang=vi current_tab=quiz progress=45% pillar_focus=tech recent_streak=7]
[USER MESSAGE]: ...
```

**Tool calls** (Anthropic tool use):
- `unlock_badge(kidId, badgeId)` — bot có thể trao badge tinh thần
- `add_journal_prompt(kidId, prompt)` — bot suggest journal entry
- `generate_quiz(pillar, age, count)` — bot tạo quiz on-demand
- `update_streak(kidId)` — bot encourage check-in

---

## Open Questions (anh trả lời để em decide)

1. **Subdomain choice**: `pany-kids-studio.vercel.app` (free) hay mua domain mới như `panykids.io`?
2. **Repo visibility**: Public (open-source cho cộng đồng) hay private?
3. **Chatbot tên**: Pany-chan / Sensei Pany / Mochi / khác?
4. **API key timing**: Anh setup Anthropic key ngay trước khi build chatbot, hay deploy dashboard trước rồi add chatbot sau?
5. **VPS necessary?**: Vercel free tier ~100GB bandwidth/tháng — đủ cho 3 kids. VPS chỉ cần khi bandwidth vượt hoặc muốn add features cần backend lâu dài.
