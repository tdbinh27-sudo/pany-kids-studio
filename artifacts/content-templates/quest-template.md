# Quest Template — Daily Quest cho `lib/quests.ts`

## 🎯 Brief CTV

**Mục đích quest:** Mỗi ngày hệ thống pick 1 quest cho mỗi con (deterministic, không random) → con click "✅ Hoàn thành" sau khi làm. Quest = task ngắn 10-30 phút.

**Audience:** 12 single-year tracks (age 5, 6, 7, ..., 16) × 12 pillars × 7 days/week.

**Output target:** 500+ quests đầy đủ cho phase 2 (~40 quests/grade × 12 grades).

## 📋 Schema

```ts
// apps/web/lib/quests.ts
export type Quest = {
  id: string;                    // unique: 'q-{grade}-{pillar}-{seq}', e.g., 'q-l6-thinking-001'
  pillar: PillarId;              // 'tech' | 'english' | 'finance' | 'thinking' | 'business' | 'life' | 'creative' | 'movement' | 'discovery' | 'career' | 'family'
  ageGroup: 'K' | 'P' | 'T' | 'all';  // backward-compat (legacy 3-bucket)
  primaryAge: number;            // NEW D-028: target single-year (5..16)
  ageRange?: [number, number];   // NEW D-028: fallback range
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7; // ngày trong tuần (1=Thứ 2, 7=CN)
  difficulty: 1 | 2 | 3 | 4 | 5;  // 1 = dễ nhất, 5 = thử thách
  emoji: string;                  // 1-2 emoji
  estMin: number;                 // phút ước tính hoàn thành (10-30)
  needsParent: boolean;           // có cần bố/mẹ giúp không?
  title_vi: string;               // ≤ 60 ký tự
  title_en: string;               // ≤ 60 ký tự
  description_vi: string;         // ≤ 200 ký tự, hướng dẫn rõ
  description_en: string;
  success_criteria_vi: string;    // bố/con biết khi nào quest "xong"
  success_criteria_en: string;
  bonus_question_vi?: string;     // optional 1 câu reflection
  bonus_question_en?: string;
};
```

## ✅ Tiêu chí 1 quest tốt

1. **Cụ thể**: con đọc xong biết làm gì ngay, không cần hỏi lại
2. **Doable**: với độ tuổi target, làm được trong 10-30 phút
3. **Outcome rõ**: có sản phẩm cuối (vẽ, viết, làm, đo, tìm, kể)
4. **Bilingual đầy đủ**: VN + EN parallel, không dịch máy
5. **An toàn**: không vi phạm safety rules (vd: không dạy con dùng dao nếu < 8 tuổi)

## 📝 5 ví dụ mẫu (tham khảo cho CTV)

### Ví dụ 1 — Age 5, Pillar Creative, Day 1
```json
{
  "id": "q-mn-creative-001",
  "pillar": "creative",
  "ageGroup": "K",
  "primaryAge": 5,
  "ageRange": [5, 6],
  "day": 1,
  "difficulty": 1,
  "emoji": "🎨",
  "estMin": 15,
  "needsParent": true,
  "title_vi": "Vẽ một bức tranh về gia đình con",
  "title_en": "Draw a picture of your family",
  "description_vi": "Con vẽ tranh có bố, mẹ, anh chị em + ngôi nhà. Dùng bút màu hoặc sáp. Vẽ xong khoe Đại Ka nhé!",
  "description_en": "Draw a picture with your parents, siblings and your house. Use crayons or color pens. Show Đại Ka when done!",
  "success_criteria_vi": "Bức tranh có ≥ 3 thành viên gia đình + ngôi nhà.",
  "success_criteria_en": "Picture has ≥ 3 family members + a house.",
  "bonus_question_vi": "Trong tranh, ai là người con vẽ to nhất? Vì sao?",
  "bonus_question_en": "Who did you draw the biggest? Why?"
}
```

### Ví dụ 2 — Age 9 (lớp 4), Pillar Finance, Day 3
```json
{
  "id": "q-l4-finance-003",
  "pillar": "finance",
  "ageGroup": "P",
  "primaryAge": 9,
  "ageRange": [9, 10],
  "day": 3,
  "difficulty": 2,
  "emoji": "💰",
  "estMin": 20,
  "needsParent": false,
  "title_vi": "Lập danh sách 5 thứ con muốn mua + giá ước tính",
  "title_en": "List 5 things you want to buy + estimated prices",
  "description_vi": "Viết ra 5 món con muốn mua (đồ chơi, sách, game, bánh kẹo...). Mỗi món ước tính giá tiền (hỏi bố/mẹ nếu không biết). Tổng lại xem cần bao nhiêu.",
  "description_en": "Write 5 things you'd like to buy. Estimate each price (ask parents if unsure). Sum them up.",
  "success_criteria_vi": "Danh sách 5 món + giá + tổng tiền.",
  "success_criteria_en": "List 5 items + prices + total."
}
```

### Ví dụ 3 — Age 11 (lớp 6), Pillar Thinking, Day 5
```json
{
  "id": "q-l6-thinking-005",
  "pillar": "thinking",
  "ageGroup": "P",
  "primaryAge": 11,
  "ageRange": [11, 12],
  "day": 5,
  "difficulty": 3,
  "emoji": "🧠",
  "estMin": 25,
  "needsParent": false,
  "title_vi": "Tìm 3 luận điểm 'nên' và 3 luận điểm 'không nên' cho 1 chủ đề",
  "title_en": "List 3 'pros' and 3 'cons' arguments for one topic",
  "description_vi": "Chọn 1 chủ đề con quan tâm (vd: 'Trẻ em có nên dùng smartphone trước 12 tuổi?'). Viết 3 lý do 'có' + 3 lý do 'không'. Cuối cùng chọn 1 bên + giải thích vì sao.",
  "description_en": "Pick a topic you care about. Write 3 'yes' reasons + 3 'no' reasons. Then pick one side + explain why.",
  "success_criteria_vi": "Có đủ 6 luận điểm + 1 kết luận có giải thích.",
  "success_criteria_en": "6 points + 1 conclusion with reasoning."
}
```

### Ví dụ 4 — Age 14 (lớp 9), Pillar Career, Day 6
```json
{
  "id": "q-l9-career-006",
  "pillar": "career",
  "ageGroup": "T",
  "primaryAge": 14,
  "ageRange": [14, 15],
  "day": 6,
  "difficulty": 3,
  "emoji": "🧭",
  "estMin": 30,
  "needsParent": false,
  "title_vi": "Phỏng vấn 1 người lớn về công việc của họ",
  "title_en": "Interview an adult about their job",
  "description_vi": "Chọn 1 người lớn (bố/mẹ/cô chú/hàng xóm). Hỏi 5 câu: (1) công việc làm gì? (2) học gì để làm nghề này? (3) thích gì nhất? (4) khó gì? (5) lời khuyên cho người trẻ muốn theo nghề này. Ghi lại.",
  "description_en": "Interview an adult about their work. Ask 5 questions about role, education, likes, challenges, advice. Record answers.",
  "success_criteria_vi": "Ghi chú 5 câu trả lời đầy đủ.",
  "success_criteria_en": "Notes for all 5 answers."
}
```

### Ví dụ 5 — Age 16 (lớp 11), Pillar Tech, Day 2
```json
{
  "id": "q-l11-tech-002",
  "pillar": "tech",
  "ageGroup": "T",
  "primaryAge": 16,
  "ageRange": [16, 16],
  "day": 2,
  "difficulty": 4,
  "emoji": "🚀",
  "estMin": 30,
  "needsParent": false,
  "title_vi": "So sánh 2 chatbot AI miễn phí — viết bảng đánh giá",
  "title_en": "Compare 2 free AI chatbots — write evaluation table",
  "description_vi": "Chọn 2 chatbot (vd: Claude.ai vs Gemini). Hỏi cùng 3 câu vào cả 2 (1 toán, 1 viết, 1 sáng tạo). Lập bảng so sánh: tốc độ / chất lượng / dễ dùng. Kết luận con thích cái nào hơn + lý do.",
  "description_en": "Pick 2 chatbots. Ask the same 3 questions to each (math, writing, creative). Build comparison table: speed, quality, usability. Pick favorite + why.",
  "success_criteria_vi": "Bảng 3 cột (2 bot + tiêu chí) + 1 kết luận.",
  "success_criteria_en": "3-column table + 1 conclusion."
}
```

## 🚫 KHÔNG được viết quest kiểu này

❌ Quá mơ hồ: "Học gì đó về toán" → không biết làm gì cụ thể
❌ Quá lâu: "Đọc 1 cuốn sách 300 trang trong 1 ngày" → vô lý với độ tuổi
❌ Cần thiết bị đặc biệt không phải nhà nào cũng có: "Lập trình Arduino"
❌ Bắt buộc parent supervise nhưng `needsParent: false`
❌ Sao chép từ SGK nguyên văn

## 📤 Submit batch CTV

CTV save file dưới dạng: `artifacts/content-drafts/2026-05-XX-{CTV-name}-batch-{N}.md`

Mỗi batch tối thiểu 10 entries cùng grade + cùng pillar (để bố review nhanh).

Bố review trong 48h → approve/revise/reject → em ship.
