import { FREE_MODEL_BUDGETS, grantsFreeAccess } from "@omniroute/open-sse/config/freeModelCatalog";
import { resolveProviderId } from "@/shared/constants/providers";
import { globToRegex } from "@/shared/utils/globPattern";
import { AI_MODELS } from "@/shared/constants/models";

/**
 * Free-model detection shared between the "import only free models" connection
 * option (Add API Key modal) and the model-sync import filter.
 *
 * Two regimes answer "is it free?", on purpose, from different sources:
 *
 *  - **Counting / displaying** (free-token totals, dashboards) MAY use the
 *    resolved catalog: the shipped baseline overlaid by the Radar feed
 *    (`getRadarCatalog` in `src/lib/radar/index.ts`). Totals are
 *    informational and may improve when a feed is available.
 *
 *  - **Deciding** (is this provider/model free? should it be imported? should
 *    `auto/*` route to it? should it appear in `GET /v1/models`?) reads ONLY
 *    the shipped catalog `FREE_MODEL_BUDGETS`
 *    (`open-sse/config/freeModelCatalog.data.ts`) plus the local heuristics
 *    below. It must never reach `getRadarCatalog` / `getRadarCache`.
 *
 * Why deciding stays on the shipped catalog: the answer is then identical in
 * the browser and on the server, reproducible offline from the release
 * artifact, and unit-testable without seeding a database. This module runs in
 * both — six `"use client"` components import it — so a DB-backed read here
 * would also drag the SQLite driver into the client bundle. Splitting it
 * instead (server reads the feed, browser keeps the baseline) would make the
 * import modal's preview disagree with the import route that runs on click.
 *
 * A provider is considered to "have free models" when it appears in the
 * documented free-tier catalog (`FREE_MODEL_BUDGETS`). A single model is considered free when — for a provider with a documented
 * free tier — its id carries the OpenRouter-style `:free` suffix or both its
 * prompt and completion prices are zero (guarded heuristics), or when its id
 * is listed as a free model for that provider in the shipped catalog.
 *
 * The catalog also records the regime of every entry via `freeType`
 * (`FreeModelFreeType`). A regime can retire a free tier behind a paid key
 * (`discontinued`); `grantsFreeAccess` is the single predicate that decides
 * whether a regime still grants free access, and the two structures below are
 * derived only from entries whose regime grants it — so a `discontinued` entry
 * is never reported free, and a future regime that forgets to be classified
 * fails to compile rather than defaulting silently.
 */

/** Catalogued entries whose regime still grants free access. */
const FREE_BUDGETS = FREE_MODEL_BUDGETS.filter((m) => grantsFreeAccess(m.freeType));

/** Provider ids that have at least one documented free model. */
export const PROVIDERS_WITH_FREE_MODELS: Set<string> = new Set(FREE_BUDGETS.map((m) => m.provider));

const FREE_MODEL_IDS_BY_PROVIDER: Map<string, Set<string>> = (() => {
  const map = new Map<string, Set<string>>();
  for (const m of FREE_BUDGETS) {
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
  isFree?: boolean;
}

function isFreeModelInternal(
  provider: string,
  model: FreeModelCandidate,
  trustedIsFree: boolean
): boolean {
  if (model.isFree === true && (trustedIsFree || providerHasFreeModels(provider))) return true;
  const guarded = providerHasFreeModels(provider);
  if (typeof model.id === "string") {
    const canonical = resolveProviderId(provider);
    if (
      FREE_MODEL_IDS_BY_PROVIDER.get(provider)?.has(model.id) ||
      FREE_MODEL_IDS_BY_PROVIDER.get(canonical)?.has(model.id)
    ) {
      return true;
    }
  }
  if (typeof model.id === "string" && model.id.endsWith(":free") && guarded) return true;
  if (isZeroPrice(model.pricing?.prompt) && isZeroPrice(model.pricing?.completion) && guarded)
    return true;
  return false;
}

/** Fetched/synced predicate — guarded heuristics + shipped catalog (untrusted payload). */
export function isFreeModel(provider: string, model: FreeModelCandidate): boolean {
  return isFreeModelInternal(provider, model, false);
}

/** Reusable free predicate for fetched payloads — provider must have a documented free tier. */
export function isFreeForProvider(provider: string, model: FreeModelCandidate): boolean {
  return providerHasFreeModels(provider) && isFreeModel(provider, model);
}

/** Trusted variant for local custom rows — `isFree:true` without provider guard. */
export function isTrustedCustomFree(provider: string, model: FreeModelCandidate): boolean {
  return isFreeModelInternal(provider, model, true);
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
    if (isFreeForProvider(m.provider, { id: m.model })) return false;
  }
  return matched;
}
