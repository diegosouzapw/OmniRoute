import test from "node:test";
import assert from "node:assert/strict";
import { zcodeProvider } from "../../open-sse/config/providers/registry/zcode/index.ts";

test("ZCode provider registry exposes a local no-auth GLM Coding Plan backend", () => {
  assert.equal(zcodeProvider.id, "zcode");
  assert.equal(zcodeProvider.alias, "zc");
  assert.equal(zcodeProvider.executor, "zcode");
  assert.equal(zcodeProvider.format, "openai");
  assert.equal(zcodeProvider.baseUrl, "zcode://app-server/stdio");
  assert.equal(zcodeProvider.authType, "none");
  assert.equal(zcodeProvider.authHeader, "none");
  assert.equal(
    zcodeProvider.models.some((model) => model.id === "glm-5.2"),
    true
  );
  for (const alias of [
    "glm-5.3-high",
    "glm-5.3-low",
    "glm-5.3-flash-high",
    "glm-5.3-flash-low",
    "glm-5.3-flash-max",
    "glm-5.2-high",
    "glm-5.2-max",
  ]) {
    assert.equal(
      zcodeProvider.models.some((model) => model.id === alias),
      false,
      alias
    );
  }
  for (const model of zcodeProvider.models) {
    assert.deepEqual(model.supportedThinkingEfforts, [], model.id);
  }
});
