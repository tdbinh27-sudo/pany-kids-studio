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

const BRAND = {
  bgFrom: '#FFE5F1',
  bgMid: '#F9F4FF',
  bgTo: '#E5DBFF',
  titleFrom: '#845EC2',
  titleTo: '#FF6B9D',
  ctaFrom: '#845EC2',
  ctaTo: '#6E4BB0',
  text: '#2D1B4E',
  mute: '#666',
  amber: '#FFD43B',
  pink: '#FF6B9D',
  sky: '#4DABF7',
  mint: '#51CF66',
  purple: '#845EC2',
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

  // Default state — mirrors static og-image.svg
  let badge = '🎁 MIỄN PHÍ · CẬP NHẬT MỖI TUẦN';
  let title = 'Pany Kids Studio';
  let subtitle1 = 'Studio học tập gia đình · 5-16 tuổi · 5 học viên';
  let subtitle2 = '12 trụ cột phát triển · Trợ lý AI Cô Pany · Setup 5 phút';

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
    emojiRow: '🌸 🚀 🎨 🌟 🧠',
    title: escapeXml(title),
    subtitle1: escapeXml(subtitle1),
    subtitle2: escapeXml(subtitle2),
    cta: 'kids.panyvn.app/dangky →',
  };
}

function renderSvg(p: Personalization): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${BRAND.bgFrom}"/>
      <stop offset="50%" stop-color="${BRAND.bgMid}"/>
      <stop offset="100%" stop-color="${BRAND.bgTo}"/>
    </linearGradient>
    <linearGradient id="title" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${BRAND.titleFrom}"/>
      <stop offset="100%" stop-color="${BRAND.titleTo}"/>
    </linearGradient>
    <linearGradient id="cta" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${BRAND.ctaFrom}"/>
      <stop offset="100%" stop-color="${BRAND.ctaTo}"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="6"/>
      <feOffset dx="0" dy="4"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.18"/></feComponentTransfer>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <circle cx="100" cy="120" r="30" fill="${BRAND.amber}" opacity="0.5"/>
  <circle cx="1050" cy="80" r="22" fill="${BRAND.pink}" opacity="0.55"/>
  <circle cx="1120" cy="500" r="36" fill="${BRAND.sky}" opacity="0.45"/>
  <circle cx="80" cy="540" r="26" fill="${BRAND.mint}" opacity="0.55"/>
  <circle cx="200" cy="60" r="14" fill="${BRAND.purple}" opacity="0.5"/>
  <circle cx="980" cy="560" r="18" fill="${BRAND.amber}" opacity="0.6"/>

  <g transform="translate(60, 60)">
    <rect width="220" height="42" rx="21" fill="#FFFBEB" stroke="#FBBF24" stroke-width="2"/>
    <text x="110" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#92400E" text-anchor="middle">${p.badge}</text>
  </g>

  <text x="600" y="200" font-family="system-ui, -apple-system, sans-serif" font-size="84" text-anchor="middle">${p.emojiRow}</text>

  <text x="600" y="310" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="900" fill="url(#title)" text-anchor="middle" filter="url(#softShadow)">${p.title}</text>

  <text x="600" y="372" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="600" fill="${BRAND.text}" text-anchor="middle">${p.subtitle1}</text>

  <text x="600" y="416" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="400" fill="${BRAND.mute}" text-anchor="middle">${p.subtitle2}</text>

  <g transform="translate(400, 470)">
    <rect width="400" height="72" rx="36" fill="url(#cta)" filter="url(#softShadow)"/>
    <text x="200" y="46" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="700" fill="#FFFFFF" text-anchor="middle">${p.cta}</text>
  </g>

  <text x="600" y="592" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="${BRAND.purple}" text-anchor="middle">PANY Vietnam · 2026 · Tuân thủ PDPL Việt Nam · panyvn.app</text>
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
