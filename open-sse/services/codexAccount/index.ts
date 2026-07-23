import { getCodexModelScope } from "../../config/codexQuotaScopes.ts";
import {
  getCodexAccountPoolState,
  getEarliestCodexChildCooldown,
  inspectCodexAccount,
} from "./state.ts";
import type {
  CodexAccount,
  CodexAccountConnection,
  CodexAccountPool,
  CodexChildAccount,
  CodexParentAccount,
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
  CodexParentAccount,
  CodexParentAccountDiagnostic,
  CodexPersistedQuotaState,
} from "./types.ts";
