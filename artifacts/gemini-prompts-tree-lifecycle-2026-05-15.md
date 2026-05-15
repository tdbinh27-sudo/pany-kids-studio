# 🌳 Tree Life-Cycle Progression — 6 Gemini Imagen Prompts

**Created:** 2026-05-15 Session 18 Phase 3d
**Goal:** Generate 6 square images representing the 6 life-stages of a kid's "tree" in Pany Kids Studio dashboard. Each stage maps to a kid age range + visual tree maturity. Images will be displayed side-by-side as a progression strip in dashboard (replacing the current SVG-rendered FamilyForest trees).

**Aesthetic constraint:** ALL 6 images must share the same brand aesthetic as the canonical Tree of Knowledge hero (`public/tree-of-knowledge-hero.jpg`):
- Cyan bioluminescent veins + glowing leaves
- Dark navy background (#0A1628 dominant)
- Photorealistic 3D CGI render quality
- Sacred · futuristic · awe-inspiring mood
- Vietnamese cherry blossom (hoa mai) accents at later stages

**How to use:**
1. Open https://gemini.google.com → Imagen mode (or https://aistudio.google.com → Imagen)
2. Paste each prompt one at a time
3. Generate 4 variants per prompt → pick best 1 per stage
4. Save outputs as: `artifacts/mockups/tree/lifecycle-stage-{1,2,3,4,5,6}.png`
5. Em will use these for new `LifecycleProgressionStrip.tsx` component

**Aspect ratio:** 1:1 square (1024×1024) — matches strip layout 6 columns equal width.

---

## Stage 1 — 🌰 HẠT GIỐNG (Seed · age 4-5)

```
A magical glowing seed nestled in dark rich soil, captured in a photorealistic 3D CGI close-up macro shot. The seed is small (about palm-sized), oval, brown-textured with subtle cyan-teal bioluminescent veins glowing softly from within — hinting at the magnificent tree it will become. A tiny single green sprout barely emerging from the seed's top, with one delicate leaf. Soil is dark and rich brown with a few floating cyan particles (data motes) drifting in the air above. Dark navy ambient background #0A1628. Soft volumetric god rays descending from above. Highlight on the seed creating a sacred reverent atmosphere. Style: Avatar Tree of Souls + Unreal Engine 5 quality. NOT cartoon, NOT photo-real seed. Hopeful, beginning, potential. 1:1 square 1024×1024. No text.
```

---

## Stage 2 — 🌱 MẦM NON (Sprout · age 5-7)

```
A young illustrated sprout 30cm tall growing from dark rich soil, captured photorealistic 3D CGI medium shot. The sprout has a slender pale-green stem with cyan-teal bioluminescent veins running upward, 4-6 small heart-shaped leaves glowing softly cyan around the top. A few floating data particles drift around. Tiny first cherry blossom bud forming at the top center. Background: dark navy #0A1628 with subtle radial gradient lighter at center. Volumetric god rays descending illuminating the sprout. Style: same as canonical Tree of Knowledge — Avatar Tree of Souls + Tron Legacy glow + Unreal Engine 5. Childlike wonder, fragile life, just-beginning growth. Vietnamese kid-friendly aesthetic. 1:1 square 1024×1024. No text.
```

---

## Stage 3 — 🌿 CÂY NON (Young Tree · age 7-10)

```
A young 1-meter-tall illustrated tree with thin trunk and 5-6 visible branches, photorealistic 3D CGI medium shot. Trunk is sturdy young wood with cyan-teal bioluminescent veins flowing up like data streams. Branches hold about 20-25 glowing mint-cyan heart-shaped leaves, with subtle electric blue highlights on a few. One small pink cherry blossom blooming on a top branch. Soil at base with 1-2 small floating motes. Dark navy #0A1628 background, soft radial gradient. Volumetric light from above. Style: matches canonical Tree of Knowledge — magical, bioluminescent, sacred. Growing confidently, optimistic. 1:1 square 1024×1024. No text.
```

---

## Stage 4 — 🌳 CÂY TRƯỞNG THÀNH (Mature Tree · age 10-13)

```
A magnificent mature illustrated tree 2 meters tall with sturdy trunk and exactly 12 distinct branches radiating in organic asymmetric pattern, photorealistic 3D CGI medium shot. Trunk glows from within with cyan-teal bioluminescent veins flowing strongly upward like data streams. Canopy holds hundreds of glowing cyan-blue heart-shaped leaves with electric blue highlights creating ambient halo glow. 2-3 small pink cherry blossoms scattered among leaves. Floating data particles drifting through the air. Dark navy #0A1628 background with strong radial gradient and volumetric god rays descending through the canopy. Style: directly matches canonical Tree of Knowledge hero image — Avatar Tree of Souls + Unreal Engine 5 + Apple Park exhibit. Sacred, sophisticated, in full growth. 1:1 square 1024×1024. No text.
```

---

## Stage 5 — 🌸 RA HOA (Flowering · age 13-16)

```
A magnificent illustrated tree in full bloom with 12 branches covered in delicate pink cherry blossoms (hoa mai Vietnamese style), photorealistic 3D CGI medium shot. Tree trunk 2m tall, cyan-teal bioluminescent veins glowing strongly upward. Among the green-mint leaves: 30-40 pink cherry blossoms in various opening stages, some with golden-amber center stamens emitting soft warm glow. Several fallen petals drifting in air alongside cyan data particles. Subtle warm pink-amber light mixing with dominant cyan from the canopy creating dual-tone magical atmosphere. Dark navy #0A1628 background, radial gradient, god rays. Style: same canonical aesthetic but with romantic celebratory mood — peak beauty, identity emerging. Vietnamese spring cherry blossom feel. 1:1 square 1024×1024. No text.
```

---

## Stage 6 — 🍎 KẾT TRÁI (Fruiting · age 16+ · career fork)

```
A triumphant illustrated tree heavy with both blooming cherry blossoms AND 3 prominent ripe golden-glowing fruit orbs, photorealistic 3D CGI medium shot. Tree 2m tall with 12 strong branches. Bioluminescent cyan veins flowing up the trunk. Canopy has dense cyan-glow leaves + 40+ pink cherry blossoms + exactly 3 large prominent fruits hanging gracefully — each fruit a golden-amber orb with a brighter white-cyan core (like a small star). The 3 fruits represent 3 chosen career paths (e.g., engineer / doctor / artist). Floating cyan + amber data particles. Background: deep navy #0A1628 with strong warm golden glow at the canopy area mixing with cyan, suggesting sunrise/sunset transition. Volumetric god rays. Style: canonical Tree of Knowledge but with maximum maturity + accomplishment + sacred harvest mood. Triumphant, fulfilled, journey-complete. 1:1 square 1024×1024. No text.
```

---

## 📋 After generation

Anh save 6 PNG files vào:
```
artifacts/mockups/tree/lifecycle-stage-1-seed.png       (Hạt giống)
artifacts/mockups/tree/lifecycle-stage-2-sprout.png     (Mầm non)
artifacts/mockups/tree/lifecycle-stage-3-young.png      (Cây non)
artifacts/mockups/tree/lifecycle-stage-4-mature.png     (Trưởng thành)
artifacts/mockups/tree/lifecycle-stage-5-bloom.png      (Ra hoa)
artifacts/mockups/tree/lifecycle-stage-6-fruit.png      (Kết trái)
```

Em sẽ:
1. Optimize via ffmpeg → JPG ~150KB each (1024×1024 Q3)
2. Save vào `public/lifecycle/stage-{N}.jpg`
3. Build `LifecycleProgressionStrip.tsx` component
4. Wire vào FamilyForest replacing SVG trees (or as separate section)
5. Wire vào Overview page as educational progression visual

## 🎨 Style consistency tips

- All 6 prompts share: cyan #4FB3E8 dominant + dark navy #0A1628 + same volumetric god rays
- Stage 1-3: cooler tones, building anticipation
- Stage 4: canonical fully-bloomed = brand center
- Stage 5: warm pink-amber mix entering (romantic)
- Stage 6: golden + cyan harmony (career fork = peak)

If Imagen output drifts off-style, em recommend tweaking:
- Always include "Avatar Tree of Souls + Unreal Engine 5" reference
- Always include "Dark navy #0A1628 background"
- Always include "1:1 square 1024×1024"
- Remove if too realistic: "stylized illustrated, NOT photorealistic plant"

## 🚪 Future iterations

Once 6 base images stable, em can generate variations:
- Day vs night mood per stage (morning sun → moonlight)
- Family alliance shot (3 trees at different stages side-by-side)
- Kid avatar inserted (Phúc 11t = Stage 4, An 9t = Stage 3, Như Ý 5t = Stage 2)
- Animated GIF morphing stage 1 → stage 6 (~3-5s loop) for hero animation
