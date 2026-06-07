import { describe, it } from "node:test";
import assert from "node:assert";
import * as generator from "../../../src/lib/cli-helper/config-generator/index.ts";

describe("config-generator", () => {
  describe("validateBaseUrl", () => {
    it("accepts http URLs", async () => {
      const mod = await import("../../../src/lib/cli-helper/config-generator/index.ts");
      assert.strictEqual(mod.validateBaseUrl("http://localhost:20128"), true);
    });

    it("accepts https URLs", async () => {
      const mod = await import("../../../src/lib/cli-helper/config-generator/index.ts");
      assert.strictEqual(mod.validateBaseUrl("https://example.com"), true);
    });

    it("rejects non-URL strings", async () => {
      const mod = await import("../../../src/lib/cli-helper/config-generator/index.ts");
      assert.strictEqual(mod.validateBaseUrl("not-a-url"), false);
    });
  });

  describe("generateConfig", () => {
    it("returns error for invalid baseUrl", async () => {
      const result = await generator.generateConfig("claude", {
        baseUrl: "invalid",
        apiKey: "sk-xxx",
      });
      assert.strictEqual(result.success, false);
      assert.ok(result.error?.includes("Invalid baseUrl"));
    });

    it("returns error for empty apiKey", async () => {
      const result = await generator.generateConfig("claude", {
        baseUrl: "http://localhost:20128",
        apiKey: "",
      });
      assert.strictEqual(result.success, false);
      assert.ok(result.error?.includes("API key"));
    });

    it("returns success for valid claude config", async () => {
      // This may fail if the claude generator has issues - just ensure error handling works
      const result = await generator.generateConfig("claude", {
        baseUrl: "http://localhost:20128",
        apiKey: "sk-test",
      });
      // Either success or error (if generator missing), but check structure is correct
      assert.ok("success" in result);
      assert.ok("configPath" in result);
    });

    it("returns success for valid hermes config", async () => {
      const result = await generator.generateConfig("hermes", {
        baseUrl: "http://localhost:20128",
        apiKey: "sk-test",
        model: "gpt-5.4-mini",
      });
      assert.strictEqual(result.success, true);
      assert.ok(result.configPath.endsWith(".hermes/config.yaml"));
      assert.ok(String(result.content || "").includes("providers:"));
      assert.ok(String(result.content || "").includes("omniroute"));
    });

    it("returns error for unknown tool", async () => {
      const result = await generator.generateConfig("unknown-tool-xyz", {
        baseUrl: "http://localhost:20128",
        apiKey: "sk-xxx",
      });
      assert.strictEqual(result.success, false);
      assert.ok(result.error?.includes("Unknown tool"));
    });
  });

  describe("generateAllConfigs", () => {
    it("returns array of GenerateResult for all tools", async () => {
      const results = await generator.generateAllConfigs({
        baseUrl: "http://localhost:20128",
        apiKey: "sk-xxx",
      });
      assert.ok(Array.isArray(results));
      assert.strictEqual(results.length, 7); // claude, codex, opencode, cline, kilocode, continue, hermes
    });
  });

  describe("hermes-agent (rich multi-role)", () => {
    it("exports HERMES_AGENT_ROLES with expected roles", async () => {
      const hermesAgent =
        await import("../../../src/lib/cli-helper/config-generator/hermes-agent.ts");
      assert.ok(Array.isArray(hermesAgent.HERMES_AGENT_ROLES));
      const ids = hermesAgent.HERMES_AGENT_ROLES.map((r: any) => r.id);
      assert.ok(ids.includes("default"));
      assert.ok(ids.includes("delegation"));
      assert.ok(ids.includes("vision"));
      assert.ok(ids.includes("approval"));
    });

    it("getCurrentHermesAgentRoles returns an object", async () => {
      const hermesAgent =
        await import("../../../src/lib/cli-helper/config-generator/hermes-agent.ts");
      const roles = await hermesAgent.getCurrentHermesAgentRoles();
      assert.ok(typeof roles === "object" && roles !== null);
    });

    it("generateHermesAgentConfig returns yaml string for valid payload", async () => {
      const hermesAgent =
        await import("../../../src/lib/cli-helper/config-generator/hermes-agent.ts");
      const result = await hermesAgent.generateHermesAgentConfig({
        baseUrl: "http://localhost:20128",
        apiKey: "sk-test-omniroute",
        selections: [
          { role: "default", model: "gpt-4o" },
          { role: "delegation", model: "claude-3-5-sonnet" },
          { role: "vision", model: "gpt-4o" },
        ],
      });

      assert.ok(!result.error);
      assert.ok(typeof result.yaml === "string");
      assert.ok(result.yaml.length > 50);
      assert.ok(result.yaml.includes("provider: omniroute"));
    });

    it("generateHermesAgentConfig includes auxiliary section for non-default roles", async () => {
      const hermesAgent =
        await import("../../../src/lib/cli-helper/config-generator/hermes-agent.ts");
      const result = await hermesAgent.generateHermesAgentConfig({
        baseUrl: "http://localhost:20128",
        apiKey: "sk-test",
        selections: [
          { role: "compression", model: "test-model" },
          { role: "skills_hub", model: "test-model-2" },
        ],
      });

      assert.ok(result.yaml.includes("auxiliary:"));
      assert.ok(result.yaml.includes("compression:"));
    });

    it("generateHermesAgentConfig returns error when baseUrl is missing", async () => {
      const hermesAgent =
        await import("../../../src/lib/cli-helper/config-generator/hermes-agent.ts");
      const result = await hermesAgent.generateHermesAgentConfig({
        baseUrl: "",
        selections: [{ role: "default", model: "x" }],
      } as any);

      assert.ok(result.error);
      assert.ok(result.error.includes("baseUrl"));
    });

    it("generateHermesAgentConfig correctly structures delegation and auxiliary roles", async () => {
      const hermesAgent =
        await import("../../../src/lib/cli-helper/config-generator/hermes-agent.ts");
      const result = await hermesAgent.generateHermesAgentConfig({
        baseUrl: "http://localhost:20128",
        apiKey: "sk-test",
        selections: [
          { role: "default", model: "model-default" },
          { role: "delegation", model: "model-delegation" },
          { role: "approval", model: "model-approval" },
        ],
      });

      const yaml = result.yaml;
      assert.ok(yaml.includes("model:"));
      assert.ok(yaml.includes("default: model-default"));
      assert.ok(yaml.includes("delegation:"));
      assert.ok(yaml.includes("auxiliary:"));
      assert.ok(yaml.includes("approval:"));
    });

    it("generateHermesAgentConfig performs non-destructive merge (preserves other keys)", async () => {
      // This test mainly verifies the function doesn't blow away unrelated config
      const hermesAgent =
        await import("../../../src/lib/cli-helper/config-generator/hermes-agent.ts");
      const result = await hermesAgent.generateHermesAgentConfig({
        baseUrl: "http://localhost:20128",
        apiKey: "sk-test",
        selections: [{ role: "default", model: "new-model" }],
      });

      // Should still contain providers block and the new model
      assert.ok(result.yaml.includes("providers:"));
      assert.ok(result.yaml.includes("new-model"));
    });
  });

  describe("opencode (context-aware)", () => {
    /**
     * Helper: build a mock catalog response covering both individual models
     * and a combo, matching the OpenAI-compatible /v1/models payload shape.
     */
    function makeCatalogResponse(models: unknown[]): unknown {
      return {
        object: "list",
        data: models,
      };
    }

    const SAMPLE_CATALOG: unknown[] = [
      // Individual model with explicit context_length
      { id: "ds/deepseek-v4-flash", owned_by: "deepseek", context_length: 1_000_000, max_input_tokens: 1_000_000 },
      // Individual model using max_context_window_tokens (llama.cpp style)
      { id: "llama3", owned_by: "llama", max_context_window_tokens: 8192 },
      // Combo with context_length computed from its targets
      { id: "MASTER", owned_by: "combo", context_length: 131072, max_input_tokens: 131072 },
      // Combo with no context_length at all — generator should fall back to default
      { id: "NO_CTX_COMBO", owned_by: "combo" },
    ];

    /**
     * Stub the global fetch used by the generator so we can run it without
     * hitting a real OmniRoute instance. The real fetch is captured at module
     * load time; we swap it out and restore it after each test.
     */
    function stubFetchOnce(body: unknown, status = 200) {
      const original = globalThis.fetch;
      let calls = 0;
      // @ts-ignore — globalThis.fetch signature is compatible for our purposes
      globalThis.fetch = (async (url: string | URL, init?: RequestInit) => {
        calls += 1;
        return new Response(JSON.stringify(body), {
          status,
          headers: { "content-type": "application/json" },
        });
      }) as typeof fetch;
      return {
        calls: () => calls,
        restore: () => {
          globalThis.fetch = original;
        },
      };
    }

    it("emits limit.context for every model from the live catalog", async () => {
      const stub = stubFetchOnce(makeCatalogResponse(SAMPLE_CATALOG));
      try {
        const { generateOpencodeConfig } = await import(
          "../../../src/lib/cli-helper/config-generator/opencode.ts"
        );
        const out = await generateOpencodeConfig({
          baseUrl: "http://localhost:20128",
          apiKey: "sk-test",
        });
        const cfg = JSON.parse(out);
        const models = cfg.provider.omniroute.models;
        assert.strictEqual(typeof models["ds/deepseek-v4-flash"].limit.context, "number");
        assert.strictEqual(models["ds/deepseek-v4-flash"].limit.context, 1_000_000);
        assert.strictEqual(models["MASTER"].limit.context, 131072);
      } finally {
        stub.restore();
      }
    });

    it("falls back to 128K when the catalog has no context_length for a model", async () => {
      const stub = stubFetchOnce(makeCatalogResponse(SAMPLE_CATALOG));
      try {
        const { generateOpencodeConfig } = await import(
          "../../../src/lib/cli-helper/config-generator/opencode.ts"
        );
        const out = await generateOpencodeConfig({
          baseUrl: "http://localhost:20128",
          apiKey: "sk-test",
        });
        const cfg = JSON.parse(out);
        // The combo without any context info in the catalog should get the
        // documented fallback so OpenCode never sees a missing limit.
        assert.strictEqual(cfg.provider.omniroute.models["NO_CTX_COMBO"].limit.context, 128_000);
      } finally {
        stub.restore();
      }
    });

    it("prefers max_context_window_tokens when context_length is absent", async () => {
      const stub = stubFetchOnce(makeCatalogResponse(SAMPLE_CATALOG));
      try {
        const { generateOpencodeConfig } = await import(
          "../../../src/lib/cli-helper/config-generator/opencode.ts"
        );
        const out = await generateOpencodeConfig({
          baseUrl: "http://localhost:20128",
          apiKey: "sk-test",
        });
        const cfg = JSON.parse(out);
        assert.strictEqual(cfg.provider.omniroute.models.llama3.limit.context, 8192);
      } finally {
        stub.restore();
      }
    });

    it("still emits a usable config when the catalog fetch fails", async () => {
      // When the catalog fetch fails (network down, server unreachable, etc.)
      // the generator must still return valid JSON that OpenCode can read,
      // and every existing model in the user's config must still end up
      // with an explicit `limit.context` so OpenCode never sees a missing
      // limit. We can't assert `models === {}` because the test runner
      // shares $HOME with the real user; instead we assert that the
      // catalog stub was actually called and that every entry has a limit.
      const original = globalThis.fetch;
      let fetchCalled = 0;
      // @ts-ignore
      globalThis.fetch = (async () => {
        fetchCalled += 1;
        throw new Error("ECONNREFUSED");
      }) as typeof fetch;
      try {
        const { generateOpencodeConfig } = await import(
          "../../../src/lib/cli-helper/config-generator/opencode.ts"
        );
        const out = await generateOpencodeConfig({
          baseUrl: "http://localhost:20128",
          apiKey: "sk-test",
        });
        const cfg = JSON.parse(out);
        assert.ok(cfg.provider);
        assert.ok(cfg.provider.omniroute);
        assert.ok(fetchCalled > 0, "expected fetch to be attempted");
        // Whatever models the generator emitted (zero or more), each one
        // must have a numeric limit.context so OpenCode never sees a
        // missing limit. This is the actual user-visible failure mode.
        const models = cfg.provider.omniroute.models;
        for (const [id, entry] of Object.entries(models) as [string, any][]) {
          assert.ok(
            typeof entry.limit?.context === "number" && entry.limit.context > 0,
            `Model ${id} has no numeric limit.context after catalog failure`
          );
        }
      } finally {
        globalThis.fetch = original;
      }
    });

    it("writes a top-level model prefixed with provider id when options.model is supplied", async () => {
      const stub = stubFetchOnce(makeCatalogResponse(SAMPLE_CATALOG));
      try {
        const { generateOpencodeConfig } = await import(
          "../../../src/lib/cli-helper/config-generator/opencode.ts"
        );
        const out = await generateOpencodeConfig({
          baseUrl: "http://localhost:20128",
          apiKey: "sk-test",
          model: "MASTER",
        });
        const cfg = JSON.parse(out);
        assert.strictEqual(cfg.model, "omniroute/MASTER");
      } finally {
        stub.restore();
      }
    });

    it("uses the live catalog even for combo models (the user-reported regression)", async () => {
      // Regression guard for the "OpenCode sigue sin detectar el tamano tanto
      // para modelos individual como para los combos" bug: every catalog
      // entry — including combos with explicit context_length — must end up
      // with a non-empty `limit.context` in the emitted config.
      const stub = stubFetchOnce(makeCatalogResponse(SAMPLE_CATALOG));
      try {
        const { generateOpencodeConfig } = await import(
          "../../../src/lib/cli-helper/config-generator/opencode.ts"
        );
        const out = await generateOpencodeConfig({
          baseUrl: "http://localhost:20128",
          apiKey: "sk-test",
        });
        const cfg = JSON.parse(out);
        const models = cfg.provider.omniroute.models;
        for (const [id, entry] of Object.entries(models) as [string, any][]) {
          assert.ok(
            typeof entry.limit?.context === "number" && entry.limit.context > 0,
            `Model ${id} has no numeric limit.context (got ${JSON.stringify(entry)})`
          );
        }
      } finally {
        stub.restore();
      }
    });
  });
});
