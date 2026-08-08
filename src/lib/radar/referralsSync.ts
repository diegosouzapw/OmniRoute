/**
 * referralsSync.ts — Radar referrals feed sync: download, verify, validate, cache.
 *
 * Mirrors `sync.ts` (the catalog feed sync) but targets the standalone,
 * always-current `GET /v1/referrals/latest` endpoint instead of the
 * catalog's `/v1/catalog/latest` — the catalog feed is a up-to-30-day-old
 * snapshot on the community tier, so referral links extracted from it lag
 * behind the server by up to 30 days. This module removes that delay by
 * consuming the dedicated referrals endpoint directly.
 *
 * This is the ONLY module that touches the network for Radar referrals.
 * Every step is gated: flag off / opt-out / bad sig / bad schema / oversized
 * body all bail early without touching the cache.
 *
 * Errors never escape `syncRadarReferrals()` — always return a status object.
 * Stack traces are never included in the `reason` field.
 *
 * Deps are injectable for testing.
 */

import { RadarReferralsFeedSchema, type RadarReferralsFeed } from "./referralsFeedSchema";
import { RadarTierSchema, type RadarTier } from "./feedSchema";
import { verifyFeedBytes } from "./verify";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import type { RadarSettingsSnapshot } from "./sync";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * Default feed base URL — same default/override convention as `sync.ts`
 * (`RADAR_FEED_URL` env var points forks/self-hosters at their own server).
 */
const DEFAULT_FEED_BASE_URL = "https://radar.omniroute.online";

const SYNC_TIMEOUT_MS = 30_000;

/**
 * Hard cap on the referrals feed response body. Same rationale as
 * `sync.ts::MAX_FEED_BYTES` — this is a small, KB-scale signed JSON document;
 * anything past this is either a misconfigured `RADAR_FEED_URL` or an
 * upstream serving garbage. Enforced both via a `Content-Length` preflight
 * and a running-total check while reading the body, so an absent/lying
 * `Content-Length` cannot bypass the cap.
 */
const MAX_FEED_BYTES = 10 * 1024 * 1024; // 10 MB

/**
 * How stale the cached referrals must be before a new sync is worth doing
 * (used by the route's "sync if stale" trigger, see `shouldSyncReferralsOnRead`).
 * Deliberately much shorter than the catalog's 24h cadence — referrals are
 * meant to feel "always current", and the fixed links in particular should
 * surface quickly for a free/community user.
 */
export const REFERRALS_STALE_MS = 60 * 60 * 1000; // 1h

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ReferralsSyncStatus =
  | { status: "disabled" }
  | { status: "opt_out" }
  | { status: "invalid_signature" }
  | { status: "invalid_schema" }
  | { status: "stale" }
  | { status: "too_large" }
  | { status: "updated"; generatedAt: string; tier: string }
  | { status: "error"; reason: string };

export interface RadarReferralsCacheEntry {
  generatedAt: string;
  tier: string;
  payload: string;
  signature: string;
  fetchedAt?: string;
}

export interface ReferralsSyncDeps {
  fetch?: typeof globalThis.fetch;
  now?: () => Date;
  getFlag?: (key: string) => boolean;
  getSettings?: () => RadarSettingsSnapshot;
  getCache?: () => RadarReferralsCacheEntry | null;
  setCache?: (entry: RadarReferralsCacheEntry) => void;
}

// ---------------------------------------------------------------------------
// Served-tier header
// ---------------------------------------------------------------------------

/**
 * Parse & validate the `x-omniroute-feed-tier` response header.
 *
 * Unlike the catalog feed, the referrals feed body carries no `tier` field
 * at all (there is only ever one signed artifact per `generatedAt`, and the
 * server decides which referrals to include per-request based on the
 * `Authorization` key) — so the header is the ONLY source for the served
 * tier. An absent or unrecognized header degrades to `"community"`, the
 * least-privileged assumption (matches the server's own no-auth default:
 * fixed links only, `campaigns: []`).
 */
function parseServedTierHeader(value: string | null): RadarTier | null {
  const result = RadarTierSchema.safeParse(value);
  return result.success ? result.data : null;
}

// ---------------------------------------------------------------------------
// Staleness helper (exported for the route's "sync if stale" trigger)
// ---------------------------------------------------------------------------

/**
 * Whether the cached referrals feed (fetched at `fetchedAt`) is stale enough
 * to warrant a fresh sync. Missing/unparseable timestamps count as stale —
 * mirrors `autoSync.ts::shouldAutoSyncOnOpen`'s conservative default.
 */
export function shouldSyncReferralsOnRead(
  fetchedAt: string | null | undefined,
  nowMs: number,
  staleMs: number = REFERRALS_STALE_MS
): boolean {
  if (!fetchedAt) return true;
  const fetchedMs = Date.parse(fetchedAt);
  if (!Number.isFinite(fetchedMs)) return true;
  return nowMs - fetchedMs >= staleMs;
}

// ---------------------------------------------------------------------------
// syncRadarReferrals
// ---------------------------------------------------------------------------

/**
 * Download, verify, validate, and cache the Radar referrals feed.
 *
 * Steps:
 *  1. Feature flag off => `{status:"disabled"}`, no network.
 *  2. Opt-in false     => `{status:"opt_out"}`, no network.
 *  3. GET `${base}/v1/referrals/latest` with timeout.
 *  4. Verify Ed25519 signature over exact bytes (same pinned key as the
 *     catalog feed — one key pins both artifacts).
 *  5. Parse+validate with RadarReferralsFeedSchema.
 *  6. Replay guard: reject an incoming `generatedAt` older than the cache.
 *     Equal timestamps remain valid because the community and live referral
 *     variants deliberately share one deterministic `generatedAt`; the
 *     served tier can still change after the supporter key changes.
 *  7. Cache the result.
 *
 * @param deps - Injectable dependencies for testing.
 */
export async function syncRadarReferrals(
  deps: ReferralsSyncDeps = {}
): Promise<ReferralsSyncStatus> {
  const {
    fetch: fetchFn = globalThis.fetch,
    now = () => new Date(),
    getFlag = isFeatureFlagEnabled,
    getSettings: getSettingsFn,
    getCache: getCacheFn,
    setCache: setCacheFn,
  } = deps;

  try {
    // Step 1: Feature flag gate
    const flagOn = getFlag("RADAR_ENABLED");
    if (!flagOn) {
      return { status: "disabled" };
    }

    // Step 2: Opt-in gate
    let settings: RadarSettingsSnapshot;
    if (getSettingsFn) {
      settings = getSettingsFn();
    } else {
      const mod = await import("@/lib/db/radar");
      settings = mod.getRadarSettings();
    }
    if (!settings.optIn) {
      return { status: "opt_out" };
    }

    // Step 3: Download feed
    const baseUrl = (process.env.RADAR_FEED_URL || DEFAULT_FEED_BASE_URL).replace(/\/+$/, "");
    const url = `${baseUrl}/v1/referrals/latest`;

    const headers: Record<string, string> = {};
    if (settings.supporterKey) {
      headers["Authorization"] = `Bearer ${settings.supporterKey}`;
    }

    const res = await fetchFn(url, {
      headers,
      signal: AbortSignal.timeout(SYNC_TIMEOUT_MS),
    });

    if (!res.ok) {
      return { status: "error", reason: `Referrals feed request failed with status ${res.status}` };
    }

    // Step 3b: Content-Length preflight — skip reading an already-oversized
    // body entirely (untrusted header, fast-path only; the real enforcement
    // is the running-total check below).
    const contentLengthHeader = res.headers.get("content-length");
    if (contentLengthHeader !== null) {
      const declaredLength = Number(contentLengthHeader);
      if (Number.isFinite(declaredLength) && declaredLength > MAX_FEED_BYTES) {
        return { status: "too_large" };
      }
    }

    // Step 4: Read exact bytes + signature header, enforcing MAX_FEED_BYTES
    // while reading so an absent/lying Content-Length cannot bypass the cap.
    let rawBytes: Buffer;
    const body = res.body as ReadableStream<Uint8Array> | null | undefined;
    if (body && typeof body.getReader === "function") {
      const reader = body.getReader();
      const chunks: Uint8Array[] = [];
      let total = 0;
      let tooLarge = false;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          total += value.byteLength;
          if (total > MAX_FEED_BYTES) {
            tooLarge = true;
            await reader.cancel().catch(() => {});
            break;
          }
          chunks.push(value);
        }
      }
      if (tooLarge) {
        return { status: "too_large" };
      }
      rawBytes = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
    } else {
      const buffered = Buffer.from(await res.arrayBuffer());
      if (buffered.byteLength > MAX_FEED_BYTES) {
        return { status: "too_large" };
      }
      rawBytes = buffered;
    }

    const signature = res.headers.get("x-omniroute-feed-signature") ?? "";

    // Step 5: Verify signature — same pinned Ed25519 key(s) as the catalog feed.
    const sigValid = verifyFeedBytes(rawBytes, signature);
    if (!sigValid) {
      return { status: "invalid_signature" };
    }

    // Step 6: Parse + validate
    let feed: RadarReferralsFeed;
    try {
      const parsed = JSON.parse(rawBytes.toString("utf-8"));
      feed = RadarReferralsFeedSchema.parse(parsed);
    } catch {
      return { status: "invalid_schema" };
    }

    // Step 7: generatedAt floor — reject older signed replays. Equal
    // timestamps are accepted because entitlement variants share generatedAt.
    let existingCache: RadarReferralsCacheEntry | null = null;
    if (getCacheFn) {
      existingCache = getCacheFn();
    } else {
      const mod = await import("@/lib/db/radar");
      existingCache = mod.getRadarReferralsCache();
    }

    if (existingCache) {
      const existingMs = Date.parse(existingCache.generatedAt);
      const incomingMs = Date.parse(feed.generatedAt);
      if (Number.isFinite(existingMs) && Number.isFinite(incomingMs) && incomingMs < existingMs) {
        return { status: "stale" };
      }
    }

    // Step 8: Resolve served tier — the body carries no `tier` field at all
    // for this feed, so the header is the only source; absent/garbage header
    // degrades to the least-privileged "community" default.
    const servedTier =
      parseServedTierHeader(res.headers.get("x-omniroute-feed-tier")) ?? "community";

    // Step 9: Cache the result
    const cacheEntry: RadarReferralsCacheEntry = {
      generatedAt: feed.generatedAt,
      tier: servedTier,
      payload: rawBytes.toString("utf-8"),
      signature,
      fetchedAt: now().toISOString(),
    };

    if (setCacheFn) {
      setCacheFn(cacheEntry);
    } else {
      const mod = await import("@/lib/db/radar");
      mod.setRadarReferralsCache(cacheEntry);
    }

    return { status: "updated", generatedAt: feed.generatedAt, tier: servedTier };
  } catch (err: unknown) {
    const reason = sanitizeErrorMessage(err) || "Radar referrals sync failed";
    return { status: "error", reason };
  }
}
