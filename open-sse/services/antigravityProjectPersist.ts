/**
 * Persist a runtime-discovered Antigravity projectId back onto its connection row
 * (#8491).
 *
 * `ensureAntigravityProjectAssigned()` recovers a missing projectId via a
 * `loadCodeAssist` round-trip and hands it back to the caller for the in-flight
 * request only — nothing wrote it back to the connection record, so every
 * subsequent token refresh (or process restart) lost the discovery and forced a
 * fresh round-trip. This module is the single best-effort write path both call
 * sites (`open-sse/executors/antigravity.ts` and the models-discovery
 * normalizer) funnel through, mirroring the shape `mapAntigravityTokens()`
 * already persists at OAuth-exchange time (`src/lib/oauth/providers/antigravity.ts`).
 */

import { updateProviderConnection } from "@/lib/db/providers";

/**
 * Keep only Antigravity connections that already have a stored projectId when
 * building the reset-aware pool (#8894). A connection without a projectId cannot
 * be quota-scored, so leaving it in the pool only produces unrankable candidates.
 */
export function preferAntigravityConnectionsWithStoredProject(
  connections: Array<Record<string, unknown>>
): Array<Record<string, unknown>> {
  return connections.filter((connection) => {
    const direct = connection.projectId;
    const psd = connection.providerSpecificData as Record<string, unknown> | undefined;
    const psdProjectId = psd?.projectId;
    return (
      (typeof direct === "string" && direct.trim().length > 0) ||
      (typeof psdProjectId === "string" && psdProjectId.trim().length > 0)
    );
  });
}

/**
 * Write `discoveredProjectId` onto both the `projectId` column and
 * `providerSpecificData.projectId` for `connectionId`, preserving any other
 * `providerSpecificData` fields already on the connection.
 *
 * Best-effort / non-fatal by design: a persistence failure must never block
 * the in-flight request, which already has the discovered id in hand.
 */
export async function persistDiscoveredAntigravityProjectId(
  connectionId: string | undefined | null,
  discoveredProjectId: string | undefined | null,
  existingProviderSpecificData?: Record<string, unknown> | null
): Promise<void> {
  if (!connectionId || !discoveredProjectId) return;
  try {
    await updateProviderConnection(connectionId, {
      projectId: discoveredProjectId,
      providerSpecificData: {
        ...(existingProviderSpecificData || {}),
        projectId: discoveredProjectId,
      },
    });
  } catch {
    // Non-fatal: persistence failure must never block the in-flight request.
  }
}
