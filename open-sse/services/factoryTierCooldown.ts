/**
 * Persist Factory quota cooldowns per Standard/Core tier on the connection
 * row, without cooling the whole account.
 */
import { lockModel } from "./accountFallback.ts";
import { factoryQuotaTierFor, type FactoryQuotaTier } from "../config/factory.ts";

type JsonRecord = Record<string, unknown>;

const TIER_PSD_KEY = "factoryTierCooldowns";

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function parseUntilMs(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const ms = /^\d+(\.\d+)?$/.test(value.trim()) ? Number(value) : Date.parse(value);
    return Number.isFinite(ms) ? ms : NaN;
  }
  return NaN;
}

function dummyModelForTier(tier: FactoryQuotaTier): string {
  return tier === "core" ? "minimax-m2.7" : "claude-haiku-4-5-20251001";
}
export async function persistFactoryTierCooldown(params: {
  connectionId: string;
  model: string;
  rateLimitedUntil: string;
}): Promise<JsonRecord | null> {
  if (!params.model.trim()) return null;
  const tier = factoryQuotaTierFor(params.model);
  if (!tier) return null;

  const { getProviderConnectionById, updateProviderConnection } =
    await import("@/lib/db/providers");
  const conn = (await getProviderConnectionById(params.connectionId)) as {
    provider?: string;
    providerSpecificData?: JsonRecord | null;
  } | null;
  if (!conn || conn.provider !== "factory") return null;

  const psd = asRecord(conn.providerSpecificData);
  const untils = asRecord(psd[TIER_PSD_KEY]);
  const existingMs = parseUntilMs(untils[tier]);
  const nextMs = parseUntilMs(params.rateLimitedUntil);
  if (!Number.isFinite(nextMs)) return psd;
  if (Number.isFinite(existingMs) && existingMs > Date.now() && existingMs >= nextMs) {
    return psd;
  }

  const nextPsd: JsonRecord = {
    ...psd,
    [TIER_PSD_KEY]: { ...untils, [tier]: params.rateLimitedUntil },
  };
  await updateProviderConnection(
    params.connectionId,
    {
      providerSpecificData: nextPsd,
    },
    { mergeProviderSpecificData: true }
  );
  return nextPsd;
}

export async function liftFactoryTierCooldown(
  connectionId: string,
  tier: FactoryQuotaTier
): Promise<void> {
  const { getProviderConnectionById, updateProviderConnection } =
    await import("@/lib/db/providers");
  const conn = (await getProviderConnectionById(connectionId)) as {
    provider?: string;
    providerSpecificData?: JsonRecord | null;
  } | null;
  if (!conn || conn.provider !== "factory") return;

  const psd = asRecord(conn.providerSpecificData);
  const untils = asRecord(psd[TIER_PSD_KEY]);
  if (!untils[tier]) return;

  const nextUntils = { ...untils };
  delete nextUntils[tier];
  await updateProviderConnection(
    connectionId,
    {
      providerSpecificData: {
        ...psd,
        [TIER_PSD_KEY]: nextUntils,
      },
    },
    { mergeProviderSpecificData: true }
  );
}

export function persistFactoryTierCooldownIfQuota(params: {
  provider?: string | null;
  connectionId: string;
  model?: string | null;
  cooldownMs: number;
  reason?: string | null;
}): void {
  if (params.provider !== "factory") return;
  if (!params.model?.trim() || params.cooldownMs <= 0) return;
  if (params.reason != null && params.reason !== "quota_exhausted") return;
  void persistFactoryTierCooldown({
    connectionId: params.connectionId,
    model: params.model,
    rateLimitedUntil: new Date(Date.now() + params.cooldownMs).toISOString(),
  }).catch(() => {});
}

export async function persistFactoryPreflightTierLock(params: {
  provider: string;
  connectionId: string;
  model: string;
  unavailableUntil: string;
}): Promise<void> {
  const cooldownMs = Math.max(0, Date.parse(params.unavailableUntil) - Date.now());
  lockModel(params.provider, params.connectionId, params.model, "quota_exhausted", cooldownMs);
  await persistFactoryTierCooldown({
    connectionId: params.connectionId,
    model: params.model,
    rateLimitedUntil: params.unavailableUntil,
  });
}

export function rehydrateFactoryTierLocks(
  provider: string,
  connectionId: string,
  providerSpecificData: JsonRecord | null | undefined
): void {
  if (provider !== "factory") return;
  const untils = asRecord(asRecord(providerSpecificData)[TIER_PSD_KEY]);
  const now = Date.now();
  for (const tier of ["standard", "core"] as const) {
    const untilMs = parseUntilMs(untils[tier]);
    if (!Number.isFinite(untilMs) || untilMs <= now) continue;
    lockModel(provider, connectionId, dummyModelForTier(tier), "quota_exhausted", untilMs - now);
  }
}

export function rehydrateFactoryTierLocksForConnections(
  provider: string,
  connections: Array<{ id: string; providerSpecificData?: unknown }>
): void {
  if (provider !== "factory") return;
  for (const conn of connections) {
    rehydrateFactoryTierLocks(
      provider,
      conn.id,
      conn.providerSpecificData as JsonRecord | null | undefined
    );
  }
}
