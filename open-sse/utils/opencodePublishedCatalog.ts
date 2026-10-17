/**
 * Model surfaces the published OpenCode catalog declares (`provider.npm`), kept apart from
 * the endpoint reader so `open-sse/config/providerModels.ts` can read them from the client
 * bundle: that reader reaches `node:fs`, `node:os` and `node:path` for its persisted cache.
 * Same split as #10692 (data apart from endpoint-only logic). Nothing here networks, reads a
 * file, or imports a `node:` builtin.
 *
 * The map is filled by the endpoint module from the same `models.opencode.ai/api.json` read
 * that resolves the base URL, and rewritten as a block on every catalog read: one entry per
 * published model, no per-request growth, and a model the catalog moves to another SDK
 * shows its new surface on the next refresh.
 */

/** Catalog sections read for the model surface, mapped from the normalized alias. */
const NPM_CATALOG_KEY_BY_ALIAS: Record<string, string> = {
  oc: "opencode",
  "opencode-zen": "opencode",
  "opencode-go": "opencode-go",
};

/** Raw provider ids map to the same sections as their public alias. */
const NPM_ALIAS_BY_PROVIDER_ID: Record<string, string> = {
  opencode: "oc",
  "opencode-zen": "opencode-zen",
  "opencode-go": "opencode-go",
};

const OPENCODE_MODEL_PREFIXES = ["opencode/", "oc/", "opencode-zen/", "opencode-go/"] as const;

/** Raw `provider.npm` by `${catalogKey} ${modelId}`; rewritten as a block per catalog read. */
const npmByModel = new Map<string, string>();

/** Set by the endpoint module: the coalesced catalog refresh that keeps this map current. */
let requestCatalogRefresh: (() => void) | null = null;

/**
 * Registered once by the endpoint module, which owns the catalog fetch and the refresh
 * rhythm. A process that never loads that module (the client bundle) reads an empty map
 * and falls back to the registry.
 */
export function setPublishedCatalogRefreshTrigger(trigger: () => void): void {
  requestCatalogRefresh = trigger;
}

/** Raw `provider.npm` values by `${catalogKey} ${modelId}`, from one catalog read. */
export function readPublishedNpmByModel(catalog: unknown): Map<string, string> {
  const map = new Map<string, string>();
  if (!catalog || typeof catalog !== "object") return map;
  const sections = catalog as Record<string, { models?: Record<string, unknown> } | undefined>;
  for (const sectionKey of new Set(Object.values(NPM_CATALOG_KEY_BY_ALIAS))) {
    const models = sections[sectionKey]?.models;
    if (!models || typeof models !== "object") continue;
    for (const [modelId, entry] of Object.entries(models)) {
      const npm = (entry as { provider?: { npm?: unknown } } | null | undefined)?.provider?.npm;
      if (typeof npm === "string" && npm.trim()) map.set(`${sectionKey} ${modelId}`, npm);
    }
  }
  return map;
}

/** Replace every entry with one catalog read's result (the endpoint module owns the rhythm). */
export function replacePublishedCatalogNpm(next: Map<string, string>): void {
  npmByModel.clear();
  for (const [key, npm] of next) npmByModel.set(key, npm);
}

/** Drop every entry: the persisted-cache load and the test reset both start from empty. */
export function clearPublishedCatalogNpm(): void {
  npmByModel.clear();
}

/**
 * Sync hot path: the raw `provider.npm` the catalog publishes for this model, or
 * `undefined` when the catalog is silent. Never networks; the registered trigger starts one
 * coalesced background refresh when the map is stale or cold.
 */
export function getPublishedModelNpm(
  providerId: string | null | undefined,
  modelId: string | null | undefined
): string | undefined {
  const catalogKey = normalizeCatalogKey(providerId);
  const bareModel = stripCatalogModelPrefix(modelId);
  if (!catalogKey || !bareModel) return undefined;
  requestCatalogRefresh?.();
  return (
    npmByModel.get(`${catalogKey} ${bareModel}`) ??
    npmByModel.get(`${catalogKey} ${stripEffortSuffix(bareModel)}`)
  );
}

/**
 * The target format a published SDK rides, or `null` when the catalog decides nothing.
 * Only the measured SDKs map: everything else falls back to the registry heuristics.
 */
export function surfaceTargetFormatForNpm(npm: string | null | undefined): string | null {
  if (npm === "@ai-sdk/openai") return "openai-responses";
  if (npm === "@ai-sdk/anthropic") return "claude";
  return null;
}

/**
 * Test seam. Seeds the raw catalog surface map from a catalog-shaped object, without
 * networking: `catalog[section].models[modelId].provider.npm` (non-empty strings kept).
 */
export function configurePublishedCatalogForTests(catalog: unknown): void {
  replacePublishedCatalogNpm(readPublishedNpmByModel(catalog));
}

/** Alias, raw id or prefixed id → the catalog section key, or `undefined` outside opencode. */
function normalizeCatalogKey(providerId: string | null | undefined): string | undefined {
  if (typeof providerId !== "string" || !providerId) return undefined;
  const alias = NPM_ALIAS_BY_PROVIDER_ID[providerId] ?? providerId;
  return NPM_CATALOG_KEY_BY_ALIAS[alias];
}

function stripCatalogModelPrefix(modelId: string | null | undefined): string | undefined {
  if (typeof modelId !== "string" || !modelId) return undefined;
  for (const prefix of OPENCODE_MODEL_PREFIXES) {
    if (modelId.startsWith(prefix)) return modelId.slice(prefix.length);
  }
  return modelId;
}

function stripEffortSuffix(modelId: string): string {
  return modelId.replace(/-(?:ultra|max|xhigh|high|medium|low|none)$/i, "");
}
