/**
 * Vision Bridge Auto-Router
 * Automatically selects the fastest vision-capable model from available models.
 */

import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";
import { getActiveSyncedCatalog } from "@/lib/db/models/activeSyncedCatalog";
import { PROVIDER_MODELS } from "@omniroute/open-sse/config/providerModels";
import { getRegisteredProviderEffortBaseModelId } from "@omniroute/open-sse/utils/registeredEffortVariants.ts";
import { hasUsableCredentialsForModel } from "./visionBridgeCredentials";
import { isVisionBridgeForcedModel } from "@/shared/constants/visionBridgeDefaults";

export interface VisionModelCandidate {
  modelId: string;
  fullName: string; // provider/model format
  priority: number; // lower = better (local models first)
  averageLatencyMs: number;
  lastUsedAt: number;
  successRate: number;
}

export interface LatencyRecord {
  modelId: string;
  latencyMs: number;
  timestamp: number;
  success: boolean;
}

export interface VisionBridgeRouterConfig {
  /** Fixed model to use (overrides auto-routing) */
  fixedModel?: string;
  /** Maximum number of fallback attempts */
  maxFallbackAttempts: number;
  /** Cache TTL for selection decisions (ms) */
  selectionCacheTtlMs: number;
  /** Minimum number of latency samples before trusting average */
  minLatencySamples: number;
  /** Models to exclude from auto-routing */
  excludedModels: string[];
}

const DEFAULT_ROUTER_CONFIG: VisionBridgeRouterConfig = {
  maxFallbackAttempts: 3,
  selectionCacheTtlMs: 60_000, // 1 minute
  minLatencySamples: 5,
  excludedModels: [],
};

// In-memory latency tracker (would be Redis in production)
const latencyStore = new Map<string, LatencyRecord[]>();
const selectionCache = new Map<string, { modelId: string; expiresAt: number }>();

/**
 * Record a latency measurement for a model.
 */
export function recordLatency(modelId: string, latencyMs: number, success: boolean): void {
  const records = latencyStore.get(modelId) || [];
  records.push({
    modelId,
    latencyMs,
    timestamp: Date.now(),
    success,
  });

  // Keep only last 100 records per model
  if (records.length > 100) {
    records.splice(0, records.length - 100);
  }

  latencyStore.set(modelId, records);
}

/**
 * Calculate average latency for a model, considering only recent records.
 */
function calculateAverageLatency(modelId: string, windowMs: number = 300_000): number {
  const records = latencyStore.get(modelId) || [];
  const cutoff = Date.now() - windowMs;
  const recentRecords = records.filter((r) => r.timestamp > cutoff && r.success);

  if (recentRecords.length === 0) {
    return Infinity; // No data = assume slow
  }

  const sum = recentRecords.reduce((acc, r) => acc + r.latencyMs, 0);
  return sum / recentRecords.length;
}

/**
 * Calculate success rate for a model.
 */
function calculateSuccessRate(modelId: string): number {
  const records = latencyStore.get(modelId) || [];
  if (records.length === 0) return 1.0; // No data = assume good

  const recentRecords = records.slice(-50); // Last 50 attempts
  const successes = recentRecords.filter((r) => r.success).length;
  return successes / recentRecords.length;
}

/**
 * Injectable dependencies for the router's credential-usability check.
 * Defaults to the real `hasUsableCredentialsForModel` (DB-backed). Tests can
 * inject a pure stub here instead of mocking the `@/lib/db/providers` module
 * boundary — this project's Node native test runner (`node:test`) has no
 * supported ESM module-mocking mechanism, so DI is the only way to exercise
 * the credential-exclusion branch under `npm run test:unit`.
 */
export interface VisionBridgeRouterDeps {
  hasUsableCredentials?: (model: string) => Promise<boolean | null>;
  getActiveSyncedCatalog?: (provider: string) => Promise<VisionModelCatalog>;
}

export interface VisionModelCatalog {
  authoritative: boolean;
  models: Array<{ id: string }>;
}

type CatalogAwareRegistryModel = {
  id: string;
  liveCatalogIds?: readonly string[];
};

async function readActiveCatalog(
  providerAlias: string,
  deps: VisionBridgeRouterDeps
): Promise<VisionModelCatalog> {
  const readCatalog = deps.getActiveSyncedCatalog ?? getActiveSyncedCatalog;
  try {
    return await readCatalog(providerAlias);
  } catch {
    return { authoritative: false, models: [] };
  }
}

function createCatalogModelPredicate(
  providerAlias: string,
  catalog: VisionModelCatalog
): (model: CatalogAwareRegistryModel) => boolean {
  if (!catalog.authoritative) return () => true;

  const liveIds = new Set(catalog.models.map((entry) => entry.id));
  return (model) => {
    if (liveIds.has(model.id) || model.liveCatalogIds?.some((id) => liveIds.has(id))) {
      return true;
    }

    const effortBaseModelId = getRegisteredProviderEffortBaseModelId(providerAlias, model.id);
    return effortBaseModelId !== null && liveIds.has(effortBaseModelId);
  };
}

async function cachedModelRemainsAvailable(
  fullModelId: string,
  deps: VisionBridgeRouterDeps
): Promise<boolean> {
  const separator = fullModelId.indexOf("/");
  if (separator < 1) return false;

  const providerAlias = fullModelId.slice(0, separator);
  const modelId = fullModelId.slice(separator + 1);
  const registryModel = PROVIDER_MODELS[providerAlias]?.find((model) => model.id === modelId);
  if (!registryModel) return false;

  const catalog = await readActiveCatalog(providerAlias, deps);
  return createCatalogModelPredicate(providerAlias, catalog)(registryModel);
}

/**
 * Get all vision-capable models from the registry that also have a usable
 * active connection on this instance.
 *
 * Without this credential check, a model with no working connection (e.g. the
 * hardcoded default `openai/gpt-4o-mini` on an instance with no `openai`
 * provider connected) could win selection, fail the describe call, and leave
 * the guardrail's describe-failure fallback to forward the raw image to a
 * non-vision backend, which rejects it with an opaque upstream error.
 */
async function getVisionCapableModels(
  deps: VisionBridgeRouterDeps = {}
): Promise<VisionModelCandidate[]> {
  const checkCreds = deps.hasUsableCredentials ?? hasUsableCredentialsForModel;
  const candidatesByProvider = await Promise.all(
    Object.entries(PROVIDER_MODELS).map(async ([providerAlias, models]) => {
      if (!Array.isArray(models)) return [];
      const visionModels = models.filter((model) => {
        if (!model?.id) return false;
        const fullModelId = `${providerAlias}/${model.id}`;
        return (
          getResolvedModelCapabilities(fullModelId).supportsVision === true &&
          !isVisionBridgeForcedModel(fullModelId)
        );
      });
      if (visionModels.length === 0) return [];

      const usableModels = (
        await Promise.all(
          visionModels.map(async (model) =>
            (await checkCreds(`${providerAlias}/${model.id}`)) === false ? null : model
          )
        )
      ).filter((model): model is (typeof visionModels)[number] => model !== null);
      if (usableModels.length === 0) return [];

      const catalog = await readActiveCatalog(providerAlias, deps);
      const modelExistsInCatalog = createCatalogModelPredicate(providerAlias, catalog);

      const candidates = usableModels.map((model): VisionModelCandidate | null => {
        if (!modelExistsInCatalog(model)) return null;

        const fullModelId = `${providerAlias}/${model.id}`;

        let priority = 100;
        if (providerAlias === "openai" || providerAlias === "anthropic") {
          priority = 50;
        } else if (providerAlias === "vertex" || providerAlias === "gemini") {
          priority = 55;
        } else if (providerAlias.startsWith("opencode-")) {
          priority = 95;
        } else {
          priority = 75;
        }

        return {
          modelId: model.id,
          fullName: fullModelId,
          priority,
          averageLatencyMs: calculateAverageLatency(fullModelId),
          lastUsedAt: 0,
          successRate: calculateSuccessRate(fullModelId),
        };
      });

      return candidates.filter(
        (candidate): candidate is VisionModelCandidate => candidate !== null
      );
    })
  );

  return candidatesByProvider.flat();
}

/**
 * Select the best vision model based on latency, priority, and success rate.
 */
function selectBestModel(
  candidates: VisionModelCandidate[],
  config: VisionBridgeRouterConfig
): VisionModelCandidate | null {
  const filtered = candidates.filter((c) => {
    // Exclude explicitly excluded models
    if (config.excludedModels.includes(c.fullName)) return false;
    if (config.excludedModels.includes(c.modelId)) return false;

    // Exclude models with poor success rate (< 50%)
    if (c.successRate < 0.5) return false;

    return true;
  });

  if (filtered.length === 0) return null;

  // Score each candidate: lower is better
  // Score = priority * 1000 + averageLatencyMs
  // This prioritizes local models, then fastest latency
  const scored = filtered.map((c) => ({
    ...c,
    score: c.priority * 1000 + (c.averageLatencyMs === Infinity ? 10000 : c.averageLatencyMs),
  }));

  scored.sort((a, b) => a.score - b.score);

  return scored[0];
}

/**
 * (#12237) `auto` / `auto/*` ids are VIRTUAL combos: there is no provider
 * row for "auto", so the credential check always reports `false` for them.
 * Member-level credentials are enforced downstream when the combo
 * dispatches (mirrors the reroute guard in visionBridge.ts), so a virtual
 * combo must not be discarded by the #8430 short-circuit — otherwise the
 * combo silently falls through to auto-selection and never rotates. It is
 * still subject to the pool check in `getBestVisionModel`: when the ENTIRE
 * vision pool is unusable there is nothing the combo could dispatch to, and
 * returning the combo id would let a raw image reach a text-only backend
 * (#8430).
 *
 * Returns the combo id when `fixedModel` is virtual, `undefined` otherwise.
 */
function resolveVirtualCombo(fixedModel: string | undefined): string | undefined {
  return fixedModel === "auto" || fixedModel?.startsWith("auto/") ? fixedModel : undefined;
}

/**
 * Resolve a live selection-cache entry for `cacheKey`.
 *
 * Returns the id to hand back: the cached member for a concrete target, or
 * `virtualCombo` once the cached member proves it still has usable
 * credentials (the cache never re-validates credentials, and the caller
 * exempts virtual combos from that check). A missing or expired entry yields
 * `null`; an entry whose member is no longer available or usable is dropped
 * so the pool is rescanned.
 */
async function resolveCachedSelection(
  cacheKey: string,
  virtualCombo: string | undefined,
  deps: VisionBridgeRouterDeps
): Promise<string | null> {
  const cached = selectionCache.get(cacheKey);
  if (!cached || cached.expiresAt <= Date.now()) return null;

  if (await cachedModelRemainsAvailable(cached.modelId, deps)) {
    if (!virtualCombo) return cached.modelId;
    const checkCreds = deps.hasUsableCredentials ?? hasUsableCredentialsForModel;
    if ((await checkCreds(cached.modelId)) !== false) return virtualCombo;
  }
  selectionCache.delete(cacheKey);
  return null;
}

/**
 * Get the best vision model for image description.
 * Respects fixed model override if configured, but validates it has usable
 * credentials before short-circuiting — a fixedModel that is confirmed
 * unreachable on this instance falls through to auto-selection.
 * Returns `null` when no vision-capable candidate has usable credentials.
 */
export async function getBestVisionModel(
  config: Partial<VisionBridgeRouterConfig> = {},
  deps: VisionBridgeRouterDeps = {}
): Promise<string | null> {
  const fullConfig = { ...DEFAULT_ROUTER_CONFIG, ...config };
  const virtualCombo = resolveVirtualCombo(fullConfig.fixedModel);

  // If fixed model is configured, validate it has usable credentials first.
  // (#8430) An unreachable fixedModel (e.g. the default "openai/gpt-4o-mini"
  // on an instance with no OpenAI connection/key) must not short-circuit the
  // credential check — fall through to auto-selection instead.
  // (#12237) A virtual combo is exempt here and goes through the pool
  // selection below instead; see `resolveVirtualCombo`.
  if (fullConfig.fixedModel && !virtualCombo) {
    const checkCreds = deps.hasUsableCredentials ?? hasUsableCredentialsForModel;
    const usable = await checkCreds(fullConfig.fixedModel);
    // Only skip credential validation when the check is indeterminate (null).
    // A confirmed `false` means fall through to auto-selection.
    if (usable !== false) {
      return fullConfig.fixedModel;
    }
  }

  // Check selection cache — key includes excluded models to prevent cache pollution
  // across different configurations
  const cacheKey =
    fullConfig.excludedModels.length > 0
      ? `excl:${[...fullConfig.excludedModels].sort().join(",")}`
      : "default";
  const cachedPick = await resolveCachedSelection(cacheKey, virtualCombo, deps);
  if (cachedPick) return cachedPick;

  // Get all vision-capable candidates
  const candidates = await getVisionCapableModels(deps);

  // Select best model
  const best = selectBestModel(candidates, fullConfig);

  if (!best) {
    // No vision-capable candidate has usable credentials on this instance
    return null;
  }

  // Cache the selection
  selectionCache.set(cacheKey, {
    modelId: best.fullName,
    expiresAt: Date.now() + fullConfig.selectionCacheTtlMs,
  });

  // A virtual combo is returned as-is once the pool proves at least one
  // vision-capable member is usable; it rotates its own members downstream.
  return virtualCombo ?? best.fullName;
}

/**
 * Get fallback models for retry logic.
 */
export async function getFallbackModels(
  excludeModel: string,
  config: Partial<VisionBridgeRouterConfig> = {},
  deps: VisionBridgeRouterDeps = {}
): Promise<string[]> {
  const fullConfig = { ...DEFAULT_ROUTER_CONFIG, ...config };
  const candidates = await getVisionCapableModels(deps);

  const filtered = candidates.filter(
    (c) =>
      c.fullName !== excludeModel &&
      !fullConfig.excludedModels.includes(c.fullName) &&
      c.successRate >= 0.5
  );

  // Sort by score
  const scored = filtered.map((c) => ({
    ...c,
    score: c.priority * 1000 + (c.averageLatencyMs === Infinity ? 10000 : c.averageLatencyMs),
  }));

  scored.sort((a, b) => a.score - b.score);

  return scored.slice(0, fullConfig.maxFallbackAttempts - 1).map((c) => c.fullName);
}

/**
 * Clear the selection cache (e.g., after config change).
 */
export function clearSelectionCache(): void {
  selectionCache.clear();
}

/**
 * Get latency statistics for debugging.
 */
export function getLatencyStats(): Record<
  string,
  { avg: number; samples: number; successRate: number }
> {
  const stats: Record<string, { avg: number; samples: number; successRate: number }> = {};

  for (const [modelId, records] of latencyStore.entries()) {
    const recentRecords = records.filter((r) => r.timestamp > Date.now() - 300_000);
    if (recentRecords.length === 0) continue;

    const avg = recentRecords.reduce((acc, r) => acc + r.latencyMs, 0) / recentRecords.length;
    const successRate = recentRecords.filter((r) => r.success).length / recentRecords.length;

    stats[modelId] = {
      avg: Math.round(avg),
      samples: recentRecords.length,
      successRate: Math.round(successRate * 100) / 100,
    };
  }

  return stats;
}
