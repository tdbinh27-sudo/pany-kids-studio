/**
 * @file lib/age-curriculum.ts
 * @description Single-year age curriculum map (5 → 16) for personalized
 *              content delivery. Sourced from VN public school curriculum
 *              + reference book series + advanced international sources.
 * @decision D-028 (2026-05-13) — replace 3-bucket K/P/T with 12 single-year tracks.
 * @reference Trục 6 — Plan section 2.1, commercialization-plan-2026-05-13.md
 *
 * Layer 1 — VN school textbooks (free public source):
 *   - Cánh Diều (CD)
 *   - Kết Nối Tri Thức với Cuộc Sống (KNTT)
 *   - Chân Trời Sáng Tạo (CTST)
 *
 * Layer 2 — VN reference book corpus:
 *   - Vinschool, VAS, Olympiad math, HOCMAI
 *
 * Layer 3 — Advanced international:
 *   - Khan Academy Kids, Brilliant, AoPS, Coursera Kids
 *
 * Schema design notes:
 * - One entry per age (5, 6, ..., 16) — 12 entries total.
 * - subjects array references the 6 PILLARS in PanyKidsStudio.tsx
 *   (tech, english, finance, thinking, business, life) + development pillars.
 * - textbook_source / reference_books / advanced_links are URLs or ISBN refs
 *   anh + CTV will append. Empty arrays at v1 are acceptable.
 */

export type VNGradeLabel =
  | 'mầm non chồi'      // age 4
  | 'mầm non lá'        // age 5
  | 'lớp 1'             // age 6
  | 'lớp 2'             // age 7
  | 'lớp 3'             // age 8
  | 'lớp 4'             // age 9
  | 'lớp 5'             // age 10
  | 'lớp 6'             // age 11
  | 'lớp 7'             // age 12
  | 'lớp 8'             // age 13
  | 'lớp 9'             // age 14
  | 'lớp 10'            // age 15
  | 'lớp 11';           // age 16

export type SubjectName =
  | 'Tiếng Việt'
  | 'Toán'
  | 'Tiếng Anh'
  | 'Khoa học'
  | 'Lịch sử & Địa lý'
  | 'Khoa học Tự nhiên'
  | 'Tin học'
  | 'Đạo đức / GDCD'
  | 'Nghệ thuật'
  | 'Thể dục'
  | 'Hướng nghiệp'
  | 'Tài chính cá nhân'
  | 'Kỹ năng sống';

export type ContentRef = {
  title: string;
  url?: string;
  isbn?: string;
  note?: string;
  cost?: 'free' | 'freemium' | 'paid';
};

export type AgeSubject = {
  subject: SubjectName;
  textbook_source: ContentRef[];    // Layer 1
  reference_books: ContentRef[];    // Layer 2
  advanced_links: ContentRef[];     // Layer 3
  topics_summary_vi?: string;
  topics_summary_en?: string;
};

export type AgeCurriculum = {
  age: number;                       // 5..16
  vn_grade: VNGradeLabel;
  school_year_label: string;         // "Mẫu giáo 5 tuổi" / "Lớp 5 - Tiểu học" / etc.
  cefr_english_level: 'K' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  math_difficulty: 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6';
  dev_stage: 'early-childhood' | 'lower-primary' | 'upper-primary' | 'lower-secondary' | 'upper-secondary';
  subjects: AgeSubject[];
  dai_ka_tone_hint_vi: string;       // hint cho Đại Ka system prompt
  dai_ka_tone_hint_en: string;
  content_pillars_focus: string[];   // PILLAR ids most relevant at this age
};

/**
 * Master curriculum map age → grade
 * Anh + CTV extend `subjects[].textbook_source/reference_books/advanced_links` over time.
 */
export const CURRICULUM_MAP: Record<number, AgeCurriculum> = {
  5: {
    age: 5,
    vn_grade: 'mầm non lá',
    school_year_label: 'Mẫu giáo lá (chuẩn bị vào lớp 1)',
    cefr_english_level: 'K',
    math_difficulty: 'L1',
    dev_stage: 'early-childhood',
    subjects: [
      {
        subject: 'Tiếng Việt',
        textbook_source: [{ title: 'Bộ chuẩn phát triển trẻ 5 tuổi', note: 'Bộ GD&ĐT 2010 (cập nhật 2018)', cost: 'free' }],
        reference_books: [],
        advanced_links: [],
        topics_summary_vi: 'Nhận diện 29 chữ cái, ghép âm đơn giản, kể chuyện theo tranh, lắng nghe + diễn đạt.',
        topics_summary_en: 'Recognize 29 letters, simple letter blending, picture-based storytelling, listening + expression.',
      },
      {
        subject: 'Toán',
        textbook_source: [],
        reference_books: [],
        advanced_links: [{ title: 'Khan Academy Kids', url: 'https://learn.khanacademy.org/khan-academy-kids/', cost: 'free' }],
        topics_summary_vi: 'Đếm 1-20, so sánh nhiều/ít, hình cơ bản, vị trí trong/ngoài/trên/dưới.',
        topics_summary_en: 'Count 1-20, compare more/fewer, basic shapes, position concepts.',
      },
      {
        subject: 'Kỹ năng sống',
        textbook_source: [],
        reference_books: [],
        advanced_links: [],
        topics_summary_vi: 'Tự phục vụ ăn/ngủ/vệ sinh, an toàn cơ bản (đường, người lạ), cảm xúc, hợp tác bạn.',
        topics_summary_en: 'Self-care eating/sleeping/hygiene, basic safety, emotions, peer cooperation.',
      },
    ],
    dai_ka_tone_hint_vi: 'Câu cực ngắn (≤ 8 từ). Giọng âu yếm như chị/anh lớn. Dùng emoji 🌈🎨🧸. Không dùng từ trừu tượng. Mỗi reply tối đa 30 từ. Hỏi lại "Con có thích không?" để kích thích đáp lại.',
    dai_ka_tone_hint_en: 'Very short sentences (≤8 words). Warm older-sibling tone. Use emoji 🌈🎨🧸. No abstract words. Max 30 words per reply. Ask "Do you like it?" to invite response.',
    content_pillars_focus: ['creative', 'movement', 'discovery', 'family'],
  },

  6: {
    age: 6,
    vn_grade: 'lớp 1',
    school_year_label: 'Lớp 1 - Tiểu học',
    cefr_english_level: 'A1',
    math_difficulty: 'L1',
    dev_stage: 'lower-primary',
    subjects: [
      {
        subject: 'Tiếng Việt',
        textbook_source: [
          { title: 'Tiếng Việt 1 - Cánh Diều', cost: 'free' },
          { title: 'Tiếng Việt 1 - Kết Nối Tri Thức', cost: 'free' },
          { title: 'Tiếng Việt 1 - Chân Trời Sáng Tạo', cost: 'free' },
        ],
        reference_books: [],
        advanced_links: [],
        topics_summary_vi: 'Đọc trơn câu ngắn, viết chữ thường + hoa, kể chuyện đơn giản, đọc hiểu cơ bản.',
      },
      {
        subject: 'Toán',
        textbook_source: [
          { title: 'Toán 1 - Cánh Diều', cost: 'free' },
          { title: 'Toán 1 - Kết Nối Tri Thức', cost: 'free' },
        ],
        reference_books: [],
        advanced_links: [{ title: 'Khan Academy Kids - Early Math', url: 'https://learn.khanacademy.org/khan-academy-kids/', cost: 'free' }],
        topics_summary_vi: 'Cộng/trừ trong phạm vi 10 → 20, đếm/nhận biết hình, đo độ dài (cm), thời gian (giờ).',
      },
      {
        subject: 'Tiếng Anh',
        textbook_source: [{ title: 'Tiếng Anh 1 (Sách giáo khoa Bộ GD)', cost: 'free' }],
        reference_books: [{ title: 'Family and Friends 1 (Oxford)', cost: 'paid' }],
        advanced_links: [{ title: 'British Council Kids', url: 'https://learnenglishkids.britishcouncil.org/', cost: 'free' }],
        topics_summary_vi: 'Greeting, colors, numbers 1-10, family, classroom objects.',
      },
    ],
    dai_ka_tone_hint_vi: 'Câu ngắn (≤ 12 từ). Encourage tone "tuyệt vời con!". Dùng emoji 🌟📚✏️. Giải thích bằng so sánh thực (vd: "5 quả táo + 3 quả táo = 8 quả táo"). Max 50 từ.',
    dai_ka_tone_hint_en: 'Short sentences (≤12 words). Encourage tone "great job!". Use emoji 🌟📚✏️. Explain via real comparisons. Max 50 words.',
    content_pillars_focus: ['english', 'creative', 'movement', 'family'],
  },

  11: {
    age: 11,
    vn_grade: 'lớp 6',
    school_year_label: 'Lớp 6 - THCS (chuyển cấp)',
    cefr_english_level: 'A2',
    math_difficulty: 'L3',
    dev_stage: 'lower-secondary',
    subjects: [
      {
        subject: 'Toán',
        textbook_source: [
          { title: 'Toán 6 - Cánh Diều', cost: 'free' },
          { title: 'Toán 6 - Kết Nối Tri Thức', cost: 'free' },
        ],
        reference_books: [{ title: 'Bồi dưỡng Toán 6 - Tôn Thân (Olympic)', cost: 'paid' }],
        advanced_links: [
          { title: 'Khan Academy - Pre-Algebra', url: 'https://www.khanacademy.org/math/pre-algebra', cost: 'free' },
          { title: 'AoPS Beast Academy 6', url: 'https://beastacademy.com/', cost: 'paid' },
        ],
        topics_summary_vi: 'Số nguyên, phân số, số thập phân, tỉ lệ, hình học cơ bản (đường thẳng, góc), đại số nhập môn.',
      },
      {
        subject: 'Tiếng Anh',
        textbook_source: [
          { title: 'Tiếng Anh 6 (Global Success - Pearson/Bộ GD)', cost: 'free' },
          { title: 'Tiếng Anh 6 (i-Learn Smart World)', cost: 'free' },
        ],
        reference_books: [{ title: 'Cambridge Movers/Flyers test prep', cost: 'paid' }],
        advanced_links: [{ title: 'Cambridge English Young Learners', url: 'https://www.cambridgeenglish.org/exams-and-tests/young-learners-english/', cost: 'free' }],
        topics_summary_vi: 'My new school, my house, my friends, hobbies, body parts, food + drink, sports/games, holidays.',
      },
      {
        subject: 'Khoa học Tự nhiên',
        textbook_source: [{ title: 'KHTN 6 - Kết Nối Tri Thức', cost: 'free' }],
        reference_books: [],
        advanced_links: [{ title: 'CK-12 Middle School Science', url: 'https://www.ck12.org/student/', cost: 'free' }],
        topics_summary_vi: 'Tế bào, vật chất + chất, lực, năng lượng, hệ Mặt Trời, đa dạng thế giới sống.',
      },
      {
        subject: 'Hướng nghiệp',
        textbook_source: [],
        reference_books: [],
        advanced_links: [{ title: 'RIASEC Junior (in-app)', cost: 'free' }],
        topics_summary_vi: 'Khám phá sở thích RIASEC 6 nhóm, tìm hiểu 60 nghề + nghề "ngày trong đời".',
      },
    ],
    dai_ka_tone_hint_vi: 'Câu vừa (12-18 từ). Tone bạn lớn hơn 2-3 tuổi, không kẻ cả. Dùng emoji vừa phải 🚀💡. Có thể dùng từ trừu tượng đơn giản. Khuyến khích đặt câu hỏi "tại sao". Max 80 từ.',
    dai_ka_tone_hint_en: 'Medium sentences (12-18 words). Tone of a slightly-older peer. Moderate emoji 🚀💡. Allow simple abstract words. Encourage "why" questions. Max 80 words.',
    content_pillars_focus: ['tech', 'english', 'thinking', 'discovery', 'career'],
  },

  7: {
    age: 7,
    vn_grade: 'lớp 2',
    school_year_label: 'Lớp 2 - Tiểu học',
    cefr_english_level: 'A1',
    math_difficulty: 'L1',
    dev_stage: 'lower-primary',
    subjects: [
      {
        subject: 'Tiếng Việt',
        textbook_source: [
          { title: 'Tiếng Việt 2 - Cánh Diều', cost: 'free' },
          { title: 'Tiếng Việt 2 - Kết Nối Tri Thức', cost: 'free' },
        ],
        reference_books: [],
        advanced_links: [],
        topics_summary_vi: 'Đọc - viết câu dài 12-15 từ, kể chuyện theo tranh, mở rộng vốn từ chủ đề gia đình + trường lớp + thiên nhiên.',
      },
      {
        subject: 'Toán',
        textbook_source: [{ title: 'Toán 2 - Cánh Diều', cost: 'free' }],
        reference_books: [{ title: 'Bồi dưỡng Toán 2 (Vinschool)', cost: 'paid' }],
        advanced_links: [{ title: 'Khan Academy Kids - Grade 2 Math', url: 'https://learn.khanacademy.org/khan-academy-kids/', cost: 'free' }],
        topics_summary_vi: 'Cộng/trừ trong 100, bảng nhân 2-5, đo độ dài (m/cm/mm), tiền VN (1k/2k/5k/10k/20k/50k/100k/200k/500k).',
      },
      {
        subject: 'Tiếng Anh',
        textbook_source: [{ title: 'Tiếng Anh 2 (Global Success)', cost: 'free' }],
        reference_books: [{ title: 'Family and Friends 2 (Oxford)', cost: 'paid' }],
        advanced_links: [{ title: 'BBC Learning English Kids', url: 'https://www.bbc.co.uk/learningenglish/', cost: 'free' }],
        topics_summary_vi: 'Pets, food, weather, days of week, hobbies, simple "I can/I have" sentences.',
      },
    ],
    dai_ka_tone_hint_vi: 'Câu ngắn (≤ 14 từ). Tone hứng khởi "tuyệt vời!" "xuất sắc!". Emoji 🌟📚🐶. Dùng ví dụ thực: bút màu, đồ chơi, vật nuôi. Khen nỗ lực không phải kết quả. Max 60 từ.',
    dai_ka_tone_hint_en: 'Short sentences (≤14 words). Cheerful tone. Emoji 🌟📚🐶. Praise effort not outcome. Max 60 words.',
    content_pillars_focus: ['english', 'creative', 'movement', 'family', 'discovery'],
  },

  8: {
    age: 8,
    vn_grade: 'lớp 3',
    school_year_label: 'Lớp 3 - Tiểu học',
    cefr_english_level: 'A1',
    math_difficulty: 'L2',
    dev_stage: 'lower-primary',
    subjects: [
      {
        subject: 'Toán',
        textbook_source: [
          { title: 'Toán 3 - Cánh Diều', cost: 'free' },
          { title: 'Toán 3 - Kết Nối Tri Thức', cost: 'free' },
        ],
        reference_books: [{ title: 'Bồi dưỡng Toán 3 (Olympic)', cost: 'paid' }],
        advanced_links: [
          { title: 'Khan Academy - Grade 3 Math', url: 'https://www.khanacademy.org/math/cc-third-grade-math', cost: 'free' },
          { title: 'AoPS Beast Academy 3', url: 'https://beastacademy.com/', cost: 'paid' },
        ],
        topics_summary_vi: 'Bảng nhân/chia 6-9, nhân số 3 chữ số, đo khối lượng (g/kg), thời gian (phút/giờ), hình tam giác/tứ giác.',
      },
      {
        subject: 'Khoa học',
        textbook_source: [{ title: 'Tự nhiên & Xã hội 3 (Bộ GD)', cost: 'free' }],
        reference_books: [],
        advanced_links: [{ title: 'National Geographic Kids', url: 'https://kids.nationalgeographic.com/', cost: 'free' }],
        topics_summary_vi: 'Vòng đời thực vật, cơ thể người (xương, cơ, da), động vật có xương sống/không xương sống, môi trường.',
      },
      {
        subject: 'Tiếng Anh',
        textbook_source: [{ title: 'Tiếng Anh 3 (Global Success)', cost: 'free' }],
        reference_books: [{ title: 'Cambridge Starters test prep', cost: 'paid' }],
        advanced_links: [],
        topics_summary_vi: 'My friends, my school, jobs, places in town, sports, food + drinks, weather, present continuous.',
      },
    ],
    dai_ka_tone_hint_vi: 'Câu vừa (12-15 từ). Bắt đầu dùng so sánh đơn ("giống như..."). Emoji 🌟🔬🚀. Khuyến khích đặt câu hỏi "tại sao". Có thể giải thích nhân quả đơn giản. Max 70 từ.',
    dai_ka_tone_hint_en: 'Medium sentences (12-15 words). Use simple analogies ("like..."). Emoji 🌟🔬🚀. Encourage "why" questions. Max 70 words.',
    content_pillars_focus: ['english', 'thinking', 'discovery', 'creative', 'movement'],
  },

  9: {
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
          { title: 'Toán 4 - Cánh Diều', cost: 'free' },
          { title: 'Toán 4 - Kết Nối Tri Thức', cost: 'free' },
        ],
        reference_books: [
          { title: 'Bồi dưỡng Toán 4 - Tôn Thân (Olympic)', cost: 'paid' },
          { title: 'Toán nâng cao 4 (Trần Diên Hiển)', cost: 'paid' },
        ],
        advanced_links: [
          { title: 'Khan Academy - Grade 4 Math', url: 'https://www.khanacademy.org/math/cc-fourth-grade-math', cost: 'free' },
          { title: 'Brilliant - Math Foundations', url: 'https://brilliant.org/courses/math/', cost: 'freemium' },
        ],
        topics_summary_vi: 'Số tự nhiên đến triệu, nhân/chia số nhiều chữ số, phân số nhập môn, đo diện tích (m²/dm²/cm²), góc + đường thẳng.',
      },
      {
        subject: 'Khoa học',
        textbook_source: [{ title: 'Khoa học 4 (Bộ GD)', cost: 'free' }],
        reference_books: [],
        advanced_links: [{ title: 'CK-12 Elementary Science', url: 'https://www.ck12.org/student/', cost: 'free' }],
        topics_summary_vi: 'Vật chất + năng lượng, nước + không khí, âm thanh + ánh sáng, dinh dưỡng + sức khỏe.',
      },
      {
        subject: 'Lịch sử & Địa lý',
        textbook_source: [{ title: 'Lịch sử & Địa lý 4 (Bộ GD)', cost: 'free' }],
        reference_books: [],
        advanced_links: [],
        topics_summary_vi: 'Bản đồ VN, các vùng kinh tế, lịch sử thời Văn Lang - Âu Lạc, dân tộc + văn hóa Việt.',
      },
      {
        subject: 'Tiếng Anh',
        textbook_source: [{ title: 'Tiếng Anh 4 (Global Success)', cost: 'free' }],
        reference_books: [{ title: 'Cambridge Movers test prep', cost: 'paid' }],
        advanced_links: [{ title: 'British Council Learn English Kids', url: 'https://learnenglishkids.britishcouncil.org/', cost: 'free' }],
        topics_summary_vi: 'Daily routines, past simple, comparatives, future plans, talking about hobbies, around the world topics.',
      },
    ],
    dai_ka_tone_hint_vi: 'Câu trung bình (14-16 từ). Bắt đầu dùng số liệu cụ thể (vd: "Lớn hơn 3 lần, không phải nhiều"). Emoji 🚀🧠📊. Cho phép thuật ngữ đơn giản nhưng giải nghĩa nếu mới. Max 75 từ.',
    dai_ka_tone_hint_en: 'Medium sentences (14-16 words). Start using specific numbers (e.g. "3× larger, not just bigger"). Emoji 🚀🧠📊. Allow simple jargon with explanation. Max 75 words.',
    content_pillars_focus: ['english', 'thinking', 'finance', 'discovery', 'family'],
  },

  10: {
    age: 10,
    vn_grade: 'lớp 5',
    school_year_label: 'Lớp 5 - Tiểu học (chuẩn bị THCS)',
    cefr_english_level: 'A2',
    math_difficulty: 'L2',
    dev_stage: 'upper-primary',
    subjects: [
      {
        subject: 'Toán',
        textbook_source: [
          { title: 'Toán 5 - Cánh Diều', cost: 'free' },
          { title: 'Toán 5 - Kết Nối Tri Thức', cost: 'free' },
        ],
        reference_books: [
          { title: 'Toán nâng cao 5 - Tôn Thân', cost: 'paid' },
          { title: 'Tuyển tập Olympic Toán 5', cost: 'paid' },
        ],
        advanced_links: [
          { title: 'Khan Academy - Grade 5 Math', url: 'https://www.khanacademy.org/math/cc-fifth-grade-math', cost: 'free' },
          { title: 'AoPS Beast Academy 5', url: 'https://beastacademy.com/', cost: 'paid' },
        ],
        topics_summary_vi: 'Phân số + thập phân thành thạo, tỉ số + tỉ lệ, % cơ bản, diện tích hình thang/tròn, thể tích hộp chữ nhật.',
      },
      {
        subject: 'Khoa học',
        textbook_source: [{ title: 'Khoa học 5 (Bộ GD)', cost: 'free' }],
        reference_books: [],
        advanced_links: [{ title: 'TED-Ed Kids', url: 'https://ed.ted.com/lessons?direction=desc&sort=featured-position', cost: 'free' }],
        topics_summary_vi: 'Cơ thể người (hệ tiêu hóa, tuần hoàn, hô hấp), thực vật + động vật + môi trường, ô nhiễm + bảo vệ.',
      },
      {
        subject: 'Tiếng Anh',
        textbook_source: [{ title: 'Tiếng Anh 5 (Global Success)', cost: 'free' }],
        reference_books: [{ title: 'Cambridge Flyers test prep', cost: 'paid' }],
        advanced_links: [{ title: 'IXL English Grade 5', url: 'https://www.ixl.com/ela/grade-5', cost: 'freemium' }],
        topics_summary_vi: 'Past continuous, conditional, comparing places, describing people in detail, present perfect intro.',
      },
      {
        subject: 'Hướng nghiệp',
        textbook_source: [],
        reference_books: [],
        advanced_links: [{ title: 'RIASEC Junior (in-app)', cost: 'free' }],
        topics_summary_vi: 'Khám phá sơ bộ RIASEC 6 nhóm, nhận diện sở thích bản thân, tìm hiểu 10-15 nghề phù hợp giai đoạn này.',
      },
    ],
    dai_ka_tone_hint_vi: 'Câu trung bình (14-18 từ). Có thể giải thích nhân quả nhiều bước. Emoji 🧭💡📐. Khuyến khích con tự tóm tắt ý chính. Bắt đầu hỏi "con nghĩ vì sao?". Max 80 từ.',
    dai_ka_tone_hint_en: 'Medium sentences (14-18 words). Multi-step cause-effect OK. Emoji 🧭💡📐. Encourage self-summarization. Ask "what do you think?". Max 80 words.',
    content_pillars_focus: ['english', 'thinking', 'finance', 'discovery', 'career'],
  },

  12: {
    age: 12,
    vn_grade: 'lớp 7',
    school_year_label: 'Lớp 7 - THCS',
    cefr_english_level: 'B1',
    math_difficulty: 'L4',
    dev_stage: 'lower-secondary',
    subjects: [
      {
        subject: 'Toán',
        textbook_source: [
          { title: 'Toán 7 - Cánh Diều', cost: 'free' },
          { title: 'Toán 7 - Kết Nối Tri Thức', cost: 'free' },
        ],
        reference_books: [
          { title: 'Bồi dưỡng Toán 7 - Tôn Thân', cost: 'paid' },
          { title: 'Toán Olympic 7 (NXB Giáo Dục)', cost: 'paid' },
        ],
        advanced_links: [
          { title: 'Khan Academy - 7th Grade Math', url: 'https://www.khanacademy.org/math/cc-seventh-grade-math', cost: 'free' },
          { title: 'AoPS Pre-Algebra', url: 'https://artofproblemsolving.com/online/prealgebra', cost: 'paid' },
        ],
        topics_summary_vi: 'Số hữu tỉ, lũy thừa, đơn thức + đa thức, tỉ lệ thuận/nghịch, hình học (đường thẳng song song, tam giác bằng nhau).',
      },
      {
        subject: 'Khoa học Tự nhiên',
        textbook_source: [{ title: 'KHTN 7 - Kết Nối Tri Thức', cost: 'free' }],
        reference_books: [],
        advanced_links: [
          { title: 'CK-12 Middle School Science', url: 'https://www.ck12.org/student/', cost: 'free' }
        ],
        topics_summary_vi: 'Nguyên tử + phân tử, chuyển động + lực, năng lượng (cơ-nhiệt-điện), trao đổi chất ở sinh vật.',
      },
      {
        subject: 'Tin học',
        textbook_source: [{ title: 'Tin học 7 (Bộ GD)', cost: 'free' }],
        reference_books: [],
        advanced_links: [
          { title: 'Scratch (MIT)', url: 'https://scratch.mit.edu/', cost: 'free' },
          { title: 'Code.org', url: 'https://code.org/', cost: 'free' },
        ],
        topics_summary_vi: 'Internet an toàn, soạn thảo văn bản, bảng tính cơ bản, thuật toán cơ bản.',
      },
      {
        subject: 'Tiếng Anh',
        textbook_source: [
          { title: 'Tiếng Anh 7 (Global Success)', cost: 'free' },
          { title: 'Tiếng Anh 7 (i-Learn Smart World)', cost: 'free' },
        ],
        reference_books: [{ title: 'Cambridge Key (KET) test prep', cost: 'paid' }],
        advanced_links: [{ title: 'BBC Learning English', url: 'https://www.bbc.co.uk/learningenglish', cost: 'free' }],
        topics_summary_vi: 'Hobbies + interests, education systems, films + music, environment, present perfect mastery.',
      },
    ],
    dai_ka_tone_hint_vi: 'Câu trung-dài (15-20 từ). Tone bạn lớn hơn, tôn trọng ý kiến con. Emoji 🚀🔬🎮. Có thể dùng từ trừu tượng. Hỏi mở "con thấy thế nào?". Max 90 từ.',
    dai_ka_tone_hint_en: 'Medium-long sentences (15-20 words). Peer-like tone, respect their views. Emoji 🚀🔬🎮. Abstract words OK. Ask open questions. Max 90 words.',
    content_pillars_focus: ['tech', 'english', 'thinking', 'discovery', 'career'],
  },

  13: {
    age: 13,
    vn_grade: 'lớp 8',
    school_year_label: 'Lớp 8 - THCS',
    cefr_english_level: 'B1',
    math_difficulty: 'L5',
    dev_stage: 'lower-secondary',
    subjects: [
      {
        subject: 'Toán',
        textbook_source: [
          { title: 'Toán 8 - Cánh Diều', cost: 'free' },
          { title: 'Toán 8 - Kết Nối Tri Thức', cost: 'free' },
        ],
        reference_books: [
          { title: 'Bồi dưỡng Toán 8 - Tôn Thân', cost: 'paid' },
          { title: 'Toán nâng cao 8 - Vũ Hữu Bình', cost: 'paid' },
        ],
        advanced_links: [
          { title: 'Khan Academy - 8th Grade Math', url: 'https://www.khanacademy.org/math/cc-eighth-grade-math', cost: 'free' },
          { title: 'AoPS Introduction to Algebra', url: 'https://artofproblemsolving.com/online/intro-algebra', cost: 'paid' },
        ],
        topics_summary_vi: 'Phương trình bậc 1, bất phương trình, hằng đẳng thức, Pythagoras, tam giác đồng dạng, diện tích đa giác.',
      },
      {
        subject: 'Khoa học Tự nhiên',
        textbook_source: [{ title: 'KHTN 8 - Kết Nối Tri Thức', cost: 'free' }],
        reference_books: [],
        advanced_links: [
          { title: 'PhET Interactive Simulations', url: 'https://phet.colorado.edu/', cost: 'free' },
        ],
        topics_summary_vi: 'Phản ứng hóa học cơ bản, áp suất + lực đẩy, điện - mạch điện, sinh học tế bào.',
      },
      {
        subject: 'Tiếng Anh',
        textbook_source: [{ title: 'Tiếng Anh 8 (Global Success)', cost: 'free' }],
        reference_books: [{ title: 'Cambridge Preliminary (PET) test prep', cost: 'paid' }],
        advanced_links: [{ title: 'TED-Ed', url: 'https://ed.ted.com/', cost: 'free' }],
        topics_summary_vi: 'Leisure activities, life in the country, peoples of Vietnam, our customs, climate change, modal verbs.',
      },
      {
        subject: 'Hướng nghiệp',
        textbook_source: [],
        reference_books: [],
        advanced_links: [{ title: 'RIASEC full 48-question (in-app)', cost: 'free' }],
        topics_summary_vi: 'RIASEC 48 câu đầy đủ, 60 nghề cụ thể + day-in-life, kỹ năng mềm cơ bản (thuyết trình + làm việc nhóm).',
      },
    ],
    dai_ka_tone_hint_vi: 'Câu dài hơn (16-22 từ). Tone độc lập — con đã tuổi tự suy nghĩ. Emoji vừa phải 💡🧭⚡. Khuyến khích con phản biện. Hỏi "con đồng ý/không đồng ý vì sao?". Max 100 từ.',
    dai_ka_tone_hint_en: 'Longer sentences (16-22 words). Independent tone — they can think for themselves. Sparse emoji 💡🧭⚡. Encourage counterarguments. Max 100 words.',
    content_pillars_focus: ['tech', 'english', 'thinking', 'business', 'career'],
  },

  14: {
    age: 14,
    vn_grade: 'lớp 9',
    school_year_label: 'Lớp 9 - THCS (chuẩn bị thi vào THPT)',
    cefr_english_level: 'B1',
    math_difficulty: 'L5',
    dev_stage: 'lower-secondary',
    subjects: [
      {
        subject: 'Toán',
        textbook_source: [
          { title: 'Toán 9 - Cánh Diều', cost: 'free' },
          { title: 'Toán 9 - Kết Nối Tri Thức', cost: 'free' },
        ],
        reference_books: [
          { title: 'Tuyển tập đề thi vào lớp 10', cost: 'paid' },
          { title: 'Toán nâng cao 9 - Vũ Hữu Bình', cost: 'paid' },
        ],
        advanced_links: [
          { title: 'HOCMAI - Toán 9 ôn thi', url: 'https://hocmai.vn/', cost: 'freemium' },
          { title: 'Khan Academy - Algebra 1', url: 'https://www.khanacademy.org/math/algebra', cost: 'free' },
        ],
        topics_summary_vi: 'Căn bậc 2, hệ phương trình, đồ thị hàm số bậc 1, hình học không gian, hình tròn + góc, định lý Vi-et.',
      },
      {
        subject: 'Khoa học Tự nhiên',
        textbook_source: [{ title: 'KHTN 9 - Kết Nối Tri Thức', cost: 'free' }],
        reference_books: [{ title: 'Ôn thi vào THPT KHTN 9', cost: 'paid' }],
        advanced_links: [{ title: 'Crash Course Kids', url: 'https://www.youtube.com/@crashcoursekids', cost: 'free' }],
        topics_summary_vi: 'Hóa học hữu cơ cơ bản, điện từ, ánh sáng + quang học, di truyền + tiến hóa nhập môn.',
      },
      {
        subject: 'Tiếng Anh',
        textbook_source: [{ title: 'Tiếng Anh 9 (Global Success)', cost: 'free' }],
        reference_books: [{ title: 'IELTS Foundation (4.0-5.0)', cost: 'paid' }],
        advanced_links: [{ title: 'British Council LearnEnglish Teens', url: 'https://learnenglishteens.britishcouncil.org/', cost: 'free' }],
        topics_summary_vi: 'Local environment, city life vs country, teen stress, English speaking countries, conditional sentences, reported speech.',
      },
      {
        subject: 'Hướng nghiệp',
        textbook_source: [],
        reference_books: [],
        advanced_links: [
          { title: 'Career Q&A (in-app, 12+ topics)', cost: 'free' },
          { title: 'O*NET Online (US career database)', url: 'https://www.onetonline.org/', cost: 'free' },
        ],
        topics_summary_vi: 'Quyết định chọn ban (Tự nhiên/Xã hội), 3 lựa chọn THPT chuyên / công lập / tư thục, kỹ năng phỏng vấn.',
      },
    ],
    dai_ka_tone_hint_vi: 'Câu dài (18-25 từ). Tone đối tác, không kẻ cả. Emoji ít 💼🎯. Có thể bàn luận nghiêm túc về tương lai, giáo dục, áp lực. Tôn trọng decisions của con. Max 110 từ.',
    dai_ka_tone_hint_en: 'Long sentences (18-25 words). Partnership tone, no condescension. Sparse emoji 💼🎯. Serious discussion of future/education OK. Max 110 words.',
    content_pillars_focus: ['english', 'thinking', 'career', 'business', 'life'],
  },

  15: {
    age: 15,
    vn_grade: 'lớp 10',
    school_year_label: 'Lớp 10 - THPT (vào cấp 3)',
    cefr_english_level: 'B2',
    math_difficulty: 'L6',
    dev_stage: 'upper-secondary',
    subjects: [
      {
        subject: 'Toán',
        textbook_source: [
          { title: 'Toán 10 - Cánh Diều', cost: 'free' },
          { title: 'Toán 10 - Kết Nối Tri Thức', cost: 'free' },
        ],
        reference_books: [
          { title: 'Tổng ôn Toán 10 (NXB Giáo Dục)', cost: 'paid' },
          { title: 'Toán nâng cao 10 - Lê Hồng Đức', cost: 'paid' },
        ],
        advanced_links: [
          { title: 'Khan Academy - Algebra 2', url: 'https://www.khanacademy.org/math/algebra2', cost: 'free' },
          { title: 'AoPS Intermediate Algebra', url: 'https://artofproblemsolving.com/online/intermediate-algebra', cost: 'paid' },
        ],
        topics_summary_vi: 'Mệnh đề + tập hợp, hàm số bậc 2, lượng giác cơ bản, vector, xác suất + thống kê nhập môn, hệ thức lượng tam giác.',
      },
      {
        subject: 'Khoa học Tự nhiên',
        textbook_source: [
          { title: 'Vật Lý 10 (Bộ GD)', cost: 'free' },
          { title: 'Hóa Học 10 (Bộ GD)', cost: 'free' },
          { title: 'Sinh Học 10 (Bộ GD)', cost: 'free' },
        ],
        reference_books: [{ title: 'Bồi dưỡng Vật Lý 10 chuyên', cost: 'paid' }],
        advanced_links: [
          { title: 'MIT OpenCourseWare HS', url: 'https://ocw.mit.edu/courses/highschool/', cost: 'free' },
          { title: 'Crash Course Physics', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtN0ge7yDk_UA0ldZJdhwkoV', cost: 'free' },
        ],
        topics_summary_vi: 'Vật Lý: chuyển động, lực, định luật Newton, công + năng lượng. Hóa: cấu tạo nguyên tử, bảng tuần hoàn, liên kết. Sinh: tế bào cấu trúc.',
      },
      {
        subject: 'Tiếng Anh',
        textbook_source: [{ title: 'Tiếng Anh 10 (Global Success)', cost: 'free' }],
        reference_books: [
          { title: 'IELTS 5.5-6.5 (Cambridge)', cost: 'paid' },
          { title: 'TOEIC 700+ (ETS)', cost: 'paid' },
        ],
        advanced_links: [
          { title: 'BBC Learning English Upper-Intermediate', url: 'https://www.bbc.co.uk/learningenglish/english/course/intermediate', cost: 'free' },
          { title: 'TED Talks (with transcripts)', url: 'https://www.ted.com/', cost: 'free' },
        ],
        topics_summary_vi: 'Family life, your body & health, music + media, viewing past + future, energy + environment, articles + advanced tenses.',
      },
      {
        subject: 'Hướng nghiệp',
        textbook_source: [],
        reference_books: [{ title: 'Cẩm nang chọn ngành đại học VN 2026', cost: 'paid' }],
        advanced_links: [
          { title: 'Career Compass + 60 nghề (in-app)', cost: 'free' },
          { title: 'Coursera (free audit)', url: 'https://www.coursera.org/', cost: 'freemium' },
        ],
        topics_summary_vi: 'Định hướng khối thi (A/A1/B/C/D), 60 ngành đại học VN top, du học vs trong nước, học bổng tham khảo.',
      },
    ],
    dai_ka_tone_hint_vi: 'Câu dài, có thể nhiều mệnh đề (18-28 từ). Tone đồng đẳng — coi con là người trưởng thành. Hạn chế emoji 🎯💼📚. Khuyến khích phản biện sâu, có dẫn chứng. Có thể nói thẳng "Đại Ka không đồng ý, vì...". Max 120 từ.',
    dai_ka_tone_hint_en: 'Long sentences with multiple clauses (18-28 words). Equal-peer tone — treat as adult. Minimal emoji 🎯💼📚. Encourage well-sourced debate. Can disagree explicitly. Max 120 words.',
    content_pillars_focus: ['english', 'thinking', 'finance', 'business', 'career', 'life'],
  },

  16: {
    age: 16,
    vn_grade: 'lớp 11',
    school_year_label: 'Lớp 11 - THPT',
    cefr_english_level: 'B2',
    math_difficulty: 'L6',
    dev_stage: 'upper-secondary',
    subjects: [
      {
        subject: 'Toán',
        textbook_source: [
          { title: 'Toán 11 - Cánh Diều', cost: 'free' },
          { title: 'Toán 11 - Kết Nối Tri Thức', cost: 'free' },
        ],
        reference_books: [
          { title: 'Tổng ôn Toán 11 chuyên (NXB GD)', cost: 'paid' },
          { title: 'Bồi dưỡng học sinh giỏi Toán 11', cost: 'paid' },
        ],
        advanced_links: [
          { title: 'Khan Academy - Precalculus', url: 'https://www.khanacademy.org/math/precalculus', cost: 'free' },
          { title: 'MIT OCW - Single Variable Calculus prep', url: 'https://ocw.mit.edu/courses/mathematics/18-01sc-single-variable-calculus-fall-2010/', cost: 'free' },
          { title: 'AoPS Calculus', url: 'https://artofproblemsolving.com/online/calculus', cost: 'paid' },
        ],
        topics_summary_vi: 'Dãy số + cấp số, lượng giác nâng cao (phương trình lượng giác), giới hạn dãy + hàm, đạo hàm nhập môn, hình học không gian.',
      },
      {
        subject: 'Khoa học Tự nhiên',
        textbook_source: [
          { title: 'Vật Lý 11 (Bộ GD)', cost: 'free' },
          { title: 'Hóa Học 11 (Bộ GD)', cost: 'free' },
          { title: 'Sinh Học 11 (Bộ GD)', cost: 'free' },
        ],
        reference_books: [{ title: 'Bồi dưỡng Lý 11 chuyên', cost: 'paid' }],
        advanced_links: [
          { title: 'MIT OpenCourseWare Physics 8.01', url: 'https://ocw.mit.edu/courses/physics/8-01sc-physics-i-classical-mechanics-fall-2016/', cost: 'free' },
          { title: 'Khan Academy - AP Chemistry', url: 'https://www.khanacademy.org/science/ap-chemistry-beta', cost: 'free' },
        ],
        topics_summary_vi: 'Lý: điện trường, từ trường, dòng điện không đổi. Hóa: nito + photpho, cacbon + silic, hidrocacbon. Sinh: chuyển hóa vật chất + năng lượng ở sinh vật.',
      },
      {
        subject: 'Tiếng Anh',
        textbook_source: [{ title: 'Tiếng Anh 11 (Global Success)', cost: 'free' }],
        reference_books: [
          { title: 'IELTS 6.5-7.5 (Cambridge series)', cost: 'paid' },
          { title: 'SAT English prep (Princeton Review)', cost: 'paid' },
        ],
        advanced_links: [
          { title: 'NYT The Learning Network', url: 'https://www.nytimes.com/section/learning', cost: 'free' },
          { title: 'Coursera English for Career Development', url: 'https://www.coursera.org/learn/careerdevelopment', cost: 'freemium' },
        ],
        topics_summary_vi: 'Generation gap, the post-pandemic world, becoming independent, caring for those in need, being part of ASEAN, advanced argumentative essays.',
      },
      {
        subject: 'Hướng nghiệp',
        textbook_source: [],
        reference_books: [
          { title: 'Cẩm nang du học 2026 (NXB Thông Tin)', cost: 'paid' },
          { title: 'Trường đại học VN ranking 2026', cost: 'paid' },
        ],
        advanced_links: [
          { title: 'EducationUSA Vietnam', url: 'https://educationusa.state.gov/centers/educationusa-vietnam', cost: 'free' },
          { title: 'UCAS UK Applications', url: 'https://www.ucas.com/', cost: 'free' },
          { title: 'Common App (US universities)', url: 'https://www.commonapp.org/', cost: 'free' },
        ],
        topics_summary_vi: 'Chuẩn bị hồ sơ ĐH năm cuối, viết essay, lựa chọn khối + ngành, chuẩn bị thi tốt nghiệp THPT, du học (Mỹ/Anh/Úc/Singapore).',
      },
      {
        subject: 'Tài chính cá nhân',
        textbook_source: [],
        reference_books: [{ title: 'Rich Dad Poor Dad - Robert Kiyosaki (VN dịch)', cost: 'paid' }],
        advanced_links: [
          { title: 'Khan Academy - Personal Finance', url: 'https://www.khanacademy.org/college-careers-more/personal-finance', cost: 'free' },
          { title: 'Investopedia Beginner', url: 'https://www.investopedia.com/financial-term-dictionary-4769738', cost: 'free' },
        ],
        topics_summary_vi: 'Budget cá nhân, lãi kép, đầu tư cơ bản (cổ phiếu/quỹ ETF/vàng), bảo hiểm + sức khỏe tài chính.',
      },
    ],
    dai_ka_tone_hint_vi: 'Câu dài + phức tạp (20-30 từ). Tone hoàn toàn equal — con là pre-adult. Emoji rất ít hoặc không 🎓💼. Có thể bàn business, đầu tư, du học, áp lực thi, lựa chọn nhân sinh. Tôn trọng quyết định con dù không đồng ý. Max 130 từ.',
    dai_ka_tone_hint_en: 'Long complex sentences (20-30 words). Equal-peer tone — pre-adult. Minimal/no emoji 🎓💼. OK to discuss business, investing, study abroad, exam pressure, life choices. Respect their decisions even if disagreeing. Max 130 words.',
    content_pillars_focus: ['english', 'finance', 'business', 'career', 'thinking', 'life'],
  },
};

/**
 * Get curriculum entry for a given age. Falls back to nearest defined age.
 */
export function getCurriculumForAge(age: number): AgeCurriculum | null {
  if (CURRICULUM_MAP[age]) return CURRICULUM_MAP[age];

  // Nearest fallback — find closest defined age (search outward)
  const definedAges = Object.keys(CURRICULUM_MAP).map(Number).sort((a, b) => a - b);
  if (definedAges.length === 0) return null;

  let closest = definedAges[0];
  let minDist = Math.abs(age - closest);
  for (const a of definedAges) {
    const d = Math.abs(age - a);
    if (d < minDist) { minDist = d; closest = a; }
  }
  return CURRICULUM_MAP[closest];
}

/**
 * Backward-compat: convert single age → legacy 3-bucket ageGroup (K | P | T).
 * Used by older content libs (quests.ts, career-qna.ts) until they're migrated.
 */
export function ageToLegacyGroup(age: number): 'K' | 'P' | 'T' {
  if (age <= 6) return 'K';
  if (age <= 11) return 'P';
  return 'T';
}

/**
 * CEFR level for English content selection (extends existing english-skills.ts mapping).
 */
export function ageToCEFR(age: number): 'K' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' {
  const c = getCurriculumForAge(age);
  return c?.cefr_english_level ?? 'B1';
}

/**
 * Math difficulty level for math-quiz.ts content selection.
 */
export function ageToMathLevel(age: number): 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6' {
  const c = getCurriculumForAge(age);
  return c?.math_difficulty ?? 'L3';
}

/**
 * Đại Ka tone hint injection for system prompt.
 * Returns Vietnamese hint by default, English hint when lang === 'en'.
 */
export function getDaiKaToneHint(age: number, lang: 'vi' | 'en' = 'vi'): string {
  const c = getCurriculumForAge(age);
  if (!c) return '';
  return lang === 'en' ? c.dai_ka_tone_hint_en : c.dai_ka_tone_hint_vi;
}

/**
 * Stats helper — count entries that have been seeded vs awaiting CTV draft.
 */
export function getCurriculumStats() {
  const ages = Array.from({ length: 12 }, (_, i) => 5 + i); // 5..16
  const seeded = ages.filter(a => CURRICULUM_MAP[a]);
  const subjectCounts = seeded.map(a => CURRICULUM_MAP[a].subjects.length);
  return {
    total_ages: 12,
    seeded_ages: seeded.length,
    pending_ages: 12 - seeded.length,
    pending_age_list: ages.filter(a => !CURRICULUM_MAP[a]),
    total_subjects_seeded: subjectCounts.reduce((a, b) => a + b, 0),
    avg_subjects_per_age: seeded.length ? subjectCounts.reduce((a, b) => a + b, 0) / seeded.length : 0,
  };
}
