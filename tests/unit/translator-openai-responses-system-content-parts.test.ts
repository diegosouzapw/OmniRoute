import test from "node:test";
import assert from "node:assert/strict";

const { openaiToOpenAIResponsesRequest } = await import(
  "../../open-sse/translator/request/openai-responses.ts"
);

// Regression: the leading system message was read as `typeof content === "string"
// ? content : ""`, so a Chat-Completions content-part array — valid for `system`,
// and the shape every prompt-caching client sends (Anthropic `cache_control`) —
// collapsed the whole system prompt to an empty `instructions`. The request was
// still accepted upstream with a normal prompt_tokens count, so the model simply
// answered with no instructions and nothing in the response said they were gone.
// Mid-conversation system turns already handled the array shape (#6954/#7056);
// only the first one did not.

test("Chat -> Responses: system content parts become instructions (not empty)", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-4o",
    {
      messages: [
        { role: "system", content: [{ type: "text", text: "Be terse." }] },
        { role: "user", content: "hi" },
      ],
    },
    null,
    null
  ) as Record<string, unknown>;

  assert.equal(result.instructions, "Be terse.");
});

test("Chat -> Responses: cache_control on a system part does not drop the text", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-4o",
    {
      messages: [
        {
          role: "system",
          content: [
            { type: "text", text: "Constitution.", cache_control: { type: "ephemeral" } },
            { type: "text", text: "Charter.", cache_control: { type: "ephemeral" } },
          ],
        },
        { role: "user", content: "hi" },
      ],
    },
    null,
    null
  ) as Record<string, unknown>;

  assert.equal(result.instructions, "Constitution.\n\nCharter.");
});

test("Chat -> Responses: a plain string system message is unchanged", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-4o",
    { messages: [{ role: "system", content: "Be terse." }, { role: "user", content: "hi" }] },
    null,
    null
  ) as Record<string, unknown>;

  assert.equal(result.instructions, "Be terse.");
});

test("Chat -> Responses: a system message with no text yields empty instructions", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-4o",
    { messages: [{ role: "system", content: [] }, { role: "user", content: "hi" }] },
    null,
    null
  ) as Record<string, unknown>;

  assert.equal(result.instructions, "");
});
