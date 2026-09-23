import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Pool candidate ranking: with PROXY_SKIP_RECENTLY_FAILED on, the pool orders
// candidates by crossed short-memory health signals instead of serving position
// order, without removing anyone. The pool stops re-serving at the head a proxy
// that just failed, so the request lands on the first useful try. With the flag
// off (the default) the order stays exactly the plain rotation.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pool-rank-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const rotation = await import("../../src/lib/db/proxies/rotation.ts");
const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");

function resetStorage() {
  memory.__resetProxyRefusalMemoryForTesting();
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
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
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Member = { id: string; host: string; port: number };
let seq = 0;

async function pool(size: number, scope = "provider", scopeId = "openai"): Promise<Member[]> {
  const members: Member[] = [];
  for (let i = 0; i < size; i++) {
    seq++;
    const host = `10.9.0.${seq}`;
    const port = 9200 + seq;
    const proxy = await proxiesDb.createProxy({ name: `member ${seq}`, type: "http", host, port });
    await proxiesDb.addProxyToScopePool(scope, scopeId, proxy.id);
    members.push({ id: proxy.id, host, port });
  }
  return members;
}

function keyOf(member: Member) {
  return memory.proxyEgressKey({ type: "http", host: member.host, port: member.port });
}

function setAside(member: Member) {
  memory.noteProxyRefusal(keyOf(member), "proxy_unreachable");
}

async function pick(scope = "provider", scopeId = "openai") {
  const resolved = await proxiesDb.resolveProxyForScopeFromRegistry(scope, scopeId);
  return (resolved as { proxy: { host: string } }).proxy.host;
}

test("a member set aside ranks last: B, C before A", async () => {
  const [a, b, c] = await pool(3);
  setAside(a);
  const ranked = rotation.rankPoolCandidates([a, b, c]);
  assert.deepEqual(
    ranked.map((m) => m.host),
    [b.host, c.host, a.host]
  );
});

test("no signal keeps position order", async () => {
  const [a, b, c] = await pool(3);
  assert.deepEqual(
    rotation.rankPoolCandidates([a, b, c]).map((m) => m.host),
    [a.host, b.host, c.host]
  );
});

test("with every member set aside the pool keeps its order and size", async () => {
  const members = await pool(3);
  for (const member of members) setAside(member);
  const ranked = rotation.rankPoolCandidates(members);
  assert.equal(ranked.length, 3);
  assert.deepEqual(
    ranked.map((m) => m.host),
    members.map((m) => m.host)
  );
});

test("a negative probe verdict ranks the member last", async () => {
  const [a, b] = await pool(2);
  const ranked = rotation.rankPoolCandidates([a, b], {
    probeHealth: (url) => (url.includes(a.host) ? false : null),
  });
  assert.deepEqual(
    ranked.map((m) => m.host),
    [b.host, a.host]
  );
});

test("the probe URL carries auth and the port like the dispatcher", async () => {
  const row = { type: "http", host: "10.9.9.9", port: 9201, username: "u", password: "p" };
  const ranked = rotation.rankPoolCandidates([row, { ...row, host: "10.9.9.8" }], {
    probeHealth: (url) => (url.startsWith("http://u:p@10.9.9.9:9201") ? false : null),
  });
  assert.deepEqual(
    ranked.map((m) => (m as { host: string }).host),
    ["10.9.9.8", "10.9.9.9"]
  );
});

test("with the flag off the order stays the plain rotation", async () => {
  const [a] = await pool(2);
  setAside(a);
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  try {
    assert.equal(await pick(), a.host);
  } finally {
    process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
  }
});

test("functional: the pool serves the healthy member first after the head fails", async () => {
  const [a, b] = await pool(2);
  setAside(a);
  assert.equal(await pick(), b.host);
  assert.equal(await pick(), b.host);
});

test("sticky holds its member while its window runs, even with a rank signal", async () => {
  const members = await pool(3);
  await proxiesDb.setScopeRotationStrategy("provider", "openai", "sticky", {
    stickyWindowMinutes: 30,
  });
  const held = await pick();
  const heldMember = members.find((m) => m.host === held) ?? null;
  assert.ok(heldMember);
  const other = members.find((m) => m.host !== held) ?? null;
  assert.ok(other);
  setAside(other);
  assert.equal(await pick(), held);
});
