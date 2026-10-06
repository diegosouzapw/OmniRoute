// #10197 (tiangao88): route-level coverage for the built-in OpenRouter branch
// that /v1/images/edits gained in this PR. Exercises the actual POST(request)
// handler so the credentials / rate-limit / unified-Image-API forwarding branches
// added to route.ts itself are proven, not just the downstream service call.
//
// Before this change: POST /v1/images/edits rejected the built-in `openrouter`
// provider ("Image edit is not supported for built-in provider"), so image
// Combos routing through OpenRouter could generate but never edit. OpenRouter's
// current reference-image contract is POST /api/v1/images with input_references.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-openrouter-edits-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "openrouter-edits-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const imageEditRoute = await import("../../src/app/api/v1/images/edits/route.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

interface ErrorResponseBody {
  error: { message: string; code?: string };
}

interface ImageResponseBody {
  data: Array<{ b64_json?: string; url?: string }>;
}

const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

function seedOpenRouterConnection(overrides: { rateLimitedUntil?: string | null } = {}) {
  return providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "openrouter-test",
    apiKey: "sk-or-test-openrouter-edits",
    isActive: true,
    testStatus: "active",
    rateLimitedUntil: overrides.rateLimitedUntil ?? null,
  });
}

function dataUrlPng(bytes: number[]): string {
  return `data:image/png;base64,${Buffer.from(bytes).toString("base64")}`;
}

const REF_A = dataUrlPng([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1]);

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#10197 v1 image edit POST forwards built-in openrouter edits to the unified Image API", async () => {
  await seedOpenRouterConnection();

  let hitUrl: string | null = null;
  let hitAuth: string | null = null;
  let hitBody = "";

  globalThis.fetch = async (url, init: RequestInit = {}) => {
    hitUrl = String(url);
    const headers = init.headers;
    hitAuth =
      headers instanceof Headers
        ? String(headers.get("authorization") || "")
        : String(
            (headers as Record<string, string> | undefined)?.authorization ||
              (headers as Record<string, string> | undefined)?.Authorization ||
              ""
          );
    // The OpenRouter adapter sends JSON with input_references, not multipart.
    const raw = init.body;
    if (typeof raw === "string") hitBody = raw;
    else if (raw instanceof Uint8Array) hitBody = Buffer.from(raw).toString("utf8");
    else if (raw instanceof ArrayBuffer) hitBody = Buffer.from(raw).toString("utf8");
    else if (raw && typeof (raw as { arrayBuffer?: unknown }).arrayBuffer === "function") {
      hitBody = Buffer.from(
        await (raw as { arrayBuffer(): Promise<ArrayBuffer> }).arrayBuffer()
      ).toString("utf8");
    }
    return new Response(
      JSON.stringify({
        data: [{ b64_json: Buffer.from([0x89, 0x50, 0x4e, 0x47]).toString("base64") }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  const response = await imageEditRoute.POST(
    new Request("http://localhost/api/v1/images/edits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: "openrouter/google/gemini-3.1-flash-image-preview",
        prompt: "add a red hat",
        images: [REF_A],
      }),
    })
  );
  const body = (await response.json()) as ImageResponseBody;

  assert.equal(response.status, 200);
  assert.ok(body.data[0].b64_json, "edit must return an image payload");

  // OpenRouter's current image-to-image endpoint is the unified Image API.
  assert.equal(hitUrl, "https://openrouter.ai/api/v1/images");
  // Must carry the OpenRouter connection key as a Bearer token.
  assert.equal(hitAuth, "Bearer sk-or-test-openrouter-edits");
  assert.ok(hitBody, "JSON body must be captured");
  const forwarded = JSON.parse(hitBody) as {
    model?: string;
    prompt?: string;
    input_references?: Array<{ image_url?: { url?: string } }>;
  };
  assert.equal(forwarded.model, "google/gemini-3.1-flash-image-preview");
  assert.equal(forwarded.prompt, "add a red hat");
  assert.equal(forwarded.input_references?.length, 1);
  assert.match(forwarded.input_references?.[0]?.image_url?.url || "", /^data:image\/png;base64,/);
});

test("#10197 v1 image edit POST surfaces missing openrouter credentials", async () => {
  // No openrouter connection seeded at all.
  globalThis.fetch = async () => {
    throw new Error("Missing-credentials path must not reach upstream");
  };

  const response = await imageEditRoute.POST(
    new Request("http://localhost/api/v1/images/edits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: "openrouter/openai/gpt-5-image-mini",
        prompt: "edit this",
        images: [REF_A],
      }),
    })
  );
  const body = (await response.json()) as ErrorResponseBody;

  assert.equal(response.status, 401);
  assert.match(body.error.message, /No credentials for provider: openrouter/);
  // Hard Rule #12 — error responses must never leak a raw stack trace.
  assert.ok(!body.error.message.includes("at /"));
});

test("#10197 v1 image edit POST surfaces openrouter rate-limit sentinel", async () => {
  await seedOpenRouterConnection({ rateLimitedUntil: new Date(Date.now() + 60_000).toISOString() });
  globalThis.fetch = async () => {
    throw new Error("Rate-limited path must not reach upstream");
  };

  const response = await imageEditRoute.POST(
    new Request("http://localhost/api/v1/images/edits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: "openrouter/openai/gpt-5.4-image-2",
        prompt: "edit this",
        images: [REF_A],
      }),
    })
  );
  const body = (await response.json()) as ErrorResponseBody;

  assert.equal(response.status, 429);
  assert.match(body.error.message, /All accounts rate limited/);
  assert.ok(!body.error.message.includes("at /"));
});
