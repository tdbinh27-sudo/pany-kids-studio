# 🌳 Tree of Knowledge — Canonical Brand Mockups (D-035)

**Created:** 2026-05-15 Session 18
**Status:** Visual identity LOCKED — anh đã pick variant từ Gemini Imagen output 2026-05-15

## Canonical image (Session 18 final pick)

Anh's chosen Gemini Imagen output → save vào folder này với tên `canonical-2026-05-15.png`.

**Visual elements confirmed** (verified anh's reference):
- ✅ Magnificent ancient tree center, cyan-teal bioluminescent veins
- ✅ Wide canopy with thousands of glowing leaves + 5-6 fruit-orbs
- ✅ Cylindrical glass walls + side projection screens (left: canopy detail, right: 3 family saplings with progress %)
- ✅ Outer disc with Earth holographic globe center + 4 template cards (Library, Learning, Curriculum, Tracks) on LEFT under canopy
- ✅ Inner disc with sleek white-cyan spaceship + 6 career medallions arrayed 360° (astronaut, doctor, engineer, artist, business, scientist) with score numbers (5570/5300/4700/5300/7095/etc)
- ✅ Center holographic column: kid avatar silhouette ring (top) + 12-segment radial donut chart (middle) + ascending line graph (bottom)
- ✅ Brand purple/pink accents preserved on template cards
- ✅ Aspect ratio 16:9 cinematic widescreen

## Derived assets needed (Phase 1 build)

After saving `canonical-2026-05-15.png`, generate these variants:

- `hero-landing-1920x1080.png` — crop/extend for landing /welcome + /sell hero
- `hero-mobile-1080x1920.png` — vertical adaptation
- `og-image-1200x630.png` — replace static `public/og-image.svg`
- `dashboard-backdrop-2560x1440.png` — main `/` dashboard background (subtle opacity)
- `favicon-32x32.png` — pick a single fruit-orb glow as favicon
- `share-zalo-1200x1200.png` — square Zalo share card

## App integration (already wired Session 18)

- `lib/greeting.ts` — VN time-of-day greeting (5 windows) + 3 user modes (kid/parent/anonymous)
- `components/HeroGreeting.tsx` — holographic overlay matching this aesthetic
  - Used in: `/welcome` hero · `/sell` hero · `/` dashboard header

## Color palette (locked)

| Token | Hex | Usage |
|---|---|---|
| Cyan luminescence | `#4FB3E8` | Tree veins, leaves, atmospheric glow (DOMINANT) |
| Electric blue | `#00BFFF` | Brightest highlights, fruit-orbs |
| Teal | `#00D4AA` | Earth oceans, data accents |
| Deep navy | `#0A1628` | Background base |
| Brand purple | `#845EC2` | Template cards edge, brand accent |
| Brand pink | `#FF6B9D` | Career medallions, secondary brand accent |
| Warm amber | `#FFD43B` | Noon time-window accent, highlight pops |

## Future variants

After canonical pick stabilizes, re-gen Gemini with these tweaks:
- Day/night version (lighter/darker mood for time-of-day theming)
- 6 life-stage variants of the tree (Hạt giống → Mầm → Cây non → Trưởng thành → Ra hoa → Kết trái)
- Family forest (3 trees of different sizes side by side)
- Parent watering close-up (intimate moment for share)
