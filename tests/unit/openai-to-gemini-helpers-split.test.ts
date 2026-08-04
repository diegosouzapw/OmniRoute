// Split-guard for the openai-to-gemini helpers extraction (god-file decomposition):
// the pure historical-tool-context builders, undefined-pruning, thought-signature
// extraction, tool-name remapping, the Vertex provider check, and the Antigravity
// generation-config defaults moved verbatim from openai-to-gemini.ts into
// openai-to-gemini/helpers.ts. These were module-private, so the translator's public
// API is unchanged; the host imports them back internally. The locks pin the leaf's
// pure behaviour and that the host now imports the leaf.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import * as h from "../../open-sse/translator/request/openai-to-gemini/helpers.ts";

test("isVertexGeminiProvider matches only the vertex provider ids", () => {
  assert.equal(h.isVertexGeminiProvider("vertex"), true);
  assert.equal(h.isVertexGeminiProvider("vertex-partner"), true);
  assert.equal(h.isVertexGeminiProvider("openai"), false);
  assert.equal(h.isVertexGeminiProvider(undefined), false);
});

test("buildChangedToolNameMap keeps only renamed entries, else null", () => {
  const changed = h.buildChangedToolNameMap(
    new Map([
      ["a", "a"],
      ["b_sanitized", "b"],
    ])
  );
  assert.deepEqual([...(changed ?? new Map()).entries()], [["b_sanitized", "b"]]);
  assert.equal(h.buildChangedToolNameMap(new Map([["a", "a"]])), null);
});

test("extractClientThoughtSignature reads the first non-empty signature field", () => {
  assert.equal(h.extractClientThoughtSignature({ thoughtSignature: "sig" }), "sig");
  assert.equal(h.extractClientThoughtSignature({ function: { thought_signature: "s2" } }), "s2");
  assert.equal(h.extractClientThoughtSignature({ thoughtSignature: "" }), null);
  assert.equal(h.extractClientThoughtSignature({}), null);
  assert.equal(h.extractClientThoughtSignature(null), null);
});

test("deepCleanUndefined deletes '[undefined]' string values in place, recursively", () => {
  const obj = { a: 1, b: "[undefined]", c: { d: "[undefined]", e: 2 }, f: ["[undefined]"] };
  h.deepCleanUndefined(obj);
  assert.deepEqual(obj, { a: 1, c: { e: 2 }, f: ["[undefined]"] });
});

test("applyAntigravityGenerationDefaults fills topK/topP and bumps maxOutputTokens past the budget", () => {
  assert.deepEqual(h.applyAntigravityGenerationDefaults({}), { topK: 40, topP: 1 });
  assert.deepEqual(h.applyAntigravityGenerationDefaults({ topK: 5 }), { topK: 5, topP: 1 });
  const withBudget = h.applyAntigravityGenerationDefaults({
    thinkingConfig: { thinkingBudget: 100, includeThoughts: true },
  });
  assert.equal(withBudget.maxOutputTokens, 101);
});

test("historical-tool-context builders stringify and escape as expected", () => {
  assert.equal(h.stringifyHistoricalToolArguments("raw"), "raw");
  assert.equal(h.stringifyHistoricalToolArguments({ a: 1 }), '{"a":1}');
  assert.equal(h.stringifyHistoricalToolArguments(undefined), "{}");
  assert.equal(
    h.buildInertHistoricalToolCallText("foo", { a: 1 }),
    '[tool_history_call: foo] {"a":1}'
  );
  assert.equal(
    h.buildInertHistoricalToolResponseText("bar", "ok"),
    "[tool_history_result: bar] ok"
  );
  // Attribute escaping includes quotes; content escaping does not.
  assert.equal(h.escapeHistoricalContextAttribute('<t>"&'), "&lt;t&gt;&quot;&amp;");
  assert.equal(h.escapeHistoricalContextContent('<t>"&'), '&lt;t&gt;"&amp;');
});

test("buildHistoricalToolResultContext wraps escaped source + result in the context tag", () => {
  assert.equal(
    h.buildHistoricalToolResultContext("myTool", { r: 1 }),
    '<previous_tool_result_context source="myTool">\n{"r":1}\n</previous_tool_result_context>'
  );
});

test("host imports the helpers leaf and no longer defines them inline", () => {
  const host = fs.readFileSync(
    path.join("open-sse", "translator", "request", "openai-to-gemini.ts"),
    "utf-8"
  );
  assert.match(host, /from "\.\/openai-to-gemini\/helpers\.ts"/);
  assert.doesNotMatch(host, /^function deepCleanUndefined\(/m);
  assert.doesNotMatch(host, /^type GeminiGenerationConfig =/m);
});
