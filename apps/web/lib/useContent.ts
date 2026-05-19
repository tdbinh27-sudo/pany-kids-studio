/**
 * @file lib/useContent.ts
 * @description Client-side hook to fetch content from /api/content/[track]
 *              with bundled JSON fallback. Cached per-session via simple ref.
 * @reference D-040 Phase 3 MVP
 */

import { useEffect, useState } from 'react';
import gamedevJson from '@/lib/gamedev-data.json';
import fashionJson from '@/lib/fashion-data.json';
import stemJson from '@/lib/stem-data.json';

type Track = 'gamedev' | 'fashion' | 'stem';

const FALLBACKS: Record<Track, unknown> = {
  gamedev: gamedevJson,
  fashion: fashionJson,
  stem: stemJson,
};

// Module-level cache (survives across re-renders, not across page loads)
const cache = new Map<Track, { data: unknown; version: number; ts: number }>();
const CACHE_TTL_MS = 60_000; // 60s

type UseContentResult<T = unknown> = {
  data: T;
  loading: boolean;
  source: 'bundle' | 'supabase' | 'bundle-fallback' | 'cache';
  version: number;
};

export function useContent<T = unknown>(track: Track): UseContentResult<T> {
  // Initial state: use cache if fresh, else fallback bundle
  const cached = cache.get(track);
  const initialData =
    cached && Date.now() - cached.ts < CACHE_TTL_MS
      ? cached.data
      : FALLBACKS[track];

  const [state, setState] = useState<UseContentResult<T>>({
    data: initialData as T,
    loading: !cached,
    source: cached ? 'cache' : 'bundle',
    version: cached?.version ?? 0,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const res = await fetch(`/api/content/${track}`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (cancelled || !json.ok) return;

        cache.set(track, { data: json.payload, version: json.version, ts: Date.now() });
        setState({
          data: json.payload as T,
          loading: false,
          source: json.source,
          version: json.version,
        });
      } catch {
        // Silent fail — already showing bundled fallback
        if (!cancelled) setState((s) => ({ ...s, loading: false }));
      }
    }

    // Only re-fetch if cache stale
    if (!cached || Date.now() - cached.ts >= CACHE_TTL_MS) {
      fetchData();
    } else {
      setState((s) => ({ ...s, loading: false }));
    }

    return () => {
      cancelled = true;
    };
  }, [track]);

  return state;
}
