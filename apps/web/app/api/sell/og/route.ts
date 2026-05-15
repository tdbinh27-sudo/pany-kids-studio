/**
 * @file app/api/sell/og/route.ts
 * @description Dynamic Open Graph image generator (1200x630 SVG).
 *              Personalizes title/subtitle per-share URL via query params.
 *              Lighter than @vercel/og (no react-dom dep, no satori).
 *
 * @params
 *   ?from=Hoa             - referrer name (sender) — "Chi Hoa moi ban"
 *   ?kids=3               - kid count — "3 con dang dung"
 *   ?family=Phuc,An,Y     - explicit kid names (comma-separated)
 *   ?headline=...         - custom headline override (max 60 chars)
 *
 * @examples
 *   /api/sell/og                                  -> default static-equivalent
 *   /api/sell/og?from=Hoa                         -> "Chi Hoa moi ban dung Pany Kids"
 *   /api/sell/og?from=Hoa&kids=3                  -> "Chi Hoa cung 3 con dang dung Pany Kids"
 *   /api/sell/og?family=Phuc,An,Nhu%20Y           -> "Phuc, An, Nhu Y - gia dinh Pany Kids"
 *
 * @cache 1 hour CDN + immutable per-query (deterministic output)
 * @reference Mirrors public/og-image.svg static brand spec.
 */

export const runtime = 'edge';

// D-035 Tree of Knowledge dark immersive aesthetic
const BRAND = {
  bgFrom: '#0E2542',      // navy radial center
  bgMid: '#0A1628',       // navy mid
  bgTo: '#03060D',        // near-black edge
  titleFrom: '#4FB3E8',   // cyan luminescence
  titleTo: '#00BFFF',     // electric blue
  ctaFrom: '#4FB3E8',
  ctaTo: '#00BFFF',
  text: '#E8F4FB',        // light cyan-white
  mute: '#7FB3D5',        // muted blue-gray
  amber: '#FFD43B',
  pink: '#FF6B9D',
  sky: '#4DABF7',
  mint: '#00D4AA',        // teal
  purple: '#845EC2',
  glow: '#4FB3E8',
};

// XML/SVG-safe escape — prevents injection via query params.
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function clip(s: string, max: number): string {
  const t = s.trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).trim() + '…';
}

type Personalization = {
  badge: string;
  emojiRow: string;
  title: string;
  subtitle1: string;
  subtitle2: string;
  cta: string;
};

function buildPersonalization(params: URLSearchParams): Personalization {
  const from = params.get('from')?.trim();
  const kids = params.get('kids')?.trim();
  const family = params.get('family')?.trim();
  const headline = params.get('headline')?.trim();

  // Default state — D-035 Tree of Knowledge dark mode
  let badge = '🎁 MIỄN PHÍ · CẬP NHẬT MỖI TUẦN';
  let title = 'Pany Kids Studio';
  let subtitle1 = 'Cây tri thức của con · 5-16 tuổi · 5 học viên';
  let subtitle2 = '12 cành phát triển · Cô Pany AI · Cha mẹ là tia nắng nuôi cây';

  // Priority: explicit headline > family > from+kids > from > kids > default
  if (headline) {
    title = clip(headline, 38);
    subtitle1 = 'Pany Kids Studio · Studio học tập gia đình';
  } else if (family) {
    const names = family
      .split(',')
      .map(n => clip(n.trim(), 14))
      .filter(Boolean)
      .slice(0, 5);
    if (names.length > 0) {
      title = clip(names.join(' · '), 38);
      subtitle1 = 'Gia đình đang dùng Pany Kids Studio';
    }
  } else if (from && kids) {
    const kidCount = parseInt(kids, 10);
    if (Number.isFinite(kidCount) && kidCount > 0 && kidCount <= 9) {
      title = `${clip(from, 18)} cùng ${kidCount} con`;
      subtitle1 = 'đang học cùng Pany Kids Studio';
      badge = '👋 Mời bạn cùng tham gia';
    }
  } else if (from) {
    title = `${clip(from, 22)} mời bạn`;
    subtitle1 = 'dùng Pany Kids Studio cùng gia đình';
    badge = '🎁 MIỄN PHÍ · CẬP NHẬT MỖI TUẦN';
  } else if (kids) {
    const kidCount = parseInt(kids, 10);
    if (Number.isFinite(kidCount) && kidCount > 0 && kidCount <= 9) {
      subtitle1 = `Studio học tập cho ${kidCount} con · 5-16 tuổi`;
    }
  }

  return {
    badge: escapeXml(badge),
    emojiRow: '🌳 🌸 🍎 🌿 ✨',
    title: escapeXml(title),
    subtitle1: escapeXml(subtitle1),
    subtitle2: escapeXml(subtitle2),
    cta: '🌳 kids.panyvn.app/dangky →',
  };
}

function renderSvg(p: Personalization): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="${BRAND.bgFrom}"/>
      <stop offset="50%" stop-color="${BRAND.bgMid}"/>
      <stop offset="100%" stop-color="${BRAND.bgTo}"/>
    </radialGradient>
    <linearGradient id="title" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${BRAND.titleFrom}"/>
      <stop offset="100%" stop-color="${BRAND.titleTo}"/>
    </linearGradient>
    <linearGradient id="cta" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${BRAND.ctaFrom}"/>
      <stop offset="100%" stop-color="${BRAND.ctaTo}"/>
    </linearGradient>
    <radialGradient id="canopy" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${BRAND.glow}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="${BRAND.bgMid}" stop-opacity="0"/>
    </radialGradient>
    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Canopy halo behind title -->
  <ellipse cx="600" cy="300" rx="500" ry="280" fill="url(#canopy)"/>

  <!-- Data particles -->
  <g fill="${BRAND.glow}" opacity="0.6">
    <circle cx="100" cy="120" r="2.5"/>
    <circle cx="200" cy="80" r="2"/>
    <circle cx="320" cy="160" r="2.2"/>
    <circle cx="850" cy="100" r="2"/>
    <circle cx="980" cy="180" r="2.5"/>
    <circle cx="1080" cy="120" r="2"/>
    <circle cx="150" cy="500" r="2"/>
    <circle cx="1050" cy="480" r="2.5"/>
  </g>

  <!-- Brand badge top-left -->
  <g transform="translate(60, 60)">
    <rect width="280" height="44" rx="22" fill="rgba(255,212,59,0.12)" stroke="${BRAND.amber}" stroke-width="1.5" stroke-opacity="0.6"/>
    <text x="140" y="29" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="${BRAND.amber}" text-anchor="middle">${p.badge}</text>
  </g>

  <!-- Hero emoji row -->
  <text x="600" y="200" font-family="system-ui, -apple-system, sans-serif" font-size="64" text-anchor="middle" opacity="0.85" filter="url(#softGlow)">🌳 🌸 🍎 🌿 ✨</text>

  <!-- Main title with cyan glow -->
  <text x="600" y="310" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="900" fill="url(#title)" text-anchor="middle" filter="url(#softGlow)">${p.title}</text>

  <!-- Subtitle 1 -->
  <text x="600" y="372" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="600" fill="${BRAND.text}" text-anchor="middle">${p.subtitle1}</text>

  <!-- Subtitle 2 -->
  <text x="600" y="412" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="400" fill="${BRAND.mute}" text-anchor="middle">${p.subtitle2}</text>

  <!-- CTA button cyan-gradient -->
  <g transform="translate(380, 460)">
    <rect width="440" height="72" rx="36" fill="url(#cta)" stroke="${BRAND.glow}" stroke-width="1" stroke-opacity="0.8" filter="url(#softGlow)"/>
    <text x="220" y="46" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="${BRAND.bgMid}" text-anchor="middle">${p.cta}</text>
  </g>

  <!-- Footer line -->
  <text x="600" y="592" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="${BRAND.glow}" text-anchor="middle" opacity="0.7">PANY Vietnam · 2026 · Tuân thủ PDPL Việt Nam · panyvn.app</text>
</svg>`;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const p = buildPersonalization(url.searchParams);
  const svg = renderSvg(p);

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      // 1 hour CDN cache; immutable per query string (deterministic output)
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'Vary': 'Accept-Encoding',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
