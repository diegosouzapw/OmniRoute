import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-kie-11225-"));

const { KIE_IMAGE_MODELS } =
  await import("../../open-sse/config/providers/registry/kie/imageModels.ts");
const { handleImageGeneration, KIE_MARKET_UPSTREAM_MODEL_IDS, resolveKieMarketUpstreamModelId } =
  await import("../../open-sse/handlers/imageGeneration.ts");

/**
 * Issue #11225 — KIE Market public model IDs are namespaced for the OmniRoute
 * catalog (`kie/google-imagen/nano-banana-2`), but the KIE Market createTask
 * API expects the bare upstream model ID `nano-banana-2`. Sending the
 * namespaced id makes upstream reject the task.
 *
 * The mapping must be an explicit seam: other KIE Market ids such as
 * `seedream/4.5-text-to-image` ARE the real upstream ids and must pass through
 * unchanged, so a generic "strip everything before the slash" is wrong.
 *
 * These tests drive the real public `handleImageGeneration` entrypoint and
 * capture the payload at the final executor boundary (`fetch` to
 * `/api/v1/jobs/createTask`). No credentials, no network, no production data.
 */

interface CapturedCreate {
  url: string;
  body: Record<string, unknown>;
}

interface CapturedMarketGeneration {
  create: CapturedCreate;
  pollUrl: string;
  result: Awaited<ReturnType<typeof handleImageGeneration>>;
}

async function runKieMarketGeneration(publicModel: string): Promise<CapturedMarketGeneration> {
  const originalFetch = globalThis.fetch;
  let captured: CapturedCreate | undefined;
  let pollUrl = "";

  globalThis.fetch = (async (url: unknown, options: { body?: unknown } = {}) => {
    const stringUrl = String(url);

    if (stringUrl === "https://api.kie.ai/api/v1/jobs/createTask") {
      captured = {
        url: stringUrl,
        body: JSON.parse(String(options.body ?? "{}")) as Record<string, unknown>,
      };
      return new Response(JSON.stringify({ code: 200, data: { taskId: "kie-market-task-1" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (stringUrl.startsWith("https://api.kie.ai/api/v1/jobs/recordInfo")) {
      pollUrl = stringUrl;
      return new Response(
        JSON.stringify({
          code: 200,
          data: {
            state: "success",
            resultJson: JSON.stringify({
              resultUrls: ["https://example.com/kie-market-image.png"],
            }),
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  }) as typeof globalThis.fetch;

  try {
    const result = await handleImageGeneration({
      body: {
        model: publicModel,
        prompt: "a calm harbour at sunrise",
        size: "1024x1024",
        n: 1,
      },
      credentials: { apiKey: "test-kie-key" },
      log: null,
    });

    assert.equal(result.success, true, "KIE Market generation should succeed against the stub");
    assert.ok(captured, "expected a createTask request to be captured");
    assert.ok(pollUrl, "expected recordInfo polling to be captured");
    return { create: captured, pollUrl, result };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function resolveLiveKieMarketCatalog() {
  return KIE_IMAGE_MODELS.filter(({ isMarket }) => isMarket).map(({ id }) => ({
    publicModelId: id,
    upstreamModelId: resolveKieMarketUpstreamModelId(id),
  }));
}

test("KIE Market resolver changes exactly the documented mismatched ids in the live market catalog", () => {
  const roundTrips = resolveLiveKieMarketCatalog();
  const changed = roundTrips.filter(({ publicModelId, upstreamModelId }) => {
    return upstreamModelId !== publicModelId;
  });

  assert.deepEqual(changed, [
    {
      publicModelId: "seedream/5.0-lite-text-to-image",
      upstreamModelId: "seedream/5-lite-text-to-image",
    },
    {
      publicModelId: "seedream/5.0-lite-image-to-image",
      upstreamModelId: "seedream/5-lite-image-to-image",
    },
    {
      publicModelId: "google-imagen/nano-banana-2",
      upstreamModelId: "nano-banana-2",
    },
    {
      publicModelId: "google-imagen/nano-banana",
      upstreamModelId: "google/nano-banana",
    },
    {
      publicModelId: "google-imagen/nano-banana-pro",
      upstreamModelId: "nano-banana-pro",
    },
    {
      publicModelId: "google-imagen/nano-banana-edit",
      upstreamModelId: "google/nano-banana-edit",
    },
    {
      publicModelId: "flux/2-pro-image-to-image",
      upstreamModelId: "flux-2/pro-image-to-image",
    },
    {
      publicModelId: "flux/2-pro-text-to-image",
      upstreamModelId: "flux-2/pro-text-to-image",
    },
    {
      publicModelId: "flux/2-image-to-image",
      upstreamModelId: "flux-2/flex-image-to-image",
    },
    {
      publicModelId: "flux/2-text-to-image",
      upstreamModelId: "flux-2/flex-text-to-image",
    },
    {
      publicModelId: "gpt/gpt-image-1.5-text-to-image",
      upstreamModelId: "gpt-image/1.5-text-to-image",
    },
    {
      publicModelId: "gpt/gpt-image-1.5-image-to-image",
      upstreamModelId: "gpt-image/1.5-image-to-image",
    },
    {
      publicModelId: "gpt/gpt-image-2-text-to-image",
      upstreamModelId: "gpt-image-2-text-to-image",
    },
    {
      publicModelId: "gpt/gpt-image-2-image-to-image",
      upstreamModelId: "gpt-image-2-image-to-image",
    },
    {
      publicModelId: "wan/2.7-image",
      upstreamModelId: "wan/2-7-image",
    },
    {
      publicModelId: "wan/2.7-image-pro",
      upstreamModelId: "wan/2-7-image-pro",
    },
  ]);
});

const REWRITTEN_MARKET_IDS = new Set([
  "google-imagen/nano-banana",
  "google-imagen/nano-banana-2",
  "google-imagen/nano-banana-pro",
  "google-imagen/nano-banana-edit",
  "gpt/gpt-image-2-text-to-image",
  "gpt/gpt-image-2-image-to-image",
  "gpt/gpt-image-1.5-text-to-image",
  "gpt/gpt-image-1.5-image-to-image",
  "seedream/5.0-lite-text-to-image",
  "seedream/5.0-lite-image-to-image",
  "flux/2-pro-text-to-image",
  "flux/2-pro-image-to-image",
  "flux/2-text-to-image",
  "flux/2-image-to-image",
  "wan/2.7-image",
  "wan/2.7-image-pro",
]);

test("KIE Market resolver preserves every other live market catalog id byte-identically", () => {
  for (const { publicModelId, upstreamModelId } of resolveLiveKieMarketCatalog()) {
    if (!REWRITTEN_MARKET_IDS.has(publicModelId)) {
      assert.equal(
        upstreamModelId,
        publicModelId,
        `${publicModelId} must round-trip byte-identically`
      );
    }
  }
});

test("KIE Market resolver keeps exactly the explicit upstream id mappings (#11296)", () => {
  assert.equal(KIE_MARKET_UPSTREAM_MODEL_IDS.size, 16);
});

test("KIE Market resolver passes an unknown namespaced id through byte-identically", () => {
  const unknownModelId = "kie/foo/bar";
  let resolvedModelId = "";

  assert.doesNotThrow(() => {
    resolvedModelId = resolveKieMarketUpstreamModelId(unknownModelId);
  });
  assert.equal(resolvedModelId, unknownModelId);
});

test("KIE Market createTask sends the bare upstream model id for Nano Banana 2 (#11225)", async () => {
  const captured = await runKieMarketGeneration("kie/google-imagen/nano-banana-2");

  assert.equal(
    captured.create.body.model,
    "nano-banana-2",
    "KIE Market createTask must send the upstream model id, not the namespaced catalog id"
  );

  const input = captured.create.body.input as Record<string, unknown>;
  assert.equal(input.prompt, "a calm harbour at sunrise");
  assert.equal(input.aspect_ratio, "1:1");
  assert.equal(new URL(captured.pollUrl).searchParams.get("taskId"), "kie-market-task-1");
  assert.ok("data" in captured.result, "successful KIE generation must return image data");
  assert.equal(captured.result.data.data[0].url, "https://example.com/kie-market-image.png");
});

test("KIE Market createTask sends the KIE upstream id for Nano Banana (#11296)", async () => {
  const captured = await runKieMarketGeneration("kie/google-imagen/nano-banana");

  assert.equal(
    captured.create.body.model,
    "google/nano-banana",
    "KIE Market createTask must send the KIE-documented google/nano-banana upstream id"
  );
});

test("KIE Market createTask sends the bare upstream model id for Nano Banana Pro (#11296)", async () => {
  const captured = await runKieMarketGeneration("kie/google-imagen/nano-banana-pro");

  assert.equal(
    captured.create.body.model,
    "nano-banana-pro",
    "KIE Market createTask must send the KIE-documented nano-banana-pro upstream id"
  );
});

test("KIE Market createTask sends the KIE upstream id for Nano Banana Edit (#11296)", async () => {
  const captured = await runKieMarketGeneration("kie/google-imagen/nano-banana-edit");

  assert.equal(
    captured.create.body.model,
    "google/nano-banana-edit",
    "KIE Market createTask must send the KIE-documented google/nano-banana-edit upstream id"
  );
});

test("KIE Market createTask sends the unprefixed upstream id for GPT Image 2 T2I (#11296)", async () => {
  const captured = await runKieMarketGeneration("kie/gpt/gpt-image-2-text-to-image");

  assert.equal(captured.create.body.model, "gpt-image-2-text-to-image");
});

test("KIE Market createTask sends the unprefixed upstream id for GPT Image 2 I2I (#11296)", async () => {
  const captured = await runKieMarketGeneration("kie/gpt/gpt-image-2-image-to-image");

  assert.equal(captured.create.body.model, "gpt-image-2-image-to-image");
});

test("KIE Market createTask sends the 'gpt-image/' namespace for GPT Image 1.5 T2I (#11296)", async () => {
  const captured = await runKieMarketGeneration("kie/gpt/gpt-image-1.5-text-to-image");

  assert.equal(captured.create.body.model, "gpt-image/1.5-text-to-image");
});

test("KIE Market createTask sends the 'gpt-image/' namespace for GPT Image 1.5 I2I (#11296)", async () => {
  const captured = await runKieMarketGeneration("kie/gpt/gpt-image-1.5-image-to-image");

  assert.equal(captured.create.body.model, "gpt-image/1.5-image-to-image");
});

test("KIE Market createTask drops the '.0' for Seedream 5.0 Lite T2I (#11296)", async () => {
  const captured = await runKieMarketGeneration("kie/seedream/5.0-lite-text-to-image");

  assert.equal(captured.create.body.model, "seedream/5-lite-text-to-image");
});

test("KIE Market createTask drops the '.0' for Seedream 5.0 Lite I2I (#11296)", async () => {
  const captured = await runKieMarketGeneration("kie/seedream/5.0-lite-image-to-image");

  assert.equal(captured.create.body.model, "seedream/5-lite-image-to-image");
});

test("KIE Market createTask sends the 'flux-2/' namespace for Flux 2 Pro T2I (#11296)", async () => {
  const captured = await runKieMarketGeneration("kie/flux/2-pro-text-to-image");

  assert.equal(captured.create.body.model, "flux-2/pro-text-to-image");
});

test("KIE Market createTask sends the 'flux-2/' namespace for Flux 2 Pro I2I (#11296)", async () => {
  const captured = await runKieMarketGeneration("kie/flux/2-pro-image-to-image");

  assert.equal(captured.create.body.model, "flux-2/pro-image-to-image");
});

test("KIE Market createTask sends the 'flux-2/flex-' name for Flux 2 T2I (#11296)", async () => {
  const captured = await runKieMarketGeneration("kie/flux/2-text-to-image");

  assert.equal(captured.create.body.model, "flux-2/flex-text-to-image");
});

test("KIE Market createTask sends the 'flux-2/flex-' name for Flux 2 I2I (#11296)", async () => {
  const captured = await runKieMarketGeneration("kie/flux/2-image-to-image");

  assert.equal(captured.create.body.model, "flux-2/flex-image-to-image");
});

test("KIE Market createTask sends the dash-separated id for Wan 2.7 Image (#11296)", async () => {
  const captured = await runKieMarketGeneration("kie/wan/2.7-image");

  assert.equal(captured.create.body.model, "wan/2-7-image");
});

test("KIE Market createTask sends the dash-separated id for Wan 2.7 Image Pro (#11296)", async () => {
  const captured = await runKieMarketGeneration("kie/wan/2.7-image-pro");

  assert.equal(captured.create.body.model, "wan/2-7-image-pro");
});

test("KIE Market createTask leaves genuinely namespaced upstream ids untouched (#11225 control)", async () => {
  const captured = await runKieMarketGeneration("kie/seedream/4.5-text-to-image");

  assert.equal(
    captured.create.body.model,
    "seedream/4.5-text-to-image",
    "seedream/4.5-text-to-image IS the upstream id and must not be stripped"
  );

  const input = captured.create.body.input as Record<string, unknown>;
  assert.equal(input.prompt, "a calm harbour at sunrise");
  assert.equal(input.aspect_ratio, "1:1");
});

test("KIE direct image routing keeps the gpt4o-image endpoint and payload shape", async () => {
  const originalFetch = globalThis.fetch;
  let createUrl = "";
  let createBody: Record<string, unknown> | undefined;

  globalThis.fetch = (async (url: unknown, options: { body?: unknown } = {}) => {
    const stringUrl = String(url);
    if (stringUrl === "https://api.kie.ai/api/v1/gpt4o-image/generate") {
      createUrl = stringUrl;
      createBody = JSON.parse(String(options.body ?? "{}")) as Record<string, unknown>;
      return new Response(JSON.stringify({ code: 200, data: { taskId: "kie-direct-task-1" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (stringUrl.startsWith("https://api.kie.ai/api/v1/gpt4o-image/record-info")) {
      return new Response(
        JSON.stringify({
          code: 200,
          data: {
            status: "SUCCESS",
            response: { resultUrls: ["https://example.com/kie-direct-image.png"] },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  }) as typeof globalThis.fetch;

  try {
    const result = await handleImageGeneration({
      body: {
        model: "kie/gpt4o-image",
        prompt: "a direct-path control",
        size: "1024x1024",
        n: 2,
      },
      credentials: { apiKey: "test-kie-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(createUrl, "https://api.kie.ai/api/v1/gpt4o-image/generate");
    assert.deepEqual(createBody, {
      prompt: "a direct-path control",
      size: "1:1",
      nVariants: 2,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// #11296 — flux/kontext is catalogued with `isMarket: true`, but KIE does not
// expose it through the Market catalog: it lives under a dedicated API tree
// (POST /api/v1/flux/kontext/generate, GET /api/v1/flux/kontext/record-info).
// Sending it through the Market createTask flow gets rejected with "model
// name not supported" -- these tests lock in the dedicated-endpoint reroute
// and guard against a future regression back to the Market flow.

test("KIE flux/kontext routes to the dedicated Flux Kontext endpoint, never the Market createTask endpoint (#11296)", async () => {
  const originalFetch = globalThis.fetch;
  let createUrl = "";
  let createBody: Record<string, unknown> | undefined;
  let pollUrl = "";

  globalThis.fetch = (async (url: unknown, options: { body?: unknown } = {}) => {
    const stringUrl = String(url);

    if (stringUrl === "https://api.kie.ai/api/v1/flux/kontext/generate") {
      createUrl = stringUrl;
      createBody = JSON.parse(String(options.body ?? "{}")) as Record<string, unknown>;
      return new Response(JSON.stringify({ code: 200, data: { taskId: "kie-flux-kontext-1" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (stringUrl.startsWith("https://api.kie.ai/api/v1/flux/kontext/record-info")) {
      pollUrl = stringUrl;
      return new Response(
        JSON.stringify({
          code: 200,
          data: {
            state: "success",
            resultJson: JSON.stringify({
              resultUrls: ["https://example.com/kie-flux-kontext-image.png"],
            }),
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    // Any other URL (in particular the Market createTask/recordInfo endpoints)
    // is the regression this test guards against.
    throw new Error(`Unexpected URL: ${stringUrl}`);
  }) as typeof globalThis.fetch;

  try {
    const result = await handleImageGeneration({
      body: {
        model: "kie/flux/kontext",
        prompt: "a calm harbour at sunrise",
        size: "1024x1024",
        n: 1,
      },
      credentials: { apiKey: "test-kie-key" },
      log: null,
    });

    assert.equal(result.success, true, "KIE flux/kontext generation should succeed");
    assert.equal(createUrl, "https://api.kie.ai/api/v1/flux/kontext/generate");
    assert.deepEqual(createBody, {
      prompt: "a calm harbour at sunrise",
      aspectRatio: "1:1",
      model: "flux-kontext-pro",
    });
    assert.equal(new URL(pollUrl).searchParams.get("taskId"), "kie-flux-kontext-1");
    assert.ok("data" in result, "successful KIE generation must return image data");
    assert.equal(result.data.data[0].url, "https://example.com/kie-flux-kontext-image.png");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("KIE flux/kontext forwards an input image as 'inputImage' for edit calls (#11296)", async () => {
  const originalFetch = globalThis.fetch;
  let createBody: Record<string, unknown> | undefined;

  globalThis.fetch = (async (url: unknown, options: { body?: unknown } = {}) => {
    const stringUrl = String(url);

    if (stringUrl === "https://api.kie.ai/api/v1/flux/kontext/generate") {
      createBody = JSON.parse(String(options.body ?? "{}")) as Record<string, unknown>;
      return new Response(JSON.stringify({ code: 200, data: { taskId: "kie-flux-kontext-2" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (stringUrl.startsWith("https://api.kie.ai/api/v1/flux/kontext/record-info")) {
      return new Response(
        JSON.stringify({
          code: 200,
          data: {
            state: "success",
            resultJson: JSON.stringify({
              resultUrls: ["https://example.com/kie-flux-kontext-edit.png"],
            }),
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  }) as typeof globalThis.fetch;

  try {
    const result = await handleImageGeneration({
      body: {
        model: "kie/flux/kontext",
        prompt: "add a lighthouse",
        size: "1024x1024",
        n: 1,
        image: "https://example.com/source.png",
      },
      credentials: { apiKey: "test-kie-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(createBody?.inputImage, "https://example.com/source.png");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("flux/kontext is not part of the KIE Market upstream id map (#11296)", () => {
  assert.equal(
    KIE_MARKET_UPSTREAM_MODEL_IDS.has("flux/kontext"),
    false,
    "flux/kontext is rerouted to a dedicated endpoint, not id-rewritten through the Market map"
  );
});
