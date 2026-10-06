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
  connection: Pick<AntigravityProjectConnectionLike, "projectId" | "providerSpecificData">
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
    // #11284: a discovered project proves the account is usable again —
    // re-enable it (markAntigravityMissingCloudCodeProject may have disabled
    // it after a confirmed-missing 422).
    isActive: true,
    testStatus: "active",
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

  // #11284: a CONFIRMED missing Cloud Code project is not transient — disable
  // the row so selection rotates to healthy siblings instead of re-dispatching
  // into the same 422 every request. "unavailable" is deliberately NOT a
  // terminal status: persistDiscoveredAntigravityProjectId() re-enables the
  // account the moment a project shows up at request time.
  void updateProviderConnection(connectionId, {
    isActive: false,
    testStatus: "unavailable",
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
export function preferAntigravityConnectionsWithStoredProject<T extends object>(
  connections: T[]
): T[] {
  if (connections.length <= 1) return connections;

  const hasStoredProject = (connection: T): boolean => {
    const record = connection as Record<string, unknown>;
    if (typeof record.projectId === "string" && record.projectId.trim()) return true;
    let psd = record.providerSpecificData;
    if (typeof psd === "string") {
      try {
        psd = JSON.parse(psd);
      } catch {
        return false;
      }
    }
    if (!psd || typeof psd !== "object") return false;
    const projectId = (psd as Record<string, unknown>).projectId;
    return typeof projectId === "string" && projectId.trim().length > 0;
  };

  const withoutKnownMissing = connections.filter(
    (connection) =>
      (connection as Record<string, unknown>).errorCode !== "missing_project_id" ||
      hasStoredProject(connection)
  );
  const pool = withoutKnownMissing.length > 0 ? withoutKnownMissing : connections;

  const withStored = pool.filter(hasStoredProject);
  if (withStored.length > 0 && withStored.length < pool.length) {
    return withStored;
  }
  return pool;
}

/** Test helper — reset in-flight dedupe guards. */
export function clearAntigravityProjectPersistenceInFlight(): void {
  persistInFlight.clear();
}
