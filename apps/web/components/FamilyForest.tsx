'use client';

/**
 * @file components/FamilyForest.tsx
 * @description Parent-view family forest — visualizes 1-5 kids as trees of varying
 *              life-stages side by side. D-035 Tree of Knowledge metaphor.
 *
 * Each kid renders as one SVG tree positioned in a row. Tree size + leaf count
 * scales with kid's "life stage" derived from level + age:
 *
 *   🌰 Hạt giống     stage 1 → 4-5t   (tiny seed sprite, no canopy)
 *   🌱 Mầm non       stage 2 → 5-7t   (small sprout, 6 leaves)
 *   🌿 Cây non       stage 3 → 7-10t  (young tree, 18 leaves)
 *   🌳 Trưởng thành  stage 4 → 10-13t (mature tree, 36 leaves)
 *   🌸 Ra hoa        stage 5 → 13-16t (tree + flowers)
 *   🍎 Kết trái      stage 6 → 16+t   (tree + fruits)
 *
 * Each tree carries a footer with: name + level + stage label + streak.
 * Parent can tap a tree to view per-kid timeline (callback prop).
 *
 * Visual matches D-035 canonical: dark navy backdrop + cyan bioluminescent leaves.
 */

export type FamilyKid = {
  id: string;
  name: string;
  age: number;
  /** 0-100 cumulative learning progress used to derive stage */
  level?: number;
  /** Consecutive days the kid has logged in / completed something */
  streakDays?: number;
  /** Optional preferred display order (otherwise sorted by age desc) */
  order?: number;
};

export type FamilyForestProps = {
  kids: FamilyKid[];
  /** Click handler — parent invokes drill-down to per-kid view */
  onSelectKid?: (kid: FamilyKid) => void;
  /** Optional title above the forest */
  title?: string;
  /** Subtitle line */
  subtitle?: string;
};

type LifeStage = {
  key: 1 | 2 | 3 | 4 | 5 | 6;
  emoji: string;
  label: string;
  heightPx: number;
  leafCount: number;
  flowerCount: number;
  fruitCount: number;
};

const STAGES: Record<number, LifeStage> = {
  1: { key: 1, emoji: '🌰', label: 'Hạt giống', heightPx: 80, leafCount: 0, flowerCount: 0, fruitCount: 0 },
  2: { key: 2, emoji: '🌱', label: 'Mầm non', heightPx: 130, leafCount: 6, flowerCount: 0, fruitCount: 0 },
  3: { key: 3, emoji: '🌿', label: 'Cây non', heightPx: 180, leafCount: 18, flowerCount: 0, fruitCount: 0 },
  4: { key: 4, emoji: '🌳', label: 'Trưởng thành', heightPx: 240, leafCount: 36, flowerCount: 0, fruitCount: 0 },
  5: { key: 5, emoji: '🌸', label: 'Ra hoa', heightPx: 280, leafCount: 42, flowerCount: 8, fruitCount: 0 },
  6: { key: 6, emoji: '🍎', label: 'Kết trái', heightPx: 320, leafCount: 48, flowerCount: 6, fruitCount: 3 },
};

function deriveStage(kid: FamilyKid): LifeStage {
  const lvl = kid.level ?? 0;
  // Level takes precedence; age provides fallback for new kids without progress data.
  if (lvl >= 51) return STAGES[6];
  if (lvl >= 31) return STAGES[5];
  if (lvl >= 16) return STAGES[4];
  if (lvl >= 6) return STAGES[3];
  if (lvl >= 3) return STAGES[2];
  if (lvl >= 1) return STAGES[1];

  // No level data — fall back to age bracket
  if (kid.age >= 16) return STAGES[5];
  if (kid.age >= 13) return STAGES[4];
  if (kid.age >= 10) return STAGES[4];
  if (kid.age >= 7) return STAGES[3];
  if (kid.age >= 5) return STAGES[2];
  return STAGES[1];
}

const BRAND = {
  cyan: '#4FB3E8',
  electricBlue: '#00BFFF',
  teal: '#00D4AA',
  navy: '#0A1628',
  purple: '#845EC2',
  pink: '#FF6B9D',
  amber: '#FFD43B',
  textLight: '#E8F4FB',
  textMute: '#7FB3D5',
};

function KidTree({ kid, onClick }: { kid: FamilyKid; onClick?: () => void }) {
  const stage = deriveStage(kid);
  const w = 160;
  const h = stage.heightPx;

  // Deterministic leaf positions (hash kid.id) so layout is stable across renders
  const seed = kid.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = (n: number) => {
    // Mulberry32 deterministic PRNG
    let t = (seed + n) >>> 0;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  return (
    <button
      onClick={onClick}
      aria-label={`Cây của ${kid.name} — ${stage.label}`}
      style={{
        position: 'relative',
        background: 'rgba(15,34,64,0.6)',
        border: `1px solid ${BRAND.cyan}33`,
        borderRadius: 16,
        padding: '20px 12px 16px',
        cursor: onClick ? 'pointer' : 'default',
        minWidth: 180,
        textAlign: 'center',
        color: BRAND.textLight,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        backdropFilter: 'blur(8px)',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = `0 12px 32px rgba(79,179,232,0.35)`;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* SVG tree */}
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id={`canopy-${kid.id}`} cx="50%" cy="40%" r="55%">
            <stop offset="0%" stop-color={BRAND.cyan} stop-opacity="0.45"/>
            <stop offset="100%" stop-color={BRAND.cyan} stop-opacity="0"/>
          </radialGradient>
          <radialGradient id={`fruit-${kid.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
            <stop offset="40%" stop-color={BRAND.cyan} stop-opacity="0.7"/>
            <stop offset="100%" stop-color={BRAND.cyan} stop-opacity="0"/>
          </radialGradient>
        </defs>

        {/* Canopy halo glow */}
        {stage.key >= 2 && (
          <ellipse cx={w / 2} cy={h * 0.35} rx={w * 0.42} ry={h * 0.28} fill={`url(#canopy-${kid.id})`}/>
        )}

        {/* Trunk */}
        {stage.key >= 2 && (
          <path
            d={`M ${w / 2 - 4} ${h - 8} Q ${w / 2 - 6} ${h * 0.6} ${w / 2 - 5} ${h * 0.4} L ${w / 2 + 5} ${h * 0.4} Q ${w / 2 + 6} ${h * 0.6} ${w / 2 + 4} ${h - 8} Z`}
            fill="#1A3A5C"
            stroke={BRAND.cyan}
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />
        )}

        {/* Seed sprite (stage 1 only) */}
        {stage.key === 1 && (
          <g>
            <ellipse cx={w / 2} cy={h - 14} rx="14" ry="10" fill="#6E4A28"/>
            <path d={`M ${w / 2} ${h - 22} Q ${w / 2 - 3} ${h - 30} ${w / 2 - 1} ${h - 36}`} stroke={BRAND.teal} strokeWidth="2" fill="none"/>
          </g>
        )}

        {/* Branches (stage 3+) */}
        {stage.key >= 3 && (
          <g stroke="#1A3A5C" strokeWidth="1.5" fill="none" opacity="0.8">
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = (i / 5) * Math.PI - Math.PI / 2;
              const len = 30 + stage.key * 4;
              const x1 = w / 2;
              const y1 = h * 0.42;
              const x2 = w / 2 + Math.cos(angle) * len;
              const y2 = h * 0.42 + Math.sin(angle) * len;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}/>;
            })}
          </g>
        )}

        {/* Leaves */}
        {Array.from({ length: stage.leafCount }).map((_, i) => {
          const x = w / 2 + (rand(i * 3) - 0.5) * w * 0.7;
          const y = h * 0.15 + rand(i * 3 + 1) * h * 0.3;
          const r = 4 + rand(i * 3 + 2) * 3;
          return <circle key={i} cx={x} cy={y} r={r} fill={BRAND.cyan} opacity={0.6 + rand(i * 3 + 7) * 0.4}/>;
        })}

        {/* Flowers (stage 5+) */}
        {Array.from({ length: stage.flowerCount }).map((_, i) => {
          const x = w / 2 + (rand(i * 5 + 100) - 0.5) * w * 0.55;
          const y = h * 0.18 + rand(i * 5 + 101) * h * 0.25;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="5" fill={BRAND.pink} opacity="0.85"/>
              <circle cx={x} cy={y} r="2" fill={BRAND.amber}/>
            </g>
          );
        })}

        {/* Fruits (stage 6 only) */}
        {Array.from({ length: stage.fruitCount }).map((_, i) => {
          const x = w / 2 + (rand(i * 7 + 200) - 0.5) * w * 0.5;
          const y = h * 0.22 + rand(i * 7 + 201) * h * 0.25;
          return <circle key={i} cx={x} cy={y} r="8" fill={`url(#fruit-${kid.id})`}/>;
        })}
      </svg>

      {/* Footer info */}
      <div style={{ marginTop: 10 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: BRAND.textLight, lineHeight: 1.2 }}>
          {kid.name} <span style={{ fontSize: 13, color: BRAND.textMute, fontWeight: 500 }}>· {kid.age}t</span>
        </div>
        <div style={{ fontSize: 12, color: BRAND.cyan, marginTop: 4, fontWeight: 600, letterSpacing: 0.3 }}>
          {stage.emoji} {stage.label}
          {typeof kid.level === 'number' && <span style={{ color: BRAND.textMute, marginLeft: 6 }}>· Cấp {kid.level}</span>}
        </div>
        {typeof kid.streakDays === 'number' && kid.streakDays > 0 && (
          <div style={{ fontSize: 11, color: BRAND.amber, marginTop: 4 }}>
            🔥 {kid.streakDays} ngày liên tiếp
          </div>
        )}
      </div>
    </button>
  );
}

export default function FamilyForest({
  kids,
  onSelectKid,
  title = '🌳 Vườn ươm gia đình',
  subtitle,
}: FamilyForestProps) {
  if (!kids || kids.length === 0) {
    return null;
  }

  // Sort: explicit order asc first, then age desc (older kids → taller trees on left)
  const sorted = [...kids].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return b.age - a.age;
  });

  const defaultSubtitle =
    sorted.length === 1
      ? '1 cây đang phát triển'
      : `${sorted.length} cây đang phát triển song song`;

  return (
    <section
      style={{
        background: 'radial-gradient(ellipse at center top, rgba(14,37,66,0.85) 0%, rgba(10,22,40,0.95) 100%)',
        padding: '40px 24px',
        borderRadius: 24,
        border: `1px solid ${BRAND.cyan}33`,
        boxShadow: `0 0 48px rgba(79,179,232,0.18)`,
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h2
          style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 800,
            color: BRAND.textLight,
            textShadow: `0 0 18px rgba(79,179,232,0.4)`,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            margin: '8px 0 0',
            fontSize: 14,
            color: BRAND.textMute,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {subtitle ?? defaultSubtitle}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        {sorted.map((kid) => (
          <KidTree
            key={kid.id}
            kid={kid}
            onClick={onSelectKid ? () => onSelectKid(kid) : undefined}
          />
        ))}
      </div>
    </section>
  );
}
