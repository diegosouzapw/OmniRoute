import { sanitizeGrokBillingStatus, type GrokBillingStatus } from "@/shared/utils/grokBilling";
import { getDbInstance, isBuildPhase, isCloud } from "./core";

type JsonRecord = Record<string, unknown>;

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes?: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
  transaction: <T extends (...args: any[]) => unknown>(fn: T) => T;
}

interface KeyValueRow {
  key: string;
  value: string;
}

export interface ProviderLimitsCacheEntry {
  quotas: JsonRecord | null;
  plan: unknown;
  message: string | null;
  fetchedAt: string;
  source?: string | null;
  bankedResetCredits?: number;
  billing?: GrokBillingStatus;
}

const PROVIDER_LIMITS_CACHE_NAMESPACE = "providerLimitsCache";

function parseJson(raw: string): unknown {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

function toRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function sanitizeCacheEntryForStorage(entry: ProviderLimitsCacheEntry): ProviderLimitsCacheEntry {
  const { billing: rawBilling, ...rest } = entry;
  const billing = sanitizeGrokBillingStatus(rawBilling);
  return billing ? { ...rest, billing } : rest;
}

function normalizeCacheEntry(value: unknown): ProviderLimitsCacheEntry | null {
  const record = toRecord(value);
  if (!record) return null;

  const fetchedAt =
    typeof record.fetchedAt === "string" && record.fetchedAt.trim() ? record.fetchedAt : null;
  if (!fetchedAt) return null;

  const bankedResetCredits = Number(record.bankedResetCredits);
  const billing = sanitizeGrokBillingStatus(record.billing);

  return {
    quotas: toRecord(record.quotas),
    plan: record.plan ?? null,
    message: typeof record.message === "string" ? record.message : null,
    fetchedAt,
    source: typeof record.source === "string" ? record.source : null,
    ...(Number.isFinite(bankedResetCredits) ? { bankedResetCredits } : {}),
    ...(billing ? { billing } : {}),
  };
}

export function getProviderLimitsCache(connectionId: string): ProviderLimitsCacheEntry | null {
  if (isBuildPhase || isCloud) return null;
  const db = getDbInstance() as unknown as DbLike;
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(PROVIDER_LIMITS_CACHE_NAMESPACE, connectionId) as KeyValueRow | undefined;
  if (!row?.value) return null;
  return normalizeCacheEntry(parseJson(row.value));
}

export function getAllProviderLimitsCache(): Record<string, ProviderLimitsCacheEntry> {
  if (isBuildPhase || isCloud) return {};
  const db = getDbInstance() as unknown as DbLike;
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
    .all(PROVIDER_LIMITS_CACHE_NAMESPACE) as KeyValueRow[];

  const result: Record<string, ProviderLimitsCacheEntry> = {};
  for (const row of rows) {
    const parsed = normalizeCacheEntry(parseJson(row.value));
    if (parsed) {
      result[row.key] = parsed;
    }
  }
  return result;
}

export function setProviderLimitsCache(
  connectionId: string,
  entry: ProviderLimitsCacheEntry
): ProviderLimitsCacheEntry {
  const sanitized = sanitizeCacheEntryForStorage(entry);
  if (isBuildPhase || isCloud) return sanitized;
  const db = getDbInstance() as unknown as DbLike;
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    PROVIDER_LIMITS_CACHE_NAMESPACE,
    connectionId,
    JSON.stringify(sanitized)
  );
  return sanitized;
}

export function setProviderLimitsCacheBatch(
  entries: Array<{ connectionId: string; entry: ProviderLimitsCacheEntry }>
): number {
  if (isBuildPhase || isCloud || entries.length === 0) return 0;
  const db = getDbInstance() as unknown as DbLike;
  const insert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
  );
  const tx = db.transaction(
    (items: Array<{ connectionId: string; entry: ProviderLimitsCacheEntry }>) => {
      for (const item of items) {
        insert.run(
          PROVIDER_LIMITS_CACHE_NAMESPACE,
          item.connectionId,
          JSON.stringify(sanitizeCacheEntryForStorage(item.entry))
        );
      }
    }
  );
  tx(entries);
  return entries.length;
}

export function deleteProviderLimitsCache(connectionId: string): void {
  if (isBuildPhase || isCloud) return;
  const db = getDbInstance() as unknown as DbLike;
  db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(
    PROVIDER_LIMITS_CACHE_NAMESPACE,
    connectionId
  );
}
