/**
 * Local Provider Health Check
 *
 * Background polling of local provider_nodes (localhost) to detect
 * when they are up or down. Uses GET /models with a 5s timeout.
 *
 * Health status is stored in-memory (no DB migration needed).
 * Backoff schedule: 30s → 60s → 120s → 300s max on consecutive failures.
 * Resets to 30s on first success after failure.
 *
 * Uses Promise.allSettled so one slow/down node doesn't block others.
 */

import { getCachedProviderNodes, getCachedRawProviderConnections } from "@/lib/db/readCache";
import { getAllCustomModels, getAllSyncedAvailableModels } from "@/lib/db/models";
import { nodeTypeFromId } from "@/lib/db/providerNodeSelect";
import { isLoopbackNodeHost } from "@/shared/network/loopbackNodeHost";
import { isAutomatedTestProcess } from "@/shared/utils/testProcess";

// ── Types ────────────────────────────────────────────────────────────────

export interface HealthStatus {
  nodeId: string;
  prefix: string;
  isHealthy: boolean;
  lastCheck: Date;
  lastError?: string;
  consecutiveFailures: number;
  responseTimeMs?: number;
}

// ── Config ───────────────────────────────────────────────────────────────

const BACKOFF_SCHEDULE = [30_000, 60_000, 120_000, 300_000];
const CHECK_TIMEOUT_MS = 5_000;
const INITIAL_DELAY_MS = 15_000; // Wait for server boot before first sweep
const LOG_PREFIX = "[LocalHealthCheck]";
const TRUE_ENV_VALUES = new Set(["1", "true", "yes", "on"]);

function isBuildProcess(): boolean {
  return typeof process !== "undefined" && process.env.NEXT_PHASE === "phase-production-build";
}

// ── State (globalThis survives HMR re-evaluation) ───────────────────────

declare global {
  var __omnirouteLocalHC:
    | {
        initialized: boolean;
        sweepTimer: ReturnType<typeof setTimeout> | null;
        healthCache: Map<string, HealthStatus>;
        sweepInProgress: boolean;
      }
    | undefined;
}

function getLHCState() {
  if (!globalThis.__omnirouteLocalHC) {
    globalThis.__omnirouteLocalHC = {
      initialized: false,
      sweepTimer: null,
      healthCache: new Map(),
      sweepInProgress: false,
    };
  }
  return globalThis.__omnirouteLocalHC;
}

const healthCache = getLHCState().healthCache;

type LocalProviderNode = {
  id: string;
  prefix: string;
  baseUrl: string;
};

type ProviderConnectionRef = {
  provider?: unknown;
  isActive?: unknown;
};

// ── Helpers ──────────────────────────────────────────────────────────────

function isEnvFlagEnabled(name: string): boolean {
  const value = process.env[name];
  if (!value) return false;
  return TRUE_ENV_VALUES.has(value.trim().toLowerCase());
}

function isLocalHealthCheckDisabled(): boolean {
  return (
    isEnvFlagEnabled("OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK") ||
    isBuildProcess() ||
    isAutomatedTestProcess()
  );
}

/** Loopback/private-range hosts — shared definition (see `@/shared/network/loopbackNodeHost`). */
const isLocalhostUrl = isLoopbackNodeHost;

function getNextInterval(failures: number): number {
  return BACKOFF_SCHEDULE[Math.min(failures, BACKOFF_SCHEDULE.length - 1)];
}

/**
 * Restrict local health probes to provider nodes that can participate in normal
 * request routing. A provider-node row alone is only a definition: authenticated
 * routing needs an active provider_connection. Local no-auth media/embedding
 * routes are also valid without one, so a visible configured/discovered model
 * keeps those nodes observable.
 *
 * Connections can be stored under either the node's concrete UUID id or its
 * derived generic type. The generic form is routable only when exactly one node
 * has that type, matching selectProviderNodeForConnection/getProviderSearchPool.
 * Deliberately do not inspect testStatus, cooldowns, or the previous health
 * result here: a temporarily unhealthy but still-active local provider must
 * continue to be probed so recovery remains observable.
 */
export function selectRoutableLocalNodes(
  rawNodes: unknown[],
  rawConnections: unknown[],
  modelProviderIds: ReadonlySet<string> = new Set()
): LocalProviderNode[] {
  const nodes = rawNodes.filter((value): value is LocalProviderNode => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    const node = value as Record<string, unknown>;
    return (
      typeof node.id === "string" &&
      node.id.length > 0 &&
      typeof node.prefix === "string" &&
      typeof node.baseUrl === "string" &&
      isLocalhostUrl(node.baseUrl)
    );
  });

  const activeProviderIds = new Set<string>();
  for (const value of rawConnections) {
    if (!value || typeof value !== "object" || Array.isArray(value)) continue;
    const connection = value as ProviderConnectionRef;
    // The production query already requests isActive:true. Keep the explicit
    // guard so the pure helper stays safe when reused or tested with raw rows.
    if (connection.isActive === false || connection.isActive === 0) continue;
    if (typeof connection.provider !== "string") continue;
    const provider = connection.provider.trim();
    if (provider) activeProviderIds.add(provider);
  }

  const typeCounts = new Map<string, number>();
  const prefixCounts = new Map<string, number>();
  for (const node of nodes) {
    const type = nodeTypeFromId(node.id);
    typeCounts.set(type, (typeCounts.get(type) ?? 0) + 1);
    prefixCounts.set(node.prefix, (prefixCounts.get(node.prefix) ?? 0) + 1);
  }

  return nodes.filter((node) => {
    if (activeProviderIds.has(node.id) || modelProviderIds.has(node.id)) return true;
    if (prefixCounts.get(node.prefix) === 1 && modelProviderIds.has(node.prefix)) return true;
    const type = nodeTypeFromId(node.id);
    return (
      typeCounts.get(type) === 1 && (activeProviderIds.has(type) || modelProviderIds.has(type))
    );
  });
}

/** Provider ids with at least one visible configured/discovered model. */
export function collectModelBackedProviderIds(...catalogs: unknown[]): Set<string> {
  const providerIds = new Set<string>();
  for (const catalog of catalogs) {
    if (!catalog || typeof catalog !== "object" || Array.isArray(catalog)) continue;
    for (const [providerId, rawModels] of Object.entries(catalog)) {
      if (!Array.isArray(rawModels)) continue;
      const hasVisibleModel = rawModels.some(
        (model) =>
          typeof model === "string" ||
          (!!model &&
            typeof model === "object" &&
            !Array.isArray(model) &&
            (model as { isHidden?: unknown }).isHidden !== true)
      );
      if (hasVisibleModel) providerIds.add(providerId);
    }
  }
  return providerIds;
}

// ── Core ─────────────────────────────────────────────────────────────────

async function checkNode(node: {
  id: string;
  prefix: string;
  baseUrl: string;
}): Promise<HealthStatus> {
  const url = `${node.baseUrl.replace(/\/+$/, "")}/models`;
  const start = Date.now();
  const prev = healthCache.get(node.id);

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(CHECK_TIMEOUT_MS) });
    // Consume/cancel response body to free resources
    res.body?.cancel().catch(() => {});
    const isHealthy = res.ok || res.status === 401; // 401 = server up but auth required
    return {
      nodeId: node.id,
      prefix: node.prefix,
      isHealthy,
      lastCheck: new Date(),
      consecutiveFailures: isHealthy ? 0 : (prev?.consecutiveFailures ?? 0) + 1,
      responseTimeMs: Date.now() - start,
      lastError: isHealthy ? undefined : `HTTP ${res.status}`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Connection failed";
    return {
      nodeId: node.id,
      prefix: node.prefix,
      isHealthy: false,
      lastCheck: new Date(),
      consecutiveFailures: (prev?.consecutiveFailures ?? 0) + 1,
      responseTimeMs: Date.now() - start,
      lastError: message,
    };
  }
}

/** Single sweep: check all local provider_nodes in parallel. */
export async function sweep(): Promise<void> {
  const state = getLHCState();
  if (state.sweepInProgress) return;
  state.sweepInProgress = true;

  try {
    let nodes: LocalProviderNode[];
    try {
      const [rawNodes, rawConnections, customModels, syncedModels] = await Promise.all([
        getCachedProviderNodes(),
        getCachedRawProviderConnections({ isActive: true }),
        getAllCustomModels(),
        getAllSyncedAvailableModels(),
      ]);
      nodes = selectRoutableLocalNodes(
        Array.isArray(rawNodes) ? rawNodes : [],
        Array.isArray(rawConnections) ? rawConnections : [],
        collectModelBackedProviderIds(customModels, syncedModels)
      );
    } catch (err) {
      console.error(LOG_PREFIX, "Failed to load local provider routing state:", err);
      return;
    }

    // Prune stale entries for deleted nodes
    const currentNodeIds = new Set(nodes.map((n) => n.id));
    for (const key of healthCache.keys()) {
      if (!currentNodeIds.has(key)) healthCache.delete(key);
    }

    if (nodes.length === 0) return;

    const results = await Promise.allSettled(nodes.map((node) => checkNode(node)));

    for (const result of results) {
      if (result.status === "fulfilled") {
        const status = result.value;
        const prev = healthCache.get(status.nodeId);

        // Log state transitions
        if (prev && prev.isHealthy !== status.isHealthy) {
          const emoji = status.isHealthy ? "✅" : "❌";
          console.log(
            LOG_PREFIX,
            `${emoji} ${status.prefix} is now ${status.isHealthy ? "healthy" : "unhealthy"}${status.lastError ? ` (${status.lastError})` : ""} [${status.responseTimeMs}ms]`
          );
        }

        healthCache.set(status.nodeId, status);
      }
    }
  } finally {
    state.sweepInProgress = false;
    scheduleSweep();
  }
}

function scheduleSweep(): void {
  const state = getLHCState();
  if (!state.initialized) return;
  if (state.sweepTimer) clearTimeout(state.sweepTimer);

  // Use the maximum consecutive failures across all nodes to determine interval
  let maxFailures = 0;
  for (const status of healthCache.values()) {
    if (status.consecutiveFailures > maxFailures) {
      maxFailures = status.consecutiveFailures;
    }
  }

  const interval = getNextInterval(maxFailures);
  state.sweepTimer = setTimeout(sweep, interval);
}

// ── Public API ───────────────────────────────────────────────────────────

/** Get health status for a specific provider_node. */
export function getHealthStatus(nodeId: string): HealthStatus | undefined {
  return healthCache.get(nodeId);
}

/** Check if a provider_node is healthy. Returns true if never checked (optimistic). */
export function isNodeHealthy(nodeId: string): boolean {
  const status = healthCache.get(nodeId);
  return status?.isHealthy ?? true;
}

/** Get all health statuses (for monitoring API). */
export function getAllHealthStatuses(): Record<string, HealthStatus> {
  return Object.fromEntries(healthCache);
}

/** Start the health check scheduler (idempotent). */
export function initLocalHealthCheck(): void {
  const state = getLHCState();
  if (state.initialized || isLocalHealthCheckDisabled()) return;
  state.initialized = true;

  console.log(
    LOG_PREFIX,
    `Starting local provider health check (initial delay ${INITIAL_DELAY_MS / 1000}s)`
  );

  state.sweepTimer = setTimeout(() => {
    sweep().catch((err) => console.error(LOG_PREFIX, "Initial sweep failed:", err));
  }, INITIAL_DELAY_MS);
}

/** Stop the scheduler (for tests / hot-reload). */
export function stopLocalHealthCheck(): void {
  const state = getLHCState();
  if (state.sweepTimer) {
    clearTimeout(state.sweepTimer);
    state.sweepTimer = null;
  }
  state.initialized = false;
}

// Auto-initialize on first import (same pattern as tokenHealthCheck.ts:272)
initLocalHealthCheck();
