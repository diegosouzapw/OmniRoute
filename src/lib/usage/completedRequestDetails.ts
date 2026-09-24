import { getDbInstance } from "../db/core";
import type { PendingRequestDetail } from "./usageHistory";

const COMPLETED_DETAIL_TTL_MS = 120_000;
const MAX_COMPLETED_DETAILS = 256;
/**
 * JON-562: completed details are a short-lived dashboard bridge, not a second payload store.
 * The 16 MiB estimated cache payload budget keeps room for normal bridge entries while bounding
 * the strings and object fields this module accounts for. It is not a process-memory ceiling.
 */
export const MAX_COMPLETED_DETAILS_BYTES = 16 * 1024 * 1024;

const completedDetails = new Map<string, PendingRequestDetail>();
const completedDetailTimers = new Map<string, ReturnType<typeof setTimeout>>();
const completedDetailBytes = new Map<string, number>();
let totalCompletedDetailBytes = 0;

function estimateRetainedBytes(value: unknown, seen = new WeakSet<object>()): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "string") return Buffer.byteLength(value, "utf8");
  if (typeof value === "number" || typeof value === "bigint") return 8;
  if (typeof value === "boolean") return 4;
  if (typeof value !== "object" || seen.has(value)) return 0;
  seen.add(value);

  if (Array.isArray(value)) {
    return 32 + value.reduce((total, entry) => total + estimateRetainedBytes(entry, seen), 0);
  }

  let bytes = 64;
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    bytes += Buffer.byteLength(key, "utf8") + estimateRetainedBytes(entry, seen);
  }
  return bytes;
}

function deleteCompletedDetail(id: string) {
  completedDetails.delete(id);
  totalCompletedDetailBytes = Math.max(
    0,
    totalCompletedDetailBytes - (completedDetailBytes.get(id) ?? 0)
  );
  completedDetailBytes.delete(id);
  const existingTimer = completedDetailTimers.get(id);
  if (existingTimer) {
    clearTimeout(existingTimer);
    completedDetailTimers.delete(id);
  }
}

function trimCompletedDetails() {
  while (
    completedDetails.size > MAX_COMPLETED_DETAILS ||
    totalCompletedDetailBytes > MAX_COMPLETED_DETAILS_BYTES
  ) {
    const oldestId = completedDetails.keys().next().value;
    if (!oldestId) break;
    deleteCompletedDetail(oldestId);
  }
}

export function getCompletedDetails(): Map<string, PendingRequestDetail> {
  return completedDetails;
}

/**
 * Read the estimated payload bytes currently accounted to the completed-detail cache.
 * @returns The cache's estimated payload-byte total.
 */
export function getCompletedDetailsByteSize(): number {
  return totalCompletedDetailBytes;
}

/**
 * Read the completed-detail cache counters.
 * @returns Entry, cleanup-timer and estimated payload-byte counts.
 */
export function getCompletedDetailsCacheStats(): {
  entries: number;
  cleanupTimers: number;
  bytes: number;
} {
  return {
    entries: completedDetails.size,
    cleanupTimers: completedDetailTimers.size,
    bytes: totalCompletedDetailBytes,
  };
}

/**
 * Store a detached completed-request preview.
 * @param detail - Completed request detail to detach and cache.
 * @returns `true` only when the entry remains cached after count and byte-budget eviction.
 * @throws If `detail` contains a value that `structuredClone` cannot copy.
 */
export function storeCompletedDetail(detail: PendingRequestDetail): boolean {
  const inputBytes = estimateRetainedBytes(detail);
  if (inputBytes > MAX_COMPLETED_DETAILS_BYTES) {
    deleteCompletedDetail(detail.id);
    return false;
  }

  // `truncatePendingPreview()` uses String#slice. V8 may represent that short preview as a
  // sliced string whose hidden parent is the full multi-megabyte request. A structured clone
  // materializes the visible preview into cache-owned storage and drops the pending graph.
  const detached = structuredClone(detail);
  const detachedBytes = estimateRetainedBytes(detached);
  totalCompletedDetailBytes -= completedDetailBytes.get(detail.id) ?? 0;
  completedDetails.set(detail.id, detached);
  completedDetailBytes.set(detail.id, detachedBytes);
  totalCompletedDetailBytes += detachedBytes;
  trimCompletedDetails();
  return completedDetails.has(detail.id);
}

export function scheduleCompletedDetailCleanup(id: string) {
  const existingTimer = completedDetailTimers.get(id);
  if (existingTimer) clearTimeout(existingTimer);
  const timer = setTimeout(() => {
    deleteCompletedDetail(id);
  }, COMPLETED_DETAIL_TTL_MS);
  timer.unref?.();
  completedDetailTimers.set(id, timer);
}

export function clearCompletedDetails() {
  for (const timer of completedDetailTimers.values()) clearTimeout(timer);
  completedDetailTimers.clear();
  completedDetails.clear();
  completedDetailBytes.clear();
  totalCompletedDetailBytes = 0;
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
