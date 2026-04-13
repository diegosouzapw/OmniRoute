import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-freepik-"));

const { IMAGE_PROVIDERS } = await import("../../open-sse/config/imageRegistry.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { getFreepikAccountInfo } = await import("../../open-sse/handlers/imageGeneration.ts");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

const VALID_COOKIE = "XSRF-TOKEN=abc123%3D%3D; UID=user42; _ga=GA1.2.111; session=xyz";

/**
 * Build a fetch mock that simulates the full Freepik 3-step pipeline:
 *   1. start-tti-v2 → returns family + request_tokens
 *   2. render/v4    → returns creation IDs
 *   3. creations    → poll returns completed images
 *
 * Options allow overriding each step's behaviour.
 */
function createFreepikFetchMock(opts = {}) {
  const calls = [];

  return {
    calls,
    async mock(url, options = {}) {
      const stringUrl = String(url);
      calls.push({ url: stringUrl, method: options.method || "GET", body: options.body });

      // Step 1: start-tti-v2
      if (stringUrl.includes("/start-tti-v2")) {
        if (opts.startError) {
          return new Response(opts.startErrorBody || "start failed", {
            status: opts.startError,
          });
        }
        const body = JSON.parse(String(options.body || "{}"));
        const numImages = body.num_images || 1;
        const tokens = opts.tokens ?? Array.from({ length: numImages }, (_, i) => `tok-${i}`);
        return new Response(
          JSON.stringify({
            family: opts.family || "fam-001",
            request_tokens: tokens,
          }),
          { status: 200, headers: { "content-type": "application/json" } }
        );
      }

      // Step 2: render/v4
      if (stringUrl.includes("/render/v4")) {
        if (opts.renderError) {
          return new Response(opts.renderErrorBody || "render failed", {
            status: opts.renderError,
          });
        }
        const body = JSON.parse(String(options.body || "{}"));
        const idx = body.image_index ?? 0;
        return new Response(
          JSON.stringify({
            creation: { id: opts.creationIds?.[idx] || `cre-${idx}` },
          }),
          { status: 200, headers: { "content-type": "application/json" } }
        );
      }

      // Step 3: poll creations
      if (stringUrl.includes("/creations")) {
        if (opts.pollError) {
          return new Response("poll failed", { status: opts.pollError });
        }
        if (opts.pollFailed) {
          return new Response(
            JSON.stringify({
              data: [{ status: "failed", metadata: { error: "generation_failed" } }],
            }),
            { status: 200, headers: { "content-type": "application/json" } }
          );
        }
        const creationId = new URL(stringUrl).searchParams.get("ids[]");
        return new Response(
          JSON.stringify({
            data: [
              {
                status: "completed",
                url: `https://cdn.freepik.com/${creationId}.png`,
                metadata: { prompt: opts.revisedPrompt || "revised prompt here" },
              },
            ],
          }),
          { status: 200, headers: { "content-type": "application/json" } }
        );
      }

      // Wallet/limits endpoints
      if (stringUrl.includes("/wallet") || stringUrl.includes("/limits")) {
        return new Response(JSON.stringify(opts.accountData || { credits: 100 }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }

      throw new Error(`Unexpected URL in Freepik mock: ${stringUrl}`);
    },
  };
}

// ===========================================================================
// Registry Tests
// ===========================================================================

test("freepik provider is registered with correct config", () => {
  const fp = IMAGE_PROVIDERS.freepik;
  assert.ok(fp, "freepik provider must exist in IMAGE_PROVIDERS");
  assert.equal(fp.id, "freepik");
  assert.equal(fp.authType, "cookie");
  assert.equal(fp.format, "freepik");
  assert.equal(fp.baseUrl, "https://www.freepik.com/pikaso/api");
  assert.equal(fp.renderUrl, "https://pikaso-data.freepik.com/pikaso/api/render/v4");
  assert.ok(fp.models.length >= 4, "should have at least 4 models");
  assert.ok(
    fp.models.some((m) => m.id === "auto"),
    "should have auto model"
  );
  assert.deepEqual(fp.supportedSizes, [
    "1024x1024",
    "1024x1792",
    "1792x1024",
    "512x512",
    "768x1024",
    "1024x768",
  ]);
});

// ===========================================================================
// Auth Error Tests
// ===========================================================================

test("freepik returns 401 when cookie is empty", async () => {
  const log = createLogRecorder();
  const result = await handleImageGeneration({
    body: { model: "freepik/auto", prompt: "test" },
    credentials: { apiKey: "" },
    log,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.match(result.error, /cookie is required/i);
  assert.ok(
    log.entries.some((e) => e.level === "error" && e.tag === "IMAGE"),
    "should log auth error"
  );
});

test("freepik returns 401 when XSRF-TOKEN is missing from cookie", async () => {
  const log = createLogRecorder();
  const result = await handleImageGeneration({
    body: { model: "freepik/auto", prompt: "test" },
    credentials: { apiKey: "UID=user42; session=xyz" },
    log,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.match(result.error, /XSRF-TOKEN/);
  assert.ok(log.entries.some((e) => e.level === "error" && e.tag === "IMAGE"));
});

test("freepik returns 401 when UID is missing from cookie and no providerSpecificData", async () => {
  const log = createLogRecorder();
  const result = await handleImageGeneration({
    body: { model: "freepik/auto", prompt: "test" },
    credentials: { apiKey: "XSRF-TOKEN=abc123%3D%3D; session=xyz" },
    log,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.match(result.error, /User ID not found/);
  assert.ok(log.entries.some((e) => e.level === "error" && e.tag === "IMAGE"));
});

// ===========================================================================
// Happy Path — Full 3-step Pipeline
// ===========================================================================

test("freepik happy path: single image generation through 3-step pipeline", async () => {
  const originalFetch = globalThis.fetch;
  const mock = createFreepikFetchMock({ revisedPrompt: "a cute cat in space" });
  const log = createLogRecorder();

  globalThis.fetch = mock.mock;

  try {
    const result = await handleImageGeneration({
      body: {
        model: "freepik/auto",
        prompt: "a cute cat",
        size: "1024x1024",
        n: 1,
      },
      credentials: { apiKey: VALID_COOKIE },
      log,
    });

    assert.equal(result.success, true);
    assert.ok(result.data.created > 0, "should have timestamp");
    assert.equal(result.data.data.length, 1);
    assert.ok(result.data.data[0].url.includes("cdn.freepik.com"));
    assert.equal(result.data.data[0].revised_prompt, "a cute cat in space");

    // Verify 3-step pipeline was called
    const startCalls = mock.calls.filter((c) => c.url.includes("/start-tti-v2"));
    const renderCalls = mock.calls.filter((c) => c.url.includes("/render/v4"));
    const pollCalls = mock.calls.filter((c) => c.url.includes("/creations"));
    assert.equal(startCalls.length, 1, "should call start-tti-v2 once");
    assert.equal(renderCalls.length, 1, "should call render/v4 once for n=1");
    assert.ok(pollCalls.length >= 1, "should poll creations at least once");

    // Verify start-tti-v2 body
    const startBody = JSON.parse(startCalls[0].body);
    assert.equal(startBody.prompt, "a cute cat");
    assert.equal(startBody.mode, "auto");
    assert.equal(startBody.num_images, 1);
    assert.equal(startBody.aspect_ratio, "1:1");

    // Verify log entries
    assert.ok(log.entries.some((e) => e.level === "info" && e.message.includes("freepik/auto")));
    assert.ok(log.entries.some((e) => e.level === "info" && e.message.includes("completed")));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("freepik happy path: multiple images (n=3) dispatches parallel renders", async () => {
  const originalFetch = globalThis.fetch;
  const mock = createFreepikFetchMock();

  globalThis.fetch = mock.mock;

  try {
    const result = await handleImageGeneration({
      body: {
        model: "freepik/imagen3",
        prompt: "sunset over ocean",
        size: "1792x1024",
        n: 3,
      },
      credentials: { apiKey: VALID_COOKIE },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(result.data.data.length, 3);

    const renderCalls = mock.calls.filter((c) => c.url.includes("/render/v4"));
    assert.equal(renderCalls.length, 3, "should dispatch 3 parallel render calls");

    // Verify each render has correct image_index
    const renderBodies = renderCalls.map((c) => JSON.parse(c.body));
    const indices = renderBodies.map((b) => b.image_index).sort();
    assert.deepEqual(indices, [0, 1, 2]);

    // Verify aspect ratio mapping for 1792x1024
    assert.equal(renderBodies[0].aspect_ratio, "16:9");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("freepik caps n at 4", async () => {
  const originalFetch = globalThis.fetch;
  const mock = createFreepikFetchMock();

  globalThis.fetch = mock.mock;

  try {
    const result = await handleImageGeneration({
      body: {
        model: "freepik/auto",
        prompt: "test",
        n: 10,
      },
      credentials: { apiKey: VALID_COOKIE },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(result.data.data.length, 4, "should cap at 4 images");

    const startBody = JSON.parse(mock.calls.find((c) => c.url.includes("/start-tti-v2")).body);
    assert.equal(startBody.num_images, 4);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ===========================================================================
// Size → Aspect Ratio Mapping
// ===========================================================================

test("freepik maps all 6 supported sizes to correct aspect ratios", async () => {
  const sizeToExpectedAspect = {
    "1024x1024": "1:1",
    "1024x1792": "9:16",
    "1792x1024": "16:9",
    "512x512": "1:1",
    "768x1024": "3:4",
    "1024x768": "4:3",
  };

  const originalFetch = globalThis.fetch;

  for (const [size, expectedAspect] of Object.entries(sizeToExpectedAspect)) {
    const mock = createFreepikFetchMock();
    globalThis.fetch = mock.mock;

    try {
      await handleImageGeneration({
        body: { model: "freepik/auto", prompt: "test", size },
        credentials: { apiKey: VALID_COOKIE },
        log: null,
      });

      const startBody = JSON.parse(mock.calls.find((c) => c.url.includes("/start-tti-v2")).body);
      assert.equal(
        startBody.aspect_ratio,
        expectedAspect,
        `size ${size} should map to ${expectedAspect}`
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  }
});

// ===========================================================================
// Headers & Auth Validation
// ===========================================================================

test("freepik sends correct headers including decoded XSRF-TOKEN", async () => {
  const originalFetch = globalThis.fetch;
  let capturedHeaders;

  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);
    if (stringUrl.includes("/start-tti-v2")) {
      capturedHeaders = options.headers;
      return new Response(JSON.stringify({ family: "fam-1", request_tokens: ["tok-0"] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (stringUrl.includes("/render/v4")) {
      return new Response(JSON.stringify({ creation: { id: "cre-0" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (stringUrl.includes("/creations")) {
      return new Response(
        JSON.stringify({
          data: [{ status: "completed", url: "https://cdn.freepik.com/img.png", metadata: {} }],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    await handleImageGeneration({
      body: { model: "freepik/auto", prompt: "test" },
      credentials: { apiKey: VALID_COOKIE },
      log: null,
    });

    assert.equal(capturedHeaders["x-xsrf-token"], "abc123==", "XSRF token should be URL-decoded");
    assert.equal(capturedHeaders["x-requested-with"], "XMLHttpRequest");
    assert.equal(capturedHeaders.origin, "https://www.freepik.com");
    assert.ok(capturedHeaders.referer.includes("freepik.com/pikaso"));
    assert.ok(capturedHeaders["user-agent"].includes("Mozilla"));
    assert.equal(capturedHeaders.cookie, VALID_COOKIE);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("freepik extracts UID from providerSpecificData when cookie lacks UID", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl;

  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);
    if (stringUrl.includes("/start-tti-v2")) {
      capturedUrl = stringUrl;
      return new Response(JSON.stringify({ family: "fam-1", request_tokens: ["tok-0"] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (stringUrl.includes("/render/v4")) {
      return new Response(JSON.stringify({ creation: { id: "cre-0" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (stringUrl.includes("/creations")) {
      return new Response(
        JSON.stringify({
          data: [{ status: "completed", url: "https://cdn.freepik.com/img.png", metadata: {} }],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleImageGeneration({
      body: { model: "freepik/auto", prompt: "test" },
      credentials: {
        apiKey: "XSRF-TOKEN=abc%3D; session=xyz",
        providerSpecificData: { userId: "custom-uid-99" },
      },
      log: null,
    });

    assert.equal(result.success, true);
    assert.ok(
      capturedUrl.includes("user_id=custom-uid-99"),
      "should use providerSpecificData.userId"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ===========================================================================
// Render Body Validation
// ===========================================================================

test("freepik render body includes negative_prompt, seed, smart_prompt", async () => {
  const originalFetch = globalThis.fetch;
  let capturedRenderBody;

  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);
    if (stringUrl.includes("/start-tti-v2")) {
      return new Response(JSON.stringify({ family: "fam-1", request_tokens: ["tok-0"] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (stringUrl.includes("/render/v4")) {
      capturedRenderBody = JSON.parse(String(options.body));
      return new Response(JSON.stringify({ creation: { id: "cre-0" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (stringUrl.includes("/creations")) {
      return new Response(
        JSON.stringify({
          data: [{ status: "completed", url: "https://cdn.freepik.com/img.png", metadata: {} }],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    await handleImageGeneration({
      body: {
        model: "freepik/auto",
        prompt: "mountain landscape",
        negative_prompt: "blurry, low quality",
        seed: 42,
        size: "768x1024",
      },
      credentials: { apiKey: VALID_COOKIE },
      log: null,
    });

    assert.equal(capturedRenderBody.prompt, "mountain landscape");
    assert.equal(capturedRenderBody.negative_prompt, "blurry, low quality");
    assert.equal(capturedRenderBody.seed, 42);
    assert.equal(capturedRenderBody.smart_prompt, true);
    assert.equal(capturedRenderBody.tool, "text-to-image");
    assert.equal(capturedRenderBody.width, 768);
    assert.equal(capturedRenderBody.height, 1024);
    assert.equal(capturedRenderBody.aspect_ratio, "3:4");
    assert.equal(capturedRenderBody.request_token, "tok-0");
    assert.equal(capturedRenderBody.family, "fam-1");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ===========================================================================
// Error Handling — Pipeline Failures
// ===========================================================================

test("freepik returns upstream error when start-tti-v2 fails", async () => {
  const originalFetch = globalThis.fetch;
  const mock = createFreepikFetchMock({ startError: 429, startErrorBody: "rate limited" });
  const log = createLogRecorder();

  globalThis.fetch = mock.mock;

  try {
    const result = await handleImageGeneration({
      body: { model: "freepik/auto", prompt: "test" },
      credentials: { apiKey: VALID_COOKIE },
      log,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 429);
    assert.match(result.error, /rate limited/);
    assert.ok(log.entries.some((e) => e.level === "error" && e.message.includes("start-tti-v2")));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("freepik returns 502 when start-tti-v2 returns missing family/tokens", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url) => {
    const stringUrl = String(url);
    if (stringUrl.includes("/start-tti-v2")) {
      return new Response(JSON.stringify({ family: null, request_tokens: [] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleImageGeneration({
      body: { model: "freepik/auto", prompt: "test" },
      credentials: { apiKey: VALID_COOKIE },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.match(result.error, /missing family/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("freepik returns 502 when request_tokens count < requested n", async () => {
  const originalFetch = globalThis.fetch;
  const mock = createFreepikFetchMock({ tokens: ["tok-0"] }); // only 1 token
  const log = createLogRecorder();

  globalThis.fetch = mock.mock;

  try {
    const result = await handleImageGeneration({
      body: { model: "freepik/auto", prompt: "test", n: 3 },
      credentials: { apiKey: VALID_COOKIE },
      log,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.match(result.error, /1 request token.*3 were requested/);
    assert.ok(log.entries.some((e) => e.level === "error"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("freepik returns 502 when render/v4 fails", async () => {
  const originalFetch = globalThis.fetch;
  const mock = createFreepikFetchMock({ renderError: 500, renderErrorBody: "internal error" });

  globalThis.fetch = mock.mock;

  try {
    const result = await handleImageGeneration({
      body: { model: "freepik/auto", prompt: "test" },
      credentials: { apiKey: VALID_COOKIE },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.match(result.error, /render\/v4 failed/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("freepik returns 502 when render returns no creation IDs", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);
    if (stringUrl.includes("/start-tti-v2")) {
      return new Response(JSON.stringify({ family: "fam-1", request_tokens: ["tok-0"] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (stringUrl.includes("/render/v4")) {
      return new Response(
        JSON.stringify({ creation: {} }), // no id
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleImageGeneration({
      body: { model: "freepik/auto", prompt: "test" },
      credentials: { apiKey: VALID_COOKIE },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.match(result.error, /no creation IDs/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("freepik returns 502 when poll reports generation failed", async () => {
  const originalFetch = globalThis.fetch;
  const mock = createFreepikFetchMock({ pollFailed: true });

  globalThis.fetch = mock.mock;

  try {
    const result = await handleImageGeneration({
      body: { model: "freepik/auto", prompt: "test" },
      credentials: { apiKey: VALID_COOKIE },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.match(result.error, /Generation failed/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("freepik returns 504 on timeout (not 502)", async () => {
  const originalFetch = globalThis.fetch;
  const originalSleep = globalThis.setTimeout;

  // Make sleep instant to avoid waiting
  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);
    if (stringUrl.includes("/start-tti-v2")) {
      return new Response(JSON.stringify({ family: "fam-1", request_tokens: ["tok-0"] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (stringUrl.includes("/render/v4")) {
      return new Response(JSON.stringify({ creation: { id: "cre-0" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (stringUrl.includes("/creations")) {
      // Always return pending — will hit 30-attempt limit
      return new Response(JSON.stringify({ data: [{ status: "processing" }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleImageGeneration({
      body: { model: "freepik/auto", prompt: "test" },
      credentials: { apiKey: VALID_COOKIE },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 504, "timeout should return 504, not 502");
    assert.match(result.error, /timed out/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ===========================================================================
// Wallet & Limits Utility
// ===========================================================================

test("getFreepikAccountInfo returns wallet data", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);
    assert.ok(stringUrl.includes("/wallet"), "should call wallet endpoint");
    assert.ok(stringUrl.includes("user_id=user42"), "should include UID");
    assert.ok(options.headers["x-xsrf-token"], "should include XSRF token");
    return new Response(JSON.stringify({ credits: 500, plan: "premium" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await getFreepikAccountInfo(VALID_COOKIE, "wallet");
    assert.deepEqual(result, { credits: 500, plan: "premium" });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getFreepikAccountInfo returns limits data", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url) => {
    assert.ok(String(url).includes("/limits"));
    return new Response(JSON.stringify({ daily: 100, remaining: 42 }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await getFreepikAccountInfo(VALID_COOKIE, "limits");
    assert.deepEqual(result, { daily: 100, remaining: 42 });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getFreepikAccountInfo returns error when cookie lacks XSRF-TOKEN", async () => {
  const result = await getFreepikAccountInfo("UID=user42; session=xyz", "wallet");
  assert.ok(result.error);
  assert.match(result.error, /XSRF-TOKEN/);
});

test("getFreepikAccountInfo returns error when cookie lacks UID", async () => {
  const result = await getFreepikAccountInfo("XSRF-TOKEN=abc%3D%3D; session=xyz", "wallet");
  assert.ok(result.error);
  assert.match(result.error, /UID/);
});

test("getFreepikAccountInfo returns error on upstream failure", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => new Response("forbidden", { status: 403 });

  try {
    const result = await getFreepikAccountInfo(VALID_COOKIE, "wallet");
    assert.ok(result.error);
    assert.match(result.error, /403/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ===========================================================================
// Model Routing
// ===========================================================================

test("freepik model name is passed as mode in start-tti-v2", async () => {
  const originalFetch = globalThis.fetch;
  const mock = createFreepikFetchMock();

  globalThis.fetch = mock.mock;

  try {
    await handleImageGeneration({
      body: { model: "freepik/nano_banana_pro", prompt: "test" },
      credentials: { apiKey: VALID_COOKIE },
      log: null,
    });

    const startBody = JSON.parse(mock.calls.find((c) => c.url.includes("/start-tti-v2")).body);
    assert.equal(startBody.mode, "nano_banana_pro");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ===========================================================================
// OpenAI-compatible Response Format
// ===========================================================================

test("freepik response matches OpenAI images/generations format", async () => {
  const originalFetch = globalThis.fetch;
  const mock = createFreepikFetchMock({ revisedPrompt: "enhanced prompt" });

  globalThis.fetch = mock.mock;

  try {
    const result = await handleImageGeneration({
      body: { model: "freepik/auto", prompt: "test", n: 2 },
      credentials: { apiKey: VALID_COOKIE },
      log: null,
    });

    assert.equal(result.success, true);
    assert.ok(typeof result.data.created === "number");
    assert.ok(Array.isArray(result.data.data));
    assert.equal(result.data.data.length, 2);

    for (const item of result.data.data) {
      assert.ok(typeof item.url === "string");
      assert.ok(typeof item.revised_prompt === "string");
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ===========================================================================
// Default size fallback
// ===========================================================================

test("freepik uses 1024x1024 as default size when none specified", async () => {
  const originalFetch = globalThis.fetch;
  const mock = createFreepikFetchMock();

  globalThis.fetch = mock.mock;

  try {
    await handleImageGeneration({
      body: { model: "freepik/auto", prompt: "test" },
      credentials: { apiKey: VALID_COOKIE },
      log: null,
    });

    const startBody = JSON.parse(mock.calls.find((c) => c.url.includes("/start-tti-v2")).body);
    assert.equal(startBody.aspect_ratio, "1:1");

    const renderBody = JSON.parse(mock.calls.find((c) => c.url.includes("/render/v4")).body);
    assert.equal(renderBody.width, 1024);
    assert.equal(renderBody.height, 1024);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ===========================================================================
// Provider Validation (Test Connection)
// ===========================================================================

const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

test("freepik validateProviderApiKey succeeds with valid cookie", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url) => {
    const stringUrl = String(url);
    if (stringUrl.includes("/wallet")) {
      return new Response(JSON.stringify({ credits: 100 }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await validateProviderApiKey({
      provider: "freepik",
      apiKey: VALID_COOKIE,
      providerSpecificData: {},
    });
    assert.equal(result.valid, true);
    assert.equal(result.error, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("freepik validateProviderApiKey fails with invalid cookie (missing XSRF)", async () => {
  const result = await validateProviderApiKey({
    provider: "freepik",
    apiKey: "UID=user42; session=xyz",
    providerSpecificData: {},
  });
  assert.equal(result.valid, false);
  assert.match(result.error, /XSRF-TOKEN/);
});

test("freepik validateProviderApiKey fails on upstream error", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => new Response("forbidden", { status: 403 });

  try {
    const result = await validateProviderApiKey({
      provider: "freepik",
      apiKey: VALID_COOKIE,
      providerSpecificData: {},
    });
    assert.equal(result.valid, false);
    assert.match(result.error, /403/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
