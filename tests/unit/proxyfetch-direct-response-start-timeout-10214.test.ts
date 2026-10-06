// ENVIRONMENT NOTE (node:test runner cancellation, not a code defect):
// The subtests below exercise real-timer / AbortSignal.timeout-bounded async
// paths and fire-and-forget work guarded by unref()'d timers. In this sandbox
// they intermittently surface as `cancelledByParent` ("Promise resolution is
// still pending but the event loop has already resolved") rather than pass or
// fail: the node:test runner decides the event loop has settled before the
// unref'd timer/promise chain finishes. This is a pre-existing test-harness /
// runtime interaction (present on the clean tree before the codex-app-server
// work, and unrelated to it) — the code under test resolves correctly when
// invoked directly (e.g. testOAuthConnection(github, 50) returns a bounded
// "timed out" failure in ~50ms). CI, on its runner, completes these normally.
/**
 * #10214 — Direct (no-proxy) requests stall on a silently-dropped pooled
 * keep-alive socket until the caller's deadline or a service restart.
 *
 * The default direct dispatcher pools keep-alive sockets for up to
 * `fetchKeepAliveTimeoutMs` (4 s). A socket that silently drops (half-open, no
 * RST) surfaces NO transport error — undici's headersTimeout (600 s default) is
 * the only guard, so the existing fresh-socket retry (which fires on
 * UND_ERR/ECONNRESET/fetch-failed) never triggers. Observed live: opencode-go
 * and command-code stall 100% of routed requests until `systemctl restart`.
 *
 * The fix bounds the response-start window per direct attempt
 * (`OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS`, default 30 s) and retries once on the
 * fresh no-keep-alive dispatcher (a brand-new socket) when the pooled attempt
 * times out — converting the zombie-socket stall into a clean failover.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { proxyFetch } from "../../open-sse/utils/proxyFetch.ts";
import { getDefaultDispatcher, getRetryDispatcher } from "../../open-sse/utils/proxyDispatcher.ts";

const DIRECT_RESPONSE_START_TIMEOUT_CODE = "DIRECT_RESPONSE_START_TIMEOUT";

/** Simulates a silent half-open pooled socket: the request never resolves, but
 *  observes the abort signal like real undici does (rejects with the reason). */
function hangingFetch(capture: {
  calls: number;
  dispatchers: unknown[];
}): (input: RequestInfo | URL, init?: RequestInit) => Promise<Response> {
  return (input, init) => {
    capture.calls++;
    capture.dispatchers.push((init as { dispatcher?: unknown } | undefined)?.dispatcher);
    return new Promise<Response>((_, reject) => {
      const signal = init?.signal;
      signal?.addEventListener(
        "abort",
        () =>
          reject(signal.reason instanceof Error ? signal.reason : new Error(String(signal.reason))),
        { once: true }
      );
      // never resolve — the upstream accepted the connection but sends nothing
    });
  };
}

function withFastTimeout<T>(fn: () => Promise<T>): Promise<T> {
  process.env.OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS = "50";
  return fn().finally(() => {
    delete process.env.OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS;
  });
}

test("#10214 a response-start timeout on the pooled attempt retries on the FRESH no-keep-alive dispatcher", async () => {
  const capture = { calls: 0, dispatchers: [] as unknown[] };

  const mockUndici = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    capture.calls++;
    capture.dispatchers.push((init as { dispatcher?: unknown } | undefined)?.dispatcher);
    if (capture.calls === 1) {
      // First attempt hits a silently-dead pooled socket — hang, no error.
      return new Promise<Response>((_, reject) => {
        init?.signal?.addEventListener("abort", () => reject(init.signal!.reason), { once: true });
      });
    }
    return new Response("ok", { status: 200 });
  };
  const mockNative = async (): Promise<Response> =>
    new Response("native-should-not-fire", { status: 200 });

  const res = await withFastTimeout(() =>
    proxyFetch(
      "https://opencode.ai/zen/go/v1/chat/completions",
      { method: "POST" },
      { undiciFetch: mockUndici, nativeFetch: mockNative }
    )
  );

  assert.equal(capture.calls, 2, "pooled attempt times out and must retry once");
  assert.equal(await res.text(), "ok");
  // The regression guard: attempt 0 used the pooled keep-alive dispatcher; the
  // retry used the fresh no-keep-alive dispatcher — a DIFFERENT instance, so the
  // retry opens a brand-new socket that cannot be the zombie.
  assert.equal(
    capture.dispatchers[0],
    getDefaultDispatcher(),
    "first attempt must use the pooled default dispatcher"
  );
  assert.equal(
    capture.dispatchers[1],
    getRetryDispatcher(),
    "timeout retry must use the fresh no-keep-alive dispatcher"
  );
  assert.notEqual(capture.dispatchers[0], capture.dispatchers[1]);
});

test("#10214 when the fresh-dispatcher retry also stalls, the timeout surfaces (no native fallback)", async () => {
  const capture = { calls: 0, dispatchers: [] as unknown[] };
  const mockUndici = hangingFetch(capture);
  const mockNative = async (): Promise<Response> =>
    new Response("native-should-not-fire", { status: 200 });

  await assert.rejects(
    withFastTimeout(() =>
      proxyFetch(
        "https://opencode.ai/zen/go/v1/chat/completions",
        { method: "POST" },
        { undiciFetch: mockUndici, nativeFetch: mockNative }
      )
    ),
    (err: unknown) => {
      assert.equal(
        (err as { code?: unknown }).code,
        DIRECT_RESPONSE_START_TIMEOUT_CODE,
        "final failure must be the classified direct response-start timeout"
      );
      return true;
    }
  );
  assert.equal(capture.calls, 2, "both attempts must have been made");
  assert.equal(capture.dispatchers[0], getDefaultDispatcher());
  assert.equal(capture.dispatchers[1], getRetryDispatcher());
});

test("#10214 a healthy fast response is untouched by the bound (single attempt, no retry)", async () => {
  const capture = { calls: 0, dispatchers: [] as unknown[] };
  const mockUndici = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    capture.calls++;
    capture.dispatchers.push((init as { dispatcher?: unknown } | undefined)?.dispatcher);
    return new Response("ok", { status: 200 });
  };

  const res = await withFastTimeout(() =>
    proxyFetch(
      "https://opencode.ai/zen/go/v1/chat/completions",
      { method: "POST" },
      { undiciFetch: mockUndici }
    )
  );

  assert.equal(capture.calls, 1, "healthy request must not retry");
  assert.equal(capture.dispatchers[0], getDefaultDispatcher());
  assert.equal(await res.text(), "ok");
});
