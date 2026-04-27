import test from "node:test";
import assert from "node:assert/strict";

import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";
import { resolveCanonicalProviderModel } from "../../open-sse/services/model.ts";

test("Pollinations catalog mirrors the current public text model lineup", () => {
  const models = getModelsByProviderId("pollinations");
  const ids = new Set(models.map((model) => model.id));
  const names = models.map((model) => model.name);

  assert.ok(ids.has("openai-fast"));
  assert.ok(ids.has("openai-large"));
  assert.ok(ids.has("perplexity-fast"));
  assert.ok(ids.has("qwen-coder-large"));
  assert.ok(ids.has("claude-large"));
  assert.equal(ids.has("llama"), false);
  assert.equal(
    names.some((name) => /GPT-5 via Pollinations/i.test(name)),
    false
  );
});

test("Puter catalog exposes the currently documented Sonar models", () => {
  const ids = new Set(getModelsByProviderId("puter").map((model) => model.id));

  assert.ok(ids.has("perplexity/sonar"));
  assert.ok(ids.has("perplexity/sonar-pro"));
  assert.ok(ids.has("perplexity/sonar-pro-search"));
  assert.ok(ids.has("perplexity/sonar-reasoning-pro"));
  assert.ok(ids.has("perplexity/sonar-deep-research"));
});

test("NVIDIA catalog includes the verified 2026 additions and GPT OSS 20B alias resolution", () => {
  const ids = new Set(getModelsByProviderId("nvidia").map((model) => model.id));

  assert.ok(ids.has("openai/gpt-oss-20b"));
  assert.ok(ids.has("nvidia/nemotron-3-super-120b-a12b"));
  assert.ok(ids.has("mistralai/mistral-large-3-675b-instruct-2512"));
  assert.ok(ids.has("qwen/qwen3.5-397b-a17b"));
  assert.ok(ids.has("mistralai/devstral-2-123b-instruct-2512"));

  assert.deepEqual(resolveCanonicalProviderModel("nvidia", "gpt-oss-20b"), {
    provider: "nvidia",
    model: "openai/gpt-oss-20b",
  });
});
