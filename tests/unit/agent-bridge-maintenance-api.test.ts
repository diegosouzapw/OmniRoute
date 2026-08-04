/**
 * Client-side fetch helpers that the AgentBridge maintenance card uses to drive
 * the already-shipped backend routes (#4084 repair + DELETE cert, #4093
 * diagnose, #4094 config import/export). Pure integration logic — no DOM — so
 * it is unit-testable by stubbing global.fetch: each helper must parse the
 * success body and surface the sanitized server error message on !res.ok.
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  runDiagnose,
  removeCaCert,
  repairMitmState,
  fetchAgentBridgeConfig,
  importAgentBridgeConfig,
} = await import("../../src/lib/inspector/agentBridgeMaintenanceApi.ts");

type FetchCall = { url: string; init?: RequestInit };

function stubFetch(handler: (call: FetchCall) => { ok: boolean; status?: number; body: unknown }) {
  const calls: FetchCall[] = [];
  const original = global.fetch;
  global.fetch = (async (url: string, init?: RequestInit) => {
    const call = { url: String(url), init };
    calls.push(call);
    const { ok, status = ok ? 200 : 500, body } = handler(call);
    return {
      ok,
      status,
      json: async () => body,
    } as unknown as Response;
  }) as typeof fetch;
  return {
    calls,
    restore() {
      global.fetch = original;
    },
  };
}

test("runDiagnose returns the report and hits GET /diagnose", async () => {
  const report = { healthy: false, checks: [{ name: "cert-trusted", ok: false, hint: "trust it" }], port: 443 };
  const f = stubFetch(() => ({ ok: true, body: report }));
  try {
    const result = await runDiagnose();
    assert.equal(result.healthy, false);
    assert.equal(result.port, 443);
    assert.equal(result.checks[0].name, "cert-trusted");
    assert.equal(f.calls[0].url, "/api/tools/agent-bridge/diagnose");
  } finally {
    f.restore();
  }
});

test("removeCaCert DELETEs /cert and returns trusted flag", async () => {
  const f = stubFetch(() => ({ ok: true, body: { ok: true, trusted: false } }));
  try {
    const result = await removeCaCert();
    assert.equal(result.trusted, false);
    assert.equal(f.calls[0].url, "/api/tools/agent-bridge/cert");
    assert.equal(f.calls[0].init?.method, "DELETE");
  } finally {
    f.restore();
  }
});

test("repairMitmState POSTs /repair and returns the repaired list", async () => {
  const f = stubFetch(() => ({ ok: true, body: { ok: true, repaired: ["dns", "system-proxy"] } }));
  try {
    const result = await repairMitmState();
    assert.deepEqual(result.repaired, ["dns", "system-proxy"]);
    assert.equal(f.calls[0].url, "/api/tools/agent-bridge/repair");
    assert.equal(f.calls[0].init?.method, "POST");
    assert.equal(f.calls[0].init?.body, JSON.stringify({}));
  } finally {
    f.restore();
  }
});

test("repairMitmState forwards sudoPassword in the POST body", async () => {
  const f = stubFetch(() => ({ ok: true, body: { ok: true, repaired: ["dns"] } }));
  try {
    await repairMitmState("hunter2");
    assert.equal(f.calls[0].init?.body, JSON.stringify({ sudoPassword: "hunter2" }));
  } finally {
    f.restore();
  }
});

test("removeCaCert forwards sudoPassword in the DELETE body", async () => {
  const f = stubFetch(() => ({ ok: true, body: { ok: true, trusted: false } }));
  try {
    await removeCaCert("hunter2");
    assert.equal(f.calls[0].init?.body, JSON.stringify({ sudoPassword: "hunter2" }));
  } finally {
    f.restore();
  }
});

test("fetchAgentBridgeConfig GETs /config and returns the portable blob", async () => {
  const cfg = { version: 1, bypassPatterns: ["*.corp"], customHosts: [], agentMappings: {} };
  const f = stubFetch(() => ({ ok: true, body: cfg }));
  try {
    const result = await fetchAgentBridgeConfig();
    assert.equal(result.version, 1);
    assert.deepEqual(result.bypassPatterns, ["*.corp"]);
    assert.equal(f.calls[0].url, "/api/tools/agent-bridge/config");
  } finally {
    f.restore();
  }
});

test("importAgentBridgeConfig POSTs the config and returns the counts", async () => {
  const cfg = { version: 1 as const, bypassPatterns: ["*.corp"], customHosts: [], agentMappings: {} };
  const f = stubFetch(() => ({ ok: true, body: { ok: true, bypassPatterns: 1, customHosts: 0, agents: 0 } }));
  try {
    const result = await importAgentBridgeConfig(cfg);
    assert.equal(result.bypassPatterns, 1);
    assert.equal(f.calls[0].url, "/api/tools/agent-bridge/config");
    assert.equal(f.calls[0].init?.method, "POST");
    assert.equal(JSON.parse(String(f.calls[0].init?.body)).version, 1);
  } finally {
    f.restore();
  }
});

test("each helper surfaces the sanitized server error message on !res.ok", async () => {
  const f = stubFetch(() => ({ ok: false, status: 400, body: { error: { message: "Invalid AgentBridge config" } } }));
  try {
    await assert.rejects(() => importAgentBridgeConfig({ version: 1, bypassPatterns: [], customHosts: [], agentMappings: {} }), /Invalid AgentBridge config/);
  } finally {
    f.restore();
  }
});

test("helpers fall back to HTTP status when the error body has no message", async () => {
  const f = stubFetch(() => ({ ok: false, status: 503, body: null }));
  try {
    await assert.rejects(() => repairMitmState(), /HTTP 503/);
  } finally {
    f.restore();
  }
});
