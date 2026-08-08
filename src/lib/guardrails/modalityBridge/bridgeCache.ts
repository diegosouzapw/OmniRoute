/**
 * Modality Bridge description cache (PR-1).
 *
 * In-memory LRU + TTL cache for bridge outputs (image/audio descriptions),
 * keyed by sha256(contentRef + prompt + model). Avoids re-describing the
 * same media with the same prompt/model within the configured TTL.
 */
import { createHash } from "node:crypto";

import type { VisionBridgeRuntimeSettings } from "@/shared/constants/modalityBridgeDefaults";

export function bridgeCacheKey(contentRef: string, prompt: string, model: string): string {
  // Length-prefix framing: hashing the byte lengths first makes the field
  // boundaries unambiguous, so ("ab","c") can never collide with ("a","bc").
  return createHash("sha256")
    .update(`${Buffer.byteLength(contentRef)}:${Buffer.byteLength(prompt)}:`)
    .update(contentRef)
    .update(prompt)
    .update(model)
    .digest("hex");
}

export interface BridgeCacheOptions {
  maxEntries: number;
  ttlMs: number;
  /** Injectable clock for tests. */
  now?: () => number;
}

export class BridgeCache {
  private readonly entries = new Map<string, { value: string; expiresAt: number }>();

  constructor(private readonly opts: BridgeCacheOptions) {}

  get(key: string): string | undefined {
    const hit = this.entries.get(key);
    if (!hit) return undefined;
    const now = (this.opts.now ?? Date.now)();
    if (hit.expiresAt <= now) {
      this.entries.delete(key);
      return undefined;
    }
    // Map preserves insertion order — re-insert to mark as most-recently-used.
    this.entries.delete(key);
    this.entries.set(key, hit);
    return hit.value;
  }

  set(key: string, value: string): void {
    const now = (this.opts.now ?? Date.now)();
    this.entries.delete(key);
    this.entries.set(key, { value, expiresAt: now + this.opts.ttlMs });
    while (this.entries.size > this.opts.maxEntries) {
      const oldest = this.entries.keys().next().value;
      if (oldest === undefined) break;
      this.entries.delete(oldest);
    }
  }

  get size(): number {
    return this.entries.size;
  }
}

/** Process-wide singleton used by the bridges; recreated when config changes. */
let shared: { cache: BridgeCache; ttlMs: number; maxEntries: number } | null = null;

export function getSharedBridgeCache(ttlMs: number, maxEntries: number): BridgeCache {
  if (!shared || shared.ttlMs !== ttlMs || shared.maxEntries !== maxEntries) {
    shared = { cache: new BridgeCache({ maxEntries, ttlMs }), ttlMs, maxEntries };
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
