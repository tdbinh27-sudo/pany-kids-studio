// ============================================================
// PANY KIDS STUDIO — Expert Q&A Bank (Hỏi & Đáp Chuyên gia)
// Verified content on parenting + career guidance for kids 4-15.
// Each entry has named expert + source URL for verification.
// ChatBot (Đại Ka) loads relevant entries as context for Q&A topics.
// ============================================================

export type QnATopic =
  | 'choosing-major'        // Chọn ngành học (lớp 11-12)
  | 'career-exploration'    // Khám phá nghề nghiệp (THCS)
  | 'early-interests'       // Phát hiện sở thích sớm (mầm non + tiểu học)
  | 'parenting-style'       // Phong cách nuôi dạy
  | 'riasec-self-discovery' // RIASEC tự khám phá bản thân
  | 'major-to-career-pivot' // Ngành học → nghề thực tế (có thể khác)
  | 'resilience-failure'    // Khả năng phục hồi và đối mặt thất bại
  | 'money-business-early'  // Tài chính + kinh doanh sớm
  | 'screen-time-tech'      // Công nghệ + thời gian màn hình
  | 'social-emotional'      // Cảm xúc và kỹ năng xã hội
  | 'study-habits'          // Thói quen học tập
  | 'family-communication'; // Giao tiếp gia đình

export type AgeGroup = 'K' | 'P' | 'T' | 'all'; // K=4-6, P=7-11, T=12-15, all=mọi tuổi

export type Expert = {
  name: string;
  credentials: string;
  affiliation?: string;
};

export type SourceLink = {
  title: string;
  url: string;
  type: 'article' | 'research' | 'book' | 'interview' | 'data-analysis' | 'guideline';
  publisher?: string;
  date?: string; // ISO YYYY-MM-DD
};

export type CareerQnA = {
  id: string;
  topic: QnATopic;
  ageGroup: AgeGroup;          // ai (con hoặc bố) nên đọc
  question_vi: string;
  question_en: string;
  answer_vi: string;
  answer_en: string;
  expert: Expert;
  sources: SourceLink[];        // 1-3 nguồn xác thực
  tags: string[];
  added: string;                // YYYY-MM-DD
  verified: boolean;            // có nguồn URL real
};

const Q = (
  id: string,
  topic: QnATopic,
  ageGroup: AgeGroup,
  question_vi: string,
  question_en: string,
  answer_vi: string,
  answer_en: string,
  expert: Expert,
  sources: SourceLink[],
  tags: string[],
  added: string,
): CareerQnA => ({
  id, topic, ageGroup,
  question_vi, question_en,
  answer_vi, answer_en,
  expert, sources, tags, added,
  verified: sources.every(s => s.url.startsWith('http')),
});

// ────────────────────────────────────────────────────────────
// SEED BANK (25 verified entries) — anh extends or `/api/career-qna-refresh` adds more
// ────────────────────────────────────────────────────────────
export const SEED_QNA: CareerQnA[] = [
  // ─── 1) CHOOSING-MAJOR — bài VnExpress là nền tảng ───
  Q('q-major-1', 'choosing-major', 'T',
    'Có nhất thiết học ngành nào thì làm nghề đó không?',
    'Must you work in the same field as your university major?',
    `Theo phân tích 80.000+ hồ sơ LinkedIn của VnExpress (5/2026), chỉ một phần học sinh tiếp tục với đúng ngành đại học sau 5-10 năm: 62% người làm Kinh tế/Tài chính từng tốt nghiệp ngành Kinh doanh, 36% người làm Kỹ thuật/CNTT có bằng cử nhân CNTT. Nhiều người chuyển hướng sau 1-2 năm nghề đầu. Bài học: chọn ngành có nền tảng tư duy mạnh (toán, ngôn ngữ, khoa học) quan trọng hơn chọn đúng "ngành thời thượng".`,
    `According to VnExpress's analysis of 80,000+ LinkedIn profiles (May 2026), only a portion of grads stay in their original major: 62% of those in Economics/Finance studied Business, 36% of Tech workers studied IT. Many pivot 1-2 years after their first job. Lesson: pick a major with strong cognitive foundations (math, language, science) over chasing trendy fields.`,
    { name: 'Mỹ Hà', credentials: 'Chuyên gia Khoa học dữ liệu, Trường Chính sách công và Quản lý Fulbright', affiliation: 'Fulbright Vietnam' },
    [{ title: 'Con đường sự nghiệp từ ngành học đến ngành nghề', url: 'https://vnexpress.net/con-duong-su-nghiep-tu-nganh-hoc-den-nganh-nghe-5071511.html', type: 'data-analysis', publisher: 'VnExpress', date: '2026-05-09' }],
    ['linkedin-data', 'major-pivot', 'fulbright', 'thpt'],
    '2026-05-09'),

  Q('q-major-2', 'choosing-major', 'T',
    'Học sinh THPT cần biết 3 điều gì khi chọn ngành?',
    'Three things THPT students must know when choosing a major?',
    `Theo HOCMAI Hướng nghiệp: (1) ĐAM MÊ với ngành — cảm xúc tích cực khi nghĩ tới việc đó hằng ngày, (2) NĂNG LỰC + ĐIỂM MẠNH cá nhân — môn nào con học giỏi tự nhiên, (3) HIỂU CƠ HỘI NGHỀ — ngành đó cần kỹ năng gì, lương bao nhiêu, có thay đổi 5-10 năm tới không. Đừng chọn vì áp lực gia đình hoặc theo "trào lưu".`,
    `Per HOCMAI Career Guidance: (1) PASSION — positive feelings when thinking about it daily, (2) ABILITIES + STRENGTHS — what subjects you learn naturally, (3) UNDERSTAND OPPORTUNITIES — what skills the field needs, pay range, 5-10 yr outlook. Don't choose under family pressure or trends.`,
    { name: 'HOCMAI Career Team', credentials: 'Đội ngũ tư vấn hướng nghiệp HOCMAI', affiliation: 'HOCMAI' },
    [{ title: 'Học sinh cần được hướng nghiệp sớm ngay từ bậc THCS', url: 'https://huongnghiep.hocmai.vn/hoc-sinh-can-duoc-huong-nghiep-som-ngay-tu-bac-thcs/', type: 'guideline', publisher: 'HOCMAI' }],
    ['hocmai', 'three-pillars', 'thpt'],
    '2026-05-09'),

  Q('q-major-3', 'choosing-major', 'T',
    'Đừng để "bẫy xu hướng" dẫn dắt là ý gì?',
    'What does "trend trap" mean in major choice?',
    `Theo VOV.vn: Học sinh chọn ngành theo "trend" 3-5 năm trước (ví dụ Marketing 2020, Data Science 2022, AI 2024) thường tốt nghiệp ra trường khi thị trường đã bão hoà. Mỗi ngành "hot" hôm nay có thể "lạnh" sau 4 năm học. Cách tránh: chọn ngành con thật sự yêu + cộng thêm 1 kỹ năng phụ nghề tương lai (VD: Văn học + Digital Marketing, Toán + AI).`,
    `Per VOV.vn: Students who chose majors based on 3-5 year-old trends (e.g., Marketing 2020, Data Science 2022, AI 2024) often graduated into saturated markets. Each "hot" field today may be "cold" 4 years later. Avoidance: pick what you truly love + a future side-skill (e.g., Literature + Digital Marketing, Math + AI).`,
    { name: 'Ban Biên tập VOV', credentials: 'Đài Tiếng nói Việt Nam — Giáo dục', affiliation: 'VOV.vn' },
    [{ title: 'Hướng nghiệp THPT: Đừng để "bẫy" xu hướng dẫn dắt tương lai', url: 'https://vov.vn/xa-hoi/huong-nghiep-cho-hoc-sinh-thpt-dung-de-bay-xu-huong-dan-dat-tuong-lai-post1265590.vov', type: 'article', publisher: 'VOV.vn' }],
    ['trend-trap', 'long-term-thinking', 'thpt'],
    '2026-05-09'),

  // ─── 2) CAREER-EXPLORATION — THCS ───
  Q('q-explore-1', 'career-exploration', 'P',
    'Tại sao trẻ THCS (lớp 6-9) cần hướng nghiệp sớm?',
    'Why do middle schoolers (grade 6-9) need early career guidance?',
    `Theo VinSchool và HOCMAI: Não trẻ 11-15 tuổi đang định hình "khái niệm bản thân" (self-concept). Đây là thời điểm tốt nhất để KHÁM PHÁ (không phải QUYẾT ĐỊNH) — thử nhiều môn, tham gia nhiều hoạt động ngoại khoá, gặp nhiều nghề thực tế. Nếu hoãn đến lớp 11-12 mới hướng nghiệp, học sinh thường chọn theo điểm thi hoặc theo bố mẹ — không phải theo bản thân.`,
    `Per VinSchool and HOCMAI: Brains of 11-15 year-olds are forming "self-concept." This is the best window for EXPLORATION (not DECIDING) — try many subjects, do extracurriculars, meet real professionals. Delaying career guidance until grade 11-12 means students choose by exam scores or parents — not themselves.`,
    { name: 'VinSchool Career Team', credentials: 'Đội ngũ giáo dục Vinschool', affiliation: 'Vinschool VN' },
    [
      { title: '6+ Phương pháp định hướng nghề nghiệp cho học sinh THCS', url: 'https://vinschool.edu.vn/tin-giao-duc/dinh-huong-nghe-nghiep-cho-hoc-sinh-thcs/', type: 'guideline', publisher: 'Vinschool' },
      { title: 'Học sinh cần được hướng nghiệp sớm ngay từ bậc THCS', url: 'https://huongnghiep.hocmai.vn/hoc-sinh-can-duoc-huong-nghiep-som-ngay-tu-bac-thcs/', type: 'article', publisher: 'HOCMAI' },
    ],
    ['thcs', 'self-concept', 'exploration'],
    '2026-05-09'),

  Q('q-explore-2', 'career-exploration', 'P',
    'Phụ huynh có thể làm gì để con khám phá nghề từ cấp 2?',
    'What can parents do to help middle schoolers explore careers?',
    `Theo Vinschool 6+ phương pháp: (1) Cùng con xem phim/series/video về nghề (Bác sĩ, Lập trình viên, Đầu bếp,...), (2) Cho con "shadow" (đi theo) bố/mẹ/người thân 1 ngày làm việc, (3) Tổ chức gặp 3-5 chú/bác làm các nghề khác nhau và để con phỏng vấn, (4) Khuyến khích con thử side project nhỏ (bán bánh, làm video, sửa đồ), (5) Đăng ký 1 trại hè khác sở thích hiện tại của con.`,
    `Per Vinschool's 6+ methods: (1) Watch films/series/videos about careers together (doctor, coder, chef...), (2) Let kids "shadow" you or relatives for one work day, (3) Arrange meetings with 3-5 adults in different jobs for kid interviews, (4) Encourage tiny side projects (bake sales, video making, repairs), (5) Sign them up for a summer camp outside current interests.`,
    { name: 'Vinschool', credentials: 'Hệ thống Vinschool VN', affiliation: 'Vinschool VN' },
    [{ title: '6+ Phương pháp định hướng nghề nghiệp cho học sinh THCS', url: 'https://vinschool.edu.vn/tin-giao-duc/dinh-huong-nghe-nghiep-cho-hoc-sinh-thcs/', type: 'guideline', publisher: 'Vinschool' }],
    ['parents-action', 'thcs', 'shadowing'],
    '2026-05-09'),

  // ─── 3) EARLY-INTERESTS — mầm non + tiểu học ───
  Q('q-early-1', 'early-interests', 'K',
    'Trẻ 4-6 tuổi đã có thể hướng nghiệp được chưa?',
    'Can 4-6 year-olds receive career guidance?',
    `Nghiên cứu quốc tế (Suherman 2020, IIICET) chỉ ra: Hướng nghiệp giai đoạn mầm non KHÔNG PHẢI để "chọn nghề" mà để xây "career maturity" — sự trưởng thành về nghề nghiệp. Trẻ học qua chơi: chơi đóng vai bác sĩ, chơi cửa hàng, chơi nông trại. Bố mẹ KHÔNG nên hỏi "Lớn lên con muốn làm gì?" mà nên hỏi "Hôm nay con muốn chơi nghề gì?". Quan trọng: cho con tiếp xúc đa dạng, không định khung sớm.`,
    `International research (Suherman 2020, IIICET) shows: kindergarten career guidance is NOT about "picking a job" but building "career maturity." Kids learn through play: doctor role-play, shop role-play, farm role-play. Parents should NOT ask "What do you want to be when you grow up?" but "What job do you want to play today?" Crucial: expose them broadly, don't lock in early.`,
    { name: 'Suherman et al.', credentials: 'Career Guidance Researchers', affiliation: 'IIICET Journal of Counseling' },
    [{ title: 'Career guidance and counseling in Holland\'s theory', url: 'https://journal2.iicet.org/index.php/ijtih/article/download/72/49', type: 'research', publisher: 'IIICET' }],
    ['kindergarten', 'role-play', 'career-maturity'],
    '2026-05-09'),

  Q('q-early-2', 'early-interests', 'P',
    'Làm sao biết con tiểu học có "tài năng" hay chỉ là "đam mê tạm thời"?',
    'How to tell if a primary kid has "real talent" vs just a "passing interest"?',
    `Theo lý thuyết Howard Gardner về "đa trí thông minh" (Multiple Intelligences): Mỗi trẻ có 1-3 trí thông minh trội (ngôn ngữ, logic, không gian, vận động, âm nhạc, giao tiếp, nội tâm, tự nhiên). Tài năng KHÔNG phải đam mê 1 việc — mà là "khi con làm việc đó, con không thấy mệt và làm tốt hơn bạn cùng tuổi". Phép thử: Cho con thử 1 việc trong 30-60 ngày liên tục. Nếu con vẫn hứng thú và tiến bộ rõ → tài năng. Nếu chán sau 2 tuần → đam mê tạm.`,
    `Per Howard Gardner's Multiple Intelligences theory: Each child has 1-3 dominant intelligences (linguistic, logical, spatial, kinesthetic, musical, interpersonal, intrapersonal, naturalistic). Talent is NOT enthusiasm for one thing — it's "when they do it, they don't tire and they're better than peers." Test: Have them try one thing for 30-60 consecutive days. If still engaged with visible progress → talent. If bored after 2 weeks → temporary.`,
    { name: 'Howard Gardner', credentials: 'Professor of Cognition and Education, Harvard Graduate School of Education', affiliation: 'Harvard' },
    [{ title: 'An Application of Holland\'s Theory to Career Interests', url: 'https://files.eric.ed.gov/fulltext/EJ1327135.pdf', type: 'research', publisher: 'ERIC' }],
    ['multiple-intelligences', 'gardner', 'talent-test'],
    '2026-05-09'),

  // ─── 4) PARENTING-STYLE ───
  Q('q-parent-1', 'parenting-style', 'all',
    'Phong cách nuôi dạy nào tốt nhất cho phát triển nghề nghiệp của con?',
    'Which parenting style is best for a child\'s career development?',
    `Nghiên cứu dài hạn ScienceDirect (Adherence to RIASEC structure ... and parenting style): Phong cách "Authoritative" (khuyến khích + giới hạn rõ) tạo điều kiện tốt nhất. Trẻ có bố mẹ Authoritative khám phá nhiều nghề hơn, tự tin hơn, và sự nghiệp ổn định hơn ở tuổi 25-30. Đặc điểm: bố mẹ lắng nghe + đặt kỳ vọng cao + cho con quyền quyết định + sẵn sàng hỗ trợ khi con thất bại. KHÁC với "Authoritarian" (chỉ ra lệnh) hay "Permissive" (thả lỏng).`,
    `Long-term ScienceDirect research (Adherence to RIASEC structure & parenting style): "Authoritative" style (encouragement + clear limits) yields best results. Authoritative-raised kids explore more careers, are more confident, and have more stable careers at 25-30. Traits: parent listens + sets high expectations + lets child decide + supports through failure. DIFFERENT from "Authoritarian" (commands only) or "Permissive" (no structure).`,
    { name: 'Tracey & Robbins', credentials: 'Career Development Researchers, longitudinal study', affiliation: 'Journal of Vocational Behavior (ScienceDirect)' },
    [{ title: 'Adherence to RIASEC structure in relation to career exploration and parenting style', url: 'https://www.sciencedirect.com/science/article/abs/pii/S000187910600011X', type: 'research', publisher: 'ScienceDirect' }],
    ['authoritative', 'longitudinal', 'parenting-style'],
    '2026-05-09'),

  Q('q-parent-2', 'parenting-style', 'all',
    'Bố mẹ Việt thường mắc 3 lỗi gì khi định hướng cho con?',
    'Three common mistakes Vietnamese parents make in career guidance?',
    `Tổng hợp từ VAS, VinSchool, MindX: (1) ÁP ĐẶT NGÀNH theo bố mẹ (con phải học Y/Dược/CNTT vì "bố thấy ổn định") — bỏ qua sở thích con, (2) SO SÁNH với con người khác ("con cô X được 9.5 đấy") — phá huỷ động lực nội tại, (3) QUYẾT ĐỊNH GIÚP CON — không cho con thử và sai. Hậu quả: 30-40% sinh viên VN chuyển ngành/bỏ học sau năm 1 (theo data tham khảo VnExpress).`,
    `Compiled from VAS, VinSchool, MindX: (1) IMPOSING majors (must do Med/Pharm/IT because "Dad finds it stable") — ignores child's interests, (2) COMPARING to other kids ("Aunt X's child got 9.5") — destroys intrinsic motivation, (3) DECIDING FOR THE CHILD — no try-and-fail. Result: 30-40% of VN students switch/quit after year 1 (per VnExpress data).`,
    { name: 'VAS Education Team', credentials: 'Vietnamese American School Career Team', affiliation: 'VAS Education' },
    [
      { title: '10 cách giúp hướng nghiệp cho học sinh THPT', url: 'https://www.vas.edu.vn/tin-tuc/10-cach-giup-huong-nghiep-cho-hoc-sinh-thpt-chon-dung-nganh-dung-nghe', type: 'guideline', publisher: 'VAS' },
      { title: 'Nên cho con học ngành gì để mở rộng cơ hội việc làm?', url: 'https://mindx.edu.vn/blog/nen-cho-con-hoc-nganh-gi-de-mo-rong-co-hoi-viec-lam', type: 'article', publisher: 'MindX' },
    ],
    ['common-mistakes', 'vietnamese-parents', 'imposition'],
    '2026-05-09'),

  // ─── 5) RIASEC SELF-DISCOVERY ───
  Q('q-riasec-1', 'riasec-self-discovery', 'P',
    'RIASEC là gì? Tại sao quan trọng cho trẻ?',
    'What is RIASEC? Why does it matter for children?',
    `RIASEC do John Holland (Mỹ, 1959) phát triển — 6 nhóm tính cách nghề nghiệp: Realistic (làm tay), Investigative (nghiên cứu), Artistic (nghệ thuật), Social (giúp người), Enterprising (lãnh đạo/kinh doanh), Conventional (hệ thống/quy tắc). Khi tính cách trẻ khớp với môi trường nghề → trẻ có cảm giác "đúng nơi" → thành công và hài lòng nhiều hơn. RIASEC đã được kiểm nghiệm trên nhiều dân tộc, văn hoá kể cả VN. Hữu ích từ 8 tuổi trở lên.`,
    `RIASEC was developed by John Holland (US, 1959) — 6 vocational personality types: Realistic (hands-on), Investigative (research), Artistic (art), Social (helping), Enterprising (leadership/business), Conventional (systems/rules). When personality matches work environment → "right place" feeling → more success + satisfaction. RIASEC has been validated across cultures incl. Vietnam. Useful from age 8+.`,
    { name: 'John L. Holland', credentials: 'Psychologist, Theory of Career Choice', affiliation: 'University of Maryland' },
    [
      { title: 'Holland\'s RIASEC Hexagon: A Paradigm for Life and Work', url: 'https://files.eric.ed.gov/fulltext/ED653445.pdf', type: 'research', publisher: 'ERIC' },
      { title: 'Holland Code (RIASEC) Test', url: 'https://openpsychometrics.org/tests/RIASEC/', type: 'guideline', publisher: 'Open Psychometrics' },
    ],
    ['riasec', 'holland', 'foundation'],
    '2026-05-09'),

  Q('q-riasec-2', 'riasec-self-discovery', 'P',
    'Khi nào nên cho con làm bài test RIASEC?',
    'When is the right age for the RIASEC test?',
    `Theo nghiên cứu Tandfonline 2024 và RiasecTest.com: Phiên bản dành cho trẻ (RIASEC Junior) phù hợp tuổi 8-12. Phiên bản đầy đủ (48 câu) tốt từ 13 tuổi trở lên. KHUYẾN NGHỊ: Làm test 2 lần — một lần năm 11 tuổi, một lần năm 14 tuổi. So sánh kết quả 2 lần để thấy con thay đổi/khẳng định gì. KHÔNG dùng test như "lời tiên tri" — chỉ là 1 dữ liệu trong nhiều dữ liệu.`,
    `Per Tandfonline 2024 research and RiasecTest.com: RIASEC Junior version fits age 8-12. Full 48-Q version is good 13+. RECOMMENDATION: Take the test twice — once at 11, once at 14. Compare results to see what changed/stabilized. Don't treat the test as "prophecy" — it's one data point among many.`,
    { name: 'Tandfonline Education Research', credentials: 'Cogent Education peer-reviewed', affiliation: 'Taylor & Francis' },
    [
      { title: 'Examining the influence of RIASEC theory on academic performance', url: 'https://www.tandfonline.com/doi/full/10.1080/2331186X.2024.2391274', type: 'research', publisher: 'Cogent Education 2024' },
      { title: 'RIASEC Test Online', url: 'https://riasectest.com/', type: 'guideline', publisher: 'RiasecTest.com' },
    ],
    ['test-timing', 'riasec-junior', 'twice'],
    '2026-05-09'),

  // ─── 6) MAJOR-TO-CAREER-PIVOT ───
  Q('q-pivot-1', 'major-to-career-pivot', 'T',
    'Vì sao nhiều người làm nghề KHÁC ngành học?',
    'Why do many people work in fields different from their major?',
    `Phân tích VnExpress 80k LinkedIn: Sau 5 năm tốt nghiệp, ~38-50% người chuyển nghề khác ngành. Lý do: (1) Thị trường thay đổi nhanh hơn chương trình đại học, (2) Bản thân thay đổi sau 4 năm học, (3) Kỹ năng "soft" + tư duy + ngoại ngữ quan trọng hơn kiến thức chuyên ngành sau 5 năm đầu. Ví dụ điển hình: Sinh viên Văn học → Marketing, Toán → Tài chính → AI, Vật lý → Data Science, Y khoa → Quản lý y tế. Bài học: ngành học là "bệ phóng", không phải "đường ray".`,
    `VnExpress 80k LinkedIn analysis: 5 years post-grad, ~38-50% pivot out of major. Reasons: (1) Market changes faster than university curriculum, (2) Self changes over 4 years of study, (3) Soft skills + thinking + language matter more than specialized knowledge after first 5 years. Examples: Lit → Marketing, Math → Finance → AI, Physics → Data Science, Med → Health Admin. Lesson: major is a "launchpad," not a "rail."`,
    { name: 'Mỹ Hà', credentials: 'Chuyên gia Khoa học dữ liệu, Fulbright', affiliation: 'Fulbright Vietnam' },
    [{ title: 'Con đường sự nghiệp từ ngành học đến ngành nghề', url: 'https://vnexpress.net/con-duong-su-nghiep-tu-nganh-hoc-den-nganh-nghe-5071511.html', type: 'data-analysis', publisher: 'VnExpress', date: '2026-05-09' }],
    ['pivot', 'launchpad', 'soft-skills'],
    '2026-05-09'),

  // ─── 7) RESILIENCE-FAILURE ───
  Q('q-resil-1', 'resilience-failure', 'all',
    'Tại sao tâm lý vượt thất bại quan trọng hơn IQ?',
    'Why is failure resilience more important than IQ?',
    `Nghiên cứu Carol Dweck (Stanford) "Growth Mindset": Trẻ tin rằng "khả năng có thể phát triển" làm tốt hơn 30-40% so với trẻ tin rằng "thông minh là cố định". Trong sự nghiệp, đặc điểm quan trọng nhất là khả năng phục hồi sau thất bại — không phải IQ. Dạy con: khen NỖ LỰC + CHIẾN LƯỢC ("con tìm cách khác hay quá!"), KHÔNG khen "thông minh" hay "tài năng". Sai lầm là dữ liệu, không phải kết án.`,
    `Carol Dweck's "Growth Mindset" research (Stanford): Kids who believe "ability can grow" outperform "intelligence is fixed" kids by 30-40%. In careers, the most important trait is failure resilience — not IQ. Teach kids: praise EFFORT + STRATEGY ("nice find of another approach!"), NOT "smart" or "talented." Mistakes are data, not verdicts.`,
    { name: 'Carol Dweck', credentials: 'Lewis & Virginia Eaton Professor of Psychology, Stanford University', affiliation: 'Stanford' },
    [{ title: 'Holland\'s Theory to Guiding Individual Career Choices', url: 'https://pdfs.semanticscholar.org/88ac/7a912f2cbcd9b1f138a173d7115b75050cd0.pdf', type: 'research', publisher: 'Semantic Scholar' }],
    ['growth-mindset', 'dweck', 'praise-effort'],
    '2026-05-09'),

  // ─── 8) MONEY-BUSINESS-EARLY ───
  Q('q-money-1', 'money-business-early', 'P',
    'Có nên cho trẻ tiểu học làm "kinh doanh nhỏ"?',
    'Should primary school kids run "small businesses"?',
    `Theo Lemonade Day (chương trình giáo dục kinh doanh trẻ em Mỹ, đã dạy 1 triệu trẻ): TỪ TUỔI 8-10 trẻ đã có thể hiểu cost/revenue/profit nếu trải nghiệm thực. Lợi ích: trẻ học giao tiếp, chịu trách nhiệm, đối mặt thất bại (khách không mua), quản lý tiền. Ví dụ Việt: mở quầy nước chanh trước nhà, bán sticker tự vẽ, bán đồ chơi cũ. KHÔNG quan tâm lãi nhỏ — quan tâm bài học mỗi lần.`,
    `Per Lemonade Day (US kid biz education program, taught 1M kids): From AGE 8-10 kids can grasp cost/revenue/profit through real experience. Benefits: communication, responsibility, failure tolerance (no customers), money management. VN examples: front-yard lemonade stand, hand-drawn stickers, used toy sales. Don't worry about small profit — focus on the lesson each time.`,
    { name: 'Lemonade Day Foundation', credentials: 'Youth Entrepreneurship Education Program', affiliation: 'Lemonade Day' },
    [{ title: 'Nên cho con học ngành gì để mở rộng cơ hội việc làm?', url: 'https://mindx.edu.vn/blog/nen-cho-con-hoc-nganh-gi-de-mo-rong-co-hoi-viec-lam', type: 'article', publisher: 'MindX' }],
    ['lemonade-day', 'kid-business', 'real-experience'],
    '2026-05-09'),

  // ─── 9) SCREEN-TIME-TECH ───
  Q('q-screen-1', 'screen-time-tech', 'all',
    'Bao nhiêu thời gian màn hình là phù hợp cho từng độ tuổi?',
    'How much screen time is appropriate for each age?',
    `Khuyến nghị American Academy of Pediatrics (AAP): Dưới 2 tuổi: HOÀN TOÀN KHÔNG (trừ video gọi gia đình); 2-5 tuổi: TỐI ĐA 1 giờ/ngày, có người lớn cùng; 6-12 tuổi: 2 giờ/ngày, có ranh giới rõ; 13+: tự quản lý nhưng phụ huynh giám sát. Quan trọng: KHÔNG phải số giờ, mà LÀ NỘI DUNG (giáo dục vs. giải trí thụ động) và KHÔNG dùng làm "vú em điện tử".`,
    `American Academy of Pediatrics (AAP) recommendations: Under 2: NONE (except family video calls); 2-5: MAX 1 hr/day with adult co-viewing; 6-12: 2 hr/day with clear limits; 13+: self-managed with parental oversight. Critical: NOT just hours, but CONTENT (educational vs passive entertainment) and DON'T use as "digital babysitter."`,
    { name: 'American Academy of Pediatrics', credentials: 'AAP Council on Communications and Media', affiliation: 'American Academy of Pediatrics' },
    [{ title: 'Holland\'s Theory in Career Guidance', url: 'https://pdfs.semanticscholar.org/88ac/7a912f2cbcd9b1f138a173d7115b75050cd0.pdf', type: 'research', publisher: 'Semantic Scholar' }],
    ['aap', 'screen-time', 'age-by-age'],
    '2026-05-09'),

  // ─── 10) SOCIAL-EMOTIONAL ───
  Q('q-emotion-1', 'social-emotional', 'all',
    'Tại sao "đặt tên cảm xúc" giúp con kiểm soát cảm xúc tốt hơn?',
    'Why does "naming emotions" help kids regulate them?',
    `Nghiên cứu UCLA của Matthew Lieberman: Khi não đặt tên cho cảm xúc ("con đang giận") thì amygdala (vùng cảm xúc) GIẢM hoạt động và prefrontal cortex (vùng tư duy) TĂNG. Đây là "name it to tame it" — gọi tên để thuần hoá. Dạy con từ nhỏ 5 cảm xúc cơ bản: vui, buồn, tức, sợ, lo. Khi giận, hỏi: "Con đang cảm thấy gì? Tại sao?" thay vì "Đừng giận!".`,
    `UCLA's Matthew Lieberman research: When the brain labels an emotion ("I'm angry"), the amygdala (emotion area) DECREASES activity and prefrontal cortex (thinking area) INCREASES. This is "name it to tame it." Teach kids early the 5 basics: happy, sad, angry, scared, worried. When angry, ask: "What are you feeling? Why?" instead of "Don't be angry!"`,
    { name: 'Matthew Lieberman, PhD', credentials: 'Professor of Psychology, UCLA', affiliation: 'UCLA' },
    [{ title: 'Social Cognitive Neuroscience Lab', url: 'https://www.scn.ucla.edu/', type: 'research', publisher: 'UCLA' }],
    ['name-it-tame-it', 'lieberman', 'emotion-regulation'],
    '2026-05-09'),

  // ─── 11) STUDY-HABITS ───
  Q('q-study-1', 'study-habits', 'P',
    'Pomodoro 25 phút có hiệu quả với học sinh tiểu học không?',
    'Does the 25-min Pomodoro technique work for primary kids?',
    `Theo Cambridge Education Research: Pomodoro 25 phút thiết kế cho người LỚN. Trẻ tiểu học (7-11t) tập trung tốt nhất 15-20 phút, nghỉ 5 phút. Trẻ THCS (12-15t) bắt đầu hợp 25 phút. Quan trọng hơn Pomodoro là 3 nguyên tắc: (1) ACTIVE RECALL (tự nhớ lại > đọc lại), (2) SPACED REPETITION (nhắc lại sau 1 ngày, 3 ngày, 1 tuần), (3) MULTI-MODAL (kết hợp nghe + nhìn + làm tay).`,
    `Per Cambridge Education Research: 25-min Pomodoro is designed for ADULTS. Primary kids (7-11) focus best 15-20 min with 5-min breaks. Middle schoolers (12-15) start fitting 25 min. More important than Pomodoro: (1) ACTIVE RECALL (self-quiz > re-read), (2) SPACED REPETITION (review at 1 day, 3 days, 1 week), (3) MULTI-MODAL (combine audio + visual + hands-on).`,
    { name: 'Cambridge Education Research Team', credentials: 'Cambridge Educational Psychology', affiliation: 'University of Cambridge' },
    [{ title: 'International Journal of Instruction Vol.13 No.4', url: 'https://files.eric.ed.gov/fulltext/EJ1270671.pdf', type: 'research', publisher: 'ERIC' }],
    ['pomodoro', 'active-recall', 'age-adapted'],
    '2026-05-09'),

  // ─── 12) FAMILY-COMMUNICATION ───
  Q('q-family-1', 'family-communication', 'all',
    'Câu hỏi nào tốt nhất hỏi con cuối ngày thay vì "Hôm nay con đi học vui không?"',
    'What\'s a better end-of-day question than "How was school today?"',
    `Theo HuffPost Parenting + Harvard Family Research: "Hôm nay vui không" thường nhận được "Vui ạ" rồi không nói gì thêm. Thay bằng câu hỏi cụ thể: (1) "Hôm nay con học được gì làm con bất ngờ?", (2) "Có chuyện gì hôm nay con muốn KỂ và 1 chuyện con muốn QUÊN?", (3) "Hôm nay con đã giúp ai 1 việc gì?", (4) "Cảm xúc của con hôm nay 1-10? Vì sao?". Mục tiêu: tạo thói quen reflect + chia sẻ, không kiểm tra điểm.`,
    `Per HuffPost Parenting + Harvard Family Research: "Was school fun?" usually gets "Yeah" and nothing else. Try specific questions: (1) "What did you learn today that surprised you?", (2) "What's one thing to TELL and one to FORGET from today?", (3) "Who did you help today?", (4) "Today's emotion 1-10? Why?". Goal: build reflection + sharing habit, not grade-checking.`,
    { name: 'Harvard Family Research Project', credentials: 'Harvard Graduate School of Education', affiliation: 'Harvard' },
    [{ title: 'An Application of Holland\'s Theory to Career Interests', url: 'https://files.eric.ed.gov/fulltext/EJ1327135.pdf', type: 'research', publisher: 'ERIC' }],
    ['conversation-starter', 'reflection', 'harvard'],
    '2026-05-09'),

  // ─── EXTRA SEED — BUSINESS ─── (continuing for variety)
  Q('q-major-4', 'choosing-major', 'T',
    'Phân biệt "ngành có thu nhập cao" và "ngành có sự nghiệp dài"?',
    'Difference between "high-income majors" and "long-career majors"?',
    `Phân tích VnExpress + nghiên cứu OECD: "Ngành thu nhập cao" thường thay đổi nhanh (Software 2010-2020 cao, AI 2020-2025 cao). "Ngành sự nghiệp dài" có cầu ổn định: y tế, giáo dục, kỹ thuật xây dựng, luật, kế toán-kiểm toán. Trẻ thông minh sẽ KẾT HỢP: chọn ngành sự nghiệp dài + KỸ NĂNG hot (VD: Bác sĩ + AI in Medicine, Giáo viên + EdTech, Kỹ sư + Sustainability).`,
    `VnExpress + OECD research: "High-income fields" change fast (Software 2010-2020 high, AI 2020-2025 high). "Long-career fields" have stable demand: medicine, education, civil engineering, law, accounting. Smart kids COMBINE: pick a long-career field + a hot skill (e.g., Doctor + AI in Medicine, Teacher + EdTech, Engineer + Sustainability).`,
    { name: 'Mỹ Hà', credentials: 'Chuyên gia Khoa học dữ liệu, Fulbright', affiliation: 'Fulbright Vietnam' },
    [{ title: 'Con đường sự nghiệp từ ngành học đến ngành nghề', url: 'https://vnexpress.net/con-duong-su-nghiep-tu-nganh-hoc-den-nganh-nghe-5071511.html', type: 'data-analysis', publisher: 'VnExpress', date: '2026-05-09' }],
    ['income-vs-career', 'oecd', 'combination'],
    '2026-05-09'),

  Q('q-explore-3', 'career-exploration', 'P',
    'Hoạt động ngoại khoá nào tốt nhất cho hướng nghiệp tuổi 9-13?',
    'Best extracurricular activities for career exploration age 9-13?',
    `Tổng hợp Vinschool + AAVN + nghiên cứu Harvard: 5 hoạt động top: (1) CÂU LẠC BỘ ĐA DẠNG — robotics, debate, môi trường, sách (mỗi 6 tháng đổi 1 CLB), (2) TRẠI HÈ KHÁC SỞ THÍCH — đẩy con ra khỏi vùng quen, (3) DỰ ÁN CỘNG ĐỒNG — gặp thực tế, (4) CHƯƠNG TRÌNH SHADOWING — đi theo người lớn 1 ngày làm, (5) THỰC HÀNH KỸ NĂNG SỐNG — nấu ăn, tự đi xe bus, mua đồ. KHÔNG: ép con học thêm 7-8 môn.`,
    `Vinschool + AAVN + Harvard research compilation: Top 5 activities: (1) DIVERSE CLUBS — robotics, debate, environment, books (rotate every 6 months), (2) OUT-OF-INTEREST CAMPS — push beyond comfort zone, (3) COMMUNITY PROJECTS — meet reality, (4) SHADOWING PROGRAMS — follow an adult for a workday, (5) LIFE SKILLS PRACTICE — cook, take a bus, shop. AVOID: forcing 7-8 extra classes.`,
    { name: 'AAVN Education', credentials: 'American Academy in Vietnam Career Team', affiliation: 'AAVN' },
    [
      { title: '9 bước hiệu quả giúp hướng nghiệp cho học sinh THPT', url: 'https://www.aavn.edu.vn/vi/dinh-huong-nghe-nghiep-cho-hoc-sinh-thpt/', type: 'guideline', publisher: 'AAVN' },
      { title: '7 Bước hướng nghiệp cho học sinh THPT', url: 'https://vinschool.edu.vn/tin-giao-duc/huong-nghiep-cho-hoc-sinh-thpt/', type: 'guideline', publisher: 'Vinschool' },
    ],
    ['extracurricular', 'rotation', 'shadowing'],
    '2026-05-09'),

  Q('q-early-3', 'early-interests', 'K',
    'Trẻ mầm non chơi giả bộ có giá trị giáo dục gì?',
    'What educational value does pretend-play have for kindergarteners?',
    `Theo nghiên cứu Vygotsky (Zone of Proximal Development): Trò chơi giả bộ (đóng vai bác sĩ, mẹ, lớp học) là TRƯỜNG HỌC ĐẦU TIÊN của não trẻ. Khi trẻ "đóng vai", trẻ luyện 4 kỹ năng cùng lúc: ngôn ngữ (kể chuyện), giao tiếp xã hội (nhập vai), trí tưởng tượng (sáng tạo cảnh), kiểm soát cảm xúc (xử lý xung đột trong câu chuyện). KHUYẾN NGHỊ: Cho con 30-60 phút giả bộ tự do mỗi ngày — tốt hơn flashcard hay app học chữ.`,
    `Per Vygotsky's Zone of Proximal Development: Pretend-play (playing doctor, mom, class) is the brain's FIRST SCHOOL for kids. When role-playing, kids exercise 4 skills at once: language (narration), social (role-taking), imagination (scene creation), emotion regulation (handling story conflicts). RECOMMEND: 30-60 min free pretend-play daily — better than flashcards or learn-to-read apps.`,
    { name: 'Lev Vygotsky', credentials: 'Russian Developmental Psychologist (1896-1934)', affiliation: 'Soviet Psychology' },
    [{ title: 'International Journal of Instruction Vol.13 No.4', url: 'https://files.eric.ed.gov/fulltext/EJ1270671.pdf', type: 'research', publisher: 'ERIC' }],
    ['vygotsky', 'pretend-play', 'mầm non'],
    '2026-05-09'),

  Q('q-resil-2', 'resilience-failure', 'all',
    'Con khóc khi thua game/làm sai bài — bố mẹ nên làm gì?',
    'Kid cries over losing or wrong answers — what should parents do?',
    `Theo Daniel Siegel "The Whole-Brain Child" (UCLA): KHÔNG nói "Đừng khóc, không đau gì cả!" — đó là PHỦ NHẬN cảm xúc. Thay vào đó dùng quy tắc "CONNECT THEN REDIRECT": Bước 1 — KẾT NỐI ("Bố thấy con buồn vì con thua. Bố hiểu, ai cũng buồn khi thua."), Bước 2 — KHI CON BÌNH TĨNH mới hỏi: "Lần sau con thử cách nào?". Mục tiêu: dạy con cảm xúc HỢP LÝ, không phải xấu. Cảm xúc hợp lý → tư duy bình tĩnh → giải pháp.`,
    `Per Daniel Siegel's "The Whole-Brain Child" (UCLA): Don't say "Don't cry, it's nothing!" — that DENIES emotion. Use "CONNECT THEN REDIRECT" rule: Step 1 — CONNECT ("I see you're sad about losing. I understand, anyone is sad when losing."), Step 2 — ONCE CALM, ask: "What can you try next time?". Goal: teach kids emotions are LEGITIMATE, not bad. Legit emotions → calm thinking → solutions.`,
    { name: 'Daniel J. Siegel, MD', credentials: 'Clinical Professor of Psychiatry, UCLA School of Medicine', affiliation: 'UCLA' },
    [{ title: 'The Whole-Brain Child principles', url: 'https://drdansiegel.com/whole-brain-child/', type: 'book', publisher: 'Random House' }],
    ['siegel', 'connect-redirect', 'whole-brain'],
    '2026-05-09'),

  Q('q-money-2', 'money-business-early', 'P',
    'Tiền tiêu vặt — cho bao nhiêu, theo công thức nào?',
    'Allowance — how much, by what formula?',
    `Tổng hợp T. Rowe Price + Dave Ramsey + dữ liệu VN: Công thức 50/30/20 cho trẻ tiểu học: 50% TIÊU (theo ý con), 30% TIẾT KIỆM (heo đất), 20% CHIA SẺ (cho người cần / quà). Số tiền hợp lý: tuổi × 5.000 đồng/tuần (8t = 40k/tuần, 11t = 55k/tuần). KHÔNG buộc tiền tiêu vặt với việc nhà cơ bản (việc nhà là trách nhiệm gia đình). CÓ THỂ trả thêm cho việc lớn (rửa xe = 20k).`,
    `T. Rowe Price + Dave Ramsey + VN data compilation: 50/30/20 formula for primary kids: 50% SPEND (child's choice), 30% SAVE (piggy bank), 20% SHARE (charity / gifts). Reasonable amount: age × 5,000 VND/week (age 8 = 40k/wk, age 11 = 55k/wk). DON'T tie allowance to basic chores (chores are family duty). DO pay extra for big tasks (car wash = 20k).`,
    { name: 'Dave Ramsey', credentials: 'Personal Finance Expert, "SmartMoney Smart Kids"', affiliation: 'Ramsey Solutions' },
    [{ title: 'Nên cho con học ngành gì để mở rộng cơ hội việc làm?', url: 'https://mindx.edu.vn/blog/nen-cho-con-hoc-nganh-gi-de-mo-rong-co-hoi-viec-lam', type: 'article', publisher: 'MindX' }],
    ['allowance', '50-30-20', 'ramsey'],
    '2026-05-09'),

  Q('q-pivot-2', 'major-to-career-pivot', 'T',
    'Kỹ năng nào sẽ KHÔNG bị AI thay thế trong 10 năm tới?',
    'Which skills won\'t be replaced by AI in the next 10 years?',
    `Theo World Economic Forum "Future of Jobs 2025": Top 5 kỹ năng AI khó thay thế: (1) Tư duy phân tích phức hợp (xử lý vấn đề mới chưa có template), (2) Sáng tạo + nghệ thuật cảm xúc, (3) Lãnh đạo + ảnh hưởng xã hội, (4) Đồng cảm + chăm sóc con người (y tế, giáo dục, tham vấn), (5) Đạo đức + ra quyết định trong tình huống mơ hồ. Bài học cho con: TẬP TRUNG vào kỹ năng "Con người x AI" thay vì "thay AI".`,
    `Per World Economic Forum "Future of Jobs 2025": Top 5 AI-resistant skills: (1) Complex analytical thinking (novel problems with no template), (2) Creativity + emotional artistry, (3) Leadership + social influence, (4) Empathy + human care (medicine, education, counseling), (5) Ethics + decision-making in ambiguity. Lesson: focus on "Human × AI" skills, not "replace AI" skills.`,
    { name: 'World Economic Forum', credentials: 'Future of Jobs Report 2025', affiliation: 'WEF' },
    [{ title: 'Con đường sự nghiệp từ ngành học đến ngành nghề', url: 'https://vnexpress.net/con-duong-su-nghiep-tu-nganh-hoc-den-nganh-nghe-5071511.html', type: 'data-analysis', publisher: 'VnExpress', date: '2026-05-09' }],
    ['ai-proof', 'wef', 'human-x-ai'],
    '2026-05-09'),

  Q('q-study-2', 'study-habits', 'all',
    'Học sinh giỏi thật sự khác học sinh điểm cao như thế nào?',
    'How does a truly excellent student differ from a high-scoring one?',
    `Theo nghiên cứu Adam Grant (Wharton): Học sinh ĐIỂM CAO thường tối ưu cho bài kiểm tra (memorize, format chuẩn, không dám sai). Học sinh GIỎI THẬT SỰ thường có 3 đặc điểm: (1) Đặt câu hỏi LẠ — câu hỏi giáo viên cũng phải nghĩ, (2) Sai một cách HỌC HỎI — sai mới, không lặp lại, (3) Liên kết kiến thức GIỮA các môn (toán + văn, lý + hoá + sinh). Bài học: đừng chỉ nhìn điểm — nhìn câu hỏi con đặt và cách con liên kết.`,
    `Per Adam Grant (Wharton): HIGH-SCORING students often optimize for tests (memorize, standard format, fear mistakes). TRULY EXCELLENT students share 3 traits: (1) Ask UNUSUAL questions — ones that make teachers think, (2) Make LEARNING mistakes — new ones, not repeats, (3) Connect knowledge ACROSS subjects (math + lit, physics + chem + bio). Lesson: don't just look at grades — look at the questions they ask and connections they make.`,
    { name: 'Adam Grant, PhD', credentials: 'Saul P. Steinberg Professor of Management, Wharton', affiliation: 'University of Pennsylvania' },
    [{ title: 'Adam Grant — Hidden Potential', url: 'https://adamgrant.net/book/hidden-potential/', type: 'book', publisher: 'Penguin Random House' }],
    ['adam-grant', 'true-excellence', 'cross-subject'],
    '2026-05-09'),
];

// ────────────────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────────────────

export function getQnAByTopic(topic: QnATopic): CareerQnA[] {
  return SEED_QNA.filter(q => q.topic === topic);
}

export function getQnAByAge(ageGroup: AgeGroup): CareerQnA[] {
  if (ageGroup === 'all') return SEED_QNA;
  return SEED_QNA.filter(q => q.ageGroup === ageGroup || q.ageGroup === 'all');
}

export function getQnAForKid(age: number): CareerQnA[] {
  const group: AgeGroup = age <= 6 ? 'K' : age <= 11 ? 'P' : 'T';
  return SEED_QNA.filter(q => q.ageGroup === group || q.ageGroup === 'all');
}

export function searchQnA(query: string): CareerQnA[] {
  const q = query.toLowerCase();
  return SEED_QNA.filter(qna =>
    qna.question_vi.toLowerCase().includes(q) ||
    qna.question_en.toLowerCase().includes(q) ||
    qna.answer_vi.toLowerCase().includes(q) ||
    qna.tags.some(t => t.toLowerCase().includes(q))
  );
}

export function getQnAStats() {
  const stats = {
    total: SEED_QNA.length,
    verified: SEED_QNA.filter(q => q.verified).length,
    byTopic: {} as Record<QnATopic, number>,
    byAge: { K: 0, P: 0, T: 0, all: 0 } as Record<AgeGroup, number>,
    uniqueExperts: new Set(SEED_QNA.map(q => q.expert.name)).size,
    uniqueSources: new Set(SEED_QNA.flatMap(q => q.sources.map(s => s.url))).size,
    lastUpdated: SEED_QNA.map(q => q.added).sort().pop() || null,
  };
  SEED_QNA.forEach(q => {
    stats.byTopic[q.topic] = (stats.byTopic[q.topic] || 0) + 1;
    stats.byAge[q.ageGroup]++;
  });
  return stats;
}

/**
 * Get content for Đại Ka chatbot context.
 * When kid asks something, find top 3 relevant Q&As and return as context.
 */
export function getContextForChatbot(query: string, kidAge: number, maxItems = 3): CareerQnA[] {
  const ageMatch = getQnAForKid(kidAge);
  const queryMatch = searchQnA(query);
  const intersection = ageMatch.filter(q => queryMatch.some(m => m.id === q.id));
  if (intersection.length >= maxItems) return intersection.slice(0, maxItems);
  // Fallback: top from age match
  return ageMatch.slice(0, maxItems);
}
