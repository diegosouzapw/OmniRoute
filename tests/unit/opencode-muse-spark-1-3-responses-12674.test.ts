import assert from "node:assert/strict";
import test from "node:test";

import { opencode_zenProvider } from "../../open-sse/config/providers/registry/opencode/zen/index.ts";
import { opencodeProvider } from "../../open-sse/config/providers/registry/opencode/index.ts";
import { getTokenLimit } from "../../open-sse/services/contextManager.ts";
import {
  OpencodeExecutor,
  resolveOpencodeTargetFormat,
} from "../../open-sse/executors/opencode.ts";

// Issue 12674: Muse Spark 1.3 is served on the Responses API with a 1M
// context window. These entries only set the wire format; without the
// explicit window the limit fell back to the 200000 provider default.
const PROVIDERS = [
  { id: "opencode-zen", entry: opencode_zenProvider },
  { id: "opencode", entry: opencodeProvider },
] as const;
const MODEL_IDS = ["muse-spark-1.3", "muse-spark-1.3-contributor-free"] as const;

test("muse-spark-1.3 models target the Responses API with reasoning enabled", () => {
  for (const { id, entry } of PROVIDERS) {
    for (const modelId of MODEL_IDS) {
      const model = entry.models.find((m) => m.id === modelId);
      assert.ok(model, `${modelId} should be registered on ${id}`);
      assert.equal(
        model?.targetFormat,
        "openai-responses",
        `${modelId} on ${id} must target the Responses API, not the default chat/completions pass-through`
      );
      assert.equal(model?.supportsReasoning, true);
    }
  }
});

test("muse-spark-1.3 models declare the real 1M context window and 128K output limit", () => {
  for (const { id, entry } of PROVIDERS) {
    for (const modelId of MODEL_IDS) {
      const model = entry.models.find((m) => m.id === modelId);
      assert.ok(model, `${modelId} should be registered on ${id}`);
      assert.equal(model?.contextLength, 1048576, `${modelId} on ${id} must declare a 1M window`);
      assert.equal(
        model?.maxOutputTokens,
        131072,
        `${modelId} on ${id} must declare a 128K output limit`
      );
    }
  }
});

test("context limit resolves muse-spark-1.3 models to the 1M window, not the provider default", () => {
  for (const { id } of PROVIDERS) {
    for (const modelId of MODEL_IDS) {
      assert.equal(
        getTokenLimit(id, modelId),
        1048576,
        `getTokenLimit(${id}, ${modelId}) must return the 1M window`
      );
    }
  }
});

test("executor resolves muse-spark-1.3 models to the Responses API", () => {
  for (const { id } of PROVIDERS) {
    for (const modelId of MODEL_IDS) {
      assert.equal(
        resolveOpencodeTargetFormat(id, modelId),
        "openai-responses",
        `resolveOpencodeTargetFormat(${id}, ${modelId}) must return openai-responses`
      );
    }
  }
});

test("Responses-format executor hits /responses with x-api-key auth and no Bearer header", () => {
  for (const { id } of PROVIDERS) {
    for (const modelId of MODEL_IDS) {
      const executor = new OpencodeExecutor(id);
      executor._requestFormat = resolveOpencodeTargetFormat(id, modelId);
      const url = executor.buildUrl(modelId, true);
      assert.ok(
        url.endsWith("/responses"),
        `${id}/${modelId} must build a /responses URL, got ${url}`
      );
      const headers = executor.buildHeaders({ apiKey: "sk-test" }, true, null, modelId);
      assert.equal(headers["x-api-key"], "sk-test");
      assert.equal(headers["Authorization"], undefined);
    }
  }
});
