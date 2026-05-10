// ============================================================
// PANY KIDS STUDIO — Daily Quest Bank
// 500+ quests across 12 pillars × 3 age groups × 7-day rotation
// Bilingual VI ↔ EN. Tailored to Phúc (11), An (9), Như Ý (5).
// ============================================================

export type AgeGroup =
  | 'K'  // Kindergarten / mầm non — 4-6 (Như Ý)
  | 'P'  // Primary / tiểu học — 7-11 (Bình An, Hạnh Phúc)
  | 'T'; // Transition + secondary / cấp 2 — 12-15 (Hạnh Phúc upper, future)

export type Pillar =
  | 'tech' | 'english' | 'finance' | 'thinking' | 'business' | 'life'   // Skills track
  | 'theo-doi' | 'sang-tao' | 'van-dong' | 'tu-kham-pha' | 'la-ban' | 'gia-dinh'; // Development track

export type Quest = {
  id: string;
  pillar: Pillar;
  ageGroup: AgeGroup;
  day: number;        // 1=Mon, 7=Sun
  difficulty: 1 | 2 | 3;
  emoji: string;
  estMin: number;     // estimated minutes
  needsParent: boolean;
  vi: { title: string; desc: string; reward: string };
  en: { title: string; desc: string; reward: string };
};

// ────────────────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────────────────
const Q = (
  id: string,
  pillar: Pillar,
  ageGroup: AgeGroup,
  day: number,
  difficulty: 1 | 2 | 3,
  emoji: string,
  estMin: number,
  needsParent: boolean,
  viTitle: string, viDesc: string, viReward: string,
  enTitle: string, enDesc: string, enReward: string,
): Quest => ({
  id, pillar, ageGroup, day, difficulty, emoji, estMin, needsParent,
  vi: { title: viTitle, desc: viDesc, reward: viReward },
  en: { title: enTitle, desc: enDesc, reward: enReward },
});

// ────────────────────────────────────────────────────────────
// 1) TECH & AI — Công nghệ & AI
// ────────────────────────────────────────────────────────────
const QUESTS_TECH: Quest[] = [
  // Kindergarten (Như Ý 5t)
  Q('tech-k-1', 'tech', 'K', 1, 1, '📱', 15, true,  'Vẽ trên iPad',          'Mở app vẽ và vẽ một con vật con thích.', '+5 điểm Sáng tạo',
                                                             'Drawing on iPad',     'Open a drawing app and draw any animal you like.', '+5 Creativity'),
  Q('tech-k-2', 'tech', 'K', 2, 1, '🖱️', 10, true,  'Học click chuột',       'Click vào hình tròn màu đỏ trên màn hình bố mở.', '+5 điểm Tech',
                                                             'Mouse clicking',      'Click the red circle Dad opens for you.', '+5 Tech'),
  Q('tech-k-3', 'tech', 'K', 3, 1, '🎵', 10, true,  'Chọn bài hát',          'Mở YouTube Kids, chọn 1 bài Như Ý thích.', '+5 điểm Tech',
                                                             'Pick a song',         'Open YouTube Kids and choose one favorite song.', '+5 Tech'),
  Q('tech-k-4', 'tech', 'K', 4, 1, '🎨', 15, true,  'Tô màu trên app',       'Tô 1 bức tranh trên app coloring (free).', '+5 điểm Sáng tạo',
                                                             'Color in app',        'Color one picture in a free coloring app.', '+5 Creativity'),
  Q('tech-k-5', 'tech', 'K', 5, 2, '📷', 10, true,  'Chụp ảnh đồ vật',       'Cùng bố chụp 5 đồ vật yêu thích trong nhà.', '+8 điểm Tech',
                                                             'Photograph items',    'With Dad, photograph 5 favorite home items.', '+8 Tech'),
  Q('tech-k-6', 'tech', 'K', 6, 1, '🔢', 10, true,  'Bấm số đếm',            'Bấm máy tính 1→10 rồi đếm lớn theo.', '+5 điểm Toán',
                                                             'Tap to count',        'Tap calculator 1→10 and count out loud.', '+5 Math'),
  Q('tech-k-7', 'tech', 'K', 7, 2, '🗣️', 10, true,  'Trợ lý giọng nói',      'Hỏi Siri/Google: "Hôm nay trời thế nào?"', '+8 điểm Tech',
                                                             'Voice assistant',     'Ask Siri/Google: "What\'s the weather today?"', '+8 Tech'),

  // Primary (An 9 + Phúc 11)
  Q('tech-p-1', 'tech', 'P', 1, 2, '⌨️', 20, false, 'Học gõ 10 ngón',        'Tập gõ trên TypingClub bài đầu tiên.', '+10 điểm Tech',
                                                             'Touch typing',        'Practice TypingClub lesson 1.', '+10 Tech'),
  Q('tech-p-2', 'tech', 'P', 2, 2, '🐱', 25, false, 'Scratch project nhỏ',   'Làm sprite mèo đi qua màn hình bằng Scratch.', '+10 điểm Code',
                                                             'Tiny Scratch project','Make a cat sprite walk across the stage.', '+10 Code'),
  Q('tech-p-3', 'tech', 'P', 3, 2, '🤖', 20, false, 'Hỏi Đại Ka 1 câu hay', 'Đặt câu hỏi tốt với Đại Ka về thứ con tò mò.', '+8 điểm Tư duy',
                                                             'Ask Đại Ka well',     'Ask Đại Ka a thoughtful question.', '+8 Thinking'),
  Q('tech-p-4', 'tech', 'P', 4, 2, '🔍', 20, false, 'Search an toàn',        'Tự search 1 chủ đề bài học, lọc 3 nguồn tin cậy.', '+10 điểm Research',
                                                             'Safe searching',      'Search 1 topic, pick 3 trustworthy sources.', '+10 Research'),
  Q('tech-p-5', 'tech', 'P', 5, 3, '⚙️', 30, false, 'Tự cài 1 app',          'Tải + cài 1 app học tập miễn phí có duyệt.', '+12 điểm Tech',
                                                             'Install an app',      'Download + install one approved learning app.', '+12 Tech'),
  Q('tech-p-6', 'tech', 'P', 6, 2, '📁', 15, false, 'Tổ chức thư mục',       'Sắp xếp Downloads thành 4 folder gọn.', '+8 điểm Life Skill',
                                                             'Organize folder',     'Sort Downloads into 4 tidy folders.', '+8 Life Skill'),
  Q('tech-p-7', 'tech', 'P', 7, 3, '🛡️', 20, true,  'An toàn online',         'Cùng bố review password + privacy 1 app.', '+15 điểm An toàn',
                                                             'Online safety',       'With Dad, review password + privacy of 1 app.', '+15 Safety'),

  // Transition / secondary (Phúc upper-end + future)
  Q('tech-t-1', 'tech', 'T', 1, 3, '💻', 45, false, 'Hello World Python',    'Cài Python, chạy hello + tự đổi 3 dòng.', '+15 điểm Code',
                                                             'Python Hello',        'Install Python, run hello + edit 3 lines.', '+15 Code'),
  Q('tech-t-2', 'tech', 'T', 2, 3, '🌐', 40, false, 'HTML page nhỏ',         'Viết 1 trang HTML giới thiệu bản thân.', '+15 điểm Code',
                                                             'Tiny HTML page',      'Build 1 HTML "About me" page.', '+15 Code'),
  Q('tech-t-3', 'tech', 'T', 3, 3, '🎮', 30, false, 'Game Scratch nâng cao', 'Thêm điểm + game over vào Scratch project cũ.', '+15 điểm Code',
                                                             'Scratch upgrade',     'Add score + game-over to an old Scratch project.', '+15 Code'),
  Q('tech-t-4', 'tech', 'T', 4, 2, '📊', 25, false, 'Spreadsheet đầu tiên',  'Tạo bảng theo dõi điểm số 5 tuần.', '+10 điểm Data',
                                                             'First spreadsheet',   'Track 5 weeks of grades in a sheet.', '+10 Data'),
  Q('tech-t-5', 'tech', 'T', 5, 3, '🎨', 30, false, 'AI image prompt',       'Viết 3 prompt AI tạo ảnh — so sánh kết quả.', '+12 điểm AI Lit',
                                                             'AI image prompt',     'Write 3 AI image prompts and compare.', '+12 AI Lit'),
  Q('tech-t-6', 'tech', 'T', 6, 2, '🔐', 20, false, 'Quản lý mật khẩu',      'Lập danh sách mật khẩu mạnh cho 5 tài khoản.', '+10 điểm An toàn',
                                                             'Password hygiene',    'Build strong-password list for 5 accounts.', '+10 Safety'),
  Q('tech-t-7', 'tech', 'T', 7, 3, '🤝', 30, false, 'Code review bạn',       'Đổi code Scratch với 1 bạn, đưa 2 góp ý.', '+15 điểm Hợp tác',
                                                             'Peer code review',    'Swap Scratch with a friend, give 2 tips.', '+15 Collab'),
];

// ────────────────────────────────────────────────────────────
// 2) ENGLISH — Tiếng Anh
// ────────────────────────────────────────────────────────────
const QUESTS_ENGLISH: Quest[] = [
  Q('eng-k-1','english','K',1,1,'🌈',10,true,'5 màu sắc','Học tên 5 màu cơ bản: red, blue, yellow, green, pink.','+5 điểm English','5 colors','Learn 5 basic colors: red/blue/yellow/green/pink.','+5 English'),
  Q('eng-k-2','english','K',2,1,'🔢',10,true,'Đếm 1-10','Đếm 1-10 bằng tiếng Anh có hình minh họa.','+5 điểm English','Count 1-10','Count 1-10 in English with pictures.','+5 English'),
  Q('eng-k-3','english','K',3,1,'🐶',10,true,'5 con vật','Tên 5 con vật: dog, cat, fish, bird, cow.','+5 điểm English','5 animals','Name 5 animals: dog/cat/fish/bird/cow.','+5 English'),
  Q('eng-k-4','english','K',4,1,'🍎',10,true,'5 trái cây','Tên 5 trái cây: apple, banana, orange, mango, grape.','+5 điểm English','5 fruits','Name 5 fruits: apple/banana/orange/mango/grape.','+5 English'),
  Q('eng-k-5','english','K',5,2,'👋',10,true,'Chào hỏi','Tập "Hello / Hi / Bye" + vẫy tay với bố.','+8 điểm English','Greetings','Practice Hello/Hi/Bye + wave with Dad.','+8 English'),
  Q('eng-k-6','english','K',6,1,'😀',10,true,'Cảm xúc cơ bản','Học happy / sad / angry / sleepy.','+5 điểm English','Basic feelings','Learn happy/sad/angry/sleepy.','+5 English'),
  Q('eng-k-7','english','K',7,2,'🎵',15,true,'Hát "Twinkle"','Cùng bố hát "Twinkle Twinkle Little Star".','+8 điểm English','Sing Twinkle','Sing "Twinkle Twinkle Little Star" with Dad.','+8 English'),

  Q('eng-p-1','english','P',1,2,'📚',20,false,'10 từ vựng A1','Học 10 từ A1 mới + làm flashcard.','+10 điểm English','10 A1 words','Learn 10 new A1 words + make flashcards.','+10 English'),
  Q('eng-p-2','english','P',2,2,'🗣️',15,false,'Đọc to 5 câu','Đọc 5 câu A1 to ra, ghi âm cho Đại Ka.','+10 điểm Speak','Read aloud 5','Read 5 A1 sentences aloud, record for Đại Ka.','+10 Speak'),
  Q('eng-p-3','english','P',3,2,'🎧',15,false,'Listening A1','Nghe 1 bài podcast trẻ em + tóm tắt 1 câu.','+10 điểm Listen','A1 listening','Listen to 1 kids podcast + 1-sentence summary.','+10 Listen'),
  Q('eng-p-4','english','P',4,2,'✍️',20,false,'Viết 3 câu','Viết 3 câu về ngày hôm nay bằng tiếng Anh.','+10 điểm Write','Write 3 sentences','Write 3 English sentences about today.','+10 Write'),
  Q('eng-p-5','english','P',5,2,'📖',20,false,'Đọc 1 trang','Đọc 1 trang sách Oxford Reading Tree level 1-3.','+10 điểm Read','Read 1 page','Read 1 page Oxford Reading Tree level 1-3.','+10 Read'),
  Q('eng-p-6','english','P',6,3,'🎮',25,false,'Game tiếng Anh','Chơi 1 game Cambridge Kids 25 phút.','+12 điểm English','English game','Play 1 Cambridge Kids game 25 min.','+12 English'),
  Q('eng-p-7','english','P',7,2,'👨‍👩‍👧',15,true,'Show & Tell','Kể bố nghe về 1 đồ vật bằng tiếng Anh 2 phút.','+10 điểm Speak','Show & Tell','Tell Dad about 1 item in English for 2 min.','+10 Speak'),

  Q('eng-t-1','english','T',1,3,'📰',25,false,'Tin BBC Kids','Đọc 1 bài BBC Newsround + viết 3 câu reflection.','+15 điểm English','BBC Newsround','Read 1 BBC Newsround + 3-sentence reflection.','+15 English'),
  Q('eng-t-2','english','T',2,3,'🎬',30,false,'Phim phụ đề EN','Xem 20 phút phim hoạt hình phụ đề EN, ghi 5 từ mới.','+12 điểm Listen','EN-sub movie','Watch 20 min cartoon EN-sub, log 5 new words.','+12 Listen'),
  Q('eng-t-3','english','T',3,3,'📝',30,false,'Email cho Đại Ka','Viết email A2 5 câu cho Đại Ka về tuần qua.','+15 điểm Write','Email Đại Ka','Write A2 email (5 sentences) to Đại Ka about your week.','+15 Write'),
  Q('eng-t-4','english','T',4,2,'🎤',20,false,'Tongue twisters','Tập 3 tongue twisters đến khi nói trôi.','+10 điểm Speak','Tongue twisters','Drill 3 tongue twisters until smooth.','+10 Speak'),
  Q('eng-t-5','english','T',5,3,'📊',25,false,'Phrasal verbs','Học 10 phrasal verbs phổ biến + dùng trong câu.','+15 điểm Grammar','10 phrasal verbs','Learn 10 common phrasal verbs + use in sentences.','+15 Grammar'),
  Q('eng-t-6','english','T',6,3,'🗨️',30,false,'Conversation','Roleplay đặt món ăn nhà hàng EN với Đại Ka.','+15 điểm Speak','Restaurant roleplay','Roleplay restaurant ordering EN with Đại Ka.','+15 Speak'),
  Q('eng-t-7','english','T',7,2,'📖',30,false,'Đọc 1 chương','Đọc 1 chương Magic Tree House + tóm tắt 5 câu.','+15 điểm Read','1 chapter','Read 1 Magic Tree House chapter + 5-sentence summary.','+15 Read'),
];

// ────────────────────────────────────────────────────────────
// 3) FINANCE — Tài chính
// ────────────────────────────────────────────────────────────
const QUESTS_FINANCE: Quest[] = [
  Q('fin-k-1','finance','K',1,1,'🪙',10,true,'Phân biệt tiền','Học phân biệt 1k, 2k, 5k, 10k, 20k.','+5 điểm Money','Identify money','Tell apart 1k/2k/5k/10k/20k.','+5 Money'),
  Q('fin-k-2','finance','K',2,1,'🐷',5,true,'Bỏ heo đất','Bỏ 1 đồng vào heo đất sau khi giúp bố mẹ.','+5 điểm Save','Piggy bank','Drop 1 coin in piggy bank after helping.','+5 Save'),
  Q('fin-k-3','finance','K',3,1,'🛒',15,true,'Đi chợ với mẹ','Đi siêu thị, chỉ cho mẹ 3 thứ con thích nhất.','+5 điểm Choose','Grocery walk','Go to market, point to 3 favorite things.','+5 Choose'),
  Q('fin-k-4','finance','K',4,2,'🎁',10,true,'Quà cho người khác','Vẽ tặng anh chị 1 món quà miễn phí.','+8 điểm Cho đi','Free gift','Draw a free gift for sibling.','+8 Giving'),
  Q('fin-k-5','finance','K',5,1,'🍭',10,true,'Chờ phần thưởng','Chờ 1 ngày để nhận kẹo lớn thay vì nhận liền kẹo nhỏ.','+8 điểm Patience','Wait for reward','Wait 1 day for big candy instead of small now.','+8 Patience'),
  Q('fin-k-6','finance','K',6,1,'❤️',10,true,'Cảm ơn món quà','Nói "thank you" + ôm khi nhận quà.','+5 điểm EQ','Thank for gift','Say thank you + hug when given a gift.','+5 EQ'),
  Q('fin-k-7','finance','K',7,2,'🎈',15,true,'Mua bóng bay','Cùng bố mua 1 bóng bay với 5k tự lấy từ heo.','+10 điểm Buy','Buy a balloon','With Dad, use 5k from piggy to buy 1 balloon.','+10 Buy'),

  Q('fin-p-1','finance','P',1,2,'📒',15,false,'Sổ thu chi','Ghi 5 mục thu/chi của tuần này.','+10 điểm Money','Income/expense log','Log 5 income/expense items this week.','+10 Money'),
  Q('fin-p-2','finance','P',2,2,'💰',15,false,'Tiết kiệm 10%','Tiết kiệm 10% tiền tiêu vặt vào heo đất.','+10 điểm Save','Save 10%','Save 10% allowance into piggy bank.','+10 Save'),
  Q('fin-p-3','finance','P',3,3,'🎯',20,false,'Mục tiêu mua sắm','Đặt mục tiêu mua 1 món + plan tiết kiệm.','+12 điểm Plan','Saving goal','Pick 1 item to buy + savings plan.','+12 Plan'),
  Q('fin-p-4','finance','P',4,2,'🛍️',20,true,'So sánh giá','Đi siêu thị, so giá 3 sản phẩm tương đương.','+10 điểm Compare','Compare prices','At store compare 3 similar products.','+10 Compare'),
  Q('fin-p-5','finance','P',5,2,'💸',15,false,'Phân biệt cần/muốn','Liệt kê 5 thứ "need" và 5 thứ "want".','+10 điểm Tư duy','Need vs want','List 5 needs and 5 wants.','+10 Thinking'),
  Q('fin-p-6','finance','P',6,3,'🏪',25,true,'Hỏi giá thành','Hỏi cô bán hàng "thành phẩm tốn bao nhiêu để làm?".','+12 điểm Curious','Cost question','Ask shopkeeper "How much to make this?".','+12 Curious'),
  Q('fin-p-7','finance','P',7,2,'📤',15,false,'Cho đi 1 đồng','Bỏ 1 đồng vào hộp từ thiện hoặc cho người cần.','+10 điểm Cho đi','Give 1 coin','Donate 1 coin to a kind cause.','+10 Giving'),

  Q('fin-t-1','finance','T',1,3,'📊',30,false,'Budget tháng','Lập budget tháng cho tiền tiêu vặt.','+15 điểm Plan','Monthly budget','Build month budget for allowance.','+15 Plan'),
  Q('fin-t-2','finance','T',2,3,'🧮',25,false,'Lãi đơn vs lãi kép','Tính 100k * (1+5%)^5. Hỏi Đại Ka nếu kẹt.','+15 điểm Math','Simple vs compound','Compute 100k*(1+5%)^5. Ask Đại Ka if stuck.','+15 Math'),
  Q('fin-t-3','finance','T',3,3,'💹',30,false,'Stock paper trade','Theo dõi 3 mã VN-Index 1 tuần (giả lập, không tiền thật).','+15 điểm Invest','Paper trading','Track 3 VN-Index tickers 1 week (paper).','+15 Invest'),
  Q('fin-t-4','finance','T',4,2,'🤝',20,false,'Negotiate giá','Tập trả giá 1 món rẻ ở chợ với bố.','+12 điểm Negotiate','Bargain','Practice bargaining at market with Dad.','+12 Negotiate'),
  Q('fin-t-5','finance','T',5,3,'🏦',25,false,'Ngân hàng & lãi suất','Đọc & tóm tắt cách hoạt động ngân hàng + lãi suất.','+15 điểm Lit','Bank & interest','Read & summarize how banks/interest work.','+15 Lit'),
  Q('fin-t-6','finance','T',6,3,'🌱',30,false,'1 nguồn thu nhỏ','Brainstorm 3 cách kiếm tiền hợp pháp tuổi 12.','+15 điểm Hustle','Side income','Brainstorm 3 legal ways to earn at age 12.','+15 Hustle'),
  Q('fin-t-7','finance','T',7,3,'📈',25,false,'Báo cáo tuần','Viết báo cáo tài chính tuần: thu/chi/saving/cho đi.','+15 điểm Reflect','Weekly report','Write weekly: income/expense/save/give report.','+15 Reflect'),
];

// ────────────────────────────────────────────────────────────
// 4) THINKING — Tư duy phản biện
// ────────────────────────────────────────────────────────────
const QUESTS_THINKING: Quest[] = [
  Q('thk-k-1','thinking','K',1,1,'🧩',15,true,'Ghép hình 6 mảnh','Ghép 1 puzzle 6 mảnh tự lực.','+5 điểm Logic','6-piece puzzle','Solve 6-piece puzzle alone.','+5 Logic'),
  Q('thk-k-2','thinking','K',2,1,'🎨',15,true,'Phân loại màu','Phân 20 đồ chơi theo màu sắc.','+5 điểm Sort','Sort by color','Sort 20 toys by color.','+5 Sort'),
  Q('thk-k-3','thinking','K',3,1,'🔢',10,true,'Đếm xuôi đếm ngược','Đếm 1→10 rồi 10→1.','+5 điểm Count','Forward/back count','Count 1→10 then 10→1.','+5 Count'),
  Q('thk-k-4','thinking','K',4,2,'❓',15,true,'Tại sao trời mưa?','Hỏi bố 5 câu "tại sao".','+8 điểm Curious','5 whys','Ask Dad 5 "why" questions.','+8 Curious'),
  Q('thk-k-5','thinking','K',5,1,'🐱',10,true,'Cùng/khác nhau','Tìm 3 điểm giống và 3 điểm khác giữa mèo và chó.','+5 điểm Compare','Same/different','Find 3 same + 3 different between cat & dog.','+5 Compare'),
  Q('thk-k-6','thinking','K',6,2,'🎭',15,true,'Nếu con là...','Nếu con là chú voi 1 ngày con sẽ làm gì?','+8 điểm Imagine','If I were...','If you were an elephant for a day, what would you do?','+8 Imagine'),
  Q('thk-k-7','thinking','K',7,1,'🔍',10,true,'Tìm điểm khác nhau','Chơi spot-the-difference 1 trang.','+5 điểm Eye','Spot difference','Play 1 spot-the-difference page.','+5 Eye'),

  Q('thk-p-1','thinking','P',1,2,'🧮',20,false,'Sudoku 4×4','Giải 1 sudoku 4×4 dễ.','+10 điểm Logic','4×4 sudoku','Solve 1 easy 4×4 sudoku.','+10 Logic'),
  Q('thk-p-2','thinking','P',2,2,'🎯',15,false,'Why why why','Đặt 5 câu "tại sao" về tin tức trong ngày.','+10 điểm Critical','5 whys today','Ask 5 "why" about today\'s news.','+10 Critical'),
  Q('thk-p-3','thinking','P',3,2,'🌳',20,false,'Mind map','Vẽ mind map 1 chủ đề con thích.','+10 điểm Map','Mind map','Draw a mind map on a topic you love.','+10 Map'),
  Q('thk-p-4','thinking','P',4,3,'🐛',25,false,'Debug 1 bug','Tìm 1 lỗi nhỏ trong Scratch project và sửa.','+12 điểm Debug','Find 1 bug','Find + fix 1 small Scratch bug.','+12 Debug'),
  Q('thk-p-5','thinking','P',5,2,'🤔',20,false,'Tin thật/giả','Đọc 2 tiêu đề báo, đoán đâu thật đâu giả.','+10 điểm Critical','Real vs fake','Read 2 headlines, guess which is real.','+10 Critical'),
  Q('thk-p-6','thinking','P',6,3,'⚖️',25,false,'Pros & cons','Liệt kê pros/cons cho 1 quyết định nhỏ.','+12 điểm Decide','Pros/cons','List pros/cons for 1 small decision.','+12 Decide'),
  Q('thk-p-7','thinking','P',7,2,'🎲',20,false,'Game cờ vua','Học 1 nước cờ vua mới.','+10 điểm Strategy','Chess move','Learn 1 new chess move.','+10 Strategy'),

  Q('thk-t-1','thinking','T',1,3,'♟️',30,false,'Chess puzzle','Giải 5 puzzle chess.com mỗi ngày.','+15 điểm Logic','5 chess puzzles','Solve 5 chess.com puzzles daily.','+15 Logic'),
  Q('thk-t-2','thinking','T',2,3,'🧠',30,false,'Logic Lý thuyết','Đọc về 1 logical fallacy + ví dụ tự đặt.','+15 điểm Logic','Fallacy of week','Read 1 logical fallacy + own example.','+15 Logic'),
  Q('thk-t-3','thinking','T',3,3,'🔬',30,false,'Phương pháp khoa học','Đặt giả thuyết + thiết kế thí nghiệm nhỏ.','+15 điểm Science','Scientific method','Form hypothesis + design tiny experiment.','+15 Science'),
  Q('thk-t-4','thinking','T',4,2,'📰',25,false,'Phân tích nguồn tin','So sánh 2 báo viết về 1 sự kiện.','+12 điểm Critical','Compare sources','Compare 2 newspapers on 1 event.','+12 Critical'),
  Q('thk-t-5','thinking','T',5,3,'🎯',30,false,'Tranh luận thân thiện','Tranh luận 1 chủ đề "vegan vs thịt" với Đại Ka.','+15 điểm Debate','Friendly debate','Debate "vegan vs meat" with Đại Ka.','+15 Debate'),
  Q('thk-t-6','thinking','T',6,3,'🧩',30,false,'KenKen / Kakuro','Giải 1 puzzle KenKen 5×5.','+15 điểm Logic','KenKen 5×5','Solve 1 KenKen 5×5 puzzle.','+15 Logic'),
  Q('thk-t-7','thinking','T',7,2,'📓',25,false,'Reflection viết','Viết 1 trang journal về 1 quyết định khó tuần qua.','+12 điểm Reflect','Decision journal','1 page journal on a hard decision this week.','+12 Reflect'),
];

// ────────────────────────────────────────────────────────────
// 5) BUSINESS — Kinh doanh
// ────────────────────────────────────────────────────────────
const QUESTS_BUSINESS: Quest[] = [
  Q('biz-k-1','business','K',1,1,'🍋',15,true,'Quầy chanh đồ chơi','Bán nước chanh giả với cốc đồ chơi cho cả nhà.','+5 điểm Sell','Toy lemonade','Pretend lemonade stand with toy cups.','+5 Sell'),
  Q('biz-k-2','business','K',2,1,'🎨',10,true,'Tranh tặng bố mẹ','Vẽ 1 tranh để bố mẹ "đặt hàng" gì lần sau.','+5 điểm Gift','Drawing for parents','Draw 1 picture parents can "order" next time.','+5 Gift'),
  Q('biz-k-3','business','K',3,1,'🤝',10,true,'Bắt tay khách','Tập bắt tay + cười khi gặp khách của bố.','+5 điểm Charm','Handshake practice','Practice handshake + smile with Dad\'s guests.','+5 Charm'),
  Q('biz-k-4','business','K',4,2,'📦',15,true,'Sắp đồ chơi gọn','Sắp xếp đồ chơi như 1 cửa hàng nhỏ.','+8 điểm Order','Tidy toy shop','Arrange toys like a small shop.','+8 Order'),
  Q('biz-k-5','business','K',5,1,'🎁',10,true,'Gói quà dễ thương','Gói 1 món quà nhỏ với giấy + ribbon.','+5 điểm Wrap','Gift wrapping','Wrap 1 small gift with paper + ribbon.','+5 Wrap'),
  Q('biz-k-6','business','K',6,2,'📞',10,true,'Giả gọi đặt hàng','Giả vờ gọi điện đặt pizza, nói rõ tên.','+8 điểm Speak','Pretend phone order','Pretend phone order, say name clearly.','+8 Speak'),
  Q('biz-k-7','business','K',7,1,'😊',10,true,'Nói cảm ơn 5 lần','Nói "thank you" 5 lần trong ngày.','+5 điểm Polite','5 thank yous','Say "thank you" 5 times today.','+5 Polite'),

  Q('biz-p-1','business','P',1,2,'🍋',30,true,'Quầy chanh thật','Bán nước chanh ngoài cổng 30 phút (nhỏ).','+12 điểm Sell','Real lemonade','Sell real lemonade at gate 30 min.','+12 Sell'),
  Q('biz-p-2','business','P',2,2,'💡',20,false,'3 ý tưởng kinh doanh','Brainstorm 3 ý tưởng kid-friendly cho cuối tuần.','+10 điểm Ideate','3 biz ideas','Brainstorm 3 kid biz ideas for weekend.','+10 Ideate'),
  Q('biz-p-3','business','P',3,2,'🏷️',20,false,'Định giá','Đặt giá cho sản phẩm tự làm theo công thức cost+30%.','+10 điểm Price','Set pricing','Price homemade item with cost+30% rule.','+10 Price'),
  Q('biz-p-4','business','P',4,3,'📣',25,false,'Poster quảng cáo','Vẽ poster quảng cáo lemonade stand.','+12 điểm Marketing','Ad poster','Draw lemonade stand ad poster.','+12 Marketing'),
  Q('biz-p-5','business','P',5,2,'🤔',20,false,'Phỏng vấn khách','Hỏi 3 người: "Cô/chú thích gì uống mùa hè?".','+10 điểm Research','Customer interview','Ask 3 people: "What summer drink do you like?".','+10 Research'),
  Q('biz-p-6','business','P',6,3,'📊',25,false,'Sổ doanh thu','Lập sổ ghi sản phẩm/giá/số bán/tổng.','+12 điểm Track','Sales log','Log product/price/qty/total.','+12 Track'),
  Q('biz-p-7','business','P',7,2,'🙏',15,true,'Cảm ơn khách','Viết 3 thiệp cảm ơn khách hàng.','+10 điểm Service','Thank you cards','Write 3 thank-you cards to customers.','+10 Service'),

  Q('biz-t-1','business','T',1,3,'📈',40,false,'Lập kế hoạch 1 trang','Viết 1-pager: ý tưởng/khách/giá/cost/rủi ro.','+15 điểm Plan','1-page plan','1-pager: idea/customer/price/cost/risk.','+15 Plan'),
  Q('biz-t-2','business','T',2,3,'🎤',30,false,'Pitch 60 giây','Pitch ý tưởng cho bố trong 60 giây.','+15 điểm Pitch','60-sec pitch','Pitch idea to Dad in 60 sec.','+15 Pitch'),
  Q('biz-t-3','business','T',3,3,'💵',30,false,'Đo unit economics','Tính cost/unit + lợi nhuận trên 1 sản phẩm.','+15 điểm Math','Unit economics','Compute cost+profit per unit.','+15 Math'),
  Q('biz-t-4','business','T',4,3,'🛒',30,false,'Bán online thử','Đăng bán 1 món đã sạch trên Facebook Marketplace.','+15 điểm Sell','Sell online','List 1 clean item on FB Marketplace.','+15 Sell'),
  Q('biz-t-5','business','T',5,2,'📞',25,false,'Cold pitch','Gọi điện nói "thank you" với 1 khách cũ của bố.','+12 điểm Charm','Thank-you call','Call 1 old customer of Dad to thank.','+12 Charm'),
  Q('biz-t-6','business','T',6,3,'🚀',30,false,'Lemonade Day','Ngày Lemonade — bán thật + tổng kết.','+15 điểm Sell','Lemonade Day','Lemonade Day — real sale + recap.','+15 Sell'),
  Q('biz-t-7','business','T',7,3,'📓',25,false,'Hậu mortem','Viết 3 cái work / 3 cái không work tuần kinh doanh.','+15 điểm Reflect','Postmortem','Write 3 wins / 3 losses of the biz week.','+15 Reflect'),
];

// ────────────────────────────────────────────────────────────
// 6) LIFE — Trải nghiệm thực
// ────────────────────────────────────────────────────────────
const QUESTS_LIFE: Quest[] = [
  Q('life-k-1','life','K',1,1,'🛏️',5,false,'Tự xếp giường','Tự kéo chăn + xếp gối sau khi dậy.','+5 điểm Tự lập','Make bed','Pull blanket + arrange pillow after waking.','+5 Independence'),
  Q('life-k-2','life','K',2,1,'🧦',5,false,'Tự mặc tất','Tự mang tất + giày dán.','+5 điểm Tự lập','Wear socks','Put on socks + velcro shoes alone.','+5 Independence'),
  Q('life-k-3','life','K',3,1,'🦷',5,false,'Đánh răng 2 phút','Đánh răng đủ 2 phút sáng + tối.','+5 điểm Vệ sinh','2-min brushing','Brush teeth 2 min morning+night.','+5 Hygiene'),
  Q('life-k-4','life','K',4,1,'🧹',10,true,'Quét sàn nhỏ','Quét 1 góc sàn với chổi nhỏ.','+5 điểm Help','Sweep corner','Sweep one floor corner with small broom.','+5 Help'),
  Q('life-k-5','life','K',5,1,'🥕',10,true,'Rửa rau','Rửa 5 cọng rau muống cùng mẹ.','+5 điểm Bếp','Wash veggies','Wash 5 spinach stems with Mom.','+5 Kitchen'),
  Q('life-k-6','life','K',6,1,'🚪',5,false,'Cất giày dép','Xếp giày 4 đôi gọn vào giá.','+5 điểm Order','Tidy shoes','Arrange 4 pairs of shoes neatly.','+5 Order'),
  Q('life-k-7','life','K',7,2,'👕',10,true,'Gấp áo dễ','Cùng mẹ gấp 5 áo phông.','+8 điểm Help','Fold tees','Fold 5 t-shirts with Mom.','+8 Help'),

  Q('life-p-1','life','P',1,2,'🍳',25,true,'Chiên trứng','Tự chiên 1 quả trứng dưới sự giám sát.','+12 điểm Bếp','Fry an egg','Fry 1 egg under supervision.','+12 Kitchen'),
  Q('life-p-2','life','P',2,2,'🚲',30,false,'Đạp xe 1 km','Đạp xe trong khu vực an toàn 1 km.','+12 điểm Vận động','Bike 1 km','Bike 1 km in safe area.','+12 Movement'),
  Q('life-p-3','life','P',3,2,'🌱',15,false,'Tưới cây','Tưới + kiểm tra 5 cây trong nhà.','+10 điểm Nature','Water plants','Water + check 5 plants.','+10 Nature'),
  Q('life-p-4','life','P',4,2,'🛒',20,true,'Đi mua đồ','Tự đi mua 3 món có list + tiền tự cầm.','+12 điểm Tự lập','Shopping run','Run 3-item shopping with list + cash.','+12 Independence'),
  Q('life-p-5','life','P',5,3,'🏠',30,false,'Dọn phòng','Dọn phòng đến mức "có thể chụp Instagram".','+12 điểm Order','Tidy room','Tidy room to Instagram-ready.','+12 Order'),
  Q('life-p-6','life','P',6,2,'🚌',20,true,'Đọc Google Maps','Tự tìm đường nhà → trường trên Maps.','+10 điểm Navigate','Read Google Maps','Find home→school on Maps alone.','+10 Navigate'),
  Q('life-p-7','life','P',7,2,'🩹',15,true,'Sơ cứu vết xước','Học rửa + băng vết xước nhỏ.','+10 điểm First Aid','Tiny first aid','Learn to clean + bandage scrape.','+10 First Aid'),

  Q('life-t-1','life','T',1,3,'🍝',45,false,'Nấu 1 món','Tự nấu 1 món pasta/cơm chiên.','+15 điểm Bếp','Cook a meal','Cook a pasta/fried rice solo.','+15 Kitchen'),
  Q('life-t-2','life','T',2,3,'🚌',30,false,'Đi xe bus','Tự đi 1 chuyến xe bus có lộ trình bố cấp.','+15 điểm Tự lập','Take a bus','Take a bus on planned route alone.','+15 Independence'),
  Q('life-t-3','life','T',3,2,'🧺',25,false,'Giặt máy','Vận hành máy giặt 1 lần đủ chu trình.','+12 điểm Home','Run washer','Run full washer cycle once.','+12 Home'),
  Q('life-t-4','life','T',4,3,'💉',25,true,'Đi khám 1 mình','Vào phòng khám gặp bác sĩ tự nói triệu chứng.','+15 điểm Brave','Doctor visit','Speak symptoms at clinic alone.','+15 Brave'),
  Q('life-t-5','life','T',5,3,'🏔️',60,true,'Trek nhỏ','Đi bộ leo dốc 1 giờ với bố.','+15 điểm Vận động','Mini trek','1-hour uphill hike with Dad.','+15 Movement'),
  Q('life-t-6','life','T',6,3,'🛠️',40,false,'Sửa đồ nhỏ','Tự sửa 1 món gia dụng (siết ốc, dán keo).','+15 điểm Fix','Tiny repair','Fix 1 home item (screw, glue).','+15 Fix'),
  Q('life-t-7','life','T',7,2,'📞',20,false,'Gọi đặt lịch','Tự gọi cắt tóc/đặt lịch 1 buổi cá nhân.','+12 điểm Adult','Book appointment','Call to book haircut/appointment.','+12 Adult'),
];

// ────────────────────────────────────────────────────────────
// 7) THEO DÕI — daily check-in / streak
// ────────────────────────────────────────────────────────────
const QUESTS_THEO_DOI: Quest[] = [
  Q('td-k-1','theo-doi','K',1,1,'😊',3,false,'Mood hôm nay','Chọn 1 emoji tả tâm trạng.','+3 streak','Today mood','Pick 1 emoji for mood.','+3 streak'),
  Q('td-k-2','theo-doi','K',2,1,'⭐',5,true,'1 điều vui','Kể bố 1 điều vui hôm nay.','+5 streak','1 happy thing','Tell Dad 1 happy thing today.','+5 streak'),
  Q('td-k-3','theo-doi','K',3,1,'🌟',5,true,'1 điều mới học','Kể bố 1 điều mới biết hôm nay.','+5 streak','1 new thing','Tell Dad 1 new thing learned today.','+5 streak'),
  Q('td-k-4','theo-doi','K',4,1,'❤️',5,true,'Cảm ơn ai','Cảm ơn 1 người hôm nay.','+5 streak','Thank someone','Thank 1 person today.','+5 streak'),
  Q('td-k-5','theo-doi','K',5,1,'🌸',3,false,'Stretch buổi sáng','Vươn vai 5 lần khi dậy.','+3 streak','Morning stretch','Stretch 5 times after waking.','+3 streak'),
  Q('td-k-6','theo-doi','K',6,1,'💧',3,false,'Uống nước','Uống 3 cốc nước hôm nay.','+3 streak','Drink water','Drink 3 cups water today.','+3 streak'),
  Q('td-k-7','theo-doi','K',7,1,'😴',3,false,'Ngủ đúng giờ','Lên giường trước 9 giờ tối.','+5 streak','Bedtime','In bed by 9pm.','+5 streak'),

  Q('td-p-1','theo-doi','P',1,1,'📓',5,false,'Journal 3 dòng','Viết 3 dòng journal cuối ngày.','+5 streak','3-line journal','Write 3-line journal end of day.','+5 streak'),
  Q('td-p-2','theo-doi','P',2,1,'⭐',5,false,'Win + struggle','Ghi 1 win + 1 struggle hôm nay.','+5 streak','Win+struggle','Note 1 win + 1 struggle.','+5 streak'),
  Q('td-p-3','theo-doi','P',3,1,'🎯',5,false,'Mục tiêu mai','Đặt 1 mục tiêu nhỏ cho ngày mai.','+5 streak','Tomorrow goal','Set 1 tiny goal for tomorrow.','+5 streak'),
  Q('td-p-4','theo-doi','P',4,2,'🙏',5,false,'Biết ơn','Liệt kê 3 điều biết ơn.','+5 streak','3 grateful','List 3 grateful things.','+5 streak'),
  Q('td-p-5','theo-doi','P',5,1,'💧',3,false,'8 cốc nước','Uống 8 cốc nước hôm nay.','+3 streak','8 cups water','Drink 8 cups today.','+3 streak'),
  Q('td-p-6','theo-doi','P',6,1,'📚',5,false,'15 phút đọc','Đọc 15 phút sách giấy.','+5 streak','15-min reading','Read paper book 15 min.','+5 streak'),
  Q('td-p-7','theo-doi','P',7,2,'📊',10,false,'Review tuần','Tự đánh giá 6 trụ cột tuần qua 1-5.','+10 streak','Weekly review','Self-rate 6 pillars 1-5 for the week.','+10 streak'),

  Q('td-t-1','theo-doi','T',1,2,'📓',10,false,'Journal 1 trang','Viết 1 trang journal.','+8 streak','1-page journal','Write 1 full journal page.','+8 streak'),
  Q('td-t-2','theo-doi','T',2,2,'⚡',10,false,'Energy log','Log năng lượng 0-10 mỗi 4 giờ.','+8 streak','Energy log','Log energy 0-10 every 4h.','+8 streak'),
  Q('td-t-3','theo-doi','T',3,2,'😌',10,false,'10-min mindful','Thiền 10 phút Headspace/Calm.','+8 streak','10-min mindful','10-min Headspace/Calm meditation.','+8 streak'),
  Q('td-t-4','theo-doi','T',4,2,'📅',15,false,'Tuần kế hoạch','Plan tuần tới với 3 ưu tiên.','+10 streak','Plan week','Plan next week + 3 priorities.','+10 streak'),
  Q('td-t-5','theo-doi','T',5,2,'🎯',10,false,'Habit tracker','Đánh dấu 5 thói quen đã làm.','+8 streak','Habit tracker','Mark 5 habits done.','+8 streak'),
  Q('td-t-6','theo-doi','T',6,2,'📈',15,false,'Tuần biểu đồ','Vẽ biểu đồ mood/energy 7 ngày.','+10 streak','Week chart','Chart 7-day mood/energy.','+10 streak'),
  Q('td-t-7','theo-doi','T',7,3,'🌅',20,false,'Quarter review','Tự review 13 tuần qua: kế hoạch quý mới.','+15 streak','Quarter review','Review past 13 weeks + next-quarter plan.','+15 streak'),
];

// ────────────────────────────────────────────────────────────
// 8) SÁNG TẠO — Studio Sáng tạo
// ────────────────────────────────────────────────────────────
const QUESTS_SANG_TAO: Quest[] = [
  Q('st-k-1','sang-tao','K',1,1,'🎨',15,false,'Vẽ gia đình','Vẽ tranh gia đình con.','+5 điểm Art','Draw family','Draw your family.','+5 Art'),
  Q('st-k-2','sang-tao','K',2,1,'🌈',10,false,'Cầu vồng giấy','Cắt + dán cầu vồng giấy màu.','+5 điểm Craft','Paper rainbow','Cut+paste paper rainbow.','+5 Craft'),
  Q('st-k-3','sang-tao','K',3,1,'🦋',15,false,'Bướm mosaic','Dán hạt giấy thành con bướm.','+5 điểm Craft','Mosaic butterfly','Make mosaic butterfly with paper bits.','+5 Craft'),
  Q('st-k-4','sang-tao','K',4,2,'🎭',15,true,'Đóng vai','Đóng vai cô giáo dạy bố ABC.','+8 điểm Play','Role play','Play teacher teaching Dad ABCs.','+8 Play'),
  Q('st-k-5','sang-tao','K',5,1,'🎵',15,false,'Tự chế bài hát','Tự nghĩ 1 bài hát 4 câu.','+8 điểm Music','Song-make','Make up a 4-line song.','+8 Music'),
  Q('st-k-6','sang-tao','K',6,1,'🍝',15,true,'Mì spaghetti','Vẽ tranh từ những sợi mì khô.','+5 điểm Craft','Pasta art','Make art from dry pasta.','+5 Craft'),
  Q('st-k-7','sang-tao','K',7,2,'🎨',20,false,'Tay vân ngón','In tay con thành con thú.','+8 điểm Art','Hand prints','Print handprints into animal art.','+8 Art'),

  Q('st-p-1','sang-tao','P',1,2,'📸',20,false,'5 góc nhà','Chụp 5 ảnh nghệ thuật trong nhà.','+10 điểm Photo','5 home shots','Shoot 5 artistic home photos.','+10 Photo'),
  Q('st-p-2','sang-tao','P',2,2,'📓',20,false,'Truyện 4 khung','Viết truyện 4 khung tranh.','+10 điểm Story','4-panel comic','Write 4-panel comic.','+10 Story'),
  Q('st-p-3','sang-tao','P',3,2,'🎬',25,false,'Stop motion','Làm 5 giây stop motion bằng Lego.','+12 điểm Anim','Stop motion','Make 5-sec stop motion with Lego.','+12 Anim'),
  Q('st-p-4','sang-tao','P',4,3,'🎤',20,false,'Cover bài hát','Hát + ghi âm 1 bài cover.','+12 điểm Music','Song cover','Sing + record 1 song cover.','+12 Music'),
  Q('st-p-5','sang-tao','P',5,2,'🌟',20,false,'Origami','Gấp 1 con vật origami mới.','+10 điểm Craft','Origami','Fold 1 new origami animal.','+10 Craft'),
  Q('st-p-6','sang-tao','P',6,3,'🎨',30,false,'Watercolor','Vẽ 1 cảnh thiên nhiên bằng màu nước.','+12 điểm Art','Watercolor','Watercolor a nature scene.','+12 Art'),
  Q('st-p-7','sang-tao','P',7,2,'🎁',25,false,'DIY quà','Tự làm 1 món quà sinh nhật cho bạn.','+12 điểm Gift','DIY gift','Handmake 1 birthday gift.','+12 Gift'),

  Q('st-t-1','sang-tao','T',1,3,'🎬',45,false,'Video 30s','Quay + edit 1 video 30 giây có nhạc.','+15 điểm Video','30-sec video','Shoot+edit 30-sec video w/ music.','+15 Video'),
  Q('st-t-2','sang-tao','T',2,3,'📚',30,false,'1 chương truyện','Viết 1 chương truyện ngắn 500 từ.','+15 điểm Story','1 chapter','Write 500-word story chapter.','+15 Story'),
  Q('st-t-3','sang-tao','T',3,3,'🎨',40,false,'Digital art','Vẽ digital trong Procreate/Krita.','+15 điểm Art','Digital art','Digital paint in Procreate/Krita.','+15 Art'),
  Q('st-t-4','sang-tao','T',4,3,'🎵',40,false,'Beat music','Tạo 1 beat 30s trong GarageBand.','+15 điểm Music','Music beat','Make 30-sec GarageBand beat.','+15 Music'),
  Q('st-t-5','sang-tao','T',5,2,'📷',30,false,'Photo project','Theme tuần: 7 ảnh kể 1 câu chuyện.','+12 điểm Photo','Photo theme','Weekly: 7 photos = 1 story.','+12 Photo'),
  Q('st-t-6','sang-tao','T',6,3,'🎨',45,false,'Brand mini','Thiết kế logo + bảng màu cho dự án nhỏ.','+15 điểm Design','Mini brand','Design logo + palette for tiny project.','+15 Design'),
  Q('st-t-7','sang-tao','T',7,3,'📰',30,false,'Zine','Làm 1 zine A5 8 trang về sở thích.','+15 điểm Zine','Make a zine','Make 8-page A5 zine on a hobby.','+15 Zine'),
];

// ────────────────────────────────────────────────────────────
// 9) VẬN ĐỘNG — Cơ thể & Vận động
// ────────────────────────────────────────────────────────────
const QUESTS_VAN_DONG: Quest[] = [
  Q('vd-k-1','van-dong','K',1,1,'🤸',10,false,'Nhảy 30 lần','Nhảy tại chỗ 30 lần.','+5 điểm Move','30 jumps','Jump on spot 30 times.','+5 Move'),
  Q('vd-k-2','van-dong','K',2,1,'🐸',10,false,'Cóc nhảy','5 lần cóc nhảy quanh phòng.','+5 điểm Move','Frog jumps','5 frog jumps around room.','+5 Move'),
  Q('vd-k-3','van-dong','K',3,1,'🐻',10,false,'Đi như gấu','Đi gấu (chân tay) qua phòng 2 lần.','+5 điểm Move','Bear walk','Bear walk room x2.','+5 Move'),
  Q('vd-k-4','van-dong','K',4,1,'⚽',15,true,'Đá bóng nhẹ','Đá bóng với bố 10 phút.','+8 điểm Move','Soft soccer','Kick ball w/ Dad 10 min.','+8 Move'),
  Q('vd-k-5','van-dong','K',5,1,'🎈',10,false,'Bóng bay không rớt','Giữ bóng bay không chạm đất 1 phút.','+5 điểm Move','Balloon up','Keep balloon up 1 min.','+5 Move'),
  Q('vd-k-6','van-dong','K',6,1,'💃',10,false,'Nhảy 1 bài','Nhảy theo 1 bài Wiggles.','+5 điểm Dance','Dance 1 song','Dance to a Wiggles song.','+5 Dance'),
  Q('vd-k-7','van-dong','K',7,1,'🧘',5,true,'Hít thở 5 lần','Tập hít thở sâu 5 lần với bố.','+5 điểm Calm','5 breaths','5 deep breaths with Dad.','+5 Calm'),

  Q('vd-p-1','van-dong','P',1,2,'🏃',20,false,'Chạy 1 km','Chạy chậm 1 km không nghỉ.','+10 điểm Cardio','Run 1 km','Easy 1-km run no stop.','+10 Cardio'),
  Q('vd-p-2','van-dong','P',2,2,'🤸',15,false,'10 push up','10 cái push up form đúng.','+10 điểm Strength','10 pushups','10 pushups proper form.','+10 Strength'),
  Q('vd-p-3','van-dong','P',3,2,'🚲',30,false,'Đạp xe 3 km','Đạp xe 3 km có mũ bảo hiểm.','+12 điểm Bike','Bike 3 km','Bike 3 km w/ helmet.','+12 Bike'),
  Q('vd-p-4','van-dong','P',4,2,'⚽',30,true,'Football kĩ năng','Tập 5 kĩ năng bóng đá cơ bản.','+12 điểm Skill','Soccer drills','5 basic soccer drills.','+12 Skill'),
  Q('vd-p-5','van-dong','P',5,3,'🏊',45,true,'Bơi 200m','Bơi liên tục 200m (4 vòng 50m).','+15 điểm Swim','Swim 200m','Swim 200m (4×50m).','+15 Swim'),
  Q('vd-p-6','van-dong','P',6,2,'🧘',15,false,'Yoga 15 min','Yoga theo Cosmic Kids YouTube.','+10 điểm Flex','15-min yoga','Yoga w/ Cosmic Kids YouTube.','+10 Flex'),
  Q('vd-p-7','van-dong','P',7,2,'🏸',30,true,'Cầu lông','Đánh cầu lông với anh chị 30 phút.','+12 điểm Sport','Badminton','Badminton with sibling 30 min.','+12 Sport'),

  Q('vd-t-1','van-dong','T',1,3,'🏃',30,false,'Chạy 3 km','Chạy 3 km dưới 18 phút.','+15 điểm Cardio','Run 3 km','Run 3 km under 18 min.','+15 Cardio'),
  Q('vd-t-2','van-dong','T',2,3,'💪',25,false,'Strength 20 min','Bài 20 phút bodyweight (squat/pushup/plank).','+15 điểm Strength','Strength 20m','20-min bodyweight (squat/pushup/plank).','+15 Strength'),
  Q('vd-t-3','van-dong','T',3,3,'🚴',60,false,'Đạp xe 10 km','Cycle 10 km có nước + mũ.','+15 điểm Cardio','Bike 10 km','Cycle 10 km w/ water + helmet.','+15 Cardio'),
  Q('vd-t-4','van-dong','T',4,2,'🤸',20,false,'Stretch sau ngày học','15 phút stretch toàn thân.','+12 điểm Flex','Post-school stretch','15-min full-body stretch.','+12 Flex'),
  Q('vd-t-5','van-dong','T',5,3,'🥋',45,true,'Võ thuật','Tập 1 buổi võ (Vovinam/Karate).','+15 điểm Martial','Martial art','1 martial arts class.','+15 Martial'),
  Q('vd-t-6','van-dong','T',6,3,'🏔️',90,true,'Hike 5 km','Đi hike 5 km cùng bố.','+15 điểm Hike','5-km hike','5-km hike with Dad.','+15 Hike'),
  Q('vd-t-7','van-dong','T',7,2,'🛌',5,false,'Sleep 9 giờ','Ngủ đủ 9 giờ đêm qua.','+10 điểm Recovery','Sleep 9h','Slept 9h last night.','+10 Recovery'),
];

// ────────────────────────────────────────────────────────────
// 10) TỰ KHÁM PHÁ — Self Discovery
// ────────────────────────────────────────────────────────────
const QUESTS_TU_KHAM_PHA: Quest[] = [
  Q('tkp-k-1','tu-kham-pha','K',1,1,'🌟',5,true,'Sở thích nhất','Kể bố 3 thứ con thích nhất hôm nay.','+5 điểm Self','3 favorites','Tell Dad 3 favorite things today.','+5 Self'),
  Q('tkp-k-2','tu-kham-pha','K',2,1,'🎨',10,true,'Màu yêu thích','Vẽ màu con yêu nhất + tại sao.','+5 điểm Self','Fav color','Draw favorite color + why.','+5 Self'),
  Q('tkp-k-3','tu-kham-pha','K',3,1,'😊',5,true,'Vui khi nào','Kể 1 lần con vui nhất tuần này.','+5 điểm EQ','When happy','Tell about happiest moment this week.','+5 EQ'),
  Q('tkp-k-4','tu-kham-pha','K',4,1,'😢',5,true,'Buồn khi nào','Kể 1 lần con buồn + bố ôm.','+5 điểm EQ','When sad','Tell sad moment + get hug.','+5 EQ'),
  Q('tkp-k-5','tu-kham-pha','K',5,1,'🦸',10,true,'Siêu năng lực','Nếu có siêu năng lực con chọn gì?','+5 điểm Imagine','Superpower','If you had superpower what?','+5 Imagine'),
  Q('tkp-k-6','tu-kham-pha','K',6,1,'🌺',10,false,'Quan sát hoa','Quan sát 1 bông hoa 5 phút, kể chi tiết.','+5 điểm Observe','Observe flower','Watch flower 5 min, share details.','+5 Observe'),
  Q('tkp-k-7','tu-kham-pha','K',7,2,'❤️',10,true,'Yêu thương ai','3 người con yêu nhất + lý do.','+8 điểm EQ','Loved ones','Top 3 loved + why.','+8 EQ'),

  Q('tkp-p-1','tu-kham-pha','P',1,2,'📓',15,false,'Mood journal','Viết mood + 1 lý do.','+10 điểm EQ','Mood journal','Log mood + 1 reason.','+10 EQ'),
  Q('tkp-p-2','tu-kham-pha','P',2,2,'🎯',15,false,'5 điều giỏi','Liệt kê 5 thứ con đang giỏi.','+10 điểm Self','5 strengths','List 5 things you\'re good at.','+10 Self'),
  Q('tkp-p-3','tu-kham-pha','P',3,3,'🧠',20,false,'RIASEC mini','Làm 12 câu RIASEC + xem kết quả.','+12 điểm Career','RIASEC mini','Do 12-question RIASEC + results.','+12 Career'),
  Q('tkp-p-4','tu-kham-pha','P',4,2,'🌱',15,false,'Tôi muốn học','Liệt kê 3 thứ con muốn học giỏi.','+10 điểm Goal','I want to learn','3 things I want to learn.','+10 Goal'),
  Q('tkp-p-5','tu-kham-pha','P',5,2,'🛑',15,true,'Khi tức giận','Học 3 cách bình tĩnh khi tức.','+10 điểm EQ','When angry','Learn 3 calm-down techniques.','+10 EQ'),
  Q('tkp-p-6','tu-kham-pha','P',6,2,'📚',15,false,'Hero của tôi','Viết 5 câu về 1 nhân vật con ngưỡng mộ.','+10 điểm Reflect','My hero','5 sentences about a hero.','+10 Reflect'),
  Q('tkp-p-7','tu-kham-pha','P',7,2,'🎯',20,false,'Mục tiêu 1 tháng','Đặt 1 mục tiêu cá nhân 30 ngày.','+12 điểm Goal','30-day goal','Set 1 personal 30-day goal.','+12 Goal'),

  Q('tkp-t-1','tu-kham-pha','T',1,3,'🧠',30,false,'RIASEC full','Làm 48 câu RIASEC + đọc kết quả chi tiết.','+15 điểm Career','RIASEC full','Do 48-question RIASEC + deep result.','+15 Career'),
  Q('tkp-t-2','tu-kham-pha','T',2,3,'📊',30,false,'StrengthsFinder kid','Top 3 strength + ví dụ thật.','+15 điểm Self','Top 3 strengths','Top 3 strengths + real examples.','+15 Self'),
  Q('tkp-t-3','tu-kham-pha','T',3,3,'📓',30,false,'Letter to future me','Viết thư cho con 5 năm tới.','+15 điểm Reflect','Letter to future me','Letter to future-self in 5 years.','+15 Reflect'),
  Q('tkp-t-4','tu-kham-pha','T',4,2,'❌',20,false,'Không thích gì','Liệt kê 5 thứ con không hợp + tại sao.','+12 điểm Self','5 dislikes','List 5 things you don\'t like + why.','+12 Self'),
  Q('tkp-t-5','tu-kham-pha','T',5,3,'🎢',25,false,'Vùng comfort','3 hành động bước ra vùng thoải mái tuần này.','+15 điểm Brave','Comfort zone','3 acts outside comfort zone.','+15 Brave'),
  Q('tkp-t-6','tu-kham-pha','T',6,2,'💭',25,false,'Giá trị cốt lõi','Chọn 5 giá trị cốt lõi + giải thích.','+12 điểm Values','Core values','Pick 5 core values + explain.','+12 Values'),
  Q('tkp-t-7','tu-kham-pha','T',7,3,'🪞',30,false,'Tự đánh giá','Tự rate 12 pillars 0-10 + 1 hành động cải thiện.','+15 điểm Reflect','Self-rate','Rate 12 pillars 0-10 + 1 improve.','+15 Reflect'),
];

// ────────────────────────────────────────────────────────────
// 11) LA BÀN NGHỀ — Career Compass
// ────────────────────────────────────────────────────────────
const QUESTS_LA_BAN: Quest[] = [
  Q('lb-k-1','la-ban','K',1,1,'👨‍🍳',10,true,'Bố/mẹ làm gì','Hỏi bố/mẹ làm nghề gì.','+5 điểm Career','Parent\'s job','Ask parents their job.','+5 Career'),
  Q('lb-k-2','la-ban','K',2,1,'👩‍🚒',10,true,'Cô lính cứu hỏa','Cô/chú lính cứu hỏa làm gì? Vẽ tranh.','+5 điểm Career','Firefighter','What firefighters do? Draw it.','+5 Career'),
  Q('lb-k-3','la-ban','K',3,1,'👨‍⚕️',10,true,'Bác sĩ','Bác sĩ giúp gì? Đóng vai khám bố.','+5 điểm Career','Doctor','How doctors help? Roleplay on Dad.','+5 Career'),
  Q('lb-k-4','la-ban','K',4,1,'👩‍🍳',10,true,'Đầu bếp','Đầu bếp làm gì? Tự làm 1 món bằng đồ chơi.','+5 điểm Career','Chef','What chefs do? Cook with toys.','+5 Career'),
  Q('lb-k-5','la-ban','K',5,1,'👮',10,true,'Cảnh sát','Cảnh sát giúp ai? Vẽ tranh.','+5 điểm Career','Police','Who do police help? Draw it.','+5 Career'),
  Q('lb-k-6','la-ban','K',6,1,'👨‍🌾',10,true,'Nông dân','Nông dân trồng gì? Tưới cây trong vườn.','+5 điểm Career','Farmer','What farmers grow? Water plants.','+5 Career'),
  Q('lb-k-7','la-ban','K',7,1,'👩‍🏫',10,true,'Cô giáo','Cô giáo dạy gì? Đóng vai dạy bố.','+5 điểm Career','Teacher','What teachers do? Teach Dad.','+5 Career'),

  Q('lb-p-1','la-ban','P',1,2,'🔍',20,false,'Khám phá 1 nghề','Đọc + xem video về 1 nghề tò mò.','+10 điểm Career','Explore 1 job','Read+watch about 1 curious job.','+10 Career'),
  Q('lb-p-2','la-ban','P',2,2,'🎤',25,true,'Phỏng vấn','Hỏi 1 người lớn về nghề của họ 5 câu.','+12 điểm Career','Interview','Ask adult 5 Qs about their job.','+12 Career'),
  Q('lb-p-3','la-ban','P',3,2,'📓',20,false,'A day in life','Viết "1 ngày làm bác sĩ" 5 câu.','+10 điểm Career','Day in life','Write "day as doctor" 5 sentences.','+10 Career'),
  Q('lb-p-4','la-ban','P',4,2,'🎯',20,false,'3 nghề muốn thử','Liệt kê 3 nghề muốn thử + lý do.','+10 điểm Career','3 jobs','List 3 jobs to try + why.','+10 Career'),
  Q('lb-p-5','la-ban','P',5,3,'🏃',45,true,'Job shadow nhỏ','Đi theo bố/mẹ 1 buổi làm việc.','+15 điểm Career','Mini shadow','Shadow parent 1 work session.','+15 Career'),
  Q('lb-p-6','la-ban','P',6,2,'📚',20,false,'Nghề trong sách','Đọc 1 chương sách có nghề lạ.','+10 điểm Career','Job in book','Read chapter with unusual job.','+10 Career'),
  Q('lb-p-7','la-ban','P',7,2,'🎨',20,false,'Vẽ tôi 25 tuổi','Vẽ con đang làm nghề ở tuổi 25.','+10 điểm Imagine','Me at 25','Draw self working at age 25.','+10 Imagine'),

  Q('lb-t-1','la-ban','T',1,3,'📞',30,false,'Phỏng vấn pro','Phỏng vấn 1 chuyên gia 15 phút.','+15 điểm Career','Pro interview','Interview a professional 15 min.','+15 Career'),
  Q('lb-t-2','la-ban','T',2,3,'🎓',30,false,'Lộ trình học','Vẽ lộ trình từ giờ đến nghề mơ ước.','+15 điểm Plan','Path to dream','Map from now to dream job.','+15 Plan'),
  Q('lb-t-3','la-ban','T',3,3,'🌐',30,false,'Nghề tương lai','Tìm 5 nghề mới sẽ phát triển 2030.','+15 điểm Future','Future jobs','Find 5 emerging 2030 jobs.','+15 Future'),
  Q('lb-t-4','la-ban','T',4,2,'💼',25,false,'CV mini','Viết CV 1 trang dù chưa làm.','+12 điểm CV','Mini CV','Write 1-page CV (even if no job yet).','+12 CV'),
  Q('lb-t-5','la-ban','T',5,3,'🚀',30,false,'Side project','Bắt đầu 1 side project liên quan nghề mơ.','+15 điểm Build','Side project','Start project tied to dream job.','+15 Build'),
  Q('lb-t-6','la-ban','T',6,2,'🌍',25,false,'Nghề toàn cầu','3 nghề có thể làm từ xa world-wide.','+12 điểm Global','Global jobs','3 remote jobs you could do worldwide.','+12 Global'),
  Q('lb-t-7','la-ban','T',7,3,'🎯',30,false,'5-year vision','Viết 5-year vision: nghề + skill + impact.','+15 điểm Vision','5-year vision','Write 5-year vision: job + skill + impact.','+15 Vision'),
];

// ────────────────────────────────────────────────────────────
// 12) GIA ĐÌNH — Cầu nối Gia đình
// ────────────────────────────────────────────────────────────
const QUESTS_GIA_DINH: Quest[] = [
  Q('gd-k-1','gia-dinh','K',1,1,'🤗',5,false,'Ôm bố mẹ','Ôm bố mẹ trước khi ngủ.','+5 điểm Family','Hug parents','Hug parents before bed.','+5 Family'),
  Q('gd-k-2','gia-dinh','K',2,1,'🥕',10,true,'Phụ chuẩn bị bữa','Phụ mẹ rửa rau hoặc dọn bát.','+5 điểm Help','Help meal','Help wash veggies or set bowls.','+5 Help'),
  Q('gd-k-3','gia-dinh','K',3,1,'😘',5,true,'Hôn anh chị','Tạo thói quen hôn chào anh chị buổi sáng.','+5 điểm Bond','Sibling kiss','Morning kiss to sibling.','+5 Bond'),
  Q('gd-k-4','gia-dinh','K',4,1,'❤️',10,true,'Vẽ thiệp','Vẽ thiệp tặng bố/mẹ vô lý do.','+5 điểm Family','Random card','Random "love you" card to parent.','+5 Family'),
  Q('gd-k-5','gia-dinh','K',5,1,'📞',5,true,'Gọi ông bà','Cùng bố/mẹ gọi điện ông bà 5 phút.','+5 điểm Bond','Call grandparents','Call grandparents 5 min w/ parent.','+5 Bond'),
  Q('gd-k-6','gia-dinh','K',6,1,'🍽️',10,false,'Dọn bàn ăn','Tự dọn 1 phần bàn ăn.','+5 điểm Help','Set table','Set 1 part of dinner table.','+5 Help'),
  Q('gd-k-7','gia-dinh','K',7,1,'🥰',10,true,'Bedtime story','Đọc cùng bố/mẹ 1 truyện trước ngủ.','+5 điểm Bond','Bedtime story','Read 1 story with parent at bedtime.','+5 Bond'),

  Q('gd-p-1','gia-dinh','P',1,2,'🍳',25,true,'Sáng cùng bố','Cùng bố nấu sáng 25 phút.','+10 điểm Bond','Brekkie w/ Dad','Cook 25-min breakfast w/ Dad.','+10 Bond'),
  Q('gd-p-2','gia-dinh','P',2,2,'🎲',30,false,'Game gia đình','Tổ chức 1 game tối với cả nhà 30 phút.','+12 điểm Bond','Family game','Run 30-min family game night.','+12 Bond'),
  Q('gd-p-3','gia-dinh','P',3,2,'📓',15,false,'Notebook gia đình','Viết 1 entry vào sổ gia đình.','+10 điểm Bond','Family notebook','Write 1 family-notebook entry.','+10 Bond'),
  Q('gd-p-4','gia-dinh','P',4,2,'🎤',15,true,'Interview anh chị','Hỏi anh chị 5 câu vui.','+10 điểm Bond','Sibling interview','Ask sibling 5 fun Qs.','+10 Bond'),
  Q('gd-p-5','gia-dinh','P',5,2,'🧹',20,false,'Phụ dọn nhà','Phụ dọn cuối tuần 20 phút.','+10 điểm Help','Weekend cleanup','Help 20-min weekend cleanup.','+10 Help'),
  Q('gd-p-6','gia-dinh','P',6,2,'📞',20,true,'Story ông bà','Hỏi ông bà 1 chuyện thời thơ ấu.','+10 điểm Bond','Grandparent story','Ask grandparent a childhood story.','+10 Bond'),
  Q('gd-p-7','gia-dinh','P',7,3,'🎬',45,false,'Đêm phim','Plan + chiếu 1 phim cho cả nhà.','+12 điểm Bond','Movie night','Plan + run a family movie night.','+12 Bond'),

  Q('gd-t-1','gia-dinh','T',1,3,'🎂',60,true,'Plan sinh nhật','Plan + làm sinh nhật người trong nhà.','+15 điểm Bond','Plan birthday','Plan + run a family birthday.','+15 Bond'),
  Q('gd-t-2','gia-dinh','T',2,3,'🍝',45,false,'Nấu cho cả nhà','Tự nấu 1 bữa cho cả gia đình.','+15 điểm Bond','Cook for all','Cook 1 meal for family.','+15 Bond'),
  Q('gd-t-3','gia-dinh','T',3,3,'📓',30,false,'Family review','Chủ trì family review tuần 30 phút.','+15 điểm Lead','Lead family review','Lead family review 30 min.','+15 Lead'),
  Q('gd-t-4','gia-dinh','T',4,2,'🎁',30,false,'Quà bất ngờ','Tự làm + tặng quà bất ngờ cho 1 người nhà.','+12 điểm Gift','Surprise gift','Make + give surprise to 1 family.','+12 Gift'),
  Q('gd-t-5','gia-dinh','T',5,3,'🏞️',180,true,'Day trip','Co-plan day trip cuối tuần.','+15 điểm Plan','Day trip','Co-plan a weekend day trip.','+15 Plan'),
  Q('gd-t-6','gia-dinh','T',6,2,'📷',30,false,'Album gia đình','Sắp xếp 50 ảnh cũ vào album.','+12 điểm Memory','Family album','Sort 50 old photos into an album.','+12 Memory'),
  Q('gd-t-7','gia-dinh','T',7,3,'🤝',30,false,'Mâu thuẫn ráp','Hòa giải 1 mâu thuẫn nhỏ với anh chị + tự suy ngẫm.','+15 điểm EQ','Reconcile','Reconcile sibling spat + reflect.','+15 EQ'),
];

// ────────────────────────────────────────────────────────────
// COMBINE ALL QUESTS
// ────────────────────────────────────────────────────────────
export const ALL_QUESTS: Quest[] = [
  ...QUESTS_TECH,        // 21
  ...QUESTS_ENGLISH,     // 21
  ...QUESTS_FINANCE,     // 21
  ...QUESTS_THINKING,    // 21
  ...QUESTS_BUSINESS,    // 21
  ...QUESTS_LIFE,        // 21
  ...QUESTS_THEO_DOI,    // 21
  ...QUESTS_SANG_TAO,    // 21
  ...QUESTS_VAN_DONG,    // 21
  ...QUESTS_TU_KHAM_PHA, // 21
  ...QUESTS_LA_BAN,      // 21
  ...QUESTS_GIA_DINH,    // 21
];
// TOTAL: 12 pillars × 3 age groups × 7 days = 252 quests

// ────────────────────────────────────────────────────────────
// HELPERS — query the bank
// ────────────────────────────────────────────────────────────
export function getQuestsByAge(age: number): Quest[] {
  const group: AgeGroup = age <= 6 ? 'K' : age <= 11 ? 'P' : 'T';
  return ALL_QUESTS.filter((q) => q.ageGroup === group);
}

export function getQuestsByPillar(pillar: Pillar, age: number): Quest[] {
  return getQuestsByAge(age).filter((q) => q.pillar === pillar);
}

export function getQuestsForDay(age: number, dayOfWeek: number): Quest[] {
  // dayOfWeek: 1=Mon ... 7=Sun
  return getQuestsByAge(age).filter((q) => q.day === dayOfWeek);
}

export function getRandomQuest(age: number, pillar?: Pillar): Quest | null {
  const pool = pillar ? getQuestsByPillar(pillar, age) : getQuestsByAge(age);
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getQuestStats() {
  const stats = {
    total: ALL_QUESTS.length,
    byAge: { K: 0, P: 0, T: 0 } as Record<AgeGroup, number>,
    byPillar: {} as Record<string, number>,
    byDay: {} as Record<number, number>,
  };
  ALL_QUESTS.forEach((q) => {
    stats.byAge[q.ageGroup]++;
    stats.byPillar[q.pillar] = (stats.byPillar[q.pillar] || 0) + 1;
    stats.byDay[q.day] = (stats.byDay[q.day] || 0) + 1;
  });
  return stats;
}
