/**
 * @file app/welcome/page.tsx
 * @description Public landing page — softer brand entry. PUBLIC (indexed by search).
 *              Different from /sell (hidden noindex sales push).
 *              Single primary CTA → /dangky.
 * @version 1.0.0
 * @updated 2026-05-13
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import HeroGreeting from '@/components/HeroGreeting';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://kids.panyvn.app';

export const metadata: Metadata = {
  title: 'Pany Kids Studio — Studio học tập gia đình cho trẻ 5-16 tuổi',
  description:
    'Bố Bình xây Pany Kids cho 3 con Phúc, An, Như Ý — giờ mở miễn phí dài hạn cho gia đình Việt khác. 12 trụ cột × trợ lý AI Cô Pany × song ngữ Việt-Anh.',
  alternates: { canonical: `${APP_URL}/welcome` },
  openGraph: {
    title: '🌸 Pany Kids Studio — Studio học tập gia đình',
    description: 'Dashboard 24/7 cho 1-5 con tuổi 5-16. Miễn phí · giáo án cập nhật mỗi tuần · không cần thẻ.',
    url: `${APP_URL}/welcome`,
    siteName: 'Pany Kids Studio',
    locale: 'vi_VN',
    type: 'website',
    images: [{ url: `${APP_URL}/og-image.svg`, width: 1200, height: 630, alt: 'Pany Kids Studio' }],
  },
};

const BRAND = {
  purple: '#845EC2',
  pink: '#FF6B9D',
  mint: '#51CF66',
  amber: '#FFD43B',
  soft: '#F9F4FF',
  text: '#2D1B4E',
  mute: '#666',
  border: '#E5DBFF',
};

const trustSignals = [
  { icon: '🎁', label: 'Miễn phí dài hạn', sub: 'Không giới hạn thời gian' },
  { icon: '📚', label: 'Giáo án cập nhật', sub: 'Quest + story mỗi tuần' },
  { icon: '🇻🇳', label: 'Made in Vietnam', sub: 'Tuân thủ PDPL VN' },
  { icon: '👨‍👩‍👧', label: '1 tài khoản · 5 con', sub: 'Mỗi con PIN riêng' },
];

const storyPoints = [
  {
    n: '1',
    icon: '🌱',
    title: 'Lý do em xây Pany Kids',
    body: 'Em là Trần Đức Bình, có 3 con: Phúc 11 tuổi (lên lớp 6), An 9 tuổi (lên lớp 4), Như Ý 5 tuổi (vào lớp lá). Em không tìm được app học tập nào đủ tử tế cho gia đình — đa phần là game-trá-hình, hoặc nội dung quá Tây không hợp văn hóa Việt. Vậy em ngồi viết Pany Kids cho 3 con mình trước.',
  },
  {
    n: '2',
    icon: '🤝',
    title: 'Tại sao mở miễn phí dài hạn cho gia đình khác',
    body: 'Sau khi 3 con dùng được, em nghĩ phụ huynh khác cũng đang gặp vấn đề tương tự. PANY có công nghệ + thời gian, nên em mở MIỄN PHÍ DÀI HẠN bản chuẩn cho mọi gia đình Việt — không giới hạn 3 tháng, không cần thẻ tín dụng. Giáo án + quest + story được cập nhật mỗi tuần. Cô Pany 20 lượt chat/ngày/gia đình (đủ dùng cho hướng dẫn). Cần trải nghiệm cá nhân hóa hơn (gia sư riêng từng con, lộ trình tùy chỉnh) → liên hệ Zalo PANY nâng cấp.',
  },
  {
    n: '3',
    icon: '🎯',
    title: 'Pany Kids khác gì các app khác',
    body: 'Trợ lý AI "Cô Pany" có rule cứng: KHÔNG cho con đáp án thẳng — chỉ hỏi ngược để con tự nghĩ (Socratic). 12 trụ cột phát triển (Tech, English, Finance, Tư duy, Kinh doanh, Trải nghiệm + 6 phát triển toàn diện). Mọi nội dung viết native VN + EN song song — không phải dịch máy. Lộ trình 3/5/7/10 năm tùy phụ huynh chọn.',
  },
];

export default function WelcomePage() {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: BRAND.text, background: '#fff' }}>
      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, #FFE5F1 0%, ${BRAND.soft} 100%)`, padding: '64px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
            <HeroGreeting variant="inline" mode="anonymous" subtitle="Studio học tập 24/7 · Cô Pany đồng hành" />
          </div>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🌸</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px', color: BRAND.purple }}>
            Chào mừng đến với<br />Pany Kids Studio
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: BRAND.text, margin: '0 0 8px' }}>
            Studio học tập gia đình cho con từ <strong>5 đến 16 tuổi</strong>.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: BRAND.mute, margin: '0 0 32px' }}>
            Trợ lý AI Cô Pany đồng hành mỗi ngày · 12 trụ cột phát triển · Song ngữ Việt-Anh
          </p>
          <Link
            href="/dangky"
            style={{
              display: 'inline-block',
              background: BRAND.purple,
              color: '#fff',
              padding: '16px 36px',
              borderRadius: 999,
              fontSize: 18,
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(132,94,194,0.35)',
            }}
          >
            🌸 Đăng ký miễn phí →
          </Link>
          <p style={{ fontSize: 13, color: BRAND.mute, marginTop: 16 }}>
            Miễn phí dài hạn · Không cần thẻ tín dụng · Setup tự động qua email
          </p>
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section style={{ padding: '48px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, textAlign: 'center' }}>
          {trustSignals.map((t, i) => (
            <div key={i} style={{ padding: 20 }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: BRAND.text }}>{t.label}</div>
              <div style={{ fontSize: 13, color: BRAND.mute, marginTop: 4 }}>{t.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY — 3 sections */}
      <section style={{ background: BRAND.soft, padding: '64px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: 'center', color: BRAND.purple, margin: '0 0 12px' }}>
            Câu chuyện Pany Kids
          </h2>
          <p style={{ textAlign: 'center', color: BRAND.mute, marginBottom: 48 }}>
            Tại sao có dashboard này, tại sao miễn phí dài hạn, và Pany Kids khác gì.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {storyPoints.map(s => (
              <div key={s.n} style={{ background: '#fff', padding: 28, borderRadius: 16, border: `1px solid ${BRAND.border}`, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, fontSize: 40 }}>{s.icon}</div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: BRAND.purple, margin: '0 0 12px' }}>{s.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: BRAND.text, margin: 0 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE — peek */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: 'center', color: BRAND.purple, margin: '0 0 12px' }}>
            Bên trong có gì
          </h2>
          <p style={{ textAlign: 'center', color: BRAND.mute, marginBottom: 40 }}>Tóm gọn 8 thứ bố/mẹ + con sẽ dùng hằng ngày.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, fontSize: 14 }}>
            {[
              { e: '🤖', t: 'Cô Pany AI Mentor', d: 'Claude Sonnet 4.6 đồng hành' },
              { e: '🗺️', t: 'Lộ trình 3-10 năm', d: 'Phụ huynh tự chọn' },
              { e: '📚', t: 'Quest hằng ngày', d: '252+ entries, mở rộng 500+' },
              { e: '🌐', t: 'Truyện song ngữ', d: '50 VN↔EN paragraph-aligned' },
              { e: '🔢', t: 'Quiz Toán 1060+ câu', d: 'L1-L6 từ mầm non → cấp 3' },
              { e: '🧭', t: 'La bàn 60 nghề', d: 'RIASEC quiz junior' },
              { e: '🏆', t: '16 badge + streak', d: 'Motivation system' },
              { e: '👶', t: 'Tối đa 5 học viên', d: 'Mỗi con PIN + profile riêng' },
            ].map((f, i) => (
              <div key={i} style={{ background: BRAND.soft, padding: 16, borderRadius: 12, border: `1px solid ${BRAND.border}` }}>
                <div style={{ fontSize: 24 }}>{f.e}</div>
                <div style={{ fontSize: 14, fontWeight: 700, marginTop: 8 }}>{f.t}</div>
                <div style={{ fontSize: 12, color: BRAND.mute, marginTop: 4 }}>{f.d}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/sell" style={{ color: BRAND.purple, textDecoration: 'underline', fontSize: 14 }}>
              Xem chi tiết tất cả tính năng →
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: `linear-gradient(135deg, ${BRAND.purple} 0%, ${BRAND.pink} 100%)`, padding: '56px 24px', textAlign: 'center', color: '#fff' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 12px' }}>Sẵn sàng bắt đầu?</h2>
          <p style={{ fontSize: 16, opacity: 0.95, marginBottom: 24 }}>Đăng ký mất 5 phút. Hệ thống tự setup gia đình + gửi email login trong 30 giây.</p>
          <Link
            href="/dangky"
            style={{
              display: 'inline-block',
              background: '#fff',
              color: BRAND.purple,
              padding: '14px 32px',
              borderRadius: 999,
              fontSize: 17,
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
            }}
          >
            🌸 Đăng ký miễn phí ngay →
          </Link>
          <p style={{ fontSize: 13, opacity: 0.85, marginTop: 16 }}>
            Cần tư vấn? Telegram <a href="https://t.me/pany_super_os_bot" style={{ color: '#fff', textDecoration: 'underline' }}>@pany_super_os_bot</a> · 0983 179 109
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '32px 24px', textAlign: 'center', fontSize: 13, color: BRAND.mute, borderTop: `1px solid ${BRAND.border}` }}>
        <div style={{ marginBottom: 8 }}>
          <Link href="/sell" style={{ color: BRAND.purple, textDecoration: 'none', margin: '0 8px' }}>Chi tiết sản phẩm</Link>
          ·
          <Link href="/dangky" style={{ color: BRAND.purple, textDecoration: 'none', margin: '0 8px' }}>Đăng ký</Link>
          ·
          <a href="https://t.me/pany_super_os_bot" style={{ color: BRAND.purple, textDecoration: 'none', margin: '0 8px' }}>Hỗ trợ</a>
        </div>
        <p style={{ margin: 0 }}>Pany Kids Studio · Sản phẩm của PANY Vietnam · 2026</p>
        <p style={{ margin: '4px 0 0' }}>Tuân thủ PDPL Việt Nam (Luật 91/2025) · Dữ liệu mã hóa · Không bán data</p>
      </footer>
    </div>
  );
}
