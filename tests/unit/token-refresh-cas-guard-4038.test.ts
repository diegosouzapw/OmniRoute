import test from "node:test";
import assert from "node:assert/strict";
import {
  getAccessToken,
  runWithCasGuard,
  getCasGuardStats,
  _resetCasGuardStats,
  _clearTokenRotationMap,
} from "../../open-sse/services/tokenRefresh.ts";

// #4038: the per-connection mutex makes [refresh + persist] atomic for ONE connection,
// but a THIRD writer (sibling request / HealthCheck / replica) can land a fresher
// refresh_token rotation between our staleness read and our persist. Overwriting it
// reverts the sibling's rotation → the next caller loads a now-consumed token → Auth0
// revokes the whole family (the 1352× claude invalidation storm). The CAS guard
// re-reads the row right before persisting and SKIPS the write when the row's
// refresh_token has rotated past the one we presented.

const silentLog = { info() {}, warn() {}, error() {} };

// Mock the Anthropic token endpoint so claude's refresh succeeds without a network call.
function withMockedRefresh<T>(newRefreshToken: string, fn: () => Promise<T>): Promise<T> {
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({
        access_token: "NEW_ACCESS_TOKEN",
        refresh_token: newRefreshToken,
        expires_in: 3600,
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    )) as never;
  return fn().finally(() => {
    globalThis.fetch = realFetch;
  });
}

test("#4038 CAS guard SKIPS the persist when a concurrent writer rotated the refresh_token", async () => {
  _resetCasGuardStats();
  _clearTokenRotationMap();
  let persisted = false;
  const onPersist = async () => {
    persisted = true;
  };

  const result = await withMockedRefresh("ROTATED_BY_US", () =>
    runWithCasGuard(
      // The row's CURRENT refresh_token is NOT the one we presented (R0): a sibling
      // already rotated it to R_CONCURRENT while our network refresh was in flight.
      { expectedRefreshToken: "R0", reread: async () => "R_CONCURRENT" },
      () =>
        getAccessToken(
          "claude",
          { refreshToken: "R0", connectionId: "conn-cas-skip" },
          silentLog,
          null,
          onPersist
        )
    )
  );

  assert.equal(persisted, false, "persist MUST be skipped when the row was rotated concurrently");
  assert.equal(getCasGuardStats().skipped, 1, "the skip must be counted");
  assert.ok(result?.accessToken, "caller still receives the freshly-issued access token");
});

test("#4038 CAS guard PERSISTS when the row is unchanged (no concurrent rotation)", async () => {
  _resetCasGuardStats();
  _clearTokenRotationMap();
  let persisted = false;
  const onPersist = async () => {
    persisted = true;
  };

  await withMockedRefresh("NEW_REFRESH_TOKEN", () =>
    runWithCasGuard(
      // The row still holds R0 — the exact token we presented — so our persist is safe.
      { expectedRefreshToken: "R0", reread: async () => "R0" },
      () =>
        getAccessToken(
          "claude",
          { refreshToken: "R0", connectionId: "conn-cas-pass" },
          silentLog,
          null,
          onPersist
        )
    )
  );

  assert.equal(persisted, true, "persist MUST run when the row still holds the presented token");
  assert.equal(getCasGuardStats().persisted, 1, "the pass must be counted");
});

test("#4038 no CAS guard ⇒ persist always runs (opt-in; zero behavior change)", async () => {
  _resetCasGuardStats();
  _clearTokenRotationMap();
  let persisted = false;
  const onPersist = async () => {
    persisted = true;
  };

  await withMockedRefresh("NEW_REFRESH_TOKEN", () =>
    getAccessToken(
      "claude",
      { refreshToken: "R0", connectionId: "conn-no-guard" },
      silentLog,
      null,
      onPersist
    )
  );

  assert.equal(persisted, true, "without a guard the persist always runs (unchanged behavior)");
  assert.equal(getCasGuardStats().skipped, 0, "no guard ⇒ nothing skipped");
});
