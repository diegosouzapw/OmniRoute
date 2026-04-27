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
  agentic_request: "Agentic",
  agentic_request_freetrial: "Agentic (Trial)",
  credits: "AI Credits",
  models: "Models",
};

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function normalizePlanCandidate(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.toLowerCase() === "unknown") return null;
  if (PROVIDER_PLAN_FALLBACKS.has(trimmed.toLowerCase())) return null;
  return trimmed;
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

  try {
    switch (provider.toLowerCase()) {
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

      case "antigravity":
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
              })
            );
          });
        }
        break;

      case "codex":
        if (data.quotas) {
          Object.entries(data.quotas).forEach(([quotaType, quota]: [string, any]) => {
            normalizedQuotas.push(normalizeQuotaEntry(quotaType, quota));
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
            normalizedQuotas.push(normalizeQuotaEntry(name, quota));
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

  return normalizedQuotas;
}

/**
 * Resolve the best available plan label using live usage first, then persisted
 * provider-specific connection metadata.
 */
export function resolvePlanValue(plan, providerSpecificData) {
  const psd = toRecord(providerSpecificData);
  const candidates = [
    plan,
    psd.workspacePlanType,
    psd.plan,
    psd.subscription,
    psd.tier,
    psd.accountTier,
  ];

  for (const candidate of candidates) {
    const normalized = normalizePlanCandidate(candidate);
    if (normalized) return normalized;
  }

  return null;
}

/**
 * Normalize provider-specific plan labels into a shared tier taxonomy.
 * Supported tiers: enterprise, business, team, ultra, pro, plus, free, unknown.
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

  if (upper.includes("PRO") || upper.includes("PREMIUM")) {
    return { key: "pro", label: "Pro", variant: "success", rank: 3, raw };
  }

  if (upper.includes("PLUS") || upper.includes("PAID")) {
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
