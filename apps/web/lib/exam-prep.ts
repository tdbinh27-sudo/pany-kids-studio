// English exam-prep / mock-test content bank — "Luyện thi" mode
// Modeled on the real Cambridge Young Learners progression (Pre-A1 Starters →
// A1 Movers → A2 Flyers → B1 KET) so a kid's score maps to an actual external
// benchmark, not just an in-app number. Vocabulary themes follow the official
// YLE topic list (animals, body, clothes, colours, family, food, health, home,
// school, sports, time, toys, transport, weather — see ozbonus/yle-vocabulary-dataset,
// CC-BY-SA-4.0, github.com/ozbonus/yle-vocabulary-dataset) as the organizing
// principle; all questions below are original, hand-written for this app.
//
// CEFR levels reuse the same K/A1/A2/B1 scale as english-skills.ts.

import type { CEFRLevel } from './english-skills';

export type ExamQuestionType = 'vocab' | 'grammar' | 'reading';

export interface ExamQuestion {
  type: ExamQuestionType;
  passage?: string; // only present for type: 'reading'
  q: string;
  options: string[];
  correctIdx: number;
  explanation_vi: string;
}

export interface ExamPrepSet {
  level: CEFRLevel;
  certName: string;
  certName_vi: string;
  emoji: string;
  color: string; // hex, matches C.* palette used elsewhere
  questions: ExamQuestion[];
}

export const EXAM_PREP: Record<CEFRLevel, ExamPrepSet> = {
  K: {
    level: 'K',
    certName: 'Pre-A1 Starters (warm-up)',
    certName_vi: 'Khởi động — tiền đề Starters',
    emoji: '🐣',
    color: '#FF6B9D',
    questions: [
      { type: 'vocab', q: 'Which word means "con mèo"?', options: ['Dog', 'Cat', 'Fish', 'Bird'], correctIdx: 1, explanation_vi: '"Cat" = con mèo.' },
      { type: 'vocab', q: 'The sun ☀️ is what color?', options: ['Blue', 'Black', 'Yellow', 'Green'], correctIdx: 2, explanation_vi: 'Mặt trời màu vàng — "yellow".' },
      { type: 'vocab', q: 'I have four legs and I say "moo". What am I?', options: ['Cat', 'Cow', 'Duck', 'Bird'], correctIdx: 1, explanation_vi: '"Cow" (con bò) kêu "moo".' },
      { type: 'vocab', q: 'Which one can you eat?', options: ['Apple', 'Chair', 'Book', 'Ball'], correctIdx: 0, explanation_vi: '"Apple" (quả táo) ăn được, các từ khác thì không.' },
      { type: 'reading', passage: 'This is Tom. Tom is five. Tom has a red ball. Tom likes to play.', q: 'How old is Tom?', options: ['Four', 'Five', 'Six', 'Seven'], correctIdx: 1, explanation_vi: 'Đoạn văn nói "Tom is five" — Tom năm tuổi.' },
      { type: 'reading', passage: 'This is Tom. Tom is five. Tom has a red ball. Tom likes to play.', q: 'What color is Tom\'s ball?', options: ['Red', 'Blue', 'Green', 'Yellow'], correctIdx: 0, explanation_vi: 'Đoạn văn nói "a red ball" — quả bóng màu đỏ.' },
    ],
  },
  A1: {
    level: 'A1',
    certName: 'Cambridge Pre-A1 Starters',
    certName_vi: 'Cambridge Starters',
    emoji: '⭐',
    color: '#4ECDC4',
    questions: [
      { type: 'vocab', q: 'Which word means "cái bàn"?', options: ['Chair', 'Table', 'Door', 'Window'], correctIdx: 1, explanation_vi: '"Table" = cái bàn.' },
      { type: 'vocab', q: 'What do you wear on your feet?', options: ['Hat', 'Shoes', 'Gloves', 'Scarf'], correctIdx: 1, explanation_vi: '"Shoes" (giày) mang ở chân.' },
      { type: 'vocab', q: 'Which is a fruit?', options: ['Carrot', 'Banana', 'Potato', 'Bread'], correctIdx: 1, explanation_vi: '"Banana" (chuối) là trái cây.' },
      { type: 'grammar', q: 'She ___ a teacher.', options: ['am', 'is', 'are', 'be'], correctIdx: 1, explanation_vi: 'Chủ ngữ "She" (số ít) đi với "is".' },
      { type: 'grammar', q: 'I have two ___.', options: ['dog', 'dogs', 'doges', 'dogss'], correctIdx: 1, explanation_vi: 'Số nhiều của "dog" là "dogs" (thêm -s).' },
      { type: 'grammar', q: 'They ___ happy today.', options: ['is', 'am', 'are', 'be'], correctIdx: 2, explanation_vi: 'Chủ ngữ "They" (số nhiều) đi với "are".' },
      { type: 'reading', passage: 'My name is Lan. I am eight. I have a small dog. My dog is black and white. I play with my dog every day.', q: 'How old is Lan?', options: ['Seven', 'Eight', 'Nine', 'Ten'], correctIdx: 1, explanation_vi: '"I am eight" — Lan tám tuổi.' },
      { type: 'reading', passage: 'My name is Lan. I am eight. I have a small dog. My dog is black and white. I play with my dog every day.', q: 'What color is Lan\'s dog?', options: ['Brown', 'White only', 'Black and white', 'Black only'], correctIdx: 2, explanation_vi: '"My dog is black and white" — chó của Lan màu đen và trắng.' },
    ],
  },
  A2: {
    level: 'A2',
    certName: 'Cambridge A1 Movers / A2 Flyers',
    certName_vi: 'Cambridge Movers / Flyers',
    emoji: '🏅',
    color: '#845EC2',
    questions: [
      { type: 'vocab', q: 'Which word means "bệnh viện"?', options: ['Hospital', 'School', 'Library', 'Airport'], correctIdx: 0, explanation_vi: '"Hospital" = bệnh viện.' },
      { type: 'vocab', q: 'Which sport uses a racket?', options: ['Football', 'Swimming', 'Tennis', 'Running'], correctIdx: 2, explanation_vi: '"Tennis" (quần vợt) dùng vợt (racket).' },
      { type: 'grammar', q: 'Yesterday, I ___ to the zoo.', options: ['go', 'went', 'goes', 'going'], correctIdx: 1, explanation_vi: 'Thì quá khứ đơn của "go" là "went" — dùng cho "yesterday".' },
      { type: 'grammar', q: 'An elephant is ___ than a mouse.', options: ['big', 'bigger', 'biggest', 'more big'], correctIdx: 1, explanation_vi: 'So sánh hơn (comparative) của "big" là "bigger".' },
      { type: 'grammar', q: 'The cat is sleeping ___ the box.', options: ['in', 'at', 'for', 'to'], correctIdx: 0, explanation_vi: 'Con mèo ngủ "trong" hộp → giới từ "in".' },
      { type: 'grammar', q: '___ do you go to school? — By bus.', options: ['What', 'When', 'How', 'Why'], correctIdx: 2, explanation_vi: 'Hỏi phương tiện di chuyển dùng "How".' },
      { type: 'reading', passage: 'Last weekend, Minh and his family went camping near a lake. They set up a tent and cooked fish over a fire. At night, they saw many stars. Minh loved listening to the sounds of the forest before he fell asleep.', q: 'Where did Minh\'s family go?', options: ['To the beach', 'Camping near a lake', 'To a hotel', 'To the city'], correctIdx: 1, explanation_vi: '"went camping near a lake" — đi cắm trại gần hồ.' },
      { type: 'reading', passage: 'Last weekend, Minh and his family went camping near a lake. They set up a tent and cooked fish over a fire. At night, they saw many stars. Minh loved listening to the sounds of the forest before he fell asleep.', q: 'What did they cook?', options: ['Rice', 'Fish', 'Chicken', 'Noodles'], correctIdx: 1, explanation_vi: '"cooked fish over a fire" — họ nấu cá trên lửa trại.' },
      { type: 'reading', passage: 'Last weekend, Minh and his family went camping near a lake. They set up a tent and cooked fish over a fire. At night, they saw many stars. Minh loved listening to the sounds of the forest before he fell asleep.', q: 'What did Minh love doing before sleep?', options: ['Watching TV', 'Reading a map', 'Listening to forest sounds', 'Playing games'], correctIdx: 2, explanation_vi: '"loved listening to the sounds of the forest" — thích nghe âm thanh của rừng.' },
    ],
  },
  B1: {
    level: 'B1',
    certName: 'Cambridge B1 KET (Key English Test)',
    certName_vi: 'Cambridge KET',
    emoji: '🎓',
    color: '#FF9F43',
    questions: [
      { type: 'vocab', q: 'Which word is closest in meaning to "difficult"?', options: ['Easy', 'Challenging', 'Boring', 'Fast'], correctIdx: 1, explanation_vi: '"Challenging" (thử thách) gần nghĩa với "difficult" (khó).' },
      { type: 'vocab', q: 'Which word means "environment" in Vietnamese?', options: ['Môi trường', 'Kinh nghiệm', 'Cơ hội', 'Trách nhiệm'], correctIdx: 0, explanation_vi: '"Environment" = môi trường.' },
      { type: 'grammar', q: 'I ___ never ___ to Japan.', options: ['have / been', 'has / been', 'am / going', 'was / go'], correctIdx: 0, explanation_vi: 'Thì hiện tại hoàn thành với "I": "have never been" (chưa từng đến).' },
      { type: 'grammar', q: 'If it ___ tomorrow, we will stay home.', options: ['rain', 'rains', 'rained', 'raining'], correctIdx: 1, explanation_vi: 'Câu điều kiện loại 1: If + hiện tại đơn ("rains"), mệnh đề chính dùng "will".' },
      { type: 'grammar', q: 'The letter ___ by Anna yesterday.', options: ['write', 'wrote', 'was written', 'is written'], correctIdx: 2, explanation_vi: 'Thể bị động quá khứ: "was written" — lá thư được viết bởi Anna.' },
      { type: 'grammar', q: 'I like tea. ___, I don\'t like coffee.', options: ['However', 'Because', 'So', 'And'], correctIdx: 0, explanation_vi: '"However" (tuy nhiên) dùng để nêu ý đối lập.' },
      { type: 'reading', passage: 'Recycling is one of the easiest ways for young people to help the environment. By separating paper, plastic, and glass, families can reduce the amount of waste sent to landfills. Some schools in Vietnam now run recycling competitions, encouraging students to collect used bottles for small prizes.', q: 'According to the passage, what can families do to help?', options: ['Buy more plastic', 'Separate paper, plastic, and glass', 'Ignore the waste', 'Build a landfill'], correctIdx: 1, explanation_vi: '"By separating paper, plastic, and glass" — phân loại rác.' },
      { type: 'reading', passage: 'Recycling is one of the easiest ways for young people to help the environment. By separating paper, plastic, and glass, families can reduce the amount of waste sent to landfills. Some schools in Vietnam now run recycling competitions, encouraging students to collect used bottles for small prizes.', q: 'What do some schools in Vietnam organize?', options: ['Sports days', 'Recycling competitions', 'Art contests', 'Cooking classes'], correctIdx: 1, explanation_vi: '"schools in Vietnam now run recycling competitions" — cuộc thi tái chế.' },
      { type: 'reading', passage: 'Recycling is one of the easiest ways for young people to help the environment. By separating paper, plastic, and glass, families can reduce the amount of waste sent to landfills. Some schools in Vietnam now run recycling competitions, encouraging students to collect used bottles for small prizes.', q: 'Why do students collect used bottles at school?', options: ['To sell them', 'For small prizes', 'For a homework grade', 'To decorate the classroom'], correctIdx: 1, explanation_vi: '"encouraging students to collect used bottles for small prizes" — đổi lấy phần thưởng nhỏ.' },
    ],
  },
};

export function getPassRequirement(level: CEFRLevel): number {
  // % correct considered a "pass" at this mock-test level (roughly mirrors real YLE shield bands)
  return level === 'K' ? 60 : level === 'A1' ? 65 : level === 'A2' ? 70 : 70;
}
