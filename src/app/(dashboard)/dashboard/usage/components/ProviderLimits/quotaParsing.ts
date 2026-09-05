import { getModelsByProviderId } from "@omniroute/open-sse/config/providerModels.ts";
import { safePercentage } from "@/shared/utils/formatting";

const GLM_QUOTA_ORDER: Record<string, number> = { session: 0, weekly: 1, mcp_monthly: 2 };
const CODEX_QUOTA_ORDER: Record<string, number> = {
  session: 0,
  weekly: 1,
  gpt_5_3_codex_spark_session: 2,
  gpt_5_3_codex_spark_weekly: 3,
  banked_reset_credits: 4,
};
const GLM_FAMILY_PROVIDERS = ["glm", "glm-cn", "glmt", "opencode-go"];
const KIMI_CODING_PROVIDERS = ["kimi-coding", "kimi-coding-apikey"];

/**
 * Providers whose quotas already get a deterministic fixed-window order below
 * (Codex, GLM family, and Kimi Coding). Display layers (e.g. QuotaCardExpanded)
 * must not re-sort these by remaining percentage, or they undo this order (#6687).
 */
export function hasFixedQuotaOrder(providerId: string | undefined): boolean {
  const id = String(providerId || "").toLowerCase();
  return id === "codex" || GLM_FAMILY_PROVIDERS.includes(id) || KIMI_CODING_PROVIDERS.includes(id);
}

/**
 * Canonical chronological rank of a rolling usage window, derived from the
 * quota key itself rather than from a provider list.
 *
 * Providers name the same two windows in mutually incompatible ways —
 * `"session (5h)"` (claude, minimax, kimi), `"5 Hours Quota"` (GLM/zai),
 * `"five_hour"` (command-code, qwen-token-plan), `"code_5h"` (kimi-coding),
 * plain `"session"` (codex) — so matching on the shape of the key is the only
 * thing that generalizes. Returns `null` for anything that is not a recognizable
 * time window (per-model buckets, credit balances, token counters), which is
 * what keeps this from claiming quotas it has no opinion about.
 */
export function quotaWindowRank(name: unknown): number | null {
  const key = String(name ?? "")
    .trim()
    .toLowerCase();
  if (!key) return null;
  // Order matters: "mcp_monthly" must not be caught by the weekly probe, and
  // "5 Hours Quota" must not be caught by anything before the session probe.
  if (/month/.test(key)) return 2;
  if (/week|7\s*d\b|_7d\b|seven[_\s-]?day/.test(key)) return 1;
  if (/session|hour|\b5\s*h\b|_5h\b/.test(key)) return 0;
  return null;
}

/**
 * #7764: whether a quota list is a set of rolling time windows whose relative
 * order is inherent (session before weekly before monthly) and must therefore
 * survive rendering.
 *
 * This is the structural counterpart to the provider whitelist above. The
 * whitelist exists because a few providers need an order the window rank cannot
 * express (Codex interleaves GPT-5.3-Codex-Spark windows and a banked-credit
 * row between the canonical ones), but it went stale the moment any other
 * provider started reporting session+weekly — claude, minimax, zai and
 * command-code all do. Deriving the answer from the data means the next such
 * provider is covered on arrival.
 *
 * Requires at least two DISTINCT ranks: with a single window there is no pair
 * to keep stable, so the pre-existing worst-status-first sort is left alone.
 */
export function hasCanonicalWindowOrder(quotas: unknown): boolean {
  if (!Array.isArray(quotas)) return false;
  const ranks = new Set<number>();
  for (const quota of quotas) {
    if (!quota || (quota as any).isCredits) continue;
    const rank = quotaWindowRank((quota as any).name);
    if (rank !== null) ranks.add(rank);
  }
  return ranks.size >= 2;
}

/**
 * Stable sort of a quota list into canonical window order. Unrecognized entries
 * (credits, token counters, per-model buckets) sink below the windows while
 * keeping their relative order, so nothing is lost or shuffled.
 */
export function sortQuotasByWindow<T>(quotas: T[]): T[] {
  return [...quotas]
    .map((quota, index) => ({ quota, index }))
    .sort((a, b) => {
      const ra = quotaWindowRank((a.quota as any)?.name) ?? 99;
      const rb = quotaWindowRank((b.quota as any)?.name) ?? 99;
      return ra - rb || a.index - b.index;
    })
    .map((entry) => entry.quota);
}

function quotaEntries(data: any): Array<[string, any]> {
  return data?.quotas && typeof data.quotas === "object" ? Object.entries(data.quotas) : [];
}

function isUnlimitedEmpty(quota: any): boolean {
  return Boolean(quota?.unlimited && (!quota?.total || quota.total <= 0));
}

function isPastResetWindow(resetAt: any): boolean {
  if (!resetAt) return false;
  const resetTime =
    typeof resetAt === "number" ? resetAt : typeof resetAt === "string" ? Date.parse(resetAt) : NaN;
  return Number.isFinite(resetTime) && Date.now() >= resetTime;
}

function getResetAdjustedQuota(quota: any) {
  const usedRaw = Number(quota?.used || 0);
  const totalRaw = Number(quota?.total || 0);
  const total = Number.isFinite(totalRaw) ? totalRaw : 0;
  const remainingRaw = safePercentage(quota?.remainingPercentage);
  const hasPendingUsage = usedRaw > 0 || (remainingRaw !== undefined && remainingRaw < 100);
  const staleAfterReset = isPastResetWindow(quota?.resetAt || null) && hasPendingUsage;

  return {
    staleAfterReset,
    total,
    used: staleAfterReset ? 0 : usedRaw,
    remainingPercentage: staleAfterReset && total > 0 ? 100 : remainingRaw,
  };
}

function normalizeQuotaEntry(name: string, quota: any = {}, extras: any = {}) {
  const adjusted = getResetAdjustedQuota(quota);
  const remaining = Number(quota?.remaining);
  return {
    name,
    used: Number.isFinite(adjusted.used) ? adjusted.used : 0,
    total: adjusted.total,
    ...(Number.isFinite(remaining) ? { remaining } : {}),
    resetAt: quota?.resetAt || null,
    staleAfterReset: adjusted.staleAfterReset,
    ...(adjusted.remainingPercentage !== undefined
      ? { remainingPercentage: adjusted.remainingPercentage }
      : {}),
    ...(quota?.extraCreditsInferred !== undefined
      ? { extraCreditsInferred: Number(quota.extraCreditsInferred) || 0 }
      : {}),
    ...(quota?.overPlan !== undefined ? { overPlan: quota.overPlan === true } : {}),
    ...(quota?.displayName !== undefined ? { displayName: String(quota.displayName) } : {}),
    ...(quota?.isPercentageOnly !== undefined
      ? { isPercentageOnly: quota.isPercentageOnly === true }
      : {}),
    ...extras,
  };
}

function parseGeneric(data: any) {
  return quotaEntries(data).map(([name, quota]) => normalizeQuotaEntry(name, quota));
}

function parseGithub(data: any) {
  return quotaEntries(data)
    .filter(([, quota]) => !isUnlimitedEmpty(quota))
    .map(([name, quota]) => normalizeQuotaEntry(name, quota));
}

function parseGlmFamily(data: any) {
  return quotaEntries(data).map(([name, quota]) =>
    normalizeQuotaEntry(name, quota, {
      displayName: quota?.displayName,
      details: Array.isArray(quota?.details) ? quota.details : undefined,
      isPercentageOnly:
        Number(quota?.total || 0) === 100 && quota?.remainingPercentage !== undefined,
    })
  );
}

function buildCreditsQuota(
  name: string,
  remaining: number,
  remainingPercentage: number,
  extra = {}
) {
  return {
    name,
    used: 0,
    total: 0,
    remaining,
    resetAt: null,
    unlimited: false,
    isCredits: true,
    remainingPercentage,
    creditCount: remaining,
    ...extra,
  };
}

function parseAntigravityQuota(modelKey: string, quota: any) {
  if (modelKey === "credits") {
    const remaining = Number(quota?.remaining ?? 0);
    return buildCreditsQuota("credits", remaining, remaining > 50 ? 100 : remaining > 10 ? 60 : 20);
  }
  if (modelKey === "models" || isUnlimitedEmpty(quota)) return null;
  return normalizeQuotaEntry(modelKey, quota, {
    modelKey,
    isPercentageOnly: quota?.fractionReported === true,
    ...(quota?.quotaSource ? { quotaSource: quota.quotaSource } : {}),
    ...(quota?.fractionReported !== undefined ? { fractionReported: quota.fractionReported } : {}),
  });
}

function parseAntigravity(data: any) {
  return quotaEntries(data)
    .map(([modelKey, quota]) => parseAntigravityQuota(modelKey, quota))
    .filter(Boolean);
}

function buildBankedResetCreditsQuota(count: number) {
  return {
    name: "banked_reset_credits",
    used: 0,
    total: 0,
    remaining: count,
    resetAt: null,
    unlimited: false,
    isResetCredits: true,
    remainingPercentage: 100,
    creditCount: count,
  };
}

function parseCodex(data: any) {
  const quotas = quotaEntries(data).map(([quotaType, quota]) =>
    normalizeQuotaEntry(quotaType, quota, {
      displayName: quota?.displayName,
      isPercentageOnly: true,
    })
  );

  const bankedResetCredits = Number(data?.bankedResetCredits);
  if (Number.isFinite(bankedResetCredits) && bankedResetCredits > 0) {
    quotas.push(buildBankedResetCreditsQuota(bankedResetCredits));
  }

  return quotas;
}

function buildClaudeExtraUsageQuota(extraUsage: any) {
  const monthlyLimit = Number(extraUsage?.monthly_limit ?? 0);
  const usedCredits = Number(extraUsage?.used_credits ?? 0);
  const utilization = Number(extraUsage?.utilization ?? 0);
  const remainingPercentage = Number.isFinite(utilization)
    ? Math.max(0, 100 - utilization)
    : undefined;
  const remaining = Number.isFinite(monthlyLimit) ? Math.max(0, monthlyLimit - usedCredits) : 0;

  return buildCreditsQuota("extra_usage", remaining, remainingPercentage ?? 100, {
    used: Number.isFinite(usedCredits) ? usedCredits : 0,
    total: Number.isFinite(monthlyLimit) ? monthlyLimit : 0,
    currency: extraUsage?.currency,
  });
}

// #6806: some Claude plans (e.g. "default_raven_enterprise") return no
// five_hour/seven_day utilization windows at all — only a credit-billing
// extraUsage block — so quotas can be {} while extraUsage still holds real,
// actionable usage data. Fold it in instead of falling back to "No quota data".
function parseClaude(data: any) {
  if (data?.message)
    return [{ name: "error", used: 0, total: 0, resetAt: null, message: data.message }];

  const quotas = quotaEntries(data).map(([name, quota]) =>
    normalizeQuotaEntry(name, quota, { isPercentageOnly: true })
  );

  if (data?.extraUsage?.is_enabled) {
    quotas.push(buildClaudeExtraUsageQuota(data.extraUsage));
  }

  return quotas;
}

function parseDeepseekQuota(quotaKey: string, quota: any) {
  const match = quotaKey.match(/^credits(?:_([a-z]{3}))?$/);
  if (!match) return normalizeQuotaEntry(quotaKey, quota);
  const remaining = Number(quota?.remaining ?? 0);
  const currency = quota?.currency ?? (match[1] ? match[1].toUpperCase() : "USD");
  return buildCreditsQuota(currency, remaining, remaining > 20 ? 100 : remaining > 5 ? 60 : 20, {
    currency,
  });
}

function parseDeepseek(data: any) {
  return quotaEntries(data).map(([quotaKey, quota]) => parseDeepseekQuota(quotaKey, quota));
}

// #10078 follow-up: AgentRouter's `quotas.balance` entry (open-sse/services/usage/agentrouter.ts)
// carries a real USD amount in `remaining` + `currency: "USD"`. The generic path
// (normalizeQuotaEntry via parseGeneric) drops `currency` entirely and never sets
// `isCredits`/`creditCount`, so QuotaCardExpanded's dollar-formatted
// renderer (which only activates on `q.isCredits`) never triggers — the balance was
// rendered as a bare "100%/0% left" percentage instead of "$X.XX". Route it through
// buildCreditsQuota() (same shape DeepSeek/Claude-extra-usage credits rows use) so the
// dollar figure — and an exhausted ($0.00) balance — render unambiguously as USD.
function parseAgentrouterQuota(quotaKey: string, quota: any) {
  if (quotaKey !== "balance") return normalizeQuotaEntry(quotaKey, quota);
  const remaining = Math.max(0, Number(quota?.remaining ?? 0));
  const currency = quota?.currency || "USD";
  const remainingPercentage =
    safePercentage(quota?.remainingPercentage) ?? (remaining > 0 ? 100 : 0);
  return buildCreditsQuota(currency, remaining, remainingPercentage, { currency });
}

function parseAgentrouter(data: any) {
  return quotaEntries(data).map(([quotaKey, quota]) => parseAgentrouterQuota(quotaKey, quota));
}

// OpenRouter is credit-based, not subscription-based: the `credits` quota entry
// (open-sse/services/usage/openrouter.ts) carries the account balance in
// `remaining` + `currency: "USD"` with `unlimited: true` / total 0. The generic
// path (normalizeQuotaEntry via parseGeneric) drops `currency` and never sets
// `isCredits`/`creditCount`, so the row rendered as a meaningless "100% left"
// instead of the dollar balance. Route it through buildCreditsQuota() (same
// shape DeepSeek/AgentRouter credits rows use) so the credit count renders as
// USD. Free-tier request windows keep the generic percentage treatment.
function parseOpenrouterQuota(quotaKey: string, quota: any) {
  if (quotaKey !== "credits") return normalizeQuotaEntry(quotaKey, quota);
  const remaining = Math.max(0, Number(quota?.remaining ?? 0));
  const currency = quota?.currency || "USD";
  const remainingPercentage =
    safePercentage(quota?.remainingPercentage) ?? (remaining > 0 ? 100 : 0);
  return buildCreditsQuota("credits", remaining, remainingPercentage, { currency });
}

function parseOpenrouter(data: any) {
  return quotaEntries(data).map(([quotaKey, quota]) => parseOpenrouterQuota(quotaKey, quota));
}

/**
 * Kilo Code quota parser. Personal balance keeps the credits-style USD row; the four raw Kilo Pass
 * quota keys (kiloPassBase/kiloPassBonus/kiloPassUsage/kiloPassRemaining) are collapsed into one
 * display row that carries the real meter semantics: used = currentPeriodUsageUsd, total = base +
 * bonus, remaining = max(0, total - used). The collapsed row feeds the dedicated KiloPassMeter
 * component; the raw technical keys must never surface as individual rows because the generic
 * credits renderer would display creditCount (= remaining) for the usage entry, making "Usage"
 * read identical to "Remaining".
 */
const KILO_PASS_DISPLAY_ROW = "kiloPass";

function kiloNumber(value: any): number {
  const num = Number(value);
  return Number.isFinite(num) && num > 0 ? num : 0;
}

function roundKiloCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

/** Display-only reset timestamp; invalid input yields null instead of a broken countdown. */
function formatKiloResetDate(resetAt: any): string | null {
  if (typeof resetAt !== "string" || !resetAt.trim()) return null;
  const parsed = Date.parse(resetAt);
  if (!Number.isFinite(parsed) || parsed <= 0) return null;
  return new Date(parsed).toISOString();
}

function parseKilocode(data: any) {
  const rows: any[] = [];
  let base = 0;
  let bonus = 0;
  let usage = 0;
  let passResetAt: any = null;
  let balanceRemaining: number | null = null;

  for (const [quotaKey, quota] of quotaEntries(data)) {
    if (quotaKey === "kiloPassBase") {
      base = kiloNumber(quota?.total ?? quota?.remaining);
      passResetAt = passResetAt ?? quota?.resetAt ?? null;
      continue;
    }
    if (quotaKey === "kiloPassBonus") {
      bonus = kiloNumber(quota?.total ?? quota?.remaining);
      continue;
    }
    if (quotaKey === "kiloPassUsage") {
      usage = kiloNumber(quota?.used);
      passResetAt = passResetAt ?? quota?.resetAt ?? null;
      continue;
    }
    if (quotaKey === "kiloPassRemaining") {
      // Derived value (base + bonus - usage); wire-format only.
      continue;
    }
    if (quotaKey === "balance") {
      const remaining = kiloNumber(quota?.remaining);
      balanceRemaining = remaining;
      const remainingPercentage =
        safePercentage(quota?.remainingPercentage) ?? (remaining > 0 ? 100 : 0);
      rows.push(
        buildCreditsQuota("balance", remaining, remainingPercentage, {
          currency: quota?.currency || "USD",
          displayName: quota?.displayName,
          resetAt: null,
          unlimited: true,
        })
      );
      continue;
    }
    rows.push(normalizeQuotaEntry(quotaKey, quota));
  }

  const total = roundKiloCurrency(base + bonus);
  if (total > 0 || usage > 0) {
    const remaining = Math.max(0, roundKiloCurrency(total - usage));
    rows.push({
      name: KILO_PASS_DISPLAY_ROW,
      displayName: "Kilo Pass",
      kiloPass: true,
      kiloPassBase: base,
      kiloPassBonus: bonus,
      ...(balanceRemaining !== null ? { kiloPassBalance: balanceRemaining } : {}),
      used: usage,
      total,
      remaining,
      remainingPercentage: total > 0 ? Math.max(0, (remaining / total) * 100) : 0,
      resetAt: formatKiloResetDate(passResetAt),
      unlimited: false,
      currency: "USD",
    });
  }

  return rows;
}

/** Finds the collapsed Kilo Pass display row within parsed quota rows, if present. */
export function findKiloPassQuotaRow(quotas: any[] | undefined | null): any | null {
  if (!Array.isArray(quotas)) return null;
  return quotas.find((quota) => quota?.kiloPass === true) ?? null;
}

export function isKiloPassDisplayRow(quota: any): boolean {
  return quota?.kiloPass === true || quota?.name === KILO_PASS_DISPLAY_ROW;
}

function parseMoonshotBalanceQuota(quotaKey: string, quota: any) {
  if (quotaKey !== "available" && quotaKey !== "voucher" && quotaKey !== "cash") {
    return normalizeQuotaEntry(quotaKey, quota);
  }
  const remaining = Math.max(0, Number(quota?.remaining ?? 0));
  const currency = quota?.currency || "CNY";
  const remainingPercentage =
    safePercentage(quota?.remainingPercentage) ?? (remaining > 0 ? 100 : 0);
  return buildCreditsQuota(quotaKey, remaining, remainingPercentage, {
    currency,
    displayName: quota?.displayName,
  });
}

function parseMoonshotBalance(data: any) {
  return quotaEntries(data).map(([quotaKey, quota]) => parseMoonshotBalanceQuota(quotaKey, quota));
}

function looksLikeMoonshotBalance(data: any): boolean {
  const quotas = data?.quotas;
  if (!quotas || typeof quotas !== "object" || Array.isArray(quotas)) return false;
  return "available" in quotas && "voucher" in quotas && "cash" in quotas;
}

function parseProviderQuotas(providerId: string, data: any) {
  if (looksLikeMoonshotBalance(data)) return parseMoonshotBalance(data);
  if (providerId === "github") return parseGithub(data);
  if (["glm", "glm-cn", "glmt", "opencode-go"].includes(providerId)) return parseGlmFamily(data);
  if (providerId === "antigravity" || providerId === "agy") return parseAntigravity(data);
  if (providerId === "codex") return parseCodex(data);
  if (providerId === "claude") return parseClaude(data);
  if (providerId === "deepseek") return parseDeepseek(data);
  if (providerId === "kilocode") return parseKilocode(data);
  if (providerId === "agentrouter") return parseAgentrouter(data);
  if (providerId === "openrouter") return parseOpenrouter(data);
  return parseGeneric(data);
}

function sortProviderModelOrder(provider: string, quotas: any[]) {
  const modelOrder = getModelsByProviderId(provider);
  if (modelOrder.length === 0) return;
  const orderMap = new Map(modelOrder.map((m, i) => [m.id, i]));
  quotas.sort(
    (a, b) =>
      (orderMap.get(a.modelKey || a.name) ?? 999) - (orderMap.get(b.modelKey || b.name) ?? 999)
  );
}

function sortGlmOrder(providerId: string, quotas: any[]) {
  if (!GLM_FAMILY_PROVIDERS.includes(providerId)) return;
  quotas.sort((a, b) => (GLM_QUOTA_ORDER[a.name] ?? 99) - (GLM_QUOTA_ORDER[b.name] ?? 99));
}

function sortCodexOrder(providerId: string, quotas: any[]) {
  if (providerId !== "codex") return;
  quotas.sort((a, b) => (CODEX_QUOTA_ORDER[a.name] ?? 99) - (CODEX_QUOTA_ORDER[b.name] ?? 99));
}

function sortKimiOrder(providerId: string, quotas: any[]) {
  if (!KIMI_CODING_PROVIDERS.includes(providerId)) return;
  const rank = (name: string) => {
    if (/^code_5h(?:_|$)/.test(name)) return 0;
    if (/^code_7d(?:_|$)/.test(name)) return 1;
    return 99;
  };
  quotas.sort((a, b) => {
    const rankDiff = rank(String(a.name)) - rank(String(b.name));
    return rankDiff || String(a.name).localeCompare(String(b.name));
  });
}

export function parseQuotaData(provider: string | undefined, data: any) {
  if (!data || typeof data !== "object") return [];
  const providerId = String(provider || "").toLowerCase();

  try {
    const normalizedQuotas = parseProviderQuotas(providerId, data);
    sortProviderModelOrder(provider, normalizedQuotas);
    sortGlmOrder(providerId, normalizedQuotas);
    sortCodexOrder(providerId, normalizedQuotas);
    sortKimiOrder(providerId, normalizedQuotas);
    return normalizedQuotas;
  } catch (error) {
    console.error(`Error parsing quota data for ${provider}:`, error);
    return [];
  }
}
