import test from "node:test";
import assert from "node:assert/strict";

// #5521 — A fingerprint-provider connection with multiple fingerprints in
// provider_specific_data.fingerprints was treated as a single combo target,
// so only one fingerprint (one IP) was used per request. The combo system
// expands each fingerprint into its own target so all of them participate in
// the round-robin. Its last member, the keyless OpenCode provider, was removed
// (docs/reference/REMOVED_PROVIDERS.md), so only the provider-independent
// helpers and the pass-through paths are exercised here.

const {
  isFingerprintProvider,
  getConnectionFingerprints,
  hasMultipleFingerprints,
  buildFingerprintExecutionKey,
  expandTargetsByFingerprints,
} = await import("../../open-sse/services/combo/fingerprintExpansion.ts");

// ── isFingerprintProvider ────────────────────────────────────────────────────

test("isFingerprintProvider: the removed keyless opencode provider returns false", () => {
  // OpenCode Free (its last member) was removed — docs/reference/REMOVED_PROVIDERS.md.
  assert.equal(isFingerprintProvider("opencode"), false);
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
    modelStr: "opencode/kimi-k2",
    provider: "opencode",
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
    provider: "opencode",
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

test("expandTargetsByFingerprints: connection not found in map passes through", () => {
  const targets = [makeTarget({ connectionId: "conn-missing" })];
  const connById = new Map<string, Record<string, unknown>>();
  const result = expandTargetsByFingerprints(targets, connById, (t) => t.provider);
  assert.equal(result.length, 1);
  assert.equal(result[0].connectionId, "conn-missing");
});

test("expandTargetsByFingerprints: empty input returns empty array", () => {
  const connById = new Map<string, Record<string, unknown>>();
  const result = expandTargetsByFingerprints([], connById, (t) => t.provider);
  assert.equal(result.length, 0);
});
