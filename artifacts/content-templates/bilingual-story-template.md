# Bilingual Story Template — cho `lib/bilingual-stories.ts`

## 🎯 Brief CTV

**Mục đích:** Truyện song ngữ VN↔EN, paragraph-aligned, để con đọc + tăng vốn từ EN.

**Output target:** 100 stories (8 K + 22 A1 + 28 A2 + 22 B1 + 20 B2 mới).

## 📋 Schema

```ts
export type BilingualStory = {
  id: string;                    // 'story-{level}-{seq}', e.g., 'story-a2-013'
  level: 'K' | 'A1' | 'A2' | 'B1' | 'B2'; // CEFR
  primaryAge: number;            // NEW D-028
  ageRange?: [number, number];
  genre: 'folk' | 'fable' | 'adventure' | 'science' | 'history' | 'family' | 'school' | 'humor';
  title_vi: string;
  title_en: string;
  vocab_focus: { vi: string; en: string; pos: 'n' | 'v' | 'adj' | 'adv' }[]; // 5-10 từ
  paragraphs: { vi: string; en: string }[];  // mỗi đoạn parallel VN-EN
  moral_vi?: string;
  moral_en?: string;
  comprehension_questions?: {
    q_vi: string;
    q_en: string;
    answer_hint_vi: string;
  }[];
  est_read_min: number;
};
```

## ✅ Tiêu chí truyện tốt

1. **Paragraph parallel**: mỗi đoạn VN có đoạn EN tương ứng, dịch tự nhiên không word-by-word
2. **Vocab focus có chủ đích**: 5-10 từ chính, lặp lại ≥ 2 lần trong truyện
3. **Độ dài phù hợp level**:
   - K: 3-5 đoạn × 15-25 từ EN
   - A1: 4-6 đoạn × 25-40 từ EN
   - A2: 5-8 đoạn × 40-60 từ EN
   - B1: 6-10 đoạn × 60-100 từ EN
   - B2: 8-12 đoạn × 80-150 từ EN
4. **Có moral hoặc takeaway** (trừ humor)
5. **Bilingual native-level** ở cả 2 ngôn ngữ

## 📝 Ví dụ — Level K, age 5

```json
{
  "id": "story-k-009",
  "level": "K",
  "primaryAge": 5,
  "ageRange": [4, 6],
  "genre": "family",
  "title_vi": "Như Ý và quả táo đỏ",
  "title_en": "Y and the red apple",
  "vocab_focus": [
    { "vi": "quả táo", "en": "apple", "pos": "n" },
    { "vi": "đỏ", "en": "red", "pos": "adj" },
    { "vi": "mẹ", "en": "mom", "pos": "n" },
    { "vi": "ngon", "en": "yummy", "pos": "adj" },
    { "vi": "cảm ơn", "en": "thank you", "pos": "v" }
  ],
  "paragraphs": [
    { "vi": "Như Ý có một quả táo. Quả táo màu đỏ.", "en": "Y has an apple. The apple is red." },
    { "vi": "Mẹ cho Như Ý quả táo. Như Ý vui lắm.", "en": "Mom gives Y the apple. Y is very happy." },
    { "vi": "Như Ý ăn quả táo. Quả táo rất ngon.", "en": "Y eats the apple. The apple is very yummy." },
    { "vi": "Như Ý nói: 'Cảm ơn mẹ!'", "en": "Y says: 'Thank you, mom!'" }
  ],
  "moral_vi": "Biết cảm ơn người cho mình quà.",
  "moral_en": "Say thank you when someone gives you a gift.",
  "est_read_min": 3
}
```

## 🚫 KHÔNG

❌ Dịch máy (Google Translate sai ngữ điệu)
❌ Dài quá level (K mà 10 đoạn)
❌ Vocab_focus không xuất hiện trong truyện
❌ Đoạn VN-EN không tương đương nội dung

## 📤 Submit

`artifacts/content-drafts/2026-05-XX-{CTV-name}-stories-batch-{N}.md` — tối thiểu 5 stories cùng level.
