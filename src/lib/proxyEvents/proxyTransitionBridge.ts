/**
 * Proxy transition bridge.
 *
 * Subscribes to proxy set-aside transitions from the refusal store and emits
 * `proxy.set_aside` to the dashboard event bus plus the webhook dispatcher
 * (fire-and-forget). Imported once at server boot (see instrumentation-node);
 * importing this module registers the subscription as a side effect.
 *
 * Pure helpers (maskEgressKey, buildPoolExhaustedEvent, shouldEmitPoolExhausted)
 * are exported for unit tests. `maybeEmitPoolExhausted` wires the pool-wide
 * check into the rotation path (called before any early return there).
 */

import { emit } from "@/lib/events/eventBus";
import { maskSegment } from "@/shared/utils/formatting";
import { isProxySkipRecentlyFailedEnabled } from "@/shared/utils/featureFlags";
import {
  onProxyTransition,
  type ProxyTransition,
} from "@omniroute/open-sse/utils/proxyTransitionListeners.ts";

const DEFAULT_REBOUND_MS = 300_000;
const MIN_REBOUND_MS = 1_000;
const MAX_REBOUND_MS = 3_600_000;

function readReboundMs(): number {
  const raw = process.env.PROXY_WEBHOOK_REBOUND_MS;
  if (raw == null || raw.trim() === "") return DEFAULT_REBOUND_MS;
  const parsed = Math.floor(Number(raw));
  if (!Number.isFinite(parsed) || parsed < MIN_REBOUND_MS || parsed > MAX_REBOUND_MS) {
    return DEFAULT_REBOUND_MS;
  }
  return parsed;
}

function splitOnce(value: string, sep: string): [string, string] {
  const idx = value.indexOf(sep);
  if (idx === -1) return [value, ""];
  return [value.slice(0, idx), value.slice(idx + sep.length)];
}

/** Mask a proxy egress key: scheme and port verbatim, user and host masked. */
export function maskEgressKey(key: string): string {
  const [scheme, rest] = splitOnce(key, "://");
  const [authority, port] = splitOnce(rest, ":");
  const [user, host] = authority.includes("@") ? splitOnce(authority, "@") : ["", authority];
  const maskedUser = user ? `${maskSegment(user)}@` : "";
  return `${scheme}://${maskedUser}${maskSegment(host)}:${port}`;
}

const lastEmitByKey = new Map<string, number>();
let nowForTesting: (() => number) | null = null;

function nowMs(): number {
  return nowForTesting ? nowForTesting() : Date.now();
}

export function emitSetAside(transition: ProxyTransition): boolean {
  const windowMs = readReboundMs();
  const now = nowMs();
  const last = lastEmitByKey.get(transition.key);
  if (last !== undefined && now - last < windowMs) return false;
  lastEmitByKey.set(transition.key, now);
  const payload = {
    reason: transition.kind,
    setAsideUntil: new Date(transition.until).toISOString(),
    durationMs: transition.periodMs,
    egressKeyMasked: maskEgressKey(transition.key),
    timestamp: now,
  };
  emit("proxy.set_aside", payload);
  void import("@/lib/webhookDispatcher")
    .then(({ notifyWebhookEvent }) => {
      notifyWebhookEvent("proxy.set_aside", payload);
    })
    .catch(() => {
      /* webhook delivery is best-effort */
    });
  return true;
}

export interface PoolExhaustedEvent {
  scope: string;
  poolSize: number;
  setAsideCount: number;
  fallback: "fail-closed-serve";
  timestamp: number;
}

const lastExhaustedByScope = new Map<string, number>();

export function buildPoolExhaustedEvent(
  scope: string,
  poolSize: number,
  setAsideCount: number,
  timestamp: number = nowMs()
): PoolExhaustedEvent {
  return { scope, poolSize, setAsideCount, fallback: "fail-closed-serve", timestamp };
}

export function shouldEmitPoolExhausted(
  scope: string,
  poolSize: number,
  setAsideCount: number,
  now: number = nowMs()
): boolean {
  if (poolSize < 1 || setAsideCount < poolSize) return false;
  const last = lastExhaustedByScope.get(scope);
  if (last !== undefined && now - last < readReboundMs()) return false;
  lastExhaustedByScope.set(scope, now);
  return true;
}

let unsubscribe: (() => void) | null = null;

/**
 * Pool-wide check for the rotation path: when every member of a pool is set
 * aside (and skipping is enabled), emit one `proxy.pool.exhausted` per rebound
 * window. Returns true when an event was emitted. No-op when the flag is off
 * (zero cost beyond the flag read) or the pool still has an eligible member.
 * The avoidance reader is injected (rotation passes its own) so this module
 * stays free of the refusal-store import.
 */
export function maybeEmitPoolExhausted(
  scope: string,
  candidates: unknown[],
  keyOf: (row: unknown) => string | null,
  isAvoided: (key: string | null) => boolean,
  now: number = nowMs()
): boolean {
  if (!isProxySkipRecentlyFailedEnabled()) return false;
  if (candidates.length < 1) return false;
  let setAsideCount = 0;
  for (const row of candidates) {
    if (isAvoided(keyOf(row))) setAsideCount += 1;
  }
  if (setAsideCount < candidates.length) return false;
  if (!shouldEmitPoolExhausted(scope, candidates.length, setAsideCount, now)) return false;
  const event = buildPoolExhaustedEvent(scope, candidates.length, setAsideCount, now);
  emit("proxy.pool.exhausted", event);
  void import("@/lib/webhookDispatcher")
    .then(({ notifyWebhookEvent }) => {
      notifyWebhookEvent("proxy.pool.exhausted", event);
    })
    .catch(() => {
      /* webhook delivery is best-effort */
    });
  return true;
}

/** Register the bridge subscription. Idempotent; safe to call twice. */
export function registerProxyTransitionBridge(): void {
  if (unsubscribe !== null) return;
  unsubscribe = onProxyTransition((transition) => {
    emitSetAside(transition);
  });
}

/** Test-only: forget emission state and the subscription. */
export function __resetBridgeForTesting(): void {
  lastEmitByKey.clear();
  lastExhaustedByScope.clear();
  unsubscribe?.();
  unsubscribe = null;
  nowForTesting = null;
}

/** Test-only: inject a clock. */
export function __setBridgeNowForTesting(fn: (() => number) | null): void {
  nowForTesting = fn;
}

registerProxyTransitionBridge();
