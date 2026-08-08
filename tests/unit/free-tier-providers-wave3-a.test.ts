import assert from "node:assert/strict";
import test from "node:test";

import { chatanywhereProvider } from "../../open-sse/config/providers/registry/chatanywhere/index.ts";
import { ofoxaiProvider } from "../../open-sse/config/providers/registry/ofoxai/index.ts";
import { zerolimitaiProvider } from "../../open-sse/config/providers/registry/zerolimitai/index.ts";
import type { RegistryEntry } from "../../open-sse/config/providers/shared.ts";

const providers: Array<{
  entry: RegistryEntry;
  id: string;
  chatUrl: string;
  modelsUrl: string;
}> = [
  {
    entry: ofoxaiProvider,
    id: "ofoxai",
    chatUrl: "https://api.ofox.ai/v1/chat/completions",
    modelsUrl: "https://api.ofox.ai/v1/models",
  },
  {
    entry: zerolimitaiProvider,
    id: "zerolimitai",
    chatUrl: "https://www.zerolimitai.com/api/v1/chat/completions",
    modelsUrl: "https://www.zerolimitai.com/api/v1/models",
  },
  {
    entry: chatanywhereProvider,
    id: "chatanywhere",
    chatUrl: "https://api.chatanywhere.org/v1/chat/completions",
    modelsUrl: "https://api.chatanywhere.org/v1/models",
  },
];

test("Wave 3-A providers expose OpenAI-compatible Bearer registries", () => {
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
    assert.deepEqual(entry.models, []);
  }
});
