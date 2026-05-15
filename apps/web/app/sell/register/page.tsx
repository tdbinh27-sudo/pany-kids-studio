'use client';

/**
 * @file app/sell/register/page.tsx
 * @description Family signup form. POST to /api/sell/register.
 *              Captures parent_name, email, phone, family_name, kids_ages[].
 *              On EMAIL_EXISTS_PHONE_VERIFY (D-031), shows OTP step.
 */

import { useState } from 'react';
import Link from 'next/link';

const BRAND = {
  purple: '#845EC2',
  pink: '#FF6B9D',
  soft: '#F9F4FF',
  text: '#2D1B4E',
  mute: '#666',
  border: '#E5DBFF',
  amber: '#FFD43B',
  error: '#DC2626',
  success: '#16A34A',
};

type Step = 'form' | 'phone_otp' | 'success';

type SubmitResult = {
  ok: boolean;
  errorCode?: string;
  error?: string;
  family_id?: string;
  app_link?: string;
  phone_verify_hint?: string;
  existing_family_slug?: string;
};

export default function RegisterPage() {
  const [step, setStep] = useState<Step>('form');
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [kidsAges, setKidsAges] = useState<string[]>(['']);
  const [source, setSource] = useState('dangky-direct');

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [otp, setOtp] = useState('');

  function addKid() {
    if (kidsAges.length >= 5) return;
    setKidsAges([...kidsAges, '']);
  }
  function removeKid(i: number) {
    setKidsAges(kidsAges.filter((_, idx) => idx !== i));
  }
  function setKidAge(i: number, v: string) {
    const next = [...kidsAges];
    next[i] = v;
    setKidsAges(next);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    const ages = kidsAges
      .map(s => parseInt(s, 10))
      .filter(n => Number.isFinite(n));

    try {
      const res = await fetch('/api/sell/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parent_name: parentName.trim(),
          parent_email: email.trim().toLowerCase(),
          parent_phone: phone.trim(),
          family_name: familyName.trim() || undefined,
          kids_count: ages.length,
          kids_ages: ages,
          source,
        }),
      });
      const data: SubmitResult = await res.json();
      setResult(data);

      if (data.ok) {
        setStep('success');
      } else if (data.errorCode === 'EMAIL_EXISTS_PHONE_VERIFY') {
        setStep('phone_otp');
      }
    } catch (err) {
      setResult({ ok: false, error: err instanceof Error ? err.message : 'Lỗi kết nối, vui lòng thử lại.' });
    } finally {
      setSubmitting(false);
    }
  }

  async function verifyOTP(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/sell/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parent_email: email.trim().toLowerCase(),
          phone: phone.trim(),
          code: otp.trim(),
        }),
      });
      const data: SubmitResult = await res.json();
      if (data.ok) {
        setStep('success');
        setResult(data);
      } else {
        setResult(data);
      }
    } catch (err) {
      setResult({ ok: false, error: err instanceof Error ? err.message : 'Lỗi xác thực OTP.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: BRAND.text, background: '#fff', minHeight: '100vh' }}>
      <header style={{ padding: '16px 24px', borderBottom: `1px solid ${BRAND.border}` }}>
        <Link href="/sell" style={{ color: BRAND.purple, textDecoration: 'none', fontSize: 14 }}>← Quay lại trang giới thiệu</Link>
      </header>

      <main style={{ maxWidth: 600, margin: '0 auto', padding: '40px 24px' }}>
        {step === 'form' && (
          <>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: BRAND.purple, margin: '0 0 8px' }}>🌸 Đăng ký miễn phí</h1>
            <p style={{ color: BRAND.mute, marginBottom: 32 }}>Điền form 5 phút — hệ thống tự setup gia đình + gửi email login trong 30 giây.</p>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Field label="Tên phụ huynh *" required>
                <input type="text" required value={parentName} onChange={e => setParentName(e.target.value)} placeholder="Trần Đức Bình" style={inputStyle} />
              </Field>

              <Field label="Email *" required hint="Dùng để đăng nhập + nhận thông báo">
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" style={inputStyle} />
              </Field>

              <Field label="Số điện thoại *" required hint="Để xác nhận nếu email trùng với sản phẩm PANY khác">
                <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="0983 179 109" style={inputStyle} />
              </Field>

              <Field label="Tên gia đình (không bắt buộc)" hint="Mặc định: 'Gia đình {tên phụ huynh}'">
                <input type="text" value={familyName} onChange={e => setFamilyName(e.target.value)} placeholder="VD: Gia đình Trần — Hà Nội" style={inputStyle} />
              </Field>

              <Field label="Độ tuổi các con * (5-16 tuổi, tối đa 5 học viên)" required>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {kidsAges.map((age, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <input
                        type="number"
                        min={5}
                        max={16}
                        required
                        value={age}
                        onChange={e => setKidAge(i, e.target.value)}
                        placeholder={`Con thứ ${i + 1}`}
                        style={{ ...inputStyle, flex: 1 }}
                      />
                      {kidsAges.length > 1 && (
                        <button type="button" onClick={() => removeKid(i)} style={{ ...buttonStyle, background: '#fff', color: BRAND.error, border: `1px solid ${BRAND.error}`, padding: '8px 12px' }}>✕</button>
                      )}
                    </div>
                  ))}
                  {kidsAges.length < 5 && (
                    <button type="button" onClick={addKid} style={{ ...buttonStyle, background: BRAND.soft, color: BRAND.purple, border: `1px dashed ${BRAND.purple}`, padding: '10px' }}>
                      + Thêm con
                    </button>
                  )}
                </div>
              </Field>

              <Field label="Anh/chị biết đến Pany Kids từ đâu?">
                <select value={source} onChange={e => setSource(e.target.value)} style={inputStyle}>
                  <option value="dangky-direct">Trực tiếp truy cập website</option>
                  <option value="fb">Facebook</option>
                  <option value="zalo">Zalo</option>
                  <option value="friend-ref">Bạn bè giới thiệu</option>
                  <option value="parent-group">Group phụ huynh</option>
                  <option value="other">Khác</option>
                </select>
              </Field>

              {result?.error && !result.ok && (
                <div style={{ background: '#FEE2E2', color: BRAND.error, padding: 12, borderRadius: 8, fontSize: 14 }}>
                  {result.error}
                </div>
              )}

              <button type="submit" disabled={submitting} style={{ ...buttonStyle, background: BRAND.purple, color: '#fff', padding: '14px 24px', fontSize: 16, fontWeight: 700, opacity: submitting ? 0.6 : 1 }}>
                {submitting ? 'Đang xử lý...' : '🌸 Đăng ký miễn phí'}
              </button>

              <p style={{ fontSize: 12, color: BRAND.mute, textAlign: 'center', margin: 0 }}>
                Bằng việc đăng ký, anh/chị đồng ý với điều khoản sử dụng + chính sách bảo mật của PANY.
              </p>
            </form>
          </>
        )}

        {step === 'phone_otp' && (
          <>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: BRAND.purple, margin: '0 0 8px' }}>📱 Xác nhận bằng SĐT</h1>
            <div style={{ background: '#FFFBEB', border: `1px solid ${BRAND.amber}`, padding: 16, borderRadius: 8, marginBottom: 24 }}>
              <p style={{ margin: 0, fontSize: 14 }}>
                Email <strong>{email}</strong> đã có account trong hệ thống PANY{result?.existing_family_slug ? ` (${result.existing_family_slug})` : ''}.
                Vui lòng nhập mã OTP đã gửi đến SĐT <strong>{result?.phone_verify_hint ?? phone}</strong> để liên kết Pany Kids vào account hiện có.
              </p>
            </div>

            <form onSubmit={verifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Field label="Mã OTP (6 số)">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  style={{ ...inputStyle, fontSize: 24, letterSpacing: 8, textAlign: 'center' }}
                />
              </Field>

              {result?.error && !result.ok && (
                <div style={{ background: '#FEE2E2', color: BRAND.error, padding: 12, borderRadius: 8, fontSize: 14 }}>
                  {result.error}
                </div>
              )}

              <button type="submit" disabled={submitting || otp.length !== 6} style={{ ...buttonStyle, background: BRAND.purple, color: '#fff', padding: '14px 24px', fontSize: 16, fontWeight: 700, opacity: (submitting || otp.length !== 6) ? 0.6 : 1 }}>
                {submitting ? 'Đang xác thực...' : 'Xác nhận OTP'}
              </button>

              <button type="button" onClick={() => setStep('form')} style={{ ...buttonStyle, background: '#fff', color: BRAND.mute, border: `1px solid ${BRAND.border}`, padding: '10px' }}>
                ← Quay lại form
              </button>
            </form>
          </>
        )}

        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: BRAND.success, margin: '0 0 12px' }}>Đăng ký thành công!</h1>
            <p style={{ color: BRAND.text, marginBottom: 24, lineHeight: 1.6 }}>
              Hệ thống đang tạo gia đình + gửi email login đến <strong>{email}</strong>.<br />
              Anh/chị check email trong 30 giây (kiểm tra cả Spam nếu cần).
            </p>
            <div style={{ background: BRAND.soft, padding: 20, borderRadius: 12, marginBottom: 24 }}>
              <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600 }}>📋 Các bước tiếp theo:</p>
              <ol style={{ textAlign: 'left', margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.8 }}>
                <li>Mở email từ noreply@panyvn.app</li>
                <li>Click link login + đổi mật khẩu tạm</li>
                <li>Vào tab "Học viên" → setup PIN + bio cho từng con</li>
                <li>Khám phá 12 trụ cột + chat với Cô Pany</li>
              </ol>
            </div>
            {result?.app_link && (
              <Link href={result.app_link} style={{ display: 'inline-block', background: BRAND.purple, color: '#fff', padding: '12px 28px', borderRadius: 999, fontWeight: 700, textDecoration: 'none' }}>
                Mở Pany Kids →
              </Link>
            )}
            <p style={{ fontSize: 13, color: BRAND.mute, marginTop: 24 }}>
              Cần hỗ trợ? Telegram <a href="https://t.me/pany_super_os_bot" style={{ color: BRAND.purple }}>@pany_super_os_bot</a> · 0983 179 109
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 14, fontWeight: 600 }}>{label}{required ? '' : ''}</span>
      {hint && <span style={{ fontSize: 12, color: '#666' }}>{hint}</span>}
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  border: '1px solid #E5DBFF',
  borderRadius: 8,
  fontSize: 15,
  fontFamily: 'inherit',
  background: '#fff',
  color: '#2D1B4E',
  boxSizing: 'border-box',
};

const buttonStyle: React.CSSProperties = {
  borderRadius: 8,
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 15,
};
