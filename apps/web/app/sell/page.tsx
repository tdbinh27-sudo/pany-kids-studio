/**
 * @file app/sell/page.tsx
 * @description Pany Kids Studio sales landing page.
 *              FREE long-term standard tier (D-033 supersedes D-022).
 *              Content continuously updated (giáo án/quest/story weekly).
 *              Upgrade path: personal tutor + custom roadmap — contact only.
 *              Hidden from search engines (robots: noindex).
 * @version 1.1.0-free-long-term
 * @updated 2026-05-15
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import HeroGreeting from '@/components/HeroGreeting';
import TreeHero from '@/components/TreeHero';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://kids.panyvn.app';

export const metadata: Metadata = {
  title: 'Pany Kids Studio — Studio học tập gia đình cho trẻ 5-16 tuổi',
  description:
    'Dashboard học tập 24/7 cho 5 con. 12 trụ cột phát triển. Trợ lý AI Cô Pany đồng hành. Miễn phí — giáo án & nội dung cập nhật liên tục.',
  alternates: { canonical: `${APP_URL}/sell` },
  robots: { index: false, follow: false }, // hidden until launch
  openGraph: {
    title: '🌸 Pany Kids Studio — Miễn phí · Giáo án cập nhật mỗi tuần',
    description: 'Studio học tập cho gia đình Việt: 12 trụ cột phát triển × 5 học viên × trợ lý AI Cô Pany.',
    url: `${APP_URL}/sell`,
    siteName: 'Pany Kids Studio',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: `${APP_URL}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: 'Pany Kids Studio — Miễn phí · Giáo án cập nhật mỗi tuần',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🌸 Pany Kids Studio — Miễn phí · Giáo án cập nhật mỗi tuần',
    description: 'Studio học tập cho gia đình Việt: 12 trụ cột phát triển × 5 học viên.',
    images: [`${APP_URL}/og-image.svg`],
  },
};

const BRAND = {
  purple: '#845EC2',
  pink: '#FF6B9D',
  mint: '#51CF66',
  sky: '#4DABF7',
  amber: '#FFD43B',
  soft: '#F9F4FF',
  text: '#2D1B4E',
  mute: '#666',
  border: '#E5DBFF',
};

const features = [
  { icon: '🏠', title: '12 Trụ cột phát triển', desc: 'Công nghệ · Tiếng Anh · Tài chính · Tư duy · Kinh doanh · Trải nghiệm + 6 trụ cột phát triển toàn diện (Sáng tạo, Vận động, Tự khám phá, La bàn nghề, Gia đình, Theo dõi).' },
  { icon: '👥', title: 'Tối đa 5 học viên', desc: 'Tài khoản gia đình cho 1-5 con cùng độ tuổi 5-16. Mỗi con có PIN riêng, lộ trình riêng, badge riêng.' },
  { icon: '🤖', title: 'Cô Pany — Trợ lý AI cho con', desc: 'Claude Sonnet 4.6 đóng vai cô giáo trẻ ấm áp, kiên nhẫn. Tự switch ngôn ngữ Việt/Anh theo con. KHÔNG cho đáp án thẳng — dạy con tự nghĩ.' },
  { icon: '📚', title: 'Khám phá tinh tuyển', desc: 'Thư viện + Quiz + AI Search. Liên kết kiến thức bố tự curated từ SGK Cánh Diều/KNTT/CTST + Khan Academy + HOCMAI.' },
  { icon: '🧭', title: 'La bàn 60 nghề', desc: 'Khám phá nghề tương lai qua RIASEC quiz 36/48 câu. 60 nghề × "ngày trong đời" giúp con thấy nghề thực tế.' },
  { icon: '🎯', title: 'Số năm chỉ tiêu tùy chỉnh', desc: 'Phụ huynh tự set 3 / 5 / 7 / 10 năm lộ trình. Mỗi năm có 4 quarters × objectives × pillars.' },
  { icon: '🏆', title: '16 huy hiệu + streak', desc: 'Mở khóa badge khi đạt mốc. Streak check-in hằng ngày. Bảng xếp hạng trong nhà.' },
  { icon: '🌐', title: 'Song ngữ Việt-Anh native', desc: 'Mọi nội dung viết native VN + EN parallel. Truyện song ngữ paragraph-aligned. CEFR K → B2 auto theo tuổi.' },
];

const howItWorks = [
  { n: 1, title: 'Đăng ký miễn phí', desc: 'Điền form 5 phút (tên, email, SĐT, độ tuổi các con). Hệ thống tự tạo gia đình ngay.' },
  { n: 2, title: 'Đăng nhập + setup', desc: 'Nhận email với link đăng nhập + mật khẩu tạm. Đổi mật khẩu, đặt PIN cho từng con.' },
  { n: 3, title: 'Con khám phá hằng ngày', desc: 'Mỗi con login bằng PIN riêng. Làm quest, đọc truyện, chat Cô Pany. Bố mẹ xem progress.' },
  { n: 4, title: 'Miễn phí dài hạn · nội dung cập nhật mỗi tuần', desc: 'Toàn bộ tính năng standard mở khóa, không giới hạn thời gian. Mỗi tuần PANY cập nhật quest/story/bài học mới. Cô Pany 20 lượt chat/ngày/gia đình (đủ dùng cho hướng dẫn). Cần nâng cấp trải nghiệm cá nhân → liên hệ Zalo.' },
];

const faqs = [
  { q: 'Có thực sự miễn phí hoàn toàn không?', a: 'Đúng vậy. Bản chuẩn (standard) miễn phí dài hạn cho mọi gia đình Việt — không giới hạn thời gian, không cần thẻ tín dụng. Nội dung được cập nhật liên tục: quest mới, story mới, bài học mới mỗi tuần. Nếu cần trải nghiệm cá nhân hóa hơn (gia sư AI riêng cho từng con, lộ trình tùy chỉnh, analytics chuyên sâu) → liên hệ PANY để nâng cấp.' },
  { q: 'Con tôi 5 tuổi/16 tuổi có dùng được không?', a: 'Có. Pany Kids hỗ trợ chính xác từng độ tuổi 5-16 (12 single-year tracks). Nội dung được map theo chương trình VN: mầm non lá → lớp 11. Cô Pany tự điều chỉnh ngôn ngữ theo tuổi từng con.' },
  { q: 'Tôi có thể thêm bao nhiêu con vào 1 tài khoản?', a: 'Tối đa 5 học viên/gia đình. Mỗi con có profile + PIN + lộ trình riêng. Nếu anh/chị có nhiều hơn 5 con hoặc là trung tâm/trường — liên hệ phương án enterprise riêng.' },
  { q: 'Cô Pany có thay được tên không?', a: 'Có. Mặc định "Cô Pany" (cảm giác cô giáo trẻ ấm áp). Anh/chị có thể đổi thành "Đại Ka" (anh cả/mentor), "Anh AI", "Bạn AI", hoặc tên tùy chỉnh trong Settings sau khi đăng nhập.' },
  { q: 'Cô Pany có làm hộ bài tập không?', a: 'KHÔNG. Cô Pany tuyệt đối không cho đáp án thẳng (toán, code, văn). Dùng Socratic — hỏi ngược lại để dẫn dắt con tự nghĩ. Đây là rule cứng để bảo vệ tư duy con.' },
  { q: 'Email tôi đã dùng cho sản phẩm PANY khác (như Gia Phả) — đăng ký Pany Kids được không?', a: 'Được. Khi hệ thống phát hiện email trùng, anh/chị sẽ được xác nhận qua SĐT (OTP) để liên kết Pany Kids vào account hiện có. Hoặc dùng email khác cũng được — hệ thống không bắt buộc unified account ban đầu.' },
  { q: 'Dữ liệu của con tôi có an toàn không?', a: 'Có. Dữ liệu lưu Supabase enterprise-grade + RLS per-family isolation (không gia đình nào xem được data gia đình khác). Tuân thủ PDPL Việt Nam (Luật 91/2025). Không bán data cho bên thứ ba.' },
];

export default function SellPage() {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: BRAND.text, background: '#fff' }}>
      {/* HERO — D-035 Tree of Knowledge immersive aesthetic */}
      <TreeHero minHeight={720}>
        <div style={{ marginBottom: 24 }}>
          <HeroGreeting variant="hero" mode="anonymous" subtitle="Cây tri thức cho 5 con × 12 trụ cột × 5-16 tuổi" />
        </div>
        <div style={{ display: 'inline-block', background: 'rgba(255,212,59,0.15)', color: '#FFD43B', padding: '8px 18px', borderRadius: 999, fontSize: 13, fontWeight: 700, marginBottom: 20, border: '1px solid rgba(255,212,59,0.35)', backdropFilter: 'blur(8px)', letterSpacing: 0.5 }}>
          🎁 MIỄN PHÍ DÀI HẠN · GIÁO ÁN CẬP NHẬT MỖI TUẦN
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.1, margin: '0 0 18px', color: '#E8F4FB', textShadow: '0 0 28px rgba(79,179,232,0.5)' }}>
          Pany Kids Studio
        </h1>
        <p style={{ fontSize: 22, lineHeight: 1.5, color: '#A6CFE5', margin: '0 0 14px', maxWidth: 680, fontWeight: 500 }}>
          Studio học tập gia đình cho <strong style={{ color: '#E8F4FB' }}>5 con × 12 trụ cột × 5-16 tuổi</strong>
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: '#7FB3D5', margin: '0 0 36px', maxWidth: 600 }}>
          Cô Pany — trợ lý AI Claude Sonnet 4.6 đồng hành cùng các con mỗi ngày.<br />
          Setup 5 phút · dùng được ngay trên trình duyệt + điện thoại.
        </p>
        <Link
          href="/sell/register"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #4FB3E8 0%, #00BFFF 100%)',
            color: '#0A1628',
            padding: '18px 42px',
            borderRadius: 999,
            fontSize: 18,
            fontWeight: 800,
            textDecoration: 'none',
            boxShadow: '0 0 36px rgba(79,179,232,0.55), 0 8px 24px rgba(0,0,0,0.35)',
            border: '1px solid rgba(79,179,232,0.85)',
          }}
        >
          🌳 Trồng cây cho con — Miễn phí →
        </Link>
        <p style={{ fontSize: 13, color: '#7FB3D5', marginTop: 16 }}>
          Hoặc nhắn Zalo: <a href="tel:0983179109" style={{ color: '#4FB3E8', textDecoration: 'underline' }}>0983 179 109</a>
        </p>
      </TreeHero>

      {/* FEATURES */}
      <section style={{ padding: '64px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: 'center', color: BRAND.purple, marginBottom: 8 }}>Vì sao chọn Pany Kids?</h2>
        <p style={{ textAlign: 'center', color: BRAND.mute, marginBottom: 40 }}>8 lý do dashboard này khác mọi app giáo dục hiện có.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: BRAND.soft, padding: 24, borderRadius: 16, border: `1px solid ${BRAND.border}` }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: BRAND.purple, margin: '0 0 8px' }}>{f.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: BRAND.text, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: BRAND.soft, padding: '64px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: 'center', color: BRAND.purple, marginBottom: 40 }}>Bắt đầu trong 5 phút</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {howItWorks.map(s => (
              <div key={s.n} style={{ background: '#fff', padding: 24, borderRadius: 16, border: `1px solid ${BRAND.border}` }}>
                <div style={{ display: 'inline-block', width: 36, height: 36, lineHeight: '36px', textAlign: 'center', background: BRAND.purple, color: '#fff', borderRadius: '50%', fontWeight: 700, marginBottom: 12 }}>{s.n}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: BRAND.mute, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '64px 24px', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: 'center', color: BRAND.purple, marginBottom: 40 }}>Câu hỏi thường gặp</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((f, i) => (
            <details key={i} style={{ background: BRAND.soft, padding: '16px 20px', borderRadius: 12, border: `1px solid ${BRAND.border}` }}>
              <summary style={{ fontWeight: 700, cursor: 'pointer', color: BRAND.text }}>{f.q}</summary>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: BRAND.text, marginTop: 12, marginBottom: 0 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: `linear-gradient(135deg, ${BRAND.purple} 0%, ${BRAND.pink} 100%)`, padding: '64px 24px', textAlign: 'center', color: '#fff' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 12px' }}>Sẵn sàng học cùng PANY?</h2>
          <p style={{ fontSize: 17, opacity: 0.95, marginBottom: 32 }}>Miễn phí dài hạn · Đăng ký 5 phút · Hệ thống tự setup gia đình + gửi email login trong 30 giây.</p>
          <Link
            href="/sell/register"
            style={{
              display: 'inline-block',
              background: '#fff',
              color: BRAND.purple,
              padding: '16px 36px',
              borderRadius: 999,
              fontSize: 18,
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            }}
          >
            🌸 Đăng ký miễn phí ngay →
          </Link>
          <p style={{ fontSize: 13, opacity: 0.85, marginTop: 16 }}>
            Cần tư vấn? Telegram <a href="https://t.me/pany_super_os_bot" style={{ color: '#fff', textDecoration: 'underline' }}>@pany_super_os_bot</a> · Hotline 0983 179 109
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '32px 24px', textAlign: 'center', fontSize: 13, color: BRAND.mute, borderTop: `1px solid ${BRAND.border}` }}>
        <p style={{ margin: 0 }}>Pany Kids Studio · Sản phẩm của PANY Vietnam · 2026</p>
        <p style={{ margin: '4px 0 0' }}>Tuân thủ PDPL Việt Nam · Dữ liệu mã hóa · Không bán data</p>
      </footer>
    </div>
  );
}
