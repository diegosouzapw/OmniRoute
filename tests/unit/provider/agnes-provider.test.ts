import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agnes-provider-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { APIKEY_PROVIDERS } = await import("../../../src/shared/constants/providers.ts");
const { VIDEO_PROVIDER_IDS } = await import("../../../src/shared/constants/providers.ts");
const { REGISTRY: providerRegistry } = await import("../../../open-sse/config/providerRegistry.ts");
const { IMAGE_PROVIDERS, getAllImageModels } =
  await import("../../../open-sse/config/imageRegistry.ts");
const { VIDEO_PROVIDERS, getAllVideoModels } =
  await import("../../../open-sse/config/videoRegistry.ts");
const { FREE_MODEL_BUDGETS } = await import("../../../open-sse/config/freeModelCatalog.ts");
const { DefaultExecutor } = await import("../../../open-sse/executors/default.ts");
const { handleImageGeneration } = await import("../../../open-sse/handlers/imageGeneration.ts");
const { handleVideoGeneration } = await import("../../../open-sse/handlers/videoGeneration.ts");
const { resolveChatCoreTargetFormat } =
  await import("../../../open-sse/handlers/chatCore/targetFormat.ts");
const dbCore = await import("../../../src/lib/db/core.ts");

test.after(() => {
  dbCore.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const AGNES_CHAT_URL = "https://apihub.agnes-ai.com/v1/chat/completions";

test("agnes is registered as an API-key provider with complete metadata", () => {
  const entry = APIKEY_PROVIDERS.agnes;
  assert.ok(entry, "APIKEY_PROVIDERS.agnes must be defined");
  assert.equal(entry.id, "agnes");
  assert.equal(entry.alias, "agnes");
  assert.equal(entry.name, "Agnes AI");
  assert.equal(entry.icon, "auto_awesome");
  assert.equal(entry.color, "#10B981");
  assert.equal(entry.textIcon, "AG");
  assert.equal(entry.website, "https://agnes-ai.com");
  assert.equal(entry.hasFree, true);
  assert.ok(entry.freeNote, "freeNote must be defined");
  assert.ok(entry.authHint, "authHint must be defined");
});

test("agnes registry entry uses OpenAI Chat Completions format with bearer API-key auth", () => {
  const entry = providerRegistry.agnes;
  assert.ok(entry, "providerRegistry.agnes must be defined");
  assert.equal(entry.id, "agnes");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, AGNES_CHAT_URL);
});

test("agnes routes Chat Completions clients through its OpenAI chat upstream", () => {
  const { targetFormat } = resolveChatCoreTargetFormat({
    provider: "agnes",
    resolvedModel: "agnes-2.5-flash",
    apiFormat: undefined,
    sourceFormat: "openai",
    customModelTargetFormat: undefined,
    providerSpecificData: null,
  });

  assert.equal(targetFormat, "openai");
  assert.equal(
    new DefaultExecutor("agnes").buildUrl("agnes-2.5-flash", true, 0, null),
    AGNES_CHAT_URL
  );
});

test("agnes ships the current public chat models with correct capabilities", () => {
  const entry = providerRegistry.agnes;
  assert.deepEqual(
    entry.models.map((model) => model.id),
    ["agnes-1.5-flash", "agnes-2.0-flash", "agnes-2.5-flash"]
  );

  const flash15 = entry.models.find((m) => m.id === "agnes-1.5-flash");
  assert.ok(flash15, "agnes-1.5-flash must be defined");
  assert.equal(flash15.contextLength, 262144);
  assert.equal(flash15.maxOutputTokens, 65536);
  assert.equal(flash15.supportsVision, true);
  assert.equal(flash15.toolCalling, true);

  const flash20 = entry.models.find((m) => m.id === "agnes-2.0-flash");
  assert.ok(flash20, "agnes-2.0-flash must be defined");
  assert.equal(flash20.contextLength, 262144);
  assert.equal(flash20.maxOutputTokens, 65536);
  assert.equal(flash20.supportsReasoning, true);
  assert.equal(flash20.supportsVision, true);
  assert.equal(flash20.toolCalling, true);

  const flash25 = entry.models.find((m) => m.id === "agnes-2.5-flash");
  assert.ok(flash25, "agnes-2.5-flash must be defined");
  assert.equal(flash25.contextLength, 524288);
  assert.equal(flash25.maxOutputTokens, 65536);
});
test("agnes free catalog exposes the current free chat models through one shared pool", () => {
  const rows = FREE_MODEL_BUDGETS.filter((model) => model.provider === "agnes");
  assert.deepEqual(
    rows.map((model) => model.modelId),
    ["agnes-1.5-flash", "agnes-2.0-flash", "agnes-2.5-flash"]
  );
  assert.ok(rows.every((model) => model.poolKey === "agnes-free"));
});

test("agnes has no collision with zenmux-free sapiens-ai prefixed models", (t) => {
  const zenmux = providerRegistry["zenmux-free"];
  if (!zenmux) {
    t.skip("zenmux-free not registered in this environment");
    return;
  }
  const agnesInZenmux = zenmux.models.filter((m) => m.id.includes("agnes"));
  for (const m of agnesInZenmux) {
    assert.ok(
      m.id.startsWith("sapiens-ai/"),
      `zenmux agnes model ${m.id} must use sapiens-ai/ prefix to avoid collision`
    );
  }
});

test("agnes registers Image 2.1 Flash on the current image-generation contract", () => {
  const entry = IMAGE_PROVIDERS.agnes;
  assert.ok(entry, "IMAGE_PROVIDERS.agnes must be defined");
  assert.equal(entry.baseUrl, "https://apihub.agnes-ai.com/v1/images/generations");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.format, "agnes-image");
  assert.deepEqual(entry.supportedSizes, ["1K", "2K", "3K", "4K"]);
  assert.deepEqual(entry.models, [
    {
      id: "agnes-image-2.1-flash",
      name: "Agnes Image 2.1 Flash",
      inputModalities: ["text", "image"],
      description: "Agnes text-to-image, image-to-image, and multi-image composition model",
    },
  ]);
  assert.ok(getAllImageModels().some((model) => model.id === "agnes/agnes-image-2.1-flash"));
});

test("agnes Image 2.1 maps standard image inputs into extra_body", async () => {
  const originalFetch = globalThis.fetch;
  let captured:
    { url: string; headers: Record<string, string>; body: Record<string, unknown> } | undefined;

  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    captured = {
      url: String(url),
      headers: init?.headers as Record<string, string>,
      body: JSON.parse(String(init?.body)) as Record<string, unknown>,
    };
    return new Response(
      JSON.stringify({
        created: 123,
        data: [{ b64_json: "generated-image", revised_prompt: "combined references" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  try {
    const result = await handleImageGeneration({
      body: {
        model: "agnes/agnes-image-2.1-flash",
        prompt: "Combine both references into one cinematic poster",
        size: "2K",
        aspect_ratio: "16:9",
        image_urls: ["https://example.com/one.png", "data:image/png;base64,dHdv"],
        response_format: "b64_json",
        extra_body: { workflow_hint: "preserve-composition" },
      },
      credentials: { apiKey: "agnes-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.ok(captured, "Agnes image request must be sent upstream");
    assert.equal(captured.url, "https://apihub.agnes-ai.com/v1/images/generations");
    assert.equal(captured.headers.Authorization, "Bearer agnes-key");
    assert.deepEqual(captured.body, {
      model: "agnes-image-2.1-flash",
      prompt: "Combine both references into one cinematic poster",
      size: "2K",
      ratio: "16:9",
      extra_body: {
        workflow_hint: "preserve-composition",
        image: ["https://example.com/one.png", "data:image/png;base64,dHdv"],
        response_format: "b64_json",
      },
    });
    assert.equal(result.data.data[0].b64_json, "generated-image");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("agnes Image 2.1 requires the current size parameter", async () => {
  const result = await handleImageGeneration({
    body: {
      model: "agnes/agnes-image-2.1-flash",
      prompt: "A detailed cityscape",
    },
    credentials: { apiKey: "agnes-key" },
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.equal(result.error, "Size is required for Agnes Image 2.1 Flash");
});

test("agnes registers Video V2.0 on the current video_id job contract", () => {
  const entry = VIDEO_PROVIDERS.agnes;
  assert.ok(entry, "VIDEO_PROVIDERS.agnes must be defined");
  assert.equal(entry.baseUrl, "https://apihub.agnes-ai.com");
  assert.equal(entry.statusUrl, "https://apihub.agnes-ai.com/agnesapi");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.format, "agnes-video-job");
  assert.deepEqual(entry.models, [{ id: "agnes-video-v2.0", name: "Agnes Video V2.0" }]);
  assert.equal(VIDEO_PROVIDER_IDS.has("agnes"), true);
  assert.ok(getAllVideoModels().some((model) => model.id === "agnes/agnes-video-v2.0"));
});

test("agnes Video V2.0 submits with Bearer auth and polls by video_id", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const calls: Array<{
    url: string;
    method: string;
    headers: Record<string, string>;
    body?: Record<string, unknown>;
  }> = [];

  globalThis.setTimeout = ((callback: (...args: unknown[]) => void, _ms?: number, ...args) => {
    callback(...args);
    return 0;
  }) as typeof setTimeout;
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const call = {
      url: String(url),
      method: init?.method || "GET",
      headers: init?.headers as Record<string, string>,
      ...(init?.body ? { body: JSON.parse(String(init.body)) as Record<string, unknown> } : {}),
    };
    calls.push(call);

    if (call.method === "POST") {
      return new Response(
        JSON.stringify({
          id: "task-123",
          task_id: "task-123",
          video_id: "video-123",
          status: "queued",
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({
        status: "completed",
        metadata: { url: "https://platform-outputs.agnes-ai.space/video-123.mp4" },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "agnes/agnes-video-v2.0",
        prompt: "A product rotates slowly under studio lighting",
        width: 1152,
        height: 768,
        num_frames: 121,
        frame_rate: 24,
        extra_body: {
          image: ["https://example.com/keyframe-one.png", "https://example.com/keyframe-two.png"],
          mode: "keyframes",
        },
      },
      credentials: { apiKey: "agnes-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(result.data.data[0].url, "https://platform-outputs.agnes-ai.space/video-123.mp4");
    assert.equal(calls.length, 2);
    assert.deepEqual(calls[0], {
      url: "https://apihub.agnes-ai.com/v1/videos",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer agnes-key",
      },
      body: {
        model: "agnes-video-v2.0",
        prompt: "A product rotates slowly under studio lighting",
        width: 1152,
        height: 768,
        num_frames: 121,
        frame_rate: 24,
        extra_body: {
          image: ["https://example.com/keyframe-one.png", "https://example.com/keyframe-two.png"],
          mode: "keyframes",
        },
      },
    });
    assert.deepEqual(calls[1], {
      url: "https://apihub.agnes-ai.com/agnesapi?video_id=video-123",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer agnes-key",
      },
    });
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});
