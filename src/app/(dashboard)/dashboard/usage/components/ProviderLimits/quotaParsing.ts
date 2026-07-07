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
  return {
    name,
    used: Number.isFinite(adjusted.used) ? adjusted.used : 0,
    total: adjusted.total,
    resetAt: quota?.resetAt || null,
    staleAfterReset: adjusted.staleAfterReset,
    ...(adjusted.remainingPercentage !== undefined
      ? { remainingPercentage: adjusted.remainingPercentage }
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

function parseClaude(data: any) {
  if (data?.message)
    return [{ name: "error", used: 0, total: 0, resetAt: null, message: data.message }];
  return quotaEntries(data).map(([name, quota]) =>
    normalizeQuotaEntry(name, quota, { isPercentageOnly: true })
  );
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

function parseProviderQuotas(providerId: string, data: any) {
  if (providerId === "github") return parseGithub(data);
  if (["glm", "glm-cn", "glmt", "opencode-go"].includes(providerId)) return parseGlmFamily(data);
  if (providerId === "antigravity" || providerId === "agy") return parseAntigravity(data);
  if (providerId === "codex") return parseCodex(data);
  if (providerId === "claude") return parseClaude(data);
  if (providerId === "deepseek") return parseDeepseek(data);
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
  if (!["glm", "glm-cn", "glmt", "opencode-go"].includes(providerId)) return;
  quotas.sort((a, b) => (GLM_QUOTA_ORDER[a.name] ?? 99) - (GLM_QUOTA_ORDER[b.name] ?? 99));
}

function sortCodexOrder(providerId: string, quotas: any[]) {
  if (providerId !== "codex") return;
  quotas.sort((a, b) => (CODEX_QUOTA_ORDER[a.name] ?? 99) - (CODEX_QUOTA_ORDER[b.name] ?? 99));
}

export function parseQuotaData(provider: string | undefined, data: any) {
  if (!data || typeof data !== "object") return [];
  const providerId = String(provider || "").toLowerCase();

  try {
    const normalizedQuotas = parseProviderQuotas(providerId, data);
    sortProviderModelOrder(provider, normalizedQuotas);
    sortGlmOrder(providerId, normalizedQuotas);
    sortCodexOrder(providerId, normalizedQuotas);
    return normalizedQuotas;
  } catch (error) {
    console.error(`Error parsing quota data for ${provider}:`, error);
    return [];
  }
}
