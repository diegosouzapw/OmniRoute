import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Refusal memory decides by egress address at read time, but only inside an
// egress-bucketed provider scope: a refusal on one entry also sets aside another
// entry sharing its observed address for the same bucketed scope. The write path
// is untouched (entry keys only, written for bucketed scopes alone); model and
// endpoint are reserved and never compared.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-refusal-address-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const rotation = await import("../../src/lib/db/proxies/rotation.ts");
const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const outcome = await import("../../src/sse/handlers/proxyOutcomeMemory.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");

function resetStorage() {
  memory.__resetProxyRefusalMemoryForTesting();
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
  proxyLogger.clearProxyLogs();
  rotation.__resetHotEgressCacheForTesting();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  memory.__resetProxyRefusalMemoryForTesting();
  rotation.__resetHotEgressCacheForTesting();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

let seq = 0;

async function dbTrio(scope = "provider", scopeId: string | null = "opencode") {
  const members: Array<{ type: string; host: string; port: number }> = [];
  for (let i = 0; i < 3; i++) {
    seq++;
    const row = { type: "http", host: `10.11.0.${seq}`, port: 9300 + seq };
    const proxy = await proxiesDb.createProxy({ name: `member ${seq}`, ...row });
    await proxiesDb.addProxyToScopePool(scope, scopeId, proxy.id);
    members.push(row);
  }
  return members as [(typeof members)[number], (typeof members)[number], (typeof members)[number]];
}

function logEgress(row: { type: string; host: string; port: number }, egressIp: string) {
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "opencode",
    targetUrl: "https://api.opencode.ai/chat",
    proxy: { type: "http", host: row.host, port: row.port },
    egressIp,
  });
}

function flush() {
  proxyLogger.flushProxyLogsSync();
}

async function pick(scope = "provider", scopeId: string | null = "opencode") {
  const resolved = await proxiesDb.resolveProxyForScopeFromRegistry(scope, scopeId);
  return (resolved as { proxy: { host: string } }).proxy.host;
}

test("a refusal on one address sets aside another member sharing it for the same provider", async () => {
  const [a, b, c] = await dbTrio();
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.7");
  logEgress(c, "203.0.113.44");
  flush();
  assert.equal(await pick(), a.host);
  // After the refusal, the entry itself is avoided and the member sharing its
  // address is skipped too (not just ranked last): the healthy member serves.
  memory.noteProxyRefusal(memory.proxyEgressKey(a), "ip_quota_429");
  assert.equal(await pick(), c.host);
  assert.equal(await pick(), c.host);
  // Change declared: before, a refusal only skipped its own entry, so the
  // second pick would have served the address-sharing member (b); now it does
  // not.
});

test("a member on another address stays eligible", async () => {
  const [a, b] = await dbTrio();
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.44");
  flush();
  memory.noteProxyRefusal(memory.proxyEgressKey(a), "ip_quota_429");
  assert.equal(await pick(), b.host);
});

test("in-flight refusals read back unchanged and a fully set-aside pool keeps serving", async () => {
  const [a, b, c] = await dbTrio();
  // Legacy entry-level refusals without observed addresses still apply.
  memory.noteProxyRefusal(memory.proxyEgressKey(a), "ip_quota_429");
  assert.equal(await pick(), b.host);
  memory.noteProxyRefusal(memory.proxyEgressKey(b), "ip_quota_429");
  // Both set aside: fail-closed rotation serves the remaining member.
  assert.equal(await pick(), c.host);
});

test("an invalid observed address never sets anyone aside", async () => {
  const [a, b] = await dbTrio();
  logEgress(a, "203.0.113.7");
  logEgress(b, "not-an-ip");
  flush();
  memory.noteProxyRefusal(memory.proxyEgressKey(a), "ip_quota_429");
  assert.equal(await pick(), b.host);
});

test("a held sticky member sharing the refused address advances to the next eligible member", async () => {
  const [a, b, c] = await dbTrio();
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.7");
  logEgress(c, "203.0.113.44");
  flush();
  await proxiesDb.setScopeRotationStrategy("provider", "opencode", "sticky", {
    stickyWindowMinutes: 30,
  });
  const heldHost = await pick();
  const held = [a, b, c].find((m) => m.host === heldHost);
  assert.ok(held, `sticky first pick should hold a member, got ${heldHost}`);
  memory.noteProxyRefusal(memory.proxyEgressKey(held), "ip_quota_429");
  const next = await pick();
  assert.notEqual(next, heldHost);
  assert.equal(next, c.host);
});

test("without a provider the shared address keeps the plain hot-egress order", async () => {
  const [a, b, c] = await dbTrio("global", null);
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.7");
  logEgress(c, "203.0.113.44");
  flush();
  assert.equal(await pick("global", null), a.host);
  // The provider-scoped expansion never applies to multi-provider pools:
  // the shared address still ranks through the plain hot-egress order, so the
  // pool serves the next-ranked member (c) instead of the raw next turn (b).
  memory.noteProxyRefusal(memory.proxyEgressKey(a), "ip_quota_429");
  assert.equal(await pick("global", null), c.host);
});

test("a refusal born on one bucketed scope stays eligible on another scope sharing the entry", async () => {
  // One proxy entry shared by two provider pools (the assignments table allows
  // it), each pool with its own standby: the refusal below is born through the
  // production traffic path for opencode only, and the openai pool must keep
  // serving the shared entry through the legacy path.
  seq++;
  const shared = { type: "http", host: `10.11.0.${seq}`, port: 9300 + seq, name: `shared ${seq}` };
  const sharedProxy = await proxiesDb.createProxy(shared);
  await proxiesDb.addProxyToScopePool("provider", "opencode", sharedProxy.id);
  await proxiesDb.addProxyToScopePool("provider", "openai", sharedProxy.id);
  seq++;
  const spareA = { type: "http", host: `10.11.0.${seq}`, port: 9300 + seq, name: `spare ${seq}` };
  const proxyA = await proxiesDb.createProxy(spareA);
  await proxiesDb.addProxyToScopePool("provider", "opencode", proxyA.id);
  seq++;
  const spareB = { type: "http", host: `10.11.0.${seq}`, port: 9300 + seq, name: `spare ${seq}` };
  const proxyB = await proxiesDb.createProxy(spareB);
  await proxiesDb.addProxyToScopePool("provider", "openai", proxyB.id);
  logEgress(shared, "203.0.113.7");
  logEgress(spareA, "203.0.113.44");
  logEgress(spareB, "203.0.113.99");
  flush();
  outcome.noteProxyOutcome("opencode", {
    proxy: { type: "http", host: shared.host, port: shared.port },
    upstreamStatus: 429,
  });
  // The opencode pool skips the refused shared entry and serves its standby;
  // the openai pool is outside the gate and keeps the legacy entry-level read.
  assert.equal(await pick("provider", "openai"), spareB.host);
  assert.equal(await pick("provider", "opencode"), spareA.host);
});
