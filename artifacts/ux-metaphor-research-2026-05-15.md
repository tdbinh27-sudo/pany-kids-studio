# UX Metaphor Research — Pany Kids Dashboard + Landing Redesign

**Created:** 2026-05-15 Session 18 · Phase B
**Trigger:** Anh feedback "Dashboard chính & landing page đang rối & nhiều → không hấp dẫn cả cha mẹ & trẻ em"
**Goal:** Pick ONE UX metaphor model that unifies landing (parent acquisition) + dashboard (kid daily use) + progress modeling (parent monitor)
**Output:** 5 deeply-analyzed models · 5 Claude Design prompts ready-to-paste · scoring matrix · recommendation

---

## 🎯 Core problem statement

Hiện tại 2 surfaces cùng đang fight nhau:

| Surface | Audience | Current pain |
|---|---|---|
| `/welcome` + `/sell` landing | Bố mẹ 30-45t lần đầu nghe PANY | "Hero giới thiệu 12 trụ cột + 5-16 tuổi + AI Cô Pany + 8 lý do" — quá nhiều thông tin, không có hook visual, không có proof |
| `/` dashboard chính (PanyKidsStudio.tsx) | 3 con Phúc 11 / An 9 / Như Ý 5 hằng ngày | 29 tabs sidebar, không có "khu vực bắt đầu" rõ ràng, kid 5t bị overload, kid 11t không biết next step là gì |
| Progress modeling | Bố Bình hằng tuần check | Progress = % completion ascending — không cảm xúc, không có narrative arc, khó so sánh giữa 3 con |

**Need:** Một visual metaphor đủ mạnh để cùng lúc:
1. **Landing:** hook bố mẹ trong 5 giây — "À, sản phẩm này muốn nói gì"
2. **Dashboard:** kid 5-16t mở app sáng nay thấy ngay "hôm nay làm gì tiếp theo"
3. **Progress:** narrative ấm áp, dễ chụp lại + share Zalo gia đình
4. **VN cultural fit:** không bắt chước Tây 100%, có chất Việt + giáo dục Á Đông

---

## 📊 5 mô hình candidate — overview matrix

| # | Mô hình | Visual core | Daily hook | Parent narrative | VN fit | Risk |
|---|---|---|---|---|---|---|
| 1 | 🌳 **Tree Growth** | Cây từ hạt → đất → mầm → cây → hoa/quả | "Tưới nước cho cây của con" | "Cây Phúc nay ra 3 lá mới" | ⭐⭐⭐⭐⭐ | Mature kid 14-16t có thể chê "trẻ con" |
| 2 | 🗺️ **Journey Map** | Map có path + milestones + boss | "Hôm nay đi tiếp 3 chặng" | "Phúc đang ở chặng 47/100" | ⭐⭐⭐⭐ | Linear path = áp lực, dễ chán nếu trượt |
| 3 | 🏗️ **Knowledge City** | Thành phố 12 quận tương ứng 12 trụ cột | "Xây thêm tòa nhà ở quận Toán" | "City An hôm nay có 24 buildings, +3 vs hôm qua" | ⭐⭐⭐⭐ | Free-form = khó biết next step |
| 4 | ⚔️ **RPG Class Tree** | Chọn class (Engineer/Doctor/Teacher) + skill nodes | "Mở skill Code lên Lvl 5" | "Phúc đang Engineer Lvl 12, An là Doctor Lvl 8" | ⭐⭐⭐ | Quá game-y, lo bố mẹ thấy "trò chơi" |
| 5 | 🪜 **Career Ladder** | Bậc thang theo cấp học (mẫu giáo → ĐH → nghề) | "Hoàn thành bậc lớp 4 hôm nay" | "An đang ở bậc 5/15 (lớp 4)" | ⭐⭐⭐⭐⭐ | Hơi truyền thống, mature kid hứng thú thấp |

**Scoring guidance (5⭐ = best fit):**
- Daily hook clarity (kid mở app biết làm gì)
- Parent narrative (bố mẹ chụp screenshot khoe được không)
- VN cultural fit (có hợp gia đình Á Đông không)
- Age scalability (1 model dùng được cho cả 5t + 16t không)
- Build complexity (4 tuần build vs 3 tháng build)

---

## 🌳 MODEL 1 — TREE GROWTH (Cây phát triển)

### Concept
Mỗi học viên = một **cây của con**. Cây trải qua 6 giai đoạn:
1. 🌰 **Hạt giống** (level 1-2): Mới đăng ký, làm onboarding
2. 🌱 **Mầm non** (level 3-5): Hoàn thành 7 quest đầu tiên
3. 🌿 **Cây non** (level 6-15): Phát triển đa môn
4. 🌳 **Cây trưởng thành** (level 16-30): Chuyên sâu 1-2 trụ cột
5. 🌸 **Ra hoa** (level 31-50): Master 5+ trụ cột
6. 🍎 **Kết trái** (level 51+): Career compass kết quả định hướng cụ thể

12 trụ cột = 12 cành của cây. Mỗi cành phát triển độc lập theo usage.

### Real-world examples (2024-2026)
- **Forest app** (productivity, 50M+ users) — trees grow per focus session
- **Habitica** — habit-driven tree avatar
- **Khan Kids** (5-7t) — tree + garden metaphor cho early literacy
- **Duolingo Treasure Garden** (gamification add-on 2024)
- **Sao Hôm coffee chain (VN)** — loyalty program với metaphor "cây cà phê của bạn"

### Landing application
**Hero `/welcome`:**
- LEFT 60%: animated SVG cây + 12 cành mọc dần (auto-loop 8s)
- RIGHT 40%: "**Mỗi con là một cây.** PANY là vườn ươm cho 12 trụ cột của cây ấy lớn lên." → CTA "Trồng cây cho con miễn phí"
- BELOW: 3 ảnh thumbnails cây Phúc/An/Như Ý (mock — sau real data)

**Sell `/sell` reformat:**
- Section 1: Hero cây
- Section 2: "6 giai đoạn phát triển của cây" timeline
- Section 3: "12 cành = 12 trụ cột" infographic
- Section 4: 3 testimonial cây của 3 con anh
- Section 5: FAQ + final CTA

### Dashboard application
- **Sidebar replaced** with: cây visual (vertical) thay cho 29 tabs. Mỗi cành click vào → tab tương ứng (Tech / English / Math...)
- **Trung tâm dashboard:** "Cây của Phúc" rendered SVG động. Hover lá → tooltip "ngày X làm Y". Click cành → drill xuống pillar.
- **Quest hôm nay:** "Tưới nước cho cành Tech (3 quest hôm nay) → cây nhận +5 EXP cho cành đó"
- **Streak:** "Con tưới cây 7 ngày liên tiếp → cây nở hoa đặc biệt 🌸"
- **Mode parent:** family forest view — 3 cây cạnh nhau (Phúc 11 lớn nhất, An 9 medium, Như Ý 5 mầm non). Tooltip so sánh tốc độ phát triển từng cành.

### Gamification mechanics
| Trigger | Reward |
|---|---|
| Hoàn thành 1 quest | +5 lá xanh cho cành tương ứng |
| Streak 7 ngày | Cây ra hoa 1 lần (visual animation) |
| Streak 30 ngày | Cây kết 1 trái (badge permanent) |
| Master 1 cành (level 30) | Cành đó "khắc tên" — VD "Cành Tech của Phúc" |
| Level up cấp giai đoạn (6 lần life) | Background đổi mùa: xuân → hè → thu → đông → xuân |

### VN cultural fit ⭐⭐⭐⭐⭐
- **Cây = ẩn dụ giáo dục Á Đông**: "uốn cây từ thuở còn non, dạy con từ thuở con còn thơ"
- **Trồng cây** = activity gắn liền văn hóa VN (Tết trồng cây, vườn của bà, hàng cây phố...)
- **Cha mẹ kể chuyện:** "Cây An mọc thêm 5 lá tuần này" — dễ hiểu, ấm áp, share Zalo
- **VN proverb support**: nhiều câu cao dao về cây phát triển (10 năm trồng cây, 100 năm trồng người)

### Strengths · Weaknesses

| Strengths | Weaknesses |
|---|---|
| ✅ Universal metaphor (5t hiểu, 16t hiểu) | ❌ Kid 14-16t có thể chê "trẻ con" — cần unlock "Mode trưởng thành" (cây đổi sang bonsai / city tree) |
| ✅ Visual storytelling cực mạnh | ❌ SVG động cho 12 cành phức tạp render — cần ~40h dev |
| ✅ Parent narrative ấm áp + share-friendly | ❌ Không có "boss fight" excitement như RPG |
| ✅ Daily hook tự nhiên ("tưới cây") | ❌ Linear growth model có thể frustrate fast learners |
| ✅ Family view = forest = brand cohesion mạnh | |

### Build estimate
- Concept design (Claude Design): 1 buổi
- SVG cây 6 stages × 12 cành states: 20-25h
- Dashboard refactor + tree state machine: 15-20h
- Landing hero animation: 4-6h
- **Total: ~40-50h** (~1.5-2 tuần solo)

### 🎨 Claude Design Prompt — Model 1

```
Design a kid-friendly educational dashboard hero illustration with the following spec:

CONTEXT:
- Product: Pany Kids Studio — Vietnamese family learning dashboard for kids ages 5-16
- Target audience: Vietnamese parents 30-45 + their kids
- Style: warm, soft, illustrated (not flat icon), kid-friendly but not childish
- Brand colors: purple #845EC2, pink #FF6B9D, mint #51CF66, amber #FFD43B
- Avoid: corporate stock photography feel, generic edtech blue, English text-heavy

CORE METAPHOR: "Each child is a tree. PANY is the nursery garden where 12 branches (12 development pillars) of that tree grow."

DELIVERABLE 1 — Landing hero (1920×1080 16:9):
- LEFT 60%: A single beautiful illustrated tree, slightly stylized (not realistic photo), about 6 visible branches each holding a different icon (book, calculator, paintbrush, microphone, dumbbell, lightbulb, etc — representing 12 pillars). The tree should look healthy + growing + warm. Vietnamese cherry blossom (hoa mai) aesthetic acceptable. Soft gradient background (pink-to-purple).
- RIGHT 40%: Vietnamese headline "Mỗi con là một cây · PANY là vườn ươm" + CTA button "🌱 Trồng cây cho con — Miễn phí dài hạn"
- Style reference: Forest app icon + Habitica avatar warmth + Vietnamese illustrated children's book aesthetic

DELIVERABLE 2 — Dashboard tree view (1440×900 desktop):
- Central focus: One large tree representing the active kid (assume "Phúc 11 tuổi"). Tree has 12 branches, each showing different growth state.
- 3 branches glowing/active = "Quest hôm nay" pillars
- Streak indicator: 7 hanging fruits below = 7-day streak
- Left sidebar: small forest icon row = 3 family kids (Phúc large, An medium, Như Ý sapling)
- Right panel: stats card "🌳 Cây Phúc · Cấp 12 · 47 lá / 6 hoa / 0 trái · Streak 7 ngày"

DELIVERABLE 3 — 6 stage progression strip (2400×400 horizontal):
Show the 6 growth stages side by side with labels:
🌰 Hạt giống (Cấp 1-2) → 🌱 Mầm non (3-5) → 🌿 Cây non (6-15) → 🌳 Cây trưởng thành (16-30) → 🌸 Ra hoa (31-50) → 🍎 Kết trái (51+)
Each stage with a distinct illustration of the same tree at that age.

CONSTRAINTS:
- All Vietnamese text with full diacritics
- Friendly + warm + slightly magical (not realistic gardening photography)
- Inclusive (avoid implying gender for the tree owner)
- Mobile-ready (must look good downsized to 400px wide)
```

---

## 🗺️ MODEL 2 — JOURNEY MAP (Bản đồ phiêu lưu)

### Concept
Mỗi học viên đang đi trên một **bản đồ phiêu lưu** từ "Làng Khởi Đầu" (lớp 1 thực tế) → "Thành phố Tốt Nghiệp" (lớp 12 + định hướng nghề). Path có 100+ checkpoint, mỗi checkpoint ứng với 1 đơn vị kiến thức.

### Real-world examples
- **Duolingo Path** (2022 redesign — 300M+ users) — linear path, can't skip
- **Candy Crush map** — branching paths between worlds
- **Khan Academy Mastery Map** — content tree with locked nodes
- **Pokémon Gym progression** — boss at each checkpoint
- **Trẻ em VN**: cờ tỷ phú, rồng rắn lên mây — board game culture

### Landing application
**Hero `/welcome`:**
- Center: bản đồ illustrated VN-styled (núi non, đồng lúa, làng quê → thành thị) với path winding qua. Sticker 3 nhân vật con anh đang ở 3 vị trí khác nhau.
- Tagline: "**12 năm học của con là một hành trình.** Pany là người dẫn đường."
- CTA: "Bắt đầu hành trình — miễn phí"

### Dashboard application
- **Sidebar replaced** với: vertical journey map (zoom-able). Drag để scroll qua các zones.
- **Trung tâm:** Zoomed view của zone hiện tại của kid. Visible: next 3 checkpoints + 1 mini-boss cuối zone.
- **Quest hôm nay:** "3 checkpoints cần vượt qua hôm nay" — match đúng UI Duolingo Path
- **Streak:** "Con đi 7 ngày liên tiếp → unlock đường tắt (shortcut)"
- **Boss zone:** mỗi 10 checkpoint là 1 boss (quiz test summary). Bắt buộc pass mới unlock zone tiếp.
- **Family view:** 3 con là 3 chấm trên 1 bản đồ chung. Có thể đua nhau.

### Gamification mechanics
- Quest done = checkpoint unlock + +20 XP
- Streak = shortcut unlock + bonus reward
- Boss defeated = badge permanent + zone changes background music
- 1 zone hoàn thành = unlock new "vehicle" (đi bộ → xe đạp → xe máy → ô tô → máy bay) — pace metaphor
- Family race option: nếu 3 con đồng ý, có thể chạy đua tuần

### VN cultural fit ⭐⭐⭐⭐
- **Hành trình Tây Du Ký** — VN kids quá quen
- **Board game culture** (cờ tỷ phú, cá ngựa) — phụ huynh hiểu ngay
- **Risk**: linear path = áp lực, kid trượt 1 ngày sợ bị tụt hậu, tâm lý không healthy
- **Vehicle progression**: con thích nhưng phụ huynh VN có thể cho "không hợp đạo" — cần test

### Strengths · Weaknesses

| Strengths | Weaknesses |
|---|---|
| ✅ Daily hook rõ nhất ("đi tiếp 3 chặng") | ❌ Linear = áp lực + frustration nếu kid không catch up |
| ✅ Boss zones tạo milestone moments mạnh | ❌ Less narrative warmth than tree (so sánh ai đi nhanh hơn) |
| ✅ Đã proven Duolingo (300M users) | ❌ Family view = race = có thể tạo bất bình đẳng anh chị em |
| ✅ Build complexity vừa phải | ❌ Khó visualize "12 trụ cột phát triển song song" trong path linear |
| ✅ Kid 14-16t vẫn enjoy (RPG vibes) | ❌ "Tốt nghiệp lớp 12" = áp lực bố mẹ VN trên kid |

### Build estimate
- Map design (illustrated): 1 buổi Claude Design
- Path state machine + checkpoint locking: 25-30h
- 12 trụ cột mapped vào checkpoint sequence: 15-20h (need careful curriculum integration)
- Boss quiz UI + reward animations: 10-15h
- **Total: ~50-65h** (~2-2.5 tuần solo)

### 🎨 Claude Design Prompt — Model 2

```
Design a journey-map educational dashboard for kids ages 5-16 with Vietnamese cultural styling.

CONTEXT:
- Product: Pany Kids Studio — Vietnamese family learning dashboard
- 12 pillars × 5-16 ages × 5 kids per family
- Brand colors: purple #845EC2, pink #FF6B9D, mint #51CF66, amber #FFD43B

CORE METAPHOR: "12 years of school is a winding journey. Pany Kids guides each child along a path of 100+ checkpoints from village to graduation city."

DELIVERABLE 1 — Landing hero (1920×1080):
- Center: illustrated Vietnamese-styled winding map view. Bottom-left "Làng Khởi Đầu" (start village, rice fields + traditional houses). Top-right "Thành phố Tốt Nghiệp" (graduation city, modern buildings + cherry blossom). Winding path with 8-10 visible checkpoints. 3 small kid character stickers along the path at different positions.
- Tagline overlay: "12 năm học của con là một hành trình · Pany là người dẫn đường"
- CTA: "🗺️ Bắt đầu hành trình — miễn phí"

DELIVERABLE 2 — Dashboard journey view (1440×900):
- Vertical scrolling journey path occupying middle 50% of screen.
- Current zone visible: 8 checkpoints visible, 3 completed (with green check), 1 active (glowing with "Quest hôm nay"), 3 locked, 1 mini-boss at top.
- Left panel: kid avatar + "Phúc · Cấp 12 · Đang ở chặng 47/100"
- Right panel: streak indicator + next reward preview
- Family race toggle: small button "Xem cùng An và Như Ý"
- Style: Duolingo Path 2024 + Vietnamese rice-field aesthetic

DELIVERABLE 3 — Vehicle progression strip (2400×400 horizontal):
Show progression: 🚶 Đi bộ (Zone 1) → 🚲 Xe đạp (Zone 2) → 🛵 Xe máy (Zone 3) → 🚗 Ô tô (Zone 4) → ✈️ Máy bay (Zone 5)
Each vehicle illustrated in Vietnamese setting.

CONSTRAINTS:
- Vietnamese text with diacritics
- Path background should evoke VN landscape, NOT generic Western fantasy
- Avoid making the journey feel like a race against time (no countdown clocks)
- Boss illustrations should be friendly creatures, not scary
- Mobile vertical adaptation must work
```

---

## 🏗️ MODEL 3 — KNOWLEDGE CITY (Thành phố tri thức)

### Concept
Mỗi học viên xây dựng **thành phố của mình** với 12 quận tương ứng 12 trụ cột. Mỗi quận có buildings — mỗi building = 1 đơn vị kiến thức mastered.

### Real-world examples
- **Minecraft Education** — open-world building (massive in VN with kids 8-14t)
- **SimCity Buildit** — city builder mobile (kid-accessible)
- **Civilization VI** — tech tree as city tiles
- **Township** (PlayRix) — farm + city hybrid, top-grossing 2023-25
- **VN trends**: trẻ em VN hiện đang nghiện Minecraft + Roblox xây thành phố

### Landing application
- Hero: top-down view of a cute isometric mini-city. 12 quận có labels (Quận Tech, Quận Toán...). Animated: buildings pop up over 5s.
- Tagline: "**Con xây thành phố tri thức của mình.** PANY cung cấp bản vẽ + nguyên liệu."

### Dashboard application
- **Sidebar replaced** với: mini-map của city kid hiện tại. Click vào quận → zoom in vào quận đó (tab).
- **Trung tâm:** Isometric 3D view của city. Drag để pan, scroll để zoom.
- **Quest hôm nay:** "Xây 3 tòa nhà mới ở Quận Toán" — completion drops buildings into the city visually
- **Streak:** "Streak 7 ngày → unlock công viên trung tâm + sự kiện đặc biệt"
- **Master 1 quận:** "Quận này trở thành Trung tâm Thủ đô" (badge + skyline change)
- **Family view:** "Liên minh thành phố Trần family" — 3 cities side by side với tổng population + GDP đùa

### Gamification mechanics
- Quest done = 1 building added to relevant district
- Streak = decoration unlocks (parks, statues, monuments)
- Master pillar = district becomes "capital district" (visual upgrade)
- Mastery 6 pillars = unlock metro line connecting them
- Mastery 12 pillars = "Megacity" status

### VN cultural fit ⭐⭐⭐⭐
- **Minecraft addiction in VN**: kids 8-14t đã quen building game
- **Hà Nội / TP.HCM** = motif đô thị quen thuộc
- **Risk**: kid 5-7t có thể không hiểu khái niệm "city" — phải có K-mode đơn giản hóa (village instead)
- **Parent angle**: chụp screenshot cute, share Zalo OK; nhưng phụ huynh truyền thống có thể không hiểu "city" liên quan gì học tập

### Strengths · Weaknesses

| Strengths | Weaknesses |
|---|---|
| ✅ Massive proven appeal kid 8-14t (Minecraft) | ❌ K-mode (5-6t) khó adapt — cần fallback metaphor |
| ✅ Open-ended = kid feel agency mạnh | ❌ Less clear daily hook (no obvious "next step") |
| ✅ Beautiful screenshots for share | ❌ Isometric 3D render expensive (40-60h) |
| ✅ Family alliance = co-op vibe (vs competitive race) | ❌ Phụ huynh truyền thống VN có thể nghi ngờ "đây có phải app học không hay game" |
| ✅ 12 pillars map = 12 districts (1-to-1 clean) | ❌ Vẽ 12 distinct districts với 12 distinct visual styles = 12× work |

### Build estimate
- Isometric city assets (~100 building variants × 12 districts): 50-70h
- City state machine + persistence: 25-30h
- Drag/zoom interaction: 15-20h
- **Total: ~90-120h** (~3-4 tuần solo) — **most expensive option**

### 🎨 Claude Design Prompt — Model 3

```
Design an isometric "knowledge city" dashboard for kids ages 5-16 with Vietnamese context.

CONTEXT:
- Product: Pany Kids Studio
- 12 pillars = 12 districts of a city the kid builds
- Brand colors: purple #845EC2, pink #FF6B9D, mint #51CF66, amber #FFD43B

CORE METAPHOR: "The child builds their own knowledge city. PANY provides the blueprints and materials."

DELIVERABLE 1 — Landing hero (1920×1080):
- Center: isometric mini-city, slightly tilted (30° view). 12 distinct districts visible, each with characteristic buildings:
  - Quận Tech (modern glass tower with antenna)
  - Quận Tiếng Anh (a small school with British flag)
  - Quận Tài chính (bank + ATM)
  - Quận Tư duy (a chess pavilion)
  - Quận Kinh doanh (market stalls + small storefronts)
  - Quận Trải nghiệm (museum / exhibition hall)
  - Quận Sáng tạo (art studio with skylight)
  - Quận Vận động (sports field + gym)
  - Quận Tự khám phá (library)
  - Quận La bàn nghề (career center / job fair tent)
  - Quận Gia đình (community plaza with families)
  - Quận Theo dõi (observatory / data center)
- 5 small cute character stickers (the 5 max kids) walking around
- Tagline overlay: "Con xây thành phố tri thức của mình"
- CTA: "🏗️ Bắt đầu xây — miễn phí"

DELIVERABLE 2 — Dashboard city view (1440×900):
- Full isometric city occupying 70% of screen
- District labels visible
- 3 districts glowing with "+building" particle effect (quest progress)
- Top bar: "Thành phố Phúc · Dân số 47 / Buildings 12 / Streak 7 ngày"
- Right panel: list of 3 active quests with building previews
- Left panel: family alliance view (3 mini-city thumbnails)

DELIVERABLE 3 — 12 district detail strip (2400×400 horizontal):
12 small isometric tiles, each showing one district at "tier 3" (mid-progression). Label below each in Vietnamese.

CONSTRAINTS:
- Isometric 30° angle (Township / SimCity Buildit style)
- Vietnamese architectural touches (some traditional + some modern HCMC/HN skyline)
- Avoid hyper-Western suburb aesthetics
- Mobile portrait adaptation: city becomes vertical scroll district-by-district
- 12 districts must be visually DISTINCT (not 12 brown cubes)
```

---

## ⚔️ MODEL 4 — RPG CLASS TREE (Cây kỹ năng nghề)

### Concept
Kid chọn 1 trong 6 **starter classes** (Engineer / Doctor / Teacher / Artist / Business / Scientist). Mỗi class có skill tree mở rộng theo 12 trụ cột. Skill nodes unlock theo learning progress.

### Real-world examples
- **Path of Exile** — massive skill tree (1000+ nodes)
- **Diablo III** — class + skill spec
- **Genshin Impact** — talent tree per character (huge in VN with teens 14-18t)
- **Pokémon evolution chains** — class branching at level milestones
- **VN trend 2024-26**: teen-and-up VN gaming 70%+ are RPG/MOBA

### Landing application
- Hero: 6 character class cards (Engineer / Doctor / Teacher / Artist / Business / Scientist) với illustrated personas — VN-styled outfits.
- Tagline: "**Con muốn trở thành gì?** Pany dẫn con từ Cấp 1 đến nghề mơ ước qua skill tree."

### Dashboard application
- **Hero on dashboard:** kid's chosen class portrait + level + skill tree expandable. Visible 8-10 skill nodes around (3 unlocked, 5 locked, 2 active).
- **Quest hôm nay:** "Unlock skill node 'Algorithm Basics' — cần 3 quest Tech"
- **Streak:** unlock "passive abilities" (vd: passive "Critical Thinking" = +10% XP from quests)
- **Class change:** mỗi 6 tháng kid có thể "respec" (đổi class) — keeping progress
- **Family party:** 3 con tạo "đội" 3 class khác nhau. Bonus XP cho đội đầy đủ Engineer + Doctor + Teacher.

### Gamification mechanics
- Quest done = +XP toward unlocking next skill node
- Streak = passive ability slot unlocks
- Master 1 skill branch = "Specialization unlocked" + class title (vd: "Phúc — Software Engineer apprentice Lvl 7")
- 60 careers = 60 ultimate skill nodes (endgame)
- PvP-free design (no kid-vs-kid competitive — only co-op family party)

### VN cultural fit ⭐⭐⭐
- **Genshin / Honkai / League 2024 VN**: teen 14+ ngấm RPG culture mạnh
- **Risk**: phụ huynh 40-50t VN có thể chê "trò chơi", "game" — không thấy "học"
- **5-7t**: K-mode bỏ class system, dùng simpler tree of "favorite things"
- **Cultural gap**: phụ huynh traditional có thể không trust "kid chọn nghề lúc 5t"

### Strengths · Weaknesses

| Strengths | Weaknesses |
|---|---|
| ✅ Teen 13-16t cực mê (RPG là native ngôn ngữ teen 2024-26) | ❌ Phụ huynh 40+ VN có thể reject "quá game" |
| ✅ Career compass (D-019) tích hợp tự nhiên qua class selection | ❌ Class lock-in psychology = kid 5t chọn class quá sớm có thể stress |
| ✅ Skill tree complexity = endless content (60 careers × 12 pillars) | ❌ K-mode (5-6t) khó adapt RPG concept |
| ✅ Co-op family party = sibling bonding tốt | ❌ Build cực phức tạp (skill graph + class system) |
| ✅ Stat tracking sexy cho metric-driven parents | ❌ Visual style "fantasy" khó match VN family brand |

### Build estimate
- 6 class designs + 60 career endgame nodes: 60-80h
- Skill tree state machine: 30-40h
- Class portrait illustrations × 6 ages × 6 classes: 40-50h
- **Total: ~130-170h** (~4-5 tuần solo) — **most ambitious option**

### 🎨 Claude Design Prompt — Model 4

```
Design an RPG-style class + skill tree dashboard for kids ages 5-16 with Vietnamese cultural awareness.

CONTEXT:
- Product: Pany Kids Studio
- 6 starter classes: Engineer, Doctor, Teacher, Artist, Business, Scientist
- 60 ultimate careers as endgame skill nodes
- Brand colors: purple #845EC2, pink #FF6B9D, mint #51CF66, amber #FFD43B

CORE METAPHOR: "What does your child want to become? Pany guides them from grade 1 to their dream career through a skill tree."

CRITICAL: Avoid fantasy game aesthetic (no swords, no orcs). Style must read as "modern educational + slight RPG vibes" — closer to Genshin Impact's friendly character art than World of Warcraft.

DELIVERABLE 1 — Landing hero (1920×1080):
- Center: 6 character class portraits in a 2×3 grid. Each character is a Vietnamese kid 11-13t in modern professional outfit + tools:
  - Engineer: VN kid with laptop + circuit board
  - Doctor: VN kid in white coat + stethoscope
  - Teacher: VN kid in áo dài holding book
  - Artist: VN kid with paintbrush + easel
  - Business: VN kid with tablet + presenting graph
  - Scientist: VN kid with microscope + lab coat
- Each portrait has class name + tagline + skill count
- Tagline overlay: "Con muốn trở thành gì? · Pany dẫn con từ Cấp 1 đến nghề mơ ước"
- CTA: "⚔️ Chọn class cho con — miễn phí"

DELIVERABLE 2 — Dashboard skill tree view (1440×900):
- Center: complex skill tree with ~30 nodes visible (3 ranks of branches). Active class shown center-top.
- Nodes color-coded: green = unlocked, amber = active quest progress, gray = locked
- Lines connecting nodes (dependency graph)
- Bottom panel: "Phúc — Software Engineer apprentice Lvl 7 · 47 skills unlocked · 12 active quests"
- Right panel: family party (Phúc/An/Như Ý) with their classes
- Avoid hexagonal World of Warcraft talent tree feel — closer to Genshin Impact talent web

DELIVERABLE 3 — 6 class portrait strip (2400×400 horizontal):
6 full-body Vietnamese kid character illustrations, each in their class outfit + tools. Friendly, smiling, age 11-13. Diverse hair styles.

CONSTRAINTS:
- Vietnamese diacritics
- Characters look like REAL VN kids 11-13 (not anime, not Western cartoon)
- Avoid weapons, fantasy elements
- Inclusive diversity in 6 characters (not all same hair/skin)
- Mobile adaptation: skill tree zoom-pan
```

---

## 🪜 MODEL 5 — CAREER LADDER (Bậc thang nghề nghiệp)

### Concept
Mỗi học viên trên một **bậc thang** từ "Mẫu giáo" → "Tiểu học" → "THCS" → "THPT" → "Đại học" → "Nghề chọn". 15-20 bậc rõ ràng, mỗi bậc ứng với 1 mốc cụ thể.

### Real-world examples
- **LinkedIn career path** — ladder visualization for adults
- **Khan Academy mastery levels** — explicit grade ladder
- **VN trend 2026**: dashboard "Lộ trình học sinh giỏi" của Hocmai / Vuihoc đều ladder-based
- **Office career ladder posters** (legacy classroom decoration VN)
- **Phụ huynh VN 40-50t**: hiểu "leo cấp" intuitively

### Landing application
- Hero: vertical ladder illustrated với 15 bậc rõ ràng. Mỗi bậc có icon + label. Đỉnh ladder rẽ thành 6-8 nghề (Engineer, Doctor...).
- Tagline: "**Con đang ở bậc nào? Con muốn lên đâu?** Pany vẽ rõ lộ trình từ mầm non → nghề mơ ước."

### Dashboard application
- **Hero:** vertical ladder ở giữa, current bậc highlighted. Next 2 bậc visible above.
- **Quest hôm nay:** "Để lên bậc 5 (Lớp 4 vững), con cần master 3 KSA"
- **Streak:** unlock "stair runners" (visual: con avatar nhảy thoăn thoắt lên bậc)
- **Family ladder:** 3 con trên cùng ladder ở 3 vị trí khác nhau (Phúc 11 ở bậc 6, An 9 ở bậc 4, Như Ý 5 ở bậc 1)
- **Endgame:** ladder top rẽ thành 6-8 career paths — kid 13t+ chọn fork

### Gamification mechanics
- Quest done = stair step progress (+0.1 to +0.3 of a bậc)
- Bậc lên = ceremony animation + family Telegram notification
- Streak = "thang máy" shortcut (skip 1 bậc nhỏ)
- Career fork moment = unlock 6-8 finale paths
- Parent share: chụp screenshot "bậc thang của An tuần này" 

### VN cultural fit ⭐⭐⭐⭐⭐
- **Việt Nam education culture** = leo cấp, từ tiểu học lên cấp 2, cấp 3, đại học
- **Phụ huynh hiểu instantly** — không cần explain metaphor
- **"Bậc thang nhân tài"** = idiom có sẵn
- **Risk**: linear ladder = áp lực, no creativity space
- **Kid 14-16t hứng thú thấp**: ladder = "đi học mỗi ngày" cảm giác

### Strengths · Weaknesses

| Strengths | Weaknesses |
|---|---|
| ✅ VN phụ huynh hiểu ngay không cần explain | ❌ Cảm giác "đi học truyền thống" — không khác Vuihoc/Hocmai |
| ✅ Build complexity LOW (linear list) | ❌ Kid 14-16t có thể chê chán |
| ✅ Mapping vào VN grade system (1-12) sạch | ❌ Less Instagram-worthy than tree/city |
| ✅ Parent narrative cực mạnh (so sánh con với chuẩn cấp lớp) | ❌ Linear path = pressure |
| ✅ Career fork ở top tận dụng D-019 careers | ❌ 12 trụ cột khó visualize trong vertical ladder |

### Build estimate
- Ladder UI + state: 20-30h
- 15 stair illustrations × 3 thematic backgrounds: 15-20h
- Career fork endgame: 10-15h
- **Total: ~45-65h** (~1.5-2.5 tuần solo) — **least expensive**

### 🎨 Claude Design Prompt — Model 5

```
Design a vertical "career ladder" dashboard for Vietnamese family learning ages 5-16.

CONTEXT:
- Product: Pany Kids Studio
- 15 ladder steps mapped to VN grade system: mầm non → lớp 1-5 → lớp 6-9 → lớp 10-12 → đại học → nghề chọn
- Brand colors: purple #845EC2, pink #FF6B9D, mint #51CF66, amber #FFD43B

CORE METAPHOR: "What rung is your child on? Where do they want to climb to? Pany draws the clear path from kindergarten to dream career."

DELIVERABLE 1 — Landing hero (1920×1080):
- Center-LEFT: tall vertical ladder illustration, 15 visible rungs. Each rung labeled with VN grade level + small icon:
  Bậc 1: 🌱 Mầm non lá (4-6t)
  Bậc 2-6: 📚 Lớp 1-5 (Tiểu học)
  Bậc 7-9: 🧮 Lớp 6-9 (THCS)
  Bậc 10-12: 🔬 Lớp 10-12 (THPT)
  Bậc 13: 🎓 Đại học
  Bậc 14: 💼 Đi làm chuyên môn
  Bậc 15: 🌟 Đỉnh nghề (mastery)
- At the top: ladder splits into 6 forks each labeled with a career (Engineer, Doctor, Teacher, Artist, Business, Scientist) + icon
- Center-RIGHT: tagline "Con đang ở bậc nào? · Con muốn lên đâu?" + CTA "🪜 Vẽ lộ trình cho con — miễn phí"
- Background: soft pastel gradient, possibly with cherry blossoms

DELIVERABLE 2 — Dashboard ladder view (1440×900):
- Center-vertical: the same ladder, current bậc HIGHLIGHTED with character avatar on it.
- Next 2 bậc above visible, last 2 bậc below visible.
- Right panel: "Phúc · Bậc 6 (Lớp 5 vững) · Để lên bậc 7 cần 3 KSA"
- Left panel: family ladder mini-view (3 kids on the same ladder at 3 positions)
- Stair "elevator" button = streak bonus shortcut

DELIVERABLE 3 — 15 step icon strip (2400×400 horizontal):
Show all 15 rungs as a horizontal timeline. Each rung has icon + age range + 1 keyword characterizing that level. Compact and scannable.

CONSTRAINTS:
- Vietnamese diacritics
- Avoid making ladder feel like a corporate career ladder (no suits, no office buildings)
- Each rung should feel inviting, NOT competitive
- Inclusive (avoid implying gender for the climber)
- Mobile: ladder works in vertical scroll naturally
```

---

## 🏆 SCORING MATRIX — quantified recommendation

| Criterion (weight) | 🌳 Tree | 🗺️ Journey | 🏗️ City | ⚔️ RPG | 🪜 Ladder |
|---|---|---|---|---|---|
| Daily hook clarity (20%) | 8 | **9** | 6 | 8 | 8 |
| Parent narrative (15%) | **10** | 7 | 8 | 6 | 9 |
| Kid 5-8t accessibility (15%) | **10** | 7 | 7 | 5 | 8 |
| Kid 14-16t engagement (15%) | 6 | 8 | **9** | **10** | 5 |
| VN cultural fit (15%) | **10** | 8 | 7 | 6 | **10** |
| Visual share-worthiness (10%) | **10** | 8 | **10** | 8 | 6 |
| Build complexity (inverted — lower = better) (10%) | 7 | 6 | 3 | 2 | **9** |
| **Weighted total** | **8.75** | 7.65 | 7.10 | 6.55 | 7.95 |

**Ranking:**
1. 🥇 **🌳 Tree Growth (8.75)** — best all-rounder. Strengths: parent narrative, K-mode, VN fit. Risk: teen engagement.
2. 🥈 🪜 Career Ladder (7.95) — strongest VN cultural fit + lowest build cost. Risk: teen + creativity.
3. 🥉 🗺️ Journey Map (7.65) — strongest daily hook (Duolingo-proven). Risk: linear pressure.
4. 🏗️ Knowledge City (7.10) — strongest teen + share-worthy. Risk: build cost 90-120h.
5. ⚔️ RPG Class Tree (6.55) — strongest teen RPG-native. Risk: parent acceptance + build cost 130-170h.

---

## 💡 Recommended approach — hybrid

**Em đề xuất: PRIMARY = 🌳 Tree Growth (Model 1), SECONDARY layer = 🪜 Career Ladder (Model 5) cho 13-16t.**

Lý do:
- Tree Growth dùng cho 5-12t (audience chính của 3 con anh hiện tại — Phúc 11 + An 9 + Như Ý 5).
- Khi kid reach level 30 (Cây trưởng thành) hoặc 13+ tuổi → unlock "Career Map" overlay (Ladder Model). Kid xem được "Cây của mình + lộ trình nghề tương lai".
- Parent narrative xuyên suốt: 5-12t = "Cây Phúc nay ra 3 lá mới"; 13-16t = "Cây Phúc đã chọn được nhánh Software Engineer trên Ladder".
- Build effort: Phase 1 chỉ Tree (~40-50h) → ship trong 2 tuần. Ladder add-on Phase 2 (~20-30h) sau khi anh validate Tree với 3 con + 5-10 beta families.

---

## 📋 Next steps sau khi anh chọn

1. **Anh confirm model chính** (1 trong 5 hoặc combo) trong session sau
2. **Anh paste Claude Design prompts** tương ứng vào https://claude.ai/design — em chuẩn bị sẵn 5 prompts ở trên, anh chỉ cần copy nguyên đoạn `` ```...``` `` block
3. **Anh save mockup output** từ Claude Design vào `artifacts/mockups/model-X-{landing,dashboard,strip}.png`
4. **Em build prototype** dựa trên mockup + spec model:
   - Phase 1: replace landing /welcome + /sell hero với chosen model
   - Phase 2: refactor /dashboard sidebar + main view
   - Phase 3: parent progress narrative + family view
5. **A/B test với 3 con + 5-10 beta families** (post-P1 wire) → iterate

---

## 🔗 Cross-references

- D-011 (Đại Ka brand) + D-030/D-032 (Cô Pany rename) — chatbot positioning trong mỗi model
- D-019 (60 careers from RIASEC) — endgame mechanic của Tree (fruits), Journey (final city), City (megacity), RPG (60 nodes), Ladder (career fork)
- D-022 → D-033 (free long-term) — không có "trial pressure" trong UX nào
- D-034 (20 chat/day) — chatbot xuất hiện gắn liền với metaphor (Tree = gardener helper, Journey = guide, City = mayor advisor, RPG = mentor, Ladder = teacher)
- D-028 (12 single-year tracks 5-16) — backbone mọi model

---

**Decision pending: D-035 (UI metaphor primary) + D-036 (UI metaphor secondary, optional).**
