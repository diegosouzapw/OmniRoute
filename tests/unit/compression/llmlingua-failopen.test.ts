/**
 * TDD tests for the llmlingua async compression engine (L1/L3 — F2.1).
 *
 * Tests are written RED-first (before the implementation exists).
 *
 * Coverage:
 *  1. Happy path: fake backend compresses prose → body shorter, compressed:true, stats present.
 *  2. Fail-open: backend throws → original body returned unchanged, compressed:false, no throw.
 *  3. Code-block protection: fenced code block survives verbatim; backend never receives code.
 *  4. System messages are never compressed.
 *  5. Sync `apply` is a pass-through (compressed:false, body unchanged).
 */

import { describe, it, after } from "node:test";
import assert from "node:assert/strict";

import {
  llmlinguaEngine,
  setLlmlinguaBackend,
  type LlmlinguaBackendOptions,
} from "../../../open-sse/services/compression/engines/llmlingua/index.ts";

// A large prose blob comfortably above the default 2000-token floor
// (estimateCompressionTokens ≈ length/4). ~12 k chars ⇒ ~3 k tokens.
const LARGE_PROSE = "The quick brown fox jumps over the lazy dog. ".repeat(280);

// ─── helpers ─────────────────────────────────────────────────────────────────

function makeBody(messages: Array<{ role: string; content: string }>): Record<string, unknown> {
  return { model: "gpt-4o", messages };
}

/** Backend that replaces content with a single word to simulate compression. */
function compressingBackend(text: string): Promise<string> {
  // Return a clearly shorter string so we can detect compression
  return Promise.resolve("COMPRESSED");
}

/** Backend that always throws — simulates worker/model failure. */
function throwingBackend(_text: string): Promise<string> {
  return Promise.reject(new Error("Model unavailable"));
}

// ─── reset after suite ────────────────────────────────────────────────────────

after(() => {
  setLlmlinguaBackend(null);
});

// ─── tests ────────────────────────────────────────────────────────────────────

describe("llmlingua engine", () => {
  it("id is 'llmlingua'", () => {
    assert.equal(llmlinguaEngine.id, "llmlingua");
  });

  it("is stackable with a numeric stackPriority", () => {
    assert.equal(llmlinguaEngine.stackable, true);
    assert.equal(typeof llmlinguaEngine.stackPriority, "number");
  });

  // ── 5. sync apply is a pass-through ────────────────────────────────────────
  it("sync apply() is a pass-through — compressed:false, body unchanged", () => {
    const body = makeBody([
      { role: "user", content: "Hello world, this is a long prose message." },
    ]);
    const result = llmlinguaEngine.apply(body);
    assert.equal(result.compressed, false);
    assert.equal(result.stats, null);
    assert.deepEqual(result.body, body);
  });

  // ── 1. happy path ───────────────────────────────────────────────────────────
  it("applyAsync compresses prose with a working backend → compressed:true, stats present", async () => {
    setLlmlinguaBackend(compressingBackend);

    const originalContent =
      "The quick brown fox jumps over the lazy dog. " +
      "This is a sufficiently long prose paragraph to ensure compression is triggered.";
    const body = makeBody([{ role: "user", content: originalContent }]);

    // minTokens:0 disables the small-prompt floor so the short fixture still
    // exercises the backend (real behavior added by the minTokens floor — Task 4c).
    const result = await llmlinguaEngine.applyAsync!(body, { stepConfig: { minTokens: 0 } });

    assert.equal(result.compressed, true, "should be marked compressed");
    assert.notEqual(result.stats, null, "stats should be present");
    assert.ok(result.stats!.savingsPercent > 0, "savings should be positive");

    // The output body should be shorter than the input
    const outContent = (result.body.messages as Array<{ role: string; content: string }>)[0]!
      .content;
    assert.ok(
      outContent.length < originalContent.length,
      `output (${outContent.length}) should be shorter than input (${originalContent.length})`
    );
  });

  // ── 2. fail-open on backend error ───────────────────────────────────────────
  it("applyAsync FAIL-OPENS when backend throws — returns original body, compressed:false, no throw", async () => {
    setLlmlinguaBackend(throwingBackend);

    const body = makeBody([
      { role: "user", content: "Prose that the model would compress if it were available." },
    ]);

    let result: Awaited<ReturnType<typeof llmlinguaEngine.applyAsync>>;
    try {
      result = await llmlinguaEngine.applyAsync!(body, { stepConfig: { minTokens: 0 } });
    } catch (err) {
      assert.fail(`applyAsync must not throw on backend error, but threw: ${err}`);
    }

    assert.equal(result!.compressed, false, "compressed must be false on fail-open");
    assert.equal(result!.stats, null, "stats must be null on fail-open");
    assert.deepEqual(result!.body, body, "fail-open must return the original body unchanged");
  });

  // ── 3. code-block protection ─────────────────────────────────────────────────
  it("code blocks are never passed to the backend and survive verbatim", async () => {
    const backendCalls: string[] = [];

    setLlmlinguaBackend((text) => {
      backendCalls.push(text);
      return Promise.resolve("PROSE_COMPRESSED");
    });

    const codeBlock = "```typescript\nconst x = 1;\nconst y = x + 2;\n```";
    const prose = "Here is some prose before the code block and also after it.";
    const content = `${prose}\n\n${codeBlock}\n\nMore prose follows the code block here.`;

    const body = makeBody([{ role: "user", content }]);
    const result = await llmlinguaEngine.applyAsync!(body, { stepConfig: { minTokens: 0 } });

    // Code block text must be byte-identical in the output
    const outContent = (result.body.messages as Array<{ role: string; content: string }>)[0]!
      .content;
    assert.ok(
      outContent.includes(codeBlock),
      `Code block must survive verbatim in output.\nOutput:\n${outContent}`
    );

    // Backend must only have been called with prose segments, never with the code block
    for (const call of backendCalls) {
      assert.ok(
        !call.includes("```typescript"),
        `Backend must NOT receive code block content, but received:\n${call}`
      );
    }
  });

  // ── 4. system messages are never compressed ─────────────────────────────────
  it("system messages are never compressed", async () => {
    const systemCalls: string[] = [];

    setLlmlinguaBackend((text) => {
      systemCalls.push(text);
      return Promise.resolve("COMPRESSED");
    });

    const systemContent = "You are a helpful assistant. Follow these instructions carefully.";
    const userContent = "This is a user message with enough prose to potentially compress.";

    const body = makeBody([
      { role: "system", content: systemContent },
      { role: "user", content: userContent },
    ]);

    const result = await llmlinguaEngine.applyAsync!(body, { stepConfig: { minTokens: 0 } });

    const outMessages = result.body.messages as Array<{ role: string; content: string }>;
    const outSystem = outMessages.find((m) => m.role === "system")!;

    assert.equal(outSystem.content, systemContent, "System message content must be unchanged");

    // Backend must not have been called with system message content
    for (const call of systemCalls) {
      assert.ok(
        !call.includes(systemContent),
        `Backend must NOT be called with system message content`
      );
    }
  });
});

// ─── Task 3/4: minTokens floor, opts threading, config schema/validation ───────

describe("llmlingua engine — minTokens floor + config schema (Task 3/4)", () => {
  // ── 1. floor skips small input (no stepConfig → default floor 2000) ──────────
  it("minTokens floor skips small input — backend never called, compressed:false", async () => {
    const calls: string[] = [];
    setLlmlinguaBackend((text) => {
      calls.push(text);
      return Promise.resolve("X");
    });

    const body = makeBody([{ role: "user", content: "Short prose, well below the floor." }]);

    const result = await llmlinguaEngine.applyAsync!(body);

    assert.equal(result.compressed, false, "small input must skip compression");
    assert.equal(result.stats, null, "stats must be null when skipped by the floor");
    assert.equal(calls.length, 0, "backend must NOT be called below the floor");
  });

  // ── 2. floor disabled (minTokens:0) → passes through to backend ──────────────
  it("minTokens:0 disables the floor — backend IS called, compressed:true", async () => {
    const calls: string[] = [];
    setLlmlinguaBackend((text) => {
      calls.push(text);
      return Promise.resolve("X");
    });

    const body = makeBody([{ role: "user", content: "Short prose, well below the floor." }]);

    const result = await llmlinguaEngine.applyAsync!(body, { stepConfig: { minTokens: 0 } });

    assert.equal(result.compressed, true, "floor disabled → backend compresses");
    assert.ok(calls.length > 0, "backend must be called when the floor is disabled");
  });

  // ── 3. opts threading: model + compressionRate reach the backend ─────────────
  it("threads model + compressionRate from stepConfig down to the backend opts", async () => {
    let capturedOpts: LlmlinguaBackendOptions | undefined;
    setLlmlinguaBackend((_text, opts) => {
      capturedOpts = opts;
      return Promise.resolve("X");
    });

    const body = makeBody([{ role: "user", content: "Some prose to send to the backend." }]);

    await llmlinguaEngine.applyAsync!(body, {
      stepConfig: { minTokens: 0, model: "bert-base", compressionRate: 0.3 },
    });

    assert.ok(capturedOpts, "backend must receive an opts object");
    assert.equal(capturedOpts!.model, "bert-base", "model must be threaded into opts");
    assert.equal(capturedOpts!.compressionRate, 0.3, "compressionRate must be threaded into opts");
  });

  // ── 3b. floor uses estimated tokens of non-system content (large → compress) ─
  it("large input above the default floor IS compressed (no stepConfig)", async () => {
    const calls: string[] = [];
    setLlmlinguaBackend((text) => {
      calls.push(text);
      return Promise.resolve("X");
    });

    const body = makeBody([{ role: "user", content: LARGE_PROSE }]);

    const result = await llmlinguaEngine.applyAsync!(body);

    assert.equal(result.compressed, true, "large input must clear the floor and compress");
    assert.ok(calls.length > 0, "backend must be called for input above the floor");
  });

  // ── 4. config validation ─────────────────────────────────────────────────────
  it("validateConfig accepts a fully valid config", () => {
    const res = llmlinguaEngine.validateConfig({
      model: "tinybert",
      compressionRate: 0.5,
      minTokens: 2000,
      modelPath: "",
    });
    assert.equal(res.valid, true, `expected valid, got errors: ${res.errors.join(", ")}`);
  });

  it("validateConfig rejects unknown model / out-of-range / wrong-type fields", () => {
    assert.equal(
      llmlinguaEngine.validateConfig({ model: "mobilebert" }).valid,
      false,
      "unknown model must be invalid"
    );
    assert.equal(
      llmlinguaEngine.validateConfig({ compressionRate: 1.5 }).valid,
      false,
      "compressionRate > 0.9 must be invalid"
    );
    assert.equal(
      llmlinguaEngine.validateConfig({ compressionRate: 0.05 }).valid,
      false,
      "compressionRate < 0.1 must be invalid"
    );
    assert.equal(
      llmlinguaEngine.validateConfig({ minTokens: -1 }).valid,
      false,
      "negative minTokens must be invalid"
    );
    assert.equal(
      llmlinguaEngine.validateConfig({ modelPath: 123 }).valid,
      false,
      "non-string modelPath must be invalid"
    );
  });

  // ── 5. schema shape ──────────────────────────────────────────────────────────
  it("getConfigSchema exposes model select + minTokens/compressionRate/modelPath fields", () => {
    const schema = llmlinguaEngine.getConfigSchema();
    const byKey = new Map(schema.map((f) => [f.key, f]));

    const modelField = byKey.get("model");
    assert.ok(modelField, "schema must include a 'model' field");
    assert.equal(modelField!.type, "select", "model field must be a select");
    const optionValues = (modelField!.options ?? []).map((o) => o.value);
    assert.ok(optionValues.includes("tinybert"), "model options must include tinybert");
    assert.ok(optionValues.includes("bert-base"), "model options must include bert-base");

    assert.ok(byKey.has("minTokens"), "schema must include minTokens");
    assert.ok(byKey.has("compressionRate"), "schema must include compressionRate");
    assert.ok(byKey.has("modelPath"), "schema must include modelPath");
  });
});
