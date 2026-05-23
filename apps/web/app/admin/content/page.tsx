'use client';

/**
 * @file app/admin/content/page.tsx
 * @description Admin CMS for 3 track content (gamedev/fashion/stem).
 *              Edit JSON inline → PATCH /api/admin/content/[track] → DB upsert.
 *              Auth via ADMIN_SECRET in URL ?secret=... or saved in localStorage.
 * @reference D-040 Phase 3 MVP
 */

import { useEffect, useState, useCallback } from 'react';

type Track = 'gamedev' | 'fashion' | 'stem' | 'glossary' | 'findtrack';

const TRACKS: { id: Track; emoji: string; label: string }[] = [
  { id: 'gamedev',   emoji: '🎮', label: 'Lập trình Game' },
  { id: 'fashion',   emoji: '👗', label: 'Thiết kế Thời trang' },
  { id: 'stem',      emoji: '🔬', label: 'STEM Lab' },
  { id: 'glossary',  emoji: '📖', label: 'Từ điển AI' },
  { id: 'findtrack', emoji: '🧭', label: 'Bắt đầu từ đâu' },
];

const ADMIN_SECRET_KEY = 'pks-admin-secret';

export default function ContentAdminPage() {
  const [secret, setSecret] = useState('');
  const [activeTrack, setActiveTrack] = useState<Track>('gamedev');
  const [jsonText, setJsonText] = useState('');
  const [version, setVersion] = useState(0);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // Load secret from URL or localStorage on mount
  useEffect(() => {
    const url = new URL(window.location.href);
    const urlSecret = url.searchParams.get('secret');
    if (urlSecret) {
      setSecret(urlSecret);
      localStorage.setItem(ADMIN_SECRET_KEY, urlSecret);
      // Clean URL
      url.searchParams.delete('secret');
      window.history.replaceState({}, '', url.toString());
    } else {
      const saved = localStorage.getItem(ADMIN_SECRET_KEY);
      if (saved) setSecret(saved);
    }
  }, []);

  const loadTrack = useCallback(
    async (track: Track) => {
      if (!secret) return;
      setLoading(true);
      setMessage(null);
      try {
        const res = await fetch(`/api/admin/content/${track}`, {
          headers: { 'x-admin-secret': secret },
          cache: 'no-store',
        });
        const json = await res.json();
        if (!json.ok) {
          setMessage({ type: 'err', text: `Load failed: ${json.error}` });
          setJsonText('');
          return;
        }
        if (json.row) {
          setJsonText(JSON.stringify(json.row.payload, null, 2));
          setVersion(json.row.version);
          setUpdatedAt(json.row.updated_at);
        } else {
          // No row yet — fetch bundled fallback via public API
          const pub = await fetch(`/api/content/${track}`);
          const pubJson = await pub.json();
          setJsonText(JSON.stringify(pubJson.payload, null, 2));
          setVersion(0);
          setUpdatedAt(null);
          setMessage({ type: 'ok', text: 'No DB row yet — showing bundled JSON. Save to create first row.' });
        }
      } catch (err) {
        setMessage({ type: 'err', text: `Network error: ${String(err)}` });
      } finally {
        setLoading(false);
      }
    },
    [secret]
  );

  // Auto-load when secret + track ready
  useEffect(() => {
    if (secret) loadTrack(activeTrack);
  }, [secret, activeTrack, loadTrack]);

  const handleSave = async () => {
    if (!secret) {
      setMessage({ type: 'err', text: 'Admin secret required' });
      return;
    }
    let payload;
    try {
      payload = JSON.parse(jsonText);
    } catch (err) {
      setMessage({ type: 'err', text: `Invalid JSON: ${String(err)}` });
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/content/${activeTrack}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
        body: JSON.stringify({ payload, updated_by: 'admin-ui' }),
      });
      const json = await res.json();
      if (!json.ok) {
        setMessage({ type: 'err', text: `Save failed: ${json.error}` });
        return;
      }
      setVersion(json.row.version);
      setUpdatedAt(json.row.updated_at);
      setMessage({ type: 'ok', text: `✅ Saved · version ${json.row.version} · ${json.row.updated_at}` });
    } catch (err) {
      setMessage({ type: 'err', text: `Network error: ${String(err)}` });
    } finally {
      setSaving(false);
    }
  };

  const handleSetSecret = () => {
    const input = prompt('Nhập ADMIN_SECRET:');
    if (input) {
      setSecret(input);
      localStorage.setItem(ADMIN_SECRET_KEY, input);
    }
  };

  const handleLogout = () => {
    setSecret('');
    localStorage.removeItem(ADMIN_SECRET_KEY);
    setJsonText('');
    setMessage({ type: 'ok', text: 'Logged out' });
  };

  if (!secret) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border-2 border-purple-200">
          <h1 className="text-2xl font-bold text-purple-900 mb-2">🔐 Content Admin</h1>
          <p className="text-sm text-slate-600 mb-4">
            Edit 3 tracks data (Game Dev / Fashion / STEM). Auth via ADMIN_SECRET.
          </p>
          <p className="text-xs text-slate-500 mb-4 font-mono bg-slate-50 p-2 rounded">
            URL: <code>/admin/content?secret=YOUR_ADMIN_SECRET</code>
            <br />
            hoặc click button dưới để paste secret.
          </p>
          <button
            onClick={handleSetSecret}
            className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
          >
            Nhập ADMIN_SECRET
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-4 border border-purple-200 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-purple-900">📊 Content Admin</h1>
            <p className="text-xs text-slate-500">D-040 Phase 3 MVP · Supabase-backed CMS for Kids Studio 3 tabs</p>
          </div>
          <div className="flex gap-2">
            <a
              href="/"
              className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
            >
              ← Dashboard
            </a>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Track tabs */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {TRACKS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTrack(t.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition border-2 ${
                activeTrack === t.id
                  ? 'bg-purple-600 text-white border-purple-700 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300'
              }`}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        {/* Metadata bar */}
        <div className="bg-white rounded-lg p-3 mb-3 border border-purple-100 flex items-center justify-between flex-wrap gap-2 text-sm">
          <div className="flex gap-4 text-slate-700">
            <span><strong>Track:</strong> {activeTrack}</span>
            <span><strong>Version:</strong> {version || '(new)'}</span>
            <span><strong>Last update:</strong> {updatedAt ? new Date(updatedAt).toLocaleString('vi-VN') : '—'}</span>
          </div>
          <button
            onClick={() => loadTrack(activeTrack)}
            disabled={loading}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50"
          >
            🔄 Reload
          </button>
        </div>

        {/* Message bar */}
        {message && (
          <div
            className={`rounded-lg p-3 mb-3 text-sm font-medium ${
              message.type === 'ok'
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* JSON editor */}
        <div className="bg-white rounded-2xl shadow-md border border-purple-200 overflow-hidden">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-600">payload (JSON)</span>
            <span className="text-xs text-slate-500">{jsonText.length} chars</span>
          </div>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            disabled={loading || saving}
            spellCheck={false}
            className="w-full h-[60vh] p-4 font-mono text-xs text-slate-900 bg-white focus:outline-none resize-y"
            placeholder={loading ? 'Loading...' : 'Paste JSON here'}
          />
          <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs text-slate-500 italic">
              💡 Anh edit JSON → bấm Save → Vercel cache refresh trong 60s
            </span>
            <button
              onClick={handleSave}
              disabled={loading || saving || !jsonText}
              className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? '⏳ Saving...' : `💾 Save ${activeTrack}`}
            </button>
          </div>
        </div>

        {/* Schema hint */}
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
          <div className="font-bold text-amber-900 mb-2">📋 Schema cheatsheet</div>
          <div className="text-amber-800 space-y-1 text-xs font-mono">
            <div><strong>gamedev/fashion:</strong> {`{ "tiers": [...], "careers": [...], "ai_agents": [...] }`}</div>
            <div><strong>stem:</strong> {`{ "subjects": [{ "simulations": [...] }], "curriculum_map_vn": [...], "careers": [...] }`}</div>
            <div className="mt-2 italic text-amber-700">Field schema_version + last_updated are auto-managed. Don't remove `tiers[].milestones[].id` or progress tracking breaks.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
