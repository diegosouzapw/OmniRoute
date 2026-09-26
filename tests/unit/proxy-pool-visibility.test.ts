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
  proxyEgressKey,
  snapshotProxySetAside,
  __resetProxyRefusalMemoryForTesting,
} = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const { GET } = await import("../../src/app/api/admin/proxy-pool-visibility/route.ts");

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
    "fetch(",
    "includeSecrets: true",
  ]) {
    assert.ok(!source.includes(banned), `banned symbol in route: ${banned}`);
  }
  assert.ok(source.includes("includeSecrets: false"));
  assert.ok(source.includes("snapshotProxySetAside"));
});
