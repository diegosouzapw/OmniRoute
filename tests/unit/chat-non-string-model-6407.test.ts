import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

// Regression test for #6407 — a `model` field of a non-string type
// (`number`/`boolean`/`array`/`object`) crashed downstream string ops
// (`.toLowerCase()`/`.split()`/`.startsWith()`) and returned HTTP 500 with an
// empty body, bypassing the error sanitizer (Hard Rule #12).
//
// The guard rejects non-string `model` with a clean 400 + typed error message
// BEFORE the model resolver runs, matching the #5110 empty-messages precedent.

const harness = await createChatPipelineHarness("chat-non-string-model-6407");
const { handleChat, buildRequest, resetStorage, seedConnection } = harness;

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

for (const [label, value, expectedType] of [
  ["number", 123, "number"],
  ["boolean", true, "boolean"],
  ["array", [], "array"],
  ["object", {}, "object"],
] as const) {
  test(`#6407: model as ${label} → 400 with typed error, no upstream call`, async () => {
    await seedConnection("openai", { apiKey: "sk-openai" });

    let upstreamCalled = false;
    globalThis.fetch = async () => {
      upstreamCalled = true;
      return new Response("{}", {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    };

    const response = await handleChat(
      buildRequest({
        body: {
          model: value,
          messages: [{ role: "user", content: "hi" }],
        },
      })
    );

    assert.equal(response.status, 400, `${label} model must be a 400, not 500`);
    const body = (await response.json()) as { error?: { message?: string } };
    assert.match(
      body.error?.message ?? "",
      /model:\s*Expected string, received/i,
      `error should say "model: Expected string, received ${expectedType}"`
    );
    assert.ok(
      body.error?.message?.includes(expectedType),
      `error should include the received type "${expectedType}"`
    );
    // Sanitized: no leaked stack frames per Hard Rule #12 / #6407 impact 3.
    assert.ok(
      !(body.error?.message ?? "").includes("at /"),
      "error must not leak stack trace frames"
    );
    assert.equal(upstreamCalled, false, "must not forward a non-string-model request upstream");
  });
}

test("#6407: string model still routes normally (guard is not over-broad)", async () => {
  await seedConnection("openai", { apiKey: "sk-openai" });

  let upstreamCalled = false;
  globalThis.fetch = async () => {
    upstreamCalled = true;
    return Response.json({
      id: "x",
      object: "chat.completion",
      choices: [
        { index: 0, message: { role: "assistant", content: "hi" }, finish_reason: "stop" },
      ],
    });
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4.1",
        stream: false,
        messages: [{ role: "user", content: "Hello" }],
      },
    })
  );

  assert.notEqual(response.status, 400, "a valid string model must not be caught by the guard");
  assert.equal(upstreamCalled, true, "a valid request must still reach upstream");
});

test("#6407: null model still routed to the existing 'Missing model' 400 (not the new guard)", async () => {
  await seedConnection("openai", { apiKey: "sk-openai" });

  globalThis.fetch = async () =>
    new Response("{}", { status: 200, headers: { "content-type": "application/json" } });

  const response = await handleChat(
    buildRequest({
      body: {
        model: null,
        messages: [{ role: "user", content: "hi" }],
      },
    })
  );

  assert.equal(response.status, 400, "null model stays a 400");
  const body = (await response.json()) as { error?: { message?: string } };
  assert.match(
    body.error?.message ?? "",
    /missing model/i,
    "null model keeps the existing 'Missing model' message (not the new type guard)"
  );
});
