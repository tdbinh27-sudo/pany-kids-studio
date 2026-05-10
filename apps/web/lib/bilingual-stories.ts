// ============================================================
// PANY KIDS STUDIO — Bilingual Story Library (VN ↔ EN)
// 50 stories across K / A1 / A2 / B1 levels
// Designed for: shared reading (Như Ý + bố), self-read (An, Phúc),
//               independent reading (Phúc upper)
// ============================================================

import type { CEFRLevel } from './english-skills';

export type StoryGenre =
  | 'fable'        // Truyện ngụ ngôn
  | 'folklore'     // Truyện dân gian (VN + thế giới)
  | 'family'       // Gia đình
  | 'adventure'    // Phiêu lưu
  | 'science'      // Khoa học vui
  | 'biography'    // Tiểu sử nhỏ
  | 'modern'       // Đời sống hiện đại
  | 'humor';       // Hài hước

export type Story = {
  id: string;
  level: CEFRLevel;
  genre: StoryGenre;
  title_vi: string;
  title_en: string;
  /** parallel paragraphs — same length VI vs EN */
  paragraphs: { vi: string; en: string }[];
  moral_vi?: string;
  moral_en?: string;
  reading_minutes: number;
  vocab_focus?: string[];   // 3-5 key words
};

const S = (
  id: string,
  level: CEFRLevel,
  genre: StoryGenre,
  title_vi: string,
  title_en: string,
  paragraphs: { vi: string; en: string }[],
  reading_minutes: number,
  moral_vi?: string,
  moral_en?: string,
  vocab_focus?: string[],
): Story => ({ id, level, genre, title_vi, title_en, paragraphs, moral_vi, moral_en, reading_minutes, vocab_focus });

// ────────────────────────────────────────────────────────────
// K — KINDERGARTEN (Như Ý 5t) — 8 stories, 3-5 sentences each
// ────────────────────────────────────────────────────────────
export const STORIES_K: Story[] = [
  S('s-k-1','K','family','Mẹ và Em','Mom and Me',[
    { vi:'Mẹ yêu em.', en:'Mom loves me.' },
    { vi:'Mẹ nấu cơm cho em.', en:'Mom cooks for me.' },
    { vi:'Em yêu mẹ rất nhiều.', en:'I love mom very much.' },
  ],2,'Tình yêu của mẹ là quà tuyệt nhất.','A mom\'s love is the best gift.',['mom','love','cook']),

  S('s-k-2','K','family','Bố và Em','Dad and Me',[
    { vi:'Bố cao và mạnh.', en:'Dad is tall and strong.' },
    { vi:'Bố chơi bóng với em.', en:'Dad plays ball with me.' },
    { vi:'Em vui khi có bố.', en:'I am happy with dad.' },
  ],2,undefined,undefined,['dad','tall','play']),

  S('s-k-3','K','adventure','Con Mèo và Quả Bóng','The Cat and the Ball',[
    { vi:'Có một con mèo.', en:'There is a cat.' },
    { vi:'Mèo thấy quả bóng.', en:'The cat sees a ball.' },
    { vi:'Mèo chơi với quả bóng.', en:'The cat plays with the ball.' },
    { vi:'Mèo rất vui.', en:'The cat is very happy.' },
  ],2,undefined,undefined,['cat','ball','play']),

  S('s-k-4','K','science','Mặt Trời và Mặt Trăng','The Sun and the Moon',[
    { vi:'Mặt trời sáng vào ban ngày.', en:'The sun shines in the day.' },
    { vi:'Mặt trăng sáng vào ban đêm.', en:'The moon shines at night.' },
    { vi:'Cả hai đều đẹp.', en:'Both are beautiful.' },
  ],2,undefined,undefined,['sun','moon','day','night']),

  S('s-k-5','K','humor','Con Vịt Vàng','The Yellow Duck',[
    { vi:'Có một con vịt nhỏ.', en:'There is a little duck.' },
    { vi:'Con vịt màu vàng.', en:'The duck is yellow.' },
    { vi:'Vịt kêu "cạp cạp".', en:'The duck says "quack quack".' },
    { vi:'Em cười.', en:'I laugh.' },
  ],2,undefined,undefined,['duck','yellow','quack']),

  S('s-k-6','K','family','Bữa Cơm Gia Đình','Family Dinner',[
    { vi:'Mẹ nấu cơm.', en:'Mom cooks rice.' },
    { vi:'Bố cắt rau.', en:'Dad cuts vegetables.' },
    { vi:'Cả nhà ăn cùng nhau.', en:'We eat together.' },
    { vi:'Em vui.', en:'I am happy.' },
  ],2,'Ăn cơm cùng gia đình rất vui.','Eating with family is fun.',['cook','eat','together']),

  S('s-k-7','K','adventure','Đi Công Viên','Going to the Park',[
    { vi:'Hôm nay đi công viên.', en:'Today we go to the park.' },
    { vi:'Em chơi xích đu.', en:'I play on the swing.' },
    { vi:'Em chạy với chó.', en:'I run with the dog.' },
    { vi:'Em rất vui.', en:'I am very happy.' },
  ],3,undefined,undefined,['park','swing','run']),

  S('s-k-8','K','folklore','Thỏ Trắng','Little White Rabbit',[
    { vi:'Có một con thỏ trắng.', en:'There is a white rabbit.' },
    { vi:'Thỏ ăn cà rốt.', en:'The rabbit eats carrots.' },
    { vi:'Thỏ nhảy nhanh.', en:'The rabbit hops fast.' },
  ],2,undefined,undefined,['rabbit','carrot','hop']),
];

// ────────────────────────────────────────────────────────────
// A1 — LOWER PRIMARY (Bình An 9t base) — 14 stories
// ────────────────────────────────────────────────────────────
export const STORIES_A1: Story[] = [
  S('s-a1-1','A1','family','Sinh Nhật của An','An\'s Birthday',[
    { vi:'Hôm nay là sinh nhật của An. An lên 9 tuổi.', en:'Today is An\'s birthday. He turns 9.' },
    { vi:'Mẹ làm bánh sô-cô-la. Bố mua một quả bóng đá mới.', en:'Mom bakes a chocolate cake. Dad buys a new soccer ball.' },
    { vi:'Bạn của An đến chơi. Họ cười và hát.', en:'An\'s friends come over. They laugh and sing.' },
    { vi:'An cảm ơn mọi người. Đây là ngày vui nhất.', en:'An thanks everyone. It is the happiest day.' },
  ],3,undefined,undefined,['birthday','cake','friend']),

  S('s-a1-2','A1','adventure','Quả Bóng Đỏ','The Red Ball',[
    { vi:'Một cậu bé có quả bóng đỏ. Cậu rất yêu quả bóng.', en:'A boy has a red ball. He loves it.' },
    { vi:'Một ngày, gió thổi quả bóng bay đi. Cậu chạy theo.', en:'One day, the wind blows the ball away. He runs after it.' },
    { vi:'Quả bóng dừng ở công viên. Một bạn nhỏ đang khóc.', en:'The ball stops at a park. A little kid is crying.' },
    { vi:'Cậu nhặt bóng và đưa cho bạn. Hai người trở thành bạn.', en:'He picks up the ball and gives it to the kid. They become friends.' },
  ],4,'Chia sẻ tạo ra bạn mới.','Sharing makes new friends.',['ball','wind','share','friend']),

  S('s-a1-3','A1','folklore','Sự Tích Cây Tre','Why Bamboo Stands Tall',[
    { vi:'Ngày xưa, có một loại cây không thẳng. Cây hay cong.', en:'Long ago, there was a plant that was not straight. It bent often.' },
    { vi:'Một ông tiên dạy cây cách đứng cao. Cây đã cố gắng mỗi ngày.', en:'An old wizard taught the plant to stand tall. The plant tried every day.' },
    { vi:'Sau nhiều năm, cây cao và thẳng. Người ta gọi nó là tre.', en:'After many years, the plant grew tall and straight. People called it bamboo.' },
    { vi:'Bây giờ, tre dùng làm nhà, làm quạt, làm đồ chơi.', en:'Now bamboo is used for houses, fans, and toys.' },
  ],4,'Cố gắng mỗi ngày sẽ đứng cao.','Daily effort makes you stand tall.',['bamboo','tall','straight']),

  S('s-a1-4','A1','science','Mưa Đến Từ Đâu?','Where Does Rain Come From?',[
    { vi:'Mặt trời hâm nóng nước trong sông và biển.', en:'The sun warms the water in rivers and seas.' },
    { vi:'Nước bay lên trời và làm thành mây.', en:'The water goes up to the sky and becomes clouds.' },
    { vi:'Khi mây đầy nước, mưa rơi xuống.', en:'When clouds are full of water, rain falls down.' },
    { vi:'Đó là vòng tuần hoàn của nước.', en:'That is the water cycle.' },
  ],4,undefined,undefined,['sun','cloud','rain','cycle']),

  S('s-a1-5','A1','family','Như Ý Tập Đếm','Y Learns to Count',[
    { vi:'Như Ý mới 5 tuổi. Em đang học đếm.', en:'Y is only 5 years old. She is learning to count.' },
    { vi:'Em đếm: một, hai, ba, bốn, năm.', en:'She counts: one, two, three, four, five.' },
    { vi:'Bố vỗ tay. "Giỏi quá, con!"', en:'Dad claps. "Great job, sweetie!"' },
    { vi:'Như Ý cười và đếm tiếp đến mười.', en:'Y smiles and counts up to ten.' },
  ],3,undefined,undefined,['count','five','ten']),

  S('s-a1-6','A1','humor','Con Mèo Lười','The Lazy Cat',[
    { vi:'Có một con mèo tên Tom. Tom rất lười.', en:'There is a cat named Tom. Tom is very lazy.' },
    { vi:'Tom ngủ cả ngày. Nó chỉ thức dậy để ăn.', en:'Tom sleeps all day. He only wakes up to eat.' },
    { vi:'Một hôm, một con chuột chạy ngay trước mặt Tom. Tom mở mắt rồi ngủ tiếp.', en:'One day, a mouse runs right past Tom. Tom opens his eyes and goes back to sleep.' },
    { vi:'Mẹ cười. "Tom là mèo của giấc ngủ."', en:'Mom laughs. "Tom is the cat of sleep."' },
  ],4,undefined,undefined,['cat','lazy','sleep']),

  S('s-a1-7','A1','adventure','Đi Hái Xoài','Picking Mangoes',[
    { vi:'Phúc đi cùng ông ngoại đến vườn. Ông có một cây xoài lớn.', en:'Phuc goes with grandpa to the garden. Grandpa has a big mango tree.' },
    { vi:'Phúc trèo lên cành thấp. Em chọn quả vàng nhất.', en:'Phuc climbs onto a low branch. He picks the yellowest mango.' },
    { vi:'Ông cắt xoài và cả nhà cùng ăn. Xoài rất ngọt.', en:'Grandpa cuts the mango and the whole family eats. The mango is very sweet.' },
    { vi:'Phúc nói: "Mai con muốn lại đến đây."', en:'Phuc says: "Tomorrow I want to come again."' },
  ],4,undefined,undefined,['mango','tree','sweet']),

  S('s-a1-8','A1','fable','Rùa và Thỏ','The Tortoise and the Hare',[
    { vi:'Một con thỏ chạy rất nhanh. Một con rùa đi rất chậm.', en:'A hare runs very fast. A tortoise walks very slow.' },
    { vi:'Hai con quyết định chạy đua. Thỏ chạy lên trước, rồi ngủ.', en:'They decide to race. The hare runs ahead, then sleeps.' },
    { vi:'Rùa đi đều đặn không nghỉ. Khi thỏ thức, rùa đã thắng.', en:'The tortoise walks steadily without stopping. When the hare wakes up, the tortoise has already won.' },
  ],4,'Chậm và đều thắng nhanh và lười.','Slow and steady wins the race.',['hare','tortoise','race']),

  S('s-a1-9','A1','modern','Phúc Học Code','Phuc Learns to Code',[
    { vi:'Hôm nay Phúc 11 tuổi học code lần đầu. Ban đầu rất khó.', en:'Today Phuc, age 11, learns to code for the first time. At first it is hard.' },
    { vi:'Bố chỉ Phúc cách kéo thả khối lệnh trong Scratch. Sau một giờ, Phúc làm được con mèo đi.', en:'Dad shows Phuc how to drag blocks in Scratch. After one hour, Phuc makes a cat walk.' },
    { vi:'Phúc cười to. "Con thấy code rất vui."', en:'Phuc laughs out loud. "Coding is fun."' },
  ],4,undefined,undefined,['code','Scratch','block']),

  S('s-a1-10','A1','family','Cuối Tuần ở Hạ Long','Weekend in Ha Long',[
    { vi:'Gia đình em đi Hạ Long cuối tuần. Biển xanh và đẹp.', en:'My family goes to Ha Long for the weekend. The sea is blue and beautiful.' },
    { vi:'Em ăn hải sản tươi. Bố em chụp nhiều ảnh.', en:'I eat fresh seafood. My dad takes many photos.' },
    { vi:'Em không muốn về nhà. Nhưng tối Chủ Nhật cả nhà phải về để học.', en:'I don\'t want to go home. But Sunday evening we have to go back for school.' },
  ],4,undefined,undefined,['Ha Long','sea','seafood']),

  S('s-a1-11','A1','science','Tại sao bầu trời màu xanh?','Why is the sky blue?',[
    { vi:'Ánh sáng mặt trời có nhiều màu. Khi đi qua không khí, màu xanh tản nhiều hơn.', en:'Sunlight has many colors. When it passes air, blue scatters more.' },
    { vi:'Vì vậy bầu trời nhìn thấy màu xanh. Khoa học rất thú vị.', en:'So the sky looks blue to us. Science is interesting.' },
  ],3,undefined,undefined,['sky','blue','sunlight']),

  S('s-a1-12','A1','folklore','Sự Tích Trầu Cau','The Tale of Betel and Areca',[
    { vi:'Ngày xưa có hai anh em rất giống nhau. Cả hai cùng yêu một cô gái.', en:'Long ago there were two brothers who looked alike. Both loved the same girl.' },
    { vi:'Một hôm em đi tìm anh nhưng lạc đường. Em hoá thành cây cau.', en:'One day the younger went to find the elder but lost his way. He turned into an areca tree.' },
    { vi:'Anh đi tìm em rồi cũng hoá thành cây trầu quấn quanh.', en:'The elder went looking and turned into a betel vine wrapping around.' },
    { vi:'Cô gái buồn quá hoá thành tảng đá. Người Việt nhai trầu cau để nhớ tình anh em.', en:'The girl turned into a stone. Vietnamese chew betel and areca to remember the brothers\' love.' },
  ],5,'Tình thân là quý nhất.','Family love is the most precious.',['betel','areca','brother']),

  S('s-a1-13','A1','humor','Bố Bình Quên Chìa Khóa','Dad Bình Forgets His Keys',[
    { vi:'Một sáng, bố Bình ra xe đi làm. Bố không tìm thấy chìa khóa.', en:'One morning, Dad Bình goes to the car. He cannot find his keys.' },
    { vi:'Bố tìm trong túi, trong túi xách, trong tủ. Không có.', en:'He looks in pockets, in his bag, in the cupboard. Not there.' },
    { vi:'Cuối cùng An phát hiện chìa khóa nằm trong tủ lạnh!', en:'Finally An finds the keys in the fridge!' },
    { vi:'Cả nhà cười rất to. Bố nói: "Bố cần ngủ thêm 5 phút."', en:'The whole family laughs. Dad says: "I need 5 more minutes of sleep."' },
  ],5,undefined,undefined,['keys','forget','fridge']),

  S('s-a1-14','A1','modern','Tiết Kiệm Heo Đất','The Piggy Bank',[
    { vi:'Phúc có một con heo đất. Mỗi ngày em bỏ vào 2.000 đồng.', en:'Phuc has a piggy bank. Every day he puts in 2,000 VND.' },
    { vi:'Sau 6 tháng, heo đầy. Phúc đập heo và đếm tiền.', en:'After 6 months, the piggy is full. Phuc breaks it and counts the money.' },
    { vi:'Em mua một quyển sách Code và còn dư 50.000 đồng.', en:'He buys a coding book and has 50,000 VND left.' },
    { vi:'Em vui vì tự kiếm được tiền mua sách.', en:'He is happy because he earned money for his own book.' },
  ],4,'Tiết kiệm nhỏ thành quả lớn.','Small saving leads to a big reward.',['piggy bank','save','book']),
];

// ────────────────────────────────────────────────────────────
// A2 — UPPER PRIMARY (Phúc base) — 16 stories
// ────────────────────────────────────────────────────────────
export const STORIES_A2: Story[] = [
  S('s-a2-1','A2','adventure','Cuộc Phiêu Lưu Trong Rừng','Adventure in the Forest',[
    { vi:'Phúc và An đi cắm trại với bố ở rừng quốc gia Cát Tiên. Họ dựng lều bên cạnh một con suối nhỏ.', en:'Phuc and An go camping with dad in Cat Tien National Park. They set up a tent next to a small stream.' },
    { vi:'Vào buổi sáng, hai anh em nghe tiếng chim hót lạ. Họ đi theo âm thanh và phát hiện một loài chim màu xanh đỏ chưa từng thấy.', en:'In the morning, the brothers hear unusual bird songs. They follow the sound and find a red-and-blue bird they have never seen before.' },
    { vi:'Bố giải thích đó là chim trĩ. Tối hôm đó, họ kể câu chuyện này quanh đống lửa.', en:'Dad explains it is a pheasant. That night, they tell the story around the campfire.' },
    { vi:'An nói: "Con muốn trở thành nhà sinh vật học khi lớn lên."', en:'An says: "I want to be a biologist when I grow up."' },
  ],6,undefined,undefined,['forest','tent','pheasant','biologist']),

  S('s-a2-2','A2','biography','Bác Hồ Khi Còn Nhỏ','Uncle Ho as a Child',[
    { vi:'Hồ Chí Minh sinh năm 1890 tại Nghệ An. Khi còn nhỏ, ông tên là Nguyễn Sinh Cung.', en:'Ho Chi Minh was born in 1890 in Nghe An. As a child, he was called Nguyen Sinh Cung.' },
    { vi:'Ông học rất giỏi và yêu sách. Ông luôn đặt câu hỏi về thế giới.', en:'He studied very well and loved books. He always asked questions about the world.' },
    { vi:'Lớn lên, ông đi nhiều nước để học và làm việc. Ông muốn giúp đất nước Việt Nam.', en:'When he grew up, he traveled to many countries to study and work. He wanted to help Vietnam.' },
    { vi:'Ngày nay, người Việt nhớ ông mỗi khi đi qua Lăng Bác ở Hà Nội.', en:'Today, Vietnamese people remember him whenever they pass his mausoleum in Hanoi.' },
  ],6,'Học và đặt câu hỏi sẽ thay đổi đời ta.','Learning and asking questions can change your life.',['born','study','travel','remember']),

  S('s-a2-3','A2','science','Vì Sao Voi Có Vòi Dài?','Why Do Elephants Have Long Trunks?',[
    { vi:'Tổ tiên của voi sống cách đây hàng triệu năm. Khi đó voi không có vòi dài.', en:'Elephants\' ancestors lived millions of years ago. They did not have long trunks.' },
    { vi:'Voi cần với tới lá cao và uống nước xa. Theo thời gian, mũi của voi dài ra để giúp việc đó.', en:'They needed to reach high leaves and water from far away. Over time, their noses became longer to help with that.' },
    { vi:'Bây giờ vòi voi rất khoẻ. Nó có thể nâng cây to hoặc nhặt một hạt nhỏ.', en:'Now an elephant\'s trunk is very strong. It can lift a big tree or pick up a tiny seed.' },
    { vi:'Tự nhiên rất thông minh, đúng không?', en:'Nature is smart, isn\'t it?' },
  ],6,'Tự nhiên thay đổi từ từ để thích nghi.','Nature slowly changes to adapt.',['elephant','trunk','adapt','nature']),

  S('s-a2-4','A2','family','Bữa Tối Đặc Biệt','A Special Dinner',[
    { vi:'Hôm nay là sinh nhật của bố Bình. Mẹ và 3 con quyết định bí mật chuẩn bị bữa tối.', en:'Today is Dad Bình\'s birthday. Mom and the three kids secretly prepare dinner.' },
    { vi:'Phúc nấu mì Ý. An rửa rau. Như Ý vẽ thiệp.', en:'Phuc cooks pasta. An washes the vegetables. Y draws a card.' },
    { vi:'Khi bố về nhà, đèn tắt và mọi người hô "Surprise!". Bố Bình bất ngờ và rất cảm động.', en:'When Dad comes home, the lights go off and everyone shouts "Surprise!". Dad is shocked and very touched.' },
    { vi:'Bố nói: "Đây là quà sinh nhật đẹp nhất."', en:'Dad says: "This is the best birthday gift."' },
  ],6,'Quà tặng đẹp nhất là tình cảm.','The best gift is love.',['dinner','surprise','birthday']),

  S('s-a2-5','A2','modern','An và Heo Đất','An and the Piggy Bank',[
    { vi:'An 9 tuổi muốn mua một chiếc xe đạp mới. Chiếc xe giá 2.500.000 đồng.', en:'An, age 9, wants a new bike. The bike costs 2,500,000 VND.' },
    { vi:'Bố cho An 50.000 đồng/tuần. An quyết định tiết kiệm 30.000 đồng và tiêu 20.000 đồng.', en:'Dad gives An 50,000 VND a week. An decides to save 30,000 and spend 20,000.' },
    { vi:'Sau 18 tháng, An đập heo đất và đếm tiền. Có đủ để mua xe!', en:'After 18 months, An breaks the piggy bank and counts the money. He has enough!' },
    { vi:'An thấy tự hào vì tự mình kiếm được chiếc xe.', en:'An is proud that he earned the bike himself.' },
  ],7,'Kiên trì mỗi tuần sẽ đạt mục tiêu lớn.','Weekly persistence reaches big goals.',['bike','save','persistent','proud']),

  S('s-a2-6','A2','folklore','Sơn Tinh Thuỷ Tinh','Son Tinh and Thuy Tinh',[
    { vi:'Vua Hùng có một công chúa rất xinh đẹp tên Mỵ Nương. Hai chàng trai đến cầu hôn cùng lúc.', en:'King Hung had a beautiful princess named My Nuong. Two young men came to ask for her hand at the same time.' },
    { vi:'Sơn Tinh là thần núi, Thuỷ Tinh là thần biển. Vua nói ai mang lễ đến trước sẽ cưới được công chúa.', en:'Son Tinh was god of the mountain, Thuy Tinh was god of the sea. The king said whoever brought wedding gifts first would marry the princess.' },
    { vi:'Sơn Tinh đến trước và đưa công chúa về núi. Thuỷ Tinh tức giận, dâng nước lũ tấn công.', en:'Son Tinh arrived first and brought the princess to the mountain. Thuy Tinh was angry and sent floods to attack.' },
    { vi:'Sơn Tinh dâng núi cao hơn. Mỗi năm Thuỷ Tinh vẫn dâng nước, đó là vì sao Việt Nam có bão lũ mùa hè.', en:'Son Tinh raised the mountains. Every year Thuy Tinh still rises water — that is why Vietnam has summer floods.' },
  ],7,undefined,undefined,['princess','mountain','sea','flood']),

  S('s-a2-7','A2','science','Vì Sao Có Ngày và Đêm?','Why Do We Have Day and Night?',[
    { vi:'Trái Đất xoay quanh trục của nó mỗi 24 giờ. Mặt trời chiếu sáng 1 nửa Trái Đất.', en:'The Earth spins on its axis every 24 hours. The sun lights up one half of the Earth.' },
    { vi:'Nửa được mặt trời chiếu là ban ngày. Nửa kia là ban đêm.', en:'The half facing the sun has day. The other half has night.' },
    { vi:'Khi Trái Đất tiếp tục xoay, ngày trở thành đêm. Đó là vì sao chúng ta thấy mặt trời mọc và lặn.', en:'As the Earth keeps spinning, day becomes night. That is why we see sunrise and sunset.' },
    { vi:'Ở Việt Nam, ngày và đêm gần như bằng nhau quanh năm.', en:'In Vietnam, day and night are almost equal year-round.' },
  ],6,undefined,undefined,['Earth','spin','axis','day','night']),

  S('s-a2-8','A2','adventure','Bí Mật Trong Hộp Cũ','Secret in the Old Box',[
    { vi:'Một ngày dọn nhà, Phúc tìm thấy một hộp gỗ cũ trong gác mái. Trong hộp có nhiều thứ lạ.', en:'One cleaning day, Phuc finds an old wooden box in the attic. The box has many strange things.' },
    { vi:'Có một bức ảnh đen trắng của ông nội thời trẻ. Có một lá thư viết tay từ năm 1970.', en:'There is a black-and-white photo of grandpa when he was young. There is a handwritten letter from 1970.' },
    { vi:'Bố giải thích đây là kỷ vật của ông nội. Bố kể cho Phúc nghe về ông và chiến tranh.', en:'Dad explains it is grandpa\'s memento. Dad tells Phuc about grandpa and the war.' },
    { vi:'Phúc nhận ra mỗi gia đình đều có lịch sử đáng nhớ.', en:'Phuc realizes every family has a story worth remembering.' },
  ],7,'Kỷ vật giúp ta hiểu nguồn cội.','Mementos help us understand our roots.',['box','letter','memento','history']),

  S('s-a2-9','A2','humor','Ngày Tệ của An','An\'s Bad Day',[
    { vi:'Sáng nay An ngủ quên. An mặc áo lộn ngược.', en:'This morning An overslept. He puts his shirt on backwards.' },
    { vi:'Đến trường, An quên hộp bút ở nhà. Cô giáo gọi An đọc bài mà An không thuộc.', en:'At school, An forgets his pencil case. The teacher asks him to read but he hasn\'t studied.' },
    { vi:'Vào giờ ra chơi, An ngã trong sân. An buồn lắm.', en:'During recess, An falls in the yard. He is very sad.' },
    { vi:'Về nhà, mẹ ôm An và nói: "Ngày tệ chỉ kéo dài 1 ngày." An cười lại được.', en:'Home time, mom hugs An and says: "Bad days only last one day." An smiles again.' },
  ],7,'Ngày xấu rồi cũng qua.','Bad days do pass.',['oversleep','forget','sad','smile']),

  S('s-a2-10','A2','modern','Hành Trình Đến Trường','The Journey to School',[
    { vi:'Mỗi sáng An đi xe đạp đến trường. Đường đi qua công viên Lê Văn Tám.', en:'Every morning An rides his bike to school. The route passes Le Van Tam park.' },
    { vi:'An gặp các bạn cùng lớp ở cổng. Họ cười và kể chuyện vui.', en:'An meets classmates at the gate. They laugh and chat.' },
    { vi:'Trên đường, An chú ý đèn giao thông và xe cộ. An luôn đội mũ bảo hiểm.', en:'On the way, An watches traffic lights and vehicles. He always wears a helmet.' },
    { vi:'Đến trường an toàn là điều bố mẹ vui nhất.', en:'Arriving safely is what makes parents happiest.' },
  ],6,undefined,undefined,['bike','school','traffic','helmet']),

  S('s-a2-11','A2','science','Vì Sao Lá Đổi Màu Mùa Thu?','Why Leaves Change Color in Autumn',[
    { vi:'Vào mùa hè, lá có màu xanh nhờ chất diệp lục. Diệp lục giúp lá tạo thức ăn.', en:'In summer, leaves are green because of chlorophyll. Chlorophyll helps leaves make food.' },
    { vi:'Khi mùa thu đến, ngày ngắn hơn và lạnh hơn. Cây ngừng tạo diệp lục.', en:'When autumn comes, days are shorter and colder. Trees stop making chlorophyll.' },
    { vi:'Lúc này lá lộ ra các màu khác — vàng, cam, đỏ — đã có sẵn dưới lớp xanh.', en:'Then leaves reveal other colors — yellow, orange, red — that were hidden under the green.' },
    { vi:'Đó là vì sao các vùng ôn đới có lá thu rất đẹp.', en:'That is why temperate regions have beautiful autumn leaves.' },
  ],7,undefined,undefined,['chlorophyll','autumn','color','tree']),

  S('s-a2-12','A2','adventure','Lễ Hội Tết','Tet Festival',[
    { vi:'Tết đến, gia đình bố Bình về quê thăm ông bà. Mọi người dọn nhà sạch để đón năm mới.', en:'When Tet comes, Dad Bình\'s family visits the grandparents in the countryside. Everyone cleans the house to welcome the new year.' },
    { vi:'Bà nấu bánh chưng và mứt. Phúc, An, và Như Ý gói lì xì.', en:'Grandma cooks banh chung and candied fruit. Phuc, An, and Y wrap lucky money envelopes.' },
    { vi:'Đêm giao thừa, cả nhà cùng xem pháo hoa. Sáng mùng 1, các con chúc tết và nhận lì xì.', en:'On New Year\'s Eve, the family watches fireworks together. Morning of day 1, the kids give greetings and receive lucky money.' },
    { vi:'Tết là dịp gia đình quây quần và nhớ về tổ tiên.', en:'Tet is when family gathers and remembers ancestors.' },
  ],8,'Tết là tình thân và tổ tiên.','Tet is about family and ancestors.',['Tet','banh chung','lucky money','fireworks']),

  S('s-a2-13','A2','biography','Steve Jobs Lúc Còn Nhỏ','Steve Jobs as a Boy',[
    { vi:'Steve Jobs sinh năm 1955 ở Mỹ. Khi còn nhỏ, ông thích tháo lắp đồ điện tử.', en:'Steve Jobs was born in 1955 in the USA. As a child, he loved taking electronics apart.' },
    { vi:'Bố nuôi của ông dạy ông dùng các công cụ sửa chữa. Steve học rằng "mặt sau của một sản phẩm cũng phải đẹp".', en:'His adoptive father taught him to use tools. Steve learned that "the back of a product must also be beautiful".' },
    { vi:'Lớn lên, Steve sáng lập Apple và làm ra iPhone. Hàng tỷ người trên thế giới dùng sản phẩm của ông.', en:'When he grew up, Steve founded Apple and made the iPhone. Billions of people worldwide use his products.' },
    { vi:'Bài học: tò mò + làm tay = phát minh lớn.', en:'Lesson: curiosity + hands-on work = big inventions.' },
  ],8,'Tò mò + làm thật → tương lai.','Curiosity + hands-on = future.',['electronics','tool','apple','invent']),

  S('s-a2-14','A2','family','Bài Học Từ Như Ý','A Lesson From Y',[
    { vi:'Một hôm, An giận em Như Ý vì em vẽ lên cuốn vở. An la lớn.', en:'One day, An is angry because Y scribbles on his notebook. He yells.' },
    { vi:'Như Ý khóc và nói: "Em không biết. Em xin lỗi anh."', en:'Y cries and says: "I didn\'t know. I\'m sorry."' },
    { vi:'An nhìn em rồi xin lỗi. An giúp em vẽ một quyển sách của riêng em.', en:'An looks at her and apologizes. He helps her draw her own book.' },
    { vi:'An hiểu rằng la không giải quyết được gì, chỉ cần kiên nhẫn.', en:'An learns that yelling solves nothing — patience does.' },
  ],7,'Kiên nhẫn lớn hơn la mắng.','Patience is bigger than yelling.',['angry','sorry','patience']),

  S('s-a2-15','A2','modern','Phúc và Lập Trình Game','Phuc and Game Programming',[
    { vi:'Phúc 11 tuổi muốn làm 1 game đơn giản. Bố giới thiệu Scratch cho em.', en:'Phuc, age 11, wants to make a simple game. Dad introduces him to Scratch.' },
    { vi:'Trong 3 ngày, Phúc làm xong "Maze Runner" — chú mèo phải tìm phô mai. Phúc học cách dùng IF, ELSE, và LOOP.', en:'In 3 days, Phuc finishes "Maze Runner" — a cat must find cheese. He learns to use IF, ELSE, and LOOP.' },
    { vi:'Phúc khoe game cho cả nhà chơi. An thắng nhanh nhất, Như Ý thua nhưng cười.', en:'Phuc shows the game to the family. An wins fastest, Y loses but laughs.' },
    { vi:'Bố nói: "Con đã tự xây thế giới mình. Đây là siêu năng lực."', en:'Dad says: "You built your own world. That\'s a superpower."' },
  ],7,'Code = siêu năng lực.','Code = superpower.',['Scratch','game','IF','LOOP']),

  S('s-a2-16','A2','folklore','Cây Khế','The Star Fruit Tree',[
    { vi:'Hai anh em sống cùng nhau. Anh cả tham lam, em hiền lành.', en:'Two brothers lived together. The elder was greedy, the younger was kind.' },
    { vi:'Em được cây khế. Một con chim đến ăn và hứa trả vàng.', en:'The younger got a star fruit tree. A bird came to eat and promised gold.' },
    { vi:'Chim chở em đến đảo vàng. Em chỉ lấy vừa đủ rồi về.', en:'The bird flew the younger to the island of gold. He took only what he needed and returned.' },
    { vi:'Anh cả thấy thèm. Anh đến đảo vàng, lấy quá nhiều, nặng quá rơi xuống biển.', en:'The elder envied. He went to the island, took too much, and sank into the sea.' },
  ],8,'Tham lam dẫn đến mất tất cả.','Greed leads to losing everything.',['greedy','kind','gold','bird']),
];

// ────────────────────────────────────────────────────────────
// B1 — EARLY SECONDARY (Phúc upper / future) — 12 stories
// ────────────────────────────────────────────────────────────
export const STORIES_B1: Story[] = [
  S('s-b1-1','B1','biography','Marie Curie','Marie Curie',[
    { vi:'Marie Curie sinh ra ở Ba Lan năm 1867. Khi còn nhỏ, bà rất thông minh nhưng phụ nữ thời đó không được vào đại học.', en:'Marie Curie was born in Poland in 1867. As a child she was brilliant, but at that time women were not allowed in universities.' },
    { vi:'Bà phải đi sang Pháp để học khoa học. Bà sống nghèo và ăn rất ít để tiết kiệm tiền cho việc học.', en:'She had to go to France to study science. She lived poorly and ate little to save money for her studies.' },
    { vi:'Cuối cùng, Marie và chồng phát hiện ra hai nguyên tố mới: polonium và radium. Bà đoạt giải Nobel hai lần.', en:'Eventually, Marie and her husband discovered two new elements: polonium and radium. She won the Nobel Prize twice.' },
    { vi:'Câu chuyện của bà cho ta biết: kiên trì có thể vượt qua những hạn chế xã hội đặt ra.', en:'Her story tells us: persistence can overcome the limits society places on us.' },
  ],10,'Kiên trì vượt qua hạn chế xã hội.','Persistence beats society\'s limits.',['Poland','radium','Nobel','persistence']),

  S('s-b1-2','B1','modern','Cuộc Sống Số Của Một Học Sinh','A Student\'s Digital Life',[
    { vi:'Hạnh Phúc 11 tuổi dùng iPad mỗi ngày để học và chơi. Em có Scratch, Khan Academy, và YouTube Kids.', en:'Hanh Phuc, age 11, uses an iPad daily to study and play. He has Scratch, Khan Academy, and YouTube Kids.' },
    { vi:'Bố Bình đặt giới hạn 90 phút mỗi ngày, không có mạng xã hội. Cả hai đồng ý đây là quy tắc công bằng.', en:'Dad Bình sets a 90-minute daily limit, no social media. Both agree this is a fair rule.' },
    { vi:'Phúc thường viết nhật ký số trong app riêng. Em tìm thấy việc viết lại giúp em suy nghĩ rõ hơn về cảm xúc.', en:'Phuc often writes a digital journal in a private app. He finds that writing things down helps him think more clearly about emotions.' },
    { vi:'Cuộc sống số có thể là công cụ tốt — nếu biết kiểm soát thay vì để nó kiểm soát mình.', en:'Digital life can be a good tool — if you control it instead of letting it control you.' },
  ],10,'Công nghệ là công cụ, không phải chủ.','Tech is a tool, not a master.',['digital','limit','journal','control']),

  S('s-b1-3','B1','science','Vì Sao Não Cần Ngủ','Why the Brain Needs Sleep',[
    { vi:'Khi ta ngủ sâu, não tiến hành "dọn dẹp". Các kết nối thần kinh không cần thiết bị xoá để tiết kiệm năng lượng.', en:'When we sleep deeply, the brain performs "cleanup". Unneeded neural connections are pruned to save energy.' },
    { vi:'Trí nhớ học trong ngày được củng cố vào những giấc ngủ REM. Đây là lý do học sinh thiếu ngủ thường nhớ kém hơn.', en:'Memories from the day are consolidated during REM sleep. That is why sleep-deprived students often have weaker recall.' },
    { vi:'Các nhà nghiên cứu khuyên trẻ 9-12 tuổi nên ngủ 9-12 giờ mỗi đêm. Ít hơn ảnh hưởng cả thể chất lẫn cảm xúc.', en:'Researchers recommend 9-12 hours of sleep per night for kids 9-12. Less than that affects both body and emotions.' },
    { vi:'Lần tới, khi muốn thức khuya học bài, hãy nhớ: ngủ tốt = học tốt hơn.', en:'Next time you want to stay up to study, remember: good sleep = better learning.' },
  ],10,'Ngủ là vũ khí học tập bí mật.','Sleep is the secret learning weapon.',['neural','REM','consolidate','recall']),

  S('s-b1-4','B1','adventure','Lạc Trên Núi','Lost on the Mountain',[
    { vi:'Một nhóm bạn 14 tuổi đi hike lên núi. Họ tự tin nhưng quên đem bản đồ giấy.', en:'A group of 14-year-olds hike up a mountain. They are confident but forgot a paper map.' },
    { vi:'Đến chiều, sương mù dâng và GPS điện thoại mất sóng. Họ phải dừng và quyết định.', en:'In the afternoon, fog rolls in and the phone GPS loses signal. They must stop and decide.' },
    { vi:'May mắn, một bạn nhớ kỹ năng từ tiết hướng đạo: tìm dòng nước, đi xuôi dòng. Sau 2 tiếng, họ thấy một bản nhỏ và an toàn về.', en:'Luckily, one kid remembers a scout skill: find a stream, go downhill. After 2 hours, they reach a small village safely.' },
    { vi:'Câu chuyện cho thấy kỹ năng không công nghệ vẫn rất giá trị trong thời đại số.', en:'The story shows that low-tech skills still matter in a digital age.' },
  ],11,'Kỹ năng cơ bản cứu mạng khi công nghệ hỏng.','Basic skills save lives when tech fails.',['fog','GPS','signal','scout','village']),

  S('s-b1-5','B1','modern','Khởi Nghiệp Tuổi 13','Starting Up at 13',[
    { vi:'Mai 13 tuổi rất thích vẽ. Em nhận thấy bạn bè muốn có ảnh đại diện cá tính cho mạng xã hội.', en:'Mai, 13, loves drawing. She notices her friends want unique avatars for social media.' },
    { vi:'Em mở dịch vụ vẽ avatar 50.000 đồng/cái. Em quảng cáo qua TikTok và nhận đơn từ cả nước.', en:'She opens an avatar drawing service for 50,000 VND each. She advertises on TikTok and gets orders nationwide.' },
    { vi:'Sau 6 tháng, em kiếm được 8 triệu đồng. Em dùng tiền mua máy tính bảng để vẽ chuyên nghiệp hơn.', en:'After 6 months, she earned 8 million VND. She uses the money to buy a tablet for more professional drawing.' },
    { vi:'Mai học rằng kỹ năng + ý tưởng nhỏ + kiên trì = thu nhập thật, ngay cả khi còn đi học.', en:'Mai learns that skill + small idea + persistence = real income, even while still in school.' },
  ],11,'Kỹ năng + ý tưởng + kiên trì = thu nhập.','Skill + idea + persistence = income.',['avatar','TikTok','order','income']),

  S('s-b1-6','B1','folklore','Tấm Cám','Tam and Cam',[
    { vi:'Tấm là cô gái hiền hoà sống cùng dì ghẻ và Cám. Hai người ghen ghét và bắt Tấm làm hết việc.', en:'Tam was a kind girl living with her stepmother and Cam. They envied her and made her do all the work.' },
    { vi:'Một ngày, Tấm gặp ông Bụt. Bụt giúp Tấm đi dự hội và gặp vua. Vua đem lòng yêu và cưới Tấm.', en:'One day, Tam met Bụt (a guardian spirit). He helped Tam attend a festival and meet the king. The king fell in love and married her.' },
    { vi:'Cám và mẹ ghen, hại Tấm chết. Nhưng Tấm hồi sinh nhiều lần và cuối cùng đoàn tụ với vua.', en:'Cam and her mother envied her and killed Tam. But Tam was reborn many times and was eventually reunited with the king.' },
    { vi:'Câu chuyện dạy: lòng tốt luôn được đền đáp, dù phải qua nhiều khó khăn.', en:'The story teaches: kindness is always rewarded, no matter the hardships.' },
  ],12,'Lòng tốt luôn được đền đáp.','Kindness is always rewarded.',['kind','envy','reborn','reunite']),

  S('s-b1-7','B1','science','AI và Tương Lai Học Tập','AI and the Future of Learning',[
    { vi:'AI như Claude và ChatGPT có thể giải thích bài, sửa lỗi, và gợi ý ý tưởng. Nhiều học sinh ở Việt Nam đã dùng AI hằng ngày.', en:'AI tools like Claude and ChatGPT can explain lessons, fix mistakes, and suggest ideas. Many students in Vietnam already use AI daily.' },
    { vi:'Tuy nhiên, AI không thay thế việc tự suy nghĩ. Nếu chỉ copy đáp án, học sinh sẽ không hiểu thật.', en:'However, AI does not replace thinking. If you just copy answers, you don\'t actually learn.' },
    { vi:'Cách tốt là dùng AI như một gia sư: hỏi để hiểu, không hỏi để có đáp án. Tự làm bài rồi nhờ AI kiểm tra.', en:'A good approach is to use AI like a tutor: ask to understand, not to get answers. Do the work yourself, then let AI check.' },
    { vi:'Học sinh thông minh sẽ kết hợp tự lực với AI để học nhanh hơn người không dùng AI.', en:'Smart students will combine self-effort with AI to learn faster than those who don\'t use AI.' },
  ],11,'AI là gia sư, không phải máy đáp án.','AI is a tutor, not an answer machine.',['AI','tutor','copy','combine']),

  S('s-b1-8','B1','biography','Bố Bình và Hành Trình Khởi Nghiệp','Dad Bình and His Startup Journey',[
    { vi:'Bố Bình làm việc 20 năm trong ngành quản lý. Sau đó, bố quyết định khởi nghiệp tư vấn riêng.', en:'Dad Bình worked for 20 years in management. Then he decided to start his own consulting business.' },
    { vi:'Năm đầu rất khó. Bố làm việc 14 tiếng mỗi ngày, không có khách lớn. Nhiều lần bố muốn từ bỏ.', en:'The first year was very hard. He worked 14 hours a day with no big clients. He wanted to quit many times.' },
    { vi:'Nhưng bố tin vào công thức: cung cấp giá trị thật + kiên trì + học liên tục. Sau 18 tháng, bố có khách hàng đầu tiên.', en:'But he believed in the formula: deliver real value + persistence + continuous learning. After 18 months, he got his first client.' },
    { vi:'Bố dạy 3 con: "Khởi nghiệp giống marathon. Người về đích là người không bỏ cuộc."', en:'Dad teaches the three kids: "Entrepreneurship is a marathon. The finishers are those who don\'t quit."' },
  ],11,'Khởi nghiệp = marathon, không phải sprint.','Entrepreneurship is a marathon, not a sprint.',['startup','consulting','quit','marathon']),

  S('s-b1-9','B1','modern','Hội Chứng So Sánh Trên Mạng Xã Hội','The Comparison Trap on Social Media',[
    { vi:'Nhiều bạn 12-15 tuổi nhìn Instagram và thấy bạn bè có cuộc sống "hoàn hảo". Điều đó dễ làm họ buồn và tự ti.', en:'Many 12-15 year-olds look at Instagram and see friends with "perfect" lives. That can easily make them sad and insecure.' },
    { vi:'Sự thật là: ảnh trên mạng đã được lọc, biên tập, và chọn lọc. Đó không phải là thực tế.', en:'The truth is: photos online are filtered, edited, and curated. That is not reality.' },
    { vi:'Cách lành mạnh là giảm thời gian xem và nhớ rằng mỗi người đều có khó khăn riêng. So sánh chỉ đem lại đau khổ.', en:'A healthy approach is to reduce viewing time and remember everyone has their own struggles. Comparison only brings pain.' },
    { vi:'Bí quyết: tập trung vào tiến bộ của chính mình, không phải nhìn người khác.', en:'Secret: focus on your own progress, not on others.' },
  ],11,'So sánh = bẫy. Tập trung vào mình.','Comparison = trap. Focus on yourself.',['Instagram','filter','compare','progress']),

  S('s-b1-10','B1','adventure','Hành Trình Đến Sapa','Journey to Sapa',[
    { vi:'Gia đình Bình lên Sapa vào tháng 12. Núi cao, sương mù dày, và những thửa ruộng bậc thang đẹp như tranh.', en:'The Bình family travels to Sapa in December. High mountains, thick fog, and terraced rice fields like paintings.' },
    { vi:'Họ ở nhà người H\'Mong ở bản Cát Cát. Cả nhà học cách dệt vải truyền thống.', en:'They stay with a H\'Mong family in Cat Cat village. The family learns traditional weaving.' },
    { vi:'Phúc, An, và Như Ý ăn thắng cố lần đầu. Cả ba ngạc nhiên vì món ăn rất khác miền Nam.', en:'Phuc, An, and Y try thắng cố for the first time. All three are surprised at how different it is from southern food.' },
    { vi:'Chuyến đi dạy 3 con rằng Việt Nam có nhiều văn hoá, không chỉ một văn hoá lớn.', en:'The trip teaches the kids that Vietnam has many cultures, not just one main culture.' },
  ],12,'Việt Nam là nhiều văn hoá, không phải một.','Vietnam is many cultures, not just one.',['Sapa','H\'Mong','weave','culture']),

  S('s-b1-11','B1','science','Biến Đổi Khí Hậu Tại Việt Nam','Climate Change in Vietnam',[
    { vi:'Việt Nam là một trong những nước bị ảnh hưởng nặng nhất bởi biến đổi khí hậu. Nước biển dâng đe doạ Đồng bằng sông Cửu Long.', en:'Vietnam is one of the most climate-affected countries. Rising seas threaten the Mekong Delta.' },
    { vi:'Nông dân ở Cà Mau đã thấy ruộng lúa của mình ngập mặn. Cá tôm cũng giảm vì thay đổi nhiệt độ nước.', en:'Farmers in Ca Mau already see saltwater intrusion in their rice fields. Fish and shrimp also decline due to water temperature changes.' },
    { vi:'Mỗi gia đình có thể giúp: dùng ít điện, ít nhựa, đi bộ hoặc đạp xe khi có thể, trồng cây.', en:'Every family can help: use less electricity, less plastic, walk or bike when possible, plant trees.' },
    { vi:'Hành động nhỏ, nhân lên 100 triệu người Việt = thay đổi lớn.', en:'Small actions × 100 million Vietnamese = big change.' },
  ],12,'Hành động nhỏ × 100 triệu = thay đổi lớn.','Small actions × 100M = big change.',['climate','Mekong','saltwater','plant']),

  S('s-b1-12','B1','family','Lớn Lên','Growing Up',[
    { vi:'Phúc 11 tuổi nhận ra mình đã cao hơn mẹ. Em vừa vui vừa hơi sợ.', en:'Phuc, 11, realizes he is now taller than mom. He feels proud but also a little scared.' },
    { vi:'Lớn lên có nghĩa là nhiều trách nhiệm hơn. Em phải tự dậy đúng giờ, tự làm bài, tự lập.', en:'Growing up means more responsibility. He must wake on time, do homework alone, be independent.' },
    { vi:'Nhưng bố Bình nói: "Lớn lên không có nghĩa làm 1 mình. Bố mẹ luôn ở đây."', en:'But Dad Bình says: "Growing up does not mean being alone. We are always here."' },
    { vi:'Phúc viết câu này vào nhật ký. Đó sẽ là 1 dòng em đọc lại 10 năm sau khi em là người lớn thực sự.', en:'Phuc writes this line in his journal. It is a line he will reread 10 years from now when he is truly an adult.' },
  ],11,'Lớn lên không có nghĩa cô đơn.','Growing up does not mean being alone.',['taller','responsibility','independent','journal']),
];

// ────────────────────────────────────────────────────────────
// COMBINED LIBRARY (50 stories)
// ────────────────────────────────────────────────────────────
export const ALL_STORIES: Story[] = [
  ...STORIES_K,    // 8
  ...STORIES_A1,   // 14
  ...STORIES_A2,   // 16
  ...STORIES_B1,   // 12
];
// TOTAL: 50 stories

// ────────────────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────────────────
export function getStoriesByLevel(level: CEFRLevel): Story[] {
  return ALL_STORIES.filter((s) => s.level === level);
}

export function getStoriesByGenre(genre: StoryGenre): Story[] {
  return ALL_STORIES.filter((s) => s.genre === genre);
}

export function getStoriesForKid(age: number): Story[] {
  if (age <= 6) return getStoriesByLevel('K');
  if (age <= 8) return [...getStoriesByLevel('K'), ...getStoriesByLevel('A1')];
  if (age <= 11) return [...getStoriesByLevel('A1'), ...getStoriesByLevel('A2')];
  return [...getStoriesByLevel('A2'), ...getStoriesByLevel('B1')];
}

export function getRandomStory(level?: CEFRLevel, genre?: StoryGenre): Story | null {
  let pool = ALL_STORIES;
  if (level) pool = pool.filter((s) => s.level === level);
  if (genre) pool = pool.filter((s) => s.genre === genre);
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getStoryStats() {
  const stats = {
    total: ALL_STORIES.length,
    byLevel: { K: 0, A1: 0, A2: 0, B1: 0 } as Record<CEFRLevel, number>,
    byGenre: {} as Record<string, number>,
    totalReadingMinutes: 0,
  };
  ALL_STORIES.forEach((s) => {
    stats.byLevel[s.level]++;
    stats.byGenre[s.genre] = (stats.byGenre[s.genre] || 0) + 1;
    stats.totalReadingMinutes += s.reading_minutes;
  });
  return stats;
}
