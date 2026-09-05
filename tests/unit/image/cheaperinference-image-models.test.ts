// Cheaper Inference image models + the Adobe Firefly collision guard.
//
// nano-banana-pro / nano-banana-2 exist in BOTH providers. parseImageModel resolves a
// bare id by first-match over IMAGE_PROVIDERS iteration order, so the bare ids must
// keep going to adobe-firefly (pre-existing behaviour) and Cheaper Inference must be
// reachable only via its prefix. Operator decision 2026-07-31.
import { test } from "node:test";
import assert from "node:assert/strict";
import { IMAGE_PROVIDERS, parseImageModel } from "@omniroute/open-sse/config/imageRegistry.ts";

test("cheaperinference is registered as an image provider with the 3 measured models", () => {
  const provider = IMAGE_PROVIDERS.cheaperinference;
  assert.ok(provider, "cheaperinference missing from IMAGE_PROVIDERS");
  assert.equal(provider.baseUrl, "https://api.cheaperinference.com/v1/images/generations");
  assert.equal(provider.authType, "apikey");
  assert.equal(provider.authHeader, "bearer");
  assert.equal(provider.format, "openai");
  assert.equal(provider.alias, "cinf");
  const ids = provider.models.map((m) => m.id).sort();
  assert.deepEqual(ids, ["grok-imagine", "nano-banana-2", "nano-banana-pro"]);
});

test("prefixed ids resolve to cheaperinference", () => {
  assert.deepEqual(parseImageModel("cheaperinference/nano-banana-2"), {
    provider: "cheaperinference",
    model: "nano-banana-2",
  });
  assert.deepEqual(parseImageModel("cinf/grok-imagine"), {
    provider: "cheaperinference",
    model: "grok-imagine",
  });
});

test("REGRESSION GUARD: bare nano-banana ids still route to adobe-firefly", () => {
  // If this flips to cheaperinference, someone added an IMAGE_MODEL_ALIASES entry
  // (forbidden) or declared cheaperinference before adobe-firefly in IMAGE_PROVIDERS.
  assert.equal(parseImageModel("nano-banana-2").provider, "adobe-firefly");
  assert.equal(parseImageModel("nano-banana-pro").provider, "adobe-firefly");
});

test("cheaperinference image models are NOT in the chat registry", async () => {
  const { REGISTRY } = await import("@omniroute/open-sse/config/providers/index.ts");
  const chatIds = new Set(
    (REGISTRY.cheaperinference as unknown as { models: Array<{ id: string }> }).models.map(
      (m) => m.id
    )
  );
  // Upstream returns HTTP 400 for these on /v1/chat/completions:
  // "…is an image-generation model. Use POST /v1/images/generations."
  for (const id of ["grok-imagine", "nano-banana-2", "nano-banana-pro"]) {
    assert.ok(!chatIds.has(id), `${id} must not be routable as a chat model`);
  }
});
