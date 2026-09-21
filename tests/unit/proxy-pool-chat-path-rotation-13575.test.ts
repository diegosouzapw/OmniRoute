/**
 * Regression test for issue #13575.
 *
 * The chat path (`resolveProxyForConnection`) must rotate across a multi-member
 * pool the same way the registry-level resolver does (`resolveProxyForScopeFromRegistry`),
 * instead of freezing on the first pick for the life of the per-connection cache.
 * Providers with a stable-egress requirement (egress-bucketed quota, IP-pinned web
 * session credentials) must stay pinned to a single member.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-13575-rotation-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");

let proxySeq = 0;
async function makeProxy() {
  proxySeq++;
  const proxy = await proxiesDb.createProxy({
    name: `Pool proxy ${proxySeq}`,
    type: "http",
    host: `10.9.1.${proxySeq}`,
    port: 9100 + proxySeq,
    status: "active",
  });
  return proxy!;
}

async function makeConnection(provider = "openai"): Promise<string> {
  const conn = await providersDb.createProviderConnection({
    provider,
    authType: "apiKey",
    name: `Conn ${Date.now()} ${Math.random()}`,
    apiKey: "sk-test",
  });
  return (conn as { id: string }).id;
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#13575: resolveProxyForConnection rotates round-robin across a multi-member pool", async () => {
  const a = await makeProxy();
  const b = await makeProxy();
  const c = await makeProxy();
  const connId = await makeConnection("openai");
  await proxiesDb.addProxyToScopePool("account", connId, a.id);
  await proxiesDb.addProxyToScopePool("account", connId, b.id);
  await proxiesDb.addProxyToScopePool("account", connId, c.id);

  const chatPathHosts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const r = (await settingsDb.resolveProxyForConnection(connId)) as {
      proxy?: { host?: string } | null;
    };
    chatPathHosts.push(r.proxy?.host ?? "null");
  }

  const distinctChatHosts = new Set(chatPathHosts);
  assert.ok(
    distinctChatHosts.size > 1,
    `expected resolveProxyForConnection to rotate across the pool, but got: ${JSON.stringify(chatPathHosts)}`
  );
  assert.deepEqual(distinctChatHosts, new Set([a.host, b.host, c.host]));
});

test("#13575: egress-bucketed-quota providers (opencode) stay pinned on the chat path", async () => {
  const a = await makeProxy();
  const b = await makeProxy();
  const connId = await makeConnection("opencode");
  await proxiesDb.addProxyToScopePool("account", connId, a.id);
  await proxiesDb.addProxyToScopePool("account", connId, b.id);

  const hosts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const r = (await settingsDb.resolveProxyForConnection(connId)) as {
      proxy?: { host?: string } | null;
    };
    hosts.push(r.proxy?.host ?? "null");
  }

  assert.deepEqual(
    new Set(hosts),
    new Set([hosts[0]]),
    `expected an egress-bucketed-quota connection to stay pinned to one member, got: ${JSON.stringify(hosts)}`
  );
});

test("#13575: IP-pinned web-session providers (grok-web) stay pinned on the chat path", async () => {
  const a = await makeProxy();
  const b = await makeProxy();
  const connId = await makeConnection("grok-web");
  await proxiesDb.addProxyToScopePool("account", connId, a.id);
  await proxiesDb.addProxyToScopePool("account", connId, b.id);

  const hosts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const r = (await settingsDb.resolveProxyForConnection(connId)) as {
      proxy?: { host?: string } | null;
    };
    hosts.push(r.proxy?.host ?? "null");
  }

  assert.deepEqual(
    new Set(hosts),
    new Set([hosts[0]]),
    `expected an IP-pinned web-session connection to stay pinned to one member, got: ${JSON.stringify(hosts)}`
  );
});
