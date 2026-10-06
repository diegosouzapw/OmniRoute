/**
 * sync.ts — Radar feed sync: download, verify, validate, cache.
 *
 * This is the ONLY module that touches the network for Radar.
 * Every step is gated: flag off / opt-out / bad sig / bad schema /
 * stale version all bail early without touching the cache.
 *
 * Errors never escape `syncRadar()` — always return a status object.
 * Stack traces are never included in the `reason` field.
 *
 * Deps are injectable for testing.
 */

import { RadarFeedSchema, RadarTierSchema, type RadarFeed, type RadarTier } from "./feedSchema";
import { verifyFeedBytes } from "./verify";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * Default feed base URL.  Forks and self-hosters point this at their own
 * signed feed with the `RADAR_FEED_URL` env var (see docs/frameworks/RADAR.md).
 */
const DEFAULT_FEED_BASE_URL = "https://radar.omniroute.online";

const SYNC_TIMEOUT_MS = 30_000;

/**
 * Hard cap on the Radar feed response body. The signed feed is a small JSON
 * document (KB-scale) — anything past this is either a misconfigured/hostile
 * `RADAR_FEED_URL` or an upstream serving garbage. Enforced both via a
 * `Content-Length` preflight (skip reading the body entirely when the
 * server already declares an oversized payload) AND a running-total check
 * while reading the body (an absent/lying Content-Length must not bypass
 * the cap).
 */
const MAX_FEED_BYTES = 10 * 1024 * 1024; // 10 MB

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SyncStatus =
  | { status: "disabled" }
  | { status: "opt_out" }
  | { status: "invalid_signature" }
  | { status: "invalid_schema" }
  | { status: "stale" }
  | { status: "too_large" }
  | { status: "updated"; version: string; tier: string }
  | { status: "error"; reason: string };

export interface RadarCacheEntry {
  version: string;
  /** Date the feed's data was built (`generatedAt`), as validated by the schema. */
  generatedAt?: string | null;
  tier: string;
  payload: string;
  signature: string;
  fetchedAt?: string;
}

export interface RadarSettingsSnapshot {
  optIn: boolean;
  supporterKey: string | null;
}

export interface SyncDeps {
  fetch?: typeof globalThis.fetch;
  now?: () => Date;
  getFlag?: (key: string) => boolean;
  getSettings?: () => RadarSettingsSnapshot;
  getCache?: () => RadarCacheEntry | null;
  setCache?: (entry: RadarCacheEntry) => void;
}

// ---------------------------------------------------------------------------
// Served-tier header
// ---------------------------------------------------------------------------

/**
 * Parse & validate the `x-omniroute-feed-tier` response header.
 *
 * This header is the AUTHORITATIVE source for which tier was actually
 * served to this caller — the server decides per-request based on the
 * `Authorization` key, and an invalid/expired key degrades to
 * `"community"`. The signed body's `tier` field is always `"live"` by
 * design (see `feedSchema.ts`) and must never be shown to the user.
 *
 * Returns `null` when the header is absent, or holds a value that is not
 * exactly `"community"` or `"live"` — an arbitrary/garbage header string
 * is never trusted into the UI/DB; callers must fall back to the body's
 * `tier` field in that case (also covers older servers that predate this
 * header).
 */
function parseServedTierHeader(value: string | null): RadarTier | null {
  const result = RadarTierSchema.safeParse(value);
  return result.success ? result.data : null;
}

// ---------------------------------------------------------------------------
// Version comparison
// ---------------------------------------------------------------------------

/**
 * Compare two `YYYY.MM.DD.n` version strings numerically.
 *
 * @returns negative if a < b, 0 if equal, positive if a > b.
 */
export function compareVersions(a: string, b: string): number {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  const len = Math.max(pa.length, pb.length);

  for (let i = 0; i < len; i++) {
    const na = pa[i] ?? 0;
    const nb = pb[i] ?? 0;
    if (na !== nb) return na - nb;
  }
  return 0;
}

function cachedSchemaVersion(cache: RadarCacheEntry): 1 | 2 | null {
  try {
    const parsed = RadarFeedSchema.safeParse(JSON.parse(cache.payload) as unknown);
    return parsed.success ? parsed.data.schemaVersion : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Scheduling helper (exported for UI/route wiring later)
// ---------------------------------------------------------------------------

/**
 * Compute the next sync time given the last successful sync timestamp.
 * Returns a Date that is ~24h after `lastSyncAt`.  If `lastSyncAt` is
 * null, sync should happen immediately.
 */
export function nextSyncTime(lastSyncAt: string | null): Date {
  if (!lastSyncAt) return new Date(0); // epoch = "sync now"
  const last = new Date(lastSyncAt);
  return new Date(last.getTime() + 24 * 60 * 60 * 1000);
}

// ---------------------------------------------------------------------------
// syncRadar
// ---------------------------------------------------------------------------

/**
 * Download, verify, validate, and cache the Radar feed.
 *
 * Steps:
 *  1. Feature flag off => `{status:"disabled"}`, no network.
 *  2. Opt-in false     => `{status:"opt_out"}`, no network.
 *  3. GET feed with timeout.
 *  4. Verify Ed25519 signature over exact bytes.
 *  5. Parse+validate with RadarFeedSchema.
 *  6. Version floor: incoming must be strictly newer than cache.
 *  7. Cache the result.
 *
 * @param deps - Injectable dependencies for testing.
 */
export async function syncRadar(deps: SyncDeps = {}): Promise<SyncStatus> {
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
    const url = `${baseUrl}/v1/catalog/latest`;

    const headers: Record<string, string> = { "x-omniroute-radar-schema": "2" };
    if (settings.supporterKey) {
      headers["Authorization"] = `Bearer ${settings.supporterKey}`;
    }

    const res = await fetchFn(url, {
      headers,
      signal: AbortSignal.timeout(SYNC_TIMEOUT_MS),
    });

    if (!res.ok) {
      return { status: "error", reason: `Feed request failed with status ${res.status}` };
    }

    // Step 3b: Content-Length preflight — skip reading an already-oversized
    // body entirely. The header is untrusted (may be absent or wrong), so
    // this is a fast-path only; the real enforcement is the running-total
    // check below.
    const contentLengthHeader = res.headers.get("content-length");
    if (contentLengthHeader !== null) {
      const declaredLength = Number(contentLengthHeader);
      if (Number.isFinite(declaredLength) && declaredLength > MAX_FEED_BYTES) {
        return { status: "too_large" };
      }
    }

    // Step 4: Read exact bytes + signature header, enforcing MAX_FEED_BYTES
    // while reading so an absent/lying Content-Length cannot bypass the cap.
    // Concatenating the accumulated chunks preserves the exact bytes needed
    // for signature verification below.
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

    // Step 5: Verify signature
    const sigValid = verifyFeedBytes(rawBytes, signature);
    if (!sigValid) {
      return { status: "invalid_signature" };
    }

    // Step 6: Parse + validate
    let feed: RadarFeed;
    try {
      const parsed = JSON.parse(rawBytes.toString("utf-8"));
      feed = RadarFeedSchema.parse(parsed);
    } catch {
      return { status: "invalid_schema" };
    }

    // Step 7: Resolve the served tier before the version floor. A single-use
    // supporter key deliberately transitions from live to community after its
    // first catalog pull, and the community snapshot can be older.
    const servedTier = parseServedTierHeader(res.headers.get("x-omniroute-feed-tier")) ?? feed.tier;

    // Step 8: Version floor. Same/older versions are rejected within a tier,
    // but a verified live -> community transition must replace the privileged
    // cache even when the community snapshot is older.
    let existingCache: RadarCacheEntry | null = null;
    if (getCacheFn) {
      existingCache = getCacheFn();
    } else {
      const mod = await import("@/lib/db/radar");
      existingCache = mod.getRadarCache();
    }

    const isEntitlementDowngrade = existingCache?.tier === "live" && servedTier === "community";
    const versionComparison = existingCache
      ? compareVersions(feed.version, existingCache.version)
      : 1;
    const isSameVersionSchemaUpgrade =
      existingCache !== null &&
      existingCache.tier === servedTier &&
      versionComparison === 0 &&
      feed.schemaVersion === 2 &&
      cachedSchemaVersion(existingCache) === 1;
    if (
      existingCache &&
      !isEntitlementDowngrade &&
      !isSameVersionSchemaUpgrade &&
      versionComparison <= 0
    ) {
      return { status: "stale" };
    }

    // Step 9: Cache the result
    const cacheEntry: RadarCacheEntry = {
      version: feed.version,
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
      mod.setRadarCache(cacheEntry);
    }

    return { status: "updated", version: feed.version, tier: servedTier };
  } catch (err: unknown) {
    const reason = sanitizeErrorMessage(err) || "Radar sync failed";
    return { status: "error", reason };
  }
}
