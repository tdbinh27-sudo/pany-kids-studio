'use client';

/**
 * @file components/SpaceExplorerTab.tsx
 * @description Space Explorer track (Khám Phá Vũ Trụ) — D-042.
 *              6th Supabase-CMS track. Content from lib/space-data.json (anh-editable).
 *              Centerpiece: MIT solar-system-3d sim embedded via iframe (public/space/*).
 *              Sections: hero · 3D observatory · planet cards · astronaut missions ·
 *              quiz · order mini-game · careers + real tools.
 *              Progress: { [kidId]: { [milestoneId]: ISODate } } via setProgressP.
 *              Quiz pass + order-game solve auto-complete their mission milestones.
 */

import { useEffect, useMemo, useState } from 'react';
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

type Planet = {
  id: string; emoji: string; order: number; color: string;
  name_vi: string; name_en: string; type_vi: string; type_en: string;
  stats: Record<string, string>;
  facts_vi: string[]; facts_en: string[];
  wow_vi: string; wow_en: string;
};
type Mission = {
  id: number; emoji: string; title_vi: string; title_en: string;
  age_band_vi: string; age_band_en: string; desc_vi: string; desc_en: string;
  milestones: { id: string; label_vi: string; label_en: string }[];
};
type QuizQ = {
  id: string; q_vi: string; q_en: string;
  options_vi: string[]; options_en: string[];
  answer: number; explain_vi: string; explain_en: string;
};
type OrderPlanet = { id: string; emoji: string; name_vi: string; name_en: string };
type SpacePayload = {
  iframe: { vi: string; en: string };
  intro_vi: string; intro_en: string;
  planets: Planet[];
  missions: Mission[];
  quiz: QuizQ[];
  quiz_pass: number;
  order_game: { prompt_vi: string; prompt_en: string; planets: OrderPlanet[] };
  careers: { vi: string; en: string; salary_vn: string }[];
  tools: { name: string; desc_vi: string; desc_en: string }[];
};

type Props = {
  lang: 'vi' | 'en';
  kids?: Kid[];
  activeKidId?: string | null;
  progress?: TrackProgress;
  setProgressP?: (v: TrackProgress) => void;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SpaceExplorerTab({ lang, kids = [], activeKidId = null, progress = {}, setProgressP }: Props) {
  const L = (vi: string, en: string) => (lang === 'vi' ? vi : en);
  const { data } = useContent<SpacePayload>('space');

  const PLANETS = (data.planets as Planet[]) || [];
  const MISSIONS = (data.missions as Mission[]) || [];
  const QUIZ = (data.quiz as QuizQ[]) || [];
  const ORDER = data.order_game?.planets || [];
  const PASS = data.quiz_pass ?? 8;

  const ALL_MILESTONE_IDS = MISSIONS.flatMap((m) => m.milestones.map((ms) => ms.id));
  const activeKid = kids.find((k) => k.id === activeKidId);
  const totalDone = countCompleted(progress, activeKidId, ALL_MILESTONE_IDS);
  const totalPct = percentComplete(progress, activeKidId, ALL_MILESTONE_IDS);
  const badge = badgeTier(totalDone);

  const [expandedPlanet, setExpandedPlanet] = useState<string | null>('earth');
  const [openMission, setOpenMission] = useState<number | null>(1);

  const handleToggle = (milestoneId: string) => {
    if (!activeKidId || !setProgressP) return;
    setProgressP(toggleProgress(progress, activeKidId, milestoneId));
  };
  // Mark complete only (never un-mark) — used by quiz/mini-game wins.
  const markDone = (milestoneId: string) => {
    if (!activeKidId || !setProgressP) return;
    if (isCompleted(progress, activeKidId, milestoneId)) return;
    setProgressP(toggleProgress(progress, activeKidId, milestoneId));
  };

  const iframeSrc = (data.iframe && data.iframe[lang]) || '/space/solar-system.html';

  return (
    <div className="space-y-6">
      {/* ───────── Hero ───────── */}
      <div className="rounded-2xl p-6 text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 55%, #7c3aed 100%)' }}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-5xl">🪐</span>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">{L('Khám Phá Vũ Trụ', 'Space Explorer')}</h1>
            <p className="text-sm text-white/90 mt-1">{L(data.intro_vi, data.intro_en)}</p>
          </div>
        </div>

        {activeKid ? (
          <div className="mt-4 bg-white/10 backdrop-blur rounded-xl p-3 border border-white/20">
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

      {/* ───────── 3D Observatory ───────── */}
      <div className="rounded-2xl border-2 border-indigo-200 bg-white shadow-md overflow-hidden">
        <div className="px-5 py-3 border-b border-indigo-100 flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-lg font-bold text-indigo-900">🔭 {L('Đài Quan Sát 3D', '3D Observatory')}</h2>
          <span className="text-xs text-slate-500">
            {L('Kéo để xoay · lăn chuột để phóng to · bấm hành tinh để bay tới', 'Drag to spin · scroll to zoom · click a planet to fly to it')}
          </span>
        </div>
        <div className="bg-black" style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', minHeight: 320 }}>
          <iframe
            key={lang}
            src={iframeSrc}
            title={L('Mô phỏng Hệ Mặt Trời 3D', '3D Solar System simulation')}
            loading="lazy"
            allow="fullscreen; autoplay"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          />
        </div>
        <div className="px-5 py-2 text-[11px] text-slate-400 italic bg-slate-50 border-t border-slate-100">
          {L('Mô phỏng mã nguồn mở (MIT) · texture: NASA / KyleGough · Three.js', 'Open-source sim (MIT) · textures: NASA / KyleGough · Three.js')}
        </div>
      </div>

      {/* ───────── Planet cards ───────── */}
      <div>
        <h2 className="text-xl font-bold text-indigo-900 mb-3">🌍 {L('Thẻ Hành Tinh', 'Planet Cards')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
          {PLANETS.map((p) => {
            const open = expandedPlanet === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setExpandedPlanet(open ? null : p.id)}
                className={`rounded-xl border-2 bg-white cursor-pointer transition-all ${open ? 'sm:col-span-3 shadow-xl scale-[1.005]' : 'shadow-sm hover:shadow-md'}`}
                style={{ borderColor: open ? p.color : '#e2e8f0' }}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.15))' }}>{p.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-bold text-slate-900 truncate">{L(p.name_vi, p.name_en)}</div>
                      <div className="text-xs font-semibold" style={{ color: p.color }}>{L(p.type_vi, p.type_en)}</div>
                    </div>
                    <span className="text-slate-400 text-sm">{open ? '▲' : '▼'}</span>
                  </div>

                  {open && (
                    <div className="mt-4 space-y-3" onClick={(e) => e.stopPropagation()}>
                      {/* Stats */}
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(p.stats).map(([k, v]) =>
                          k.endsWith(lang) ? (
                            <span key={k} className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 font-semibold">{v}</span>
                          ) : null
                        )}
                      </div>
                      {/* Facts */}
                      <ul className="space-y-1.5">
                        {(lang === 'vi' ? p.facts_vi : p.facts_en).map((f, i) => (
                          <li key={i} className="text-sm text-slate-700 leading-snug flex gap-2">
                            <span className="text-indigo-400 flex-shrink-0">✦</span><span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      {/* Wow */}
                      <div className="rounded-lg p-3 text-sm font-semibold text-white" style={{ background: `linear-gradient(135deg, ${p.color}, #4c1d95)` }}>
                        🤩 {L(p.wow_vi, p.wow_en)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ───────── Astronaut missions ───────── */}
      <div>
        <h2 className="text-xl font-bold text-indigo-900 mb-3">🚀 {L('Nhiệm Vụ Phi Hành Gia', 'Astronaut Missions')}</h2>
        <div className="space-y-3">
          {MISSIONS.map((m) => {
            const open = openMission === m.id;
            const ids = m.milestones.map((x) => x.id);
            const done = countCompleted(progress, activeKidId, ids);
            const pct = percentComplete(progress, activeKidId, ids);
            return (
              <div
                key={m.id}
                className={`rounded-xl border-2 bg-white transition-all ${open ? 'border-violet-400 shadow-lg' : 'border-slate-200 shadow-sm hover:border-violet-300'}`}
              >
                <button
                  onClick={() => setOpenMission(open ? null : m.id)}
                  className="w-full text-left p-4 flex items-center gap-3"
                >
                  <span className="text-3xl flex-shrink-0">{m.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-violet-600 text-white font-bold">{L('Nhiệm vụ', 'Mission')} {m.id}</span>
                      <span className="text-xs text-amber-700 font-bold uppercase tracking-wide">{L(m.age_band_vi, m.age_band_en)}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{L(m.title_vi, m.title_en)}</h3>
                    <p className="text-xs text-slate-600">{L(m.desc_vi, m.desc_en)}</p>
                  </div>
                  {activeKid && (
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs font-bold text-violet-700">{done}/{ids.length}</div>
                      <div className="w-16 h-1.5 bg-violet-100 rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )}
                </button>

                {open && (
                  <div className="px-4 pb-4 -mt-1">
                    {activeKid ? (
                      <div className="space-y-1.5">
                        {m.milestones.map((ms) => {
                          const c = isCompleted(progress, activeKidId, ms.id);
                          return (
                            <button
                              key={ms.id}
                              onClick={() => handleToggle(ms.id)}
                              className={`w-full text-left flex items-start gap-2 px-3 py-2 rounded-lg border transition ${c ? 'bg-green-50 border-green-300 hover:bg-green-100' : 'bg-slate-50 border-slate-200 hover:bg-violet-50 hover:border-violet-300'}`}
                            >
                              <span className="text-lg flex-shrink-0">{c ? '✅' : '⬜'}</span>
                              <span className={`text-xs leading-snug ${c ? 'text-green-800 font-semibold' : 'text-slate-700'}`}>{L(ms.label_vi, ms.label_en)}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-500 italic px-1">{L('Chọn học viên để tick hoàn thành nhiệm vụ.', 'Pick a student to check off missions.')}</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ───────── Quiz + Mini-game ───────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SpaceQuiz quiz={QUIZ} pass={PASS} lang={lang} onPass={() => markDone('space-m2-quiz')} />
        <OrderGame order={ORDER} prompt={L(data.order_game?.prompt_vi || '', data.order_game?.prompt_en || '')} lang={lang} onSolve={() => markDone('space-m2-order')} />
      </div>

      {/* ───────── Careers ───────── */}
      <div className="rounded-xl p-5 text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)' }}>
        <h2 className="text-xl font-bold mb-3 text-white">💼 {L('Nghề nghiệp với Vũ Trụ', 'Space Careers')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.careers.map((c) => (
            <div key={c.en} className="bg-white/95 rounded-lg p-3 border border-white/50 shadow-sm">
              <div className="text-sm font-bold text-emerald-800">{L(c.vi, c.en)}</div>
              <div className="text-xs text-slate-700 mt-1 font-medium">{c.salary_vn}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ───────── Real explorer tools ───────── */}
      <div className="rounded-xl p-5 text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)' }}>
        <h2 className="text-xl font-bold mb-3 text-white">🛰️ {L('Công cụ khám phá thật (miễn phí)', 'Real explorer tools (free)')}</h2>
        <div className="space-y-2 text-sm text-white/95">
          {data.tools.map((tl) => (
            <div key={tl.name}>
              <span className="font-bold text-amber-200">{tl.name}</span> — {L(tl.desc_vi, tl.desc_en)}
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-white/80 italic">
          {L('Bố Bình mở cùng các con · Claude 18+ rule áp dụng', 'Parent opens with the kids · Claude 18+ rule applies')}
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 italic">
        D-042 · {L('Dữ liệu từ', 'Data from')} lib/space-data.json · {L('Mô phỏng 3D: locphamnguyen/solar-system-3d (MIT)', '3D sim: locphamnguyen/solar-system-3d (MIT)')}
      </div>
    </div>
  );
}

/* ════════════════ Quiz ════════════════ */
function SpaceQuiz({ quiz, pass, lang, onPass }: { quiz: QuizQ[]; pass: number; lang: 'vi' | 'en'; onPass: () => void }) {
  const L = (vi: string, en: string) => (lang === 'vi' ? vi : en);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  if (!quiz.length) return null;
  const q = quiz[idx];
  const options = lang === 'vi' ? q.options_vi : q.options_en;

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (idx + 1 >= quiz.length) {
      const finalScore = score; // score already includes current correct answer
      setDone(true);
      if (finalScore >= pass) onPass();
      return;
    }
    setIdx((n) => n + 1);
    setPicked(null);
  };
  const restart = () => { setIdx(0); setScore(0); setPicked(null); setDone(false); };

  if (done) {
    const win = score >= pass;
    return (
      <div className="rounded-2xl border-2 border-indigo-200 bg-white shadow-md p-5 flex flex-col">
        <h2 className="text-lg font-bold text-indigo-900 mb-3">🎮 {L('Đố Vui Vũ Trụ', 'Space Quiz')}</h2>
        <div className={`flex-1 rounded-xl p-5 text-center text-white flex flex-col items-center justify-center`} style={{ background: win ? 'linear-gradient(135deg,#10b981,#14b8a6)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
          <div className="text-5xl mb-2">{win ? '🏆' : '🚀'}</div>
          <div className="text-2xl font-bold">{score}/{quiz.length}</div>
          <p className="text-sm mt-2 text-white/95">
            {win ? L('Tuyệt vời! Em là Nhà thám hiểm vũ trụ!', 'Awesome! You are a Space Explorer!') : L(`Cần ${pass}/${quiz.length} để đạt — thử lại nhé!`, `Need ${pass}/${quiz.length} to pass — try again!`)}
          </p>
        </div>
        <button onClick={restart} className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">{L('Chơi lại', 'Play again')}</button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-indigo-200 bg-white shadow-md p-5 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-indigo-900">🎮 {L('Đố Vui Vũ Trụ', 'Space Quiz')}</h2>
        <span className="text-xs font-semibold text-slate-500">{idx + 1}/{quiz.length} · ⭐ {score}</span>
      </div>
      <div className="h-1.5 bg-indigo-100 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-indigo-500 transition-all" style={{ width: `${((idx) / quiz.length) * 100}%` }} />
      </div>
      <p className="text-base font-bold text-slate-900 mb-3">{L(q.q_vi, q.q_en)}</p>
      <div className="space-y-2 flex-1">
        {options.map((o, i) => {
          let cls = 'bg-slate-50 border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 text-slate-800';
          if (picked !== null) {
            if (i === q.answer) cls = 'bg-green-50 border-green-400 text-green-800 font-semibold';
            else if (i === picked) cls = 'bg-red-50 border-red-300 text-red-700';
            else cls = 'bg-slate-50 border-slate-200 text-slate-400';
          }
          return (
            <button key={i} onClick={() => pick(i)} disabled={picked !== null}
              className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition ${cls}`}>
              {picked !== null && i === q.answer ? '✅ ' : picked === i ? '❌ ' : ''}{o}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="mt-3 text-xs text-slate-600 bg-indigo-50 border border-indigo-100 rounded-lg p-2">
          💡 {L(q.explain_vi, q.explain_en)}
        </div>
      )}
      <button onClick={next} disabled={picked === null}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed">
        {idx + 1 >= quiz.length ? L('Xem kết quả', 'See result') : L('Câu tiếp →', 'Next →')}
      </button>
    </div>
  );
}

/* ════════════════ Order mini-game ════════════════ */
function OrderGame({ order, prompt, lang, onSolve }: { order: OrderPlanet[]; prompt: string; lang: 'vi' | 'en'; onSolve: () => void }) {
  const L = (vi: string, en: string) => (lang === 'vi' ? vi : en);
  const correct = useMemo(() => order.map((p) => p.id), [order]);
  const [pool, setPool] = useState<OrderPlanet[]>(() => shuffle(order));
  const [placed, setPlaced] = useState<OrderPlanet[]>([]);

  if (!order.length) return null;

  const reset = () => { setPlaced([]); setPool(shuffle(order)); };
  const place = (p: OrderPlanet) => {
    setPool((pl) => pl.filter((x) => x.id !== p.id));
    setPlaced((pc) => [...pc, p]);
  };
  const unplace = (p: OrderPlanet) => {
    setPlaced((pc) => pc.filter((x) => x.id !== p.id));
    setPool((pl) => [...pl, p]);
  };

  const full = placed.length === order.length;
  const solved = full && placed.every((p, i) => p.id === correct[i]);
  useEffect(() => {
    if (solved) onSolve();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solved]);

  const name = (p: OrderPlanet) => (lang === 'vi' ? p.name_vi : p.name_en);

  return (
    <div className="rounded-2xl border-2 border-violet-200 bg-white shadow-md p-5 flex flex-col">
      <h2 className="text-lg font-bold text-violet-900 mb-1">🧩 {L('Sắp xếp hành tinh', 'Order the planets')}</h2>
      <p className="text-xs text-slate-600 mb-3">{prompt}</p>

      {/* Placed slots */}
      <div className="space-y-1.5 mb-3">
        {Array.from({ length: order.length }).map((_, i) => {
          const p = placed[i];
          const right = full && p && p.id === correct[i];
          const wrong = full && p && p.id !== correct[i];
          return (
            <div key={i}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm min-h-[40px] ${
                right ? 'bg-green-50 border-green-300' : wrong ? 'bg-red-50 border-red-300' : p ? 'bg-violet-50 border-violet-200' : 'bg-slate-50 border-dashed border-slate-300'
              }`}>
              <span className="text-xs font-bold text-slate-400 w-4">{i + 1}</span>
              {p ? (
                <button onClick={() => !full && unplace(p)} className="flex items-center gap-2 flex-1 text-left">
                  <span className="text-lg">{p.emoji}</span>
                  <span className="font-semibold text-slate-800">{name(p)}</span>
                  {full && <span className="ml-auto">{right ? '✅' : '❌'}</span>}
                </button>
              ) : (
                <span className="text-slate-400 text-xs italic">{L('chọn hành tinh bên dưới…', 'pick a planet below…')}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Pool */}
      {pool.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {pool.map((p) => (
            <button key={p.id} onClick={() => place(p)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-100 border border-violet-300 text-sm font-semibold text-violet-800 hover:bg-violet-200 transition">
              <span>{p.emoji}</span> {name(p)}
            </button>
          ))}
        </div>
      )}

      {full && (
        <div className={`rounded-lg p-3 text-sm font-semibold text-white text-center mb-2 ${solved ? '' : ''}`} style={{ background: solved ? 'linear-gradient(135deg,#10b981,#14b8a6)' : 'linear-gradient(135deg,#f59e0b,#ef4444)' }}>
          {solved ? `🏆 ${L('Chính xác! Em thuộc thứ tự 8 hành tinh rồi!', 'Correct! You know the 8 planets in order!')}` : `🤔 ${L('Chưa đúng hết — bấm "Làm lại" thử lần nữa nhé!', 'Not quite — tap "Reset" and try again!')}`}
        </div>
      )}
      <button onClick={reset} className="mt-auto px-4 py-2 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700">
        🔄 {L('Làm lại', 'Reset')}
      </button>
    </div>
  );
}
