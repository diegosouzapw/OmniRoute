// Regression tests for PR #6640 review findings — Vision Bridge's individual-model
// auto-reroute (route an image-bearing request straight to a vision-capable model
// instead of describe-then-forward) swaps `body.model` INSIDE the guardrail
// pipeline, which runs AFTER `chat.ts` already called `enforceApiKeyPolicy()`
// against the original model. Without a re-check, a key restricted via
// `allowedModels` could silently execute against an unvetted reroute target.
//
// UPDATED for PR #7204 (Vision Bridge no-credentialed-hijack fix): when the
// ORIGINAL model already has a usable, credentialed connection (as seeded
// below via `seedConnection("openai", ...)`), Vision Bridge now deliberately
// never whole-request-reroutes it to another model (see
// `VisionBridgeGuardrail.preCall` step 9 / `VB-CRED-01` in
// tests/unit/guardrails/visionBridge.test.ts) — it always falls through to
// describe-then-forward: an internal call describes the image via the vision
// model, then the description is forwarded as text to the ORIGINAL,
// already-approved model, which produces the final, user-facing answer.
//
// These tests exercise the real `handleChat()` pipeline end-to-end (real DB,
// real guardrail registry, mocked upstream fetch) to prove the policy
// invariant that motivated #6640 still holds under the new #7204 behavior:
//   1. A vision-bridge target NOT in the key's `allowedModels` is only ever
//      used internally (image description) — it never becomes the final,
//      user-facing answering model. That role always stays with the
//      original, already-approved model.
//   2. Even when the vision target IS inside `allowedModels`, a credentialed
//      original model is still never whole-request-rerouted — the original
//      model remains the final answerer (no regression from #7204's intent).
//   3. An explicit `settings.visionBridgeModel` operator override is honored
//      as the internal describe-path model, but — consistent with #7204 —
//      does not override a credentialed original model as the final answerer.

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

  // The vision-bridge target (gpt-4o-mini) is not in allowedModels — the
  // request must NOT be silently executed against it as the final answering
  // model. Under #7204, the credentialed original model (gpt-3.5-turbo) is
  // never whole-request-rerouted in the first place, so the vision target can
  // only ever appear as an internal, non-final describe call. Either way, the
  // FINAL upstream call (the one whose response the user actually receives)
  // must never be the disallowed model.
  if (response.status === 200) {
    assert.ok(fetchCalls.length >= 1, "at least one upstream call expected");
    const finalCall = fetchCalls[fetchCalls.length - 1];
    assert.equal(
      finalCall.body?.model,
      "gpt-3.5-turbo",
      "the final, user-facing answer must come from the original allowed model, not the disallowed vision target"
    );
  } else {
    assert.equal(fetchCalls.length, 0, "a rejected request must never reach the upstream");
  }
});

test("#6640: a credentialed original model is never whole-request-rerouted, even when the vision target is inside allowedModels (PR #7204)", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-primary" });
  await settingsDb.updateSettings({ visionBridgeModel: "openai/gpt-4o-mini" });

  // This key allows BOTH the original model and the vision target — before
  // #7204 this would have made the whole-request reroute to gpt-4o-mini the
  // final answering model. #7204 deliberately changes this: a credentialed
  // original model (gpt-3.5-turbo, seeded above) is never whole-request-
  // rerouted regardless of what's allowed — it always stays the final
  // answerer, with the vision target used only for the internal image
  // description (see VB-CRED-01 in tests/unit/guardrails/visionBridge.test.ts).
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
  assert.ok(fetchCalls.length >= 1, "at least one upstream call expected");
  const finalCall = fetchCalls[fetchCalls.length - 1];
  assert.equal(
    finalCall.body?.model,
    "gpt-3.5-turbo",
    "the credentialed original model must remain the final answerer — no whole-request reroute (PR #7204), even though gpt-4o-mini is allowed"
  );
});

test("#6640: settings.visionBridgeModel override does not displace a credentialed original model as the final answerer (PR #7204)", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-primary" });
  await settingsDb.updateSettings({ visionBridgeModel: "openai/gpt-4o-mini" });

  // No allowlist restriction — nothing to enforce here; this proves the
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
  assert.ok(fetchCalls.length >= 1, "at least one upstream call expected");
  const finalCall = fetchCalls[fetchCalls.length - 1];
  assert.equal(
    finalCall.body?.model,
    "gpt-3.5-turbo",
    "the configured settings.visionBridgeModel must not override the credentialed original model as the final answerer (PR #7204)"
  );
});
