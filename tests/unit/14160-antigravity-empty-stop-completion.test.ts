import assert from "node:assert/strict";
import { test } from "node:test";
import { isEmptyContentResponse } from "../../open-sse/services/errorClassifier.ts";

/**
 * #14160 — an empty (but successful) completion from antigravity's Gemini is a
 * real answer: some prompts legitimately produce no text, and the upstream says
 * so with a normal terminal finish reason (`STOP` → `stop`). The fake-success
 * guard flagged these anyway, so the non-streaming leg rewrote them into
 * synthetic 502s that fed model lockout — a few hundred such "failures" a day
 * kept most of the reporter's 22-connection pool excluded.
 *
 * The guard exists for free-tier/scraping providers (pollinations,
 * perplexity-web — #13461) whose failure mode is an empty 200 shell. A
 * first-party API does not fake-succeed, so for antigravity an empty completion
 * carrying a normal stop reason passes through as a valid 200. Every other
 * provider keeps the existing behaviour.
 */

const emptyStopOpenAI = {
  choices: [{ message: { role: "assistant", content: "" }, finish_reason: "stop" }],
};

test("antigravity: empty completion with finish_reason=stop is a legit empty answer (#14160)", () => {
  assert.equal(isEmptyContentResponse(emptyStopOpenAI, { provider: "antigravity" }), false);
});

test("antigravity: empty claude-shape completion with stop_reason=end_turn is legit (#14160)", () => {
  assert.equal(
    isEmptyContentResponse({ content: [], stop_reason: "end_turn" }, { provider: "antigravity" }),
    false
  );
});

test("untrusted providers keep the fake-success guard on empty stop completions (#14160)", () => {
  assert.equal(isEmptyContentResponse(emptyStopOpenAI, { provider: "pollinations" }), true);
  assert.equal(isEmptyContentResponse(emptyStopOpenAI), true);
  assert.equal(
    isEmptyContentResponse({ content: [], stop_reason: "end_turn" }, { provider: "some-scraper" }),
    true
  );
});

test("antigravity: an empty shell with NO terminal stop reason is still flagged (#14160)", () => {
  // No finish_reason at all: the upstream did not even claim a normal stop, so
  // the response stays suspicious.
  assert.equal(
    isEmptyContentResponse(
      { choices: [{ message: { content: "" } }] },
      { provider: "antigravity" }
    ),
    true
  );
});

test("existing legit-empty carve-outs are unchanged (#14160)", () => {
  assert.equal(
    isEmptyContentResponse({
      choices: [{ message: { content: "" }, finish_reason: "length" }],
    }),
    false
  );
  assert.equal(
    isEmptyContentResponse({ content: [], stop_reason: "max_tokens" }, { provider: "antigravity" }),
    false
  );
});
