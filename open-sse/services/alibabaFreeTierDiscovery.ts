/**
 * @file alibabaFreeTierDiscovery.ts
 * @description Probe-based Alibaba Model Studio free-tier eligibility discovery.
 *
 * DashScope /models does not expose free-quota metadata. We classify models with
 * minimal chat probes and persist results on the connection:
 * - AllocationQuota.FreeTierOnly → model offers free tier (drained on this account)
 * - 200 on native promo families (qwen/glm/deepseek/…) → free tier with remaining quota
 * - 200 on third-party paid families (kimi/moonshot) → no free tier (paid billing only)
 *
 * @changes
 * - [2026-07-25] [Composer] - Always union built-in text free-tier allowlist into capable/block checks
 * - [2026-07-25] [Composer] - Delegate text filter context to canonical shared eligibility builder
 * - [2026-07-25] [Composer] - Strict allowlist for alibabafree combos (no optimistic qwen/glm guessing)
 * - [2026-07-25] [Composer] - Merge free-tier state across provider connections for wildcard filtering
 * - [2026-07-25] [Composer] - Add probe-based free-tier model discovery for Alibaba connections
 */

import {
  getAlibabaBillingMode,
  getAlibabaFreeDrainedModels,
  isAlibabaFreeQuotaExhaustedError,
  isAlibabaModelStudioProvider,
  mergeAlibabaFreeDrainedModels,
  type AlibabaBillingMode,
} from "./alibabaFreeTier.ts";
import {
  getAlibabaBuiltinFreeTierTextCapableModels,
  getAlibabaBuiltinNoFreeTierTextModels,
} from "./alibabaFreeTierAllowlist.ts";
import {
  buildAlibabaFreeTierTextFilterContext,
  getAlibabaFreeTierQuotaLastSyncAt,
} from "./alibabaFreeTierQuotaFetcher.ts";

export type AlibabaFreeTierProbeVerdict =
  "capable_available" | "capable_drained" | "not_capable" | "unknown";

export type AlibabaFreeTierProbeResult = {
  modelId: string;
  verdict: AlibabaFreeTierProbeVerdict;
  status: number;
  errorCode?: string;
};

/** Third-party models listed on DashScope that bill paid-only on international (no free quota toggle). */
const ALIBABA_THIRD_PARTY_PAID_PREFIXES = [/^kimi-/i, /^moonshot-/i] as const;

/** Native families that participate in DashScope new-user free-quota promos. */
const ALIBABA_NATIVE_FREE_TIER_PREFIXES = [
  /^qwen/i,
  /^qwq/i,
  /^glm-/i,
  /^deepseek-/i,
  /^minimax-/i,
  /^MiniMax-/i,
] as const;

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function normalizeModelIdList(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((entry): entry is string => typeof entry === "string" && entry.length > 0);
}

export function getAlibabaFreeTierCapableModels(
  providerSpecificData: Record<string, unknown> | null | undefined
): string[] {
  const raw = asRecord(providerSpecificData).alibabaFreeTierCapableModels;
  const drained = getAlibabaFreeDrainedModels(providerSpecificData);
  return [...new Set([...normalizeModelIdList(raw), ...drained])];
}

export function getAlibabaNoFreeTierModels(
  providerSpecificData: Record<string, unknown> | null | undefined
): string[] {
  return normalizeModelIdList(asRecord(providerSpecificData).alibabaNoFreeTierModels);
}

export function isAlibabaThirdPartyPaidModelFamily(modelId: string): boolean {
  return ALIBABA_THIRD_PARTY_PAID_PREFIXES.some((pattern) => pattern.test(modelId));
}

export function isAlibabaNativeFreeTierModelFamily(modelId: string): boolean {
  return ALIBABA_NATIVE_FREE_TIER_PREFIXES.some((pattern) => pattern.test(modelId));
}

export function parseAlibabaFreeTierProbeError(bodyText: string): {
  code: string;
  message: string;
} {
  try {
    const parsed = JSON.parse(bodyText) as {
      error?: { code?: string; type?: string; message?: string };
    };
    const error = parsed?.error;
    const code = String(error?.code || error?.type || "");
    const message = String(error?.message || bodyText || "");
    return { code, message };
  } catch {
    return { code: "", message: bodyText };
  }
}

export function classifyAlibabaFreeTierProbe(
  modelId: string,
  status: number,
  bodyText: string
): AlibabaFreeTierProbeResult {
  const { code, message } = parseAlibabaFreeTierProbeError(bodyText);
  const combined = `${code} ${message}`;

  if (status >= 200 && status < 300) {
    if (isAlibabaThirdPartyPaidModelFamily(modelId)) {
      return { modelId, verdict: "not_capable", status, errorCode: code || undefined };
    }
    if (isAlibabaNativeFreeTierModelFamily(modelId)) {
      return { modelId, verdict: "capable_available", status, errorCode: code || undefined };
    }
    return { modelId, verdict: "unknown", status, errorCode: code || undefined };
  }

  if (
    status === 403 &&
    (code === "AllocationQuota.FreeTierOnly" || isAlibabaFreeQuotaExhaustedError(combined))
  ) {
    return { modelId, verdict: "capable_drained", status, errorCode: code || undefined };
  }

  if (status === 403 || status === 400) {
    return { modelId, verdict: "not_capable", status, errorCode: code || undefined };
  }

  return { modelId, verdict: "unknown", status, errorCode: code || undefined };
}

export function mergeAlibabaFreeTierProbeResults(
  providerSpecificData: Record<string, unknown> | null | undefined,
  results: readonly AlibabaFreeTierProbeResult[],
  billingMode: AlibabaBillingMode = getAlibabaBillingMode(providerSpecificData)
): Record<string, unknown> {
  const base = asRecord(providerSpecificData);
  const capable = new Set(getAlibabaFreeTierCapableModels(base));
  const noFreeTier = new Set(getAlibabaNoFreeTierModels(base));
  let next = base;

  for (const result of results) {
    switch (result.verdict) {
      case "capable_available":
        capable.add(result.modelId);
        noFreeTier.delete(result.modelId);
        break;
      case "capable_drained":
        capable.add(result.modelId);
        noFreeTier.delete(result.modelId);
        if (billingMode === "free") {
          next = mergeAlibabaFreeDrainedModels(next, result.modelId);
        }
        break;
      case "not_capable":
        noFreeTier.add(result.modelId);
        capable.delete(result.modelId);
        break;
      default:
        break;
    }
  }

  return {
    ...next,
    alibabaFreeTierCapableModels: [...capable],
    alibabaNoFreeTierModels: [...noFreeTier],
    alibabaFreeTierProbeLastRunAt: new Date().toISOString(),
  };
}

type AlibabaConnectionLike = {
  id: string;
  providerSpecificData?: Record<string, unknown> | null;
};

/**
 * Build a merged free-tier filter context for one Alibaba connection.
 *
 * Free-tier eligibility (capable / no-free-tier) is account-agnostic — one synced
 * console snapshot applies to every `alibabaBillingMode: free` key. Only drained
 * models stay per-connection (quota exhaustion is key-specific).
 */
export function buildAlibabaFreeTierFilterContext(
  connections: readonly AlibabaConnectionLike[],
  connectionId: string
): Record<string, unknown> {
  return buildAlibabaFreeTierTextFilterContext(connections, connectionId);
}

export function isAlibabaFreeTierCapableModel(
  modelId: string,
  providerSpecificData: Record<string, unknown> | null | undefined,
  options: { strictAllowlist?: boolean } = {}
): boolean {
  const noFreeTier = new Set([
    ...getAlibabaNoFreeTierModels(providerSpecificData),
    ...getAlibabaBuiltinNoFreeTierTextModels(),
  ]);
  if (noFreeTier.has(modelId)) return false;

  const drained = new Set(getAlibabaFreeDrainedModels(providerSpecificData));
  if (drained.has(modelId)) return false;

  const capable = new Set([
    ...normalizeModelIdList(asRecord(providerSpecificData).alibabaFreeTierCapableModels),
    ...getAlibabaBuiltinFreeTierTextCapableModels(),
  ]);
  if (capable.has(modelId)) return true;

  // Console quota API is authoritative when present — never guess past it.
  if (getAlibabaFreeTierQuotaLastSyncAt(providerSpecificData) || options.strictAllowlist) {
    return false;
  }

  // Optimistic inclusion for native families until a probe proves otherwise.
  if (isAlibabaNativeFreeTierModelFamily(modelId) && !isAlibabaThirdPartyPaidModelFamily(modelId)) {
    return true;
  }

  return false;
}

export function filterAlibabaFreeEligibleModels(
  modelIds: readonly string[],
  providerSpecificData: Record<string, unknown> | null | undefined,
  options: { strictAllowlist?: boolean } = {}
): string[] {
  const drained = new Set(getAlibabaFreeDrainedModels(providerSpecificData));
  return modelIds.filter((id) => {
    if (drained.has(id)) return false;
    return isAlibabaFreeTierCapableModel(id, providerSpecificData, options);
  });
}

type ProbeConnection = {
  id: string;
  apiKey?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
};

export async function probeAlibabaFreeTierModel(
  connection: ProbeConnection,
  modelId: string,
  chatCompletionsUrl: string
): Promise<AlibabaFreeTierProbeResult> {
  if (!connection.apiKey) {
    return { modelId, verdict: "unknown", status: 0 };
  }

  try {
    const response = await fetch(chatCompletionsUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${connection.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelId,
        messages: [{ role: "user", content: "ping" }],
        max_tokens: 1,
      }),
    });
    const bodyText = await response.text();
    return classifyAlibabaFreeTierProbe(modelId, response.status, bodyText);
  } catch {
    return { modelId, verdict: "unknown", status: 0 };
  }
}

export async function probeAlibabaFreeTierModels(
  connection: ProbeConnection,
  modelIds: readonly string[],
  chatCompletionsUrl: string,
  options: { concurrency?: number } = {}
): Promise<AlibabaFreeTierProbeResult[]> {
  const concurrency = Math.max(1, Math.min(options.concurrency ?? 4, 8));
  const results: AlibabaFreeTierProbeResult[] = [];
  let index = 0;

  async function worker() {
    while (index < modelIds.length) {
      const current = modelIds[index];
      index += 1;
      results.push(await probeAlibabaFreeTierModel(connection, current, chatCompletionsUrl));
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, modelIds.length) }, () => worker()));
  return results;
}

export async function refreshAlibabaFreeTierModelClassification(
  provider: string,
  connection: ProbeConnection,
  modelIds: readonly string[],
  chatCompletionsUrl: string
): Promise<Record<string, unknown> | null> {
  if (
    !isAlibabaModelStudioProvider(provider) ||
    getAlibabaBillingMode(connection.providerSpecificData) !== "free"
  ) {
    return null;
  }

  if (getAlibabaFreeTierQuotaLastSyncAt(connection.providerSpecificData)) {
    return null;
  }

  const capable = new Set(getAlibabaFreeTierCapableModels(connection.providerSpecificData));
  const noFreeTier = new Set(getAlibabaNoFreeTierModels(connection.providerSpecificData));
  const pending = modelIds.filter((id) => !capable.has(id) && !noFreeTier.has(id));
  if (pending.length === 0) return null;

  const probeResults = await probeAlibabaFreeTierModels(connection, pending, chatCompletionsUrl, {
    concurrency: 4,
  });
  return mergeAlibabaFreeTierProbeResults(connection.providerSpecificData, probeResults);
}

export function scheduleAlibabaFreeTierProbeRefresh(
  provider: string,
  connection: ProbeConnection,
  models: ReadonlyArray<{ id?: string | null }>,
  chatCompletionsUrl: string
): void {
  const modelIds = models
    .map((model) => (typeof model?.id === "string" ? model.id.trim() : ""))
    .filter((id) => id.length > 0);
  if (modelIds.length === 0) return;

  void (async () => {
    try {
      const merged = await refreshAlibabaFreeTierModelClassification(
        provider,
        connection,
        modelIds,
        chatCompletionsUrl
      );
      if (!merged) return;
      const { updateProviderConnection } = await import("../../src/lib/db/providers.ts");
      await updateProviderConnection(connection.id, { providerSpecificData: merged });
    } catch (error) {
      console.warn("[alibaba-free-tier] background probe refresh failed", {
        connectionId: connection.id,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  })();
}
