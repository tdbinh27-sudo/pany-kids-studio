"""
Pany Kids Studio — Pygame Hello (Tier 3 cho Phúc 11t)
====================================================

Game đầu tiên với Pygame-CE: khối đỏ nhảy + bắt sao vàng.

Chạy:
    python pygame-hello.py

Yêu cầu: pygame-ce (đã cài qua `pip install --user pygame-ce`)
Phím: SPACE = nhảy · ← → = di chuyển · ESC = thoát

Mục tiêu học:
  1. Hiểu game loop (60 FPS)
  2. Sprite + collision đơn giản
  3. Gravity + jump physics
  4. Score system

Bố Bình hỏi Phúc sau khi chạy được: "Con muốn thêm gì? Enemy? Powerup? Level?"
"""

import pygame
import random
import sys

# ===== CẤU HÌNH =====
WIDTH, HEIGHT = 800, 600
FPS = 60
GRAVITY = 0.8
JUMP_POWER = -15
MOVE_SPEED = 5

# Màu (R, G, B)
BG_COLOR = (20, 20, 50)
PLAYER_COLOR = (255, 107, 107)
STAR_COLOR = (255, 200, 0)
GROUND_COLOR = (78, 205, 196)
TEXT_COLOR = (255, 255, 255)

# ===== KHỞI TẠO =====
pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Pany Kids — Pygame Hello (Phúc)")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 32, bold=True)

# ===== PLAYER =====
player = pygame.Rect(WIDTH // 2, HEIGHT - 100, 40, 40)
player_vel_y = 0
on_ground = False

# ===== STARS (sao vàng) =====
stars = []
SPAWN_EVENT = pygame.USEREVENT + 1
pygame.time.set_timer(SPAWN_EVENT, 1500)  # spawn mỗi 1.5s

# ===== STATE =====
score = 0
running = True

# ===== GAME LOOP =====
while running:
    dt = clock.tick(FPS)

    # --- Xử lý sự kiện ---
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                running = False
            elif event.key == pygame.K_SPACE and on_ground:
                player_vel_y = JUMP_POWER
        elif event.type == SPAWN_EVENT:
            x = random.randint(20, WIDTH - 40)
            stars.append(pygame.Rect(x, 0, 30, 30))

    # --- Di chuyển trái/phải ---
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        player.x -= MOVE_SPEED
    if keys[pygame.K_RIGHT]:
        player.x += MOVE_SPEED
    player.x = max(0, min(WIDTH - player.width, player.x))

    # --- Gravity + jump ---
    player_vel_y += GRAVITY
    player.y += int(player_vel_y)

    # Chạm sàn
    if player.bottom >= HEIGHT - 50:
        player.bottom = HEIGHT - 50
        player_vel_y = 0
        on_ground = True
    else:
        on_ground = False

    # --- Cập nhật sao ---
    for star in stars[:]:
        star.y += 3
        if star.colliderect(player):
            stars.remove(star)
            score += 1
        elif star.top > HEIGHT:
            stars.remove(star)

    # --- Vẽ ---
    screen.fill(BG_COLOR)
    # Sàn
    pygame.draw.rect(screen, GROUND_COLOR, (0, HEIGHT - 50, WIDTH, 50))
    # Player
    pygame.draw.rect(screen, PLAYER_COLOR, player, border_radius=8)
    # Stars
    for star in stars:
        pygame.draw.polygon(
            screen,
            STAR_COLOR,
            [
                (star.centerx, star.top),
                (star.right, star.bottom),
                (star.left, star.bottom),
            ],
        )
    # Score
    score_text = font.render(f"Sao: {score}", True, TEXT_COLOR)
    screen.blit(score_text, (20, 20))
    # Hint
    hint = font.render("SPACE nhảy · ← → chạy · ESC thoát", True, (150, 150, 150))
    screen.blit(hint, (20, HEIGHT - 90))

    pygame.display.flip()

pygame.quit()
sys.exit()
