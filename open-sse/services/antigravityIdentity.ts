import crypto from "node:crypto";
import { createRequire } from "node:module";

export type AntigravityCredentialsLike = {
  accessToken?: string | null;
  connectionId?: string | null;
  email?: string | null;
  projectId?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
};

const FNV_OFFSET_I64 = -3750763034362895579n;
const FNV_PRIME_I64 = 1099511628211n;
const PROCESS_SESSION_ID = crypto.randomUUID();
const require = createRequire(import.meta.url);

type NodeMachineIdModule = {
  machineIdSync?: (original?: boolean) => string;
  default?: {
    machineIdSync?: (original?: boolean) => string;
  };
};

let systemMachineIdSync: ((original?: boolean) => string) | null = null;
try {
  const machineIdModule = require("node-machine-id") as NodeMachineIdModule;
  systemMachineIdSync =
    machineIdModule.machineIdSync ?? machineIdModule.default?.machineIdSync ?? null;
} catch {
  systemMachineIdSync = null;
}

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
  const max = 18446744073709551615n; // 2^64 - 1
  const target = 9_000_000_000_000_000_000n;
  // Rejection sampling: discard values in [limit, max] that would cause modulo bias.
  // Accepted range [0, limit) divides evenly by target, so value % target is uniform.
  const limit = max - (max % target);
  let value: bigint;
  do {
    value = crypto.randomBytes(8).readBigUInt64BE();
  } while (value >= limit);
  // lgtm[js/biased-cryptographic-random] — rejection sampling above eliminates bias
  return `-${(value % target).toString()}`; // nosemgrep: biased-cryptographic-random
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

export function deriveAntigravityMachineId(
  _credentials?: AntigravityCredentialsLike | null
): string | null {
  try {
    const systemMachineId = toNonEmptyString(systemMachineIdSync?.(true));
    if (systemMachineId) return systemMachineId;
  } catch {
    // Antigravity Manager omits x-machine-id when machine_uid cannot read the OS id.
  }

  return null;
}

export function getAntigravityVscodeSessionId(): string {
  return PROCESS_SESSION_ID;
}
