import { FREE_MODEL_BUDGETS } from "@omniroute/open-sse/config/freeModelCatalog";
import { resolveProviderId } from "@/shared/constants/providers";
import { globToRegex } from "@/shared/utils/globPattern";
import { AI_MODELS } from "@/shared/constants/models";

/**
 * Free-model detection shared between the "import only free models" connection
 * option (Add API Key modal) and the model-sync import filter.
 *
 * A provider is considered to "have free models" when it appears in the
 * documented free-tier catalog (`FREE_MODEL_BUDGETS`). A single model is
 * considered free when its id carries the OpenRouter-style `:free` suffix, when
 * both its prompt and completion prices are zero, or when its id is listed as a
 * free model for that provider in the catalog.
 */

/** Provider ids that have at least one documented free model. */
export const PROVIDERS_WITH_FREE_MODELS: Set<string> = new Set(
  FREE_MODEL_BUDGETS.map((m) => m.provider)
);

const FREE_MODEL_IDS_BY_PROVIDER: Map<string, Set<string>> = (() => {
  const map = new Map<string, Set<string>>();
  for (const m of FREE_MODEL_BUDGETS) {
    let set = map.get(m.provider);
    if (!set) {
      set = new Set<string>();
      map.set(m.provider, set);
    }
    set.add(m.modelId);
  }
  return map;
})();

/** Whether the given provider exposes any documented free models. Accepts a provider id or alias. */
export function providerHasFreeModels(providerId: string | undefined | null): boolean {
  if (typeof providerId !== "string") return false;
  return (
    PROVIDERS_WITH_FREE_MODELS.has(providerId) ||
    PROVIDERS_WITH_FREE_MODELS.has(resolveProviderId(providerId))
  );
}

function isZeroPrice(value: unknown): boolean {
  if (typeof value === "number") return value === 0;
  if (typeof value !== "string") return false;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed === 0;
}

export interface FreeModelCandidate {
  id?: string;
  pricing?: { prompt?: string | number; completion?: string | number };
}

/** Whether a single fetched model qualifies as free for the given provider (id or alias). */
export function isFreeModel(provider: string, model: FreeModelCandidate): boolean {
  if (typeof model.id === "string" && model.id.endsWith(":free")) return true;
  if (isZeroPrice(model.pricing?.prompt) && isZeroPrice(model.pricing?.completion)) return true;
  if (typeof model.id === "string") {
    const canonical = resolveProviderId(provider);
    if (
      FREE_MODEL_IDS_BY_PROVIDER.get(provider)?.has(model.id) ||
      FREE_MODEL_IDS_BY_PROVIDER.get(canonical)?.has(model.id)
    ) {
      return true;
    }
  }
  return false;
}

export interface SelectModelsForImportResult<T extends FreeModelCandidate> {
  models: T[];
  /**
   * True when the caller asked for free-only, models were fetched, but none of
   * them qualified as free — so nothing will be imported. Lets the UI show a
   * clear "no free models found" message instead of a silent empty import.
   */
  freeFilterEmpty: boolean;
}

/**
 * Stable "free first" sort: free models before paid, ties broken alphabetically
 * by a caller-supplied key so the order stays deterministic across re-renders and
 * data refetches (e.g. while "Test all" runs). Returns a new array; does not mutate.
 */
export function sortModelsFreeFirst<T>(
  items: T[],
  opts: { isFree: (item: T) => boolean; key: (item: T) => string }
): T[] {
  return [...items].sort((a, b) => {
    const fa = opts.isFree(a);
    const fb = opts.isFree(b);
    if (fa !== fb) return fa ? -1 : 1;
    return opts.key(a).localeCompare(opts.key(b));
  });
}

/**
 * Decide which fetched models to import. When `importFreeOnly` is false the list
 * passes through unchanged. When true, only free models are kept.
 */
export function selectModelsForImport<T extends FreeModelCandidate>(
  provider: string,
  fetchedModels: T[],
  importFreeOnly: boolean
): SelectModelsForImportResult<T> {
  if (!importFreeOnly) {
    return { models: fetchedModels, freeFilterEmpty: false };
  }
  const models = fetchedModels.filter((m) => isFreeModel(provider, m));
  const freeFilterEmpty = fetchedModels.length > 0 && models.length === 0;
  return { models, freeFilterEmpty };
}

// ──────────────────────────────────────────────────────────
// hidePaidModels save-time validation (#6540)
// ──────────────────────────────────────────────────────────

export type PaidModelTargetVerdict = "paid" | "free" | "unknown";

/**
 * Classify a settings-style model string ("provider/model" or
 * "provider,model") as paid/free/unknown against the documented free
 * catalog. Fails open ("unknown") for anything that doesn't cleanly parse
 * into a (provider, model) pair, or whose provider isn't in the free
 * catalog at all — this covers aliases, combo names, and custom/synced
 * rows, mirroring the exemptions `catalog.ts`'s `shouldHidePaid` already
 * makes for those row types.
 */
export function isPaidModelTarget(value: string): PaidModelTargetVerdict {
  if (typeof value !== "string" || value.trim() === "") return "unknown";
  const separator = value.includes("/") ? "/" : value.includes(",") ? "," : null;
  if (!separator) return "unknown";
  const [provider, ...rest] = value.split(separator);
  const model = rest.join(separator);
  if (!provider || !model) return "unknown";
  if (!providerHasFreeModels(provider)) return "unknown";
  return isFreeModel(provider, { id: model }) ? "free" : "paid";
}

/**
 * Whether a glob `pattern` (as used by `ModelRoutingSection`'s per-model
 * combo mappings) resolves ONLY to paid models in the catalog. Fails open
 * (returns `false`) when the pattern matches nothing recognizable, or when
 * at least one match is free — only an all-paid match set is flagged, so a
 * mixed-catalog pattern is never blocked.
 */
export function matchesOnlyPaidModels(pattern: string): boolean {
  if (typeof pattern !== "string" || pattern.trim() === "") return false;
  let regex: RegExp;
  try {
    regex = globToRegex(pattern);
  } catch {
    return false;
  }
  let matched = false;
  for (const m of AI_MODELS) {
    const fullId = `${m.provider}/${m.model}`;
    if (!regex.test(fullId)) continue;
    matched = true;
    if (isFreeModel(m.provider, { id: m.model })) return false;
  }
  return matched;
}
