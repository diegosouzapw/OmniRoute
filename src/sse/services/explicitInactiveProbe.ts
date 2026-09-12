import { updateProviderConnection } from "@/lib/db/providers";
import { EXPIRED_REPROBE_BLOCKLIST } from "@/lib/quota/connectionRecovery";

export const EXPLICIT_PROBE_BLOCKLIST = EXPIRED_REPROBE_BLOCKLIST;

export const RECOVERABLE_INACTIVE_TEST_STATUSES = new Set([
  "active",
  "success",
  "credits_exhausted",
  "unavailable",
  "error",
  "",
]);

export function isRecoverableInactiveConnection(
  conn: {
    isActive?: boolean;
    testStatus?: string | null;
    lastErrorType?: string | null;
    rateLimitedUntil?: string | null;
  },
  nowMs: number = Date.now()
): boolean {
  if (conn.isActive !== false) return false;
  const status = (conn.testStatus || "").trim().toLowerCase();
  if (status === "banned") return false;
  const err = (conn.lastErrorType || "").trim().toLowerCase();
  if (EXPLICIT_PROBE_BLOCKLIST.has(err)) return false;
  if (status === "expired") return true;
  if (status === "unavailable") {
    const until = conn.rateLimitedUntil;
    if (until) {
      const ms = Date.parse(until);
      if (Number.isFinite(ms) && ms > nowMs) return false;
    }
  }
  return RECOVERABLE_INACTIVE_TEST_STATUSES.has(status);
}

export function selectExplicitInactiveProbe(params: {
  forcedConnectionId: string | null;
  activeConnections: { id: string }[];
  pinnedRow: {
    id: string;
    provider?: string | null;
    isActive?: boolean;
    testStatus?: string | null;
    lastErrorType?: string | null;
    rateLimitedUntil?: string | null;
  } | null;
  providersToSearch: string[];
  allowedConnectionIds: string[] | null;
  nowMs: number;
  lastProbeAtMs: number | null;
  intervalMs: number;
}): { kind: "probe" } | { kind: "suppressed" } | { kind: "skip" } {
  const id = params.forcedConnectionId;
  if (!id) return { kind: "skip" };
  if (params.activeConnections.some((c) => c.id === id)) return { kind: "skip" };
  const row = params.pinnedRow;
  if (!row || row.id !== id) return { kind: "skip" };
  if (
    params.allowedConnectionIds &&
    params.allowedConnectionIds.length > 0 &&
    !params.allowedConnectionIds.includes(id)
  ) {
    return { kind: "skip" };
  }
  const prov = (row.provider || "").trim();
  if (prov && !params.providersToSearch.includes(prov)) return { kind: "skip" };
  if (!isRecoverableInactiveConnection(row, params.nowMs)) return { kind: "skip" };
  if (params.lastProbeAtMs != null && params.nowMs - params.lastProbeAtMs < params.intervalMs) {
    return { kind: "suppressed" };
  }
  return { kind: "probe" };
}

export const EXPLICIT_INACTIVE_PROBE_INTERVAL_MS = 60_000;
const MAX_PROBE_MAP = 4096;
const lastExplicitProbeAtMs = new Map<string, number>();

export function noteExplicitProbe(id: string, nowMs: number): void {
  lastExplicitProbeAtMs.set(id, nowMs);
  if (lastExplicitProbeAtMs.size > MAX_PROBE_MAP) {
    const oldest = lastExplicitProbeAtMs.keys().next().value;
    if (oldest !== undefined) lastExplicitProbeAtMs.delete(oldest);
  }
}

export function lastExplicitProbeTime(id: string): number | null {
  return lastExplicitProbeAtMs.get(id) ?? null;
}

export function resetExplicitProbeMapForTests(): void {
  lastExplicitProbeAtMs.clear();
}

export async function reactivateRecoveredConnection(connectionId: string): Promise<void> {
  await updateProviderConnection(connectionId, { isActive: true });
}

export async function maybeReactivateAfterExplicitProbe(
  input: {
    connectionId: string;
    reactivatedFromInactive?: boolean;
    explicitProbeSuppressed?: boolean;
    isShadowTraffic?: boolean;
    allowSuppressedConnections?: boolean;
    requestedModel?: string | null;
    provider?: string | null;
  },
  reactivate: (connectionId: string) => Promise<void> = reactivateRecoveredConnection
): Promise<void> {
  if (!input.reactivatedFromInactive) return;
  if (input.explicitProbeSuppressed) return;
  if (input.isShadowTraffic) return;
  if (input.allowSuppressedConnections) return;
  if (
    input.provider === "openrouter" &&
    typeof input.requestedModel === "string" &&
    input.requestedModel.includes(":free")
  ) {
    return;
  }
  await reactivate(input.connectionId);
}
