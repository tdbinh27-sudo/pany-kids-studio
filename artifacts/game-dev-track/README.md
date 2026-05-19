# 🎮 Pany Kids Game Dev Track

**Mục tiêu:** Cho 3 con (Phúc 11t · An 9t · Y 5t) khám phá nghề **Game Developer / Game Artist / Game Designer** thông qua tools thực tế mà studio lớn đang dùng.

**Tích hợp với:** 12 trụ cột Library (đặc biệt Technology · Creativity · Problem Solving · Math) + 10 career paths Khám phá (Game Dev là career #X mới).

---

## 3-tier track theo tuổi

### 🌱 Tier 1 — Khám phá (Y 5t · K mầm non · parent-supervised)

**Tool:** Scratch Jr (iPad/tablet app) hoặc **scratch.mit.edu** (web, block-based)
**License:** Free (MIT Scratch Foundation)
**Install:** Không cần — chạy trên browser
**Bố hướng dẫn:**
1. Mở https://scratch.mit.edu/projects/editor/
2. Kéo block "khi cờ xanh được nhấn" → "di chuyển 10 bước"
3. Bấm cờ xanh → mèo chạy

**Output mong đợi:** Y biết "lập trình = ra lệnh máy chạy". 1 dự án/tuần. **Parent đọc cùng tiếng Việt.**

📌 File hướng dẫn: `scratch-track.md`

---

### 🌿 Tier 2 — Làm game đầu tiên (An 9t · P 7-11)

**Tool:** **Kaboom.js / KaPlay** (JavaScript, browser-runnable, không cần install)
**Stars:** 2.7K · **License:** MIT
**Install:** Mở file `kaboom-starter.html` trong browser → xong

**Bố hướng dẫn (30 phút):**
1. Double-click `kaboom-starter.html` → game chạy ngay
2. Mở file bằng Notepad → đổi số 2400 (gravity) → save → refresh → xem nhân vật rơi nhanh hơn
3. Khuyến khích An đổi màu, đổi sprite, thêm enemy

**Output mong đợi:** An hiểu "game = code + sprite + input". 1 game đơn giản (jump, dodge, collect) sau 4 tuần.

📌 File hướng dẫn: `kaboom-starter.html` + `kaboom-tutorial.md`

---

### 🌳 Tier 3 — Game thật (Phúc 11t · P upper · T 12-15)

**Tools:**
- **Godot 4.6** (engine 2D + 3D, GDScript) — 111K⭐ MIT — desktop install
- **Pygame-CE** (Python, đã install ✅) — drop-in pygame replacement
- **Blender** (3D art, ✅ đã install) — bổ trợ cho `blender-addon-engineer` agent

**Bố hướng dẫn Phúc (project-based, 3 tháng):**
- **Week 1-2:** Pygame jumping square → đọc `pygame-hello.py`
- **Week 3-6:** Godot platformer 2D → đọc `godot-first-game.md`
- **Week 7-12:** Blender + Godot 3D scene (đối với Phúc nếu thích 3D art)

**Output mong đợi:** Phúc submit 1 game playable lên itch.io (free hosting) cuối tháng 3. Portfolio entry cho career path Game Dev.

📌 Files: `pygame-hello.py` · `godot-first-game.md` · `INSTALL.md`

---

## Career path mapping (Khám phá tab)

| Tier | Tools mastered | Career unlock | Sample salary VN |
|---|---|---|---|
| 1 | Scratch | Game Hobbyist (foundation) | — |
| 2 | Kaboom + HTML/CSS | **Indie Web Game Dev** · Frontend Dev | 15-30tr/m junior |
| 3 | Godot/Unity + Blender + Python | **Game Designer · Technical Artist · Game Programmer** | 20-50tr/m mid · 80tr+/m senior · studio AAA |

**VN studios employ kid grads:** VNG, Sky Mavis (Axie), Wolffun (Tank Heroes), Topebox, Hiker Games, Sparx*.

---

## AI Agent companions (Claude Code)

Anh đã cài 2 agents bổ trợ cho Phúc khi anh muốn deep-dive:

| Agent | Khi nào dùng | Trigger |
|---|---|---|
| **Unity Architect** | Phúc 12t+ chuyển sang Unity (industry standard AAA) | `Agent → subagent_type: "Unity Architect"` |
| **Blender Add-on Engineer** | Phúc làm 3D art / asset pipeline / scripted exporters | `Agent → subagent_type: "Blender Add-on Engineer"` |

Em (Claude Code) sẽ route tự động khi anh kể: "Phúc đang stuck Godot animation tree" → em call Unity Architect agent xin pattern reference.

---

## Decision Filter pass (D-036 candidate)

| Axis | Result | Reason |
|---|---|---|
| Strategic Fit | ✅ 5/5 | Kids Studio mission = career exploration + STEM, Game Dev industry VN đang boom |
| Bandwidth | ✅ Pass | Install 30 min Pygame + 30 min Godot manual, content gen 1h |
| Cashflow ROI | ✅ Pass | $0 (all MIT/free) |
| Productize | ✅ Pass | Có thể spin-off "Pany Kids Game Studio" — Tier 4 future, 1 trong 27 cards |
| Distinctive | ✅ Pass | VN-bilingual + Claude AI mentor + 2 specialist agents = unique |

**Verdict: 5/5 PASS — proceed install + build Tier 1-3 starter pack.**

---

## Resources external (curated, anh review)

- **Game design theory:** [Game Maker's Toolkit YouTube](https://www.youtube.com/@GMTK) (English, Phúc level)
- **Godot tutorial VN:** [Game From Scratch Godot](https://gamefromscratch.com/godot-tutorial-series/) (English)
- **Pygame book free:** [Invent with Python](https://inventwithpython.com/invent4thed/) (English, Phúc lower-intermediate)
- **Itch.io kid showcase:** https://itch.io/games/by-kids
- **VN game dev community:** Facebook group "Game Dev Vietnam" + Discord "VietGameDev"

---

**Last updated:** 2026-05-19 (Session 19)
**Owner:** Bố Bình · **Reviewed by:** anh-only Mid-Year Gate 2026-06-30
**Decision ID:** D-036 (TBD — pending anh approve)
