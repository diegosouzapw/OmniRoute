import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-qwen-cloud-video-"));

const { VIDEO_PROVIDERS, parseVideoModel } = await import("../../open-sse/config/videoRegistry.ts");
const { resolveProviderServiceKinds } = await import("../../open-sse/config/mediaServiceKinds.ts");
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

async function captureQwenCloudRequest(body, region = "global-sg") {
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
      return jsonResponse({ output: { task_id: "qwen-cloud-task", task_status: "PENDING" } });
    }
    if (stringUrl.endsWith("/tasks/qwen-cloud-task")) {
      return jsonResponse({
        output: {
          task_status: "SUCCEEDED",
          video_url: "https://cdn.example.com/qwen-cloud.mp4",
        },
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleVideoGeneration({
      body,
      credentials: {
        apiKey: "qwen-cloud-key",
        providerSpecificData: { region },
      },
      log: null,
    });
    return { captured, result };
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
}

test("Qwen Cloud and Token Plan keep independent video model lists", () => {
  assert.deepEqual(
    VIDEO_PROVIDERS["qwen-cloud"].models.map((model) => model.id),
    [
      "happyhorse-1.1-i2v",
      "happyhorse-1.1-t2v",
      "happyhorse-1.1-r2v",
      "happyhorse-1.0-video-edit",
      "wan2.7-t2v",
      "wan2.7-i2v",
      "wan2.7-r2v-2026-06-12",
      "wan2.7-videoedit",
    ]
  );
  assert.deepEqual(
    VIDEO_PROVIDERS["qwen-cloud-token-plan"].models.map((model) => model.id),
    ["happyhorse-1.1-i2v", "happyhorse-1.1-t2v", "happyhorse-1.1-r2v"]
  );
  assert.equal(
    VIDEO_PROVIDERS["qwen-cloud"].models.some((model) => model.id === "wan2.1-vace-plus"),
    false
  );
  assert.deepEqual(parseVideoModel("qwc/wan2.7-videoedit"), {
    provider: "qwen-cloud",
    model: "wan2.7-videoedit",
  });
  assert.deepEqual(parseVideoModel("qct/happyhorse-1.1-t2v"), {
    provider: "qwen-cloud-token-plan",
    model: "happyhorse-1.1-t2v",
  });
  assert.deepEqual(resolveProviderServiceKinds("qwen-cloud", ["llm"]).sort(), [
    "image",
    "llm",
    "video",
  ]);
});

test("Qwen Cloud media URLs follow its own saved region", () => {
  assert.equal(
    resolveAlibabaProviderMediaBaseUrl("qwen-cloud", { region: "global-sg" }),
    "https://dashscope-intl.aliyuncs.com/api/v1"
  );
  assert.equal(
    resolveAlibabaProviderMediaBaseUrl("qwen-cloud", { region: "china-beijing" }),
    "https://dashscope.aliyuncs.com/api/v1"
  );
  assert.notEqual(
    resolveAlibabaProviderMediaBaseUrl("qwen-cloud", { region: "global-sg" }),
    resolveAlibabaProviderMediaBaseUrl("qwen-cloud-token-plan", { region: "global-sg" })
  );
});

test("Qwen Cloud HappyHorse I2V uses Qwen Cloud credentials and endpoint", async () => {
  const { captured, result } = await captureQwenCloudRequest({
    model: "qwen-cloud/happyhorse-1.1-i2v",
    image_url: "https://cdn.example.com/horse.png",
    resolution: "720p",
    duration: 5,
  });

  assert.equal(
    captured.url,
    "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/video-generation/video-synthesis"
  );
  assert.equal(captured.headers.Authorization, "Bearer qwen-cloud-key");
  assert.deepEqual(captured.body.input.media, [
    { type: "first_frame", url: "https://cdn.example.com/horse.png" },
  ]);
  assert.deepEqual(captured.body.parameters, {
    resolution: "720P",
    duration: 5,
  });
  assert.equal(result.success, true);
});

test("Qwen Cloud Wan T2V maps modern resolution, ratio, and audio input", async () => {
  const { captured } = await captureQwenCloudRequest({
    model: "qwen-cloud/wan2.7-t2v",
    prompt: "A cinematic horse race",
    audio_url: "https://cdn.example.com/score.mp3",
    size: "1920x1080",
    duration: 10,
    prompt_extend: true,
    watermark: false,
  });

  assert.deepEqual(captured.body.input, {
    prompt: "A cinematic horse race",
    audio_url: "https://cdn.example.com/score.mp3",
  });
  assert.deepEqual(captured.body.parameters, {
    resolution: "1080P",
    ratio: "16:9",
    duration: 10,
    prompt_extend: true,
    watermark: false,
  });
});

test("Qwen Cloud Wan I2V maps first-frame and driving-audio media", async () => {
  const { captured } = await captureQwenCloudRequest({
    model: "qwen-cloud/wan2.7-i2v",
    image_url: "https://cdn.example.com/first.png",
    audio_url: "https://cdn.example.com/voice.mp3",
    duration: 10,
  });

  assert.deepEqual(captured.body.input.media, [
    { type: "first_frame", url: "https://cdn.example.com/first.png" },
    { type: "driving_audio", url: "https://cdn.example.com/voice.mp3" },
  ]);
  assert.equal(captured.body.parameters.duration, 10);
  assert.equal("ratio" in captured.body.parameters, false);
});

test("Qwen Cloud Wan R2V preserves ordered image, video, and voice references", async () => {
  const { captured } = await captureQwenCloudRequest({
    model: "qwen-cloud/wan2.7-r2v-2026-06-12",
    prompt: "Video 1 greets Image 1",
    media: [
      {
        type: "reference_video",
        url: "https://cdn.example.com/actor.mp4",
        reference_voice: "https://cdn.example.com/actor.mp3",
      },
      {
        type: "reference_image",
        url: "https://cdn.example.com/prop.png",
      },
    ],
    ratio: "16:9",
    duration: 10,
  });

  assert.deepEqual(captured.body.input.media, [
    {
      type: "reference_video",
      url: "https://cdn.example.com/actor.mp4",
      reference_voice: "https://cdn.example.com/actor.mp3",
    },
    {
      type: "reference_image",
      url: "https://cdn.example.com/prop.png",
    },
  ]);
  assert.equal(captured.body.parameters.ratio, "16:9");
});

test("Qwen Cloud video-edit models require and map a source video", async () => {
  for (const model of ["happyhorse-1.0-video-edit", "wan2.7-videoedit"]) {
    const { captured } = await captureQwenCloudRequest({
      model: `qwen-cloud/${model}`,
      prompt: "Replace the jacket with the reference image",
      video_url: "https://cdn.example.com/source.mp4",
      reference_images: ["https://cdn.example.com/jacket.png"],
      resolution: "1080P",
    });

    assert.deepEqual(captured.body.input.media, [
      { type: "video", url: "https://cdn.example.com/source.mp4" },
      { type: "reference_image", url: "https://cdn.example.com/jacket.png" },
    ]);
    assert.equal(captured.body.parameters.resolution, "1080P");
  }
});

test("Qwen Cloud media-specific models reject missing required inputs locally", async () => {
  for (const [model, errorPattern] of [
    ["happyhorse-1.1-i2v", /image input is required/i],
    ["happyhorse-1.1-r2v", /image input is required/i],
    ["happyhorse-1.0-video-edit", /video input is required/i],
    ["wan2.7-i2v", /image input is required/i],
    ["wan2.7-r2v-2026-06-12", /reference image or video input is required/i],
    ["wan2.7-videoedit", /video input is required/i],
  ]) {
    const result = await handleVideoGeneration({
      body: {
        model: `qwen-cloud/${model}`,
        prompt: "missing media",
      },
      credentials: { apiKey: "qwen-cloud-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 400);
    assert.match(result.error, errorPattern);
  }
});

test("Qwen provider prefixes cannot cross their registered model lists", async () => {
  const qwenCloudResult = await handleVideoGeneration({
    body: {
      model: "qwen-cloud/wan2.7-image",
      prompt: "wrong registry",
    },
    credentials: { apiKey: "qwen-cloud-key" },
    log: null,
  });
  const tokenPlanResult = await handleVideoGeneration({
    body: {
      model: "qwen-cloud-token-plan/wan2.7-videoedit",
      prompt: "wrong registry",
    },
    credentials: { apiKey: "token-plan-key" },
    log: null,
  });

  assert.equal(qwenCloudResult.status, 400);
  assert.match(qwenCloudResult.error, /unsupported qwen-cloud video model/i);
  assert.equal(tokenPlanResult.status, 400);
  assert.match(tokenPlanResult.error, /unsupported qwen-cloud-token-plan video model/i);
});
