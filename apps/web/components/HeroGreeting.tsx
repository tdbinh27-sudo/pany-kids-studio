'use client';

/**
 * @file components/HeroGreeting.tsx
 * @description Holographic greeting overlay matching D-035 Tree of Knowledge aesthetic.
 *
 * Renders 1 of 3 visual states:
 *   - mode="anonymous" → static welcome (landing /welcome + /sell)
 *   - mode="kid"        → kid-specific greeting (after kid login)
 *   - mode="parent"     → parent-specific greeting (parent dashboard mode)
 *
 * Visual: cyan-glow holographic panel matching the brand reference image
 *         (artifacts/mockups/tree/canonical-2026-05-15.png).
 *
 * Refreshes every 60s so the time-of-day greeting auto-rolls when crossing windows.
 */

import { useEffect, useState } from 'react';
import { getGreeting, type GreetingMode } from '@/lib/greeting';

type Props = {
  mode: GreetingMode;
  /** Kid full name (mode='kid') OR parent display name like "bố Bình" (mode='parent') */
  displayName?: string;
  /** Override emoji */
  emoji?: string;
  /** Size variant — 'hero' (large landing) or 'inline' (dashboard top bar) */
  variant?: 'hero' | 'inline';
  /** Optional subtitle line shown under main greeting */
  subtitle?: string;
};

const BRAND = {
  cyan: '#4FB3E8',
  electricBlue: '#00BFFF',
  teal: '#00D4AA',
  navy: '#0A1628',
  purple: '#845EC2',
  pink: '#FF6B9D',
  amber: '#FFD43B',
};

export default function HeroGreeting({
  mode,
  displayName,
  emoji,
  variant = 'hero',
  subtitle,
}: Props) {
  // Hydration-safe: avoid server-vs-client time mismatch.
  // On SSR pass we render a stable neutral state; after mount we swap to live greeting
  // and roll every 60s so time-of-day rolls when crossing window boundaries.
  const [mounted, setMounted] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTick(t => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  // SSR + first client render = neutral greeting (no time-of-day; safe to hydrate).
  // After mount = live greeting computed from VN-local hour.
  const greeting = mounted
    ? getGreeting({ mode, displayName, emoji })
    : getGreeting({ mode, displayName, emoji, hourOverride: 9 }); // stable morning

  const isHero = variant === 'hero';

  // Window-key driven accent — slight color shift across the day.
  const accentColor =
    greeting.windowKey === 'morning' ? BRAND.cyan :
    greeting.windowKey === 'noon' ? BRAND.amber :
    greeting.windowKey === 'afternoon' ? BRAND.teal :
    greeting.windowKey === 'evening' ? BRAND.purple :
    BRAND.electricBlue;

  return (
    <div
      role="banner"
      aria-label={greeting.full}
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: isHero ? '20px 40px' : '8px 20px',
        borderRadius: isHero ? 24 : 16,
        background: `linear-gradient(135deg, rgba(79,179,232,0.10) 0%, rgba(10,22,40,0.55) 100%)`,
        backdropFilter: 'blur(12px)',
        border: `1px solid ${accentColor}66`,
        boxShadow: `0 0 24px ${accentColor}33, inset 0 0 20px rgba(79,179,232,0.08)`,
        color: '#E8F4FB',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
      }}
    >
      {/* Subtle scan-line / hologram texture overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: isHero ? 24 : 16,
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 4px)',
          pointerEvents: 'none',
        }}
      />

      <h2
        style={{
          margin: 0,
          fontSize: isHero ? 32 : 18,
          fontWeight: 700,
          letterSpacing: 0.3,
          textShadow: `0 0 12px ${accentColor}99`,
          lineHeight: 1.2,
        }}
      >
        {greeting.full}
      </h2>

      {subtitle && (
        <p
          style={{
            margin: '6px 0 0',
            fontSize: isHero ? 15 : 12,
            color: '#A6CFE5',
            fontWeight: 400,
          }}
        >
          {subtitle}
        </p>
      )}

      {/* Tiny window indicator dot (analytics-friendly + tells user the time-window) */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 8,
          right: 12,
          fontSize: 10,
          color: accentColor,
          textTransform: 'uppercase',
          letterSpacing: 1.5,
          fontWeight: 700,
          opacity: 0.7,
        }}
      >
        {greeting.windowKey}
      </div>
    </div>
  );
}
