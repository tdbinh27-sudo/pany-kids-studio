/**
 * @file lib/seed-content.ts
 * @description Sample content (quests + stories + math + curated links) per age 5-16.
 *              Dev test data — used to demo /admin/dashboard + populate new families
 *              with starter content before CTV produces full catalog.
 *
 * @decision D-024 (CTV draft + bố review) — these seeds are FALLBACK only;
 *           real content comes from CTV batches in artifacts/content-drafts/.
 * @reference Companion to lib/age-curriculum.ts (D-028 12-age tracks).
 *
 * Coverage: 2-3 entries per age per content type. Total ~120 sample entries
 *           across 4 content banks × 12 ages × 2-3 entries.
 *
 * USAGE:
 *   import { getSampleContentForAge } from '@/lib/seed-content';
 *   const sample = getSampleContentForAge(11); // → { quests, stories, math, links }
 */

import type { VNGradeLabel } from './age-curriculum';

// ─── Types (compact, deliberately not re-importing full schemas) ──

export type SeedQuest = {
  id: string;
  age: number;
  pillar: 'tech' | 'english' | 'finance' | 'thinking' | 'business' | 'life' | 'creative' | 'movement' | 'discovery' | 'career' | 'family';
  emoji: string;
  estMin: number;
  needsParent: boolean;
  title_vi: string;
  title_en: string;
  desc_vi: string;
  desc_en: string;
};

export type SeedStory = {
  id: string;
  age: number;
  level: 'K' | 'A1' | 'A2' | 'B1' | 'B2';
  title_vi: string;
  title_en: string;
  hook_vi: string;            // first paragraph in VN
  hook_en: string;            // first paragraph in EN
  vocab_count: number;        // estimated count (full content stub)
};

export type SeedMath = {
  id: string;
  age: number;
  level: 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6';
  topic: string;
  question_vi: string;
  question_en: string;
  answer: string | number;
  hint_vi: string;
};

export type SeedLink = {
  id: string;
  age_min: number;
  age_max: number;
  title_vi: string;
  url: string;
  source: string;
  cost: 'free' | 'freemium' | 'paid';
};

// ─── SAMPLE QUESTS (2-3 per age × 12 ages = ~30 entries) ──────────

export const SAMPLE_QUESTS: SeedQuest[] = [
  // Age 5 — mầm non lá
  { id: 'sq-5-creative', age: 5, pillar: 'creative', emoji: '🎨', estMin: 15, needsParent: true,
    title_vi: 'Vẽ tranh gia đình con',  title_en: 'Draw your family',
    desc_vi: 'Vẽ bố, mẹ, anh chị em + ngôi nhà. Khoe khi xong.',
    desc_en: 'Draw mom, dad, siblings + house. Show off when done.' },
  { id: 'sq-5-movement', age: 5, pillar: 'movement', emoji: '🦘', estMin: 10, needsParent: true,
    title_vi: 'Nhảy 20 cái như chú thỏ',  title_en: 'Hop 20 times like a bunny',
    desc_vi: 'Đếm to từ 1 đến 20 trong khi nhảy.',
    desc_en: 'Count aloud 1-20 while hopping.' },

  // Age 6 — lớp 1
  { id: 'sq-6-english', age: 6, pillar: 'english', emoji: '🍎', estMin: 10, needsParent: false,
    title_vi: 'Học 5 từ trái cây tiếng Anh',  title_en: 'Learn 5 fruit words',
    desc_vi: 'Apple, banana, orange, mango, grape. Lặp lại 3 lần mỗi từ.',
    desc_en: 'Apple, banana, orange, mango, grape. Repeat 3× each.' },
  { id: 'sq-6-math', age: 6, pillar: 'thinking', emoji: '🔢', estMin: 15, needsParent: false,
    title_vi: 'Đếm 10 đồ vật trong nhà',  title_en: 'Count 10 objects at home',
    desc_vi: 'Chọn 10 đồ (vd: bút, cốc, sách). Đếm + ghi tên.',
    desc_en: 'Pick 10 items. Count + write names.' },

  // Age 7 — lớp 2
  { id: 'sq-7-life', age: 7, pillar: 'life', emoji: '🧹', estMin: 20, needsParent: false,
    title_vi: 'Dọn dẹp phòng riêng 20 phút',  title_en: 'Tidy your room for 20 min',
    desc_vi: 'Gấp quần áo + xếp sách + lau bàn. Tự đặt timer.',
    desc_en: 'Fold clothes + organize books + wipe desk. Self-time.' },
  { id: 'sq-7-creative', age: 7, pillar: 'creative', emoji: '✂️', estMin: 25, needsParent: true,
    title_vi: 'Làm 1 thiệp sinh nhật origami',  title_en: 'Make a birthday card origami',
    desc_vi: 'Gấp giấy A4 + vẽ + viết lời chúc. Tặng ai đó.',
    desc_en: 'Fold A4 + draw + write wish. Give to someone.' },

  // Age 8 — lớp 3
  { id: 'sq-8-thinking', age: 8, pillar: 'thinking', emoji: '🧠', estMin: 20, needsParent: false,
    title_vi: 'Giải 5 câu đố logic',  title_en: 'Solve 5 logic puzzles',
    desc_vi: 'Trong tab Khám phá → Quiz. Chọn level L2.',
    desc_en: 'In Explore → Quiz tab. Pick level L2.' },
  { id: 'sq-8-finance', age: 8, pillar: 'finance', emoji: '💰', estMin: 15, needsParent: false,
    title_vi: 'Đếm tiền trong heo đất',  title_en: 'Count piggy bank money',
    desc_vi: 'Đổ heo + phân loại 1k/2k/5k/10k. Tổng bao nhiêu?',
    desc_en: 'Empty piggy + sort by note. What is the total?' },

  // Age 9 — lớp 4
  { id: 'sq-9-thinking', age: 9, pillar: 'thinking', emoji: '🔬', estMin: 25, needsParent: false,
    title_vi: 'Thí nghiệm: nổi - chìm',  title_en: 'Experiment: float or sink',
    desc_vi: 'Lấy 10 vật quanh nhà. Đoán nổi/chìm. Thả vào chậu nước. Đúng bao nhiêu?',
    desc_en: 'Get 10 household items. Predict float/sink. Test. Score?' },
  { id: 'sq-9-finance', age: 9, pillar: 'finance', emoji: '🛒', estMin: 20, needsParent: false,
    title_vi: 'Lập kế hoạch mua 5 thứ',  title_en: 'Plan to buy 5 items',
    desc_vi: 'Viết 5 món + giá ước tính + tổng. Đối chiếu khi mua thật.',
    desc_en: 'List 5 items + estimated prices + total. Compare when buying.' },

  // Age 10 — lớp 5
  { id: 'sq-10-career', age: 10, pillar: 'career', emoji: '🧭', estMin: 20, needsParent: false,
    title_vi: 'Làm RIASEC junior 36 câu',  title_en: 'Take RIASEC Junior 36 questions',
    desc_vi: 'Trong tab La bàn nghề → khám phá 6 nhóm sở thích.',
    desc_en: 'In Career Compass tab → discover 6 interest groups.' },
  { id: 'sq-10-english', age: 10, pillar: 'english', emoji: '📖', estMin: 25, needsParent: false,
    title_vi: 'Đọc 1 truyện A2 tiếng Anh',  title_en: 'Read 1 A2-level story',
    desc_vi: 'Tab Khám phá → Thư viện → A2. Ghi 5 từ mới.',
    desc_en: 'Explore → Library → A2. Note 5 new words.' },

  // Age 11 — lớp 6
  { id: 'sq-11-tech', age: 11, pillar: 'tech', emoji: '💻', estMin: 30, needsParent: false,
    title_vi: 'Xem 1 bài Scratch + clone 1 game',  title_en: 'Watch 1 Scratch tutorial + clone 1 game',
    desc_vi: 'scratch.mit.edu → tutorial → clone Pong/Snake. Sửa 1 chi tiết theo ý mình.',
    desc_en: 'scratch.mit.edu → tutorial → clone Pong/Snake. Customize 1 detail.' },
  { id: 'sq-11-thinking', age: 11, pillar: 'thinking', emoji: '⚖️', estMin: 25, needsParent: false,
    title_vi: 'Liệt kê 3 lý do "có"/"không" cho 1 vấn đề',  title_en: 'List 3 pros/cons for a topic',
    desc_vi: 'Vd: "Có nên dùng smartphone trước 12t?". Chọn 1 bên + giải thích.',
    desc_en: 'E.g. "Should kids use smartphones before 12?". Pick a side + reason.' },

  // Age 12 — lớp 7
  { id: 'sq-12-business', age: 12, pillar: 'business', emoji: '📊', estMin: 30, needsParent: false,
    title_vi: 'Tính lợi nhuận quán trà chanh',  title_en: 'Calculate trà chanh stall profit',
    desc_vi: 'Giả sử bán 50 cốc × 10k = 500k. Chi phí: 200k. Lợi nhuận = ? Tỉ lệ %?',
    desc_en: 'Sell 50 cups × 10k = 500k. Cost: 200k. Profit? Margin %?' },
  { id: 'sq-12-english', age: 12, pillar: 'english', emoji: '🎧', estMin: 20, needsParent: false,
    title_vi: 'Nghe 1 BBC Learning English Podcast',  title_en: 'Listen to BBC Learning English Podcast',
    desc_vi: '6 Minute English level intermediate. Ghi 5 từ + 1 idiom.',
    desc_en: '6 Minute English intermediate. Note 5 words + 1 idiom.' },

  // Age 13 — lớp 8
  { id: 'sq-13-career', age: 13, pillar: 'career', emoji: '👔', estMin: 45, needsParent: false,
    title_vi: 'Phỏng vấn 1 người lớn về nghề',  title_en: 'Interview an adult about their job',
    desc_vi: '5 câu: làm gì, học gì để làm, thích/khó, lời khuyên. Ghi notes.',
    desc_en: '5 questions: role, education, likes/challenges, advice. Take notes.' },
  { id: 'sq-13-tech', age: 13, pillar: 'tech', emoji: '🐍', estMin: 40, needsParent: false,
    title_vi: 'Viết script Python đơn giản',  title_en: 'Write a simple Python script',
    desc_vi: 'Chương trình tính BMI (height + weight → BMI + category). Test 3 người.',
    desc_en: 'BMI calculator (height + weight → BMI + category). Test 3 people.' },

  // Age 14 — lớp 9
  { id: 'sq-14-thinking', age: 14, pillar: 'thinking', emoji: '🎓', estMin: 30, needsParent: false,
    title_vi: 'So sánh 3 trường THPT định thi',  title_en: 'Compare 3 high schools to apply',
    desc_vi: 'Bảng so sánh: học phí, ngành mạnh, vị trí, ranking. Chốt thứ tự ưu tiên.',
    desc_en: 'Comparison table: fees, strengths, location, ranking. Rank preferences.' },
  { id: 'sq-14-life', age: 14, pillar: 'life', emoji: '🍳', estMin: 40, needsParent: false,
    title_vi: 'Nấu 1 bữa cơm cho cả nhà',  title_en: 'Cook a meal for the family',
    desc_vi: 'Tự chọn món, mua nguyên liệu (với bố/mẹ), nấu, dọn bàn. Ghi nhận xét.',
    desc_en: 'Pick menu, shop with parent, cook, serve. Note feedback.' },

  // Age 15 — lớp 10
  { id: 'sq-15-finance', age: 15, pillar: 'finance', emoji: '💸', estMin: 30, needsParent: false,
    title_vi: 'Lập budget cá nhân 1 tháng',  title_en: 'Create personal monthly budget',
    desc_vi: 'Chia: ăn vặt, sách, đồ chơi, tiết kiệm. Excel/Google Sheets. So sánh thực tế cuối tháng.',
    desc_en: 'Categories: snacks, books, toys, savings. Sheet. Compare actuals end-month.' },
  { id: 'sq-15-english', age: 15, pillar: 'english', emoji: '🎤', estMin: 25, needsParent: false,
    title_vi: 'Xem 1 TED Talk + tóm tắt 100 từ',  title_en: 'Watch 1 TED Talk + summarize in 100 words',
    desc_vi: 'Chọn TED.com chủ đề mình thích. Viết tóm tắt EN.',
    desc_en: 'Pick from TED.com. Write English summary.' },

  // Age 16 — lớp 11
  { id: 'sq-16-business', age: 16, pillar: 'business', emoji: '📈', estMin: 60, needsParent: false,
    title_vi: 'Mô phỏng đầu tư cổ phiếu 30 ngày',  title_en: 'Simulate stock investing for 30 days',
    desc_vi: 'Pick 3 cổ phiếu VN (vd: VCB/FPT/MWG). Theo dõi giá 30 ngày trên VnDirect. Tính lãi/lỗ.',
    desc_en: 'Pick 3 VN stocks. Track price 30 days on VnDirect. Calculate gain/loss.' },
  { id: 'sq-16-career', age: 16, pillar: 'career', emoji: '🎓', estMin: 90, needsParent: false,
    title_vi: 'Draft 1 personal statement (du học)',  title_en: 'Draft a personal statement (study abroad)',
    desc_vi: '500 từ EN. Tại sao chọn ngành/trường. Show, don\'t tell. Lấy feedback từ bố.',
    desc_en: '500 words EN. Why this field/school. Show, don\'t tell. Get parent feedback.' },
];

// ─── SAMPLE STORIES (1-2 per age × 12 ages = ~18 entries) ─────────

export const SAMPLE_STORIES: SeedStory[] = [
  { id: 'ss-5', age: 5, level: 'K', title_vi: 'Y và quả táo đỏ', title_en: 'Y and the red apple',
    hook_vi: 'Y có một quả táo. Quả táo màu đỏ. Mẹ cho Y quả táo.',
    hook_en: 'Y has an apple. The apple is red. Mom gives Y the apple.',
    vocab_count: 5 },
  { id: 'ss-6', age: 6, level: 'A1', title_vi: 'Bạn Nam đi học', title_en: 'Nam goes to school',
    hook_vi: 'Nam dậy lúc 6 giờ. Nam ăn sáng. Nam đi bộ đến trường.',
    hook_en: 'Nam wakes up at 6 AM. Nam has breakfast. Nam walks to school.',
    vocab_count: 8 },
  { id: 'ss-7', age: 7, level: 'A1', title_vi: 'Con chó tên Lucky', title_en: 'The dog named Lucky',
    hook_vi: 'Lucky là một con chó nhỏ. Lucky có bộ lông trắng và rất thông minh.',
    hook_en: 'Lucky is a small dog. Lucky has white fur and is very smart.',
    vocab_count: 12 },
  { id: 'ss-8', age: 8, level: 'A1', title_vi: 'Chuyến đi rừng',  title_en: 'A trip to the forest',
    hook_vi: 'Cả lớp đi tham quan rừng quốc gia. Có rất nhiều cây cao và chim hót.',
    hook_en: 'The whole class visited a national forest. There were many tall trees and singing birds.',
    vocab_count: 15 },
  { id: 'ss-9', age: 9, level: 'A2', title_vi: 'Bí ẩn cuốn sách cũ',  title_en: 'Mystery of the old book',
    hook_vi: 'Lan tìm thấy một cuốn sách cũ trong gác xép. Bìa sách có ghi: "Đừng mở vào ban đêm."',
    hook_en: 'Lan found an old book in the attic. The cover read: "Do not open at night."',
    vocab_count: 20 },
  { id: 'ss-10', age: 10, level: 'A2', title_vi: 'Cuộc thi khoa học',  title_en: 'The science fair',
    hook_vi: 'Tuấn đã chuẩn bị thí nghiệm núi lửa suốt 2 tuần. Hôm nay là ngày trình bày trước lớp.',
    hook_en: 'Tuan prepared the volcano experiment for 2 weeks. Today was presentation day.',
    vocab_count: 25 },
  { id: 'ss-11', age: 11, level: 'A2', title_vi: 'Người bạn AI',  title_en: 'The AI friend',
    hook_vi: 'Minh không bao giờ nghĩ rằng trợ lý AI có thể trở thành bạn thân. Nhưng Cô Pany khác.',
    hook_en: 'Minh never thought an AI assistant could become a close friend. But Cô Pany was different.',
    vocab_count: 30 },
  { id: 'ss-12', age: 12, level: 'B1', title_vi: 'Hành trình lên Sa Pa',  title_en: 'Journey to Sa Pa',
    hook_vi: 'Tàu rời ga Hà Nội lúc 10 giờ tối. Hùng nhìn ra cửa sổ, thành phố biến mất từ từ.',
    hook_en: 'The train left Hanoi station at 10 PM. Hung looked out as the city slowly disappeared.',
    vocab_count: 35 },
  { id: 'ss-13', age: 13, level: 'B1', title_vi: 'Quyết định khó khăn',  title_en: 'A difficult decision',
    hook_vi: 'An phải chọn giữa hai trường: ngôi trường gần nhà với bạn cũ, hay trường chuyên xa và mới.',
    hook_en: 'An had to choose between two schools: the local one with old friends, or a specialized far school.',
    vocab_count: 40 },
  { id: 'ss-14', age: 14, level: 'B1', title_vi: 'Mạng xã hội',  title_en: 'Social media',
    hook_vi: 'Linh dành 6 tiếng mỗi ngày trên TikTok. Bố mẹ lo lắng nhưng Linh nghĩ mình ổn.',
    hook_en: 'Linh spent 6 hours daily on TikTok. Parents worried but Linh thought she was fine.',
    vocab_count: 45 },
  { id: 'ss-15', age: 15, level: 'B2', title_vi: 'Khởi nghiệp tuổi 15',  title_en: 'Startup at 15',
    hook_vi: 'Đức không có bằng cấp. Đức không có vốn. Nhưng Đức có một ý tưởng và 6 tháng mùa hè.',
    hook_en: 'Duc had no degree. Duc had no capital. But Duc had an idea and 6 summer months.',
    vocab_count: 55 },
  { id: 'ss-16', age: 16, level: 'B2', title_vi: 'Du học hay ở lại',  title_en: 'Study abroad or stay',
    hook_vi: 'Trang nhận học bổng đi Mỹ. Bà ngoại ốm. Bố mẹ nói "tùy con". Nhưng Trang biết không có quyết định nào dễ.',
    hook_en: 'Trang received a US scholarship. Grandma was sick. Parents said "up to you". But Trang knew no choice was easy.',
    vocab_count: 60 },
];

// ─── SAMPLE MATH (1-2 per age × 12 ages = ~18 entries) ─────────────

export const SAMPLE_MATH: SeedMath[] = [
  { id: 'sm-5', age: 5, level: 'L1', topic: 'count',
    question_vi: 'Có 3 quả táo và 4 quả cam. Tổng có bao nhiêu quả?',
    question_en: 'There are 3 apples and 4 oranges. How many fruits in total?',
    answer: 7, hint_vi: 'Đếm tất cả: táo + cam.' },
  { id: 'sm-6', age: 6, level: 'L1', topic: 'add',
    question_vi: 'Lan có 7 cây bút chì. Mẹ cho thêm 5 cây. Lan có bao nhiêu cây?',
    question_en: 'Lan has 7 pencils. Mom gives 5 more. How many?',
    answer: 12, hint_vi: '7 + 5 = ? Đếm trên ngón tay từ 7.' },
  { id: 'sm-7', age: 7, level: 'L1', topic: 'mul-intro',
    question_vi: 'Có 5 đĩa, mỗi đĩa có 3 cái bánh. Tổng bao nhiêu bánh?',
    question_en: '5 plates with 3 cookies each. Total cookies?',
    answer: 15, hint_vi: '5 × 3 hoặc 3+3+3+3+3.' },
  { id: 'sm-8', age: 8, level: 'L2', topic: 'mul',
    question_vi: 'Một hộp có 6 cây bút. Mua 7 hộp thì có bao nhiêu bút?',
    question_en: '6 pens per box. 7 boxes = how many pens?',
    answer: 42, hint_vi: 'Đây là 6 × 7. Nhớ bảng nhân 6.' },
  { id: 'sm-9', age: 9, level: 'L2', topic: 'div',
    question_vi: 'Chia 48 viên kẹo cho 6 bạn. Mỗi bạn được bao nhiêu?',
    question_en: 'Share 48 candies among 6 kids. How many each?',
    answer: 8, hint_vi: '48 ÷ 6. Phép chia ngược của 6 × 8.' },
  { id: 'sm-10', age: 10, level: 'L2', topic: 'fraction',
    question_vi: '1/4 của 80 là bao nhiêu?',
    question_en: 'What is 1/4 of 80?',
    answer: 20, hint_vi: '1/4 = chia thành 4 phần bằng nhau.' },
  { id: 'sm-11', age: 11, level: 'L3', topic: 'percent',
    question_vi: 'Lớp 6A có 40 học sinh, 25% là nữ. Hỏi lớp có bao nhiêu nữ?',
    question_en: 'Class of 40, 25% are girls. How many girls?',
    answer: 10, hint_vi: '25% = 1/4. 40 chia 4 = ?' },
  { id: 'sm-12', age: 12, level: 'L4', topic: 'algebra',
    question_vi: 'Giải: 3x + 7 = 22',
    question_en: 'Solve: 3x + 7 = 22',
    answer: 5, hint_vi: 'Chuyển 7 sang phải, đổi dấu. Rồi chia 3.' },
  { id: 'sm-13', age: 13, level: 'L5', topic: 'pythagoras',
    question_vi: 'Tam giác vuông có 2 cạnh góc vuông 6 và 8. Tính cạnh huyền.',
    question_en: 'Right triangle, legs 6 and 8. Find hypotenuse.',
    answer: 10, hint_vi: 'a² + b² = c². Tính c.' },
  { id: 'sm-14', age: 14, level: 'L5', topic: 'system-equations',
    question_vi: 'Giải hệ: x + y = 10 và x - y = 4',
    question_en: 'Solve: x + y = 10 and x - y = 4',
    answer: 'x=7, y=3', hint_vi: 'Cộng 2 phương trình → 2x = ?' },
  { id: 'sm-15', age: 15, level: 'L6', topic: 'quadratic',
    question_vi: 'Giải phương trình: x² - 5x + 6 = 0',
    question_en: 'Solve: x² - 5x + 6 = 0',
    answer: 'x=2 or x=3', hint_vi: 'Phân tích (x-?)(x-?) = 0 hoặc dùng định lý Vi-et.' },
  { id: 'sm-16', age: 16, level: 'L6', topic: 'derivative',
    question_vi: 'Tính đạo hàm: f(x) = 3x² + 2x - 5',
    question_en: 'Find derivative: f(x) = 3x² + 2x - 5',
    answer: '6x + 2', hint_vi: 'Đạo hàm xn = n·xn-1. Hằng số = 0.' },
];

// ─── SAMPLE CURATED LINKS (1-2 per age band) ───────────────────────

export const SAMPLE_LINKS: SeedLink[] = [
  { id: 'sl-khanjr', age_min: 5, age_max: 8,
    title_vi: 'Khan Academy Kids — học toán + đọc miễn phí',
    url: 'https://learn.khanacademy.org/khan-academy-kids/',
    source: 'Khan Academy', cost: 'free' },
  { id: 'sl-britishkids', age_min: 6, age_max: 12,
    title_vi: 'British Council Learn English Kids — game + truyện EN',
    url: 'https://learnenglishkids.britishcouncil.org/',
    source: 'British Council', cost: 'free' },
  { id: 'sl-scratch', age_min: 8, age_max: 14,
    title_vi: 'Scratch (MIT) — học lập trình block-based',
    url: 'https://scratch.mit.edu/',
    source: 'MIT', cost: 'free' },
  { id: 'sl-khan-prealg', age_min: 10, age_max: 13,
    title_vi: 'Khan Academy Pre-Algebra — chuẩn bị lớp 6-7',
    url: 'https://www.khanacademy.org/math/pre-algebra',
    source: 'Khan Academy', cost: 'free' },
  { id: 'sl-aops', age_min: 11, age_max: 16,
    title_vi: 'Art of Problem Solving — toán olympic',
    url: 'https://artofproblemsolving.com/',
    source: 'AoPS', cost: 'freemium' },
  { id: 'sl-ted-ed', age_min: 9, age_max: 16,
    title_vi: 'TED-Ed — bài giảng animated 5 phút',
    url: 'https://ed.ted.com/',
    source: 'TED', cost: 'free' },
  { id: 'sl-britishteens', age_min: 13, age_max: 16,
    title_vi: 'British Council LearnEnglish Teens — chuẩn IELTS',
    url: 'https://learnenglishteens.britishcouncil.org/',
    source: 'British Council', cost: 'free' },
  { id: 'sl-mit-ocw-hs', age_min: 15, age_max: 16,
    title_vi: 'MIT OpenCourseWare High School — toán + lý + hóa cấp ĐH',
    url: 'https://ocw.mit.edu/courses/highschool/',
    source: 'MIT', cost: 'free' },
  { id: 'sl-khan-finance', age_min: 14, age_max: 16,
    title_vi: 'Khan Academy Personal Finance — đầu tư + thuế cơ bản',
    url: 'https://www.khanacademy.org/college-careers-more/personal-finance',
    source: 'Khan Academy', cost: 'free' },
  { id: 'sl-coursera-career', age_min: 16, age_max: 16,
    title_vi: 'Coursera English for Career Development (free audit)',
    url: 'https://www.coursera.org/learn/careerdevelopment',
    source: 'Coursera', cost: 'freemium' },
];

// ─── Helpers ───────────────────────────────────────────────────────

export function getSampleContentForAge(age: number): {
  quests: SeedQuest[];
  stories: SeedStory[];
  math: SeedMath[];
  links: SeedLink[];
} {
  return {
    quests: SAMPLE_QUESTS.filter(q => q.age === age),
    stories: SAMPLE_STORIES.filter(s => s.age === age),
    math: SAMPLE_MATH.filter(m => m.age === age),
    links: SAMPLE_LINKS.filter(l => age >= l.age_min && age <= l.age_max),
  };
}

export function getSeedStats() {
  return {
    quests: SAMPLE_QUESTS.length,
    stories: SAMPLE_STORIES.length,
    math: SAMPLE_MATH.length,
    links: SAMPLE_LINKS.length,
    ages_covered_quests: new Set(SAMPLE_QUESTS.map(q => q.age)).size,
    ages_covered_stories: new Set(SAMPLE_STORIES.map(s => s.age)).size,
    ages_covered_math: new Set(SAMPLE_MATH.map(m => m.age)).size,
  };
}

// Re-export grade type for downstream users
export type { VNGradeLabel };
