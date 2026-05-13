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

  /*
   * v1 seed coverage = ages 5, 6, 11 (covers 3 con hiện tại: Y/Phúc/An overlap).
   * Anh + CTV append entries for: 7, 8, 9, 10, 12, 13, 14, 15, 16
   * Each entry follows same structure. Empty arrays are OK at v1 — fill over time.
   * Per D-024: CTV produces draft, bố reviews per batch.
   */
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
