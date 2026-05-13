# Math Question Template — cho `lib/math-quiz.ts`

## 🎯 Brief CTV

**Mục đích:** Bộ ngân hàng câu hỏi Toán curated theo chương trình VN (lớp lá → lớp 11) + nâng cao.

**Output target:** 2000 questions tổng (curated, NOT generated). Generators trong code tạo thêm 850 đã có sẵn.

**Difficulty levels:**

- **L1** = lớp lá → lớp 1-2 (age 5-7) — cộng/trừ phạm vi 20, hình cơ bản
- **L2** = lớp 3-4 (age 8-9) — nhân/chia, phân số đơn giản
- **L3** = lớp 5-6 (age 10-11) — phân số/thập phân/tỉ lệ, hình học cơ bản
- **L4** = lớp 7 (age 12) — đại số nhập môn, hình học góc
- **L5** = lớp 8-9 (age 13-14) — hệ phương trình, định lý Pythagoras, đa giác
- **L6** = lớp 10-11 (age 15-16) — hàm số, lượng giác, xác suất nhập môn

## 📋 Schema

```ts
export type MathQuestion = {
  id: string;                    // 'math-{level}-{seq}', e.g., 'math-L3-042'
  level: 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6';
  primaryAge: number;            // NEW D-028
  topic: 'add' | 'sub' | 'mul' | 'div' | 'fraction' | 'decimal' | 'percent' | 'algebra' | 'geometry' | 'word-problem' | 'logic' | 'measurement' | 'time' | 'probability';
  source_grade: 'lớp lá' | 'lớp 1' | 'lớp 2' | ... | 'lớp 11';
  source_book?: string;          // optional textbook ref
  question_vi: string;
  question_en: string;
  question_type: 'mcq' | 'fill-blank' | 'multi-step' | 'true-false';
  options?: string[];            // for MCQ — 4 options including correct
  correct_answer: string | number;
  hint_vi?: string;              // 1 gợi ý nếu con stuck
  hint_en?: string;
  solution_steps_vi?: string[];  // step-by-step nếu word problem
  solution_steps_en?: string[];
};
```

## ✅ Tiêu chí câu hỏi tốt

1. **Đúng độ tuổi**: phù hợp curriculum VN grade target
2. **1 đáp án duy nhất** (trừ logic puzzle có thể nhiều cách giải)
3. **MCQ options**: 4 lựa chọn, 1 đúng, 3 distractor có lý (không ngẫu nhiên)
4. **Hint dẫn dắt** (KHÔNG cho đáp án, dẫn con tự nghĩ)
5. **Solution steps** rõ ràng cho word problem (giúp bố giải thích lại con khi sai)
6. **Bilingual đầy đủ**

## 📝 5 ví dụ mẫu

### L1 — Cộng phạm vi 20 (age 6, lớp 1)
```json
{
  "id": "math-L1-018",
  "level": "L1",
  "primaryAge": 6,
  "topic": "add",
  "source_grade": "lớp 1",
  "source_book": "Toán 1 - Cánh Diều",
  "question_vi": "Lan có 7 quả cam. Mẹ cho thêm 5 quả. Lan có bao nhiêu quả cam?",
  "question_en": "Lan has 7 oranges. Mom gives 5 more. How many oranges does Lan have?",
  "question_type": "mcq",
  "options": ["10", "11", "12", "13"],
  "correct_answer": "12",
  "hint_vi": "7 + 5 = ? Con đếm trên ngón tay từ 7: 8, 9, 10, 11, 12.",
  "hint_en": "7 + 5 = ? Count from 7 on your fingers."
}
```

### L2 — Nhân (age 9, lớp 4)
```json
{
  "id": "math-L2-031",
  "level": "L2",
  "primaryAge": 9,
  "topic": "mul",
  "source_grade": "lớp 4",
  "question_vi": "Một hộp có 6 bút. Mua 7 hộp thì có bao nhiêu bút?",
  "question_en": "A box has 6 pens. How many pens in 7 boxes?",
  "question_type": "fill-blank",
  "correct_answer": 42,
  "hint_vi": "Đây là phép nhân: 6 × 7. Con nhớ bảng cửu chương 6 không?",
  "hint_en": "This is multiplication: 6 × 7."
}
```

### L3 — Tỉ lệ (age 11, lớp 6)
```json
{
  "id": "math-L3-072",
  "level": "L3",
  "primaryAge": 11,
  "topic": "percent",
  "source_grade": "lớp 6",
  "source_book": "Toán 6 - Kết Nối Tri Thức",
  "question_vi": "Lớp 6A có 40 học sinh, trong đó 25% là nữ. Hỏi lớp có bao nhiêu nữ?",
  "question_en": "Class 6A has 40 students, 25% are girls. How many girls?",
  "question_type": "mcq",
  "options": ["8", "10", "12", "15"],
  "correct_answer": "10",
  "hint_vi": "25% = 1/4. Con chia 40 thành 4 phần bằng nhau.",
  "hint_en": "25% = 1/4. Divide 40 into 4 equal parts.",
  "solution_steps_vi": ["25% = 25/100 = 1/4", "40 × 1/4 = 40 ÷ 4 = 10"],
  "solution_steps_en": ["25% = 25/100 = 1/4", "40 × 1/4 = 40 ÷ 4 = 10"]
}
```

### L4 — Đại số (age 12, lớp 7)
```json
{
  "id": "math-L4-104",
  "level": "L4",
  "primaryAge": 12,
  "topic": "algebra",
  "source_grade": "lớp 7",
  "question_vi": "Giải phương trình: 3x + 7 = 22",
  "question_en": "Solve: 3x + 7 = 22",
  "question_type": "fill-blank",
  "correct_answer": 5,
  "hint_vi": "Bước 1: chuyển 7 sang phải (đổi dấu). Bước 2: chia cả 2 vế cho hệ số của x.",
  "hint_en": "Step 1: move 7 to right side. Step 2: divide both sides.",
  "solution_steps_vi": ["3x + 7 = 22", "3x = 22 - 7 = 15", "x = 15 / 3 = 5"],
  "solution_steps_en": ["3x + 7 = 22", "3x = 22 - 7 = 15", "x = 15 / 3 = 5"]
}
```

### L5 — Hình học Pythagoras (age 14, lớp 8)
```json
{
  "id": "math-L5-052",
  "level": "L5",
  "primaryAge": 14,
  "topic": "geometry",
  "source_grade": "lớp 8",
  "question_vi": "Một tam giác vuông có 2 cạnh góc vuông là 6cm và 8cm. Tính cạnh huyền.",
  "question_en": "A right triangle has legs 6cm and 8cm. Find the hypotenuse.",
  "question_type": "fill-blank",
  "correct_answer": 10,
  "hint_vi": "Định lý Pythagoras: a² + b² = c². Tính c.",
  "hint_en": "Pythagoras theorem: a² + b² = c².",
  "solution_steps_vi": ["6² + 8² = c²", "36 + 64 = c²", "c² = 100", "c = √100 = 10 cm"],
  "solution_steps_en": ["6² + 8² = c²", "36 + 64 = c²", "c² = 100", "c = √100 = 10 cm"]
}
```

## 🚫 KHÔNG

❌ Sai đáp án (kiểm tra TỪNG câu trước submit)
❌ Distractor MCQ vô lý (vd: chọn "Hà Nội" cho câu hỏi toán)
❌ Lệch grade (cho L1 mà dùng số hạng > 100)
❌ Word problem dùng từ vựng VN quá khó cho độ tuổi
❌ Hint cho đáp án trực tiếp (vi phạm philosophy Đại Ka Socratic)

## 📤 Submit

`artifacts/content-drafts/2026-05-XX-{CTV-name}-math-batch-{N}.md` — tối thiểu 20 questions cùng level + topic.

Bố review: spot-check 20% câu hỏi (random), nếu > 10% sai → reject batch.
