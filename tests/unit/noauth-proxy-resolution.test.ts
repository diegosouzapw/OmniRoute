import { test } from "node:test";
import assert from "node:assert/strict";
import {
  resolveAccountProxies,
  type ProxyByIdLookup,
} from "../../src/sse/services/noAuthProxyResolution.ts";

// #5217 (Gap 1): per-account Proxy Pool reference resolution.
// The OpenCode Free per-account proxy modal now stores a proxy REFERENCE (proxyId)
// instead of forcing manual host/port re-entry. The server resolves that id to the
// live pool record so the executor still receives an inline {type,host,port,...}.

const POOL: Record<string, { type: string; host: string; port: number; username?: string; password?: string }> = {
  "pool-1": { type: "http", host: "1.2.3.4", port: 8080, username: "u", password: "p" },
  "pool-2": { type: "socks5", host: "9.9.9.9", port: 1080 },
};

const lookup: ProxyByIdLookup = async (id) => POOL[id] ?? null;

test("by-id reference resolves to the pool record (type/host/port/credentials)", async () => {
  const out = await resolveAccountProxies([{ fingerprint: "acc-a", proxyId: "pool-1" }], lookup);
  assert.equal(out.length, 1);
  assert.equal(out[0].fingerprint, "acc-a");
  assert.deepEqual(out[0].proxy, {
    type: "http",
    host: "1.2.3.4",
    port: 8080,
    username: "u",
    password: "p",
  });
});

test("by-id reference without credentials omits username/password", async () => {
  const out = await resolveAccountProxies([{ fingerprint: "acc-b", proxyId: "pool-2" }], lookup);
  assert.deepEqual(out[0].proxy, { type: "socks5", host: "9.9.9.9", port: 1080 });
});

test("inline custom proxy passes through unchanged (escape hatch / legacy)", async () => {
  const inline = { type: "https", host: "5.6.7.8", port: 3128, username: "x", password: "y" };
  const out = await resolveAccountProxies([{ fingerprint: "acc-c", proxy: inline }], lookup);
  assert.deepEqual(out[0].proxy, inline);
});

test("unknown / deleted proxyId degrades safely to direct (null), no crash", async () => {
  const out = await resolveAccountProxies([{ fingerprint: "acc-d", proxyId: "gone" }], lookup);
  assert.equal(out.length, 1);
  assert.equal(out[0].proxy, null);
});

test("a throwing lookup degrades to direct (null) rather than rejecting", async () => {
  const throwing: ProxyByIdLookup = async () => {
    throw new Error("db down");
  };
  const out = await resolveAccountProxies([{ fingerprint: "acc-e", proxyId: "pool-1" }], throwing);
  assert.equal(out[0].proxy, null);
});

test("proxyId takes precedence over an inline proxy on the same entry", async () => {
  const out = await resolveAccountProxies(
    [{ fingerprint: "acc-f", proxyId: "pool-2", proxy: { type: "http", host: "0.0.0.0", port: 1 } }],
    lookup
  );
  assert.equal(out[0].proxy?.host, "9.9.9.9");
});

test("entry with neither proxyId nor proxy.host yields direct (null)", async () => {
  const out = await resolveAccountProxies(
    [{ fingerprint: "acc-g" }, { fingerprint: "acc-h", proxy: null }],
    lookup
  );
  assert.equal(out[0].proxy, null);
  assert.equal(out[1].proxy, null);
});

test("non-array / malformed input is ignored without throwing", async () => {
  assert.deepEqual(await resolveAccountProxies(undefined, lookup), []);
  assert.deepEqual(await resolveAccountProxies(null, lookup), []);
  const out = await resolveAccountProxies(
    [null, 42, "x", { proxyId: "pool-1" }, { fingerprint: "ok", proxyId: "pool-2" }],
    lookup
  );
  // Only the well-formed entry (with a string fingerprint) survives.
  assert.equal(out.length, 1);
  assert.equal(out[0].fingerprint, "ok");
});

test("inline proxy missing host is treated as direct (null)", async () => {
  const out = await resolveAccountProxies(
    [{ fingerprint: "acc-i", proxy: { type: "http", port: 8080 } as never }],
    lookup
  );
  assert.equal(out[0].proxy, null);
});
