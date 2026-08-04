import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-bailian-coding-plan-media-"));

const { IMAGE_PROVIDERS, parseImageModel } = await import("../../open-sse/config/imageRegistry.ts");
const { VIDEO_PROVIDERS, parseVideoModel } = await import("../../open-sse/config/videoRegistry.ts");
const { resolveProviderServiceKinds } = await import("../../open-sse/config/mediaServiceKinds.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { handleVideoGeneration } = await import("../../open-sse/handlers/videoGeneration.ts");
const { resolveAlibabaProviderMediaBaseUrl } =
  await import("../../src/shared/constants/alibabaProviderRegions.ts");

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function immediateTimeout(callback, _ms, ...args) {
  if (typeof callback === "function") callback(...args);
  return 0;
}

test("Bailian Coding Plan owns an independent seven-model media catalog", () => {
  assert.deepEqual(
    IMAGE_PROVIDERS["bailian-coding-plan"].models.map((model) => model.id),
    ["wan2.7-image", "wan2.7-image-pro", "qwen-image-2.0", "qwen-image-2.0-pro"]
  );
  assert.deepEqual(
    VIDEO_PROVIDERS["bailian-coding-plan"].models.map((model) => model.id),
    ["happyhorse-1.1-i2v", "happyhorse-1.1-t2v", "happyhorse-1.1-r2v"]
  );
  assert.notEqual(
    IMAGE_PROVIDERS["bailian-coding-plan"].models,
    IMAGE_PROVIDERS["qwen-cloud-token-plan"].models
  );
  assert.notEqual(
    VIDEO_PROVIDERS["bailian-coding-plan"].models,
    VIDEO_PROVIDERS["qwen-cloud-token-plan"].models
  );
  assert.notEqual(
    IMAGE_PROVIDERS["bailian-coding-plan"].models,
    IMAGE_PROVIDERS["qwen-cloud"].models
  );
  assert.deepEqual(parseImageModel("bcp/wan2.7-image-pro"), {
    provider: "bailian-coding-plan",
    model: "wan2.7-image-pro",
  });
  assert.deepEqual(parseImageModel("bcp/qwen-image-2.0-pro"), {
    provider: "bailian-coding-plan",
    model: "qwen-image-2.0-pro",
  });
  assert.deepEqual(parseVideoModel("bcp/happyhorse-1.1-t2v"), {
    provider: "bailian-coding-plan",
    model: "happyhorse-1.1-t2v",
  });
  assert.deepEqual(parseImageModel("wan2.7-image"), {
    provider: "qwen-cloud-token-plan",
    model: "wan2.7-image",
  });
  assert.deepEqual(parseVideoModel("happyhorse-1.1-t2v"), {
    provider: "qwen-cloud-token-plan",
    model: "happyhorse-1.1-t2v",
  });
  assert.deepEqual(resolveProviderServiceKinds("bailian-coding-plan", ["llm"]).sort(), [
    "image",
    "llm",
    "video",
  ]);
});

test("Bailian Coding Plan media URLs are isolated from both Qwen Cloud providers", () => {
  const bailianUrl = resolveAlibabaProviderMediaBaseUrl("bailian-coding-plan", {
    region: "global-sg",
  });
  assert.equal(bailianUrl, "https://coding-intl.dashscope.aliyuncs.com/api/v1");
  assert.equal(
    resolveAlibabaProviderMediaBaseUrl("bailian-coding-plan", {
      region: "china-beijing",
    }),
    "https://coding.dashscope.aliyuncs.com/api/v1"
  );
  assert.notEqual(
    bailianUrl,
    resolveAlibabaProviderMediaBaseUrl("qwen-cloud", { region: "global-sg" })
  );
  assert.notEqual(
    bailianUrl,
    resolveAlibabaProviderMediaBaseUrl("qwen-cloud-token-plan", { region: "global-sg" })
  );
});

test("Bailian image models use only the Coding Plan endpoint and key", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };
    return jsonResponse({
      output: {
        choices: [
          {
            message: {
              content: [{ image: "https://cdn.example.com/bailian-wan.png" }],
            },
          },
        ],
      },
    });
  };

  try {
    for (const model of [
      "wan2.7-image",
      "wan2.7-image-pro",
      "qwen-image-2.0",
      "qwen-image-2.0-pro",
    ]) {
      const result = await handleImageGeneration({
        body: {
          model: `bailian-coding-plan/${model}`,
          prompt: "A watercolor horse",
          size: "2048x2048",
        },
        credentials: {
          apiKey: "bailian-plan-key",
          providerSpecificData: { region: "china-beijing" },
        },
        log: null,
      });

      assert.equal(
        captured.url,
        "https://coding.dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation"
      );
      assert.equal(captured.headers.Authorization, "Bearer bailian-plan-key");
      assert.equal(captured.body.model, model);
      assert.deepEqual(captured.body.parameters, { size: "2048*2048" });
      assert.equal(result.success, true);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("HappyHorse video generation uses only the Bailian Coding Plan endpoint and key", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  let captured;

  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);
    if (stringUrl.endsWith("/services/aigc/video-generation/video-synthesis")) {
      captured = {
        url: stringUrl,
        headers: options.headers,
        body: JSON.parse(String(options.body || "{}")),
      };
      return jsonResponse({ output: { task_id: "bailian-task", task_status: "PENDING" } });
    }
    if (stringUrl.endsWith("/tasks/bailian-task")) {
      return jsonResponse({
        output: {
          task_status: "SUCCEEDED",
          video_url: "https://cdn.example.com/bailian-happyhorse.mp4",
        },
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "bailian-coding-plan/happyhorse-1.1-i2v",
        image_url: "https://cdn.example.com/first-frame.png",
        duration: 5,
      },
      credentials: {
        apiKey: "bailian-plan-key",
        providerSpecificData: { region: "global-sg" },
      },
      log: null,
    });

    assert.equal(
      captured.url,
      "https://coding-intl.dashscope.aliyuncs.com/api/v1/services/aigc/video-generation/video-synthesis"
    );
    assert.equal(captured.headers.Authorization, "Bearer bailian-plan-key");
    assert.deepEqual(captured.body.input.media, [
      { type: "first_frame", url: "https://cdn.example.com/first-frame.png" },
    ]);
    assert.equal(result.success, true);
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("Bailian Coding Plan rejects models outside its own media allowlists", async () => {
  const imageResult = await handleImageGeneration({
    body: {
      model: "bailian-coding-plan/qwen-image-3.0-pro",
      prompt: "wrong catalog",
    },
    credentials: { apiKey: "bailian-plan-key" },
    log: null,
  });
  const videoResult = await handleVideoGeneration({
    body: {
      model: "bailian-coding-plan/wan2.7-videoedit",
      prompt: "wrong catalog",
    },
    credentials: { apiKey: "bailian-plan-key" },
    log: null,
  });

  assert.equal(imageResult.status, 400);
  assert.match(imageResult.error, /unsupported bailian-coding-plan image model/i);
  assert.equal(videoResult.status, 400);
  assert.match(videoResult.error, /unsupported bailian-coding-plan video model/i);
});
