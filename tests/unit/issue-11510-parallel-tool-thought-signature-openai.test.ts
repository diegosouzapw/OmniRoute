import { test } from "node:test";
import assert from "node:assert/strict";
import { openaiToGeminiRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";
import {
  storeGeminiThoughtSignature,
  buildGeminiThoughtSignatureKey,
} from "../../open-sse/services/geminiThoughtSignatureStore.ts";

// Mirror of tests/unit/issue-11510-parallel-tool-thought-signature.test.ts for the
// OpenAI-protocol → Gemini path (openai-to-gemini.ts). The same
// shouldUseEmbeddedSignature/firstPersistedSignature gating dropped a resolved,
// individually-valid thoughtSignature for every tool_calls[] entry after the
// first one in a parallel (multi tool_calls) assistant turn, reproducing
// Gemini 3.x's HTTP 400 "Function call is missing a thought_signature in
// functionCall parts" (#11510).
test("openai→gemini must attach EACH resolved thoughtSignature on a parallel (multi tool_calls) turn (#11510)", () => {
  const ns = "conn-11510-openai-parallel";
  const toolId1 = "call_11510_first";
  const toolId2 = "call_11510_second_webfetch";
  const sig1 = "SIG_11510_OPENAI_FIRST";
  const sig2 = "SIG_11510_OPENAI_SECOND";

  storeGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, toolId1), sig1);
  storeGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, toolId2), sig2);

  const result = openaiToGeminiRequest(
    "gemini-3.5-flash",
    {
      messages: [
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: toolId1,
              type: "function",
              function: { name: "default_api:Read", arguments: JSON.stringify({ path: "/a" }) },
            },
            {
              id: toolId2,
              type: "function",
              function: {
                name: "default_api:WebFetch",
                arguments: JSON.stringify({ url: "https://example.com" }),
              },
            },
          ],
        },
        { role: "tool", tool_call_id: toolId1, content: "file a" },
        { role: "tool", tool_call_id: toolId2, content: "fetched" },
      ],
    },
    false,
    { _signatureNamespace: ns }
  ) as { contents: Array<{ role: string; parts: Array<Record<string, unknown>> }> };

  const modelTurn = result.contents.find(
    (c) => c.role === "model" && c.parts?.some((p) => p.functionCall)
  );
  assert.ok(modelTurn, "expected a model turn with functionCall parts");

  const fcParts = modelTurn!.parts.filter((p) => p.functionCall) as Array<{
    thoughtSignature?: string;
    functionCall: { name: string };
  }>;
  assert.equal(fcParts.length, 2, "both tool_calls entries must be emitted as native functionCall");

  const webFetchPart = fcParts.find((p) => p.functionCall.name.includes("WebFetch"));
  assert.ok(webFetchPart, "WebFetch functionCall part must be present");

  assert.equal(
    webFetchPart!.thoughtSignature,
    sig2,
    "second functionCall in a parallel tool_calls turn must keep its own resolved " +
      "thoughtSignature, or Gemini 3.x rejects the request with HTTP 400 " +
      "'Function call is missing a thought_signature in functionCall parts'"
  );
});
