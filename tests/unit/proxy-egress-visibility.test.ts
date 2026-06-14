/**
 * TDD — proxy egress IP visibility. Confirms by which IP each OAuth connection
 * leaves, and flags same-rotation-group accounts sharing one egress IP (the
 * exact codex anomaly-revocation trigger). Network probe is injected.
 */
import test from "node:test";
import assert from "node:assert/strict";

const egress = await import("../../src/lib/proxyEgress.ts");
const {
  resolveEgressIp,
  analyzeEgressSharing,
  diagnoseAllEgressIps,
  _setEgressProbeForTests,
  clearEgressCache,
} = egress as unknown as {
  resolveEgressIp: (u: string | null, o?: any) => Promise<{ ip: string | null; cached: boolean }>;
  analyzeEgressSharing: (c: any[]) => {
    byEgressIp: Record<string, string[]>;
    sharedWithinRotationGroup: Array<{ egressIp: string; rotationGroup: string; connections: string[] }>;
  };
  diagnoseAllEgressIps: (deps?: any) => Promise<any>;
  validateProxyPool: (deps?: any) => Promise<any[]>;
  _setEgressProbeForTests: (fn: any) => void;
  clearEgressCache: () => void;
};
const { validateProxyPool, planProxyDistribution, applyProxyDistribution } = egress as any;

test("resolveEgressIp returns the probed IP and caches by proxy URL", async () => {
  clearEgressCache();
  let calls = 0;
  _setEgressProbeForTests(async (proxyUrl: string | null) => {
    calls++;
    return { ip: proxyUrl ? "203.0.113.7" : "198.51.100.1", latencyMs: 5 };
  });

  const viaProxy = await resolveEgressIp("http://1.2.3.4:8080");
  assert.equal(viaProxy.ip, "203.0.113.7");
  assert.equal(viaProxy.cached, false);

  const direct = await resolveEgressIp(null);
  assert.equal(direct.ip, "198.51.100.1");

  // second call for the same proxy URL is served from cache (no extra probe)
  const again = await resolveEgressIp("http://1.2.3.4:8080");
  assert.equal(again.cached, true);
  assert.equal(calls, 2, "only 2 distinct probes (proxy + direct), not 3");

  _setEgressProbeForTests(null);
});

test("analyzeEgressSharing flags ≥2 same-rotation-group accounts on one egress IP", () => {
  const result = analyzeEgressSharing([
    { connectionId: "a", provider: "codex", account: "acc-a", proxyLevel: "direct", proxyHost: null, egressIp: "100.115.194.84" },
    { connectionId: "b", provider: "codex", account: "acc-b", proxyLevel: "direct", proxyHost: null, egressIp: "100.115.194.84" },
    { connectionId: "c", provider: "openai", account: "acc-c", proxyLevel: "direct", proxyHost: null, egressIp: "100.115.194.84" },
    { connectionId: "d", provider: "claude", account: "acc-d", proxyLevel: "direct", proxyHost: null, egressIp: "100.115.194.84" },
  ]);

  // codex + openai share the openai-auth0 family → 3 accounts on one IP = warning
  const warn = result.sharedWithinRotationGroup.find((w) => w.rotationGroup === "openai-auth0");
  assert.ok(warn, "must warn about the codex/openai family sharing an egress IP");
  assert.equal(warn!.egressIp, "100.115.194.84");
  assert.equal(warn!.connections.length, 3, "acc-a + acc-b + acc-c");

  // claude alone on the IP is NOT a warning (different family, single account)
  assert.ok(
    !result.sharedWithinRotationGroup.some((w) => w.connections.includes("acc-d")),
    "a lone claude account must not be flagged"
  );

  assert.deepEqual(result.byEgressIp["100.115.194.84"].sort(), ["acc-a", "acc-b", "acc-c", "acc-d"]);
});

test("analyzeEgressSharing: distinct IPs per account = no warning (the healthy .17 case)", () => {
  const result = analyzeEgressSharing([
    { connectionId: "a", provider: "codex", account: "acc-a", proxyLevel: "account", proxyHost: "p1", egressIp: "203.0.113.1" },
    { connectionId: "b", provider: "codex", account: "acc-b", proxyLevel: "account", proxyHost: "p2", egressIp: "203.0.113.2" },
  ]);
  assert.equal(result.sharedWithinRotationGroup.length, 0, "1 IP per account is safe");
});

test("diagnoseAllEgressIps wires resolution + probe and surfaces the shared-IP warning", async () => {
  clearEgressCache();
  _setEgressProbeForTests(async () => ({ ip: "100.115.194.84", latencyMs: 3 }));

  const diag = await diagnoseAllEgressIps({
    getConnections: async () => [
      { id: "c1", provider: "codex", email: "one@x.com" },
      { id: "c2", provider: "codex", email: "two@x.com" },
    ],
    resolveProxy: async () => ({ proxy: { type: "http", host: "9.9.9.9", port: 8080 }, level: "global" }),
  });

  assert.equal(diag.connections.length, 2);
  assert.equal(diag.connections[0].egressIp, "100.115.194.84");
  assert.equal(diag.connections[0].proxyLevel, "global");
  assert.equal(diag.sharedWithinRotationGroup.length, 1, "both codex accounts share one egress IP");
  assert.equal(diag.sharedWithinRotationGroup[0].connections.length, 2);

  _setEgressProbeForTests(null);
});

test("validateProxyPool marks live proxies active and dead proxies error", async () => {
  clearEgressCache();
  // proxy p-live reaches the internet; p-dead times out
  _setEgressProbeForTests(async (proxyUrl: string | null) => {
    if (proxyUrl && proxyUrl.includes("9.9.9.9")) return { ip: "203.0.113.9", latencyMs: 12 };
    return { ip: null, latencyMs: 7000, error: "timeout" };
  });

  const marked: Record<string, string> = {};
  const report = await validateProxyPool({
    listProxies: async () => [
      { id: "p-live", type: "http", host: "9.9.9.9", port: 8080, status: "error" },
      { id: "p-dead", type: "http", host: "1.1.1.1", port: 8080, status: "active" },
    ],
    markStatus: async (id: string, status: string) => {
      marked[id] = status;
    },
  });

  assert.equal(marked["p-live"], "active", "a reachable proxy must be (re)marked active");
  assert.equal(marked["p-dead"], "error", "an unreachable proxy must be marked error (so resolution skips it)");

  const live = report.find((r) => r.proxyId === "p-live");
  assert.equal(live!.alive, true);
  assert.equal(live!.egressIp, "203.0.113.9");
  assert.equal(live!.previousStatus, "error");
  const dead = report.find((r) => r.proxyId === "p-dead");
  assert.equal(dead!.alive, false);
  assert.equal(dead!.previousStatus, "active", "was wrongly active before validation");

  _setEgressProbeForTests(null);
});

test("planProxyDistribution: strict 1:1, extras left unassigned (no shared IP)", () => {
  const plan = planProxyDistribution(
    [{ id: "c1", account: "a1" }, { id: "c2", account: "a2" }, { id: "c3", account: "a3" }],
    ["p1", "p2"]
  );
  assert.equal(plan.assignments.length, 2);
  assert.deepEqual(plan.assignments.map((a: any) => a.proxyId), ["p1", "p2"]);
  assert.equal(plan.unassigned.length, 1, "c3 has no proxy → unassigned, not sharing");
  assert.equal(plan.unassigned[0].connectionId, "c3");
  assert.equal(plan.sharingRisk, false);
});

test("planProxyDistribution: enough proxies → 1 distinct per account", () => {
  const plan = planProxyDistribution(
    [{ id: "c1", account: "a1" }, { id: "c2", account: "a2" }],
    ["p1", "p2", "p3"]
  );
  assert.equal(plan.assignments.length, 2);
  assert.equal(plan.unassigned.length, 0);
  assert.match(plan.note, /1 distinct proxy/);
});

test("planProxyDistribution: allowSharing round-robins and flags sharingRisk", () => {
  const plan = planProxyDistribution(
    [{ id: "c1", account: "a1" }, { id: "c2", account: "a2" }, { id: "c3", account: "a3" }],
    ["p1", "p2"],
    { allowSharing: true }
  );
  assert.equal(plan.assignments.length, 3);
  assert.deepEqual(plan.assignments.map((a: any) => a.proxyId), ["p1", "p2", "p1"]);
  assert.equal(plan.sharingRisk, true);
});

test("planProxyDistribution: no live proxies → all unassigned with guidance", () => {
  const plan = planProxyDistribution([{ id: "c1", account: "a1" }], []);
  assert.equal(plan.assignments.length, 0);
  assert.equal(plan.unassigned.length, 1);
  assert.match(plan.note, /No live proxies/);
});

test("applyProxyDistribution assigns each proxy to its connection", async () => {
  const calls: Array<[string, string]> = [];
  const plan = planProxyDistribution(
    [{ id: "c1", account: "a1" }, { id: "c2", account: "a2" }],
    ["p1", "p2"]
  );
  const res = await applyProxyDistribution(plan, {
    assign: async (connectionId: string, proxyId: string) => {
      calls.push([connectionId, proxyId]);
    },
  });
  assert.equal(res.applied, 2);
  assert.deepEqual(calls, [["c1", "p1"], ["c2", "p2"]]);
});
