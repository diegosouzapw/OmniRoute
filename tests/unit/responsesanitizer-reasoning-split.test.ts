/**
 * Characterization + API-surface test: responseSanitizer.ts god-file decomposition.
 *
 * The reasoning-tag detection/extraction block (regexes + extraction helpers +
 * route classification) was extracted verbatim from
 * open-sse/handlers/responseSanitizer.ts into the ZERO-IMPORT, self-contained
 * leaf open-sse/handlers/responseSanitizer/reasoning.ts. The response/usage/
 * streaming sanitization stays in the host.
 *
 * Verifies that:
 *   1. extractThinkingFromContent / shouldParseTextualReasoningTags behave.
 *   2. The host still exposes the FULL public API (7 names; the two reasoning
 *      functions are now re-exported from the leaf).
 *   3. The reasoning leaf exports its public pieces directly.
 *
 * Deeper sanitization behaviour is covered by the existing response-sanitizer /
 * strip-reasoning-header suites; this pins the extraction boundary.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  extractThinkingFromContent,
  shouldParseTextualReasoningTags,
} from "../../open-sse/handlers/responseSanitizer/reasoning.ts";

describe("responseSanitizer/reasoning — extractThinkingFromContent", () => {
  it("leaves tag-free content untouched (thinking = null)", () => {
    const out = extractThinkingFromContent("just an answer");
    assert.equal(out.content, "just an answer");
    assert.equal(out.thinking, null);
  });
  it("splits a <think>…</think> prefix into thinking + content", () => {
    const out = extractThinkingFromContent("<think>reasoning here</think>final answer");
    assert.ok(out.thinking && out.thinking.includes("reasoning here"), "thinking captured");
    assert.ok(out.content.includes("final answer"), "content kept");
    assert.ok(!out.content.includes("<think>"), "think tag stripped from content");
  });
});

describe("responseSanitizer/reasoning — shouldParseTextualReasoningTags", () => {
  it("returns a boolean; false for a generic non-textual-reasoning route", () => {
    const r = shouldParseTextualReasoningTags("openai", "gpt-4");
    assert.equal(typeof r, "boolean");
    assert.equal(r, false);
  });
  it("returns false when provider/model are missing", () => {
    assert.equal(shouldParseTextualReasoningTags(undefined, undefined), false);
  });
});

// ── host public API surface ──────────────────────────────────────────────────

const host = await import("../../open-sse/handlers/responseSanitizer.ts");

describe("responseSanitizer.ts public API surface (7 names)", () => {
  const expectedFns = [
    "extractThinkingFromContent", // re-exported from leaf
    "shouldParseTextualReasoningTags", // re-exported from leaf
    "sanitizeOpenAIResponse",
    "sanitizeResponsesApiResponse",
    "sanitizeStreamingChunk",
  ];
  for (const name of expectedFns) {
    it(`exposes ${name} as a function`, () => {
      assert.equal(typeof host[name], "function", `${name} must be a function on the host`);
    });
  }
  it("keeps the OMIT_STREAMING_CHUNK_MARKER constant", () => {
    assert.equal(typeof host.OMIT_STREAMING_CHUNK_MARKER, "string");
  });
});

describe("reasoning.ts exports its public pieces directly", () => {
  it("the re-exported reasoning helpers are functions on the leaf", async () => {
    const r = await import("../../open-sse/handlers/responseSanitizer/reasoning.ts");
    assert.equal(typeof r.extractThinkingFromContent, "function");
    assert.equal(typeof r.shouldParseTextualReasoningTags, "function");
  });
});
