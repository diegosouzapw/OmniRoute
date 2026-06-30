import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  resolvePipelineBreakerConfig,
  canRunEngine,
  recordEngineFailure,
  recordEngineSuccess,
  getEngineBreakerState,
  resetPipelineEngineBreakers,
  DEFAULT_PIPELINE_BREAKER,
  type PipelineCircuitBreakerConfig,
} from "../../../open-sse/services/compression/pipelineEngineBreaker.ts";
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "../../../open-sse/services/compression/engines/registry.ts";
import { applyStackedCompression } from "../../../open-sse/services/compression/strategySelector.ts";

// T02 — pipeline engine circuit-breaker. Pure breaker semantics + an integration through the
// stacked loop with a deliberately-throwing engine. Opt-in / default-off.

const ON: PipelineCircuitBreakerConfig = { enabled: true, failureThreshold: 2, cooldownMs: 1000 };

beforeEach(() => resetPipelineEngineBreakers());

describe("pipelineEngineBreaker — config resolution", () => {
  it("defaults to disabled with no partial and no env", () => {
    const cfg = resolvePipelineBreakerConfig(undefined, {} as NodeJS.ProcessEnv);
    assert.equal(cfg.enabled, false);
    assert.equal(cfg.failureThreshold, DEFAULT_PIPELINE_BREAKER.failureThreshold);
    assert.equal(cfg.cooldownMs, DEFAULT_PIPELINE_BREAKER.cooldownMs);
  });

  it("reads env when no partial is given", () => {
    const cfg = resolvePipelineBreakerConfig(undefined, {
      COMPRESSION_PIPELINE_BREAKER_ENABLED: "true",
      COMPRESSION_PIPELINE_BREAKER_THRESHOLD: "5",
      COMPRESSION_PIPELINE_BREAKER_COOLDOWN_MS: "7000",
    } as NodeJS.ProcessEnv);
    assert.equal(cfg.enabled, true);
    assert.equal(cfg.failureThreshold, 5);
    assert.equal(cfg.cooldownMs, 7000);
  });

  it("partial wins over env", () => {
    const cfg = resolvePipelineBreakerConfig(
      { enabled: false },
      { COMPRESSION_PIPELINE_BREAKER_ENABLED: "true" } as NodeJS.ProcessEnv
    );
    assert.equal(cfg.enabled, false);
  });
});

describe("pipelineEngineBreaker — state machine", () => {
  it("is a pass-through when disabled (never opens, never records)", () => {
    const off = resolvePipelineBreakerConfig({ enabled: false });
    recordEngineFailure("rtk", off);
    recordEngineFailure("rtk", off);
    recordEngineFailure("rtk", off);
    assert.equal(canRunEngine("rtk", off), true);
    assert.equal(getEngineBreakerState("rtk").open, false);
  });

  it("opens after the failure threshold and short-circuits within the cooldown", () => {
    assert.equal(canRunEngine("rtk", ON, 0), true);
    recordEngineFailure("rtk", ON, 0); // 1 < 2 → still closed
    assert.equal(canRunEngine("rtk", ON, 0), true);
    recordEngineFailure("rtk", ON, 0); // 2 >= 2 → OPEN until 1000
    assert.equal(getEngineBreakerState("rtk").open, true);
    assert.equal(canRunEngine("rtk", ON, 500), false, "OPEN within cooldown");
  });

  it("half-opens after the cooldown; a failed probe re-opens immediately", () => {
    recordEngineFailure("rtk", ON, 0);
    recordEngineFailure("rtk", ON, 0); // OPEN until 1000
    assert.equal(canRunEngine("rtk", ON, 1500), true, "half-open probe allowed past cooldown");
    // a single probe failure re-opens (failures was left at threshold-1)
    recordEngineFailure("rtk", ON, 1500);
    assert.equal(canRunEngine("rtk", ON, 1600), false, "re-opened after failed probe");
  });

  it("a successful probe fully closes the breaker", () => {
    recordEngineFailure("rtk", ON, 0);
    recordEngineFailure("rtk", ON, 0);
    assert.equal(canRunEngine("rtk", ON, 1500), true); // half-open
    recordEngineSuccess("rtk", ON);
    assert.equal(getEngineBreakerState("rtk").open, false);
    assert.equal(getEngineBreakerState("rtk").failures, 0);
    assert.equal(canRunEngine("rtk", ON, 1600), true);
  });
});

describe("pipelineEngineBreaker — pipeline integration", () => {
  const ENGINE_ID = "test-cb-throw";
  let calls = 0;

  beforeEach(() => {
    calls = 0;
    registerCompressionEngine({
      id: ENGINE_ID,
      name: "throwing test engine",
      targets: ["messages"],
      stackable: true,
      apply() {
        calls += 1;
        throw new Error("boom");
      },
      compress() {
        throw new Error("boom");
      },
      getConfigSchema() {
        return [];
      },
      validateConfig() {
        return { valid: true, errors: [] };
      },
    });
  });

  afterEach(() => unregisterCompressionEngine(ENGINE_ID));

  function run() {
    // Object step: a bare-string step that is not a known alias normalizes to caveman, so the
    // pipeline must reference the test engine via an explicit `{ engine }` object.
    return applyStackedCompression(
      { messages: [{ role: "user", content: "hello world" }] },
      [{ engine: ENGINE_ID, intensity: "standard" }],
      { circuitBreaker: { enabled: true, failureThreshold: 2, cooldownMs: 60_000 } }
    );
  }

  it("a throwing engine fails open (no throw) and opens the breaker after the threshold", () => {
    // First two runs: engine throws, caught + recorded (fail-open → body unchanged).
    const r1 = run();
    assert.equal(r1.compressed, false);
    assert.deepEqual(r1.body, { messages: [{ role: "user", content: "hello world" }] });
    run();
    // After 2 failures the breaker is OPEN.
    assert.equal(getEngineBreakerState(ENGINE_ID).open, true);

    const callsBefore = calls;
    const r3 = run();
    // Third run: breaker OPEN → engine is skipped entirely (never invoked again).
    assert.equal(calls, callsBefore, "engine must not be invoked while the breaker is open");
    assert.equal(r3.compressed, false);
  });

  it("with the breaker disabled (default), a throwing engine propagates (legacy behavior)", () => {
    assert.throws(() =>
      applyStackedCompression(
        { messages: [{ role: "user", content: "x" }] },
        [{ engine: ENGINE_ID, intensity: "standard" }],
        {}
      )
    );
  });
});
