/**
 * TDD tests for the session-dedup compression engine (R11/N2/TO1).
 * Run: node --import tsx/esm --test tests/unit/compression/session-dedup.test.ts
 */

import { describe, it, before } from "node:test";
import assert from "node:assert/strict";

import { sessionDedupEngine } from "../../../open-sse/services/compression/engines/session-dedup/index.ts";
import {
  registerBuiltinCompressionEngines,
  getCompressionEngine,
} from "../../../open-sse/services/compression/index.ts";

const REPEATED_BLOCK = `function expensiveCalc(x) {
  // step 1
  const a = x * 2;
  // step 2
  const b = a + 100;
  // step 3
  return b;
}`;

function makeBody(messages: Array<{ role: string; content: string }>) {
  return { model: "gpt-4", messages };
}

describe("session-dedup engine", () => {
  before(() => {
    registerBuiltinCompressionEngines();
  });

  it("is registered and retrievable by id", () => {
    const engine = getCompressionEngine("session-dedup");
    assert.ok(engine, "getCompressionEngine('session-dedup') must return the engine");
    assert.equal(engine.id, "session-dedup");
    assert.equal(typeof engine.apply, "function");
    assert.equal(typeof engine.compress, "function");
    assert.equal(typeof engine.getConfigSchema, "function");
    assert.equal(typeof engine.validateConfig, "function");
    assert.equal(engine.stackable, true);
    assert.ok(typeof engine.stackPriority === "number");
  });

  it("deduplicates a block appearing verbatim in turn 1 and turn 3", () => {
    const body = makeBody([
      { role: "user", content: `Here is the code:\n${REPEATED_BLOCK}` },
      { role: "assistant", content: "I understand the code." },
      { role: "user", content: `Please review again:\n${REPEATED_BLOCK}` },
    ]);

    const result = sessionDedupEngine.apply(body as Record<string, unknown>);

    assert.equal(result.compressed, true, "should report compressed=true when dedup happened");

    const messages = result.body.messages as Array<{ role: string; content: string }>;

    // Turn 0 (index 0): first occurrence — must keep the block intact
    assert.ok(
      messages[0].content.includes(REPEATED_BLOCK),
      "first occurrence must remain intact in turn 0"
    );

    // Turn 2 (index 2): duplicate — must NOT contain the raw repeated block text
    assert.ok(
      !messages[2].content.includes(REPEATED_BLOCK),
      "duplicate block must be removed from turn 2"
    );

    // Turn 2: must contain a reference marker
    assert.match(
      messages[2].content,
      /\[dedup:ref sha=[0-9a-f]{24}\]/,
      "turn 2 must contain a [dedup:ref sha=<24hex>] marker"
    );

    // Output must be shorter than input
    const inputLen = JSON.stringify(body).length;
    const outputLen = JSON.stringify(result.body).length;
    assert.ok(outputLen < inputLen, "output must be shorter than input");

    // Stats must be present
    assert.ok(result.stats !== null, "stats must be present");
    assert.ok(result.stats!.originalTokens > 0);
    assert.ok(result.stats!.compressedTokens < result.stats!.originalTokens);
  });

  it("does NOT dedup small/unique blocks (no false positives)", () => {
    const body = makeBody([
      { role: "user", content: "hi" },
      { role: "assistant", content: "hello" },
      { role: "user", content: "bye" },
    ]);

    const result = sessionDedupEngine.apply(body as Record<string, unknown>);

    assert.equal(result.compressed, false, "must not dedup tiny/unique messages");

    const messages = result.body.messages as Array<{ role: string; content: string }>;
    assert.equal(messages[0].content, "hi");
    assert.equal(messages[1].content, "hello");
    assert.equal(messages[2].content, "bye");
  });

  it("O(n²) guard: a huge multi-thousand-line message stays bounded in time and memory", () => {
    // Regression for the OOM incident: an agent conversation embedded a large
    // line-numbered file view (a tool result pasting a multi-thousand-line file
    // back into the chat) repeated across messages. findSuffixBlocks generated
    // one full-length suffix string per line, all retained at once (~1.7GB of
    // live strings), OOM-killing the heap.
    // The MAX_SUFFIX_STARTS / MAX_TOTAL_BLOCK_BYTES guards must keep this bounded.
    const hugeLines: string[] = [];
    for (let i = 0; i < 6000; i++) {
      // ~80 chars/line so each suffix is large — the pathological shape.
      hugeLines.push(`${i}:               "config_snapshot": { "value": ${i}, "pad": "xxxxxxxxxxxxxx" }`);
    }
    const hugeContent = hugeLines.join("\n");
    const body = makeBody([
      { role: "user", content: `Read file result:\n${hugeContent}` },
      { role: "assistant", content: "analysing" },
      { role: "user", content: `Read file again:\n${hugeContent}` },
    ]);

    const before = process.memoryUsage().heapUsed;
    const t0 = Date.now();
    const result = sessionDedupEngine.apply(body as Record<string, unknown>);
    const elapsed = Date.now() - t0;
    const grew = process.memoryUsage().heapUsed - before;

    // Must complete quickly (O(n²) time would take seconds/minutes here).
    assert.ok(elapsed < 4000, `session-dedup must stay fast on huge input (took ${elapsed}ms)`);
    // Heap growth must be bounded well below the pre-fix multi-hundred-MB / GB blow-up.
    // Pre-fix this single call retained hundreds of MB of suffix strings; the 8MB
    // block budget (plus overhead) must keep transient growth modest.
    assert.ok(
      grew < 120 * 1024 * 1024,
      `heap growth must stay bounded (grew ${(grew / 1048576).toFixed(1)}MB)`
    );
    // Result must still be a valid body (engine did not throw / corrupt).
    assert.ok(Array.isArray((result.body as Record<string, unknown>).messages));
  });

  it("never deduplicates the system prompt", () => {
    const body = makeBody([
      { role: "system", content: REPEATED_BLOCK },
      { role: "user", content: REPEATED_BLOCK },
      { role: "assistant", content: "ok" },
    ]);

    const result = sessionDedupEngine.apply(body as Record<string, unknown>);

    const messages = result.body.messages as Array<{ role: string; content: string }>;
    // System prompt must always remain intact regardless
    assert.ok(messages[0].content.includes(REPEATED_BLOCK), "system prompt must never be touched");
  });

  it("does not corrupt multipart (non-string) content items", () => {
    const multipartBody = {
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: REPEATED_BLOCK },
            { type: "image_url", image_url: { url: "data:image/png;base64,abc" } },
          ],
        },
        { role: "assistant", content: "ok" },
        {
          role: "user",
          content: [{ type: "text", text: REPEATED_BLOCK }],
        },
      ],
    };

    // Must not throw and must not corrupt image parts
    const result = sessionDedupEngine.apply(multipartBody as Record<string, unknown>);
    const messages = result.body.messages as Array<{ role: string; content: unknown }>;
    const firstContent = messages[0].content as Array<{ type: string; image_url?: unknown }>;
    const imageItem = firstContent.find((c) => c.type === "image_url");
    assert.ok(imageItem, "image_url item must still be present");
    assert.deepEqual(imageItem!.image_url, { url: "data:image/png;base64,abc" });
  });

  it("getConfigSchema returns an array with expected fields", () => {
    const schema = sessionDedupEngine.getConfigSchema();
    assert.ok(Array.isArray(schema));
    const keys = schema.map((f) => f.key);
    assert.ok(keys.includes("minBlockChars"), "schema must include minBlockChars");
    assert.ok(keys.includes("enabled"), "schema must include enabled");
  });

  it("validateConfig accepts valid config and rejects invalid", () => {
    assert.equal(sessionDedupEngine.validateConfig({}).valid, true);
    assert.equal(sessionDedupEngine.validateConfig({ minBlockChars: 50 }).valid, true);
    assert.equal(sessionDedupEngine.validateConfig({ minBlockChars: -1 }).valid, false);
    assert.equal(sessionDedupEngine.validateConfig({ enabled: "yes" }).valid, false);
  });
});
