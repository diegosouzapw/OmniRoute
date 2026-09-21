import { parseModel } from "../model.ts";
import { splitFingerprintPin } from "./fingerprintExpansion.ts";
import type { ResolvedComboTarget } from "./types.ts";

export type ActiveConnectionRecord = Record<string, unknown> & {
  id: string;
  provider: string;
};

/**
 * API-key connection permissions retain the historical contract used by the
 * credential resolver: only a non-empty list is restrictive. `null` and `[]`
 * both mean unrestricted.
 */
export function normalizeAutoConnectionScope(
  allowedConnectionIds: readonly string[] | null | undefined
): ReadonlySet<string> | null {
  if (!Array.isArray(allowedConnectionIds) || allowedConnectionIds.length === 0) return null;
  const normalized = allowedConnectionIds
    .map((connectionId) => (typeof connectionId === "string" ? connectionId.trim() : ""))
    .filter(Boolean);
  return normalized.length > 0 ? new Set(normalized) : null;
}

function realConnectionId(connectionId: string): string {
  return splitFingerprintPin(connectionId)?.realConnectionId ?? connectionId;
}

export function targetProvider(target: ResolvedComboTarget): string {
  const parsed = parseModel(target.modelStr);
  return (
    target.provider || target.providerId || parsed.provider || parsed.providerAlias || "unknown"
  );
}

export function permittedActiveConnections(
  connections: readonly Record<string, unknown>[],
  scope: ReadonlySet<string>
): ActiveConnectionRecord[] {
  return connections.filter((connection): connection is ActiveConnectionRecord => {
    const id = typeof connection?.id === "string" ? connection.id.trim() : "";
    const provider = typeof connection?.provider === "string" ? connection.provider.trim() : "";
    return id.length > 0 && provider.length > 0 && scope.has(id);
  });
}

export function groupConnectionsByProvider(
  connections: readonly ActiveConnectionRecord[]
): Map<string, ActiveConnectionRecord[]> {
  const grouped = new Map<string, ActiveConnectionRecord[]>();
  for (const connection of connections) {
    const existing = grouped.get(connection.provider);
    if (existing) existing.push(connection);
    else grouped.set(connection.provider, [connection]);
  }
  return grouped;
}

/**
 * Bind every restricted auto target to a concrete, active, permitted account.
 * This is deliberately fail-closed: an unknown/inactive pin or an empty
 * provider intersection disappears instead of surviving as an unpinned target
 * that a later fallback could resolve against another account.
 */
export function expandTargetsWithinConnectionScope(
  targets: readonly ResolvedComboTarget[],
  connectionsByProvider: ReadonlyMap<string, readonly ActiveConnectionRecord[]>,
  scope: ReadonlySet<string>
): ResolvedComboTarget[] {
  const expanded: ResolvedComboTarget[] = [];

  for (const target of targets) {
    const provider = targetProvider(target);
    const providerConnections = connectionsByProvider.get(provider) ?? [];
    if (target.connectionId) {
      const resolvedConnectionId = realConnectionId(target.connectionId);
      if (!scope.has(resolvedConnectionId)) continue;
      const connection = providerConnections.find(
        (candidate) => candidate.id === resolvedConnectionId
      );
      if (!connection) continue;
      expanded.push({
        ...target,
        allowedConnectionIds: [resolvedConnectionId],
        authType:
          typeof connection.authType === "string" ? connection.authType : (target.authType ?? null),
      });
      continue;
    }

    const stepScope = normalizeAutoConnectionScope(target.allowedConnectionIds);
    const eligibleConnections = stepScope
      ? providerConnections.filter((connection) => stepScope.has(connection.id))
      : providerConnections;
    for (const connection of eligibleConnections) {
      expanded.push({
        ...target,
        connectionId: connection.id,
        allowedConnectionIds: [connection.id],
        authType: typeof connection.authType === "string" ? connection.authType : null,
        executionKey: `${target.executionKey}@${connection.id}`,
      });
    }
  }

  return expanded;
}
