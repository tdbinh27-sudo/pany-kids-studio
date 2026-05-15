'use client';

/**
 * @file app/onboarding/page.tsx
 * @description 3-step onboarding wizard UI for new families.
 *              Single-page client component with internal state machine.
 *              Calls /api/family/onboarding (BB route).
 *
 * @flow
 *   Mount → GET /api/family/onboarding?family_id&parent_pin → current_step
 *   Step 1: Kids setup + parent PIN → POST step=1
 *   Step 2: Chatbot name pick → POST step=2
 *   Step 3: Target years + age range → POST step=3
 *   Done: success page → redirect to / (main dashboard)
 *
 * @auth Query params ?family_id=...&parent_pin=... from welcome email link.
 *       Persisted to sessionStorage so refresh preserves state.
 *
 * @reference CC (this file) wires Z (family-onboarding.ts helpers) + BB (API route)
 */

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const BRAND = {
  purple: '#845EC2',
  pink: '#FF6B9D',
  mint: '#51CF66',
  amber: '#FFD43B',
  sky: '#4DABF7',
  red: '#DC2626',
  soft: '#F9F4FF',
  text: '#2D1B4E',
  mute: '#666',
  border: '#E5DBFF',
};

// ─── Types (mirror BB route response shapes) ───────────────────────

type OnboardingState = {
  ok: boolean;
  family?: { id: string; slug: string; name: string; tier: string; trial_ends_at: string | null };
  settings?: {
    target_years: number;
    age_min: number;
    age_max: number;
    chatbot_name: string;
    chatbot_name_en?: string;
    primary_lang: 'vi' | 'en';
    onboarding_step: '1' | '2' | '3' | 'done';
  };
  kids?: Array<{ id: string; position: number; name: string; age: number; emoji?: string }>;
  current_step?: '1' | '2' | '3' | 'done';
  completed?: boolean;
  suggestions?: {
    target_years: 3 | 5 | 7 | 10;
    chatbot_name: string;
    age_range: { age_min: number; age_max: number };
  };
  error?: string;
};

type KidForm = {
  position: number;
  name: string;
  age: string;
  pin: string;
};

const CHATBOT_PRESETS = [
  { name: 'Cô Pany',  archetype: 'Cô giáo trẻ ấm áp — gắn với brand PANY', emoji: '👩‍🏫' },
  { name: 'Đại Ka',   archetype: 'Anh cả mentor có gravitas — phù hợp teen', emoji: '🥋' },
  { name: 'Anh AI',   archetype: 'Bạn lớn AI thân mật',                       emoji: '🧑‍💻' },
  { name: 'Bạn AI',   archetype: 'Bạn ngang hàng AI',                          emoji: '🤝' },
];

const TARGET_YEARS_OPTIONS = [
  { value: 3,  label: '3 năm — Ngắn hạn',         desc: 'Chuyển cấp (lớp 4→7, 9→12)' },
  { value: 5,  label: '5 năm — Tiêu chuẩn',       desc: 'Phổ biến (lớp 2→6, 5→10)' },
  { value: 7,  label: '7 năm — Dài hạn',          desc: 'Mầm non/lớp 1 (5t→12t)' },
  { value: 10, label: '10 năm — Toàn cấp',        desc: 'Mầm non → tốt nghiệp THPT' },
] as const;

const PILLAR_TOUR = [
  { emoji: '💻', name: 'Công nghệ & AI', desc: 'Code, AI tools' },
  { emoji: '🌍', name: 'Tiếng Anh',     desc: 'CEFR K → B2' },
  { emoji: '💰', name: 'Tài chính',     desc: 'Tiêu - tiết kiệm - đầu tư' },
  { emoji: '🧠', name: 'Tư duy',        desc: 'Logic, lập luận' },
  { emoji: '📊', name: 'Kinh doanh',    desc: 'Sales, marketing' },
  { emoji: '🌳', name: 'Trải nghiệm',   desc: 'Nấu ăn, sống tự lập' },
  { emoji: '🎨', name: 'Sáng tạo',      desc: 'Canvas, prompts' },
  { emoji: '🤸', name: 'Vận động',      desc: 'Tập thể dục, hít thở' },
  { emoji: '🔮', name: 'Tự khám phá',   desc: 'Mood, RIASEC' },
  { emoji: '🧭', name: 'La bàn nghề',   desc: '60 nghề + day-in-life' },
  { emoji: '👨‍👩‍👧', name: 'Gia đình',    desc: 'Weekly review' },
  { emoji: '📊', name: 'Theo dõi',     desc: 'Streak, badge' },
];

export default function OnboardingPage() {
  // Next.js 16: useSearchParams() requires Suspense boundary for static gen.
  return (
    <Suspense fallback={<OnboardingLoadingFallback />}>
      <OnboardingPageInner />
    </Suspense>
  );
}

function OnboardingLoadingFallback() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: BRAND.soft, color: BRAND.mute, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <p>Đang tải…</p>
    </div>
  );
}

function OnboardingPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Auth (URL → sessionStorage fallback)
  const [familyId, setFamilyId] = useState<string>('');
  const [parentPin, setParentPin] = useState<string>('');

  const [state, setState] = useState<OnboardingState | null>(null);
  const [step, setStep] = useState<'1' | '2' | '3' | 'done' | 'loading' | 'auth'>('loading');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1 form state
  const [parentPinNew, setParentPinNew] = useState('');
  const [kids, setKids] = useState<KidForm[]>([{ position: 1, name: '', age: '', pin: '1111' }]);

  // Step 2 form state
  const [chatbotName, setChatbotName] = useState(CHATBOT_PRESETS[0].name);
  const [chatbotCustom, setChatbotCustom] = useState('');
  const [primaryLang, setPrimaryLang] = useState<'vi' | 'en'>('vi');

  // Step 3 form state
  const [targetYears, setTargetYears] = useState<3 | 5 | 7 | 10>(5);
  const [ageMin, setAgeMin] = useState(5);
  const [ageMax, setAgeMax] = useState(16);

  // ─── Auth bootstrap ─────────────────────────────────────────────
  useEffect(() => {
    const fid = searchParams.get('family_id') ?? sessionStorage.getItem('pany-family-id') ?? '';
    const pin = searchParams.get('parent_pin') ?? sessionStorage.getItem('pany-parent-pin') ?? '';
    if (fid) sessionStorage.setItem('pany-family-id', fid);
    if (pin) sessionStorage.setItem('pany-parent-pin', pin);
    setFamilyId(fid);
    setParentPin(pin);
    if (!fid || !pin) {
      setStep('auth');
    }
  }, [searchParams]);

  // ─── Load state ─────────────────────────────────────────────────
  const loadState = useCallback(async () => {
    if (!familyId || !parentPin) return;
    setStep('loading');
    setError(null);
    try {
      const url = new URL('/api/family/onboarding', window.location.origin);
      url.searchParams.set('family_id', familyId);
      url.searchParams.set('parent_pin', parentPin);
      const res = await fetch(url.toString());
      const data: OnboardingState = await res.json();
      setState(data);
      if (!data.ok) {
        setError(data.error ?? 'Lỗi tải onboarding state.');
        setStep('auth');
        return;
      }
      const cur = data.current_step ?? '1';
      setStep(cur);
      // Pre-fill from suggestions
      if (data.suggestions) {
        setTargetYears(data.suggestions.target_years);
        setAgeMin(data.suggestions.age_range.age_min);
        setAgeMax(data.suggestions.age_range.age_max);
        if (CHATBOT_PRESETS.find(p => p.name === data.suggestions!.chatbot_name)) {
          setChatbotName(data.suggestions.chatbot_name);
        }
      }
      // Pre-fill from existing kids
      if (data.kids && data.kids.length > 0) {
        setKids(data.kids.map((k, i) => ({
          position: k.position,
          name: k.name,
          age: String(k.age),
          pin: String((i + 1) * 1111).padStart(4, '0'),
        })));
      }
      if (data.settings?.chatbot_name) setChatbotName(data.settings.chatbot_name);
      if (data.settings?.primary_lang) setPrimaryLang(data.settings.primary_lang);
      if (data.settings?.target_years) setTargetYears(data.settings.target_years as 3 | 5 | 7 | 10);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setStep('auth');
    }
  }, [familyId, parentPin]);

  useEffect(() => {
    if (familyId && parentPin) loadState();
  }, [familyId, parentPin, loadState]);

  // ─── Submit step ────────────────────────────────────────────────
  async function submitStep(stepNum: 1 | 2 | 3, payload: Record<string, unknown>) {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/family/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ family_id: familyId, parent_pin: parentPin, step: stepNum, payload }),
      });
      const data = await res.json();
      if (!data.ok) {
        if (Array.isArray(data.errors)) {
          setError(data.errors.map((e: { message_vi: string }) => e.message_vi).join(' · '));
        } else {
          setError(data.error ?? 'Lỗi không xác định.');
        }
        return;
      }
      // Move to next step + reload state for fresh suggestions
      const next = data.next_step;
      if (next === 'done') {
        setStep('done');
      } else {
        setStep(String(next) as '1' | '2' | '3');
      }
      await loadState();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSubmitting(false);
    }
  }

  // ─── Step 1 submit ──────────────────────────────────────────────
  function submitStep1() {
    const ages = kids.map(k => parseInt(k.age, 10)).filter(n => Number.isFinite(n));
    submitStep(1, {
      kids: kids.map((k, i) => ({
        position: k.position,
        name: k.name.trim(),
        age: ages[i],
        pin: k.pin,
      })),
      parent_pin: parentPinNew,
    });
  }

  function submitStep2() {
    const finalName = chatbotName === '__custom__' ? chatbotCustom.trim() : chatbotName;
    submitStep(2, {
      chatbot_name: finalName,
      primary_lang: primaryLang,
    });
  }

  function submitStep3() {
    submitStep(3, {
      target_years: targetYears,
      age_min: ageMin,
      age_max: ageMax,
    });
  }

  function addKid() {
    if (kids.length >= 5) return;
    setKids([...kids, { position: kids.length + 1, name: '', age: '', pin: String((kids.length + 1) * 1111).padStart(4, '0') }]);
  }
  function removeKid(i: number) {
    const next = kids.filter((_, idx) => idx !== i).map((k, idx) => ({ ...k, position: idx + 1 }));
    setKids(next);
  }
  function updateKid(i: number, field: keyof KidForm, value: string) {
    const next = [...kids];
    next[i] = { ...next[i], [field]: value };
    setKids(next);
  }

  const stepNumber = useMemo(() => (step === 'done' ? 3 : step === 'auth' || step === 'loading' ? 0 : Number(step)), [step]);

  // ─── Render ─────────────────────────────────────────────────────

  if (step === 'loading') {
    return <Centered><p style={{ color: BRAND.mute }}>Đang tải onboarding...</p></Centered>;
  }

  if (step === 'auth') {
    return (
      <Centered>
        <form
          style={loginFormStyle}
          onSubmit={(e) => {
            e.preventDefault();
            if (familyId && parentPin) {
              sessionStorage.setItem('pany-family-id', familyId);
              sessionStorage.setItem('pany-parent-pin', parentPin);
              setStep('loading');
            }
          }}
        >
          <h1 style={{ fontSize: 24, fontWeight: 800, color: BRAND.purple, margin: '0 0 8px' }}>🌸 Onboarding Pany Kids</h1>
          <p style={{ color: BRAND.mute, fontSize: 14, margin: '0 0 24px' }}>
            Nhập family_id + parent_pin từ email welcome (link đăng nhập đã có sẵn — nếu bạn click link đúng, các trường này được tự điền).
          </p>
          {error && <div style={errorBoxStyle}>{error}</div>}
          <label style={labelStyle}>family_id (UUID)</label>
          <input value={familyId} onChange={(e) => setFamilyId(e.target.value)} required style={inputStyle} placeholder="abc-123-..." />
          <label style={labelStyle}>Parent PIN (4 số)</label>
          <input value={parentPin} onChange={(e) => setParentPin(e.target.value)} required style={inputStyle} placeholder="0000" pattern="\d{4}" />
          <button type="submit" style={primaryBtnStyle}>Tiếp tục →</button>
        </form>
      </Centered>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: BRAND.soft, fontFamily: 'system-ui, -apple-system, sans-serif', color: BRAND.text }}>
      <header style={headerStyle}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: BRAND.purple, margin: 0 }}>🌸 Pany Kids — Onboarding</h1>
          <p style={{ fontSize: 13, color: BRAND.mute, margin: '4px 0 0' }}>
            {state?.family?.name ?? 'Gia đình mới'} · {step === 'done' ? 'Hoàn thành!' : `Bước ${stepNumber} / 3`}
          </p>
        </div>
        <ProgressDots current={stepNumber} total={3} />
      </header>

      <main style={mainStyle}>
        {error && <div style={errorBoxStyle}>⚠️ {error}</div>}

        {step === '1' && (
          <Card title="Bước 1: Học viên + PIN phụ huynh" subtitle="Tối đa 5 con, tuổi 5-16. Mỗi con sẽ có PIN riêng để đăng nhập.">
            <FieldGroup>
              <label style={labelStyle}>🔐 PIN phụ huynh (4 số) — dùng vào parent mode</label>
              <input value={parentPinNew} onChange={(e) => setParentPinNew(e.target.value)} required maxLength={4} pattern="\d{4}" style={inputStyle} placeholder="0000" />
            </FieldGroup>

            <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.mute, textTransform: 'uppercase', letterSpacing: 1, marginTop: 24, marginBottom: 12 }}>
              👶 Các con ({kids.length}/5)
            </div>

            {kids.map((kid, i) => (
              <div key={i} style={kidCardStyle}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 100px auto', gap: 8, alignItems: 'center' }}>
                  <input
                    placeholder={`Tên con thứ ${i + 1}`}
                    value={kid.name}
                    onChange={(e) => updateKid(i, 'name', e.target.value)}
                    required
                    style={inputStyle}
                  />
                  <input
                    type="number"
                    min={5}
                    max={16}
                    placeholder="Tuổi"
                    value={kid.age}
                    onChange={(e) => updateKid(i, 'age', e.target.value)}
                    required
                    style={inputStyle}
                  />
                  <input
                    placeholder="PIN 4 số"
                    value={kid.pin}
                    onChange={(e) => updateKid(i, 'pin', e.target.value)}
                    required
                    maxLength={4}
                    pattern="\d{4}"
                    style={inputStyle}
                  />
                  {kids.length > 1 && (
                    <button onClick={() => removeKid(i)} style={removeBtnStyle} title="Xóa">✕</button>
                  )}
                </div>
              </div>
            ))}

            {kids.length < 5 && (
              <button onClick={addKid} style={addBtnStyle}>+ Thêm con</button>
            )}

            <button onClick={submitStep1} disabled={submitting} style={{ ...primaryBtnStyle, marginTop: 24 }}>
              {submitting ? 'Đang lưu...' : 'Lưu + Tiếp tục Bước 2 →'}
            </button>
          </Card>
        )}

        {step === '2' && (
          <Card title="Bước 2: Đặt tên trợ lý AI" subtitle="Trợ lý AI sẽ đồng hành các con mỗi ngày. Chọn tên phù hợp tính cách gia đình.">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {CHATBOT_PRESETS.map(p => (
                <button
                  key={p.name}
                  onClick={() => setChatbotName(p.name)}
                  style={{
                    ...presetBtnStyle,
                    border: `2px solid ${chatbotName === p.name ? BRAND.purple : BRAND.border}`,
                    background: chatbotName === p.name ? BRAND.purple + '11' : '#fff',
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{p.emoji}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: BRAND.text }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: BRAND.mute, marginTop: 4 }}>{p.archetype}</div>
                </button>
              ))}
              <button
                onClick={() => setChatbotName('__custom__')}
                style={{
                  ...presetBtnStyle,
                  border: `2px dashed ${chatbotName === '__custom__' ? BRAND.purple : BRAND.border}`,
                  background: chatbotName === '__custom__' ? BRAND.purple + '11' : '#fff',
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>✏️</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: BRAND.text }}>Tên tùy chỉnh</div>
                <div style={{ fontSize: 12, color: BRAND.mute, marginTop: 4 }}>Tự đặt tên trợ lý</div>
              </button>
            </div>

            {chatbotName === '__custom__' && (
              <div style={{ marginTop: 16 }}>
                <label style={labelStyle}>Tên tùy chỉnh (≤ 20 ký tự)</label>
                <input
                  value={chatbotCustom}
                  onChange={(e) => setChatbotCustom(e.target.value)}
                  maxLength={20}
                  style={inputStyle}
                  placeholder="VD: Mèo Mun, Cô Hoa..."
                />
              </div>
            )}

            <FieldGroup>
              <label style={labelStyle}>🌐 Ngôn ngữ chính</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => setPrimaryLang('vi')}
                  style={{ ...presetBtnStyle, flex: 1, border: `2px solid ${primaryLang === 'vi' ? BRAND.purple : BRAND.border}`, background: primaryLang === 'vi' ? BRAND.purple + '11' : '#fff' }}
                >
                  🇻🇳 Tiếng Việt
                </button>
                <button
                  onClick={() => setPrimaryLang('en')}
                  style={{ ...presetBtnStyle, flex: 1, border: `2px solid ${primaryLang === 'en' ? BRAND.purple : BRAND.border}`, background: primaryLang === 'en' ? BRAND.purple + '11' : '#fff' }}
                >
                  🇬🇧 English
                </button>
              </div>
              <p style={{ fontSize: 12, color: BRAND.mute, marginTop: 4 }}>Anh/chị có thể đổi sau trong Settings. Đại Ka/Cô Pany tự switch theo lưu lượng ngôn ngữ con dùng.</p>
            </FieldGroup>

            <button onClick={submitStep2} disabled={submitting} style={{ ...primaryBtnStyle, marginTop: 24 }}>
              {submitting ? 'Đang lưu...' : 'Lưu + Tiếp tục Bước 3 →'}
            </button>
          </Card>
        )}

        {step === '3' && (
          <Card title="Bước 3: Lộ trình + Khoảng tuổi" subtitle="Pany Kids xây lộ trình dài hạn theo độ tuổi các con. Chọn số năm + khoảng tuổi tham gia.">
            <FieldGroup>
              <label style={labelStyle}>📅 Số năm chỉ tiêu (D-022)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                {TARGET_YEARS_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setTargetYears(opt.value)}
                    style={{ ...presetBtnStyle, border: `2px solid ${targetYears === opt.value ? BRAND.purple : BRAND.border}`, background: targetYears === opt.value ? BRAND.purple + '11' : '#fff' }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 14, color: BRAND.text }}>{opt.label}</div>
                    <div style={{ fontSize: 11, color: BRAND.mute, marginTop: 4 }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
              {state?.suggestions?.target_years && (
                <p style={{ fontSize: 12, color: BRAND.purple, marginTop: 4 }}>💡 Đề xuất theo độ tuổi các con: <strong>{state.suggestions.target_years} năm</strong></p>
              )}
            </FieldGroup>

            <FieldGroup>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Tuổi min (≥5)</label>
                  <input type="number" min={5} max={16} value={ageMin} onChange={(e) => setAgeMin(parseInt(e.target.value, 10))} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Tuổi max (≤16)</label>
                  <input type="number" min={5} max={16} value={ageMax} onChange={(e) => setAgeMax(parseInt(e.target.value, 10))} style={inputStyle} />
                </div>
              </div>
              <p style={{ fontSize: 12, color: BRAND.mute, marginTop: 4 }}>Pany Kids hỗ trợ chính xác 12 single-year tracks 5→16 (D-028). Khoảng này quyết định nội dung tự động được pick.</p>
            </FieldGroup>

            <div style={{ marginTop: 24, padding: 20, background: BRAND.soft, borderRadius: 12 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: BRAND.purple, margin: '0 0 12px' }}>📚 12 trụ cột phát triển (preview)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8 }}>
                {PILLAR_TOUR.map(p => (
                  <div key={p.name} style={{ background: '#fff', padding: 12, borderRadius: 8, fontSize: 12 }}>
                    <div style={{ fontSize: 20 }}>{p.emoji}</div>
                    <div style={{ fontWeight: 700, marginTop: 4 }}>{p.name}</div>
                    <div style={{ color: BRAND.mute, fontSize: 11 }}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={submitStep3} disabled={submitting} style={{ ...primaryBtnStyle, marginTop: 24 }}>
              {submitting ? 'Đang hoàn thành...' : '🎉 Hoàn thành onboarding →'}
            </button>
          </Card>
        )}

        {step === 'done' && (
          <Card title="🎉 Hoàn thành onboarding!" subtitle={`${state?.family?.name ?? 'Gia đình'} đã sẵn sàng dùng Pany Kids.`}>
            <div style={{ background: '#FFFBEB', border: `1px solid ${BRAND.amber}`, padding: 20, borderRadius: 12, marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#92400E', margin: '0 0 12px' }}>🎁 Tài khoản miễn phí dài hạn đang hoạt động</h3>
              <p style={{ fontSize: 14, color: BRAND.text, margin: 0 }}>
                Toàn bộ tính năng bản chuẩn mở khóa, không giới hạn thời gian. Giáo án + quest + story cập nhật mỗi tuần. Cô Pany 20 lượt chat/ngày/gia đình. Cần trải nghiệm cá nhân hóa hơn → nhắn Zalo 0983 179 109.
              </p>
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: BRAND.purple, margin: '0 0 12px' }}>📋 Việc tiếp theo</h3>
            <ol style={{ paddingLeft: 20, lineHeight: 1.8, fontSize: 14, color: BRAND.text }}>
              <li>Mỗi con setup avatar + bio chi tiết trong tab <strong>Học viên</strong></li>
              <li>Xem quest hôm nay + thư viện trong tab <strong>Khám phá</strong></li>
              <li>Chat lần đầu với trợ lý AI <strong>{state?.settings?.chatbot_name ?? 'Cô Pany'}</strong></li>
              <li>Xem lộ trình <strong>{state?.settings?.target_years ?? 5} năm</strong> trong tab <strong>Tổng quan</strong></li>
            </ol>

            <button onClick={() => router.push('/')} style={{ ...primaryBtnStyle, marginTop: 24 }}>
              🌸 Vào Pany Kids Studio →
            </button>
          </Card>
        )}
      </main>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 4px 20px rgba(132,94,194,0.10)' }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: BRAND.purple, margin: '0 0 8px' }}>{title}</h2>
      {subtitle && <p style={{ color: BRAND.mute, fontSize: 14, margin: '0 0 24px' }}>{subtitle}</p>}
      {children}
    </div>
  );
}

function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: 20 }}>{children}</div>;
}

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {Array.from({ length: total }).map((_, i) => {
        const done = i + 1 < current;
        const active = i + 1 === current;
        return (
          <div
            key={i}
            style={{
              width: active ? 32 : 12,
              height: 12,
              borderRadius: 999,
              background: done || active ? BRAND.purple : BRAND.border,
              transition: 'width 0.3s',
            }}
          />
        );
      })}
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: BRAND.soft, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {children}
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────────

const headerStyle: React.CSSProperties = {
  background: '#fff', borderBottom: `1px solid ${BRAND.border}`, padding: '20px 24px',
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
};
const mainStyle: React.CSSProperties = {
  maxWidth: 800, margin: '0 auto', padding: 24,
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 14, fontWeight: 600, color: BRAND.text, marginBottom: 6,
};
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', border: `1px solid ${BRAND.border}`,
  borderRadius: 8, fontSize: 15, boxSizing: 'border-box', fontFamily: 'inherit', background: '#fff', color: BRAND.text,
};
const primaryBtnStyle: React.CSSProperties = {
  width: '100%', padding: 14, background: BRAND.purple, color: '#fff',
  border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
};
const addBtnStyle: React.CSSProperties = {
  width: '100%', padding: 12, background: BRAND.soft, color: BRAND.purple,
  border: `1px dashed ${BRAND.purple}`, borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
};
const removeBtnStyle: React.CSSProperties = {
  padding: '8px 12px', background: '#fff', color: BRAND.red,
  border: `1px solid ${BRAND.red}`, borderRadius: 8, cursor: 'pointer', fontSize: 14,
};
const presetBtnStyle: React.CSSProperties = {
  padding: 16, borderRadius: 12, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
};
const kidCardStyle: React.CSSProperties = {
  background: BRAND.soft, padding: 12, borderRadius: 8, marginBottom: 8,
};
const errorBoxStyle: React.CSSProperties = {
  background: '#FEE2E2', color: BRAND.red, padding: 12, borderRadius: 8, fontSize: 14, marginBottom: 16,
};
const loginFormStyle: React.CSSProperties = {
  background: '#fff', padding: 32, borderRadius: 16,
  boxShadow: '0 4px 20px rgba(132,94,194,0.15)', width: '90%', maxWidth: 480,
};
