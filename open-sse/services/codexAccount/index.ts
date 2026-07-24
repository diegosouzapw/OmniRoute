import { getCodexModelScope } from "../../config/codexQuotaScopes.ts";
import {
  getCodexChildQuotaHydration,
  getEarliestCodexChildCooldown,
  inspectCodexAccount,
} from "./state.ts";
import type {
  CodexAccount,
  CodexAccountConnection,
  CodexAccountPool,
  CodexChildAccount,
  CodexParentAccount,
  CodexAccountPoolProjection,
  CodexQuotaWindowSnapshot,
} from "./types.ts";

function createParentAccount(connection: CodexAccountConnection): CodexParentAccount {
  return {
    kind: "parent",
    key: { parentConnectionId: connection.id, scope: null },
    connectionId: connection.id,
    scope: null,
    connection,
  };
}

function createChildAccount(
  connection: CodexAccountConnection,
  scope: CodexChildAccount["scope"]
): CodexChildAccount {
  return {
    kind: "child",
    key: { parentConnectionId: connection.id, scope },
    connectionId: connection.id,
    scope,
    connection,
  };
}

/** Build one parent and two virtual children around a single DB connection. */
export function createCodexAccountPool(connection: CodexAccountConnection): CodexAccountPool {
  const parent = createParentAccount(connection);
  const codex = createChildAccount(connection, "codex");
  const spark = createChildAccount(connection, "spark");
  return {
    parent,
    children: [codex, spark],
    accounts: [parent, codex, spark],
  };
}

/** Project one persisted connection into the safe parent/child account read model. */
export function projectCodexAccountPool(
  connection: CodexAccountConnection,
  now = Date.now()
): CodexAccountPoolProjection {
  const pool = createCodexAccountPool(connection);
  const children = pool.children.map((child) => {
    const state = inspectCodexAccount(pool, child, now);
    const hydration = getCodexChildQuotaHydration(child);
    const quotaWindow = (window: "5h" | "7d"): CodexQuotaWindowSnapshot | null => {
      const quota = hydration.quotaState;
      if (!quota) return null;
      const usage = quota[window === "5h" ? "usage5h" : "usage7d"];
      const limit = quota[window === "5h" ? "limit5h" : "limit7d"];
      const resetAt = quota[window === "5h" ? "resetAt5h" : "resetAt7d"] ?? null;
      if (typeof usage !== "number" && typeof limit !== "number" && !resetAt) return null;
      return {
        usage: typeof usage === "number" ? usage : null,
        limit: typeof limit === "number" ? limit : null,
        resetAt,
        usedPercentage:
          typeof usage === "number" && typeof limit === "number" && limit > 0
            ? (usage / limit) * 100
            : null,
      };
    };
    const cooldownActive = Boolean(
      state.rateLimitedUntil && new Date(state.rateLimitedUntil).getTime() > now
    );
    const exhaustedWindow = hydration.exhaustedWindow;
    const exhaustedResetAt =
      exhaustedWindow === "5h"
        ? hydration.quotaState?.resetAt5h
        : exhaustedWindow === "7d"
          ? hydration.quotaState?.resetAt7d
          : null;
    const exhaustionActive = Boolean(
      exhaustedWindow && exhaustedResetAt && new Date(exhaustedResetAt).getTime() > now
    );
    const unavailable = cooldownActive || exhaustionActive;
    return {
      key: child.key,
      unavailable,
      cooldown: {
        active: cooldownActive,
        rateLimitedUntil: cooldownActive ? state.rateLimitedUntil : null,
      },
      quota: {
        exhaustedWindow: exhaustionActive ? exhaustedWindow : null,
        observedAt: hydration.quotaState?.observedAt ?? null,
        windows: { "5h": quotaWindow("5h"), "7d": quotaWindow("7d") },
      },
    };
  }) as [CodexAccountPoolProjection["children"][0], CodexAccountPoolProjection["children"][1]];
  const limitedChildCount = children.filter((child) => child.unavailable).length;
  return {
    parentConnectionId: connection.id,
    aggregate: {
      status:
        limitedChildCount === 0
          ? "available"
          : limitedChildCount === children.length
            ? "fully_limited"
            : "partially_limited",
      limitedChildCount,
    },
    children,
  };
}

/** Resolve the scoped child whose quota owns a nonblank model, or the parent otherwise. */
export function resolveCodexAccount(
  pool: CodexAccountPool,
  model: string | null | undefined
): CodexAccount {
  if (typeof model !== "string" || model.trim().length === 0) return pool.parent;
  const scope = getCodexModelScope(model);
  return pool.children.find((account) => account.scope === scope) || pool.parent;
}

export {
  getCodexAccountPoolState,
  getCodexChildQuotaHydration,
  getCodexParentAccountDiagnostic,
  getEarliestCodexChildCooldown,
  inspectCodexAccount,
} from "./state.ts";
export { persistCodexChildCooldown } from "./write.ts";
export type { PersistCodexChildCooldownResult } from "./write.ts";
export { persistCodexChildQuotaResponse } from "./quota.ts";
export type { PersistCodexChildQuotaResult } from "./quota.ts";
export type {
  CodexAccount,
  CodexAccountConnection,
  CodexAccountKey,
  CodexAccountPool,
  CodexChildAccount,
  CodexAccountPoolState,
  CodexAccountPoolStatus,
  CodexAccountState,
  CodexChildAccountState,
  CodexChildCooldown,
  CodexChildQuotaHydration,
  CodexAccountPoolProjection,
  CodexChildAccountProjection,
  CodexQuotaWindowSnapshot,
  CodexParentAccount,
  CodexParentAccountDiagnostic,
  CodexPersistedQuotaState,
} from "./types.ts";
