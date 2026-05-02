// RIASEC Junior — adapted from Holland's RIASEC for Vietnamese kids
// 36 questions (ages 8-12), 48 questions (ages 13-15)
// Each question maps to one of 6 types: R, I, A, S, E, C

export type RiasecType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface RiasecQuestion {
  id: number;
  vi: string;
  en: string;
  type: RiasecType;
}

export interface RiasecResult {
  type: RiasecType;
  vi_name: string;
  en_name: string;
  vi_desc: string;
  en_desc: string;
  emoji: string;
  color: string;
  vi_careers: string[];
  en_careers: string[];
}

export const RIASEC_TYPES: RiasecResult[] = [
  {
    type: 'R', vi_name: 'Thực tế', en_name: 'Realistic', emoji: '🔧', color: '#4DABF7',
    vi_desc: 'Con thích làm việc bằng tay, xây dựng, sửa chữa, và hoạt động ngoài trời',
    en_desc: 'You like working with your hands, building, fixing, and outdoor activities',
    vi_careers: ['Kỹ sư cơ khí', 'Kiến trúc sư', 'Bác sĩ thú y', 'Phi công', 'Đầu bếp', 'Nông nghiệp công nghệ cao', 'Thợ điện', 'Huấn luyện viên thể thao', 'Nhà thám hiểm', 'Lính cứu hỏa'],
    en_careers: ['Mechanical Engineer', 'Architect', 'Veterinarian', 'Pilot', 'Chef', 'AgriTech Farmer', 'Electrician', 'Sports Coach', 'Explorer', 'Firefighter'],
  },
  {
    type: 'I', vi_name: 'Nghiên cứu', en_name: 'Investigative', emoji: '🔬', color: '#845EC2',
    vi_desc: 'Con thích tìm hiểu, nghiên cứu, giải câu đố, và khám phá "tại sao"',
    en_desc: 'You like investigating, researching, solving puzzles, and asking "why"',
    vi_careers: ['Nhà khoa học', 'Bác sĩ', 'Lập trình viên', 'Nhà toán học', 'Nhà tâm lý học', 'Dược sĩ', 'Nhà sinh học', 'Kỹ sư AI', 'Nhà thiên văn', 'Chuyên gia pháp y'],
    en_careers: ['Scientist', 'Doctor', 'Programmer', 'Mathematician', 'Psychologist', 'Pharmacist', 'Biologist', 'AI Engineer', 'Astronomer', 'Forensic Expert'],
  },
  {
    type: 'A', vi_name: 'Nghệ thuật', en_name: 'Artistic', emoji: '🎨', color: '#FF6B9D',
    vi_desc: 'Con thích sáng tạo, vẽ, viết, âm nhạc, và thể hiện bản thân',
    en_desc: 'You like creating, drawing, writing, music, and expressing yourself',
    vi_careers: ['Họa sĩ', 'Nhạc sĩ', 'Nhà thiết kế', 'Đạo diễn phim', 'Nhà văn', 'Kiến trúc sư nội thất', 'Nhiếp ảnh gia', 'Biên đạo múa', 'Game Designer', 'Content Creator'],
    en_careers: ['Artist', 'Musician', 'Designer', 'Film Director', 'Writer', 'Interior Designer', 'Photographer', 'Choreographer', 'Game Designer', 'Content Creator'],
  },
  {
    type: 'S', vi_name: 'Xã hội', en_name: 'Social', emoji: '🤝', color: '#51CF66',
    vi_desc: 'Con thích giúp đỡ người khác, dạy bạn, làm việc nhóm, và chăm sóc',
    en_desc: 'You like helping others, teaching friends, teamwork, and caring',
    vi_careers: ['Giáo viên', 'Bác sĩ', 'Nhà tâm lý', 'Công tác xã hội', 'Y tá', 'Hướng dẫn viên', 'Nhà trị liệu', 'Tình nguyện viên quốc tế', 'Huấn luyện viên đời sống', 'Nhà ngoại giao'],
    en_careers: ['Teacher', 'Doctor', 'Psychologist', 'Social Worker', 'Nurse', 'Tour Guide', 'Therapist', 'International Volunteer', 'Life Coach', 'Diplomat'],
  },
  {
    type: 'E', vi_name: 'Doanh nhân', en_name: 'Enterprising', emoji: '💼', color: '#FFD43B',
    vi_desc: 'Con thích lãnh đạo, thuyết phục, tổ chức, và bắt đầu dự án mới',
    en_desc: 'You like leading, persuading, organizing, and starting new projects',
    vi_careers: ['Doanh nhân', 'Luật sư', 'CEO', 'Nhà báo', 'Chính trị gia', 'Quản lý', 'Nhà đầu tư', 'MC/Người dẫn chương trình', 'Sales Manager', 'Startup Founder'],
    en_careers: ['Entrepreneur', 'Lawyer', 'CEO', 'Journalist', 'Politician', 'Manager', 'Investor', 'TV Host', 'Sales Manager', 'Startup Founder'],
  },
  {
    type: 'C', vi_name: 'Quy củ', en_name: 'Conventional', emoji: '📊', color: '#FF8787',
    vi_desc: 'Con thích sắp xếp ngăn nắp, theo kế hoạch, làm việc với số liệu',
    en_desc: 'You like organizing neatly, following plans, and working with data',
    vi_careers: ['Kế toán', 'Ngân hàng', 'Thủ thư', 'Quản trị hệ thống', 'Kiểm toán', 'Logistics', 'Thư ký', 'Data Analyst', 'Lập trình viên backend', 'Nhà quản lý dự án'],
    en_careers: ['Accountant', 'Banker', 'Librarian', 'System Admin', 'Auditor', 'Logistics', 'Secretary', 'Data Analyst', 'Backend Developer', 'Project Manager'],
  },
];

export const RIASEC_JUNIOR_8_12: RiasecQuestion[] = [
  { id: 1, vi: 'Con thích xếp Lego hoặc lắp ráp đồ chơi', en: 'I like building with Lego or assembling toys', type: 'R' },
  { id: 2, vi: 'Con thích tìm hiểu "tại sao" mọi thứ hoạt động', en: 'I like finding out "why" things work', type: 'I' },
  { id: 3, vi: 'Con thích vẽ, tô màu, hoặc làm đồ thủ công', en: 'I like drawing, coloring, or making crafts', type: 'A' },
  { id: 4, vi: 'Con thích giúp đỡ bạn bè khi họ buồn', en: 'I like helping friends when they feel sad', type: 'S' },
  { id: 5, vi: 'Con thích tổ chức trò chơi cho nhóm bạn', en: 'I like organizing games for my friends', type: 'E' },
  { id: 6, vi: 'Con thích sắp xếp phòng gọn gàng theo cách của mình', en: 'I like organizing my room neatly my own way', type: 'C' },
  { id: 7, vi: 'Con thích chơi ngoài trời hơn ngồi trong nhà', en: 'I prefer playing outside over staying indoors', type: 'R' },
  { id: 8, vi: 'Con thích giải câu đố hoặc mê cung', en: 'I like solving puzzles or mazes', type: 'I' },
  { id: 9, vi: 'Con thích hát, nhảy, hoặc chơi nhạc cụ', en: 'I like singing, dancing, or playing instruments', type: 'A' },
  { id: 10, vi: 'Con thích dạy em nhỏ hoặc bạn bè cách làm gì đó', en: 'I like teaching younger kids or friends how to do things', type: 'S' },
  { id: 11, vi: 'Con thích nghĩ ra ý tưởng bán đồ hoặc mở "cửa hàng"', en: 'I like thinking of ideas to sell things or open a "shop"', type: 'E' },
  { id: 12, vi: 'Con thích làm danh sách và đánh dấu khi xong', en: 'I like making lists and checking things off', type: 'C' },
  { id: 13, vi: 'Con thích chăm sóc cây cối hoặc động vật', en: 'I like taking care of plants or animals', type: 'R' },
  { id: 14, vi: 'Con thích đọc sách khoa học hoặc xem phim tài liệu', en: 'I like reading science books or watching documentaries', type: 'I' },
  { id: 15, vi: 'Con thích kể chuyện hoặc viết truyện sáng tạo', en: 'I like telling stories or writing creative tales', type: 'A' },
  { id: 16, vi: 'Con thích làm việc cùng nhóm hơn làm một mình', en: 'I prefer working in a group over working alone', type: 'S' },
  { id: 17, vi: 'Con thích thuyết phục người khác theo ý mình', en: 'I like persuading others to agree with my ideas', type: 'E' },
  { id: 18, vi: 'Con thích sưu tập và phân loại đồ vật', en: 'I like collecting and sorting objects', type: 'C' },
  { id: 19, vi: 'Con thích sửa đồ bị hỏng', en: 'I like fixing broken things', type: 'R' },
  { id: 20, vi: 'Con hay hỏi "Cái này hoạt động thế nào?"', en: 'I often ask "How does this work?"', type: 'I' },
  { id: 21, vi: 'Con thích thiết kế hoặc trang trí mọi thứ', en: 'I like designing or decorating things', type: 'A' },
  { id: 22, vi: 'Con cảm thấy vui khi người khác vui', en: 'I feel happy when others feel happy', type: 'S' },
  { id: 23, vi: 'Con thích làm trưởng nhóm hoặc lớp trưởng', en: 'I like being group leader or class president', type: 'E' },
  { id: 24, vi: 'Con thích theo đúng quy tắc và hướng dẫn', en: 'I like following rules and instructions exactly', type: 'C' },
  { id: 25, vi: 'Con thích thể thao hoặc vận động mạnh', en: 'I like sports or intense physical activities', type: 'R' },
  { id: 26, vi: 'Con thích thí nghiệm để xem kết quả', en: 'I like doing experiments to see results', type: 'I' },
  { id: 27, vi: 'Con thích tưởng tượng thế giới riêng của mình', en: 'I like imagining my own world', type: 'A' },
  { id: 28, vi: 'Con hay an ủi hoặc động viên người khác', en: 'I often comfort or encourage others', type: 'S' },
  { id: 29, vi: 'Con thích đặt mục tiêu và tìm cách đạt được', en: 'I like setting goals and finding ways to achieve them', type: 'E' },
  { id: 30, vi: 'Con thích ghi chép cẩn thận và có hệ thống', en: 'I like taking careful and organized notes', type: 'C' },
  { id: 31, vi: 'Con thích nấu ăn hoặc làm bánh', en: 'I like cooking or baking', type: 'R' },
  { id: 32, vi: 'Con thích xem video khoa học (như Kurzgesagt)', en: 'I like watching science videos (like Kurzgesagt)', type: 'I' },
  { id: 33, vi: 'Con thích quay video hoặc chụp ảnh sáng tạo', en: 'I like making creative videos or taking photos', type: 'A' },
  { id: 34, vi: 'Con thích lắng nghe khi bạn bè kể chuyện', en: 'I like listening when friends share stories', type: 'S' },
  { id: 35, vi: 'Con thích nghĩ ra cách kiếm tiền từ sở thích', en: 'I like thinking of ways to earn money from hobbies', type: 'E' },
  { id: 36, vi: 'Con thích lên lịch và kế hoạch cho cả ngày', en: 'I like planning and scheduling my whole day', type: 'C' },
];

export const RIASEC_JUNIOR_13_15: RiasecQuestion[] = [
  { id: 1, vi: 'Em thích tháo lắp thiết bị điện tử', en: 'I like taking apart and assembling electronics', type: 'R' },
  { id: 2, vi: 'Em thích nghiên cứu một chủ đề sâu trước khi kết luận', en: 'I like researching a topic deeply before concluding', type: 'I' },
  { id: 3, vi: 'Em thích viết blog, thơ, hoặc kịch bản', en: 'I like writing blogs, poems, or scripts', type: 'A' },
  { id: 4, vi: 'Em thích tình nguyện giúp đỡ cộng đồng', en: 'I like volunteering to help the community', type: 'S' },
  { id: 5, vi: 'Em thích thương lượng và đàm phán', en: 'I like negotiating and making deals', type: 'E' },
  { id: 6, vi: 'Em thích làm spreadsheet và phân tích dữ liệu', en: 'I like making spreadsheets and analyzing data', type: 'C' },
  { id: 7, vi: 'Em thích sửa xe đạp hoặc làm mô hình', en: 'I like fixing bikes or building models', type: 'R' },
  { id: 8, vi: 'Em thích phân tích và so sánh các lựa chọn', en: 'I like analyzing and comparing options', type: 'I' },
  { id: 9, vi: 'Em thích thiết kế đồ họa hoặc edit video', en: 'I like graphic design or video editing', type: 'A' },
  { id: 10, vi: 'Em thích mentoring các bạn nhỏ hơn', en: 'I like mentoring younger students', type: 'S' },
  { id: 11, vi: 'Em thích bắt đầu dự án kinh doanh nhỏ', en: 'I like starting small business projects', type: 'E' },
  { id: 12, vi: 'Em thích tạo hệ thống quản lý thời gian', en: 'I like creating time management systems', type: 'C' },
  { id: 13, vi: 'Em thích thể thao cạnh tranh hoặc tập gym', en: 'I like competitive sports or gym workouts', type: 'R' },
  { id: 14, vi: 'Em thích lập trình và giải thuật toán', en: 'I like coding and solving algorithms', type: 'I' },
  { id: 15, vi: 'Em thích sáng tác nhạc hoặc chơi nhạc cụ', en: 'I like composing music or playing instruments', type: 'A' },
  { id: 16, vi: 'Em thích giải quyết xung đột giữa bạn bè', en: 'I like resolving conflicts between friends', type: 'S' },
  { id: 17, vi: 'Em thích thuyết trình trước đám đông', en: 'I like presenting in front of a crowd', type: 'E' },
  { id: 18, vi: 'Em thích lưu trữ và quản lý tài liệu có hệ thống', en: 'I like filing and managing documents systematically', type: 'C' },
  { id: 19, vi: 'Em thích nấu ăn thử nghiệm công thức mới', en: 'I like cooking and experimenting with new recipes', type: 'R' },
  { id: 20, vi: 'Em thích đọc bài nghiên cứu hoặc Wikipedia chuyên sâu', en: 'I like reading research papers or deep Wikipedia articles', type: 'I' },
  { id: 21, vi: 'Em thích tạo content trên mạng xã hội', en: 'I like creating social media content', type: 'A' },
  { id: 22, vi: 'Em thích lắng nghe và đưa lời khuyên cho bạn', en: 'I like listening and giving advice to friends', type: 'S' },
  { id: 23, vi: 'Em thích quản lý tiền tiêu vặt và lên ngân sách', en: 'I like managing pocket money and budgeting', type: 'E' },
  { id: 24, vi: 'Em thích kiểm tra chi tiết trước khi nộp bài', en: 'I like checking details carefully before submitting work', type: 'C' },
  { id: 25, vi: 'Em thích khám phá thiên nhiên và đi phượt', en: 'I like exploring nature and going on adventures', type: 'R' },
  { id: 26, vi: 'Em thích tranh luận logic về các chủ đề phức tạp', en: 'I like logical debates about complex topics', type: 'I' },
  { id: 27, vi: 'Em thích diễn kịch hoặc đóng vai', en: 'I like acting or role-playing', type: 'A' },
  { id: 28, vi: 'Em thích tổ chức hoạt động nhóm cho lớp', en: 'I like organizing group activities for my class', type: 'S' },
  { id: 29, vi: 'Em thích theo dõi xu hướng và tìm cơ hội', en: 'I like following trends and spotting opportunities', type: 'E' },
  { id: 30, vi: 'Em thích ghi chú bằng bullet journal hoặc Notion', en: 'I like note-taking with bullet journals or Notion', type: 'C' },
  { id: 31, vi: 'Em thích tự sửa máy tính hoặc cài phần mềm', en: 'I like fixing computers or installing software myself', type: 'R' },
  { id: 32, vi: 'Em thích phân tích tại sao một sản phẩm thành công', en: 'I like analyzing why a product succeeds', type: 'I' },
  { id: 33, vi: 'Em thích trang trí và thiết kế không gian sống', en: 'I like decorating and designing living spaces', type: 'A' },
  { id: 34, vi: 'Em thích dạy kèm bạn học yếu hơn', en: 'I like tutoring friends who struggle in school', type: 'S' },
  { id: 35, vi: 'Em thích đặt mục tiêu dài hạn và theo đuổi', en: 'I like setting long-term goals and pursuing them', type: 'E' },
  { id: 36, vi: 'Em thích tối ưu hóa quy trình làm việc', en: 'I like optimizing workflows and processes', type: 'C' },
  { id: 37, vi: 'Em thích làm thí nghiệm hóa học hoặc vật lý', en: 'I like doing chemistry or physics experiments', type: 'R' },
  { id: 38, vi: 'Em thích giải bài toán khó mà chưa ai giải được', en: 'I like solving hard math problems no one else can', type: 'I' },
  { id: 39, vi: 'Em thích vẽ digital hoặc dùng AI tạo hình ảnh', en: 'I like digital art or using AI to create images', type: 'A' },
  { id: 40, vi: 'Em thích làm cầu nối giữa các nhóm bạn khác nhau', en: 'I like being a bridge between different friend groups', type: 'S' },
  { id: 41, vi: 'Em thích pitch ý tưởng như Shark Tank', en: 'I like pitching ideas like on Shark Tank', type: 'E' },
  { id: 42, vi: 'Em thích tạo template có thể dùng lại nhiều lần', en: 'I like creating reusable templates', type: 'C' },
  { id: 43, vi: 'Em thích xây dựng mô hình 3D hoặc in 3D', en: 'I like building 3D models or 3D printing', type: 'R' },
  { id: 44, vi: 'Em thích tìm ra lỗ hổng trong lập luận', en: 'I like finding flaws in arguments', type: 'I' },
  { id: 45, vi: 'Em thích viết nhật ký hoặc journal cá nhân', en: 'I like writing personal journals or diaries', type: 'A' },
  { id: 46, vi: 'Em thích được mọi người tin tưởng chia sẻ', en: 'I like being trusted by others to share with', type: 'S' },
  { id: 47, vi: 'Em thích phân tích đối thủ cạnh tranh', en: 'I like analyzing competitors', type: 'E' },
  { id: 48, vi: 'Em thích backup dữ liệu và bảo mật thông tin', en: 'I like backing up data and securing information', type: 'C' },
];

export const MOOD_OPTIONS = [
  { emoji: '☀️', vi: 'Tuyệt vời', en: 'Great', value: 5 },
  { emoji: '🌤️', vi: 'Vui vẻ', en: 'Happy', value: 4 },
  { emoji: '⛅', vi: 'Bình thường', en: 'Okay', value: 3 },
  { emoji: '🌧️', vi: 'Buồn', en: 'Sad', value: 2 },
  { emoji: '⛈️', vi: 'Rất buồn', en: 'Very sad', value: 1 },
];

export const CREATIVE_PROMPTS = [
  { vi: 'Vẽ con vật yêu thích của con trong 5 phút', en: 'Draw your favorite animal in 5 minutes' },
  { vi: 'Thiết kế một ngôi nhà trên cây mơ ước', en: 'Design your dream treehouse' },
  { vi: 'Vẽ bản đồ kho báu cho cuộc phiêu lưu', en: 'Draw a treasure map for an adventure' },
  { vi: 'Tạo một nhân vật siêu anh hùng mới', en: 'Create a new superhero character' },
  { vi: 'Vẽ thành phố tương lai năm 3000', en: 'Draw a future city in year 3000' },
  { vi: 'Thiết kế logo cho "công ty" của con', en: 'Design a logo for your own "company"' },
  { vi: 'Vẽ chân dung gia đình theo phong cách hoạt hình', en: 'Draw a family portrait in cartoon style' },
  { vi: 'Tạo poster cho một bộ phim con tưởng tượng', en: 'Create a poster for a movie you imagine' },
  { vi: 'Vẽ robot trợ lý AI của riêng con', en: 'Draw your own AI robot assistant' },
  { vi: 'Thiết kế bìa sách cho truyện con viết', en: 'Design a book cover for a story you write' },
  { vi: 'Vẽ Việt Nam qua con mắt con', en: 'Draw Vietnam through your eyes' },
  { vi: 'Tạo nhân vật game con muốn chơi', en: 'Create a game character you want to play' },
  { vi: 'Vẽ bữa ăn ngon nhất thế giới', en: 'Draw the most delicious meal in the world' },
  { vi: 'Thiết kế phòng ngủ mơ ước', en: 'Design your dream bedroom' },
  { vi: 'Vẽ hành tinh mới do con đặt tên', en: 'Draw a new planet you name yourself' },
  { vi: 'Tạo bản đồ tư duy về điều con thích', en: 'Create a mind map about things you love' },
  { vi: 'Vẽ Đại Ka theo trí tưởng tượng của con', en: 'Draw Đại Ka from your imagination' },
  { vi: 'Thiết kế app điện thoại cho trẻ em', en: 'Design a phone app for kids' },
  { vi: 'Vẽ cỗ máy thời gian', en: 'Draw a time machine' },
  { vi: 'Tạo infographic về 1 điều con biết nhiều', en: 'Create an infographic about something you know well' },
  { vi: 'Vẽ trang phục truyền thống Việt Nam phiên bản tương lai', en: 'Draw Vietnamese traditional outfit — future version' },
];

export const EXERCISE_CHALLENGES = [
  { vi: 'Nhảy dây 50 cái', en: 'Jump rope 50 times', duration: 3, emoji: '🤸' },
  { vi: 'Chạy tại chỗ 2 phút', en: 'Run in place for 2 minutes', duration: 2, emoji: '🏃' },
  { vi: 'Plank 30 giây', en: 'Plank for 30 seconds', duration: 1, emoji: '💪' },
  { vi: 'Đi bộ quanh nhà 5 vòng', en: 'Walk around the house 5 laps', duration: 5, emoji: '🚶' },
  { vi: 'Squat 20 cái', en: '20 squats', duration: 2, emoji: '🦵' },
  { vi: 'Vươn vai và kéo giãn 3 phút', en: 'Stretch and flex for 3 minutes', duration: 3, emoji: '🧘' },
  { vi: 'Nhảy cao 15 lần', en: '15 jumping jacks', duration: 2, emoji: '⭐' },
  { vi: 'Đạp xe đạp hoặc đi bộ 10 phút', en: 'Bike or walk for 10 minutes', duration: 10, emoji: '🚴' },
  { vi: 'Yoga tư thế cây 1 phút mỗi chân', en: 'Tree pose yoga 1 min each leg', duration: 2, emoji: '🌳' },
  { vi: 'Hít thở sâu 1 phút — 4 giây hít, 4 giây thở', en: 'Deep breathing 1 min — 4s in, 4s out', duration: 1, emoji: '🧘‍♀️' },
  { vi: 'Leo cầu thang 3 lần lên xuống', en: 'Climb stairs 3 times up and down', duration: 5, emoji: '🪜' },
  { vi: 'Tung bóng hoặc chơi cầu lông 10 phút', en: 'Play ball or badminton for 10 minutes', duration: 10, emoji: '🏸' },
];

export function scoreRiasec(answers: Record<number, number>, questions: RiasecQuestion[]): { type: RiasecType; score: number }[] {
  const scores: Record<RiasecType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  questions.forEach(q => {
    if (answers[q.id] !== undefined) {
      scores[q.type] += answers[q.id];
    }
  });
  return (Object.entries(scores) as [RiasecType, number][])
    .map(([type, score]) => ({ type, score }))
    .sort((a, b) => b.score - a.score);
}
