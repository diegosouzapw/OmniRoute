import assert from "node:assert/strict";
import test from "node:test";

import { getModelTargetFormat } from "../../open-sse/config/providerModels.ts";
import {
  OpencodeExecutor,
  resolveOpencodeTargetFormat,
} from "../../open-sse/executors/opencode.ts";
import { resolveChatCoreTargetFormat } from "../../open-sse/handlers/chatCore/targetFormat.ts";

const OPENCODE_PROVIDERS = ["opencode", "opencode-zen", "opencode-go"] as const;
const MUSE_SPARK_MODELS = [
  "muse-spark-1.2",
  "muse-spark-1.3-contributor-free",
  "muse-spark-2.0",
  "muse-spark-next",
] as const;

test("every OpenCode Muse Spark model targets the Responses API by family", () => {
  for (const providerId of OPENCODE_PROVIDERS) {
    for (const modelId of MUSE_SPARK_MODELS) {
      for (const requestModel of [modelId, `${providerId}/${modelId}`]) {
        assert.equal(
          getModelTargetFormat(providerId, requestModel),
          "openai-responses",
          `${providerId}/${requestModel} should target Responses`
        );
        assert.equal(resolveOpencodeTargetFormat(providerId, requestModel), "openai-responses");
      }

      const executor = new OpencodeExecutor(providerId);
      executor._requestFormat = resolveOpencodeTargetFormat(providerId, modelId);
      assert.equal(executor.buildUrl(modelId, true).endsWith("/responses"), true);
    }
  }
});

test("executor strips OpenCode provider prefixes from upstream model ids", () => {
  const executor = new OpencodeExecutor("opencode");
  const prefixes = ["opencode/", "oc/", "opencode-zen/", "opencode-go/"];

  for (const prefix of prefixes) {
    const result = executor.transformRequest(
      "muse-spark-9.9",
      { model: `${prefix}muse-spark-9.9` },
      true,
      {}
    );
    assert.equal(
      result.model,
      "muse-spark-9.9",
      `${prefix} should be removed before upstream dispatch`
    );
  }
});

test("the family rule is scoped to OpenCode and does not catch similar ids", () => {
  assert.equal(getModelTargetFormat("openai", "muse-spark-2.0"), null);
  assert.equal(getModelTargetFormat("opencode", "muse-sparkish-2.0"), null);
  assert.equal(getModelTargetFormat("opencode", "spark-muse-2.0"), null);
  assert.equal(resolveOpencodeTargetFormat("not-a-real-provider", "muse-spark-2.0"), "openai");
});

test("chatCore applies the family rule to an unregistered future Muse Spark model", () => {
  const result = resolveChatCoreTargetFormat({
    provider: "opencode",
    resolvedModel: "muse-spark-9.9",
    apiFormat: "openai",
    sourceFormat: "openai",
    customModelTargetFormat: undefined,
    providerSpecificData: undefined,
  });

  assert.equal(result.alias, "oc");
  assert.equal(result.targetFormat, "openai-responses");
});
