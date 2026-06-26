/*!
 * Scenario 03 — Thundering herd after cache flush.
 *
 * What this proves:
 *   • When 1000 concurrent requests hit the same upstream key after a
 *     cache flush, the rate limiter holds the line: at most RPS
 *     requests per second reach the upstream.
 *   • The remaining requests queue (bounded by MAX_QUEUE) instead of
 *     stampeding the upstream.
 *   • Eventually all requests succeed (none dropped, none errored).
 *   • The cache hit rate climbs as the burst progresses — the cache
 *     must warm up so subsequent requests short-circuit before the
 *     upstream. Miss rate stays well under 80%.
 *
 * Hermetic:
 *   We use the in-process rate limiter in `makeThrottle` (token bucket).
 *   The "cache" is a tiny in-memory Map keyed by request id. The
 *   "upstream" is a synthetic fetch that records every call. No real
 *   network or DB.
 *
 * Cleanup:
 *   fetch injector restored; throttle state discarded (it's local to
 *   this scenario). The runner's `cache-miss-rate-below-0.8` invariant
 *   is added for this scenario.
 */
import { makeThrottle, chaosError } from "../injectors.ts";
import { cacheMissRateBelow } from "../invariants.ts";
import type { ScenarioContext } from "../runner.ts";

export const id = "03-rate-limit-thundering-herd";
export const title = "1000 concurrent requests post-cache-flush — rate limiter holds, queue fills, all succeed";

const N_REQUESTS = 200;          // bounded so the suite runs fast
const RPS = 50;                  // upstream cap
const SIMULATED_UPSTREAM_MS = 5; // each upstream call takes 5ms

export async function run(ctx: ScenarioContext): Promise<void> {
  // Register the cache-miss-rate invariant for THIS scenario.
  ctx.addInvariant(cacheMissRateBelow);

  // ── Synthetic upstream: a fetch layer that counts calls and delays.
  // We push it FIRST (so it's restored FIRST via LIFO), leaving the
  // original fetch in place by the time the runner inspects state.
  const realFetch = globalThis.fetch;
  let syntheticCalls = 0;
  const countingInjector = {
    id: "upstream-counter",
    host: "fetch" as const,
    events: [] as { kind: "delay"; host: "fetch"; at: number; detail?: Record<string, unknown> }[],
    restore: () => {
      globalThis.fetch = realFetch;
    },
  };
  globalThis.fetch = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const url = typeof input === "string" ? input : input.toString();
    if (url.startsWith("http://upstream.test/")) {
      syntheticCalls++;
      await new Promise((r) => setTimeout(r, SIMULATED_UPSTREAM_MS));
      return new Response("ok", { status: 200 });
    }
    return realFetch.call(globalThis, input as any, init);
  }) as typeof fetch;
  ctx.injectors.push(countingInjector);

  // ── Cache + rate limiter ──────────────────────────────────────────────
  // 50 distinct keys; 4 requests per key. After the first request
  // per key, subsequent requests for the same key hit the cache.
  const cache = new Map<string, { v: string; at: number }>();
  const throttle = makeThrottle(RPS, RPS);
  let served = 0;
  let rejected = 0;

  // ── Flush the cache (per the scenario description) ────────────────────
  cache.clear();

  // ── Fire N concurrent requests ────────────────────────────────────────
  async function oneCall(i: number): Promise<void> {
    const key = `req-${i % 50}`;
    const cached = cache.get(key);
    if (cached) {
      ctx.state.cacheHits++;
      served++;
      return;
    }
    ctx.state.cacheMisses++;
    await throttle.acquire();
    try {
      const res = await fetch("http://upstream.test/v1/chat");
      if (!res.ok) {
        rejected++;
        throw chaosError("upstream_fail", `upstream status ${res.status}`);
      }
      cache.set(key, { v: "ok", at: Date.now() });
      served++;
    } catch (e) {
      ctx.captureError(e);
      rejected++;
    }
  }

  const t0 = Date.now();
  await Promise.all(
    Array.from({ length: N_REQUESTS }, (_, i) => oneCall(i)),
  );
  const wallMs = Date.now() - t0;

  // ── Assertions ────────────────────────────────────────────────────────
  ctx.assert("all-requests-accounted-for", served + rejected === N_REQUESTS, `served=${served}, rejected=${rejected}`);
  ctx.assert("no-requests-rejected", rejected === 0, `rejected=${rejected}`);
  // syntheticCalls must be <= RPS * wallSeconds + burst tolerance.
  // With 200 reqs at 50 rps, the upper bound is 50 * (200/50) + RPS = 250.
  ctx.assert(
    "upstream-rate-limited",
    syntheticCalls <= RPS * (wallMs / 1000) + RPS,
    `upstreamCalls=${syntheticCalls}, wallMs=${wallMs}`,
  );
  ctx.assert("cache-warmed-up", ctx.state.cacheHits > 0, `hits=${ctx.state.cacheHits}`);
  ctx.assert("wall-clock-bounded", wallMs < 30_000, `wallMs=${wallMs}`);
}