# Curriculum Entry Template — cho `lib/age-curriculum.ts` (D-028)

## 🎯 Brief CTV

**Mục đích:** Mỗi entry CURRICULUM_MAP map **1 độ tuổi (5-16)** sang VN grade level + danh sách sách giáo khoa + sách tham khảo + nguồn nâng cao. Đây là **backbone of D-028** — toàn bộ content (quests/stories/math/career) tham chiếu vào.

**Audience:** 12 ages = 12 entries. Hiện đã có 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 đã seed v1. CTV nhiệm vụ **mở rộng/làm sâu** từng entry.

**Output target:** Mỗi entry có **5-7 subjects** thay vì 3-4 hiện tại. Mỗi subject có:
- ≥ 2 textbook_source links (Cánh Diều / KNTT / CTST verified)
- ≥ 1 reference_book (Olympic / chuyên prep với ISBN nếu có)
- ≥ 2 advanced_links (Khan / AoPS / MIT OCW / British Council / TED-Ed)

## 📋 Schema (xem `apps/web/lib/age-curriculum.ts`)

```ts
export type AgeCurriculum = {
  age: number;                   // 5..16
  vn_grade: VNGradeLabel;        // mầm non lá / lớp 1-11
  school_year_label: string;     // human-readable
  cefr_english_level: 'K' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  math_difficulty: 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6';
  dev_stage: 'early-childhood' | 'lower-primary' | 'upper-primary' | 'lower-secondary' | 'upper-secondary';
  subjects: AgeSubject[];
  dai_ka_tone_hint_vi: string;
  dai_ka_tone_hint_en: string;
  content_pillars_focus: string[];
};

export type AgeSubject = {
  subject: SubjectName;          // see list below
  textbook_source: ContentRef[]; // Layer 1: VN public textbooks
  reference_books: ContentRef[]; // Layer 2: paid reference books
  advanced_links: ContentRef[];  // Layer 3: international advanced
  topics_summary_vi?: string;
  topics_summary_en?: string;
};

export type ContentRef = {
  title: string;
  url?: string;
  isbn?: string;
  note?: string;
  cost?: 'free' | 'freemium' | 'paid';
};
```

## ✅ 13 SubjectName hợp lệ

```
'Tiếng Việt'        // K → lớp 5
'Toán'              // toàn bộ
'Tiếng Anh'         // lớp 1 → 11
'Khoa học'          // lớp 4-5 only (TNXH)
'Lịch sử & Địa lý'  // lớp 4-9
'Khoa học Tự nhiên' // lớp 6-9 (KHTN combined) hoặc Lý/Hóa/Sinh tách riêng lớp 10+
'Tin học'           // lớp 6-12
'Đạo đức / GDCD'    // lớp 1-9
'Nghệ thuật'        // lớp 1-12
'Thể dục'           // toàn bộ
'Hướng nghiệp'      // lớp 5-12 (RIASEC, du học)
'Tài chính cá nhân' // lớp 9-12 only
'Kỹ năng sống'      // K → lớp 5
```

## 🎯 Phạm vi mở rộng — 5 việc CTV cần làm cho mỗi entry

1. **Thêm textbook_source links** — paste URL trang Bộ GD hoặc NXB GD VN với từng đầu sách. Test click live.
2. **Thêm reference_books với ISBN** — vd: "Bồi dưỡng Toán 5 - Tôn Thân (NXB Giáo Dục)" + ISBN 978-604-xx-xxxx-x
3. **Thêm advanced_links** — chọn 2-3 nguồn quốc tế PHÙ HỢP với grade:
   - K → lớp 2: Khan Kids, BBC Bitesize KS1, ABCmouse
   - lớp 3-5: Khan Academy, Brilliant, National Geographic Kids
   - lớp 6-9: AoPS Beast Academy, CK-12, PhET Simulations, Crash Course Kids
   - lớp 10-12: MIT OCW HS, Khan Academy AP, AoPS Calc, TED Talks
4. **Expand topics_summary_vi** — viết 2-3 câu cho mỗi subject, mô tả CỤ THỂ topics trong grade đó (vd: "Phân số: cộng/trừ phân số khác mẫu, quy đồng, so sánh phân số")
5. **Fine-tune dai_ka_tone_hint** — nếu seed v1 chưa khớp với age (vd: 14 tuổi không nên emoji nhiều), CTV propose update với gợi ý cụ thể

## 📝 Ví dụ mẫu — expand age 9 (lớp 4)

**Hiện tại (v1 seed):**
```typescript
{
  age: 9,
  vn_grade: 'lớp 4',
  // ... 4 subjects: Toán + Khoa học + Lịch sử + Tiếng Anh
}
```

**CTV expand → 6 subjects + thêm advanced links per subject:**

```typescript
{
  age: 9,
  vn_grade: 'lớp 4',
  school_year_label: 'Lớp 4 - Tiểu học',
  cefr_english_level: 'A2',
  math_difficulty: 'L2',
  dev_stage: 'lower-primary',
  subjects: [
    {
      subject: 'Toán',
      textbook_source: [
        { title: 'Toán 4 - Cánh Diều', url: 'https://canhdieu.vn/toan-4', cost: 'free' },
        { title: 'Toán 4 - Kết Nối Tri Thức', url: 'https://hanhtrangso.nxbgd.vn/toan-4', cost: 'free' },
        { title: 'Toán 4 - Chân Trời Sáng Tạo', cost: 'free' },
      ],
      reference_books: [
        { title: 'Bồi dưỡng Toán 4 - Tôn Thân', isbn: '978-604-0-21345-6', cost: 'paid' },
        { title: 'Toán nâng cao 4 - Trần Diên Hiển', isbn: '978-604-0-25678-9', cost: 'paid' },
        { title: 'Tuyển tập Olympic Toán 4 (NXB Giáo Dục)', cost: 'paid' },
      ],
      advanced_links: [
        { title: 'Khan Academy - Grade 4 Math', url: 'https://www.khanacademy.org/math/cc-fourth-grade-math', cost: 'free' },
        { title: 'Brilliant - Math Foundations', url: 'https://brilliant.org/courses/math/', cost: 'freemium' },
        { title: 'AoPS Beast Academy 4', url: 'https://beastacademy.com/store/level-4', cost: 'paid' },
      ],
      topics_summary_vi: 'Số tự nhiên đến hàng triệu, nhân/chia số nhiều chữ số (tới 4 chữ số), phân số nhập môn (1/2, 1/3, 1/4...), đo diện tích (m²/dm²/cm²/mm²), góc nhọn/tù/vuông, đường thẳng song song-vuông góc.',
      topics_summary_en: 'Natural numbers up to millions, multi-digit multiplication/division (up to 4 digits), basic fractions, area measurement, angle types, parallel/perpendicular lines.',
    },
    {
      subject: 'Khoa học',
      textbook_source: [
        { title: 'Khoa học 4 (Bộ GD)', url: 'https://hanhtrangso.nxbgd.vn/khoa-hoc-4', cost: 'free' },
      ],
      reference_books: [
        { title: 'Bồi dưỡng Khoa học 4 (Vinschool)', cost: 'paid' },
      ],
      advanced_links: [
        { title: 'CK-12 Elementary Science', url: 'https://www.ck12.org/student/', cost: 'free' },
        { title: 'National Geographic Kids', url: 'https://kids.nationalgeographic.com/', cost: 'free' },
        { title: 'Crash Course Kids', url: 'https://www.youtube.com/@crashcoursekids', cost: 'free' },
      ],
      topics_summary_vi: 'Vật chất và năng lượng (nước, không khí, ánh sáng, âm thanh), nhiệt độ + nhiệt kế, dinh dưỡng + 4 nhóm thực phẩm, sức khỏe + an toàn cơ thể.',
    },
    // ... 4 subjects nữa: Lịch sử & Địa lý, Tiếng Anh, Tin học (NEW), Hướng nghiệp (NEW)
  ],
  dai_ka_tone_hint_vi: 'Câu trung bình (14-16 từ). Bắt đầu dùng số liệu cụ thể (vd: "Lớn hơn 3 lần, không phải nhiều"). Emoji 🚀🧠📊. Cho phép thuật ngữ đơn giản nhưng giải nghĩa nếu mới. Khen cụ thể vd: "Con tính nhân nhiều chữ số rất chính xác — đây là kỹ năng quan trọng cho lớp 5 sau này." Max 75 từ.',
  // ... (i18n EN giữ nguyên hoặc CTV propose update)
  content_pillars_focus: ['english', 'thinking', 'finance', 'discovery', 'family'],
}
```

## 🚫 KHÔNG

❌ Sao chép URL Khan/AoPS từ entry khác mà không verify age-appropriateness
❌ Dùng "Khan Academy Pre-Algebra" cho age 7 (quá khó) hoặc cho age 14 (quá dễ)
❌ ISBN bịa — bố sẽ google check
❌ "Olympic Toán 4" mà không có publisher/author cụ thể
❌ Wikipedia / Wikipedia links — không phù hợp educational use case

## ✅ Verification checklist trước submit

- [ ] Tất cả 5-7 subjects có ≥ 2 textbook + ≥ 1 reference + ≥ 2 advanced links
- [ ] CLICK TEST từng URL trong batch — 100% live
- [ ] ISBN format đúng `978-604-X-XXXXX-X` (VN publisher prefix)
- [ ] topics_summary_vi có 2-3 câu cụ thể (không phải 1 câu generic)
- [ ] CEFR / math difficulty / dev_stage khớp với grade
- [ ] Đại Ka tone hint phù hợp tuổi (5t emoji nhiều, 16t hạn chế emoji)
- [ ] Không trùng links giữa các ages liền kề (vd: age 8 và 9 cùng dùng "Khan Grade 8" → sai grade)

## 📤 Submit

`artifacts/content-drafts/2026-05-XX-{CTV-name}-curriculum-age-{N}.md` — 1 file = 1 age (full subjects expand).

## 💰 Đơn giá đề xuất

- 1 age entry full expand (5-7 subjects với verified links): **500,000 ₫**
- Bonus 100,000 ₫ nếu CTV thêm 1 subject mới (vd: Tin học cho lớp 4) hoặc 1 advanced link tier S (MIT OCW / Coursera Princeton / Stanford OpenLearning)

**Total budget cho FULL expand 12 ages:** ~6-7 triệu ₫ (6M base + bonuses).
