import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildClineGlobalState,
  buildClineSecrets,
  resolveClineTarget,
} from "../../../bin/cli/commands/setup-cline.mjs";

test("buildClineGlobalState sets the openai provider for Plan + Act, root base URL, model", () => {
  const gs = buildClineGlobalState({}, { baseUrl: "http://vps:20128", model: "glm/glm-5.2" });
  assert.equal(gs.actModeApiProvider, "openai");
  assert.equal(gs.planModeApiProvider, "openai");
  assert.equal(gs.openAiBaseUrl, "http://vps:20128");
  assert.equal(gs.openAiModelId, "glm/glm-5.2");
  assert.equal(gs.planModeOpenAiModelId, "glm/glm-5.2");
});

test("buildClineGlobalState merges (preserves unrelated existing keys)", () => {
  const gs = buildClineGlobalState(
    { telemetrySetting: "off", taskHistory: [1, 2, 3] },
    { baseUrl: "http://x:20128", model: "m" }
  );
  assert.equal(gs.telemetrySetting, "off");
  assert.deepEqual(gs.taskHistory, [1, 2, 3]);
  assert.equal(gs.openAiBaseUrl, "http://x:20128");
});

test("buildClineSecrets stores the key (separate secrets file), preserving others", () => {
  const sec = buildClineSecrets({ anthropicApiKey: "keepme" }, { apiKey: "sk-omni" });
  assert.equal(sec.openAiApiKey, "sk-omni");
  assert.equal(sec.anthropicApiKey, "keepme");
});

test("buildClineSecrets falls back to a placeholder when no key", () => {
  assert.equal(buildClineSecrets({}, { apiKey: "" }).openAiApiKey, "sk_omniroute");
});

test("resolveClineTarget strips /v1 from --remote (Cline wants the ROOT url)", () => {
  const { baseUrl } = resolveClineTarget({ remote: "http://vps:20128/v1/" });
  assert.equal(baseUrl, "http://vps:20128");
});

test("resolveClineTarget: explicit --api-key wins", () => {
  const { apiKey } = resolveClineTarget({ remote: "http://x:20128", apiKey: "sk-explicit" });
  assert.equal(apiKey, "sk-explicit");
});
