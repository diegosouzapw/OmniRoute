import { test } from "node:test";
import assert from "node:assert/strict";
import {
  postProcessOpencodeConfig,
  resolveOpencodeTarget,
} from "../../../bin/cli/commands/setup-opencode.mjs";

const RAW = JSON.stringify({
  $schema: "https://opencode.ai/config.json",
  provider: {
    omniroute: {
      name: "OmniRoute",
      npm: "@ai-sdk/openai-compatible",
      options: { baseURL: "http://vps:20128/v1", apiKey: "sk-secret-literal" },
      models: {
        "glm/glm-5.2": { name: "glm/glm-5.2", limit: { context: 131072, output: 32768 } },
        "kmc/kimi-k2.7": { name: "kmc/kimi-k2.7", limit: { context: 131072 } },
        "openai/gpt-4o": { name: "openai/gpt-4o", limit: { context: 128000 } },
      },
    },
  },
});

test("postProcessOpencodeConfig replaces the literal API key with an env ref (no secret on disk)", () => {
  const { json } = postProcessOpencodeConfig(RAW);
  assert.equal(json.includes("sk-secret-literal"), false);
  const cfg = JSON.parse(json);
  assert.equal(cfg.provider.omniroute.options.apiKey, "{env:OMNIROUTE_API_KEY}");
  assert.equal(cfg.provider.omniroute.options.baseURL, "http://vps:20128/v1");
});

test("postProcessOpencodeConfig keeps all models by default", () => {
  const { modelCount } = postProcessOpencodeConfig(RAW);
  assert.equal(modelCount, 3);
});

test("postProcessOpencodeConfig --only filters the model map by substring", () => {
  const { json, modelCount } = postProcessOpencodeConfig(RAW, { only: ["glm", "kimi"] });
  const cfg = JSON.parse(json);
  assert.equal(modelCount, 2);
  assert.ok(cfg.provider.omniroute.models["glm/glm-5.2"]);
  assert.ok(cfg.provider.omniroute.models["kmc/kimi-k2.7"]);
  assert.equal("openai/gpt-4o" in cfg.provider.omniroute.models, false);
});

test("postProcessOpencodeConfig preserves $schema, provider name and npm", () => {
  const { json } = postProcessOpencodeConfig(RAW);
  const cfg = JSON.parse(json);
  assert.equal(cfg.$schema, "https://opencode.ai/config.json");
  assert.equal(cfg.provider.omniroute.npm, "@ai-sdk/openai-compatible");
});

test("resolveOpencodeTarget: --remote wins and trailing slashes are trimmed", () => {
  const { baseUrl } = resolveOpencodeTarget({ remote: "http://vps:20128/" });
  assert.equal(baseUrl, "http://vps:20128");
});

test("resolveOpencodeTarget: explicit --api-key wins", () => {
  const { apiKey } = resolveOpencodeTarget({ remote: "http://x:20128", apiKey: "sk-explicit" });
  assert.equal(apiKey, "sk-explicit");
});
