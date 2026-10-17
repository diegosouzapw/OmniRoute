import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Operator failure signal: an authenticated operator push writes a dated
// outage signal into the refusal memory under its own reason, so the next
// pool send goes elsewhere and the member returns at expiry or on traffic.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-operator-refusal-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const { POST } = await import("../../src/app/api/settings/proxies/operator-egress/route.ts");

function resetStorage() {
  memory.__resetProxyRefusalMemoryForTesting();
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
  process.env.INITIAL_PASSWORD = "operator-refusal-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });
  process.env.PROXY_OPERATOR_EGRESS_ENABLED = "true";
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  delete process.env.PROXY_OPERATOR_EGRESS_ENABLED;
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  memory.__resetProxyRefusalMemoryForTesting();
});

type Member = { id: string; host: string; port: number };

async function knownMember(seq: number): Promise<Member> {
  const host = `203.0.113.${seq}`;
  const port = 8080 + seq;
  const proxy = await proxiesDb.createProxy({
    name: `refusal member ${seq}`,
    type: "http",
    host,
    port,
  });
  return { id: proxy.id, host, port };
}

async function pushRefusals(body: unknown) {
  const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
  return POST(
    await makeManagementSessionRequest("http://localhost/api/settings/proxies/operator-egress", {
      method: "POST",
      body: JSON.stringify(body),
    })
  );
}

function memberPush(member: Member, overrides: Record<string, unknown> = {}) {
  return {
    version: 1,
    members: [
      {
        host: member.host,
        port: member.port,
        addresses: ["198.51.100.9"],
        observedAt: new Date().toISOString(),
      },
    ],
    refusals: [
      {
        entry: `http://${member.host}:${member.port}`,
        host: member.host,
        port: member.port,
        reason: "operator_reported",
        observedAt: new Date().toISOString(),
        ...overrides,
      },
    ],
  };
}

function refusalRowCount(): number {
  return (
    core.getDbInstance().prepare("SELECT COUNT(*) AS n FROM proxy_operator_egress").get() as {
      n: number;
    }
  ).n;
}

test("outage push on a healthy member sets it aside from the next send", async () => {
  const member = await knownMember(11);
  const entryKey = memory.proxyEgressKey(`http://${member.host}:${member.port}`);
  assert.ok(entryKey);
  assert.equal(memory.isProxyAvoided(entryKey), false);
  const response = await pushRefusals(memberPush(member));
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    version: number;
    refusalsStored: number;
    refusalsIgnored: number;
  };
  assert.equal(body.version, 1);
  assert.equal(body.refusalsStored, 1);
  assert.equal(body.refusalsIgnored, 0);
  assert.equal(memory.isProxyAvoided(entryKey), true);
});

test("written key equals the key read by the pool", async () => {
  const member = await knownMember(12);
  const registryRow = await proxiesDb.getProxyById(member.id);
  assert.ok(registryRow);
  const readKey = memory.proxyEgressKey(registryRow);
  assert.ok(readKey);
  const response = await pushRefusals(memberPush(member));
  assert.equal(response.status, 200);
  assert.equal(memory.isProxyAvoided(readKey), true);
  const snapshot = memory.snapshotProxySetAside(readKey);
  assert.ok(snapshot);
  assert.equal(snapshot.kind, "operator_reported");
});

test("first outage signal expires after the short curve", async () => {
  const member = await knownMember(13);
  const entryKey = memory.proxyEgressKey(`http://${member.host}:${member.port}`);
  assert.ok(entryKey);
  const response = await pushRefusals(memberPush(member));
  assert.equal(response.status, 200);
  assert.equal(memory.isProxyAvoided(entryKey, Date.now() + 60_000 + 1), false);
});

test("flag off answers 404 and writes nothing", async () => {
  const member = await knownMember(14);
  delete process.env.PROXY_OPERATOR_EGRESS_ENABLED;
  const response = await pushRefusals(memberPush(member));
  assert.equal(response.status, 404);
  const entryKey = memory.proxyEgressKey(`http://${member.host}:${member.port}`);
  assert.equal(memory.isProxyAvoided(entryKey), false);
});

test("read flag off counts the signal ignored and writes nothing", async () => {
  const member = await knownMember(15);
  process.env.PROXY_SKIP_RECENTLY_FAILED = "false";
  const response = await pushRefusals(memberPush(member));
  assert.equal(response.status, 200);
  const body = (await response.json()) as { refusalsStored: number; refusalsIgnored: number };
  assert.equal(body.refusalsStored, 0);
  assert.equal(body.refusalsIgnored, 1);
  const entryKey = memory.proxyEgressKey(`http://${member.host}:${member.port}`);
  assert.equal(memory.isProxyAvoided(entryKey), false);
});

test("a served response clears the outage signal", async () => {
  const member = await knownMember(16);
  const entryKey = memory.proxyEgressKey(`http://${member.host}:${member.port}`);
  assert.ok(entryKey);
  const response = await pushRefusals(memberPush(member));
  assert.equal(response.status, 200);
  assert.equal(memory.isProxyAvoided(entryKey), true);
  memory.noteProxyServed(entryKey);
  assert.equal(memory.isProxyAvoided(entryKey), false);
});

test("a stale signal is counted ignored and writes nothing", async () => {
  const member = await knownMember(17);
  const stale = new Date(Date.now() - 10 * 60_000).toISOString();
  const body = memberPush(member, { observedAt: stale });
  body.members[0].observedAt = new Date().toISOString();
  const response = await pushRefusals(body);
  assert.equal(response.status, 200);
  const parsed = (await response.json()) as { refusalsStored: number; refusalsIgnored: number };
  assert.equal(parsed.refusalsStored, 0);
  assert.equal(parsed.refusalsIgnored, 1);
  const entryKey = memory.proxyEgressKey(`http://${member.host}:${member.port}`);
  assert.equal(memory.isProxyAvoided(entryKey), false);
});

test("a borrowed quota reason is rejected before any write", async () => {
  const member = await knownMember(18);
  const body = memberPush(member, { reason: "ip_quota_429" });
  const response = await pushRefusals(body);
  assert.equal(response.status, 400);
  assert.equal(refusalRowCount(), 0);
  const entryKey = memory.proxyEgressKey(`http://${member.host}:${member.port}`);
  assert.equal(memory.isProxyAvoided(entryKey), false);
});

test("an invalid signal leaves the address table untouched", async () => {
  const member = await knownMember(19);
  const body = memberPush(member, { reason: "ip_quota_429" });
  const response = await pushRefusals(body);
  assert.equal(response.status, 400);
  assert.equal(refusalRowCount(), 0);
});

test("explicit recovery clears the outage but keeps a region refusal", async () => {
  const member = await knownMember(20);
  const entryKey = memory.proxyEgressKey(`http://${member.host}:${member.port}`);
  assert.ok(entryKey);
  const push = await pushRefusals(memberPush(member));
  assert.equal(push.status, 200);
  memory.noteProxyRefusal(entryKey, "geo_blocked");
  assert.equal(memory.isProxyAvoided(entryKey), true);
  const response = await pushRefusals(memberPush(member, { recovered: true }));
  assert.equal(response.status, 200);
  const snapshot = memory.snapshotProxySetAside(entryKey);
  assert.ok(snapshot);
  assert.equal(snapshot.kind, "geo_blocked");
});

test("an unknown member is counted ignored, never a batch error", async () => {
  const ghost = { host: "203.0.113.99", port: 8099 };
  const response = await pushRefusals(memberPush(ghost));
  assert.equal(response.status, 200);
  const body = (await response.json()) as { refusalsStored: number; refusalsIgnored: number };
  assert.equal(body.refusalsStored, 0);
  assert.equal(body.refusalsIgnored, 1);
});

test("an unusable entry is counted ignored and writes nothing", async () => {
  const member = await knownMember(21);
  const body = memberPush(member, { entry: "relay://unusable" });
  const response = await pushRefusals(body);
  assert.equal(response.status, 200);
  const parsed = (await response.json()) as { refusalsStored: number; refusalsIgnored: number };
  assert.equal(parsed.refusalsStored, 0);
  assert.equal(parsed.refusalsIgnored, 1);
});

test("a future-dated signal is counted ignored and writes nothing", async () => {
  const member = await knownMember(23);
  const future = new Date(Date.now() + 10 * 60_000).toISOString();
  const body = memberPush(member, { observedAt: future });
  body.members[0].observedAt = new Date().toISOString();
  const response = await pushRefusals(body);
  assert.equal(response.status, 200);
  const parsed = (await response.json()) as { refusalsStored: number; refusalsIgnored: number };
  assert.equal(parsed.refusalsStored, 0);
  assert.equal(parsed.refusalsIgnored, 1);
  const entryKey = memory.proxyEgressKey(`http://${member.host}:${member.port}`);
  assert.equal(memory.isProxyAvoided(entryKey), false);
});

test("an unroutable host signal is counted ignored and writes nothing", async () => {
  const member = await knownMember(24);
  const body = memberPush(member, { host: "example.com" });
  const response = await pushRefusals(body);
  assert.equal(response.status, 200);
  const parsed = (await response.json()) as { refusalsStored: number; refusalsIgnored: number };
  assert.equal(parsed.refusalsStored, 0);
  assert.equal(parsed.refusalsIgnored, 1);
  const entryKey = memory.proxyEgressKey(`http://${member.host}:${member.port}`);
  assert.equal(memory.isProxyAvoided(entryKey), false);
});

test("an empty signal batch is a no-op", async () => {
  const member = await knownMember(22);
  const response = await pushRefusals({
    version: 1,
    members: [
      {
        host: member.host,
        port: member.port,
        addresses: ["198.51.100.9"],
        observedAt: new Date().toISOString(),
      },
    ],
    refusals: [],
  });
  assert.equal(response.status, 200);
  const body = (await response.json()) as { refusalsStored: number; refusalsIgnored: number };
  assert.equal(body.refusalsStored, 0);
  assert.equal(body.refusalsIgnored, 0);
});
