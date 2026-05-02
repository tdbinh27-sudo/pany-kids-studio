# PANY KIDS STUDIO — STRATEGY v2 (2026-05-01)

> Major pivot dựa trên 2 documents anh đã cung cấp:
> - `PanyKidsStudio_DanhGia_ChienLuoc_VN.pdf` (17 trang đánh giá chiến lược)
> - `PanyKids_EducationBot_Strategy.md` (636 lines bot giáo dục)
>
> Quyết định cuối cùng đã chốt với anh ngày 2026-05-01. Tài liệu này là source-of-truth cho v3.2+

---

## Decisions (Q1-Q5 anh chốt)

### Q1 — Hybrid platform ✅
- Web v3.1-I (Next.js + Vercel + VPS) = **xương sống nội bộ** cho 3 con dùng + dashboard parent
- Mobile app (React Native + Expo) = **public product** cho App Store + CH Play (mục tiêu tháng 8/2026)
- **Shared backend**: Đại Ka API trên VPS phục vụ cả web + mobile

### Q2 — Đại Ka ở lại, được tăng cấp ✅
- **GIỮ tên Đại Ka** (NOT đổi sang Cô Pany)
- Vẫn là **đại diện AI của bố Bình** với các con
- Vẫn chat với con (xưng "Đại Ka" / gọi "con")
- Vẫn ở VPS 61.14.233.122
- **Budget tăng $5 → $15/tháng** → upgrade default model + rate limit + max tokens
- **Bổ sung kiến thức** từ MD file (psychology, parenting, career, education subjects)

### Q3 — Web + App song song ✅
- Web tiếp tục https://pany-kids-studio.vercel.app + http://61.14.233.122/
- Mobile RN+Expo build mới — App Store Kids 6-8 / 9-11 + Google Play Kids
- Mục tiêu: cả 2 platforms cùng truy cập same data + same Đại Ka

### Q4 — Map cũ → mới + bổ sung ✅
- Giữ 6 pillars cũ: **Tech · English · Finance · Thinking · Business · Life** (skills track)
- Thêm 6 pillars mới: **Theo dõi · Sáng tạo · Vận động · Tự khám phá · Career · Gia đình** (development track)
- 12 pillars total — UI categorize 2 dimensions
- Adjust theo thời gian + nhu cầu của các con

### Q5 — Timeline rõ ràng ✅
| Phase | Dates | Goal |
|-------|-------|------|
| **Sprint 1** | 5/1 - 5/8/2026 (1 tuần) | Build all + nội bộ test với 3 con |
| **Sprint 2** | 5/8 - 7/8/2026 (2 tháng) | Iterate dựa trên usage thực tế |
| **Sprint 3** | 7/1 - 7/31/2026 (1 tháng) | Build mobile app + submit App Store + CH Play |
| **Sprint 4** | 8/1 - 8/15/2026 (2 tuần) | Beta test với phụ huynh khác |
| **Launch** | 8/16/2026 onwards | Giới thiệu rộng rãi |

### Q6 — Trademark + Domain ✅
- Sau 1 tuần nội bộ test → anh tiến hành mua
- Trong 1 tuần đầu: dùng pany-kids-studio.vercel.app + IP VPS

### Mục tiêu sản phẩm
- **Giáo dục FREE** cho người dùng cuối
- **Data + app là Pany làm chủ** (open source vỏ MIT, lõi đóng)
- **Audience scale**: 3 con → 5-15 gia đình → 100-500 → public

---

## Đại Ka — Boost spec (session 1, 5/1/2026)

### Budget changes
| | Cũ | Mới |
|---|----|-----|
| Default model | Haiku 4.5 | **Sonnet 4.6** (bump cho intelligence) |
| Fallback | Sonnet 4.6 (rare) | Opus 4.7 (very complex only) |
| Max tokens output | 400 | **800** |
| Rate limit/kid/hour | 30 | **100** |
| History context | last 10 turns | **last 20 turns** |
| Cost dự kiến | ~$5/tháng | **~$15/tháng** |

### Knowledge expansion (added to system prompt)
Bổ sung từ MD file vào HARD_RULES_VI/EN:

**Psychology — Developmental stages:**
- Piaget: Concrete Operational (7-11) · Formal Operational (11+)
- Erikson: Industry vs Inferiority (6-12) · Identity vs Confusion (12-18)
- Attachment theory · Carol Dweck Growth Mindset · Positive discipline

**Common issues handling (pattern: hỏi context → tham chiếu framework → đề xuất 2-3 chiến lược → cảnh báo không nên làm → khi nào cần chuyên gia):**
- Academic resistance (không chịu học)
- Screen addiction
- Peer conflict
- Sibling rivalry
- Social anxiety
- Self-esteem
- Mood swings

**Parenting frameworks:**
- Active listening · Effective praise (Dweck-based) · Hard conversations
- Natural consequences · Boundary setting · Time-in vs time-out
- Vietnamese context: balancing tradition, academic pressure, multi-gen households

**Career RIASEC Junior (8-12 + 13-15 versions):**
- 6 types adapted với câu hỏi cụ thể (Lego/puzzle/vẽ/dạy bạn/lãnh đạo/sắp xếp)
- 60 careers Việt Nam context
- Pany business as case study

**Knowledge subjects (mode knowledge for kids' homework):**
- Toán lớp 1-12 (chương trình Bộ GD VN)
- Văn (đọc hiểu, essay, classics VN)
- English A1-B2
- Khoa học (Lý/Hóa/Sinh phổ thông)
- Lịch sử + Địa lý VN/thế giới
- Nghệ thuật (vẽ, âm nhạc, văn hóa)

### Escalation protocols (nguy cơ cao)
NGAY LẬP TỨC khuyên gặp chuyên gia + cung cấp số:
- Trẻ có ý nghĩ tự hại/tự tử
- Trầm cảm kéo dài >2 tuần
- Bắt nạt nghiêm trọng
- Bạo lực với người/động vật
- Cha mẹ bộc lộ ý nghĩ làm hại bản thân/con

Hotline VN:
- **111** — Tổng đài Quốc gia Bảo vệ Trẻ em (miễn phí 24/7)
- Bệnh viện Nhi Đồng 1, 2, TP HCM hoặc BV Tâm thần Trung ương
- Hội Tâm lý Lâm sàng VN: vapcl.org.vn

---

## 6 Pillars Mới (Sprint 2-3)

| # | Pillar | Description | Sample features |
|---|--------|-------------|-----------------|
| 1 | **Theo dõi & Đào tạo** | Existing 6 skills tracking | Quest hằng ngày, streak, badges (đã có) |
| 2 | **Studio Sáng tạo** | Vẽ/kể chuyện/video/nhạc | Canvas, builder, prompt "Sáng tạo hôm nay con..." |
| 3 | **Cơ thể & Vận động** | Thể dục + mindfulness | Timer thử thách, video bài múa, log vận động |
| 4 | **Tự khám phá** | Self-awareness | Mood journal, RIASEC junior, prompts "Hôm nay con học..." |
| 5 | **La bàn Nghề nghiệp** | Career exploration | 60 career cards, mini-project "Ngày làm 1 nghề", RIASEC quiz |
| 6 | **Cầu nối Gia đình** | Family activities | Sổ tay chung, template review tuần, prompt "Hỏi bố cha" |

### Rotation principle
6 pillars KHÔNG phải 6 tabs riêng — main screen highlights 1 pillar tâm điểm/ngày, các pillar phụ vẫn truy cập nhẹ. Ví dụ rotation cho bé 8 tuổi:

| Ngày | Trụ cột chính | Quest mẫu |
|------|---------------|-----------|
| T2 | Theo dõi & Đào tạo | Toán cơ bản 10 phút |
| T3 | Studio Sáng tạo | Vẽ con vật yêu thích |
| T4 | Cơ thể & Vận động | Tự sáng tác điệu nhảy 1 phút |
| T5 | Tự khám phá | Mood weather: hôm nay con thấy thế nào? |
| T6 | La bàn Nghề nghiệp | Thử kiến trúc sư: thiết kế phòng mơ ước |
| T7 | Cầu nối Gia đình | Show & Tell với cả nhà |
| CN | Tự do chọn | Con là chủ |

---

## Content Library (target launch)

| Category | Volume | Source strategy |
|----------|--------|-----------------|
| Quest hằng ngày | 500+ (12 pillars × 4 ages × 7 days) | Đồng tác giả nhà giáo + Khan/Code.org CC-BY |
| Career card | 60 (10 mỗi RIASEC) | O*NET public domain + localize VN |
| Thư viện truyện | 50 song ngữ VN/EN | License tác giả + commission viết mới |
| Quiz Toán | 1.000 câu × 4 cấp | Khan Academy CC-BY + BBC Bitesize patterns |
| Quiz English | 500 vocab + 200 grammar | Cambridge + BBC Learning |
| Quiz Khoa học | 300 fact/câu hỏi | NatGeo Kids + Khan |
| RIASEC Junior | 36 câu (8-12) + 48 câu (13-16) | Adapt RIASEC Markers Liao 2008 |
| Voucher phần thưởng | 30+ | Design in-house |

---

## Architecture v3.2 (sau pivot)

```
┌─────────────────────────────────────────────────────┐
│  WEB CLIENT (Next.js)              MOBILE APP (RN+Expo)
│  pany-kids-studio.vercel.app       App Store + Play
│      │                                  │
│      └──────────────┬───────────────────┘
│                     ↓
│           https://api.61.14.233.122/v2/*
│           (or api.panykids.app sau khi mua domain)
│                     ↓
│      ┌──────────────────────────────────┐
│      │  ĐẠI KA API (FastAPI hoặc Next.js API)
│      │  - /chat (Sonnet 4.6 default)
│      │  - /quiz/generate
│      │  - /career/match
│      │  - /content/get
│      └──────────────────────────────────┘
│                     ↓
│           Anthropic API + Content KB
└─────────────────────────────────────────────────────┘
```

---

## Risk Watch v2

- 🔴 **API key vẫn chưa rotate** — risk kéo dài
- 🟡 **Compliance**: Đại Ka chat với con vi phạm strict Anthropic ToS 18+, nhưng anh chấp nhận risk này vì family use case + parental supervision
- 🟡 **Stack split** Web + Mobile — duy trì 2 codebases
- 🟡 **Sonnet 4.6 cost** — 3× Haiku nhưng anh đã chốt $15/tháng cap
- 🟢 **Strategy clarity** — đã có 5 quyết định Q1-Q5 cụ thể
- 🟢 **Timeline realistic** — 1 tuần internal + 2 tháng iterate đủ buffer

---

## Sprint 1 (current session 5/1/2026)

✅ Save strategy-v2.md (file này)
✅ Boost Đại Ka: Sonnet 4.6 + 800 tokens + 100 msg/hr + 20 turns history
✅ Expand knowledge: child psych + parenting + career RIASEC + escalation hotlines
✅ Update Project OS docs
✅ Commit + dual deploy

## Sprint 1 (sessions sau trong tuần)

- Add 6 new pillars data structures (CURATED, badges, careers, quests)
- Map cũ→mới UI: 12 pillars trong sidebar grouped 2 categories
- Studio Sáng tạo: canvas (HTML5 + tldraw library)
- Cơ thể & Vận động: timer + log
- Tự khám phá: RIASEC Junior quiz (36 câu) + mood journal expanded
- La bàn Nghề nghiệp: 60 career cards
- Cầu nối Gia đình: weekly review template
- React Native + Expo setup (parallel branch)

## Sprint 2 (5/8 - 7/8) — 2 tháng iterate

- Daily usage tracking với 3 con
- Content KB seed: 300 quests, 60 career cards, 84 RIASEC questions
- Bug fixes + UX iterate
- Tăng cường Đại Ka context theo feedback thực tế

## Sprint 3 (7/2026)

- React Native build mature
- App Store Kids submission
- Google Play Kids submission
- Beta family expansion 5-15

## Sprint 4 (8/2026)

- Launch public
- Marketing với phụ huynh khác
- Feedback loop
- Monetization decisions (premium content?)

---

**Source documents preserved:**
- `Downloads/files/PanyKidsStudio_DanhGia_ChienLuoc_VN.pdf` (17p)
- `Downloads/files/PanyKids_EducationBot_Strategy.md` (636 lines)
