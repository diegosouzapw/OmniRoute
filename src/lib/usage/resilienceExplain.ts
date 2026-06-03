import pino from "pino";

import { isModelExcludedByConnection } from "@/domain/connectionModelRules";
import { getProviderConnections } from "@/lib/db/providers";
import { getCircuitBreaker } from "@/shared/utils/circuitBreaker";
import { getModelLockoutInfo } from "@omniroute/open-sse/services/accountFallback.ts";
import type {
  ResilienceAccountExplanation,
  ResilienceExplainState,
  ResilienceExplanation,
  ResilienceModelExplanation,
  ResilienceProviderExplanation,
  ResilienceSkipReason,
} from "@/shared/types/utilization";

type JsonRecord = Record<string, unknown>;

const logger = pino({ name: "resilience-explain" });

export type ProviderConnectionView = JsonRecord & {
  id?: string | null;
  provider?: string | null;
  testStatus?: string | null;
  rateLimitedUntil?: string | null;
  providerSpecificData?: unknown;
  lastErrorType?: string | null;
  errorCode?: string | number | null;
  backoffLevel?: number | null;
};

export interface InspectTargetResilienceOptions {
  provider: string;
  model: string;
  connectionId?: string | null;
  allowedConnectionIds?: string[] | null;
  providerConnections?: ProviderConnectionView[] | null;
  now?: number;
}

function asRecord(value: unknown): JsonRecord {
  if (value && typeof value === "object" && !Array.isArray(value)) return value as JsonRecord;
  if (typeof value !== "string") return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as JsonRecord)
      : {};
  } catch {
    return {};
  }
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function toNumberOrNull(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function normalizeStatus(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function retryAfter(until: string | null | undefined, now: number): number | null {
  if (!until) return null;
  const timestamp = new Date(until).getTime();
  if (!Number.isFinite(timestamp)) return null;
  return Math.max(0, timestamp - now);
}

function isTerminalStatus(status: string): boolean {
  return status === "credits_exhausted" || status === "banned" || status === "expired";
}

function getCodexModelScope(model: string | null | undefined): "gpt-5" | "gpt-5-codex" {
  const normalized = String(model || "").toLowerCase();
  return normalized.includes("codex") ? "gpt-5-codex" : "gpt-5";
}

function getCodexScopeRateLimitedUntil(
  providerSpecificData: unknown,
  model: string | null | undefined
): string | null {
  if (!model) return null;
  const data = asRecord(providerSpecificData);
  const scopeMap = asRecord(data.codexScopeRateLimitedUntil);
  const value = scopeMap[getCodexModelScope(model)];
  return toStringOrNull(value);
}

function buildProviderExplanation(provider: string): {
  provider: ResilienceProviderExplanation;
  skipReason: ResilienceSkipReason | null;
} {
  try {
    const status = getCircuitBreaker(provider).getStatus();
    const circuitBreakerState =
      status.state === "OPEN" || status.state === "HALF_OPEN" || status.state === "CLOSED"
        ? status.state
        : "UNKNOWN";
    const retryAfterMs = toNumberOrNull(status.retryAfterMs);
    const explanation: ResilienceProviderExplanation = {
      provider,
      state:
        circuitBreakerState === "OPEN"
          ? "skipped"
          : circuitBreakerState === "HALF_OPEN"
            ? "degraded"
            : "eligible",
      circuitBreakerState,
      retryAfterMs,
      failureCount: toNumberOrNull(status.failureCount),
      lastFailureTime: toNumberOrNull(status.lastFailureTime),
    };

    if (circuitBreakerState === "OPEN") {
      return {
        provider: explanation,
        skipReason: {
          scope: "provider",
          code: "provider_circuit_open",
          message: `Provider ${provider} is skipped because its circuit breaker is OPEN.`,
          retryAfterMs,
          evidence: {
            circuitBreakerState,
            failureCount: explanation.failureCount,
            lastFailureTime: explanation.lastFailureTime,
          },
        },
      };
    }

    if (circuitBreakerState === "HALF_OPEN") {
      return {
        provider: explanation,
        skipReason: {
          scope: "provider",
          code: "provider_circuit_half_open",
          message: `Provider ${provider} is in HALF_OPEN probe mode; routing may limit traffic until recovery is confirmed.`,
          retryAfterMs,
          evidence: {
            circuitBreakerState,
            failureCount: explanation.failureCount,
            lastFailureTime: explanation.lastFailureTime,
          },
        },
      };
    }

    return { provider: explanation, skipReason: null };
  } catch (error) {
    logger.warn(
      { err: error, provider },
      "Provider circuit breaker state could not be inspected for resilience explanation"
    );
    return {
      provider: {
        provider,
        state: "unknown",
        circuitBreakerState: "UNKNOWN",
        retryAfterMs: null,
        failureCount: null,
        lastFailureTime: null,
      },
      skipReason: {
        scope: "provider",
        code: "inspector_error",
        message: `Provider ${provider} circuit breaker state could not be inspected.`,
        evidence: { error: error instanceof Error ? error.name : typeof error },
      },
    };
  }
}

function accountReason(
  connection: ProviderConnectionView,
  options: Required<Pick<InspectTargetResilienceOptions, "provider" | "model">> & {
    connectionId: string | null;
    allowedIds: Set<string> | null;
    now: number;
  }
): { state: ResilienceExplainState; reason: ResilienceSkipReason | null } {
  const connectionId = toStringOrNull(connection.id) || "unknown";
  if (options.allowedIds && !options.allowedIds.has(connectionId)) {
    return {
      state: "skipped",
      reason: {
        scope: "connection",
        code: "connection_not_allowed",
        connectionId,
        message: `Connection ${connectionId} is not part of the inspected target's allowed connection set.`,
      },
    };
  }

  if (options.connectionId && connectionId !== options.connectionId) {
    return {
      state: "skipped",
      reason: {
        scope: "connection",
        code: "connection_not_allowed",
        connectionId,
        message: `Connection ${connectionId} is not the connection pinned by this combo target.`,
      },
    };
  }

  if (isModelExcludedByConnection(options.model, connection.providerSpecificData)) {
    return {
      state: "skipped",
      reason: {
        scope: "model",
        code: "model_excluded",
        connectionId,
        message: `Model ${options.model} is excluded by this connection's model rules.`,
      },
    };
  }

  const cooldownMs = retryAfter(connection.rateLimitedUntil, options.now);
  if (cooldownMs !== null && cooldownMs > 0) {
    return {
      state: "skipped",
      reason: {
        scope: "connection",
        code: "connection_cooldown",
        connectionId,
        message: `Connection ${connectionId} is in cooldown until ${connection.rateLimitedUntil}.`,
        retryAfterMs: cooldownMs,
        evidence: {
          rateLimitedUntil: connection.rateLimitedUntil,
          lastErrorType: connection.lastErrorType ?? null,
          errorCode: connection.errorCode ?? null,
          backoffLevel: connection.backoffLevel ?? null,
        },
      },
    };
  }

  const status = normalizeStatus(connection.testStatus);
  if (isTerminalStatus(status)) {
    return {
      state: "skipped",
      reason: {
        scope: "connection",
        code: "connection_terminal_status",
        connectionId,
        message: `Connection ${connectionId} is skipped because it has terminal status ${status}.`,
        evidence: {
          testStatus: status,
          lastErrorType: connection.lastErrorType ?? null,
          errorCode: connection.errorCode ?? null,
        },
      },
    };
  }

  if (status === "unavailable") {
    return {
      state: "degraded",
      reason: {
        scope: "connection",
        code: "connection_unavailable",
        connectionId,
        message: `Connection ${connectionId} is marked unavailable and may be degraded for this target.`,
        evidence: {
          testStatus: status,
          lastErrorType: connection.lastErrorType ?? null,
          errorCode: connection.errorCode ?? null,
          backoffLevel: connection.backoffLevel ?? null,
        },
      },
    };
  }

  const codexUntil =
    options.provider === "codex"
      ? getCodexScopeRateLimitedUntil(connection.providerSpecificData, options.model)
      : null;
  const codexCooldownMs = retryAfter(codexUntil, options.now);
  if (codexCooldownMs !== null && codexCooldownMs > 0) {
    return {
      state: "skipped",
      reason: {
        scope: "model",
        code: "codex_scope_cooldown",
        connectionId,
        message: `Codex scope for ${options.model} is in cooldown until ${codexUntil}.`,
        retryAfterMs: codexCooldownMs,
        evidence: { rateLimitedUntil: codexUntil, scope: getCodexModelScope(options.model) },
      },
    };
  }

  const lockout = getModelLockoutInfo(options.provider, connectionId, options.model);
  if (lockout) {
    return {
      state: "skipped",
      reason: {
        scope: "model",
        code: "model_lockout",
        connectionId,
        message: `Model ${options.model} is locked out on connection ${connectionId}.`,
        retryAfterMs: Math.max(0, lockout.remainingMs),
        evidence: {
          reason: lockout.reason,
          failureCount: lockout.failureCount,
          lockedAt: lockout.lockedAt,
        },
      },
    };
  }

  return { state: "eligible", reason: null };
}

function buildAccountExplanation(
  connection: ProviderConnectionView,
  state: ResilienceExplainState,
  reason: ResilienceSkipReason | null
): ResilienceAccountExplanation {
  return {
    connectionId: toStringOrNull(connection.id) || "unknown",
    state,
    reasonCode: reason?.code ?? null,
    retryAfterMs: reason?.retryAfterMs ?? null,
    testStatus: toStringOrNull(connection.testStatus),
    lastErrorType: toStringOrNull(connection.lastErrorType),
    errorCode:
      typeof connection.errorCode === "string" || typeof connection.errorCode === "number"
        ? connection.errorCode
        : null,
    backoffLevel: toNumberOrNull(connection.backoffLevel),
  };
}

function buildModelExplanation(
  provider: string,
  model: string,
  connectionId: string
): ResilienceModelExplanation | null {
  const lockout = getModelLockoutInfo(provider, connectionId, model);
  if (!lockout) return null;
  return {
    provider,
    model,
    connectionId,
    state: "skipped",
    reason: lockout.reason,
    retryAfterMs: Math.max(0, lockout.remainingMs),
    failureCount: lockout.failureCount,
    lockedAt: lockout.lockedAt,
  };
}

function summarize(explanation: Omit<ResilienceExplanation, "summary">): string[] {
  const lines: string[] = [];
  if (explanation.provider.circuitBreakerState !== "CLOSED") {
    lines.push(
      `Provider circuit breaker is ${explanation.provider.circuitBreakerState.toLowerCase()}.`
    );
  }
  const skippedAccounts = explanation.accounts.filter((account) => account.state === "skipped");
  if (skippedAccounts.length > 0) {
    lines.push(
      `${skippedAccounts.length}/${explanation.accounts.length} inspected account(s) skipped.`
    );
  }
  if (explanation.models.length > 0) {
    lines.push(`${explanation.models.length} active model lockout(s) affect this target.`);
  }
  if (explanation.skipReasons.length === 0) {
    lines.push("No active resilience block was found for this target at inspection time.");
  }
  return lines;
}

export async function inspectTargetResilience(
  options: InspectTargetResilienceOptions
): Promise<ResilienceExplanation> {
  const now = options.now ?? Date.now();
  const providerInspection = buildProviderExplanation(options.provider);
  const skipReasons: ResilienceSkipReason[] = [];
  if (providerInspection.skipReason) skipReasons.push(providerInspection.skipReason);

  try {
    const connections =
      options.providerConnections ??
      ((await getProviderConnections({
        provider: options.provider,
        isActive: true,
      })) as ProviderConnectionView[]);
    const allowedIds = options.allowedConnectionIds
      ? new Set(options.allowedConnectionIds.filter((id) => typeof id === "string" && id))
      : null;
    const accountExplanations: ResilienceAccountExplanation[] = [];
    const modelExplanations: ResilienceModelExplanation[] = [];

    if (connections.length === 0) {
      skipReasons.push({
        scope: "connection",
        code: "no_active_connection",
        message: `No active provider connection is configured for ${options.provider}.`,
      });
    }

    for (const connection of connections) {
      const connectionId = toStringOrNull(connection.id) || "unknown";
      const { state, reason } = accountReason(connection, {
        provider: options.provider,
        model: options.model,
        connectionId: options.connectionId ?? null,
        allowedIds,
        now,
      });
      if (reason) skipReasons.push(reason);
      accountExplanations.push(buildAccountExplanation(connection, state, reason));
      if (reason?.code === "connection_not_allowed") continue;
      const modelExplanation = buildModelExplanation(options.provider, options.model, connectionId);
      if (modelExplanation) modelExplanations.push(modelExplanation);
    }

    const hasUsableAccount = accountExplanations.some((account) => account.state !== "skipped");
    const hasDegradedAccount = accountExplanations.some((account) => account.state === "degraded");
    const targetState: ResilienceExplainState =
      providerInspection.provider.state === "skipped" || !hasUsableAccount
        ? "skipped"
        : providerInspection.provider.state === "degraded" || hasDegradedAccount
          ? "degraded"
          : "eligible";

    const explanation = {
      provider: providerInspection.provider,
      accounts: accountExplanations,
      models: modelExplanations,
      skipReasons,
      targetState,
    };

    return {
      ...explanation,
      summary: summarize(explanation),
    };
  } catch (error) {
    logger.warn(
      { err: error, provider: options.provider, model: options.model },
      "Provider connections could not be inspected for resilience explanation"
    );
    skipReasons.push({
      scope: "connection",
      code: "inspector_error",
      message: `Connections for provider ${options.provider} could not be inspected.`,
      evidence: { error: error instanceof Error ? error.name : typeof error },
    });
    const explanation = {
      provider: providerInspection.provider,
      accounts: [],
      models: [],
      skipReasons,
      targetState: "unknown" as ResilienceExplainState,
    };
    return {
      ...explanation,
      summary: summarize(explanation),
    };
  }
}
