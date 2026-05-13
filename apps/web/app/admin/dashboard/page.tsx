'use client';

/**
 * @file app/admin/dashboard/page.tsx
 * @description Combined admin overview — stats cards + recent leads + active families
 *              + cost monitor (D-022 $50/mo guardrail). Uses lib/family-stats.ts
 *              via /api/admin/families?include_stats=1 endpoint.
 * @reference D-022 (cost cap), D-026 (B2B carve-out tracking)
 */

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

const BRAND = {
  purple: '#845EC2',
  pink: '#FF6B9D',
  mint: '#51CF66',
  amber: '#FFD43B',
  red: '#DC2626',
  sky: '#4DABF7',
  soft: '#F9F4FF',
  text: '#2D1B4E',
  mute: '#666',
  border: '#E5DBFF',
};

type Stats = {
  families: {
    total: number;
    byTier: Record<string, number>;
    byStatus: Record<string, number>;
    total_kids: number;
    avg_kids_per_family: number;
  };
  trial: {
    total_trial: number;
    expiring_within_7d: number;
    expiring_within_14d: number;
    expiring_within_30d: number;
    expired: number;
  };
  leads: {
    total_leads: number;
    by_status: Record<string, number>;
    by_source: Record<string, number>;
    conversion_rate: number;
    last_7d_leads: number;
    last_30d_leads: number;
  };
  chat: {
    total_chats_all_time: number;
    total_chats_this_month: number;
    by_model: Record<string, number>;
    total_tokens_this_month: number;
    top_families_by_chat: Array<{ family_id: string; slug: string; chat_count: number }>;
  };
  cost_usd_estimate: number;
  cost_over_budget: boolean;
  configured: boolean;
};

type Family = {
  id: string;
  slug: string;
  name: string;
  tier: string;
  status: string;
  trial_ends_at: string | null;
  kids_count: number;
  kids_ages: number[];
  trial_days_remaining: number | null;
  created_at: string;
};

export default function AdminDashboard() {
  const [secret, setSecret] = useState('');
  const [authed, setAuthed] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [families, setFamilies] = useState<Family[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('pany-admin-secret') : null;
    if (stored) {
      setSecret(stored);
      setAuthed(true);
    }
  }, []);

  const load = useCallback(async () => {
    if (!secret) return;
    setLoading(true);
    setError(null);
    try {
      const url = new URL('/api/admin/families', window.location.origin);
      url.searchParams.set('secret', secret);
      url.searchParams.set('include_stats', '1');
      url.searchParams.set('limit', '20');
      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.stats) setStats(data.stats);
      if (Array.isArray(data.families)) setFamilies(data.families);
      if (!data.ok && data.error) setError(data.error);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [secret]);

  useEffect(() => {
    if (authed && secret) load();
  }, [authed, secret, load]);

  if (!authed) {
    return (
      <div style={loginContainerStyle}>
        <form
          onSubmit={(e) => { e.preventDefault(); if (secret) { setAuthed(true); localStorage.setItem('pany-admin-secret', secret); } }}
          style={loginFormStyle}
        >
          <h1 style={{ fontSize: 24, fontWeight: 800, color: BRAND.purple, margin: '0 0 8px' }}>🔐 Pany Kids Admin Dashboard</h1>
          <p style={{ color: BRAND.mute, fontSize: 14, margin: '0 0 24px' }}>Nhập ADMIN_SECRET</p>
          <input type="password" required value={secret} onChange={e => setSecret(e.target.value)} style={inputStyle} />
          <button type="submit" style={primaryBtnStyle}>Đăng nhập</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif', color: BRAND.text }}>
      <header style={headerStyle}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: BRAND.purple, margin: 0 }}>📊 Pany Kids Admin Dashboard</h1>
          <p style={{ fontSize: 13, color: BRAND.mute, margin: '4px 0 0' }}>{stats?.configured ? 'Live data' : 'Skeleton mode — Supabase not configured'}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={load} disabled={loading} style={secondaryBtnStyle}>{loading ? '⏳' : '🔄'} Refresh</button>
          <Link href="/admin/signup-requests" style={{ ...secondaryBtnStyle, textDecoration: 'none', display: 'inline-block' }}>📥 Leads</Link>
          <Link href="/" style={{ ...secondaryBtnStyle, textDecoration: 'none', display: 'inline-block' }}>← App</Link>
        </div>
      </header>

      <main style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
        {error && <Banner color={BRAND.red} bg="#FEE2E2">⚠️ {error}</Banner>}
        {stats && !stats.configured && (
          <Banner color={BRAND.amber} bg="#FFFBEB">
            🚧 <strong>Skeleton mode</strong> — Supabase chưa setup. Apply P1 migration + set env vars để có data thật. Xem <code>artifacts/vercel-env-setup-2026-05-13.md</code>.
          </Banner>
        )}
        {stats?.cost_over_budget && (
          <Banner color={BRAND.red} bg="#FEE2E2">
            💸 <strong>Vượt budget!</strong> Anthropic cost tháng này ước tính <strong>${stats.cost_usd_estimate.toFixed(2)}</strong> &gt; $50 cap (D-022). Cần switch Haiku 4.5 fallback.
          </Banner>
        )}

        {/* SECTION 1 — Families overview */}
        <Section title="🏡 Gia đình" subtitle={stats ? `${stats.families.total} total · ${stats.families.total_kids} học viên · avg ${stats.families.avg_kids_per_family.toFixed(1)} con/gia đình` : '...'}>
          <Grid>
            <Card label="Tổng gia đình" value={stats?.families.total ?? 0} color={BRAND.purple} />
            <Card label="Đang free trial" value={stats?.families.byTier['free-trial'] ?? 0} color={BRAND.amber} sub="D-022 default" />
            <Card label="Đã trả phí" value={(stats?.families.byTier.basic ?? 0) + (stats?.families.byTier.pro ?? 0) + (stats?.families.byTier.premium ?? 0)} color={BRAND.mint} sub="Basic + Pro + Premium" />
            <Card label="Enterprise B2B" value={stats?.families.byTier.enterprise ?? 0} color={BRAND.sky} sub="D-026 carve-out" />
          </Grid>
        </Section>

        {/* SECTION 2 — Trial expiring */}
        <Section title="⏰ Trial expiring (D-022 monitoring)" subtitle="Gia đình sắp hết 3 tháng free → cần CTA upgrade hoặc retain">
          <Grid>
            <Card label="Hết hạn rồi" value={stats?.trial.expired ?? 0} color={BRAND.red} sub="Cần follow up" />
            <Card label="Trong 7 ngày" value={stats?.trial.expiring_within_7d ?? 0} color={BRAND.pink} sub="High priority" />
            <Card label="Trong 14 ngày" value={stats?.trial.expiring_within_14d ?? 0} color={BRAND.amber} sub="Medium" />
            <Card label="Trong 30 ngày" value={stats?.trial.expiring_within_30d ?? 0} color={BRAND.sky} sub="Watch list" />
          </Grid>
        </Section>

        {/* SECTION 3 — Lead funnel */}
        <Section title="📥 Lead funnel" subtitle={stats ? `${stats.leads.total_leads} total leads · ${(stats.leads.conversion_rate * 100).toFixed(1)}% conversion · ${stats.leads.last_7d_leads} trong 7 ngày` : '...'}>
          <Grid>
            <Card label="Pending" value={stats?.leads.by_status.pending ?? 0} color={BRAND.amber} />
            <Card label="Cần OTP" value={stats?.leads.by_status.phone_verify_required ?? 0} color={BRAND.purple} sub="D-031" />
            <Card label="Provisioned" value={stats?.leads.by_status.provisioned ?? 0} color={BRAND.mint} />
            <Card label="Email exists" value={stats?.leads.by_status.email_exists ?? 0} color={BRAND.pink} />
          </Grid>
          {stats && Object.keys(stats.leads.by_source).length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.mute, marginBottom: 12 }}>NGUỒN LEAD (D-026 tracking)</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {Object.entries(stats.leads.by_source).map(([src, count]) => (
                  <SourcePill key={src} source={src} count={count} />
                ))}
              </div>
            </div>
          )}
        </Section>

        {/* SECTION 4 — Đại Ka usage + cost */}
        <Section title="🤖 Đại Ka usage + cost (D-022 $50/mo cap)" subtitle={stats ? `${stats.chat.total_chats_this_month} chats this month · ${stats.chat.total_tokens_this_month.toLocaleString()} tokens · est. $${stats.cost_usd_estimate.toFixed(2)}` : '...'}>
          <Grid>
            <Card label="Chat tháng này" value={stats?.chat.total_chats_this_month ?? 0} color={BRAND.purple} />
            <Card label="Sonnet 4.6" value={stats?.chat.by_model['claude-sonnet-4-6'] ?? 0} color={BRAND.amber} sub="$0.003/1K tokens" />
            <Card label="Haiku 4.5" value={stats?.chat.by_model['claude-haiku-4-5-20251001'] ?? 0} color={BRAND.mint} sub="$0.0008/1K tokens" />
            <Card
              label="Est. cost USD"
              value={`$${(stats?.cost_usd_estimate ?? 0).toFixed(2)}`}
              color={stats?.cost_over_budget ? BRAND.red : BRAND.sky}
              sub={`/ $50 cap`}
            />
          </Grid>
          {stats && stats.chat.top_families_by_chat.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.mute, marginBottom: 8 }}>TOP FAMILIES BY CHAT (this month)</div>
              <ol style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.7 }}>
                {stats.chat.top_families_by_chat.map(f => (
                  <li key={f.family_id}><strong>{f.slug}</strong> — {f.chat_count} chats</li>
                ))}
              </ol>
            </div>
          )}
        </Section>

        {/* SECTION 5 — Recent families */}
        <Section title="🏡 Recent families (latest 20)" subtitle="Gia đình mới đăng ký gần nhất">
          {families.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: BRAND.mute, background: BRAND.soft, borderRadius: 12 }}>
              📭 Chưa có gia đình nào. Share <code style={{ background: '#fff', padding: '2px 6px', borderRadius: 4 }}>kids.panyvn.app/dangky</code> để bắt đầu.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: BRAND.soft, borderBottom: `1px solid ${BRAND.border}` }}>
                    <th style={thStyle}>Slug</th>
                    <th style={thStyle}>Tên</th>
                    <th style={thStyle}>Tier</th>
                    <th style={thStyle}>Học viên</th>
                    <th style={thStyle}>Trial</th>
                    <th style={thStyle}>Tạo lúc</th>
                  </tr>
                </thead>
                <tbody>
                  {families.map(f => {
                    const tierColor = f.tier === 'free-trial' ? BRAND.amber : f.tier === 'enterprise' ? BRAND.sky : BRAND.mint;
                    const trialDays = f.trial_days_remaining;
                    return (
                      <tr key={f.id} style={{ borderBottom: `1px solid ${BRAND.border}` }}>
                        <td style={tdStyle}><code style={{ fontSize: 12 }}>{f.slug}</code></td>
                        <td style={tdStyle}>{f.name}</td>
                        <td style={tdStyle}>
                          <span style={{ background: tierColor + '22', color: tierColor, padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
                            {f.tier}
                          </span>
                        </td>
                        <td style={tdStyle}>{f.kids_count} con (tuổi [{f.kids_ages.join(', ')}])</td>
                        <td style={tdStyle}>
                          {trialDays === null ? '—' : trialDays < 0 ? (
                            <span style={{ color: BRAND.red, fontWeight: 600 }}>Hết hạn {Math.abs(trialDays)} ngày</span>
                          ) : trialDays < 7 ? (
                            <span style={{ color: BRAND.pink, fontWeight: 600 }}>Còn {trialDays} ngày</span>
                          ) : (
                            <span>{trialDays} ngày</span>
                          )}
                        </td>
                        <td style={tdStyle}>{new Date(f.created_at).toLocaleString('vi-VN')}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Section>
      </main>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: BRAND.text, margin: 0 }}>{title}</h2>
        {subtitle && <p style={{ fontSize: 13, color: BRAND.mute, margin: '4px 0 0' }}>{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>{children}</div>;
}

function Card({ label, value, color, sub }: { label: string; value: number | string; color: string; sub?: string }) {
  return (
    <div style={{ background: '#fff', border: `2px solid ${color}33`, borderRadius: 12, padding: 16 }}>
      <div style={{ fontSize: 11, color: BRAND.mute, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color, marginTop: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: BRAND.mute, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Banner({ color, bg, children }: { color: string; bg: string; children: React.ReactNode }) {
  return (
    <div style={{ background: bg, color, padding: 12, borderRadius: 8, marginBottom: 16, fontSize: 14 }}>{children}</div>
  );
}

function SourcePill({ source, count }: { source: string; count: number }) {
  const emoji = source === 'fb' ? '📘' : source === 'zalo' ? '💬' : source === 'friend-ref' ? '🤝' : source === 'parent-group' ? '👨‍👩‍👧' : source === 'dangky-direct' ? '🔗' : '❓';
  return (
    <div style={{ background: BRAND.soft, border: `1px solid ${BRAND.border}`, padding: '6px 12px', borderRadius: 999, fontSize: 13, fontWeight: 600 }}>
      {emoji} {source} · <strong>{count}</strong>
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────────

const loginContainerStyle: React.CSSProperties = {
  minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: BRAND.soft, fontFamily: 'system-ui, -apple-system, sans-serif',
};
const loginFormStyle: React.CSSProperties = {
  background: '#fff', padding: 32, borderRadius: 16,
  boxShadow: '0 4px 20px rgba(132,94,194,0.15)', width: '90%', maxWidth: 400,
};
const inputStyle: React.CSSProperties = {
  width: '100%', padding: 12, border: `1px solid ${BRAND.border}`,
  borderRadius: 8, fontSize: 15, marginBottom: 16, boxSizing: 'border-box', fontFamily: 'inherit',
};
const primaryBtnStyle: React.CSSProperties = {
  width: '100%', padding: 12, background: BRAND.purple, color: '#fff',
  border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
};
const secondaryBtnStyle: React.CSSProperties = {
  padding: '8px 14px', background: BRAND.soft, color: BRAND.purple,
  border: `1px solid ${BRAND.border}`, borderRadius: 8, fontSize: 13, fontWeight: 600,
  cursor: 'pointer', fontFamily: 'inherit',
};
const headerStyle: React.CSSProperties = {
  borderBottom: `1px solid ${BRAND.border}`, padding: '16px 24px',
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
};
const thStyle: React.CSSProperties = {
  textAlign: 'left', padding: '12px 10px', fontSize: 12, fontWeight: 700,
  textTransform: 'uppercase', letterSpacing: 1, color: BRAND.mute,
};
const tdStyle: React.CSSProperties = { padding: '12px 10px', verticalAlign: 'top' };
