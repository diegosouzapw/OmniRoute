import { getModelsByProviderId } from "@omniroute/open-sse/config/providerModels.ts";
import { safePercentage } from "@/shared/utils/formatting";

const PROVIDER_PLAN_FALLBACKS = new Set([
  "claude code",
  "kimi coding",
  "kiro",
  "amazon q",
  "openai codex",
  "codex",
  "github copilot",
]);

const QUOTA_LABEL_MAP: Record<string, string> = {
  chat: "Chat",
  completions: "Completions",
  premium_interactions: "Premium",
  session: "Session",
  weekly: "Weekly",
  code_review: "Code Review",
  gpt_5_3_codex_spark_session: "GPT-5.3-Codex-Spark",
  gpt_5_3_codex_spark_weekly: "GPT-5.3-Codex-Spark Weekly",
  agentic_request: "Agentic",
  agentic_request_freetrial: "Agentic (Trial)",
  credits: "AI Credits",
  models: "Models",
  mcp_monthly: "Monthly",
  "search-prime": "Web Search",
  "web-reader": "Web Reader",
  zread: "Zread",
  "5 Hours Quota": "5 Hours",
  "Weekly Quota": "Weekly",
  "Monthly Tools": "Monthly Tools",
  tokens: "Tokens",
  time_limit: "Time Limit",
};

const GLM_QUOTA_ORDER: Record<string, number> = {
  session: 0,
  weekly: 1,
  mcp_monthly: 2,
};

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function isClaudeOrganizationTypeLabel(value: string) {
  return /^default_claude(?:_ai)?$/i.test(value.trim());
}

function normalizePlanCandidate(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.toLowerCase() === "unknown") return null;
  if (PROVIDER_PLAN_FALLBACKS.has(trimmed.toLowerCase())) return null;
  if (isClaudeOrganizationTypeLabel(trimmed)) return null;
  return trimmed;
}

function escapeRegExpToken(token: string): string {
  return token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Match tier tokens as whole words (avoids MINIMAX → Max, APPROVE → Pro, etc.). */
function hasTierToken(upper: string, token: string): boolean {
  const escaped = escapeRegExpToken(token.toUpperCase());
  const pattern = new RegExp(`(?:^|[^A-Z])${escaped}(?:[^A-Z]|$)`);
  return pattern.test(upper);
}

function toTitleCaseWords(value: string) {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatQuotaLabel(name: string) {
  const trimmed = typeof name === "string" ? name.trim() : "";
  if (!trimmed) return "";

  const mapped = QUOTA_LABEL_MAP[trimmed];
  if (mapped) return mapped;

  if (/^session\s*\(\d+[hm]\)$/i.test(trimmed)) {
    return "Session";
  }

  if (/^weekly\s*\(\d+d\)$/i.test(trimmed)) {
    return "Weekly";
  }

  const weeklyModelMatch = trimmed.match(/^weekly\s+(.+?)\s*\(\d+d\)$/i);
  if (weeklyModelMatch) {
    return `Weekly ${toTitleCaseWords(weeklyModelMatch[1])}`;
  }

  return trimmed;
}

/**
 * Format ISO date string to countdown format (inspired by vscode-antigravity-cockpit)
 * @param {string|Date} date - ISO date string or Date object
 * @returns {string} Formatted countdown (e.g., "2d 5h 30m", "4h 40m", "15m") or "-"
 */
export function formatResetTime(date) {
  if (!date) return "-";

  try {
    const resetDate = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffMs = (resetDate as any) - (now as any);

    if (diffMs <= 0) return "-";

    const totalMinutes = Math.ceil(diffMs / (1000 * 60));

    // < 60 minutes: show only minutes
    if (totalMinutes < 60) {
      return `${totalMinutes}m`;
    }

    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    // < 24 hours: show hours and minutes
    if (totalHours < 24) {
      return `${totalHours}h ${remainingMinutes}m`;
    }

    // >= 24 hours: show days, hours, and minutes
    const days = Math.floor(totalHours / 24);
    const remainingHours = totalHours % 24;
    return `${days}d ${remainingHours}h ${remainingMinutes}m`;
  } catch (error) {
    return "-";
  }
}

/**
 * Get Tailwind color class based on percentage
 * @param {number} percentage - Remaining percentage (0-100)
 * @returns {string} Color name: "green" | "yellow" | "red"
 */
export function getStatusColor(percentage) {
  if (percentage > 70) return "green";
  if (percentage >= 30) return "yellow";
  return "red"; // 0-29% including 0% (out of quota) - show red
}

/**
 * Get status emoji based on percentage
 * @param {number} percentage - Remaining percentage (0-100)
 * @returns {string} Emoji: "🟢" | "🟡" | "🔴"
 */
export function getStatusEmoji(percentage) {
  if (percentage > 70) return "🟢";
  if (percentage >= 30) return "🟡";
  return "🔴"; // 0-29% including 0% (out of quota) - show red
}

/**
 * Calculate remaining percentage
 * @param {number} used - Used amount
 * @param {number} total - Total amount
 * @returns {number} Remaining percentage (0-100)
 */
export function calculatePercentage(used, total) {
  if (!total || total === 0) return 0;
  if (!used || used < 0) return 100;
  if (used >= total) return 0;

  return Math.round(((total - used) / total) * 100);
}

function isPastResetWindow(resetAt) {
  if (!resetAt) return false;
  const resetTime =
    typeof resetAt === "number" ? resetAt : typeof resetAt === "string" ? Date.parse(resetAt) : NaN;
  if (!Number.isFinite(resetTime)) return false;
  return Date.now() >= resetTime;
}

function normalizeQuotaEntry(name: string, quota: any = {}, extras: any = {}) {
  const usedRaw = Number(quota?.used || 0);
  const totalRaw = Number(quota?.total || 0);
  const resetAt = quota?.resetAt || null;

  // T13: Only consider it stale if the reset time passed AND there's still usage shown.
  // If usage is already 0 (or remaining is 100%), it's naturally reset and doesn't need to be marked as stale.
  const passedReset = isPastResetWindow(resetAt);
  const remainingPercentageRaw = safePercentage(quota?.remainingPercentage);
  const hasPendingUsage =
    usedRaw > 0 || (remainingPercentageRaw !== undefined && remainingPercentageRaw < 100);
  const staleAfterReset = passedReset && hasPendingUsage;

  const used = staleAfterReset ? 0 : usedRaw;
  const total = Number.isFinite(totalRaw) ? totalRaw : 0;

  const remainingPercentage =
    staleAfterReset && total > 0
      ? 100
      : remainingPercentageRaw !== undefined
        ? remainingPercentageRaw
        : undefined;

  return {
    name,
    used: Number.isFinite(used) ? used : 0,
    total,
    resetAt,
    staleAfterReset,
    ...(remainingPercentage !== undefined ? { remainingPercentage } : {}),
    ...extras,
  };
}

/**
 * Parse provider-specific quota structures into normalized array
 * @param {string} provider - Provider name (github, antigravity, codex, kiro, claude)
 * @param {Object} data - Raw quota data from provider
 * @returns {Array<Object>} Normalized quota objects with { name, used, total, resetAt }
 */
export function parseQuotaData(provider, data) {
  if (!data || typeof data !== "object") return [];

  const normalizedQuotas = [];
  const providerId = String(provider || "").toLowerCase();

  try {
    switch (providerId) {
      case "github":
        if (data.quotas) {
          Object.entries(data.quotas).forEach(([name, quota]: [string, any]) => {
            if (quota?.unlimited && (!quota?.total || quota.total <= 0)) {
              return;
            }
            normalizedQuotas.push(normalizeQuotaEntry(name, quota));
          });
        }
        break;

      case "glm":
      case "glm-cn":
      case "glmt":
      case "opencode-go":
        if (data.quotas) {
          Object.entries(data.quotas).forEach(([name, quota]: [string, any]) => {
            normalizedQuotas.push(
              normalizeQuotaEntry(name, quota, {
                displayName: quota?.displayName,
                details: Array.isArray(quota?.details) ? quota.details : undefined,
                isPercentageOnly:
                  Number(quota?.total || 0) === 100 && quota?.remainingPercentage !== undefined,
              })
            );
          });
        }
        break;

      case "antigravity":
      case "agy":
        if (data.quotas) {
          Object.entries(data.quotas).forEach(([modelKey, quota]: [string, any]) => {
            if (modelKey === "credits") {
              // Credit balance: render as "N credits remaining" counter, not a progress bar
              const remaining = Number(quota?.remaining ?? 0);
              normalizedQuotas.push({
                name: "credits",
                used: 0,
                total: 0,
                remaining,
                resetAt: null,
                unlimited: false,
                isCredits: true,
                // Show green if >50, yellow if >10, red if ≤10
                remainingPercentage: remaining > 50 ? 100 : remaining > 10 ? 60 : 20,
                creditCount: remaining,
              });
              return;
            }
            if (modelKey === "models") {
              // Summary row: skip — individual models are shown via modelQuotas if needed
              return;
            }
            if (quota?.unlimited && (!quota?.total || quota.total <= 0)) {
              return;
            }
            normalizedQuotas.push(
              normalizeQuotaEntry(modelKey, quota, {
                modelKey: modelKey,
                isPercentageOnly: quota?.fractionReported === true,
                ...(quota?.quotaSource ? { quotaSource: quota.quotaSource } : {}),
                ...(quota?.fractionReported !== undefined
                  ? { fractionReported: quota.fractionReported }
                  : {}),
              })
            );
          });
        }
        break;

      case "codex":
        if (data.quotas) {
          Object.entries(data.quotas).forEach(([quotaType, quota]: [string, any]) => {
            normalizedQuotas.push(
              normalizeQuotaEntry(quotaType, quota, {
                displayName: quota?.displayName,
                isPercentageOnly: true,
              })
            );
          });
        }
        break;

      case "kiro":
      case "amazon-q":
        if (data.quotas) {
          Object.entries(data.quotas).forEach(([quotaType, quota]: [string, any]) => {
            normalizedQuotas.push(normalizeQuotaEntry(quotaType, quota));
          });
        }
        break;

      case "claude":
        if (data.message) {
          // Handle error message case
          normalizedQuotas.push({
            name: "error",
            used: 0,
            total: 0,
            resetAt: null,
            message: data.message,
          });
        } else if (data.quotas) {
          Object.entries(data.quotas).forEach(([name, quota]: [string, any]) => {
            normalizedQuotas.push(
              normalizeQuotaEntry(name, quota, {
                isPercentageOnly: true,
              })
            );
          });
        }
        break;

      case "gemini-cli":
        if (data.quotas) {
          Object.entries(data.quotas).forEach(([modelKey, quota]: [string, any]) => {
            normalizedQuotas.push(normalizeQuotaEntry(modelKey, quota, { modelKey }));
          });
        }
        break;

      case "nanogpt":
        if (data.quotas) {
          Object.entries(data.quotas).forEach(([name, quota]: [string, any]) => {
            normalizedQuotas.push(normalizeQuotaEntry(name, quota));
          });
        }
        break;

      case "deepseek":
        // DeepSeek balance: credits-style display with currency
        // Match any "credits" key with optional 3-letter currency suffix
        if (data.quotas) {
          Object.entries(data.quotas).forEach(([quotaKey, quota]: [string, any]) => {
            // Match credits, credits_usd, credits_cny, credits_eur, etc.
            const match = quotaKey.match(/^credits(?:_([a-z]{3}))?$/);
            if (match) {
              const remaining = Number(quota?.remaining ?? 0);
              // Extract currency from key suffix or use quota.currency, fallback to USD
              const currency = quota?.currency ?? (match[1] ? match[1].toUpperCase() : "USD");
              normalizedQuotas.push({
                name: currency,
                used: 0,
                total: 0,
                remaining,
                resetAt: null,
                unlimited: false,
                isCredits: true,
                currency,
                creditCount: remaining,
                // Color coding based on balance amount: green >20, yellow 5-20, red <5
                remainingPercentage: remaining > 20 ? 100 : remaining > 5 ? 60 : 20,
              });
            } else {
              normalizedQuotas.push(normalizeQuotaEntry(quotaKey, quota));
            }
          });
        }
        break;

      default:
        // Generic fallback for unknown providers
        if (data.quotas) {
          Object.entries(data.quotas).forEach(([name, quota]: [string, any]) => {
            normalizedQuotas.push(normalizeQuotaEntry(name, quota));
          });
        }
    }
  } catch (error) {
    console.error(`Error parsing quota data for ${provider}:`, error);
    return [];
  }

  // Sort quotas according to PROVIDER_MODELS order
  const modelOrder = getModelsByProviderId(provider);
  if (modelOrder.length > 0) {
    const orderMap = new Map(modelOrder.map((m, i) => [m.id, i]));

    normalizedQuotas.sort((a, b) => {
      // Use modelKey for antigravity, otherwise use name
      const keyA = a.modelKey || a.name;
      const keyB = b.modelKey || b.name;
      const orderA = orderMap.get(keyA) ?? 999;
      const orderB = orderMap.get(keyB) ?? 999;
      return (orderA as number) - (orderB as number);
    });
  }

  if (
    providerId === "glm" ||
    providerId === "glm-cn" ||
    providerId === "glmt" ||
    providerId === "opencode-go"
  ) {
    normalizedQuotas.sort((a, b) => {
      const orderA = GLM_QUOTA_ORDER[a.name] ?? 99;
      const orderB = GLM_QUOTA_ORDER[b.name] ?? 99;
      return orderA - orderB;
    });
  }

  return normalizedQuotas;
}

/**
 * Resolve the best available plan label using live usage first, then persisted
 * provider-specific connection metadata.
 */
export function resolvePlanValue(plan, providerSpecificData) {
  const psd = toRecord(providerSpecificData);
  const livePlan = normalizePlanCandidate(plan);
  const persistedCandidates = [
    psd.workspacePlanType,
    psd.plan,
    psd.subscriptionTier,
    psd.subscription,
    psd.tier,
    psd.accountTier,
    // Claude OAuth bootstrap: rate_limit_tier has the Max 5x/20x multiplier.
    psd.organizationRateLimitTier,
    psd.rateLimitTier,
    psd.organizationType,
  ];

  if (livePlan && normalizePlanTier(livePlan).key !== "free") {
    return livePlan;
  }

  for (const candidate of persistedCandidates) {
    const normalized = normalizePlanCandidate(candidate);
    if (normalized) return normalized;
  }

  return livePlan || null;
}

/**
 * Normalize provider-specific plan labels into a shared tier taxonomy.
 * Supported tiers: enterprise, business, team, ultra, pro, plus, lite, free, unknown.
 */
export function normalizePlanTier(plan) {
  const raw = typeof plan === "string" ? plan.trim() : "";
  if (!raw) {
    return { key: "unknown", label: "Unknown", variant: "default", rank: 0, raw: null };
  }

  const upper = raw.toUpperCase();

  // Provider names that are not real plan tiers — treat as unknown
  if (PROVIDER_PLAN_FALLBACKS.has(raw.toLowerCase())) {
    return { key: "unknown", label: "Unknown", variant: "default", rank: 0, raw };
  }

  // Match Anthropic bootstrap strings (claude_max, default_claude_max_20x, etc.)
  // before the generic PRO/TEAM checks so underscored values don't fall through.
  const claudeMatch = upper.match(/(?:DEFAULT_)?CLAUDE_(MAX|PRO|TEAM|ENTERPRISE|FREE)(?:_(\d+X))?/);
  if (claudeMatch) {
    const family = claudeMatch[1];
    const multiplier = claudeMatch[2] ? ` ${claudeMatch[2].toLowerCase()}` : "";
    if (family === "MAX") {
      return { key: "ultra", label: `Max${multiplier}`, variant: "success", rank: 4, raw };
    }
    if (family === "PRO") {
      return { key: "pro", label: "Pro", variant: "success", rank: 3, raw };
    }
    if (family === "TEAM") {
      return { key: "team", label: "Team", variant: "info", rank: 6, raw };
    }
    if (family === "ENTERPRISE") {
      return { key: "enterprise", label: "Enterprise", variant: "info", rank: 7, raw };
    }
    if (family === "FREE") {
      return { key: "free", label: "Free", variant: "default", rank: 1, raw };
    }
  }

  if (upper.includes("PRO+") || upper.includes("PRO PLUS") || upper.includes("PROPLUS")) {
    return { key: "plus", label: "Pro+", variant: "success", rank: 4, raw };
  }

  if (upper.includes("ENTERPRISE") || upper.includes("CORP") || upper.includes("ORG")) {
    return { key: "enterprise", label: "Enterprise", variant: "info", rank: 7, raw };
  }

  // Team plan (e.g., ChatGPT Team, GitHub Team)
  if (upper.includes("TEAM") || upper.includes("CHATGPTTEAM")) {
    return { key: "team", label: "Team", variant: "info", rank: 6, raw };
  }

  if (upper.includes("BUSINESS") || upper.includes("STANDARD") || upper.includes("BIZ")) {
    return { key: "business", label: "Business", variant: "warning", rank: 5, raw };
  }

  if (upper.includes("STUDENT")) {
    return { key: "pro", label: "Student", variant: "success", rank: 3, raw };
  }

  if (upper.includes("ULTRA")) {
    return { key: "ultra", label: "Ultra", variant: "success", rank: 4, raw };
  }

  if (hasTierToken(upper, "MAX")) {
    return { key: "ultra", label: "Max", variant: "success", rank: 4, raw };
  }

  if (hasTierToken(upper, "PRO") || hasTierToken(upper, "PREMIUM")) {
    return { key: "pro", label: "Pro", variant: "success", rank: 3, raw };
  }

  if (hasTierToken(upper, "STARTER")) {
    return { key: "lite", label: "Starter", variant: "primary", rank: 2, raw };
  }

  if (hasTierToken(upper, "LITE") || hasTierToken(upper, "LIGHT")) {
    return { key: "lite", label: "Lite", variant: "primary", rank: 2, raw };
  }

  if (hasTierToken(upper, "PLUS") || hasTierToken(upper, "PAID")) {
    return { key: "plus", label: "Plus", variant: "success", rank: 2, raw };
  }

  if (
    upper.includes("FREE") ||
    upper.includes("BASIC") ||
    upper.includes("TRIAL") ||
    upper.includes("LEGACY")
  ) {
    return { key: "free", label: "Free", variant: "default", rank: 1, raw };
  }

  const titleCased = raw
    .toLowerCase()
    .split(/[\s_-]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return { key: "unknown", label: titleCased || "Unknown", variant: "default", rank: 0, raw };
}

// === Card Grid Helpers (T7) =================================================

export const STATUS_EMOJI = {
  critical: "🔴",
  alert: "🟡",
  ok: "🟢",
  empty: "⚪",
} as const;

export type CardStatus = keyof typeof STATUS_EMOJI;

const QUOTA_BAR_GREEN_THRESHOLD = 50;
const QUOTA_BAR_YELLOW_THRESHOLD = 20;

function quotaRemainingPercent(q: any): number {
  return getQuotaRemainingPercentage(q);
}

function quotaStatus(q: any): "critical" | "alert" | "ok" {
  const pct = quotaRemainingPercent(q);
  if (pct <= QUOTA_BAR_YELLOW_THRESHOLD) return "critical";
  if (pct <= QUOTA_BAR_GREEN_THRESHOLD) return "alert";
  return "ok";
}

export function worstStatus(quotas: any[] | undefined): CardStatus {
  if (!quotas || quotas.length === 0) return "empty";
  let worst: "ok" | "alert" = "ok";
  for (const q of quotas) {
    const s = quotaStatus(q);
    if (s === "critical") return "critical";
    if (s === "alert" && worst === "ok") worst = "alert";
  }
  return worst;
}

const STATUS_ORDER: Record<"critical" | "alert" | "ok", number> = {
  critical: 0,
  alert: 1,
  ok: 2,
};

export function topQuotas(quotas: any[], n = 3): any[] {
  return [...quotas.filter(Boolean)]
    .sort((a, b) => {
      const sa = STATUS_ORDER[quotaStatus(a)];
      const sb = STATUS_ORDER[quotaStatus(b)];
      if (sa !== sb) return sa - sb;
      return quotaRemainingPercent(a) - quotaRemainingPercent(b);
    })
    .slice(0, n);
}

export function getQuotaRemainingPercentage(q: any): number {
  if (q?.unlimited) return 100;
  if (q?.remainingPercentage !== undefined) return Number(q.remainingPercentage);
  return calculatePercentage(q?.used, q?.total);
}

export function isPercentageOnlyQuota(q: any): boolean {
  return q?.isPercentageOnly === true || q?.fractionReported === true;
}

export function shouldShowQuotaUsageCount(q: any): boolean {
  const total = Number(q?.total || 0);
  return total > 0 && q?.unlimited !== true && !isPercentageOnlyQuota(q);
}

export function getBarColor(remainingPercentage: number): {
  bar: string;
  text: string;
  bg: string;
} {
  if (remainingPercentage > QUOTA_BAR_GREEN_THRESHOLD) {
    return { bar: "#22c55e", text: "#22c55e", bg: "rgba(34,197,94,0.12)" };
  }
  if (remainingPercentage > QUOTA_BAR_YELLOW_THRESHOLD) {
    return { bar: "#eab308", text: "#eab308", bg: "rgba(234,179,8,0.12)" };
  }
  return { bar: "#ef4444", text: "#ef4444", bg: "rgba(239,68,68,0.12)" };
}

export function formatCountdown(resetAt: string | null | undefined): string | null {
  if (!resetAt) return null;
  try {
    const diff = new Date(resetAt).getTime() - Date.now();
    if (diff <= 0) return null;
    const h = Math.floor(diff / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    if (h >= 24) {
      const d = Math.floor(h / 24);
      return `${d}d ${h % 24}h ${m}m`;
    }
    return `${h}h ${m}m`;
  } catch {
    return null;
  }
}

export function getNextResetSummary(quotas: any[] | undefined): string | null {
  if (!quotas || quotas.length === 0) return null;
  const now = Date.now();
  let soonest = Number.POSITIVE_INFINITY;
  let soonestIso: string | null = null;
  for (const q of quotas) {
    if (!q?.resetAt) continue;
    const ts = new Date(q.resetAt).getTime();
    if (!Number.isFinite(ts) || ts <= now) continue;
    if (ts < soonest) {
      soonest = ts;
      soonestIso = typeof q.resetAt === "string" ? q.resetAt : new Date(ts).toISOString();
    }
  }
  return soonestIso ? formatCountdown(soonestIso) : null;
}
