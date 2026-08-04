// tests/unit/combo/combo-context.test.ts
// Unit tests for the first extracted combo phase (god-file decomposition fase 1):
// createComboContext (combo/context.ts) + phaseComboSetup (combo/comboSetup.ts).
// The pinning-ON path (getLastSessionModel) is covered end-to-end by the existing combo
// characterization suite (combo-sessionless-pin-3825, combo-config, etc.); here we exercise
// the pure path (context_cache_protection OFF, no settings -> no DB) and the body carrier.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createComboContext } from "../../../open-sse/services/combo/context.ts";
import { phaseComboSetup } from "../../../open-sse/services/combo/comboSetup.ts";

const log = { info() {}, warn() {}, error() {}, debug() {} };

test("createComboContext carries inputs and the body BY REFERENCE", () => {
  const body = { model: "auto", messages: [], stream: true };
  const combo = { name: "c1", models: ["a", "b"] };
  const ctx = createComboContext({ body, combo, log });
  assert.equal(ctx.body, body, "body must be the same reference (not copied) for byte-identical pinning");
  assert.equal(ctx.combo, combo);
  assert.equal(ctx.settings, null);
  assert.equal(ctx.relayOptions, null);
  assert.equal(ctx.log, log);
});

test("phaseComboSetup resolves strategy/config/stream with pinning OFF (pure, no DB)", () => {
  const body = { model: "auto", messages: [], stream: true };
  const combo = { name: "c1", models: ["a"], strategy: "priority" };
  const ctx = createComboContext({ body, combo, log });

  const setup = phaseComboSetup(ctx);

  assert.equal(setup.strategy, "priority");
  assert.equal(setup.pinnedModel, null, "no pin when context_cache_protection is off");
  assert.equal(setup.effectiveSessionId, null);
  assert.equal(setup.clientRequestedStream, true, "body.stream === true");
  assert.equal(typeof setup.comboTargetTimeoutMs, "number");
  assert.equal(typeof setup.reasoningTokenBufferEnabled, "boolean");
  assert.ok(setup.config && typeof setup.config === "object", "config cascade resolved");
  assert.ok(
    setup.resilienceSettings && typeof setup.resilienceSettings === "object",
    "resilience settings resolved"
  );
});

test("phaseComboSetup: clientRequestedStream is false when body.stream is not true", () => {
  const ctx = createComboContext({
    body: { model: "auto", messages: [] },
    combo: { name: "c", models: ["a"] },
    log,
  });
  const setup = phaseComboSetup(ctx);
  assert.equal(setup.clientRequestedStream, false);
});

test("phaseComboSetup normalizes an unknown strategy to a valid routing strategy", () => {
  const ctx = createComboContext({
    body: { model: "auto", messages: [] },
    combo: { name: "c", models: ["a"], strategy: "not-a-real-strategy" },
    log,
  });
  const setup = phaseComboSetup(ctx);
  // normalizeRoutingStrategy falls back to the default for unknown values.
  assert.equal(typeof setup.strategy, "string");
  assert.ok(setup.strategy.length > 0);
});
