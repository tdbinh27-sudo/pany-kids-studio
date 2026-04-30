# Handoff — Pany Kids Studio

**Last session:** 2026-04-30
**Current chapter:** Project OS scaffold complete, awaiting approval

## What was done this session

1. Built complete v3 dashboard (2748 lines, 22 tabs, 38 functions, bilingual VN+EN, anime/funny style)
2. Saved key knowledge to MemPalace wing `pany-kids-studio` (5 drawers + diary)
3. Set up Project OS at `Projects/pany-kids-studio/` with all 7 canonical files
4. Copied v3 JSX → artifacts/

## Next session: 5 questions for bố

1. **Subdomain**: `pany-kids-studio.vercel.app` (free) or mua domain `panykids.io` (~$15/năm)?
2. **Repo visibility**: Public (open-source) hay private?
3. **Chatbot tên**: Pany-chan (em đề xuất) / Sensei Pany / Mochi / Kido / khác?
4. **API key timing**: Setup Anthropic key NGAY (build dashboard + chatbot cùng 1 lượt) hay deploy dashboard trước, add chatbot Phase 3?
5. **VPS necessary?**: Vercel free đủ cho v1 — anh có muốn dual-deploy lên Contabo VPS không?

## To resume work

Type: `Continue pany-kids-studio` and Claude Code sẽ:
1. Read plan.md + decisions.md
2. Confirm anh's answers to 5 questions
3. Begin Phase 1 (Next.js init)

## Reference files

- Latest source: `artifacts/PanyKidsStudio_Dashboard_v3.jsx`
- Memory: MemPalace wing `pany-kids-studio` (rooms: decisions, research, design, code, lessons)
- v2 (still in Drive): `Drive của tôi/05_Ca_Nhan/Home sweat home/Phuc - An - Y 4 2026/files/PanyKidsStudio_Dashboard_v2.jsx`

## Critical context (don't lose)

- 3 kids: Phúc (8), An (10), Y (12)
- Domain `panyvn.app` is BUSINESS, NOT to be used for this education project
- AI safety: Claude 18+ rule means bố operates Claude Code, but Anthropic API direct (with COPPA prompting) is OK for kid-facing chatbot
- Storage: localStorage only (no DB)
- Cost target: ~$5/month for chatbot API (Haiku 4.5 default)
