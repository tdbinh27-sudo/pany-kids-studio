'use client';

/**
 * @file components/TreeOfKnowledgeHome.tsx
 * @description Dashboard home screen — canonical Tree of Knowledge image as
 *              static cinematic backdrop with a simple navigation grid below.
 *              Per anh feedback 2026-05-15 (Phase 2c refinement):
 *                - REMOVED clickable hotspot dots over the image (visually
 *                  competed with the existing glow cards baked into the image)
 *                - Grid below image is the ONLY interactive nav surface
 *                - Greeting uses inline variant (smaller, mobile-friendly)
 *                - 'overview' self-ref removed from grid (currently rendering)
 *
 * Nav items below image (10):
 *   📚 Thư viện · 🇬🇧 Tiếng Anh · 📖 Lộ trình · 🎓 Cây kỹ năng
 *   👤 Học viên · 🌍 Khám phá · 🚀 Hướng nghiệp
 *   🏆 Huy hiệu · 🎨 Portfolio · 📈 Bảng xếp hạng
 */

export type NavItem = {
  id: string;
  label: string;
  label_en?: string;
  tab: string;
  icon: string;
  glow: string;
};

const DEFAULT_NAV: NavItem[] = [
  { id: 'library',     label: 'Thư viện',       label_en: 'Library',     tab: 'library',     icon: '📚', glow: '#845EC2' },
  { id: 'english',     label: 'Tiếng Anh',      label_en: 'English',     tab: 'english',     icon: '🇬🇧', glow: '#845EC2' },
  { id: 'roadmap',     label: 'Lộ trình',       label_en: 'Roadmap',     tab: 'roadmap',     icon: '📖', glow: '#FF6B9D' },
  { id: 'skilltree',   label: 'Cây kỹ năng',    label_en: 'Skill Tree',  tab: 'skilltree',   icon: '🎓', glow: '#FF6B9D' },
  { id: 'kids',        label: 'Học viên',       label_en: 'Kids',        tab: 'kids',        icon: '👤', glow: '#4FB3E8' },
  { id: 'discovery',   label: 'Khám phá',       label_en: 'Discovery',   tab: 'discovery',   icon: '🌍', glow: '#00D4AA' },
  { id: 'career',      label: 'Hướng nghiệp',   label_en: 'Career',      tab: 'career',      icon: '🚀', glow: '#00BFFF' },
  { id: 'badges',      label: 'Huy hiệu',       label_en: 'Badges',      tab: 'badges',      icon: '🏆', glow: '#FFD43B' },
  { id: 'portfolio',   label: 'Portfolio',      label_en: 'Portfolio',   tab: 'portfolio',   icon: '🎨', glow: '#FF6B9D' },
  { id: 'leaderboard', label: 'Bảng xếp hạng',  label_en: 'Leaderboard', tab: 'leaderboard', icon: '📈', glow: '#FFD43B' },
];

type Props = {
  /** Invoked when user clicks a nav card */
  onNavigate: (tabId: string) => void;
  /** Display language */
  lang?: 'vi' | 'en';
  /** Optional override nav items */
  navItems?: NavItem[];
  /** Greeting children rendered above grid (e.g. HeroGreeting inline) */
  children?: React.ReactNode;
};

export default function TreeOfKnowledgeHome({
  onNavigate,
  lang = 'vi',
  navItems = DEFAULT_NAV,
  children,
}: Props) {
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
      {/* Background canonical image — static backdrop, no overlays */}
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

      {/* Subtle vignette focusing center */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Content layer — greeting + nav grid */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 1100,
          margin: '0 auto',
          padding: '24px 16px 48px',
        }}
      >
        {/* Greeting at top */}
        {children && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 24,
            }}
          >
            {children}
          </div>
        )}

        {/* Hero image breathing room — image visible above and to the sides as backdrop */}
        <div style={{ minHeight: 'min(60vh, 540px)' }} />

        {/* Nav grid — primary navigation surface */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 12,
            marginTop: 0,
          }}
        >
          {navItems.map((item) => {
            const labelText = lang === 'en' && item.label_en ? item.label_en : item.label;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.tab)}
                style={{
                  background: 'rgba(15,34,64,0.78)',
                  border: `1px solid ${item.glow}66`,
                  borderRadius: 14,
                  padding: '14px 14px',
                  color: '#E8F4FB',
                  cursor: 'pointer',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: 15,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 10px 28px ${item.glow}55`;
                  e.currentTarget.style.borderColor = `${item.glow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = `${item.glow}66`;
                }}
              >
                <span style={{ fontSize: 24, flexShrink: 0 }} aria-hidden="true">
                  {item.icon}
                </span>
                <span>{labelText}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
