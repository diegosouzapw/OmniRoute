// Tests for the international Kimi web executor (www.kimi.com Connect-RPC API).
//
// Previously this provider targeted kimi.moonshot.cn; that domain now redirects
// every non-CN visitor to www.kimi.com, which uses a Connect-RPC streaming API.
// These tests pin the parser behavior of the Connect envelope framing and the
// JSON event-delta extractor.

import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/kimi-web.ts");
const { getModelsByProviderId } = await import("../../open-sse/config/providerModels.ts");

describe("KimiWebExecutor", () => {
  it("can be instantiated", () => {
    const executor = new mod.KimiWebExecutor();
    assert.ok(executor);
  });

  it("execute returns a 400 error when no access token is provided", async () => {
    const executor = new mod.KimiWebExecutor();
    const result = await executor.execute({
      model: "k2d6",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "" },
      signal: null,
    } as never);
    assert.equal(result.response.status, 400);
    const body = (await result.response.json()) as { error: { code: string } };
    assert.match(body.error.code, /HTTP_400|400/);
  });

  it("execute targets www.kimi.com (not kimi.moonshot.cn)", async () => {
    const executor = new mod.KimiWebExecutor();
    let capturedUrl = "";
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async (url: Parameters<typeof fetch>[0]) => {
        capturedUrl = String(url);
        return new Response(new ReadableStream({ start: (c) => c.close() }), {
          status: 200,
          headers: { "content-type": "application/connect+json" },
        });
      }) as typeof fetch;
      await executor.execute({
        model: "k2d6",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "opaque-kimi-access-token" },
        signal: null,
      } as never);
      assert.ok(capturedUrl.startsWith("https://www.kimi.com/"), `got ${capturedUrl}`);
      assert.ok(!capturedUrl.includes("moonshot.cn"));
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("builds the current snake_case ChatRequest without replaying cookies", async () => {
    const executor = new mod.KimiWebExecutor();
    const endStream = mod.frameConnectMessage("{}");
    endStream[0] = 2;
    let capturedInit: RequestInit | undefined;
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async (_url: Parameters<typeof fetch>[0], init?: RequestInit) => {
        capturedInit = init;
        return new Response(endStream, {
          status: 200,
          headers: { "content-type": "application/connect+json" },
        });
      }) as typeof fetch;
      const result = await executor.execute({
        model: "k3",
        body: {
          model: "k3",
          messages: [
            { role: "system", content: "Be terse." },
            { role: "user", content: "hi" },
          ],
          tools: null,
          functions: null,
        },
        stream: false,
        credentials: { apiKey: "access_token=opaque-token" },
        signal: null,
      } as never);

      assert.equal(result.response.status, 200);
      const headers = capturedInit?.headers as Record<string, string>;
      assert.equal(headers.Authorization, "Bearer opaque-token");
      assert.equal(headers.Cookie, undefined);

      const framed = capturedInit?.body as Uint8Array;
      const decoded = mod.decodeConnectFrame(framed, 0);
      const request = decoded.frame?.message as {
        chat_id: string;
        kimiplus_id: string;
        scenario: string;
        model?: unknown;
        tools: unknown[];
        message: { blocks: Array<{ text: { content: string } }> };
        options: {
          system_prompt: string;
          thinking: boolean;
          enable_plugin: boolean;
          reasoning_effort: string;
          context_length: string;
        };
      };
      assert.equal(request.chat_id, "");
      assert.equal(request.kimiplus_id, "ok-computer");
      assert.equal(request.scenario, "SCENARIO_OK_COMPUTER");
      assert.equal(request.model, undefined);
      assert.deepEqual(request.tools, []);
      assert.equal(request.message.blocks[0].text.content, "hi");
      assert.equal(request.options.system_prompt, "Be terse.");
      assert.equal(request.options.thinking, true);
      assert.equal(request.options.enable_plugin, false);
      assert.equal(request.options.reasoning_effort, "REASONING_EFFORT_MAX");
      assert.equal(request.options.context_length, "CONTEXT_LENGTH_L");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("maps k2d6 effort exactly and rejects unsupported levels", async () => {
    const executor = new mod.KimiWebExecutor();
    const endStream = mod.frameConnectMessage("{}");
    endStream[0] = 2;
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async () => new Response(endStream, { status: 200 })) as typeof fetch;
      const accepted = await executor.execute({
        model: "k2d6",
        body: {
          model: "k2d6",
          messages: [{ role: "user", content: "hi" }],
          reasoning_effort: "low",
        },
        stream: false,
        credentials: { apiKey: "opaque-token" },
        signal: null,
      } as never);
      assert.equal(accepted.transformedBody.options.reasoning_effort, "REASONING_EFFORT_LOW");

      const rejected = await executor.execute({
        model: "k2d6",
        body: {
          model: "k2d6",
          messages: [{ role: "user", content: "hi" }],
          reasoning_effort: "high",
        },
        stream: false,
        credentials: { apiKey: "opaque-token" },
        signal: null,
      } as never);
      assert.equal(rejected.response.status, 400);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

describe("resolveModelConfig", () => {
  const { resolveModelConfig } = mod;

  it("maps k3 to the current OK Computer route", () => {
    const cfg = resolveModelConfig("k3");
    assert.ok(cfg);
    assert.equal(cfg.scenario, "SCENARIO_OK_COMPUTER");
    assert.equal(cfg.kimiPlusId, "ok-computer");
    assert.deepEqual(cfg.supportedReasoningEfforts, [
      "REASONING_EFFORT_LOW",
      "REASONING_EFFORT_HIGH",
      "REASONING_EFFORT_MAX",
    ]);
    assert.equal(cfg.defaultReasoningEffort, "REASONING_EFFORT_MAX");
    assert.deepEqual(cfg.supportedContextLengths, ["CONTEXT_LENGTH_L", "CONTEXT_LENGTH_XL"]);
    assert.equal(cfg.defaultContextLength, "CONTEXT_LENGTH_L");
  });

  it("maps k2d6 to the K2D5 route and its exact effort enum", () => {
    const cfg = resolveModelConfig("k2d6");
    assert.ok(cfg);
    assert.equal(cfg.scenario, "SCENARIO_K2D5");
    assert.deepEqual(cfg.supportedReasoningEfforts, [
      "REASONING_EFFORT_NONE",
      "REASONING_EFFORT_LOW",
    ]);
    assert.equal(cfg.defaultReasoningEffort, "REASONING_EFFORT_NONE");
  });

  it("does not silently route an unknown or unsupported agent model", () => {
    assert.equal(resolveModelConfig("k2d6-thinking"), null);
    assert.equal(resolveModelConfig("k3-agent-ultra"), null);
  });
});

describe("kimi-web catalog", () => {
  it("lists only currently supported non-agent web models", () => {
    const models = getModelsByProviderId("kimi-web");
    assert.deepEqual(
      models.map((model) => ({ id: model.id, name: model.name })),
      [
        { id: "k3", name: "K3" },
        { id: "k2d6", name: "K2.6" },
      ]
    );
    assert.ok(models.every((model) => model.supportsReasoning));
    assert.ok(!models.some((model) => model.id.includes("agent")));
    assert.ok(
      !models.some((model) => ["kimi-default", "kimi-k2.6", "kimi-128k"].includes(model.id))
    );
  });
});

describe("extractKimiAccessToken", () => {
  const { extractKimiAccessToken } = mod;

  it("returns empty string for empty input", () => {
    assert.equal(extractKimiAccessToken(""), "");
    assert.equal(extractKimiAccessToken("   "), "");
  });

  it("accepts the current opaque localStorage access token", () => {
    assert.equal(extractKimiAccessToken("opaque-token"), "opaque-token");
  });

  it("keeps legacy kimi-auth cookie input compatible", () => {
    const jwt = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4In0.signature";
    const pasted = `_ga=GA1.1.x; theme=dark; kimi-auth=${jwt}; _gcl_au=1.1.x; lang=en-US`;
    assert.equal(extractKimiAccessToken(pasted), jwt);
  });

  it("extracts access_token from storage-like input", () => {
    assert.equal(extractKimiAccessToken("access_token=current-token"), "current-token");
  });

  it("strips a leading Authorization: Bearer label", () => {
    assert.equal(
      extractKimiAccessToken("Authorization: Bearer current-token"),
      "current-token"
    );
  });

  it("returns empty when no Kimi token is present", () => {
    assert.equal(extractKimiAccessToken("foo=bar; baz=qux"), "");
  });
});
