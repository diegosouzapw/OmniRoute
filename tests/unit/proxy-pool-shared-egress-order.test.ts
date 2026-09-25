import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Shared-egress pool ordering (opt-in via PROXY_POOL_SHARED_EGRESS_ORDER,
// default off; also needs PROXY_SKIP_RECENTLY_FAILED for the refusal signal):
// a pool member whose recently observed egress address matches a refused
// member's address ranks just below healthy members for providers whose quota
// is bucketed by egress address — without ever excluding anyone. A member with
// two distinct observed addresses in the 30 min window is opaque and never
// ranked. With either flag off (the default) or a provider outside that list
// the order stays exactly the plain rotation.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-shared-egress-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const rotation = await import("../../src/lib/db/proxies/rotation.ts");
const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const { noteProxyOutcome } = await import("../../src/sse/handlers/proxyOutcomeMemory.ts");

function resetStorage() {
  memory.__resetProxyRefusalMemoryForTesting();
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
  process.env.PROXY_POOL_SHARED_EGRESS_ORDER = "true";
  proxyLogger.clearProxyLogs();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  delete process.env.PROXY_POOL_SHARED_EGRESS_ORDER;
  memory.__resetProxyRefusalMemoryForTesting();
  if (typeof rotation.__resetHotEgressCacheForTesting === "function") {
    rotation.__resetHotEgressCacheForTesting();
  }
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Member = { type: string; host: string; port: number };
let seq = 0;

function member(): Member {
  seq++;
  return { type: "http", host: `10.9.0.${seq}`, port: 9200 + seq };
}

function keyOf(m: Member) {
  return memory.proxyEgressKey(m);
}

function refuse(m: Member) {
  memory.noteProxyRefusal(keyOf(m), "ip_quota_429");
}

function logEgress(m: Member, egressIp: string | null) {
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "opencode",
    targetUrl: "https://api.opencode.ai/chat",
    proxy: { type: "http", host: m.host, port: m.port },
    egressIp,
  });
}

function logEgressOld(m: Member, egressIp: string | null, ageMs: number) {
  // Backdate by writing directly: the logger stamps Date.now(), so shift the
  // row afterwards. Bounded helper for the window test only.
  logEgress(m, egressIp);
  flush();
  const db = core.getDbInstance();
  const old = new Date(Date.now() - ageMs).toISOString();
  db.prepare(
    `UPDATE proxy_logs SET timestamp = ? WHERE proxy_host = ? AND proxy_port = ? AND egress_ip = ?`
  ).run(old, m.host, m.port, egressIp);
}

function flush() {
  proxyLogger.flushProxyLogsSync();
}

function hotFor(members: Member[], provider: string | null = "opencode") {
  return rotation.buildHotEgressPredicate(provider, members);
}

async function dbPool(size: number): Promise<Member[]> {
  const members: Member[] = [];
  for (let i = 0; i < size; i++) {
    const m = member();
    const proxy = await proxiesDb.createProxy({ name: `member ${seq}`, ...m });
    await proxiesDb.addProxyToScopePool("provider", "opencode", proxy.id);
    members.push(m);
  }
  return members;
}

async function pick() {
  const resolved = await proxiesDb.resolveProxyForScopeFromRegistry("provider", "opencode");
  return (resolved as { proxy: { host: string } }).proxy.host;
}

test("a member sharing the refused egress address is demoted below healthy members", () => {
  const a = member();
  const b = member();
  const c = member();
  refuse(a);
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.7");
  logEgress(c, "203.0.113.44");
  flush();
  const ranked = rotation.rankPoolCandidates([a, b, c], { sharesHotEgress: hotFor([a, b, c]) });
  assert.deepEqual(
    ranked.map((m) => m.host),
    [c.host, b.host, a.host]
  );
});

test("same address on two members: the healthy one serves first, nobody is removed", () => {
  const a = member();
  const b = member();
  refuse(a);
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.7");
  flush();
  const ranked = rotation.rankPoolCandidates([a, b], { sharesHotEgress: hotFor([a, b]) });
  assert.equal(ranked.length, 2);
  assert.deepEqual(
    ranked.map((m) => m.host),
    [b.host, a.host]
  );
});

test("a provider outside the per-address-quota list is untouched", () => {
  const a = member();
  const b = member();
  refuse(a);
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.7");
  flush();
  const pred = rotation.buildHotEgressPredicate("openai", [a, b]);
  assert.equal(pred(a), false);
  assert.equal(pred(b), false);
  const ranked = rotation.rankPoolCandidates([a, b], { sharesHotEgress: pred });
  assert.deepEqual(
    ranked.map((m) => m.host),
    [b.host, a.host]
  );
});

test("a missing observation keeps the current order", () => {
  const a = member();
  const b = member();
  const c = member();
  refuse(a);
  const pred = hotFor([a, b, c]);
  assert.equal(pred(b), false);
  const ranked = rotation.rankPoolCandidates([a, b, c], { sharesHotEgress: pred });
  assert.deepEqual(
    ranked.map((m) => m.host),
    [b.host, c.host, a.host]
  );
});

test("a fully shared pool keeps its order and size", () => {
  const a = member();
  const b = member();
  refuse(a);
  refuse(b);
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.7");
  flush();
  const ranked = rotation.rankPoolCandidates([a, b], { sharesHotEgress: hotFor([a, b]) });
  assert.equal(ranked.length, 2);
  assert.deepEqual(
    ranked.map((m) => m.host),
    [a.host, b.host]
  );
});

test("an IPv6 member sharing the refused /64 is demoted, another /64 is not", () => {
  const a = member();
  const b = member();
  const c = member();
  refuse(a);
  logEgress(a, "2001:db8:1::1");
  logEgress(b, "2001:db8:1::2");
  logEgress(c, "2001:db8:2::1");
  flush();
  const ranked = rotation.rankPoolCandidates([a, b, c], { sharesHotEgress: hotFor([a, b, c]) });
  assert.deepEqual(
    ranked.map((m) => m.host),
    [c.host, b.host, a.host]
  );
});

test("normalizeEgressAddressForRanking: v4 whole, v6 /64, mapped, invalid", () => {
  const normalize = rotation.normalizeEgressAddressForRanking;
  assert.equal(normalize("203.0.113.7"), "203.0.113.7");
  assert.equal(normalize("2001:DB8:1::1"), "v6:2001:db8:1:0");
  assert.equal(normalize("2001:db8:1:0:0:0:0:2"), "v6:2001:db8:1:0");
  assert.equal(normalize("::ffff:203.0.113.7"), "203.0.113.7");
  assert.equal(normalize("fe80::1%eth0"), null);
  assert.equal(normalize("not-an-ip"), null);
  assert.equal(normalize(null), null);
  assert.equal(normalize(""), null);
});

test("functional: the second request avoids the refused egress address", async () => {
  const [a, b] = await dbPool(2);
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.7");
  flush();
  assert.equal(await pick(), a.host);
  noteProxyOutcome("opencode", {
    proxy: { type: "http", host: a.host, port: a.port },
    upstreamStatus: 429,
  });
  assert.equal(await pick(), b.host);
});

test("functional: with the flag off the pool serves the head even when egress is shared", async () => {
  const [a, b] = await dbPool(2);
  refuse(a);
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.7");
  flush();
  process.env.PROXY_SKIP_RECENTLY_FAILED = "false";
  delete process.env.PROXY_POOL_SHARED_EGRESS_ORDER;
  try {
    assert.equal(await pick(), a.host);
  } finally {
    process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
    process.env.PROXY_POOL_SHARED_EGRESS_ORDER = "true";
  }
});

test("a member with two distinct egress addresses in the window is opaque: not demoted", () => {
  const a = member();
  const b = member();
  refuse(a);
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.7");
  logEgress(b, "203.0.113.99");
  flush();
  const pred = hotFor([a, b]);
  // b is opaque (two addresses): not demoted. a is refused (avoided), so it
  // still ranks last by the refusal signal; b serves first.
  assert.equal(pred(b), false);
  const ranked = rotation.rankPoolCandidates([a, b], { sharesHotEgress: pred });
  assert.deepEqual(
    ranked.map((m) => m.host),
    [b.host, a.host]
  );
});

test("an observation older than 30 minutes is ignored: not demoted", () => {
  const a = member();
  const b = member();
  refuse(a);
  logEgressOld(a, "203.0.113.7", 31 * 60_000);
  logEgress(b, "203.0.113.7");
  flush();
  const pred = hotFor([a, b]);
  // a's observation is outside the window: no hot address seeded from it,
  // so b is not demoted. a still ranks last by the refusal signal itself.
  assert.equal(pred(b), false);
  const ranked = rotation.rankPoolCandidates([a, b], { sharesHotEgress: pred });
  assert.deepEqual(
    ranked.map((m) => m.host),
    [b.host, a.host]
  );
});

test("skip on plus new flag off never demotes for shared egress", () => {
  const a = member();
  const b = member();
  refuse(a);
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.7");
  flush();
  delete process.env.PROXY_POOL_SHARED_EGRESS_ORDER;
  try {
    // The new flag is off: no shared-egress demotion. a still ranks last by
    // the skip-recently-failed refusal signal itself; b serves first.
    const pred = hotFor([a, b]);
    assert.equal(pred(b), false);
    const ranked = rotation.rankPoolCandidates([a, b], { sharesHotEgress: pred });
    assert.deepEqual(
      ranked.map((m) => m.host),
      [b.host, a.host]
    );
  } finally {
    process.env.PROXY_POOL_SHARED_EGRESS_ORDER = "true";
  }
});
