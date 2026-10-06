/**
 * Lazy-decrypting ProviderConnectionView.
 *
 * Wraps a raw (ciphertext) DB row in a JS Proxy that decrypts credential
 * fields (apiKey, accessToken, refreshToken) only on first access.
 * Non-credential reads hit the already-coerced view directly at zero cost.
 *
 * Extracted from sse/services/auth.ts for reuse across dashboard,
 * admin, and catalog callers during Phase 2/3 of the lazy-decrypt rollout.
 */

import { decryptQuiet } from "../encryption";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

function toNullableNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const parsed = toNumber(value, Number.NaN);
  return Number.isFinite(parsed) ? parsed : null;
}

export interface ProviderConnectionView {
  id: string;
  provider: string;
  authType: string | null;
  email: string | null;
  isActive: boolean;
  rateLimitedUntil: string | null;
  testStatus: string | null;
  apiKey: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiresAt: string | null;
  expiresAt: string | null;
  projectId: string | null;
  defaultModel: string | null;
  providerSpecificData: JsonRecord;
  lastUsedAt: string | null;
  consecutiveUseCount: number;
  priority: number;
  lastError: string | null;
  lastErrorType: string | null;
  lastErrorSource: string | null;
  errorCode: string | number | null;
  backoffLevel: number;
  maxConcurrent: number | null;
  quotaWindowThresholds: Record<string, number> | null;
}

/**
 * Converts a raw DB row into a fully resolved ProviderConnectionView.
 * Credential fields have already been decrypted by the DB layer.
 */
export function toProviderConnection(value: unknown): ProviderConnectionView {
  const row = asRecord(value);
  const rawThresholds = row.quotaWindowThresholds;
  const quotaWindowThresholds: Record<string, number> | null =
    rawThresholds && typeof rawThresholds === "object" && !Array.isArray(rawThresholds)
      ? (rawThresholds as Record<string, number>)
      : null;
  return {
    id: toStringOrNull(row.id) || "",
    provider: toStringOrNull(row.provider) || "",
    authType: toStringOrNull(row.authType),
    email: toStringOrNull(row.email),
    isActive: row.isActive === true,
    rateLimitedUntil: toStringOrNull(row.rateLimitedUntil),
    testStatus: toStringOrNull(row.testStatus),
    apiKey: toStringOrNull(row.apiKey),
    accessToken: toStringOrNull(row.accessToken),
    refreshToken: toStringOrNull(row.refreshToken),
    tokenExpiresAt: toStringOrNull(row.tokenExpiresAt),
    expiresAt: toStringOrNull(row.expiresAt),
    projectId: toStringOrNull(row.projectId),
    defaultModel: toStringOrNull(row.defaultModel),
    providerSpecificData: asRecord(row.providerSpecificData),
    lastUsedAt: toStringOrNull(row.lastUsedAt),
    consecutiveUseCount: toNumber(row.consecutiveUseCount, 0),
    priority: toNumber(row.priority, 999),
    lastError: toStringOrNull(row.lastError),
    lastErrorType: toStringOrNull(row.lastErrorType),
    lastErrorSource: toStringOrNull(row.lastErrorSource),
    errorCode:
      typeof row.errorCode === "string" || typeof row.errorCode === "number" ? row.errorCode : null,
    backoffLevel: toNumber(row.backoffLevel, 0),
    maxConcurrent: toNullableNumber(row.maxConcurrent),
    quotaWindowThresholds,
  };
}

/**
 * Creates a lazy-decrypting ProviderConnectionView from a raw (ciphertext)
 * DB row. First calls toProviderConnection for full type coercion (isActive
 * boolean, providerSpecificData object, etc.), then proxies credential
 * fields (apiKey, accessToken, refreshToken) to decrypt-only-on-first-access.
 *
 * Non-credential reads hit the already-coerced view directly at zero cost.
 */
export function createLazyConnectionView(row: Record<string, unknown>): ProviderConnectionView {
  const base = toProviderConnection(row);
  let decrypted: Record<string, null | string> | undefined;

  const ensureDecrypted = () => {
    if (!decrypted) {
      const connectionId = base.id;
      const provider = base.provider;
      decrypted = {
        apiKey: toStringOrNull(
          decryptQuiet(base.apiKey, { connectionId, provider, field: "apiKey" })
        ),
        accessToken: toStringOrNull(
          decryptQuiet(base.accessToken, { connectionId, provider, field: "accessToken" })
        ),
        refreshToken: toStringOrNull(
          decryptQuiet(base.refreshToken, { connectionId, provider, field: "refreshToken" })
        ),
      };
    }
    return decrypted;
  };

  return new Proxy(base, {
    get: (_target, prop: string | symbol) => {
      if (prop === "apiKey" || prop === "accessToken" || prop === "refreshToken") {
        return ensureDecrypted()[prop];
      }
      return Reflect.get(_target, prop);
    },
  });
}

const CREDENTIAL_FIELDS = new Set(["apiKey", "accessToken", "refreshToken", "idToken"]);

/**
 * Wraps a raw (ciphertext) DB row in a JS Proxy that decrypts credential
 * fields only on first access. Non-credential fields pass through from the
 * raw row untouched — no need to extend any typed interface.
 *
 * Returns Record<string, unknown> so it can replace getProviderConnections
 * without any caller changes. The typed createLazyConnectionView remains
 * available for new code that wants a structured view.
 */
export function createLazyRowProxy(row: Record<string, unknown>): Record<string, unknown> {
  let decrypted: Record<string, string | null | undefined> | undefined;

  const ensureDecrypted = () => {
    if (!decrypted) {
      const connectionId = typeof row.id === "string" ? row.id : "";
      const provider = typeof row.provider === "string" ? row.provider : "unknown";
      decrypted = {
        apiKey: lazyDecrypt(row.apiKey, { connectionId, provider, field: "apiKey" }),
        accessToken: lazyDecrypt(row.accessToken, { connectionId, provider, field: "accessToken" }),
        refreshToken: lazyDecrypt(row.refreshToken, { connectionId, provider, field: "refreshToken" }),
        idToken: lazyDecrypt(row.idToken, { connectionId, provider, field: "idToken" }),
      };
    }
    return decrypted;
  };

  return new Proxy(row, {
    get(target, prop) {
      if (typeof prop === "string" && CREDENTIAL_FIELDS.has(prop)) {
        return ensureDecrypted()[prop];
      }
      if (prop === "toJSON") {
        return () => {
          const result: Record<string, unknown> = {};
          for (const key of Object.keys(target)) {
            result[key] = CREDENTIAL_FIELDS.has(key) ? ensureDecrypted()[key] : target[key];
          }
          return result;
        };
      }
      return Reflect.get(target, prop);
    },
    ownKeys(target) {
      return Reflect.ownKeys(target);
    },
    getOwnPropertyDescriptor(target, prop) {
      return Reflect.getOwnPropertyDescriptor(target, prop);
    },
  });
}

function lazyDecrypt(
  value: unknown,
  meta: { connectionId: string; provider: string; field: string }
): string | null | undefined {
  if (typeof value !== "string") return undefined;
  return decryptQuiet(value, meta);
}
