/**
 * Port of decolua/9router#4136 (reported by louisphamdev).
 *
 * On an Antigravity connection, a conversation that switches Claude ↔ Gemini
 * mid-stream (quota runs out, `/compact` on another model, …) broke permanently
 * with 400 "Corrupted thought signature". The thought-signature cache was keyed
 * only by connection + tool call id, so a signature produced by a Claude model
 * was re-attached to the functionCall when the same history went to a Gemini
 * model (and vice versa). Each backend only accepts its own signatures.
 *
 * A cached signature must only be replayed to the model family that produced it;
 * a lookup from another family is a cache miss.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-4136-"));

const { createSSETransformStreamWithLogger } = await import("../../open-sse/utils/stream.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { clearGeminiThoughtSignatures } =
  await import("../../open-sse/services/geminiThoughtSignatureStore.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const CONNECTION_ID = "conn-antigravity-4136";
const TOOL_CALL_ID = "toolu_vrtx_4136";
const CLAUDE_MODEL = "claude-opus-4-6-thinking";
const GEMINI_MODEL = "gemini-3-flash";
const CLAUDE_SIGNATURE = "CLAUDE_PRODUCED_SIGNATURE_4136";

const textEncoder = new TextEncoder();

test.beforeEach(() => {
  clearGeminiThoughtSignatures();
});

test.after(() => {
  clearGeminiThoughtSignatures();
  resetDbInstance();
});

async function streamClaudeToolCallResponse() {
  const chunk = {
    response: {
      responseId: "resp-4136",
      modelVersion: CLAUDE_MODEL,
      candidates: [
        {
          content: {
            role: "model",
            parts: [
              {
                thoughtSignature: CLAUDE_SIGNATURE,
                functionCall: { id: TOOL_CALL_ID, name: "read_file", args: { path: "/a" } },
              },
            ],
          },
          finishReason: "STOP",
        },
      ],
    },
  };
  const source = new ReadableStream({
    start(controller) {
      controller.enqueue(textEncoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
      controller.close();
    },
  });
  const transform = createSSETransformStreamWithLogger(
    FORMATS.ANTIGRAVITY,
    FORMATS.OPENAI,
    "antigravity",
    null,
    null,
    CLAUDE_MODEL,
    CONNECTION_ID
  );
  return new Response(source.pipeThrough(transform)).text();
}

function followUpRequestBody(model: string) {
  const body = {
    messages: [
      { role: "user", content: "read /a" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: TOOL_CALL_ID,
            type: "function",
            function: { name: "read_file", arguments: JSON.stringify({ path: "/a" }) },
          },
        ],
      },
      { role: "tool", tool_call_id: TOOL_CALL_ID, content: "file contents" },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "read_file",
          parameters: { type: "object", properties: { path: { type: "string" } } },
        },
      },
    ],
  };
  return JSON.stringify(
    translateRequest(
      FORMATS.OPENAI,
      FORMATS.ANTIGRAVITY,
      model,
      body,
      true,
      null,
      "antigravity",
      null,
      { signatureNamespace: CONNECTION_ID }
    )
  );
}

test("#4136: a Claude-produced thought signature is NOT replayed to a Gemini model", async () => {
  const streamed = await streamClaudeToolCallResponse();
  assert.ok(streamed.includes(TOOL_CALL_ID), "stream must emit the tool call");

  const geminiFollowUp = followUpRequestBody(GEMINI_MODEL);
  assert.equal(
    geminiFollowUp.includes(CLAUDE_SIGNATURE),
    false,
    "Claude signature must not be attached to the Gemini functionCall (400 Corrupted thought signature)"
  );
});

test("#4136: the same model family still gets its cached thought signature", async () => {
  await streamClaudeToolCallResponse();

  const claudeFollowUp = followUpRequestBody(CLAUDE_MODEL);
  assert.ok(
    claudeFollowUp.includes(CLAUDE_SIGNATURE),
    "a Claude follow-up on the same connection must keep re-attaching the Claude signature"
  );
});
