import assert from "node:assert/strict";
import test from "node:test";

import { createChatPipelineHarness } from "./_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("cline-task-id-propagation");
const { buildRequest, cleanup, handleChat, seedConnection } = harness;

function plainHeaders(headers: HeadersInit | undefined): Record<string, string> {
  return Object.fromEntries(new Headers(headers).entries());
}

function upstreamStream(text: string): Response {
  return new Response(
    [
      `data: ${JSON.stringify({
        id: "chatcmpl_repro",
        object: "chat.completion.chunk",
        choices: [{ index: 0, delta: { role: "assistant", content: text } }],
      })}`,
      "",
      "data: [DONE]",
      "",
    ].join("\n"),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

test.after(async () => {
  await cleanup();
});

test("full chat pipeline omits absent task ids and preserves inbound ids", async () => {
  await seedConnection("clinepass", { apiKey: "sk-clinepass-repro" });
  const upstreamHeaders: Record<string, string>[] = [];

  globalThis.fetch = async (_url, init = {}) => {
    upstreamHeaders.push(plainHeaders(init.headers));
    return upstreamStream("ok");
  };

  const send = async (headers: Record<string, string> = {}) => {
    const response = await handleChat(
      buildRequest({
        headers,
        body: {
          model: "cp/cline-pass/glm-5.2",
          stream: false,
          messages: [{ role: "user", content: "task id reproduction" }],
        },
      })
    );
    await response.text();
    assert.equal(response.status, 200);
  };

  await send();
  await send();
  await send({ "X-Task-ID": "client-task-123" });

  assert.equal(upstreamHeaders.length, 3);
  assert.equal(upstreamHeaders[0]["x-client-type"], "omniroute");
  assert.equal(upstreamHeaders[1]["x-client-type"], "omniroute");
  assert.ok(!("x-task-id" in upstreamHeaders[0]));
  assert.ok(!("x-task-id" in upstreamHeaders[1]));
  assert.equal(upstreamHeaders[2]["x-task-id"], "client-task-123");
});
