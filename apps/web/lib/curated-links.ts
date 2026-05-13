/**
 * @file lib/curated-links.ts
 * @description Anh-curated premium knowledge links for the "Khám phá" tab.
 *              Renders above existing Library content. Per-family admin form
 *              lets parent-mode users (anh + future family admins) add/edit/delete.
 * @decision D-029 (2026-05-13) — Trục 7 new: anh personally curates educational links.
 * @reference Plan section 2.4, commercialization-plan-2026-05-13.md
 *
 * Design notes:
 * - Schema is generous: covers VN + EN content, free/paid, age ranges, pillars.
 * - SEED_LINKS starts empty — anh adds entries via Settings UI (P2.5 work).
 * - Future: multi-family submission with anh-approval workflow.
 */

import type { VNGradeLabel } from './age-curriculum';

export type LinkType = 'video' | 'article' | 'course' | 'tool' | 'book' | 'app' | 'channel' | 'podcast' | 'game';
export type LinkLanguage = 'vi' | 'en' | 'bilingual' | 'other';
export type LinkCost = 'free' | 'freemium' | 'paid';
export type SourceAuthority =
  | 'Bộ GD&ĐT VN'
  | 'Vinschool'
  | 'VAS'
  | 'HOCMAI'
  | 'Khan Academy'
  | 'Brilliant'
  | 'Coursera'
  | 'Coursera Kids'
  | 'edX'
  | 'AoPS'
  | 'British Council'
  | 'BBC Learning'
  | 'National Geographic Kids'
  | 'TED-Ed'
  | 'MindX'
  | 'iSpace'
  | 'CodeGym'
  | 'PANY Curated'
  | 'Other';

export type LinkPillar =
  | 'tech'
  | 'english'
  | 'finance'
  | 'thinking'
  | 'business'
  | 'life'
  | 'creative'
  | 'movement'
  | 'discovery'
  | 'career'
  | 'family'
  | 'general';

export type CuratedLink = {
  id: string;                         // UUID or slug
  title_vi: string;
  title_en: string;
  url: string;                        // direct URL or deep link
  description_vi: string;
  description_en: string;
  ageRange: [number, number];         // [min, max], inclusive — e.g., [10, 16]
  vn_grade_hint?: VNGradeLabel[];     // optional explicit grade mapping
  pillar: LinkPillar;
  source_authority: SourceAuthority;
  source_name?: string;               // when authority = 'Other', specify
  type: LinkType;
  language: LinkLanguage;
  cost: LinkCost;
  price_vnd?: number;                 // when cost = 'paid' or 'freemium'
  thumbnail_url?: string;             // og:image equivalent (optional)
  duration_min?: number;              // for video/podcast/course
  prerequisite?: string;              // e.g., "biết đọc chữ cái" / "lớp 3 trở lên"

  // Trust + audit fields
  addedBy: string;                    // user identifier (default 'anh-binh')
  addedDate: string;                  // YYYY-MM-DD
  lastVerifiedDate?: string;          // last time URL was confirmed live
  verifiedBy?: string;
  priority?: number;                  // 1 = top of list, 10 = normal; lower number = higher position
  active?: boolean;                   // soft-delete flag (default true)

  // Curation metadata
  tags: string[];                     // anh tags freely — "olympic-math", "tự-học", "vlog-trẻ-em", etc.
  reason_recommended_vi?: string;     // why anh recommends this — "Đã dùng cho Phúc lớp 5, hiệu quả với phần phân số"
};

/**
 * SEED LIST — empty at v1. Anh adds via Settings UI in P2.5 (~2026-05-25).
 * Backup option: anh paste JSON entries directly here, em re-deploy.
 */
export const SEED_LINKS: CuratedLink[] = [
  /*
   * Example template for anh to copy-paste:
   *
   * {
   *   id: 'khan-prealgebra',
   *   title_vi: 'Khan Academy — Tiền đại số (Pre-Algebra)',
   *   title_en: 'Khan Academy — Pre-Algebra',
   *   url: 'https://www.khanacademy.org/math/pre-algebra',
   *   description_vi: 'Khóa học video miễn phí cho học sinh lớp 6-7 chuẩn bị vào đại số. Có quiz tự động + tracking tiến độ.',
   *   description_en: 'Free video course for grade 6-7 students preparing for algebra. Auto-quizzes + progress tracking.',
   *   ageRange: [10, 13],
   *   vn_grade_hint: ['lớp 5', 'lớp 6', 'lớp 7'],
   *   pillar: 'thinking',
   *   source_authority: 'Khan Academy',
   *   type: 'course',
   *   language: 'en',
   *   cost: 'free',
   *   duration_min: 600,
   *   prerequisite: 'Biết các phép tính cơ bản (cộng/trừ/nhân/chia)',
   *   addedBy: 'anh-binh',
   *   addedDate: '2026-05-13',
   *   priority: 1,
   *   active: true,
   *   tags: ['math', 'olympic-prep', 'video-learning', 'free-tier'],
   *   reason_recommended_vi: 'Đã dùng cho Phúc lúc lớp 5, hiệu quả với phần phân số + tỉ lệ.',
   * },
   */
];

/**
 * Get curated links filtered by kid age + optional pillar.
 * Returns highest-priority first.
 */
export function getLinksForKid(
  kidAge: number,
  pillar?: LinkPillar,
  options?: { language?: LinkLanguage; cost?: LinkCost; limit?: number },
): CuratedLink[] {
  let results = SEED_LINKS.filter(l => {
    if (l.active === false) return false;
    const [min, max] = l.ageRange;
    if (kidAge < min || kidAge > max) return false;
    if (pillar && l.pillar !== pillar && l.pillar !== 'general') return false;
    if (options?.language && l.language !== options.language) return false;
    if (options?.cost && l.cost !== options.cost) return false;
    return true;
  });

  results.sort((a, b) => (a.priority ?? 5) - (b.priority ?? 5));

  if (options?.limit && options.limit > 0) results = results.slice(0, options.limit);
  return results;
}

/**
 * Search curated links by free-text query (title_vi, title_en, description, tags).
 */
export function searchLinks(query: string, kidAge?: number): CuratedLink[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return SEED_LINKS.filter(l => {
    if (l.active === false) return false;
    if (kidAge !== undefined) {
      const [min, max] = l.ageRange;
      if (kidAge < min || kidAge > max) return false;
    }
    const hay = (
      l.title_vi + ' ' + l.title_en + ' ' +
      l.description_vi + ' ' + l.description_en + ' ' +
      l.tags.join(' ') + ' ' +
      (l.reason_recommended_vi ?? '')
    ).toLowerCase();
    return hay.includes(q);
  });
}

/**
 * Stats — used in admin dashboard + future Telegram weekly digest to anh.
 */
export function getLinksStats() {
  const active = SEED_LINKS.filter(l => l.active !== false);
  const byPillar: Record<string, number> = {};
  const bySource: Record<string, number> = {};
  const byCost: Record<string, number> = { free: 0, freemium: 0, paid: 0 };

  for (const l of active) {
    byPillar[l.pillar] = (byPillar[l.pillar] ?? 0) + 1;
    bySource[l.source_authority] = (bySource[l.source_authority] ?? 0) + 1;
    byCost[l.cost] = (byCost[l.cost] ?? 0) + 1;
  }

  return {
    total_active: active.length,
    total_inactive: SEED_LINKS.length - active.length,
    byPillar,
    bySource,
    byCost,
  };
}

/**
 * Validation helper — called before persisting new entry from admin form.
 * Returns array of error messages; empty array = valid.
 */
export function validateLink(input: Partial<CuratedLink>): string[] {
  const errors: string[] = [];
  if (!input.title_vi || input.title_vi.trim().length < 3) errors.push('Tiêu đề VN cần ≥ 3 ký tự');
  if (!input.url || !input.url.startsWith('http')) errors.push('URL phải bắt đầu với http:// hoặc https://');
  if (!input.ageRange || input.ageRange.length !== 2) {
    errors.push('Cần khoảng tuổi [min, max]');
  } else {
    const [min, max] = input.ageRange;
    if (min < 5 || max > 16 || min > max) errors.push('Khoảng tuổi phải nằm trong [5..16] và min ≤ max');
  }
  if (!input.pillar) errors.push('Cần chọn pillar');
  if (!input.source_authority) errors.push('Cần chọn nguồn');
  if (!input.type) errors.push('Cần chọn loại nội dung');
  if (!input.language) errors.push('Cần chọn ngôn ngữ');
  if (!input.cost) errors.push('Cần chọn chi phí');
  return errors;
}
