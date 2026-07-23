# Handoff — Pany Kids Studio

## Session 2026-07-23 — D-044 English exam-prep + grammar drills + UX/perf audit · ✅ LIVE

**Yêu cầu anh:** bổ sung nội dung tiếng Anh đầy đủ Nghe/Nói/Đọc/Viết/Game/luyện thi cho các lứa tuổi, KHÔNG tạo tab mới — chỉ bổ sung vào tab có sẵn. Kèm rà soát tối ưu webapp.

**Rà soát trước khi làm (quan trọng):** Listen/Speak/Read/Write đã ĐẦY ĐỦ từ trước (LISTEN_WORDS 210 từ, SPEAK_SENTENCES 55, READING_PASSAGES 21, WRITING_PROMPTS 30 — tasks.md backlog cũ "68→200+" etc. đã lỗi thời, thực tế đã vượt target). Game đã có (VocabWordle trong Practice Corner). **Chỉ thiếu "luyện thi" (exam-prep) và bài tập ngữ pháp riêng** → đó là scope thật của session này.

**Đã làm (3 file, không tab mới):**
1. `lib/exam-prep.ts` (mới) — 32 câu hỏi mock-test K/A1/A2/B1, ánh xạ tên chứng chỉ Cambridge thật (Starters/Movers-Flyers/KET) để điểm số có ý nghĩa ngoài đời. Vocab theo chủ đề YLE chính thức (nguồn tham khảo `ozbonus/yle-vocabulary-dataset` CC-BY-SA-4.0, câu hỏi tự viết 100%).
2. `components/PanyKidsStudio.tsx` — thêm mode thứ 3 "🎓 Luyện thi Tiếng Anh" vào `QuizTab` (vốn đã có toggle Pillar/Math) — tái dùng 100% UI/scoring có sẵn, chỉ thêm adapter + CEFR-level picker + badge ĐẠT/chưa đạt theo % + hiển thị đoạn văn đọc hiểu + giải thích 💡 sau khi trả lời.
3. `components/PracticeTab.tsx` — thêm thẻ "📝 Bài Tập Ngữ Pháp Tiếng Anh" (10 bài A1→B1) dùng lại pattern `ProblemCard` tap-to-reveal đã chứng minh ở D-043 (Hình Học). Thẻ này KHÔNG có iframe (chỉnh `Tool.src` thành optional).

**Verify ALL PASS:** `tsc --noEmit` exit 0 · `pnpm build` exit 0 (21 routes) · browser test đầy đủ qua agent-browser (mới cài trong session — Playwright MCP không có sẵn): chạy hết 1 bài test A1 8 câu (8/8, badge "✅ 100% — ⭐ Cambridge Starters ĐẠT" hiện đúng), xác nhận đoạn đọc hiểu 📖 hiện tách riêng đẹp, xác nhận thẻ Ngữ Pháp mở ra không bị vỡ layout (đã bỏ iframe đúng ý), bấm "Xem đáp án" hoạt động. Console chỉ có 2 warning SVG cũ đã biết từ trước (stop-color/stop-opacity, không liên quan session này).

**Rà soát tối ưu (yêu cầu 2 của anh) — đã ghi đầy đủ vào `tasks.md` mục "🔴 UX/perf audit findings":**
- 🔴 **Nghiêm trọng:** `lib/storage.ts` nuốt lỗi quota localStorage âm thầm — khi đầy quota, MỌI save sau đó fail không cảnh báo. Nguyên nhân chính: tranh vẽ ở Studio Sáng Tạo lưu PNG base64 không nén, không giới hạn số lượng — 3 con vẽ vài tuần có thể chạm quota. Chưa fix (ngoài scope session này, cần anh quyết định có làm ngay không).
- 🟡 Bundle `/` route ~752KB JS chưa code-split (không `next/dynamic` ở đâu cả) — mọi tab đều bundle chung dù 1 bé chỉ dùng vài tab.
- 🟡 `write`/`speak` progress logs cũng append-forever, nhẹ hơn nhưng cùng pattern nên sửa chung đợt sau.

**✅ Go-live (2026-07-23, anh duyệt "push & deploy luôn"):** commit `adab76e` → push `origin/main` → `vercel --prod` từ gốc repo → aliased **kids.panyvn.app**. Verify live qua agent-browser trên chính domain prod (không chỉ local): tab Quiz → nút "🎓 Luyện thi Tiếng Anh" xuất hiện đúng; Góc Luyện Tập → thẻ "📝 Bài Tập Ngữ Pháp Tiếng Anh" xuất hiện đúng. `https://kids.panyvn.app/` → HTTP 200.

**Còn treo (chưa fix, anh chưa quyết):** phần "🔴 storage quota" silent-fail ở trên — nói "fix storage quota" để resume khi nào anh muốn làm.

### Resume command
```
"Tiếp tục Pany Kids Studio — D-044 đã xong local, muốn push+deploy" hoặc "fix storage quota"
```

---

## Session 2026-07-06 — D-043 Practice Corner geometry upgrade (Lớp 5 nâng cao → tiền đề Lớp 6) · ✅ LIVE

**Yêu cầu anh:** Trong tab **Góc Luyện Tập**, 2 thẻ **Hình Học 3D** & **Hình Học Phẳng** đang ở mức lớp 3-4 (chỉ nhúng GeoGebra trống, không đề). Bỏ framing sơ cấp, thêm bài **Lớp 5 nâng cao + tiền đề Lớp 6** (mẫu độ khó: quyển MT Books "Hình hộp chữ nhật & lập phương" — diện tích bề mặt/thể tích).

**Đã làm (1 file):** `apps/web/components/PracticeTab.tsx`
- Giữ nguyên embed GeoGebra 3D/2D làm công cụ "sờ được".
- Thêm bộ đề có cấu trúc render **bên dưới iframe** khi mở thẻ: mỗi bài có tag độ khó · đề bài · 💡 công thức gợi ý · nút **"▼ Xem đáp án"** (ẩn sẵn, tap-to-reveal). Component mới: `ProblemCard` + `ProblemSet` (local state, không thêm dep).
- **12 bài** (bilingual vi/en), tất cả đáp án **đã tự tính lại tay**:
  - 📐 3D (6): HHCN Sxq/Stp/V · thùng không nắp · lập phương + scaling V gấp 8 · khối **khoét góc** (Stp không đổi) · đổi đơn vị → lít · bài ngược tìm chiều cao.
  - 🔷 2D (6): diện tích thoi/thang/bình hành · trung điểm kép · đo góc kề bù · lục giác đều ghép 6 tam giác.
- Cập nhật title/desc 2 thẻ + hero + gợi ý bố mẹ theo mức mới.

**Verify:** `tsc --noEmit` exit 0, 0 lỗi.

**Go-live (ĐÃ XONG — anh duyệt Level 2 "commit + deploy luôn"):**
- Commit `e886a5e` → push `origin/main` ✅ (chỉ stage PracticeTab.tsx; file `artifacts/migration-content-tracks-2026-05-19.sql` đang dirty là thay đổi cũ, KHÔNG phải của session này — để nguyên).
- Vercel `vercel --prod` **từ gốc repo** (Root Directory project = `apps/web`, chạy trong apps/web sẽ lỗi double-path) → build 22s → aliased **kids.panyvn.app**.
- Verify live: `https://kids.panyvn.app/` → **HTTP 200** ✅.

**Kiểm tra:** kids.panyvn.app → tab Góc Luyện Tập → mở thẻ 📐/🔷 → đề hiện dưới công cụ, bấm "Xem đáp án".

---

## Session D-042 (2026-06-11) — Space Explorer zone (Khám Phá Vũ Trụ)

**Decision D-042:** Add a new kid zone "Khám Phá Vũ Trụ / Space Explorer" as the **6th Supabase-CMS track**
(alongside gamedev / fashion / stem / glossary / findtrack). Embeds the MIT `locphamnguyen/solar-system-3d`
simulation via `<iframe>` (self-loads Three.js + textures from CDN → 0 new npm deps), wrapped in a rich
bilingual React discovery zone. Full design: `docs/D-042-space-explorer-design.md`.

### What was built (local, NOT yet pushed)

**New files**
- `apps/web/components/SpaceExplorerTab.tsx` — the zone (hero · 🔭 3D observatory iframe · 🌍 planet cards ·
  🚀 3 astronaut missions w/ per-kid checkboxes · 🎮 10-Q quiz · 🧩 order mini-game · 💼 careers · 🛰️ tools).
  Quiz pass (≥8/10) and a solved order-game auto-complete mission milestones `space-m2-quiz` / `space-m2-order`.
- `apps/web/lib/space-data.json` — anh-editable content (planets, missions, quiz, order_game, careers, tools).
- `apps/web/public/space/` — `solar-system.html`, `solar-system.vi.html`, `Audio_Solar_system_3d.MP3`, `LICENSE` (MIT).
- `artifacts/migration-d042-space-track.sql` — adds `'space'` to the `content_tracks` CHECK constraint.
- `docs/D-042-space-explorer-design.md` — approved v1 design/spec.

**Edited files**
- `lib/useContent.ts` — +import, +`'space'` in `Track`, +FALLBACKS.
- `app/api/content/[track]/route.ts` — +import +FALLBACKS +VALID_TRACKS.
- `app/api/admin/content/[track]/route.ts` — +VALID_TRACKS `'space'`.
- `app/admin/content/page.tsx` — +`'space'` Track + TRACKS row + text 5→6 tabs.
- `components/PanyKidsStudio.tsx` — +import, +`spaceProgress` state/loader/`setSpaceProgressP`, +`activeTab==='space'` branch.
- `components/TreeOfKnowledgeHome.tsx` — +NavItem 🪐 in DEFAULT_NAV.
- NOT touched: TabNav / MobileTabBar (cherry-picked tracks live only in the home grid — per D-041).

### Verification (all PASS)
- `npx tsc --noEmit` → exit 0.
- `pnpm build` (Next 16 Turbopack) → exit 0, 21 routes.
- Dev server (port 3111) + browser-pilot screenshot → zone renders fully; **3D iframe live** (Sun + planets,
  CDN textures load); planet cards / quiz / mini-game / missions / careers all present. No login gate.
- `GET /space/solar-system.vi.html` → 200 text/html (Next 16 serves nested public/*.html ✓).
- `GET /api/content/space` → `ok:true, source:bundle, planets:9` (Supabase-not-configured fallback ✓).
- Console: only 2 pre-existing React SVG warnings (`stop-color`/`stop-opacity`) from an older component — not D-042.

### Trạng thái go-live (Level 2)

**✅ Bước 1 — ĐÃ PUSH + LIVE:** commit `4923110` pushed → Vercel deploy LIVE (kids.panyvn.app/space/* → 200, /api/content/space → ok code mới). Lệnh đã chạy:
```
cd C:\Users\PanyBinh\Projects\pany-kids-studio
git push origin main
```

**✅ Bước 2 — Migration ĐÃ CHẠY (2026-06-11):** project `sbubzbgyvozabgrggjza` (pany-kids-prod), CHECK content_tracks giờ có 6 track gồm `'space'` (verified qua Supabase MCP). CMS sẵn sàng. SQL gốc (đã chạy, idempotent):
SQL Editor → paste `artifacts/migration-d042-space-track.sql` → **Ctrl+A trước khi Run** (gotcha D-041) →
verify CHECK array có 6 track gồm `'space'`. *Chưa chạy migration thì route tự fallback JSON bundle — vẫn chạy.*

**Bước 3 (tùy chọn) — CMS admin:**
`/admin/content?secret=<ADMIN_SECRET>` → tab 🪐 Khám Phá Vũ Trụ → Save → version 1 (sửa nội dung không cần code).

### Resume command
```
"Continue Pany Kids Studio — D-042 verify after anh pushed + applied space migration. Read handoff.md."
```

---
*Session 2026-06-11 · D-042 Space Explorer built + verified local · awaiting anh push + Supabase migration.*
