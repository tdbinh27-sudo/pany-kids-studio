# Thỏa thuận Cộng tác viên (CTV) — Pany Kids Studio

**Phiên bản:** v1.0 — 2026-05-13
**Tham chiếu:** D-024 (CTV draft + bố review), D-028 (12 age tracks 5-16)
**Bên A:** Trần Đức Bình (PANY Vietnam) — chủ dự án Pany Kids Studio
**Bên B:** _________________ (CTV) — viết nội dung học tập

---

## 1. PHẠM VI CÔNG VIỆC

CTV nhận brief từ Bên A cho 1 trong 5 bank nội dung:

| Bank | Output | Đơn giá đề xuất | Tham chiếu template |
|---|---|---|---|
| Quest hằng ngày | 1 entry/quest theo schema | 15,000-25,000 ₫/quest | `quest-template.md` |
| Truyện song ngữ Việt-Anh | 1 entry/story | 80,000-150,000 ₫/story | `bilingual-story-template.md` |
| Câu hỏi Toán | 1 entry/question | 10,000-30,000 ₫/question | `math-question-template.md` |
| Career Q&A | 1 entry/Q&A có source verified | 100,000-200,000 ₫/Q&A | (template TBD) |
| Curriculum entry (1 age full) | Bộ map đầy đủ 1 grade | 500,000-1,000,000 ₫ | `age-curriculum.ts` schema |

**Đơn giá thực tế** chốt theo từng batch — tùy độ khó + năm kinh nghiệm CTV.

---

## 2. CHẤT LƯỢNG ĐẦU VÀO

CTV phải đảm bảo:

### 2.1 Chính xác

- Thông tin khoa học/toán/lịch sử/địa lý CHÍNH XÁC theo curriculum VN
- Đáp án toán: kiểm TỪNG câu trước khi nộp (tự giải lại)
- Career Q&A: source được verified (URL còn live, expert có thật)
- Bilingual: ngữ pháp + chính tả đúng cả 2 ngôn ngữ

### 2.2 Phù hợp độ tuổi

- Quest/Quiz/Story tag chính xác `primaryAge` (5..16) hoặc `ageRange [min,max]`
- Vocab phù hợp grade: KHÔNG dùng từ trừu tượng cho 5-7t, KHÔNG dùng từ trẻ con cho 14-16t
- Thời lượng quest đúng: K (10-15p), P (15-20p), T (20-30p)

### 2.3 An toàn nội dung

CTV CAM KẾT KHÔNG đưa vào nội dung:

- ❌ Bạo lực, gây sốc
- ❌ Tình cảm yêu đương (kể cả lứa 14-16 — Pany Kids định vị learning, không phải romance)
- ❌ Chính trị, tôn giáo (tránh xa hoặc trung lập tuyệt đối)
- ❌ Chất kích thích (rượu, thuốc lá, ma túy) — chỉ được dùng trong context cảnh báo y tế cho 13-16t
- ❌ Cờ bạc, marketing đa cấp
- ❌ Quảng cáo brand bên ngoài (trừ khi anh approve)
- ❌ Link YouTube/TikTok dẫn ra video không kiểm soát được (chỉ Khan Academy / Coursera / nguồn educational verified)

### 2.4 Bản quyền

- ❌ KHÔNG copy nguyên văn từ SGK (paraphrase OK với citation)
- ❌ KHÔNG copy từ sách tham khảo có bản quyền (paraphrase + citation OK)
- ✅ Inspired-by OK với source URL trong field `source_book` hoặc `source_authority`
- ✅ Curated link với URL gốc OK (`type: 'video'`, `type: 'article'`, etc.)

---

## 3. QUY TRÌNH NỘP BÀI

### 3.1 Batch size

- Quest: ≥10 entries cùng grade + cùng pillar
- Story: ≥5 entries cùng CEFR level
- Math: ≥20 questions cùng level + topic
- Career Q&A: ≥5 Q&A cùng age group + topic
- Curriculum: 1 entry / batch (đầy đủ subjects)

### 3.2 Format nộp

CTV save file:

```
artifacts/content-drafts/YYYY-MM-DD-{CTV-name}-{bank}-batch-{N}.md
```

Ví dụ: `2026-05-20-nguyen-an-quest-batch-1.md`

Mỗi file chứa:

- Header: tên CTV, ngày, bank, grade target, số entries
- Body: JSON array entries theo schema từ template
- Footer: ghi chú CTV (nếu có), nguồn tham khảo, time spent

### 3.3 Bên A review SLA

- **48 giờ** từ lúc CTV submit batch
- Review outcomes:
  - ✅ **Approve toàn bộ** → CTV nhận thanh toán theo đơn giá đã chốt
  - ⚠️ **Approve có sửa nhỏ** (<10% entries) → CTV nhận 100% sau khi revise
  - ⚠️ **Approve có sửa lớn** (10-30% entries) → CTV nhận 80%, revise + nộp lại để full pay
  - ❌ **Reject toàn batch** (>30% sai) → CTV redo trong 7 ngày, KHÔNG charge lại

### 3.4 Lý do reject

Bên A có quyền reject ngay nếu phát hiện:

1. Sai sự thật (toán, khoa học, lịch sử)
2. Lệch độ tuổi target (vd: nội dung lớp 9 nhưng tag age=7)
3. Vi phạm safety rules (mục 2.3)
4. Sao chép thô từ nguồn có bản quyền không citation
5. Chính tả/ngữ pháp sai > 3 lỗi/entry
6. Thiếu metadata bắt buộc (primaryAge, pillar, difficulty, source)
7. Bilingual EN dùng Google Translate raw (CTV phải tự edit native-level)

---

## 4. THANH TOÁN

### 4.1 Lịch thanh toán

- **Cuối tuần Chủ Nhật** mỗi tuần — tổng kết tất cả batch approved trong tuần
- Bên A chuyển khoản qua Vietcombank/Techcombank trong vòng 48 giờ
- Nếu CTV ở nước ngoài: PayPal hoặc Wise (CTV chịu phí transfer)

### 4.2 Thông tin tài khoản CTV cần cung cấp

- Họ tên: _________________
- Ngân hàng: _________________
- Số tài khoản: _________________
- Chi nhánh (nếu có): _________________
- SĐT cho biên lai: _________________

### 4.3 Thuế

CTV thu nhập từ dự án này được coi là **thu nhập không thường xuyên** theo luật VN.
Bên A khấu trừ 10% TNCN nếu CTV nhận ≥ 2.000.000 ₫/tháng. CTV không có MST cá nhân → khấu trừ 20%.

CTV xuất hóa đơn nếu có MST kinh doanh — không khấu trừ TNCN.

---

## 5. SỞ HỮU TRÍ TUỆ

- Tất cả nội dung CTV tạo theo brief Bên A thuộc **sở hữu hoàn toàn của PANY Vietnam** sau khi thanh toán
- CTV có quyền liệt kê dự án này trong portfolio cá nhân (với credit "Content writer for PANY Kids Studio")
- CTV **KHÔNG** được:
  - Bán lại nội dung cho bên thứ ba
  - Publish nội dung lên blog cá nhân / web khác
  - Reuse nội dung cho dự án compete (apps học tập trẻ em khác)
- Bên A có quyền:
  - Sửa, paraphrase, mix nội dung CTV cho mọi mục đích product
  - Sử dụng cho marketing (case study, demo) với credit hoặc anonymous

---

## 6. BẢO MẬT

CTV CAM KẾT KHÔNG chia sẻ:

- Schema kỹ thuật chưa public của Pany Kids
- Tên/email/thông tin lead khách hàng PANY
- Plan business của PANY Vietnam (pricing tiers, roadmap, beta cohort)
- Bất kỳ thông tin nội bộ nào trong `artifacts/`, `decisions.md`, `plan.md` của repo

Vi phạm: bồi thường 20 triệu ₫ + chấm dứt hợp tác.

---

## 7. CHẤM DỨT HỢP TÁC

- Bất kỳ bên nào cũng có thể chấm dứt với notice **7 ngày**
- Khi chấm dứt: thanh toán toàn bộ batch đã approved + draft đang review
- Bên A có quyền chấm dứt ngay (không notice) nếu CTV:
  - Vi phạm safety rules (mục 2.3)
  - Vi phạm bảo mật (mục 6)
  - Submit nội dung giả mạo (vd: bịa ra "expert URL" không tồn tại)
  - Trễ deadline > 7 ngày không thông báo

---

## 8. LIÊN HỆ

- **Bên A**: Trần Đức Bình
  - Email: tdbinh27@gmail.com
  - Telegram: @pany_super_os_bot (workspace) / cá nhân (anh share riêng)
  - Hotline/Zalo: 0983 179 109
  - Repo nội bộ: github.com/tdbinh27-sudo/pany-kids-studio (private khi share)

- **Bên B (CTV)**: _________________
  - Email: _________________
  - Phone/Zalo: _________________
  - Portfolio: _________________

---

## 9. THỎA THUẬN

Bằng việc submit batch đầu tiên, CTV xác nhận đã đọc + đồng ý toàn bộ điều khoản trên.

Ký + ngày (CTV): _________________
Ký + ngày (Bên A): _________________

---

## PHỤ LỤC A — Checklist CTV self-review trước khi submit

CTV TICK TỪNG MỤC trước khi đẩy batch:

- [ ] Tất cả entries có `primaryAge` chính xác
- [ ] Tất cả entries có `pillar` đúng (1 trong 11 pillars hợp lệ)
- [ ] Quest: title ≤ 60 ký tự, description ≤ 200 ký tự
- [ ] Story: paragraph VN-EN parallel, vocab_focus xuất hiện ≥ 2 lần
- [ ] Math: tự giải lại đáp án — verify đúng
- [ ] Career Q&A: URL source được click test → live + nội dung liên quan
- [ ] Bilingual: đọc lại VN + EN, không có dịch máy
- [ ] Safety: scan lại không có nội dung mục 2.3
- [ ] Bản quyền: không copy thô từ source, có citation nếu paraphrase
- [ ] Filename đúng pattern `YYYY-MM-DD-{name}-{bank}-batch-{N}.md`
- [ ] Footer file: ghi rõ time spent + nguồn tham khảo

## PHỤ LỤC B — Đơn giá per batch (Bên A fill khi giao việc)

Brief #__ ngày __/__/2026:

| Item | Bank | Số entries | Đơn giá | Subtotal |
|---|---|---|---|---|
| | | | | |
| | | | | |
| | | | | |
| | | | | |

**Tổng:** _____________ ₫ (chưa thuế / sau khấu trừ TNCN tùy CTV)

Deadline submit: __/__/2026
Bên A review xong: __/__/2026
Thanh toán: __/__/2026
