import test from "node:test";
import assert from "node:assert/strict";

// #6696 — the combo builder's "pin a specific account" feature for fingerprint
// providers (formerly the keyless OpenCode provider, now removed) builds a composite connectionId of the
// form `${rowId}|fp|${fingerprint}` (src/lib/combos/builderOptions.ts:251), but
// nothing in the combo execution path ever splits that composite id back into
// a real rowId + a selected fingerprint. This test proves the pin is inert:
// once a combo step is configured with the composite id produced by the
// builder, `expandTargetsByFingerprints` (the function combo.ts calls right
// before target resolution/credential lookup) cannot find the connection in
// `connectionById` (which is keyed by the real DB row id) and silently passes
// the target through UNCHANGED, still carrying the bogus composite
// connectionId. Downstream, `getProviderCredentials`'s `forcedConnectionId`
// filter (src/sse/services/auth.ts) also can never match `conn.id ===
// "<rowId>|fp|<fingerprint>"` against a real row id — so the pinned target
// never resolves to real credentials for the intended (or ANY) account and
// the combo step is effectively dead weight instead of a working, fail-over-
// capable target.

const { expandTargetsByFingerprints } =
  await import("../../open-sse/services/combo/fingerprintExpansion.ts");

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

test("#6696: composite connectionId never matches connectionById (root cause of the inert pin)", () => {
  const realConnectionId = "conn-1";
  const conn = {
    id: realConnectionId,
    provider: "opencode",
    providerSpecificData: { fingerprints: ["fp-aaa", "fp-bbb"] },
  };
  const connById = new Map([[realConnectionId, conn]]);
  const compositeConnectionId = `${realConnectionId}|fp|fp-aaa`;

  assert.equal(
    connById.get(compositeConnectionId),
    undefined,
    "composite fp-pin id must not resolve directly against connectionById"
  );
});

test("#6696: non-fingerprint providers are unaffected by the |fp| split", () => {
  const connById = new Map([
    ["conn-1", { id: "conn-1", provider: "openai", providerSpecificData: {} }],
  ]);
  const targets = [
    makeTarget({ provider: "openai", modelStr: "openai/gpt-4", connectionId: "conn-1|fp|fp-aaa" }),
  ];

  const result = expandTargetsByFingerprints(targets, connById, (t) => t.provider);

  assert.equal(result.length, 1);
  // Non-fingerprint providers are passed through unchanged — the literal
  // string (however unusual) is left alone since this provider never goes
  // through the fingerprint-pin UI flow.
  assert.equal(result[0].connectionId, "conn-1|fp|fp-aaa");
});
