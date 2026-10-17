import type { OmniRouteEnrichmentEntry, OmniRouteEnrichmentMap } from "./enrich.js";
import { isFreeOnlyFreeType } from "./naming.js";

/**
 * Signals that can admit a model under `freeOnly` besides the declared
 * free-tier catalog:
 *
 *   - `declared`: the free-tier catalog classifies the model (the default,
 *     and the only signal that ever applies when this list is absent).
 *   - `priced`: the pricing table prices the model at zero for both input
 *     and output.
 *   - `named`: the model id ends in `-free` or `:free` and the pricing table
 *     holds no price for it.
 *   - `provider-named`: the provider prefix ends in `-free`, or is listed in
 *     `freeProviders`.
 *
 * Everything but `declared` is an inference. Inferred models are labelled
 * `(free, inferred)` so the picker never presents them as a free-tier
 * contract.
 */
export const FREE_SIGNALS = ["declared", "priced", "named", "provider-named"] as const;
export type FreeSignal = (typeof FREE_SIGNALS)[number];

export const DEFAULT_FREE_SIGNALS: readonly FreeSignal[] = ["declared"];

export interface FreeSignalContext {
  signals: readonly FreeSignal[];
  freeProviders?: readonly string[];
  enrichment: OmniRouteEnrichmentMap | undefined;
  canonicalToAlias: Map<string, string>;
}

const NAME_MARKER = /(?:-free|:free)$/i;
const PREFIX_MARKER = /-free$/i;
const ROUTER_SEGMENT = /^auto(?:-|$)/i;

/** True when the context asks for at least one inferred signal. */
export function hasInferredSignals(signals: readonly FreeSignal[] | undefined): boolean {
  return signals !== undefined && signals.some((s) => s !== "declared");
}

/**
 * Entry lookup restricted to `<provider>/<model>` keys. The bare-id fallback
 * of the regular enrichment lookup is deliberately skipped: a bare key
 * belongs to whichever provider wrote it first, so neither its price nor its
 * classification says anything about the connection the id was served
 * through.
 */
function namespacedEntry(id: string, ctx: FreeSignalContext): OmniRouteEnrichmentEntry | undefined {
  const slash = id.indexOf("/");
  if (slash <= 0 || !ctx.enrichment) return undefined;
  const direct = ctx.enrichment.get(id);
  if (direct) return direct;
  const alias = ctx.canonicalToAlias.get(id.slice(0, slash));
  if (!alias) return undefined;
  return ctx.enrichment.get(`${alias}/${id.slice(slash + 1)}`);
}

const PRICE_FIELDS = ["input", "output", "cacheRead", "cacheWrite"] as const;

/**
 * Any numeric price field other than a clean zero vetoes: a positive price
 * says "paid", and `NaN` or a negative value is not a zero anyone proved.
 */
function hasNonZeroPrice(p: OmniRouteEnrichmentEntry["pricing"]): boolean {
  return PRICE_FIELDS.some((f) => typeof p?.[f] === "number" && p[f] !== 0);
}

function hasAnyPrice(p: OmniRouteEnrichmentEntry["pricing"]): boolean {
  return PRICE_FIELDS.some((f) => typeof p?.[f] === "number");
}

/** `auto` / `auto-*` anywhere after the provider prefix marks a router. */
function isRouterId(id: string): boolean {
  return id
    .split("/")
    .slice(1)
    .some((segment) => ROUTER_SEGMENT.test(segment));
}

function sameProvider(a: string, b: string, ctx: FreeSignalContext): boolean {
  const la = a.toLowerCase();
  const lb = b.toLowerCase();
  if (la === lb) return true;
  const aliasA = ctx.canonicalToAlias.get(a)?.toLowerCase();
  const aliasB = ctx.canonicalToAlias.get(b)?.toLowerCase();
  return aliasA === lb || aliasB === la;
}

function providerPrefix(id: string): string | undefined {
  const slash = id.indexOf("/");
  return slash > 0 ? id.slice(0, slash) : undefined;
}

/**
 * Whether an inferred signal admits `id` under `freeOnly`.
 *
 * A declared classification on the id's own `<provider>/<model>` entry (any
 * `freeType`, including `one-time-initial` and `discontinued`) is
 * authoritative: it either admits through the declared path or vetoes, so
 * inference never overrides it. Any price field other than zero vetoes every
 * signal. Bare ids are never promoted, since no provider can be read from
 * them.
 */
export function inferFreeSignal(id: string, ctx: FreeSignalContext): boolean {
  if (!hasInferredSignals(ctx.signals)) return false;
  const prefix = providerPrefix(id);
  if (prefix === undefined) return false;
  const entry = namespacedEntry(id, ctx);
  if (entry?.freeType !== undefined) return false;
  const pricing = entry?.pricing;
  if (hasNonZeroPrice(pricing)) return false;

  if (ctx.signals.includes("priced")) {
    const zero = pricing?.input === 0 && pricing?.output === 0;
    // Router entries (`auto`, `auto-*`) carry a placeholder zero because the
    // routed target sets the price: a zero there is not a free signal.
    if (zero && !isRouterId(id)) return true;
  }
  if (ctx.signals.includes("named") && !hasAnyPrice(pricing) && NAME_MARKER.test(id)) return true;
  if (ctx.signals.includes("provider-named")) {
    const listed = ctx.freeProviders?.some((p) => sameProvider(p, prefix, ctx)) ?? false;
    if (listed || PREFIX_MARKER.test(prefix)) return true;
  }
  return false;
}

export const INFERRED_FREE_LABEL = " (free, inferred)";

export interface FreeOptions {
  freeOnly?: boolean;
  freeSignals?: readonly FreeSignal[];
  freeProviders?: readonly string[];
}

/**
 * Inferred-free verdict for one entry under `freeOnly`: true only when the
 * declared catalog does not already admit it and a configured signal does.
 */
export function isInferredFree(
  id: string,
  entry: OmniRouteEnrichmentEntry | undefined,
  opts: FreeOptions,
  enrichment: OmniRouteEnrichmentMap | undefined,
  canonicalToAlias: Map<string, string>
): boolean {
  if (opts.freeOnly !== true || isFreeOnlyFreeType(entry?.freeType)) return false;
  return inferFreeSignal(id, {
    signals: opts.freeSignals ?? DEFAULT_FREE_SIGNALS,
    freeProviders: opts.freeProviders,
    enrichment,
    canonicalToAlias,
  });
}

/**
 * `freeOnly` reads the overlay: an empty overlay (no management token,
 * `enrichment: false`, or fetch failure) would otherwise empty the catalog
 * silently. Warn once per refresh and keep filtering (fail-closed).
 * With an inferred signal on, an overlay without declared entries is a
 * legitimate setup: `provider-named` needs no overlay at all, the others
 * need one that is not empty.
 */
export function warnOnEmptyFreeOverlay(
  opts: FreeOptions,
  enrichment: OmniRouteEnrichmentMap,
  warn: (message: string) => void
): void {
  if (opts.freeOnly !== true) return;
  if (opts.freeSignals?.includes("provider-named") === true) return;
  if (hasInferredSignals(opts.freeSignals) && enrichment.size > 0) return;
  for (const entry of enrichment.values()) if (entry.freeType !== undefined) return;
  warn(
    `[omniroute-v2] freeOnly is on but the enrichment overlay has no free-tier entries (no management token, enrichment disabled, or free-tier fetch failed); publishing an empty catalog. Disable freeOnly or configure the management token.`
  );
}
