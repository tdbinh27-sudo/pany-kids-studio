'use client';

/**
 * @file components/FashionDesignTab.tsx
 * @description Fashion Design track — Y 5t đến Phúc 11t thiết kế nhân vật
 *              + outfit + đặt vào môi trường (nhà/xe/công viên).
 *
 * D-037 candidate (2026-05-19):
 *  - Tier 1: DiceBear playground (web, no install) — Y 5t random + tweak
 *  - Tier 2: Avataaars Generator (web, SVG export) — An 9t full character builder
 *  - Tier 3: Open Peeps SVG + Figma/scene composer — Phúc 11t full creative
 *
 * Stack OSS (productize-friendly):
 *  - Open Peeps (CC0 public domain, 584,688 combinations) by Pablo Stanley
 *  - DiceBear 8.7K⭐ MIT (30+ avatar styles)
 *  - Avataaars Generator 3K⭐ MIT (React component, SVG output)
 *
 * Environments (8 scenes curated PANY): house · car · park · school ·
 *  cafe · beach · forest · classroom — SVG drag-drop into Tier 3.
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
    id: 1,
    emoji: '👶',
    age_band: 'K (5-6t)',
    kid_target: 'Y · mầm non',
    title_vi: 'Chọn nhân vật + đổi màu',
    title_en: 'Pick character + change colors',
    tools: [
      { name: 'DiceBear Playground', license: 'MIT', stars: '8.7K', type: 'web-playground' },
    ],
    what_kid_does_vi: 'Mở DiceBear, chọn style "Open Peeps" hoặc "Adventurer" · bấm nút random vài lần · chọn 1 nhân vật Y thích · save PNG vào Portfolio',
    what_kid_does_en: 'Open DiceBear, pick "Open Peeps" or "Adventurer" style · randomize · Y picks favorite · save PNG to Portfolio',
    artifact_file: 'artifacts/fashion-design-track/tier1-dicebear-guide.md',
    links: [
      { label: 'DiceBear Playground', url: 'https://www.dicebear.com/playground/' },
      { label: 'Open Peeps style', url: 'https://www.dicebear.com/styles/open-peeps/' },
    ],
  },
  {
    id: 2,
    emoji: '🧒',
    age_band: 'P (7-11t)',
    kid_target: 'An 9t · lớp 4',
    title_vi: 'Thiết kế trang phục nhân vật',
    title_en: 'Design character outfit',
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
    id: 3,
    emoji: '👨‍🎨',
    age_band: 'P+ / T (11-15t)',
    kid_target: 'Phúc 11t · lớp 6',
    title_vi: 'Cảnh nhân vật trong môi trường',
    title_en: 'Character scene with environment',
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
      { label: '8 scene SVGs', url: '/fashion-scenes/' },
    ],
  },
];

const ENVIRONMENTS = [
  { emoji: '🏠', vi: 'Nhà', en: 'House' },
  { emoji: '🚗', vi: 'Xe', en: 'Car' },
  { emoji: '🌳', vi: 'Công viên', en: 'Park' },
  { emoji: '🏫', vi: 'Trường học', en: 'School' },
  { emoji: '☕', vi: 'Quán cafe', en: 'Café' },
  { emoji: '🏖️', vi: 'Bãi biển', en: 'Beach' },
  { emoji: '🌲', vi: 'Rừng', en: 'Forest' },
  { emoji: '🚀', vi: 'Tương lai', en: 'Future' },
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
      <div className="rounded-2xl bg-gradient-to-br from-pink-900/40 via-rose-900/30 to-purple-900/20 p-6 border border-pink-500/30">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-5xl">👗</span>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {L('Thiết kế Thời trang', 'Fashion Design')}
            </h1>
            <p className="text-sm text-gray-300 mt-1">
              {L(
                'Tạo nhân vật + chọn trang phục + đặt vào môi trường · 100% mã nguồn mở CC0/MIT',
                'Create character + outfit + place in scene · 100% open source CC0/MIT'
              )}
            </p>
          </div>
        </div>
        <div className="text-xs text-rose-200 mt-2">
          💡 {L(
            'Open Peeps CC0 (public domain) · 584,688 tổ hợp · không cần xin phép, không phí · save vào Portfolio',
            'Open Peeps CC0 (public domain) · 584,688 combinations · no permission needed · save to Portfolio'
          )}
        </div>
      </div>

      {/* 3 Tier cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TIERS.map((tier) => {
          const isOpen = expandedTier === tier.id;
          return (
            <div
              key={tier.id}
              className={`rounded-xl border transition-all cursor-pointer ${
                isOpen
                  ? 'bg-white/10 border-pink-400/60 shadow-lg shadow-pink-500/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
              onClick={() => setExpandedTier(isOpen ? null : tier.id)}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{tier.emoji}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-pink-500/30 text-pink-100">
                    Tier {tier.id}
                  </span>
                </div>
                <div className="text-xs text-amber-300 font-semibold mb-1">{tier.age_band}</div>
                <div className="text-sm text-white font-bold mb-2">{tier.kid_target}</div>
                <h3 className="text-lg text-white font-bold mb-2">{L(tier.title_vi, tier.title_en)}</h3>

                <div className="flex flex-wrap gap-1 mb-3">
                  {tier.tools.map((tool) => (
                    <span
                      key={tool.name}
                      className="text-xs px-2 py-1 rounded bg-rose-500/20 text-rose-100 border border-rose-500/30"
                      title={`${tool.license}${tool.stars ? ` · ${tool.stars}⭐` : ''}`}
                    >
                      {tool.name}
                    </span>
                  ))}
                </div>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">{L('Việc kid làm:', 'What kid does:')}</div>
                      <p className="text-sm text-white">{L(tier.what_kid_does_vi, tier.what_kid_does_en)}</p>
                    </div>

                    <div>
                      <div className="text-xs text-gray-400 mb-1">{L('File hướng dẫn:', 'Guide file:')}</div>
                      <code className="text-xs text-amber-200 bg-black/30 px-2 py-1 rounded block break-all">
                        {tier.artifact_file}
                      </code>
                    </div>

                    <div>
                      <div className="text-xs text-gray-400 mb-1">{L('Liên kết:', 'Links:')}</div>
                      <div className="flex flex-wrap gap-2">
                        {tier.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-3 py-1 rounded-full bg-pink-500/20 text-pink-100 border border-pink-500/40 hover:bg-pink-500/40 transition"
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
      <div className="rounded-xl bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-500/30 p-5">
        <h2 className="text-xl font-bold text-white mb-3">
          🎬 {L('8 môi trường cảnh (Tier 3)', '8 scene environments (Tier 3)')}
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {ENVIRONMENTS.map((env) => (
            <div
              key={env.en}
              className="bg-black/20 rounded-lg p-3 border border-emerald-500/20 text-center"
            >
              <div className="text-3xl mb-1">{env.emoji}</div>
              <div className="text-xs text-emerald-200">{L(env.vi, env.en)}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-emerald-200/80">
          💡 {L(
            'Phúc kéo nhân vật vào môi trường trong Figma · export PNG kể chuyện qua hình',
            'Phúc drags character into scene in Figma · export PNG to tell a visual story'
          )}
        </div>
      </div>

      {/* Career paths */}
      <div className="rounded-xl bg-gradient-to-r from-purple-900/30 to-fuchsia-900/30 border border-purple-500/30 p-5">
        <h2 className="text-xl font-bold text-white mb-3">
          🎯 {L('4 hướng nghề Thiết kế', '4 Design Career Paths')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CAREER_PATHS.map((p) => (
            <div key={p.en} className="bg-black/20 rounded-lg p-3 border border-purple-500/20">
              <div className="text-sm font-bold text-purple-200">{L(p.vi, p.en)}</div>
              <div className="text-xs text-gray-400 mt-1">{p.salary_vn}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-purple-200/80">
          🇻🇳 {L('Brand thời trang VN tuyển:', 'VN fashion brands hiring:')} {VN_BRANDS.join(' · ')}
        </div>
      </div>

      {/* AI Agent companion box */}
      <div className="rounded-xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 p-5">
        <h2 className="text-xl font-bold text-white mb-3">
          🤖 {L('AI Agent đồng hành', 'AI Agent Companions')}
        </h2>
        <div className="space-y-2 text-sm text-indigo-100">
          <div>
            <span className="font-bold text-cyan-200">UI Designer</span> —{' '}
            {L(
              'Pattern thiết kế giao diện · color palette · typography · cho Phúc khi chuyển sang UI/UX career path',
              'UI design patterns · color palette · typography · for Phúc moving to UI/UX path'
            )}
          </div>
          <div>
            <span className="font-bold text-cyan-200">Brand Guardian</span> —{' '}
            {L(
              'Brand identity · logo design · style guide · bổ trợ khi 3 con muốn xây personal brand sớm',
              'Brand identity · logo design · style guide · for kids building personal brand'
            )}
          </div>
          <div>
            <span className="font-bold text-cyan-200">Inclusive Visuals Specialist</span> —{' '}
            {L(
              'Đại diện đa dạng · tránh stereotype · cho nhân vật/scene phản ánh thực tế VN',
              'Diverse representation · avoid stereotypes · for VN-authentic characters'
            )}
          </div>
        </div>
        <div className="mt-3 text-xs text-indigo-300/80 italic">
          {L(
            'Bố Bình route → Claude Design xử lý hình ảnh phức tạp (preference rule)',
            'Parent routes → Claude Design handles complex images (preference rule)'
          )}
        </div>
      </div>

      {/* Decision Filter badge */}
      <div className="text-center text-xs text-gray-500 italic">
        D-037 candidate · Decision Filter 4.5/5 PASS · Reviewed Mid-Year Gate 2026-06-30
      </div>
    </div>
  );
}
