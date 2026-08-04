// Port of upstream decolua/9router#820 by @hiepau1231.
// MiniMax exposes a Claude-compatible endpoint but rejects Anthropic's
// extended `output_config` parameter (used to steer reasoning effort and
// structured output) with a generic 400 "invalid params" response.
// `prepareClaudeRequest()` must strip the entire `output_config` for
// MiniMax providers, while preserving it verbatim for Anthropic Claude
// and other Claude-compatible upstreams that already accept it.
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { prepareClaudeRequest } from "../../open-sse/translator/helpers/claudeHelper.ts";

describe("prepareClaudeRequest output_config stripping for MiniMax", () => {
  const buildBody = () => ({
    model: "MiniMax-M2.7",
    system: [{ type: "text", text: "You are helpful." }],
    messages: [{ role: "user", content: [{ type: "text", text: "continue" }] }],
    max_tokens: 1024,
    output_config: {
      effort: "medium",
      format: {
        type: "json_schema",
        schema: {
          type: "object",
          properties: { title: { type: "string" } },
          required: ["title"],
          additionalProperties: false,
        },
      },
    },
  });

  test("strips output_config (effort + format) for minimax", () => {
    const body = buildBody();
    const result = prepareClaudeRequest(body as any, "minimax");
    assert.equal(result.output_config, undefined);
    // Sanity: rest of the request must still be intact.
    assert.equal(result.messages?.[0]?.content?.[0]?.text, "continue");
    assert.equal(result.max_tokens, 1024);
  });

  test("strips output_config (effort + format) for minimax-cn", () => {
    const body = buildBody();
    const result = prepareClaudeRequest(body as any, "minimax-cn");
    assert.equal(result.output_config, undefined);
  });

  test("preserves output_config for Anthropic Claude", () => {
    const body = buildBody();
    const original = JSON.parse(JSON.stringify(body.output_config));
    const result = prepareClaudeRequest(body as any, "claude");
    assert.deepEqual(result.output_config, original);
  });
});
