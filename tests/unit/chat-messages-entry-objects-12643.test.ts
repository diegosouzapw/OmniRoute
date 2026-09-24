import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

// Regression tests for #12643 — a `messages` array containing `null` (or any
// non-object entry) passed every entry guard and crashed translators with a
// raw TypeError (`msg.role` off null), surfacing as HTTP 500.
//
// The guard at src/sse/handlers/chat.ts now rejects non-object entries with a
// clear OmniRoute-level 400 before any routing or upstream call, extending the
// #5110/#6402/#6407/#6412 guard family.

const harness = await createChatPipelineHarness("chat-messages-entry-objects-12643");
const { handleChat, buildRequest, resetStorage, seedConnection } = harness;

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

async function postMessages(messages: unknown) {
  await seedConnection("anthropic", { apiKey: "sk-ant" });

  let upstreamCalled = false;
  globalThis.fetch = async () => {
    upstreamCalled = true;
    return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "anthropic/claude-haiku-4-5",
        messages,
      },
    })
  );
  const body = (await response.json()) as { error?: { message?: string } };
  return { response, body, upstreamCalled };
}

test("#12643: messages: [null] is rejected with a clear 400", async () => {
  const { response, body, upstreamCalled } = await postMessages([null]);

  assert.equal(response.status, 400, "null entry must be a 400, not a 500 crash");
  assert.match(body.error?.message ?? "", /Expected array of objects/i);
  assert.equal(upstreamCalled, false, "must not forward upstream");
});

test("#12643: messages with string/number entries are rejected with a clear 400", async () => {
  for (const messages of [[{ role: "user", content: "hi" }, "oops"], [42]]) {
    const { response, body, upstreamCalled } = await postMessages(messages);

    assert.equal(response.status, 400, `must be a 400: ${JSON.stringify(messages)}`);
    assert.match(body.error?.message ?? "", /Expected array of objects/i);
    assert.equal(upstreamCalled, false, "must not forward upstream");
  }
});

test("#12643: well-formed messages pass the entry guard", async () => {
  const { response, body } = await postMessages([{ role: "user", content: "hi" }]);

  const msg = body.error?.message ?? "";
  assert.ok(!(response.status === 400 && /Expected array of objects/i.test(msg)));
});
