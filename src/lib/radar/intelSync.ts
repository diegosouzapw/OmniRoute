/** Server-side sync for the signed, supporter-only Radar Intel feed. */

import crypto from "node:crypto";

import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

import { RadarIntelFeedSchema, type RadarIntelFeed } from "./intelFeedSchema";
import { compareVersions, type RadarSettingsSnapshot } from "./sync";
import { verifyFeedBytes } from "./verify";

const DEFAULT_FEED_BASE_URL = "https://radar.omniroute.online";
const SYNC_TIMEOUT_MS = 30_000;
const MAX_FEED_BYTES = 10 * 1024 * 1024;

export type IntelSyncStatus =
  | { status: "disabled" }
  | { status: "opt_out" }
  | { status: "no_key" }
  | { status: "invalid_signature" }
  | { status: "invalid_schema" }
  | { status: "wrong_tier" }
  | { status: "stale" }
  | { status: "too_large" }
  | { status: "updated"; version: string }
  | { status: "error"; reason: string };

export interface RadarIntelCacheEntry {
  version: string;
  tier: "live";
  payload: string;
  signature: string;
  supporterIdentity: string;
  fetchedAt?: string;
}

export interface IntelSyncDeps {
  fetch?: typeof globalThis.fetch;
  now?: () => Date;
  getFlag?: (key: string) => boolean;
  getSettings?: () => RadarSettingsSnapshot;
  getCache?: () => RadarIntelCacheEntry | null;
  setCache?: (entry: RadarIntelCacheEntry) => void;
  recognizeSupporter?: (identity: string) => Promise<void>;
}

async function readBoundedBytes(response: Response): Promise<Buffer | null> {
  const contentLength = response.headers.get("content-length");
  if (contentLength !== null) {
    const declared = Number(contentLength);
    if (Number.isFinite(declared) && declared > MAX_FEED_BYTES) return null;
  }

  const body = response.body as ReadableStream<Uint8Array> | null | undefined;
  if (!body || typeof body.getReader !== "function") {
    const buffered = Buffer.from(await response.arrayBuffer());
    return buffered.byteLength > MAX_FEED_BYTES ? null : buffered;
  }

  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;
    total += value.byteLength;
    if (total > MAX_FEED_BYTES) {
      await reader.cancel().catch(() => undefined);
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
}

function supporterIdentity(key: string): string {
  return `radar:${crypto.createHash("sha256").update(key, "utf8").digest("hex")}`;
}

async function recognizeVerifiedSupporter(identity: string): Promise<void> {
  const { emitGamificationEvent } = await import("@/lib/gamification/events");
  await emitGamificationEvent({ apiKeyId: identity, action: "radar_supporter" });
}

export async function syncRadarIntel(deps: IntelSyncDeps = {}): Promise<IntelSyncStatus> {
  const {
    fetch: fetchFn = globalThis.fetch,
    now = () => new Date(),
    getFlag = isFeatureFlagEnabled,
    getSettings: getSettingsFn,
    getCache: getCacheFn,
    setCache: setCacheFn,
    recognizeSupporter = recognizeVerifiedSupporter,
  } = deps;

  try {
    if (!getFlag("RADAR_ENABLED")) return { status: "disabled" };
    const settings = getSettingsFn
      ? getSettingsFn()
      : (await import("@/lib/db/radar")).getRadarSettings();
    if (!settings.optIn) return { status: "opt_out" };
    if (!settings.supporterKey) return { status: "no_key" };

    const baseUrl = (process.env.RADAR_FEED_URL || DEFAULT_FEED_BASE_URL).replace(/\/+$/, "");
    const response = await fetchFn(`${baseUrl}/v1/intel/latest`, {
      method: "GET",
      headers: { Authorization: `Bearer ${settings.supporterKey}` },
      signal: AbortSignal.timeout(SYNC_TIMEOUT_MS),
    });
    if (!response.ok) {
      return {
        status: "error",
        reason: `Intel feed request failed with status ${response.status}`,
      };
    }

    const rawBytes = await readBoundedBytes(response);
    if (!rawBytes) return { status: "too_large" };

    const signature = response.headers.get("x-omniroute-feed-signature") ?? "";
    if (!verifyFeedBytes(rawBytes, signature)) return { status: "invalid_signature" };

    let feed: RadarIntelFeed;
    try {
      feed = RadarIntelFeedSchema.parse(JSON.parse(rawBytes.toString("utf8")));
    } catch {
      return { status: "invalid_schema" };
    }
    if (response.headers.get("x-omniroute-feed-tier") !== "live" || feed.tier !== "live") {
      return { status: "wrong_tier" };
    }

    const existing = getCacheFn
      ? getCacheFn()
      : (await import("@/lib/db/radar")).getRadarIntelCache();
    if (existing && compareVersions(feed.version, existing.version) <= 0) {
      return { status: "stale" };
    }

    const identity = supporterIdentity(settings.supporterKey);
    const cacheEntry: RadarIntelCacheEntry = {
      version: feed.version,
      tier: "live",
      payload: rawBytes.toString("utf8"),
      signature,
      supporterIdentity: identity,
      fetchedAt: now().toISOString(),
    };
    if (setCacheFn) setCacheFn(cacheEntry);
    else (await import("@/lib/db/radar")).setRadarIntelCache(cacheEntry);

    // Recognition is local and best-effort. It runs only after the signed live
    // bytes have been accepted and persisted, and never changes sync success.
    await recognizeSupporter(identity).catch(() => undefined);
    return { status: "updated", version: feed.version };
  } catch (error: unknown) {
    const reason = (sanitizeErrorMessage(error) || "Radar Intel sync failed").replace(
      /omr_[a-f0-9]{40}/gi,
      "[REDACTED]"
    );
    return { status: "error", reason };
  }
}

export const RADAR_INTEL_STALE_MS = 24 * 60 * 60 * 1000;

export function shouldSyncRadarIntel(fetchedAt: string | null, nowMs = Date.now()): boolean {
  if (!fetchedAt) return true;
  const fetchedMs = Date.parse(fetchedAt);
  return !Number.isFinite(fetchedMs) || nowMs - fetchedMs >= RADAR_INTEL_STALE_MS;
}
