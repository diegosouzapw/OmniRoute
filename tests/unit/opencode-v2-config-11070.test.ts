import test from "node:test";
import assert from "node:assert/strict";

const opencodeConfig = await import("../../src/shared/services/opencodeConfig.ts");

test("buildOpenCodeConfigDocument includes both V1 (provider) and V2 (providers) definitions", () => {
  const doc = opencodeConfig.buildOpenCodeConfigDocument({
    baseUrl: "http://localhost:20128/v1",
    apiKey: "{env:OMNIROUTE_API_KEY}",
    models: ["auto/best-coding"],
  });

  assert.ok(doc.provider?.omniroute, "V1 provider.omniroute must be present");
  assert.equal(doc.provider.omniroute.npm, "@ai-sdk/openai-compatible");
  assert.equal(doc.provider.omniroute.options.baseURL, "http://localhost:20128/v1");

  assert.ok(doc.providers?.omniroute, "V2 providers.omniroute must be present");
  assert.equal(doc.providers.omniroute.package, "@opencode-ai/ai/providers/openai-compatible");
  assert.equal(doc.providers.omniroute.settings.baseURL, "http://localhost:20128/v1");
  assert.equal(doc.providers.omniroute.settings.apiKey, "{env:OMNIROUTE_API_KEY}");
  assert.ok(doc.providers.omniroute.models["auto/best-coding"].limit, "V2 model limit must be present");
});

test("mergeOpenCodeConfig preserves existing properties and updates both provider and providers", () => {
  const existing = {
    $schema: "https://opencode.ai/config.json",
    customField: "keep-me",
  };

  const merged = opencodeConfig.mergeOpenCodeConfig(existing, {
    baseUrl: "http://localhost:20128/v1",
    apiKey: "sk_test_key",
    models: ["auto/best-coding"],
  });

  assert.equal(merged.customField, "keep-me");
  assert.ok(merged.provider?.omniroute);
  assert.ok(merged.providers?.omniroute);
  assert.equal(merged.providers.omniroute.settings.apiKey, "sk_test_key");
});
