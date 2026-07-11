/**
 * Codex catalog revalidation (Codex provider only)
 *
 * Runs scrub + live re-sync only in three cases:
 *  1) first-start — no version marker yet
 *  2) upgrade — app version marker changed after update/reboot
 *  3) init — setup/onboarding just completed (explicit trigger)
 *
 * Success log (single line): kill deprecated models complete.
 */

import { isCodexDiscoveryModelExcluded } from "@/app/api/providers/[id]/models/discovery/codex";
import {
  getSyncedAvailableModelsForConnection,
  replaceSyncedAvailableModelsForConnection,
  type SyncedAvailableModel,
} from "@/lib/db/models";
import { getProviderConnections } from "@/lib/db/providers";
import { getSettings, updateSettings } from "@/lib/db/settings";
import { getRuntimePorts } from "@/lib/runtime/ports";

export const CODEX_CATALOG_REVALIDATED_VERSION_KEY = "codex_catalog_revalidated_version";

export type CodexCatalogRevalidationReason = "first-start" | "upgrade" | "init";

function defaultInternalBaseUrl(): string {
  const { dashboardPort } = getRuntimePorts();
  return (
    process.env.BASE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    `http://127.0.0.1:${dashboardPort}`
  );
}

function loopbackProbePort(): string {
  return process.env.OMNIROUTE_PORT || process.env.PORT || String(getRuntimePorts().dashboardPort);
}

/** Resolve a stable app identity for upgrade detection. */
export function resolveCodexCatalogAppVersion(env: NodeJS.ProcessEnv = process.env): string {
  const candidates = [
    env.OMNIROUTE_BUILD_SHA,
    env.BUILD_SHA,
    env.npm_package_version,
    env.OMNIROUTE_VERSION,
  ];
  for (const value of candidates) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pkg = require("../../../package.json") as { version?: string };
    if (pkg?.version) return `pkg:${pkg.version}`;
  } catch {
    // ignore
  }
  return "unknown";
}

/**
 * Pure: map stored marker + current version → boot trigger, or null to skip.
 * - no marker → first-start
 * - marker !== version → upgrade
 * - else → null (do nothing on this boot)
 */
export function resolveBootRevalidationReason(
  previousVersion: string | null | undefined,
  appVersion: string
): CodexCatalogRevalidationReason | null {
  if (!previousVersion || !String(previousVersion).trim()) return "first-start";
  if (String(previousVersion).trim() !== appVersion) return "upgrade";
  return null;
}

/** Pure helper: drop denylisted ids from a synced model list. */
export function scrubSyncedModelsWithCodexDenylist(models: SyncedAvailableModel[]): {
  kept: SyncedAvailableModel[];
  removedIds: string[];
} {
  const removedIds: string[] = [];
  const kept: SyncedAvailableModel[] = [];
  for (const model of models) {
    if (!model?.id) continue;
    if (isCodexDiscoveryModelExcluded({ id: model.id, name: model.name || model.id })) {
      removedIds.push(model.id);
      continue;
    }
    kept.push(model);
  }
  return { kept, removedIds };
}

export type CodexCatalogScrubResult = {
  connections: number;
  connectionsChanged: number;
  modelsRemoved: number;
  removedIds: string[];
};

/** Offline pass: rewrite persisted Codex synced catalogs through the denylist. */
export async function scrubCodexPersistedCatalogs(): Promise<CodexCatalogScrubResult> {
  const connections = await getProviderConnections({ provider: "codex" });
  const removedIds = new Set<string>();
  let connectionsChanged = 0;

  for (const connection of connections) {
    const connectionId = String(connection.id || "");
    if (!connectionId) continue;
    const existing = await getSyncedAvailableModelsForConnection("codex", connectionId);
    if (existing.length === 0) continue;
    const { kept, removedIds: removed } = scrubSyncedModelsWithCodexDenylist(existing);
    if (removed.length === 0) continue;
    await replaceSyncedAvailableModelsForConnection("codex", connectionId, kept);
    connectionsChanged += 1;
    for (const id of removed) removedIds.add(id);
  }

  return {
    connections: connections.length,
    connectionsChanged,
    modelsRemoved: removedIds.size,
    removedIds: Array.from(removedIds).sort(),
  };
}

async function listActiveCodexConnectionIds(): Promise<Array<{ id: string; name?: string }>> {
  const connections = await getProviderConnections({ provider: "codex" });
  return connections
    .filter((conn) => conn.isActive !== false)
    .map((conn) => ({
      id: String(conn.id),
      name: typeof conn.name === "string" ? conn.name : undefined,
    }))
    .filter((conn) => conn.id.length > 0);
}

export async function waitForLoopbackHttpReady(options?: {
  maxWaitMs?: number;
  pollMs?: number;
}): Promise<void> {
  const maxWaitMs = options?.maxWaitMs ?? 15_000;
  const pollMs = options?.pollMs ?? 50;
  const port = loopbackProbePort();
  const deadline = Date.now() + maxWaitMs;
  let lastErr: unknown;

  while (Date.now() < deadline) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/api/providers/__readiness_probe__/models`, {
        signal: AbortSignal.timeout(1_500),
      });
      if (res.status >= 200 && res.status < 600) return;
    } catch (err) {
      lastErr = err;
    }
    await new Promise((r) => setTimeout(r, pollMs));
  }

  throw new Error(
    `loopback not ready within ${maxWaitMs}ms: ${
      lastErr instanceof Error ? lastErr.message : String(lastErr)
    }`
  );
}

export async function liveResyncCodexConnections(
  apiBaseUrl: string = defaultInternalBaseUrl()
): Promise<{ attempted: number; succeeded: number }> {
  const connections = await listActiveCodexConnectionIds();
  if (connections.length === 0) {
    return { attempted: 0, succeeded: 0 };
  }

  const { buildModelSyncInternalHeaders } = await import("./modelSyncScheduler");
  const base = apiBaseUrl.replace(/\/$/, "");
  const results = await Promise.allSettled(
    connections.map(async (conn) => {
      const res = await fetch(`${base}/api/providers/${conn.id}/sync-models?quiet=1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...buildModelSyncInternalHeaders(),
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return true;
    })
  );

  const succeeded = results.filter((r) => r.status === "fulfilled").length;
  return { attempted: connections.length, succeeded };
}

async function readPreviousVersionMarker(): Promise<string | null> {
  try {
    const settings = await getSettings();
    const raw = settings?.[CODEX_CATALOG_REVALIDATED_VERSION_KEY];
    return typeof raw === "string" && raw.trim() ? raw.trim() : null;
  } catch {
    return null;
  }
}

async function writeVersionMarker(appVersion: string): Promise<void> {
  try {
    await updateSettings({ [CODEX_CATALOG_REVALIDATED_VERSION_KEY]: appVersion });
  } catch {
    // non-fatal
  }
}

/**
 * Run scrub + live re-sync for an explicit reason, then mark version.
 * Operator-facing success log is a single line.
 */
export async function revalidateCodexCatalogs(options?: {
  apiBaseUrl?: string;
  reason: CodexCatalogRevalidationReason;
}): Promise<void> {
  const appVersion = resolveCodexCatalogAppVersion();

  await scrubCodexPersistedCatalogs();

  try {
    await waitForLoopbackHttpReady();
  } catch {
    await writeVersionMarker(appVersion);
    return;
  }

  await liveResyncCodexConnections(options?.apiBaseUrl);
  await writeVersionMarker(appVersion);
  console.log("kill deprecated models complete.");
}

/** Boot path: only first-start or upgrade. */
export async function revalidateCodexCatalogsOnStartup(options?: {
  apiBaseUrl?: string;
}): Promise<void> {
  const appVersion = resolveCodexCatalogAppVersion();
  const previousVersion = await readPreviousVersionMarker();
  const reason = resolveBootRevalidationReason(previousVersion, appVersion);
  if (!reason) return;
  await revalidateCodexCatalogs({ apiBaseUrl: options?.apiBaseUrl, reason });
}

function scheduleRun(run: () => Promise<void>): void {
  const timer = setTimeout(() => {
    void run().catch(() => {
      // silent — success line only on full success
    });
  }, 0);
  timer.unref?.();
}

/** Fire-and-forget boot schedule (first-start / upgrade only). */
export function scheduleCodexCatalogRevalidation(options?: { apiBaseUrl?: string }): void {
  scheduleRun(() => revalidateCodexCatalogsOnStartup({ apiBaseUrl: options?.apiBaseUrl }));
}

/** Fire-and-forget after setup/onboarding completes. */
export function scheduleCodexCatalogRevalidationAfterInit(options?: { apiBaseUrl?: string }): void {
  scheduleRun(() => revalidateCodexCatalogs({ apiBaseUrl: options?.apiBaseUrl, reason: "init" }));
}
