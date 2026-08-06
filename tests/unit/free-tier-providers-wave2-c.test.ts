import assert from "node:assert/strict";
import test from "node:test";

import { cloudcodeOneProvider } from "../../open-sse/config/providers/registry/cloudcode-one/index.ts";
import { dxntProvider } from "../../open-sse/config/providers/registry/dxnt/index.ts";
import { yoloAutoProvider } from "../../open-sse/config/providers/registry/yolo-auto/index.ts";
import type { RegistryEntry } from "../../open-sse/config/providers/shared.ts";

const providers: Array<{
  entry: RegistryEntry;
  id: string;
  chatUrl: string;
  modelsUrl: string;
  modelIds: string[];
}> = [
  {
    entry: yoloAutoProvider,
    id: "yolo-auto",
    chatUrl: "https://yolo-auto.com/v1/chat/completions",
    modelsUrl: "https://yolo-auto.com/v1/models",
    modelIds: ["qwen3.6-35b-a3b"],
  },
  {
    entry: dxntProvider,
    id: "dxnt",
    chatUrl: "https://www.dxnt.com/v1/chat/completions",
    modelsUrl: "https://www.dxnt.com/v1/models",
    modelIds: [],
  },
  {
    entry: cloudcodeOneProvider,
    id: "cloudcode-one",
    chatUrl: "https://api.cloudcode.one/v1/chat/completions",
    modelsUrl: "https://api.cloudcode.one/v1/models",
    modelIds: ["glm-4.7-flash", "glm-4.6v-flash"],
  },
];

for (const { entry, id, chatUrl, modelsUrl, modelIds } of providers) {
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

  test(`${id} seeds only the audited model identifiers`, () => {
    assert.deepEqual(
      (entry.models ?? []).map((model) => model.id),
      modelIds
    );
  });
}
