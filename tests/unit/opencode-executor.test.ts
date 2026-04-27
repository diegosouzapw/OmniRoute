import { afterEach, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";

const { OpencodeExecutor } = await import("../../open-sse/executors/opencode.ts");
const { PROVIDER_MODELS } = await import("../../open-sse/config/providerModels.ts");

function createMockResponse() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function createInput(model, stream = true, credentials = { apiKey: "test-key" }) {
  return {
    model,
    stream,
    credentials,
    body: {
      model,
      stream,
      messages: [{ role: "user", content: "hello" }],
    },
  };
}

function registerModel(provider, model) {
  PROVIDER_MODELS[provider] = [...(PROVIDER_MODELS[provider] || []), model];
}

describe("OpencodeExecutor", () => {
  let zenExecutor;
  let goExecutor;
  let fetchCalls;
  let originalFetch;
  let originalZenModels;
  let originalGoModels;

  beforeEach(() => {
    zenExecutor = new OpencodeExecutor("opencode-zen");
    goExecutor = new OpencodeExecutor("opencode-go");
    fetchCalls = [];
    originalFetch = globalThis.fetch;
    originalZenModels = [...(PROVIDER_MODELS["opencode-zen"] || [])];
    originalGoModels = [...(PROVIDER_MODELS["opencode-go"] || [])];
    globalThis.fetch = async (url, options) => {
      fetchCalls.push({ url, options });
      return createMockResponse();
    };
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    PROVIDER_MODELS["opencode-zen"] = originalZenModels;
    PROVIDER_MODELS["opencode-go"] = originalGoModels;
  });

  describe("execute", () => {
    it("routes opencode zen default models to chat completions", async () => {
      const minimaxResult = await zenExecutor.execute(createInput("minimax-m2.5-free"));
      assert.equal(minimaxResult.url, "https://opencode.ai/zen/v1/chat/completions");
      assert.equal(fetchCalls[0].url, "https://opencode.ai/zen/v1/chat/completions");

      const pickleResult = await zenExecutor.execute(createInput("big-pickle"));
      assert.equal(pickleResult.url, "https://opencode.ai/zen/v1/chat/completions");
      assert.equal(fetchCalls[1].url, "https://opencode.ai/zen/v1/chat/completions");

      const nanoResult = await zenExecutor.execute(createInput("gpt-5-nano"));
      assert.equal(nanoResult.url, "https://opencode.ai/zen/v1/chat/completions");
      assert.equal(fetchCalls[2].url, "https://opencode.ai/zen/v1/chat/completions");
    });

    it("routes claude target format models to messages endpoint", async () => {
      const m27Result = await goExecutor.execute(
        createInput("minimax-m2.7", true, { apiKey: "claude-key" })
      );
      assert.equal(m27Result.url, "https://opencode.ai/zen/go/v1/messages");
      assert.equal(fetchCalls[0].url, "https://opencode.ai/zen/go/v1/messages");
      assert.equal(m27Result.headers["anthropic-version"], "2023-06-01");

      const m25Result = await goExecutor.execute(
        createInput("minimax-m2.5", true, { apiKey: "claude-key" })
      );
      assert.equal(m25Result.url, "https://opencode.ai/zen/go/v1/messages");
      assert.equal(fetchCalls[1].url, "https://opencode.ai/zen/go/v1/messages");
      assert.equal(m25Result.headers["anthropic-version"], "2023-06-01");
    });

    it("routes openai responses target format models to responses endpoint", async () => {
      registerModel("opencode-zen", {
        id: "gpt-5-responses",
        name: "GPT 5 Responses",
        targetFormat: "openai-responses",
      });

      const result = await zenExecutor.execute(createInput("gpt-5-responses"));

      assert.equal(result.url, "https://opencode.ai/zen/v1/responses");
      assert.equal(fetchCalls[0].url, "https://opencode.ai/zen/v1/responses");
    });

    it("routes gemini streaming requests to streamGenerateContent", async () => {
      registerModel("opencode-zen", {
        id: "gemini-2.5-pro",
        name: "Gemini 2.5 Pro",
        targetFormat: "gemini",
      });

      const result = await zenExecutor.execute(createInput("gemini-2.5-pro"));

      assert.equal(
        result.url,
        "https://opencode.ai/zen/v1/models/gemini-2.5-pro:streamGenerateContent?alt=sse"
      );
      assert.equal(
        fetchCalls[0].url,
        "https://opencode.ai/zen/v1/models/gemini-2.5-pro:streamGenerateContent?alt=sse"
      );
    });

    it("routes gemini non streaming requests to generateContent", async () => {
      registerModel("opencode-zen", {
        id: "gemini-2.5-pro",
        name: "Gemini 2.5 Pro",
        targetFormat: "gemini",
      });

      const result = await zenExecutor.execute(createInput("gemini-2.5-pro", false));

      assert.equal(result.url, "https://opencode.ai/zen/v1/models/gemini-2.5-pro:generateContent");
      assert.equal(
        fetchCalls[0].url,
        "https://opencode.ai/zen/v1/models/gemini-2.5-pro:generateContent"
      );
    });

    it("falls back to chat completions for unknown models", async () => {
      const result = await zenExecutor.execute(createInput("unknown-model"));

      assert.equal(result.url, "https://opencode.ai/zen/v1/chat/completions");
      assert.equal(fetchCalls[0].url, "https://opencode.ai/zen/v1/chat/completions");
    });

    it("builds default headers for standard models", async () => {
      const result = await zenExecutor.execute(createInput("gpt-5-nano"));

      assert.deepEqual(result.headers, {
        Authorization: "Bearer test-key",
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      });
      assert.deepEqual(fetchCalls[0].options.headers, result.headers);
    });

    it("adds anthropic version for claude target format", async () => {
      const result = await goExecutor.execute(
        createInput("minimax-m2.7", true, { apiKey: "claude-key" })
      );

      assert.deepEqual(result.headers, {
        "x-api-key": "claude-key",
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
        Accept: "text/event-stream",
      });
      assert.deepEqual(fetchCalls[0].options.headers, result.headers);
    });

    it("omits accept header when stream is false", async () => {
      const result = await zenExecutor.execute(createInput("big-pickle", false));

      assert.deepEqual(result.headers, {
        Authorization: "Bearer test-key",
        "Content-Type": "application/json",
      });
      assert.deepEqual(fetchCalls[0].options.headers, result.headers);
    });

    it("omits authorization when credentials are missing", async () => {
      const result = await zenExecutor.execute(createInput("minimax-m2.5-free", true, null));

      assert.deepEqual(result.headers, {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      });
      assert.deepEqual(fetchCalls[0].options.headers, result.headers);
    });

    it("routes opencode-go new models to chat completions", async () => {
      // Register new models
      registerModel("opencode-go", { id: "glm-5.1", name: "GLM-5.1", contextLength: 204800 });
      registerModel("opencode-go", { id: "kimi-k2.6", name: "Kimi K2.6" });
      registerModel("opencode-go", { id: "mimo-v2-pro", name: "MiMo V2 Pro" });
      registerModel("opencode-go", { id: "mimo-v2-omni", name: "MiMo V2 Omni" });
      registerModel("opencode-go", { id: "qwen3.6-plus", name: "Qwen 3.6 Plus" });
      registerModel("opencode-go", { id: "qwen3.5-plus", name: "Qwen 3.5 Plus" });

      // glm-5.1
      const glm51 = await goExecutor.execute(createInput("glm-5.1"));
      assert.equal(glm51.url, "https://opencode.ai/zen/go/v1/chat/completions");

      // kimi-k2.6
      const kimi26 = await goExecutor.execute(createInput("kimi-k2.6"));
      assert.equal(kimi26.url, "https://opencode.ai/zen/go/v1/chat/completions");

      // mimo-v2-pro
      const mimoPro = await goExecutor.execute(createInput("mimo-v2-pro"));
      assert.equal(mimoPro.url, "https://opencode.ai/zen/go/v1/chat/completions");

      // mimo-v2-omni
      const mimoOmni = await goExecutor.execute(createInput("mimo-v2-omni"));
      assert.equal(mimoOmni.url, "https://opencode.ai/zen/go/v1/chat/completions");

      // qwen3.6-plus
      const qwen36 = await goExecutor.execute(createInput("qwen3.6-plus"));
      assert.equal(qwen36.url, "https://opencode.ai/zen/go/v1/chat/completions");

      // qwen3.5-plus
      const qwen35 = await goExecutor.execute(createInput("qwen3.5-plus"));
      assert.equal(qwen35.url, "https://opencode.ai/zen/go/v1/chat/completions");
    });

    it("builds bearer auth headers for opencode-go openai models", async () => {
      registerModel("opencode-go", { id: "glm-5.1", name: "GLM-5.1" });

      const result = await goExecutor.execute(createInput("glm-5.1"));

      assert.deepEqual(result.headers, {
        Authorization: "Bearer test-key",
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      });
      assert.deepEqual(fetchCalls[0].options.headers, result.headers);
    });
  });
});
