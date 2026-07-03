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
  isTextualReasoningTagNativeRoute,
  shouldParseTextualReasoningTags,
} from "../../open-sse/handlers/responseSanitizer/reasoning.ts";
import { sanitizeOpenAIResponse } from "../../open-sse/handlers/responseSanitizer.ts";

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

// ── MiniMax M3 textual reasoning-tag route (9router#2231) ──────────────────────
//
// MiniMax M3 leaks raw <think>...</think> into `content` instead of a separate
// reasoning_content field on the 8 OpenAI-format provider tiers below. The two
// direct minimax/minimax-cn tiers stay on Anthropic's Messages format
// (targetFormat: "claude") and already surface reasoning natively — they must
// stay unaffected.
describe("responseSanitizer/reasoning — MiniMax M3 textual reasoning-tag route", () => {
  const affectedRoutes: Array<[string, string]> = [
    ["trae", "minimax-m3"],
    ["huggingchat", "minimaxai/minimax-m3"],
    ["bazaarlink", "minimax-m3"],
    ["ollama-cloud", "minimax-m3"],
    ["opencode", "minimax-m3-free"],
    ["cline", "minimax/minimax-m3"],
    ["opencode-zen", "minimax-m3"],
    ["codebuddy-cn", "minimax-m3"],
  ];

  for (const [provider, model] of affectedRoutes) {
    it(`isTextualReasoningTagNativeRoute("${provider}", "${model}") === true`, () => {
      assert.equal(isTextualReasoningTagNativeRoute(provider, model), true);
    });
  }

  it("shouldParseTextualReasoningTags is true for a mixed-case MiniMax M3 model id (huggingchat)", () => {
    assert.equal(shouldParseTextualReasoningTags("huggingchat", "MiniMaxAI/MiniMax-M3"), true);
  });

  it("extracts <think>...</think> from delta.content into reasoning_content on an affected route", () => {
    const chunk = {
      choices: [{ index: 0, delta: { content: "<think>reasoning here</think>final answer" } }],
    };
    const sanitized = sanitizeOpenAIResponse(chunk, {
      parseTextualReasoningTags: shouldParseTextualReasoningTags("trae", "minimax-m3"),
    }) as { choices: Array<{ delta: { content: string; reasoning_content?: string } }> };

    const delta = sanitized.choices[0].delta;
    assert.equal(delta.content, "final answer");
    assert.equal(delta.reasoning_content, "reasoning here");
  });

  it("leaves <think> tags untouched in content when the route is not tag-native (pre-fix behavior)", () => {
    const chunk = {
      choices: [{ index: 0, delta: { content: "<think>reasoning here</think>final answer" } }],
    };
    const sanitized = sanitizeOpenAIResponse(chunk, {
      parseTextualReasoningTags: shouldParseTextualReasoningTags("openai", "gpt-4"),
    }) as { choices: Array<{ delta: { content: string; reasoning_content?: string } }> };

    const delta = sanitized.choices[0].delta;
    assert.equal(delta.content, "<think>reasoning here</think>final answer");
    assert.equal(delta.reasoning_content, undefined);
  });
});

describe("responseSanitizer/reasoning — MiniMax M3 fix regression guards", () => {
  it("direct minimax tier (claude format) stays unaffected", () => {
    assert.equal(isTextualReasoningTagNativeRoute("minimax", "minimax-m3"), false);
    assert.equal(shouldParseTextualReasoningTags("minimax", "MiniMax-M3"), false);
  });

  it("direct minimax-cn tier (claude format) stays unaffected", () => {
    assert.equal(isTextualReasoningTagNativeRoute("minimax-cn", "minimax-m3"), false);
    assert.equal(shouldParseTextualReasoningTags("minimax-cn", "MiniMax-M3"), false);
  });

  it("MiniMax M2.x (non-M3) models on OpenAI-format tiers stay unaffected", () => {
    assert.equal(isTextualReasoningTagNativeRoute("trae", "minimax-m2.7"), false);
  });

  it("existing deepseek-r1 / qwq textual-reasoning routes are unaffected", () => {
    assert.equal(shouldParseTextualReasoningTags("together", "deepseek-ai/DeepSeek-R1"), true);
    assert.equal(shouldParseTextualReasoningTags("cloudflare-ai", "@cf/qwen/qwq-32b"), true);
    assert.equal(shouldParseTextualReasoningTags("openrouter", "deepseek/deepseek-v4-pro"), false);
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
