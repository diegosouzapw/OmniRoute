import test from "node:test";
import assert from "node:assert/strict";

const { normalizeAgentBridgeState, DEFAULT_AGENT_BRIDGE_STATE } = await import(
  "../../src/app/(dashboard)/dashboard/tools/agent-bridge/normalizeState.ts"
);

// #3318: the /api/tools/agent-bridge/state route returns `{ server, agents }`,
// but the page/components read `{ serverState, agentStates, bypassPatterns,
// mappings }`. The page replaced its well-shaped default with the raw response,
// so `serverState` became undefined → `serverState.running` crashed the page
// with the full "Internal Server Error" boundary. The normalizer must always
// return a well-shaped object (never an undefined serverState), mapping the
// known server fields through.

test("the raw /state route shape lacks the keys the page reads (documents the bug)", () => {
  const routeShape = {
    server: { running: true, pid: 123, dnsConfigured: true, certExists: true },
    agents: [{ id: "claude-code", name: "Claude Code", hosts: [], viability: "ok" }],
  };
  // This is exactly what the old code assigned straight into initialData.
  assert.equal(routeShape.serverState, undefined);
});

test("normalizeAgentBridgeState maps the route shape and never leaves serverState undefined (#3318)", () => {
  const routeShape = {
    server: { running: true, pid: 123, dnsConfigured: true, certExists: true },
    agents: [{ id: "claude-code", name: "Claude Code", hosts: [], viability: "ok" }],
  };
  const result = normalizeAgentBridgeState(routeShape);

  assert.ok(result.serverState, "serverState must be defined");
  assert.equal(result.serverState.running, true, "server.running maps through");
  assert.equal(result.serverState.certTrusted, true, "server.certExists -> certTrusted");
  assert.ok(Array.isArray(result.agentStates), "agentStates is always an array");
  assert.ok(Array.isArray(result.bypassPatterns), "bypassPatterns is always an array");
  assert.equal(typeof result.mappings, "object", "mappings is always an object");
});

test("normalizeAgentBridgeState falls back to safe defaults for empty/garbage input", () => {
  for (const bad of [null, undefined, {}, 42, "x", []]) {
    const result = normalizeAgentBridgeState(bad);
    assert.ok(result.serverState, `serverState defined for ${JSON.stringify(bad)}`);
    assert.equal(result.serverState.running, false);
    assert.ok(Array.isArray(result.agentStates));
    assert.ok(Array.isArray(result.bypassPatterns));
    assert.equal(typeof result.mappings, "object");
  }
});

test("normalizeAgentBridgeState passes a correctly-shaped payload through intact", () => {
  const correct = {
    ...DEFAULT_AGENT_BRIDGE_STATE,
    serverState: { ...DEFAULT_AGENT_BRIDGE_STATE.serverState, running: true, port: 8443 },
    agentStates: [
      {
        agent_id: "claude-code",
        dns_enabled: true,
        cert_trusted: true,
        setup_completed: true,
        last_started_at: null,
        last_error: null,
      },
    ],
    bypassPatterns: ["*.internal"],
    mappings: { "claude-code": [] },
  };
  const result = normalizeAgentBridgeState(correct);
  assert.equal(result.serverState.running, true);
  assert.equal(result.serverState.port, 8443);
  assert.equal(result.agentStates.length, 1);
  assert.equal(result.agentStates[0].agent_id, "claude-code");
  assert.deepEqual(result.bypassPatterns, ["*.internal"]);
});
