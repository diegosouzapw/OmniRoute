import { getDbInstance } from "../db/core";
import type { PendingRequestDetail } from "./usageHistory";

const COMPLETED_DETAIL_TTL_MS = 120_000;
const MAX_COMPLETED_DETAILS = 256;

const completedDetails = new Map<string, PendingRequestDetail>();
const completedDetailTimers = new Map<string, ReturnType<typeof setTimeout>>();

function deleteCompletedDetail(id: string) {
  completedDetails.delete(id);
  const existingTimer = completedDetailTimers.get(id);
  if (existingTimer) {
    clearTimeout(existingTimer);
    completedDetailTimers.delete(id);
  }
}

function trimCompletedDetails() {
  while (completedDetails.size > MAX_COMPLETED_DETAILS) {
    const oldestId = completedDetails.keys().next().value;
    if (!oldestId) break;
    deleteCompletedDetail(oldestId);
  }
}

export function getCompletedDetails(): Map<string, PendingRequestDetail> {
  return completedDetails;
}

export function storeCompletedDetail(detail: PendingRequestDetail) {
  completedDetails.set(detail.id, detail);
  trimCompletedDetails();
}

export function scheduleCompletedDetailCleanup(id: string) {
  const existingTimer = completedDetailTimers.get(id);
  if (existingTimer) clearTimeout(existingTimer);
  const timer = setTimeout(() => {
    completedDetails.delete(id);
    completedDetailTimers.delete(id);
  }, COMPLETED_DETAIL_TTL_MS);
  timer.unref?.();
  completedDetailTimers.set(id, timer);
}

export function clearCompletedDetails() {
  for (const timer of completedDetailTimers.values()) clearTimeout(timer);
  completedDetailTimers.clear();
  completedDetails.clear();
}

function isUnset(value: unknown): boolean {
  return value === undefined || value === null;
}

export function maybeEnrichCompletedDetail(updated: PendingRequestDetail, connectionId: string) {
  void (async () => {
    try {
      if (!isUnset(updated.providerResponse) && !isUnset(updated.clientResponse)) return;

      const db = getDbInstance();
      const sinceIso = new Date(Date.now() - 30_000).toISOString();
      const rows = db
        .prepare(
          `SELECT artifact_relpath FROM call_logs WHERE connection_id = ? AND model = ? AND timestamp >= ? ORDER BY timestamp DESC LIMIT 5`
        )
        .all(connectionId, updated.model, sinceIso) as Array<{ artifact_relpath: string | null }>;
      for (const row of rows) {
        if (!row.artifact_relpath) continue;
        const { readCallArtifact, isSizeLimitOmissionMarker } = await import("./callLogArtifacts");
        const art = readCallArtifact(row.artifact_relpath);
        if (art.state !== "ready" || !art.artifact) continue;
        const pipeline = art.artifact.pipeline as
          | { providerResponse?: unknown; clientResponse?: unknown }
          | undefined;
        // pipeline.* first: it is the translated payload of one specific side.
        // `responseBody` is a single coarse value handed to both sides, so it
        // may only fill a side still empty AFTER the pipeline had its turn --
        // testing emptiness once before the loop let it overwrite the payload
        // just recovered, showing a provider payload as the client response.
        if (isUnset(updated.providerResponse) && pipeline?.providerResponse) {
          updated.providerResponse = pipeline.providerResponse;
        }
        if (isUnset(updated.clientResponse) && pipeline?.clientResponse) {
          updated.clientResponse = pipeline.clientResponse;
        }
        // A size-limited artifact stores an omission marker string in place of
        // the body. It is truthy, so recovering it here overwrites a real
        // payload with "[omitted: ...]".
        const responseBody = isSizeLimitOmissionMarker(art.artifact.responseBody)
          ? null
          : art.artifact.responseBody;
        if (responseBody) {
          if (isUnset(updated.providerResponse)) updated.providerResponse = responseBody;
          if (isUnset(updated.clientResponse)) updated.clientResponse = responseBody;
        }
        if (updated.providerResponse || updated.clientResponse) {
          if (completedDetails.has(updated.id)) storeCompletedDetail(updated);
          break;
        }
      }
    } catch (e) {
      try {
        console.warn(
          "[usageHistory] failed to enrich completed detail from artifacts:",
          e && (e.message || e)
        );
      } catch {}
    }
  })();
}
