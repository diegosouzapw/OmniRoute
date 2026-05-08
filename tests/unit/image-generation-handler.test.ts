import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-images-"));

const { IMAGE_PROVIDERS, parseImageModel, getAllImageModels } =
  await import("../../open-sse/config/imageRegistry.ts");
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
        model: "openai/gpt-image-2",
        prompt: "city skyline",
        n: 2,
        size: "1024x1536",
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
      model: "gpt-image-2",
      prompt: "city skyline",
      n: 2,
      size: "1024x1536",
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

test("image registry resolves flux aliases and exposes planned catalog aliases", () => {
  assert.deepEqual(parseImageModel("flux-kontext"), {
    provider: "black-forest-labs",
    model: "flux-kontext-pro",
  });
  assert.deepEqual(parseImageModel("pollinations/kontext"), {
    provider: "black-forest-labs",
    model: "flux-kontext-pro",
  });
  assert.deepEqual(parseImageModel("flux-2-dev"), {
    provider: "together",
    model: "black-forest-labs/FLUX.2-dev",
  });

  const modelIds = new Set(getAllImageModels().map((model) => model.id));
  const flux2Dev = getAllImageModels().find((model) => model.id === "flux-2-dev");
  const fluxKontext = getAllImageModels().find((model) => model.id === "flux-kontext");
  for (const alias of [
    "flux-kontext",
    "flux-kontext-max",
    "flux-2-max",
    "flux-2-pro",
    "flux-2-flex",
    "flux-2-dev",
  ]) {
    assert.equal(modelIds.has(alias), true, `Expected alias ${alias} in image catalog`);
  }
  assert.deepEqual(flux2Dev?.inputModalities, ["text", "image"]);
  assert.deepEqual(fluxKontext?.inputModalities, ["text", "image"]);
});

test("handleImageGeneration calls Fal AI with Key auth and normalizes URL results to base64", async () => {
  const originalFetch = globalThis.fetch;
  let requestCapture;

  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);
    if (stringUrl === "https://fal.run/fal-ai/flux-pro/v1.1-ultra") {
      requestCapture = {
        url: stringUrl,
        headers: options.headers,
        body: JSON.parse(String(options.body || "{}")),
      };

      return new Response(
        JSON.stringify({
          images: [{ url: "https://cdn.example.com/fal-ultra.png" }],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    if (stringUrl === "https://cdn.example.com/fal-ultra.png") {
      return new Response(new Uint8Array([5, 6, 7]), {
        status: 200,
        headers: { "content-type": "image/png" },
      });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "fal-ai/fal-ai/flux-pro/v1.1-ultra",
        prompt: "cinematic skyline",
        size: "1024x1792",
        n: 2,
        image_url: "https://example.com/source.png",
        response_format: "b64_json",
      },
      credentials: { apiKey: "fal-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(requestCapture.url, "https://fal.run/fal-ai/flux-pro/v1.1-ultra");
    assert.equal(requestCapture.headers.Authorization, "Key fal-key");
    assert.equal(requestCapture.body.aspect_ratio, "9:16");
    assert.equal(requestCapture.body.image_url, "https://example.com/source.png");
    assert.equal(requestCapture.body.num_images, 2);
    assert.equal(requestCapture.body.sync_mode, true);
    assert.equal(result.data.data[0].b64_json, "BQYH");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration routes Stability AI edit models to native endpoints", async () => {
  const originalFetch = globalThis.fetch;
  let requestCapture;

  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);
    if (stringUrl === "https://example.com/stability-input.png") {
      return new Response(new Uint8Array([4, 5]), {
        status: 200,
        headers: { "content-type": "image/png" },
      });
    }

    if (stringUrl === "https://api.stability.ai/v2beta/stable-image/edit/inpaint") {
      requestCapture = {
        url: stringUrl,
        headers: options.headers,
        body: options.body,
      };

      return new Response(JSON.stringify({ image: "c3RhYmlsaXR5LWltYWdl" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "stability-ai/inpaint",
        prompt: "replace the sky with aurora",
        negative_prompt: "rain",
        image_url: "https://example.com/stability-input.png",
        mask: "data:image/png;base64,AA==",
        response_format: "b64_json",
      },
      credentials: { apiKey: "stability-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(requestCapture.url, "https://api.stability.ai/v2beta/stable-image/edit/inpaint");
    assert.equal(requestCapture.headers.Authorization, "Bearer stability-key");
    assert.equal(requestCapture.headers.Accept, "application/json");
    assert.equal(requestCapture.headers["Content-Type"], undefined);
    assert.ok(requestCapture.body instanceof FormData);
    assert.equal(requestCapture.body.get("prompt"), "replace the sky with aurora");
    assert.equal(requestCapture.body.get("negative_prompt"), "rain");
    assert.equal(requestCapture.body.get("output_format"), "png");
    assert.equal((requestCapture.body.get("image") as Blob).size, 2);
    assert.equal((requestCapture.body.get("mask") as Blob).size, 1);
    assert.equal(result.data.data[0].b64_json, "c3RhYmlsaXR5LWltYWdl");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration sends Stability AI text generation as multipart form data", async () => {
  const originalFetch = globalThis.fetch;
  let requestCapture;

  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);
    if (stringUrl === "https://api.stability.ai/v2beta/stable-image/generate/core") {
      requestCapture = {
        url: stringUrl,
        headers: options.headers,
        body: options.body,
      };

      return new Response(JSON.stringify({ image: "c3RhYmlsaXR5LWNvcmU=" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "stability-ai/stable-image-core",
        prompt: "city near beach",
        size: "1024x1024",
        response_format: "b64_json",
      },
      credentials: { apiKey: "stability-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(requestCapture.url, "https://api.stability.ai/v2beta/stable-image/generate/core");
    assert.equal(requestCapture.headers.Authorization, "Bearer stability-key");
    assert.equal(requestCapture.headers.Accept, "application/json");
    assert.equal(requestCapture.headers["Content-Type"], undefined);
    assert.ok(requestCapture.body instanceof FormData);
    assert.equal(requestCapture.body.get("prompt"), "city near beach");
    assert.equal(requestCapture.body.get("mode"), "text-to-image");
    assert.equal(requestCapture.body.get("aspect_ratio"), "1:1");
    assert.equal(requestCapture.body.get("output_format"), "png");
    assert.equal(result.data.data[0].b64_json, "c3RhYmlsaXR5LWNvcmU=");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration polls Black Forest Labs results and sends base64 input images", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  let createCapture;
  let pollCapture;

  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);
    if (stringUrl === "https://example.com/bfl-input.png") {
      return new Response(new Uint8Array([1, 2]), {
        status: 200,
        headers: { "content-type": "image/png" },
      });
    }

    if (stringUrl === "https://api.bfl.ai/v1/flux-kontext-pro") {
      createCapture = {
        url: stringUrl,
        headers: options.headers,
        body: JSON.parse(String(options.body || "{}")),
      };

      return new Response(JSON.stringify({ polling_url: "https://api.bfl.ai/result/123" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (stringUrl === "https://api.bfl.ai/result/123") {
      pollCapture = {
        url: stringUrl,
        headers: options.headers,
      };

      return new Response(
        JSON.stringify({
          status: "Ready",
          result: { sample: "https://cdn.example.com/bfl-result.png" },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    if (stringUrl === "https://cdn.example.com/bfl-result.png") {
      return new Response(new Uint8Array([9, 8, 7]), {
        status: 200,
        headers: { "content-type": "image/png" },
      });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "black-forest-labs/flux-kontext-pro",
        prompt: "change the car color to blue",
        image_url: "https://example.com/bfl-input.png",
        size: "1024x1792",
        response_format: "b64_json",
      },
      credentials: { apiKey: "bfl-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(createCapture.url, "https://api.bfl.ai/v1/flux-kontext-pro");
    assert.equal(createCapture.headers["x-key"], "bfl-key");
    assert.equal(createCapture.body.input_image, "AQI=");
    assert.equal(createCapture.body.aspect_ratio, "9:16");
    assert.equal(pollCapture.headers["x-key"], "bfl-key");
    assert.equal(result.data.data[0].b64_json, "CQgH");
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleImageGeneration calls native Recraft endpoint with model in body", async () => {
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
        data: [{ url: "https://cdn.example.com/recraft.png" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "recraft/recraftv3",
        prompt: "vector fox logo",
        size: "1024x1024",
        style: "digital_illustration",
      },
      credentials: { apiKey: "recraft-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(captured.url, "https://external.api.recraft.ai/v1/images/generations");
    assert.equal(captured.headers.Authorization, "Bearer recraft-key");
    assert.deepEqual(captured.body, {
      model: "recraftv3",
      prompt: "vector fox logo",
      size: "1024x1024",
      style: "digital_illustration",
    });
    assert.equal(result.data.data[0].url, "https://cdn.example.com/recraft.png");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration uploads source images to Topaz and returns base64 output", async () => {
  const originalFetch = globalThis.fetch;
  let requestCapture;

  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);
    if (stringUrl === "https://example.com/topaz-input.png") {
      return new Response(new Uint8Array([1, 2, 3]), {
        status: 200,
        headers: { "content-type": "image/png" },
      });
    }

    if (stringUrl === "https://api.topazlabs.com/image/v1/enhance") {
      const formData = options.body as FormData;
      requestCapture = {
        url: stringUrl,
        headers: options.headers,
        outputWidth: formData.get("output_width"),
        outputHeight: formData.get("output_height"),
        image: formData.get("image"),
      };

      return new Response(new Uint8Array([7, 7, 7]), {
        status: 200,
        headers: { "content-type": "image/jpeg" },
      });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "topaz/topaz-enhance",
        prompt: "enhance image",
        image_url: "https://example.com/topaz-input.png",
        size: "2048x2048",
        response_format: "b64_json",
      },
      credentials: { apiKey: "topaz-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(requestCapture.url, "https://api.topazlabs.com/image/v1/enhance");
    assert.equal(requestCapture.headers["X-API-Key"], "topaz-key");
    assert.equal(requestCapture.outputWidth, "2048");
    assert.equal(requestCapture.outputHeight, "2048");
    assert.ok(requestCapture.image instanceof File);
    assert.equal(result.data.data[0].b64_json, "BwcH");
  } finally {
    globalThis.fetch = originalFetch;
  }
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
        model: "openai/gpt-image-2",
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
        model: "openai/gpt-image-2",
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

const { extractImageGenerationCalls } = await import("../../open-sse/handlers/imageGeneration.ts");

function buildCodexSSE(items) {
  const frames = items.map((item) => JSON.stringify({ type: "response.output_item.done", item }));
  return frames.map((frame) => `event: response.output_item.done\ndata: ${frame}\n`).join("\n");
}

test("extractImageGenerationCalls pulls base64 PNG from image_generation_call output items", () => {
  const sse = buildCodexSSE([
    {
      type: "image_generation_call",
      id: "ig_1",
      status: "completed",
      revised_prompt: "a small kitten",
      result: "aGVsbG8=",
    },
  ]);
  const calls = extractImageGenerationCalls(sse);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].b64, "aGVsbG8=");
  assert.equal(calls[0].revisedPrompt, "a small kitten");
});

test("extractImageGenerationCalls ignores unrelated events and malformed lines", () => {
  const sse = [
    "event: response.in_progress",
    `data: ${JSON.stringify({ type: "response.in_progress" })}`,
    "",
    "data: not-json",
    "",
    "event: response.output_item.done",
    `data: ${JSON.stringify({
      type: "response.output_item.done",
      item: { type: "message", role: "assistant", content: [] },
    })}`,
    "",
    "data: [DONE]",
  ].join("\n");
  assert.deepEqual(extractImageGenerationCalls(sse), []);
});

test("handleImageGeneration routes codex image requests through /responses with image_generation tool", async () => {
  const originalFetch = globalThis.fetch;
  let captured;
  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };
    const sse = buildCodexSSE([
      {
        type: "image_generation_call",
        id: "ig_1",
        status: "completed",
        revised_prompt: "happy red kitten",
        result: "a2l0dGVu",
      },
    ]);
    return new Response(sse, {
      status: 200,
      headers: { "content-type": "text/event-stream" },
    });
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "codex/gpt-5.4",
        prompt: "Draw a happy red kitten",
        response_format: "b64_json",
      },
      credentials: {
        accessToken: "codex-token",
        providerSpecificData: { workspaceId: "acct-123" },
      },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(captured.url, "https://chatgpt.com/backend-api/codex/responses");
    assert.equal(captured.headers.Authorization, "Bearer codex-token");
    assert.equal(captured.headers["chatgpt-account-id"], "acct-123");
    assert.equal(captured.body.model, "gpt-5.4");
    assert.equal(captured.body.stream, true);
    assert.equal(captured.body.store, false);
    assert.deepEqual(captured.body.tools, [{ type: "image_generation", output_format: "png" }]);
    assert.equal(captured.body.input[0].role, "user");
    assert.equal(captured.body.input[0].content[0].text, "Draw a happy red kitten");
    assert.equal(result.data.data[0].b64_json, "a2l0dGVu");
    assert.equal(result.data.data[0].revised_prompt, "happy red kitten");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration (codex) returns a data URL when response_format is not b64_json", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    const sse = buildCodexSSE([
      { type: "image_generation_call", id: "ig_2", status: "completed", result: "YWJjZA==" },
    ]);
    return new Response(sse, { status: 200 });
  };

  try {
    const result = await handleImageGeneration({
      body: { model: "cx/gpt-5.4", prompt: "kitten" },
      credentials: { accessToken: "codex-token" },
      log: null,
    });
    assert.equal(result.success, true);
    assert.equal(result.data.data[0].url, "data:image/png;base64,YWJjZA==");
    assert.equal(result.data.data[0].b64_json, undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration (codex) surfaces an error when no image_generation_call is emitted", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    const sse = buildCodexSSE([
      { type: "message", role: "assistant", content: [{ type: "output_text", text: "hi" }] },
    ]);
    return new Response(sse, { status: 200 });
  };

  try {
    const result = await handleImageGeneration({
      body: { model: "codex/gpt-5.4", prompt: "kitten" },
      credentials: { accessToken: "codex-token" },
      log: null,
    });
    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.match(result.error, /image_generation_call/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration (codex) propagates upstream HTTP errors", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response("upstream boom", { status: 403, headers: { "content-type": "text/plain" } });

  try {
    const result = await handleImageGeneration({
      body: { model: "codex/gpt-5.4", prompt: "kitten" },
      credentials: { accessToken: "codex-token" },
      log: null,
    });
    assert.equal(result.success, false);
    assert.equal(result.status, 403);
    assert.match(result.error, /upstream boom/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration (codex) forwards size and maps DALL-E quality to hosted tool config", async () => {
  const originalFetch = globalThis.fetch;
  let captured;
  globalThis.fetch = async (_url, options = {}) => {
    captured = JSON.parse(String(options.body || "{}"));
    const sse = buildCodexSSE([
      { type: "image_generation_call", id: "ig_1", status: "completed", result: "YWJj" },
    ]);
    return new Response(sse, { status: 200 });
  };

  try {
    await handleImageGeneration({
      body: {
        model: "codex/gpt-5.4",
        prompt: "kitten",
        size: "1024x1792",
        quality: "hd",
      },
      credentials: { accessToken: "codex-token" },
      log: null,
    });
    assert.deepEqual(captured.tools, [
      {
        type: "image_generation",
        output_format: "png",
        size: "1024x1792",
        quality: "high",
      },
    ]);

    await handleImageGeneration({
      body: { model: "codex/gpt-5.4", prompt: "kitten", quality: "standard" },
      credentials: { accessToken: "codex-token" },
      log: null,
    });
    assert.equal(captured.tools[0].quality, "medium");

    await handleImageGeneration({
      body: { model: "codex/gpt-5.4", prompt: "kitten" },
      credentials: { accessToken: "codex-token" },
      log: null,
    });
    assert.deepEqual(captured.tools, [{ type: "image_generation", output_format: "png" }]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
