// English 4 skills content bank — Listen / Speak / Read / Write
// CEFR levels: K (kindergarten, ages 4-6 — Như Ý), A1 (beginner, 7-8),
//              A2 (elementary, 9-11), B1 (intermediate, 12-15)

export type CEFRLevel = 'K' | 'A1' | 'A2' | 'B1';

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
  // ────────────────── KINDERGARTEN (Như Ý 5t) — very simple ──────────────────
  K: [
    // Colors
    { word: 'red',    phonetic: '/red/',    vi: 'đỏ',     category: 'color' },
    { word: 'blue',   phonetic: '/bluː/',   vi: 'xanh dương', category: 'color' },
    { word: 'yellow', phonetic: '/ˈjeləʊ/', vi: 'vàng',   category: 'color' },
    { word: 'green',  phonetic: '/ɡriːn/',  vi: 'xanh lá', category: 'color' },
    { word: 'pink',   phonetic: '/pɪŋk/',   vi: 'hồng',   category: 'color' },
    { word: 'black',  phonetic: '/blæk/',   vi: 'đen',    category: 'color' },
    { word: 'white',  phonetic: '/waɪt/',   vi: 'trắng',  category: 'color' },
    // Animals
    { word: 'cat',  phonetic: '/kæt/',  vi: 'mèo', category: 'animal' },
    { word: 'dog',  phonetic: '/dɒɡ/',  vi: 'chó', category: 'animal' },
    { word: 'fish', phonetic: '/fɪʃ/',  vi: 'cá',  category: 'animal' },
    { word: 'bird', phonetic: '/bɜːd/', vi: 'chim', category: 'animal' },
    { word: 'cow',  phonetic: '/kaʊ/',  vi: 'bò',  category: 'animal' },
    { word: 'pig',  phonetic: '/pɪɡ/',  vi: 'lợn', category: 'animal' },
    { word: 'duck', phonetic: '/dʌk/',  vi: 'vịt', category: 'animal' },
    // Numbers
    { word: 'one',   phonetic: '/wʌn/',   vi: 'một', category: 'number' },
    { word: 'two',   phonetic: '/tuː/',   vi: 'hai', category: 'number' },
    { word: 'three', phonetic: '/θriː/',  vi: 'ba',  category: 'number' },
    { word: 'four',  phonetic: '/fɔː/',   vi: 'bốn', category: 'number' },
    { word: 'five',  phonetic: '/faɪv/',  vi: 'năm', category: 'number' },
    // Family
    { word: 'mom',  phonetic: '/mɒm/',  vi: 'mẹ',  category: 'family' },
    { word: 'dad',  phonetic: '/dæd/',  vi: 'bố',  category: 'family' },
    { word: 'baby', phonetic: '/ˈbeɪbi/', vi: 'em bé', category: 'family' },
    // Food
    { word: 'milk',  phonetic: '/mɪlk/',  vi: 'sữa', category: 'food' },
    { word: 'bread', phonetic: '/bred/',  vi: 'bánh mì', category: 'food' },
    { word: 'rice',  phonetic: '/raɪs/',  vi: 'cơm/gạo', category: 'food' },
    { word: 'apple', phonetic: '/ˈæpəl/', vi: 'táo', category: 'food' },
    // Body
    { word: 'eye',   phonetic: '/aɪ/',   vi: 'mắt', category: 'body' },
    { word: 'nose',  phonetic: '/nəʊz/', vi: 'mũi', category: 'body' },
    { word: 'hand',  phonetic: '/hænd/', vi: 'tay', category: 'body' },
    { word: 'foot',  phonetic: '/fʊt/',  vi: 'chân', category: 'body' },
    // Action
    { word: 'run',   phonetic: '/rʌn/',  vi: 'chạy', category: 'verb' },
    { word: 'jump',  phonetic: '/dʒʌmp/', vi: 'nhảy', category: 'verb' },
    { word: 'sleep', phonetic: '/sliːp/', vi: 'ngủ', category: 'verb' },
    { word: 'eat',   phonetic: '/iːt/',  vi: 'ăn', category: 'verb' },
    { word: 'play',  phonetic: '/pleɪ/', vi: 'chơi', category: 'verb' },
    // Toys
    { word: 'ball', phonetic: '/bɔːl/',  vi: 'quả bóng', category: 'toy' },
    { word: 'doll', phonetic: '/dɒl/',   vi: 'búp bê', category: 'toy' },
    { word: 'car',  phonetic: '/kɑː/',   vi: 'xe ô tô', category: 'toy' },
  ],
  // ────────────────── A1 (lower primary 7-8 — Bình An base) ──────────────────
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
    // expansion
    { word: 'book',     phonetic: '/bʊk/',      vi: 'sách',     category: 'school' },
    { word: 'chair',    phonetic: '/tʃeə(r)/',  vi: 'ghế',      category: 'furniture' },
    { word: 'table',    phonetic: '/ˈteɪbəl/',  vi: 'bàn',      category: 'furniture' },
    { word: 'window',   phonetic: '/ˈwɪndəʊ/',  vi: 'cửa sổ',   category: 'home' },
    { word: 'door',     phonetic: '/dɔː(r)/',   vi: 'cửa',      category: 'home' },
    { word: 'kitchen',  phonetic: '/ˈkɪtʃɪn/',  vi: 'nhà bếp',  category: 'home' },
    { word: 'sister',   phonetic: '/ˈsɪstə(r)/', vi: 'chị/em gái', category: 'family' },
    { word: 'brother',  phonetic: '/ˈbrʌðə(r)/', vi: 'anh/em trai', category: 'family' },
    { word: 'friend',   phonetic: '/frend/',    vi: 'bạn',      category: 'people' },
    { word: 'teacher',  phonetic: '/ˈtiːtʃə(r)/', vi: 'giáo viên', category: 'people' },
    { word: 'doctor',   phonetic: '/ˈdɒktə(r)/', vi: 'bác sĩ',  category: 'job' },
    { word: 'farmer',   phonetic: '/ˈfɑːmə(r)/', vi: 'nông dân', category: 'job' },
    { word: 'sunny',    phonetic: '/ˈsʌni/',    vi: 'nắng',     category: 'weather' },
    { word: 'cloudy',   phonetic: '/ˈklaʊdi/',  vi: 'có mây',   category: 'weather' },
    { word: 'cold',     phonetic: '/kəʊld/',    vi: 'lạnh',     category: 'weather' },
    { word: 'hot',      phonetic: '/hɒt/',      vi: 'nóng',     category: 'weather' },
    { word: 'big',      phonetic: '/bɪɡ/',      vi: 'to',       category: 'adjective' },
    { word: 'small',    phonetic: '/smɔːl/',    vi: 'nhỏ',      category: 'adjective' },
    { word: 'fast',     phonetic: '/fɑːst/',    vi: 'nhanh',    category: 'adjective' },
    { word: 'slow',     phonetic: '/sləʊ/',     vi: 'chậm',     category: 'adjective' },
    { word: 'morning',  phonetic: '/ˈmɔːnɪŋ/',  vi: 'buổi sáng', category: 'time' },
    { word: 'evening',  phonetic: '/ˈiːvnɪŋ/',  vi: 'buổi tối',  category: 'time' },
    { word: 'today',    phonetic: '/təˈdeɪ/',   vi: 'hôm nay',  category: 'time' },
    { word: 'tomorrow', phonetic: '/təˈmɒrəʊ/', vi: 'ngày mai', category: 'time' },
    { word: 'yesterday', phonetic: '/ˈjestədeɪ/', vi: 'hôm qua', category: 'time' },
    { word: 'mango',    phonetic: '/ˈmæŋɡəʊ/',  vi: 'xoài',     category: 'food' },
    { word: 'grape',    phonetic: '/ɡreɪp/',    vi: 'nho',      category: 'food' },
    { word: 'tiger',    phonetic: '/ˈtaɪɡə(r)/', vi: 'hổ',      category: 'animal' },
    { word: 'monkey',   phonetic: '/ˈmʌŋki/',   vi: 'khỉ',      category: 'animal' },
    { word: 'rabbit',   phonetic: '/ˈræbɪt/',   vi: 'thỏ',      category: 'animal' },
    { word: 'park',     phonetic: '/pɑːk/',     vi: 'công viên', category: 'place' },
    { word: 'beach',    phonetic: '/biːtʃ/',    vi: 'bãi biển',  category: 'place' },
    { word: 'shop',     phonetic: '/ʃɒp/',      vi: 'cửa hàng',  category: 'place' },
    { word: 'walk',     phonetic: '/wɔːk/',     vi: 'đi bộ',     category: 'verb' },
    { word: 'read',     phonetic: '/riːd/',     vi: 'đọc',       category: 'verb' },
    { word: 'write',    phonetic: '/raɪt/',     vi: 'viết',      category: 'verb' },
    { word: 'sing',     phonetic: '/sɪŋ/',      vi: 'hát',       category: 'verb' },
    { word: 'dance',    phonetic: '/dɑːns/',    vi: 'nhảy múa',  category: 'verb' },
  ],
  // ────────────────── A2 (upper primary 9-11 — Phúc base) ──────────────────
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
    // expansion
    { word: 'adventure',  phonetic: '/ədˈventʃə(r)/', vi: 'cuộc phiêu lưu',  category: 'concept' },
    { word: 'birthday',   phonetic: '/ˈbɜːθdeɪ/',     vi: 'sinh nhật',       category: 'event' },
    { word: 'careful',    phonetic: '/ˈkeəfəl/',      vi: 'cẩn thận',        category: 'adjective' },
    { word: 'comfortable', phonetic: '/ˈkʌmftəbəl/',  vi: 'thoải mái',       category: 'adjective' },
    { word: 'delicious',  phonetic: '/dɪˈlɪʃəs/',     vi: 'ngon',            category: 'adjective' },
    { word: 'energy',     phonetic: '/ˈenədʒi/',      vi: 'năng lượng',      category: 'concept' },
    { word: 'exercise',   phonetic: '/ˈeksəsaɪz/',    vi: 'thể dục',         category: 'health' },
    { word: 'fantastic',  phonetic: '/fænˈtæstɪk/',   vi: 'tuyệt vời',       category: 'adjective' },
    { word: 'forest',     phonetic: '/ˈfɒrɪst/',      vi: 'rừng',            category: 'nature' },
    { word: 'hospital',   phonetic: '/ˈhɒspɪtəl/',    vi: 'bệnh viện',       category: 'place' },
    { word: 'jewelry',    phonetic: '/ˈdʒuːəlri/',    vi: 'đồ trang sức',    category: 'object' },
    { word: 'library',    phonetic: '/ˈlaɪbrəri/',    vi: 'thư viện',        category: 'place' },
    { word: 'medicine',   phonetic: '/ˈmedsən/',      vi: 'thuốc',           category: 'health' },
    { word: 'message',    phonetic: '/ˈmesɪdʒ/',      vi: 'tin nhắn',        category: 'communication' },
    { word: 'notebook',   phonetic: '/ˈnəʊtbʊk/',     vi: 'sổ ghi chép',     category: 'school' },
    { word: 'project',    phonetic: '/ˈprɒdʒekt/',    vi: 'dự án',           category: 'concept' },
    { word: 'question',   phonetic: '/ˈkwestʃən/',    vi: 'câu hỏi',         category: 'concept' },
    { word: 'remember',   phonetic: '/rɪˈmembə(r)/',  vi: 'nhớ',             category: 'verb' },
    { word: 'sandwich',   phonetic: '/ˈsænwɪdʒ/',     vi: 'bánh mì kẹp',     category: 'food' },
    { word: 'station',    phonetic: '/ˈsteɪʃən/',     vi: 'nhà ga/trạm',     category: 'place' },
    { word: 'student',    phonetic: '/ˈstjuːdənt/',   vi: 'học sinh',        category: 'people' },
    { word: 'surprise',   phonetic: '/səˈpraɪz/',     vi: 'bất ngờ',         category: 'concept' },
    { word: 'temperature', phonetic: '/ˈtemprətʃə(r)/', vi: 'nhiệt độ',     category: 'concept' },
    { word: 'tradition',  phonetic: '/trəˈdɪʃən/',    vi: 'truyền thống',    category: 'concept' },
    { word: 'unusual',    phonetic: '/ʌnˈjuːʒʊəl/',   vi: 'lạ thường',       category: 'adjective' },
    { word: 'volunteer',  phonetic: '/ˌvɒlənˈtɪə(r)/', vi: 'tình nguyện viên', category: 'people' },
    { word: 'wonderful',  phonetic: '/ˈwʌndəfəl/',    vi: 'tuyệt diệu',      category: 'adjective' },
    { word: 'because',    phonetic: '/bɪˈkɒz/',       vi: 'bởi vì',          category: 'connector' },
    { word: 'although',   phonetic: '/ɔːlˈðəʊ/',      vi: 'mặc dù',          category: 'connector' },
    { word: 'usually',    phonetic: '/ˈjuːʒʊəli/',    vi: 'thường thường',   category: 'adverb' },
    { word: 'sometimes',  phonetic: '/ˈsʌmtaɪmz/',    vi: 'đôi khi',         category: 'adverb' },
    { word: 'recently',   phonetic: '/ˈriːsəntli/',   vi: 'gần đây',         category: 'adverb' },
    { word: 'environment', phonetic: '/ɪnˈvaɪrənmənt/', vi: 'môi trường',   category: 'concept' },
    { word: 'solution',   phonetic: '/səˈluːʃən/',    vi: 'giải pháp',       category: 'concept' },
    { word: 'invention',  phonetic: '/ɪnˈvenʃən/',    vi: 'phát minh',       category: 'concept' },
    { word: 'traffic',    phonetic: '/ˈtræfɪk/',      vi: 'giao thông',      category: 'concept' },
  ],
  // ────────────────── B1 (early secondary 12-15 — Phúc upper) ──────────────────
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
    // expansion
    { word: 'analyze',     phonetic: '/ˈænəlaɪz/',     vi: 'phân tích',         category: 'verb' },
    { word: 'argument',    phonetic: '/ˈɑːɡjʊmənt/',   vi: 'lý lẽ/tranh luận',  category: 'concept' },
    { word: 'collaborate', phonetic: '/kəˈlæbəreɪt/',  vi: 'hợp tác',           category: 'verb' },
    { word: 'communicate', phonetic: '/kəˈmjuːnɪkeɪt/', vi: 'giao tiếp',        category: 'verb' },
    { word: 'compare',     phonetic: '/kəmˈpeə(r)/',   vi: 'so sánh',           category: 'verb' },
    { word: 'consequence', phonetic: '/ˈkɒnsɪkwəns/',  vi: 'hậu quả',           category: 'concept' },
    { word: 'contribute',  phonetic: '/kənˈtrɪbjuːt/', vi: 'đóng góp',          category: 'verb' },
    { word: 'criticize',   phonetic: '/ˈkrɪtɪsaɪz/',   vi: 'phê bình',          category: 'verb' },
    { word: 'debate',      phonetic: '/dɪˈbeɪt/',      vi: 'tranh luận',        category: 'verb' },
    { word: 'determined',  phonetic: '/dɪˈtɜːmɪnd/',   vi: 'quyết tâm',         category: 'adjective' },
    { word: 'efficient',   phonetic: '/ɪˈfɪʃənt/',     vi: 'hiệu quả',          category: 'adjective' },
    { word: 'embarrass',   phonetic: '/ɪmˈbærəs/',     vi: 'làm xấu hổ',        category: 'verb' },
    { word: 'enthusiasm',  phonetic: '/ɪnˈθjuːziæzəm/', vi: 'nhiệt huyết',     category: 'concept' },
    { word: 'evidence',    phonetic: '/ˈevɪdəns/',     vi: 'bằng chứng',        category: 'concept' },
    { word: 'flexible',    phonetic: '/ˈfleksəbəl/',   vi: 'linh hoạt',         category: 'adjective' },
    { word: 'genuine',     phonetic: '/ˈdʒenjʊɪn/',    vi: 'chân thành',        category: 'adjective' },
    { word: 'identify',    phonetic: '/aɪˈdentɪfaɪ/',  vi: 'nhận diện',         category: 'verb' },
    { word: 'influence',   phonetic: '/ˈɪnfluəns/',    vi: 'ảnh hưởng',         category: 'concept' },
    { word: 'innovation',  phonetic: '/ˌɪnəˈveɪʃən/',  vi: 'đổi mới',           category: 'concept' },
    { word: 'integrity',   phonetic: '/ɪnˈteɡrəti/',   vi: 'chính trực',        category: 'concept' },
    { word: 'mentor',      phonetic: '/ˈmentɔː(r)/',   vi: 'người dẫn dắt',     category: 'people' },
    { word: 'negotiate',   phonetic: '/nɪˈɡəʊʃieɪt/',  vi: 'thương lượng',      category: 'verb' },
    { word: 'perspective', phonetic: '/pəˈspektɪv/',   vi: 'góc nhìn',          category: 'concept' },
    { word: 'priority',    phonetic: '/praɪˈɒrɪti/',   vi: 'ưu tiên',           category: 'concept' },
    { word: 'reflect',     phonetic: '/rɪˈflekt/',     vi: 'suy ngẫm',          category: 'verb' },
    { word: 'reliable',    phonetic: '/rɪˈlaɪəbəl/',   vi: 'đáng tin cậy',      category: 'adjective' },
    { word: 'resource',    phonetic: '/rɪˈsɔːs/',      vi: 'nguồn lực',         category: 'concept' },
    { word: 'strategy',    phonetic: '/ˈstrætədʒi/',   vi: 'chiến lược',        category: 'concept' },
    { word: 'sufficient',  phonetic: '/səˈfɪʃənt/',    vi: 'đủ',                category: 'adjective' },
    { word: 'transparent', phonetic: '/trænsˈpærənt/', vi: 'minh bạch',         category: 'adjective' },
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
  // ────────── K (kindergarten — Như Ý) ──────────
  { level: 'K', text: 'Hello!',                  vi: 'Xin chào!' },
  { level: 'K', text: 'Hi, I am Y.',             vi: 'Xin chào, em là Y.' },
  { level: 'K', text: 'I am five.',              vi: 'Em năm tuổi.' },
  { level: 'K', text: 'I love you, mom.',        vi: 'Con yêu mẹ.' },
  { level: 'K', text: 'I love you, dad.',        vi: 'Con yêu bố.' },
  { level: 'K', text: 'Thank you.',              vi: 'Cảm ơn.' },
  { level: 'K', text: 'I am happy.',             vi: 'Em vui.' },
  { level: 'K', text: 'I like ice cream.',       vi: 'Em thích kem.' },
  { level: 'K', text: 'The cat is small.',       vi: 'Con mèo nhỏ.' },
  { level: 'K', text: 'Good night.',             vi: 'Chúc ngủ ngon.' },
  { level: 'K', text: 'Good morning.',           vi: 'Chào buổi sáng.' },
  { level: 'K', text: 'I have a doll.',          vi: 'Em có một búp bê.' },

  // ────────── A1 ──────────
  { level: 'A1', text: 'My name is Phuc.', vi: 'Tên em là Phúc.' },
  { level: 'A1', text: 'I like apples.', vi: 'Em thích táo.' },
  { level: 'A1', text: 'The cat is on the table.', vi: 'Con mèo trên bàn.' },
  { level: 'A1', text: 'I have a brother and a sister.', vi: 'Em có một anh trai và một em gái.' },
  { level: 'A1', text: 'It is a sunny day.', vi: 'Hôm nay trời nắng.' },
  { level: 'A1', text: 'I go to school every day.', vi: 'Em đi học mỗi ngày.' },
  { level: 'A1', text: 'My favorite color is blue.', vi: 'Màu yêu thích của em là xanh dương.' },
  { level: 'A1', text: 'I love my family.', vi: 'Em yêu gia đình.' },
  // expansion
  { level: 'A1', text: 'I am nine years old.', vi: 'Em chín tuổi.' },
  { level: 'A1', text: 'My birthday is in May.', vi: 'Sinh nhật em vào tháng năm.' },
  { level: 'A1', text: 'I can ride a bike.', vi: 'Em biết đi xe đạp.' },
  { level: 'A1', text: 'My dog is brown and white.', vi: 'Con chó của em màu nâu và trắng.' },
  { level: 'A1', text: 'I drink milk every morning.', vi: 'Em uống sữa mỗi buổi sáng.' },
  { level: 'A1', text: 'My teacher is very kind.', vi: 'Cô giáo của em rất tốt bụng.' },
  { level: 'A1', text: 'After school I play with my friends.', vi: 'Sau giờ học em chơi với bạn.' },
  { level: 'A1', text: 'I help my mother in the kitchen.', vi: 'Em giúp mẹ trong bếp.' },
  { level: 'A1', text: 'I want to be a doctor.', vi: 'Em muốn làm bác sĩ.' },
  { level: 'A1', text: 'I read a book before bed.', vi: 'Em đọc sách trước khi ngủ.' },

  // ────────── A2 ──────────
  { level: 'A2', text: 'Yesterday I visited my grandmother.', vi: 'Hôm qua em đến thăm bà.' },
  { level: 'A2', text: 'My favorite subject is science because experiments are fun.', vi: 'Môn em thích nhất là khoa học vì thí nghiệm rất vui.' },
  { level: 'A2', text: 'In the morning I have breakfast with my family.', vi: 'Buổi sáng em ăn sáng cùng gia đình.' },
  { level: 'A2', text: 'I want to be a doctor when I grow up.', vi: 'Em muốn trở thành bác sĩ khi lớn lên.' },
  { level: 'A2', text: 'On weekends we often go to the park together.', vi: 'Cuối tuần cả nhà thường đi công viên cùng nhau.' },
  { level: 'A2', text: 'Reading books is one of my favorite activities.', vi: 'Đọc sách là một trong những hoạt động em thích.' },
  // expansion
  { level: 'A2', text: 'Last summer my family traveled to Da Nang and the beach was amazing.', vi: 'Hè năm ngoái cả nhà em đi Đà Nẵng và bãi biển thật tuyệt.' },
  { level: 'A2', text: 'I usually wake up at six and brush my teeth right away.', vi: 'Em thường dậy lúc sáu giờ và đánh răng ngay.' },
  { level: 'A2', text: 'My older brother teaches me how to play chess.', vi: 'Anh trai dạy em chơi cờ vua.' },
  { level: 'A2', text: 'When I have free time I like to draw and listen to music.', vi: 'Khi rảnh em thích vẽ và nghe nhạc.' },
  { level: 'A2', text: 'I think exercise is important because it keeps us healthy.', vi: 'Em nghĩ tập thể dục quan trọng vì giữ cho ta khoẻ.' },
  { level: 'A2', text: 'My family celebrates Tet by visiting our grandparents.', vi: 'Gia đình em đón Tết bằng cách về thăm ông bà.' },
  { level: 'A2', text: 'I want to learn how to swim better this summer.', vi: 'Em muốn học bơi giỏi hơn vào mùa hè này.' },
  { level: 'A2', text: 'Vegetables are good for us even if some kids don\'t like them.', vi: 'Rau tốt cho chúng ta dù một vài bạn không thích.' },

  // ────────── B1 ──────────
  { level: 'B1', text: 'Vietnam has a rich history and beautiful landscapes from the mountains in the north to the beaches in the south.', vi: 'Việt Nam có lịch sử phong phú và cảnh đẹp từ núi phía Bắc đến biển phía Nam.' },
  { level: 'B1', text: 'I believe technology should help people learn faster, but we still need to think for ourselves.', vi: 'Em tin công nghệ giúp người học nhanh hơn, nhưng chúng ta vẫn cần tự tư duy.' },
  { level: 'B1', text: 'When I face a difficult problem, I try to break it into smaller steps.', vi: 'Khi gặp vấn đề khó, em cố chia nhỏ thành các bước.' },
  { level: 'B1', text: 'Curiosity is more important than memorization because it leads to real understanding.', vi: 'Tò mò quan trọng hơn ghi nhớ vì nó dẫn đến hiểu thật sự.' },
  // expansion
  { level: 'B1', text: 'In our family, we believe that mistakes are stepping stones to learning, not signs of failure.', vi: 'Trong gia đình em, sai lầm là bước đệm để học, không phải dấu hiệu thất bại.' },
  { level: 'B1', text: 'I am learning to manage my time better by writing tasks down each morning.', vi: 'Em đang học quản lý thời gian tốt hơn bằng cách ghi việc ra mỗi sáng.' },
  { level: 'B1', text: 'Although social media can be fun, it can also distract us from real friends.', vi: 'Mặc dù mạng xã hội thú vị, nó cũng có thể làm xao nhãng bạn bè thật.' },
  { level: 'B1', text: 'I admire people who stay calm under pressure and treat others with respect.', vi: 'Em ngưỡng mộ người giữ bình tĩnh dưới áp lực và tôn trọng người khác.' },
  { level: 'B1', text: 'I want to start a small business one day to learn how money and customers really work.', vi: 'Em muốn khởi nghiệp nhỏ một ngày để hiểu cách tiền và khách hàng thực sự hoạt động.' },
  { level: 'B1', text: 'Practicing English every day, even for just ten minutes, helps me grow more confident.', vi: 'Luyện tiếng Anh mỗi ngày, dù chỉ 10 phút, giúp em tự tin hơn.' },
  { level: 'B1', text: 'My dream is to combine technology and creativity to help students learn in a fun way.', vi: 'Ước mơ của em là kết hợp công nghệ và sáng tạo để giúp học sinh học vui hơn.' },
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
  // ──────── K — extra simple, 2-3 sentences ────────
  {
    level: 'K',
    title_en: 'My Toy',
    title_vi: 'Đồ chơi của em',
    passage: 'I have a red ball. The ball is small. I play with my ball.',
    questions: [
      { q: 'What color is the ball?', options: ['Blue', 'Red', 'Green', 'Yellow'], correctIdx: 1, explanation_vi: 'Đoạn nói "I have a red ball" — quả bóng màu đỏ.' },
      { q: 'Is the ball big or small?', options: ['Big', 'Small'], correctIdx: 1, explanation_vi: 'Đoạn nói "The ball is small".' },
    ],
  },
  {
    level: 'K',
    title_en: 'My Mom',
    title_vi: 'Mẹ của em',
    passage: 'My mom is nice. She cooks for me. I love mom.',
    questions: [
      { q: 'What does mom do?', options: ['She runs', 'She cooks', 'She sings'], correctIdx: 1, explanation_vi: 'Đoạn nói "She cooks for me".' },
      { q: 'How does the kid feel?', options: ['Sad', 'Loves mom', 'Tired'], correctIdx: 1, explanation_vi: 'Đoạn nói "I love mom".' },
    ],
  },
  {
    level: 'K',
    title_en: 'The Sun',
    title_vi: 'Mặt trời',
    passage: 'The sun is yellow. The sun is hot. I see the sun in the day.',
    questions: [
      { q: 'What color is the sun?', options: ['Yellow', 'Blue'], correctIdx: 0, explanation_vi: '"The sun is yellow".' },
      { q: 'When do we see the sun?', options: ['At night', 'In the day'], correctIdx: 1, explanation_vi: '"I see the sun in the day".' },
    ],
  },

  // ──────── A1 ────────
  {
    level: 'A1',
    title_en: 'My Cat Mimi',
    title_vi: 'Con mèo Mimi của em',
    passage:
      'I have a cat. Her name is Mimi. She is small and white. She has blue eyes. Mimi likes to play with a ball. She also likes to sleep on my bed. I love Mimi very much.',
    questions: [
      { q: 'What color is Mimi?', options: ['Black', 'White', 'Brown', 'Orange'], correctIdx: 1, explanation_vi: 'Đoạn văn nói "She is small and white".' },
      { q: 'What does Mimi like to play with?', options: ['A toy mouse', 'A ball', 'A string', 'A bell'], correctIdx: 1, explanation_vi: '"Mimi likes to play with a ball".' },
      { q: 'Where does Mimi like to sleep?', options: ['On the floor', 'On the chair', 'On my bed', 'In the kitchen'], correctIdx: 2, explanation_vi: '"She also likes to sleep on my bed".' },
    ],
  },
  {
    level: 'A1',
    title_en: 'My School Day',
    title_vi: 'Một ngày ở trường',
    passage: 'I go to school by bike. My school starts at 8 in the morning. We have four lessons every day. After school I play soccer with my friends. Then I go home and do my homework.',
    questions: [
      { q: 'How does the writer go to school?', options: ['By car', 'By bus', 'By bike', 'On foot'], correctIdx: 2, explanation_vi: '"I go to school by bike".' },
      { q: 'When does school start?', options: ['7 a.m.', '8 a.m.', '9 a.m.', '10 a.m.'], correctIdx: 1, explanation_vi: '"My school starts at 8 in the morning".' },
      { q: 'What does the writer play after school?', options: ['Basketball', 'Tennis', 'Soccer', 'Chess'], correctIdx: 2, explanation_vi: '"I play soccer with my friends".' },
    ],
  },
  {
    level: 'A1',
    title_en: 'My Family',
    title_vi: 'Gia đình em',
    passage: 'There are five people in my family. My father is a teacher. My mother is a doctor. I have one brother and one sister. We are very happy together.',
    questions: [
      { q: 'How many people are in the family?', options: ['Three', 'Four', 'Five', 'Six'], correctIdx: 2, explanation_vi: '"There are five people in my family".' },
      { q: 'What does the father do?', options: ['Doctor', 'Engineer', 'Teacher', 'Farmer'], correctIdx: 2, explanation_vi: '"My father is a teacher".' },
      { q: 'What does the mother do?', options: ['Teacher', 'Doctor', 'Singer', 'Cook'], correctIdx: 1, explanation_vi: '"My mother is a doctor".' },
    ],
  },
  {
    level: 'A1',
    title_en: 'In the Kitchen',
    title_vi: 'Trong bếp',
    passage: 'My mom is in the kitchen. She is making breakfast. There is bread, milk, and eggs on the table. The smell is very nice. I am hungry.',
    questions: [
      { q: 'Where is mom?', options: ['Bedroom', 'Garden', 'Kitchen', 'Office'], correctIdx: 2, explanation_vi: '"My mom is in the kitchen".' },
      { q: 'What is on the table?', options: ['Rice and soup', 'Bread, milk, eggs', 'Pizza', 'Noodles'], correctIdx: 1, explanation_vi: '"There is bread, milk, and eggs on the table".' },
    ],
  },
  {
    level: 'A1',
    title_en: 'A Rainy Day',
    title_vi: 'Một ngày mưa',
    passage: 'Today is rainy. I cannot play outside. I read books at home. I also draw pictures. I am happy at home.',
    questions: [
      { q: 'How is the weather?', options: ['Sunny', 'Cold', 'Rainy', 'Hot'], correctIdx: 2, explanation_vi: '"Today is rainy".' },
      { q: 'What does the writer do at home?', options: ['Sleep all day', 'Read and draw', 'Watch TV', 'Cook'], correctIdx: 1, explanation_vi: '"I read books at home. I also draw pictures".' },
    ],
  },
  {
    level: 'A1',
    title_en: 'My Dog Ben',
    title_vi: 'Chú chó Ben',
    passage: 'Ben is my dog. He is big and brown. He likes to run in the park. Ben likes meat. Every evening I walk with Ben.',
    questions: [
      { q: 'What color is Ben?', options: ['Black', 'White', 'Brown', 'Yellow'], correctIdx: 2, explanation_vi: '"He is big and brown".' },
      { q: 'What does Ben like to eat?', options: ['Vegetables', 'Meat', 'Fruits', 'Fish'], correctIdx: 1, explanation_vi: '"Ben likes meat".' },
    ],
  },

  // ──────── A2 ────────
  {
    level: 'A2',
    title_en: 'A Trip to the Zoo',
    title_vi: 'Chuyến đi sở thú',
    passage:
      'Last Sunday my family went to the zoo. We saw many animals. The elephants were very big and they ate a lot of vegetables. The monkeys were funny because they jumped from tree to tree. My favorite animal was the giraffe. It was so tall that it could eat leaves from the highest branches. We had a great time and I want to go again next month.',
    questions: [
      { q: 'When did the family go to the zoo?', options: ['Last Saturday', 'Last Sunday', 'Last Monday', 'Yesterday'], correctIdx: 1, explanation_vi: '"Last Sunday my family went to the zoo".' },
      { q: 'Why were the monkeys funny?', options: ['They were very big', 'They jumped from tree to tree', 'They ate vegetables', 'They were tall'], correctIdx: 1, explanation_vi: '"The monkeys were funny because they jumped from tree to tree".' },
      { q: "What was the writer's favorite animal?", options: ['Elephant', 'Monkey', 'Giraffe', 'Lion'], correctIdx: 2, explanation_vi: '"My favorite animal was the giraffe".' },
      { q: 'When does the writer want to go to the zoo again?', options: ['Next week', 'Next month', 'Next year', 'Tomorrow'], correctIdx: 1, explanation_vi: '"I want to go again next month".' },
    ],
  },
  {
    level: 'A2',
    title_en: "Phuc's First Code",
    title_vi: 'Dòng code đầu tiên của Phúc',
    passage:
      'Phuc is eleven years old. Last week his father showed him a coding website. At first Phuc thought coding was difficult. But after one hour, he made a small game where a cat moved across the screen. Phuc was so excited that he forgot to eat dinner. Now he wants to make games every weekend.',
    questions: [
      { q: 'How old is Phuc?', options: ['9', '10', '11', '12'], correctIdx: 2, explanation_vi: '"Phuc is eleven years old".' },
      { q: 'What did Phuc make in his first hour?', options: ['A robot', 'A small cat game', 'A song', 'A video'], correctIdx: 1, explanation_vi: '"He made a small game where a cat moved across the screen".' },
      { q: 'How did Phuc feel after coding?', options: ['Tired', 'Bored', 'Excited', 'Sad'], correctIdx: 2, explanation_vi: '"Phuc was so excited that he forgot to eat dinner".' },
    ],
  },
  {
    level: 'A2',
    title_en: 'Saving Money',
    title_vi: 'Tiết kiệm tiền',
    passage:
      'An is nine years old. Every week his father gives him a small allowance. An decided to save half of his money in a piggy bank. After three months, he had enough to buy a book he wanted. He felt very proud. He learned that saving a little each week can give you something bigger later.',
    questions: [
      { q: 'How much does An save each week?', options: ['All of his money', 'None', 'Half', 'A quarter'], correctIdx: 2, explanation_vi: '"An decided to save half of his money".' },
      { q: 'How long did it take to save enough?', options: ['One week', 'One month', 'Three months', 'One year'], correctIdx: 2, explanation_vi: '"After three months, he had enough".' },
      { q: 'What is the lesson of the story?', options: ["Don't save", 'Saving little gives bigger result', 'Spend everything', 'Borrow money'], correctIdx: 1, explanation_vi: '"saving a little each week can give you something bigger later".' },
    ],
  },
  {
    level: 'A2',
    title_en: 'A Letter to Grandma',
    title_vi: 'Thư cho bà',
    passage:
      'Dear Grandma,\nHow are you? I miss you very much. I am doing well at school. Last week, I won a small drawing contest. I drew our home and our cat Mimi. The teacher said my picture was beautiful. I want to come visit you next holiday and bring you a copy. Hugs,\nY',
    questions: [
      { q: 'Who is the letter for?', options: ['Mom', 'Dad', 'Grandma', 'Teacher'], correctIdx: 2, explanation_vi: '"Dear Grandma".' },
      { q: 'What did Y win?', options: ['A singing contest', 'A drawing contest', 'A math test', 'A race'], correctIdx: 1, explanation_vi: '"I won a small drawing contest".' },
      { q: 'What did Y draw?', options: ['School', 'Home and cat Mimi', 'Mountains', 'Beach'], correctIdx: 1, explanation_vi: '"I drew our home and our cat Mimi".' },
    ],
  },
  {
    level: 'A2',
    title_en: 'My City Hanoi',
    title_vi: 'Thành phố của em — Hà Nội',
    passage:
      'I live in Hanoi, the capital of Vietnam. Hanoi has many old streets, big lakes, and tasty food like pho and banh mi. In autumn, the weather becomes cool and the trees turn yellow. Many tourists visit Hanoi every year. I love walking around West Lake with my family on weekends.',
    questions: [
      { q: 'What is Hanoi?', options: ['A river', 'The capital of Vietnam', 'A lake', 'A school'], correctIdx: 1, explanation_vi: '"the capital of Vietnam".' },
      { q: 'What food is mentioned?', options: ['Rice and bread', 'Pho and banh mi', 'Pasta', 'Sushi'], correctIdx: 1, explanation_vi: '"tasty food like pho and banh mi".' },
      { q: 'What does the writer love to do?', options: ['Cook', 'Walk around West Lake', 'Read books', 'Watch movies'], correctIdx: 1, explanation_vi: '"walking around West Lake with my family".' },
    ],
  },
  {
    level: 'A2',
    title_en: 'Saving Plastic',
    title_vi: 'Tiết kiệm nhựa',
    passage:
      'In our school, students started a project to use less plastic. We bring metal water bottles instead of plastic ones. We also pick up trash near the playground every Friday. After two months, our school looks much cleaner. Small actions can make a big change.',
    questions: [
      { q: 'What do students bring instead of plastic bottles?', options: ['Glass bottles', 'Metal water bottles', 'No bottles', 'Paper cups'], correctIdx: 1, explanation_vi: '"We bring metal water bottles instead of plastic ones".' },
      { q: 'How often do they pick up trash?', options: ['Every day', 'Every Friday', 'Every month', 'Once a year'], correctIdx: 1, explanation_vi: '"every Friday".' },
      { q: "What is the writer's main message?", options: ['Plastic is good', 'Small actions can make a big change', 'Schools are dirty', 'Cleaning is boring'], correctIdx: 1, explanation_vi: 'Câu cuối tóm tắt: "Small actions can make a big change".' },
    ],
  },

  // ──────── B1 ────────
  {
    level: 'B1',
    title_en: 'The Power of Curiosity',
    title_vi: 'Sức mạnh của sự tò mò',
    passage:
      'Curiosity is one of the most important traits a young person can have. When children ask "why" questions, they are training their minds to think deeply about the world. Many great scientists, artists, and inventors say that their success started with a simple question they could not stop asking. In Vietnam today, schools encourage memorization, but families can help by giving children time to wonder, explore, and even make mistakes. The best learning often happens when we follow our own questions, not someone else\'s answers.',
    questions: [
      { q: 'According to the passage, what do "why" questions help children do?', options: ['Get higher test scores', 'Train their minds to think deeply', 'Memorize more facts', 'Learn languages faster'], correctIdx: 1, explanation_vi: '"they are training their minds to think deeply about the world".' },
      { q: 'How did many great scientists and inventors start their success?', options: ['By copying others', 'By memorizing books', 'With a simple question they could not stop asking', 'By following teachers strictly'], correctIdx: 2, explanation_vi: '"their success started with a simple question they could not stop asking".' },
      { q: 'What does the writer suggest Vietnamese families do?', options: ['Give children more memorization homework', 'Send children to extra classes', 'Give children time to wonder, explore, and make mistakes', 'Buy more books'], correctIdx: 2, explanation_vi: '"families can help by giving children time to wonder, explore, and even make mistakes".' },
      { q: 'What is the main idea of the passage?', options: ['Memorization is bad', 'Vietnamese schools are wrong', 'Curiosity-driven learning is more powerful than answer-driven learning', 'Scientists are smarter than artists'], correctIdx: 2, explanation_vi: 'Câu cuối: "The best learning often happens when we follow our own questions".' },
    ],
  },
  {
    level: 'B1',
    title_en: 'Learning From Failure',
    title_vi: 'Học từ thất bại',
    passage:
      'Many people are afraid to fail. They think failure means they are not smart or talented. However, scientists and successful entrepreneurs often say the opposite: failure is one of their best teachers. When we fail, we learn what does not work. We also learn how to try again with a smarter approach. The next time you fail at something, do not feel bad for too long — instead, ask yourself what you learned and what you would do differently.',
    questions: [
      { q: 'What is the common fear about failure?', options: ['It costs money', 'It means we are not smart or talented', 'It takes time', 'It hurts physically'], correctIdx: 1, explanation_vi: '"failure means they are not smart or talented".' },
      { q: 'What do scientists and entrepreneurs say about failure?', options: ['Failure is dangerous', 'Failure is one of their best teachers', 'Failure is rare', 'Failure is fun'], correctIdx: 1, explanation_vi: '"failure is one of their best teachers".' },
      { q: 'After a failure, what should you do?', options: ['Quit', 'Feel bad forever', 'Ask what you learned and what you would do differently', 'Blame someone'], correctIdx: 2, explanation_vi: '"ask yourself what you learned and what you would do differently".' },
    ],
  },
  {
    level: 'B1',
    title_en: 'Why Sleep Matters',
    title_vi: 'Vì sao giấc ngủ quan trọng',
    passage:
      'Sleep is more important than many young people think. During deep sleep, our brain organizes memories and our body repairs itself. Teenagers who sleep less than seven hours often have lower grades, slower reactions, and more emotional ups and downs. Phones and bright screens before bed make this worse because they delay the body\'s natural sleep signals. A simple rule: stop screens 30 minutes before bed and keep a regular bedtime.',
    questions: [
      { q: 'What happens to the brain during deep sleep?', options: ['It shuts down completely', 'It organizes memories', 'It loses information', 'It uses more energy than awake'], correctIdx: 1, explanation_vi: '"our brain organizes memories".' },
      { q: 'What are effects of less than 7 hours of sleep for teenagers?', options: ['Higher grades', 'Faster reactions', 'Lower grades and slower reactions', 'No effect'], correctIdx: 2, explanation_vi: '"lower grades, slower reactions".' },
      { q: 'Why are screens before bed bad?', options: ['They cost money', 'They delay the body\'s natural sleep signals', 'They make rooms hot', 'They produce noise'], correctIdx: 1, explanation_vi: '"delay the body\'s natural sleep signals".' },
      { q: 'What is the simple rule?', options: ['Sleep on the floor', 'Stop screens 30 minutes before bed and keep a regular bedtime', 'Drink coffee at night', 'Exercise at midnight'], correctIdx: 1, explanation_vi: '"stop screens 30 minutes before bed and keep a regular bedtime".' },
    ],
  },
  {
    level: 'B1',
    title_en: 'Vietnamese Tet Tradition',
    title_vi: 'Truyền thống Tết Việt',
    passage:
      'Tet is the most important holiday in Vietnam. Families clean their homes, cook special foods like banh chung, and visit grandparents. Children receive li xi (lucky money) in red envelopes. While the tradition is deeply rooted in respect for ancestors, modern families also use Tet as a time to reset goals and reflect on the year. Even if some traditions change, the heart of Tet — gathering with loved ones — stays the same.',
    questions: [
      { q: 'What is the most important Vietnamese holiday?', options: ['Mid-Autumn', 'Tet', 'New Year (Western)', 'Hung Kings Day'], correctIdx: 1, explanation_vi: '"Tet is the most important holiday in Vietnam".' },
      { q: 'What is given to children in red envelopes?', options: ['Books', 'Candy', 'Lucky money (li xi)', 'Toys'], correctIdx: 2, explanation_vi: '"Children receive li xi (lucky money) in red envelopes".' },
      { q: 'What does the heart of Tet stay focused on?', options: ['Cleaning', 'Money', 'Gathering with loved ones', 'Cooking'], correctIdx: 2, explanation_vi: 'Câu cuối: "the heart of Tet — gathering with loved ones — stays the same".' },
    ],
  },
  {
    level: 'B1',
    title_en: 'Why Read Books?',
    title_vi: 'Vì sao nên đọc sách?',
    passage:
      'Even with so many videos and short clips today, reading books remains one of the most powerful ways to grow. Books force us to slow down and imagine. They train our attention and our vocabulary. Studies show kids who read for fun, not just for school, score higher in tests and have richer language skills as adults. The good news: only 15 minutes a day is enough to start.',
    questions: [
      { q: 'Why are books powerful even today?', options: ['They are cheap', 'They force us to slow down and imagine', 'They are colorful', 'They are short'], correctIdx: 1, explanation_vi: '"Books force us to slow down and imagine".' },
      { q: 'What do studies show about kids who read for fun?', options: ['They sleep less', 'They score higher and have richer language', 'They are slower', 'They are quieter'], correctIdx: 1, explanation_vi: '"score higher in tests and have richer language skills".' },
      { q: 'How much daily reading is enough to start?', options: ['1 hour', '15 minutes', '30 minutes', '5 minutes'], correctIdx: 1, explanation_vi: '"only 15 minutes a day is enough to start".' },
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
  // ──────── K (mầm non — vẽ + 1 từ/câu ngắn) ────────
  { level: 'K', prompt_en: 'Draw your favorite food and write its name in English.', prompt_vi: 'Vẽ món ăn con thích và viết tên bằng tiếng Anh.', min_sentences: 1, example_starter: 'I like ___.' },
  { level: 'K', prompt_en: 'Draw your family and write "mom", "dad", or your name.', prompt_vi: 'Vẽ gia đình con, viết "mom", "dad", và tên con.', min_sentences: 1, example_starter: 'My family: mom, dad, ___.' },
  { level: 'K', prompt_en: 'Write the colors you love in English.', prompt_vi: 'Viết các màu con yêu thích bằng tiếng Anh.', min_sentences: 1, example_starter: 'I love red, blue, ___.' },
  { level: 'K', prompt_en: 'Write 1 sentence about your toy.', prompt_vi: 'Viết 1 câu về đồ chơi của con.', min_sentences: 1, example_starter: 'I have a ___.' },
  { level: 'K', prompt_en: 'Write your name and age.', prompt_vi: 'Viết tên và tuổi của con.', min_sentences: 1, example_starter: 'My name is ___. I am ___.' },

  // ──────── A1 ────────
  { level: 'A1', prompt_en: 'Write 3 sentences about your favorite animal.', prompt_vi: 'Viết 3 câu về con vật con yêu thích.', min_sentences: 3, example_starter: 'My favorite animal is a ___. It has ___. It can ___.' },
  { level: 'A1', prompt_en: 'Tell me about your family in 3 sentences.', prompt_vi: 'Kể về gia đình con bằng 3 câu.', min_sentences: 3, example_starter: 'My family has ___ people. My father is ___. We love ___.' },
  { level: 'A1', prompt_en: 'What did you do this morning? Write 3 sentences.', prompt_vi: 'Sáng nay con làm gì? Viết 3 câu.', min_sentences: 3, example_starter: 'This morning I ___. Then I ___. After that I ___.' },
  // expansion
  { level: 'A1', prompt_en: 'Describe your school in 3 sentences.', prompt_vi: 'Mô tả trường học của con bằng 3 câu.', min_sentences: 3, example_starter: 'My school is ___. The teachers are ___. I like ___.' },
  { level: 'A1', prompt_en: 'Write 3 sentences about your best friend.', prompt_vi: 'Viết 3 câu về bạn thân của con.', min_sentences: 3, example_starter: 'My best friend is ___. We like to ___. He/She is ___.' },
  { level: 'A1', prompt_en: 'What is your favorite food? Write 3 sentences.', prompt_vi: 'Món ăn con thích nhất là gì? Viết 3 câu.', min_sentences: 3, example_starter: 'My favorite food is ___. It is ___. I eat it ___.' },
  { level: 'A1', prompt_en: 'Describe your room in 3 sentences.', prompt_vi: 'Mô tả phòng của con bằng 3 câu.', min_sentences: 3, example_starter: 'My room has ___. I like ___ in my room. I sleep ___.' },
  { level: 'A1', prompt_en: 'Write 3 sentences about your weekend.', prompt_vi: 'Viết 3 câu về cuối tuần của con.', min_sentences: 3, example_starter: 'On weekends I ___. My family ___. I am ___.' },
  { level: 'A1', prompt_en: 'Write 3 things you can do well.', prompt_vi: 'Viết 3 điều con làm giỏi.', min_sentences: 3, example_starter: 'I can ___. I can also ___. I am good at ___.' },
  { level: 'A1', prompt_en: 'Describe the weather today.', prompt_vi: 'Mô tả thời tiết hôm nay.', min_sentences: 3, example_starter: 'Today is ___. The sky is ___. I feel ___.' },

  // ──────── A2 ────────
  { level: 'A2', prompt_en: 'Describe your favorite place. Why do you like it? Write 4-5 sentences.', prompt_vi: 'Mô tả nơi con yêu thích. Tại sao con thích? Viết 4-5 câu.', min_sentences: 4, example_starter: 'My favorite place is ___. I like it because ___. When I am there, I ___.' },
  { level: 'A2', prompt_en: 'What do you want to be when you grow up and why?', prompt_vi: 'Con muốn làm gì khi lớn lên và tại sao?', min_sentences: 4, example_starter: 'When I grow up I want to be a ___. I want to be a ___ because ___.' },
  { level: 'A2', prompt_en: 'Write about a happy memory. What happened? Where? With whom?', prompt_vi: 'Viết về 1 kỷ niệm vui. Chuyện gì xảy ra? Ở đâu? Với ai?', min_sentences: 4, example_starter: 'One of my happiest memories was when ___. It happened at ___. I was with ___.' },
  // expansion
  { level: 'A2', prompt_en: 'Write a short paragraph about a hobby you enjoy and how you started it.', prompt_vi: 'Viết 1 đoạn ngắn về sở thích con và cách con bắt đầu.', min_sentences: 4, example_starter: 'My hobby is ___. I started ___ ago. I enjoy it because ___.' },
  { level: 'A2', prompt_en: 'Describe your perfect Sunday.', prompt_vi: 'Mô tả 1 ngày Chủ Nhật hoàn hảo.', min_sentences: 4, example_starter: 'On my perfect Sunday I would ___ in the morning. Then ___. In the evening, ___.' },
  { level: 'A2', prompt_en: 'Write about a teacher you like and why.', prompt_vi: 'Viết về 1 giáo viên con thích và tại sao.', min_sentences: 4, example_starter: 'My favorite teacher is ___. He/She teaches ___. I like him/her because ___.' },
  { level: 'A2', prompt_en: 'Tell me about a Vietnamese tradition you enjoy.', prompt_vi: 'Kể về một truyền thống Việt Nam con thích.', min_sentences: 4, example_starter: 'A Vietnamese tradition I enjoy is ___. During this time we ___. I like it because ___.' },
  { level: 'A2', prompt_en: 'Imagine you have one wish. What would you wish for and why?', prompt_vi: 'Nếu có 1 điều ước, con ước gì và tại sao?', min_sentences: 4, example_starter: 'If I had one wish, I would ___. I would wish for this because ___.' },
  { level: 'A2', prompt_en: 'Describe a sport or game you like to play.', prompt_vi: 'Mô tả 1 môn thể thao hoặc trò chơi con thích.', min_sentences: 4, example_starter: 'I like to play ___. I usually play with ___. The reason I like it is ___.' },

  // ──────── B1 ────────
  { level: 'B1', prompt_en: 'If you could change one thing about the world, what would it be and why?', prompt_vi: 'Nếu thay đổi 1 điều về thế giới, đó là gì và tại sao?', min_sentences: 5, example_starter: 'If I could change one thing, I would ___. I think this is important because ___.' },
  { level: 'B1', prompt_en: 'Do you think technology helps or hurts kids your age? Give reasons.', prompt_vi: 'Công nghệ giúp hay hại trẻ em tuổi con? Nêu lý do.', min_sentences: 5, example_starter: 'I think technology mostly ___. One reason is ___. However, ___.' },
  { level: 'B1', prompt_en: 'Describe a person you admire. What qualities make them special?', prompt_vi: 'Mô tả 1 người con ngưỡng mộ. Điều gì làm họ đặc biệt?', min_sentences: 5, example_starter: 'A person I really admire is ___. What makes them special is ___.' },
  // expansion
  { level: 'B1', prompt_en: 'Write about a time you faced a difficult challenge and what you learned.', prompt_vi: 'Viết về 1 lần con đối mặt thử thách khó và đã học được gì.', min_sentences: 5, example_starter: 'A challenge I faced was ___. At first I felt ___. Eventually I learned that ___.' },
  { level: 'B1', prompt_en: 'Should kids get a smartphone before age 12? Argue your view.', prompt_vi: 'Trẻ có nên có smartphone trước 12 tuổi không? Lập luận quan điểm của con.', min_sentences: 5, example_starter: 'I believe kids ___ have smartphones before 12 because ___.' },
  { level: 'B1', prompt_en: 'Describe a goal you want to achieve in the next year.', prompt_vi: 'Mô tả 1 mục tiêu con muốn đạt trong năm tới.', min_sentences: 5, example_starter: 'A goal I want to achieve is ___. To reach this goal I will ___.' },
  { level: 'B1', prompt_en: 'Compare life in a big city and a small town. Which would you prefer?', prompt_vi: 'So sánh sống ở thành phố lớn và thị trấn nhỏ. Con thích bên nào?', min_sentences: 5, example_starter: 'Life in a big city is ___, while a small town is ___. I would prefer ___ because ___.' },
  { level: 'B1', prompt_en: 'Write about why family is important in Vietnamese culture.', prompt_vi: 'Vì sao gia đình quan trọng trong văn hoá Việt? Viết suy nghĩ.', min_sentences: 5, example_starter: 'In Vietnamese culture, family is important because ___. For example, ___.' },
  { level: 'B1', prompt_en: 'Imagine you start a small business at age 14. What would it be and why?', prompt_vi: 'Nếu khởi nghiệp nhỏ ở tuổi 14, con sẽ làm gì và tại sao?', min_sentences: 5, example_starter: 'If I started a small business at 14, I would ___. The reason is ___. To make it work I would ___.' },
  { level: 'B1', prompt_en: 'Describe how you handle stress before an important test.', prompt_vi: 'Mô tả cách con xử lý stress trước kỳ thi quan trọng.', min_sentences: 5, example_starter: 'When I feel stress before a test, I usually ___. This helps me because ___.' },
];

// ============================================================
// HELPERS
// ============================================================
export function getLevelForAge(age: number): CEFRLevel {
  if (age <= 6) return 'K';
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

// Stats: total content per category
export function getEnglishStats() {
  return {
    vocabByLevel: {
      K: LISTEN_WORDS.K.length,
      A1: LISTEN_WORDS.A1.length,
      A2: LISTEN_WORDS.A2.length,
      B1: LISTEN_WORDS.B1.length,
      total: LISTEN_WORDS.K.length + LISTEN_WORDS.A1.length + LISTEN_WORDS.A2.length + LISTEN_WORDS.B1.length,
    },
    speakSentences: SPEAK_SENTENCES.length,
    readingPassages: READING_PASSAGES.length,
    writingPrompts: WRITING_PROMPTS.length,
  };
}
