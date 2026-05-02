// API helper for Đại Ka chat + future endpoints
// Hits the same /api/chat that web uses, hosted on Vercel + VPS.
// Payload shape matches apps/web/app/api/chat/route.ts: { ctx, history, message }

import Constants from 'expo-constants';

const API_BASE = (Constants.expoConfig?.extra?.apiBaseUrl as string) || 'https://pany-kids-studio.vercel.app';

export interface ChatContext {
  kidId: string | null;
  kidName: string | null;
  kidAge: number | null;
  lang: 'vi' | 'en';
  currentTab?: string;
  overallPct?: number;
  streakDays?: number;
}

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendChat(
  userMessage: string,
  history: ChatTurn[],
  ctx: ChatContext
): Promise<{ text: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ctx, history, message: userMessage }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
      return { text: errData.reply || '', error: errData.error || `HTTP ${res.status}` };
    }

    const data = await res.json();
    return { text: data.reply || data.text || data.content || '' };
  } catch (e: any) {
    return { text: '', error: e?.message || 'Network error' };
  }
}
