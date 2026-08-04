import test from "node:test";
import assert from "node:assert/strict";

// #6696 — the combo builder's "pin a specific account" feature for fingerprint
// providers (mimocode/mcode/opencode) builds a composite connectionId of the
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

const { expandTargetsByFingerprints } = await import(
  "../../open-sse/services/combo/fingerprintExpansion.ts"
);

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

test("#6696: fp-pinned composite connectionId is never resolved to the real connection + fingerprint", () => {
  const realConnectionId = "conn-1";
  const conn = {
    id: realConnectionId,
    provider: "mimocode",
    providerSpecificData: { fingerprints: ["fp-aaa", "fp-bbb"] },
  };
  const connById = new Map([[realConnectionId, conn]]);

  // Exactly what the combo builder UI persists for a step pinned to
  // "Account 1" — src/lib/combos/builderOptions.ts:251:
  //   id: `${connection.id}|fp|${fingerprints[i]}`
  const pinnedFingerprint = "fp-aaa";
  const compositeConnectionId = `${realConnectionId}|fp|${pinnedFingerprint}`;

  const targets = [makeTarget({ connectionId: compositeConnectionId })];

  const result = expandTargetsByFingerprints(targets, connById, (t) => t.provider);

  assert.equal(result.length, 1, "pin should resolve to exactly one target");

  // This is what SHOULD hold once fixed: connectionId fed downstream must be
  // the real DB row id, not the UI-only composite string.
  assert.equal(
    result[0].connectionId,
    realConnectionId,
    "fp-pinned target must resolve to the real connection id for credential lookup to succeed"
  );

  // The selected fingerprint must be threaded through so downstream execution
  // (and future account-scoped cooldown/lockout) can still tell which account
  // was pinned, instead of losing that information once the composite id is
  // unwrapped.
  assert.equal(
    (result[0] as Record<string, unknown>).pinnedFingerprint,
    pinnedFingerprint,
    "the pinned fingerprint must survive resolution so downstream execution can target that account"
  );
});

test("#6696: composite connectionId never matches connectionById (root cause of the inert pin)", () => {
  const realConnectionId = "conn-1";
  const conn = {
    id: realConnectionId,
    provider: "mimocode",
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

test("#6696: a pin to an unknown connection does not crash and leaves the target inert but not thrown away", () => {
  const connById = new Map();
  const targets = [makeTarget({ connectionId: "missing-conn|fp|fp-zzz" })];

  const result = expandTargetsByFingerprints(targets, connById, (t) => t.provider);

  assert.equal(result.length, 1);
  assert.equal(result[0].connectionId, "missing-conn");
  assert.equal((result[0] as Record<string, unknown>).pinnedFingerprint, "fp-zzz");
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
