import test from "node:test";
import assert from "node:assert/strict";
import { guardPipelineInflation } from "../../open-sse/services/compression/pipelineGuards.ts";
import { applyStackedCompression } from "../../open-sse/services/compression/strategySelector.ts";
import {
  registerCompressionEngine,
  setEngineEnabled,
} from "../../open-sse/services/compression/engines/registry.ts";
import type { CompressionEngine } from "../../open-sse/services/compression/engines/types.ts";
import type { CompressionPipelineStep } from "../../open-sse/services/compression/types.ts";

// --- Pure guard logic ---

test("guardPipelineInflation reverts to the original when the stacked output did not shrink", () => {
  const original = { a: 1 };
  const compressed = { a: 1, pad: "xxxxxxxx" };
  const r = guardPipelineInflation({
    originalBody: original,
    compressedBody: compressed,
    originalTokens: 100,
    compressedTokens: 120,
  });
  assert.equal(r.inflated, true);
  assert.equal(r.body, original);
});

test("guardPipelineInflation treats a net-zero (equal-token) no-op as NOT inflated", () => {
  // A structural engine (ccr / session-dedup) that finds nothing returns the body unchanged, so
  // compressedTokens === originalTokens. That is a no-op (zero savings), not inflation — the guard
  // must keep the compressed body and never emit the "did not shrink; reverted" warning.
  const original = { a: 1 };
  const compressed = { b: 2 };
  const r = guardPipelineInflation({
    originalBody: original,
    compressedBody: compressed,
    originalTokens: 50,
    compressedTokens: 50,
  });
  assert.equal(r.inflated, false);
  assert.equal(r.body, compressed);
});

test("guardPipelineInflation keeps the compressed body when it actually shrank", () => {
  const original = { a: 1, pad: "xxxxxxxx" };
  const compressed = { a: 1 };
  const r = guardPipelineInflation({
    originalBody: original,
    compressedBody: compressed,
    originalTokens: 100,
    compressedTokens: 40,
  });
  assert.equal(r.inflated, false);
  assert.equal(r.body, compressed);
});

test("guardPipelineInflation treats empty input as not inflated", () => {
  const r = guardPipelineInflation({
    originalBody: {},
    compressedBody: {},
    originalTokens: 0,
    compressedTokens: 0,
  });
  assert.equal(r.inflated, false);
});

// --- Wire: an inflating engine in the stacked pipeline is reverted ---

const INFLATE_ID = "test-inflate-guard";

const inflatingEngine: CompressionEngine = {
  id: INFLATE_ID,
  name: "Test Inflate",
  description: "test-only engine that inflates the body",
  icon: "bug_report",
  targets: ["messages"],
  stackable: true,
  stackPriority: 0,
  metadata: {
    id: INFLATE_ID,
    name: "Test Inflate",
    description: "test-only",
    inputScope: "messages",
    targetLatencyMs: 0,
    supportsPreview: false,
    stable: true,
  },
  apply(body) {
    const inflated = { ...body, __pad: "x".repeat(4000) };
    return {
      body: inflated,
      compressed: true,
      stats: {
        originalTokens: 10,
        compressedTokens: 1010,
        savingsPercent: -10000,
        techniquesUsed: [INFLATE_ID],
        mode: "stacked",
        timestamp: 0,
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

test("applyStackedCompression reverts to the original body when the pipeline inflates", () => {
  registerCompressionEngine(inflatingEngine);
  setEngineEnabled(INFLATE_ID, true);

  const body = {
    messages: [{ role: "user", content: "hello world this is a short message" }],
  };
  // Pass a step object, not a bare string: `normalizePipelineStep()` only recognizes a fixed
  // set of built-in bare-string aliases ("standard"/"rtk"/"lite"/"aggressive"/"ultra") and
  // silently falls back to `{ engine: "caveman" }` for any other string — a bare custom-engine
  // id here would silently run caveman instead of the registered `inflatingEngine`.
  const result = applyStackedCompression(body, [{ engine: INFLATE_ID } as CompressionPipelineStep]);

  // The inflating engine produced a bigger body, so the aggregate guard discarded it.
  assert.equal(result.compressed, false);
  assert.deepEqual(result.body, body);
  assert.ok(
    (result.stats.validationWarnings ?? []).some((w) => w.includes("pipeline-inflation-guard")),
    "expected the inflation-guard warning in stats.validationWarnings"
  );
});
