/**
 * Model sync job for embedded services.
 *
 * Fetches /v1/models from a running service instance and persists the list
 * in the key_value table so the model catalog can expose them without calling
 * the service on every request. Also stamps last_sync_at in version_manager.
 *
 * Schedule: runs once when the service reaches "running" state, then every
 * SYNC_INTERVAL_MS. Stops automatically when the service stops.
 */

import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { getServiceModels, saveServiceModels, type ServiceModel } from "@/lib/db/serviceModels";
import { updateVersionManagerTool } from "@/lib/db/versionManager";

const SYNC_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
const FETCH_TIMEOUT_MS = 10_000;

const activeTimers = new Map<string, ReturnType<typeof setInterval>>();

/**
 * Fetch the model list from a running service and persist it.
 * Returns the number of models synced, or -1 on failure.
 */
export async function syncServiceModels(
  tool: string,
  baseUrl: string,
  apiKey: string
): Promise<number> {
  try {
    const res = await fetch(`${baseUrl}/v1/models`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) {
      console.warn(`[ModelSync:${tool}] /v1/models returned HTTP ${res.status}`);
      return -1;
    }

    const json = await res.json();
    const data: unknown = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
    const models = (data as unknown[])
      .filter(
        (m): m is ServiceModel =>
          typeof m === "object" &&
          m !== null &&
          typeof (m as Record<string, unknown>).id === "string"
      )
      .map((m) => ({
        ...m,
        // Prefix the model id with the tool name so downstream routing and the
        // executor strip it back off (e.g. "9router/cx/gpt-5-mini").
        id: m.id.startsWith(`${tool}/`) ? m.id : `${tool}/${m.id}`,
      }));

    saveServiceModels(tool, models);
    await updateVersionManagerTool(tool, { lastSyncAt: new Date().toISOString() });

    console.log(`[ModelSync:${tool}] synced ${models.length} model(s)`);
    return models.length;
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    console.warn(`[ModelSync:${tool}] fetch failed: ${msg}`);
    return -1;
  }
}

/**
 * Start periodic model sync for a service.
 * Idempotent — calling again while already running is a no-op.
 */
export function scheduleServiceModelSync(
  tool: string,
  baseUrl: string,
  apiKey: string,
  intervalMs = SYNC_INTERVAL_MS
): void {
  if (activeTimers.has(tool)) return;

  // First sync immediately (non-blocking)
  syncServiceModels(tool, baseUrl, apiKey).catch(() => {});

  const timer = setInterval(() => {
    syncServiceModels(tool, baseUrl, apiKey).catch(() => {});
  }, intervalMs);
  timer.unref?.();

  activeTimers.set(tool, timer);
  console.log(`[ModelSync:${tool}] scheduler started (interval ${intervalMs / 1000}s)`);
}

/**
 * Stop the periodic sync for a service.
 */
export function stopServiceModelSync(tool: string): void {
  const timer = activeTimers.get(tool);
  if (!timer) return;
  clearInterval(timer);
  activeTimers.delete(tool);
  console.log(`[ModelSync:${tool}] scheduler stopped`);
}

/** Re-export read path so consumers don't need to import two modules. */
export { getServiceModels };
