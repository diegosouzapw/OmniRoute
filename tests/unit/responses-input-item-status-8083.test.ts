import test from "node:test";
import assert from "node:assert/strict";

// Kept in its own file rather than growing the frozen
// tests/unit/translator-openai-responses-req.test.ts (file-size ratchet).
const { openaiToOpenAIResponsesRequest } = await import(
  "../../open-sse/translator/request/openai-responses.ts"
);

// --- Issue #8083: strict Responses-compatible upstreams reject items whose
// `type` is set without an accompanying `status`, returning
// 400 MissingParameter input.status. `status` is optional per OpenAI's own
// schema, so setting it to "completed" on translated history items (which by
// construction always represent an already-completed prior turn) is a safe
// superset fix that also satisfies stricter third-party validators.
test("Chat -> Responses sets status:completed on every input item (#8083)", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-4o",
    {
      messages: [
        { role: "system", content: "Rules" },
        // Mid-conversation developer turn -> developer-role message item.
        { role: "developer", content: "Follow up instruction" },
        { role: "user", content: "Hello" },
        {
          role: "assistant",
          content: "Done",
          tool_calls: [
            { id: "call_1", type: "function", function: { name: "read_file", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: "call_1", content: "ok" },
        // Deprecated function_call / function role pair.
        {
          role: "assistant",
          function_call: { name: "legacy_fn", arguments: "{}" },
        },
        { role: "function", name: "legacy_fn", content: "legacy ok" },
      ],
    },
    false,
    null
  ) as Record<string, unknown>;

  const input = result.input as Array<Record<string, unknown>>;
  assert.ok(input.length > 0, "input array must not be empty");
  for (const item of input) {
    assert.equal(
      item.status,
      "completed",
      `input item of type "${item.type}" is missing status:"completed" — strict Responses-compatible ` +
        `upstreams reject this with 400 MissingParameter input.status (#8083)`
    );
  }
});
