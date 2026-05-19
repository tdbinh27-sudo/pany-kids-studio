# 🌳 Godot 4.6 — First Game cho Phúc (Tier 3)

**Tool:** Godot Engine 4.6 LTS · 111K⭐ MIT · GDScript (Python-like syntax)
**Install:** Anh tải `Godot_v4.6-stable_mono_win64.zip` từ https://godotengine.org/download/windows/ → extract vào `C:\Users\PanyBinh\Tools\Godot\` (xem `INSTALL.md`)
**Companion agent:** `Unity Architect` (cho game architecture patterns) — ở `~/.claude/agents/unity-architect.md`

---

## Project 1 — "Lava Floor" (2-4 buổi, ~3h tổng)

**Mục tiêu:** Phúc build một platformer 2D đơn giản với:
- Nhân vật nhảy
- Sàn ✓
- Lava (chết)
- Goal (thắng level)
- Sound effect

---

### Buổi 1 (45 phút) — Setup project

1. Mở Godot → "New Project"
2. Project Name: `LavaFloor`
3. Path: `C:\Users\PanyBinh\Projects\pany-kids-studio\artifacts\game-dev-track\godot-projects\LavaFloor\`
4. Renderer: **Compatibility** (chạy mượt máy Phúc)
5. "Create & Edit"

**Khám phá UI:**
- Trái: FileSystem (cây folder)
- Giữa: Scene tree (cấu trúc cảnh)
- Phải: Inspector (sửa thuộc tính)
- Dưới: Output + Debugger

**Bố hỏi Phúc:** "UI Godot giống/khác gì so với Scratch + Pygame?"

---

### Buổi 2 (45 phút) — Nhân vật + sàn

1. Scene → New Scene → "2D Scene" → save `Main.tscn`
2. Add child node `CharacterBody2D` → rename `Player`
   - Add child `Sprite2D` → load default icon `icon.svg`
   - Add child `CollisionShape2D` → New RectangleShape2D → resize ~40×40
3. Add `StaticBody2D` → rename `Ground`
   - Add `ColorRect` (xanh) + `CollisionShape2D`
   - Position dưới đáy màn hình

4. Attach script vào Player → `Player.gd`:

```gdscript
extends CharacterBody2D

const SPEED = 300.0
const JUMP_VELOCITY = -600.0

func _physics_process(delta):
    # Gravity
    if not is_on_floor():
        velocity.y += 980 * delta

    # Jump
    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = JUMP_VELOCITY

    # Move
    var direction = Input.get_axis("ui_left", "ui_right")
    if direction:
        velocity.x = direction * SPEED
    else:
        velocity.x = move_toward(velocity.x, 0, SPEED)

    move_and_slide()
```

5. F5 → "Select Current" → chạy → nhân vật rơi xuống sàn, nhảy được với Space, di chuyển ← →

**Bố hướng dẫn Phúc:** "Đọc code này — `_physics_process` là gì? `delta` là gì?"

---

### Buổi 3 (45 phút) — Lava + Goal

1. Add `Area2D` → rename `Lava`
   - Add `ColorRect` (đỏ) + `CollisionShape2D`
   - Đặt giữa map
2. Connect signal `body_entered` → script:

```gdscript
func _on_body_entered(body):
    if body.name == "Player":
        get_tree().reload_current_scene()  # restart level
```

3. Add `Area2D` → rename `Goal`
   - ColorRect vàng + CollisionShape
   - Đặt cuối map
4. Goal script:

```gdscript
func _on_body_entered(body):
    if body.name == "Player":
        print("YOU WIN!")
        # TODO: show win screen
```

---

### Buổi 4 (45 phút) — Sound + polish

1. Tải free SFX:
   - Jump: https://freesound.org → "jump cartoon" CC0
   - Death: "lava sizzle" CC0
   - Win: "level complete chiptune" CC0
2. Drop vào `res://sounds/`
3. Add `AudioStreamPlayer` → Lava → play khi `body_entered`
4. Add background music: AudioStreamPlayer2D với loop=true

**Final touch:**
- Đổi tên window title: Project Settings → Application → Config → Name = "Lava Floor — by Phúc"
- Export Windows: Project → Export → Add `Windows Desktop` → Export Project → `LavaFloor.exe`

---

## Project 2 — "Rocket Dodger" (5 buổi, ~5h)

Sau khi xong Project 1, Phúc làm:
- Top-down rocket (di chuyển 360°)
- Asteroids spawn ngẫu nhiên
- Score system (thời gian sống sót)
- Game Over screen
- Restart button

Pattern này dạy:
- `RigidBody2D` thay vì `CharacterBody2D`
- `Timer` node để spawn
- `Label` node + score variable
- Scene transition

---

## Project 3 — "Phúc's Choice" (open-ended, 4-6 tuần)

Phúc tự design game muốn làm:
- Bố Bình HỎI (không bảo):
  - "Con muốn game về cái gì?"
  - "Con muốn nhân vật làm gì?"
  - "Khi nào con thấy game này 'xong'?"
- Phúc tự lên 1-page GDD (Game Design Document)
- Em (Claude Code) hỗ trợ technical via `Unity Architect` agent

**Export → upload itch.io free** → portfolio entry → career path Game Dev unlocked.

---

## Học liệu external (anh-curated)

| Resource | Format | Phù hợp Phúc |
|---|---|---|
| GDQuest YouTube | Video EN | Best Godot 4 tutorials, kid-friendly pace |
| Godot Docs | Text EN | Reference, đọc khi stuck |
| HeartBeast Godot | YouTube EN | Step-by-step, no skip |
| Game From Scratch | YouTube EN | Comparative analysis Godot vs Unity |
| Brackeys Godot series | YouTube EN | 8-part beginner series LIVE |

**KHÔNG có tutorial VN chất lượng cao** cho Godot 4 hiện tại → tốt cho Phúc luyện English đồng thời.

---

## Companion agent usage

Khi Phúc stuck:

**Bố mở Claude Code:**
```
Phúc đang làm Godot platformer, animation tree không transition đúng từ idle → run.
Nodes: AnimationTree, AnimationPlayer, BlendSpace2D.
Gọi Unity Architect agent xin pattern reference.
```

**Em sẽ:**
1. Call `Agent → subagent_type: "Unity Architect"` với context
2. Agent đưa pattern (Unity-style state machine) → em translate sang Godot syntax
3. Em paste solution + giải thích cho Phúc

**KHÔNG để Phúc tự chat với Claude.** Bố làm cầu nối (D-034 + Claude 18+ rule).

---

## Decision Filter retrospective (D-036)

Project này pass 5/5 Decision Filter:
- ✅ Strategic Fit: career exploration trụ cột chính
- ✅ Bandwidth: 3h tổng cho Project 1 — đủ cho 1 weekend
- ✅ Cashflow: $0 — Godot + Blender + assets CC0 free
- ✅ Productize: Phúc's portfolio = case study cho "Pany Kids Game Studio" track sau này
- ✅ Distinctive: AI mentor + bilingual = unique trong VN ecosystem

---

**Last updated:** 2026-05-19
**Tier:** 3 (P upper / T)
**Companion agents:** Unity Architect · Blender Add-on Engineer
**Status:** Document ready · Godot install pending anh
