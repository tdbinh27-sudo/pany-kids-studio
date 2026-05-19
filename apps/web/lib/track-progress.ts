/**
 * @file lib/track-progress.ts
 * @description Per-kid progress tracking helpers for 3 tracks (gamedev/fashion/stem).
 *              Shared schema: { [kidId: string]: { [itemId: string]: ISODate } }
 *              ISODate = completion date string; absence = not completed.
 *
 * Used by GameDevTab, FashionDesignTab, STEMTab.
 * Persistence handled by PanyKidsStudio.tsx via setProgressP setter pattern.
 */

export type TrackProgress = {
  [kidId: string]: {
    [itemId: string]: string;  // ISO date when completed, undefined if not
  };
};

/**
 * Mark an item as complete (or undo) for a specific kid.
 * Returns NEW progress object (immutable update for React state).
 */
export function toggleProgress(
  progress: TrackProgress,
  kidId: string,
  itemId: string
): TrackProgress {
  const kidProgress = progress[kidId] || {};
  const isCompleted = Boolean(kidProgress[itemId]);

  if (isCompleted) {
    // unmark
    const { [itemId]: _removed, ...rest } = kidProgress;
    return { ...progress, [kidId]: rest };
  }

  // mark complete with today's date
  return {
    ...progress,
    [kidId]: {
      ...kidProgress,
      [itemId]: new Date().toISOString().slice(0, 10),  // YYYY-MM-DD
    },
  };
}

/**
 * Check if a single item is completed for a kid.
 */
export function isCompleted(
  progress: TrackProgress,
  kidId: string | null,
  itemId: string
): boolean {
  if (!kidId) return false;
  return Boolean(progress[kidId]?.[itemId]);
}

/**
 * Get completion date string for an item (for display tooltip).
 */
export function completedOn(
  progress: TrackProgress,
  kidId: string | null,
  itemId: string
): string | null {
  if (!kidId) return null;
  return progress[kidId]?.[itemId] || null;
}

/**
 * Count completed items for a kid across a list of item IDs.
 */
export function countCompleted(
  progress: TrackProgress,
  kidId: string | null,
  itemIds: string[]
): number {
  if (!kidId) return 0;
  const kidProgress = progress[kidId] || {};
  return itemIds.filter((id) => kidProgress[id]).length;
}

/**
 * Calculate percentage completion (0-100, rounded).
 */
export function percentComplete(
  progress: TrackProgress,
  kidId: string | null,
  itemIds: string[]
): number {
  if (!kidId || itemIds.length === 0) return 0;
  return Math.round((countCompleted(progress, kidId, itemIds) / itemIds.length) * 100);
}

/**
 * Determine badge tier based on count.
 */
export function badgeTier(count: number): { emoji: string; label_vi: string; label_en: string } {
  if (count >= 10) return { emoji: '🏆', label_vi: 'Vô địch', label_en: 'Champion' };
  if (count >= 6) return { emoji: '🥇', label_vi: 'Vàng', label_en: 'Gold' };
  if (count >= 3) return { emoji: '🥈', label_vi: 'Bạc', label_en: 'Silver' };
  if (count >= 1) return { emoji: '🥉', label_vi: 'Đồng', label_en: 'Bronze' };
  return { emoji: '🌱', label_vi: 'Khởi đầu', label_en: 'Starter' };
}
