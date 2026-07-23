'use client';

/**
 * @file components/PracticeTab.tsx
 * @description Góc Luyện Tập (Practice Corner) — D-043.
 *              Embedded free open-source interactive tools for the July study plan:
 *              English speaking (iSpeakerReact · Apache-2.0), touch typing
 *              (QuickQWERTY · MIT), 3D + 2D geometry (GeoGebra free embed).
 *              Iframes lazy-load only when a card is expanded (perf).
 *              Plus curated free external links (Cambridge KET/PET, Write & Improve,
 *              ELSA, Khan Math 6 VN, ReadTheory) that open in a new tab.
 *              Standalone tab: takes only `lang` (no per-kid progress).
 *
 *              2026-07-03 — Geometry upgrade: the two GeoGebra cards now carry a
 *              structured problem set (đề bài + công thức + đáp án ẩn) at
 *              Grade-5 advanced → Grade-6 foundation level. The blank grade 3–4
 *              free-play framing is replaced: 3D = surface area / volume of
 *              cuboids & cubes (incl. open boxes, composite/notched solids, unit
 *              conversion, reverse problems); 2D = perimeter/area of rhombus,
 *              trapezoid, parallelogram, regular hexagon + points/segments/angles.
 */

import { useState } from 'react';
import VocabWordle from '@/components/VocabWordle';

type Lang = 'vi' | 'en';
type Props = { lang: Lang };

type Problem = {
  id: string;
  level_vi: string; level_en: string;
  q_vi: string; q_en: string;
  hint_vi: string; hint_en: string;
  answer_vi: string; answer_en: string;
};

type Tool = {
  id: string;
  emoji: string;
  title_vi: string; title_en: string;
  desc_vi: string; desc_en: string;
  src?: string; // omit for problems-only cards (no external embed)
  gradient: string;
  credit: string;
  problemsTitle_vi?: string; problemsTitle_en?: string;
  problems?: Problem[];
};

// ─── Grade-5 advanced → Grade-6 foundation: solid geometry (khối) ─────────────
const GEO3D_PROBLEMS: Problem[] = [
  {
    id: 'g3d-1',
    level_vi: 'Lớp 5 nâng cao', level_en: 'Grade 5 · advanced',
    q_vi: 'Hình hộp chữ nhật dài 8cm, rộng 5cm, cao 4cm. Tính diện tích xung quanh (Sxq), diện tích toàn phần (Stp) và thể tích (V).',
    q_en: 'A cuboid 8cm × 5cm × 4cm. Find the lateral area, total surface area and volume.',
    hint_vi: 'Sxq = (dài + rộng) × 2 × cao · Stp = Sxq + 2 × (dài × rộng) · V = dài × rộng × cao',
    hint_en: 'Sxq = (l + w) × 2 × h · Stp = Sxq + 2·(l × w) · V = l × w × h',
    answer_vi:
      'Sxq = (8 + 5) × 2 × 4 = 13 × 8 = 104 cm²\n' +
      'Stp = 104 + 2 × (8 × 5) = 104 + 80 = 184 cm²\n' +
      'V   = 8 × 5 × 4 = 160 cm³',
    answer_en:
      'Sxq = (8 + 5) × 2 × 4 = 104 cm²\n' +
      'Stp = 104 + 2·(8 × 5) = 184 cm²\n' +
      'V   = 8 × 5 × 4 = 160 cm³',
  },
  {
    id: 'g3d-2',
    level_vi: 'Lớp 5 nâng cao', level_en: 'Grade 5 · advanced',
    q_vi: 'Một thùng tôn KHÔNG NẮP dạng hình hộp chữ nhật: dài 12dm, rộng 8dm, cao 6dm. Tính diện tích tôn dùng để làm thùng.',
    q_en: 'An open-top rectangular tin box 12dm × 8dm × 6dm. How much tin is needed to make it?',
    hint_vi: 'Thùng không nắp = diện tích xung quanh + 1 mặt đáy (thiếu nắp trên).',
    hint_en: 'Open box = lateral area + one base (no top face).',
    answer_vi:
      'Sxq  = (12 + 8) × 2 × 6 = 20 × 12 = 240 dm²\n' +
      'Đáy  = 12 × 8 = 96 dm²\n' +
      'Tôn  = 240 + 96 = 336 dm²',
    answer_en:
      'Sxq  = (12 + 8) × 2 × 6 = 240 dm²\n' +
      'Base = 12 × 8 = 96 dm²\n' +
      'Tin  = 240 + 96 = 336 dm²',
  },
  {
    id: 'g3d-3',
    level_vi: 'Lớp 5 nâng cao → Lớp 6', level_en: 'Grade 5 → 6',
    q_vi: 'Hình lập phương cạnh 7cm. a) Tính Stp và V. b) Nếu cạnh gấp ĐÔI (14cm) thì thể tích gấp mấy lần?',
    q_en: 'A cube with edge 7cm. a) Find total surface area & volume. b) If the edge doubles (14cm), how many times bigger is the volume?',
    hint_vi: 'Lập phương: Stp = 6 × cạnh × cạnh · V = cạnh × cạnh × cạnh. Cạnh gấp đôi → thể tích gấp 2 × 2 × 2 lần.',
    hint_en: 'Cube: Stp = 6·a² · V = a³. Doubling the edge multiplies volume by 2×2×2.',
    answer_vi:
      'a) Stp = 6 × 7 × 7 = 294 cm² · V = 7 × 7 × 7 = 343 cm³\n' +
      'b) Cạnh 14cm → V = 14 × 14 × 14 = 2744 cm³\n' +
      '   2744 : 343 = 8 lần (vì 2³ = 8). Cạnh gấp 2 thì thể tích gấp 8!',
    answer_en:
      'a) Stp = 6 × 7² = 294 cm² · V = 7³ = 343 cm³\n' +
      'b) Edge 14 → V = 14³ = 2744 cm³ = 8× larger (2³ = 8).',
  },
  {
    id: 'g3d-4',
    level_vi: 'Tiền đề Lớp 6 · độ khó cao', level_en: 'Grade 6 prep · hard',
    q_vi: 'Một khối hộp chữ nhật 20cm × 10cm × 8cm bị KHOÉT mất một khối lập phương cạnh 4cm ở đúng một góc. Tính: a) thể tích còn lại; b) diện tích toàn phần của khối sau khi khoét.',
    q_en: 'A 20×10×8 cm cuboid has a 4cm cube cut from one corner. Find a) remaining volume; b) total surface area after the cut.',
    hint_vi: 'Thể tích: lấy V hộp trừ V khối bị khoét. Diện tích: khoét ở GÓC bỏ đi 3 mặt vuông nhưng lộ ra 3 mặt vuông mới → tổng diện tích KHÔNG ĐỔI.',
    hint_en: 'Volume: box − cube. Surface: a corner cut removes 3 squares but exposes 3 new ones → total area is unchanged.',
    answer_vi:
      'a) V = 20 × 10 × 8 − 4 × 4 × 4 = 1600 − 64 = 1536 cm³\n' +
      'b) Stp hộp gốc = 2 × (20×10 + 20×8 + 10×8) = 2 × 440 = 880 cm²\n' +
      '   Khoét ở góc: bỏ 3 mặt 4×4 nhưng lộ 3 mặt 4×4 → bù trừ.\n' +
      '   ⇒ Stp sau khi khoét = 880 cm² (KHÔNG đổi).',
    answer_en:
      'a) V = 20·10·8 − 4³ = 1600 − 64 = 1536 cm³\n' +
      'b) Original Stp = 2·(200+160+80) = 880 cm²; corner cut nets zero → 880 cm² (unchanged).',
  },
  {
    id: 'g3d-5',
    level_vi: 'Lớp 5 nâng cao · đổi đơn vị', level_en: 'Grade 5 · units',
    q_vi: 'Một bể nước hình hộp chữ nhật: dài 1,5m, rộng 1,2m, cao 0,9m. Bể chứa được bao nhiêu LÍT nước khi đầy? (1 m³ = 1000 lít)',
    q_en: 'A rectangular tank 1.5m × 1.2m × 0.9m. How many litres when full? (1 m³ = 1000 L)',
    hint_vi: 'Tính thể tích theo mét khối trước, rồi đổi: 1 m³ = 1000 lít.',
    hint_en: 'Find volume in m³, then convert: 1 m³ = 1000 L.',
    answer_vi:
      'V = 1,5 × 1,2 × 0,9 = 1,62 m³\n' +
      '1,62 m³ = 1,62 × 1000 = 1620 lít',
    answer_en: 'V = 1.5 × 1.2 × 0.9 = 1.62 m³ = 1620 L',
  },
  {
    id: 'g3d-6',
    level_vi: 'Tiền đề Lớp 6 · bài ngược', level_en: 'Grade 6 prep · reverse',
    q_vi: 'Một hình hộp chữ nhật có thể tích 360cm³, đáy là hình chữ nhật 12cm × 5cm. Tìm chiều cao, rồi tính diện tích toàn phần.',
    q_en: 'A cuboid has volume 360 cm³ and a 12×5 cm base. Find its height, then the total surface area.',
    hint_vi: 'Chiều cao = thể tích : diện tích đáy. Sau đó dùng công thức Stp bình thường.',
    hint_en: 'Height = volume ÷ base area. Then apply the Stp formula.',
    answer_vi:
      'Diện tích đáy = 12 × 5 = 60 cm²\n' +
      'Chiều cao = 360 : 60 = 6 cm\n' +
      'Sxq = (12 + 5) × 2 × 6 = 204 cm²\n' +
      'Stp = 204 + 2 × 60 = 324 cm²',
    answer_en:
      'Base = 12 × 5 = 60 cm² · Height = 360 ÷ 60 = 6 cm\n' +
      'Sxq = (12+5)×2×6 = 204 · Stp = 204 + 120 = 324 cm²',
  },
];

// ─── Grade-6 foundation: plane geometry (hình phẳng & góc) ────────────────────
const GEO2D_PROBLEMS: Problem[] = [
  {
    id: 'g2d-1',
    level_vi: 'Tiền đề Lớp 6', level_en: 'Grade 6 prep',
    q_vi: 'Hình thoi có hai đường chéo dài 12cm và 8cm. Tính diện tích.',
    q_en: 'A rhombus has diagonals 12cm and 8cm. Find its area.',
    hint_vi: 'Diện tích hình thoi = (đường chéo 1 × đường chéo 2) : 2.',
    hint_en: 'Rhombus area = (d₁ × d₂) ÷ 2.',
    answer_vi: 'S = (12 × 8) : 2 = 96 : 2 = 48 cm²',
    answer_en: 'S = (12 × 8) ÷ 2 = 48 cm²',
  },
  {
    id: 'g2d-2',
    level_vi: 'Tiền đề Lớp 6', level_en: 'Grade 6 prep',
    q_vi: 'Hình thang có đáy lớn 15cm, đáy bé 9cm, chiều cao 6cm. Tính diện tích.',
    q_en: 'A trapezoid with bases 15cm & 9cm and height 6cm. Find its area.',
    hint_vi: 'Diện tích hình thang = (đáy lớn + đáy bé) × chiều cao : 2.',
    hint_en: 'Trapezoid area = (a + b) × h ÷ 2.',
    answer_vi: 'S = (15 + 9) × 6 : 2 = 24 × 6 : 2 = 144 : 2 = 72 cm²',
    answer_en: 'S = (15 + 9) × 6 ÷ 2 = 72 cm²',
  },
  {
    id: 'g2d-3',
    level_vi: 'Tiền đề Lớp 6', level_en: 'Grade 6 prep',
    q_vi: 'Hình bình hành có cạnh đáy 10cm, chiều cao 7cm, cạnh bên 8cm. Tính chu vi và diện tích.',
    q_en: 'A parallelogram: base 10cm, height 7cm, side 8cm. Find perimeter & area.',
    hint_vi: 'Chu vi = (đáy + cạnh bên) × 2 · Diện tích = đáy × chiều cao (KHÔNG dùng cạnh bên).',
    hint_en: 'Perimeter = (base + side) × 2 · Area = base × height (not the slanted side).',
    answer_vi:
      'Chu vi = (10 + 8) × 2 = 36 cm\n' +
      'Diện tích = 10 × 7 = 70 cm²\n' +
      '(Bẫy: cạnh bên 8cm KHÔNG dùng để tính diện tích.)',
    answer_en: 'Perimeter = (10 + 8) × 2 = 36 cm · Area = 10 × 7 = 70 cm²',
  },
  {
    id: 'g2d-4',
    level_vi: 'Tiền đề Lớp 6 · suy luận', level_en: 'Grade 6 prep · reasoning',
    q_vi: 'Đoạn thẳng AB dài 10cm. M là trung điểm của AB. N là trung điểm của MB. Tính độ dài AN.',
    q_en: 'Segment AB = 10cm. M is the midpoint of AB, N the midpoint of MB. Find AN.',
    hint_vi: 'Trung điểm chia đoạn thành 2 phần bằng nhau. Vẽ hình A — M — N — B rồi cộng dần.',
    hint_en: 'A midpoint splits a segment in two equal halves. Draw A — M — N — B.',
    answer_vi:
      'AM = MB = 10 : 2 = 5 cm\n' +
      'MN = NB = 5 : 2 = 2,5 cm\n' +
      'AN = AM + MN = 5 + 2,5 = 7,5 cm',
    answer_en: 'AM = MB = 5 · MN = 2.5 · AN = 5 + 2.5 = 7.5 cm',
  },
  {
    id: 'g2d-5',
    level_vi: 'Tiền đề Lớp 6 · đo góc', level_en: 'Grade 6 prep · angles',
    q_vi: 'Một góc bẹt bằng 180°. Một tia chia góc bẹt thành hai góc, góc thứ nhất bằng 110°. Tính góc còn lại và cho biết đó là loại góc gì (nhọn / vuông / tù).',
    q_en: 'A straight angle (180°) is split by a ray; one part is 110°. Find the other and name its type.',
    hint_vi: 'Hai góc kề bù cộng lại bằng 180°. Góc < 90° là nhọn, = 90° là vuông, > 90° là tù.',
    hint_en: 'Adjacent angles on a line sum to 180°. <90° acute, =90° right, >90° obtuse.',
    answer_vi:
      'Góc còn lại = 180° − 110° = 70°\n' +
      '70° < 90° ⇒ là góc NHỌN.',
    answer_en: 'Other = 180° − 110° = 70° → acute (< 90°).',
  },
  {
    id: 'g2d-6',
    level_vi: 'Lớp 6 · hình trực quan', level_en: 'Grade 6 · visual',
    q_vi: 'Một hình lục giác đều có cạnh 6cm. a) Tính chu vi. b) Lục giác đều được ghép từ mấy tam giác đều bằng nhau? Cạnh mỗi tam giác dài bao nhiêu?',
    q_en: 'A regular hexagon with side 6cm. a) Find perimeter. b) How many equal equilateral triangles form it, and what is each triangle’s side?',
    hint_vi: 'Lục giác đều có 6 cạnh bằng nhau. Nối tâm với 6 đỉnh → chia thành 6 tam giác đều.',
    hint_en: 'A regular hexagon has 6 equal sides; joining the centre to the vertices gives 6 equilateral triangles.',
    answer_vi:
      'a) Chu vi = 6 × 6 = 36 cm\n' +
      'b) Ghép từ 6 tam giác đều bằng nhau, mỗi tam giác có cạnh 6cm (bằng cạnh lục giác).',
    answer_en: 'a) Perimeter = 6 × 6 = 36 cm · b) 6 equilateral triangles, each side 6cm.',
  },
];

// ─── English grammar — bài tập ngữ pháp A1 → B1 (bổ sung cho Luyện thi ở Quiz Tab) ─────
const GRAMMAR_PROBLEMS: Problem[] = [
  {
    id: 'gr-a1-1', level_vi: 'A1', level_en: 'A1',
    q_vi: 'Điền: "This ___ my pencil case."  (is / are / am)',
    q_en: 'Fill in: "This ___ my pencil case."  (is / are / am)',
    hint_vi: '"This" (số ít) luôn đi với "is".',
    hint_en: '"This" (singular) always takes "is".',
    answer_vi: 'is — "This is my pencil case."',
    answer_en: 'is — "This is my pencil case."',
  },
  {
    id: 'gr-a1-2', level_vi: 'A1', level_en: 'A1',
    q_vi: 'Chọn số nhiều đúng của "child": children / childs / childes',
    q_en: 'Pick the correct plural of "child": children / childs / childes',
    hint_vi: '"Child" là danh từ số nhiều bất quy tắc (không thêm -s).',
    hint_en: '"Child" is an irregular plural (no -s ending).',
    answer_vi: 'children — số nhiều bất quy tắc, không phải "childs".',
    answer_en: 'children — irregular plural, not "childs".',
  },
  {
    id: 'gr-a1-3', level_vi: 'A1', level_en: 'A1',
    q_vi: 'Điền mạo từ: "I saw ___ elephant at the zoo."  (a / an / the)',
    q_en: 'Fill in the article: "I saw ___ elephant at the zoo."  (a / an / the)',
    hint_vi: '"Elephant" bắt đầu bằng nguyên âm (e) → dùng "an".',
    hint_en: '"Elephant" starts with a vowel sound → use "an".',
    answer_vi: 'an — "an elephant" vì "elephant" bắt đầu bằng âm nguyên âm.',
    answer_en: 'an — "an elephant" because it starts with a vowel sound.',
  },
  {
    id: 'gr-a2-1', level_vi: 'A2', level_en: 'A2',
    q_vi: 'Chia đúng thì: "Look! The dog ___ (run) after the ball right now."',
    q_en: 'Correct tense: "Look! The dog ___ (run) after the ball right now."',
    hint_vi: '"Right now" → thì hiện tại tiếp diễn: is/am/are + V-ing.',
    hint_en: '"Right now" signals present continuous: is/am/are + V-ing.',
    answer_vi: 'is running — "The dog is running after the ball right now."',
    answer_en: 'is running — "The dog is running after the ball right now."',
  },
  {
    id: 'gr-a2-2', level_vi: 'A2', level_en: 'A2',
    q_vi: 'So sánh hơn: "My bag is ___ (heavy) than yours."',
    q_en: 'Comparative: "My bag is ___ (heavy) than yours."',
    hint_vi: 'Tính từ 2 âm tiết kết thúc bằng "-y" → đổi y → i rồi thêm -er.',
    hint_en: 'Two-syllable adjective ending in "-y" → change y to i, add -er.',
    answer_vi: 'heavier — "heavy" → "heavier" (đổi y thành i, thêm -er).',
    answer_en: 'heavier — "heavy" → "heavier" (change y to i, add -er).',
  },
  {
    id: 'gr-a2-3', level_vi: 'A2', level_en: 'A2',
    q_vi: 'Điền giới từ đúng: "The meeting is ___ Monday ___ 9 o\'clock."',
    q_en: 'Fill in the prepositions: "The meeting is ___ Monday ___ 9 o\'clock."',
    hint_vi: 'Ngày trong tuần dùng "on"; giờ cụ thể dùng "at".',
    hint_en: 'Days of the week take "on"; specific clock times take "at".',
    answer_vi: 'on Monday at 9 o\'clock.',
    answer_en: 'on Monday at 9 o\'clock.',
  },
  {
    id: 'gr-a2-4', level_vi: 'A2', level_en: 'A2',
    q_vi: 'Sắp xếp thành câu hỏi đúng: "you / like / do / football / ?"',
    q_en: 'Rearrange into a correct question: "you / like / do / football / ?"',
    hint_vi: 'Câu hỏi Yes/No thì hiện tại đơn: Do + S + V(nguyên mẫu) + O?',
    hint_en: 'Present-simple Yes/No question: Do + subject + base verb + object?',
    answer_vi: 'Do you like football?',
    answer_en: 'Do you like football?',
  },
  {
    id: 'gr-b1-1', level_vi: 'B1', level_en: 'B1',
    q_vi: 'Chia đúng thì: "By the time we arrived, the movie already ___ (start)."',
    q_en: 'Correct tense: "By the time we arrived, the movie already ___ (start)."',
    hint_vi: 'Hành động xảy ra TRƯỚC một mốc quá khứ khác → quá khứ hoàn thành (had + PII).',
    hint_en: 'An action before another past moment → past perfect (had + past participle).',
    answer_vi: 'had already started — "the movie had already started."',
    answer_en: 'had already started — "the movie had already started."',
  },
  {
    id: 'gr-b1-2', level_vi: 'B1', level_en: 'B1',
    q_vi: 'Nối câu bằng đại từ quan hệ: "That is the book. I told you about the book." → "That is the book ___ I told you about."',
    q_en: 'Join with a relative pronoun: "That is the book. I told you about the book." → "That is the book ___ I told you about."',
    hint_vi: '"Book" là vật → dùng "which" hoặc "that".',
    hint_en: '"Book" is a thing → use "which" or "that".',
    answer_vi: 'which (hoặc that) — "That is the book which/that I told you about."',
    answer_en: 'which (or that) — "That is the book which/that I told you about."',
  },
  {
    id: 'gr-b1-3', level_vi: 'B1', level_en: 'B1',
    q_vi: 'Câu điều kiện loại 1: "If she ___ (study) harder, she will pass the exam."',
    q_en: 'First conditional: "If she ___ (study) harder, she will pass the exam."',
    hint_vi: 'If + hiện tại đơn, S + will + V. Mệnh đề "if" luôn ở hiện tại đơn.',
    hint_en: 'If + present simple, S + will + V. The "if" clause always stays in present simple.',
    answer_vi: 'studies — "If she studies harder, she will pass the exam."',
    answer_en: 'studies — "If she studies harder, she will pass the exam."',
  },
];

const TOOLS: Tool[] = [
  {
    id: 'speaking', emoji: '🗣️',
    title_vi: 'Luyện Nói Tiếng Anh', title_en: 'English Speaking',
    desc_vi: 'Luyện phát âm, nghe & nói kiểu Oxford iSpeaker. Chỉ chơi phần phát âm & hội thoại — bỏ qua phần luyện thi.',
    desc_en: 'Oxford iSpeaker-style pronunciation, listening & speaking practice.',
    src: 'https://learnercraft.github.io/ispeakerreact/',
    gradient: 'linear-gradient(135deg,#845EC2,#FF6B9D)',
    credit: 'iSpeakerReact · Apache-2.0',
  },
  {
    id: 'typing', emoji: '⌨️',
    title_vi: 'Gõ Phím 10 Ngón', title_en: 'Touch Typing',
    desc_vi: 'Học gõ phím tiến bộ từng bài. Chơi nhẹ ~10 phút, không ép.',
    desc_en: 'Progressive touch-typing lessons — play ~10 min.',
    src: 'https://susam.github.io/quickqwerty.html',
    gradient: 'linear-gradient(135deg,#4FB3E8,#00D4AA)',
    credit: 'QuickQWERTY · MIT',
  },
  {
    id: 'geo3d', emoji: '📐',
    title_vi: 'Hình Học 3D — Khối hộp & lập phương', title_en: '3D Geometry — Cuboids & Cubes',
    desc_vi: 'Diện tích xung quanh, toàn phần & thể tích của hình hộp chữ nhật và hình lập phương (Lớp 5 nâng cao → tiền đề Lớp 6). Xoay – cắt lát – dựng khối bằng GeoGebra để hình dung, rồi giải các đề bên dưới.',
    desc_en: 'Surface area & volume of cuboids and cubes (Grade-5 advanced → Grade-6 prep). Rotate, slice & build in GeoGebra, then solve the problems below.',
    src: 'https://www.geogebra.org/3d',
    gradient: 'linear-gradient(135deg,#00BFFF,#4FB3E8)',
    credit: 'GeoGebra · nhúng miễn phí',
    problemsTitle_vi: 'Đề bài luyện tập — Diện tích & Thể tích khối',
    problemsTitle_en: 'Practice — surface area & volume',
    problems: GEO3D_PROBLEMS,
  },
  {
    id: 'geo2d', emoji: '🔷',
    title_vi: 'Hình Học Phẳng — Hình & Góc', title_en: '2D Geometry — Shapes & Angles',
    desc_vi: 'Chu vi & diện tích hình thoi, hình thang, hình bình hành, lục giác đều; điểm – đoạn thẳng – trung điểm – góc. Đúng chương trình tiền đề Hình học Lớp 6. Vẽ động bằng GeoGebra rồi giải các đề bên dưới.',
    desc_en: 'Perimeter & area of rhombus, trapezoid, parallelogram, hexagon; points, segments, midpoints & angles — Grade-6 foundation. Draw dynamically, then solve below.',
    src: 'https://www.geogebra.org/geometry',
    gradient: 'linear-gradient(135deg,#00D4AA,#00BFFF)',
    credit: 'GeoGebra · nhúng miễn phí',
    problemsTitle_vi: 'Đề bài luyện tập — Hình phẳng & Góc',
    problemsTitle_en: 'Practice — plane shapes & angles',
    problems: GEO2D_PROBLEMS,
  },
  {
    id: 'grammar', emoji: '📝',
    title_vi: 'Bài Tập Ngữ Pháp Tiếng Anh', title_en: 'English Grammar Exercises',
    desc_vi: 'Bài tập ngữ pháp A1 → B1 (thì động từ, mạo từ, so sánh, giới từ, mệnh đề quan hệ, câu điều kiện) — làm không tính giờ, giải rồi bấm "Xem đáp án". Muốn thi thử có chấm điểm? Sang tab Quiz → "Luyện thi Tiếng Anh".',
    desc_en: 'A1 → B1 grammar drills (tenses, articles, comparatives, prepositions, relative clauses, conditionals) — untimed, tap "Show answer" to check. Want a scored mock test? See Quiz tab → "English Exam Prep".',
    gradient: 'linear-gradient(135deg,#FF9F43,#FF6B9D)',
    credit: 'PANY Kids Studio · tự biên soạn',
    problemsTitle_vi: 'Đề bài luyện tập — Ngữ pháp A1 → B1',
    problemsTitle_en: 'Practice — grammar A1 → B1',
    problems: GRAMMAR_PROBLEMS,
  },
];

type LinkItem = {
  emoji: string;
  label_vi: string; label_en: string;
  href: string;
  note_vi: string; note_en: string;
};

const LINKS: LinkItem[] = [
  { emoji: '📝', label_vi: 'Write & Improve', label_en: 'Write & Improve', href: 'https://writeandimprove.com/', note_vi: 'Viết tiếng Anh → AI chấm ngay (free)', note_en: 'AI writing feedback (free)' },
  { emoji: '🎧', label_vi: 'Cambridge A2 Key — đề mẫu', label_en: 'Cambridge A2 Key samples', href: 'https://www.cambridgeenglish.org/exams-and-tests/key-for-schools/preparation/', note_vi: 'Đề mẫu số hoá (free)', note_en: 'Free digital sample tests' },
  { emoji: '🎓', label_vi: 'Cambridge B1 Preliminary', label_en: 'Cambridge B1 Preliminary', href: 'https://www.cambridgeenglish.org/exams-and-tests/qualifications/preliminary/preparation/', note_vi: 'Chạm PET (free)', note_en: 'Taste PET (free)' },
  { emoji: '🗣️', label_vi: 'ELSA Speak (phát âm AI)', label_en: 'ELSA Speak', href: 'https://elsaspeak.com/en', note_vi: 'Bản free tier', note_en: 'Free tier' },
  { emoji: '🔢', label_vi: 'Khan Academy Toán 6', label_en: 'Khan Academy Math 6', href: 'https://vi.khanacademy.org/math/toan-lop-6-viet-nam', note_vi: 'Tiếng Việt (free)', note_en: 'Vietnamese (free)' },
  { emoji: '📖', label_vi: 'ReadTheory (đọc hiểu Anh)', label_en: 'ReadTheory', href: 'https://readtheory.org/', note_vi: 'Đọc hiểu tự điều chỉnh (free)', note_en: 'Adaptive reading (free)' },
];

/** One practice problem with a hidden, tap-to-reveal answer. */
function ProblemCard({ p, n, L }: { p: Problem; n: number; L: (vi: string, en: string) => string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-start gap-2.5">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
          {n}
        </span>
        <div className="flex-1 min-w-0">
          <span className="inline-block text-[10px] font-bold uppercase tracking-wide text-teal-700 bg-teal-50 border border-teal-200 rounded px-1.5 py-0.5 mb-1">
            {L(p.level_vi, p.level_en)}
          </span>
          <p className="text-sm text-slate-800 font-medium leading-snug">{L(p.q_vi, p.q_en)}</p>
          <p className="text-xs text-amber-700 mt-1.5 leading-snug">💡 {L(p.hint_vi, p.hint_en)}</p>
          <button
            onClick={() => setShow((s) => !s)}
            className="mt-2 text-xs font-semibold text-teal-700 hover:text-teal-900 hover:underline"
          >
            {show ? L('▲ Ẩn đáp án', '▲ Hide answer') : L('▼ Xem đáp án', '▼ Show answer')}
          </button>
          {show && (
            <pre className="mt-2 whitespace-pre-line rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-900 font-mono leading-relaxed">
              {L(p.answer_vi, p.answer_en)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

/** Problem panel rendered inside an expanded geometry card. */
function ProblemSet({ tool, L }: { tool: Tool; L: (vi: string, en: string) => string }) {
  if (!tool.problems?.length) return null;
  return (
    <div className="border-t border-slate-200 bg-gradient-to-b from-teal-50/70 to-white px-4 py-4">
      <h4 className="text-sm font-bold text-teal-900 mb-1 flex items-center gap-2">
        📋 {L(tool.problemsTitle_vi ?? 'Đề bài luyện tập', tool.problemsTitle_en ?? 'Practice problems')}
      </h4>
      <p className="text-[11px] text-slate-500 mb-3">
        {L('Đọc đề → dùng công cụ phía trên để hình dung → tự giải rồi bấm “Xem đáp án” để kiểm tra.',
           'Read the problem → explore with the tool above → solve, then tap “Show answer” to check.')}
      </p>
      <div className="space-y-2.5">
        {tool.problems.map((p, i) => (
          <ProblemCard key={p.id} p={p} n={i + 1} L={L} />
        ))}
      </div>
    </div>
  );
}

export default function PracticeTab({ lang }: Props) {
  const L = (vi: string, en: string) => (lang === 'vi' ? vi : en);
  const [open, setOpen] = useState<string | null>('speaking');

  return (
    <div className="space-y-6">
      {/* ───────── Hero ───────── */}
      <div className="rounded-2xl p-6 text-white shadow-lg" style={{ background: 'linear-gradient(135deg,#0f766e 0%,#0891b2 55%,#6366f1 100%)' }}>
        <div className="flex items-center gap-3">
          <span className="text-5xl">🎯</span>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">{L('Góc Luyện Tập Hè', 'Summer Practice Corner')}</h1>
            <p className="text-sm text-white/90 mt-1">
              {L('Công cụ tương tác miễn phí — luyện nói tiếng Anh, gõ phím, hình học, ngữ pháp tiếng Anh và trò chơi từ vựng ngay trong app. Bấm mở từng thẻ để chơi.',
                 'Free interactive tools — English speaking, typing, geometry, English grammar and a vocabulary game, right in the app. Tap a card to play.')}
            </p>
          </div>
        </div>
        <div className="mt-3 text-xs text-teal-100 font-semibold">
          💡 {L('Nhẹ nhàng, vừa chơi vừa học · mỗi công cụ ~10–15 phút là đủ', 'Light & playful · ~10–15 min per tool is plenty')}
        </div>
      </div>

      {/* ───────── Embedded tools ───────── */}
      <div>
        <h2 className="text-xl font-bold text-teal-900 mb-3">🕹️ {L('Công cụ tương tác (nhúng sẵn)', 'Interactive tools (embedded)')}</h2>
        <div className="space-y-3">
          {TOOLS.map((tool) => {
            const isOpen = open === tool.id;
            return (
              <div key={tool.id} className={`rounded-2xl border-2 bg-white transition-all overflow-hidden ${isOpen ? 'border-teal-400 shadow-lg' : 'border-slate-200 shadow-sm hover:border-teal-300'}`}>
                <button onClick={() => setOpen(isOpen ? null : tool.id)} className="w-full text-left p-4 flex items-center gap-3">
                  <span className="text-3xl flex-shrink-0 rounded-xl px-2 py-1 text-white" style={{ background: tool.gradient }}>{tool.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-slate-900">{L(tool.title_vi, tool.title_en)}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">{L(tool.desc_vi, tool.desc_en)}</p>
                  </div>
                  <span className="text-slate-400 text-sm flex-shrink-0">{isOpen ? '▲' : '▼'}</span>
                </button>

                {isOpen && (
                  <div>
                    {tool.src && (
                      <>
                        <div className="bg-slate-100 border-t border-slate-200" style={{ position: 'relative', width: '100%', height: 560 }}>
                          <iframe
                            src={tool.src}
                            title={L(tool.title_vi, tool.title_en)}
                            loading="lazy"
                            allow="microphone; fullscreen; autoplay; clipboard-write"
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                          />
                        </div>
                        <div className="px-4 py-2 flex items-center justify-between flex-wrap gap-2 bg-slate-50 border-t border-slate-100">
                          <span className="text-[11px] text-slate-400 italic">{tool.credit}</span>
                          <a href={tool.src} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-teal-700 hover:text-teal-900 hover:underline">
                            {L('Mở tab mới ↗', 'Open in new tab ↗')}
                          </a>
                        </div>
                      </>
                    )}
                    {!tool.src && (
                      <div className="border-t border-slate-200 px-4 pt-3 flex items-center justify-between flex-wrap gap-2 bg-slate-50">
                        <span className="text-[11px] text-slate-400 italic">{tool.credit}</span>
                      </div>
                    )}
                    <ProblemSet tool={tool} L={L} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ───────── Vocabulary game ───────── */}
      <div>
        <h2 className="text-xl font-bold text-teal-900 mb-3">🎲 {L('Trò chơi từ vựng', 'Vocabulary game')}</h2>
        <VocabWordle lang={lang} />
      </div>

      {/* ───────── Free external links ───────── */}
      <div>
        <h2 className="text-xl font-bold text-teal-900 mb-3">🔗 {L('Học thêm miễn phí (mở tab mới)', 'More free practice (opens new tab)')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LINKS.map((lk) => (
            <a key={lk.href} href={lk.href} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white p-3 shadow-sm hover:border-teal-300 hover:shadow-md transition">
              <span className="text-2xl flex-shrink-0">{lk.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-slate-900 truncate">{L(lk.label_vi, lk.label_en)}</div>
                <div className="text-xs text-slate-500">{L(lk.note_vi, lk.note_en)}</div>
              </div>
              <span className="text-teal-500 text-sm flex-shrink-0">↗</span>
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-4 text-white shadow-md" style={{ background: 'linear-gradient(135deg,#4338ca,#0891b2)' }}>
        <div className="text-sm text-white/95">
          👨‍👩‍👧 {L('Gợi ý cho bố mẹ: mở cùng con, mỗi buổi chọn 1–2 công cụ. Ưu tiên NÓI tiếng Anh thành tiếng. Với hình học, cho con vẽ/hình dung trên GeoGebra trước rồi mới giải đề.',
                     'For parents: open with your child, pick 1–2 tools per session. Prioritise speaking English out loud. For geometry, let them visualise in GeoGebra first, then solve.')}
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 italic">
        D-043 · {L('Công cụ mã nguồn mở miễn phí (MIT / Apache-2.0) + GeoGebra nhúng · Hình học Lớp 5 nâng cao → tiền đề Lớp 6 · cho lộ trình học Tháng 7 của bé Phúc',
                   'Free open-source tools (MIT / Apache-2.0) + GeoGebra embed · Grade-5 advanced → Grade-6 geometry · for Phúc’s July study plan')}
      </div>
    </div>
  );
}
