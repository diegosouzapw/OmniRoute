import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveAccountProxies } from "../../src/sse/services/noAuthProxyResolution.ts";

test("resolveAccountProxies preserves relayAuth for relay-type (vercel/deno/cloudflare) pool proxies", async () => {
  const fakeVercelProxyRow = {
    id: "proxy-1",
    type: "vercel",
    host: "my-relay-abc123.vercel.app",
    port: 443,
    username: null,
    password: null,
    notes: JSON.stringify({ relayAuth: "deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef" }),
  };

  const resolved = await resolveAccountProxies(
    [{ fingerprint: "acct-1", proxyId: "proxy-1" }],
    async (id) => (id === "proxy-1" ? fakeVercelProxyRow : null)
  );

  const proxy = resolved[0].proxy as unknown as { type?: string; relayAuth?: string };
  assert.equal(proxy?.type, "vercel");
  assert.equal(
    proxy?.relayAuth,
    "deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
    "relayAuth must survive resolveAccountProxies() for relay-type (vercel/deno/cloudflare) proxies"
  );
});

test("resolveAccountProxies leaves relayAuth absent for plain non-relay (socks5/http) pool proxies", async () => {
  const fakeSocksProxyRow = {
    id: "proxy-2",
    type: "socks5",
    host: "1.2.3.4",
    port: 1080,
    username: "u",
    password: "p",
    notes: JSON.stringify({ relayAuth: "should-not-leak-onto-non-relay-types" }),
  };

  const resolved = await resolveAccountProxies(
    [{ fingerprint: "acct-2", proxyId: "proxy-2" }],
    async (id) => (id === "proxy-2" ? fakeSocksProxyRow : null)
  );

  const proxy = resolved[0].proxy as unknown as { type?: string; relayAuth?: string };
  assert.equal(proxy?.type, "socks5");
  assert.equal(proxy?.relayAuth, undefined);
});
