# Content Templates — CTV Brief Pack

**Decision:** D-024 (2026-05-13) — Phase 2 content seed = CTV draft + bố review.
**Purpose:** Cung cấp template thống nhất để cộng tác viên (CTV) viết nội dung theo từng độ tuổi (5→16 = 12 grade tracks), bố review theo batch.

## 📁 Templates trong thư mục

| File | Loại nội dung | Output | Tham chiếu |
|---|---|---|---|
| `quest-template.md` | Daily Quest (`lib/quests.ts`) | 1 JSON entry/quest | D-028 (Trục 6) |
| `bilingual-story-template.md` | Bilingual Story (`lib/bilingual-stories.ts`) | 1 JSON entry/story | D-028 |
| `math-question-template.md` | Math Quiz (`lib/math-quiz.ts`) | 1 JSON entry/question | D-028 |
| `career-qna-template.md` ✅ NEW | Career Q&A (`lib/career-qna.ts`) | 1 JSON entry/Q&A với expert + sources verified | D-019, D-028 |
| `curriculum-entry-template.md` ✅ NEW | Curriculum entry (`lib/age-curriculum.ts`) | 1 full age entry (5-7 subjects expand) | D-028 backbone |

## 🎯 Quy trình CTV → bố review → ship

```
1. CTV nhận brief từ bố (vd: "Lớp 6 - 10 quests pillar 'thinking'")
   ↓
2. CTV mở template tương ứng + đọc HƯỚNG DẪN ở đầu file
   ↓
3. CTV draft 10 entries → save vào `artifacts/content-drafts/{YYYY-MM-DD}-{CTV-name}-{batch-id}.md`
   ↓
4. CTV submit PR / share link cho bố
   ↓
5. Bố review:
   - ✅ Approve cả batch → em paste vào lib/*.ts
   - ⚠️ Sửa nhỏ → bố markup inline, CTV revise
   - ❌ Reject batch → bố ghi lý do, CTV redo
   ↓
6. Em ship → tsc --noEmit → commit → deploy
```

## 🚦 Tiêu chí Bố Reject batch (ngay lập tức)

1. **Sai sự thật**: thông tin khoa học/toán/lịch sử không chính xác
2. **Lệch độ tuổi**: nội dung không phù hợp grade target (vd: bảng cửu chương cho lớp 1)
3. **Vi phạm safety**: bạo lực / tình yêu / chính trị / tôn giáo / chất kích thích
4. **Sao chép** thô từ SGK mà không paraphrase
5. **Tiếng Việt sai**: chính tả, ngữ pháp, dấu câu sai > 2 lỗi/entry
6. **Tiếng Anh sai**: ngữ pháp/từ vựng sai (nếu là content bilingual)
7. **Thiếu metadata**: ageRange, pillar, difficulty, source

## 📊 Trạng thái coverage (cập nhật weekly)

| Bank | Target | Hiện tại | Còn thiếu | Owner |
|---|---|---|---|---|
| Quests | 500 entries (12 grade × ~40) | 252 | 248 | CTV batch 1 (lớp lá → lớp 4) |
| Bilingual Stories | 100 stories | 50 | 50 | CTV batch 2 (lớp 5 → lớp 9) |
| Math Quiz | 2000 questions | 1060 | 940 | CTV batch 3 (lớp 6 → lớp 10) |
| English Skills | 500 vocab | 205 | 295 | CTV batch 4 (B1 + B2 levels) |
| Career Q&A | 80 topics | 25 | 55 | CTV batch 5 (TT teen 13-16) |
| **Curriculum map** | 12 age entries | 3 (5, 6, 11) | 9 | CTV batch 0 (priority — unblocks rest) |

## 🔗 Tham chiếu

- Schema source-of-truth: `apps/web/lib/age-curriculum.ts`, `apps/web/lib/quests.ts`, etc.
- Commercialization plan: `artifacts/commercialization-plan-2026-05-13.md`
- Decisions log: `decisions.md` (D-019, D-024, D-028)
- CTV agreement template (TBD): `artifacts/ctv-agreement.md`

## 💰 CTV Pricing (template — bố confirm cuối)

Suggested rates dựa trên VN content writer market 2026:

| Type | Đơn giá | Notes |
|---|---|---|
| Quest entry | 15,000-25,000 ₫/quest | Đơn giản nhất, 30-60 từ + answer |
| Bilingual story | 80,000-150,000 ₫/story | Cần native-level VN + decent EN |
| Math question | 10,000-30,000 ₫/question | Phụ thuộc difficulty (L1 thấp, L5+ cao) |
| Career Q&A | 100,000-200,000 ₫/Q&A | Cần research + cite source verified |
| Curriculum entry (1 age) | 500,000-1,000,000 ₫ | Full subject map per grade — đắt nhất |

**Total budget estimate Phase 2** (~32h CTV @ ~150k ₫/h): **~4.8M ₫** (~$200 USD).
