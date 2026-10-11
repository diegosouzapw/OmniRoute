import { decrypt, encrypt } from "./encryption";
import type { getDbInstance } from "./core";

export const CACHE_SECRET_MASK = "********";
export const CACHE_SECRET_KEYS = ["semanticCacheEmbeddingApiKey", "semanticCacheRedisUrl"] as const;

export class CacheCredentialEndpointError extends Error {
  constructor() {
    super("Re-enter or clear the embedding API key when changing its provider or endpoint");
    this.name = "CacheCredentialEndpointError";
  }
}

export function assertCacheCredentialEndpoint(
  current: Record<string, unknown>,
  updates: Record<string, unknown> | undefined
): void {
  if (!updates) return;
  const changed = ["semanticCacheEmbeddingBaseUrl", "semanticCacheEmbeddingProvider"].some(
    (field) => updates[field] !== undefined && (updates[field] || "") !== (current[field] || "")
  );
  const key = updates.semanticCacheEmbeddingApiKey;
  if (
    changed &&
    current.semanticCacheEmbeddingApiKey &&
    (key === undefined || key === CACHE_SECRET_MASK)
  ) {
    throw new CacheCredentialEndpointError();
  }
}

export function isCacheSecret(key: string): boolean {
  return CACHE_SECRET_KEYS.some((secret) => secret === key);
}

export function encryptCacheValue(key: string, value: unknown): unknown {
  return isCacheSecret(key) && typeof value === "string" ? encrypt(value) : value;
}

export function decryptCacheSecrets(cache: Record<string, unknown>): void {
  for (const key of CACHE_SECRET_KEYS) {
    if (typeof cache[key] === "string") cache[key] = decrypt(cache[key]) ?? "";
  }
}

/** Protect older flat/nested copies as well as the canonical cache.* rows. */
export function encryptLegacyCacheSecretCopies(db: ReturnType<typeof getDbInstance>): void {
  const keys = [
    "cache",
    "databaseSettings",
    ...CACHE_SECRET_KEYS,
    ...CACHE_SECRET_KEYS.map((key) => `cache.${key}`),
  ];
  const rows = db
    .prepare(
      `SELECT namespace, key, value FROM key_value WHERE namespace IN ('settings', 'databaseSettings') AND key IN (${keys.map(() => "?").join(",")})`
    )
    .all(...keys) as Array<{ namespace: string; key: string; value: string }>;
  const update = db.prepare("UPDATE key_value SET value = ? WHERE namespace = ? AND key = ?");
  for (const row of rows) {
    let value: unknown;
    try {
      value = JSON.parse(row.value);
    } catch {
      value = row.value;
    }
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const record = value as Record<string, unknown>;
      const cache = row.key === "databaseSettings" ? record.cache : record;
      if (cache && typeof cache === "object" && !Array.isArray(cache)) {
        for (const key of CACHE_SECRET_KEYS) {
          const fields = cache as Record<string, unknown>;
          if (fields[key] !== undefined) fields[key] = encryptCacheValue(key, fields[key]);
        }
      }
    } else {
      value = encryptCacheValue(row.key.replace(/^cache\./, ""), value);
    }
    const encoded = JSON.stringify(value);
    if (encoded !== row.value) update.run(encoded, row.namespace, row.key);
  }
}

export function redactCacheSecrets<T extends Record<string, unknown>>(cache: T): T {
  const redacted: Record<string, unknown> = { ...cache };
  for (const key of CACHE_SECRET_KEYS) {
    const value = redacted[key];
    if (typeof value !== "string" || !value) continue;
    // An unauthenticated Redis endpoint is configuration, not a secret.
    if (key === "semanticCacheRedisUrl") {
      try {
        const url = new URL(value);
        if (!url.username && !url.password) continue;
      } catch {
        // Malformed connection strings can still contain a password; hide them.
      }
    }
    redacted[key] = CACHE_SECRET_MASK;
  }
  return redacted as T;
}
