// Video Bridge drill-down production/consumption lifecycle (FU-08, #11655).
//
// `videoBridgeDrilldown.ts` is the secure cache substrate: it stores frames keyed by
// (principalId, sessionId, videoRef) and already refuses cross-principal reads/deletes
// without revealing whether an entry exists. This module adds the missing lifecycle on
// top of it, without touching the frozen-shape substrate file:
//   - opaque hashed handles, so a consumer never needs (and never sees) the raw
//     sessionId/videoRef the substrate indexes by — both are minted server-side here;
//   - preview/standard/detail multiresolution variants, resampled on read (never stored
//     more than once, so producing stays "zero overhead" beyond the opt-in call itself);
//   - response pagination capped at 8 frames and a bounded response-byte budget;
//   - a small handle registry with its own TTL/quota, cleaned up alongside the cache.
import { createHash, randomUUID } from "node:crypto";

import sharp from "sharp";

import {
  VIDEO_DRILLDOWN_MAX_ENTRY_BYTES,
  VideoDrilldownCache,
  type VideoDrilldownCacheOptions,
  type VideoDrilldownFrame,
  type VideoDrilldownPutValue,
  type VideoDrilldownResult,
} from "./videoBridgeDrilldown";
import { JPEG_FRAME_DATA_URI_PREFIX } from "./videoBridgeFrameContract";

export type VideoDrilldownVariant = "preview" | "standard" | "detail";

export const VIDEO_DRILLDOWN_VARIANTS: readonly VideoDrilldownVariant[] = [
  "preview",
  "standard",
  "detail",
];

export interface VideoDrilldownVariantPreset {
  /** Frames are only ever shrunk toward this ceiling, never upscaled. */
  maxDimension: number;
  /** Default page size for this variant when the caller does not ask for a specific count. */
  defaultPageFrames: number;
}

export const VIDEO_DRILLDOWN_VARIANT_PRESETS: Record<
  VideoDrilldownVariant,
  VideoDrilldownVariantPreset
> = {
  preview: { maxDimension: 320, defaultPageFrames: 3 },
  standard: { maxDimension: 640, defaultPageFrames: 6 },
  detail: { maxDimension: 1280, defaultPageFrames: 8 },
};

export const VIDEO_DRILLDOWN_MAX_PAGE_FRAMES = 8;
export const VIDEO_DRILLDOWN_MAX_PAGE_BYTES = VIDEO_DRILLDOWN_MAX_ENTRY_BYTES;

const HANDLE_PATTERN = /^[0-9a-f]{64}$/;

function truthyFlag(value: string | undefined): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on";
}

/** Producing drill-down artifacts stays off unless an operator opts the deployment in. */
export function isVideoBridgeDrilldownProductionEnabled(
  env: Record<string, string | undefined> = process.env
): boolean {
  return truthyFlag(env.OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED);
}

/** Remote (authenticated API-key) consumption stays off unless an operator opts in. */
export function isVideoBridgeDrilldownRemoteAccessEnabled(
  env: Record<string, string | undefined> = process.env
): boolean {
  return truthyFlag(env.OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED);
}

interface HandleEntry {
  createdAt: number;
  expiresAt: number;
  principalId: string;
  principalKey: string;
  sessionId: string;
  videoRef: string;
}

export interface VideoDrilldownProducePayload {
  derivation: VideoDrilldownPutValue["derivation"];
  durationSeconds: number;
  frames: readonly VideoDrilldownPutValue["frames"][number][];
}

export interface VideoDrilldownProduceOptions {
  signal?: AbortSignal;
}

export interface VideoDrilldownProduceResult {
  expiresAt: number;
  handle: string;
}

export interface VideoDrilldownResolveQuery {
  endSeconds?: number;
  frameCount?: number;
  /** Test/defense-in-depth override; production callers use the exported constant. */
  maxPageBytes?: number;
  page?: number;
  startSeconds?: number;
  variant?: VideoDrilldownVariant;
}

export interface VideoDrilldownPage {
  derivation: VideoDrilldownResult["derivation"];
  durationSeconds: number;
  focusWindow?: VideoDrilldownResult["focusWindow"];
  frames: VideoDrilldownFrame[];
  hasMore: boolean;
  page: number;
  variant: VideoDrilldownVariant;
}

export interface VideoDrilldownUsage {
  bytes: number;
  entries: number;
  totalBytes: number;
  totalEntries: number;
}

export interface VideoDrilldownLifecycleOptions {
  cache: VideoDrilldownCache;
  maxHandles?: number;
  maxHandlesPerPrincipal?: number;
  now?: () => number;
  /** Handle bookkeeping TTL. Defaults to the cache's own TTL when it is exposed via `ttlMs`. */
  ttlMs?: number;
}

/**
 * Derives the per-principal bookkeeping key from an API-key RECORD ID (`apiKeyInfo.id`),
 * never from the secret itself. SHA-256 is the correct primitive here and a password KDF
 * would be wrong: this value is a deterministic index key that must be recomputable on
 * every lookup, not a stored credential verifier. Same construction and rationale as
 * `src/lib/db/apiKeys.ts` and `videoBridgeDrilldown.ts`; CodeQL/semgrep flag the
 * `sha256(<something reached from an apiKey-shaped source>)` shape generically and cannot
 * see that the input is an opaque row id (issue #11655, Hard Rule #14).
 */
function principalDigest(principalId: string): string {
  // nosemgrep: insufficient-password-hash
  return createHash("sha256").update(principalId, "utf8").digest("hex");
}

function frameDataUriBytes(frame: VideoDrilldownFrame): number {
  const commaIndex = frame.dataUri.indexOf(",");
  const encoded = commaIndex >= 0 ? frame.dataUri.slice(commaIndex + 1) : "";
  return Math.floor((encoded.length * 3) / 4);
}

async function shrinkFrameForVariant(
  frame: VideoDrilldownFrame,
  preset: VideoDrilldownVariantPreset
): Promise<VideoDrilldownFrame> {
  if (frame.width <= preset.maxDimension && frame.height <= preset.maxDimension) return frame;
  const commaIndex = frame.dataUri.indexOf(",");
  const source = Buffer.from(frame.dataUri.slice(commaIndex + 1), "base64");
  const resized = await sharp(source)
    .resize({
      fit: "inside",
      height: preset.maxDimension,
      width: preset.maxDimension,
      withoutEnlargement: true,
    })
    .jpeg({ progressive: false })
    .toBuffer();
  const metadata = await sharp(resized).metadata();
  return {
    dataUri: `${JPEG_FRAME_DATA_URI_PREFIX}${resized.toString("base64")}`,
    height: metadata.height ?? frame.height,
    timestampSeconds: frame.timestampSeconds,
    width: metadata.width ?? frame.width,
  };
}

function pageFrameSlice(
  frames: readonly VideoDrilldownFrame[],
  page: number,
  requestedFrameCount: number | undefined,
  variant: VideoDrilldownVariant
): { hasMore: boolean; slice: readonly VideoDrilldownFrame[] } {
  const pageSize = Math.max(
    1,
    Math.min(
      requestedFrameCount ?? VIDEO_DRILLDOWN_VARIANT_PRESETS[variant].defaultPageFrames,
      VIDEO_DRILLDOWN_MAX_PAGE_FRAMES
    )
  );
  const start = Math.max(0, page) * pageSize;
  const slice = frames.slice(start, start + pageSize);
  return { hasMore: start + slice.length < frames.length, slice };
}

function trimToByteBudget(
  frames: readonly VideoDrilldownFrame[],
  maxBytes: number
): { frames: VideoDrilldownFrame[]; trimmed: boolean } {
  const kept: VideoDrilldownFrame[] = [];
  let total = 0;
  for (const frame of frames) {
    const bytes = frameDataUriBytes(frame);
    if (kept.length > 0 && total + bytes > maxBytes) break;
    kept.push(frame);
    total += bytes;
  }
  // A single oversized frame is still returned alone rather than producing an empty page —
  // the underlying cache already enforces the 32 MiB per-entry ceiling, so this only trims
  // multi-frame pages down.
  return { frames: kept.length > 0 ? kept : frames.slice(0, 1), trimmed: kept.length < frames.length };
}

/**
 * Lifecycle wrapper around {@link VideoDrilldownCache}: mints opaque handles at produce
 * time, resolves/deletes strictly by (principal, handle), and applies multiresolution
 * variants + pagination at read time.
 */
export class VideoDrilldownLifecycle {
  private readonly cache: VideoDrilldownCache;
  private readonly handles = new Map<string, HandleEntry>();
  private readonly handleCountByPrincipal = new Map<string, number>();
  private readonly maxHandles: number;
  private readonly maxHandlesPerPrincipal: number;
  private readonly now: () => number;
  private readonly ttlMs: number;

  constructor(options: VideoDrilldownLifecycleOptions) {
    this.cache = options.cache;
    this.now = options.now ?? Date.now;
    this.ttlMs = options.ttlMs ?? 10 * 60 * 1000;
    this.maxHandles = options.maxHandles ?? 4096;
    this.maxHandlesPerPrincipal = options.maxHandlesPerPrincipal ?? 64;
  }

  private sweepExpiredHandles(): number {
    const now = this.now();
    let removed = 0;
    for (const [handle, entry] of this.handles) {
      if (entry.expiresAt <= now) {
        this.dropHandle(handle, entry);
        removed += 1;
      }
    }
    return removed;
  }

  private dropHandle(handle: string, entry: HandleEntry): void {
    this.handles.delete(handle);
    const count = this.handleCountByPrincipal.get(entry.principalKey) ?? 0;
    if (count <= 1) this.handleCountByPrincipal.delete(entry.principalKey);
    else this.handleCountByPrincipal.set(entry.principalKey, count - 1);
  }

  /**
   * A handle evicted for quota is unreachable forever (its digest can never be re-derived
   * without the minted sessionId/videoRef), so its cache entry must be released here too —
   * otherwise it would sit as unreclaimable, invisible quota usage until TTL expiry.
   */
  private releaseEvictedHandle(handle: string, entry: HandleEntry): void {
    this.cache.clearSession(entry.principalId, entry.sessionId);
    this.dropHandle(handle, entry);
  }

  private evictOldestHandleForPrincipal(principalKey: string): void {
    for (const [handle, entry] of this.handles) {
      if (entry.principalKey === principalKey) {
        this.releaseEvictedHandle(handle, entry);
        return;
      }
    }
  }

  private evictOldestHandleGlobally(): void {
    const oldest = this.handles.keys().next().value;
    if (!oldest) return;
    const entry = this.handles.get(oldest);
    if (entry) this.releaseEvictedHandle(oldest, entry);
  }

  private registerHandle(principalId: string, sessionId: string, videoRef: string): string {
    const principalKey = principalDigest(principalId);
    const createdAt = this.now();
    const handle = createHash("sha256")
      .update(principalKey, "utf8")
      .update(":", "utf8")
      .update(sessionId, "utf8")
      .update(":", "utf8")
      .update(videoRef, "utf8")
      .digest("hex");
    this.handles.set(handle, {
      createdAt,
      expiresAt: createdAt + this.ttlMs,
      principalId,
      principalKey,
      sessionId,
      videoRef,
    });
    const count = (this.handleCountByPrincipal.get(principalKey) ?? 0) + 1;
    this.handleCountByPrincipal.set(principalKey, count);
    while ((this.handleCountByPrincipal.get(principalKey) ?? 0) > this.maxHandlesPerPrincipal) {
      const before = this.handles.size;
      this.evictOldestHandleForPrincipal(principalKey);
      if (this.handles.size === before) break;
    }
    while (this.handles.size > this.maxHandles) {
      const before = this.handles.size;
      this.evictOldestHandleGlobally();
      if (this.handles.size === before) break;
    }
    return handle;
  }

  private resolveHandleEntry(principalId: string, handle: string): HandleEntry | null {
    if (!HANDLE_PATTERN.test(handle)) return null;
    this.sweepExpiredHandles();
    const entry = this.handles.get(handle);
    if (!entry || entry.principalKey !== principalDigest(principalId)) return null;
    return entry;
  }

  async produce(
    principalId: string,
    value: VideoDrilldownProducePayload,
    options: VideoDrilldownProduceOptions = {}
  ): Promise<VideoDrilldownProduceResult> {
    this.sweepExpiredHandles();
    const sessionId = randomUUID();
    const videoRef = randomUUID();
    await this.cache.put(principalId, sessionId, videoRef, value as VideoDrilldownPutValue, {
      signal: options.signal,
    });
    const handle = this.registerHandle(principalId, sessionId, videoRef);
    const entry = this.handles.get(handle);
    return { expiresAt: entry?.expiresAt ?? this.now() + this.ttlMs, handle };
  }

  async resolve(
    principalId: string,
    handle: string,
    query: VideoDrilldownResolveQuery
  ): Promise<VideoDrilldownPage | null> {
    const entry = this.resolveHandleEntry(principalId, handle);
    if (!entry) return null;
    const stored = this.cache.get(principalId, entry.sessionId, entry.videoRef, {
      endSeconds: query.endSeconds,
      frameCount: 16,
      startSeconds: query.startSeconds,
    });
    if (!stored) {
      this.dropHandle(handle, entry);
      return null;
    }
    const variant = query.variant ?? "detail";
    const preset = VIDEO_DRILLDOWN_VARIANT_PRESETS[variant];
    const { slice, hasMore } = pageFrameSlice(
      stored.frames,
      query.page ?? 0,
      query.frameCount,
      variant
    );
    const shrunk = await Promise.all(slice.map((frame) => shrinkFrameForVariant(frame, preset)));
    const { frames, trimmed } = trimToByteBudget(shrunk, query.maxPageBytes ?? VIDEO_DRILLDOWN_MAX_PAGE_BYTES);
    return {
      derivation: stored.derivation,
      durationSeconds: stored.durationSeconds,
      ...(stored.focusWindow ? { focusWindow: stored.focusWindow } : {}),
      frames,
      hasMore: hasMore || trimmed,
      page: Math.max(0, query.page ?? 0),
      variant,
    };
  }

  deleteHandle(principalId: string, handle: string): number {
    const entry = this.resolveHandleEntry(principalId, handle);
    if (!entry) return 0;
    const removed = this.cache.clearSession(principalId, entry.sessionId);
    this.dropHandle(handle, entry);
    return removed;
  }

  /** Explicit sweep for scheduled cleanup; returns the number of stale handles reclaimed. */
  cleanup(): number {
    return this.sweepExpiredHandles();
  }

  getUsage(principalId: string): VideoDrilldownUsage {
    return this.cache.getUsage(principalId);
  }

  clearAll(): void {
    this.cache.clearAll();
    this.handles.clear();
    this.handleCountByPrincipal.clear();
  }
}

export type { VideoDrilldownCacheOptions };
