// English 4 skills content bank — Listen / Speak / Read / Write
// CEFR levels: A1 (beginner, ages 6-8), A2 (elementary, ages 9-11), B1 (intermediate, ages 12-15)

export type CEFRLevel = 'A1' | 'A2' | 'B1';

// ============================================================
// LISTENING — vocabulary words with phonetic + Vietnamese gloss
// ============================================================
export interface ListenWord {
  word: string;
  phonetic: string; // IPA-style
  vi: string;
  category: string;
}

export const LISTEN_WORDS: Record<CEFRLevel, ListenWord[]> = {
  A1: [
    { word: 'apple', phonetic: '/ˈæpəl/', vi: 'táo', category: 'food' },
    { word: 'banana', phonetic: '/bəˈnænə/', vi: 'chuối', category: 'food' },
    { word: 'cat', phonetic: '/kæt/', vi: 'mèo', category: 'animal' },
    { word: 'dog', phonetic: '/dɒɡ/', vi: 'chó', category: 'animal' },
    { word: 'elephant', phonetic: '/ˈelɪfənt/', vi: 'voi', category: 'animal' },
    { word: 'fish', phonetic: '/fɪʃ/', vi: 'cá', category: 'animal' },
    { word: 'green', phonetic: '/ɡriːn/', vi: 'xanh lá', category: 'color' },
    { word: 'happy', phonetic: '/ˈhæpi/', vi: 'vui', category: 'emotion' },
    { word: 'ice cream', phonetic: '/aɪs kriːm/', vi: 'kem', category: 'food' },
    { word: 'jump', phonetic: '/dʒʌmp/', vi: 'nhảy', category: 'verb' },
    { word: 'kite', phonetic: '/kaɪt/', vi: 'diều', category: 'toy' },
    { word: 'lion', phonetic: '/ˈlaɪən/', vi: 'sư tử', category: 'animal' },
    { word: 'mother', phonetic: '/ˈmʌðə(r)/', vi: 'mẹ', category: 'family' },
    { word: 'night', phonetic: '/naɪt/', vi: 'đêm', category: 'time' },
    { word: 'orange', phonetic: '/ˈɒrɪndʒ/', vi: 'cam', category: 'color' },
    { word: 'pencil', phonetic: '/ˈpensəl/', vi: 'bút chì', category: 'school' },
    { word: 'queen', phonetic: '/kwiːn/', vi: 'nữ hoàng', category: 'people' },
    { word: 'rain', phonetic: '/reɪn/', vi: 'mưa', category: 'weather' },
    { word: 'school', phonetic: '/skuːl/', vi: 'trường học', category: 'place' },
    { word: 'tree', phonetic: '/triː/', vi: 'cây', category: 'nature' },
    { word: 'umbrella', phonetic: '/ʌmˈbrelə/', vi: 'ô', category: 'object' },
    { word: 'water', phonetic: '/ˈwɔːtə(r)/', vi: 'nước', category: 'food' },
    { word: 'yellow', phonetic: '/ˈjeləʊ/', vi: 'vàng', category: 'color' },
    { word: 'zebra', phonetic: '/ˈzebrə/', vi: 'ngựa vằn', category: 'animal' },
  ],
  A2: [
    { word: 'beautiful', phonetic: '/ˈbjuːtɪfəl/', vi: 'đẹp', category: 'adjective' },
    { word: 'breakfast', phonetic: '/ˈbrekfəst/', vi: 'bữa sáng', category: 'food' },
    { word: 'computer', phonetic: '/kəmˈpjuːtə(r)/', vi: 'máy tính', category: 'tech' },
    { word: 'dangerous', phonetic: '/ˈdeɪndʒərəs/', vi: 'nguy hiểm', category: 'adjective' },
    { word: 'different', phonetic: '/ˈdɪfrənt/', vi: 'khác nhau', category: 'adjective' },
    { word: 'expensive', phonetic: '/ɪkˈspensɪv/', vi: 'đắt', category: 'adjective' },
    { word: 'family', phonetic: '/ˈfæməli/', vi: 'gia đình', category: 'people' },
    { word: 'favorite', phonetic: '/ˈfeɪvərɪt/', vi: 'yêu thích', category: 'adjective' },
    { word: 'garden', phonetic: '/ˈɡɑːdən/', vi: 'vườn', category: 'place' },
    { word: 'holiday', phonetic: '/ˈhɒlɪdeɪ/', vi: 'kỳ nghỉ', category: 'event' },
    { word: 'important', phonetic: '/ɪmˈpɔːtənt/', vi: 'quan trọng', category: 'adjective' },
    { word: 'interesting', phonetic: '/ˈɪntrəstɪŋ/', vi: 'thú vị', category: 'adjective' },
    { word: 'language', phonetic: '/ˈlæŋɡwɪdʒ/', vi: 'ngôn ngữ', category: 'concept' },
    { word: 'mountain', phonetic: '/ˈmaʊntən/', vi: 'núi', category: 'nature' },
    { word: 'museum', phonetic: '/mjuːˈziːəm/', vi: 'bảo tàng', category: 'place' },
    { word: 'neighbor', phonetic: '/ˈneɪbə(r)/', vi: 'hàng xóm', category: 'people' },
    { word: 'practice', phonetic: '/ˈpræktɪs/', vi: 'luyện tập', category: 'verb' },
    { word: 'restaurant', phonetic: '/ˈrestrɒnt/', vi: 'nhà hàng', category: 'place' },
    { word: 'science', phonetic: '/ˈsaɪəns/', vi: 'khoa học', category: 'subject' },
    { word: 'travel', phonetic: '/ˈtrævəl/', vi: 'du lịch', category: 'verb' },
    { word: 'understand', phonetic: '/ˌʌndəˈstænd/', vi: 'hiểu', category: 'verb' },
    { word: 'vegetable', phonetic: '/ˈvedʒtəbəl/', vi: 'rau', category: 'food' },
    { word: 'weather', phonetic: '/ˈweðə(r)/', vi: 'thời tiết', category: 'nature' },
    { word: 'yesterday', phonetic: '/ˈjestədeɪ/', vi: 'hôm qua', category: 'time' },
  ],
  B1: [
    { word: 'achievement', phonetic: '/əˈtʃiːvmənt/', vi: 'thành tựu', category: 'concept' },
    { word: 'ambitious', phonetic: '/æmˈbɪʃəs/', vi: 'tham vọng', category: 'adjective' },
    { word: 'concentrate', phonetic: '/ˈkɒnsəntreɪt/', vi: 'tập trung', category: 'verb' },
    { word: 'creativity', phonetic: '/ˌkriːeɪˈtɪvɪti/', vi: 'sáng tạo', category: 'concept' },
    { word: 'curiosity', phonetic: '/ˌkjʊəriˈɒsɪti/', vi: 'tò mò', category: 'concept' },
    { word: 'discover', phonetic: '/dɪˈskʌvə(r)/', vi: 'khám phá', category: 'verb' },
    { word: 'encourage', phonetic: '/ɪnˈkʌrɪdʒ/', vi: 'khuyến khích', category: 'verb' },
    { word: 'environment', phonetic: '/ɪnˈvaɪrənmənt/', vi: 'môi trường', category: 'concept' },
    { word: 'experience', phonetic: '/ɪkˈspɪəriəns/', vi: 'kinh nghiệm', category: 'concept' },
    { word: 'failure', phonetic: '/ˈfeɪljə(r)/', vi: 'thất bại', category: 'concept' },
    { word: 'freedom', phonetic: '/ˈfriːdəm/', vi: 'tự do', category: 'concept' },
    { word: 'generation', phonetic: '/ˌdʒenəˈreɪʃən/', vi: 'thế hệ', category: 'concept' },
    { word: 'imagination', phonetic: '/ɪˌmædʒɪˈneɪʃən/', vi: 'trí tưởng tượng', category: 'concept' },
    { word: 'independent', phonetic: '/ˌɪndɪˈpendənt/', vi: 'độc lập', category: 'adjective' },
    { word: 'knowledge', phonetic: '/ˈnɒlɪdʒ/', vi: 'kiến thức', category: 'concept' },
    { word: 'opportunity', phonetic: '/ˌɒpəˈtjuːnɪti/', vi: 'cơ hội', category: 'concept' },
    { word: 'persistent', phonetic: '/pəˈsɪstənt/', vi: 'kiên trì', category: 'adjective' },
    { word: 'responsible', phonetic: '/rɪˈspɒnsɪbəl/', vi: 'có trách nhiệm', category: 'adjective' },
    { word: 'sustainable', phonetic: '/səˈsteɪnəbəl/', vi: 'bền vững', category: 'adjective' },
    { word: 'technology', phonetic: '/tekˈnɒlədʒi/', vi: 'công nghệ', category: 'concept' },
  ],
};

// ============================================================
// SPEAKING — sentences for kids to read aloud
// ============================================================
export interface SpeakSentence {
  text: string;
  vi: string;
  level: CEFRLevel;
}

export const SPEAK_SENTENCES: SpeakSentence[] = [
  // A1
  { level: 'A1', text: 'My name is Phuc.', vi: 'Tên em là Phúc.' },
  { level: 'A1', text: 'I like apples.', vi: 'Em thích táo.' },
  { level: 'A1', text: 'The cat is on the table.', vi: 'Con mèo trên bàn.' },
  { level: 'A1', text: 'I have a brother and a sister.', vi: 'Em có một anh trai và một em gái.' },
  { level: 'A1', text: 'It is a sunny day.', vi: 'Hôm nay trời nắng.' },
  { level: 'A1', text: 'I go to school every day.', vi: 'Em đi học mỗi ngày.' },
  { level: 'A1', text: 'My favorite color is blue.', vi: 'Màu yêu thích của em là xanh dương.' },
  { level: 'A1', text: 'I love my family.', vi: 'Em yêu gia đình.' },
  // A2
  { level: 'A2', text: 'Yesterday I visited my grandmother.', vi: 'Hôm qua em đến thăm bà.' },
  { level: 'A2', text: 'My favorite subject is science because experiments are fun.', vi: 'Môn em thích nhất là khoa học vì thí nghiệm rất vui.' },
  { level: 'A2', text: 'In the morning I have breakfast with my family.', vi: 'Buổi sáng em ăn sáng cùng gia đình.' },
  { level: 'A2', text: 'I want to be a doctor when I grow up.', vi: 'Em muốn trở thành bác sĩ khi lớn lên.' },
  { level: 'A2', text: 'On weekends we often go to the park together.', vi: 'Cuối tuần cả nhà thường đi công viên cùng nhau.' },
  { level: 'A2', text: 'Reading books is one of my favorite activities.', vi: 'Đọc sách là một trong những hoạt động em thích.' },
  // B1
  { level: 'B1', text: 'Vietnam has a rich history and beautiful landscapes from the mountains in the north to the beaches in the south.', vi: 'Việt Nam có lịch sử phong phú và cảnh đẹp từ núi phía Bắc đến biển phía Nam.' },
  { level: 'B1', text: 'I believe technology should help people learn faster, but we still need to think for ourselves.', vi: 'Em tin công nghệ giúp người học nhanh hơn, nhưng chúng ta vẫn cần tự tư duy.' },
  { level: 'B1', text: 'When I face a difficult problem, I try to break it into smaller steps.', vi: 'Khi gặp vấn đề khó, em cố chia nhỏ thành các bước.' },
  { level: 'B1', text: 'Curiosity is more important than memorization because it leads to real understanding.', vi: 'Tò mò quan trọng hơn ghi nhớ vì nó dẫn đến hiểu thật sự.' },
];

// ============================================================
// READING — short passages with comprehension questions
// ============================================================
export interface ReadingPassage {
  level: CEFRLevel;
  title_en: string;
  title_vi: string;
  passage: string;
  questions: {
    q: string;
    options: string[];
    correctIdx: number;
    explanation_vi: string;
  }[];
}

export const READING_PASSAGES: ReadingPassage[] = [
  {
    level: 'A1',
    title_en: 'My Cat Mimi',
    title_vi: 'Con mèo Mimi của em',
    passage:
      'I have a cat. Her name is Mimi. She is small and white. She has blue eyes. Mimi likes to play with a ball. She also likes to sleep on my bed. I love Mimi very much.',
    questions: [
      {
        q: 'What color is Mimi?',
        options: ['Black', 'White', 'Brown', 'Orange'],
        correctIdx: 1,
        explanation_vi: 'Đoạn văn nói "She is small and white" — Mimi màu trắng.',
      },
      {
        q: 'What does Mimi like to play with?',
        options: ['A toy mouse', 'A ball', 'A string', 'A bell'],
        correctIdx: 1,
        explanation_vi: 'Đoạn văn nói "Mimi likes to play with a ball" — quả bóng.',
      },
      {
        q: 'Where does Mimi like to sleep?',
        options: ['On the floor', 'On the chair', 'On my bed', 'In the kitchen'],
        correctIdx: 2,
        explanation_vi: 'Đoạn văn nói "She also likes to sleep on my bed" — trên giường em.',
      },
    ],
  },
  {
    level: 'A2',
    title_en: 'A Trip to the Zoo',
    title_vi: 'Chuyến đi sở thú',
    passage:
      'Last Sunday my family went to the zoo. We saw many animals. The elephants were very big and they ate a lot of vegetables. The monkeys were funny because they jumped from tree to tree. My favorite animal was the giraffe. It was so tall that it could eat leaves from the highest branches. We had a great time and I want to go again next month.',
    questions: [
      {
        q: 'When did the family go to the zoo?',
        options: ['Last Saturday', 'Last Sunday', 'Last Monday', 'Yesterday'],
        correctIdx: 1,
        explanation_vi: 'Đoạn văn bắt đầu "Last Sunday my family went to the zoo".',
      },
      {
        q: 'Why were the monkeys funny?',
        options: [
          'They were very big',
          'They jumped from tree to tree',
          'They ate vegetables',
          'They were tall',
        ],
        correctIdx: 1,
        explanation_vi: 'Đoạn văn nói "The monkeys were funny because they jumped from tree to tree".',
      },
      {
        q: 'What was the writer\'s favorite animal?',
        options: ['Elephant', 'Monkey', 'Giraffe', 'Lion'],
        correctIdx: 2,
        explanation_vi: 'Đoạn văn nói "My favorite animal was the giraffe".',
      },
      {
        q: 'When does the writer want to go to the zoo again?',
        options: ['Next week', 'Next month', 'Next year', 'Tomorrow'],
        correctIdx: 1,
        explanation_vi: 'Đoạn văn kết thúc "I want to go again next month".',
      },
    ],
  },
  {
    level: 'B1',
    title_en: 'The Power of Curiosity',
    title_vi: 'Sức mạnh của sự tò mò',
    passage:
      'Curiosity is one of the most important traits a young person can have. When children ask "why" questions, they are training their minds to think deeply about the world. Many great scientists, artists, and inventors say that their success started with a simple question they could not stop asking. In Vietnam today, schools encourage memorization, but families can help by giving children time to wonder, explore, and even make mistakes. The best learning often happens when we follow our own questions, not someone else\'s answers.',
    questions: [
      {
        q: 'According to the passage, what do "why" questions help children do?',
        options: [
          'Get higher test scores',
          'Train their minds to think deeply',
          'Memorize more facts',
          'Learn languages faster',
        ],
        correctIdx: 1,
        explanation_vi: 'Đoạn văn nói "they are training their minds to think deeply about the world".',
      },
      {
        q: 'How did many great scientists and inventors start their success?',
        options: [
          'By copying others',
          'By memorizing books',
          'With a simple question they could not stop asking',
          'By following teachers strictly',
        ],
        correctIdx: 2,
        explanation_vi: 'Đoạn văn nói "their success started with a simple question they could not stop asking".',
      },
      {
        q: 'What does the writer suggest Vietnamese families do?',
        options: [
          'Give children more memorization homework',
          'Send children to extra classes',
          'Give children time to wonder, explore, and make mistakes',
          'Buy more books',
        ],
        correctIdx: 2,
        explanation_vi: 'Đoạn văn nói "families can help by giving children time to wonder, explore, and even make mistakes".',
      },
      {
        q: 'What is the main idea of the passage?',
        options: [
          'Memorization is bad',
          'Vietnamese schools are wrong',
          'Curiosity-driven learning is more powerful than answer-driven learning',
          'Scientists are smarter than artists',
        ],
        correctIdx: 2,
        explanation_vi: 'Câu cuối tóm tắt: "The best learning often happens when we follow our own questions, not someone else\'s answers".',
      },
    ],
  },
];

// ============================================================
// WRITING — prompts for kids to write 2-5 sentences
// ============================================================
export interface WritingPrompt {
  level: CEFRLevel;
  prompt_en: string;
  prompt_vi: string;
  min_sentences: number;
  example_starter: string;
}

export const WRITING_PROMPTS: WritingPrompt[] = [
  // A1
  {
    level: 'A1',
    prompt_en: 'Write 3 sentences about your favorite animal.',
    prompt_vi: 'Viết 3 câu về con vật con yêu thích.',
    min_sentences: 3,
    example_starter: 'My favorite animal is a ___. It has ___. It can ___.',
  },
  {
    level: 'A1',
    prompt_en: 'Tell me about your family in 3 sentences.',
    prompt_vi: 'Kể về gia đình con bằng 3 câu.',
    min_sentences: 3,
    example_starter: 'My family has ___ people. My father is ___. We love ___.',
  },
  {
    level: 'A1',
    prompt_en: 'What did you do this morning? Write 3 sentences.',
    prompt_vi: 'Sáng nay con làm gì? Viết 3 câu.',
    min_sentences: 3,
    example_starter: 'This morning I ___. Then I ___. After that I ___.',
  },
  // A2
  {
    level: 'A2',
    prompt_en: 'Describe your favorite place. Why do you like it? Write 4-5 sentences.',
    prompt_vi: 'Mô tả nơi con yêu thích. Tại sao con thích? Viết 4-5 câu.',
    min_sentences: 4,
    example_starter: 'My favorite place is ___. I like it because ___. When I am there, I ___.',
  },
  {
    level: 'A2',
    prompt_en: 'What do you want to be when you grow up and why? Write 4-5 sentences.',
    prompt_vi: 'Con muốn làm gì khi lớn lên và tại sao? Viết 4-5 câu.',
    min_sentences: 4,
    example_starter: 'When I grow up I want to be a ___. I want to be a ___ because ___.',
  },
  {
    level: 'A2',
    prompt_en: 'Write about a happy memory. What happened? Where? With whom?',
    prompt_vi: 'Viết về 1 kỷ niệm vui. Chuyện gì xảy ra? Ở đâu? Với ai?',
    min_sentences: 4,
    example_starter: 'One of my happiest memories was when ___. It happened at ___. I was with ___.',
  },
  // B1
  {
    level: 'B1',
    prompt_en: 'If you could change one thing about the world, what would it be and why? Write 5-7 sentences.',
    prompt_vi: 'Nếu con có thể thay đổi 1 điều về thế giới, đó là gì và tại sao? Viết 5-7 câu.',
    min_sentences: 5,
    example_starter: 'If I could change one thing, I would ___. I think this is important because ___.',
  },
  {
    level: 'B1',
    prompt_en: 'Do you think technology helps or hurts kids your age? Give reasons.',
    prompt_vi: 'Con nghĩ công nghệ giúp hay hại trẻ em tuổi con? Nêu lý do.',
    min_sentences: 5,
    example_starter: 'I think technology mostly ___. One reason is ___. However, ___.',
  },
  {
    level: 'B1',
    prompt_en: 'Describe a person you admire. What qualities make them special?',
    prompt_vi: 'Mô tả 1 người con ngưỡng mộ. Điều gì làm họ đặc biệt?',
    min_sentences: 5,
    example_starter: 'A person I really admire is ___. What makes them special is ___.',
  },
];

// ============================================================
// HELPERS
// ============================================================
export function getLevelForAge(age: number): CEFRLevel {
  if (age <= 8) return 'A1';
  if (age <= 11) return 'A2';
  return 'B1';
}

export function pickRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Levenshtein distance for speech matching
export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

// Compare spoken text vs target. Returns 0-100 match score.
export function pronunciationScore(target: string, spoken: string): number {
  const norm = (s: string) =>
    s.toLowerCase().replace(/[^a-z\s]/g, '').replace(/\s+/g, ' ').trim();
  const t = norm(target);
  const s = norm(spoken);
  if (!t || !s) return 0;
  const dist = levenshtein(t, s);
  const maxLen = Math.max(t.length, s.length);
  return Math.max(0, Math.round(((maxLen - dist) / maxLen) * 100));
}
