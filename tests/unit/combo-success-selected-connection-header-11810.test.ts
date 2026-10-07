/**
 * Regression test for #11810.
 *
 * On a successful provider dispatch, `handleSingleModelChat()`'s
 * `result.success` branch in `src/sse/handlers/chat.ts` used to return
 * `result.response` (non-streaming) or
 * `wrapResponseWithOAuthSessionRelease(result.response, releaseOAuthSession)`
 * (streaming) directly, without first calling `withSelectedConnectionHeader()`
 * — unlike every failure exit in the same function, which does call it.
 *
 * As a result `X-OmniRoute-Selected-Connection-Id` was absent on every
 * successful response for a dynamically-selected (unpinned) connection, so
 * combo.ts's consumers (success-decay, provider cooldown recovery, webhook
 * attribution, session stickiness, LKGP) fell back to the target's static
 * `connectionId`, which is empty for provider-level combo targets like
 * `openai/o3-mini`.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("combo-success-sel-conn-11810");
const { buildOpenAIResponse, buildRequest, combosDb, handleChat, resetStorage, seedConnection } =
  harness;

const textEncoder = new TextEncoder();

function buildOpenAIStreamResponse(text = "hello streamed") {
  return new Response(
    new ReadableStream({
      start(controller) {
        controller.enqueue(
          textEncoder.encode(
            `data: ${JSON.stringify({
              id: "chatcmpl_stream_11810",
              object: "chat.completion.chunk",
              created: 1,
              model: "o3-mini",
              choices: [{ index: 0, delta: { role: "assistant", content: text } }],
            })}\n\n`
          )
        );
        controller.enqueue(textEncoder.encode(`data: [DONE]\n\n`));
        controller.close();
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }
  );
}

test.beforeEach(async () => {
  await resetStorage();
});

test.afterEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("#11810 combo success response carries X-OmniRoute-Selected-Connection-Id for a dynamically selected connection", async () => {
  const connection = await seedConnection("openai", {
    apiKey: "sk-openai-11810",
  });

  await combosDb.createCombo({
    name: "combo-11810-priority",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    // Provider-level target, no pinned connectionId — the connection is selected
    // dynamically at dispatch time.
    models: ["openai/o3-mini"],
  });

  globalThis.fetch = async () => buildOpenAIResponse("hello from o3-mini", "o3-mini");

  const response = await handleChat(
    buildRequest({
      body: {
        model: "combo-11810-priority",
        stream: false,
        messages: [{ role: "user", content: "hi" }],
      },
    })
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as { choices: Array<{ message: { content: string } }> };
  assert.equal(body.choices[0].message.content, "hello from o3-mini");

  const selectedConnectionId = response.headers.get("X-OmniRoute-Selected-Connection-Id");
  assert.equal(
    selectedConnectionId,
    connection.id,
    `expected the response to carry the dynamically selected connection id (${connection.id}), got ${selectedConnectionId}`
  );
});

test("#11810 combo streaming success response carries X-OmniRoute-Selected-Connection-Id for a dynamically selected connection", async () => {
  const connection = await seedConnection("openai", {
    apiKey: "sk-openai-11810-stream",
  });

  await combosDb.createCombo({
    name: "combo-11810-priority-stream",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    // Provider-level target, no pinned connectionId — the connection is selected
    // dynamically at dispatch time.
    models: ["openai/o3-mini"],
  });

  globalThis.fetch = async () => buildOpenAIStreamResponse("hello streamed from o3-mini");

  const response = await handleChat(
    buildRequest({
      body: {
        model: "combo-11810-priority-stream",
        stream: true,
        messages: [{ role: "user", content: "hi" }],
      },
    })
  );

  assert.equal(response.status, 200);

  const selectedConnectionId = response.headers.get("X-OmniRoute-Selected-Connection-Id");
  assert.equal(
    selectedConnectionId,
    connection.id,
    `expected the streaming response to carry the dynamically selected connection id (${connection.id}), got ${selectedConnectionId}`
  );

  // Drain the stream so the harness's fetch mock/db handles are released cleanly.
  await response.text();
});
