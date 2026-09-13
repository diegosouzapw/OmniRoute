/**
 * TDD — #6365 native proxy-pool round-robin / egress IP rotation.
 *
 * A scope (global/provider/account/combo) may now have MULTIPLE proxies attached
 * as a POOL. A per-scope rotation strategy chooses which pool member serves each
 * request so egress IP cycles:
 *   - `round-robin` (default when a pool has > 1) — monotonic persisted cursor.
 *   - `random`      — uniform pick from the alive set.
 *
 * Invariants preserved:
 *   - Only ALIVE proxies (PROXY_ALIVE_PREDICATE) are ever handed out; dead members
 *     are skipped.
 *   - An empty / all-dead pool resolves to null AND still trips the #6246
 *     fail-closed guard (`hasBlockingProxyAssignment`) — never a silent direct egress.
 *   - A plain single `assignProxyToScope` still yields a working scope (a 1-element
 *     pool), unchanged from before.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-pool-6365-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

let proxySeq = 0;
async function makeProxy(status?: string) {
  proxySeq++;
  const proxy = await proxiesDb.createProxy({
    name: `Pool proxy ${proxySeq}`,
    type: "http",
    host: `10.0.0.${proxySeq}`,
    port: 9000 + proxySeq,
    status: status || "active",
  });
  return proxy!;
}

async function makeConnection(): Promise<string> {
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apiKey",
    name: `Conn ${Date.now()} ${Math.random()}`,
    apiKey: "sk-test",
  });
  return (conn as { id: string }).id;
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("round-robin (default for >1) cycles through the whole pool across calls", async () => {
  await resetStorage();
  const a = await makeProxy();
  const b = await makeProxy();
  const c = await makeProxy();
  await proxiesDb.addProxyToScopePool("provider", "openai", a.id);
  await proxiesDb.addProxyToScopePool("provider", "openai", b.id);
  await proxiesDb.addProxyToScopePool("provider", "openai", c.id);

  const seen: string[] = [];
  for (let i = 0; i < 6; i++) {
    const r = await proxiesDb.resolveProxyForScopeFromRegistry("provider", "openai");
    seen.push((r as { proxy: { host: string } }).proxy.host);
  }

  // Deterministic monotonic cursor → strict A,B,C,A,B,C cycle (position order).
  assert.deepEqual(seen, [a.host, b.host, c.host, a.host, b.host, c.host]);
});

test("dead pool members are skipped; only alive proxies are handed out", async () => {
  await resetStorage();
  const alive1 = await makeProxy("active");
  const dead = await makeProxy("inactive");
  const alive2 = await makeProxy("active");
  await proxiesDb.addProxyToScopePool("provider", "anthropic", alive1.id);
  await proxiesDb.addProxyToScopePool("provider", "anthropic", dead.id);
  await proxiesDb.addProxyToScopePool("provider", "anthropic", alive2.id);

  const seen = new Set<string>();
  for (let i = 0; i < 10; i++) {
    const r = await proxiesDb.resolveProxyForScopeFromRegistry("provider", "anthropic");
    seen.add((r as { proxy: { host: string } }).proxy.host);
  }

  assert.ok(!seen.has(dead.host), "dead proxy must never be resolved");
  assert.deepEqual([...seen].sort(), [alive1.host, alive2.host].sort());
});

test("empty pool → resolves to null (no direct fall-through)", async () => {
  await resetStorage();
  const r = await proxiesDb.resolveProxyForScopeFromRegistry("provider", "empty-scope");
  assert.equal(r, null);
});

test("all-dead pool on a connection → fail-closed (#6246), never direct egress", async () => {
  await resetStorage();
  const connId = await makeConnection();
  const d1 = await makeProxy("inactive");
  const d2 = await makeProxy("error");
  await proxiesDb.addProxyToScopePool("account", connId, d1.id);
  await proxiesDb.addProxyToScopePool("account", connId, d2.id);

  const resolved = await proxiesDb.resolveProxyForConnectionFromRegistry(connId);
  assert.equal(resolved, null, "an all-dead pool must not resolve to a live proxy");
  assert.equal(
    proxiesDb.hasBlockingProxyAssignment(connId),
    true,
    "an all-dead assigned pool must block, not leak the real IP via direct egress"
  );
});

test("backward-compat: a single assignProxyToScope still resolves that one proxy", async () => {
  await resetStorage();
  const only = await makeProxy();
  await proxiesDb.assignProxyToScope("provider", "gemini", only.id);

  const pool = await proxiesDb.getScopeProxyPool("provider", "gemini");
  assert.equal(pool.length, 1, "single assign yields a 1-element pool");

  const r = await proxiesDb.resolveProxyForScopeFromRegistry("provider", "gemini");
  assert.equal((r as { proxy: { host: string } }).proxy.host, only.host);
});

test("assignProxyToScope replaces the pool (single-assignment semantics preserved)", async () => {
  await resetStorage();
  const first = await makeProxy();
  const second = await makeProxy();
  await proxiesDb.addProxyToScopePool("provider", "grok", first.id);
  await proxiesDb.addProxyToScopePool("provider", "grok", second.id);
  assert.equal((await proxiesDb.getScopeProxyPool("provider", "grok")).length, 2);

  const replacement = await makeProxy();
  await proxiesDb.assignProxyToScope("provider", "grok", replacement.id);

  const pool = await proxiesDb.getScopeProxyPool("provider", "grok");
  assert.equal(pool.length, 1);
  const r = await proxiesDb.resolveProxyForScopeFromRegistry("provider", "grok");
  assert.equal((r as { proxy: { host: string } }).proxy.host, replacement.host);
});

test("random strategy always returns a member of the alive set", async () => {
  await resetStorage();
  const a = await makeProxy();
  const b = await makeProxy();
  const c = await makeProxy();
  const dead = await makeProxy("inactive");
  await proxiesDb.addProxyToScopePool("provider", "mistral", a.id);
  await proxiesDb.addProxyToScopePool("provider", "mistral", b.id);
  await proxiesDb.addProxyToScopePool("provider", "mistral", c.id);
  await proxiesDb.addProxyToScopePool("provider", "mistral", dead.id);
  await proxiesDb.setScopeRotationStrategy("provider", "mistral", "random");

  const aliveHosts = new Set([a.host, b.host, c.host]);
  const seen = new Set<string>();
  for (let i = 0; i < 30; i++) {
    const r = await proxiesDb.resolveProxyForScopeFromRegistry("provider", "mistral");
    const host = (r as { proxy: { host: string } }).proxy.host;
    assert.ok(aliveHosts.has(host), `random pick ${host} must be an alive pool member`);
    seen.add(host);
  }
  // The random strategy uses crypto.randomInt (not Math.random — CodeQL js/insecure-randomness).
  // Over 30 picks from a 3-member alive pool it must vary, not stick on one member
  // (P(all 30 identical) ≈ (1/3)^29 ≈ 0). Guards that randomInt selection is uniform-ish.
  assert.ok(seen.size >= 2, `random strategy must vary its pick (saw only: ${[...seen].join(", ")})`);
});

test("setScopeRotationStrategy round-trips via getScopeRotationStrategy", async () => {
  await resetStorage();
  assert.equal(
    await proxiesDb.getScopeRotationStrategy("provider", "cohere"),
    "round-robin",
    "default strategy is round-robin"
  );
  await proxiesDb.setScopeRotationStrategy("provider", "cohere", "random");
  assert.equal(await proxiesDb.getScopeRotationStrategy("provider", "cohere"), "random");
});
