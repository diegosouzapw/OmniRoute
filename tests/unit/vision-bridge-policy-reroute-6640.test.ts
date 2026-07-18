// Regression tests for PR #6640 review findings — Vision Bridge's individual-model
// auto-reroute (route an image-bearing request straight to a vision-capable model
// instead of describe-then-forward) swaps `body.model` INSIDE the guardrail
// pipeline, which runs AFTER `chat.ts` already called `enforceApiKeyPolicy()`
// against the original model. Without a re-check, a key restricted via
// `allowedModels` could silently execute against an unvetted reroute target.
//
// These tests exercise the real `handleChat()` pipeline end-to-end (real DB,
// real guardrail registry, mocked upstream fetch) to prove:
//   1. A guardrail-driven reroute to a model NOT in the key's `allowedModels`
//      is rejected — the request falls back to the original, already-approved
//      model instead of silently escaping the policy.
//   2. A guardrail-driven reroute to a model that DOES pass the allowlist is
//      still honored (the fix must not break the legitimate reroute).
//   3. The reroute honors an explicit `settings.visionBridgeModel` operator
//      override, consistent with the combo/describe path.

import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("vision-bridge-policy-reroute-6640");
const { handleChat, buildRequest, buildOpenAIResponse, resetStorage, seedConnection, seedApiKey, settingsDb } =
  harness;

function imageBearingBody(model: string) {
  return {
    model,
    stream: false,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is in this image?" },
          { type: "image_url", image_url: { url: "https://example.com/image.png" } },
        ],
      },
    ],
  };
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("#6640: guardrail reroute to a model outside allowedModels is rejected — falls back to the original allowed model", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-primary" });
  // Vision Bridge auto-reroutes non-vision models with images to the best
  // available vision-capable model; pin it to a DIFFERENT model than the one
  // the key is allowed to use, so a real reroute is guaranteed to happen and
  // to conflict with the allowlist.
  await settingsDb.updateSettings({ visionBridgeModel: "openai/gpt-4o-mini" });

  const apiKey = await seedApiKey({ allowedModels: ["openai/gpt-3.5-turbo"] });

  const fetchCalls: Array<{ body: Record<string, unknown> | null }> = [];
  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    fetchCalls.push({ body: init.body ? JSON.parse(String(init.body)) : null });
    return buildOpenAIResponse("described");
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: imageBearingBody("openai/gpt-3.5-turbo"),
    })
  );

  // The reroute target (gpt-4o-mini) is not in allowedModels — the request
  // must NOT be silently executed against it. It must either fall back to the
  // original, already-approved model (gpt-3.5-turbo) or be rejected outright,
  // but it must never reach the upstream with the disallowed model.
  if (response.status === 200) {
    assert.equal(fetchCalls.length, 1, "exactly one upstream call expected");
    assert.equal(
      fetchCalls[0].body?.model,
      "gpt-3.5-turbo",
      "must fall back to the original allowed model, not silently execute the disallowed reroute target"
    );
  } else {
    assert.equal(fetchCalls.length, 0, "a rejected request must never reach the upstream");
  }
});

test("#6640: guardrail reroute to a model inside allowedModels is honored (no regression)", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-primary" });
  await settingsDb.updateSettings({ visionBridgeModel: "openai/gpt-4o-mini" });

  // This key allows BOTH the original model and the reroute target.
  const apiKey = await seedApiKey({
    allowedModels: ["openai/gpt-3.5-turbo", "openai/gpt-4o-mini"],
  });

  const fetchCalls: Array<{ body: Record<string, unknown> | null }> = [];
  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    fetchCalls.push({ body: init.body ? JSON.parse(String(init.body)) : null });
    return buildOpenAIResponse("described");
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: imageBearingBody("openai/gpt-3.5-turbo"),
    })
  );

  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.equal(
    fetchCalls[0].body?.model,
    "gpt-4o-mini",
    "reroute to an allowed vision model must still be honored"
  );
});

test("#6640: reroute honors an explicit settings.visionBridgeModel override (consistency with the describe path)", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-primary" });
  await settingsDb.updateSettings({ visionBridgeModel: "openai/gpt-4o-mini" });

  // No allowlist restriction — nothing to enforce here, this proves the
  // settings threading itself (independent of the policy re-check above).
  const apiKey = await seedApiKey();

  const fetchCalls: Array<{ body: Record<string, unknown> | null }> = [];
  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    fetchCalls.push({ body: init.body ? JSON.parse(String(init.body)) : null });
    return buildOpenAIResponse("described");
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: imageBearingBody("openai/gpt-3.5-turbo"),
    })
  );

  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.equal(
    fetchCalls[0].body?.model,
    "gpt-4o-mini",
    "the configured settings.visionBridgeModel must be honored as the reroute target"
  );
});
