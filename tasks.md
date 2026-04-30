# Pany Kids Studio — Tasks

## NOW
- [x] Anh approved 5 open questions ✅
- [ ] Phase 1A: Check environment (Node, pnpm, git, gh)
- [ ] Phase 1B: Init Next.js 16 + TS + Tailwind in apps/web
- [ ] Phase 1C: Install lucide-react + @anthropic-ai/sdk
- [ ] Phase 1D: Convert v3 JSX → TSX
- [ ] Phase 1E: Add localStorage shim
- [ ] Phase 1F: Add Google Fonts (Fredoka, Quicksand, Caveat)
- [ ] Phase 1G: Test dev server → verify all 22 tabs render

## NEXT (Phase 3 — Chatbot, in same sprint)
- [ ] Build `<ChatBot />` floating widget (bottom-right, 60→380×600)
- [ ] Build `/api/chat` route with Anthropic SDK
- [ ] System prompt for "Đại Ka" character + safety rules
- [ ] Context injection (kid, tab, progress, lang)
- [ ] Tool calls: unlock_badge, generate_quiz, add_journal_prompt
- [ ] Pre/post filters + rate limit 30/hour/kid
- [ ] Anh inputs ANTHROPIC_API_KEY → `.env.local`
- [ ] Test 5 sample conversations VN + EN

## NEXT (Phase 2 — Deploy)
- [ ] Init git + .gitignore (exclude .env.local)
- [ ] Create LICENSE (MIT) + README (bilingual)
- [ ] `gh repo create pany-kids-studio --public`
- [ ] Push initial commit
- [ ] Connect Vercel
- [ ] Setup ANTHROPIC_API_KEY in Vercel env vars
- [ ] Deploy → verify `pany-kids-studio.vercel.app`
- [ ] Share URL with các bạn

## BLOCKED
- [ ] Phase 4 (panykids.io domain) — when project completion locked, mua $15/năm

## IMPROVE (after launch)
- [ ] Voice input (Whisper API) cho Phúc 8 chưa gõ nhanh
- [ ] Daily summary email to bố
- [ ] Sibling messaging
- [ ] Generate weekly progress PDF auto
- [ ] PWA install icon

## RECURRING
- Mỗi tuần: review usage data + adjust difficulty
- Mỗi tháng: backup localStorage → JSON
- Mỗi quý: family Demo Day
