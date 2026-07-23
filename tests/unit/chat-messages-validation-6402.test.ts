import test from "node:test";
import assert from "node:assert/strict";

import {
  ANTIGRAVITY_MODEL_ALIASES,
  ANTIGRAVITY_PUBLIC_MODELS,
} from "../../open-sse/config/antigravityModelAliases.ts";
import { AGY_PUBLIC_MODELS } from "../../open-sse/config/agyModels.ts";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

// Regression tests for #6402 — schema-invalid `messages` fields fell through
// the existing empty-array guard and reached model resolution, where an
// unresolvable model surfaced as a misleading 404 `model_not_found` from
// chatHelpers.ts (`No active credentials for provider: <p>`).
//
// The guard at src/sse/handlers/chat.ts now rejects three additional cases with
// a clear OmniRoute-level 400 before any routing or upstream call:
//   - present-but-null messages
//   - present-but-non-array messages (number, string, object)
//   - missing messages when the Responses-API `input` discriminator is also
//     absent.

const harness = await createChatPipelineHarness("chat-messages-validation-6402");
const { handleChat, buildRequest, resetStorage, seedConnection } = harness;

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("#6402: messages: null is rejected with a clear 400 before model resolution", async () => {
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
        messages: null,
      },
    })
  );

  assert.equal(response.status, 400, "null messages must be a 400, not a 404 model_not_found");
  const body = (await response.json()) as { error?: { message?: string } };
  assert.match(body.error?.message ?? "", /messages.*Expected array/i);
  assert.equal(upstreamCalled, false, "must not forward a null-messages request upstream");
});

test("#6402: messages: <number> is rejected with a clear 400 before model resolution", async () => {
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
        messages: 123 as unknown as [],
      },
    })
  );

  assert.equal(response.status, 400, "non-array messages must be a 400, not a 404 model_not_found");
  const body = (await response.json()) as { error?: { message?: string } };
  assert.match(body.error?.message ?? "", /messages.*Expected array/i);
  assert.equal(upstreamCalled, false, "must not forward a non-array-messages request upstream");
});

test("#6402: missing messages (and no Responses-API input) is rejected with a clear 400", async () => {
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
      },
    })
  );

  assert.equal(response.status, 400, "missing messages must be a 400, not a 404 model_not_found");
  const body = (await response.json()) as { error?: { message?: string } };
  assert.match(body.error?.message ?? "", /messages.*Expected array/i);
  assert.equal(upstreamCalled, false, "must not forward a missing-messages request upstream");
});

test("#6402: Responses-API input passes the guard (messages discriminator preserved)", async () => {
  await seedConnection("openai", { apiKey: "sk-openai" });

  const response = await handleChat(
    buildRequest({
      url: "http://localhost/v1/responses",
      body: {
        model: "openai/gpt-4.1",
        input: [{ role: "user", content: "Hello" }],
      },
    })
  );

  // The guard must not fire for Responses-API requests; whatever downstream
  // status this produces (200, 404, etc.), it MUST NOT be the guard's
  // "messages: Expected array" 400.
  if (response.status === 400) {
    const body = (await response.json()) as { error?: { message?: string } };
    assert.doesNotMatch(
      body.error?.message ?? "",
      /messages.*Expected array/i,
      "Responses-API request must not be caught by the messages guard"
    );
  }
});

const ANTIGRAVITY_GEMINI_MODELS = Array.from(
  new Set(
    [
      ...ANTIGRAVITY_PUBLIC_MODELS.map((model) => model.id),
      ...AGY_PUBLIC_MODELS.map((model) => model.id),
      ...Object.keys(ANTIGRAVITY_MODEL_ALIASES),
      ...Object.values(ANTIGRAVITY_MODEL_ALIASES),
    ].filter((model) => /^(gemini(?!-claude)|rev19)/.test(model))
  )
).sort();

for (const model of ANTIGRAVITY_GEMINI_MODELS) {
  test(`Antigravity cloudcode envelope routes without the missing-messages 400: ${model}`, async () => {
    await seedConnection("antigravity", {
      accessToken: "ag-access",
      providerSpecificData: { projectId: "test-project" },
    });

    let upstreamCalled = false;
    globalThis.fetch = async () => {
      upstreamCalled = true;
      return new Response(
        'data: {"response":{"candidates":[{"content":{"parts":[{"text":"ok"}]},"finishReason":"STOP"}]}}\n\n',
        { status: 200, headers: { "Content-Type": "text/event-stream" } }
      );
    };

    const response = await handleChat(
      buildRequest({
        url: "http://localhost/v1/antigravity",
        body: {
          model: `antigravity/${model}`,
          project: "projects/test",
          request: {
            contents: [{ role: "user", parts: [{ text: "Hello" }] }],
          },
        },
      })
    );

    assert.equal(upstreamCalled, true, "Antigravity request should reach the upstream executor");
    assert.equal(response.status, 200, "Antigravity cloudcode envelopes must not return 400");

    const body = await response.text();
    assert.match(body, /ok/);
  });
}

test("Antigravity Gemini-family regression covers every current callable tier", () => {
  const coveredModels = new Set(ANTIGRAVITY_GEMINI_MODELS);
  for (const model of [
    "gemini-pro-agent",
    "gemini-3.1-pro-low",
    "gemini-3.6-flash-high",
    "gemini-3.6-flash-medium",
    "gemini-3.6-flash-low",
    "gemini-3-flash-agent",
    "gemini-3.5-flash-low",
    "gemini-3.5-flash-extra-low",
    "gemini-3.1-flash-lite",
    "gemini-2.5-flash-thinking",
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
  ]) {
    assert.ok(coveredModels.has(model), `expected regression coverage for ${model}`);
  }
});
