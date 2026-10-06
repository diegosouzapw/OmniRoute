/**
 * The Responses -> Chat Completions translator stashes a client's `store`
 * intent under the internal `_omnirouteResponsesStore` marker (see
 * open-sse/translator/request/openai-responses.ts) so a later Chat
 * Completions -> Responses re-conversion can restore it as `store`. When the
 * resolved destination stays in Chat Completions shape (e.g. a plain
 * `openai` connection routed to a model without the responses-only
 * `targetFormat` capability, like `gpt-5-nano`), that re-conversion never
 * runs, nothing else consumed the marker, and it leaked verbatim into the
 * real upstream request body. OpenAI's own `/v1/chat/completions` rejects
 * it with `Unknown parameter: '_omnirouteResponsesStore'` -- confirmed live
 * against the real API.
 */
import test from "node:test";
import assert from "node:assert/strict";

test("translateRequest never leaks the internal _omnirouteResponsesStore marker into a Chat Completions destination", async () => {
  const { translateRequest } = await import("../../open-sse/translator/index.ts");
  const { FORMATS } = await import("../../open-sse/translator/formats.ts");

  const body: Record<string, unknown> = {
    model: "gpt-5-nano",
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    store: true,
  };
  const credentials = { providerSpecificData: { openaiStoreEnabled: true } };

  const result = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    "gpt-5-nano",
    body,
    true,
    credentials,
    "openai"
  );

  assert.equal("_omnirouteResponsesStore" in result, false);
  // Chat Completions' own `store` field means something different (dashboard
  // eval storage, not Responses-style previous_response_id continuation) --
  // the client's Responses-shaped store intent must not leak onto it either.
  assert.equal("store" in result, false);
});
