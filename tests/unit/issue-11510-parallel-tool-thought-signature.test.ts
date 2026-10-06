import { test } from "node:test";
import assert from "node:assert/strict";
import { claudeToGeminiRequest } from "../../open-sse/translator/request/claude-to-gemini.ts";
import {
  storeGeminiThoughtSignature,
  buildGeminiThoughtSignatureKey,
} from "../../open-sse/services/geminiThoughtSignatureStore.ts";

// Repro for GitHub issue #11510: Claude Code (or any client) issuing a PARALLEL
// tool-call turn (2+ tool_use blocks in one assistant message) against a Gemini
// 3.x thinking model. Gemini attaches (and requires) an individual
// thoughtSignature on EVERY functionCall part in a multi-call turn, and OmniRoute
// stores one per tool_use id (gemini-to-claude.ts reads `part.thoughtSignature`
// per-part, not just a single pending value). But claude-to-gemini.ts's
// `shouldUseEmbeddedSignature` flag strips the signature from every functionCall
// after the first one in the SAME assistant message, even when a real resolved
// signature exists for it — reproducing Gemini's exact HTTP 400:
// "Function call is missing a thought_signature in functionCall parts."
test("claude→gemini must attach EACH resolved thoughtSignature on a parallel (multi tool_use) turn (#11510)", () => {
  const ns = "conn-11510-parallel";
  const toolId1 = "toolu_11510_first";
  const toolId2 = "toolu_11510_second_webfetch";
  const sig1 = "SIG_11510_FIRST";
  const sig2 = "SIG_11510_SECOND";

  // Simulate what gemini-to-claude.ts really stores today: a distinct,
  // individually-valid signature per tool_use id, because Gemini attached one
  // to each functionCall part of the original response turn.
  storeGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, toolId1), sig1);
  storeGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, toolId2), sig2);

  const result = claudeToGeminiRequest(
    "gemini-3.5-flash",
    {
      messages: [
        {
          role: "assistant",
          content: [
            { type: "tool_use", id: toolId1, name: "default_api:Read", input: { path: "/a" } },
            {
              type: "tool_use",
              id: toolId2,
              name: "default_api:WebFetch",
              input: { url: "https://example.com" },
            },
          ],
        },
        {
          role: "user",
          content: [
            { type: "tool_result", tool_use_id: toolId1, content: "file a" },
            { type: "tool_result", tool_use_id: toolId2, content: "fetched" },
          ],
        },
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
  assert.equal(fcParts.length, 2, "both tool_use blocks must be emitted as native functionCall");

  const webFetchPart = fcParts.find((p) => p.functionCall.name.includes("WebFetch"));
  assert.ok(webFetchPart, "WebFetch functionCall part must be present");

  // THIS is the reported bug: the second tool_use in the turn has a real,
  // resolved thoughtSignature (sig2) available, but the translator drops it
  // because it is not the first functionCall in the message.
  assert.equal(
    webFetchPart!.thoughtSignature,
    sig2,
    "second functionCall in a parallel tool-call turn must keep its own resolved " +
      "thoughtSignature, or Gemini 3.x rejects the request with HTTP 400 " +
      "'Function call is missing a thought_signature in functionCall parts'"
  );
});
