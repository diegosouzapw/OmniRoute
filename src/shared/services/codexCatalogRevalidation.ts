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

import { readFileSync } from "node:fs";
import path from "node:path";
import { isCodexDiscoveryModelExcluded } from "@/shared/services/codexDiscoveryPolicy";
import {
  getSyncedAvailableModelsForConnection,
  replaceSyncedAvailableModelsForConnection,
  type SyncedAvailableModel,
} from "@/lib/db/models";
import { getProviderConnections } from "@/lib/db/providers";
import { getSettings, updateSettings } from "@/lib/db/settings";

export const CODEX_CATALOG_REVALIDATED_VERSION_KEY = "codex_catalog_revalidated_version";

export type CodexCatalogRevalidationReason = "first-start" | "upgrade" | "init";

type AppVersionOptions = {
  runtimeRoot?: string;
  packageVersion?: string | null;
};

function readNonEmptyTextFile(filePath: string): string | null {
  try {
    const value = readFileSync(filePath, "utf8").trim();
    return value || null;
  } catch {
    return null;
  }
}

function readInstalledPackageVersion(runtimeRoot: string): string | null {
  try {
    const pkg = JSON.parse(readFileSync(path.join(runtimeRoot, "package.json"), "utf8")) as {
      version?: unknown;
    };
    return typeof pkg.version === "string" && pkg.version.trim() ? pkg.version.trim() : null;
  } catch {
    return null;
  }
}

/** Resolve a stable, source-qualified app identity for upgrade detection. */
export function resolveCodexCatalogAppVersion(
  env: NodeJS.ProcessEnv = process.env,
  options: AppVersionOptions = {}
): string | null {
  for (const value of [env.OMNIROUTE_BUILD_SHA, env.BUILD_SHA]) {
    if (typeof value === "string" && value.trim()) return `build:${value.trim()}`;
  }

  const runtimeRoot = options.runtimeRoot || process.cwd();
  const buildSha = readNonEmptyTextFile(path.join(runtimeRoot, "BUILD_SHA"));
  if (buildSha) return `build:${buildSha}`;

  for (const buildIdPath of [
    path.join(runtimeRoot, ".build", "next", "BUILD_ID"),
    path.join(runtimeRoot, ".next", "BUILD_ID"),
  ]) {
    const buildId = readNonEmptyTextFile(buildIdPath);
    if (buildId) return `next:${buildId}`;
  }

  const envPackageVersion = env.npm_package_version || env.OMNIROUTE_VERSION;
  if (typeof envPackageVersion === "string" && envPackageVersion.trim()) {
    return `pkg:${envPackageVersion.trim()}`;
  }

  const hasPackageVersionOverride = Object.prototype.hasOwnProperty.call(options, "packageVersion");
  const packageVersion = hasPackageVersionOverride
    ? options.packageVersion
    : readInstalledPackageVersion(runtimeRoot);
  return typeof packageVersion === "string" && packageVersion.trim()
    ? `pkg:${packageVersion.trim()}`
    : null;
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
    if (isCodexDiscoveryModelExcluded({ id: model.id })) {
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
    removedIds: Array.from(removedIds).sort((a, b) => a.localeCompare(b)),
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
  apiBaseUrl?: string;
  maxWaitMs?: number;
  pollMs?: number;
}): Promise<void> {
  const maxWaitMs = options?.maxWaitMs ?? 15_000;
  const pollMs = options?.pollMs ?? 50;
  const { fetchModelSyncInternal, resolveModelSyncInternalBaseUrl } =
    await import("./modelSyncScheduler");
  const baseUrl = resolveModelSyncInternalBaseUrl(options?.apiBaseUrl);
  const deadline = Date.now() + maxWaitMs;
  let lastErr: unknown;

  while (Date.now() < deadline) {
    try {
      const res = await fetchModelSyncInternal(
        `${baseUrl}/api/providers/__readiness_probe__/models`,
        {
          redirect: "error",
          signal: AbortSignal.timeout(1_500),
        }
      );
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
  apiBaseUrl?: string
): Promise<{ attempted: number; succeeded: number }> {
  const connections = await listActiveCodexConnectionIds();
  if (connections.length === 0) {
    return { attempted: 0, succeeded: 0 };
  }

  const { buildModelSyncInternalHeaders, fetchModelSyncInternal, resolveModelSyncInternalBaseUrl } =
    await import("./modelSyncScheduler");
  const base = resolveModelSyncInternalBaseUrl(apiBaseUrl);
  const results = await Promise.allSettled(
    connections.map(async (conn) => {
      const res = await fetchModelSyncInternal(
        `${base}/api/providers/${conn.id}/sync-models?quiet=1`,
        {
          method: "POST",
          redirect: "error",
          headers: {
            "Content-Type": "application/json",
            ...buildModelSyncInternalHeaders(),
          },
        }
      );
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

async function writeVersionMarker(appVersion: string): Promise<boolean> {
  try {
    await updateSettings({ [CODEX_CATALOG_REVALIDATED_VERSION_KEY]: appVersion });
    return true;
  } catch {
    return false;
  }
}

export type CodexCatalogRevalidationOutcome = {
  complete: boolean;
  attempted: number;
  succeeded: number;
};

export async function executeCodexCatalogRevalidation(options: {
  appVersion: string | null;
  scrub: () => Promise<unknown>;
  waitForReady: () => Promise<void>;
  liveResync: () => Promise<{ attempted: number; succeeded: number }>;
  writeMarker: (appVersion: string) => Promise<boolean>;
  logSuccess: () => void;
}): Promise<CodexCatalogRevalidationOutcome> {
  await options.scrub();

  try {
    await options.waitForReady();
  } catch {
    return { complete: false, attempted: 0, succeeded: 0 };
  }

  const syncResult = await options.liveResync();
  if (syncResult.succeeded !== syncResult.attempted) {
    return { complete: false, ...syncResult };
  }

  if (!options.appVersion) return { complete: false, ...syncResult };
  const markerWritten = await options.writeMarker(options.appVersion);
  if (!markerWritten) return { complete: false, ...syncResult };

  options.logSuccess();
  return { complete: true, ...syncResult };
}

type CodexCatalogRevalidationRequest = {
  apiBaseUrl?: string;
  reason: CodexCatalogRevalidationReason;
};

export function createCodexCatalogRevalidationCoordinator(
  run: (options: CodexCatalogRevalidationRequest) => Promise<void>
): (options: CodexCatalogRevalidationRequest) => Promise<void> {
  let activeRun: Promise<void> | null = null;
  let activeReason: CodexCatalogRevalidationReason | null = null;
  let queuedInit: CodexCatalogRevalidationRequest | null = null;

  return (options) => {
    if (activeRun !== null) {
      if (options.reason === "init" && activeReason !== "init") {
        queuedInit = options;
      }
      return activeRun;
    }

    activeRun = (async () => {
      let current: CodexCatalogRevalidationRequest | null = options;
      let firstError: unknown;

      try {
        while (current) {
          activeReason = current.reason;
          try {
            await run(current);
          } catch (error) {
            firstError ??= error;
          }
          current = queuedInit;
          queuedInit = null;
        }
      } finally {
        activeRun = null;
        activeReason = null;
      }

      if (firstError) throw firstError;
    })();

    return activeRun;
  };
}

/**
 * Run scrub + live re-sync for an explicit reason, then mark version.
 * Operator-facing success log is a single line.
 */
async function performCodexCatalogRevalidation(
  options: CodexCatalogRevalidationRequest
): Promise<void> {
  const appVersion = resolveCodexCatalogAppVersion();
  const { resolveModelSyncInternalBaseUrl } = await import("./modelSyncScheduler");
  const apiBaseUrl = resolveModelSyncInternalBaseUrl(options.apiBaseUrl);

  await executeCodexCatalogRevalidation({
    appVersion,
    scrub: scrubCodexPersistedCatalogs,
    waitForReady: () => waitForLoopbackHttpReady({ apiBaseUrl }),
    liveResync: () => liveResyncCodexConnections(apiBaseUrl),
    writeMarker: writeVersionMarker,
    logSuccess: () => console.log("kill deprecated models complete."),
  });
}

const requestCodexCatalogRevalidation = createCodexCatalogRevalidationCoordinator(
  performCodexCatalogRevalidation
);

export function revalidateCodexCatalogs(options: CodexCatalogRevalidationRequest): Promise<void> {
  return requestCodexCatalogRevalidation(options);
}

/** Boot path: only first-start or upgrade. */
export async function revalidateCodexCatalogsOnStartup(options?: {
  apiBaseUrl?: string;
}): Promise<void> {
  const appVersion = resolveCodexCatalogAppVersion();
  const previousVersion = await readPreviousVersionMarker();
  const reason = appVersion
    ? resolveBootRevalidationReason(previousVersion, appVersion)
    : "first-start";
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
