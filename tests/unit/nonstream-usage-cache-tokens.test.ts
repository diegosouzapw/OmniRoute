/**
 * Non-streaming claude→openai usage must surface prompt-cache tokens.
 *
 * The streaming translator already folds cache_read into prompt_tokens and
 * exposes prompt_tokens_details (#1426/#2215). The non-streaming path built the
 * usage object from input_tokens/output_tokens only, so an OpenAI-format client
 * behind a cached Claude upstream saw prompt_tokens=<uncached remainder> (e.g.
 * 23 for a ~9k-token request) and no cache visibility at all — billing/telemetry
 * built on the OpenAI usage contract under-reported by orders of magnitude.
 *
 * Contract mirrored from the streaming path:
 *   prompt_tokens          = input_tokens + cache_read_input_tokens
 *   prompt_tokens_details.cached_tokens          = cache_read_input_tokens
 *   prompt_tokens_details.cache_creation_tokens  = cache_creation_input_tokens
 *   (cache_creation stays OUT of prompt_tokens — #2215: providers price it
 *    differently and folding it in broke min-token accounting.)
 */
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

function claudeResponse(usage: Record<string, number>) {
  return {
    id: "msg_test",
    model: "claude-sonnet-5",
    stop_reason: "end_turn",
    content: [{ type: "text", text: "ok" }],
    usage,
  };
}

describe("non-streaming claude→openai usage cache tokens", () => {
  test("folds cache_read into prompt_tokens and exposes details", () => {
    const out = translateNonStreamingResponse(
      claudeResponse({
        input_tokens: 2,
        output_tokens: 6,
        cache_read_input_tokens: 8941,
        cache_creation_input_tokens: 27,
      }),
      FORMATS.CLAUDE,
      FORMATS.OPENAI
    ) as Record<string, unknown>;

    const usage = out.usage as Record<string, unknown>;
    assert.equal(usage.prompt_tokens, 8943, "prompt_tokens = input + cache_read");
    assert.equal(usage.completion_tokens, 6);
    assert.equal(usage.total_tokens, 8949);
    const details = usage.prompt_tokens_details as Record<string, unknown>;
    assert.ok(details, "prompt_tokens_details must be present when cache fields exist");
    assert.equal(details.cached_tokens, 8941);
    assert.equal(details.cache_creation_tokens, 27);
  });

  test("no cache fields → plain usage without details (unchanged shape)", () => {
    const out = translateNonStreamingResponse(
      claudeResponse({ input_tokens: 10, output_tokens: 5 }),
      FORMATS.CLAUDE,
      FORMATS.OPENAI
    ) as Record<string, unknown>;

    const usage = out.usage as Record<string, unknown>;
    assert.equal(usage.prompt_tokens, 10);
    assert.equal(usage.total_tokens, 15);
    assert.equal(usage.prompt_tokens_details, undefined);
  });
});
