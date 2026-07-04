/**
 * Regression test for #6026.
 *
 * Antigravity IDE (via AgentBridge/MITM → `/v1/antigravity` → translator) can ship a
 * truncated history whose FIRST turn is a tool result (`functionResponse`) with no
 * preceding tool call. When that survives the antigravity→openai→claude chain, Anthropic
 * (Vertex `claude-opus-4.6`) rejects it with HTTP 400:
 *
 *   messages.0.content.1: unexpected tool_use_id found in tool_result blocks:
 *   toolu_vrtx_...: Each tool_result block must have a corresponding tool_use block in
 *   the previous message.
 *
 * The fix strips orphan tool_results at the antigravity message-assembly point
 * (`antigravityToOpenAIRequest`) by reusing `fixToolPairs`, so the orphan never reaches
 * the upstream Claude request.
 *
 * PURE-FUNCTION ONLY — this test imports the translator + sanitizer functions directly.
 * It must NEVER start the MITM proxy, bind :443/:80, touch /etc/hosts, or install a CA.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { antigravityToOpenAIRequest } = await import(
  "../../open-sse/translator/request/antigravity-to-openai.ts"
);
const { fixToolPairs } = await import("../../open-sse/services/contextManager.ts");

test("#6026: antigravityToOpenAIRequest strips an orphan functionResponse (no preceding functionCall)", () => {
  const result = antigravityToOpenAIRequest(
    "ag/claude-opus-4-6",
    {
      request: {
        contents: [
          {
            // First (and only) turn is a tool result with NO preceding tool call.
            role: "user",
            parts: [
              {
                functionResponse: {
                  id: "toolu_vrtx_test",
                  name: "read_file",
                  response: { result: { ok: true } },
                },
              },
            ],
          },
        ],
      },
    },
    false
  );

  // The orphan tool message must be gone — otherwise the openai→claude step would emit an
  // orphan tool_result block and Anthropic would 400.
  const orphan = result.messages.find(
    (m: Record<string, unknown>) => m.role === "tool" && m.tool_call_id === "toolu_vrtx_test"
  );
  assert.equal(orphan, undefined, "orphan tool_result message must be stripped");
  assert.equal(
    result.messages.some((m: Record<string, unknown>) => m.role === "tool"),
    false,
    "no orphan tool messages should remain"
  );
});

test("#6026: well-formed functionCall/functionResponse pair is preserved (no regression)", () => {
  const result = antigravityToOpenAIRequest(
    "ag/claude-opus-4-6",
    {
      request: {
        contents: [
          {
            role: "model",
            parts: [{ functionCall: { id: "toolu_vrtx_ok", name: "read_file", args: {} } }],
          },
          {
            role: "user",
            parts: [
              {
                functionResponse: {
                  id: "toolu_vrtx_ok",
                  name: "read_file",
                  response: { result: { ok: true } },
                },
              },
            ],
          },
        ],
      },
    },
    false
  );

  const assistant = result.messages.find(
    (m: Record<string, unknown>) => m.role === "assistant"
  );
  const tool = result.messages.find((m: Record<string, unknown>) => m.role === "tool");
  assert.ok(assistant, "assistant tool_call message must survive");
  assert.ok(tool, "matched tool_result message must survive");
  assert.equal((tool as Record<string, unknown>).tool_call_id, "toolu_vrtx_ok");
});

test("#6026: fixToolPairs removes the exact Anthropic-shape orphan tool_result block", () => {
  // Mirrors the reporter's failing body: messages[0] is a user message whose content array
  // holds a tool_result block with no matching tool_use anywhere in the request.
  const messages: Record<string, unknown>[] = [
    {
      role: "user",
      content: [
        { type: "text", text: "continue" },
        { type: "tool_result", tool_use_id: "toolu_vrtx_test", content: "stale" },
      ],
    },
  ];

  const fixed = fixToolPairs(messages);

  const stillHasOrphan = fixed.some(
    (m) =>
      m.role === "user" &&
      Array.isArray(m.content) &&
      (m.content as Record<string, unknown>[]).some(
        (b) => b.type === "tool_result" && b.tool_use_id === "toolu_vrtx_test"
      )
  );
  assert.equal(stillHasOrphan, false, "orphan tool_result block must be stripped");
});
