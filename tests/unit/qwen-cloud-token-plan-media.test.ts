import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-qwen-token-plan-media-"));

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

test("Qwen Cloud Token Plan registers Wan image and HappyHorse video models", () => {
  assert.deepEqual(
    IMAGE_PROVIDERS["qwen-cloud-token-plan"].models.map((model) => model.id),
    ["wan2.7-image", "wan2.7-image-pro"]
  );
  assert.deepEqual(
    VIDEO_PROVIDERS["qwen-cloud-token-plan"].models.map((model) => model.id),
    ["happyhorse-1.1-i2v", "happyhorse-1.1-t2v", "happyhorse-1.1-r2v"]
  );
  assert.deepEqual(parseImageModel("qct/wan2.7-image-pro"), {
    provider: "qwen-cloud-token-plan",
    model: "wan2.7-image-pro",
  });
  assert.deepEqual(parseVideoModel("qct/happyhorse-1.1-t2v"), {
    provider: "qwen-cloud-token-plan",
    model: "happyhorse-1.1-t2v",
  });
  assert.deepEqual(resolveProviderServiceKinds("qwen-cloud-token-plan", ["llm"]).sort(), [
    "image",
    "llm",
    "video",
  ]);
});

test("Qwen Cloud Token Plan media URLs follow the saved region", () => {
  assert.equal(
    resolveAlibabaProviderMediaBaseUrl("qwen-cloud-token-plan", { region: "global-sg" }),
    "https://token-plan.ap-southeast-1.maas.aliyuncs.com/api/v1"
  );
  assert.equal(
    resolveAlibabaProviderMediaBaseUrl("qwen-cloud-token-plan", {
      region: "china-beijing",
    }),
    "https://token-plan.cn-beijing.maas.aliyuncs.com/api/v1"
  );
});

test("Wan image generation uses the Token Plan multimodal endpoint and normalizes URLs", async () => {
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
              content: [
                { image: "https://cdn.example.com/wan-1.png" },
                { image: "https://cdn.example.com/wan-2.png" },
              ],
            },
          },
        ],
      },
    });
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "qwen-cloud-token-plan/wan2.7-image-pro",
        prompt: "A watercolor horse",
        size: "2048x2048",
        n: 2,
      },
      credentials: {
        apiKey: "token-plan-key",
        providerSpecificData: { region: "china-beijing" },
      },
      log: null,
    });

    assert.equal(
      captured.url,
      "https://token-plan.cn-beijing.maas.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation"
    );
    assert.equal(captured.headers.Authorization, "Bearer token-plan-key");
    assert.equal(captured.body.model, "wan2.7-image-pro");
    assert.deepEqual(captured.body.input.messages[0].content, [{ text: "A watercolor horse" }]);
    assert.deepEqual(captured.body.parameters, { size: "2048*2048", n: 2 });
    assert.equal(result.success, true);
    assert.deepEqual(
      result.data.data.map((item) => item.url),
      ["https://cdn.example.com/wan-1.png", "https://cdn.example.com/wan-2.png"]
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

async function captureHappyHorseRequest(body) {
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
      return jsonResponse({ output: { task_id: "happyhorse-task", task_status: "PENDING" } });
    }
    if (stringUrl.endsWith("/tasks/happyhorse-task")) {
      return jsonResponse({
        output: {
          task_status: "SUCCEEDED",
          video_url: "https://cdn.example.com/happyhorse.mp4",
        },
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleVideoGeneration({
      body,
      credentials: {
        apiKey: "token-plan-key",
        providerSpecificData: { region: "global-sg" },
      },
      log: null,
    });
    return { captured, result };
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
}

test("HappyHorse T2V uses resolution, ratio, and async Token Plan polling", async () => {
  const { captured, result } = await captureHappyHorseRequest({
    model: "qwen-cloud-token-plan/happyhorse-1.1-t2v",
    prompt: "A horse running through clouds",
    size: "1920x1080",
    duration: 8,
    watermark: false,
  });

  assert.equal(
    captured.url,
    "https://token-plan.ap-southeast-1.maas.aliyuncs.com/api/v1/services/aigc/video-generation/video-synthesis"
  );
  assert.deepEqual(captured.body.input, { prompt: "A horse running through clouds" });
  assert.deepEqual(captured.body.parameters, {
    resolution: "1080P",
    ratio: "16:9",
    duration: 8,
    watermark: false,
  });
  assert.equal(result.success, true);
  assert.equal(result.data.data[0].url, "https://cdn.example.com/happyhorse.mp4");
});

test("HappyHorse I2V maps an image URL to a first-frame media item", async () => {
  const { captured } = await captureHappyHorseRequest({
    model: "qwen-cloud-token-plan/happyhorse-1.1-i2v",
    prompt: "The horse starts running",
    image_url: "https://cdn.example.com/horse.png",
    resolution: "720p",
    aspect_ratio: "16:9",
    duration: 5,
  });

  assert.deepEqual(captured.body.input.media, [
    { type: "first_frame", url: "https://cdn.example.com/horse.png" },
  ]);
  assert.deepEqual(captured.body.parameters, {
    resolution: "720P",
    duration: 5,
  });
});

test("HappyHorse R2V maps reference images in order", async () => {
  const { captured } = await captureHappyHorseRequest({
    model: "qwen-cloud-token-plan/happyhorse-1.1-r2v",
    prompt: "[Image 1] rides beside [Image 2]",
    reference_images: ["https://cdn.example.com/horse.png", "https://cdn.example.com/rider.png"],
    ratio: "4:3",
    duration: 6,
  });

  assert.deepEqual(captured.body.input.media, [
    { type: "reference_image", url: "https://cdn.example.com/horse.png" },
    { type: "reference_image", url: "https://cdn.example.com/rider.png" },
  ]);
  assert.equal(captured.body.parameters.ratio, "4:3");
});

test("HappyHorse I2V and R2V reject missing image input before calling upstream", async () => {
  for (const model of ["happyhorse-1.1-i2v", "happyhorse-1.1-r2v"]) {
    const result = await handleVideoGeneration({
      body: {
        model: `qwen-cloud-token-plan/${model}`,
        prompt: "missing input",
      },
      credentials: { apiKey: "token-plan-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 400);
    assert.match(result.error, /image input is required/i);
  }
});
