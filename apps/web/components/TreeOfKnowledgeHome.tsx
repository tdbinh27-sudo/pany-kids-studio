'use client';

/**
 * @file components/TreeOfKnowledgeHome.tsx
 * @description Dashboard home screen — canonical Tree of Knowledge image with
 *              clickable hotspot overlays that navigate to existing tabs.
 *              Replaces traditional sidebar navigation per anh feedback 2026-05-15.
 *
 * Hotspots are positioned by % coordinates over the 1920×1072 canonical image:
 *   - 4 template cards (left under canopy)  → Library / Learn / Roadmap / Skilltree
 *   - Holographic center column              → Kids profile
 *   - Earth (outer disc center)              → Overview stats
 *   - Spaceship + career medallions          → Career compass
 *
 * Each hotspot:
 *   - Renders a glowing dot at coordinate
 *   - Shows label on hover/focus
 *   - Click triggers navigateToTab callback
 *   - Keyboard accessible (Tab + Enter)
 */

import { useEffect, useState } from 'react';

export type Hotspot = {
  id: string;
  /** % of image width (0-100) — x position of hotspot center */
  x: number;
  /** % of image height (0-100) — y position of hotspot center */
  y: number;
  /** Vietnamese label shown on hover */
  label: string;
  /** Optional English label */
  label_en?: string;
  /** Existing dashboard tab id this hotspot navigates to */
  tab: string;
  /** Glow color override (default cyan) */
  glow?: string;
  /** Icon emoji shown inside dot */
  icon?: string;
};

const DEFAULT_HOTSPOTS: Hotspot[] = [
  // 4 left-side template cards (under canopy shadow)
  { id: 'library',    x: 9.5,  y: 65, label: 'Thư viện',    label_en: 'Library',    tab: 'library',    icon: '📚', glow: '#845EC2' },
  { id: 'english',    x: 14.5, y: 65, label: 'Tiếng Anh',   label_en: 'English',    tab: 'english',    icon: '🇬🇧', glow: '#845EC2' },
  { id: 'roadmap',    x: 19.5, y: 65, label: 'Lộ trình',    label_en: 'Roadmap',    tab: 'roadmap',    icon: '📖', glow: '#FF6B9D' },
  { id: 'skilltree',  x: 24.5, y: 65, label: 'Cây kỹ năng', label_en: 'Skill Tree', tab: 'skilltree',  icon: '🎓', glow: '#FF6B9D' },

  // Holographic center column (kid login + chart graph)
  { id: 'kids',       x: 50,   y: 35, label: 'Học viên',    label_en: 'Kids',       tab: 'kids',       icon: '👤', glow: '#4FB3E8' },
  { id: 'overview',   x: 50,   y: 50, label: 'Tổng quan',   label_en: 'Overview',   tab: 'overview',   icon: '📊', glow: '#4FB3E8' },

  // Earth (outer disc center)
  { id: 'discovery',  x: 50,   y: 78, label: 'Khám phá',    label_en: 'Discovery',  tab: 'discovery',  icon: '🌍', glow: '#00D4AA' },

  // Spaceship (inner disc center)
  { id: 'career',     x: 60,   y: 72, label: 'Hướng nghiệp', label_en: 'Career',     tab: 'career',     icon: '🚀', glow: '#00BFFF' },

  // Right side career medallions cluster
  { id: 'badges',     x: 82,   y: 65, label: 'Huy hiệu',    label_en: 'Badges',     tab: 'badges',     icon: '🏆', glow: '#FFD43B' },
  { id: 'portfolio',  x: 87,   y: 70, label: 'Portfolio',   label_en: 'Portfolio',  tab: 'portfolio',  icon: '🎨', glow: '#FF6B9D' },
  { id: 'leaderboard',x: 82,   y: 76, label: 'Bảng xếp hạng', label_en: 'Leaderboard', tab: 'leaderboard', icon: '📈', glow: '#FFD43B' },
];

type Props = {
  /** Callback invoked when user clicks a hotspot — parent updates activeTab */
  onNavigate: (tabId: string) => void;
  /** Display language */
  lang?: 'vi' | 'en';
  /** Optional override hotspots */
  hotspots?: Hotspot[];
  /** Greeting children rendered on top of image (e.g. HeroGreeting) */
  children?: React.ReactNode;
};

export default function TreeOfKnowledgeHome({
  onNavigate,
  lang = 'vi',
  hotspots = DEFAULT_HOTSPOTS,
  children,
}: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        background: '#0A1628',
        minHeight: 'calc(100vh - 100px)',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
      aria-label="Pany Kids Studio — Tree of Knowledge dashboard"
    >
      {/* Background canonical image */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/tree-of-knowledge-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      />

      {/* Subtle vignette to focus center */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Optional greeting overlay (top center) */}
      {children && (
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30,
            pointerEvents: 'auto',
          }}
        >
          {children}
        </div>
      )}

      {/* Image with intrinsic aspect ratio for hotspot positioning */}
      <div
        style={{
          position: 'relative',
          maxWidth: 1920,
          margin: '0 auto',
          aspectRatio: '1920 / 1072',
          zIndex: 10,
        }}
      >
        {hotspots.map((hot) => {
          const isHovered = hoveredId === hot.id;
          const labelText = lang === 'en' && hot.label_en ? hot.label_en : hot.label;
          const glow = hot.glow ?? '#4FB3E8';

          return (
            <button
              key={hot.id}
              onClick={() => onNavigate(hot.tab)}
              onMouseEnter={() => setHoveredId(hot.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(hot.id)}
              onBlur={() => setHoveredId(null)}
              aria-label={labelText}
              style={{
                position: 'absolute',
                left: `${hot.x}%`,
                top: `${hot.y}%`,
                transform: 'translate(-50%, -50%)',
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${glow}cc 0%, ${glow}33 60%, transparent 100%)`,
                border: `2px solid ${glow}`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                color: '#fff',
                boxShadow: isHovered
                  ? `0 0 24px ${glow}, 0 0 48px ${glow}88`
                  : `0 0 12px ${glow}aa`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                ...(isHovered ? { transform: 'translate(-50%, -50%) scale(1.2)' } : {}),
                fontFamily: 'system-ui, -apple-system, sans-serif',
                padding: 0,
                animation: mounted ? `pulse-${hot.id} 2.4s ease-in-out infinite` : 'none',
              }}
            >
              <span aria-hidden="true">{hot.icon ?? '✨'}</span>

              {/* Tooltip label */}
              {isHovered && (
                <span
                  style={{
                    position: 'absolute',
                    top: -48,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(10,22,40,0.95)',
                    color: '#E8F4FB',
                    padding: '6px 12px',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    border: `1px solid ${glow}`,
                    boxShadow: `0 4px 16px rgba(0,0,0,0.4), 0 0 12px ${glow}66`,
                    pointerEvents: 'none',
                  }}
                >
                  {labelText}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile fallback grid (visible only on small screens via CSS media query inline) */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.65; }
        }
        @media (max-width: 768px) {
          /* Stack hotspots as buttons below image on mobile */
        }
      `}</style>

      {/* Mobile-friendly tab grid (always rendered, hidden on desktop via media-query inline) */}
      <div
        className="tok-mobile-nav"
        style={{
          position: 'relative',
          zIndex: 20,
          maxWidth: 1100,
          margin: '24px auto 48px',
          padding: '0 16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 12,
        }}
      >
        {hotspots.map((hot) => {
          const labelText = lang === 'en' && hot.label_en ? hot.label_en : hot.label;
          const glow = hot.glow ?? '#4FB3E8';
          return (
            <button
              key={`mobile-${hot.id}`}
              onClick={() => onNavigate(hot.tab)}
              style={{
                background: 'rgba(15,34,64,0.7)',
                border: `1px solid ${glow}66`,
                borderRadius: 12,
                padding: '14px 12px',
                color: '#E8F4FB',
                cursor: 'pointer',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 14,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                backdropFilter: 'blur(8px)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 24px ${glow}55`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ fontSize: 22 }}>{hot.icon}</span>
              <span>{labelText}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
