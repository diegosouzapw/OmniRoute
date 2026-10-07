/**
 * Regression for #11817 — the streaming OpenAI→Claude translator dropped the
 * upstream usage block (including prompt-cache accounting) whenever it arrived
 * on a trailing usage-only chunk shaped `{"choices":[],"usage":{...}}`.
 *
 * Many OpenAI-compatible upstreams (confirmed: Fireworks / kimi-k3, also vLLM
 * and Together with `stream_options.include_usage`) emit usage exactly that
 * way. `openaiToClaudeResponse()` returned early on `!chunk.choices?.[0]`
 * BEFORE reading `chunk.usage`, so `state.usage` stayed undefined and every
 * downstream consumer fell back to OmniRoute's own tokenizer estimate — no
 * cache_read_input_tokens, no cache_creation_input_tokens, and an input_tokens
 * figure that disagreed with the provider's own count.
 *
 * Impact was silent over-billing: a session served ~75% from prompt cache was
 * metered at the full uncached rate.
 *
 * Runner: node --import tsx/esm --test tests/unit/openai-to-claude-trailing-usage-11817.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");

function newState() {
  return { toolCalls: new Map(), messageId: "msg_11817", model: "kimi-k3" } as Record<
    string,
    unknown
  >;
}

test("#11817 — usage on a trailing choices:[] chunk is harvested, with cache split", () => {
  const state = newState();

  openaiToClaudeResponse({ choices: [{ index: 0, delta: { content: "ok" } }] }, state);
  openaiToClaudeResponse({ choices: [{ index: 0, delta: {}, finish_reason: "stop" }] }, state);
  openaiToClaudeResponse(
    {
      choices: [],
      usage: {
        prompt_tokens: 6103,
        completion_tokens: 24,
        prompt_tokens_details: { cached_tokens: 6102 },
      },
    },
    state
  );

  assert.deepEqual(state.usage, {
    input_tokens: 1, // 6103 - 6102 cached
    output_tokens: 24,
    cache_read_input_tokens: 6102,
  });
});

test("#11817 — cache_creation_tokens on a trailing chunk is mapped too", () => {
  const state = newState();
  openaiToClaudeResponse(
    {
      choices: [],
      usage: {
        prompt_tokens: 1000,
        completion_tokens: 5,
        prompt_tokens_details: { cached_tokens: 400, cache_creation_tokens: 100 },
      },
    },
    state
  );

  assert.deepEqual(state.usage, {
    input_tokens: 500,
    output_tokens: 5,
    cache_read_input_tokens: 400,
    cache_creation_input_tokens: 100,
  });
});

test("#11817 — a usage-only chunk still emits no Claude events", () => {
  const state = newState();
  const out = openaiToClaudeResponse(
    { choices: [], usage: { prompt_tokens: 10, completion_tokens: 1 } },
    state
  );
  assert.equal(out, null);
});

test("#11817 — no regression: usage carried inline on the finish chunk", () => {
  const state = newState();
  openaiToClaudeResponse({ choices: [{ index: 0, delta: { content: "hi" } }] }, state);
  openaiToClaudeResponse(
    {
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 100, completion_tokens: 10 },
    },
    state
  );
  assert.deepEqual(state.usage, { input_tokens: 100, output_tokens: 10 });
});

test("#11817 — no regression: empty and nullish chunks are still ignored", () => {
  assert.equal(openaiToClaudeResponse(null, newState()), null);
  assert.equal(openaiToClaudeResponse({ choices: [] }, newState()), null);
  assert.equal(openaiToClaudeResponse({}, newState()), null);
});
