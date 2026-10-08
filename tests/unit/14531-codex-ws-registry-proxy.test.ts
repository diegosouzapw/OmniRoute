/**
 * #14531 — the Codex Responses WebSocket prepare route must resolve the proxy
 * through the same full cascade the HTTP path uses (per-key, account,
 * provider, combo, global — Proxy Registry and legacy store), not just the
 * legacy key_value proxyConfig store.
 *
 * Root cause: resolveCodexProxy() called networkProxy.resolveProxy(provider),
 * which only reads the legacy key_value store (plus HTTPS_PROXY env). A proxy
 * assigned in the Proxy Registry (proxy_assignments — what the dashboard's
 * provider/account/global "Set Proxy" modals write) never reached the prepare
 * response, so the bridge's upstream wreq-js connect went out direct and the
 * no-direct-egress deployment failed with a 403 on the WS upgrade.
 *
 * Red on base: registry assignments at any level yield proxy === undefined.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ws-registry-proxy-"));
process.env.DATA_DIR = dataDir;
process.env.APP_LOG_TO_FILE = "false";
process.env.OMNIROUTE_WS_BRIDGE_SECRET = "test-14531-bridge";
// Keep the env-var fallback out of the way so assertions see only stored config.
delete process.env.HTTPS_PROXY;
delete process.env.HTTP_PROXY;
delete process.env.ALL_PROXY;

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const { POST } = await import("../../src/app/api/internal/codex-responses-ws/route.ts");

let connectionId = "";

test.before(async () => {
  const conn = await createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "WS registry proxy fixture",
    accessToken: "test-oauth-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { codexFingerprintMode: "off" },
  });
  connectionId = (conn as { id?: string }).id ?? "";
  assert.ok(connectionId, "fixture connection created");
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function prepareProxyField(): Promise<string | undefined> {
  const result = await POST(
    new Request("http://omniroute.local/api/internal/codex-responses-ws", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-omniroute-ws-bridge-secret": "test-14531-bridge",
      },
      body: JSON.stringify({
        action: "prepare",
        requestUrl: "http://omniroute.local/v1/responses",
        headers: {},
        response: { model: "codex/gpt-5.5", input: "hello" },
      }),
    })
  );
  const body = await result.json();
  assert.equal(result.status, 200, JSON.stringify(body));
  // Release the per-account WS lease so the next prepare() is not starved.
  await POST(
    new Request("http://omniroute.local/api/internal/codex-responses-ws", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-omniroute-ws-bridge-secret": "test-14531-bridge",
      },
      body: JSON.stringify({ action: "release", leaseId: body.leaseId }),
    })
  );
  return body.proxy;
}

async function makeRegistryProxy(name: string, host: string) {
  const created = await proxiesDb.createProxy({
    name,
    type: "http",
    host,
    port: 10809,
    username: "",
    password: "",
    source: "dashboard-custom",
  });
  return (created as { id: string }).id;
}

test("a Proxy Registry assignment at the provider scope reaches the WS prepare response", async () => {
  const proxyId = await makeRegistryProxy("Provider registry proxy", "provider-proxy.local");
  await proxiesDb.assignProxyToScope("provider", "codex", proxyId);
  try {
    const proxy = await prepareProxyField();
    assert.ok(proxy, "prepare must return a proxy URL for a provider-scope registry assignment");
    assert.match(proxy!, /^http:\/\/provider-proxy\.local:10809/);
  } finally {
    await proxiesDb.assignProxyToScope("provider", "codex", null);
  }
});

test("a Proxy Registry assignment at the account (connection) scope reaches the WS prepare response", async () => {
  const proxyId = await makeRegistryProxy("Account registry proxy", "account-proxy.local");
  await proxiesDb.assignProxyToScope("account", connectionId, proxyId);
  try {
    const proxy = await prepareProxyField();
    assert.ok(proxy, "prepare must return a proxy URL for an account-scope registry assignment");
    assert.match(proxy!, /^http:\/\/account-proxy\.local:10809/);
  } finally {
    await proxiesDb.assignProxyToScope("account", connectionId, null);
  }
});

test("a Proxy Registry assignment at the global scope reaches the WS prepare response", async () => {
  const proxyId = await makeRegistryProxy("Global registry proxy", "global-proxy.local");
  await proxiesDb.assignProxyToScope("global", null, proxyId);
  try {
    const proxy = await prepareProxyField();
    assert.ok(proxy, "prepare must return a proxy URL for a global-scope registry assignment");
    assert.match(proxy!, /^http:\/\/global-proxy\.local:10809/);
  } finally {
    await proxiesDb.assignProxyToScope("global", null, null);
  }
});

test("control: a legacy key_value provider proxy still reaches the WS prepare response", async () => {
  const { setProxyForLevel } = await import("../../src/lib/db/settings.ts");
  const { invalidateProxyCache } = await import("../../open-sse/utils/networkProxy.ts");
  await setProxyForLevel("provider", "codex", "http://legacy-proxy.local:8888");
  invalidateProxyCache();
  try {
    const proxy = await prepareProxyField();
    assert.ok(proxy, "prepare must keep honoring the legacy proxyConfig store");
    assert.match(proxy!, /^http:\/\/legacy-proxy\.local:8888/);
  } finally {
    await setProxyForLevel("provider", "codex", null);
    invalidateProxyCache();
  }
});

test("control: with nothing configured the prepare response carries no proxy", async () => {
  const proxy = await prepareProxyField();
  assert.equal(proxy, undefined);
});
