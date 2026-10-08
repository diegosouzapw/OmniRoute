import type { OmniRouteRawModelEntry } from "./shared/index.js";

/**
 * Freshness window in days. The millisecond value below derives from it,
 * so tuning the default means touching this line only.
 */
export const FRESH_WINDOW_DAYS = 90;

/**
 * Default freshness window in milliseconds. Models curated with a
 * `release_date` or `last_updated` inside this window publish without any
 * other signal.
 */
export const FRESHNESS_WINDOW_MS = FRESH_WINDOW_DAYS * 24 * 3600 * 1000;

/** How many models each provider keeps in the default showcase. */
export const SHOWCASE_PER_OWNER = 10;

/** How many recent models each provider keeps in the default view. */
export const FRESH_PER_OWNER = 10;

/**
 * Convert a freshness window in days to milliseconds. A non-finite or
 * non-positive value cannot come through parsed options (the schema rejects
 * it), only through direct calls: fall back to the default window instead
 * of an unbounded (Infinity) or empty (0) one.
 */
export function freshWindowDaysToMs(days: number): number {
  if (!Number.isFinite(days) || days <= 0) return FRESHNESS_WINDOW_MS;
  return days * 24 * 3600 * 1000;
}

/**
 * Fresh when the newest valid curatorial date (`release_date`, then
 * `last_updated`) is inside the window. No fallback to `created`:
 * gateway-assembled rows carry the build timestamp there (same value for
 * the whole catalog), except openrouter rows which mix an upstream value
 * — neither works as a uniform freshness date.
 */
export function isFreshModel(
  entry: OmniRouteRawModelEntry,
  nowMs: number,
  windowMs: number = FRESHNESS_WINDOW_MS
): boolean {
  if (!Number.isFinite(windowMs) || windowMs <= 0) windowMs = FRESHNESS_WINDOW_MS;
  const candidates = [entry.release_date, entry.last_updated];
  let newest = Number.NaN;
  for (const raw of candidates) {
    if (typeof raw !== "string" || raw.length === 0) continue;
    const parsed = Date.parse(raw);
    if (Number.isNaN(parsed)) continue;
    if (Number.isNaN(newest) || parsed > newest) newest = parsed;
  }
  if (Number.isNaN(newest)) return false;
  if (newest > nowMs) return false;
  return nowMs - newest <= windowMs;
}

/**
 * Owner group key: explicit `owned_by` first, then the id prefix before
 * `/`, else `"unknown"`. Shared by the showcase ranking and the fresh cap
 * so both count the same groups.
 */
export function ownerKeyOf(entry: OmniRouteRawModelEntry): string {
  if (typeof entry.owned_by === "string" && entry.owned_by.length > 0) return entry.owned_by;
  if (typeof entry.id === "string" && entry.id.includes("/"))
    return entry.id.slice(0, entry.id.indexOf("/"));
  return "unknown";
}

/**
 * Recency order shared by the showcase ranking and the fresh cap: newest
 * `release_date` first (unknown = oldest), then largest `context_length`.
 */
export function compareByRecency(a: OmniRouteRawModelEntry, b: OmniRouteRawModelEntry): number {
  const aDate = typeof a.release_date === "string" ? Date.parse(a.release_date) : NaN;
  const bDate = typeof b.release_date === "string" ? Date.parse(b.release_date) : NaN;
  const aMs = Number.isNaN(aDate) ? 0 : aDate;
  const bMs = Number.isNaN(bDate) ? 0 : bDate;
  if (aMs !== bMs) return bMs - aMs;
  const aCtx = typeof a.context_length === "number" ? a.context_length : 0;
  const bCtx = typeof b.context_length === "number" ? b.context_length : 0;
  return bCtx - aCtx;
}

/**
 * Read the lifecycle hint the raw gateway row carries, if any. The typed
 * entry has no `status` field, so this stays a defensive local read: only
 * the exact `"deprecated"` string excludes, anything else (absent,
 * mistyped, other value) keeps the entry.
 */
export function readEntryStatus(entry: OmniRouteRawModelEntry): unknown {
  return (entry as { status?: unknown }).status;
}

/**
 * Flat effort-variant ids the gateway publishes next to their base model
 * (e.g. `owner/model-high` beside `owner/model`). Only these seven
 * suffixes exclude; any other ending (provider literals) leaves the id
 * alone. Returns the base id, or undefined when there is no such suffix.
 */
const FLAT_TIER_SUFFIXES = new Set(["high", "low", "max", "medium", "xhigh", "minimal", "none"]);

export function baseIdOf(id: string): string | undefined {
  const slash = id.lastIndexOf("/");
  const short = slash >= 0 ? id.slice(slash + 1) : id;
  const dash = short.lastIndexOf("-");
  if (dash <= 0) return undefined;
  const suffix = short.slice(dash + 1).toLowerCase();
  if (!FLAT_TIER_SUFFIXES.has(suffix)) return undefined;
  const base = short.slice(0, dash);
  if (base.length === 0) return undefined;
  return slash >= 0 ? id.slice(0, slash + 1) + base : base;
}

/** True when the id is a flat effort-variant id (see `baseIdOf`). */
export function isFlatTierId(id: string): boolean {
  return baseIdOf(id) !== undefined;
}

/**
 * Pick the showcase ids: per `owned_by` group (prefix before `/`, else
 * `"unknown"`), newest `release_date` first (unknown = oldest), then
 * largest `context_length`. Providers surface at runtime; nothing is
 * hardcoded here.
 */
export function selectShowcaseIds(
  entries: readonly OmniRouteRawModelEntry[],
  perOwner: number = SHOWCASE_PER_OWNER
): Set<string> {
  const groups = new Map<string, OmniRouteRawModelEntry[]>();
  for (const entry of entries) {
    if (!entry || typeof entry.id !== "string" || entry.id.length === 0) continue;
    const owner = ownerKeyOf(entry);
    const list = groups.get(owner);
    if (list) list.push(entry);
    else groups.set(owner, [entry]);
  }
  const out = new Set<string>();
  // A non-finite or non-positive size cannot come through parsed options
  // (the schema rejects it), only through direct calls: fall back instead
  // of publishing an unbounded group (Infinity) or an empty one (0).
  const perOwnerCount = Number.isFinite(perOwner) && perOwner > 0 ? perOwner : SHOWCASE_PER_OWNER;
  for (const list of groups.values()) {
    const ranked = [...list].sort(compareByRecency);
    for (const entry of ranked.slice(0, perOwnerCount)) out.add(entry.id);
  }
  return out;
}

/**
 * Static pass: allowlisted (exact id or short suffix) first, then the
 * default view — retired entries and flat effort-variant ids stay out,
 * recent entries only up to the per-owner fresh cap, showcased ids pass.
 * A pin always wins over every exclusion below.
 */
export function passesWhatServes(
  entry: OmniRouteRawModelEntry,
  showcased: ReadonlySet<string>,
  visibleFilter: ModelListFilter | undefined,
  nowMs: number = Date.now(),
  freshKept?: ReadonlySet<string>,
  windowMs: number = FRESHNESS_WINDOW_MS
): boolean {
  if (visibleFilter !== undefined) {
    if (visibleFilter.exact.has(entry.id)) return true;
    if (matchesSuffix(entry.id, visibleFilter.suffixes)) return true;
  }
  // The raw gateway row may carry a lifecycle hint the typed entry does
  // not declare (it already flows through the fetcher untouched).
  if (readEntryStatus(entry) === "deprecated") return false;
  if (isFlatTierId(entry.id)) return false;
  if (isFreshModel(entry, nowMs, windowMs)) {
    if (freshKept !== undefined) return freshKept.has(entry.id);
    return true;
  }
  if (showcased.has(entry.id)) return true;
  return false;
}

/**
 * Rank recent entries per owner (same group key and order as the
 * showcase) and keep up to `perOwner` ids per group. Only
 * `isFreshModel`-true entries compete; pinned, retired and flat
 * effort-variant ids never take a fresh slot.
 */
export function selectFreshKeptIds(
  entries: readonly OmniRouteRawModelEntry[],
  perOwner: number = FRESH_PER_OWNER,
  nowMs: number = Date.now(),
  visibleFilter?: ModelListFilter,
  windowMs: number = FRESHNESS_WINDOW_MS
): Set<string> {
  const perOwnerCount = Number.isFinite(perOwner) && perOwner > 0 ? perOwner : FRESH_PER_OWNER;
  const groups = new Map<string, OmniRouteRawModelEntry[]>();
  for (const entry of entries) {
    if (!entry || typeof entry.id !== "string" || entry.id.length === 0) continue;
    if (readEntryStatus(entry) === "deprecated") continue;
    if (isFlatTierId(entry.id)) continue;
    if (visibleFilter !== undefined) {
      if (visibleFilter.exact.has(entry.id)) continue;
      if (matchesSuffix(entry.id, visibleFilter.suffixes)) continue;
    }
    if (!isFreshModel(entry, nowMs, windowMs)) continue;
    const owner = ownerKeyOf(entry);
    const list = groups.get(owner);
    if (list) list.push(entry);
    else groups.set(owner, [entry]);
  }
  const out = new Set<string>();
  for (const list of groups.values()) {
    const ranked = [...list].sort(compareByRecency);
    for (const entry of ranked.slice(0, perOwnerCount)) out.add(entry.id);
  }
  return out;
}

/**
 * Whether a statically dropped entry stays dropped under the usage
 * memory: retired entries, flat effort-variant ids and entries past the
 * per-owner fresh cap are never restored. Pinned ids never reach this
 * filter (they pass the static gate already).
 */
export function staysDropped(
  entry: OmniRouteRawModelEntry,
  freshKept: ReadonlySet<string>,
  nowMs: number = Date.now(),
  windowMs: number = FRESHNESS_WINDOW_MS
): boolean {
  if (readEntryStatus(entry) === "deprecated") return true;
  if (isFlatTierId(entry.id)) return true;
  if (isFreshModel(entry, nowMs, windowMs) && !freshKept.has(entry.id)) return true;
  return false;
}

export interface ModelListFilter {
  exact: Set<string>;
  suffixes: Set<string>;
}

export function matchesSuffix(id: string, suffixes: Set<string>): boolean {
  if (suffixes.size === 0) return false;
  const slash = id.indexOf("/");
  const suffix = slash > 0 ? id.slice(slash + 1) : id;
  return suffixes.has(suffix);
}
