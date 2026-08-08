import assert from "node:assert/strict";
import test from "node:test";

import { literouterProvider } from "../../open-sse/config/providers/registry/literouter/index.ts";
import { meganovaAiProvider } from "../../open-sse/config/providers/registry/meganova-ai/index.ts";
import { mnnAiProvider } from "../../open-sse/config/providers/registry/mnn-ai/index.ts";
import type { RegistryEntry } from "../../open-sse/config/providers/shared.ts";

const providers: Array<{
  entry: RegistryEntry;
  id: string;
  chatUrl: string;
  modelsUrl: string;
}> = [
  {
    entry: literouterProvider,
    id: "literouter",
    chatUrl: "https://api.literouter.com/v1/chat/completions",
    modelsUrl: "https://api.literouter.com/v1/models",
  },
  {
    entry: mnnAiProvider,
    id: "mnn-ai",
    chatUrl: "https://api.mnnai.ru/v1/chat/completions",
    modelsUrl: "https://api.mnnai.ru/v1/models",
  },
  {
    entry: meganovaAiProvider,
    id: "meganova-ai",
    chatUrl: "https://api.meganova.ai/v1/chat/completions",
    modelsUrl: "https://api.meganova.ai/v1/models",
  },
];

for (const { entry, id, chatUrl, modelsUrl } of providers) {
  test(`${id} uses an OpenAI-compatible Bearer registry entry`, () => {
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

  test(`${id} leaves model discovery to the live upstream catalog`, () => {
    assert.deepEqual(entry.models, []);
  });
}
