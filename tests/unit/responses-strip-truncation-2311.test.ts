import test from "node:test";
import assert from "node:assert/strict";

// Regression for port of decolua/9router#2311 (PR #2318): OpenAI Responses-API-only
// fields must be stripped before forwarding to a Chat Completions upstream, otherwise
// strict non-OpenAI upstreams (e.g. NVIDIA NIM) reject with HTTP 400
// "Unsupported parameter(s): ...". OmniRoute already strips `client_metadata`,
// `background`, and `safety_identifier`; `truncation` was the remaining gap.
const { openaiResponsesToOpenAIRequest } = await import(
  "../../open-sse/translator/request/openai-responses.ts"
);

test("Responses -> OpenAI: truncation is stripped (never forwarded to Chat Completions)", () => {
  const result = openaiResponsesToOpenAIRequest(
    "z-ai/glm-5.2",
    {
      input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
      truncation: "auto",
    },
    false,
    {}
  ) as Record<string, unknown>;

  assert.equal("truncation" in result, false);
});

test("Responses -> OpenAI: full Responses-only field set is stripped together", () => {
  const result = openaiResponsesToOpenAIRequest(
    "z-ai/glm-5.2",
    {
      input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
      truncation: "disabled",
      client_metadata: { user_id: "abc" },
      background: true,
      safety_identifier: "lobehub-user",
    },
    false,
    {}
  ) as Record<string, unknown>;

  for (const field of ["truncation", "client_metadata", "background", "safety_identifier"]) {
    assert.equal(field in result, false, `${field} should be stripped`);
  }
});
