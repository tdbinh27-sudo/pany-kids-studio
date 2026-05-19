'use client';

/**
 * @file components/GameDevTab.tsx
 * @description Game Development track tab — 3 tier progression (Y mầm non → An lớp 4 → Phúc lớp 6)
 *              for kids to explore Game Dev career via real industry tools.
 *
 * D-036 candidate (2026-05-19):
 *  - Tier 1: Scratch (web, no install) — Y 5t parent-supervised
 *  - Tier 2: Kaboom/KaPlay (browser HTML) — An 9t intro coding
 *  - Tier 3: Godot 4 + Pygame + Blender — Phúc 11t full stack
 *
 * Companion AI agents in ~/.claude/agents/:
 *  - unity-architect (game architecture patterns)
 *  - blender-addon-engineer (3D asset pipeline)
 *
 * All tooling: $0 MIT-licensed open source. Files in artifacts/game-dev-track/.
 */

import { useState } from 'react';

type Tier = {
  id: 1 | 2 | 3;
  emoji: string;
  age_band: string;
  kid_target: string;
  title_vi: string;
  title_en: string;
  tools: { name: string; license: string; stars?: string; install: 'web' | 'pip' | 'download' | 'preinstalled' }[];
  next_step_vi: string;
  next_step_en: string;
  artifact_file: string;
  links: { label: string; url: string }[];
};

const TIERS: Tier[] = [
  {
    id: 1,
    emoji: '🌱',
    age_band: 'K (5-6t)',
    kid_target: 'Y · mầm non',
    title_vi: 'Khám phá lập trình block',
    title_en: 'Block-based discovery',
    tools: [
      { name: 'Scratch 3.0', license: 'MIT', stars: '4.8K', install: 'web' },
    ],
    next_step_vi: 'Bố mở scratch.mit.edu cùng Y · kéo block "cờ xanh + di chuyển" · 15 phút',
    next_step_en: 'Parent opens scratch.mit.edu with Y · drag green-flag + move blocks · 15 min',
    artifact_file: 'artifacts/game-dev-track/scratch-track.md',
    links: [
      { label: 'Scratch Editor', url: 'https://scratch.mit.edu/projects/editor/' },
      { label: 'Scratch Jr (iPad)', url: 'https://www.scratchjr.org/' },
    ],
  },
  {
    id: 2,
    emoji: '🌿',
    age_band: 'P (7-11t)',
    kid_target: 'An 9t · lớp 4',
    title_vi: 'Làm game đầu tiên với JavaScript',
    title_en: 'First game with JavaScript',
    tools: [
      { name: 'Kaboom/KaPlay', license: 'MIT', stars: '2.7K', install: 'web' },
    ],
    next_step_vi: 'Mở file kaboom-starter.html trong browser · game chạy ngay · An đổi màu/gravity trong Notepad',
    next_step_en: 'Open kaboom-starter.html in browser · game runs · An tweaks color/gravity in Notepad',
    artifact_file: 'artifacts/game-dev-track/kaboom-starter.html',
    links: [
      { label: 'KaPlay Playground', url: 'https://kaplayjs.com/play' },
      { label: 'Kaboom Docs', url: 'https://kaboomjs.com/' },
    ],
  },
  {
    id: 3,
    emoji: '🌳',
    age_band: 'P+ / T (11-15t)',
    kid_target: 'Phúc 11t · lớp 6',
    title_vi: 'Game thật với Godot, Pygame, Blender',
    title_en: 'Real games with Godot, Pygame, Blender',
    tools: [
      { name: 'Godot 4.6', license: 'MIT', stars: '111K', install: 'download' },
      { name: 'Pygame-CE', license: 'LGPL', install: 'preinstalled' },
      { name: 'Blender', license: 'GPL', install: 'preinstalled' },
    ],
    next_step_vi: 'Phúc chạy pygame-hello.py (đã cài) · sau đó cài Godot từ link bố cung cấp · build Lava Floor game',
    next_step_en: 'Phúc runs pygame-hello.py (installed) · then installs Godot via parent link · builds Lava Floor',
    artifact_file: 'artifacts/game-dev-track/godot-first-game.md',
    links: [
      { label: 'Godot Download', url: 'https://godotengine.org/download/windows/' },
      { label: 'GDQuest Tutorials', url: 'https://www.gdquest.com/' },
      { label: 'Itch.io (publish)', url: 'https://itch.io/' },
    ],
  },
];

const CAREER_PATHS = [
  { vi: 'Indie Game Developer', en: 'Indie Game Dev', salary_vn: '15-30tr/m junior · 40-80tr/m senior' },
  { vi: 'Game Designer', en: 'Game Designer', salary_vn: '20-50tr/m mid · AAA studio' },
  { vi: 'Technical Artist', en: 'Tech Artist', salary_vn: '30-80tr/m · Blender/Maya/Unity pipeline' },
  { vi: 'Game Programmer', en: 'Game Programmer', salary_vn: 'C++/C# 40-100tr/m senior · VNG/Sky Mavis/Wolffun' },
];

const VN_STUDIOS = ['VNG', 'Sky Mavis (Axie Infinity)', 'Wolffun (Tank Heroes)', 'Topebox', 'Hiker Games', 'Sparx*'];

type Props = {
  lang: 'vi' | 'en';
  t?: Record<string, string>;
  L?: (vi: string, en: string) => string;
};

export default function GameDevTab({ lang }: Props) {
  const [expandedTier, setExpandedTier] = useState<1 | 2 | 3 | null>(2);
  const L = (vi: string, en: string) => (lang === 'vi' ? vi : en);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-amber-900/20 p-6 border border-purple-500/30">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-5xl">🎮</span>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {L('Lập trình Game', 'Game Development')}
            </h1>
            <p className="text-sm text-gray-300 mt-1">
              {L(
                'Khám phá nghề Game Dev từ 5 tuổi đến 15 tuổi · Tools studio thật · 100% miễn phí mã nguồn mở',
                'Explore Game Dev career age 5-15 · Real industry tools · 100% free open source'
              )}
            </p>
          </div>
        </div>
        <div className="text-xs text-amber-200 mt-2">
          💡 {L(
            'Bố Bình mentor — Claude AI agent (Unity Architect + Blender Add-on Engineer) hỗ trợ khi cần',
            'Parent mentors — Claude AI agents assist when needed'
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
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-500/30 text-purple-100">
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
                      className="text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-100 border border-cyan-500/30"
                      title={`${tool.license}${tool.stars ? ` · ${tool.stars}⭐` : ''}`}
                    >
                      {tool.name}
                      {tool.install === 'preinstalled' && ' ✅'}
                    </span>
                  ))}
                </div>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">{L('Bước tiếp theo:', 'Next step:')}</div>
                      <p className="text-sm text-white">{L(tier.next_step_vi, tier.next_step_en)}</p>
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

      {/* Career paths */}
      <div className="rounded-xl bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-500/30 p-5">
        <h2 className="text-xl font-bold text-white mb-3">
          🎯 {L('4 hướng nghề Game Dev', '4 Game Dev Career Paths')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CAREER_PATHS.map((p) => (
            <div key={p.en} className="bg-black/20 rounded-lg p-3 border border-emerald-500/20">
              <div className="text-sm font-bold text-emerald-200">{L(p.vi, p.en)}</div>
              <div className="text-xs text-gray-400 mt-1">{p.salary_vn}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-emerald-200/80">
          🇻🇳 {L('Studio VN tuyển:', 'VN studios hiring:')} {VN_STUDIOS.join(' · ')}
        </div>
      </div>

      {/* AI Agent companion box */}
      <div className="rounded-xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 p-5">
        <h2 className="text-xl font-bold text-white mb-3">
          🤖 {L('AI Agent đồng hành', 'AI Agent Companions')}
        </h2>
        <div className="space-y-2 text-sm text-indigo-100">
          <div>
            <span className="font-bold text-cyan-200">Unity Architect</span> —{' '}
            {L(
              'Pattern game architecture (state machine, component composition) — dùng khi Phúc 12t+ chuyển Unity',
              'Game architecture patterns — when Phúc 12t+ moves to Unity'
            )}
          </div>
          <div>
            <span className="font-bold text-cyan-200">Blender Add-on Engineer</span> —{' '}
            {L(
              '3D asset pipeline, Python add-ons, exporters — bổ trợ Blender (đã cài ✅)',
              '3D asset pipeline, Python add-ons — complements Blender (installed ✅)'
            )}
          </div>
        </div>
        <div className="mt-3 text-xs text-indigo-300/80 italic">
          {L(
            'Bố Bình route — Claude 18+ rule áp dụng (con không chat trực tiếp Claude)',
            'Parent routes — Claude 18+ rule applies (kids do not chat Claude directly)'
          )}
        </div>
      </div>

      {/* Decision Filter badge */}
      <div className="text-center text-xs text-gray-500 italic">
        D-036 candidate · Decision Filter 5/5 PASS · Reviewed Mid-Year Gate 2026-06-30
      </div>
    </div>
  );
}
