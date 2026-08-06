/**
 * #8979: Claude Desktop → Gemini tool calls fail with
 * "Function call is missing a thought_signature in functionCall parts".
 *
 * Claude clients hit the direct CLAUDE↔GEMINI translators (not the OpenAI hub
 * path that already stores/reattaches signatures via #2504 / #3688). The direct
 * path must:
 *   1) Persist thoughtSignature from Gemini functionCall parts (response)
 *   2) Re-attach it on the follow-up Claude→Gemini request (tool_use history)
 *   3) Fall back to context text when no signature is available (avoid 400)
 *   4) Thread credentials._signatureNamespace through translateRequest's direct path
 */

import test from "node:test";
import assert from "node:assert/strict";

const { claudeToGeminiRequest } =
  await import("../../open-sse/translator/request/claude-to-gemini.ts");
const { geminiToClaudeResponse } =
  await import("../../open-sse/translator/response/gemini-to-claude.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const {
  buildGeminiThoughtSignatureKey,
  storeGeminiThoughtSignature,
  getGeminiThoughtSignature,
  clearGeminiThoughtSignatures,
} = await import("../../open-sse/services/geminiThoughtSignatureStore.ts");

test.beforeEach(() => {
  clearGeminiThoughtSignatures();
});

test("gemini→claude stores thoughtSignature keyed by connection + tool_use id (#8979)", () => {
  const ns = "conn-8979-store";
  const toolId = "toolu_8979_read";
  const signature = "SIG_8979_FROM_GEMINI";
  const state = { signatureNamespace: ns };

  geminiToClaudeResponse(
    {
      responseId: "resp-8979",
      modelVersion: "gemini-3.6-flash",
      candidates: [
        {
          content: {
            parts: [
              {
                thoughtSignature: signature,
                functionCall: {
                  id: toolId,
                  name: "default_api_read",
                  args: { path: "/tmp/a" },
                },
              },
            ],
          },
          finishReason: "STOP",
        },
      ],
    },
    state
  );

  assert.equal(
    getGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, toolId)),
    signature,
    "direct Gemini→Claude path must persist thoughtSignature for the follow-up turn"
  );
});

test("gemini→claude stores thoughtSignature from a preceding standalone part (#8979)", () => {
  const ns = "conn-8979-pending";
  const toolId = "toolu_8979_pending";
  const signature = "SIG_8979_PENDING_PART";
  const state = { signatureNamespace: ns };

  geminiToClaudeResponse(
    {
      responseId: "resp-8979b",
      modelVersion: "gemini-3.6-flash",
      candidates: [
        {
          content: {
            parts: [
              { thoughtSignature: signature },
              {
                functionCall: {
                  id: toolId,
                  name: "read_file",
                  args: {},
                },
              },
            ],
          },
        },
      ],
    },
    state
  );

  assert.equal(
    getGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, toolId)),
    signature,
    "standalone thoughtSignature part must be bound to the following functionCall"
  );
});

test("claude→gemini re-attaches cached thoughtSignature on tool_use history (#8979)", () => {
  const ns = "conn-8979-reattach";
  const toolId = "toolu_8979_reattach";
  const signature = "SIG_8979_REATTACH";
  storeGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, toolId), signature);

  const result = claudeToGeminiRequest(
    "gemini-3.6-flash",
    {
      messages: [
        {
          role: "assistant",
          content: [
            {
              type: "tool_use",
              id: toolId,
              name: "default_api:read",
              input: { path: "/tmp/a" },
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: toolId,
              content: "file contents",
            },
          ],
        },
      ],
    },
    false,
    { _signatureNamespace: ns }
  ) as {
    contents: Array<{ role: string; parts: Array<Record<string, unknown>> }>;
  };

  const modelTurn = result.contents.find(
    (c) => c.role === "model" && c.parts?.some((p) => p.functionCall)
  );
  assert.ok(modelTurn, "expected model turn with functionCall");
  const fcPart = modelTurn.parts.find((p) => p.functionCall) as {
    thoughtSignature?: string;
    functionCall: { name: string };
  };
  assert.equal(
    fcPart.thoughtSignature,
    signature,
    "cached thoughtSignature must be re-attached to functionCall"
  );
  assert.ok(
    result.contents.some((c) => c.parts?.some((p) => p.functionResponse)),
    "signed tool_result must remain a native functionResponse"
  );
});

test("claude→gemini omits unsigned functionCall and uses context fallback (#8979 / #3688 parity)", () => {
  const result = claudeToGeminiRequest(
    "gemini-3.6-flash",
    {
      messages: [
        {
          role: "assistant",
          content: [
            {
              type: "tool_use",
              id: "toolu_8979_unsigned",
              name: "default_api:read",
              input: { path: "/tmp/a" },
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "toolu_8979_unsigned",
              content: "file contents",
            },
          ],
        },
        { role: "user", content: "summarize the file" },
      ],
    },
    false,
    { _signatureNamespace: "conn-8979-unsigned" }
  ) as {
    contents: Array<{ role: string; parts: Array<Record<string, unknown>> }>;
  };

  const modelWithFc = result.contents.find(
    (c) => c.role === "model" && c.parts?.some((p) => p.functionCall)
  );
  assert.equal(
    modelWithFc,
    undefined,
    "must NOT emit signature-less functionCall (triggers Gemini HTTP 400)"
  );

  const body = JSON.stringify(result);
  assert.ok(
    body.includes("previous_tool_result_context"),
    "signature-less tool_result must become context text"
  );
  assert.ok(body.includes("file contents"), "context block must keep tool result content");
});

test("translateRequest threads signatureNamespace on direct CLAUDE→GEMINI path (#8979)", () => {
  const ns = "conn-8979-direct-ns";
  const toolId = "toolu_8979_direct";
  const signature = "SIG_8979_DIRECT_NS";
  storeGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, toolId), signature);

  const result = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.GEMINI,
    "gemini-3.6-flash",
    {
      messages: [
        {
          role: "assistant",
          content: [
            {
              type: "tool_use",
              id: toolId,
              name: "read_file",
              input: {},
            },
          ],
        },
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: toolId, content: "ok" }],
        },
      ],
    },
    false,
    null,
    "gemini",
    null,
    { signatureNamespace: ns }
  ) as { contents: Array<{ parts: Array<Record<string, unknown>> }> };

  const body = JSON.stringify(result);
  assert.ok(
    body.includes(signature),
    "direct CLAUDE→GEMINI translateRequest must thread _signatureNamespace so cache lookup succeeds"
  );
});
