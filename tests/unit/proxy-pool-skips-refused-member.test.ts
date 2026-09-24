import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// With PROXY_SKIP_RECENTLY_FAILED on, pool selection skips members that just failed, for
// every rotation strategy. The per-connection resolution used by the chat path
// (resolveProxyForConnection) re-runs the registry cascade on every call for a multi-member
// pool (#13575) and skips a set-aside member on top of that. With every member set aside, or
// the flag off (the default), set-aside skipping does not apply but rotation continues.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pool-skip-refused-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const flagsDb = await import("../../src/lib/db/featureFlags.ts");

function resetStorage() {
  memory.__resetProxyRefusalMemoryForTesting();
  // Opt in for every test; the flag-off tests remove it explicitly.
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
    const host = `10.8.0.${seq}`;
    const port = 9100 + seq;
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

async function picks(count: number) {
  const hosts: string[] = [];
  for (let i = 0; i < count; i++) hosts.push(await pick());
  return hosts;
}

function rotationRow() {
  return core
    .getDbInstance()
    .prepare(
      "SELECT cursor, rotated_at FROM proxy_scope_rotation WHERE scope = 'provider' AND scope_id IS 'openai'"
    )
    .get() as { cursor: number; rotated_at: string | null };
}

test("round-robin skips a member set aside: A, C, A, C", async () => {
  const [a, b, c] = await pool(3);
  setAside(b);
  assert.deepEqual(await picks(4), [a.host, c.host, a.host, c.host]);
});

test("round-robin wraps past the last member and advances beyond the one served", async () => {
  const [a, b, c] = await pool(3);
  await pick();
  core
    .getDbInstance()
    .prepare(
      "UPDATE proxy_scope_rotation SET cursor = 2 WHERE scope = 'provider' AND scope_id IS 'openai'"
    )
    .run();
  setAside(c);
  assert.equal(await pick(), a.host);
  assert.equal(rotationRow().cursor, 4);
  assert.equal(await pick(), b.host);
});

test("sticky moves to the next eligible member without writing the rotation row", async () => {
  const [, b, c] = await pool(3);
  await proxiesDb.setScopeRotationStrategy("provider", "openai", "sticky", {
    stickyWindowMinutes: 30,
  });
  const held = await pick();
  const before = rotationRow();
  const heldMember = [b, c].find((m) => m.host === held) ?? null;
  assert.ok(heldMember, `sticky first pick should be B or C, got ${held}`);
  setAside(heldMember);

  const next = await pick();
  assert.notEqual(next, held);
  assert.deepEqual(rotationRow(), before);
});

test("random never draws a member set aside", async () => {
  const [a] = await pool(3);
  await proxiesDb.setScopeRotationStrategy("provider", "openai", "random");
  setAside(a);
  for (let i = 0; i < 1000; i++) assert.notEqual(await pick(), a.host);
});

test("latency picks among the eligible members", async () => {
  const [a, b] = await pool(3);
  await proxiesDb.setScopeRotationStrategy("provider", "openai", "latency");
  setAside(a);
  assert.equal(await pick(), b.host);
});

test("with every member set aside the pool behaves as before", async () => {
  const members = await pool(3);
  for (const member of members) setAside(member);
  assert.deepEqual(
    await picks(3),
    members.map((m) => m.host)
  );
});

test("with the flag at its default (off) a member set aside is still served in turn", async () => {
  const members = await pool(3);
  setAside(members[1]);
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  assert.deepEqual(
    await picks(3),
    members.map((m) => m.host)
  );
  assert.equal(rotationRow().cursor, 3);
});

test("a DB override turning the flag off wins over the environment", async () => {
  const members = await pool(3);
  setAside(members[1]);
  flagsDb.setFeatureFlagOverride("PROXY_SKIP_RECENTLY_FAILED", "false");
  assert.deepEqual(
    await picks(3),
    members.map((m) => m.host)
  );
  flagsDb.setFeatureFlagOverride("PROXY_SKIP_RECENTLY_FAILED", "true");
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  assert.deepEqual(await picks(2), [members[0].host, members[2].host]);
});

// #13575: the chat-path resolveProxyForConnection() no longer freezes a multi-member
// pool's choice for the connection's lifetime — it re-runs the registry cascade on every
// call (like every other pool consumer) so round-robin/sticky/random keep working exactly
// as resolveProxyForScopeFromRegistry() already does when called directly. A member set
// aside is still skipped on top of that rotation, same as before.
test("a connection's chat-path resolution skips a member set aside", async () => {
  const [a, b, c] = await pool(3, "account", "conn-pool");
  const first = await settingsDb.resolveProxyForConnection("conn-pool");
  assert.equal((first as { proxy: { host: string } }).proxy.host, a.host);

  setAside(b);
  // Ranked (b last) + skip: cursor 1 lands on c, served past the set-aside member.
  const next = await settingsDb.resolveProxyForConnection("conn-pool");
  assert.equal((next as { proxy: { host: string } }).proxy.host, c.host);

  memory.noteProxyRecovered(keyOf(b), "proxy_unreachable");
  assert.equal(memory.isProxyAvoided(keyOf(b)), false);
  // Rank + skip moves the cursor past c (served at cursor 1, cursor now 2), so the
  // next pick serves c again (cursor 2 in the restored position order [a,b,c]),
  // then rotation resumes at a.
  const after = [await pick("account", "conn-pool"), await pick("account", "conn-pool")];
  assert.deepEqual(after, [c.host, a.host]);
});

test("with the flag off a connection's chat-path resolution still rotates normally", async () => {
  const [a, b] = await pool(3, "account", "conn-off");
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  const first = await settingsDb.resolveProxyForConnection("conn-off");
  assert.equal((first as { proxy: { host: string } }).proxy.host, a.host);
  setAside(a);
  const next = await settingsDb.resolveProxyForConnection("conn-off");
  assert.equal((next as { proxy: { host: string } }).proxy.host, b.host);
});

test("with every member set aside, chat-path resolution keeps rotating like the registry", async () => {
  // Round-robin advances its persisted cursor on each cascade run, so the cursor counts
  // how many times the registry pool was actually queried for this connection.
  const [a, b] = await pool(2, "account", "conn-all");
  const cursor = () =>
    (
      core
        .getDbInstance()
        .prepare(
          "SELECT cursor FROM proxy_scope_rotation WHERE scope = 'account' AND scope_id IS 'conn-all'"
        )
        .get() as { cursor: number }
    ).cursor;

  const first = await settingsDb.resolveProxyForConnection("conn-all");
  assert.equal((first as { proxy: { host: string } }).proxy.host, a.host);
  assert.equal(cursor(), 1);

  setAside(a);
  setAside(b);
  const second = await settingsDb.resolveProxyForConnection("conn-all");
  assert.equal((second as { proxy: { host: string } }).proxy.host, b.host);
  assert.equal(cursor(), 2);

  const third = await settingsDb.resolveProxyForConnection("conn-all");
  assert.equal((third as { proxy: { host: string } }).proxy.host, a.host);
  assert.equal(cursor(), 3);
});

test("a legacy single-proxy level stays cached even when its proxy is set aside", async () => {
  await settingsDb.setProxyForLevel("key", "conn-legacy", "http://10.9.9.9:8080");
  const first = await settingsDb.resolveProxyForConnection("conn-legacy");
  assert.equal((first as { level: string }).level, "key");
  memory.noteProxyRefusal(memory.proxyEgressKey("http://10.9.9.9:8080"), "proxy_unreachable");
  assert.strictEqual(await settingsDb.resolveProxyForConnection("conn-legacy"), first);
});
