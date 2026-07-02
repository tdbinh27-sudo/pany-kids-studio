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
 */

import { useState } from 'react';
import VocabWordle from '@/components/VocabWordle';

type Lang = 'vi' | 'en';
type Props = { lang: Lang };

type Tool = {
  id: string;
  emoji: string;
  title_vi: string; title_en: string;
  desc_vi: string; desc_en: string;
  src: string;
  gradient: string;
  credit: string;
};

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
    title_vi: 'Hình Học 3D', title_en: '3D Geometry',
    desc_vi: 'Xoay, cắt lát & dựng khối 3D với GeoGebra — làm hình học “sờ được”.',
    desc_en: 'Rotate, slice & build 3D shapes with GeoGebra.',
    src: 'https://www.geogebra.org/3d',
    gradient: 'linear-gradient(135deg,#00BFFF,#4FB3E8)',
    credit: 'GeoGebra · nhúng miễn phí',
  },
  {
    id: 'geo2d', emoji: '🔷',
    title_vi: 'Hình Học Phẳng', title_en: '2D Geometry',
    desc_vi: 'Vẽ điểm, đường thẳng, góc động — đúng nội dung hình lớp 6.',
    desc_en: 'Draw points, lines and angles dynamically.',
    src: 'https://www.geogebra.org/geometry',
    gradient: 'linear-gradient(135deg,#00D4AA,#00BFFF)',
    credit: 'GeoGebra · nhúng miễn phí',
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
              {L('Công cụ tương tác miễn phí cho tháng 7 — luyện nói tiếng Anh, gõ phím, và hình học 3D ngay trong app. Bấm mở từng thẻ để chơi.',
                 'Free interactive tools for July — English speaking, typing and 3D geometry, right in the app. Tap a card to play.')}
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
          👨‍👩‍👧 {L('Gợi ý cho bố mẹ: mở cùng con, mỗi buổi chọn 1–2 công cụ. Ưu tiên NÓI tiếng Anh thành tiếng.',
                     'For parents: open with your child, pick 1–2 tools per session. Prioritise speaking English out loud.')}
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 italic">
        D-043 · {L('Công cụ mã nguồn mở miễn phí (MIT / Apache-2.0) + GeoGebra nhúng · cho lộ trình học Tháng 7 của bé Phúc',
                   'Free open-source tools (MIT / Apache-2.0) + GeoGebra embed · for Phúc’s July study plan')}
      </div>
    </div>
  );
}
