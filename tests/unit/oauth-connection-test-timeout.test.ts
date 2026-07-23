import test from "node:test";
import assert from "node:assert/strict";

import { testOAuthConnection } from "../../src/app/api/providers/[id]/test/route";

// #1449 (port from 9router) — "Test Connection One-by-One" could hang forever when an
// OAuth provider probe never returned. The OAuth probe path called bare
// fetch(url, {method, headers}) with NO AbortController/signal/timeout, so a hung
// upstream blocked the test queue indefinitely. The fix bounds both the initial probe
// and the post-refresh retry with AbortSignal.timeout(...) and reports a clear
// "timed out" failure in the same shape as other test errors.
//
// This test drives the probe with a fetch() that NEVER resolves but honors the
// AbortSignal. Without the timeout the awaited fetch never settles and the test would
// hang (and time out the runner). With the fix it resolves quickly as a failure.
test("OAuth connection test does not hang when the probe never returns (#1449)", async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  // A fetch that never resolves on its own, but rejects with an AbortError as soon as
  // the caller's AbortSignal fires — mirroring how the real fetch reacts to a timeout.
  globalThis.fetch = ((_url: RequestInfo | URL, init?: RequestInit) => {
    return new Promise((_resolve, reject) => {
      const signal: AbortSignal | undefined = init?.signal ?? undefined;
      if (!signal) return; // no signal => hangs forever (the pre-fix behavior)
      if (signal.aborted) {
        reject(makeAbortError());
        return;
      }
      signal.addEventListener("abort", () => reject(makeAbortError()), { once: true });
    });
  }) as typeof fetch;

  // github is an OAuth provider with a real test URL (not checkExpiry), so the code
  // reaches the bare probe fetch. A future expiry avoids the refresh branch.
  const connection = {
    provider: "github",
    authType: "oauth",
    accessToken: "fake-token",
    refreshToken: null,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  };

  // Inject a short timeout so the test runs fast and can never hang the runner.
  const result = await withDeadline(testOAuthConnection(connection, 50), 5000);

  assert.equal(result.valid, false, "a timed-out probe must be reported as a failure");
  assert.match(
    String(result.error),
    /tim(ed )?out/i,
    `error should indicate a timeout, got: ${result.error}`
  );
  // Same failure shape the route returns for every other OAuth test error.
  assert.equal(result.refreshed, false);
  assert.ok(result.diagnosis, "a failure must carry a diagnosis");
  assert.equal(typeof result.diagnosis.type, "string");
});

function makeAbortError() {
  // Node's fetch raises a DOMException named "AbortError" when its signal aborts.
  return new DOMException("The operation was aborted", "AbortError");
}

// Hard backstop so a regression can never wedge the whole test file.
function withDeadline<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_resolve, reject) =>
      setTimeout(() => reject(new Error(`test deadline exceeded (${ms}ms) — probe hung`)), ms).unref()
    ),
  ]);
}
