/**
 * index.ts — Radar client public accessor.
 *
 * Thin entry point for the UI screens.  Returns the merged catalog
 * (baseline + feed overlay) when Radar is active, or the raw baseline
 * when the flag is off / no cache / corrupt cache.
 *
 * This module is the ONLY thing the screens import from `@/lib/radar`.
 * All heavy lifting (sync, verify, schema, merge) lives in sibling files.
 */

import { FREE_MODEL_BUDGETS } from "@omniroute/open-sse/config/freeModelCatalog";
import { RadarFeedSchema, type RadarFeed, type RadarReferral } from "./feedSchema";
import { RadarReferralsFeedSchema, type RadarReferralsFeed } from "./referralsFeedSchema";
import {
  filterActiveRadarOffers,
  RadarOffersFeedSchema,
  type RadarOffer,
} from "./offersFeedSchema";
import { RadarIntelFeedSchema, type RadarIntelFeed } from "./intelFeedSchema";
import { applyFeed, type MergedEntry, type FeedModel } from "./applyFeed";
import { findDefaultReferral } from "./referrals";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import {
  getRadarCache,
  getRadarLocalMergeState,
  getRadarOffersCache,
  getRadarIntelCache,
  getRadarReferralsCache,
  type RadarLocalMergeState,
} from "@/lib/db/radar";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RadarCatalogResult {
  /** Merged catalog entries. */
  entries: MergedEntry[];
  /** Feed metadata — null when falling back to baseline. */
  meta: {
    version: string;
    /**
     * Date the feed's data was built. Null for a cache row written before the
     * column existed — unknown, never substituted by `fetchedAt`, which only
     * says when this install downloaded it.
     */
    generatedAt: string | null;
    tier: string;
    fetchedAt: string;
  } | null;
}

/** Injectable deps for testing. */
export interface GetRadarCatalogDeps {
  getFlag?: (key: string) => boolean;
  getCache?: () => {
    version: string;
    generatedAt?: string | null;
    tier: string;
    payload: string;
    fetchedAt: string;
  } | null;
  baseline?: MergedEntry[];
  localOverrides?: Map<string, Partial<MergedEntry>>;
  tombstones?: Set<string>;
  getLocalState?: () => RadarLocalMergeState;
}

// ---------------------------------------------------------------------------
// Baseline converter
// ---------------------------------------------------------------------------

/**
 * Convert the static `FreeModelBudget[]` into `MergedEntry[]` so the
 * merge function has a uniform input shape.
 */
export function baselineToMergedEntries(budgets: typeof FREE_MODEL_BUDGETS): MergedEntry[] {
  return budgets.map((b) => ({
    provider: b.provider,
    modelId: b.modelId,
    displayName: b.displayName,
    monthlyTokens: b.monthlyTokens,
    creditTokens: b.creditTokens,
    freeType: b.freeType,
    poolKey: b.poolKey ?? null,
    tos: b.tos,
    trainsOnPrompts: b.trainsOnPrompts,
    eligibilityGate: b.eligibilityGate,
    enabled: true,
    origin: "baseline" as const,
  }));
}

// ---------------------------------------------------------------------------
// getRadarCatalog
// ---------------------------------------------------------------------------

/**
 * Return the merged Radar catalog.
 *
 * Falls back to the static baseline (no overlay) when:
 *  - The `RADAR_ENABLED` flag is off.
 *  - There is no cached feed yet.
 *  - The cached payload fails defensive re-validation.
 *
 * @param deps - Injectable dependencies for testing.
 */
export function getRadarCatalog(deps: GetRadarCatalogDeps = {}): RadarCatalogResult {
  const {
    getFlag = isFeatureFlagEnabled,
    getCache: getCacheFn = getRadarCache,
    baseline: baselineInput,
    localOverrides,
    tombstones,
    getLocalState: getLocalStateFn = getRadarLocalMergeState,
  } = deps;

  // Resolve baseline
  const baseline = baselineInput ?? baselineToMergedEntries(FREE_MODEL_BUDGETS);

  // Flag gate
  const flagOn = getFlag("RADAR_ENABLED");
  if (!flagOn) {
    return { entries: baseline, meta: null };
  }

  // Cache gate
  const cache = getCacheFn();
  if (!cache) {
    return { entries: baseline, meta: null };
  }

  // Defensive parse
  let feed: RadarFeed;
  try {
    const parsed = JSON.parse(cache.payload);
    feed = RadarFeedSchema.parse(parsed);
  } catch {
    return { entries: baseline, meta: null };
  }

  const persistedState =
    localOverrides === undefined || tombstones === undefined ? getLocalStateFn() : null;

  // Apply overlay
  const entries = applyFeed({
    baseline,
    feed: feed.models as FeedModel[],
    localOverrides: localOverrides ?? persistedState?.localOverrides ?? new Map(),
    tombstones: tombstones ?? persistedState?.tombstones ?? new Set(),
  });

  return {
    entries,
    meta: {
      version: cache.version,
      generatedAt: cache.generatedAt ?? null,
      tier: cache.tier,
      fetchedAt: cache.fetchedAt,
    },
  };
}

/** Injectable deps for `getCatalogWithoutOverlay`, same shape as the catalog resolver's. */
export interface GetCatalogWithoutOverlayDeps {
  baseline?: MergedEntry[];
  getLocalState?: () => RadarLocalMergeState;
}

/**
 * The catalog with no feed applied: the shipped baseline seen through the
 * operator's own local Radar state (renames, disabled models, tombstones).
 *
 * This is the correct fallback when a cached feed exists but is too old to
 * serve. Recomputing from the raw baseline instead would drop that state, and
 * the totals honour it — `computeFreeModelTotals` treats `enabled: false` as
 * absent, and `applyFeed` skips tombstoned entries — so models the operator
 * removed would silently reappear in the published numbers.
 */
export function getCatalogWithoutOverlay(deps: GetCatalogWithoutOverlayDeps = {}): MergedEntry[] {
  const { baseline: baselineInput, getLocalState: getLocalStateFn = getRadarLocalMergeState } =
    deps;
  const baseline = baselineInput ?? baselineToMergedEntries(FREE_MODEL_BUDGETS);
  const { localOverrides, tombstones } = getLocalStateFn();
  return applyFeed({ baseline, feed: [], localOverrides, tombstones });
}

// ---------------------------------------------------------------------------
// getRadarReferrals / getDefaultReferralFor
// ---------------------------------------------------------------------------

export interface RadarReferralsResult {
  fixed: RadarReferral[];
  campaigns: RadarReferral[];
}

const EMPTY_REFERRALS: RadarReferralsResult = { fixed: [], campaigns: [] };

/**
 * Injectable deps for testing. `getCache` now reads the STANDALONE referrals
 * feed cache (`radar_referrals_cache`, populated by
 * `syncRadarReferrals()`/`GET /v1/referrals/latest`) — no longer the
 * catalog's `radar_feed_cache`. This is what removes the up-to-30-day
 * community-tier delay referral links used to inherit from the catalog
 * feed: referrals now sync on their own, much shorter cadence
 * (`REFERRALS_STALE_MS`, see `referralsSync.ts`).
 */
export interface GetRadarReferralsDeps {
  getFlag?: (key: string) => boolean;
  getCache?: () => { generatedAt: string; tier: string; payload: string; fetchedAt: string } | null;
}

/**
 * Return the referral links section of the cached Radar REFERRALS feed
 * (`GET /v1/referrals/latest` — see `referralsSync.ts`).
 *
 * Never throws — returns `{fixed:[],campaigns:[]}` when: the flag is off,
 * there is no cache yet, or the cached payload fails defensive
 * re-validation (corrupt/garbage payload).
 */
export function getRadarReferrals(deps: GetRadarReferralsDeps = {}): RadarReferralsResult {
  const { getFlag = isFeatureFlagEnabled, getCache: getCacheFn = getRadarReferralsCache } = deps;

  if (!getFlag("RADAR_ENABLED")) {
    return EMPTY_REFERRALS;
  }

  const cache = getCacheFn();
  if (!cache) {
    return EMPTY_REFERRALS;
  }

  let feed: RadarReferralsFeed;
  try {
    const parsed = JSON.parse(cache.payload);
    feed = RadarReferralsFeedSchema.parse(parsed);
  } catch {
    return EMPTY_REFERRALS;
  }

  return feed.referrals ?? EMPTY_REFERRALS;
}

/**
 * Return the fixed, isDefault:true referral link for `provider`, or `null`
 * when there isn't one (flag off, no cache, or no matching default). Only
 * looks at `fixed` referrals — see `findDefaultReferral` in `./referrals.ts`.
 */
export function getDefaultReferralFor(
  provider: string,
  deps: GetRadarReferralsDeps = {}
): RadarReferral | null {
  const { fixed } = getRadarReferrals(deps);
  return findDefaultReferral(fixed, provider);
}

// ---------------------------------------------------------------------------
// getRadarOffers
// ---------------------------------------------------------------------------

export interface RadarOffersResult {
  offers: RadarOffer[];
  meta: { version: string; tier: "live"; fetchedAt: string } | null;
}

export interface GetRadarOffersDeps {
  getFlag?: (key: string) => boolean;
  getCache?: () => {
    version: string;
    tier: string;
    payload: string;
    fetchedAt: string;
  } | null;
  now?: () => Date;
}

const EMPTY_OFFERS: RadarOffersResult = { offers: [], meta: null };

/** Return only revalidated, unexpired offers from the local live cache. */
export function getRadarOffers(deps: GetRadarOffersDeps = {}): RadarOffersResult {
  const {
    getFlag = isFeatureFlagEnabled,
    getCache: getCacheFn = getRadarOffersCache,
    now = () => new Date(),
  } = deps;
  if (!getFlag("RADAR_ENABLED")) return EMPTY_OFFERS;

  const cache = getCacheFn();
  if (!cache || cache.tier !== "live") return EMPTY_OFFERS;

  try {
    const feed = RadarOffersFeedSchema.parse(JSON.parse(cache.payload));
    if (feed.version !== cache.version || feed.tier !== "live") return EMPTY_OFFERS;
    return {
      offers: filterActiveRadarOffers(feed.offers, now()),
      meta: { version: cache.version, tier: "live", fetchedAt: cache.fetchedAt },
    };
  } catch {
    return EMPTY_OFFERS;
  }
}

export interface RadarIntelResult {
  intel: RadarIntelFeed | null;
  meta: {
    version: string;
    tier: "live";
    fetchedAt: string;
    supporterVerified: true;
  } | null;
}

export interface GetRadarIntelDeps {
  getFlag?: (key: string) => boolean;
  getCache?: typeof getRadarIntelCache;
}

const EMPTY_INTEL: RadarIntelResult = { intel: null, meta: null };

/** Return only a defensively revalidated live Intel cache. */
export function getRadarIntel(deps: GetRadarIntelDeps = {}): RadarIntelResult {
  const { getFlag = isFeatureFlagEnabled, getCache: getCacheFn = getRadarIntelCache } = deps;
  if (!getFlag("RADAR_ENABLED")) return EMPTY_INTEL;
  const cache = getCacheFn();
  if (!cache || cache.tier !== "live" || !/^radar:[a-f0-9]{64}$/.test(cache.supporterIdentity)) {
    return EMPTY_INTEL;
  }
  try {
    const feed = RadarIntelFeedSchema.parse(JSON.parse(cache.payload));
    if (feed.version !== cache.version || feed.tier !== "live") return EMPTY_INTEL;
    return {
      intel: feed,
      meta: {
        version: cache.version,
        tier: "live",
        fetchedAt: cache.fetchedAt,
        supporterVerified: true,
      },
    };
  } catch {
    return EMPTY_INTEL;
  }
}

// Re-export merge types for convenience
export { applyFeed, type MergedEntry, type FeedModel } from "./applyFeed";
export { findDefaultReferral } from "./referrals";
export type { RadarReferral } from "./feedSchema";
export type { RadarOffer, RadarOfferBenefit, RadarOfferLocalizedText } from "./offersFeedSchema";
export type { RadarIntelFeed, RadarIntelRanking, RadarIntelCatalog } from "./intelFeedSchema";
