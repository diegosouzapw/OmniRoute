/**
 * TDD — #13470 (background OAuth token refresh bypasses the #6246 dead-pool guard).
 *
 * The interactive chat/executor path fails closed via `safeResolveProxy` +
 * `hasBlockingProxyAssignment` (`src/sse/handlers/chatHelpers.ts`) when a
 * connection's assigned proxy pool has gone fully dead — see
 * `tests/unit/proxy-assigned-unavailable-6246.test.ts`. The background
 * token-refresh path (`src/sse/services/tokenRefresh.ts::resolveProxyForCredentials`)
 * and the health-check sweep (`src/lib/tokenHealthCheck.ts`) instead called
 * `resolveProxyForConnection` directly and silently fell through to
 * direct/env-proxy egress for the SAME connection state — an IP-provenance leak
 * of the same class #6246 closed, on a more sensitive payload (the refresh
 * token). This proves both background paths now fail closed identically to the
 * guarded chat path.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-issue-13470-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
delete process.env.PROXY_FAIL_OPEN;

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const chatHelpers = await import("../../src/sse/handlers/chatHelpers.ts");
const tokenRefresh = await import("../../src/sse/services/tokenRefresh.ts");
const tokenHealthCheckProxyGuard = await import("../../src/lib/tokenHealthCheckProxyGuard.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function makeConnectionWithDeadAssignedPool(): Promise<string> {
  const conn = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: `Conn ${Date.now()} ${Math.random()}`,
    accessToken: "at-test",
    refreshToken: "rt-test",
  });
  const connId = (conn as { id: string }).id;

  const proxy = await proxiesDb.createProxy({
    name: "Dead account proxy pool member",
    type: "http",
    host: "127.0.0.1",
    port: 9470,
  });
  await proxiesDb.updateProxy(proxy!.id, { status: "inactive" });
  await proxiesDb.assignProxyToScope("account", connId, proxy!.id);

  return connId;
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#13470: background token-refresh fails closed for a dead assigned proxy pool, matching the guarded chat path", async () => {
  await resetStorage();
  const connId = await makeConnectionWithDeadAssignedPool();

  assert.equal(proxiesDb.hasBlockingProxyAssignment(connId), true);

  // Guarded chat/executor path already fails closed (#6246 regression) for this
  // exact connection state — establishes the baseline the refresh path must match.
  await assert.rejects(
    () => chatHelpers.safeResolveProxy(connId),
    (err: unknown) => {
      assert.match((err as Error).message, /PROXY_ASSIGNED_UNAVAILABLE/);
      return true;
    }
  );

  // The shared proxy-resolution helper behind every exported refresh function
  // (refreshAccessToken/refreshClaudeOAuthToken/getAccessToken/etc.) must now
  // reject identically instead of silently resolving to direct/env-proxy egress.
  // Testing it directly (rather than through refreshAccessToken, which never
  // throws on a network-level failure and would hit a real OAuth endpoint here)
  // isolates the #13470 guard from network behavior.
  await assert.rejects(
    () => tokenRefresh.resolveProxyForCredentials("claude", { connectionId: connId }),
    (err: unknown) => {
      assert.match((err as Error).message, /PROXY_ASSIGNED_UNAVAILABLE/);
      return true;
    }
  );
});

test("#13470: token-refresh proxy resolution stays direct for a connection with no proxy assignment at all (legitimate direct, not a regression)", async () => {
  await resetStorage();
  const conn = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: `Conn ${Date.now()} ${Math.random()}`,
    accessToken: "at-test",
    refreshToken: "rt-test",
  });
  const connId = (conn as { id: string }).id;

  assert.equal(proxiesDb.hasBlockingProxyAssignment(connId), false);

  // No assignment at all — resolveProxyForCredentials must resolve (fall through
  // to resolveProxyForProvider) rather than reject with the #13470 guard.
  await assert.doesNotReject(() =>
    tokenRefresh.resolveProxyForCredentials("claude", { connectionId: connId })
  );
});

test("#13470: token-health-check sweep skips a connection whose assigned proxy pool is dead instead of refreshing through direct/env-proxy egress", async () => {
  await resetStorage();
  const connId = await makeConnectionWithDeadAssignedPool();

  const { blocked } = await tokenHealthCheckProxyGuard.resolveGuardedProxyConfig(connId, "claude");
  assert.equal(blocked, true, "dead assigned pool must block the health-check refresh cycle");
});

test("#13470: token-health-check sweep is unaffected for a connection with no proxy assignment at all", async () => {
  await resetStorage();
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apiKey",
    name: `Conn ${Date.now()} ${Math.random()}`,
    apiKey: "sk-test",
  });
  const connId = (conn as { id: string }).id;

  const { blocked } = await tokenHealthCheckProxyGuard.resolveGuardedProxyConfig(connId, "openai");
  assert.equal(blocked, false, "no assignment = legitimate direct, must not block");
});
