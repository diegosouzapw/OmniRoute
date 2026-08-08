import assert from "node:assert/strict";
import test from "node:test";

import { chatOripeProvider } from "../../open-sse/config/providers/registry/chat-oripe/index.ts";
import { nagaAiProvider } from "../../open-sse/config/providers/registry/naga-ai/index.ts";
import type { RegistryEntry } from "../../open-sse/config/providers/shared.ts";

const providers: Array<{
  entry: RegistryEntry;
  id: string;
  chatUrl: string;
  modelsUrl: string;
}> = [
  {
    entry: nagaAiProvider,
    id: "naga-ai",
    chatUrl: "https://api.naga.ac/v1/chat/completions",
    modelsUrl: "https://api.naga.ac/v1/models",
  },
  {
    entry: chatOripeProvider,
    id: "chat-oripe",
    chatUrl: "https://api.oriper.com/v1/chat/completions",
    modelsUrl: "https://api.oriper.com/v1/models",
  },
];

test("Wave 3-C providers expose OpenAI-compatible Bearer registries", () => {
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
