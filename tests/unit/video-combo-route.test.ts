/**
 * Route-level regression tests for #10471: combo names resolved on
 * /v1/videos/generations. Exercises the actual POST handler (not
 * executeVideoCombo directly) so the combo-name diversion, local-override
 * credential preservation, custom-model coverage, and per-target prompt
 * validation are proven end to end — the way a real client hits the route.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-video-combo-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "video-combo-route-test-secret";
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-jwt-secret-for-video-combo-route-tests";

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { createCombo } = await import("../../src/lib/db/combos.ts");
const videoRoute = await import("../../src/app/api/v1/videos/generations/route.ts");

const originalFetch = globalThis.fetch;
const originalSetTimeout = globalThis.setTimeout;

function createResponse(body: BodyInit | null, init?: ResponseInit) {
  return new Response(body, init);
}

function immediateButSafeTimeout(
  callback: (...args: unknown[]) => void,
  ms?: number,
  ...args: unknown[]
) {
  if (ms === 20_000 || ms === 5_000 || ms === 2_000) {
    return originalSetTimeout(callback as TimerHandler, 0, ...args);
  }
  return originalSetTimeout(callback as TimerHandler, ms, ...args);
}

function postVideo(body: Record<string, unknown>) {
  return videoRoute.POST(
    new Request("http://localhost/api/v1/videos/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  );
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  globalThis.setTimeout = originalSetTimeout;
});

test.after(() => {
  core.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("video route diverts a combo name to the combo executor and honors the ComfyUI local-override base URL", async () => {
  globalThis.setTimeout = immediateButSafeTimeout as typeof setTimeout;

  const OVERRIDE = "http://custom-comfy:9999";
  await providersDb.createProviderConnection({
    provider: "comfyui",
    authType: "none",
    providerSpecificData: { baseUrl: OVERRIDE },
  });
  await createCombo({
    name: "vid-local-override-combo",
    strategy: "priority",
    models: ["comfyui/animatediff"],
  });

  const seenUrls: string[] = [];
  globalThis.fetch = (async (url: unknown) => {
    const stringUrl = String(url);
    seenUrls.push(stringUrl);

    if (stringUrl.endsWith("/prompt")) {
      return createResponse(JSON.stringify({ prompt_id: "combo-prompt-1" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (stringUrl.includes("/history/combo-prompt-1")) {
      return createResponse(
        JSON.stringify({
          "combo-prompt-1": {
            outputs: { 1: [{ filename: "out.webp", subfolder: "", type: "output" }] },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    return createResponse(new Uint8Array([1, 2, 3]), { status: 200 });
  }) as typeof fetch;

  const response = await postVideo({ model: "vid-local-override-combo", prompt: "a red cube" });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("X-OmniRoute-Provider"), "comfyui");
  assert.equal(response.headers.get("X-OmniRoute-Model"), "comfyui/animatediff");
  // Fallback-attempts header is only emitted when a prior target failed first;
  // this combo has a single target that succeeds on the first try.
  assert.equal(response.headers.get("X-OmniRoute-Fallback-Attempts"), null);
  assert.match(response.headers.get("X-OmniRoute-Decision") ?? "", /strategy=priority/);
  assert.ok(seenUrls.length > 0, "the ComfyUI client made at least one request");
  assert.ok(
    seenUrls.every((u) => u.startsWith(OVERRIDE)),
    `expected every request to use the connection override ${OVERRIDE}, got: ${seenUrls.join(", ")}`
  );
});

test("video route resolves a custom video model reached through combo dispatch", async () => {
  globalThis.setTimeout = immediateButSafeTimeout as typeof setTimeout;

  await modelsDb.addCustomModel(
    "combo-custom-video-provider",
    "combo-video-v1",
    "Combo Video v1",
    "manual",
    "chat-completions",
    ["videos"]
  );
  await providersDb.createProviderConnection({
    provider: "combo-custom-video-provider",
    authType: "apikey",
    apiKey: "combo-custom-key",
    providerSpecificData: { baseUrl: "https://combo-custom.example.com/v1/videos/generations" },
  });
  await createCombo({
    name: "vid-custom-model-combo",
    strategy: "priority",
    models: ["combo-custom-video-provider/combo-video-v1"],
  });

  let captured: { url: string; body: unknown; headers: unknown } | null = null;
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    const requestBody = init?.body ? JSON.parse(String(init.body)) : {};
    captured = { url: String(url), body: requestBody, headers: init?.headers };
    return createResponse(
      JSON.stringify({
        created: Math.floor(Date.now() / 1000),
        data: [{ url: "https://combo-custom.example.com/generated.mp4", format: "mp4" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  const response = await postVideo({
    model: "vid-custom-model-combo",
    prompt: "a cat playing piano",
    duration: 5,
  });

  const payload = (await response.json()) as { data: Array<{ url?: string }> };
  assert.equal(response.status, 200);
  assert.equal(payload.data[0].url, "https://combo-custom.example.com/generated.mp4");

  assert.ok(captured, "fetch should have been called for the resolved custom model");
  assert.equal(captured!.url, "https://combo-custom.example.com/v1/videos/generations");
  assert.equal(captured!.headers.Authorization, "Bearer combo-custom-key");
  // The upstream call strips the provider prefix — resolvedProvider flowed
  // through the combo path the same way it does on the direct route.
  assert.equal(captured!.body.model, "combo-video-v1");
});

test("video route validates the prompt against the resolved combo target, not the combo name", async () => {
  globalThis.setTimeout = immediateButSafeTimeout as typeof setTimeout;

  // alibaba/wan2.7-i2v-2026-04-25 is prompt-optional (I2V). No provider
  // connection is seeded, so credential resolution will fail — but it must
  // fail with a credentials error, never "Prompt is required": the direct
  // route already treats this model as prompt-optional, and combo dispatch
  // must apply the same per-target rule instead of rejecting on the
  // unresolved combo name before expansion.
  await createCombo({
    name: "vid-i2v-optional-combo",
    strategy: "priority",
    models: ["alibaba/wan2.7-i2v-2026-04-25"],
  });

  const response = await postVideo({ model: "vid-i2v-optional-combo" });
  const payload = (await response.json()) as { error?: { message?: string } };

  assert.ok(response.status >= 400, "no credentials configured — the target must fail");
  assert.ok(
    !payload.error?.message?.includes("Prompt is required"),
    `expected a credentials failure, not a prompt-required rejection; got: ${payload.error?.message}`
  );
  assert.match(payload.error?.message ?? "", /No credentials/i);
});

test("video route still enforces the prompt requirement for a combo targeting a non-optional model", async () => {
  globalThis.setTimeout = immediateButSafeTimeout as typeof setTimeout;

  await createCombo({
    name: "vid-t2v-required-combo",
    strategy: "priority",
    models: ["comfyui/animatediff"],
  });

  const response = await postVideo({ model: "vid-t2v-required-combo" });
  const payload = (await response.json()) as { error?: { message?: string } };

  assert.equal(response.status, 400);
  assert.match(payload.error?.message ?? "", /Prompt is required/);
});
