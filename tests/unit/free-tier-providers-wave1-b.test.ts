import assert from "node:assert/strict";
import test from "node:test";

import { anyapiProvider } from "../../open-sse/config/providers/registry/anyapi/index.ts";
import { electronhubProvider } from "../../open-sse/config/providers/registry/electronhub/index.ts";
import { fastrouterProvider } from "../../open-sse/config/providers/registry/fastrouter/index.ts";
import type { RegistryEntry } from "../../open-sse/config/providers/shared.ts";

const providers: Array<{
  entry: RegistryEntry;
  id: string;
  chatUrl: string;
  modelsUrl: string;
}> = [
  {
    entry: fastrouterProvider,
    id: "fastrouter",
    chatUrl: "https://api.fastrouter.ai/api/v1/chat/completions",
    modelsUrl: "https://api.fastrouter.ai/api/v1/models",
  },
  {
    entry: anyapiProvider,
    id: "anyapi",
    chatUrl: "https://api.anyapi.ai/v1/chat/completions",
    modelsUrl: "https://api.anyapi.ai/v1/models",
  },
  {
    entry: electronhubProvider,
    id: "electronhub",
    chatUrl: "https://api.electronhub.ai/v1/chat/completions",
    modelsUrl: "https://api.electronhub.ai/v1/models",
  },
];

for (const { entry, id, chatUrl, modelsUrl } of providers) {
  test(`${id} uses the standard OpenAI-compatible API-key registry shape`, () => {
    assert.equal(entry.id, id);
    assert.equal(entry.alias, id);
    assert.equal(entry.format, "openai");
    assert.equal(entry.executor, "default");
    assert.equal(entry.authType, "apikey");
    assert.equal(entry.authHeader, "bearer");
    assert.equal(entry.baseUrl, chatUrl);
    assert.equal(entry.modelsUrl, modelsUrl);
    assert.equal(entry.passthroughModels, true);
  });

  test(`${id} relies on its live catalog without invented static model ids`, () => {
    assert.deepEqual(entry.models, []);
  });
}
