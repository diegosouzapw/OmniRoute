/**
 * Pool validation must preserve operator/health statuses.
 *
 * Validating the pool rewrites only the transient active <-> error pair. A
 * proxy set aside as `inactive` (operator) or marked `dead` (health) keeps its
 * status even when the probe result disagrees — the probe still runs so the
 * report keeps the alive/egressIp signal.
 */
import test from "node:test";
import assert from "node:assert/strict";

const egress = await import("../../src/lib/proxyEgress.ts");
const { validateProxyPool, _setEgressProbeForTests, clearEgressCache } = egress;

type Deps = NonNullable<Parameters<typeof validateProxyPool>[0]>;
type ProxyRow = { id: string; type: string; host: string; port: number; status?: string | null };
type MarkCall = { id: string; status: string };

const LIVE_IP = "198.51.100.21";

function liveOrDeadProbe(
  proxyUrl: string | null
): Promise<{ ip: string | null; latencyMs: number; error?: string }> {
  if (proxyUrl && proxyUrl.includes("-up.")) return Promise.resolve({ ip: LIVE_IP, latencyMs: 4 });
  return Promise.resolve({ ip: null, latencyMs: 7000, error: "timeout" });
}

function proxyRow(id: string, status: string | null, live: boolean): ProxyRow {
  return { id, type: "http", host: `${id}-${live ? "up" : "down"}.local`, port: 8080, status };
}

test.afterEach(() => {
  _setEgressProbeForTests(null);
  clearEgressCache();
});

test("validateProxyPool rewrites active/error but preserves inactive/dead", async () => {
  clearEgressCache();
  _setEgressProbeForTests(liveOrDeadProbe);

  const cases: Array<{
    previous: string | null;
    live: boolean;
    expectWrite: string | null;
    expectNewStatus: string;
    expectPreserved: boolean;
  }> = [
    {
      previous: "active",
      live: true,
      expectWrite: "active",
      expectNewStatus: "active",
      expectPreserved: false,
    },
    {
      previous: "active",
      live: false,
      expectWrite: "error",
      expectNewStatus: "error",
      expectPreserved: false,
    },
    {
      previous: "error",
      live: true,
      expectWrite: "active",
      expectNewStatus: "active",
      expectPreserved: false,
    },
    {
      previous: "error",
      live: false,
      expectWrite: "error",
      expectNewStatus: "error",
      expectPreserved: false,
    },
    {
      previous: "inactive",
      live: true,
      expectWrite: null,
      expectNewStatus: "inactive",
      expectPreserved: true,
    },
    {
      previous: "inactive",
      live: false,
      expectWrite: null,
      expectNewStatus: "inactive",
      expectPreserved: true,
    },
    {
      previous: "dead",
      live: true,
      expectWrite: null,
      expectNewStatus: "dead",
      expectPreserved: true,
    },
    {
      previous: "dead",
      live: false,
      expectWrite: null,
      expectNewStatus: "dead",
      expectPreserved: true,
    },
    // Mixed casing still matches, original casing echoed back.
    {
      previous: "Inactive",
      live: true,
      expectWrite: null,
      expectNewStatus: "Inactive",
      expectPreserved: true,
    },
    // Unknown status routes to the rewritable branch and gets written.
    {
      previous: null,
      live: true,
      expectWrite: "active",
      expectNewStatus: "active",
      expectPreserved: false,
    },
  ];

  const listProxies: Deps["listProxies"] = async () =>
    cases.map((c, i) => proxyRow(`case-${i}`, c.previous, c.live));
  const calls: MarkCall[] = [];
  const markStatus: Deps["markStatus"] = async (id, status) => {
    calls.push({ id, status });
  };

  const report = await validateProxyPool({ listProxies, markStatus });

  assert.equal(report.length, cases.length);
  for (let i = 0; i < cases.length; i++) {
    const row = report[i];
    const c = cases[i];
    assert.equal(row.proxyId, `case-${i}`);
    assert.equal(row.previousStatus, c.previous);
    assert.equal(row.alive, c.live);
    assert.equal(row.newStatus, c.expectNewStatus);
    assert.equal(row.preserved, c.expectPreserved);
    assert.equal(
      row.egressIp,
      c.live ? LIVE_IP : null,
      "probe signal is reported even for preserved rows"
    );
  }

  const expectedWrites = cases.filter((c) => c.expectWrite !== null).length;
  assert.equal(calls.length, expectedWrites, "markStatus runs only for rewritable rows");
  for (let i = 0; i < cases.length; i++) {
    const expected = cases[i].expectWrite;
    if (expected === null) {
      assert.ok(
        !calls.some((c) => c.id === `case-${i}`),
        `preserved row case-${i} must not be rewritten`
      );
    } else {
      assert.equal(calls.find((c) => c.id === `case-${i}`)?.status, expected);
    }
  }
});

test("validateProxyPool on a mixed pool leaves operator/health statuses intact", async () => {
  clearEgressCache();
  _setEgressProbeForTests(liveOrDeadProbe);

  const listProxies: Deps["listProxies"] = async () => [
    proxyRow("pool-active", "active", true),
    proxyRow("pool-error", "error", false),
    proxyRow("pool-inactive", "inactive", true),
    proxyRow("pool-dead", "dead", true),
  ];
  const calls: MarkCall[] = [];
  const markStatus: Deps["markStatus"] = async (id, status) => {
    calls.push({ id, status });
  };

  const report = await validateProxyPool({ listProxies, markStatus });

  const byId = new Map(report.map((r) => [r.proxyId, r]));
  assert.equal(byId.get("pool-active")?.newStatus, "active");
  assert.equal(byId.get("pool-active")?.preserved, false);
  assert.equal(byId.get("pool-error")?.newStatus, "error");
  assert.equal(byId.get("pool-error")?.preserved, false);
  assert.equal(byId.get("pool-inactive")?.newStatus, "inactive");
  assert.equal(byId.get("pool-inactive")?.preserved, true);
  assert.equal(byId.get("pool-inactive")?.alive, true);
  assert.equal(byId.get("pool-inactive")?.egressIp, LIVE_IP);
  assert.equal(byId.get("pool-dead")?.newStatus, "dead");
  assert.equal(byId.get("pool-dead")?.preserved, true);
  assert.equal(byId.get("pool-dead")?.alive, true);
  assert.equal(byId.get("pool-dead")?.egressIp, LIVE_IP);

  assert.deepEqual(
    calls.map((c) => c.id).sort(),
    ["pool-active", "pool-error"],
    "only rewritable rows are persisted"
  );
});
