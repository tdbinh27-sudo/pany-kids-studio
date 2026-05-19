'use client';

/**
 * @file components/STEMTab.tsx
 * @description STEM Lab — 6 subjects × 3 sims + per-kid sim completion tracking.
 *              D-038 (UI) + D-039 (data architecture Phase 1+2).
 *              Content from lib/stem-data.json (anh-editable).
 *              Progress key = phet_slug (sim done by kid).
 */

import { useState } from 'react';
import bundledData from '@/lib/stem-data.json';
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
type STEMSubject = {
  id: string; emoji: string; title_vi: string; title_en: string;
  age_recommend: string; pillar_match: string;
  career_intro_vi: string; career_intro_en: string;
  simulations: { name_vi: string; name_en: string; phet_slug: string; age: string }[];
};

type Props = {
  lang: 'vi' | 'en';
  kids?: Kid[];
  activeKidId?: string | null;
  progress?: TrackProgress;
  setProgressP?: (v: TrackProgress) => void;
};

type StemPayload = typeof bundledData;

const phetUrl = (slug: string, lang: 'vi' | 'en') => `https://phet.colorado.edu/${lang}/simulations/${slug}`;

export default function STEMTab({ lang, kids = [], activeKidId = null, progress = {}, setProgressP }: Props) {
  const [expandedSubject, setExpandedSubject] = useState<string | null>('math');
  const L = (vi: string, en: string) => (lang === 'vi' ? vi : en);

  // D-040: fetch live content from Supabase (falls back to bundled JSON)
  const { data } = useContent<StemPayload>('stem');
  const SUBJECTS = (data.subjects as STEMSubject[]) || [];
  const ALL_SIM_SLUGS = SUBJECTS.flatMap((s) => s.simulations.map((sim) => sim.phet_slug));

  const activeKid = kids.find((k) => k.id === activeKidId);
  const totalDone = countCompleted(progress, activeKidId, ALL_SIM_SLUGS);
  const totalPct = percentComplete(progress, activeKidId, ALL_SIM_SLUGS);
  const badge = badgeTier(totalDone);

  const handleToggle = (slug: string) => {
    if (!activeKidId || !setProgressP) return;
    setProgressP(toggleProgress(progress, activeKidId, slug));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl p-6 text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #0891B2 0%, #1E40AF 50%, #4F46E5 100%)' }}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-5xl">🔬</span>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">{L('Phòng thí nghiệm STEM', 'STEM Lab')}</h1>
            <p className="text-sm text-white/90 mt-1">
              {L('125+ thí nghiệm tương tác · 6 môn · ✅ tiếng Việt', '125+ interactive simulations · 6 subjects · ✅ Vietnamese supported')}
            </p>
          </div>
        </div>

        {activeKid ? (
          <div className="mt-4 bg-white/15 backdrop-blur rounded-xl p-3 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-white">
                {badge.emoji} {activeKid.name} · {totalDone}/{ALL_SIM_SLUGS.length} {L('thí nghiệm', 'sims')} · {L(badge.label_vi, badge.label_en)}
              </span>
              <span className="text-xs text-white/90 font-semibold">{totalPct}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-amber-300 transition-all" style={{ width: `${totalPct}%` }} />
            </div>
          </div>
        ) : (
          <div className="mt-3 text-xs text-amber-100 font-semibold">
            💡 {L('Chọn học viên (tab Học viên) để theo dõi sim đã làm', 'Pick a student (Kids tab) to track completed sims')}
          </div>
        )}
      </div>

      {/* 6 subject cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SUBJECTS.map((subject) => {
          const isOpen = expandedSubject === subject.id;
          const subjectSlugs = subject.simulations.map((s) => s.phet_slug);
          const subjectDone = countCompleted(progress, activeKidId, subjectSlugs);
          const subjectPct = percentComplete(progress, activeKidId, subjectSlugs);

          return (
            <div
              key={subject.id}
              className={`rounded-xl border-2 transition-all cursor-pointer bg-white ${
                isOpen ? 'border-cyan-400 shadow-xl shadow-cyan-200/60 scale-[1.01]' : 'border-cyan-200 hover:border-cyan-300 shadow-md hover:shadow-lg'
              }`}
              onClick={() => setExpandedSubject(isOpen ? null : subject.id)}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{subject.emoji}</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-600 text-white font-bold">{subject.age_recommend}</span>
                </div>
                <h3 className="text-xl text-slate-900 font-bold mb-1">{L(subject.title_vi, subject.title_en)}</h3>
                <div className="text-xs text-amber-700 font-bold mb-2 uppercase tracking-wide">
                  {L('Trụ cột:', 'Pillar:')} {subject.pillar_match}
                </div>
                <p className="text-xs text-slate-600 italic mb-3">{L(subject.career_intro_vi, subject.career_intro_en)}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300 font-semibold">
                    {subject.simulations.length} {L('thí nghiệm', 'sims')}
                  </span>
                </div>

                {activeKid && (
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-600 font-bold">{subjectDone}/{subject.simulations.length} {L('đã làm', 'done')}</span>
                      <span className="text-xs text-cyan-700 font-bold">{subjectPct}%</span>
                    </div>
                    <div className="h-1.5 bg-cyan-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all" style={{ width: `${subjectPct}%` }} />
                    </div>
                  </div>
                )}

                {isOpen && (
                  <div className="mt-4 pt-4 border-t-2 border-cyan-100 space-y-2">
                    {subject.simulations.map((sim) => {
                      const done = isCompleted(progress, activeKidId, sim.phet_slug);
                      return (
                        <div key={sim.phet_slug} className={`rounded-lg border-2 transition ${done ? 'bg-green-50 border-green-300' : 'bg-cyan-50 border-cyan-200'}`}>
                          <a
                            href={phetUrl(sim.phet_slug, lang)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`text-sm font-semibold ${done ? 'text-green-800' : 'text-slate-900'}`}>
                                {done && '✅ '}{L(sim.name_vi, sim.name_en)}
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold flex-shrink-0">
                                {sim.age === 'K' ? L('5-6t', 'K') : sim.age === 'P' ? L('7-11t', 'P') : L('12-15t', 'T')}
                              </span>
                            </div>
                            <div className="text-xs text-cyan-700 mt-1 font-medium">🔗 PhET → mở tab mới</div>
                          </a>
                          {activeKid && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleToggle(sim.phet_slug); }}
                              className={`w-full text-xs py-1.5 font-semibold border-t-2 transition ${
                                done
                                  ? 'bg-green-100 border-green-300 text-green-800 hover:bg-green-200'
                                  : 'bg-white border-cyan-200 text-slate-600 hover:bg-cyan-100'
                              }`}
                            >
                              {done ? L(`✓ ${activeKid.name} đã làm — bấm để bỏ đánh dấu`, `✓ ${activeKid.name} done — click to unmark`) : L(`Đánh dấu ${activeKid.name} đã làm`, `Mark ${activeKid.name} done`)}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Curriculum mapping */}
      <div className="rounded-xl p-5 text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)' }}>
        <h2 className="text-xl font-bold mb-3 text-white">📚 {L('Mapping với chương trình VN', 'VN curriculum mapping')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.curriculum_map_vn.map((m) => (
            <div key={m.kid_band_en} className="bg-white/95 rounded-lg p-3 shadow-sm">
              <div className="font-bold mb-1 text-orange-800">{L(m.kid_band_vi, m.kid_band_en)}</div>
              <div className="text-xs text-slate-700">{L(m.desc_vi, m.desc_en)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Careers */}
      <div className="rounded-xl p-5 text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #10B981 0%, #0891B2 100%)' }}>
        <h2 className="text-xl font-bold mb-3 text-white">🎯 {L('Nghề STEM tại VN', 'STEM Careers in VN')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {data.careers.map((c) => (
            <div key={c.en} className="bg-white/95 rounded-lg p-2 shadow-sm">
              <div className="text-xs font-bold text-emerald-800">{L(c.vi, c.en)}</div>
              <div className="text-xs text-slate-600 font-medium">{c.salary}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-white/95 font-medium">
          🇻🇳 {L('Tuyển dụng VN:', 'VN employers:')} {data.vn_employers}
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
      </div>

      <div className="text-center text-xs text-slate-500 italic">
        D-038 + D-039 · Data from lib/stem-data.json · PhET CC-BY 3.0 · Mid-Year Gate 2026-06-30
      </div>
    </div>
  );
}
