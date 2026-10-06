/**
 * Modality Bridge description cache (PR-1).
 *
 * In-memory LRU + TTL cache for bridge outputs (image/audio descriptions),
 * keyed by sha256(contentRef + prompt + model). Avoids re-describing the
 * same media with the same prompt/model within the configured TTL.
 */
import { createHash } from "node:crypto";

import type { VisionBridgeRuntimeSettings } from "@/shared/constants/modalityBridgeDefaults";

export interface BridgeCacheKeyOptions {
  analysisMode?: "full" | "focused";
  kind?: string;
  dedupCandidateFrameCount?: number;
  dedupPolicyVersion?: string;
  dedupThreshold?: number;
  extractorVersion?: string;
  policyVersion?: string;
  strategy?: string;
  frameCount?: number;
  maxVideos?: number;
  contactSheet?: boolean;
  transcript?: string;
  audioTranscript?: string;
  focusStartSeconds?: number | null;
  focusEndSeconds?: number | null;
  focusHintFingerprint?: string | null;
  version?: string;
}

export function bridgeCacheKey(
  contentRef: string,
  prompt: string,
  model: string,
  options: BridgeCacheKeyOptions = {}
): string {
  // Deterministic input structure to avoid ambiguity and silent hash drift:
  // - keeps old call sites stable (no options)
  // - adds explicit policy/version dimensions for future cache busting
  const payload = {
    analysisMode: options.analysisMode,
    contentRef,
    kind: options.kind ?? "media-frame",
    model,
    prompt,
    dedupCandidateFrameCount: options.dedupCandidateFrameCount,
    dedupPolicyVersion: options.dedupPolicyVersion,
    dedupThreshold: options.dedupThreshold,
    policyVersion: options.policyVersion,
    extractorVersion: options.extractorVersion,
    strategy: options.strategy,
    frameCount: options.frameCount,
    maxVideos: options.maxVideos,
    contactSheet: options.contactSheet,
    transcript: options.transcript,
    audioTranscript: options.audioTranscript,
    focusStartSeconds: options.focusStartSeconds,
    focusEndSeconds: options.focusEndSeconds,
    focusHintFingerprint: options.focusHintFingerprint,
    version: options.version,
  };
  return createHash("sha256").update(JSON.stringify(payload)).digest("hex");
}

export interface BridgeCacheOptions {
  maxEntries: number;
  /** Aggregate UTF-8 key/value/metadata budget; unlimited when omitted. */
  maxBytes?: number;
  ttlMs: number;
  /** Injectable clock for tests. */
  now?: () => number;
}

export interface BridgeCacheEntry {
  value: string;
  /** Actual successful producer, which may differ from the routing-plan model after fallback. */
  producerModel?: string;
  metadata?: Record<string, unknown>;
}

/** Minimal fail-open store contract accepted by complete-result bridge caches. */
export interface BridgeCacheStore {
  delete(key: string): void;
  getEntry(key: string): BridgeCacheEntry | undefined;
  setEntry(key: string, entry: BridgeCacheEntry): void;
}

type StoredBridgeCacheEntry = {
  bytes: number;
  entry: BridgeCacheEntry;
  expiresAt: number;
};

function cacheEntryBytes(entry: BridgeCacheEntry): number {
  try {
    const metadata = JSON.stringify({
      metadata: entry.metadata,
      producerModel: entry.producerModel,
    });
    return Buffer.byteLength(entry.value, "utf8") + Buffer.byteLength(metadata, "utf8");
  } catch (error) {
    console.debug("[MODALITY_BRIDGE_CACHE] Entry size calculation failed open", {
      errorType: error instanceof Error ? error.name : typeof error,
    });
    return Number.POSITIVE_INFINITY;
  }
}

export class BridgeCache implements BridgeCacheStore {
  private readonly entries = new Map<string, StoredBridgeCacheEntry>();
  private totalBytes = 0;

  constructor(private readonly opts: BridgeCacheOptions) {}

  get(key: string): string | undefined {
    return this.getEntry(key)?.value;
  }

  getEntry(key: string): BridgeCacheEntry | undefined {
    const hit = this.entries.get(key);
    if (!hit) return undefined;
    const now = (this.opts.now ?? Date.now)();
    if (hit.expiresAt <= now) {
      this.delete(key);
      return undefined;
    }
    // Map preserves insertion order — re-insert to mark as most-recently-used.
    this.entries.delete(key);
    this.entries.set(key, hit);
    return hit.entry;
  }

  set(key: string, value: string): void {
    this.setEntry(key, { value });
  }

  setEntry(key: string, entry: BridgeCacheEntry): void {
    const now = (this.opts.now ?? Date.now)();
    const bytes = cacheEntryBytes(entry) + Buffer.byteLength(key, "utf8");
    const maxBytes = Math.max(0, this.opts.maxBytes ?? Number.POSITIVE_INFINITY);
    const maxEntries = Math.max(0, Math.floor(this.opts.maxEntries));
    this.delete(key);
    if (!Number.isFinite(bytes) || bytes > maxBytes || maxEntries === 0) return;
    this.entries.set(key, { bytes, entry, expiresAt: now + this.opts.ttlMs });
    this.totalBytes += bytes;
    while (this.entries.size > maxEntries || this.totalBytes > maxBytes) {
      const oldest = this.entries.keys().next().value;
      if (oldest === undefined) break;
      this.delete(oldest);
    }
  }

  get size(): number {
    return this.entries.size;
  }

  /** Current aggregate UTF-8 bytes retained by this cache. */
  get bytes(): number {
    return this.totalBytes;
  }

  delete(key: string): void {
    const existing = this.entries.get(key);
    if (existing) this.totalBytes = Math.max(0, this.totalBytes - existing.bytes);
    this.entries.delete(key);
  }

  clear(): void {
    this.entries.clear();
    this.totalBytes = 0;
  }
}

/** Process-wide singleton used by the bridges; recreated when config changes. */
let shared: { cache: BridgeCache; ttlMs: number; maxBytes: number; maxEntries: number } | null =
  null;

/**
 * Resolve the process-wide bridge cache, recreating it when any bound changes.
 *
 * @param ttlMs - Entry lifetime in milliseconds.
 * @param maxEntries - Maximum retained entry count.
 * @param maxBytes - Aggregate UTF-8 storage budget.
 * @returns The process-wide cache for these exact bounds.
 */
export function getSharedBridgeCache(
  ttlMs: number,
  maxEntries: number,
  maxBytes = Number.POSITIVE_INFINITY
): BridgeCache {
  if (
    !shared ||
    shared.ttlMs !== ttlMs ||
    shared.maxEntries !== maxEntries ||
    shared.maxBytes !== maxBytes
  ) {
    shared = {
      cache: new BridgeCache({ maxBytes, maxEntries, ttlMs }),
      ttlMs,
      maxBytes,
      maxEntries,
    };
  }
  return shared.cache;
}

/**
 * Single conversion point from runtime settings to the shared cache: every
 * bridge (vision, audio) goes through here so the minutes→ms conversion can
 * never diverge between callers and thrash the singleton on each request.
 */
export function getSharedBridgeCacheFor(
  settings: Pick<VisionBridgeRuntimeSettings, "cacheTtlMinutes" | "cacheMaxEntries">
): BridgeCache {
  return getSharedBridgeCache(settings.cacheTtlMinutes * 60_000, settings.cacheMaxEntries);
}
