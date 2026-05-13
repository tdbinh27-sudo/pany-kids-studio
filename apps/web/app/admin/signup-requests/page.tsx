'use client';

/**
 * @file app/admin/signup-requests/page.tsx
 * @description Admin UI — view + approve + decline family signup leads.
 *              Auth via ADMIN_SECRET in URL ?secret=... (P3 skeleton —
 *              upgrade to Supabase RLS-gated parent_admin in P4).
 * @reference D-020 (port from Gia Phả), D-031 (phone-verify path)
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';

const BRAND = {
  purple: '#845EC2',
  pink: '#FF6B9D',
  mint: '#51CF66',
  amber: '#FFD43B',
  red: '#DC2626',
  soft: '#F9F4FF',
  text: '#2D1B4E',
  mute: '#666',
  border: '#E5DBFF',
};

type SignupStatus = 'pending' | 'phone_verify_required' | 'provisioned' | 'email_exists' | 'rejected';

type SignupRequest = {
  id: string;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  family_name: string | null;
  kids_count: number;
  kids_ages: number[];
  source: string | null;
  status: SignupStatus;
  phone_verified?: boolean;
  provisioned_family_id?: string | null;
  error_message?: string | null;
  notes?: string | null;
  created_at: string;
  processed_at?: string | null;
};

type Stats = {
  total: number;
  pending: number;
  phone_verify_required: number;
  provisioned: number;
  email_exists: number;
  rejected: number;
};

const STATUS_LABELS: Record<SignupStatus, { label: string; color: string; emoji: string }> = {
  pending:                { label: 'Đang chờ',         color: BRAND.amber,  emoji: '⏳' },
  phone_verify_required:  { label: 'Cần OTP',          color: BRAND.purple, emoji: '📱' },
  provisioned:            { label: 'Đã tạo gia đình',   color: BRAND.mint,   emoji: '✅' },
  email_exists:           { label: 'Email tồn tại',     color: BRAND.pink,   emoji: '⚠️' },
  rejected:               { label: 'Từ chối',          color: BRAND.red,    emoji: '❌' },
};

export default function AdminSignupRequestsPage() {
  const [secret, setSecret] = useState('');
  const [authed, setAuthed] = useState(false);
  const [requests, setRequests] = useState<SignupRequest[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [filter, setFilter] = useState<'all' | SignupStatus>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionInFlight, setActionInFlight] = useState<string | null>(null);

  // Read secret from URL or localStorage on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSecret = params.get('secret');
    const storedSecret = typeof localStorage !== 'undefined' ? localStorage.getItem('pany-admin-secret') : null;
    const initial = urlSecret ?? storedSecret ?? '';
    if (initial) {
      setSecret(initial);
      setAuthed(true);
      if (typeof localStorage !== 'undefined') localStorage.setItem('pany-admin-secret', initial);
    }
  }, []);

  async function loadRequests() {
    if (!secret) return;
    setLoading(true);
    setError(null);
    try {
      const url = new URL('/api/admin/signup-requests', window.location.origin);
      url.searchParams.set('secret', secret);
      if (filter !== 'all') url.searchParams.set('status', filter);
      const res = await fetch(url.toString());
      const data = await res.json();
      if (!data.ok && !data.requests) {
        setError(data.error ?? 'Lỗi tải danh sách');
        setRequests([]);
      } else {
        setRequests(data.requests ?? []);
        setStats(data.stats ?? null);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authed && secret) {
      loadRequests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, secret, filter]);

  async function handleAction(id: string, action: 'approve' | 'decline', reason?: string) {
    setActionInFlight(id);
    try {
      const res = await fetch(`/api/admin/signup-requests?secret=${encodeURIComponent(secret)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action, reason }),
      });
      const data = await res.json();
      if (!data.ok) {
        alert(`Lỗi: ${data.error ?? 'unknown'}`);
      }
      await loadRequests();
    } catch (e) {
      alert(`Lỗi mạng: ${e instanceof Error ? e.message : e}`);
    } finally {
      setActionInFlight(null);
    }
  }

  // Login screen
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: BRAND.soft, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (secret) {
              setAuthed(true);
              localStorage.setItem('pany-admin-secret', secret);
            }
          }}
          style={{ background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 20px rgba(132,94,194,0.15)', width: '90%', maxWidth: 400 }}
        >
          <h1 style={{ fontSize: 24, fontWeight: 800, color: BRAND.purple, margin: '0 0 8px' }}>🔐 Pany Kids Admin</h1>
          <p style={{ color: BRAND.mute, fontSize: 14, margin: '0 0 24px' }}>Nhập ADMIN_SECRET để xem leads.</p>
          <input
            type="password"
            required
            placeholder="ADMIN_SECRET"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            style={{ width: '100%', padding: 12, border: `1px solid ${BRAND.border}`, borderRadius: 8, fontSize: 15, marginBottom: 16, boxSizing: 'border-box' }}
          />
          <button type="submit" style={{ width: '100%', padding: 12, background: BRAND.purple, color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            Đăng nhập
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif', color: BRAND.text }}>
      <header style={{ borderBottom: `1px solid ${BRAND.border}`, padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: BRAND.purple, margin: 0 }}>📊 Pany Kids — Signup Leads</h1>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={loadRequests} disabled={loading} style={{ ...btnStyle, background: BRAND.soft, color: BRAND.purple }}>{loading ? '...' : '🔄 Reload'}</button>
          <Link href="/" style={{ ...btnStyle, background: '#fff', color: BRAND.mute, border: `1px solid ${BRAND.border}`, textDecoration: 'none', display: 'inline-block', lineHeight: '24px' }}>← Dashboard</Link>
        </div>
      </header>

      <main style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
        {/* Stats */}
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
            <StatCard label="Tổng" value={stats.total} color={BRAND.text} />
            <StatCard label="⏳ Chờ" value={stats.pending} color={BRAND.amber} onClick={() => setFilter('pending')} />
            <StatCard label="📱 Cần OTP" value={stats.phone_verify_required} color={BRAND.purple} onClick={() => setFilter('phone_verify_required')} />
            <StatCard label="✅ Provisioned" value={stats.provisioned} color={BRAND.mint} onClick={() => setFilter('provisioned')} />
            <StatCard label="⚠️ Email tồn tại" value={stats.email_exists} color={BRAND.pink} onClick={() => setFilter('email_exists')} />
            <StatCard label="❌ Rejected" value={stats.rejected} color={BRAND.red} onClick={() => setFilter('rejected')} />
          </div>
        )}

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {(['all', 'pending', 'phone_verify_required', 'provisioned', 'email_exists', 'rejected'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...btnStyle,
                background: filter === f ? BRAND.purple : '#fff',
                color: filter === f ? '#fff' : BRAND.mute,
                border: `1px solid ${filter === f ? BRAND.purple : BRAND.border}`,
                fontSize: 13,
                padding: '6px 12px',
              }}
            >
              {f === 'all' ? 'Tất cả' : `${STATUS_LABELS[f].emoji} ${STATUS_LABELS[f].label}`}
            </button>
          ))}
        </div>

        {error && (
          <div style={{ background: '#FEE2E2', color: BRAND.red, padding: 12, borderRadius: 8, marginBottom: 16 }}>
            ⚠️ {error}
          </div>
        )}

        {/* Table */}
        {requests.length === 0 && !loading && !error && (
          <div style={{ textAlign: 'center', padding: 60, color: BRAND.mute }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
            <p>Chưa có lead nào{filter !== 'all' ? ` với status "${filter}"` : ''}.</p>
            <p style={{ fontSize: 13 }}>Chia sẻ <code style={{ background: BRAND.soft, padding: '2px 6px', borderRadius: 4 }}>kids.panyvn.app/dangky</code> để có lead đầu tiên.</p>
          </div>
        )}

        {requests.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: BRAND.soft, borderBottom: `1px solid ${BRAND.border}` }}>
                  <th style={thStyle}>Trạng thái</th>
                  <th style={thStyle}>Phụ huynh</th>
                  <th style={thStyle}>Email / SĐT</th>
                  <th style={thStyle}>Học viên</th>
                  <th style={thStyle}>Nguồn</th>
                  <th style={thStyle}>Khi nào</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(r => {
                  const sl = STATUS_LABELS[r.status];
                  return (
                    <tr key={r.id} style={{ borderBottom: `1px solid ${BRAND.border}` }}>
                      <td style={tdStyle}>
                        <span style={{ background: sl.color + '22', color: sl.color, padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>
                          {sl.emoji} {sl.label}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 600 }}>{r.parent_name}</div>
                        {r.family_name && <div style={{ fontSize: 12, color: BRAND.mute }}>{r.family_name}</div>}
                      </td>
                      <td style={tdStyle}>
                        <div style={{ fontSize: 13 }}>{r.parent_email}</div>
                        <div style={{ fontSize: 12, color: BRAND.mute }}>{r.parent_phone}</div>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 600 }}>{r.kids_count} con</div>
                        <div style={{ fontSize: 12, color: BRAND.mute }}>tuổi [{r.kids_ages.join(', ')}]</div>
                      </td>
                      <td style={tdStyle}>{r.source ?? '—'}</td>
                      <td style={tdStyle}>
                        <div style={{ fontSize: 12 }}>{new Date(r.created_at).toLocaleString('vi-VN')}</div>
                        {r.processed_at && (
                          <div style={{ fontSize: 11, color: BRAND.mute }}>Xử lý: {new Date(r.processed_at).toLocaleString('vi-VN')}</div>
                        )}
                      </td>
                      <td style={tdStyle}>
                        {(r.status === 'pending' || r.status === 'phone_verify_required' || r.status === 'email_exists') && (
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button
                              onClick={() => handleAction(r.id, 'approve')}
                              disabled={actionInFlight === r.id}
                              style={{ ...btnStyle, background: BRAND.mint, color: '#fff', fontSize: 12, padding: '6px 10px' }}
                            >
                              ✅ Approve
                            </button>
                            <button
                              onClick={() => {
                                const reason = prompt('Lý do từ chối:');
                                if (reason) handleAction(r.id, 'decline', reason);
                              }}
                              disabled={actionInFlight === r.id}
                              style={{ ...btnStyle, background: '#fff', color: BRAND.red, border: `1px solid ${BRAND.red}`, fontSize: 12, padding: '6px 10px' }}
                            >
                              Decline
                            </button>
                          </div>
                        )}
                        {r.status === 'provisioned' && r.provisioned_family_id && (
                          <span style={{ fontSize: 11, color: BRAND.mute }}>Family: <code>{r.provisioned_family_id.substring(0, 8)}...</code></span>
                        )}
                        {r.error_message && (
                          <div style={{ fontSize: 11, color: BRAND.red, marginTop: 4 }}>{r.error_message}</div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value, color, onClick }: { label: string; value: number; color: string; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff',
        border: `2px solid ${color}33`,
        borderRadius: 12,
        padding: 16,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.15s',
      }}
    >
      <div style={{ fontSize: 11, color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color, marginTop: 4 }}>{value}</div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: 8,
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 14,
  fontWeight: 600,
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '12px 10px',
  fontSize: 12,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: 1,
  color: '#666',
};

const tdStyle: React.CSSProperties = {
  padding: '12px 10px',
  verticalAlign: 'top',
};
