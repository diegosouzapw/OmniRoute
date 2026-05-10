import crypto from "node:crypto";
import os from "node:os";

type AntigravityCredentialsLike = {
  accessToken?: string | null;
  connectionId?: string | null;
  email?: string | null;
  projectId?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
};

const FNV_OFFSET_I64 = -3750763034362895579n;
const FNV_PRIME_I64 = 1099511628211n;
const PROCESS_SESSION_ID = crypto.randomUUID();

function toNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function getProviderDataString(
  credentials: AntigravityCredentialsLike | null | undefined,
  key: string
): string | null {
  const data = credentials?.providerSpecificData;
  return data && typeof data === "object" ? toNonEmptyString(data[key]) : null;
}

export function getAntigravityAccountKey(
  credentials?: AntigravityCredentialsLike | null
): string | null {
  return (
    toNonEmptyString(credentials?.email) ||
    getProviderDataString(credentials, "email") ||
    getProviderDataString(credentials, "accountId") ||
    toNonEmptyString(credentials?.connectionId) ||
    null
  );
}

export function isAntigravityEnterpriseAccount(
  credentials?: AntigravityCredentialsLike | null
): boolean {
  const email =
    toNonEmptyString(credentials?.email) || getProviderDataString(credentials, "email") || "";
  return !!email && !/@(?:gmail|googlemail)\.com$/i.test(email);
}

export function getAntigravityEnvelopeUserAgent(
  credentials?: AntigravityCredentialsLike | null
): "antigravity" | "jetski" {
  return isAntigravityEnterpriseAccount(credentials) ? "jetski" : "antigravity";
}

export function generateAntigravityRequestId(): string {
  return `agent/${Date.now()}/${crypto.randomBytes(4).toString("hex")}`;
}

export function generateAntigravitySessionId(): string {
  const bytes = crypto.randomBytes(8);
  const value = bytes.readBigUInt64BE() % 9_000_000_000_000_000_000n;
  return `-${value.toString()}`;
}

export function deriveAntigravitySessionId(accountKey?: string | null): string | null {
  const key = toNonEmptyString(accountKey);
  if (!key) return null;

  let hash = FNV_OFFSET_I64;
  for (const byte of Buffer.from(key, "utf8")) {
    hash = BigInt.asIntN(64, hash ^ BigInt(byte));
    hash = BigInt.asIntN(64, hash * FNV_PRIME_I64);
  }
  return hash.toString();
}

export function getAntigravitySessionId(
  credentials?: AntigravityCredentialsLike | null,
  fallback?: unknown
): string {
  return (
    deriveAntigravitySessionId(getAntigravityAccountKey(credentials)) ||
    toNonEmptyString(fallback) ||
    generateAntigravitySessionId()
  );
}

const STABLE_MACHINE_ID = crypto
  .createHash("sha256")
  .update(`omniroute:machine_id:${os.hostname()}`)
  .digest("hex");

const FORMATTED_MACHINE_ID = [
  STABLE_MACHINE_ID.slice(0, 8),
  STABLE_MACHINE_ID.slice(8, 12),
  STABLE_MACHINE_ID.slice(12, 16),
  STABLE_MACHINE_ID.slice(16, 20),
  STABLE_MACHINE_ID.slice(20, 32),
].join("-");

export function deriveAntigravityMachineId(
  _credentials?: AntigravityCredentialsLike | null
): string {
  return FORMATTED_MACHINE_ID;
}

export function getAntigravityVscodeSessionId(): string {
  return PROCESS_SESSION_ID;
}
