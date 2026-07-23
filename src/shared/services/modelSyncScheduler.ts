/**
 * Model Auto-Sync Scheduler (#488)
 *
 * Automatically refreshes model lists for provider connections that have
 * autoSync enabled in their providerSpecificData, at a configurable
 * interval (default: 24h).
 *
 * Pattern mirrors cloudSyncScheduler.ts for consistency.
 */

import { randomUUID } from "node:crypto";
import { Agent, buildConnector, fetch as undiciFetch, type Dispatcher } from "undici";
import { getSettings, updateSettings } from "@/lib/localDb";
import { getRuntimePorts } from "@/lib/runtime/ports";

const DEFAULT_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours
const MODEL_SYNC_SETTING_KEY = "model_sync_last_run";
const MODEL_SYNC_INTERNAL_AUTH_HEADER = "x-model-sync-internal-auth";

function normalizeInternalBasePath(value: string | undefined): string {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === "/") return "";
  if (!trimmed.startsWith("/") || /[?#\\]/.test(trimmed)) return "";

  const segments = trimmed.split("/").filter(Boolean);
  if (segments.some((segment) => segment === "." || segment === "..")) return "";
  return `/${segments.join("/")}`;
}

/**
 * Trusted origin for server-internal self-fetches (model sync, auto-discovery).
 *
 * SECURITY: never derive this from the incoming request (`request.url` /
 * `Host` header) — that is client-controlled and lets a caller redirect an
 * internal, credential-bearing self-fetch to an arbitrary host (SSRF +
 * internal-auth-header exfiltration; CodeQL js/request-forgery). Always use
 * this loopback/env-pinned origin instead.
 */
export function getModelSyncInternalBaseUrl(): string {
  return resolveModelSyncInternalBaseUrl();
}

export function resolveModelSyncInternalBaseUrl(_candidate?: string): string {
  const { dashboardPort } = getRuntimePorts();
  const nativeTls = process.env.OMNIROUTE_INTERNAL_SCHEME === "https";
  const origin = nativeTls
    ? `https://localhost:${dashboardPort}`
    : `http://127.0.0.1:${dashboardPort}`;
  return `${origin}${normalizeInternalBasePath(process.env.OMNIROUTE_BASE_PATH)}`;
}

export function createPinnedModelSyncTlsConnector(
  connect: buildConnector.connector = buildConnector({ servername: "localhost" })
): buildConnector.connector {
  return (options, callback) =>
    connect(
      {
        ...options,
        host: "localhost",
        hostname: "127.0.0.1",
        servername: "localhost",
      },
      callback
    );
}

let pinnedModelSyncTlsDispatcher: Dispatcher | null = null;

function getPinnedModelSyncTlsDispatcher(): Dispatcher {
  if (!pinnedModelSyncTlsDispatcher) {
    pinnedModelSyncTlsDispatcher = new Agent({
      connect: createPinnedModelSyncTlsConnector(),
      connections: 8,
      pipelining: 0,
    });
  }
  return pinnedModelSyncTlsDispatcher;
}

const fetchWithDispatcher = undiciFetch as unknown as (
  input: RequestInfo | URL,
  init: RequestInit & { dispatcher: Dispatcher }
) => Promise<Response>;

export const fetchModelSyncInternal: typeof fetch = async (input, init = {}) => {
  const inputUrl =
    typeof input === "string" || input instanceof URL ? new URL(input) : new URL(input.url);
  const expectedBase = new URL(getModelSyncInternalBaseUrl());
  if (
    inputUrl.protocol !== expectedBase.protocol ||
    inputUrl.hostname !== expectedBase.hostname ||
    inputUrl.port !== expectedBase.port ||
    inputUrl.username ||
    inputUrl.password
  ) {
    throw new TypeError("model sync internal fetch must target the active dashboard listener");
  }

  const basePath = expectedBase.pathname === "/" ? "" : expectedBase.pathname;
  if (basePath && inputUrl.pathname !== basePath && !inputUrl.pathname.startsWith(`${basePath}/`)) {
    throw new TypeError("model sync internal fetch must stay under the configured base path");
  }

  const requestInit = { ...init, redirect: "error" as const };
  if (inputUrl.protocol === "https:") {
    return fetchWithDispatcher(inputUrl, {
      ...requestInit,
      dispatcher: getPinnedModelSyncTlsDispatcher(),
    });
  }
  return globalThis.fetch(inputUrl.href, requestInit);
};

const globalState = globalThis as typeof globalThis & {
  __omnirouteModelSyncInternalAuthToken?: string;
};

let schedulerTimer: NodeJS.Timeout | null = null;
let isRunning = false;
let internalAuthToken: string | null = null;

function getInternalAuthToken(): string {
  if (!internalAuthToken) {
    internalAuthToken = globalState.__omnirouteModelSyncInternalAuthToken || randomUUID();
    globalState.__omnirouteModelSyncInternalAuthToken = internalAuthToken;
  }
  return internalAuthToken;
}

export function getModelSyncInternalAuthHeaderName(): string {
  return MODEL_SYNC_INTERNAL_AUTH_HEADER;
}

export function buildModelSyncInternalHeaders(): Record<string, string> {
  return { [MODEL_SYNC_INTERNAL_AUTH_HEADER]: getInternalAuthToken() };
}

export function isModelSyncInternalRequest(request: { headers: Headers }): boolean {
  if (!internalAuthToken && globalState.__omnirouteModelSyncInternalAuthToken) {
    internalAuthToken = globalState.__omnirouteModelSyncInternalAuthToken;
  }
  const headerToken = request.headers.get(MODEL_SYNC_INTERNAL_AUTH_HEADER);
  return Boolean(headerToken && internalAuthToken && headerToken === internalAuthToken);
}

/**
 * Fetch all provider connections that have autoSync enabled.
 */
async function getAutoSyncConnections(): Promise<
  Array<{ id: string; provider: string; name?: string }>
> {
  try {
    const { getProviderConnections } = await import("@/lib/localDb");
    const connections = await getProviderConnections();
    const autoSyncConnections: Array<{ id: string; provider: string; name?: string }> = [];
    for (const conn of connections) {
      if (!conn.isActive && conn.isActive !== undefined) continue;
      const psd =
        conn.providerSpecificData && typeof conn.providerSpecificData === "object"
          ? (conn.providerSpecificData as Record<string, unknown>)
          : {};
      if (psd.autoSync !== true) continue;
      if (typeof conn.id !== "string" || typeof conn.provider !== "string") continue;
      autoSyncConnections.push({
        id: conn.id,
        provider: conn.provider,
        ...(typeof conn.name === "string" ? { name: conn.name } : {}),
      });
    }
    return autoSyncConnections;
  } catch (err) {
    console.warn("[ModelSync] Failed to load connections:", (err as Error).message);
    return [];
  }
}

/**
 * Sync models for a single connection via the internal sync-models endpoint.
 */
async function syncConnectionModels(
  connectionId: string,
  provider: string,
  baseUrl: string
): Promise<boolean> {
  try {
    const res = await fetchModelSyncInternal(
      `${baseUrl}/api/providers/${connectionId}/sync-models`,
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
      console.warn(
        `[ModelSync] ${provider} (${connectionId.slice(0, 8)}): sync returned ${res.status}`
      );
      return false;
    }
    const data = await res.json();
    console.log(
      `[ModelSync] ${provider} (${connectionId.slice(0, 8)}): ✓ ${data.syncedModels || 0} models`
    );
    return true;
  } catch (err) {
    console.warn(
      `[ModelSync] ${provider} (${connectionId.slice(0, 8)}): fetch failed —`,
      (err as Error).message
    );
    return false;
  }
}

/**
 * Run one full model-sync cycle across all auto-sync connections.
 */
async function runSyncCycle(apiBaseUrl: string): Promise<void> {
  if (isRunning) {
    console.log("[ModelSync] Skipping cycle — previous run still in progress");
    return;
  }
  isRunning = true;
  const start = Date.now();

  try {
    const connections = await getAutoSyncConnections();

    if (connections.length === 0) {
      console.log("[ModelSync] No connections with autoSync enabled — skipping cycle");
      return;
    }

    console.log(`[ModelSync] Starting model sync cycle — ${connections.length} connection(s)`);

    const results = await Promise.allSettled(
      connections.map((conn) =>
        syncConnectionModels(conn.id, conn.name || conn.provider, apiBaseUrl)
      )
    );

    const succeeded = results.filter((r) => r.status === "fulfilled" && r.value === true).length;
    console.log(
      `[ModelSync] Cycle complete: ${succeeded}/${connections.length} synced in ${Date.now() - start}ms`
    );

    // Record last sync time
    try {
      await updateSettings({ [MODEL_SYNC_SETTING_KEY]: new Date().toISOString() });
    } catch {
      // Non-critical
    }
  } finally {
    isRunning = false;
  }
}

/**
 * Start the model sync scheduler.
 * @param apiBaseUrl — internal base URL to call OmniRoute's own API
 * @param intervalMs — sync interval in milliseconds (default: 24h)
 */
export function startModelSyncScheduler(
  apiBaseUrl = getModelSyncInternalBaseUrl(),
  intervalMs = DEFAULT_INTERVAL_MS
): void {
  if (schedulerTimer) {
    console.log("[ModelSync] Scheduler already running — skipping start");
    return;
  }

  // Read MODEL_SYNC_INTERVAL_HOURS env override
  const envHours = parseInt(process.env.MODEL_SYNC_INTERVAL_HOURS ?? "", 10);
  const effectiveIntervalMs =
    !isNaN(envHours) && envHours > 0 ? envHours * 60 * 60 * 1000 : intervalMs;
  const trustedApiBaseUrl = resolveModelSyncInternalBaseUrl(apiBaseUrl);

  console.log(`[ModelSync] Scheduler started — interval: ${effectiveIntervalMs / 3_600_000}h`);

  // Run immediately on startup (staggered by 5s to avoid startup congestion)
  const startupDelay = setTimeout(() => runSyncCycle(trustedApiBaseUrl), 5_000);
  startupDelay.unref?.();

  // Codex-only: revalidate catalog only on first-start or app upgrade (not every boot).
  void import("./codexCatalogRevalidation")
    .then(({ scheduleCodexCatalogRevalidation }) => {
      scheduleCodexCatalogRevalidation({ apiBaseUrl: trustedApiBaseUrl });
    })
    .catch(() => {
      // silent
    });

  // Then run on the regular interval
  schedulerTimer = setInterval(() => runSyncCycle(trustedApiBaseUrl), effectiveIntervalMs);
  schedulerTimer.unref?.();
}

/**
 * Stop the model sync scheduler.
 */
export function stopModelSyncScheduler(): void {
  if (schedulerTimer) {
    clearInterval(schedulerTimer);
    schedulerTimer = null;
    console.log("[ModelSync] Scheduler stopped");
  }
}

/**
 * Get last sync timestamp from settings DB.
 */
export async function getLastModelSyncTime(): Promise<string | null> {
  try {
    const settings = await getSettings();
    return (settings as Record<string, string>)[MODEL_SYNC_SETTING_KEY] ?? null;
  } catch {
    return null;
  }
}
