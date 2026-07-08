// /src/lib/tokn — TS consumer of @omniroute/tokn (native Rust binding).
//
// The native binding is the source of truth for routing decisions. This
// module provides:
//   - decide(): cached, sync-feeling API for hot paths (dashboard, A2A agents)
//   - decideAsync(): uncached passthrough to the native binding
//   - stats(): live impl kind + version for the management console
//
// The TS fallback (in `fallback.ts`) is a hard requirement: if the native
// binary is unavailable, the dashboard and CLI must still function. Both
// paths produce the same `RouteDecision` shape.

import {
  decide as nativeDecide,
  ffiVersion,
  implKind,
  isHealthy,
  // @ts-expect-error -- workspace package resolved at runtime via build/postinstall
} from '../../../packages/tokn/index.js';
// @ts-expect-error -- workspace package resolved at runtime via build/postinstall
import type { RouteRequest, RouteDecision } from '../../../packages/tokn/index.js';
export type { RouteRequest, RouteDecision };

import { fallbackDecide } from './fallback.js';

interface CacheEntry {
  decision: RouteDecision;
  expiresAt: number;
}

const CACHE_TTL_MS = 30_000; // 30s — combo chains are stable
const _cache = new Map<string, CacheEntry>();

function cacheKey(req: RouteRequest): string {
  return `${req.tenantId ?? '_default'}::${req.model}`;
}

function evictExpired(now: number): void {
  for (const [k, v] of _cache) {
    if (v.expiresAt <= now) _cache.delete(k);
  }
}

/**
 * Cached, sync-feeling decision. The first call may pay the native-load
 * latency; subsequent calls within CACHE_TTL_MS are O(1) Map lookup.
 *
 * If the native binding is unavailable, falls back to the pure-TS impl
 * transparently. `decision.source` indicates which path served the call.
 */
export async function decide(req: RouteRequest): Promise<RouteDecision> {
  const key = cacheKey(req);
  const now = Date.now();
  const cached = _cache.get(key);
  if (cached && cached.expiresAt > now) return cached.decision;

  let decision: RouteDecision;
  if (isHealthy()) {
    decision = await nativeDecide(req);
  } else {
    decision = fallbackDecide(req);
  }

  _cache.set(key, { decision, expiresAt: now + CACHE_TTL_MS });
  if (_cache.size > 1024) evictExpired(now);
  return decision;
}

/**
 * Uncached async passthrough. Use for tests + warm-up paths.
 */
export async function decideAsync(req: RouteRequest): Promise<RouteDecision> {
  if (isHealthy()) return nativeDecide(req);
  return fallbackDecide(req);
}

/**
 * Force the cache to clear. Called by the management console when the
 * user edits combo mappings in the UI.
 */
export function invalidateCache(): void {
  _cache.clear();
}

export interface ToknStats {
  implKind: 'native' | 'ts' | 'unresolved';
  healthy: boolean;
  ffiVersion: string;
  cacheSize: number;
}

/**
 * Live telemetry for the management console. Cheap (no I/O).
 */
export function stats(): ToknStats {
  return {
    implKind: implKind(),
    healthy: isHealthy(),
    ffiVersion: ffiVersion(),
    cacheSize: _cache.size,
  };
}
