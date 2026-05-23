'use client';

/**
 * @file components/AIGlossaryTab.tsx
 * @description AI Glossary for kids (ages 8-12).
 *              D-041 cherry-pick from rohitg00/ai-engineering-from-scratch (MIT).
 *              Content from lib/glossary-data.json (anh-editable).
 *              Read-only, no progress tracking, no per-kid state.
 */

import { useState } from 'react';
import bundledData from '@/lib/glossary-data.json';
import { useContent } from '@/lib/useContent';

type Category = {
  id: string;
  emoji: string;
  title_vi: string;
  title_en: string;
};

type Term = {
  id: string;
  category: string;
  term_vi: string;
  term_en: string;
  definition_vi: string;
  definition_en: string;
  example_vi: string;
  example_en: string;
};

type GlossaryPayload = typeof bundledData;

type Props = {
  lang: 'vi' | 'en';
};

export default function AIGlossaryTab({ lang }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const { data } = useContent<GlossaryPayload>('glossary');
  const CATEGORIES = (data.categories as Category[]) || [];
  const TERMS = (data.terms as Term[]) || [];

  const L = (vi: string, en: string) => (lang === 'vi' ? vi : en);

  const filteredTerms =
    activeCategory === 'all'
      ? TERMS
      : TERMS.filter((t) => t.category === activeCategory);

  return (
    <div className="space-y-6 p-4">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold">
          📖 {L('Từ điển AI cho bé', 'AI Glossary for Kids')}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {L(
            `${TERMS.length} thuật ngữ AI giải thích đơn giản. Tap vào card để xem ví dụ.`,
            `${TERMS.length} AI terms explained simply. Tap a card to see an example.`
          )}
        </p>
      </header>

      <nav className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            activeCategory === 'all'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'
          }`}
        >
          🌐 {L('Tất cả', 'All')} ({TERMS.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = TERMS.filter((t) => t.category === cat.id).length;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              {cat.emoji} {L(cat.title_vi, cat.title_en)} ({count})
            </button>
          );
        })}
      </nav>

      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {filteredTerms.map((term) => {
          const isOpen = expandedTerm === term.id;
          const cat = CATEGORIES.find((c) => c.id === term.category);
          return (
            <li
              key={term.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <button
                type="button"
                onClick={() => setExpandedTerm(isOpen ? null : term.id)}
                className="flex w-full items-start justify-between gap-3 text-left"
                aria-expanded={isOpen}
              >
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {cat?.emoji} {L(cat?.title_vi || '', cat?.title_en || '')}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                    {L(term.term_vi, term.term_en)}
                  </h3>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                    {L(term.definition_vi, term.definition_en)}
                  </p>
                </div>
                <span
                  className="text-lg text-gray-400 transition-transform"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>
              {isOpen && (
                <div className="mt-3 rounded-lg bg-purple-50 p-3 text-sm dark:bg-purple-900/30">
                  <p className="font-medium text-purple-900 dark:text-purple-100">
                    💡 {L('Ví dụ', 'Example')}:
                  </p>
                  <p className="mt-1 text-purple-800 dark:text-purple-200">
                    {L(term.example_vi, term.example_en)}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {filteredTerms.length === 0 && (
        <p className="text-center text-sm text-gray-500">
          {L('Chưa có thuật ngữ nào trong nhóm này.', 'No terms in this category yet.')}
        </p>
      )}

      <footer className="rounded-lg bg-gray-50 p-3 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
        {L(
          'Nguồn: tham khảo rohitg00/ai-engineering-from-scratch (MIT) — đã đơn giản hóa cho trẻ 8-12 tuổi.',
          'Source: adapted from rohitg00/ai-engineering-from-scratch (MIT) — simplified for ages 8-12.'
        )}
      </footer>
    </div>
  );
}
