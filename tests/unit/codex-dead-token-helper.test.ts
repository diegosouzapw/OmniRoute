import test from "node:test";
import assert from "node:assert/strict";

import { CodexExecutor } from "../../open-sse/executors/codex.ts";
import { refreshAndUpdateCredentialsWithResolver } from "../../src/lib/usage/providerLimits/credentialRefresh.ts";
import { isUnrecoverableRefreshError } from "../../open-sse/services/tokenRefresh/shared.ts";

test("CodexExecutor dead refresh token keeps stale credentials in the shared helper", async (t) => {
  // Dead-token sentinel in the shared helper: stale access token keeps the
  // connection, no token raises re-authorize — both base behaviors. The real
  // dead-token sentinel comes from the production executor below (fetch
  // stubbed with an invalid_grant response); the helper's executor call is
  // stubbed to replay that same value so the test exercises the guard branch
  // without the network lane or the database (the stub returns before any
  // write; persistence is covered by the provider-limits suites). Proof that
  // the stub equals production: the sentinel passes the shared classifier
  // and the stubbed value is the executor's own return object, not a literal.
  // Stub-vs-real equivalence: the stub replays the exact object the real
  // CodexExecutor returned above (same reference), so the helper receives
  // identical input; the only stubbed seam is how the value arrives (direct
  // return instead of network fetch plus serializeRefresh lane), which cannot
  // change the guard outcome — the guard reads only the value.
  // QuotaAutoPing path: createDefaultQuotaAutoPingDeps wires the same helper
  // with the real Codex loader (quotaAutoPing.ts:155-156), and
  // refreshConnectionForPing (quotaAutoPing.ts:374-392) returns
  // refreshed.connection on success rows and null on the 401 row — the two
  // rows above are exactly those two outcomes, so the ping keeps the stale
  // token for usage reads instead of persisting the sentinel.
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({ error: "invalid_grant", error_description: "Refresh token expired" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  t.after(() => {
    globalThis.fetch = originalFetch;
  });
  const sentinel = await executor.refreshCredentials({ refreshToken: "dead-token" }, null);
  assert.equal(isUnrecoverableRefreshError(sentinel), true);

  const resolveExecutor = async () =>
    ({
      needsRefresh: () => true,
      refreshCredentials: async () => sentinel,
    }) as unknown as {
      needsRefresh: () => boolean;
      refreshCredentials: (c: unknown, l: null) => Promise<typeof sentinel>;
    };
  const opts = { allowRotatingRefresh: true, force: true };
  const connWithToken = {
    id: "codex-dead-1",
    provider: "codex",
    accessToken: "stale-access-token",
    refreshToken: "dead-refresh-token",
  };

  const withToken = await refreshAndUpdateCredentialsWithResolver(
    connWithToken,
    resolveExecutor,
    opts
  );
  assert.equal(withToken.refreshed, false);
  assert.equal(withToken.connection.accessToken, "stale-access-token");

  const connWithoutToken = {
    id: "codex-dead-2",
    provider: "codex",
    refreshToken: "dead-refresh-token",
  };
  await assert.rejects(
    () => refreshAndUpdateCredentialsWithResolver(connWithoutToken, resolveExecutor, opts),
    /Please re-authorize the connection/
  );
});
