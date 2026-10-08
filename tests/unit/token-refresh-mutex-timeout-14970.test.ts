/**
 * Regression tests for issue #14970.
 *
 * A hung OAuth refresh fetch (e.g. a blackholed proxy during an outage) used to
 * wedge the per-connection `connectionRefreshMutex` forever: the entry's only
 * exit was the leader promise's `.finally`, which never ran, so every request
 * on the connection joined the in-flight refresh and 504'd until the process
 * restarted. The shared mutex promise now has a bounded lifetime
 * (`refreshMutexMaxMs`, 90s default) — on expiry it resolves null (refresh
 * failure), evicts the entry, and lets the next caller start a fresh refresh.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  getAccessToken,
  getConnectionRefreshMutexStatus,
  setRefreshMutexMaxMsForTest,
} from "../../open-sse/services/tokenRefresh.ts";
import {
  serializeRefresh,
  setRefreshLaneMaxMsForTest,
} from "../../open-sse/services/refreshSerializer.ts";

const silentLog = { info() {}, warn() {}, error() {} };
const MUTEX_MS = 150;

function withFetch<T>(impl: () => Promise<Response>, fn: () => Promise<T>): Promise<T> {
  const realFetch = globalThis.fetch;
  globalThis.fetch = impl as never;
  return fn().finally(() => {
    globalThis.fetch = realFetch;
  });
}

// A fetch that never settles — the blackholed-upstream case from #14970.
const hangingFetch = () => new Promise<Response>(() => {});

const okTokenFetch = async () =>
  new Response(
    JSON.stringify({
      access_token: "ACCESS",
      refresh_token: "R1",
      expires_in: 3600,
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );

test("#14970 hung refresh resolves null and evicts the mutex entry", async () => {
  setRefreshMutexMaxMsForTest(MUTEX_MS);
  // claude sits in a rotation group — bound the lane too or the hung refresh
  // would hold it for the 60s default.
  setRefreshLaneMaxMsForTest(MUTEX_MS);
  const connectionId = `conn-wedge-${Date.now()}`;
  try {
    await withFetch(hangingFetch, async () => {
      const started = Date.now();
      const result = await getAccessToken(
        "claude",
        { refreshToken: "R0", connectionId },
        silentLog
      );
      const elapsed = Date.now() - started;

      assert.equal(result, null, "a hung refresh must resolve as refresh-failure");
      assert.ok(
        elapsed < MUTEX_MS * 10,
        `bounded wait expected (~${MUTEX_MS}ms), took ${elapsed}ms`
      );
      assert.deepEqual(
        getConnectionRefreshMutexStatus(),
        {},
        "the wedged mutex entry must be evicted"
      );
    });
  } finally {
    setRefreshMutexMaxMsForTest(null);
    setRefreshLaneMaxMsForTest(null);
  }
});

test("#14970 concurrent waiters share the bounded promise, next caller starts fresh", async () => {
  setRefreshMutexMaxMsForTest(MUTEX_MS);
  setRefreshLaneMaxMsForTest(MUTEX_MS);
  // Skip the inter-refresh settle gap — at 150ms bounds the 2s spacing would
  // outlast the follower's own mutex budget.
  const prevSpacing = process.env.CODEX_REFRESH_SPACING_MS;
  process.env.CODEX_REFRESH_SPACING_MS = "0";
  const connectionId = `conn-wedge-waiters-${Date.now()}`;
  try {
    await withFetch(hangingFetch, async () => {
      const creds = { refreshToken: "R0", connectionId };
      const first = getAccessToken("claude", creds, silentLog);
      const second = getAccessToken("claude", creds, silentLog);

      // While wedged (before the bound fires) the waiter joins the shared entry.
      assert.equal(
        getConnectionRefreshMutexStatus()[connectionId]?.waiters,
        1,
        "second caller should join as a waiter on the in-flight entry"
      );

      const [r1, r2] = await Promise.all([first, second]);
      assert.equal(r1, null);
      assert.equal(r2, null);
      assert.deepEqual(getConnectionRefreshMutexStatus(), {});
    });

    // After eviction the next caller runs a real refresh — not a rejoined wedge.
    await withFetch(okTokenFetch, async () => {
      const result = await getAccessToken(
        "claude",
        { refreshToken: "R0", connectionId },
        silentLog
      );
      assert.ok(result?.accessToken, "post-eviction refresh must proceed normally");
    });
  } finally {
    setRefreshMutexMaxMsForTest(null);
    setRefreshLaneMaxMsForTest(null);
    if (prevSpacing === undefined) delete process.env.CODEX_REFRESH_SPACING_MS;
    else process.env.CODEX_REFRESH_SPACING_MS = prevSpacing;
  }
});

test("#14970 hung lane refresh releases the rotation-group lane for queued siblings", async () => {
  setRefreshLaneMaxMsForTest(MUTEX_MS);
  // Skip the inter-refresh settle gap so the queued sibling runs promptly.
  const prevSpacing = process.env.CODEX_REFRESH_SPACING_MS;
  process.env.CODEX_REFRESH_SPACING_MS = "0";
  try {
    const hung = serializeRefresh("claude", () => new Promise<string>(() => {}), silentLog);
    const sibling = serializeRefresh("claude", async () => "fresh", silentLog);

    const [hungResult, siblingResult] = await Promise.all([hung, sibling]);
    assert.equal(hungResult, null, "hung leader resolves null after the lane bound");
    assert.equal(
      siblingResult,
      "fresh",
      "queued sibling proceeds once the wedged lane is released"
    );
  } finally {
    setRefreshLaneMaxMsForTest(null);
    if (prevSpacing === undefined) delete process.env.CODEX_REFRESH_SPACING_MS;
    else process.env.CODEX_REFRESH_SPACING_MS = prevSpacing;
  }
});
