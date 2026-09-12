// Regression test for issue #12129: an internal context-handoff summary request (built in
// Chat Completions shape -- `messages`, no `input`) is dispatched through the SAME
// handleSingleModel closure that carries the ORIGINAL client request's endpoint.
// When that original endpoint matched `/responses` and the resolved handoff-model
// provider is an openai-compatible-* connection configured with apiType "responses",
// the pipeline used to decide the body was already native-Responses-shaped and skip
// chat->responses translation entirely (`_nativeOpenAICompatibleResponsesPassthrough`),
// so the upstream received `messages` on `/v1/responses` and rejected it with zero input.
//
// Fix: `shouldUseNativeOpenAICompatibleResponsesPassthrough` now requires the body to
// actually look Responses-shaped (`input` present, `messages` absent) before allowing
// the passthrough fast path, so an internally-synthesized chat-shaped body is routed
// through the normal chat->responses translation layer instead.
import assert from "node:assert/strict";
import { test } from "node:test";

import { resolveChatCoreRequestFormat } from "../../open-sse/handlers/chatCore/requestFormat.ts";
import { shouldUseNativeOpenAICompatibleResponsesPassthrough } from "../../open-sse/handlers/chatCore/passthroughHelpers.ts";

test("internal chat-shaped handoff body is no longer treated as native Responses passthrough", () => {
  const clientRawRequest = {
    endpoint: "/v1/responses",
    headers: new Headers(),
  };

  const summaryBody = {
    model: "some-handoff-model",
    messages: [{ role: "user", content: "Summarize this conversation." }],
    stream: false,
    max_tokens: 800,
    temperature: 0.1,
    _omnirouteSkipContextRelay: true,
    _omnirouteInternalRequest: "context-handoff",
  };

  const { sourceFormat, endpointPath } = resolveChatCoreRequestFormat({
    clientRawRequest,
    body: summaryBody,
    provider: "openai-compatible-responses-cliproxy",
    userAgent: null,
  });

  assert.equal(sourceFormat, "openai-responses");
  assert.equal(endpointPath, "/v1/responses");

  const providerSpecificData = { apiType: "responses" };

  const nativePassthrough = shouldUseNativeOpenAICompatibleResponsesPassthrough({
    provider: "openai-compatible-responses-cliproxy",
    sourceFormat,
    endpointPath,
    providerSpecificData,
    body: summaryBody,
  });

  assert.equal(
    nativePassthrough,
    false,
    "fixed: chat-shaped internal body must not take the native-Responses passthrough shortcut"
  );

  assert.equal((summaryBody as Record<string, unknown>).input, undefined);
  assert.ok(Array.isArray(summaryBody.messages) && summaryBody.messages.length > 0);
});

test("genuine Responses-shaped body still takes the native passthrough fast path", () => {
  const genuineResponsesBody = {
    model: "gpt-5.6-sol",
    input: [{ role: "user", content: [{ type: "input_text", text: "Hello" }] }],
    stream: false,
  };

  const nativePassthrough = shouldUseNativeOpenAICompatibleResponsesPassthrough({
    provider: "openai-compatible-responses-cliproxy",
    sourceFormat: "openai-responses",
    endpointPath: "/v1/responses",
    providerSpecificData: { apiType: "responses" },
    body: genuineResponsesBody,
  });

  assert.equal(
    nativePassthrough,
    true,
    "a genuine Responses-shaped client body must keep the zero-translation fast path"
  );
});
