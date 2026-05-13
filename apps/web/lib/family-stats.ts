/**
 * @file lib/family-stats.ts
 * @description Server-side analytics helpers for admin dashboard.
 *              Queries Supabase tables (families, family_kids, family_settings,
 *              family_signup_requests, family_chat_history).
 *
 *              All functions are SAFE when Supabase env missing — return zeroed
 *              stats so admin UI can render in skeleton mode.
 *
 * @reference D-022 (free trial, monitor expiring), D-026 (B2B carve-out tracking)
 * @status SKELETON — wire to real DB after P1 migration applied.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

function getSupabase(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return null;
  return createClient(supabaseUrl, serviceRoleKey);
}

// ─── Types ─────────────────────────────────────────────────────────

export type FamilyTier = 'free-trial' | 'basic' | 'pro' | 'premium' | 'enterprise';
export type FamilyStatus = 'active' | 'suspended' | 'archived';

export type AllFamiliesStats = {
  total: number;
  byTier: Record<FamilyTier, number>;
  byStatus: Record<FamilyStatus, number>;
  total_kids: number;
  avg_kids_per_family: number;
};

export type TrialExpiryStats = {
  total_trial: number;
  expiring_within_7d: number;
  expiring_within_14d: number;
  expiring_within_30d: number;
  expired: number;
};

export type LeadFunnelStats = {
  total_leads: number;
  by_status: {
    pending: number;
    phone_verify_required: number;
    provisioned: number;
    email_exists: number;
    rejected: number;
  };
  by_source: Record<string, number>;
  conversion_rate: number; // provisioned / total_leads (0-1)
  last_7d_leads: number;
  last_30d_leads: number;
};

export type ChatUsageStats = {
  total_chats_all_time: number;
  total_chats_this_month: number;
  by_model: Record<string, number>;          // haiku-4-5 / sonnet-4-6 / opus-4-7
  total_tokens_this_month: number;
  top_families_by_chat: Array<{ family_id: string; slug: string; chat_count: number }>;
};

// ─── Zero-state defaults ──────────────────────────────────────────

const EMPTY_FAMILIES: AllFamiliesStats = {
  total: 0,
  byTier: { 'free-trial': 0, basic: 0, pro: 0, premium: 0, enterprise: 0 },
  byStatus: { active: 0, suspended: 0, archived: 0 },
  total_kids: 0,
  avg_kids_per_family: 0,
};

const EMPTY_TRIAL: TrialExpiryStats = {
  total_trial: 0,
  expiring_within_7d: 0,
  expiring_within_14d: 0,
  expiring_within_30d: 0,
  expired: 0,
};

const EMPTY_LEADS: LeadFunnelStats = {
  total_leads: 0,
  by_status: { pending: 0, phone_verify_required: 0, provisioned: 0, email_exists: 0, rejected: 0 },
  by_source: {},
  conversion_rate: 0,
  last_7d_leads: 0,
  last_30d_leads: 0,
};

const EMPTY_CHAT: ChatUsageStats = {
  total_chats_all_time: 0,
  total_chats_this_month: 0,
  by_model: {},
  total_tokens_this_month: 0,
  top_families_by_chat: [],
};

// ─── Helper: families + kids breakdown ─────────────────────────────

export async function getFamiliesStats(): Promise<AllFamiliesStats> {
  const sb = getSupabase();
  if (!sb) return EMPTY_FAMILIES;

  const { data: families } = await sb.from('families').select('id, tier, status');
  if (!families) return EMPTY_FAMILIES;

  const byTier: Record<FamilyTier, number> = { 'free-trial': 0, basic: 0, pro: 0, premium: 0, enterprise: 0 };
  const byStatus: Record<FamilyStatus, number> = { active: 0, suspended: 0, archived: 0 };

  for (const f of families) {
    const tier = (f.tier as FamilyTier) ?? 'free-trial';
    const status = (f.status as FamilyStatus) ?? 'active';
    if (tier in byTier) byTier[tier]++;
    if (status in byStatus) byStatus[status]++;
  }

  const { count: totalKids } = await sb.from('family_kids').select('*', { count: 'exact', head: true }).eq('active', true);

  const total = families.length;
  return {
    total,
    byTier,
    byStatus,
    total_kids: totalKids ?? 0,
    avg_kids_per_family: total > 0 ? (totalKids ?? 0) / total : 0,
  };
}

// ─── Helper: trial expiry windows ──────────────────────────────────

export async function getTrialExpiryStats(): Promise<TrialExpiryStats> {
  const sb = getSupabase();
  if (!sb) return EMPTY_TRIAL;

  const now = new Date();
  const in7d = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const in14d = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString();
  const in30d = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
  const nowIso = now.toISOString();

  const { data: trials } = await sb
    .from('families')
    .select('trial_ends_at')
    .eq('tier', 'free-trial')
    .not('trial_ends_at', 'is', null);

  if (!trials) return EMPTY_TRIAL;

  let expiring7 = 0, expiring14 = 0, expiring30 = 0, expired = 0;
  for (const t of trials) {
    const endsAt = t.trial_ends_at;
    if (!endsAt) continue;
    if (endsAt < nowIso) expired++;
    else if (endsAt < in7d) expiring7++;
    else if (endsAt < in14d) expiring14++;
    else if (endsAt < in30d) expiring30++;
  }

  return {
    total_trial: trials.length,
    expiring_within_7d: expiring7,
    expiring_within_14d: expiring14,
    expiring_within_30d: expiring30,
    expired,
  };
}

// ─── Helper: lead funnel ───────────────────────────────────────────

export async function getLeadFunnelStats(): Promise<LeadFunnelStats> {
  const sb = getSupabase();
  if (!sb) return EMPTY_LEADS;

  const { data: leads } = await sb
    .from('family_signup_requests')
    .select('status, source, created_at');

  if (!leads || leads.length === 0) return EMPTY_LEADS;

  const byStatus = { pending: 0, phone_verify_required: 0, provisioned: 0, email_exists: 0, rejected: 0 };
  const bySource: Record<string, number> = {};

  const now = Date.now();
  const ms7d = 7 * 24 * 60 * 60 * 1000;
  const ms30d = 30 * 24 * 60 * 60 * 1000;
  let last7 = 0, last30 = 0;

  for (const lead of leads) {
    const status = lead.status as keyof typeof byStatus;
    if (status in byStatus) byStatus[status]++;

    const source = (lead.source as string) ?? 'unknown';
    bySource[source] = (bySource[source] ?? 0) + 1;

    const createdAt = lead.created_at ? new Date(lead.created_at).getTime() : 0;
    if (createdAt > now - ms7d) last7++;
    if (createdAt > now - ms30d) last30++;
  }

  return {
    total_leads: leads.length,
    by_status: byStatus,
    by_source: bySource,
    conversion_rate: leads.length > 0 ? byStatus.provisioned / leads.length : 0,
    last_7d_leads: last7,
    last_30d_leads: last30,
  };
}

// ─── Helper: chat usage (cost monitoring) ──────────────────────────

export async function getChatUsageStats(): Promise<ChatUsageStats> {
  const sb = getSupabase();
  if (!sb) return EMPTY_CHAT;

  // All-time count
  const { count: totalAll } = await sb
    .from('family_chat_history')
    .select('*', { count: 'exact', head: true });

  // This month count
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  const startIso = startOfMonth.toISOString();

  const { data: thisMonth } = await sb
    .from('family_chat_history')
    .select('model, token_count, family_id')
    .gte('created_at', startIso);

  const byModel: Record<string, number> = {};
  let totalTokens = 0;
  const chatByFamily: Record<string, number> = {};

  if (thisMonth) {
    for (const row of thisMonth) {
      const model = (row.model as string) ?? 'unknown';
      byModel[model] = (byModel[model] ?? 0) + 1;
      totalTokens += (row.token_count as number) ?? 0;
      const fid = row.family_id as string;
      if (fid) chatByFamily[fid] = (chatByFamily[fid] ?? 0) + 1;
    }
  }

  // Top 5 families by chat count this month
  const topFamilyIds = Object.entries(chatByFamily)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([id]) => id);

  let topFamilies: Array<{ family_id: string; slug: string; chat_count: number }> = [];
  if (topFamilyIds.length > 0) {
    const { data: famSlugs } = await sb
      .from('families')
      .select('id, slug')
      .in('id', topFamilyIds);
    topFamilies = topFamilyIds.map(id => ({
      family_id: id,
      slug: famSlugs?.find(f => f.id === id)?.slug ?? '?',
      chat_count: chatByFamily[id],
    }));
  }

  return {
    total_chats_all_time: totalAll ?? 0,
    total_chats_this_month: thisMonth?.length ?? 0,
    by_model: byModel,
    total_tokens_this_month: totalTokens,
    top_families_by_chat: topFamilies,
  };
}

// ─── Cost guard helper (D-022 $50/mo cap warning) ──────────────────

const SONNET_COST_PER_1K_TOKENS = 0.003; // approximate
const HAIKU_COST_PER_1K_TOKENS = 0.0008;

export function estimateMonthlyAnthropicCostUSD(chatStats: ChatUsageStats): number {
  const sonnetTokens = (chatStats.by_model['claude-sonnet-4-6'] ?? 0) * 600; // ~600 tokens/turn avg
  const haikuTokens = (chatStats.by_model['claude-haiku-4-5-20251001'] ?? 0) * 400;
  return (sonnetTokens / 1000) * SONNET_COST_PER_1K_TOKENS + (haikuTokens / 1000) * HAIKU_COST_PER_1K_TOKENS;
}

export function isOverCostBudget(chatStats: ChatUsageStats, budgetUSD = 50): boolean {
  return estimateMonthlyAnthropicCostUSD(chatStats) > budgetUSD;
}

// ─── Combined dashboard payload ────────────────────────────────────

export type DashboardStats = {
  families: AllFamiliesStats;
  trial: TrialExpiryStats;
  leads: LeadFunnelStats;
  chat: ChatUsageStats;
  cost_usd_estimate: number;
  cost_over_budget: boolean;
  configured: boolean; // false in skeleton mode
};

export async function getDashboardStats(budgetUSD = 50): Promise<DashboardStats> {
  const sb = getSupabase();
  const configured = sb !== null;

  if (!configured) {
    return {
      families: EMPTY_FAMILIES,
      trial: EMPTY_TRIAL,
      leads: EMPTY_LEADS,
      chat: EMPTY_CHAT,
      cost_usd_estimate: 0,
      cost_over_budget: false,
      configured: false,
    };
  }

  const [families, trial, leads, chat] = await Promise.all([
    getFamiliesStats(),
    getTrialExpiryStats(),
    getLeadFunnelStats(),
    getChatUsageStats(),
  ]);

  const cost = estimateMonthlyAnthropicCostUSD(chat);

  return {
    families,
    trial,
    leads,
    chat,
    cost_usd_estimate: cost,
    cost_over_budget: cost > budgetUSD,
    configured: true,
  };
}
