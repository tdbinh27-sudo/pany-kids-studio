// Family Bridge — connection prompts and templates
// Designed to strengthen parent-child bond through structured rituals

export interface FamilyPrompt {
  id: number;
  vi: string;
  en: string;
  category: 'gratitude' | 'reflection' | 'connection' | 'curiosity' | 'memory';
}

// "Hỏi bố cha hôm nay" — daily prompts for kids to ask parent
export const ASK_PARENT_PROMPTS: FamilyPrompt[] = [
  { id: 1, vi: 'Hồi nhỏ bố thích trò chơi gì nhất?', en: 'What was your favorite game when you were little?', category: 'memory' },
  { id: 2, vi: 'Lần đầu bố kiếm được tiền là khi nào?', en: 'When did you earn money for the first time?', category: 'memory' },
  { id: 3, vi: 'Bố mơ ước trở thành ai khi 10 tuổi?', en: 'Who did you dream of becoming when you were 10?', category: 'memory' },
  { id: 4, vi: 'Điều khó nhất bố đã vượt qua là gì?', en: 'What was the hardest thing you overcame?', category: 'reflection' },
  { id: 5, vi: 'Người ảnh hưởng đến bố nhất là ai?', en: 'Who influenced you the most?', category: 'memory' },
  { id: 6, vi: 'Bố tự hào nhất về điều gì?', en: 'What are you most proud of?', category: 'reflection' },
  { id: 7, vi: 'Nếu được làm lại tuổi 15, bố sẽ làm gì khác?', en: 'If you could redo age 15, what would you change?', category: 'reflection' },
  { id: 8, vi: 'Cuốn sách nào đã thay đổi bố?', en: 'What book changed you?', category: 'curiosity' },
  { id: 9, vi: 'Bố muốn đi du lịch đâu nhất?', en: 'Where do you most want to travel?', category: 'curiosity' },
  { id: 10, vi: 'Bố sợ điều gì nhất? Làm sao bố vượt qua?', en: 'What\'s your biggest fear? How do you face it?', category: 'reflection' },
  { id: 11, vi: 'Bố ăn món gì là nhớ ông bà nhất?', en: 'What food reminds you most of grandparents?', category: 'memory' },
  { id: 12, vi: 'Bố cảm thấy hạnh phúc nhất khi nào?', en: 'When are you happiest?', category: 'connection' },
  { id: 13, vi: 'Một câu nói nào đã giúp bố nhiều nhất?', en: 'What quote has helped you most?', category: 'reflection' },
  { id: 14, vi: 'Bố muốn dạy con điều gì quan trọng nhất?', en: 'What\'s the most important thing you want to teach me?', category: 'connection' },
  { id: 15, vi: 'Lần đầu bố thấy mẹ là khi nào?', en: 'When did you first meet mom?', category: 'memory' },
  { id: 16, vi: 'Bố nghĩ con giống bố ở điểm nào?', en: 'How do you think I\'m similar to you?', category: 'connection' },
  { id: 17, vi: 'Khoảnh khắc nào với gia đình bố nhớ nhất?', en: 'What family moment do you remember most?', category: 'memory' },
  { id: 18, vi: 'Bố ước gì hồi nhỏ ai đó đã nói với bố?', en: 'What do you wish someone had told you as a kid?', category: 'reflection' },
  { id: 19, vi: 'Sai lầm nào dạy bố nhiều nhất?', en: 'What mistake taught you the most?', category: 'reflection' },
  { id: 20, vi: 'Bố thấy thế giới sẽ thế nào khi con bằng tuổi bố bây giờ?', en: 'How will the world be when I\'m your age now?', category: 'curiosity' },
  { id: 21, vi: 'Bố làm sao để giữ tinh thần lạc quan?', en: 'How do you stay positive?', category: 'reflection' },
  { id: 22, vi: 'Bố đã từng có người bạn thân nhất nào?', en: 'Who was your best friend ever?', category: 'memory' },
  { id: 23, vi: 'Bố nghĩ định nghĩa "thành công" là gì?', en: 'What\'s your definition of success?', category: 'reflection' },
  { id: 24, vi: 'Bố làm gì khi cảm thấy buồn?', en: 'What do you do when you feel sad?', category: 'connection' },
  { id: 25, vi: 'Bố biết ơn nhất ai trong đời?', en: 'Who are you most grateful to in life?', category: 'gratitude' },
  { id: 26, vi: 'Một thói quen nào bố muốn truyền cho con?', en: 'What habit do you want to pass on?', category: 'connection' },
  { id: 27, vi: 'Ngày sinh nhật vui nhất của bố là khi nào?', en: 'What was your happiest birthday?', category: 'memory' },
  { id: 28, vi: 'Bố nghĩ gì khi nhìn thấy con lần đầu?', en: 'What did you think when you first saw me?', category: 'connection' },
  { id: 29, vi: 'Bố từng theo đuổi đam mê nào nhưng không thành?', en: 'What passion did you pursue but not complete?', category: 'reflection' },
  { id: 30, vi: 'Bố nghĩ gia đình mình có siêu năng lực gì?', en: 'What\'s our family\'s superpower?', category: 'connection' },
];

// Weekly review prompts — Sunday family reflection
export const WEEKLY_REVIEW_PROMPTS = {
  vi: [
    { q: '🌟 Điều con vui nhất trong tuần?', placeholder: 'Hoàn thành dự án vẽ, được khen...' },
    { q: '💪 Điều con tự hào nhất đã làm?', placeholder: 'Tự dậy đúng giờ, giúp em...' },
    { q: '😢 Điều khiến con buồn/khó khăn?', placeholder: 'Bài kiểm tra khó, mâu thuẫn với bạn...' },
    { q: '🌱 Con học được điều gì mới?', placeholder: 'Một kỹ năng, một sự thật...' },
    { q: '🙏 Con biết ơn ai trong tuần này?', placeholder: 'Bố mẹ, cô giáo, bạn bè...' },
    { q: '🎯 Mục tiêu tuần sau của con?', placeholder: 'Đọc xong cuốn sách, tập đàn 5 lần...' },
  ],
  en: [
    { q: '🌟 What made you happiest this week?', placeholder: 'Finished art project, got praise...' },
    { q: '💪 What are you most proud of doing?', placeholder: 'Woke up on time, helped sibling...' },
    { q: '😢 What made you sad/struggle?', placeholder: 'Hard test, conflict with friend...' },
    { q: '🌱 What new thing did you learn?', placeholder: 'A skill, a fact...' },
    { q: '🙏 Who are you grateful for this week?', placeholder: 'Parents, teacher, friend...' },
    { q: '🎯 Goal for next week?', placeholder: 'Finish a book, practice piano 5 times...' },
  ],
};

// Show & Tell ideas — weekly family sharing
export const SHOW_TELL_IDEAS = [
  { vi: 'Một tác phẩm con vẽ tuần này', en: 'An artwork you made this week', emoji: '🎨' },
  { vi: 'Một bài hát/clip con yêu thích — tại sao?', en: 'A song/clip you love — why?', emoji: '🎵' },
  { vi: 'Một sự thật con vừa khám phá', en: 'A fact you just discovered', emoji: '💡' },
  { vi: 'Một sản phẩm con tự làm', en: 'Something you built yourself', emoji: '🔨' },
  { vi: 'Một câu chuyện hài/lạ con nghe được', en: 'A funny/strange story you heard', emoji: '😄' },
  { vi: 'Một trang web/app cool con tìm thấy', en: 'A cool website/app you found', emoji: '🌐' },
  { vi: 'Một quyển sách con đang đọc — tóm tắt 3 câu', en: 'A book you\'re reading — summary in 3 sentences', emoji: '📖' },
  { vi: 'Một kỹ năng mới con đang học', en: 'A new skill you\'re learning', emoji: '🎯' },
  { vi: 'Một địa điểm con muốn đi du lịch', en: 'A place you want to travel to', emoji: '✈️' },
  { vi: 'Một người con ngưỡng mộ tuần này', en: 'Someone you admire this week', emoji: '⭐' },
  { vi: 'Một mục tiêu con đặt cho tháng sau', en: 'A goal you set for next month', emoji: '🚀' },
  { vi: 'Một câu hỏi con đang suy nghĩ về', en: 'A question you\'re thinking about', emoji: '🤔' },
  { vi: 'Một meme/joke con thấy hay', en: 'A meme/joke you found great', emoji: '😂' },
  { vi: 'Một thử nghiệm khoa học con muốn làm', en: 'A science experiment you want to do', emoji: '🧪' },
  { vi: 'Một video TikTok/YouTube hay nhất tuần', en: 'Best TikTok/YouTube of the week', emoji: '📹' },
];

// Family activity ideas — by time and energy level
export const FAMILY_ACTIVITIES = [
  { vi: '🎮 Chơi board game cả nhà 1 tiếng', en: '🎮 Family board game 1 hour', minutes: 60, energy: 'low' },
  { vi: '🍳 Cùng nấu một món ăn mới', en: '🍳 Cook a new dish together', minutes: 90, energy: 'medium' },
  { vi: '🚶 Đi dạo công viên + nhặt rác', en: '🚶 Park walk + pick up trash', minutes: 60, energy: 'medium' },
  { vi: '🎬 Xem phim cùng nhau + thảo luận', en: '🎬 Watch movie + discuss', minutes: 150, energy: 'low' },
  { vi: '📚 Đọc sách to cho cả nhà nghe', en: '📚 Read aloud to family', minutes: 30, energy: 'low' },
  { vi: '🎨 Cùng vẽ 1 bức tranh chung', en: '🎨 Draw a shared painting', minutes: 60, energy: 'low' },
  { vi: '🚴 Đạp xe quanh hồ', en: '🚴 Bike around the lake', minutes: 90, energy: 'high' },
  { vi: '🌱 Trồng cây ngoài ban công', en: '🌱 Plant on the balcony', minutes: 45, energy: 'medium' },
  { vi: '🧩 Giải puzzle 500+ mảnh', en: '🧩 Solve 500+ piece puzzle', minutes: 180, energy: 'low' },
  { vi: '📸 Photo walk chụp 30 ảnh đẹp', en: '📸 Photo walk — capture 30 great shots', minutes: 90, energy: 'medium' },
  { vi: '💃 Cả nhà học 1 điệu nhảy TikTok', en: '💃 Family learn a TikTok dance', minutes: 30, energy: 'high' },
  { vi: '🍦 Tìm tiệm kem mới + review', en: '🍦 Find a new ice cream shop + review', minutes: 60, energy: 'low' },
  { vi: '🎤 Karaoke gia đình 1 tiếng', en: '🎤 Family karaoke 1 hour', minutes: 60, energy: 'medium' },
  { vi: '🏛️ Đi bảo tàng + mỗi người tìm 3 điều cool', en: '🏛️ Museum visit + everyone finds 3 cool things', minutes: 120, energy: 'medium' },
  { vi: '📝 Viết thư cho bản thân 5 năm sau', en: '📝 Write letter to future self in 5 years', minutes: 30, energy: 'low' },
];
