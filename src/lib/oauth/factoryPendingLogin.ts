import { createHash, randomBytes } from "node:crypto";

export const PENDING_LOGIN_TTL_MS = 5 * 60 * 1000; // 5 minutes
export const MAX_PENDING_SESSIONS = 100;
export const TOKEN_EXPIRY_SKEW_MS = 60_000;
export const DEFAULT_TOKEN_LIFETIME_MS = 5 * 60 * 1000;

const STORE_KEY = "__factoryPendingLoginStore";

export interface FactoryGrantData {
  accessToken: string;
  refreshToken: string;
  expiresAtMs: number;
}

export type FactoryPendingLoginStatus = "pending" | "claiming";

export interface FactoryPendingLoginRecord {
  organizationSession: string;
  organizations: string[];
  initialGrant: FactoryGrantData;
  candidateGrant?: FactoryGrantData;
  selectedOrganizationId?: string;
  status: FactoryPendingLoginStatus;
  deviceCodeHash: string;
  connectionId?: string;
  ownerBinding?: string;
  expiresAt: number;
}

export interface CreatePendingLoginParams {
  initialGrant: FactoryGrantData;
  organizations: string[];
  deviceCode: string;
  connectionId?: string;
  ownerBinding?: string;
}

export interface ClaimPendingLoginParams {
  organizationSession: string;
  organizationId: string;
  deviceCode: string;
  connectionId?: string;
  ownerBinding?: string;
}

export type ClaimPendingLoginResult =
  | { success: true; record: FactoryPendingLoginRecord }
  | {
      success: false;
      error:
        | "pending_login_expired"
        | "login_in_progress"
        | "invalid_owner"
        | "invalid_device_code"
        | "invalid_connection"
        | "invalid_organization"
        | "organization_mismatch";
      status: 409 | 410;
      message: string;
    };

function getStore(): Map<string, FactoryPendingLoginRecord> {
  const g = globalThis as unknown as { [STORE_KEY]?: Map<string, FactoryPendingLoginRecord> };
  if (!g[STORE_KEY]) {
    g[STORE_KEY] = new Map<string, FactoryPendingLoginRecord>();
  }
  return g[STORE_KEY]!;
}

function pruneExpired(store: Map<string, FactoryPendingLoginRecord>, now: number): void {
  for (const [session, record] of store.entries()) {
    if (record.expiresAt <= now) {
      store.delete(session);
    }
  }
}

export function hashDeviceCode(deviceCode: string): string {
  return createHash("sha256").update(deviceCode).digest("hex");
}

export function createPendingLogin(params: CreatePendingLoginParams): string {
  const store = getStore();
  const now = Date.now();
  pruneExpired(store, now);

  if (store.size >= MAX_PENDING_SESSIONS) {
    throw new Error("Capacity exceeded: too many pending Factory login sessions");
  }

  const organizationSession = randomBytes(32).toString("base64url");
  const deviceCodeHash = hashDeviceCode(params.deviceCode);

  const record: FactoryPendingLoginRecord = {
    organizationSession,
    organizations: [...params.organizations],
    initialGrant: {
      accessToken: params.initialGrant.accessToken,
      refreshToken: params.initialGrant.refreshToken,
      expiresAtMs: params.initialGrant.expiresAtMs,
    },
    status: "pending",
    deviceCodeHash,
    connectionId: params.connectionId,
    ownerBinding: params.ownerBinding,
    expiresAt: now + PENDING_LOGIN_TTL_MS,
  };

  store.set(organizationSession, record);
  return organizationSession;
}

export function claimPendingLogin(params: ClaimPendingLoginParams): ClaimPendingLoginResult {
  const store = getStore();
  const now = Date.now();
  pruneExpired(store, now);

  const record = store.get(params.organizationSession);
  if (!record || record.expiresAt <= now) {
    return {
      success: false,
      error: "pending_login_expired",
      status: 410,
      message: "Pending Factory login session expired or not found",
    };
  }

  if (record.status === "claiming") {
    return {
      success: false,
      error: "login_in_progress",
      status: 409,
      message: "Factory organization selection is already being processed",
    };
  }

  if (record.ownerBinding && record.ownerBinding !== params.ownerBinding) {
    return {
      success: false,
      error: "invalid_owner",
      status: 409,
      message: "Owner binding mismatch for pending login session",
    };
  }

  const deviceCodeHash = hashDeviceCode(params.deviceCode);
  if (record.deviceCodeHash !== deviceCodeHash) {
    return {
      success: false,
      error: "invalid_device_code",
      status: 409,
      message: "Device code mismatch for pending login session",
    };
  }

  if (record.connectionId !== params.connectionId) {
    return {
      success: false,
      error: "invalid_connection",
      status: 409,
      message: "Connection ID mismatch for pending login session",
    };
  }

  if (!record.organizations.includes(params.organizationId)) {
    return {
      success: false,
      error: "invalid_organization",
      status: 409,
      message: "Selected organization ID is not in authorized membership list",
    };
  }

  if (record.selectedOrganizationId && record.selectedOrganizationId !== params.organizationId) {
    return {
      success: false,
      error: "organization_mismatch",
      status: 409,
      message: "Cannot change selected organization after scoping started",
    };
  }

  record.status = "claiming";
  record.selectedOrganizationId = params.organizationId;

  return { success: true, record };
}

export function releasePendingLogin(
  organizationSession: string,
  candidateGrant?: FactoryGrantData
): boolean {
  const store = getStore();
  const record = store.get(organizationSession);
  if (!record) return false;

  record.status = "pending";
  if (candidateGrant) {
    record.candidateGrant = {
      accessToken: candidateGrant.accessToken,
      refreshToken: candidateGrant.refreshToken,
      expiresAtMs: candidateGrant.expiresAtMs,
    };
  }
  return true;
}

export function deletePendingLogin(organizationSession: string): boolean {
  const store = getStore();
  return store.delete(organizationSession);
}

export function peekPendingLogin(organizationSession: string): FactoryPendingLoginRecord | null {
  const store = getStore();
  const now = Date.now();
  pruneExpired(store, now);
  const record = store.get(organizationSession);
  if (!record || record.expiresAt <= now) return null;
  return record;
}

export function buildOrganizationSelectionRequiredResponse(
  organizationSession: string,
  organizations: string[]
) {
  return {
    success: false,
    error: "organization_selection_required",
    organizationSession,
    organizations,
  };
}

export function decodeJwtPayload(accessToken: string): Record<string, unknown> | null {
  const [, payloadSegment] = accessToken.split(".");
  if (!payloadSegment) return null;

  try {
    const base64 = payloadSegment.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const json = Buffer.from(padded, "base64").toString("utf8");
    const parsed = JSON.parse(json);
    return typeof parsed === "object" && parsed !== null
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

export function organizationIdFromAccessToken(accessToken: string): string | undefined {
  const payload = decodeJwtPayload(accessToken);
  if (!payload) return undefined;
  const claims = [
    "external_org_id",
    "org_id",
    "organization_id",
    "organizationId",
    "orgId",
  ] as const;
  for (const claim of claims) {
    const val = payload[claim];
    if (typeof val === "string" && val.trim().length > 0) {
      return val.trim();
    }
  }
  return undefined;
}

export function emailFromAccessToken(accessToken: string): string | undefined {
  const payload = decodeJwtPayload(accessToken);
  if (!payload) return undefined;
  const email = payload.email;
  return typeof email === "string" && email.trim().length > 0 ? email.trim() : undefined;
}

export function expiresFromAccessToken(accessToken: string): number | undefined {
  const payload = decodeJwtPayload(accessToken);
  if (!payload) return undefined;
  const exp = payload.exp;
  if (typeof exp === "number" && Number.isFinite(exp) && exp > 0) {
    return exp * 1000 - TOKEN_EXPIRY_SKEW_MS;
  }
  return undefined;
}

export function computeExpiresAtMs(expiresInSeconds?: number | null, accessToken?: string): number {
  if (
    typeof expiresInSeconds === "number" &&
    Number.isFinite(expiresInSeconds) &&
    expiresInSeconds > 0
  ) {
    return Date.now() + expiresInSeconds * 1000 - TOKEN_EXPIRY_SKEW_MS;
  }
  if (accessToken) {
    const jwtExp = expiresFromAccessToken(accessToken);
    if (typeof jwtExp === "number" && Number.isFinite(jwtExp)) {
      return jwtExp;
    }
  }
  return Date.now() + DEFAULT_TOKEN_LIFETIME_MS;
}

export function computeExpiresInSeconds(expiresAtMs: number, now = Date.now()): number {
  return Math.max(1, Math.floor((expiresAtMs - now) / 1000));
}
