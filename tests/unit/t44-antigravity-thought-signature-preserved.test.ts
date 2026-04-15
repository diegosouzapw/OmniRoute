import test from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";

test("T44: Antigravity preserves thoughtSignature for functionCall turns", () => {
  const executor = new AntigravityExecutor();
  const transformed = executor.transformRequest(
    "gemini-3-flash",
    {
      request: {
        contents: [
          {
            role: "model",
            parts: [
              { thought: true, text: "internal reasoning" },
              { thoughtSignature: "sig_123" },
              {
                functionCall: {
                  id: "call_1",
                  name: "default_api:memos_load_user_memory",
                  args: { userId: "u1" },
                },
              },
            ],
          },
        ],
        tools: [{ functionDeclarations: [{ name: "default_api:memos_load_user_memory" }] }],
      },
    },
    true,
    { projectId: "test-project" }
  );

  const parts = transformed.request.contents[0].parts;

  assert.equal(
    parts.some((part) => part.thought === true),
    false,
    "thought text should still be stripped before sending to Antigravity"
  );
  assert.equal(
    parts.some((part) => part.thoughtSignature === "sig_123"),
    true,
    "tool-call turns must keep thoughtSignature for Gemini 3+ compatibility"
  );
  assert.equal(
    parts.some((part) => part.functionCall?.name === "default_api:memos_load_user_memory"),
    true,
    "functionCall must still be present"
  );
});

test("T44: Antigravity still strips standalone thoughtSignature without tool calls", () => {
  const executor = new AntigravityExecutor();
  const transformed = executor.transformRequest(
    "gemini-3-flash",
    {
      request: {
        contents: [
          {
            role: "model",
            parts: [{ thoughtSignature: "sig_123" }, { text: "plain text" }],
          },
        ],
      },
    },
    true,
    { projectId: "test-project" }
  );

  assert.deepEqual(transformed.request.contents[0].parts, [{ text: "plain text" }]);
});
