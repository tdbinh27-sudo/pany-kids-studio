'use client';

/**
 * @file components/VocabWordle.tsx
 * @description "Đoán Từ Vựng" — a Wordle-style English vocabulary game (D-043 Phase 2).
 *              Educational twist: the Vietnamese meaning is shown as the clue, and the
 *              child guesses the 5-letter English word (KET/PET-level vocab). Standard
 *              Wordle feedback (correct/present/absent) with duplicate-letter handling.
 *              Self-contained (no external deps / no iframe): on-screen keyboard +
 *              physical keyboard, bilingual UI, tablet-friendly. Inspired by
 *              cwackerfuss/react-wordle (MIT) — concept ported, not code.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';

type Lang = 'vi' | 'en';
type Props = { lang: Lang };

type Word = { w: string; vi: string; en: string };

// 5-letter A2/KET-level words with a meaning clue in both languages.
const WORDS: Word[] = [
  { w: 'HAPPY', vi: 'vui vẻ', en: 'feeling good / joyful' },
  { w: 'WATER', vi: 'nước', en: 'you drink it' },
  { w: 'HOUSE', vi: 'ngôi nhà', en: 'you live in it' },
  { w: 'GREEN', vi: 'màu xanh lá', en: 'colour of grass' },
  { w: 'MUSIC', vi: 'âm nhạc', en: 'you listen to it' },
  { w: 'APPLE', vi: 'quả táo', en: 'a red or green fruit' },
  { w: 'BREAD', vi: 'bánh mì', en: 'you make sandwiches with it' },
  { w: 'CHAIR', vi: 'cái ghế', en: 'you sit on it' },
  { w: 'PHONE', vi: 'điện thoại', en: 'you call people with it' },
  { w: 'BEACH', vi: 'bãi biển', en: 'sand next to the sea' },
  { w: 'CLOCK', vi: 'đồng hồ', en: 'it shows the time' },
  { w: 'TIGER', vi: 'con hổ', en: 'a big striped cat' },
  { w: 'TABLE', vi: 'cái bàn', en: 'you eat at it' },
  { w: 'RIVER', vi: 'dòng sông', en: 'water flowing to the sea' },
  { w: 'SMILE', vi: 'nụ cười', en: 'you do it when happy' },
  { w: 'LIGHT', vi: 'ánh sáng', en: 'the sun gives it' },
  { w: 'NIGHT', vi: 'ban đêm', en: 'when it is dark' },
  { w: 'MONEY', vi: 'tiền', en: 'you buy things with it' },
  { w: 'PAPER', vi: 'giấy', en: 'you write on it' },
  { w: 'CLOUD', vi: 'đám mây', en: 'white and in the sky' },
  { w: 'HEART', vi: 'trái tim', en: 'it beats in your chest' },
  { w: 'LEMON', vi: 'quả chanh', en: 'a sour yellow fruit' },
  { w: 'MOUSE', vi: 'con chuột', en: 'a small animal / on a computer' },
  { w: 'OCEAN', vi: 'đại dương', en: 'a very big sea' },
  { w: 'ROBOT', vi: 'người máy', en: 'a machine that can move' },
  { w: 'SNAKE', vi: 'con rắn', en: 'a long animal with no legs' },
  { w: 'TRAIN', vi: 'tàu hỏa', en: 'it runs on rails' },
  { w: 'WHALE', vi: 'cá voi', en: 'the biggest sea animal' },
  { w: 'ZEBRA', vi: 'ngựa vằn', en: 'a striped horse' },
  { w: 'CANDY', vi: 'kẹo', en: 'sweet to eat' },
  { w: 'PLANT', vi: 'cái cây', en: 'it grows in soil' },
  { w: 'FRUIT', vi: 'trái cây', en: 'apples and bananas are this' },
  { w: 'SUGAR', vi: 'đường', en: 'it makes food sweet' },
  { w: 'GRASS', vi: 'cỏ', en: 'green and grows in a field' },
];

const LEN = 5;
const MAX = 6;
type Cell = 'correct' | 'present' | 'absent';

function scoreGuess(guess: string, target: string): Cell[] {
  const res: Cell[] = Array(LEN).fill('absent');
  const counts: Record<string, number> = {};
  for (const ch of target) counts[ch] = (counts[ch] || 0) + 1;
  for (let i = 0; i < LEN; i++) {
    if (guess[i] === target[i]) { res[i] = 'correct'; counts[guess[i]]--; }
  }
  for (let i = 0; i < LEN; i++) {
    if (res[i] === 'correct') continue;
    const c = guess[i];
    if (counts[c] > 0) { res[i] = 'present'; counts[c]--; }
  }
  return res;
}

const KEY_ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

export default function VocabWordle({ lang }: Props) {
  const L = (vi: string, en: string) => (lang === 'vi' ? vi : en);

  const [target, setTarget] = useState<Word>(() => WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [rows, setRows] = useState<string[]>([]);
  const [current, setCurrent] = useState('');
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const newGame = useCallback(() => {
    setTarget(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setRows([]); setCurrent(''); setStatus('playing');
  }, []);

  const submit = useCallback(() => {
    if (status !== 'playing' || current.length !== LEN) return;
    const guess = current;
    const nextRows = [...rows, guess];
    setRows(nextRows);
    setCurrent('');
    if (guess === target.w) setStatus('won');
    else if (nextRows.length >= MAX) setStatus('lost');
  }, [current, rows, status, target.w]);

  const type = useCallback((ch: string) => {
    if (status !== 'playing') return;
    setCurrent((c) => (c.length < LEN ? c + ch : c));
  }, [status]);

  const back = useCallback(() => {
    if (status !== 'playing') return;
    setCurrent((c) => c.slice(0, -1));
  }, [status]);

  // Physical keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') submit();
      else if (e.key === 'Backspace') back();
      else if (/^[a-zA-Z]$/.test(e.key)) type(e.key.toUpperCase());
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [submit, back, type]);

  // Best state per key for the on-screen keyboard coloring
  const keyState = useMemo(() => {
    const rank: Record<Cell, number> = { absent: 1, present: 2, correct: 3 };
    const map: Record<string, Cell> = {};
    for (const g of rows) {
      const sc = scoreGuess(g, target.w);
      for (let i = 0; i < LEN; i++) {
        const c = g[i];
        if (!map[c] || rank[sc[i]] > rank[map[c]]) map[c] = sc[i];
      }
    }
    return map;
  }, [rows, target.w]);

  const cellColor = (state: Cell) =>
    state === 'correct' ? { background: '#10b981', color: '#fff', borderColor: '#10b981' }
    : state === 'present' ? { background: '#f59e0b', color: '#fff', borderColor: '#f59e0b' }
    : { background: '#94a3b8', color: '#fff', borderColor: '#94a3b8' };

  return (
    <div className="rounded-2xl border-2 border-teal-200 bg-white shadow-md p-5">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <h3 className="text-lg font-bold text-teal-900">🔤 {L('Đoán Từ Vựng', 'Vocabulary Wordle')}</h3>
        <span className="text-xs text-slate-500">{L('5 chữ · 6 lượt', '5 letters · 6 tries')}</span>
      </div>

      {/* Clue = Vietnamese meaning */}
      <div className="rounded-xl bg-teal-50 border border-teal-200 p-3 mb-3 text-sm">
        <span className="text-slate-600">{L('Đoán từ tiếng Anh có nghĩa:', 'Guess the English word meaning:')} </span>
        <span className="font-bold text-teal-800">{L(target.vi, target.en)}</span>
      </div>

      {/* Grid */}
      <div className="flex flex-col items-center gap-1.5 mb-4">
        {Array.from({ length: MAX }).map((_, r) => {
          const guess = rows[r];
          const scored = guess ? scoreGuess(guess, target.w) : null;
          const isCurrent = r === rows.length && status === 'playing';
          return (
            <div key={r} className="flex gap-1.5">
              {Array.from({ length: LEN }).map((__, c) => {
                const letter = guess ? guess[c] : (isCurrent ? current[c] : '');
                const style = scored ? cellColor(scored[c]) : { background: '#fff', color: '#0f172a', borderColor: letter ? '#94a3b8' : '#e2e8f0' };
                return (
                  <div key={c}
                    className="flex items-center justify-center font-bold text-xl rounded-md border-2 transition-colors"
                    style={{ width: 44, height: 44, ...style }}>
                    {letter || ''}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Result banner */}
      {status !== 'playing' && (
        <div className="rounded-xl p-3 mb-3 text-center text-white font-semibold"
          style={{ background: status === 'won' ? 'linear-gradient(135deg,#10b981,#0891b2)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
          {status === 'won'
            ? <>🏆 {L('Giỏi lắm!', 'Well done!')} <b>{target.w}</b> = {target.vi}</>
            : <>💡 {L('Đáp án:', 'The word was:')} <b>{target.w}</b> = {target.vi}</>}
        </div>
      )}

      {/* On-screen keyboard */}
      <div className="flex flex-col items-center gap-1.5">
        {KEY_ROWS.map((row, ri) => (
          <div key={ri} className="flex gap-1 justify-center flex-wrap">
            {ri === 2 && (
              <button onClick={submit} className="px-2 h-10 rounded-md bg-teal-600 text-white text-xs font-bold hover:bg-teal-700">{L('NHẬP', 'ENTER')}</button>
            )}
            {row.split('').map((k) => {
              const st = keyState[k];
              const style = st ? cellColor(st) : { background: '#f1f5f9', color: '#334155', borderColor: '#e2e8f0' };
              return (
                <button key={k} onClick={() => type(k)}
                  className="rounded-md border font-bold text-sm hover:opacity-80 transition"
                  style={{ width: 30, height: 40, ...style }}>
                  {k}
                </button>
              );
            })}
            {ri === 2 && (
              <button onClick={back} className="px-2 h-10 rounded-md bg-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-400">⌫</button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 italic">{L('🟩 đúng chỗ · 🟨 có nhưng sai chỗ · ⬜ không có', '🟩 right spot · 🟨 wrong spot · ⬜ not in word')}</span>
        <button onClick={newGame} className="px-4 py-1.5 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700">
          🔄 {L('Từ mới', 'New word')}
        </button>
      </div>
    </div>
  );
}
