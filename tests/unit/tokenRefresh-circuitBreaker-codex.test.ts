import test from "node:test";
import assert from "node:assert/strict";

// A dead Codex refresh token must not trip the provider circuit breaker:
// the unrecoverable signal from the refresh endpoint must reach
// refreshWithRetry so it returns early without counting a retryable failure.

const { isProviderBlocked, getCircuitBreakerStatus, refreshWithRetry } =
  await import("../../open-sse/services/tokenRefresh/circuitBreaker.ts");
const { isUnrecoverableRefreshError } =
  await import("../../open-sse/services/tokenRefresh/shared.ts");

const silentLog = {
  info() {},
  warn() {},
  error() {},
  debug() {},
};

function randomProvider() {
  return "codex-dead-token-" + Math.random().toString(36).slice(2);
}

function stubFetchOnce(status: number, body: unknown) {
  const previous = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    })) as typeof fetch;
  return () => {
    globalThis.fetch = previous;
  };
}

test("dead refresh token is classified unrecoverable and never trips the breaker", async (t) => {
  const provider = randomProvider();
  const restore = stubFetchOnce(400, {
    error: { code: "refresh_token_reused", message: "Token already consumed" },
  });
  t.after(restore);
  const { CodexExecutor } = await import("../../open-sse/executors/codex.ts");
  const executor = new CodexExecutor();
  const deadCredentials = {
    refreshToken: "dead-refresh-token",
    accessToken: "stale-access-token",
  };

  let attempts = 0;
  const result = await refreshWithRetry(
    async () => {
      attempts++;
      return executor.refreshCredentials(deadCredentials, silentLog);
    },
    3,
    silentLog,
    provider
  );

  assert.equal(attempts, 1, "unrecoverable refresh must not be retried");
  assert.ok(
    isUnrecoverableRefreshError(result),
    "dead token result must stay classifiable as unrecoverable"
  );
  assert.equal(
    getCircuitBreakerStatus()[provider],
    undefined,
    "no failure recorded for an unrecoverable refresh"
  );
  assert.equal(isProviderBlocked(provider), false);

  // Repeat to the trip threshold: even 5 dead-token refreshes must not arm the breaker.
  for (let i = 0; i < 4; i++) {
    await refreshWithRetry(
      async () => executor.refreshCredentials(deadCredentials, silentLog),
      3,
      silentLog,
      provider
    );
  }
  assert.equal(isProviderBlocked(provider), false, "breaker stays open for healthy connections");
});

test("retryable refresh failures still count toward the breaker", async (t) => {
  const provider = randomProvider();
  const restore = stubFetchOnce(500, { error: "server_error" });
  t.after(restore);
  const { CodexExecutor } = await import("../../open-sse/executors/codex.ts");
  const executor = new CodexExecutor();
  const credentials = {
    refreshToken: "transiently-failing-token",
    accessToken: "stale-access-token",
  };

  const result = await refreshWithRetry(
    async () => executor.refreshCredentials(credentials, silentLog),
    1,
    silentLog,
    provider
  );
  assert.equal(result, null);
  assert.equal(getCircuitBreakerStatus()[provider].failures, 1);
});

test("healthy refresh returns fresh tokens without touching the breaker", async (t) => {
  const provider = randomProvider();
  const restore = stubFetchOnce(200, {
    access_token: "fresh-access-token",
    refresh_token: "fresh-refresh-token",
    expires_in: 3600,
  });
  t.after(restore);
  const { CodexExecutor } = await import("../../open-sse/executors/codex.ts");
  const executor = new CodexExecutor();

  const result = await refreshWithRetry(
    async () =>
      executor.refreshCredentials(
        { refreshToken: "live-refresh-token", accessToken: "stale-access-token" },
        silentLog
      ),
    3,
    silentLog,
    provider
  );
  assert.equal(result.accessToken, "fresh-access-token");
  assert.equal(getCircuitBreakerStatus()[provider], undefined);
});
