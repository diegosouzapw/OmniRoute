import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  stepEventsToRunModel,
  appendInFlightStep,
  clearInFlightOnComplete,
} from "../../../src/app/(dashboard)/dashboard/compression/studio/compressionFlowModel.ts";
import { applyStackedCompression } from "../../../open-sse/services/compression/strategySelector.ts";
import { registerCompressionEngine } from "../../../open-sse/services/compression/index.ts";
import type { CompressionEngine } from "../../../open-sse/services/compression/engines/types.ts";
import type { CompressionStepPayload } from "../../../src/lib/events/types.ts";

function step(over: Partial<CompressionStepPayload>): CompressionStepPayload {
  return {
    requestId: "r1",
    comboId: null,
    mode: "stacked",
    stepIndex: 0,
    totalSteps: 2,
    engine: "e",
    state: "done",
    originalTokens: 1000,
    compressedTokens: 800,
    savingsPercent: 20,
    timestamp: 1,
    ...over,
  };
}

describe("stepEventsToRunModel", () => {
  it("builds a run model from accumulated step events (run-level totals span first→last)", () => {
    const model = stepEventsToRunModel([
      step({ engine: "a", stepIndex: 0, originalTokens: 1000, compressedTokens: 900, savingsPercent: 10, timestamp: 1 }),
      step({ engine: "b", stepIndex: 1, originalTokens: 900, compressedTokens: 700, savingsPercent: 22, timestamp: 2 }),
    ]);
    assert.equal(model.requestId, "r1");
    assert.equal(model.mode, "stacked");
    assert.equal(model.originalTokens, 1000); // first step's input
    assert.equal(model.compressedTokens, 700); // last step's output
    assert.equal(model.savingsPercent, 30); // (1000-700)/1000
    assert.equal(model.steps.length, 2);
    assert.equal(model.steps[1].engine, "b");
    assert.equal(model.timestamp, 2);
  });
});

describe("in-flight step reducer", () => {
  it("appends steps for the same requestId and starts fresh on a new requestId", () => {
    let s = appendInFlightStep(null, step({ requestId: "r1", engine: "a" }));
    assert.equal(s.requestId, "r1");
    assert.equal(s.steps.length, 1);
    s = appendInFlightStep(s, step({ requestId: "r1", engine: "b" }));
    assert.equal(s.steps.length, 2);
    // A new requestId replaces the in-flight run (latest wins).
    s = appendInFlightStep(s, step({ requestId: "r2", engine: "x" }));
    assert.equal(s.requestId, "r2");
    assert.equal(s.steps.length, 1);
  });

  it("clears the in-flight run only when the completing requestId matches", () => {
    const s = appendInFlightStep(null, step({ requestId: "r1" }));
    assert.equal(clearInFlightOnComplete(s, "other"), s);
    assert.equal(clearInFlightOnComplete(s, "r1"), null);
  });
});

// ── Integration: applyStackedCompression emits a step per engine ───────────────
function fakeEngine(id: string, compressed: boolean, orig: number, comp: number): CompressionEngine {
  return {
    id,
    name: id,
    description: "",
    icon: "",
    targets: ["messages"],
    stackable: true,
    stackPriority: 1,
    metadata: {
      id,
      name: id,
      description: "",
      inputScope: "messages",
      targetLatencyMs: 1,
      supportsPreview: false,
      stable: false,
    },
    apply(body) {
      return {
        body,
        compressed,
        stats: {
          originalTokens: orig,
          compressedTokens: comp,
          savingsPercent: orig > 0 ? Math.round(((orig - comp) / orig) * 100) : 0,
          techniquesUsed: [],
          mode: "stacked",
          timestamp: 0,
          durationMs: 2,
        },
      };
    },
    compress(body) {
      return this.apply(body);
    },
    getConfigSchema() {
      return [];
    },
    validateConfig() {
      return { valid: true, errors: [] };
    },
  };
}

describe("applyStackedCompression — onEngineStep emission", () => {
  it("fires onEngineStep once per engine with index/total/state", () => {
    registerCompressionEngine(fakeEngine("step-e1", true, 1000, 900));
    registerCompressionEngine(fakeEngine("step-e2", false, 900, 900));

    const captured: Array<{ stepIndex: number; totalSteps: number; engine: string; state: string }> = [];
    applyStackedCompression(
      { messages: [{ role: "user", content: "hello" }] },
      [{ engine: "step-e1" }, { engine: "step-e2" }],
      { onEngineStep: (s) => captured.push(s) }
    );

    assert.equal(captured.length, 2, "one step per engine");
    assert.equal(captured[0].engine, "step-e1");
    assert.equal(captured[0].stepIndex, 0);
    assert.equal(captured[0].totalSteps, 2);
    assert.equal(captured[0].state, "done");
    assert.equal(captured[1].engine, "step-e2");
    assert.equal(captured[1].stepIndex, 1);
    assert.equal(captured[1].state, "skipped");
  });
});
