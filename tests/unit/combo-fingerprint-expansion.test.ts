import test from "node:test";
import assert from "node:assert/strict";

// #5521 — A mimocode connection with multiple fingerprints in
// provider_specific_data.fingerprints was treated as a single combo target,
// so only one fingerprint (one IP) was used per request.  The combo system
// must now expand each fingerprint into its own target so all of them
// participate in the round-robin.

const {
  isFingerprintProvider,
  getConnectionFingerprints,
  hasMultipleFingerprints,
  buildFingerprintExecutionKey,
  expandTargetsByFingerprints,
} = await import("../../open-sse/services/combo/fingerprintExpansion.ts");

// ── isFingerprintProvider ────────────────────────────────────────────────────

test("isFingerprintProvider: mimocode returns true", () => {
  assert.equal(isFingerprintProvider("mimocode"), true);
});

test("isFingerprintProvider: mcode returns true", () => {
  assert.equal(isFingerprintProvider("mcode"), true);
});

test("isFingerprintProvider: opencode returns true", () => {
  assert.equal(isFingerprintProvider("opencode"), true);
});

test("isFingerprintProvider: openai returns false", () => {
  assert.equal(isFingerprintProvider("openai"), false);
});

test("isFingerprintProvider: anthropic returns false", () => {
  assert.equal(isFingerprintProvider("anthropic"), false);
});

test("isFingerprintProvider: empty string returns false", () => {
  assert.equal(isFingerprintProvider(""), false);
});

// ── getConnectionFingerprints ────────────────────────────────────────────────

test("getConnectionFingerprints: extracts valid fingerprint strings", () => {
  const conn = {
    providerSpecificData: {
      fingerprints: ["fp-aaa", "fp-bbb", "fp-ccc"],
    },
  };
  assert.deepEqual(getConnectionFingerprints(conn), ["fp-aaa", "fp-bbb", "fp-ccc"]);
});

test("getConnectionFingerprints: filters out non-string entries", () => {
  const conn = {
    providerSpecificData: {
      fingerprints: ["fp-aaa", null, 123, "fp-bbb", undefined],
    },
  };
  assert.deepEqual(getConnectionFingerprints(conn), ["fp-aaa", "fp-bbb"]);
});

test("getConnectionFingerprints: filters out empty strings", () => {
  const conn = {
    providerSpecificData: {
      fingerprints: ["fp-aaa", "", "  ", "fp-bbb"],
    },
  };
  assert.deepEqual(getConnectionFingerprints(conn), ["fp-aaa", "fp-bbb"]);
});

test("getConnectionFingerprints: returns empty array for null connection", () => {
  assert.deepEqual(getConnectionFingerprints(null), []);
});

test("getConnectionFingerprints: returns empty array for undefined", () => {
  assert.deepEqual(getConnectionFingerprints(undefined), []);
});

test("getConnectionFingerprints: returns empty array when no providerSpecificData", () => {
  assert.deepEqual(getConnectionFingerprints({}), []);
});

test("getConnectionFingerprints: returns empty array when no fingerprints field", () => {
  assert.deepEqual(getConnectionFingerprints({ providerSpecificData: {} }), []);
});

test("getConnectionFingerprints: returns empty array when fingerprints is not an array", () => {
  assert.deepEqual(
    getConnectionFingerprints({ providerSpecificData: { fingerprints: "not-array" } }),
    []
  );
});

// ── hasMultipleFingerprints ──────────────────────────────────────────────────

test("hasMultipleFingerprints: true when 2+ fingerprints", () => {
  const conn = { providerSpecificData: { fingerprints: ["fp-1", "fp-2"] } };
  assert.equal(hasMultipleFingerprints(conn), true);
});

test("hasMultipleFingerprints: false when exactly 1 fingerprint", () => {
  const conn = { providerSpecificData: { fingerprints: ["fp-1"] } };
  assert.equal(hasMultipleFingerprints(conn), false);
});

test("hasMultipleFingerprints: false when 0 fingerprints", () => {
  const conn = { providerSpecificData: { fingerprints: [] } };
  assert.equal(hasMultipleFingerprints(conn), false);
});

test("hasMultipleFingerprints: false for null connection", () => {
  assert.equal(hasMultipleFingerprints(null), false);
});

// ── buildFingerprintExecutionKey ─────────────────────────────────────────────

test("buildFingerprintExecutionKey: first fingerprint keeps original key", () => {
  assert.equal(buildFingerprintExecutionKey("step-0", "fp-aaa", true), "step-0");
});

test("buildFingerprintExecutionKey: non-first fingerprint appends fp: suffix", () => {
  assert.equal(buildFingerprintExecutionKey("step-0", "fp-bbb", false), "step-0@fp:fp-bbb");
});

test("buildFingerprintExecutionKey: long fingerprint is preserved verbatim", () => {
  const longFp = "a".repeat(64);
  assert.equal(buildFingerprintExecutionKey("key", longFp, false), `key@fp:${longFp}`);
});

// ── expandTargetsByFingerprints ──────────────────────────────────────────────

function makeTarget(overrides: Record<string, unknown> = {}) {
  return {
    kind: "model" as const,
    stepId: "step-0",
    executionKey: "step-0",
    modelStr: "mimocode/mimo-auto",
    provider: "mimocode",
    providerId: null,
    connectionId: "conn-1",
    weight: 0,
    label: null,
    ...overrides,
  };
}

function makeConnection(fps: string[]) {
  return {
    id: "conn-1",
    provider: "mimocode",
    providerSpecificData: { fingerprints: fps },
  };
}

test("expandTargetsByFingerprints: non-fingerprint provider passes through", () => {
  const targets = [makeTarget({ provider: "openai", modelStr: "openai/gpt-4o" })];
  const connById = new Map<string, Record<string, unknown>>();
  const result = expandTargetsByFingerprints(targets, connById, (t) => t.provider);
  assert.equal(result.length, 1);
  assert.equal(result[0].executionKey, "step-0");
});

test("expandTargetsByFingerprints: target with no connectionId passes through", () => {
  const targets = [makeTarget({ connectionId: null })];
  const connById = new Map<string, Record<string, unknown>>();
  const result = expandTargetsByFingerprints(targets, connById, (t) => t.provider);
  assert.equal(result.length, 1);
  assert.equal(result[0].connectionId, null);
});

test("expandTargetsByFingerprints: single fingerprint passes through", () => {
  const conn = makeConnection(["fp-aaa"]);
  const targets = [makeTarget()];
  const connById = new Map([["conn-1", conn]]);
  const result = expandTargetsByFingerprints(targets, connById, (t) => t.provider);
  assert.equal(result.length, 1);
  assert.equal(result[0].executionKey, "step-0");
});

test("expandTargetsByFingerprints: 10 fingerprints expands to 10 targets", () => {
  const fps = Array.from({ length: 10 }, (_, i) => `fp-${String(i).padStart(2, "0")}`);
  const conn = makeConnection(fps);
  const targets = [makeTarget()];
  const connById = new Map([["conn-1", conn]]);
  const result = expandTargetsByFingerprints(targets, connById, (t) => t.provider);
  assert.equal(result.length, 10);
  assert.equal(result[0].executionKey, "step-0");
  for (let i = 1; i < 10; i++) {
    assert.equal(result[i].executionKey, `step-0@fp:fp-${String(i).padStart(2, "0")}`);
  }
});

test("expandTargetsByFingerprints: preserves all target properties across copies", () => {
  const fps = ["fp-aaa", "fp-bbb", "fp-ccc"];
  const conn = makeConnection(fps);
  const targets = [
    makeTarget({ connectionId: "conn-1", modelStr: "mimocode/mimo-auto", weight: 5 }),
  ];
  const connById = new Map([["conn-1", conn]]);
  const result = expandTargetsByFingerprints(targets, connById, (t) => t.provider);
  assert.equal(result.length, 3);
  for (const r of result) {
    assert.equal(r.kind, "model");
    assert.equal(r.connectionId, "conn-1");
    assert.equal(r.modelStr, "mimocode/mimo-auto");
    assert.equal(r.provider, "mimocode");
    assert.equal(r.weight, 5);
  }
});

test("expandTargetsByFingerprints: connection not found in map passes through", () => {
  const targets = [makeTarget({ connectionId: "conn-missing" })];
  const connById = new Map<string, Record<string, unknown>>();
  const result = expandTargetsByFingerprints(targets, connById, (t) => t.provider);
  assert.equal(result.length, 1);
  assert.equal(result[0].connectionId, "conn-missing");
});

test("expandTargetsByFingerprints: mixed providers expand only fingerprint ones", () => {
  const fps = ["fp-1", "fp-2"];
  const conn = makeConnection(fps);
  const targets = [
    makeTarget({ provider: "openai", modelStr: "openai/gpt-4o", connectionId: "conn-oai" }),
    makeTarget({ connectionId: "conn-1" }),
  ];
  const connById = new Map([
    ["conn-1", conn],
    ["conn-oai", { id: "conn-oai", provider: "openai", providerSpecificData: {} }],
  ]);
  const result = expandTargetsByFingerprints(targets, connById, (t) => t.provider);
  assert.equal(result.length, 3);
  assert.equal(result[0].executionKey, "step-0");
  assert.equal(result[1].executionKey, "step-0");
  assert.equal(result[2].executionKey, "step-0@fp:fp-2");
});

test("expandTargetsByFingerprints: empty input returns empty array", () => {
  const connById = new Map<string, Record<string, unknown>>();
  const result = expandTargetsByFingerprints([], connById, (t) => t.provider);
  assert.equal(result.length, 0);
});

test("expandTargetsByFingerprints: mcode provider expands correctly", () => {
  const fps = ["mfp-1", "mfp-2", "mfp-3"];
  const conn = {
    id: "conn-m",
    provider: "mcode",
    providerSpecificData: { fingerprints: fps },
  };
  const targets = [
    makeTarget({ provider: "mcode", modelStr: "mcode/auto", connectionId: "conn-m" }),
  ];
  const connById = new Map([["conn-m", conn]]);
  const result = expandTargetsByFingerprints(targets, connById, (t) => t.provider);
  assert.equal(result.length, 3);
  assert.equal(result[0].executionKey, "step-0");
  assert.equal(result[1].executionKey, "step-0@fp:mfp-2");
  assert.equal(result[2].executionKey, "step-0@fp:mfp-3");
});

test("expandTargetsByFingerprints: multiple targets each expand independently", () => {
  const conn1 = makeConnection(["fp-a1", "fp-a2"]);
  const conn2 = makeConnection(["fp-b1", "fp-b2", "fp-b3"]);
  const targets = [
    makeTarget({ stepId: "step-0", executionKey: "step-0", connectionId: "conn-1" }),
    makeTarget({ stepId: "step-1", executionKey: "step-1", connectionId: "conn-1" }),
  ];
  const connById = new Map([["conn-1", conn1]]);
  const result = expandTargetsByFingerprints(targets, connById, (t) => t.provider);
  assert.equal(result.length, 4);
  assert.equal(result[0].executionKey, "step-0");
  assert.equal(result[1].executionKey, "step-0@fp:fp-a2");
  assert.equal(result[2].executionKey, "step-1");
  assert.equal(result[3].executionKey, "step-1@fp:fp-a2");
});
