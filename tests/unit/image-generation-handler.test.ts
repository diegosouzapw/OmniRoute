import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-images-"));

const { IMAGE_PROVIDERS } = await import("../../open-sse/config/imageRegistry.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");

function immediateTimeout(callback, _ms, ...args) {
  if (typeof callback === "function") callback(...args);
  return 0;
}

function createLogRecorder() {
  const entries = [];
  return {
    entries,
    info(tag, message) {
      entries.push({ level: "info", tag, message });
    },
    error(tag, message) {
      entries.push({ level: "error", tag, message });
    },
    warn(tag, message) {
      entries.push({ level: "warn", tag, message });
    },
  };
}

test("handleImageGeneration routes OpenAI-compatible providers and forwards image options", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };

    return new Response(
      JSON.stringify({
        created: 123,
        data: [{ url: "https://cdn.example.com/image.png" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "openai/dall-e-3",
        prompt: "city skyline",
        n: 2,
        size: "1024x1792",
        quality: "hd",
        response_format: "url",
        style: "vivid",
      },
      credentials: { apiKey: "image-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(captured.url, "https://api.openai.com/v1/images/generations");
    assert.equal(captured.headers.Authorization, "Bearer image-key");
    assert.deepEqual(captured.body, {
      model: "dall-e-3",
      prompt: "city skyline",
      n: 2,
      size: "1024x1792",
      quality: "hd",
      response_format: "url",
      style: "vivid",
    });
    assert.equal(result.data.data[0].url, "https://cdn.example.com/image.png");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration uses synthetic OpenAI-compatible routing for resolved custom providers", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      body: JSON.parse(String(options.body || "{}")),
      headers: options.headers,
    };

    return new Response(JSON.stringify({ data: [{ b64_json: "ZmFrZQ==" }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "custom-provider/super-image",
        prompt: "retro poster",
      },
      credentials: {
        apiKey: "custom-key",
        baseUrl: "https://custom.example.com/v1/images/generations",
      },
      resolvedProvider: "custom-provider",
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(captured.url, "https://custom.example.com/v1/images/generations");
    assert.equal(captured.headers.Authorization, "Bearer custom-key");
    assert.deepEqual(captured.body, {
      model: "super-image",
      prompt: "retro poster",
    });
    assert.equal(result.data.data[0].b64_json, "ZmFrZQ==");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration maps Hyperbolic size parameters and normalizes base64 images", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (_url, options = {}) => {
    captured = JSON.parse(String(options.body || "{}"));
    return new Response(
      JSON.stringify({
        images: [{ image: "aW1hZ2UtMQ==" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "hyperbolic/FLUX.1-dev",
        prompt: "futuristic tower",
        size: "512x1024",
      },
      credentials: { apiKey: "hyper-key" },
      log: null,
    });

    assert.deepEqual(captured, {
      model_name: "FLUX.1-dev",
      prompt: "futuristic tower",
      height: 1024,
      width: 512,
      backend: "auto",
    });
    assert.equal(result.success, true);
    assert.equal(result.data.data[0].b64_json, "aW1hZ2UtMQ==");
    assert.equal(result.data.data[0].revised_prompt, "futuristic tower");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration maps SD WebUI payload shape and batch size", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (_url, options = {}) => {
    captured = JSON.parse(String(options.body || "{}"));
    return new Response(
      JSON.stringify({
        images: ["YmFzZTY0LWltYWdl"],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "sdwebui/sdxl-base-1.0",
        prompt: "forest cabin",
        negative_prompt: "low quality",
        size: "768x768",
        steps: 30,
        cfg_scale: 9,
        sampler: "DPM++",
        n: 3,
      },
      credentials: null,
      log: null,
    });

    assert.equal(result.success, true);
    assert.deepEqual(captured, {
      prompt: "forest cabin",
      negative_prompt: "low quality",
      width: 768,
      height: 768,
      steps: 30,
      cfg_scale: 9,
      sampler_name: "DPM++",
      batch_size: 3,
      override_settings: {
        sd_model_checkpoint: "sdxl-base-1.0",
      },
    });
    assert.equal(result.data.data[0].b64_json, "YmFzZTY0LWltYWdl");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration rejects invalid model strings", async () => {
  const result = await handleImageGeneration({
    body: {
      model: "not-a-provider-qualified-image-model",
      prompt: "oops",
    },
    credentials: { apiKey: "x" },
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /Invalid image model/);
});

test("handleImageGeneration treats unknown provider prefixes as invalid image models", async () => {
  const result = await handleImageGeneration({
    body: {
      model: "mystery/model-1",
      prompt: "oops",
    },
    credentials: { apiKey: "x" },
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /Invalid image model: mystery\/model-1/);
});

test("handleImageGeneration transforms Gemini image responses from Antigravity", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };

    return new Response(
      JSON.stringify({
        candidates: [
          {
            content: {
              parts: [{ text: "revised prompt" }, { inlineData: { data: "YmFzZTY0LWdlbWluaQ==" } }],
            },
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "antigravity/gemini-image-preview",
        prompt: "painted beach",
      },
      credentials: { accessToken: "ag-token" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(
      captured.url,
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-image-preview:generateContent"
    );
    assert.equal(captured.headers.Authorization, "Bearer ag-token");
    assert.deepEqual(captured.body, {
      contents: [{ parts: [{ text: "painted beach" }] }],
      generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
    });
    assert.deepEqual(result.data.data, [
      { b64_json: "YmFzZTY0LWdlbWluaQ==", revised_prompt: "revised prompt" },
    ]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration retries Nebius against the fallback URL after retryable failures", async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];

  globalThis.fetch = async (url, options = {}) => {
    calls.push({
      url: String(url),
      body: JSON.parse(String(options.body || "{}")),
      headers: options.headers,
    });

    if (calls.length === 1) {
      return new Response("primary missing", { status: 404 });
    }

    return new Response(
      JSON.stringify({
        created: 321,
        data: [{ url: "https://cdn.example.com/fallback.png" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "nebius/black-forest-labs/flux-dev",
        prompt: "fallback skyline",
      },
      credentials: { apiKey: "nebius-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(calls.length, 2);
    assert.equal(calls[0].url, "https://api.tokenfactory.nebius.com/v1/images/generations");
    assert.equal(calls[1].url, "https://api.studio.nebius.com/v1/images/generations");
    assert.equal(calls[1].headers.Authorization, "Bearer nebius-key");
    assert.deepEqual(calls[1].body, {
      model: "black-forest-labs/flux-dev",
      prompt: "fallback skyline",
    });
    assert.deepEqual(result.data.data, [{ url: "https://cdn.example.com/fallback.png" }]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration supports NanoBanana synchronous flash responses", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      body: JSON.parse(String(options.body || "{}")),
      headers: options.headers,
    };

    return new Response(JSON.stringify({ image: "bmFub2JhbmFuYS1pbWFnZQ==" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "nanobanana/nanobanana-flash",
        prompt: "banana robot",
        n: 2,
        size: "1024x1792",
      },
      credentials: { apiKey: "banana-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(captured.url, "https://api.nanobananaapi.ai/api/v1/nanobanana/generate");
    assert.equal(captured.headers.Authorization, "Bearer banana-key");
    assert.deepEqual(captured.body, {
      prompt: "banana robot",
      type: "TEXTTOIAMGE",
      numImages: 2,
      image_size: "9:16",
    });
    assert.deepEqual(result.data.data, [
      { b64_json: "bmFub2JhbmFuYS1pbWFnZQ==", revised_prompt: "banana robot" },
    ]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration uses the NanoBanana pro endpoint and keeps sync data payloads", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      body: JSON.parse(String(options.body || "{}")),
    };

    return new Response(
      JSON.stringify({
        data: [{ url: "https://cdn.example.com/pro-image.png", revised_prompt: "banana pro" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "nanobanana/nanobanana-pro",
        prompt: "banana pro",
        size: "1024x1024",
        quality: "hd",
        imageUrls: ["https://example.com/ref.png"],
      },
      credentials: { apiKey: "banana-pro-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(captured.url, "https://api.nanobananaapi.ai/api/v1/nanobanana/generate-pro");
    assert.deepEqual(captured.body, {
      prompt: "banana pro",
      resolution: "2K",
      aspectRatio: "1:1",
      imageUrls: ["https://example.com/ref.png"],
    });
    assert.deepEqual(result.data.data, [
      { url: "https://cdn.example.com/pro-image.png", revised_prompt: "banana pro" },
    ]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration polls NanoBanana task results and converts URLs to base64 when requested", async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];

  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);
    calls.push(stringUrl);

    if (stringUrl === "https://api.nanobananaapi.ai/api/v1/nanobanana/generate") {
      return new Response(JSON.stringify({ taskId: "task-1" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (stringUrl === "https://api.nanobananaapi.ai/api/v1/nanobanana/record-info?taskId=task-1") {
      return new Response(
        JSON.stringify({
          data: {
            successFlag: 1,
            response: { resultImageUrl: "https://cdn.example.com/result.png" },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    if (stringUrl === "https://cdn.example.com/result.png") {
      return new Response(new Uint8Array([1, 2, 3, 4]), { status: 200 });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "nanobanana/nanobanana-flash",
        prompt: "banana async",
        response_format: "b64_json",
      },
      credentials: { apiKey: "banana-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.deepEqual(calls, [
      "https://api.nanobananaapi.ai/api/v1/nanobanana/generate",
      "https://api.nanobananaapi.ai/api/v1/nanobanana/record-info?taskId=task-1",
      "https://cdn.example.com/result.png",
    ]);
    assert.deepEqual(result.data.data, [{ b64_json: "AQIDBA==", revised_prompt: "banana async" }]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration rejects NanoBanana submissions that never return a task identifier", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await handleImageGeneration({
      body: {
        model: "nanobanana/nanobanana-flash",
        prompt: "banana missing task",
      },
      credentials: { apiKey: "banana-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.match(result.error, /did not return taskId/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration executes ComfyUI workflows and normalizes image outputs", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  let promptBody;

  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);

    if (stringUrl === "http://localhost:8188/prompt") {
      promptBody = JSON.parse(String(options.body || "{}"));
      return new Response(JSON.stringify({ prompt_id: "image-1" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (stringUrl === "http://localhost:8188/history/image-1") {
      return new Response(
        JSON.stringify({
          "image-1": {
            outputs: {
              9: {
                images: [{ filename: "frame.png", subfolder: "out", type: "output" }],
              },
            },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    if (stringUrl.includes("/view?")) {
      return new Response(new Uint8Array([9, 9, 9]), { status: 200 });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "comfyui/flux-dev",
        prompt: "comfy forest",
        negative_prompt: "blurry",
        size: "768x512",
        n: 2,
      },
      credentials: null,
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(promptBody.prompt["5"].inputs.width, 768);
    assert.equal(promptBody.prompt["5"].inputs.height, 512);
    assert.equal(promptBody.prompt["5"].inputs.batch_size, 2);
    assert.deepEqual(result.data.data, [{ b64_json: "CQkJ", revised_prompt: "comfy forest" }]);
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleImageGeneration returns provider errors when ComfyUI submission fails", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => new Response("boom", { status: 500 });

  try {
    const result = await handleImageGeneration({
      body: {
        model: "comfyui/flux-dev",
        prompt: "broken workflow",
      },
      credentials: null,
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.match(result.error, /ComfyUI submit failed \(500\): boom/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration supports dynamically registered Imagen3 providers", async () => {
  const originalFetch = globalThis.fetch;
  const originalProvider = IMAGE_PROVIDERS.imagen3;
  let captured;

  IMAGE_PROVIDERS.imagen3 = {
    id: "imagen3",
    baseUrl: "https://imagen.example.com/v1/generate",
    authType: "apikey",
    authHeader: "bearer",
    format: "imagen3",
    models: [{ id: "image-gen", name: "Image Gen" }],
    supportedSizes: ["1024x1024"],
  };

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };

    return new Response(
      JSON.stringify({
        created: 42,
        images: [{ image: "aW1hZ2VuLTM=" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "imagen3/image-gen",
        prompt: "vertex skyline",
        size: "1792x1024",
      },
      credentials: { apiKey: "imagen-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(captured.url, "https://imagen.example.com/v1/generate");
    assert.equal(captured.headers.Authorization, "Bearer imagen-key");
    assert.deepEqual(captured.body, {
      prompt: "vertex skyline",
      aspect_ratio: "16:9",
      number_of_images: 1,
    });
    assert.deepEqual(result.data.data, [
      { b64_json: "aW1hZ2VuLTM=", revised_prompt: "vertex skyline" },
    ]);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalProvider) {
      IMAGE_PROVIDERS.imagen3 = originalProvider;
    } else {
      delete IMAGE_PROVIDERS.imagen3;
    }
  }
});

test("handleImageGeneration preserves Imagen3 data arrays when providers already return OpenAI-like payloads", async () => {
  const originalFetch = globalThis.fetch;
  const originalProvider = IMAGE_PROVIDERS.imagen3;

  IMAGE_PROVIDERS.imagen3 = {
    id: "imagen3",
    baseUrl: "https://imagen.example.com/v1/generate",
    authType: "apikey",
    authHeader: "bearer",
    format: "imagen3",
    models: [{ id: "image-gen", name: "Image Gen" }],
    supportedSizes: ["1024x1024"],
  };

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        data: [{ url: "https://cdn.example.com/already-normalized.png" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  try {
    const result = await handleImageGeneration({
      body: {
        model: "imagen3/image-gen",
        prompt: "normalized payload",
      },
      credentials: { apiKey: "imagen-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.deepEqual(result.data.data, [{ url: "https://cdn.example.com/already-normalized.png" }]);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalProvider) {
      IMAGE_PROVIDERS.imagen3 = originalProvider;
    } else {
      delete IMAGE_PROVIDERS.imagen3;
    }
  }
});

test("handleImageGeneration returns provider errors when Imagen3 fetch throws", async () => {
  const originalFetch = globalThis.fetch;
  const originalProvider = IMAGE_PROVIDERS.imagen3;

  IMAGE_PROVIDERS.imagen3 = {
    id: "imagen3",
    baseUrl: "https://imagen.example.com/v1/generate",
    authType: "apikey",
    authHeader: "bearer",
    format: "imagen3",
    models: [{ id: "image-gen", name: "Image Gen" }],
    supportedSizes: ["1024x1024"],
  };

  globalThis.fetch = async () => {
    throw new Error("imagen upstream timeout");
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "imagen3/image-gen",
        prompt: "broken imagen",
      },
      credentials: { apiKey: "imagen-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.equal(result.error, "Image provider error: imagen upstream timeout");
  } finally {
    globalThis.fetch = originalFetch;
    if (originalProvider) {
      IMAGE_PROVIDERS.imagen3 = originalProvider;
    } else {
      delete IMAGE_PROVIDERS.imagen3;
    }
  }
});

test("handleImageGeneration uses the default synthetic base URL for resolved custom providers without baseUrl", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl;

  globalThis.fetch = async (url) => {
    capturedUrl = String(url);
    return new Response(JSON.stringify({ data: [{ b64_json: "ZmFrZS1jdXN0b20=" }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "custom-provider/super-image",
        prompt: "fallback base url",
      },
      credentials: { apiKey: "custom-key" },
      resolvedProvider: "custom-provider",
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(
      capturedUrl,
      "https://generativelanguage.googleapis.com/v1beta/openai/images/generations"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration logs OpenAI-compatible upstream failures and transport errors", async () => {
  const originalFetch = globalThis.fetch;
  const log = createLogRecorder();

  globalThis.fetch = async () => new Response("primary unavailable", { status: 503 });

  try {
    const failed = await handleImageGeneration({
      body: {
        model: "openai/dall-e-3",
        prompt: "broken upstream",
      },
      credentials: { apiKey: "image-key" },
      log,
    });

    assert.equal(failed.success, false);
    assert.equal(failed.status, 503);
    assert.match(log.entries.at(-1).message, /openai error 503/);
  } finally {
    globalThis.fetch = originalFetch;
  }

  globalThis.fetch = async () => {
    throw new Error("socket closed");
  };

  try {
    const errored = await handleImageGeneration({
      body: {
        model: "openai/dall-e-3",
        prompt: "transport issue",
      },
      credentials: { apiKey: "image-key" },
      log,
    });

    assert.equal(errored.success, false);
    assert.equal(errored.status, 502);
    assert.equal(errored.error, "Image provider error: socket closed");
    assert.match(log.entries.at(-1).message, /socket closed/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration logs Nebius fallback attempts before succeeding", async () => {
  const originalFetch = globalThis.fetch;
  const log = createLogRecorder();
  let callCount = 0;

  globalThis.fetch = async (url) => {
    callCount += 1;
    if (callCount === 1) {
      assert.equal(String(url), "https://api.tokenfactory.nebius.com/v1/images/generations");
      return new Response("primary missing", { status: 404 });
    }

    return new Response(
      JSON.stringify({
        data: [{ url: "https://cdn.example.com/fallback-logged.png" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "nebius/black-forest-labs/flux-dev",
        prompt: "fallback logging",
      },
      credentials: { apiKey: "nebius-key" },
      log,
    });

    assert.equal(result.success, true);
    assert.equal(
      log.entries.some((entry) => entry.level === "info" && /trying fallback/.test(entry.message)),
      true
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration surfaces Hyperbolic upstream failures and fetch exceptions", async () => {
  const originalFetch = globalThis.fetch;
  const log = createLogRecorder();

  globalThis.fetch = async () => new Response("hyperbolic unavailable", { status: 429 });

  try {
    const failed = await handleImageGeneration({
      body: {
        model: "hyperbolic/FLUX.1-dev",
        prompt: "too busy",
      },
      credentials: { apiKey: "hyper-key" },
      log,
    });

    assert.equal(failed.success, false);
    assert.equal(failed.status, 429);
    assert.equal(failed.error, "hyperbolic unavailable");
  } finally {
    globalThis.fetch = originalFetch;
  }

  globalThis.fetch = async () => {
    throw new Error("hyperbolic network down");
  };

  try {
    const errored = await handleImageGeneration({
      body: {
        model: "hyperbolic/FLUX.1-dev",
        prompt: "network issue",
      },
      credentials: { apiKey: "hyper-key" },
      log,
    });

    assert.equal(errored.success, false);
    assert.equal(errored.status, 502);
    assert.equal(errored.error, "Image provider error: hyperbolic network down");
    assert.match(log.entries.at(-1).message, /hyperbolic network down/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration handles NanoBanana missing statusUrl, failed tasks and empty completed payloads", async () => {
  const originalFetch = globalThis.fetch;
  const originalProvider = structuredClone(IMAGE_PROVIDERS.nanobanana);
  const log = createLogRecorder();

  IMAGE_PROVIDERS.nanobanana = {
    ...IMAGE_PROVIDERS.nanobanana,
    statusUrl: undefined,
  };

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ taskId: "task-missing-status" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  try {
    const missingStatusUrl = await handleImageGeneration({
      body: {
        model: "nanobanana/nanobanana-flash",
        prompt: "missing status url",
      },
      credentials: { apiKey: "banana-key" },
      log,
    });

    assert.equal(missingStatusUrl.success, false);
    assert.equal(missingStatusUrl.status, 500);
    assert.match(missingStatusUrl.error, /statusUrl is not configured/);
  } finally {
    IMAGE_PROVIDERS.nanobanana = originalProvider;
    globalThis.fetch = originalFetch;
  }

  globalThis.fetch = async (url) => {
    const stringUrl = String(url);
    if (stringUrl.endsWith("/generate")) {
      return new Response(JSON.stringify({ taskId: "task-failed" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        data: { successFlag: 2, errorMessage: "NanoBanana generation failed" },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const failedTask = await handleImageGeneration({
      body: {
        model: "nanobanana/nanobanana-flash",
        prompt: "failed task",
        poll_interval_ms: 1,
      },
      credentials: { apiKey: "banana-key" },
      log,
    });

    assert.equal(failedTask.success, false);
    assert.equal(failedTask.status, 502);
    assert.equal(failedTask.error, "NanoBanana generation failed");
  } finally {
    globalThis.fetch = originalFetch;
  }

  globalThis.fetch = async (url) => {
    const stringUrl = String(url);
    if (stringUrl.endsWith("/generate")) {
      return new Response(JSON.stringify({ taskId: "task-empty" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        data: { successFlag: 1, response: {} },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const completedWithoutPayload = await handleImageGeneration({
      body: {
        model: "nanobanana/nanobanana-flash",
        prompt: "empty payload",
        poll_interval_ms: 1,
      },
      credentials: { apiKey: "banana-key" },
      log,
    });

    assert.equal(completedWithoutPayload.success, true);
    assert.deepEqual(completedWithoutPayload.data.data, []);
    assert.equal(
      log.entries.some(
        (entry) => entry.level === "warn" && /completed without image payload/.test(entry.message)
      ),
      true
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration surfaces SD WebUI upstream and transport failures", async () => {
  const originalFetch = globalThis.fetch;
  const log = createLogRecorder();

  globalThis.fetch = async () => new Response("sdwebui error", { status: 500 });

  try {
    const failed = await handleImageGeneration({
      body: {
        model: "sdwebui/sdxl-base-1.0",
        prompt: "broken sdwebui",
      },
      credentials: null,
      log,
    });

    assert.equal(failed.success, false);
    assert.equal(failed.status, 500);
    assert.equal(failed.error, "sdwebui error");
  } finally {
    globalThis.fetch = originalFetch;
  }

  globalThis.fetch = async () => {
    throw new Error("socket hang up");
  };

  try {
    const errored = await handleImageGeneration({
      body: {
        model: "sdwebui/sdxl-base-1.0",
        prompt: "sdwebui transport issue",
      },
      credentials: null,
      log,
    });

    assert.equal(errored.success, false);
    assert.equal(errored.status, 502);
    assert.equal(errored.error, "Image provider error: socket hang up");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration normalizes Imagen3 single-image payloads and non-ok responses", async () => {
  const originalFetch = globalThis.fetch;
  const originalProvider = IMAGE_PROVIDERS.imagen3;

  IMAGE_PROVIDERS.imagen3 = {
    id: "imagen3",
    baseUrl: "https://imagen.example.com/v1/generate",
    authType: "apikey",
    authHeader: "bearer",
    format: "imagen3",
    models: [{ id: "image-gen", name: "Image Gen" }],
    supportedSizes: ["1024x1024"],
  };

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ image: "aW1hZ2VuLXNpbmdsZQ==" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  try {
    const singleObject = await handleImageGeneration({
      body: {
        model: "imagen3/image-gen",
        prompt: "single image",
      },
      credentials: { apiKey: "imagen-key" },
      log: null,
    });

    assert.equal(singleObject.success, true);
    assert.deepEqual(singleObject.data.data, [
      { b64_json: "aW1hZ2VuLXNpbmdsZQ==", url: undefined, revised_prompt: "single image" },
    ]);
  } finally {
    globalThis.fetch = originalFetch;
  }

  globalThis.fetch = async () => new Response("imagen failed", { status: 503 });

  try {
    const failed = await handleImageGeneration({
      body: {
        model: "imagen3/image-gen",
        prompt: "imagen failed",
      },
      credentials: { apiKey: "imagen-key" },
      log: createLogRecorder(),
    });

    assert.equal(failed.success, false);
    assert.equal(failed.status, 503);
    assert.equal(failed.error, "imagen failed");
  } finally {
    globalThis.fetch = originalFetch;
    if (originalProvider) {
      IMAGE_PROVIDERS.imagen3 = originalProvider;
    } else {
      delete IMAGE_PROVIDERS.imagen3;
    }
  }
});
