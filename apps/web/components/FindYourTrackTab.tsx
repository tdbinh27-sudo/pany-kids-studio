'use client';

/**
 * @file components/FindYourTrackTab.tsx
 * @description Placement quiz: 10 questions → recommends GameDev / Fashion / STEM / Explorer.
 *              D-041 cherry-pick from rohitg00/ai-engineering-from-scratch /find-your-level (MIT).
 *              Content from lib/findtrack-data.json (anh-editable).
 *              Per-kid: stores last answer in localStorage under `pks-findtrack-{kidId}`.
 */

import { useEffect, useState } from 'react';
import bundledData from '@/lib/findtrack-data.json';
import { useContent } from '@/lib/useContent';

type Kid = { id: string; name: string; emoji?: string };

type Scores = Record<string, number>;

type Track = {
  id: string;
  emoji: string;
  tab: string;
  title_vi: string;
  title_en: string;
  blurb_vi: string;
  blurb_en: string;
  first_step_vi: string;
  first_step_en: string;
};

type Option = {
  label_vi: string;
  label_en: string;
  scores: Scores;
};

type Question = {
  id: string;
  prompt_vi: string;
  prompt_en: string;
  options: Option[];
};

type FindTrackPayload = typeof bundledData;

type Props = {
  lang: 'vi' | 'en';
  kids?: Kid[];
  activeKidId?: string | null;
  onNavigate?: (tabId: string) => void;
};

const STORAGE_PREFIX = 'pks-findtrack-';

function computeWinner(answers: Record<string, number>, questions: Question[]): string {
  const totals: Scores = {};
  for (const q of questions) {
    const optIndex = answers[q.id];
    if (optIndex === undefined) continue;
    const opt = q.options[optIndex];
    if (!opt) continue;
    for (const [track, points] of Object.entries(opt.scores)) {
      totals[track] = (totals[track] || 0) + points;
    }
  }
  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return 'explorer';
  // Tie detection: if top 2 within 2 points → explorer
  if (sorted.length >= 2 && sorted[0][1] - sorted[1][1] <= 2) {
    return 'explorer';
  }
  return sorted[0][0];
}

export default function FindYourTrackTab({
  lang,
  kids = [],
  activeKidId = null,
  onNavigate,
}: Props) {
  const { data } = useContent<FindTrackPayload>('findtrack');
  const TRACKS = (data.tracks as Track[]) || [];
  const QUESTIONS = (data.questions as Question[]) || [];

  const L = (vi: string, en: string) => (lang === 'vi' ? vi : en);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const activeKid = kids.find((k) => k.id === activeKidId);
  const storageKey = activeKidId ? `${STORAGE_PREFIX}${activeKidId}` : null;

  // Restore previous result on mount
  useEffect(() => {
    if (!storageKey || typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as { answers: Record<string, number>; done: boolean };
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.done) {
          setDone(true);
          setStep(QUESTIONS.length);
        }
      }
    } catch {
      // ignore corrupt storage
    }
  }, [storageKey, QUESTIONS.length]);

  const persist = (next: { answers: Record<string, number>; done: boolean }) => {
    if (!storageKey || typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // quota exceeded — ignore
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
    if (storageKey && typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
    }
  };

  const handleAnswer = (qid: string, optIndex: number) => {
    const nextAnswers = { ...answers, [qid]: optIndex };
    setAnswers(nextAnswers);
    if (step + 1 >= QUESTIONS.length) {
      setDone(true);
      setStep(QUESTIONS.length);
      persist({ answers: nextAnswers, done: true });
    } else {
      setStep(step + 1);
      persist({ answers: nextAnswers, done: false });
    }
  };

  // Result view
  if (done) {
    const winnerId = computeWinner(answers, QUESTIONS);
    const winner = TRACKS.find((t) => t.id === winnerId) || TRACKS[TRACKS.length - 1];
    return (
      <div className="space-y-6 p-4">
        <header>
          <h2 className="text-2xl font-bold">
            🎯 {L('Kết quả cho', 'Result for')}{' '}
            {activeKid ? `${activeKid.emoji ?? ''} ${activeKid.name}` : L('bé', 'kid')}
          </h2>
        </header>

        <section className="rounded-2xl border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-lg dark:border-purple-700 dark:from-purple-900/40 dark:to-pink-900/40">
          <div className="mb-4 text-6xl">{winner.emoji}</div>
          <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100">
            {L(winner.title_vi, winner.title_en)}
          </h3>
          <p className="mt-3 text-base text-gray-800 dark:text-gray-200">
            {L(winner.blurb_vi, winner.blurb_en)}
          </p>
          <div className="mt-4 rounded-lg bg-white p-4 dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              🚀 {L('Bước đầu tiên', 'First step')}
            </p>
            <p className="mt-1 font-medium text-gray-900 dark:text-gray-100">
              {L(winner.first_step_vi, winner.first_step_en)}
            </p>
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          {onNavigate && winner.tab && (
            <button
              type="button"
              onClick={() => onNavigate(winner.tab)}
              className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-purple-700"
            >
              {L(`Mở ${winner.title_vi} →`, `Open ${winner.title_en} →`)}
            </button>
          )}
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            {L('Làm lại quiz', 'Retake quiz')}
          </button>
        </div>

        <footer className="rounded-lg bg-gray-50 p-3 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
          {L(
            'Quiz pattern lấy từ /find-your-level của rohitg00/ai-engineering-from-scratch (MIT).',
            'Quiz pattern adapted from /find-your-level by rohitg00/ai-engineering-from-scratch (MIT).'
          )}
        </footer>
      </div>
    );
  }

  // Quiz view
  const currentQ = QUESTIONS[step];
  if (!currentQ) {
    return (
      <div className="p-4 text-sm text-gray-500">
        {L('Đang tải câu hỏi…', 'Loading questions…')}
      </div>
    );
  }

  const progressPct = Math.round(((step) / QUESTIONS.length) * 100);

  return (
    <div className="space-y-5 p-4">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold">
          🧭 {L('Bé bắt đầu từ đâu?', 'Where should the kid start?')}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {L(
            `Trả lời ${QUESTIONS.length} câu để biết track nào hợp nhất.`,
            `Answer ${QUESTIONS.length} questions to find the best track.`
          )}
        </p>
      </header>

      <div
        className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
        role="progressbar"
        aria-valuenow={progressPct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
          {L('Câu', 'Question')} {step + 1} / {QUESTIONS.length}
        </p>
        <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
          {L(currentQ.prompt_vi, currentQ.prompt_en)}
        </h3>
        <ul className="space-y-2">
          {currentQ.options.map((opt, idx) => (
            <li key={idx}>
              <button
                type="button"
                onClick={() => handleAnswer(currentQ.id, idx)}
                className="w-full rounded-lg border-2 border-gray-200 bg-white p-3 text-left text-sm font-medium text-gray-800 transition hover:border-purple-400 hover:bg-purple-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:border-purple-500 dark:hover:bg-purple-900/30"
              >
                {L(opt.label_vi, opt.label_en)}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ← {L('Câu trước', 'Previous')}
        </button>
      )}
    </div>
  );
}
