// API helper for Đại Ka chat + future endpoints
// Hits the same /api/chat that web uses, hosted on Vercel + VPS

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

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendChat(messages: ChatMessage[], ctx: ChatContext): Promise<{ text: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, ctx }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return { text: '', error: `HTTP ${res.status}: ${errText}` };
    }

    const data = await res.json();
    return { text: data.text || data.content || '' };
  } catch (e: any) {
    return { text: '', error: e?.message || 'Network error' };
  }
}
