# 🛠️ Install Guide — Game Dev Track

**Đã tự động cài (anh không cần làm gì):**
- ✅ Blender (3D art) — `C:\Program Files\Blender Foundation\`
- ✅ Pygame-CE (Python game lib) — `pip install --user pygame-ce` succeeded 2026-05-19
- ✅ Kaboom/KaPlay (chạy trên browser, CDN trong `kaboom-starter.html`)
- ✅ Scratch (chạy trên https://scratch.mit.edu — không cần install)

**Anh cần tự click install (auto mode chặn download .exe):**

---

## 1️⃣ Godot 4.6 — Tier 3 game engine cho Phúc

**Cách 1: Trực tiếp (RECOMMENDED, portable, không cần admin)**

1. Mở browser → tải từ link chính thức:
   - **Windows .NET version (recommend cho Phúc dùng C# sau này):** https://godotengine.org/download/windows/
   - File: `Godot_v4.6-stable_mono_win64.zip` (~120MB)
2. Extract ZIP vào `C:\Users\PanyBinh\Tools\Godot\`
3. Tạo shortcut Desktop → `Godot_v4.6-stable_mono_win64.exe`
4. Double-click → Godot mở → tạo project mới

**Verify install:**
```powershell
ls $HOME\Tools\Godot\
# Phải thấy: Godot_v4.6-stable_mono_win64.exe
```

**Cách 2: Chocolatey (cần admin PowerShell)**

```powershell
choco install godot
```

---

## 2️⃣ GDevelop 5 — Tier 2 no-code cho An 9t

**Tải installer (anh tự click):**

1. Mở browser → https://gdevelop.io/download
2. Tải `GDevelop-Setup-5.6.269.exe` (~200MB)
3. Double-click installer → wizard → Install (mặc định installs to `%LOCALAPPDATA%\Programs\GDevelop\`)
4. Mở GDevelop → "New project" → "Empty game" → drag-drop logic

**KHÔNG BẮT BUỘC** nếu anh muốn skip — An có thể dùng Kaboom HTML trước.

---

## 3️⃣ Unity (Tier 4 — DEFER)

**Khuyến nghị SKIP install hiện tại.** Lý do:
- ~30GB disk (Editor + Hub + Android/iOS build tools)
- Yêu cầu Unity ID + license activation
- Phúc 11t chưa cần — Godot đủ cho 2-3 năm tới
- Agent **Unity Architect** đã LIVE ở `~/.claude/agents/unity-architect.md` → advisory mode hoạt động không cần engine

**Khi nào cài Unity:**
- Phúc 13-14t và đã hoàn thành 3 game Godot
- Hoặc Phúc muốn tham gia Vietnam Game Awards / Asia Game Showcase

**Cách cài khi cần:**
- Tải Unity Hub: https://unity.com/download
- Chọn LTS version (hiện tại 6 LTS) — free Personal license cho cá nhân/family

---

## 4️⃣ Pygame-CE verify (đã cài ✅)

```powershell
python -c "import pygame; print('Pygame-CE version:', pygame.version.ver)"
# Expected: Pygame-CE version: 2.5.7
```

**Chạy game đầu tiên:**
```powershell
cd $HOME\Projects\pany-kids-studio\artifacts\game-dev-track
python pygame-hello.py
```

---

## 5️⃣ Blender verify (đã cài ✅)

```powershell
& "C:\Program Files\Blender Foundation\Blender 4.X\blender.exe" --version
```

Blender đã sẵn sàng cho:
- 3D modeling Phúc (Donut tutorial 2h trên YouTube là entry point chuẩn)
- Asset export sang Godot (GLTF/GLB)
- Agent **Blender Add-on Engineer** giúp Phúc viết Python add-on khi cần

---

## Tổng kết disk usage

| Tool | Disk | Status |
|---|---|---|
| Blender | ~500MB | ✅ Installed |
| Pygame-CE | ~30MB | ✅ Installed (`%APPDATA%\Python\Python314\site-packages\`) |
| Godot 4.6 portable | ~120MB | ⏳ Anh tải |
| GDevelop 5 | ~200MB | ⏳ Anh tải (OPTIONAL) |
| Unity (defer) | ~30GB | ❌ Skip — agent advisory mode đủ |
| Scratch + Kaboom | 0 | ✅ Browser-only |

**Total disk needed:** ~850MB nếu cài Godot + GDevelop (rất nhỏ).

---

## Troubleshooting

**Pygame import lỗi `No module named 'pygame'`:**
```powershell
pip install --user pygame-ce --force-reinstall
```

**Godot không mở (Windows Defender chặn):**
- Right-click `.exe` → Properties → "Unblock" checkbox → Apply

**GDevelop installer cần admin?**
- KHÔNG — installs to user `%LOCALAPPDATA%` mặc định, không cần admin

---

**Last updated:** 2026-05-19
**Status:** Pygame-CE ✅ Blender ✅ · Godot/GDevelop pending anh tự cài
