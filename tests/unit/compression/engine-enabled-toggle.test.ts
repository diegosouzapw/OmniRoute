/**
 * Registry `enabled` toggle — the stacked loop must honor setEngineEnabled.
 *
 * `enabled` was a flag the stacked pipeline never consulted: getCompressionEngine
 * returned the engine regardless, so flipping it via setEngineEnabled had no effect
 * (the toggle "lied"). Both the sync and async stacked loops now skip a step whose
 * engine is disabled.
 */
import { describe, it, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  applyStackedCompression,
  applyStackedCompressionAsync,
} from "../../../open-sse/services/compression/index.ts";
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
  setEngineEnabled,
} from "../../../open-sse/services/compression/engines/registry.ts";
import type {
  CompressionEngine,
  CompressionEngineTarget,
} from "../../../open-sse/services/compression/engines/types.ts";
import type {
  CompressionPipelineStep,
  CompressionResult,
} from "../../../open-sse/services/compression/types.ts";

const ENGINE_ID = "enabled-toggle-engine";

/** Engine that tags user content and reports a real gain when it runs. */
function makeTaggingEngine(id: string): CompressionEngine {
  return {
    id,
    name: id,
    description: id,
    icon: "x",
    targets: ["messages"] as CompressionEngineTarget[],
    stackable: true,
    stackPriority: 0,
    metadata: {
      id,
      name: id,
      description: id,
      inputScope: "messages",
      targetLatencyMs: 1,
      supportsPreview: false,
      stable: true,
    },
    compress: (body) => ({ body, compressed: false, stats: null }),
    getConfigSchema: () => [],
    validateConfig: () => ({ valid: true, errors: [] }),
    apply: (body) => {
      const messages = (body.messages as Array<{ role: string; content: string }>) ?? [];
      const next = messages.map((m) =>
        m.role === "user" ? { ...m, content: m.content + "|tagged" } : m
      );
      return {
        body: { ...body, messages: next },
        compressed: true,
        stats: {
          originalTokens: 100,
          compressedTokens: 70,
          savingsPercent: 30,
          techniquesUsed: [id],
          mode: "stacked",
          timestamp: 0,
          durationMs: 0.1,
        },
      };
    },
  };
}

function pipeline(...ids: string[]): CompressionPipelineStep[] {
  return ids.map((engine) => ({ engine })) as unknown as CompressionPipelineStep[];
}

function userContent(result: CompressionResult): string {
  const messages = result.body.messages as Array<{ role: string; content: string }>;
  return messages.find((m) => m.role === "user")!.content;
}

function freshBody() {
  return { messages: [{ role: "user", content: "hi" }] };
}

describe("registry enabled toggle — stacked loop honors setEngineEnabled", () => {
  before(() => registerCompressionEngine(makeTaggingEngine(ENGINE_ID)));
  beforeEach(() => setEngineEnabled(ENGINE_ID, true)); // default-on before each case
  after(() => unregisterCompressionEngine(ENGINE_ID));

  it("applies the engine while enabled (sync)", () => {
    const result = applyStackedCompression(freshBody(), pipeline(ENGINE_ID));
    assert.equal(result.compressed, true);
    assert.equal(userContent(result), "hi|tagged");
  });

  it("skips the engine once disabled (sync)", () => {
    setEngineEnabled(ENGINE_ID, false);
    const result = applyStackedCompression(freshBody(), pipeline(ENGINE_ID));
    assert.equal(result.compressed, false);
    assert.equal(userContent(result), "hi"); // unchanged — step skipped
  });

  it("applies the engine while enabled (async)", async () => {
    const result = await applyStackedCompressionAsync(freshBody(), pipeline(ENGINE_ID));
    assert.equal(result.compressed, true);
    assert.equal(userContent(result), "hi|tagged");
  });

  it("skips the engine once disabled (async)", async () => {
    setEngineEnabled(ENGINE_ID, false);
    const result = await applyStackedCompressionAsync(freshBody(), pipeline(ENGINE_ID));
    assert.equal(result.compressed, false);
    assert.equal(userContent(result), "hi");
  });
});
