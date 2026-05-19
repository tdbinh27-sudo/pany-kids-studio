'use client';

/**
 * @file components/FashionDesignTab.tsx
 * @description Fashion Design track — character + outfit + environment scene.
 * D-037 candidate (2026-05-19). LIGHT theme matching Kids Studio palette.
 */

import { useState } from 'react';

type FashionTier = {
  id: 1 | 2 | 3;
  emoji: string;
  age_band: string;
  kid_target: string;
  title_vi: string;
  title_en: string;
  tools: { name: string; license: string; stars?: string; type: 'web-playground' | 'svg-asset' | 'figma-asset' }[];
  what_kid_does_vi: string;
  what_kid_does_en: string;
  artifact_file: string;
  links: { label: string; url: string }[];
};

const TIERS: FashionTier[] = [
  {
    id: 1, emoji: '👶', age_band: 'K (5-6t)', kid_target: 'Y · mầm non',
    title_vi: 'Chọn nhân vật + đổi màu', title_en: 'Pick character + change colors',
    tools: [{ name: 'DiceBear Playground', license: 'MIT', stars: '8.7K', type: 'web-playground' }],
    what_kid_does_vi: 'Mở DiceBear, chọn style "Open Peeps" hoặc "Adventurer" · bấm nút random vài lần · chọn 1 nhân vật Y thích · save PNG vào Portfolio',
    what_kid_does_en: 'Open DiceBear, pick "Open Peeps" or "Adventurer" style · randomize · Y picks favorite · save PNG to Portfolio',
    artifact_file: 'artifacts/fashion-design-track/tier1-dicebear-guide.md',
    links: [
      { label: 'DiceBear Playground', url: 'https://www.dicebear.com/playground/' },
      { label: 'Open Peeps style', url: 'https://www.dicebear.com/styles/open-peeps/' },
    ],
  },
  {
    id: 2, emoji: '🧒', age_band: 'P (7-11t)', kid_target: 'An 9t · lớp 4',
    title_vi: 'Thiết kế trang phục nhân vật', title_en: 'Design character outfit',
    tools: [
      { name: 'Avataaars Generator', license: 'MIT', stars: '3K', type: 'web-playground' },
      { name: 'DiceBear', license: 'MIT', stars: '8.7K', type: 'web-playground' },
    ],
    what_kid_does_vi: 'Mở getavataaars.com · chọn tóc, quần áo, phụ kiện, biểu cảm · download SVG · An có thể tạo 5 nhân vật cho family (bố/mẹ/3 anh em) · save vào Portfolio',
    what_kid_does_en: 'Open getavataaars.com · pick hair, clothes, accessories, expression · download SVG · An creates 5 family avatars · save to Portfolio',
    artifact_file: 'artifacts/fashion-design-track/tier2-avataaars-guide.md',
    links: [
      { label: 'Avataaars Generator', url: 'https://getavataaars.com/' },
      { label: 'GitHub source', url: 'https://github.com/fangpenlin/avataaars-generator' },
    ],
  },
  {
    id: 3, emoji: '👨‍🎨', age_band: 'P+ / T (11-15t)', kid_target: 'Phúc 11t · lớp 6',
    title_vi: 'Cảnh nhân vật trong môi trường', title_en: 'Character scene with environment',
    tools: [
      { name: 'Open Peeps', license: 'CC0 public domain', type: 'svg-asset' },
      { name: 'Figma free', license: 'Free tier', type: 'figma-asset' },
      { name: 'PANY scene backdrops', license: 'CC0 (anh-curated)', type: 'svg-asset' },
    ],
    what_kid_does_vi: 'Tải Open Peeps SVG (584K combinations) · mở Figma free · kéo nhân vật + outfit + scene (nhà/xe/công viên/trường/cafe/bãi biển/rừng/lớp học) · export PNG → Portfolio',
    what_kid_does_en: 'Download Open Peeps SVG · open Figma free · drag character + outfit + scene · export PNG → Portfolio',
    artifact_file: 'artifacts/fashion-design-track/tier3-figma-scene-guide.md',
    links: [
      { label: 'Open Peeps (CC0)', url: 'https://www.openpeeps.com/' },
      { label: 'Figma free signup', url: 'https://www.figma.com/' },
    ],
  },
];

const ENVIRONMENTS = [
  { emoji: '🏠', vi: 'Nhà', en: 'House' }, { emoji: '🚗', vi: 'Xe', en: 'Car' },
  { emoji: '🌳', vi: 'Công viên', en: 'Park' }, { emoji: '🏫', vi: 'Trường học', en: 'School' },
  { emoji: '☕', vi: 'Quán cafe', en: 'Café' }, { emoji: '🏖️', vi: 'Bãi biển', en: 'Beach' },
  { emoji: '🌲', vi: 'Rừng', en: 'Forest' }, { emoji: '🚀', vi: 'Tương lai', en: 'Future' },
];

const CAREER_PATHS = [
  { vi: 'Fashion Designer', en: 'Fashion Designer', salary_vn: '20-50tr/m mid · 100tr+ senior brand · Local + Zara/H&M VN' },
  { vi: 'Costume Designer', en: 'Costume Designer', salary_vn: '15-40tr/m · Phim/TV/Sân khấu · VFC/HK Film' },
  { vi: 'Character Illustrator', en: 'Character Illustrator', salary_vn: '15-60tr/m · Game/Animation/Book · VNG/Colorful/POPS' },
  { vi: 'UI/UX Designer', en: 'UI/UX Designer', salary_vn: '20-80tr/m · Tech VN siêu hot · MoMo/Tiki/Shopee/VNG' },
];

const VN_BRANDS = ['Canifa', 'IVY moda', 'Yody', 'Coolmate', 'Routine', 'Owen', 'Elise', 'Saigon Garment'];

type Props = {
  lang: 'vi' | 'en';
  t?: Record<string, string>;
  L?: (vi: string, en: string) => string;
};

export default function FashionDesignTab({ lang }: Props) {
  const [expandedTier, setExpandedTier] = useState<1 | 2 | 3 | null>(2);
  const L = (vi: string, en: string) => (lang === 'vi' ? vi : en);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="rounded-2xl p-6 text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #EC4899 0%, #BE185D 50%, #9333EA 100%)' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-5xl">👗</span>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {L('Thiết kế Thời trang', 'Fashion Design')}
            </h1>
            <p className="text-sm text-white/90 mt-1">
              {L('Tạo nhân vật + chọn trang phục + đặt vào môi trường · 100% mã nguồn mở CC0/MIT',
                'Create character + outfit + place in scene · 100% open source CC0/MIT')}
            </p>
          </div>
        </div>
        <div className="text-sm text-amber-100 mt-2 font-semibold">
          💡 {L('Open Peeps CC0 (public domain) · 584,688 tổ hợp · không cần xin phép, không phí',
            'Open Peeps CC0 (public domain) · 584,688 combinations · no permission needed')}
        </div>
      </div>

      {/* 3 Tier cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TIERS.map((tier) => {
          const isOpen = expandedTier === tier.id;
          return (
            <div
              key={tier.id}
              className={`rounded-xl border-2 transition-all cursor-pointer bg-white ${
                isOpen
                  ? 'border-pink-400 shadow-xl shadow-pink-200/60 scale-[1.01]'
                  : 'border-pink-200 hover:border-pink-300 shadow-md hover:shadow-lg'
              }`}
              onClick={() => setExpandedTier(isOpen ? null : tier.id)}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{tier.emoji}</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-pink-600 text-white font-bold">
                    Tier {tier.id}
                  </span>
                </div>
                <div className="text-xs text-amber-700 font-bold mb-1 uppercase tracking-wide">{tier.age_band}</div>
                <div className="text-sm text-pink-700 font-bold mb-2">{tier.kid_target}</div>
                <h3 className="text-lg text-slate-900 font-bold mb-3">{L(tier.title_vi, tier.title_en)}</h3>

                <div className="flex flex-wrap gap-1 mb-3">
                  {tier.tools.map((tool) => (
                    <span
                      key={tool.name}
                      className="text-xs px-2 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300 font-semibold"
                      title={`${tool.license}${tool.stars ? ` · ${tool.stars}⭐` : ''}`}
                    >
                      {tool.name}
                    </span>
                  ))}
                </div>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t-2 border-pink-100 space-y-3">
                    <div>
                      <div className="text-xs text-pink-600 font-bold uppercase tracking-wide mb-1">{L('Việc kid làm:', 'What kid does:')}</div>
                      <p className="text-sm text-slate-800 leading-relaxed">{L(tier.what_kid_does_vi, tier.what_kid_does_en)}</p>
                    </div>

                    <div>
                      <div className="text-xs text-pink-600 font-bold uppercase tracking-wide mb-1">{L('File hướng dẫn:', 'Guide file:')}</div>
                      <code className="text-xs text-pink-900 bg-pink-50 border border-pink-200 px-2 py-1 rounded block break-all font-mono">
                        {tier.artifact_file}
                      </code>
                    </div>

                    <div>
                      <div className="text-xs text-pink-600 font-bold uppercase tracking-wide mb-2">{L('Liên kết:', 'Links:')}</div>
                      <div className="flex flex-wrap gap-2">
                        {tier.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-3 py-1.5 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 hover:shadow-md transition"
                            onClick={(e) => e.stopPropagation()}
                          >
                            🔗 {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Environments grid */}
      <div
        className="rounded-xl p-5 text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #059669 0%, #0D9488 100%)' }}
      >
        <h2 className="text-xl font-bold mb-3 text-white">
          🎬 {L('8 môi trường cảnh (Tier 3)', '8 scene environments (Tier 3)')}
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {ENVIRONMENTS.map((env) => (
            <div
              key={env.en}
              className="bg-white/95 rounded-lg p-3 border border-white/50 text-center shadow-sm"
            >
              <div className="text-3xl mb-1">{env.emoji}</div>
              <div className="text-xs font-bold text-emerald-800">{L(env.vi, env.en)}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-white/95 font-medium">
          💡 {L('Phúc kéo nhân vật vào môi trường trong Figma · export PNG kể chuyện qua hình',
            'Phúc drags character into scene in Figma · export PNG to tell a visual story')}
        </div>
      </div>

      {/* Career paths */}
      <div
        className="rounded-xl p-5 text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #9333EA 0%, #C026D3 100%)' }}
      >
        <h2 className="text-xl font-bold mb-3 text-white">
          🎯 {L('4 hướng nghề Thiết kế', '4 Design Career Paths')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CAREER_PATHS.map((p) => (
            <div key={p.en} className="bg-white/95 rounded-lg p-3 border border-white/50 shadow-sm">
              <div className="text-sm font-bold text-purple-800">{L(p.vi, p.en)}</div>
              <div className="text-xs text-slate-700 mt-1 font-medium">{p.salary_vn}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-white/95 font-medium">
          🇻🇳 {L('Brand thời trang VN tuyển:', 'VN fashion brands hiring:')} {VN_BRANDS.join(' · ')}
        </div>
      </div>

      {/* AI Agent companion box */}
      <div
        className="rounded-xl p-5 text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}
      >
        <h2 className="text-xl font-bold mb-3 text-white">
          🤖 {L('AI Agent đồng hành', 'AI Agent Companions')}
        </h2>
        <div className="space-y-2 text-sm text-white/95">
          <div>
            <span className="font-bold text-amber-200">UI Designer</span> —{' '}
            {L('Pattern thiết kế giao diện · color palette · typography · cho Phúc khi chuyển UI/UX',
              'UI design patterns · color palette · typography · for Phúc moving to UI/UX path')}
          </div>
          <div>
            <span className="font-bold text-amber-200">Brand Guardian</span> —{' '}
            {L('Brand identity · logo design · style guide · bổ trợ khi 3 con xây personal brand',
              'Brand identity · logo design · style guide · for kids building personal brand')}
          </div>
          <div>
            <span className="font-bold text-amber-200">Inclusive Visuals Specialist</span> —{' '}
            {L('Đại diện đa dạng · tránh stereotype · cho nhân vật/scene phản ánh thực tế VN',
              'Diverse representation · avoid stereotypes · for VN-authentic characters')}
          </div>
        </div>
        <div className="mt-3 text-xs text-white/80 italic">
          {L('Bố Bình route → Claude Design xử lý hình ảnh phức tạp',
            'Parent routes → Claude Design handles complex images')}
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 italic">
        D-037 · Decision Filter 4.5/5 PASS · Mid-Year Gate 2026-06-30
      </div>
    </div>
  );
}
