import type { Model as ModelV2 } from "@opencode-ai/sdk/v2";
import { buildModelDisplayName } from "./naming.js";
import type { FreeModelFreeType } from "./naming.js";

export interface OmniRouteEnrichmentEntry {
  /** Human-readable display name. Replaces ModelV2.name when present. */
  name?: string;
  /** Per-million-token cost overlay onto ModelV2.cost. */
  pricing?: {
    input?: number;
    output?: number;
    cacheRead?: number;
    cacheWrite?: number;
  };
  /**
   * Provider alias prefix seen in `/v1/models` ids (e.g. `cc`, `gemini`).
   * Populated by `defaultOmniRouteEnrichmentFetcher` from
   * `/api/pricing/models` keys. Drives the `usableOnly` alias↔canonical
   * resolution.
   */
  providerAlias?: string;
  /**
   * Canonical provider id used by `/api/providers` connections (e.g.
   * `claude`, `gemini`, `kiro`). Populated from the per-provider
   * `entry.id` field inside `/api/pricing/models`.
   */
  providerCanonical?: string;
  /**
   * Human-readable upstream provider label (e.g. `Claude`, `Kiro`,
   * `Windsurf`, `GitHub Models`). Populated from the per-provider
   * `entry.name` field inside `/api/pricing/models`. Used by the
   * `providerTag` feature to suffix `ModelV2.name` with the routing
   * destination so the OC TUI picker can differentiate the same
   * model id sold through different upstream connections.
   */
  providerDisplayName?: string;
  /** Free-model budget type (from freeModelCatalog). */
  freeType?: FreeModelFreeType;
  /** Monthly token budget for recurring free models. */
  monthlyTokens?: number;
  /** Credit token budget for credit-based free models. */
  creditTokens?: number;
}

/** Map keyed by full model id (possibly namespaced, e.g. `cc/claude-sonnet-4-6`). */
export type OmniRouteEnrichmentMap = Map<string, OmniRouteEnrichmentEntry>;

/**
 * Reverse-index the enrichment map from `providerCanonical → providerAlias`.
 *
 * OmniRoute's `/api/pricing/models` is keyed by short ALIAS (`cc`, `cx`,
 * `pol`). But `/v1/models` exposes some models a SECOND time under their
 * CANONICAL name (`claude/claude-opus-4-7`, `codex/gpt-5.5`,
 * `pollinations/midjourney`). Without a reverse map, those canonical
 * rows miss enrichment entirely and surface as raw ids in the picker.
 *
 * Built once per refresh from the enrichment entries themselves — no
 * hardcoded registry. Only records `canonical → alias` mappings when
 * both are present AND distinct (skips slots where alias === canonical
 * like `kiro`).
 */
export function buildCanonicalToAliasMap(
  enrichment: OmniRouteEnrichmentMap | undefined
): Map<string, string> {
  const out = new Map<string, string>();
  if (!enrichment) return out;
  for (const entry of enrichment.values()) {
    const alias = typeof entry.providerAlias === "string" ? entry.providerAlias.trim() : "";
    const canonical =
      typeof entry.providerCanonical === "string" ? entry.providerCanonical.trim() : "";
    if (alias.length === 0 || canonical.length === 0) continue;
    if (alias === canonical) continue;
    if (!out.has(canonical)) out.set(canonical, alias);
  }
  return out;
}

/**
 * Enrichment lookup with alias-fallback chain.
 *
 * Resolution order (first hit wins):
 *
 *   1. `enrichment.get(rawId)` — direct hit on `<prefix>/<modelId>` or
 *      bare id (the fetcher writes under both forms).
 *   2. If `rawId` is `<canonical>/<modelId>` and `canonicalToAlias` has
 *      a mapping for `canonical`, try `<alias>/<modelId>`. This rescues
 *      duplicate rows like `claude/claude-opus-4-7` (canonical) when
 *      enrichment only indexed under `cc/claude-opus-4-7` (alias).
 *   3. Bare `<modelId>` as a last resort. Already covered by step 1 in
 *      practice (fetcher writes bare keys), but kept defensive.
 *
 * Returns `undefined` when no lookup hits.
 */
export function lookupEnrichment(
  rawId: string,
  enrichment: OmniRouteEnrichmentMap | undefined,
  canonicalToAlias: Map<string, string>
): OmniRouteEnrichmentEntry | undefined {
  if (!enrichment) return undefined;
  const direct = enrichment.get(rawId);
  if (direct) return direct;
  const slash = rawId.indexOf("/");
  if (slash > 0) {
    const prefix = rawId.slice(0, slash);
    const modelId = rawId.slice(slash + 1);
    const alias = canonicalToAlias.get(prefix);
    if (alias && alias !== prefix) {
      const viaAlias = enrichment.get(`${alias}/${modelId}`);
      if (viaAlias) return viaAlias;
    }
    const bare = enrichment.get(modelId);
    if (bare) return bare;
  }
  return undefined;
}

/**
 * Pre-pass: detect raw rows that are the CANONICAL twin of an ALIAS row
 * already in the catalog. Returns the set of canonical-keyed ids to skip
 * during the raw-model loop so each model surfaces exactly once under
 * its enriched alias key.
 *
 * Example: `/v1/models` returns BOTH `cc/claude-opus-4-7` and
 * `claude/claude-opus-4-7`. The former is enriched (alias `cc` exists
 * in `/api/pricing/models`); the latter is raw. We keep `cc/...` and
 * drop `claude/...`.
 *
 * Built once per refresh. Cheap — O(M) where M = raw model count.
 */
export function canonicalDedupSet(
  rawModels: ReadonlyArray<{ id: string }>,
  canonicalToAlias: Map<string, string>
): Set<string> {
  const drop = new Set<string>();
  if (canonicalToAlias.size === 0) return drop;
  // Index every alias key present in the raw catalog.
  const aliasKeys = new Set<string>();
  for (const m of rawModels) {
    if (typeof m.id === "string" && m.id.length > 0) aliasKeys.add(m.id);
  }
  for (const m of rawModels) {
    if (typeof m.id !== "string" || m.id.length === 0) continue;
    const slash = m.id.indexOf("/");
    if (slash <= 0) continue;
    const prefix = m.id.slice(0, slash);
    const modelId = m.id.slice(slash + 1);
    const alias = canonicalToAlias.get(prefix);
    if (!alias || alias === prefix) continue;
    // Canonical row only gets suppressed if the alias row actually
    // exists — otherwise we'd hide the model entirely.
    if (aliasKeys.has(`${alias}/${modelId}`)) drop.add(m.id);
  }
  return drop;
}

/**
 * Build a per-alias index of enrichment metadata so we can render the
 * provider prefix even for raw models that don't have their own
 * curated `/api/pricing/models` entry.
 *
 * Real example: OmniRoute's `pricing['cohere']` slot lists 10 curated
 * models but `/v1/models` also returns `cohere/rerank-multilingual-v3.0`
 * and `cohere/rerank-v4.0-fast` (not in the curated 10). Without this
 * index, those rows surface in the picker as `cohere/...` with no
 * `Cohere - ` prefix because the per-model enrichment lookup misses.
 *
 * This index records the first non-empty `providerDisplayName` seen
 * for each alias, plus the alias itself. Callers use it to synthesize
 * a minimal `OmniRouteEnrichmentEntry` whenever the direct lookup
 * misses but the raw id's prefix matches a known alias.
 *
 * Built once per refresh; first-wins on duplicate alias (matches
 * `buildCanonicalToAliasMap` semantics).
 */
export function buildAliasIndex(
  enrichment: OmniRouteEnrichmentMap | undefined
): Map<string, OmniRouteEnrichmentEntry> {
  const out = new Map<string, OmniRouteEnrichmentEntry>();
  if (!enrichment) return out;
  for (const entry of enrichment.values()) {
    const alias = typeof entry.providerAlias === "string" ? entry.providerAlias.trim() : "";
    if (alias.length === 0) continue;
    if (out.has(alias)) {
      // First-wins, but upgrade to the first entry that carries a
      // non-empty providerDisplayName so the prefix renders nicely.
      const existing = out.get(alias);
      if (
        existing &&
        (!existing.providerDisplayName || existing.providerDisplayName.trim().length === 0) &&
        typeof entry.providerDisplayName === "string" &&
        entry.providerDisplayName.trim().length > 0
      ) {
        out.set(alias, entry);
      }
      continue;
    }
    out.set(alias, entry);
  }
  return out;
}

/**
 * Resolve a synthesised enrichment entry for `applyProviderTag` /
 * `shortProviderLabel` consumption, combining two sources:
 *
 *  1. The direct per-model enrichment match (if present).
 *  2. A per-alias fallback derived from `buildAliasIndex` — covers raw
 *     ids whose prefix matches a known alias but the specific model
 *     id wasn't curated in `/api/pricing/models`. Example:
 *     `cohere/rerank-multilingual-v3.0` falls back to the cohere slot's
 *     `providerDisplayName='Cohere'` even though that specific id
 *     isn't in the curated 10-model list.
 *
 * Returns `undefined` when neither source surfaces an alias.
 *
 * NOTE: this function is read-only over its inputs; it never mutates
 * the underlying `direct` entry. When it falls back to the alias
 * index, it constructs a fresh minimal entry exposing only the
 * provider-prefix fields (`providerAlias`, `providerCanonical`,
 * `providerDisplayName`). Other fields (name, pricing) are explicitly
 * left undefined so `applyEnrichment` won't accidentally overwrite a
 * model name with the alias-slot label.
 */
export function resolveProviderTagEntry(
  rawId: string,
  direct: OmniRouteEnrichmentEntry | undefined,
  aliasIndex: Map<string, OmniRouteEnrichmentEntry>,
  canonicalToAlias?: Map<string, string>
): OmniRouteEnrichmentEntry | undefined {
  if (direct) {
    const alias = typeof direct.providerAlias === "string" ? direct.providerAlias.trim() : "";
    const display =
      typeof direct.providerDisplayName === "string" ? direct.providerDisplayName.trim() : "";
    if (alias.length > 0 || display.length > 0) return direct;
  }
  const slash = rawId.indexOf("/");
  if (slash <= 0) return direct;
  const prefix = rawId.slice(0, slash);
  // 1. Direct alias lookup (`cohere/...` → cohere slot keyed by alias=cohere).
  let fromAlias = aliasIndex.get(prefix);
  // 2. Canonical fallback (`pollinations/...` → look up via alias `pol`).
  if (!fromAlias && canonicalToAlias) {
    const alias = canonicalToAlias.get(prefix);
    if (alias) fromAlias = aliasIndex.get(alias);
  }
  if (!fromAlias) return direct;
  // Synthesize: borrow only the provider-prefix metadata.
  return {
    providerAlias: fromAlias.providerAlias,
    providerCanonical: fromAlias.providerCanonical,
    providerDisplayName: fromAlias.providerDisplayName,
  };
}

/**
 * Fetcher contract: resolves the enrichment overlay (display names +
 * pricing + free-tier budgets) from a running OmniRoute instance.
 */
/**
 * Reports a source that could not be read. Enrichment stays best-effort, but
 * a caller that swallows this loses display names, provider tags, canonical
 * dedupe and pricing with no way to tell why.
 */
export type OmniRouteEnrichmentSourceError = (endpoint: string, reason: string) => void;

export type OmniRouteEnrichmentFetcher = (
  baseURL: string,
  apiKey: string,
  timeoutMs?: number,
  onSourceError?: OmniRouteEnrichmentSourceError
) => Promise<OmniRouteEnrichmentMap>;

function trimTrailingSlashes(value: string): string {
  let i = value.length;
  while (i > 0 && value.charCodeAt(i - 1) === 0x2f /* "/" */) i--;
  return i === value.length ? value : value.slice(0, i);
}

/**
 * Default enrichment fetcher — pulls nice display names from
 * `GET /api/pricing/models` and merges per-million-token pricing from
 * `GET /api/pricing` (the actual pricing source — `/api/pricing/models` is
 * a catalog endpoint whose entries are `{id, name, custom}` only).
 *
 * `/api/pricing/models` shape (catalog):
 *  - `{ [providerAlias]: { id, alias, name, models: [{ id, name, custom }] } }`
 *
 * `/api/pricing` shape (pricing only):
 *  - `{ [providerAlias]: { [modelId]: { input, output, cached, reasoning, cache_creation } } }`
 *    where values are USD per million tokens.
 *
 * The two responses are joined on `(providerAlias, modelId)` and the merged
 * entries are stored under both `${providerAlias}/${modelId}` and bare
 * `${modelId}` keys so downstream lookups against either form succeed.
 *
 * Soft-fails (returns whatever was collected) on non-2xx or parse errors;
 * the two fetches are independent so one missing source still surfaces the
 * other. A third best-effort fetch attaches free-tier budgets from
 * `/api/free-tier/summary`.
 *
 * Ported from the v1 plugin (`index.ts:1906-2106`); the shared logger is
 * the only intentional difference (no plugin-contract dependency here).
 */
export const defaultOmniRouteEnrichmentFetcher: OmniRouteEnrichmentFetcher = async (
  baseURL,
  apiKey,
  timeoutMs = 10_000,
  onSourceError
) => {
  const report = (endpoint: string, reason: unknown): void => {
    onSourceError?.(endpoint, reason instanceof Error ? reason.message : String(reason));
  };
  const out: OmniRouteEnrichmentMap = new Map();
  if (!baseURL || !apiKey) return out;
  const root = trimTrailingSlashes(baseURL.replace(/\/v1\/?$/, ""));
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Accept: "application/json",
  };

  // 1. Catalog with nice display names.
  const catalogAc = new AbortController();
  const catalogTimer = setTimeout(() => catalogAc.abort(), timeoutMs);
  let catalogStatus = 0;
  try {
    const res = await fetch(`${root}/api/pricing/models`, {
      method: "GET",
      headers,
      signal: catalogAc.signal,
    });
    catalogStatus = res.status;
    if (res.ok) {
      const body = (await res.json()) as unknown;
      const providers =
        (body as { providers?: Record<string, { models?: unknown[] }> })?.providers ??
        (body as Record<string, { models?: unknown[] }>);
      if (providers && typeof providers === "object") {
        for (const [providerAlias, slot] of Object.entries(providers)) {
          if (!slot || typeof slot !== "object") continue;
          const models = (slot as { models?: unknown[] }).models;
          if (!Array.isArray(models)) continue;
          const canonicalRaw = (slot as { id?: unknown }).id;
          const providerCanonical =
            typeof canonicalRaw === "string" && canonicalRaw.length > 0
              ? canonicalRaw
              : providerAlias;
          const slotNameRaw = (slot as { name?: unknown }).name;
          const providerDisplayName =
            typeof slotNameRaw === "string" && slotNameRaw.trim().length > 0
              ? slotNameRaw.trim()
              : undefined;
          for (const m of models) {
            if (!m || typeof m !== "object") continue;
            const id = (m as { id?: unknown }).id;
            if (typeof id !== "string" || id.length === 0) continue;
            const name = (m as { name?: unknown }).name;
            const entry: OmniRouteEnrichmentEntry = {
              providerAlias,
              providerCanonical,
            };
            if (providerDisplayName) entry.providerDisplayName = providerDisplayName;
            if (typeof name === "string" && name.trim().length > 0) entry.name = name;
            const namespaced = `${providerAlias}/${id}`;
            if (!out.has(namespaced)) out.set(namespaced, entry);
            // The bare id is a fallback for ids that arrive unnamespaced. It
            // gets its OWN copy: sharing the object would let a later write
            // for one provider — a price, typically — land on another
            // provider's entry that happens to sell the same model id.
            if (!out.has(id)) out.set(id, { ...entry });
          }
        }
      }
    }
  } catch (err) {
    // Network error, timeout, abort: nothing collected from THIS source, but
    // the pricing fetch below may still succeed — let it try, then decide at
    // the end whether the whole overlay failed (see the throw below).
    report("/api/pricing/models", err);
    catalogStatus = -1;
  } finally {
    clearTimeout(catalogTimer);
  }
  if (
    catalogStatus !== 0 &&
    catalogStatus !== -1 &&
    (catalogStatus < 200 || catalogStatus >= 300)
  ) {
    report("/api/pricing/models", `HTTP ${catalogStatus}`);
  }

  // 2. Pricing values from /api/pricing.
  const priceAc = new AbortController();
  const priceTimer = setTimeout(() => priceAc.abort(), timeoutMs);
  let priceStatus = 0;
  try {
    const res = await fetch(`${root}/api/pricing`, {
      method: "GET",
      headers,
      signal: priceAc.signal,
    });
    priceStatus = res.status;
    if (res.ok) {
      const body = (await res.json()) as unknown;
      if (body && typeof body === "object" && !Array.isArray(body)) {
        for (const [providerAlias, slot] of Object.entries(body as Record<string, unknown>)) {
          if (!slot || typeof slot !== "object" || Array.isArray(slot)) continue;
          for (const [modelId, raw] of Object.entries(slot as Record<string, unknown>)) {
            if (!raw || typeof raw !== "object") continue;
            const p = raw as Record<string, unknown>;
            const parsed: NonNullable<OmniRouteEnrichmentEntry["pricing"]> = {};
            if (typeof p.input === "number") parsed.input = p.input;
            if (typeof p.output === "number") parsed.output = p.output;
            const cacheRead =
              typeof p.cached === "number"
                ? p.cached
                : typeof p.cacheRead === "number"
                  ? p.cacheRead
                  : undefined;
            if (typeof cacheRead === "number") parsed.cacheRead = cacheRead;
            const cacheWrite =
              typeof p.cache_creation === "number"
                ? p.cache_creation
                : typeof p.cacheWrite === "number"
                  ? p.cacheWrite
                  : undefined;
            if (typeof cacheWrite === "number") parsed.cacheWrite = cacheWrite;
            if (Object.keys(parsed).length === 0) continue;
            const namespaced = `${providerAlias}/${modelId}`;
            const existingNs = out.get(namespaced);
            if (existingNs) {
              existingNs.pricing = { ...(existingNs.pricing ?? {}), ...parsed };
            } else {
              out.set(namespaced, { pricing: parsed });
            }
            const existingBare = out.get(modelId);
            // Only the provider that owns the bare entry may price it.
            // Otherwise the second provider selling the same model id
            // overwrites the first one's price, and the picker shows a cost
            // that belongs to a different connection.
            const bareBelongsHere =
              existingBare === undefined || existingBare.providerAlias === undefined
                ? true
                : existingBare.providerAlias === providerAlias;
            if (bareBelongsHere) {
              if (existingBare) {
                existingBare.pricing = { ...(existingBare.pricing ?? {}), ...parsed };
              } else {
                out.set(modelId, { pricing: parsed });
              }
            }
          }
        }
      }
    }
  } catch (err) {
    // Same as above: report, mark this source failed, let the remaining
    // sources try before deciding.
    report("/api/pricing", err);
    priceStatus = -1;
  } finally {
    clearTimeout(priceTimer);
  }
  if (priceStatus !== 0 && priceStatus !== -1 && (priceStatus < 200 || priceStatus >= 300)) {
    report("/api/pricing", `HTTP ${priceStatus}`);
  }

  // 3. Free model budgets from /api/free-tier/summary (best-effort).
  const freeAc = new AbortController();
  const freeTimer = setTimeout(() => freeAc.abort(), timeoutMs);
  let freeStatus = 0;
  try {
    const res = await fetch(`${root}/api/free-tier/summary`, {
      method: "GET",
      headers,
      signal: freeAc.signal,
    });
    freeStatus = res.status;
    if (res.ok) {
      const body = (await res.json()) as unknown;
      const perModel: unknown[] =
        body && typeof body === "object" && Array.isArray((body as { perModel?: unknown }).perModel)
          ? ((body as { perModel: unknown[] }).perModel as unknown[])
          : Array.isArray(body)
            ? (body as unknown[])
            : [];
      for (const fm of perModel) {
        if (!fm || typeof fm !== "object") continue;
        const fmObj = fm as Record<string, unknown>;
        const provider = typeof fmObj.provider === "string" ? fmObj.provider : "";
        const modelId = typeof fmObj.modelId === "string" ? fmObj.modelId : "";
        const freeType = typeof fmObj.freeType === "string" ? fmObj.freeType : "";
        if (!modelId || !freeType) continue;
        const monthlyTokens =
          typeof fmObj.monthlyTokens === "number" ? fmObj.monthlyTokens : undefined;
        const creditTokens =
          typeof fmObj.creditTokens === "number" ? fmObj.creditTokens : undefined;
        const displayName = typeof fmObj.displayName === "string" ? fmObj.displayName : "";
        const candidates = [
          `${provider}/${modelId}`,
          modelId,
          ...(displayName ? [displayName] : []),
        ];
        for (const key of candidates) {
          const entry = out.get(key);
          if (entry) {
            entry.freeType = freeType as FreeModelFreeType;
            if (monthlyTokens !== undefined) entry.monthlyTokens = monthlyTokens;
            if (creditTokens !== undefined) entry.creditTokens = creditTokens;
            break;
          }
        }
      }
    }
  } catch (err) {
    report("/api/free-tier/summary", err);
    // Soft-fail; free metadata is optional.
  } finally {
    clearTimeout(freeTimer);
  }
  if (freeStatus !== 0 && (freeStatus < 200 || freeStatus >= 300)) {
    report("/api/free-tier/summary", `HTTP ${freeStatus}`);
  }

  // A source that failed contributes nothing — but the overlay keeps its own
  // memory per source: names collected while the catalog endpoint answered
  // survive a later pricing outage, and prices collected while pricing
  // answered survive a later catalog outage. Without this a single flapping
  // source wipes the other source's good data on every refresh. So a failed
  // catalog source throws (the caller keeps last-known) UNLESS the pricing
  // source brought something on THIS call — then whatever was collected,
  // names or prices, is the gateway's answer and ships as-is. (Status alone
  // cannot decide: a 2xx pricing answer with zero priced models is still an
  // answer, but it carries nothing to save the overlay with.)
  const sourceFailed = (status: number): boolean =>
    status === -1 || (status !== 0 && (status < 200 || status >= 300));
  const catalogFailed = sourceFailed(catalogStatus);
  const pricingBroughtSomething = !sourceFailed(priceStatus) && out.size > 0;
  if (catalogFailed && !pricingBroughtSomething) {
    throw new Error(
      `enrichment catalog source failed (pricing/models: ${catalogStatus}, pricing: ${priceStatus})`
    );
  }

  return out;
};

/**
 * Apply enrichment overlay onto a ModelV2 entry. Mutates and returns the
 * passed entry for convenience.
 */
/** What the caller knows about the entry that the overlay itself cannot tell. */
export interface EnrichmentDisplayContext {
  /** Combos never carry a provider tag: they route across providers. */
  isCombo?: boolean;
  isAutoCombo?: boolean;
  /** Set false to publish the bare display name, without the provider tag. */
  providerTag?: boolean;
}

/**
 * Fold the overlay into a mapped model: display name, provider tag, free-tier
 * marker and budget, and pricing.
 *
 * The name is built rather than copied, because the gateway ships the parts
 * separately — the pricing catalog gives a display name and an upstream
 * provider label, the free-tier summary gives the budget. A picker showing
 * `Claude - [Free] Sonnet 4.6 · 1M/mo` tells the user which connection serves
 * the model and what it costs them; `claude-sonnet-4-6` tells them nothing.
 */
export function applyEnrichment(
  model: ModelV2,
  enrichment: OmniRouteEnrichmentEntry | undefined,
  context: EnrichmentDisplayContext = {}
): ModelV2 {
  if (!enrichment) return model;
  const built = buildModelDisplayName({
    rawId: model.name && model.name.length > 0 ? model.name : model.id,
    enrichmentName: enrichment.name,
    providerAlias: context.providerTag === false ? undefined : enrichment.providerAlias,
    providerDisplayName: context.providerTag === false ? undefined : enrichment.providerDisplayName,
    isFree: enrichment.freeType !== undefined,
    freeType: enrichment.freeType,
    monthlyTokens: enrichment.monthlyTokens,
    creditTokens: enrichment.creditTokens,
    isCombo: context.isCombo,
    isAutoCombo: context.isAutoCombo,
  });
  if (built.trim().length > 0) {
    model.name = built;
  }
  if (enrichment.pricing) {
    if (typeof enrichment.pricing.input === "number") {
      model.cost.input = enrichment.pricing.input;
    }
    if (typeof enrichment.pricing.output === "number") {
      model.cost.output = enrichment.pricing.output;
    }
    if (typeof enrichment.pricing.cacheRead === "number") {
      model.cost.cache.read = enrichment.pricing.cacheRead;
    }
    if (typeof enrichment.pricing.cacheWrite === "number") {
      model.cost.cache.write = enrichment.pricing.cacheWrite;
    }
  }
  return model;
}
