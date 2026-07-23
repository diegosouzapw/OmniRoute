import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";

import {
  applyStackedCompression,
  applyStackedCompressionAsync,
} from "../../../open-sse/services/compression/index.ts";
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "../../../open-sse/services/compression/engines/registry.ts";
import type {
  CompressionEngine,
  CompressionEngineTarget,
} from "../../../open-sse/services/compression/engines/types.ts";
import type {
  CompressionPipelineStep,
  CompressionResult,
} from "../../../open-sse/services/compression/types.ts";

const FS = "fake-sync-engine";
const FA = "fake-async-engine";

/**
 * Transform that tags every user message content with `|<id>` so the test can
 * assert both that the engine ran and the order in which engines ran.
 */
function tag(id: string, body: Record<string, unknown>): CompressionResult {
  const messages = (body.messages as Array<{ role: string; content: string }>) ?? [];
  // Tag the user message; drop any padding (non-user) content so the stacked body
  // genuinely shrinks and the #5527 (T02) inflation guard does not revert it.
  const next = messages.map((m) =>
    m.role === "user" ? { ...m, content: `${m.content}|${id}` } : { ...m, content: "" }
  );
  return {
    body: { ...body, messages: next },
    compressed: true,
    stats: {
      originalTokens: 10,
      compressedTokens: 9,
      savingsPercent: 10,
      techniquesUsed: [id],
      mode: "stacked",
      timestamp: 0,
      durationMs: 0.5,
    },
  };
}

function makeEngine(id: string, opts: { async?: boolean } = {}): CompressionEngine {
  const base: CompressionEngine = {
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
    // Async-only engines provide a graceful sync pass-through so the legacy
    // sync stacked path never crashes and simply skips the async-only work.
    apply: opts.async
      ? (body) => ({ body, compressed: false, stats: null })
      : (body) => tag(id, body),
    compress: (body) => tag(id, body),
    getConfigSchema: () => [],
    validateConfig: () => ({ valid: true, errors: [] }),
  };
  if (opts.async) {
    return { ...base, applyAsync: async (body) => tag(id, body) };
  }
  return base;
}

function userContent(result: CompressionResult): string {
  const messages = result.body.messages as Array<{ role: string; content: string }>;
  return messages.find((m) => m.role === "user")!.content;
}

function pipeline(...ids: string[]): CompressionPipelineStep[] {
  return ids.map((engine) => ({ engine })) as unknown as CompressionPipelineStep[];
}

// Fixture body with a large droppable padding message: engines drop it (see `tag`) so the
// final stacked body shrinks and the #5527 (T02) inflation guard keeps the tagged output
// instead of reverting it. These tests assert engine ORDER/advancement, not compression
// ratios, so the body must realistically shrink for the tag assertions to survive the guard.
const PADDING = "padding tokens ".repeat(40);
function mkBody(): { messages: Array<{ role: string; content: string }> } {
  return {
    messages: [
      { role: "user", content: "hello" },
      { role: "assistant", content: PADDING },
    ],
  };
}

describe("stacked compression — async interface (H10)", () => {
  before(() => {
    registerCompressionEngine(makeEngine(FS));
    registerCompressionEngine(makeEngine(FA, { async: true }));
  });
  after(() => {
    unregisterCompressionEngine(FS);
    unregisterCompressionEngine(FA);
  });

  it("runs a mixed sync+async pipeline in pipeline order", async () => {
    const body = mkBody();
    const result = await applyStackedCompressionAsync(body, pipeline(FS, FA));

    assert.equal(userContent(result), "hello|fake-sync-engine|fake-async-engine");
    assert.equal(result.compressed, true);
    assert.equal(result.stats?.engine, "stacked");
    assert.deepEqual(
      result.stats?.engineBreakdown?.map((e) => e.engine),
      [FS, FA]
    );
  });

  it("preserves order when the async engine runs first", async () => {
    const body = mkBody();
    const result = await applyStackedCompressionAsync(body, pipeline(FA, FS));

    assert.equal(userContent(result), "hello|fake-async-engine|fake-sync-engine");
    assert.deepEqual(
      result.stats?.engineBreakdown?.map((e) => e.engine),
      [FA, FS]
    );
  });

  it("async path yields the same result as sync path for sync-only engines", async () => {
    const body = mkBody();
    const asyncResult = await applyStackedCompressionAsync(body, pipeline(FS));
    const syncResult = applyStackedCompression(body, pipeline(FS));

    assert.deepEqual(asyncResult.body, syncResult.body);
    assert.equal(userContent(asyncResult), "hello|fake-sync-engine");
  });

  it("legacy sync path gracefully skips async-only work without crashing", () => {
    const body = mkBody();
    const result = applyStackedCompression(body, pipeline(FA));

    // The async-only engine's sync apply() is a pass-through: no transform.
    assert.equal(userContent(result), "hello");
  });

  it("regression: real rtk→caveman stacked pipeline still works (sync)", () => {
    const body = {
      messages: [
        { role: "tool", content: Array.from({ length: 8 }, () => "same noisy line").join("\n") },
        { role: "user", content: "Explain the authentication configuration in detail please" },
      ],
    };
    const result = applyStackedCompression(body, [
      { engine: "rtk", intensity: "standard" },
      { engine: "caveman", intensity: "full" },
    ]);

    assert.equal(result.stats?.engine, "stacked");
    assert.deepEqual(
      result.stats?.engineBreakdown?.map((e) => e.engine),
      ["rtk", "caveman"]
    );
  });
});
