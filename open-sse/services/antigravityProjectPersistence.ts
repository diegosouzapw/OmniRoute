/**
 * @file antigravityProjectPersistence.ts
 * @description Persist Antigravity Cloud Code projectId discovered at runtime and prefer
 *   healthy accounts during dynamic multi-account selection.
 *
 * @changes
 * - [2026-07-24] [Composer] - Persist runtime loadCodeAssist projectId; filter broken accounts
 */

import { updateProviderConnection } from "@/lib/db/providers";

export type AntigravityProjectConnectionLike = {
  projectId?: string | null;
  providerSpecificData?: unknown;
  errorCode?: string | null;
};

export function extractAntigravityProjectIdFromPayload(
  data: Record<string, unknown> | null | undefined
): string | null {
  if (!data || typeof data !== "object") return null;

  const raw = data.cloudaicompanionProject;
  if (typeof raw === "string" && raw.trim()) return raw.trim();
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const id = (raw as Record<string, unknown>).id;
    if (typeof id === "string" && id.trim()) return id.trim();
  }
  return null;
}

export function getStoredAntigravityProjectId(
  connection: AntigravityProjectConnectionLike
): string | null {
  const column = typeof connection.projectId === "string" ? connection.projectId.trim() : "";
  if (column) return column;

  const psd = connection.providerSpecificData as Record<string, unknown> | undefined;
  const fromPsd = typeof psd?.projectId === "string" ? psd.projectId.trim() : "";
  return fromPsd || null;
}

const persistInFlight = new Set<string>();

export function persistDiscoveredAntigravityProjectId(
  connectionId: string | null | undefined,
  projectId: string,
  existingProviderSpecificData?: Record<string, unknown> | null
): void {
  const trimmed = projectId.trim();
  if (!connectionId || !trimmed) return;

  const dedupeKey = `${connectionId}:${trimmed}`;
  if (persistInFlight.has(dedupeKey)) return;
  persistInFlight.add(dedupeKey);

  const providerSpecificData = {
    ...(existingProviderSpecificData || {}),
    projectId: trimmed,
  };

  void updateProviderConnection(connectionId, {
    projectId: trimmed,
    errorCode: null,
    lastError: null,
    lastErrorType: null,
    providerSpecificData,
  })
    .catch(() => {})
    .finally(() => {
      persistInFlight.delete(dedupeKey);
    });
}

export function markAntigravityMissingCloudCodeProject(
  connectionId: string | null | undefined
): void {
  if (!connectionId) return;

  void updateProviderConnection(connectionId, {
    errorCode: "missing_project_id",
    lastError:
      "Missing Google projectId for Antigravity account. Reconnect OAuth after completing Gemini Code Assist onboarding.",
    lastErrorType: "oauth_missing_project_id",
  }).catch(() => {});
}

/**
 * When dynamic routing spans multiple Antigravity accounts, prefer connections that
 * already have a stored Cloud Code projectId. Accounts confirmed missing a project
 * (422) are skipped when alternatives exist. If every account lacks a stored project,
 * keep the full pool so request-time loadCodeAssist discovery can still recover (#2334).
 */
export function preferAntigravityConnectionsWithStoredProject<
  T extends AntigravityProjectConnectionLike,
>(connections: T[]): T[] {
  if (connections.length <= 1) return connections;

  const withoutKnownMissing = connections.filter(
    (connection) =>
      connection.errorCode !== "missing_project_id" ||
      getStoredAntigravityProjectId(connection) !== null
  );
  const pool = withoutKnownMissing.length > 0 ? withoutKnownMissing : connections;

  const withStored = pool.filter(
    (connection) => getStoredAntigravityProjectId(connection) !== null
  );
  if (withStored.length > 0 && withStored.length < pool.length) {
    return withStored;
  }
  return pool;
}

/** Test helper — reset in-flight dedupe guards. */
export function clearAntigravityProjectPersistenceInFlight(): void {
  persistInFlight.clear();
}
