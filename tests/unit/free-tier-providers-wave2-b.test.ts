import assert from "node:assert/strict";
import test from "node:test";

import { mixlayerProvider } from "../../open-sse/config/providers/registry/mixlayer/index.ts";
import { spekaProvider } from "../../open-sse/config/providers/registry/speka/index.ts";
import { tokenreplyProvider } from "../../open-sse/config/providers/registry/tokenreply/index.ts";
import type { RegistryEntry } from "../../open-sse/config/providers/shared.ts";

const providers: Array<{
  entry: RegistryEntry;
  id: string;
  chatUrl: string;
  modelsUrl: string;
}> = [
  {
    entry: mixlayerProvider,
    id: "mixlayer",
    chatUrl: "https://models.mixlayer.ai/v1/chat/completions",
    modelsUrl: "https://models.mixlayer.ai/v1/models",
  },
  {
    entry: spekaProvider,
    id: "speka",
    chatUrl: "https://speka.me/v1/chat/completions",
    modelsUrl: "https://speka.me/v1/models",
  },
  {
    entry: tokenreplyProvider,
    id: "tokenreply",
    chatUrl: "https://api.tokenreply.com/v1/chat/completions",
    modelsUrl: "https://api.tokenreply.com/v1/models",
  },
];

test("Wave 2-B providers expose OpenAI-compatible Bearer registries", () => {
  for (const { entry, id, chatUrl, modelsUrl } of providers) {
    assert.equal(entry.id, id);
    assert.equal(entry.alias, id);
    assert.equal(entry.format, "openai");
    assert.equal(entry.executor, "default");
    assert.equal(entry.authType, "apikey");
    assert.equal(entry.authHeader, "bearer");
    assert.equal(entry.baseUrl, chatUrl);
    assert.equal(entry.modelsUrl, modelsUrl);
    assert.equal(entry.passthroughModels, true);
    assert.ok(Array.isArray(entry.models));
  }
});

test("Mixlayer seeds only its documented free model", () => {
  assert.deepEqual(
    mixlayerProvider.models.map((model) => model.id),
    ["qwen/qwen3.5-4b-free"]
  );
});

test("Speka and TokenReply rely on live model catalogs without invented models", () => {
  assert.deepEqual(spekaProvider.models, []);
  assert.deepEqual(tokenreplyProvider.models, []);
});
