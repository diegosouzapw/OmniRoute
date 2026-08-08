import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getRawProviderConnections, getProviderConnectionsCount } from "@/lib/db/providers";
import { getAllCircuitBreakerStatuses } from "@/shared/utils/circuitBreaker";
import { resolveProviderId } from "@/shared/constants/providers";
import { TERMINAL_CONNECTION_STATUSES } from "@/lib/quota/connectionRecovery";
import { sanitizeErrorMessage, buildErrorBody } from "@omniroute/open-sse/utils/error";
import {
  getAllModelLockouts,
  cooldownUntilMs,
  type ModelLockoutInfo,
} from "@omniroute/open-sse/services/accountFallback";
import type {
  ResilienceConnectionsResponse,
  ConnectionState,
  BreakerWithHistory,
} from "@/types/resilience";

// Explicit column whitelist -- getRawProviderConnections() DEFAULTS TO SELECT *,
// so passing columns is MANDATORY to avoid leaking api_key, access_token,
// refresh_token, id_token, email, scope, project_id, provider_specific_data, last_error.
const CONNECTION_COLUMNS: string[] = [
  "id",
  "provider",
  "name",
  "auth_type",
  "priority",
  "is_active",
  "test_status",
  "error_code",
  "last_error_type",
  "last_error_at",
  "backoff_level",
  "rate_limited_until",
  "last_used_at",
];

const CONNECTION_LIMIT = 1000; // shared with UI cap indicator

const querySchema = z.object({
  windowMs: z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
    z.coerce.number().int().min(0).max(86400000).default(3600000)
  ),
  provider: z.string().trim().min(1).max(64).optional(),
});

function categorizeErrorCode(code: string | number): string {
  const s = String(code).toLowerCase();
  if (s.includes("rate") || s.includes("429") || s.includes("quota")) return "rate_limit";
  if (s.includes("auth") || s.includes("401") || s.includes("403") || s.includes("key"))
    return "auth";
  if (s.includes("500") || s.includes("502") || s.includes("503") || s.includes("504"))
    return "server";
  if (s.includes("404") || s.includes("not_found") || s.includes("model")) return "not_found";
  return "other";
}

function toConnectionState(
  row: Record<string, unknown>,
  breakersMap: Map<string, BreakerWithHistory>,
  lockoutsMap: Map<string, ModelLockoutInfo[]>,
  now: number // server timestamp captured before fetch (avoids drift)
): ConnectionState {
  // getRawProviderConnections returns camelCase keys (via rowToCamel)
  const provider = String(row.provider ?? "");
  const breaker = breakersMap.get(resolveProviderId(provider)) ?? null;
  const lockouts = lockoutsMap.get(String(row.id ?? "")) ?? [];
  const testStatus = row.testStatus ? String(row.testStatus).trim().toLowerCase() : null; // normalize to match TERMINAL_CONNECTION_STATUSES
  const rateLimitedUntil = row.rateLimitedUntil ? String(row.rateLimitedUntil) : null;
  // cooldownUntilMs() handles both ISO strings and numeric epoch TEXT (#3954)
  const rawCooldown = rateLimitedUntil ? cooldownUntilMs(rateLimitedUntil) - now : 0;
  const cooldownRemainingMs = Number.isFinite(rawCooldown) ? Math.max(0, rawCooldown) : 0;

  // Derive connection status for UI badge (terminal states take priority over cooldown)
  let connectionStatus: ConnectionState["connectionStatus"] = "healthy";
  if (testStatus && TERMINAL_CONNECTION_STATUSES.has(testStatus)) {
    connectionStatus = "terminal"; // permanent unavailability takes priority
  } else if (breaker?.state === "OPEN") {
    connectionStatus = "circuit_open";
  } else if (cooldownRemainingMs > 0) {
    connectionStatus = "cooling_down";
  }

  return {
    id: String(row.id ?? ""),
    provider,
    name: row.name != null && row.name !== "" ? String(row.name) : null,
    authType: String(row.authType ?? ""),
    priority: Number(row.priority ?? 0),
    isActive: Boolean(row.isActive),
    connectionStatus,
    rateLimitedUntil,
    backoffLevel: Number(row.backoffLevel ?? 0),
    testStatus,
    lastErrorType: row.lastErrorType ? String(row.lastErrorType) : null,
    lastErrorAt: row.lastErrorAt ? String(row.lastErrorAt) : null,
    errorCode: row.errorCode != null ? categorizeErrorCode(String(row.errorCode)) : null, // coarse category, not raw upstream code
    lastUsedAt: row.lastUsedAt ? String(row.lastUsedAt) : null,
    cooldownRemainingMs,
    isCoolingDown: cooldownRemainingMs > 0,
    breaker: breaker
      ? {
          state: breaker.state,
          failureCount: breaker.failureCount,
          retryAfterMs: breaker.retryAfterMs,
          lastFailureKind: breaker.lastFailureKind,
        }
      : null,
    lockouts: lockouts.map((l) => ({
      model: l.model,
      reason: l.reason,
      remainingMs: l.remainingMs,
    })),
  };
}

export async function GET(req: NextRequest) {
  try {
    const params = querySchema.safeParse(Object.fromEntries(new URL(req.url).searchParams));
    if (!params.success) {
      return NextResponse.json(
        buildErrorBody(400, params.error.issues[0]?.message ?? "Invalid query parameters"),
        { status: 400 }
      );
    }
    const { windowMs, provider } = params.data;

    const degraded: string[] = [];

    // Fetch all three sources independently (partial degradation)
    let rawConnections: Record<string, unknown>[] = [];
    try {
      rawConnections = await getRawProviderConnections(
        { provider },
        CONNECTION_LIMIT,
        undefined,
        CONNECTION_COLUMNS
      );
    } catch (err) {
      degraded.push("database");
      console.error("[API] resilience/connections database error:", err);
    }

    // NOTE: getAllCircuitBreakerStatuses() calls getStatus() internally. If a single
    // getStatus() throws (e.g., onStateChange callback error), the entire function
    // throws before reaching our loop. This is an accepted limitation - per-item
    // fault tolerance is not possible with the current getAllCircuitBreakerStatuses()
    // API. The outer try/catch handles this case.
    let breakers: BreakerWithHistory[] = [];
    try {
      const allStatuses = getAllCircuitBreakerStatuses();
      breakers = allStatuses.map((status) => ({
        name: status.name,
        state: status.state,
        failureCount: status.failureCount,
        retryAfterMs: status.retryAfterMs,
        lastFailureKind: status.lastFailureKind,
        transitionHistory: status.transitionHistory ?? [],
      }));
    } catch (err) {
      degraded.push("circuitBreaker");
      console.error("[API] resilience/connections breaker module error:", err);
    }

    // Capture window timestamps AFTER source fetches complete (includes lazy recovery transitions)
    const now = Date.now();
    const sinceMs = windowMs ? now - windowMs : 0;
    // Apply window filter to all breakers.
    // Both `now` and breaker transition timestamps come from the same Node.js process,
    // so clock skew is negligible -- no future-buffer needed.
    breakers = breakers.map((b) => ({
      ...b,
      transitionHistory:
        windowMs > 0
          ? b.transitionHistory.filter((tr) => tr.timestamp >= sinceMs && tr.timestamp <= now)
          : b.transitionHistory,
    }));

    let lockouts: ModelLockoutInfo[] = [];
    try {
      lockouts = getAllModelLockouts();
    } catch (err) {
      degraded.push("modelLockouts");
      console.error("[API] resilience/connections lockout module error:", err);
    }

    // Join all sources AFTER all fetches complete (so toConnectionState has full context)
    // NOTE: If multiple breaker instances resolve to the same canonical provider (e.g., alias + canonical),
    // the last one wins in the map. This is an accepted limitation -- connections typically have one
    // active breaker per provider. The top-level breakers[] array preserves all instances.
    const breakersMap = new Map(breakers.map((b) => [resolveProviderId(b.name), b]));
    const lockoutsMap = new Map<string, ModelLockoutInfo[]>();
    for (const l of lockouts) {
      const arr = lockoutsMap.get(l.connectionId) ?? [];
      arr.push(l);
      lockoutsMap.set(l.connectionId, arr);
    }
    const connections = rawConnections.map((row) =>
      toConnectionState(row, breakersMap, lockoutsMap, now)
    );

    // Total count (separate query; falls back to connections.length on failure)
    let totalConnections = connections.length;
    let countFailed = false;
    try {
      totalConnections = getProviderConnectionsCount({ provider });
    } catch (err) {
      // Non-critical: connections.length is acceptable fallback
      console.error("[API] resilience/connections count error:", err);
      degraded.push("count"); // surface count degradation for UI transparency
      countFailed = true;
    }
    // When totalConnections > CONNECTION_LIMIT, counts reflect only the first LIMIT rows
    const coolingDownCount = connections.filter((c) => c.isCoolingDown).length;
    // Count all non-healthy breaker states (OPEN + HALF_OPEN + DEGRADED) for accurate summary
    const unhealthyBreakerCount = connections.filter(
      (c) =>
        c.breaker?.state === "OPEN" ||
        c.breaker?.state === "HALF_OPEN" ||
        c.breaker?.state === "DEGRADED"
    ).length;
    // Flag indicates counts may be incomplete due to LIMIT capping or count query failure.
    // When countFailed=true, we returned a limited page and can't verify the true total,
    // so treat as potentially capped to give the client an honest signal.
    const countsCapped =
      totalConnections > CONNECTION_LIMIT ||
      (countFailed && connections.length === CONNECTION_LIMIT);

    // Assemble window metadata (absolute timestamps)
    const windowMeta = { sinceMs, untilMs: now, now: now };

    // Assemble response (top-level fields, no `data` wrapper -- matches ResilienceConnectionsResponse)
    const response: ResilienceConnectionsResponse = {
      connections,
      breakers,
      window: windowMeta,
      meta: { totalConnections, coolingDownCount, unhealthyBreakerCount, countsCapped, degraded },
    };
    return NextResponse.json(response);
  } catch (err) {
    console.error("[API] resilience/connections unexpected error:", err);
    return NextResponse.json(buildErrorBody(500, sanitizeErrorMessage(err)), { status: 500 });
  }
}
