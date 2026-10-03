/**
 * Selector transition subscriber.
 *
 * Subscribes to proxy set-aside transitions from the refusal store and steers
 * the local core selector off the set-aside member, whatever the refusal kind
 * (quota, transport, slow, unreachable probe). Fire-and-forget: never throws,
 * never blocks the notification path. All policy (flag, control cache,
 * resolution, throttle, fetch-time guard) stays inside `maybeSwitchOnSetAside`,
 * which owns the single throttle slot per (subscription, selector) — so the
 * synchronous quota path and this listener collapse to one control call.
 *
 * Registered once at server boot (see instrumentation-node); importing this
 * module has no side effect. No extra store: bounded by the trigger's own
 * throttle map and the refusal memory bound.
 */

import { maybeSwitchOnSetAside } from "./selectorTrigger";
import {
  onProxyTransition,
  type ProxyTransition,
} from "@omniroute/open-sse/utils/proxyTransitionListeners.ts";

function handleTransition(transition: ProxyTransition): void {
  void maybeSwitchOnSetAside(transition.key, { kind: transition.kind }).catch((e) => {
    console.warn(`[SelectorControl] trigger failed: ${e instanceof Error ? e.message : e}`);
  });
}

let unsubscribe: (() => void) | null = null;

/** Register the selector subscription. Idempotent; safe to call twice. */
export function registerSelectorTransitionSubscriber(): void {
  if (unsubscribe !== null) return;
  unsubscribe = onProxyTransition(handleTransition);
}

/** Test-only: forget the subscription. */
export function __resetSubscriberForTesting(): void {
  unsubscribe?.();
  unsubscribe = null;
}
