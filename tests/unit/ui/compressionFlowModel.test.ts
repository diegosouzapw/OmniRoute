import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  compressionEventToModel,
  compressionRunToFlow,
  buildReplayFrames,
  type CompressionRunModel,
} from "../../../src/app/(dashboard)/dashboard/compression/studio/compressionFlowModel.ts";
import type { CompressionCompletedPayload } from "../../../src/lib/events/types.ts";

// ── fixture ───────────────────────────────────────────────────────────────

const THREE_ENGINE_PAYLOAD: CompressionCompletedPayload = {
  requestId: "abc123",
  comboId: "my-combo",
  mode: "stacked",
  originalTokens: 1000,
  compressedTokens: 600,
  savingsPercent: 40,
  engineBreakdown: [
    {
      engine: "lite",
      originalTokens: 1000,
      compressedTokens: 900,
      savingsPercent: 10,
      techniquesUsed: ["whitespace"],
      durationMs: 2,
    },
    {
      engine: "caveman",
      originalTokens: 900,
      compressedTokens: 750,
      savingsPercent: 16.7,
      techniquesUsed: ["filler", "dedup"],
      durationMs: 5,
    },
    {
      engine: "rtk",
      originalTokens: 750,
      compressedTokens: 600,
      savingsPercent: 20,
      techniquesUsed: ["tool-output-trim"],
      rulesApplied: ["max-lines"],
      durationMs: 8,
    },
  ],
  timestamp: 1718000000000,
};

// ── compressionEventToModel ───────────────────────────────────────────────

describe("compressionEventToModel", () => {
  it("builds the model from a 3-engine payload", () => {
    const model: CompressionRunModel = compressionEventToModel(THREE_ENGINE_PAYLOAD);

    assert.equal(model.requestId, "abc123");
    assert.equal(model.comboId, "my-combo");
    assert.equal(model.mode, "stacked");
    assert.equal(model.originalTokens, 1000);
    assert.equal(model.compressedTokens, 600);
    assert.equal(model.savingsPercent, 40);
    assert.equal(model.steps.length, 3);
  });

  it("maps each engine step correctly", () => {
    const model = compressionEventToModel(THREE_ENGINE_PAYLOAD);

    assert.equal(model.steps[0].engine, "lite");
    assert.equal(model.steps[0].originalTokens, 1000);
    assert.equal(model.steps[0].compressedTokens, 900);
    assert.equal(model.steps[0].savingsPercent, 10);
    assert.deepEqual(model.steps[0].techniquesUsed, ["whitespace"]);
    assert.equal(model.steps[0].durationMs, 2);

    assert.equal(model.steps[2].engine, "rtk");
    assert.deepEqual(model.steps[2].rulesApplied, ["max-lines"]);
  });

  it("handles null comboId gracefully", () => {
    const payload = { ...THREE_ENGINE_PAYLOAD, comboId: null };
    const model = compressionEventToModel(payload);
    assert.equal(model.comboId, null);
  });

  it("handles empty engineBreakdown", () => {
    const payload = { ...THREE_ENGINE_PAYLOAD, engineBreakdown: [] };
    const model = compressionEventToModel(payload);
    assert.equal(model.steps.length, 0);
  });
});

// ── compressionRunToFlow ──────────────────────────────────────────────────

describe("compressionRunToFlow", () => {
  it("returns N+2 nodes for N engine steps (input + N + output)", () => {
    const model = compressionEventToModel(THREE_ENGINE_PAYLOAD);
    const flow = compressionRunToFlow(model);

    // 3 engine steps → 1 input + 3 engine + 1 output = 5 nodes
    assert.equal(flow.nodes.length, 5, `expected 5 nodes, got ${flow.nodes.length}`);
  });

  it("node types: first=input, last=output, middle=engine", () => {
    const model = compressionEventToModel(THREE_ENGINE_PAYLOAD);
    const flow = compressionRunToFlow(model);

    assert.equal(flow.nodes[0].type, "input");
    assert.equal(flow.nodes[flow.nodes.length - 1].type, "output");
    assert.equal(flow.nodes[1].type, "engine");
    assert.equal(flow.nodes[2].type, "engine");
    assert.equal(flow.nodes[3].type, "engine");
  });

  it("edges connect nodes in sequence (N+1 edges for N+2 nodes)", () => {
    const model = compressionEventToModel(THREE_ENGINE_PAYLOAD);
    const flow = compressionRunToFlow(model);

    // 5 nodes → 4 sequential edges
    assert.equal(flow.edges.length, 4, `expected 4 edges, got ${flow.edges.length}`);
  });

  it("each edge source/target connects consecutive nodes", () => {
    const model = compressionEventToModel(THREE_ENGINE_PAYLOAD);
    const flow = compressionRunToFlow(model);

    for (let i = 0; i < flow.edges.length; i++) {
      assert.equal(
        flow.edges[i].source,
        flow.nodes[i].id,
        `edge ${i} source should be node[${i}].id`
      );
      assert.equal(
        flow.edges[i].target,
        flow.nodes[i + 1].id,
        `edge ${i} target should be node[${i + 1}].id`
      );
    }
  });

  it("engine nodes carry per-step data", () => {
    const model = compressionEventToModel(THREE_ENGINE_PAYLOAD);
    const flow = compressionRunToFlow(model);

    // nodes[1] is the first engine step (lite)
    const liteNode = flow.nodes[1];
    assert.equal((liteNode.data as Record<string, unknown>).engine, "lite");
    assert.equal((liteNode.data as Record<string, unknown>).originalTokens, 1000);
    assert.equal((liteNode.data as Record<string, unknown>).compressedTokens, 900);
    assert.equal((liteNode.data as Record<string, unknown>).savingsPercent, 10);
  });

  it("handles zero-engine model (only input + output)", () => {
    const payload = { ...THREE_ENGINE_PAYLOAD, engineBreakdown: [] };
    const model = compressionEventToModel(payload);
    const flow = compressionRunToFlow(model);

    assert.equal(flow.nodes.length, 2);
    assert.equal(flow.edges.length, 1);
    assert.equal(flow.nodes[0].type, "input");
    assert.equal(flow.nodes[1].type, "output");
  });
});

// ── buildReplayFrames ─────────────────────────────────────────────────────

describe("buildReplayFrames", () => {
  it("returns progressive snapshots (1 engine applied, 2 applied, ...)", () => {
    const model = compressionEventToModel(THREE_ENGINE_PAYLOAD);
    const frames = buildReplayFrames(model);

    // 3 engines → 3 frames
    assert.equal(frames.length, 3, `expected 3 frames, got ${frames.length}`);
  });

  it("frame[0] has 1 step, frame[1] has 2 steps, frame[2] has 3 steps", () => {
    const model = compressionEventToModel(THREE_ENGINE_PAYLOAD);
    const frames = buildReplayFrames(model);

    assert.equal(frames[0].steps.length, 1);
    assert.equal(frames[1].steps.length, 2);
    assert.equal(frames[2].steps.length, 3);
  });

  it("frames are independent objects (mutations don't bleed)", () => {
    const model = compressionEventToModel(THREE_ENGINE_PAYLOAD);
    const frames = buildReplayFrames(model);

    // Mutating frame[0].steps should not affect frame[1]
    frames[0].steps.push({ engine: "fake" } as (typeof frames)[0]["steps"][0]);
    assert.equal(frames[1].steps.length, 2);
  });

  it("each frame carries the correct compressedTokens up to that step", () => {
    const model = compressionEventToModel(THREE_ENGINE_PAYLOAD);
    const frames = buildReplayFrames(model);

    // Frame 0: after lite — compressedTokens = 900
    assert.equal(frames[0].compressedTokens, 900);
    // Frame 1: after caveman — compressedTokens = 750
    assert.equal(frames[1].compressedTokens, 750);
    // Frame 2: after rtk — compressedTokens = 600
    assert.equal(frames[2].compressedTokens, 600);
  });

  it("returns empty array for model with no steps", () => {
    const payload = { ...THREE_ENGINE_PAYLOAD, engineBreakdown: [] };
    const model = compressionEventToModel(payload);
    const frames = buildReplayFrames(model);
    assert.equal(frames.length, 0);
  });
});
