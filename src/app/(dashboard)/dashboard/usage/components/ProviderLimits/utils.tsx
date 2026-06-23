export { parseQuotaData } from "./quotaParsing";

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
  code_review_weekly: "Code Review Weekly",
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

function unknownPlanTier(raw: string | null = null) {
  return { key: "unknown", label: "Unknown", variant: "default", rank: 0, raw };
}

function formatUnknownPlanLabel(raw: string) {
  return raw
    .toLowerCase()
    .split(/[\s_-]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function matchClaudePlanTier(raw: string, upper: string) {
  const match = upper.match(/(?:DEFAULT_)?CLAUDE_(MAX|PRO|TEAM|ENTERPRISE|FREE)(?:_(\d+X))?/);
  if (!match) return null;

  const multiplier = match[2] ? ` ${match[2].toLowerCase()}` : "";
  const tiers = {
    MAX: { key: "ultra", label: `Max${multiplier}`, variant: "success", rank: 4, raw },
    PRO: { key: "pro", label: "Pro", variant: "success", rank: 3, raw },
    TEAM: { key: "team", label: "Team", variant: "info", rank: 6, raw },
    ENTERPRISE: { key: "enterprise", label: "Enterprise", variant: "info", rank: 7, raw },
    FREE: { key: "free", label: "Free", variant: "default", rank: 1, raw },
  };
  return tiers[match[1]];
}

function matchKeywordPlanTier(raw: string, upper: string) {
  if (upper.includes("PRO+") || upper.includes("PRO PLUS") || upper.includes("PROPLUS"))
    return { key: "plus", label: "Pro+", variant: "success", rank: 4, raw };
  if (upper.includes("ENTERPRISE") || upper.includes("CORP") || upper.includes("ORG"))
    return { key: "enterprise", label: "Enterprise", variant: "info", rank: 7, raw };
  if (upper.includes("TEAM") || upper.includes("CHATGPTTEAM"))
    return { key: "team", label: "Team", variant: "info", rank: 6, raw };
  if (upper.includes("BUSINESS") || upper.includes("STANDARD") || upper.includes("BIZ"))
    return { key: "business", label: "Business", variant: "warning", rank: 5, raw };
  if (upper.includes("STUDENT"))
    return { key: "pro", label: "Student", variant: "success", rank: 3, raw };
  if (upper.includes("ULTRA"))
    return { key: "ultra", label: "Ultra", variant: "success", rank: 4, raw };
  return null;
}

function matchTokenPlanTier(raw: string, upper: string) {
  if (hasTierToken(upper, "MAX"))
    return { key: "ultra", label: "Max", variant: "success", rank: 4, raw };
  if (hasTierToken(upper, "PRO") || hasTierToken(upper, "PREMIUM"))
    return { key: "pro", label: "Pro", variant: "success", rank: 3, raw };
  if (hasTierToken(upper, "STARTER"))
    return { key: "lite", label: "Starter", variant: "primary", rank: 2, raw };
  if (hasTierToken(upper, "LITE") || hasTierToken(upper, "LIGHT"))
    return { key: "lite", label: "Lite", variant: "primary", rank: 2, raw };
  if (hasTierToken(upper, "PLUS") || hasTierToken(upper, "PAID"))
    return { key: "plus", label: "Plus", variant: "success", rank: 2, raw };
  return null;
}

function matchFreePlanTier(raw: string, upper: string) {
  return upper.includes("FREE") ||
    upper.includes("BASIC") ||
    upper.includes("TRIAL") ||
    upper.includes("LEGACY")
    ? { key: "free", label: "Free", variant: "default", rank: 1, raw }
    : null;
}

/**
 * Normalize provider-specific plan labels into a shared tier taxonomy.
 * Supported tiers: enterprise, business, team, ultra, pro, plus, lite, free, unknown.
 */
export function normalizePlanTier(plan) {
  const raw = typeof plan === "string" ? plan.trim() : "";
  if (!raw) return unknownPlanTier(null);

  const upper = raw.toUpperCase();

  // Provider names that are not real plan tiers — treat as unknown
  if (PROVIDER_PLAN_FALLBACKS.has(raw.toLowerCase())) return unknownPlanTier(raw);

  // Match Anthropic bootstrap strings (claude_max, default_claude_max_20x, etc.)
  // before the generic PRO/TEAM checks so underscored values don't fall through.
  const matched =
    matchClaudePlanTier(raw, upper) ||
    matchKeywordPlanTier(raw, upper) ||
    matchTokenPlanTier(raw, upper) ||
    matchFreePlanTier(raw, upper);
  return matched || { ...unknownPlanTier(raw), label: formatUnknownPlanLabel(raw) || "Unknown" };
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

function addQuotaModelIdVariants(out: Set<string>, provider: string, modelId: string) {
  const raw = modelId.trim().toLowerCase();
  const providerId = provider.trim().toLowerCase();
  if (!raw) return;
  out.add(raw);
  if (!providerId) return;

  const prefix = `${providerId}/`;
  if (raw.startsWith(prefix)) {
    const stripped = raw.slice(prefix.length);
    if (stripped) out.add(stripped);
  } else {
    out.add(`${providerId}/${raw}`);
  }
}

export function collectHiddenQuotaModelIds(provider: string, payload: unknown): string[] {
  const hidden = new Set<string>();
  const data = toRecord(payload);
  const collect = (entries: unknown) => {
    if (!Array.isArray(entries)) return;
    for (const entry of entries) {
      const record = toRecord(entry);
      if (record.isHidden !== true && record.isDeleted !== true) continue;
      if (typeof record.id === "string") addQuotaModelIdVariants(hidden, provider, record.id);
    }
  };

  collect(data.models);
  collect(data.modelCompatOverrides);
  return Array.from(hidden);
}

export function filterHiddenModelQuotas(
  provider: string,
  quotas: any[] | undefined,
  hiddenModelIds: string[] | undefined
): any[] {
  if (!Array.isArray(quotas)) return [];
  if (!hiddenModelIds || hiddenModelIds.length === 0) return quotas;

  const hidden = new Set(
    hiddenModelIds.map((id) => id.trim().toLowerCase()).filter((id) => id.length > 0)
  );
  if (hidden.size === 0) return quotas;

  return quotas.filter((quota) => {
    if (!quota || quota.isCredits) return true;
    const modelId =
      typeof quota.modelKey === "string"
        ? quota.modelKey
        : typeof quota.modelId === "string"
          ? quota.modelId
          : "";
    if (!modelId) return true;

    const candidates = new Set<string>();
    addQuotaModelIdVariants(candidates, provider, modelId);
    return !Array.from(candidates).some((candidate) => hidden.has(candidate));
  });
}

// --- Provider dropdown filter (PR #769 port) -----------------------------
// Pure helpers extracted from <ProviderLimits/> so the filter+dropdown logic
// can be exercised by unit tests without rendering React. Keep them free of
// browser-only globals so Node's native test runner can import them directly.

/**
 * Returns true when `connection` should be visible under the selected
 * `providerFilter`. The sentinel `"all"` matches every connection; any other
 * value must equal the connection's `provider` key exactly. Connections with a
 * missing/non-string provider are filtered out when a specific provider is
 * selected (defensive — the live route only emits string provider keys).
 */
export function matchesProviderFilter(
  connection: { provider?: unknown } | null | undefined,
  providerFilter: string
): boolean {
  if (!providerFilter || providerFilter === "all") return true;
  if (!connection || typeof connection.provider !== "string") return false;
  return connection.provider === providerFilter;
}

/**
 * Distinct provider keys present in `connections`, optionally sorted with the
 * supplied `compare` function (defaults to `String.prototype.localeCompare` so
 * tests get deterministic output without depending on the i18n-aware
 * `compareTr` helper). Empty / non-string provider values are skipped.
 */
export function buildProviderOptions(
  connections: ReadonlyArray<{ provider?: unknown }>,
  compare: (a: string, b: string) => number = (a, b) => a.localeCompare(b)
): string[] {
  const seen = new Set<string>();
  for (const conn of connections) {
    if (conn && typeof conn.provider === "string" && conn.provider) {
      seen.add(conn.provider);
    }
  }
  return Array.from(seen).sort(compare);
}
