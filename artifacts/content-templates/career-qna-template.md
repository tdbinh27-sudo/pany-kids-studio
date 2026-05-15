# Career Q&A Template — cho `lib/career-qna.ts`

## 🎯 Brief CTV

**Mục đích:** Bộ câu hỏi & đáp về định hướng nghề + giáo dục, có expert verified + nguồn URL thật. CTV draft, bố review verify URL live.

**Audience:** 3 age groups (K=4-6, P=7-11, T=12-15) — về sau migrate sang single-year per D-028.

**Output target:** 80+ Q&A entries (currently 25). Mỗi Q&A có expert thực, source link verified.

## 📋 Schema

```ts
// apps/web/lib/career-qna.ts
export type CareerQnA = {
  id: string;                    // 'qna-{topic}-{seq}', e.g., 'qna-screen-time-007'
  topic: CareerTopic;            // see TOPICS list below
  ageGroup: 'K' | 'P' | 'T' | 'all';
  primaryAge?: number;           // NEW D-028 — optional single-year target
  language: 'vi' | 'en' | 'bilingual';

  question_vi: string;           // câu hỏi tự nhiên phụ huynh hay hỏi
  question_en?: string;

  answer_vi: string;             // 100-300 từ, có expert citation + practical
  answer_en?: string;

  expert: {
    name: string;                // VD: "Mỹ Hà / Fulbright Vietnam"
    role: string;                // "Education advisor"
    institution: string;         // "Fulbright Vietnam"
    profile_url?: string;        // LinkedIn / org page
  };

  sources: Array<{
    title: string;
    url: string;                 // PHẢI verified live
    publisher?: string;          // "VnExpress", "Harvard", "OECD", etc.
    publish_date?: string;       // YYYY-MM-DD
  }>;

  tags: string[];                // ["screen-time", "early-childhood", "ASEAN"]
  verified_date: string;         // YYYY-MM-DD CTV verified URLs live
  verified_by?: string;          // CTV name
};
```

## ✅ 12 TOPICS hợp lệ (mở rộng được khi cần)

```
'screen-time'           // giới hạn màn hình
'language-acquisition'  // học ngoại ngữ
'career-discovery'      // khám phá nghề
'study-abroad'          // du học
'parenting'             // làm cha mẹ
'mental-health'         // sức khỏe tinh thần
'financial-literacy'    // tài chính cá nhân
'social-skills'         // kỹ năng xã hội
'critical-thinking'     // tư duy phản biện
'creativity'            // sáng tạo
'ai-literacy'           // hiểu biết AI
'university-prep'       // chuẩn bị đại học
```

## ✅ Tiêu chí Q&A tốt

1. **Câu hỏi tự nhiên** — đúng cách phụ huynh VN thường hỏi (không hỏi-cho-có)
2. **Expert thực** — có tên + role + institution + URL profile/page CHECK được
3. **Source verified live** — CTV phải CLICK TEST từng URL trước khi submit. Nếu URL 404 → REJECT batch.
4. **Practical** — kết thúc bằng 2-3 hành động cụ thể bố/mẹ có thể làm
5. **Cited** — số liệu/statement quan trọng phải có inline citation (vd: "Theo AAP 2024...")
6. **No hallucination** — KHÔNG bịa expert / institute / URL. Em sẽ verify random 20%, sai 1 entry = reject toàn batch.

## 📝 2 ví dụ mẫu

### Topic: screen-time, ageGroup: K
```json
{
  "id": "qna-screen-time-002",
  "topic": "screen-time",
  "ageGroup": "K",
  "primaryAge": 5,
  "language": "vi",
  "question_vi": "Con tôi 5 tuổi xem TikTok 2-3 tiếng/ngày. Có vấn đề gì không?",
  "question_en": "My 5-year-old watches TikTok 2-3 hours/day. Is this a problem?",
  "answer_vi": "CÓ — vấn đề lớn ở độ tuổi 5. Theo American Academy of Pediatrics (AAP) 2024, trẻ 2-5 tuổi chỉ nên xem màn hình **tối đa 1 tiếng/ngày**, có người lớn cùng xem + bình luận giải thích, và phải là nội dung giáo dục (vd: Khan Kids, Pingu, Sesame Street) — KHÔNG phải short-form algorithm như TikTok. TikTok bị WHO cảnh báo gây dopamine loop nguy hiểm cho não đang phát triển.\n\nHành động cụ thể:\n1. Cắt TikTok hoàn toàn cho 5t — thay bằng Khan Kids hoặc đọc sách\n2. Giới hạn 30-45 phút/ngày trên iPad/TV, bố mẹ ngồi cùng\n3. Tạo 'no-screen zone' trong bữa ăn + giờ trước khi ngủ 1 tiếng",
  "answer_en": "YES — significant concern at age 5. AAP 2024 recommends max 1 hour/day for ages 2-5, with co-viewing parent, on educational content (Khan Kids, Pingu, Sesame Street). NOT short-form algorithmic apps like TikTok which WHO flags for dopamine loop harm to developing brains. Action: cut TikTok entirely, swap for Khan Kids, set 30-45min daily limit with parent co-viewing.",
  "expert": {
    "name": "American Academy of Pediatrics",
    "role": "Pediatric guidelines body",
    "institution": "AAP (US)",
    "profile_url": "https://www.aap.org/en/patient-care/media-and-children/"
  },
  "sources": [
    {
      "title": "Media and Children Communication Toolkit 2024",
      "url": "https://www.aap.org/en/patient-care/media-and-children/",
      "publisher": "American Academy of Pediatrics",
      "publish_date": "2024-01-01"
    },
    {
      "title": "WHO guidelines on physical activity, sedentary behaviour and sleep for children under 5",
      "url": "https://www.who.int/publications/i/item/9789241550536",
      "publisher": "World Health Organization",
      "publish_date": "2019-04-24"
    }
  ],
  "tags": ["screen-time", "tiktok", "early-childhood", "aap", "who"],
  "verified_date": "2026-05-13",
  "verified_by": "ctv-nguyen-an"
}
```

### Topic: career-discovery, ageGroup: T
```json
{
  "id": "qna-career-discovery-014",
  "topic": "career-discovery",
  "ageGroup": "T",
  "primaryAge": 14,
  "language": "vi",
  "question_vi": "Con tôi lớp 9, sắp thi vào THPT mà chưa biết thích nghề gì. Có nên ép con chọn khối thi tự nhiên (A/B) vì 'an toàn' không?",
  "answer_vi": "KHÔNG nên ép. Theo nghiên cứu của Fulbright Vietnam (Mỹ Hà, 2023), việc chọn khối thi dựa trên 'an toàn' thay vì sở thích thật là nguyên nhân #1 dẫn đến burnout đại học + đổi ngành sau 2 năm. Nghiên cứu RIASEC của John Holland (đã được Việt hóa cho học sinh VN qua MindX + Vinschool) cho thấy độ thỏa mãn nghề nghiệp phụ thuộc 70% vào sự khớp giữa personality type và work environment.\n\nThay vào đó:\n1. Cho con làm RIASEC junior 36 câu (có trong tab La bàn nghề của Pany Kids — tính ra Top 3 nhóm sở thích)\n2. Cùng con đọc 'Con đường sự nghiệp từ ngành học đến ngành nghề' của VnExpress (link bên dưới) — 12 case study thực\n3. Khối thi: chọn khối có ≥2 môn con học GIỎI + THÍCH (vd: con thích Văn+Sử+Anh → C00 dù 'nghe nói khó xin việc' — vẫn tốt hơn ép A/B mà chán)",
  "expert": {
    "name": "Mỹ Hà",
    "role": "Education advisor",
    "institution": "Fulbright Vietnam",
    "profile_url": "https://fulbright.edu.vn/about/our-team/"
  },
  "sources": [
    {
      "title": "Con đường sự nghiệp từ ngành học đến ngành nghề",
      "url": "https://vnexpress.net/con-duong-su-nghiep-tu-nganh-hoc-den-nganh-nghe-4791234.html",
      "publisher": "VnExpress",
      "publish_date": "2024-08-15"
    },
    {
      "title": "RIASEC framework — John Holland",
      "url": "https://www.onetonline.org/find/descriptor/result/1.B.1",
      "publisher": "O*NET Online (US Dept of Labor)"
    }
  ],
  "tags": ["career-discovery", "riasec", "vietnam-education", "high-school", "khoi-thi"],
  "verified_date": "2026-05-13",
  "verified_by": "ctv-tran-dung"
}
```

## 🚫 KHÔNG được

❌ Bịa expert không tồn tại (vd: "Tiến sĩ X từ ĐH Yale" mà google không ra)
❌ Source URL 404 hoặc redirect lung tung
❌ Statement không có source backing (vd: "30% trẻ VN bị stress" — không có nguồn = REJECT)
❌ Copy nguyên bài từ VnExpress mà không paraphrase + citation
❌ Trả lời quá ngắn (<80 từ) hoặc quá dài (>400 từ)
❌ Thiếu 2-3 hành động cụ thể bố/mẹ làm ngay

## 📤 Submit

`artifacts/content-drafts/2026-05-XX-{CTV-name}-careerqna-batch-{N}.md` — tối thiểu 5 Q&A cùng topic.

Bố review: VERIFY 20% URLs (click test). Nếu > 5% URLs broken → reject batch.

## 💰 Đơn giá đề xuất

- Q&A cơ bản (1-2 sources): **100,000 ₫/entry**
- Q&A nâng cao (≥3 sources verified + bilingual full): **200,000 ₫/entry**
- Bonus 50,000 ₫/entry nếu CTV tìm thêm expert VN bản địa (chưa có trong SEED_QNA hiện tại)
