import { describe, it } from "node:test";
import assert from "node:assert";

describe("Gitlawb Opengateway providers", () => {
  describe("gitlawb (xiaomi-mimo)", () => {
    it("should be registered in APIKEY_PROVIDERS", async () => {
      const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
      const provider = APIKEY_PROVIDERS["gitlawb"];
      assert.ok(provider, "gitlawb should exist in APIKEY_PROVIDERS");
      assert.strictEqual(provider.id, "gitlawb");
      assert.strictEqual(provider.alias, "glb");
      assert.ok(provider.name.includes("Gitlawb"));
      assert.strictEqual(provider.hasFree, true);
    });

    it("should have registry entry with correct baseUrl", async () => {
      const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
      const entry = REGISTRY["gitlawb"];
      assert.ok(entry, "gitlawb should exist in REGISTRY");
      assert.strictEqual(entry.baseUrl, "https://opengateway.gitlawb.com/v1/xiaomi-mimo");
      assert.strictEqual(entry.format, "openai");
      assert.strictEqual(entry.executor, "default");
      assert.strictEqual(entry.authType, "apikey");
    });

    it("should have CLI-mimicking headers", async () => {
      const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
      const entry = REGISTRY["gitlawb"];
      assert.ok(entry.headers, "should have headers");
      assert.ok(entry.headers["User-Agent"].includes("OpenClaude"));
      assert.strictEqual(entry.headers["X-Title"], "OpenClaude CLI");
      assert.ok(entry.headers["HTTP-Referer"].includes("Gitlawb/openclaude"));
    });

    it("should list MiMo models", async () => {
      const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
      const entry = REGISTRY["gitlawb"];
      assert.ok(
        entry.models.length >= 5,
        `should have at least 5 models, got ${entry.models.length}`
      );
      const pro = entry.models.find((m: any) => m.id === "mimo-v2.5-pro");
      assert.ok(pro, "mimo-v2.5-pro should be listed");
      assert.strictEqual(pro.contextLength, 1048576);
    });
  });

  describe("gitlawb-gmi (gmi-cloud)", () => {
    it("should be registered in APIKEY_PROVIDERS", async () => {
      const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
      const provider = APIKEY_PROVIDERS["gitlawb-gmi"];
      assert.ok(provider, "gitlawb-gmi should exist in APIKEY_PROVIDERS");
      assert.strictEqual(provider.id, "gitlawb-gmi");
      assert.strictEqual(provider.alias, "glb-gmi");
      assert.strictEqual(provider.hasFree, true);
    });

    it("should have registry entry with gmi-cloud baseUrl", async () => {
      const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
      const entry = REGISTRY["gitlawb-gmi"];
      assert.ok(entry, "gitlawb-gmi should exist in REGISTRY");
      assert.strictEqual(entry.baseUrl, "https://opengateway.gitlawb.com/v1/gmi-cloud");
      assert.strictEqual(entry.format, "openai");
      assert.strictEqual(entry.authType, "apikey");
    });

    it("should list GPT, Claude, DeepSeek, Gemini models", async () => {
      const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
      const entry = REGISTRY["gitlawb-gmi"];
      assert.ok(entry.models.length >= 30, `should have 30+ models, got ${entry.models.length}`);

      const modelIds = entry.models.map((m: any) => m.id);
      assert.ok(modelIds.includes("openai/gpt-5.5"), "should have GPT-5.5");
      assert.ok(
        modelIds.some((id: string) => id.startsWith("anthropic/claude")),
        "should have Claude models"
      );
      assert.ok(
        modelIds.some((id: string) => id.startsWith("deepseek-ai/")),
        "should have DeepSeek models"
      );
      assert.ok(
        modelIds.some((id: string) => id.startsWith("google/gemini")),
        "should have Gemini models"
      );
    });

    it("should have CLI-mimicking headers", async () => {
      const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
      const entry = REGISTRY["gitlawb-gmi"];
      assert.ok(entry.headers, "should have headers");
      assert.ok(entry.headers["User-Agent"].includes("OpenClaude"));
    });
  });

  it("both providers should pass schema validation", async () => {
    const { AI_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    assert.ok(AI_PROVIDERS["gitlawb"], "gitlawb should be in AI_PROVIDERS");
    assert.ok(AI_PROVIDERS["gitlawb-gmi"], "gitlawb-gmi should be in AI_PROVIDERS");
  });
});
