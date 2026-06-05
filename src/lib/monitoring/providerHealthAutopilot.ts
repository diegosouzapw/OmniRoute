import { createHash } from "crypto";

import {
  getProviderConnectionById,
  getProviderConnections,
  updateProviderConnection,
} from "@/lib/db/providers";
import { clearProviderFailure, clearModelLock } from "@omniroute/open-sse/services/accountFallback";

type JsonRecord = Record<string, unknown>;

export type ProviderAutopilotSeverity = "info" | "warning" | "critical";
export type ProviderAutopilotState = "healthy" | "degraded" | "down";
export type ProviderAutopilotStatus = "healthy" | "warning" | "critical";

export type ProviderAutopilotActionType =
  | "clear_provider_breaker"
  | "clear_connection_cooldown"
  | "clear_stale_connection_error"
  | "clear_model_lockout"
  | "reactivate_connection"
  | "deactivate_connection";

export interface ProviderAutopilotTarget {
  provider: string;
  connectionId?: string;
  model?: string;
}

export interface ProviderAutopilotAction {
  type: ProviderAutopilotActionType;
  label: string;
  risk: "low" | "medium" | "high";
  requiresConfirmation: boolean;
  target: ProviderAutopilotTarget;
  preconditionsHash: string;
}

export interface ProviderAutopilotIssue {
  id: string;
  severity: ProviderAutopilotSeverity;
  kind:
    | "provider_circuit_open"
    | "provider_circuit_half_open"
    | "connection_cooldown"
    | "stale_connection_error"
    | "terminal_connection_error"
    | "inactive_connection"
    | "model_lockout"
    | "quota_monitor_warning";
  title: string;
  recommendation: string;
  target: ProviderAutopilotTarget;
  evidence: JsonRecord;
  actions: ProviderAutopilotAction[];
}

export interface ProviderAutopilotProvider {
  provider: string;
  state: ProviderAutopilotState;
  score: number;
  signals: {
    circuitBreaker: JsonRecord | null;
    connections: {
      total: number;
      active: number;
      inactive: number;
      cooldown: number;
      terminal: number;
      staleErrors: number;
    };
    modelLockouts: number;
    quotaMonitor: JsonRecord | null;
  };
  issues: ProviderAutopilotIssue[];
}

export interface ProviderAutopilotReport {
  status: ProviderAutopilotStatus;
  checkedAt: string;
  summary: {
    providerCount: number;
    connectionCount: number;
    healthyCount: number;
    issueCount: number;
    actionableCount: number;
  };
  providers: ProviderAutopilotProvider[];
}

export interface ProviderAutopilotOptions {
  provider?: string | null;
  includeHealthy?: boolean;
  includeActions?: boolean;
}

export interface ExecuteProviderAutopilotActionInput {
  type: ProviderAutopilotActionType;
  target: ProviderAutopilotTarget;
  preconditionsHash: string;
  dryRun?: boolean;
  confirm?: boolean;
}

const TERMINAL_STATUSES = new Set(["banned", "expired", "credits_exhausted"]);
const OPEN_BREAKER_STATES = new Set(["OPEN", "HALF_OPEN"]);

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function parseTimeMs(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const numeric = Number(value);
    if (Number.isFinite(numeric)) return numeric;
    const parsed = new Date(value).getTime();
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((entry) => stableStringify(entry)).join(",")}]`;
  const record = value as JsonRecord;
  return `{${Object.keys(record)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`)
    .join(",")}}`;
}

function hashPreconditions(input: unknown): string {
  return createHash("sha256").update(stableStringify(input)).digest("hex").slice(0, 16);
}

function stableEvidenceForHash(evidence: JsonRecord): JsonRecord {
  const stable: JsonRecord = { ...evidence };
  delete stable.remainingMs;
  delete stable.retryAfterMs;
  return stable;
}

function targetMatches(left: ProviderAutopilotTarget, right: ProviderAutopilotTarget): boolean {
  return (
    left.provider === right.provider &&
    (left.connectionId ?? null) === (right.connectionId ?? null) &&
    (left.model ?? null) === (right.model ?? null)
  );
}

function action(
  type: ProviderAutopilotActionType,
  label: string,
  risk: ProviderAutopilotAction["risk"],
  target: ProviderAutopilotTarget,
  evidence: JsonRecord
): ProviderAutopilotAction {
  return {
    type,
    label,
    risk,
    requiresConfirmation: true,
    target,
    preconditionsHash: hashPreconditions({
      type,
      target,
      evidence: stableEvidenceForHash(evidence),
    }),
  };
}

function issueId(kind: ProviderAutopilotIssue["kind"], target: ProviderAutopilotTarget): string {
  return ["pha", kind, target.provider, target.connectionId, target.model]
    .filter(Boolean)
    .join("_")
    .replace(/[^a-zA-Z0-9_.:-]/g, "_");
}

function sanitizeConnectionLabel(connection: JsonRecord): string {
  const label =
    toString(connection.name) ||
    toString(connection.displayName) ||
    toString(connection.email) ||
    toString(connection.id) ||
    "connection";
  const masked = label.includes("@") ? label.replace(/^(.).+(@.+)$/, "$1***$2") : label;
  return masked.length > 80 ? `${masked.slice(0, 77)}…` : masked;
}

function isTerminalConnection(connection: JsonRecord): boolean {
  const status = toString(connection.testStatus)?.toLowerCase();
  const errorType = toString(connection.lastErrorType)?.toLowerCase();
  return Boolean(
    (status && TERMINAL_STATUSES.has(status)) || (errorType && TERMINAL_STATUSES.has(errorType))
  );
}

function isConnectionInCooldown(connection: JsonRecord, now: number): boolean {
  const until = parseTimeMs(connection.rateLimitedUntil);
  return Boolean(until && until > now);
}

function hasStaleConnectionError(connection: JsonRecord, now: number): boolean {
  if (isTerminalConnection(connection)) return false;
  if (isConnectionInCooldown(connection, now)) return false;
  const until = parseTimeMs(connection.rateLimitedUntil);
  const status = toString(connection.testStatus)?.toLowerCase();
  return Boolean(
    toString(connection.lastError) ||
    toString(connection.lastErrorType) ||
    toString(connection.errorCode) ||
    (until && until <= now) ||
    status === "unavailable" ||
    status === "error"
  );
}

function providerFromLockout(lockout: JsonRecord): string | null {
  return toString(lockout.provider);
}

function buildConnectionClearPatch(): JsonRecord {
  return {
    testStatus: "active",
    errorCode: null,
    lastError: null,
    lastErrorAt: null,
    lastErrorType: null,
    lastErrorSource: null,
    backoffLevel: 0,
    rateLimitedUntil: null,
  };
}

export async function buildProviderHealthAutopilotReport(
  options: ProviderAutopilotOptions = {}
): Promise<ProviderAutopilotReport> {
  const now = Date.now();
  const checkedAt = new Date(now).toISOString();
  const includeHealthy = options.includeHealthy === true;
  const includeActions = options.includeActions !== false;
  const providerFilter = toString(options.provider);

  const [{ getAllCircuitBreakerStatuses }, { getAllModelLockouts }, quotaMonitor] =
    await Promise.all([
      import("@/shared/utils/circuitBreaker"),
      import("@omniroute/open-sse/services/accountFallback"),
      import("@omniroute/open-sse/services/quotaMonitor.ts").catch(() => null),
    ]);

  const connections = (await getProviderConnections(
    providerFilter ? { provider: providerFilter } : {}
  )) as JsonRecord[];
  const breakers = getAllCircuitBreakerStatuses().filter((breaker) => {
    const name = toString((breaker as JsonRecord).name);
    if (!name || name.startsWith("test-") || name.startsWith("test_")) return false;
    return !providerFilter || name === providerFilter;
  });
  const lockouts = (getAllModelLockouts() as JsonRecord[]).filter((lockout) => {
    const provider = providerFromLockout(lockout);
    return provider && (!providerFilter || provider === providerFilter);
  });
  const quotaSnapshots = quotaMonitor?.getQuotaMonitorSnapshots
    ? (quotaMonitor.getQuotaMonitorSnapshots() as JsonRecord[]).filter((snapshot) => {
        const provider = toString(snapshot.provider);
        return provider && (!providerFilter || provider === providerFilter);
      })
    : [];

  const providerIds = new Set<string>();
  for (const connection of connections) {
    const provider = toString(connection.provider);
    if (provider) providerIds.add(provider);
  }
  for (const breaker of breakers) {
    const provider = toString((breaker as JsonRecord).name);
    if (provider) providerIds.add(provider);
  }
  for (const lockout of lockouts) {
    const provider = providerFromLockout(lockout);
    if (provider) providerIds.add(provider);
  }
  for (const snapshot of quotaSnapshots) {
    const provider = toString(snapshot.provider);
    if (provider) providerIds.add(provider);
  }
  if (providerFilter) providerIds.add(providerFilter);

  const providers: ProviderAutopilotProvider[] = [];
  for (const provider of [...providerIds].sort()) {
    const providerConnections = connections.filter(
      (connection) => connection.provider === provider
    );
    const breaker = breakers.find((entry) => (entry as JsonRecord).name === provider) as
      | JsonRecord
      | undefined;
    const providerLockouts = lockouts.filter(
      (lockout) => providerFromLockout(lockout) === provider
    );
    const providerQuota = quotaSnapshots.filter((snapshot) => snapshot.provider === provider);
    const issues: ProviderAutopilotIssue[] = [];

    if (breaker && OPEN_BREAKER_STATES.has(String(breaker.state))) {
      const target = { provider };
      const evidence = {
        state: breaker.state,
        failureCount: toNumber(breaker.failureCount) ?? 0,
        retryAfterMs: toNumber(breaker.retryAfterMs) ?? 0,
        lastFailureTime: breaker.lastFailureTime ?? null,
      };
      const isOpen = breaker.state === "OPEN";
      issues.push({
        id: issueId(isOpen ? "provider_circuit_open" : "provider_circuit_half_open", target),
        severity: isOpen ? "critical" : "warning",
        kind: isOpen ? "provider_circuit_open" : "provider_circuit_half_open",
        title: isOpen ? "Provider circuit breaker is open" : "Provider is probing recovery",
        recommendation: isOpen
          ? "Verify upstream recovery, then reset the provider circuit breaker or wait for the retry window."
          : "Let the next probe complete or reset the breaker after manual verification.",
        target,
        evidence,
        actions: includeActions
          ? [action("clear_provider_breaker", "Reset provider breaker", "medium", target, evidence)]
          : [],
      });
    }

    for (const connection of providerConnections) {
      const connectionId = toString(connection.id);
      if (!connectionId) continue;
      const target = { provider, connectionId };
      const label = sanitizeConnectionLabel(connection);
      const cooldownUntil = parseTimeMs(connection.rateLimitedUntil);
      const terminal = isTerminalConnection(connection);
      const evidence = {
        connectionId,
        label,
        testStatus: connection.testStatus ?? null,
        lastErrorType: connection.lastErrorType ?? null,
        lastErrorAt: connection.lastErrorAt ?? null,
        lastErrorHash: toString(connection.lastError)
          ? hashPreconditions(toString(connection.lastError))
          : null,
        errorCode: connection.errorCode ?? null,
        backoffLevel: connection.backoffLevel ?? null,
        updatedAt: connection.updatedAt ?? null,
        rateLimitedUntil: connection.rateLimitedUntil ?? null,
        remainingMs: cooldownUntil ? Math.max(0, cooldownUntil - now) : 0,
        isActive: connection.isActive !== false,
      };

      if (terminal) {
        issues.push({
          id: issueId("terminal_connection_error", target),
          severity: "critical",
          kind: "terminal_connection_error",
          title: `${label} has a terminal account state`,
          recommendation:
            "Check billing, re-authenticate, or replace the credential before reactivating it.",
          target,
          evidence,
          actions: [],
        });
      } else if (isConnectionInCooldown(connection, now)) {
        issues.push({
          id: issueId("connection_cooldown", target),
          severity: "warning",
          kind: "connection_cooldown",
          title: `${label} is in temporary cooldown`,
          recommendation:
            "Wait for the upstream retry window or clear the cooldown after validating recovery.",
          target,
          evidence,
          actions: includeActions
            ? [
                action(
                  "clear_connection_cooldown",
                  "Clear connection cooldown",
                  "medium",
                  target,
                  evidence
                ),
                action(
                  "deactivate_connection",
                  "Disable this connection",
                  "medium",
                  target,
                  evidence
                ),
              ]
            : [],
        });
      } else if (hasStaleConnectionError(connection, now)) {
        issues.push({
          id: issueId("stale_connection_error", target),
          severity: "info",
          kind: "stale_connection_error",
          title: `${label} has stale error state`,
          recommendation:
            "Clear stale error fields so the connection is eligible for normal routing again.",
          target,
          evidence,
          actions: includeActions
            ? [
                action(
                  "clear_stale_connection_error",
                  "Clear stale error state",
                  "low",
                  target,
                  evidence
                ),
              ]
            : [],
        });
      }

      if (connection.isActive === false && !terminal) {
        issues.push({
          id: issueId("inactive_connection", target),
          severity: "info",
          kind: "inactive_connection",
          title: `${label} is disabled`,
          recommendation: "Reactivate only if this was not intentionally disabled.",
          target,
          evidence,
          actions: includeActions
            ? [action("reactivate_connection", "Reactivate connection", "medium", target, evidence)]
            : [],
        });
      }
    }

    for (const lockout of providerLockouts) {
      const connectionId = toString(lockout.connectionId);
      const model = toString(lockout.model);
      if (!connectionId || !model) continue;
      const connection = providerConnections.find((entry) => entry.id === connectionId);
      const terminalConnection = connection ? isTerminalConnection(connection) : false;
      const target = { provider, connectionId, model };
      const evidence = {
        reason: lockout.reason ?? null,
        remainingMs: toNumber(lockout.remainingMs) ?? 0,
        failureCount: toNumber(lockout.failureCount) ?? 0,
        lockedAt: lockout.lockedAt ?? null,
        until: lockout.until ?? null,
        connectionExists: Boolean(connection),
        terminalConnection,
      };
      issues.push({
        id: issueId("model_lockout", target),
        severity: terminalConnection || !connection ? "info" : "warning",
        kind: "model_lockout",
        title: `${model} is locked out for one connection`,
        recommendation:
          terminalConnection || !connection
            ? "Resolve the connection state before clearing model-level lockouts."
            : "Clear the model lockout after confirming the model quota or availability recovered.",
        target,
        evidence,
        actions:
          includeActions && connection && !terminalConnection
            ? [action("clear_model_lockout", "Clear model lockout", "medium", target, evidence)]
            : [],
      });
    }

    for (const snapshot of providerQuota) {
      const status = toString(snapshot.status);
      if (!status || !["warning", "exhausted", "error"].includes(status)) continue;
      const connectionId = toString(snapshot.accountId) ?? undefined;
      const sessionId = toString(snapshot.sessionId) ?? undefined;
      const target = { provider, ...(connectionId ? { connectionId } : {}) };
      issues.push({
        id: issueId("quota_monitor_warning", {
          ...target,
          ...(sessionId ? { model: sessionId } : {}),
        }),
        severity: status === "warning" ? "warning" : "critical",
        kind: "quota_monitor_warning",
        title: `Quota monitor reports ${status}`,
        recommendation:
          "Review quota usage and rotate traffic to another healthy connection if needed.",
        target,
        evidence: {
          status,
          lastQuotaPercent: snapshot.lastQuotaPercent ?? null,
          consecutiveFailures: snapshot.consecutiveFailures ?? null,
        },
        actions: [],
      });
    }

    const activeConnections = providerConnections.filter(
      (connection) => connection.isActive !== false
    );
    const cooldownCount = providerConnections.filter((connection) =>
      isConnectionInCooldown(connection, now)
    ).length;
    const terminalCount = providerConnections.filter(isTerminalConnection).length;
    const staleErrors = providerConnections.filter((connection) =>
      hasStaleConnectionError(connection, now)
    ).length;
    const breakerPenalty =
      breaker?.state === "OPEN" ? 0.35 : breaker?.state === "HALF_OPEN" ? 0.2 : 0;
    const total = Math.max(1, providerConnections.length);
    const score = Math.max(
      0,
      Math.min(
        1,
        1 -
          breakerPenalty -
          (cooldownCount / total) * 0.25 -
          (terminalCount / total) * 0.35 -
          Math.min(0.2, providerLockouts.length * 0.05) -
          Math.min(0.1, staleErrors * 0.03)
      )
    );
    const hasCritical = issues.some((issue) => issue.severity === "critical");
    const state: ProviderAutopilotState =
      hasCritical || (providerConnections.length > 0 && activeConnections.length === 0)
        ? "down"
        : issues.length > 0
          ? "degraded"
          : "healthy";

    const item: ProviderAutopilotProvider = {
      provider,
      state,
      score: Number(score.toFixed(2)),
      signals: {
        circuitBreaker: breaker
          ? {
              state: breaker.state,
              failureCount: breaker.failureCount ?? 0,
              retryAfterMs: breaker.retryAfterMs ?? 0,
            }
          : null,
        connections: {
          total: providerConnections.length,
          active: activeConnections.length,
          inactive: providerConnections.filter((connection) => connection.isActive === false)
            .length,
          cooldown: cooldownCount,
          terminal: terminalCount,
          staleErrors,
        },
        modelLockouts: providerLockouts.length,
        quotaMonitor: providerQuota.length
          ? {
              warning: providerQuota.filter((snapshot) => snapshot.status === "warning").length,
              exhausted: providerQuota.filter((snapshot) => snapshot.status === "exhausted").length,
              errors: providerQuota.filter((snapshot) => snapshot.status === "error").length,
            }
          : null,
      },
      issues,
    };

    if (includeHealthy || item.issues.length > 0) providers.push(item);
  }

  const issueCount = providers.reduce((count, provider) => count + provider.issues.length, 0);
  const actionableCount = providers.reduce(
    (count, provider) =>
      count + provider.issues.reduce((sum, issue) => sum + issue.actions.length, 0),
    0
  );
  const healthyCount = providers.filter((provider) => provider.state === "healthy").length;
  const status: ProviderAutopilotStatus = providers.some((provider) => provider.state === "down")
    ? "critical"
    : providers.some((provider) => provider.state === "degraded")
      ? "warning"
      : "healthy";

  return {
    status,
    checkedAt,
    summary: {
      providerCount: providers.length,
      connectionCount: connections.length,
      healthyCount,
      issueCount,
      actionableCount,
    },
    providers,
  };
}

function findAction(
  report: ProviderAutopilotReport,
  input: ExecuteProviderAutopilotActionInput
): ProviderAutopilotAction | null {
  for (const provider of report.providers) {
    for (const issue of provider.issues) {
      const match = issue.actions.find(
        (candidate) =>
          candidate.type === input.type && targetMatches(candidate.target, input.target)
      );
      if (match) return match;
    }
  }
  return null;
}

export async function executeProviderHealthAutopilotAction(
  input: ExecuteProviderAutopilotActionInput
) {
  const provider = toString(input.target.provider);
  if (!provider) {
    return { status: 400, body: { success: false, error: "provider is required" } };
  }
  if (!input.confirm && !input.dryRun) {
    return { status: 400, body: { success: false, error: "confirm must be true" } };
  }

  const report = await buildProviderHealthAutopilotReport({
    provider,
    includeHealthy: true,
    includeActions: true,
  });
  const matchingAction = findAction(report, input);
  if (!matchingAction) {
    return { status: 404, body: { success: false, error: "action is not currently applicable" } };
  }
  if (matchingAction.preconditionsHash !== input.preconditionsHash) {
    return {
      status: 409,
      body: {
        success: false,
        error: "autopilot observation changed; refresh before applying this action",
        currentPreconditionsHash: matchingAction.preconditionsHash,
      },
    };
  }

  if (input.dryRun) {
    return {
      status: 200,
      body: {
        success: true,
        dryRun: true,
        action: input.type,
        target: matchingAction.target,
        checkedAt: new Date().toISOString(),
      },
    };
  }

  let changed: JsonRecord = {};
  switch (input.type) {
    case "clear_provider_breaker":
      clearProviderFailure(provider);
      changed = { circuitBreaker: "CLOSED" };
      break;
    case "clear_connection_cooldown":
    case "clear_stale_connection_error": {
      const connectionId = toString(input.target.connectionId);
      if (!connectionId) {
        return { status: 400, body: { success: false, error: "connectionId is required" } };
      }
      const connection = (await getProviderConnectionById(connectionId)) as JsonRecord | null;
      if (!connection || connection.provider !== provider) {
        return { status: 404, body: { success: false, error: "connection not found" } };
      }
      if (isTerminalConnection(connection)) {
        return { status: 409, body: { success: false, error: "terminal connection state" } };
      }
      await updateProviderConnection(connectionId, buildConnectionClearPatch());
      changed = buildConnectionClearPatch();
      break;
    }
    case "clear_model_lockout": {
      const connectionId = toString(input.target.connectionId);
      const model = toString(input.target.model);
      if (!connectionId || !model) {
        return {
          status: 400,
          body: { success: false, error: "connectionId and model are required" },
        };
      }
      const connection = (await getProviderConnectionById(connectionId)) as JsonRecord | null;
      if (!connection || connection.provider !== provider) {
        return { status: 404, body: { success: false, error: "connection not found" } };
      }
      if (isTerminalConnection(connection)) {
        return { status: 409, body: { success: false, error: "terminal connection state" } };
      }
      const removed = clearModelLock(provider, connectionId, model);
      if (!removed) {
        return {
          status: 409,
          body: { success: false, error: "model lockout changed; refresh before retrying" },
        };
      }
      changed = { removed };
      break;
    }
    case "reactivate_connection":
    case "deactivate_connection": {
      const connectionId = toString(input.target.connectionId);
      if (!connectionId) {
        return { status: 400, body: { success: false, error: "connectionId is required" } };
      }
      const connection = (await getProviderConnectionById(connectionId)) as JsonRecord | null;
      if (!connection || connection.provider !== provider) {
        return { status: 404, body: { success: false, error: "connection not found" } };
      }
      if (input.type === "reactivate_connection" && isTerminalConnection(connection)) {
        return { status: 409, body: { success: false, error: "terminal connection state" } };
      }
      const isActive = input.type === "reactivate_connection";
      await updateProviderConnection(connectionId, { isActive });
      changed = { isActive };
      break;
    }
  }

  return {
    status: 200,
    body: {
      success: true,
      dryRun: false,
      action: input.type,
      target: matchingAction.target,
      changed,
      checkedAt: new Date().toISOString(),
    },
  };
}
