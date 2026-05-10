// ============================================================
// PANY KIDS STUDIO — Math Quiz Bank
// 250+ curated + procedural generators → 1000+ effective questions
// 4 levels: L1 (lớp lá), L2 (lớp 4), L3 (lớp 6), L4 (cấp 2)
// Bilingual VI ↔ EN
// ============================================================

export type MathLevel = 'L1' | 'L2' | 'L3' | 'L4';

export type MathTopic =
  | 'counting'      // Đếm
  | 'compare'       // So sánh
  | 'shapes'        // Hình học
  | 'add'           // Cộng
  | 'subtract'      // Trừ
  | 'multiply'      // Nhân
  | 'divide'        // Chia
  | 'fraction'      // Phân số
  | 'decimal'       // Số thập phân
  | 'percent'       // Phần trăm
  | 'ratio'         // Tỉ số
  | 'algebra'       // Đại số (phương trình)
  | 'geometry'      // Hình học cấp 2
  | 'word'          // Bài toán đố
  | 'pattern'       // Quy luật
  | 'measure'       // Đo lường
  | 'time'          // Thời gian
  | 'money';        // Tiền

export type MathQuestion = {
  id: string;
  level: MathLevel;
  topic: MathTopic;
  question_vi: string;
  question_en: string;
  options: string[];        // 4 options
  correctIdx: number;       // 0-3
  explain_vi?: string;
  explain_en?: string;
};

const M = (
  id: string,
  level: MathLevel,
  topic: MathTopic,
  qvi: string,
  qen: string,
  options: string[],
  correctIdx: number,
  evi?: string,
  een?: string,
): MathQuestion => ({
  id, level, topic, question_vi: qvi, question_en: qen, options, correctIdx,
  explain_vi: evi, explain_en: een,
});

// ────────────────────────────────────────────────────────────
// L1 — LỚP LÁ / MẪU GIÁO (Như Ý 5t) — đếm, so sánh, hình dạng cơ bản
// ────────────────────────────────────────────────────────────
const L1_QUESTIONS: MathQuestion[] = [
  M('l1-1', 'L1', 'counting', 'Có bao nhiêu quả táo: 🍎🍎🍎?', 'How many apples: 🍎🍎🍎?', ['1','2','3','4'], 2, 'Đếm: 1-2-3 → 3 quả.','Count 1-2-3 → 3.'),
  M('l1-2', 'L1', 'counting', 'Đếm: 🐶🐶🐶🐶🐶 có mấy con?', 'Count: 🐶🐶🐶🐶🐶 how many?', ['3','4','5','6'], 2),
  M('l1-3', 'L1', 'counting', '⭐⭐ + ⭐⭐ = mấy ngôi sao?', 'Stars: ⭐⭐ + ⭐⭐ = ?', ['2','3','4','5'], 2, '2 + 2 = 4.','2 + 2 = 4.'),
  M('l1-4', 'L1', 'compare',  'Số nào lớn hơn: 5 hay 3?', 'Which is bigger: 5 or 3?', ['5','3','Bằng nhau','Không biết'], 0),
  M('l1-5', 'L1', 'compare',  'Số nào nhỏ hơn: 7 hay 9?', 'Which is smaller: 7 or 9?', ['9','7','Bằng nhau','Không có'], 1),
  M('l1-6', 'L1', 'shapes',   'Hình tròn có mấy góc?', 'How many corners does a circle have?', ['0','3','4','Vô số'], 0, 'Hình tròn không có góc.','A circle has no corners.'),
  M('l1-7', 'L1', 'shapes',   'Hình vuông có mấy cạnh?', 'A square has how many sides?', ['3','4','5','6'], 1),
  M('l1-8', 'L1', 'shapes',   'Hình tam giác có mấy cạnh?', 'A triangle has how many sides?', ['2','3','4','5'], 1),
  M('l1-9', 'L1', 'add', '1 + 1 = ?', '1 + 1 = ?', ['1','2','3','4'], 1),
  M('l1-10','L1', 'add', '2 + 3 = ?', '2 + 3 = ?', ['4','5','6','7'], 1),
  M('l1-11','L1', 'add', '4 + 1 = ?', '4 + 1 = ?', ['4','5','6','7'], 1),
  M('l1-12','L1', 'add', '5 + 0 = ?', '5 + 0 = ?', ['0','5','10','1'], 1, 'Cộng 0 vẫn bằng số ban đầu.','Adding 0 keeps the same number.'),
  M('l1-13','L1', 'add', '3 + 4 = ?', '3 + 4 = ?', ['6','7','8','9'], 1),
  M('l1-14','L1', 'subtract', '5 - 2 = ?', '5 - 2 = ?', ['1','2','3','4'], 2),
  M('l1-15','L1', 'subtract', '8 - 3 = ?', '8 - 3 = ?', ['4','5','6','7'], 1),
  M('l1-16','L1', 'subtract', '6 - 6 = ?', '6 - 6 = ?', ['0','1','6','12'], 0, 'Trừ chính nó = 0.','Same minus same = 0.'),
  M('l1-17','L1', 'subtract', '10 - 4 = ?', '10 - 4 = ?', ['5','6','7','4'], 1),
  M('l1-18','L1', 'pattern',  'Tiếp tục: 2, 4, 6, 8, ?', 'Continue: 2, 4, 6, 8, ?', ['9','10','11','12'], 1, 'Mỗi bước cộng 2.','Add 2 each step.'),
  M('l1-19','L1', 'pattern',  'Tiếp tục: 1, 3, 5, 7, ?', 'Continue: 1, 3, 5, 7, ?', ['8','9','10','11'], 1, 'Số lẻ tăng 2.','Odd numbers, +2.'),
  M('l1-20','L1', 'pattern',  'Hình tiếp theo: 🔴🟢🔴🟢🔴 ?', 'Next: 🔴🟢🔴🟢🔴 ?', ['🔴','🟢','🔵','🟡'], 1),
  M('l1-21','L1', 'compare',  'Bao nhiêu nhiều hơn 3 hay 5?', 'Which is more 3 or 5?', ['3','5','Bằng nhau','Không có'], 1),
  M('l1-22','L1', 'counting', 'Đếm bằng tiếng Anh: "five" là số mấy?', 'In English "five" is which number?', ['3','4','5','6'], 2),
  M('l1-23','L1', 'shapes',   'Hình chữ nhật có mấy cạnh?', 'A rectangle has how many sides?', ['3','4','5','6'], 1),
  M('l1-24','L1', 'time',     '1 ngày có mấy buổi sáng-trưa-chiều-tối?', 'A day has how many parts (morning-noon-afternoon-evening)?', ['2','3','4','5'], 2),
  M('l1-25','L1', 'measure',  'Cái gì nặng hơn: 1 quả táo hay 1 con voi?', 'Which is heavier: an apple or an elephant?', ['Quả táo','Con voi','Bằng nhau','Không biết'], 1),
  M('l1-26','L1', 'money',    '1 cái kẹo + 1 cái kẹo = mấy cái kẹo?', '1 candy + 1 candy = how many candies?', ['1','2','3','4'], 1),
  M('l1-27','L1', 'add', '2 + 2 = ?', '2 + 2 = ?', ['3','4','5','6'], 1),
  M('l1-28','L1', 'add', '6 + 1 = ?', '6 + 1 = ?', ['6','7','8','9'], 1),
  M('l1-29','L1', 'add', '5 + 5 = ?', '5 + 5 = ?', ['9','10','11','12'], 1),
  M('l1-30','L1', 'subtract', '9 - 5 = ?', '9 - 5 = ?', ['3','4','5','6'], 1),
  M('l1-31','L1', 'subtract', '7 - 2 = ?', '7 - 2 = ?', ['4','5','6','7'], 1),
  M('l1-32','L1', 'counting', 'Trên 1 bàn tay có mấy ngón?', 'How many fingers on one hand?', ['3','4','5','6'], 2),
  M('l1-33','L1', 'counting', '2 bàn tay có mấy ngón?', 'How many fingers on two hands?', ['8','9','10','12'], 2),
  M('l1-34','L1', 'time',     '1 tuần có mấy ngày?', 'How many days in a week?', ['5','6','7','8'], 2),
  M('l1-35','L1', 'shapes',   'Quả bóng có dạng hình gì?', 'What shape is a ball?', ['Vuông','Tam giác','Tròn','Chữ nhật'], 2),
  M('l1-36','L1', 'compare',  'Bố cao hay con cao hơn (con 5 tuổi)?', 'Who is taller: dad or 5-year-old kid?', ['Bố','Con','Bằng nhau','Không biết'], 0),
  M('l1-37','L1', 'add', '0 + 7 = ?', '0 + 7 = ?', ['0','6','7','8'], 2),
  M('l1-38','L1', 'add', '3 + 3 + 1 = ?', '3 + 3 + 1 = ?', ['6','7','8','9'], 1),
  M('l1-39','L1', 'pattern',  'Tiếp tục: 10, 20, 30, ?', 'Continue: 10, 20, 30, ?', ['35','40','45','50'], 1),
  M('l1-40','L1', 'counting', 'Có 4 con vịt + 2 con vịt mới đến = mấy con?', '4 ducks + 2 more = ?', ['5','6','7','8'], 1),

  M('l1-41','L1', 'word', 'Mẹ có 3 viên kẹo, mẹ cho Như Ý 2. Mẹ còn lại mấy viên?', 'Mom has 3 candies, gives 2. How many left?', ['1','2','3','5'], 0),
  M('l1-42','L1', 'word', 'Phúc có 2 quả bóng + An có 3 quả. Tổng cộng?', 'Phuc has 2 balls + An has 3. Total?', ['4','5','6','7'], 1),
  M('l1-43','L1', 'word', 'Trên kệ có 5 cuốn sách, lấy 1. Còn mấy cuốn?', '5 books on shelf, take 1. How many left?', ['3','4','5','6'], 1),
  M('l1-44','L1', 'time', 'Trẻ em ngủ ban đêm hay ban ngày?', 'Children sleep at night or day?', ['Ngày','Đêm','Cả hai','Không cần'], 1),
  M('l1-45','L1', 'shapes', 'Cửa nhà có hình gì?', 'What shape is a door?', ['Tròn','Tam giác','Chữ nhật','Lục giác'], 2),
  M('l1-46','L1', 'compare', 'Mèo nhỏ hay voi nhỏ?', 'Smaller: cat or elephant?', ['Mèo','Voi','Bằng','Không biết'], 0),
  M('l1-47','L1', 'add', '4 + 4 = ?', '4 + 4 = ?', ['7','8','9','10'], 1),
  M('l1-48','L1', 'subtract', '10 - 10 = ?', '10 - 10 = ?', ['0','1','5','10'], 0),
  M('l1-49','L1', 'counting', '5 ngón tay + 5 ngón chân = ?', '5 fingers + 5 toes = ?', ['9','10','11','15'], 1),
  M('l1-50','L1', 'pattern', '🔵🔴🔵🔴🔵 ?', '🔵🔴🔵🔴🔵 ?', ['🔵','🔴','🟡','🟢'], 1),
];

// ────────────────────────────────────────────────────────────
// L2 — LỚP 4 (Bình An 9t) — cộng trừ nhân chia, phân số đơn giản
// ────────────────────────────────────────────────────────────
const L2_QUESTIONS: MathQuestion[] = [
  M('l2-1','L2', 'add', '347 + 256 = ?', '347 + 256 = ?', ['501','593','603','613'], 2),
  M('l2-2','L2', 'add', '1245 + 678 = ?', '1245 + 678 = ?', ['1813','1923','1933','2003'], 1),
  M('l2-3','L2', 'subtract', '824 - 369 = ?', '824 - 369 = ?', ['445','455','465','475'], 1),
  M('l2-4','L2', 'subtract', '2000 - 875 = ?', '2000 - 875 = ?', ['1125','1135','1175','1225'], 0),
  M('l2-5','L2', 'multiply', '7 × 8 = ?', '7 × 8 = ?', ['54','55','56','58'], 2),
  M('l2-6','L2', 'multiply', '12 × 9 = ?', '12 × 9 = ?', ['98','108','118','128'], 1),
  M('l2-7','L2', 'multiply', '25 × 4 = ?', '25 × 4 = ?', ['100','105','110','125'], 0),
  M('l2-8','L2', 'multiply', '15 × 6 = ?', '15 × 6 = ?', ['80','85','90','95'], 2),
  M('l2-9','L2', 'divide', '72 ÷ 8 = ?', '72 ÷ 8 = ?', ['7','8','9','10'], 2),
  M('l2-10','L2','divide', '144 ÷ 12 = ?', '144 ÷ 12 = ?', ['10','11','12','13'], 2),
  M('l2-11','L2','divide', '63 ÷ 9 = ?', '63 ÷ 9 = ?', ['6','7','8','9'], 1),
  M('l2-12','L2','divide', '100 ÷ 4 = ?', '100 ÷ 4 = ?', ['20','25','30','40'], 1),
  M('l2-13','L2','fraction','1/2 + 1/2 = ?', '1/2 + 1/2 = ?', ['1/4','1/2','1','2'], 2),
  M('l2-14','L2','fraction','1/4 + 1/4 = ?', '1/4 + 1/4 = ?', ['1/2','1/4','2/4','1'], 0),
  M('l2-15','L2','fraction','3/4 - 1/4 = ?', '3/4 - 1/4 = ?', ['1/4','1/2','3/8','2'], 1),
  M('l2-16','L2','fraction','Trong 1 cái pizza chia 8 phần, 3 phần là phân số nào?', 'A pizza in 8 parts, 3 parts = ?', ['3/8','3/4','1/8','5/8'], 0),
  M('l2-17','L2','word','An có 24 viên kẹo, chia đều cho 6 bạn. Mỗi bạn được mấy?', 'An has 24 candies, shares equally among 6. Each gets?', ['3','4','5','6'], 1),
  M('l2-18','L2','word','1 quyển vở giá 8000đ, mua 5 quyển hết bao nhiêu?', '1 notebook = 8000 VND, 5 notebooks total?', ['35000','40000','42000','45000'], 1),
  M('l2-19','L2','word','Phúc đi 1.5 km, An đi 2.3 km. Tổng quãng đường?', 'Phuc walks 1.5 km, An walks 2.3 km. Total?', ['3.6 km','3.7 km','3.8 km','4.0 km'], 2),
  M('l2-20','L2','time','1 năm có mấy tháng?', 'How many months in a year?', ['10','11','12','13'], 2),
  M('l2-21','L2','time','1 giờ có mấy phút?', 'How many minutes in 1 hour?', ['30','45','60','90'], 2),
  M('l2-22','L2','time','Từ 8:00 đến 10:30 là bao lâu?', 'From 8:00 to 10:30 is how long?', ['1h30m','2h00m','2h30m','3h00m'], 2),
  M('l2-23','L2','measure','1 mét bằng bao nhiêu cm?', '1 meter = how many cm?', ['10','100','1000','10000'], 1),
  M('l2-24','L2','measure','1 kg bằng bao nhiêu gram?', '1 kg = how many grams?', ['100','500','1000','5000'], 2),
  M('l2-25','L2','measure','1 lít bằng bao nhiêu ml?', '1 liter = how many ml?', ['100','500','1000','10000'], 2),
  M('l2-26','L2','money','100,000đ - 35,000đ = ?', '100,000 - 35,000 = ?', ['55,000','60,000','65,000','70,000'], 2),
  M('l2-27','L2','shapes','Chu vi hình vuông cạnh 5cm là?', 'Perimeter of square side 5cm?', ['10cm','15cm','20cm','25cm'], 2),
  M('l2-28','L2','shapes','Diện tích hình vuông cạnh 4cm?', 'Area of square side 4cm?', ['8cm²','12cm²','16cm²','20cm²'], 2, '4 × 4 = 16','4 × 4 = 16'),
  M('l2-29','L2','shapes','Chu vi hình chữ nhật 6cm × 4cm?', 'Perimeter of 6×4 rectangle?', ['10','14','20','24'], 2, '(6+4)×2 = 20','(6+4)×2 = 20'),
  M('l2-30','L2','add', '1234 + 5678 = ?', '1234 + 5678 = ?', ['6802','6812','6912','7000'], 2),
  M('l2-31','L2','multiply','13 × 7 = ?', '13 × 7 = ?', ['86','91','96','99'], 1),
  M('l2-32','L2','multiply','100 × 27 = ?', '100 × 27 = ?', ['270','2700','27000','27'], 1),
  M('l2-33','L2','divide','85 ÷ 5 = ?', '85 ÷ 5 = ?', ['15','17','19','21'], 1),
  M('l2-34','L2','pattern','5, 10, 15, 20, ?', '5, 10, 15, 20, ?', ['22','25','28','30'], 1),
  M('l2-35','L2','pattern','3, 6, 12, 24, ?', '3, 6, 12, 24, ?', ['36','40','48','60'], 2, 'Nhân 2.','×2 each step.'),
  M('l2-36','L2','word','1 lớp có 32 bạn, chia thành 4 nhóm. Mỗi nhóm bao nhiêu?', '32 students into 4 groups. Each group?', ['6','7','8','9'], 2),
  M('l2-37','L2','word','Một xe chở 48 hộp, xe khác chở 35 hộp. Tổng?', 'One truck has 48, another 35. Total?', ['73','83','93','100'], 1),
  M('l2-38','L2','word','Bố Bình mua 3 cuốn sách 45.000đ/cuốn. Tổng?', 'Dad buys 3 books 45,000 each. Total?', ['115,000','125,000','135,000','145,000'], 2),
  M('l2-39','L2','fraction','Số nào lớn hơn: 1/2 hay 1/3?', 'Which is bigger: 1/2 or 1/3?', ['1/2','1/3','Bằng','Không biết'], 0, '1/2 = 0.5 > 1/3 ≈ 0.33','1/2 > 1/3.'),
  M('l2-40','L2','fraction','2/5 + 1/5 = ?', '2/5 + 1/5 = ?', ['3/5','3/10','1/5','1'], 0),

  M('l2-41','L2','time','1 phút có mấy giây?', 'How many seconds in 1 minute?', ['30','45','60','90'], 2),
  M('l2-42','L2','time','Tháng 2 năm thường có mấy ngày?', 'February in regular year has?', ['28','29','30','31'], 0),
  M('l2-43','L2','time','Tháng 2 năm nhuận có mấy ngày?', 'February in leap year?', ['28','29','30','31'], 1),
  M('l2-44','L2','word','An đi học 7:00, về 11:30. Học bao lâu?', 'School 7:00 to 11:30. Duration?', ['3h30m','4h','4h30m','5h'], 2),
  M('l2-45','L2','add','985 + 124 + 76 = ?', '985 + 124 + 76 = ?', ['1085','1135','1175','1185'], 3, '985+124=1109; 1109+76=1185.','Sum = 1185.'),
  M('l2-46','L2','divide','Một viên gạch dài 20cm. Cần mấy viên xếp 1m?', 'Brick is 20cm. How many fit 1m?', ['3','4','5','6'], 2, '100÷20=5','100÷20=5'),
  M('l2-47','L2','money','Mỗi bữa cơm 25.000đ, 1 tuần ăn 7 bữa hết?', '25,000 per meal × 7 meals = ?', ['145,000','165,000','175,000','195,000'], 2),
  M('l2-48','L2','word','Phúc cao 1m45, An cao 1m32. Phúc hơn An mấy cm?', 'Phuc 1m45, An 1m32. Diff cm?', ['10','11','12','13'], 3),
  M('l2-49','L2','pattern','100, 90, 80, 70, ?', '100, 90, 80, 70, ?', ['50','55','60','65'], 2),
  M('l2-50','L2','word','Vườn có 5 hàng, mỗi hàng 8 cây. Tổng?', '5 rows × 8 trees each. Total?', ['30','35','40','45'], 2),

  M('l2-51','L2','multiply','11 × 11 = ?', '11 × 11 = ?', ['111','121','131','141'], 1),
  M('l2-52','L2','multiply','9 × 9 = ?', '9 × 9 = ?', ['72','81','90','99'], 1),
  M('l2-53','L2','divide','81 ÷ 9 = ?', '81 ÷ 9 = ?', ['7','8','9','10'], 2),
  M('l2-54','L2','add','5 + 5 + 5 + 5 + 5 = ?', '5+5+5+5+5 = ?', ['20','22','25','30'], 2, 'Hoặc 5×5=25.','Or 5×5=25.'),
  M('l2-55','L2','subtract','1000 - 1 = ?', '1000 - 1 = ?', ['999','989','990','998'], 0),
  M('l2-56','L2','word','Mỗi học sinh có 5 cái bút, lớp 30 bạn. Tổng bút?', 'Each kid has 5 pens × 30 kids = ?', ['100','125','150','175'], 2),
  M('l2-57','L2','fraction','Một cái bánh chia làm 6 phần đều. Mỗi phần là?', 'A cake split into 6 equal parts. Each part?', ['1/3','1/4','1/6','1/8'], 2),
  M('l2-58','L2','shapes','Hình tròn có chu vi gọi là?', 'A circle\'s perimeter is called?', ['Cạnh','Đường tròn','Chu vi','Diện tích'], 2),
  M('l2-59','L2','measure','1 km = mấy m?', '1 km = how many m?', ['100','500','1000','10000'], 2),
  M('l2-60','L2','time','24 giờ = mấy ngày?', '24 hours = ?', ['1 ngày','2 ngày','12 giờ','30 ngày'], 0),
];

// ────────────────────────────────────────────────────────────
// L3 — LỚP 6 (Hạnh Phúc 11t lên lớp 6) — phân số nâng cao, %, tỉ số
// ────────────────────────────────────────────────────────────
const L3_QUESTIONS: MathQuestion[] = [
  M('l3-1','L3','fraction','2/3 + 1/6 = ?', '2/3 + 1/6 = ?', ['3/9','5/6','3/6','1'], 1, '2/3 = 4/6 → 4/6 + 1/6 = 5/6.','2/3=4/6, +1/6=5/6.'),
  M('l3-2','L3','fraction','3/4 × 2/3 = ?', '3/4 × 2/3 = ?', ['1/2','5/7','6/12','1/3'], 0, '3×2=6, 4×3=12, 6/12=1/2.','6/12=1/2.'),
  M('l3-3','L3','fraction','5/6 - 1/3 = ?', '5/6 - 1/3 = ?', ['4/3','1/2','1/3','2/3'], 1, '1/3=2/6, 5/6-2/6=3/6=1/2.','5/6-2/6=1/2.'),
  M('l3-4','L3','fraction','1/2 ÷ 1/4 = ?', '1/2 ÷ 1/4 = ?', ['1/8','1/2','2','4'], 2, '1/2 × 4/1 = 2.','Multiply by reciprocal: 2.'),
  M('l3-5','L3','decimal','0.5 + 0.25 = ?', '0.5 + 0.25 = ?', ['0.55','0.7','0.75','0.85'], 2),
  M('l3-6','L3','decimal','3.6 × 2 = ?', '3.6 × 2 = ?', ['6.2','7.0','7.2','7.6'], 2),
  M('l3-7','L3','decimal','10 - 3.45 = ?', '10 - 3.45 = ?', ['6.45','6.55','7.45','7.55'], 1),
  M('l3-8','L3','decimal','12.5 ÷ 5 = ?', '12.5 ÷ 5 = ?', ['2','2.25','2.5','3'], 2),
  M('l3-9','L3','percent','25% của 80 = ?', '25% of 80 = ?', ['10','15','20','25'], 2, '80 × 0.25 = 20.','80×0.25=20.'),
  M('l3-10','L3','percent','50% của 200 = ?', '50% of 200 = ?', ['50','75','100','150'], 2),
  M('l3-11','L3','percent','10% của 350 = ?', '10% of 350 = ?', ['25','30','35','40'], 2),
  M('l3-12','L3','percent','Một áo giảm 30%, giá còn 280k. Giá gốc?', 'Shirt 30% off → 280k. Original?', ['350k','380k','400k','420k'], 2, '280/0.7=400.','280/0.70=400k.'),
  M('l3-13','L3','ratio','Tỉ lệ 3:5, tổng 40. Phần lớn = ?', 'Ratio 3:5, total 40. Bigger part?', ['15','20','25','30'], 2, '40/8=5, 5×5=25.','40/8=5, 5×5=25.'),
  M('l3-14','L3','ratio','Tỉ lệ pha cà phê 1:4 (cà phê:nước). 200ml hỗn hợp có mấy ml cà phê?', 'Coffee:water 1:4. 200ml mix → coffee ml?', ['25','40','50','80'], 1, '200/5=40.','200÷5=40.'),
  M('l3-15','L3','algebra','x + 5 = 12, x = ?', 'x + 5 = 12, x = ?', ['5','7','12','17'], 1),
  M('l3-16','L3','algebra','3x = 21, x = ?', '3x = 21, x = ?', ['6','7','8','9'], 1),
  M('l3-17','L3','algebra','x - 8 = 14, x = ?', 'x - 8 = 14, x = ?', ['6','12','20','22'], 3),
  M('l3-18','L3','algebra','2x + 3 = 11, x = ?', '2x + 3 = 11, x = ?', ['3','4','5','6'], 1, '2x=8, x=4.','2x=8, x=4.'),
  M('l3-19','L3','geometry','Chu vi hình tròn bán kính 7cm (π≈22/7)?', 'Circle perimeter r=7cm (π≈22/7)?', ['22','33','44','55'], 2, '2π·r ≈ 2×22/7×7 = 44.','2πr=44.'),
  M('l3-20','L3','geometry','Diện tích tam giác đáy 6 chiều cao 4?', 'Triangle area base=6 h=4?', ['10','12','18','24'], 1, '½·6·4=12.','½·6·4=12.'),
  M('l3-21','L3','geometry','Tổng góc trong tam giác = ?', 'Sum of triangle interior angles?', ['90°','180°','270°','360°'], 1),
  M('l3-22','L3','geometry','Hình lập phương cạnh 3, thể tích?', 'Cube side 3, volume?', ['9','18','24','27'], 3, '3³=27.','3³=27.'),
  M('l3-23','L3','word','Bài kiểm tra 50 câu, đúng 42. Tỉ lệ %?', 'Test 50 Q, 42 right. %?', ['80%','82%','84%','88%'], 2, '42/50=0.84=84%.','42/50=84%.'),
  M('l3-24','L3','word','Bố mua 3 cái bánh 45k/cái, giảm 10%. Tổng trả?', '3 cakes @45k, 10% off. Total?', ['121.5k','120k','125k','130k'], 0, '3×45=135; -10%=121.5.','135−10%=121.5.'),
  M('l3-25','L3','word','Quãng đường 60km đi 1h30m. Vận tốc?', 'Distance 60km in 1h30m. Speed?', ['30km/h','40km/h','45km/h','60km/h'], 1, '60÷1.5=40.','60÷1.5=40 km/h.'),
  M('l3-26','L3','word','Lương 8 triệu/tháng, tăng 15%. Lương mới?', 'Salary 8M, +15%. New?', ['9.0M','9.2M','9.4M','9.6M'], 1, '8×1.15=9.2.','8×1.15=9.2M.'),
  M('l3-27','L3','word','Bể nước 200 lít, đầy 60%. Lượng nước?', 'Tank 200L, 60% full. Water?', ['100L','110L','120L','140L'], 2),
  M('l3-28','L3','fraction','Trong 24 viên kẹo, 1/3 là sô-cô-la. Mấy viên sô-cô-la?', '24 candies, 1/3 chocolate. How many?', ['6','8','10','12'], 1),
  M('l3-29','L3','fraction','3/8 của 64?', '3/8 of 64?', ['18','21','24','28'], 2, '64÷8=8; 8×3=24.','64/8×3=24.'),
  M('l3-30','L3','decimal','Làm tròn 3.847 đến 1 chữ số thập phân?', 'Round 3.847 to 1 decimal?', ['3.7','3.8','3.85','3.9'], 1, 'Số 4 → làm xuống.','4 rounds down.'),

  M('l3-31','L3','algebra','5x − 4 = 16, x = ?', '5x−4=16, x=?', ['3','4','5','6'], 1, '5x=20, x=4.','5x=20, x=4.'),
  M('l3-32','L3','algebra','x/3 = 7, x = ?', 'x/3=7, x=?', ['10','14','21','28'], 2),
  M('l3-33','L3','algebra','Nếu x=5, giá trị 2x+3?', 'If x=5, 2x+3?', ['10','13','15','18'], 1),
  M('l3-34','L3','geometry','Số cạnh hình lục giác?', 'Hexagon sides?', ['5','6','7','8'], 1),
  M('l3-35','L3','geometry','Số mặt hình lập phương?', 'Cube faces?', ['4','5','6','8'], 2),
  M('l3-36','L3','word','Một sách 240 trang, đọc 60%. Còn lại mấy trang?', '240 pages, read 60%. Pages left?', ['72','84','96','108'], 2, '40% còn lại = 240×0.4=96.','40% left=96.'),
  M('l3-37','L3','word','Cô giáo có 36 bút, chia đều 9 nhóm. Mỗi nhóm?', '36 pens to 9 groups. Each?', ['3','4','5','6'], 1),
  M('l3-38','L3','percent','Học sinh nữ chiếm 60% lớp 30 bạn. Số nữ?', 'Girls 60% of 30. Count?', ['15','17','18','20'], 2),
  M('l3-39','L3','ratio','Tuổi anh:em = 5:3, tổng 32. Tuổi anh?', 'Brother:sister = 5:3, total 32. Brother?', ['18','20','22','24'], 1, '32/8=4, 4×5=20.','32/8×5=20.'),
  M('l3-40','L3','ratio','Hỗn hợp 7:3 = bột:nước. 100g hỗn hợp có mấy g bột?', '7:3 flour:water. 100g mix → flour g?', ['60','65','70','75'], 2, '100/10×7=70.','100/10×7=70.'),

  M('l3-41','L3','geometry','Diện tích hình tròn r=5 (π≈3.14)?', 'Circle area r=5 (π≈3.14)?', ['78.5','82','75','100'], 0, 'πr²=3.14×25=78.5.','πr²=78.5.'),
  M('l3-42','L3','word','3 công nhân làm 1 việc trong 6 ngày. 6 công nhân làm bao lâu?', '3 workers × 6 days. 6 workers do it in?', ['2','3','4','5'], 1, 'Tỉ lệ ngược: 18 ngày-người ÷ 6 = 3.','Inverse ratio: 18/6=3.'),
  M('l3-43','L3','word','Số nhỏ hơn số lớn 14 đơn vị. Tổng = 56. Số nhỏ?', 'Diff 14, sum 56. Smaller?', ['14','21','28','35'], 1, '(56-14)/2=21.','(56-14)/2=21.'),
  M('l3-44','L3','algebra','x² = 49, x dương = ?', 'x² = 49, positive x?', ['5','6','7','8'], 2),
  M('l3-45','L3','algebra','Tổng 3 số liên tiếp = 30. Số giữa?', 'Sum 3 consecutive ints = 30. Middle?', ['8','9','10','11'], 2, 'Trung bình = 30/3 = 10.','30/3=10.'),
  M('l3-46','L3','decimal','0.1 + 0.2 = ?', '0.1+0.2=?', ['0.2','0.3','0.4','0.5'], 1),
  M('l3-47','L3','percent','Số tiền 150k tăng 20% = ?', '150k +20%=?', ['170k','175k','180k','185k'], 2),
  M('l3-48','L3','percent','120 giảm 25% = ?', '120 −25%=?', ['80','85','90','95'], 2),
  M('l3-49','L3','word','Bố Bình lái 90km/h, 2.5h đi được?', '90km/h × 2.5h = ?', ['180km','195km','215km','225km'], 3),
  M('l3-50','L3','word','Chu kỳ 3 năm tăng giá 10% mỗi năm. Sau 3 năm 100k thành?', '100k +10%/yr for 3 yrs?', ['121k','125k','127k','133k'], 3, '100×1.1³=133.1.','100×1.1³≈133.'),
];

// ────────────────────────────────────────────────────────────
// L4 — CẤP 2 (12-15t) — phương trình bậc 1, hình học, lượng giác, xác suất
// ────────────────────────────────────────────────────────────
const L4_QUESTIONS: MathQuestion[] = [
  M('l4-1','L4','algebra','Giải: 4x − 7 = 25', 'Solve: 4x − 7 = 25', ['6','7','8','9'], 2, '4x=32, x=8.','4x=32, x=8.'),
  M('l4-2','L4','algebra','Giải: 2(x+3) = 18', 'Solve: 2(x+3)=18', ['5','6','7','9'], 1),
  M('l4-3','L4','algebra','x² − 9 = 0, x dương?', 'x²−9=0, positive x?', ['2','3','4','5'], 1),
  M('l4-4','L4','algebra','3x + 5 = 2x + 12, x?', '3x+5 = 2x+12, x=?', ['5','7','12','17'], 1),
  M('l4-5','L4','algebra','Tổng 2 số 30, hiệu 6. Số lớn?', 'Sum 30, diff 6. Bigger?', ['15','17','18','20'], 2, '(30+6)/2=18.','(30+6)/2=18.'),
  M('l4-6','L4','algebra','5x = 3x + 14, x?', '5x=3x+14, x=?', ['5','6','7','8'], 2),
  M('l4-7','L4','algebra','x² + x − 6 = 0, nghiệm dương?', 'x²+x−6=0, positive root?', ['1','2','3','6'], 1, '(x+3)(x−2)=0 → x=2.','(x+3)(x−2)=0, x=2.'),
  M('l4-8','L4','algebra','Hệ: x+y=10, x−y=4. x?', 'x+y=10, x−y=4. x=?', ['5','6','7','8'], 2, 'Cộng → 2x=14, x=7.','Add: 2x=14, x=7.'),
  M('l4-9','L4','geometry','Định lý Pytago: tam giác vuông cạnh 3,4. Cạnh huyền?', 'Pythagoras: legs 3,4. Hypotenuse?', ['5','6','7','25'], 0),
  M('l4-10','L4','geometry','Diện tích hình tròn bán kính 10 (π≈3.14)?', 'Circle area r=10?', ['100','200','314','400'], 2, 'πr²=314.','πr²=3.14·100=314.'),
  M('l4-11','L4','geometry','Tổng góc trong tứ giác?', 'Sum interior angles quadrilateral?', ['180°','270°','360°','540°'], 2),
  M('l4-12','L4','geometry','Tổng góc ngũ giác?', 'Pentagon angle sum?', ['360°','450°','540°','720°'], 2, '(5−2)×180=540.','(5−2)·180=540.'),
  M('l4-13','L4','geometry','Diện tích hình thang đáy 8,12 cao 5?', 'Trapezoid bases 8,12 h=5?', ['40','45','50','55'], 2, '(8+12)/2×5=50.','(8+12)/2·5=50.'),
  M('l4-14','L4','geometry','Số mặt khối lăng trụ tam giác?', 'Triangular prism faces?', ['4','5','6','8'], 1),
  M('l4-15','L4','geometry','Thể tích lập phương cạnh 4?', 'Cube V side=4?', ['16','32','48','64'], 3),
  M('l4-16','L4','geometry','Thể tích hình hộp chữ nhật 3×4×5?', 'Box V 3×4×5?', ['24','40','50','60'], 3),
  M('l4-17','L4','percent','Tăng 20% rồi giảm 20%, kết quả so với gốc?', '+20% then −20%, vs original?', ['Bằng','+4%','−4%','+10%'], 2, '1.2×0.8=0.96 → −4%.','1.2·0.8=0.96.'),
  M('l4-18','L4','percent','Lãi kép 100k @5%/năm, 3 năm?', 'Compound 100k @5%/yr, 3 yrs?', ['115k','115.76k','120k','125k'], 1, '100·1.05³≈115.76.','100·1.05³≈115.76.'),
  M('l4-19','L4','word','Một xe 60km/h, xe khác 80km/h ngược chiều cách 280km. Sau bao lâu gặp?', 'Two cars 60+80km/h apart 280km. Meet in?', ['1.5h','2h','2.5h','3h'], 1, '280/(60+80)=2h.','280/140=2h.'),
  M('l4-20','L4','word','Bể có vòi vào 2h đầy, vòi ra 3h cạn. Cả 2 mở thì đầy sau?', 'Fill 2h, drain 3h. Both → fill?', ['4h','5h','6h','7h'], 2, '1/2−1/3=1/6 → 6h.','1/2−1/3=1/6, 6h.'),
  M('l4-21','L4','word','Tổng 3 số chẵn liên tiếp = 36. Số lớn nhất?', '3 consecutive even nums sum=36. Biggest?', ['10','12','14','16'], 2, '10+12+14=36.','10+12+14=36.'),
  M('l4-22','L4','word','60% học sinh nam, lớp 40. Số nữ?', 'Boys 60% of 40. Girls?', ['12','14','16','18'], 2),
  M('l4-23','L4','word','Một thang dài 13m dựa tường, đầu cách tường 5m. Đỉnh cao?', 'Ladder 13m, 5m from wall. Top height?', ['10','11','12','13'], 2, '√(169−25)=12.','√144=12.'),
  M('l4-24','L4','word','Mua 100k với thuế 8%. Tổng?', '100k + 8% tax = ?', ['100k','105k','108k','110k'], 2),
  M('l4-25','L4','word','Lương tăng 5% rồi tăng 5% nữa. Tổng tăng?', '+5% then +5% more. Total?', ['10%','10.25%','10.5%','11%'], 1, '1.05²−1=10.25%.','1.05²−1=10.25%.'),
  M('l4-26','L4','word','3 viên bi xanh, 2 đỏ. Xác suất rút xanh?', '3 blue 2 red. P(blue)?', ['2/5','1/2','3/5','3/2'], 2),
  M('l4-27','L4','word','Tung 1 đồng xu. Xác suất ngửa?', 'Coin flip P(heads)?', ['0','1/3','1/2','1'], 2),
  M('l4-28','L4','word','Tung xúc xắc. Xác suất ra số chẵn?', 'Roll die P(even)?', ['1/6','1/3','1/2','2/3'], 2, '3/6=1/2.','3/6=1/2.'),
  M('l4-29','L4','word','Trung bình 4 số = 25. Tổng?', 'Mean of 4 = 25. Sum?', ['80','90','100','125'], 2),
  M('l4-30','L4','word','5 bài kiểm tra điểm 7,8,6,9,10. Trung bình?', '5 scores 7,8,6,9,10. Mean?', ['7.5','8','8.2','8.5'], 2, '40/5=8.','40/5=8.'),

  M('l4-31','L4','algebra','Phân tích: x²−16 = ?', 'Factor: x²−16=?', ['(x+4)(x−4)','(x+2)(x−8)','(x−16)','(x²−16)'], 0),
  M('l4-32','L4','algebra','x² + 6x + 9 = ?', 'x²+6x+9=?', ['(x+3)²','(x−3)²','(x+9)²','(x+6)²'], 0),
  M('l4-33','L4','algebra','Giải: |x| = 7', '|x|=7', ['7','−7','±7','0'], 2),
  M('l4-34','L4','algebra','Giải bất phương trình: 2x > 10', '2x>10', ['x>5','x<5','x=5','x≥5'], 0),
  M('l4-35','L4','algebra','Đường thẳng y=2x+1 cắt trục y tại?', 'y=2x+1 y-intercept?', ['(0,0)','(0,1)','(1,0)','(2,1)'], 1),
  M('l4-36','L4','algebra','Hệ số góc của y=−3x+4?', 'Slope of y=−3x+4?', ['−3','3','−4','4'], 0),
  M('l4-37','L4','geometry','Hệ thức Pytago: 5,12,?', 'Pythagoras 5,12,?', ['13','14','15','17'], 0, '5²+12²=169=13².','13.'),
  M('l4-38','L4','geometry','Định lý Thales tam giác đồng dạng tỉ lệ?', 'Similar triangles ratios are?', ['Bằng','Tỉ lệ','Trừ','Cộng'], 1),
  M('l4-39','L4','geometry','Diện tích tam giác đều cạnh 6?', 'Equilateral triangle side 6 area?', ['9√3','12√3','15√3','18√3'], 0, '√3/4·s²=9√3.','9√3.'),
  M('l4-40','L4','word','Tỉ số % thay đổi từ 50→65?', '% change 50→65?', ['25%','30%','35%','40%'], 1, '(65−50)/50=30%.','30%.'),

  M('l4-41','L4','word','Tổng 2 số nguyên tố nhỏ hơn 10?', 'Sum primes <10?', ['12','14','17','20'], 2, '2+3+5+7=17.','2+3+5+7=17.'),
  M('l4-42','L4','word','GCD(24,36)=?', 'GCD(24,36)=?', ['6','8','12','24'], 2),
  M('l4-43','L4','word','LCM(4,6)=?', 'LCM(4,6)=?', ['10','12','18','24'], 1),
  M('l4-44','L4','word','Số chia hết cho 9 trong: 729, 712, 648, 533?', 'Divisible by 9?', ['729 và 648','712 và 533','729','648'], 0, 'Tổng chữ số chia hết 9.','Both 729 and 648.'),
  M('l4-45','L4','geometry','Tam giác vuông cạnh 9,40. Cạnh huyền?', 'Right tri legs 9,40. Hyp?', ['41','42','43','45'], 0, '√(81+1600)=41.','√1681=41.'),
  M('l4-46','L4','word','Đầu tư 10tr lãi kép 8%/năm 5 năm xấp xỉ?', 'Invest 10M @8% 5y ≈?', ['12tr','13.5tr','14.7tr','16tr'], 2, '10·1.08⁵≈14.69.','≈14.69M.'),
  M('l4-47','L4','word','Bài Toán đố: Hàng rào dài 30m vuông cạnh 5. Còn?', 'Square fence side 5. Length=30?', ['Đủ 4 cạnh','Thừa 10','Thiếu 10','Đủ + thừa 10'], 3, 'Cần 20m, thừa 10.','Need 20, extra 10.'),
  M('l4-48','L4','word','sin 30° = ?', 'sin 30° = ?', ['1/4','1/3','1/2','√2/2'], 2),
  M('l4-49','L4','word','cos 60° = ?', 'cos 60° = ?', ['1/2','√3/2','1','0'], 0),
  M('l4-50','L4','word','tan 45° = ?', 'tan 45° = ?', ['0','1/2','1','√3'], 2),
];

// ────────────────────────────────────────────────────────────
// COMBINED CURATED BANK (210 questions)
// ────────────────────────────────────────────────────────────
export const CURATED_QUESTIONS: MathQuestion[] = [
  ...L1_QUESTIONS, // 50
  ...L2_QUESTIONS, // 60
  ...L3_QUESTIONS, // 50
  ...L4_QUESTIONS, // 50
];

// ────────────────────────────────────────────────────────────
// PROCEDURAL GENERATORS — produce 800+ more questions from templates
// ────────────────────────────────────────────────────────────

const rng = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
};

const pick = <T,>(arr: T[], r: () => number): T => arr[Math.floor(r() * arr.length)];

// Bounded wrong-answer collector. Prevents infinite loops when the RNG-driven
// candidate space yields fewer than 3 valid values for the correct answer
// (e.g. genL3 algebra at x=1 where only {2, 3} satisfy w!==x && w>0 in ±2 range).
// `validate` decides whether a candidate is acceptable; `fallback(i)` provides
// guaranteed-distinct candidates indexed by 1..N if RNG attempts exhaust.
function collectWrongs<T>(
  correct: T,
  candidate: () => T,
  fallback: (i: number) => T,
  validate: (w: T) => boolean,
  maxAttempts = 40,
): T[] {
  const wrong = new Set<T>();
  for (let attempts = 0; wrong.size < 3 && attempts < maxAttempts; attempts++) {
    const w = candidate();
    if (w !== correct && validate(w)) wrong.add(w);
  }
  for (let i = 1; wrong.size < 3 && i < 200; i++) {
    const w = fallback(i);
    if (w !== correct && validate(w)) wrong.add(w);
  }
  return Array.from(wrong);
}

// L1 GEN — addition / subtraction with results 1-10
function genL1AddSub(seed: number, count: number): MathQuestion[] {
  const r = rng(seed);
  const out: MathQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const op = r() < 0.5 ? '+' : '-';
    let a: number, b: number, ans: number;
    if (op === '+') {
      a = Math.floor(r() * 9) + 1;
      b = Math.floor(r() * (10 - a)) + 1;
      ans = a + b;
    } else {
      a = Math.floor(r() * 9) + 2;
      b = Math.floor(r() * a) + 1;
      ans = a - b;
    }
    const wrong = collectWrongs<number>(
      ans,
      () => ans + Math.floor(r() * 5) - 2,
      (i) => Math.min(12, ans + i + 2),
      (w) => w !== ans && w >= 0 && w <= 12,
    );
    const opts = [ans, ...wrong].sort(() => r() - 0.5).map(String);
    const correctIdx = opts.indexOf(String(ans));
    out.push(M(`l1-gen-${i}`, 'L1', op === '+' ? 'add' : 'subtract',
      `${a} ${op} ${b} = ?`, `${a} ${op} ${b} = ?`, opts, correctIdx));
  }
  return out;
}

// L2 GEN — 2-3 digit add/sub, 1-2 digit multiply, simple divide
function genL2(seed: number, count: number): MathQuestion[] {
  const r = rng(seed);
  const out: MathQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const kind = Math.floor(r() * 4);
    let a: number, b: number, op: string, ans: number, topic: MathTopic;
    if (kind === 0) {
      a = 100 + Math.floor(r() * 900); b = 100 + Math.floor(r() * 900);
      op = '+'; ans = a + b; topic = 'add';
    } else if (kind === 1) {
      a = 500 + Math.floor(r() * 1500); b = 50 + Math.floor(r() * 400);
      op = '-'; ans = a - b; topic = 'subtract';
    } else if (kind === 2) {
      a = 2 + Math.floor(r() * 12); b = 2 + Math.floor(r() * 12);
      op = '×'; ans = a * b; topic = 'multiply';
    } else {
      b = 2 + Math.floor(r() * 11); const q = 2 + Math.floor(r() * 12); a = b * q;
      op = '÷'; ans = a / b; topic = 'divide';
    }
    const span = Math.max(3, Math.floor(Math.abs(ans) * 0.1));
    const wrong = collectWrongs<number>(
      ans,
      () => ans + Math.floor(r() * span * 2) - span,
      (i) => ans + i + span,
      (w) => w !== ans && w >= 0,
    );
    const opts = [ans, ...wrong].sort(() => r() - 0.5).map(String);
    const correctIdx = opts.indexOf(String(ans));
    out.push(M(`l2-gen-${i}`, 'L2', topic,
      `${a} ${op} ${b} = ?`, `${a} ${op} ${b} = ?`, opts, correctIdx));
  }
  return out;
}

// L3 GEN — fractions, percents, simple algebra
function genL3(seed: number, count: number): MathQuestion[] {
  const r = rng(seed);
  const out: MathQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const kind = Math.floor(r() * 3);
    if (kind === 0) {
      // percent: x% of N
      const p = pick([10, 20, 25, 30, 40, 50, 60, 75, 80], r);
      const n = pick([40, 50, 80, 100, 120, 150, 200, 300, 400], r);
      const ans = (p * n) / 100;
      const wrong = collectWrongs<number>(
        Math.round(ans),
        () => Math.round(ans + (Math.floor(r() * 11) - 5) * (n / 100)),
        (i) => Math.round(ans + i * Math.max(1, n / 100)),
        (w) => w !== Math.round(ans) && w >= 0,
      );
      const opts = [ans, ...wrong].sort(() => r() - 0.5).map((x) => String(x));
      const correctIdx = opts.indexOf(String(ans));
      out.push(M(`l3-gen-${i}`, 'L3', 'percent',
        `${p}% của ${n} = ?`, `${p}% of ${n} = ?`, opts, correctIdx));
    } else if (kind === 1) {
      // simple algebra: ax + b = c
      const a = 2 + Math.floor(r() * 5);
      const x = 1 + Math.floor(r() * 9);
      const b = Math.floor(r() * 10);
      const c = a * x + b;
      const wrong = collectWrongs<number>(
        x,
        () => x + Math.floor(r() * 5) - 2,
        (i) => x + i + 2, // guaranteed > x, > 0
        (w) => w !== x && w > 0,
      );
      const opts = [x, ...wrong].sort(() => r() - 0.5).map(String);
      const correctIdx = opts.indexOf(String(x));
      out.push(M(`l3-gen-${i}`, 'L3', 'algebra',
        `${a}x + ${b} = ${c}, x = ?`, `${a}x + ${b} = ${c}, x = ?`, opts, correctIdx));
    } else {
      // decimal arithmetic
      const x1 = parseFloat((r() * 10 + 1).toFixed(1));
      const x2 = parseFloat((r() * 10 + 1).toFixed(1));
      const ans = parseFloat((x1 + x2).toFixed(1));
      const wrong = collectWrongs<string>(
        String(ans),
        () => {
          const w = parseFloat((ans + (Math.floor(r() * 7) - 3) * 0.1).toFixed(1));
          return Math.abs(w - ans) > 0.05 ? String(w) : String(ans);
        },
        (i) => parseFloat((ans + i * 0.5).toFixed(1)).toString(),
        (w) => w !== String(ans),
      );
      const opts = [String(ans), ...wrong].sort(() => r() - 0.5);
      const correctIdx = opts.indexOf(String(ans));
      out.push(M(`l3-gen-${i}`, 'L3', 'decimal',
        `${x1} + ${x2} = ?`, `${x1} + ${x2} = ?`, opts, correctIdx));
    }
  }
  return out;
}

// L4 GEN — algebra solving, geometry
function genL4(seed: number, count: number): MathQuestion[] {
  const r = rng(seed);
  const out: MathQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const kind = Math.floor(r() * 3);
    if (kind === 0) {
      // ax + b = cx + d, find x
      const xVal = 1 + Math.floor(r() * 12);
      const a = 2 + Math.floor(r() * 5);
      const c = 1 + Math.floor(r() * (a - 1));
      const b = Math.floor(r() * 10);
      const d = (a - c) * xVal + b;
      const wrong = collectWrongs<number>(
        xVal,
        () => xVal + Math.floor(r() * 7) - 3,
        (i) => xVal + i + 3,
        (w) => w !== xVal && w > 0,
      );
      const opts = [xVal, ...wrong].sort(() => r() - 0.5).map(String);
      const correctIdx = opts.indexOf(String(xVal));
      out.push(M(`l4-gen-${i}`, 'L4', 'algebra',
        `${a}x + ${b} = ${c}x + ${d}, x = ?`, `${a}x + ${b} = ${c}x + ${d}, x = ?`,
        opts, correctIdx));
    } else if (kind === 1) {
      // pythagoras: a² + b² = c²
      const triples = [[3,4,5],[5,12,13],[8,15,17],[7,24,25],[9,40,41],[6,8,10],[9,12,15]];
      const t = pick(triples, r);
      const ans = t[2];
      const wrong = collectWrongs<number>(
        ans,
        () => ans + Math.floor(r() * 9) - 4,
        (i) => ans + i + 4,
        (w) => w !== ans && w > 0,
      );
      const opts = [ans, ...wrong].sort(() => r() - 0.5).map(String);
      const correctIdx = opts.indexOf(String(ans));
      out.push(M(`l4-gen-${i}`, 'L4', 'geometry',
        `Tam giác vuông cạnh ${t[0]}, ${t[1]}. Cạnh huyền?`,
        `Right tri legs ${t[0]}, ${t[1]}. Hypotenuse?`,
        opts, correctIdx));
    } else {
      // square + perimeter / area
      const side = 3 + Math.floor(r() * 12);
      const askArea = r() < 0.5;
      const ans = askArea ? side * side : 4 * side;
      const wrong = collectWrongs<number>(
        ans,
        () => ans + Math.floor(r() * 21) - 10,
        (i) => ans + i + 10,
        (w) => w !== ans && w > 0,
      );
      const opts = [ans, ...wrong].sort(() => r() - 0.5).map(String);
      const correctIdx = opts.indexOf(String(ans));
      out.push(M(`l4-gen-${i}`, 'L4', 'geometry',
        askArea ? `Diện tích hình vuông cạnh ${side}?` : `Chu vi hình vuông cạnh ${side}?`,
        askArea ? `Square area side ${side}?`            : `Square perimeter side ${side}?`,
        opts, correctIdx));
    }
  }
  return out;
}

// ────────────────────────────────────────────────────────────
// PUBLIC API
// ────────────────────────────────────────────────────────────

// Generated banks (run-once at module load)
export const GENERATED_QUESTIONS: MathQuestion[] = [
  ...genL1AddSub(1001, 200),
  ...genL2(2002, 250),
  ...genL3(3003, 200),
  ...genL4(4004, 200),
];

// Total bank
export const ALL_MATH_QUESTIONS: MathQuestion[] = [
  ...CURATED_QUESTIONS,    // 210
  ...GENERATED_QUESTIONS,  // 850
];
// EFFECTIVE TOTAL: 1060 questions

export function getMathLevelForKid(age: number): MathLevel {
  if (age <= 6) return 'L1';
  if (age <= 10) return 'L2';
  if (age <= 12) return 'L3';
  return 'L4';
}

export function getQuestionsByLevel(level: MathLevel): MathQuestion[] {
  return ALL_MATH_QUESTIONS.filter((q) => q.level === level);
}

export function getQuestionsByTopic(level: MathLevel, topic: MathTopic): MathQuestion[] {
  return ALL_MATH_QUESTIONS.filter((q) => q.level === level && q.topic === topic);
}

export function getRandomMathQuiz(level: MathLevel, count = 10): MathQuestion[] {
  const pool = getQuestionsByLevel(level);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getMathStats() {
  const stats = {
    totalCurated: CURATED_QUESTIONS.length,
    totalGenerated: GENERATED_QUESTIONS.length,
    totalAll: ALL_MATH_QUESTIONS.length,
    byLevel: { L1: 0, L2: 0, L3: 0, L4: 0 } as Record<MathLevel, number>,
    byTopic: {} as Record<string, number>,
  };
  ALL_MATH_QUESTIONS.forEach((q) => {
    stats.byLevel[q.level]++;
    stats.byTopic[q.topic] = (stats.byTopic[q.topic] || 0) + 1;
  });
  return stats;
}
