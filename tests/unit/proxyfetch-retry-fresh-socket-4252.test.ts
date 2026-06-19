/**
 * #4252 — Undici dispatcher fails on direct provider requests in 502 bursts.
 *
 * The default direct dispatcher pools keep-alive sockets for up to
 * `fetchKeepAliveTimeoutMs` (4 s). Edges like nvidia / opencode-zen silently
 * close idle keep-alive sockets within that window, so the next request reusing
 * a pooled socket fails with `UND_ERR_SOCKET` ("other side closed") — in bursts.
 *
 * proxyFetch retries once on such transient socket errors, but the retry reused
 * the SAME pooled dispatcher (`getDefaultDispatcher()`), so it could grab ANOTHER
 * stale socket and fail too → fall through to native fetch (which also pools) →
 * the job sat in the rate-limit queue until the 30 s timeout → 502 + circuit
 * breaker open.
 *
 * The retry must use a fresh, no-keep-alive dispatcher so it opens a brand-new
 * socket that cannot be a dead pooled one — converting the burst into a clean
 * retry success. The first attempt still uses the pooled dispatcher (healthy
 * keep-alive reuse is preserved).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { proxyFetch } from "../../open-sse/utils/proxyFetch.ts";
import {
  getDefaultDispatcher,
  getRetryDispatcher,
} from "../../open-sse/utils/proxyDispatcher.ts";

function undErrSocket(): Error {
  const err = new Error("fetch failed") as Error & { code?: string };
  err.code = "UND_ERR_SOCKET";
  return err;
}

test("#4252 a transient socket failure retries on a FRESH (no-keep-alive) dispatcher, not the pooled one", async () => {
  const dispatchersUsed: unknown[] = [];
  let undiciCalls = 0;
  let nativeCalls = 0;

  const mockUndici = async (_input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    undiciCalls++;
    dispatchersUsed.push((init as { dispatcher?: unknown } | undefined)?.dispatcher);
    if (undiciCalls === 1) {
      // First attempt grabs a stale pooled keep-alive socket the edge already closed.
      throw undErrSocket();
    }
    return new Response("ok", { status: 200 });
  };
  const mockNative = async (): Promise<Response> =>
    new Response("native-should-not-fire", { status: 200 });

  const res = await proxyFetch(
    "https://integrate.api.nvidia.com/v1/chat/completions",
    { method: "POST" },
    { undiciFetch: mockUndici, nativeFetch: mockNative }
  );

  assert.equal(undiciCalls, 2, "undici must retry once (initial fail + retry)");
  assert.equal(nativeCalls, 0, "native fallback must NOT fire — the retry recovers it");
  assert.equal(await res.text(), "ok");

  // The actual regression guard: attempt 0 uses the pooled keep-alive dispatcher,
  // the retry uses the fresh no-keep-alive dispatcher (a DIFFERENT instance) so it
  // can't reuse another dead pooled socket.
  assert.equal(
    dispatchersUsed[0],
    getDefaultDispatcher(),
    "first attempt must use the pooled default dispatcher"
  );
  assert.equal(
    dispatchersUsed[1],
    getRetryDispatcher(),
    "retry must use the fresh no-keep-alive retry dispatcher"
  );
  assert.notEqual(
    dispatchersUsed[0],
    dispatchersUsed[1],
    "retry must NOT reuse the same pooled dispatcher (would grab another stale socket)"
  );
});
