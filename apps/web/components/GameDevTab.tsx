'use client';

/**
 * @file components/GameDevTab.tsx
 * @description Game Dev track — 3-tier + per-kid milestone progress tracking.
 *              D-036 (UI) + D-039 (data architecture Phase 1+2).
 *              Content from lib/gamedev-data.json (anh-editable).
 *              Progress: { [kidId]: { [milestoneId]: ISODate } } via setProgressP.
 */

import { useState } from 'react';
import bundledData from '@/lib/gamedev-data.json';
import { useContent } from '@/lib/useContent';
import {
  type TrackProgress,
  toggleProgress,
  isCompleted,
  countCompleted,
  percentComplete,
  badgeTier,
} from '@/lib/track-progress';

type Kid = { id: string; name: string; emoji?: string };
type Tier = {
  id: number; emoji: string; age_band: string; kid_target: string;
  title_vi: string; title_en: string;
  tools: { name: string; license: string; stars?: string; install: string }[];
  next_step_vi: string; next_step_en: string;
  artifact_file: string;
  links: { label: string; url: string }[];
  milestones: { id: string; label_vi: string; label_en: string }[];
};

type Props = {
  lang: 'vi' | 'en';
  kids?: Kid[];
  activeKidId?: string | null;
  progress?: TrackProgress;
  setProgressP?: (v: TrackProgress) => void;
};

type GamedevPayload = typeof bundledData;

export default function GameDevTab({ lang, kids = [], activeKidId = null, progress = {}, setProgressP }: Props) {
  const [expandedTier, setExpandedTier] = useState<number | null>(2);
  const L = (vi: string, en: string) => (lang === 'vi' ? vi : en);

  // D-040: fetch live content from Supabase (falls back to bundled JSON)
  const { data } = useContent<GamedevPayload>('gamedev');
  const TIERS = (data.tiers as Tier[]) || [];
  const ALL_MILESTONE_IDS = TIERS.flatMap((t) => t.milestones.map((m) => m.id));

  const activeKid = kids.find((k) => k.id === activeKidId);
  const totalDone = countCompleted(progress, activeKidId, ALL_MILESTONE_IDS);
  const totalPct = percentComplete(progress, activeKidId, ALL_MILESTONE_IDS);
  const badge = badgeTier(totalDone);

  const handleToggle = (milestoneId: string) => {
    if (!activeKidId || !setProgressP) return;
    setProgressP(toggleProgress(progress, activeKidId, milestoneId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl p-6 text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #845EC2 100%)' }}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-5xl">🎮</span>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">{L('Lập trình Game', 'Game Development')}</h1>
            <p className="text-sm text-white/90 mt-1">
              {L('Khám phá nghề Game Dev từ 5 tuổi đến 15 tuổi · 100% miễn phí mã nguồn mở', 'Explore Game Dev career age 5-15 · 100% free open source')}
            </p>
          </div>
        </div>

        {/* Per-kid progress bar */}
        {activeKid ? (
          <div className="mt-4 bg-white/15 backdrop-blur rounded-xl p-3 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-white">
                {badge.emoji} {activeKid.name} · {totalDone}/{ALL_MILESTONE_IDS.length} {L('mốc', 'milestones')} · {L(badge.label_vi, badge.label_en)}
              </span>
              <span className="text-xs text-white/90 font-semibold">{totalPct}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-amber-300 transition-all" style={{ width: `${totalPct}%` }} />
            </div>
          </div>
        ) : (
          <div className="mt-3 text-xs text-amber-100 font-semibold">
            💡 {L('Chọn học viên (tab Học viên) để theo dõi tiến độ riêng', 'Pick a student (Kids tab) to track per-kid progress')}
          </div>
        )}
      </div>

      {/* 3 Tier cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TIERS.map((tier) => {
          const isOpen = expandedTier === tier.id;
          const tierMilestoneIds = tier.milestones.map((m) => m.id);
          const tierDone = countCompleted(progress, activeKidId, tierMilestoneIds);
          const tierPct = percentComplete(progress, activeKidId, tierMilestoneIds);

          return (
            <div
              key={tier.id}
              className={`rounded-xl border-2 transition-all cursor-pointer bg-white ${
                isOpen ? 'border-pink-400 shadow-xl shadow-pink-200/60 scale-[1.01]' : 'border-purple-200 hover:border-pink-300 shadow-md hover:shadow-lg'
              }`}
              onClick={() => setExpandedTier(isOpen ? null : tier.id)}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{tier.emoji}</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-purple-600 text-white font-bold">Tier {tier.id}</span>
                </div>
                <div className="text-xs text-amber-700 font-bold mb-1 uppercase tracking-wide">{tier.age_band}</div>
                <div className="text-sm text-purple-700 font-bold mb-2">{tier.kid_target}</div>
                <h3 className="text-lg text-slate-900 font-bold mb-3">{L(tier.title_vi, tier.title_en)}</h3>

                <div className="flex flex-wrap gap-1 mb-3">
                  {tier.tools.map((tool) => (
                    <span key={tool.name} className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-800 border border-pink-300 font-semibold" title={`${tool.license}${tool.stars ? ` · ${tool.stars}⭐` : ''}`}>
                      {tool.name}{tool.install === 'preinstalled' && ' ✅'}
                    </span>
                  ))}
                </div>

                {/* Per-tier progress mini-bar */}
                {activeKid && (
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-600 font-bold">{tierDone}/{tier.milestones.length} {L('mốc', 'done')}</span>
                      <span className="text-xs text-purple-700 font-bold">{tierPct}%</span>
                    </div>
                    <div className="h-1.5 bg-purple-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all" style={{ width: `${tierPct}%` }} />
                    </div>
                  </div>
                )}

                {isOpen && (
                  <div className="mt-4 pt-4 border-t-2 border-purple-100 space-y-3">
                    <div>
                      <div className="text-xs text-purple-600 font-bold uppercase tracking-wide mb-1">{L('Bước tiếp theo:', 'Next step:')}</div>
                      <p className="text-sm text-slate-800 leading-relaxed">{L(tier.next_step_vi, tier.next_step_en)}</p>
                    </div>

                    {/* Milestones with checkboxes */}
                    {activeKid && (
                      <div>
                        <div className="text-xs text-purple-600 font-bold uppercase tracking-wide mb-2">{L('Mốc của', 'Milestones for')} {activeKid.name}:</div>
                        <div className="space-y-1">
                          {tier.milestones.map((m) => {
                            const done = isCompleted(progress, activeKidId, m.id);
                            return (
                              <button
                                key={m.id}
                                onClick={(e) => { e.stopPropagation(); handleToggle(m.id); }}
                                className={`w-full text-left flex items-start gap-2 px-3 py-2 rounded-lg border transition ${
                                  done ? 'bg-green-50 border-green-300 hover:bg-green-100' : 'bg-slate-50 border-slate-200 hover:bg-purple-50 hover:border-purple-300'
                                }`}
                              >
                                <span className="text-lg flex-shrink-0">{done ? '✅' : '⬜'}</span>
                                <span className={`text-xs leading-snug ${done ? 'text-green-800 font-semibold' : 'text-slate-700'}`}>
                                  {L(m.label_vi, m.label_en)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="text-xs text-purple-600 font-bold uppercase tracking-wide mb-1">{L('File hướng dẫn:', 'Guide file:')}</div>
                      <code className="text-xs text-purple-900 bg-purple-50 border border-purple-200 px-2 py-1 rounded block break-all font-mono">{tier.artifact_file}</code>
                    </div>

                    <div>
                      <div className="text-xs text-purple-600 font-bold uppercase tracking-wide mb-2">{L('Liên kết:', 'Links:')}</div>
                      <div className="flex flex-wrap gap-2">
                        {tier.links.map((link) => (
                          <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                            className="text-xs px-3 py-1.5 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 hover:shadow-md transition"
                            onClick={(e) => e.stopPropagation()}>
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

      {/* Careers */}
      <div className="rounded-xl p-5 text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)' }}>
        <h2 className="text-xl font-bold mb-3 text-white">🎯 {L('4 hướng nghề Game Dev', '4 Game Dev Career Paths')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.careers.map((p) => (
            <div key={p.en} className="bg-white/95 rounded-lg p-3 border border-white/50 shadow-sm">
              <div className="text-sm font-bold text-emerald-800">{L(p.vi, p.en)}</div>
              <div className="text-xs text-slate-700 mt-1 font-medium">{p.salary_vn}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-white/95 font-medium">
          🇻🇳 {L('Studio VN tuyển:', 'VN studios hiring:')} {data.vn_studios.join(' · ')}
        </div>
      </div>

      {/* AI Agents */}
      <div className="rounded-xl p-5 text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
        <h2 className="text-xl font-bold mb-3 text-white">🤖 {L('AI Agent đồng hành', 'AI Agent Companions')}</h2>
        <div className="space-y-2 text-sm text-white/95">
          {data.ai_agents.map((a) => (
            <div key={a.name}>
              <span className="font-bold text-amber-200">{a.name}</span> — {L(a.desc_vi, a.desc_en)}
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-white/80 italic">
          {L('Bố Bình route · Claude 18+ rule áp dụng', 'Parent routes · Claude 18+ rule applies')}
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 italic">
        D-036 + D-039 · Data from lib/gamedev-data.json · Mid-Year Gate 2026-06-30
      </div>
    </div>
  );
}
