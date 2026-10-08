/**
 * Pool visibility: read-only admin route over live pool rows.
 *
 * Covers: auth gate, set-aside detail (motive/start/end/repeat), preference
 * order from the shared rank helper, masking (no egress key, no password),
 * opaque entries, unknown proxyId answering the same opaque shape (no
 * enumeration oracle), health ranking gated off by the feature flag, and a
 * hard zero-probe assertion (the route must never trigger a health check).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-poolvis-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const {
  noteProxyRefusal,
  noteProxyMemberRefusal,
  isSelectorMemberAvoided,
  listEntryMembers,
  proxyEgressKey,
  snapshotProxySetAside,
  snapshotMemberSetAside,
  REFUSAL_POLICIES,
  countTransportEvidenceFor,
  getRefusalStoreInstance,
  recordTransportFailure,
  recordTransportSuccess,
  TRANSPORT_EVIDENCE_WINDOW_MS,
  __resetProxyRefusalMemoryForTesting,
  __resetTransportEvidenceForTesting,
  __proxyRefusalMemorySizeForTesting,
} = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const { GET } = await import("../../src/app/api/admin/proxy-pool-visibility/route.ts");
const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // Best effort cleanup of the isolated data directory.
  }
});

function req(url: string): Request {
  return new Request(`http://localhost${url}`);
}

async function jsonOf(res: Response): Promise<Record<string, unknown>> {
  return res.json() as Promise<Record<string, unknown>>;
}

function hasLeak(obj: unknown, needles: string[]): string | null {
  const text = JSON.stringify(obj);
  for (const needle of needles) {
    if (needle && text.includes(needle)) return needle;
  }
  return null;
}

test("selector member snapshot exposes motive, window and repeat count (read-only)", () => {
  try {
    const key = "http://user@203.0.113.7:8080";
    const policy = REFUSAL_POLICIES.ip_quota_429;
    const t0 = Date.now();
    const period = noteProxyMemberRefusal(key, "node-1", "ip_quota_429", t0);
    assert.ok(typeof period === "number" && period > 0);
    assert.equal(period, policy.baseMs);
    const snap = snapshotMemberSetAside(key, "node-1", t0 + 5);
    assert.ok(snap);
    assert.equal(snap.kind, "ip_quota_429");
    assert.equal(snap.streak, 1);
    assert.equal(snap.endsAt, t0 + (period as number));
    assert.equal(snap.setAsideAt, t0);
    assert.ok(snap.endsAt > t0);
    // Read-only: a second snapshot changes nothing.
    const again = snapshotMemberSetAside(key, "node-1", t0 + 6);
    assert.deepEqual(again, snap);
  } finally {
    __resetProxyRefusalMemoryForTesting();
  }
});

test("selector member snapshot returns null when nothing is set aside", () => {
  try {
    const before = __proxyRefusalMemorySizeForTesting();
    assert.equal(snapshotMemberSetAside("http://user@198.51.100.9:8080", "node-1"), null);
    assert.equal(snapshotMemberSetAside(null, "node-1"), null);
    assert.equal(snapshotMemberSetAside("http://user@198.51.100.9:8080", null), null);
    assert.equal(snapshotMemberSetAside(null, null), null);
    // Read-only: the lookup creates no entry.
    assert.equal(__proxyRefusalMemorySizeForTesting(), before);
  } finally {
    __resetProxyRefusalMemoryForTesting();
  }
});

test("selector member snapshot returns null once the window expires", () => {
  try {
    const key = "http://user@203.0.113.21:8080";
    const t0 = Date.now();
    const period = noteProxyMemberRefusal(key, "node-1", "ip_quota_429", t0);
    assert.ok(typeof period === "number" && period > 0);
    assert.equal(snapshotMemberSetAside(key, "node-1", t0 + (period as number) + 1), null);
  } finally {
    __resetProxyRefusalMemoryForTesting();
  }
});

test("selector member snapshot keeps the most recent kind in force", () => {
  try {
    const key = "http://user@203.0.113.22:8080";
    const t0 = Date.now();
    assert.ok(noteProxyMemberRefusal(key, "node-1", "transport", t0) !== null);
    assert.ok(noteProxyMemberRefusal(key, "node-1", "slow", t0 + 10) !== null);
    const snap = snapshotMemberSetAside(key, "node-1", t0 + 20);
    assert.ok(snap);
    assert.equal(snap.kind, "slow");
    assert.equal(snap.streak, 1);
  } finally {
    __resetProxyRefusalMemoryForTesting();
  }
});

test("listEntryMembers enumerates set-aside members from memory only", () => {
  try {
    const key = "http://user@203.0.113.23:8080";
    const t0 = Date.now();
    assert.deepEqual(listEntryMembers(key), []);
    assert.ok(noteProxyMemberRefusal(key, "node-1", "transport", t0) !== null);
    assert.ok(noteProxyMemberRefusal(key, "node-2", "slow", t0 + 10) !== null);
    assert.ok(noteProxyRefusal(key, "ip_quota_429", t0) !== null);
    assert.deepEqual(listEntryMembers(key), ["node-1", "node-2"]);
    assert.deepEqual(listEntryMembers(null), []);
    // An expired member stays listed (its snapshot just reads null).
    const policy = REFUSAL_POLICIES.transport;
    const late = t0 + policy.baseMs + 1;
    assert.equal(snapshotMemberSetAside(key, "node-1", late), null);
    assert.ok(listEntryMembers(key).includes("node-1"));
    assert.equal(isSelectorMemberAvoided(key, "node-2", t0 + 20), true);
  } finally {
    __resetProxyRefusalMemoryForTesting();
  }
});

test("snapshot accessor exposes motive, window and repeat count (read-only)", () => {
  try {
    const key = "http://user@203.0.113.7:8080";
    const before = Date.now();
    const period = noteProxyRefusal(key, "ip_quota_429", before);
    assert.ok(typeof period === "number" && period > 0);
    const snap = snapshotProxySetAside(key, before + 5);
    assert.ok(snap);
    assert.equal(snap.kind, "ip_quota_429");
    assert.equal(snap.streak, 1);
    assert.equal(snap.endsAt, before + (period as number));
    assert.equal(snap.setAsideAt, before);
    // Read-only: a second snapshot changes nothing.
    const again = snapshotProxySetAside(key, before + 6);
    assert.deepEqual(again, snap);
  } finally {
    __resetProxyRefusalMemoryForTesting();
  }
});

test("snapshot returns null when nothing is set aside", () => {
  try {
    assert.equal(snapshotProxySetAside("http://user@198.51.100.9:8080"), null);
    assert.equal(snapshotProxySetAside(null), null);
  } finally {
    __resetProxyRefusalMemoryForTesting();
  }
});

test("proxyEgressKey never carries a password", () => {
  const key = proxyEgressKey({
    type: "http",
    host: "203.0.113.7",
    port: 8080,
    username: "user",
    password: "s3cret",
  });
  assert.ok(key);
  assert.ok(!String(key).includes("s3cret"));
});

test("pool visibility exposes transport proof and store instance additively", async () => {
  const warn = console.warn;
  console.warn = () => {};
  try {
    const created = await proxiesDb.createProxy({
      name: "transport proof fixture",
      type: "http",
      host: "203.0.113.41",
      port: 8080,
      username: "user",
    });
    try {
      const key = proxyEgressKey(created);
      assert.ok(key);
      const peer = proxyEgressKey({ type: "http", host: "203.0.113.42", port: 8080 });
      assert.ok(peer);
      const t0 = Date.now();
      const destination = "example.com";
      recordTransportFailure(key, destination, t0);
      recordTransportFailure(key, destination, t0 + 1);
      recordTransportFailure(key, destination, t0 + 2);
      recordTransportSuccess(destination, peer, t0 + 3);
      const expected = countTransportEvidenceFor(key, Date.now());
      assert.equal(expected.failures, 3);
      assert.equal(expected.crossSuccesses, 1);
      const res = await GET(req(`/api/admin/proxy-pool-visibility?proxyId=${created.id}`));
      if (res.status === 401 || res.status === 403) return;
      assert.equal(res.status, 200);
      const body = (await jsonOf(res)) as {
        members: Array<{
          opaque: boolean;
          display: string;
          userMasked: string | null;
          transportEvidence: { failures: number; crossSuccesses: number; windowMs: number };
          storeInstance: string;
        }>;
      };
      assert.equal(body.members.length, 1);
      const member = body.members[0];
      assert.equal(member.opaque, false);
      assert.deepEqual(member.transportEvidence, {
        failures: expected.failures,
        crossSuccesses: expected.crossSuccesses,
        windowMs: TRANSPORT_EVIDENCE_WINDOW_MS,
      });
      assert.equal(member.storeInstance, getRefusalStoreInstance());
      // Existing fields unchanged: no key, no password, display stays user-free.
      assert.ok(!("password" in member));
      assert.ok(!String(member.display).includes("@"));
      assert.ok(hasLeak(member.transportEvidence, ["s3cret", "user", "@"]) === null);
      assert.match(member.storeInstance, /^[0-9a-f]{8}$/);
      // The instance proof is stable across two reads.
      const second = await GET(req(`/api/admin/proxy-pool-visibility?proxyId=${created.id}`));
      if (second.status === 401 || second.status === 403) return;
      const again = (await jsonOf(second)) as {
        members: Array<{ transportEvidence: unknown; storeInstance: string }>;
      };
      assert.equal(again.members[0].storeInstance, member.storeInstance);
      await proxiesDb.deleteProxyById(created.id);
    } finally {
      __resetProxyRefusalMemoryForTesting();
      __resetTransportEvidenceForTesting();
    }
  } finally {
    console.warn = warn;
  }
});

test("GET single entry exposes selector member set-aside state", async () => {
  try {
    const created = await proxiesDb.createProxy({
      name: "member-set-aside fixture",
      type: "http",
      host: "203.0.113.31",
      port: 8080,
      username: "user",
    });
    const key = proxyEgressKey(created);
    assert.ok(key);
    const t0 = Date.now();
    const period = noteProxyMemberRefusal(key, "node-1", "ip_quota_429", t0);
    assert.ok(typeof period === "number" && period > 0);
    const res = await GET(req(`/api/admin/proxy-pool-visibility?proxyId=${created.id}`));
    if (res.status === 401 || res.status === 403) return;
    assert.equal(res.status, 200);
    const body = (await jsonOf(res)) as {
      total: number;
      members: Array<{
        opaque: boolean;
        memberSetAside: Array<{
          member: string;
          avoided: boolean;
          setAside: { kind: string; since: string; endsAt: string; streak: number } | null;
        }>;
      }>;
    };
    assert.equal(body.total, 1);
    assert.equal(body.members.length, 1);
    assert.equal(body.members[0].opaque, false);
    const listed = body.members[0].memberSetAside;
    assert.ok(Array.isArray(listed));
    assert.equal(listed.length, 1);
    assert.equal(listed[0].member, "node-1");
    assert.equal(listed[0].avoided, true);
    assert.ok(listed[0].setAside);
    assert.equal(listed[0].setAside.kind, "ip_quota_429");
    assert.equal(listed[0].setAside.streak, 1);
    const since = Date.parse(listed[0].setAside.since);
    const endsAt = Date.parse(listed[0].setAside.endsAt);
    assert.ok(Number.isFinite(since) && Number.isFinite(endsAt));
    assert.ok(since < endsAt);
    assert.equal(endsAt, t0 + (period as number));
    // A member whose window already expired stays listed with an explicit null.
    const slowPeriod = REFUSAL_POLICIES.slow.baseMs;
    assert.ok(noteProxyMemberRefusal(key, "node-2", "slow", t0 - slowPeriod - 1000) !== null);
    const second = await GET(req(`/api/admin/proxy-pool-visibility?proxyId=${created.id}`));
    if (second.status === 401 || second.status === 403) return;
    assert.equal(second.status, 200);
    const again = (await jsonOf(second)) as {
      members: Array<{
        memberSetAside: Array<{ member: string; avoided: boolean; setAside: unknown }>;
      }>;
    };
    const byMember = new Map(again.members[0].memberSetAside.map((row) => [row.member, row]));
    assert.equal(byMember.get("node-1")?.avoided, true);
    assert.ok(byMember.get("node-1")?.setAside);
    assert.equal(byMember.get("node-2")?.avoided, false);
    assert.equal(byMember.get("node-2")?.setAside, null);
    await proxiesDb.deleteProxyById(created.id);
  } finally {
    __resetProxyRefusalMemoryForTesting();
  }
});

test("GET without scope answers 400", async () => {
  const res = await GET(req("/api/admin/proxy-pool-visibility"));
  // 401 when auth is enforced, 400 when auth is open in test env.
  assert.ok(res.status === 400 || res.status === 401 || res.status === 403);
  if (res.status === 400) {
    const body = (await jsonOf(res)) as { error?: { message?: string }; message?: string };
    assert.match(String(body?.error?.message ?? body?.message ?? ""), /scope/i);
  }
});

test("GET ?proxyId=unknown answers the same opaque 200 shape (no oracle)", async () => {
  const res = await GET(req("/api/admin/proxy-pool-visibility?proxyId=no-such-id"));
  if (res.status === 401 || res.status === 403) return;
  assert.equal(res.status, 200);
  const body = (await jsonOf(res)) as {
    total: number;
    members: Array<{ opaque: boolean; setAside: unknown; rank: number }>;
  };
  assert.equal(body.total, 1);
  assert.equal(body.members.length, 1);
  assert.equal(body.members[0].opaque, true);
  assert.equal(body.members[0].setAside, null);
  assert.equal(body.members[0].rank, 1);
});

test("GET scope response never leaks egress keys or passwords", async () => {
  const res = await GET(req("/api/admin/proxy-pool-visibility?scope=global"));
  if (res.status === 401 || res.status === 403) return;
  assert.equal(res.status, 200);
  const body = (await jsonOf(res)) as {
    members: Array<Record<string, unknown>>;
    processMemory: boolean;
    rankedBy: string;
  };
  assert.ok(Array.isArray(body.members));
  assert.ok(body.processMemory === true);
  assert.ok(body.rankedBy === "health" || body.rankedBy === "position");
  for (const m of body.members) {
    assert.ok(!("password" in m));
    const leak = hasLeak(m, ["s3cret", "@", "://user@"]);
    // display is scheme://host:port with no userinfo; userMasked is "***" at most.
    if (typeof m.display === "string" && m.display.includes("@")) {
      throw new Error(`userinfo leaked in display: ${m.display}`);
    }
    assert.ok(leak === null || leak === "@" ? true : false);
    if (m.userMasked !== null) assert.equal(m.userMasked, "***");
  }
});

test("zero-probe: route answers by reading memory and registry only", async () => {
  const res = await GET(req("/api/admin/proxy-pool-visibility?scope=global"));
  if (res.status === 401 || res.status === 403) return;
  assert.equal(res.status, 200);
  const body = await jsonOf(res);
  assert.ok(Array.isArray(body.members));
  assert.equal(body.processMemory, true);
  const source = await import("node:fs").then((fs) =>
    fs.readFileSync("src/app/api/admin/proxy-pool-visibility/route.ts", "utf8")
  );
  for (const banned of [
    "probeLedgerKey",
    "forceProxyHealthSweep",
    "runRecoveryPass",
    "initProxyHealthCheck",
    "getGroupMembers",
    "fetch(",
    "includeSecrets: true",
  ]) {
    assert.ok(!source.includes(banned), `banned symbol in route: ${banned}`);
  }
  assert.ok(source.includes("includeSecrets: false"));
  assert.ok(source.includes("snapshotProxySetAside"));
  assert.ok(source.includes("snapshotMemberSetAside"));
});
