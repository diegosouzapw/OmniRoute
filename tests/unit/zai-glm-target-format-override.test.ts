import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7364-zai-target-format-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#7364 Defect A (URL): DefaultExecutor.buildUrl('zai', ...) ignores a per-model targetFormat:'openai' override and still returns the Anthropic Messages URL", () => {
  const executor = new DefaultExecutor("zai");
  const credentialsWithOpenAIOverride = {
    apiKey: "test-key",
    providerSpecificData: { targetFormat: "openai" },
  };
  const url = executor.buildUrl("glm-4.6v", false, 0, credentialsWithOpenAIOverride);
  assert.notEqual(
    url,
    "https://api.z.ai/api/anthropic/v1/messages?beta=true",
    "BUG #7364 Defect A: an 'openai' targetFormat override must not hit the Anthropic Messages URL, but it does"
  );
});

test("#7364 Defect A (case-sensitivity): a custom model saved as 'glm-4.6v' is not found when looked up as 'glm-4.6V'", async () => {
  await modelsDb.addCustomModel(
    "zai",
    "glm-4.6v",
    "GLM 4.6V (vision)",
    "manual",
    "chat-completions",
    ["chat"],
    "openai" // explicit targetFormat override, mirroring the dashboard dropdown
  );

  const exact = (await getModelInfo("zai/glm-4.6v")) as { targetFormat?: string };
  assert.equal(exact.targetFormat, "openai", "sanity check: exact-case lookup must surface the saved targetFormat");

  const mixedCase = (await getModelInfo("zai/glm-4.6V")) as { targetFormat?: string };
  assert.equal(
    mixedCase.targetFormat,
    "openai",
    "BUG #7364 Defect A: case-mismatched lookup ('glm-4.6V' vs stored 'glm-4.6v') must still surface the targetFormat override, but it doesn't"
  );
});
