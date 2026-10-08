/**
 * Cooldown manager — one place to see every connection that is out of routing for a
 * transient reason (connection cooldown, model lockout) and to lift those states in bulk,
 * instead of opening each provider page.
 *
 * Terminal states (banned / expired / credits_exhausted) are listed but never cleared here:
 * they need new credentials or an explicit operator reset, not a cooldown lift.
 */

import { getRawProviderConnections } from "@/lib/db/providers";
import { clearAccountError } from "@/sse/services/auth";
import {
  clearModelLock,
  cooldownUntilMs,
  getAllModelLockouts,
  type ModelLockoutInfo,
} from "@omniroute/open-sse/services/accountFallback";
import { clearRequestRejectedStreak } from "@omniroute/open-sse/services/requestRejectedStreak";

// Explicit whitelist: getRawProviderConnections() defaults to SELECT *, which would include
// tokens, keys, emails and provider_specific_data.
const COLUMNS = [
  "id",
  "provider",
  "name",
  "auth_type",
  "priority",
  "is_active",
  "test_status",
  "error_code",
  "last_error",
  "last_error_type",
  "last_error_at",
  "backoff_level",
  "rate_limited_until",
];

const CONNECTION_LIMIT = 1000;
const TERMINAL_STATUSES = new Set(["banned", "expired", "credits_exhausted"]);

export type CooldownStatus =
  "terminal" | "cooling_down" | "model_locked" | "unavailable" | "healthy";

export interface CooldownLockout {
  model: string;
  reason: string;
  remainingMs: number;
}

export interface CooldownConnection {
  id: string;
  provider: string;
  name: string | null;
  authType: string;
  priority: number;
  isActive: boolean;
  status: CooldownStatus;
  testStatus: string | null;
  rateLimitedUntil: string | null;
  cooldownRemainingMs: number;
  backoffLevel: number;
  errorCode: string | null;
  lastErrorType: string | null;
  lastErrorAt: string | null;
  lockouts: CooldownLockout[];
}

export interface ClearCooldownsRequest {
  connectionIds?: string[];
  /** Clear every non-terminal connection (optionally within `provider`). */
  all?: boolean;
  provider?: string;
}

export interface ClearCooldownsResult {
  cleared: number;
  unchanged: number;
  skippedTerminal: number;
  lockoutsCleared: number;
}

type ConnectionRow = Record<string, unknown>;

const text = (value: unknown): string | null =>
  value === null || value === undefined || value === "" ? null : String(value);

function remainingCooldownMs(rateLimitedUntil: string | null, now: number): number {
  if (!rateLimitedUntil) return 0;
  const remaining = cooldownUntilMs(rateLimitedUntil) - now;
  return Number.isFinite(remaining) ? Math.max(0, remaining) : 0;
}

function deriveStatus(
  testStatus: string | null,
  cooldownRemainingMs: number,
  lockoutCount: number
): CooldownStatus {
  if (testStatus && TERMINAL_STATUSES.has(testStatus)) return "terminal";
  if (cooldownRemainingMs > 0) return "cooling_down";
  if (lockoutCount > 0) return "model_locked";
  if (testStatus === "unavailable") return "unavailable";
  return "healthy";
}

function groupLockouts(lockouts: ModelLockoutInfo[]): Map<string, ModelLockoutInfo[]> {
  const byConnection = new Map<string, ModelLockoutInfo[]>();
  for (const lockout of lockouts) {
    const list = byConnection.get(lockout.connectionId) ?? [];
    list.push(lockout);
    byConnection.set(lockout.connectionId, list);
  }
  return byConnection;
}

function toCooldownConnection(
  row: ConnectionRow,
  lockouts: ModelLockoutInfo[],
  now: number
): CooldownConnection {
  const testStatus = text(row.testStatus)?.trim().toLowerCase() ?? null;
  const rateLimitedUntil = text(row.rateLimitedUntil);
  const cooldownRemainingMs = remainingCooldownMs(rateLimitedUntil, now);
  return {
    id: String(row.id ?? ""),
    provider: String(row.provider ?? ""),
    name: text(row.name),
    authType: String(row.authType ?? ""),
    priority: Number(row.priority ?? 0),
    isActive: Boolean(row.isActive),
    status: deriveStatus(testStatus, cooldownRemainingMs, lockouts.length),
    testStatus,
    rateLimitedUntil,
    cooldownRemainingMs,
    backoffLevel: Number(row.backoffLevel ?? 0),
    errorCode: text(row.errorCode),
    lastErrorType: text(row.lastErrorType),
    lastErrorAt: text(row.lastErrorAt),
    lockouts: lockouts.map((lockout) => ({
      model: lockout.model,
      reason: lockout.reason,
      remainingMs: lockout.remainingMs,
    })),
  };
}

async function loadRows(provider?: string): Promise<ConnectionRow[]> {
  return getRawProviderConnections(
    provider ? { provider } : {},
    CONNECTION_LIMIT,
    undefined,
    COLUMNS
  );
}

/** Every connection with its cooldown, lockout and terminal state, most constrained first. */
export async function listConnectionCooldowns(provider?: string): Promise<CooldownConnection[]> {
  const rows = await loadRows(provider);
  const lockouts = groupLockouts(getAllModelLockouts());
  const now = Date.now();
  return rows.map((row) => toCooldownConnection(row, lockouts.get(String(row.id)) ?? [], now));
}

function hasTransientError(row: ConnectionRow): boolean {
  return Boolean(
    row.rateLimitedUntil ||
    row.errorCode ||
    row.lastError ||
    row.lastErrorType ||
    (row.testStatus && row.testStatus !== "active")
  );
}

function selectTargets(rows: ConnectionRow[], request: ClearCooldownsRequest): ConnectionRow[] {
  if (request.all) return rows;
  const wanted = new Set(request.connectionIds ?? []);
  return rows.filter((row) => wanted.has(String(row.id)));
}

function clearLockoutsFor(connectionIds: Set<string>): number {
  let cleared = 0;
  for (const lockout of getAllModelLockouts()) {
    if (!connectionIds.has(lockout.connectionId)) continue;
    if (clearModelLock(lockout.provider, lockout.connectionId, lockout.model)) cleared += 1;
  }
  return cleared;
}

/** Lift connection cooldowns and model lockouts; terminal connections are left alone. */
export async function clearConnectionCooldowns(
  request: ClearCooldownsRequest
): Promise<ClearCooldownsResult> {
  const targets = selectTargets(await loadRows(request.provider), request);
  const result: ClearCooldownsResult = {
    cleared: 0,
    unchanged: 0,
    skippedTerminal: 0,
    lockoutsCleared: 0,
  };
  const clearedIds = new Set<string>();

  for (const row of targets) {
    const id = String(row.id);
    const testStatus = text(row.testStatus)?.trim().toLowerCase() ?? null;
    if (testStatus && TERMINAL_STATUSES.has(testStatus)) {
      result.skippedTerminal += 1;
      continue;
    }
    clearedIds.add(id);
    if (!hasTransientError(row)) {
      result.unchanged += 1;
      continue;
    }
    await clearAccountError(id, {
      testStatus,
      lastError: text(row.lastError),
      rateLimitedUntil: text(row.rateLimitedUntil),
      errorCode: row.errorCode as number | string | null,
      lastErrorType: text(row.lastErrorType),
    });
    clearRequestRejectedStreak(id);
    result.cleared += 1;
  }

  result.lockoutsCleared = clearLockoutsFor(clearedIds);
  return result;
}
