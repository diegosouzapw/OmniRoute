import assert from "node:assert/strict";
import test from "node:test";

import { aurikoProvider } from "../../open-sse/config/providers/registry/auriko/index.ts";
import { helyxaiProvider } from "../../open-sse/config/providers/registry/helyxai/index.ts";
import { poixeAiProvider } from "../../open-sse/config/providers/registry/poixe-ai/index.ts";
import type { RegistryEntry } from "../../open-sse/config/providers/shared.ts";

const providers: Array<{
  entry: RegistryEntry;
  id: string;
  chatUrl: string;
  modelsUrl: string;
}> = [
  {
    entry: helyxaiProvider,
    id: "helyxai",
    chatUrl: "https://helyxai.space/v1/chat/completions",
    modelsUrl: "https://helyxai.space/v1/models",
  },
  {
    entry: aurikoProvider,
    id: "auriko",
    chatUrl: "https://api.auriko.ai/v1/chat/completions",
    modelsUrl: "https://api.auriko.ai/v1/models",
  },
  {
    entry: poixeAiProvider,
    id: "poixe-ai",
    chatUrl: "https://api.poixe.com/v1/chat/completions",
    modelsUrl: "https://api.poixe.com/v1/models",
  },
];

test("Wave 3-B providers expose OpenAI-compatible Bearer registries", () => {
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
  }
});

test("Wave 3-B providers rely on live catalogs without invented models", () => {
  for (const { entry } of providers) {
    assert.deepEqual(entry.models, []);
  }
});
