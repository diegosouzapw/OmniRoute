import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { sanitizeResponsesBody } from "../../open-sse/executors/opencode.ts";

/**
 * Only the Responses-API payload-sanitization half of upstream 9router PR #4145 is wired
 * into OpencodeExecutor.transformRequest. The other half of that port — forcing
 * `stream: true` and injecting a bash/glob/grep/read fingerprint-tools quartet for every
 * opencode/opencode-zen request — is intentionally NOT wired in: it is already fully
 * covered for gated (free-tier) requests by the free-tier request contract
 * (opencodeFreeTierContract.ts), and forcing it for a non-gated (paid) request regressed
 * the "a paid model keeps the client's own stream/tools" contract asserted by
 * `transformRequest: the contract is applied for a free model and skipped for a paid one`
 * in opencode-free-tier-request-contract.test.ts.
 */
describe("PR #4145 OpenCode Responses API sanitization", () => {
  describe("sanitizeResponsesBody", () => {
    it("converts max_tokens/max_completion_tokens to max_output_tokens", () => {
      const body: Record<string, unknown> = { max_tokens: 2048 };
      sanitizeResponsesBody(body);
      assert.equal(body.max_output_tokens, 2048);
      assert.equal(body.max_tokens, undefined);
    });

    it("strips prior reasoning items and encrypted_content fields", () => {
      const body: Record<string, unknown> = {
        input: [
          { type: "reasoning", encrypted_content: "secret" },
          { type: "message", role: "user", content: "hello", encrypted_content: "old" },
        ],
      };
      sanitizeResponsesBody(body);
      const input = body.input as Array<Record<string, unknown>>;
      assert.equal(input.length, 1);
      assert.equal(input[0].type, "message");
      assert.equal(input[0].encrypted_content, undefined);
    });

    it("ensures empty parameters object has properties map", () => {
      const body: Record<string, unknown> = {
        tools: [
          {
            type: "function",
            name: "test_tool",
            parameters: { type: "object" },
          },
        ],
      };
      sanitizeResponsesBody(body);
      const tools = body.tools as Array<{ parameters?: { properties?: object } }>;
      assert.ok(tools[0].parameters?.properties);
    });
  });
});
