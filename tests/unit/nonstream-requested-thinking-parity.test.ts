/**
 * Rework guard for PR #12905, item (c): the non-streaming translation path never
 * received the client's thinking intent.
 *
 * `convertOpenAINonStreamingToClaude()` already accepts `requestedThinking` and
 * suppresses the thinking block when it is explicitly `false` — but NO caller
 * ever passed it, so `undefined` (the legacy "always relay a thinking block"
 * default) was the only value it ever saw in production. The streaming path, by
 * contrast, computes the intent in chatCore and threads it into the SSE
 * translator, which relays reasoning only when it is explicitly `true`.
 *
 * Net effect before this fix: the SAME request answered with `stream:false`
 * leaked a thinking block that `stream:true` correctly withheld. These tests
 * pin the parity at the seam that was missing — the non-streaming provider leg,
 * which owns the client body (`sourceBody`).
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  runNonStreamingProviderLeg,
  type ChatCoreExecutorResult,
  type ProviderLegInput,
} from "../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts";

const UPSTREAM = {
  id: "chatcmpl-thinking-parity",
  object: "chat.completion",
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content: "The answer is 4.",
        reasoning_content: "Let me add two and two.",
      },
      finish_reason: "stop",
    },
  ],
  usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
};

function makeResponse(body: object): Response {
  const text = JSON.stringify(body);
  return {
    ok: true,
    status: 200,
    statusText: "OK",
    headers: new Headers({ "content-type": "application/json" }),
    text: async () => text,
    clone() {
      return { ...this, text: async () => text } as unknown as Response;
    },
    body: null,
  } as unknown as Response;
}

function legInput(thinking: Record<string, unknown> | undefined): ProviderLegInput {
  return {
    phase: "initial",
    sourceBody: {
      model: "deepseek-v4",
      messages: [{ role: "user", content: "2+2?" }],
      ...(thinking ? { thinking } : {}),
    },
    allowAccountRotation: true,
    allowModelFallback: true,
    executeProviderRequest: async (): Promise<ChatCoreExecutorResult> => ({
      response: makeResponse(UPSTREAM),
      url: "https://upstream/v1/chat/completions",
      headers: {},
      transformedBody: UPSTREAM,
    }),
    setRequestWireState: () => {},
    provider: "deepseek",
    model: "deepseek-v4",
    connectionId: "conn-thinking-parity",
    // Client speaks Claude; upstream answered OpenAI chat.completion.
    sourceFormat: "claude",
    clientResponseFormat: "claude",
    targetFormat: "openai",
  };
}

function contentTypes(response: Record<string, unknown>): string[] {
  const content = response.content as { type: string }[] | undefined;
  return Array.isArray(content) ? content.map((c) => c.type) : [];
}

test("(c) PARITY: non-streaming with thinking NOT requested must NOT relay a thinking block (matches the streaming gate)", async () => {
  const result = await runNonStreamingProviderLeg(legInput({ type: "disabled" }));
  assert.equal(result.kind, "ok");
  if (result.kind !== "ok") return;
  const types = contentTypes(result.response as unknown as Record<string, unknown>);
  console.log("  thinking:disabled -> content types:", types);
  assert.ok(
    !types.includes("thinking"),
    "thinking-opt-out client must not receive a thinking block on stream:false either"
  );
  assert.ok(types.includes("text"), "the ordinary answer must still be relayed");
});

test("(c) PARITY: non-streaming with thinking explicitly requested DOES relay the thinking block", async () => {
  const result = await runNonStreamingProviderLeg(
    legInput({ type: "enabled", budget_tokens: 1024 })
  );
  assert.equal(result.kind, "ok");
  if (result.kind !== "ok") return;
  const types = contentTypes(result.response as unknown as Record<string, unknown>);
  console.log("  thinking:enabled -> content types:", types);
  assert.ok(types.includes("thinking"), "an opted-in client keeps its thinking block");
  assert.ok(types.includes("text"), "the ordinary answer is relayed too");
});

test("(c) PARITY: `adaptive` thinking counts as requested (same helper the streaming path uses)", async () => {
  const result = await runNonStreamingProviderLeg(legInput({ type: "adaptive" }));
  assert.equal(result.kind, "ok");
  if (result.kind !== "ok") return;
  const types = contentTypes(result.response as unknown as Record<string, unknown>);
  console.log("  thinking:adaptive -> content types:", types);
  assert.ok(types.includes("thinking"), "adaptive is an ACTIVE thinking intent");
});
