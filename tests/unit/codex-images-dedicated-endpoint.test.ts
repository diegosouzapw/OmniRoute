/**
 * Codex GPT Image models must use the dedicated Codex Images routes
 * (`/backend-api/codex/images/{generations,edits}`), not the Responses hosted
 * `image_generation` tool. The hosted tool ignores the requested image model (the
 * backend pins `gpt-image-2-codex`), and the chat model that has to call the tool can
 * decline, which surfaced as a 502. These tests drive the public handler and route
 * paths with a mocked upstream and assert the outbound URL, body (model forwarded, no
 * tool call), headers, and the OpenAI image envelope returned to the caller.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-images-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "codex-images-test-api-key-secret";

await import("../_setup/imageCallLogLifecycle.ts");

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const imageRoute = await import("../../src/app/api/v1/images/generations/route.ts");
const imageEditRoute = await import("../../src/app/api/v1/images/edits/route.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const imageHandler = await import("../../open-sse/handlers/imageGeneration.ts");
const handleImageGeneration = imageHandler.handleImageGeneration as (
  options: Parameters<typeof imageHandler.handleImageGeneration>[0]
) => Promise<{
  success: boolean;
  status?: number;
  error?: unknown;
  retryable?: boolean;
  data?: {
    created?: number;
    data?: Array<{ b64_json?: string; generation_id?: string }>;
    usage?: { output_tokens_details: { image_tokens: number } };
  };
}>;
const { getAllImageModels } = await import("../../open-sse/config/imageRegistry.ts");

const originalFetch = globalThis.fetch;
const IMAGES_BASE = "https://chatgpt.com/backend-api/codex/images";

type Captured = { url: string; headers: Record<string, string>; body: Record<string, unknown> };

function imagesResponse(b64: string, outputTokens = 472) {
  return new Response(
    JSON.stringify({
      created: 1790000000,
      data: [{ b64_json: b64, generation_id: "gen_1" }],
      background: "opaque",
      output_format: "png",
      quality: "low",
      size: "1312x1199",
      usage: {
        input_tokens: 19,
        input_tokens_details: { image_tokens: 0, text_tokens: 19 },
        output_tokens: outputTokens,
        output_tokens_details: { image_tokens: outputTokens, text_tokens: 0 },
        total_tokens: 19 + outputTokens,
      },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

function captureFetch(calls: Captured[], respond = () => imagesResponse("ZmxhcmU=")) {
  globalThis.fetch = async (url, options: RequestInit = {}) => {
    calls.push({
      url: String(url),
      headers: options.headers as Record<string, string>,
      body: JSON.parse(String(options.body || "{}")),
    });
    return respond();
  };
}

async function resetStorage() {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

test.beforeEach(resetStorage);
test.after(() => {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Codex GPT Image generation posts to the dedicated Images route and forwards the model", async () => {
  const calls: Captured[] = [];
  captureFetch(calls);

  const result = await handleImageGeneration({
    body: {
      model: "codex/gpt-image-2.5-flare",
      prompt: "a ceramic teacup",
      size: "1024x1536",
      quality: "high",
    },
    credentials: { accessToken: "codex-token", providerSpecificData: { workspaceId: "ws-1" } },
    log: null,
  });

  assert.equal(result.success, true);
  assert.equal(calls.length, 1);
  const [call] = calls;
  assert.equal(call.url, `${IMAGES_BASE}/generations`);
  assert.deepEqual(call.body, {
    prompt: "a ceramic teacup",
    model: "gpt-image-2.5-flare",
    n: 1,
    size: "1024x1536",
    quality: "high",
  });
  assert.equal(call.headers.Authorization, "Bearer codex-token");
  assert.equal(call.headers["chatgpt-account-id"], "ws-1");
  assert.equal(call.headers.originator, "codex_cli_rs");
  assert.equal(call.headers.Accept, "application/json");
  assert.equal(call.headers.session_id, "ws-1");

  // OpenAI gpt-image envelope: bytes in b64_json by default, plus the upstream usage block.
  assert.equal(result.data.created, 1790000000);
  assert.deepEqual(result.data.data, [{ b64_json: "ZmxhcmU=", generation_id: "gen_1" }]);
  assert.equal(result.data.usage.output_tokens_details.image_tokens, 472);
});

test("Codex GPT Image rejects fanout and URL output before submission", async () => {
  const calls: Captured[] = [];
  captureFetch(calls);
  for (const body of [{ n: 2 }, { response_format: "url" }]) {
    const result = await handleImageGeneration({
      body: { model: "cx/gpt-image-2", prompt: "kitten", ...body },
      credentials: { accessToken: "codex-token" },
      log: null,
    });
    assert.equal(result.success, false);
    assert.equal(result.status, 400);
    assert.equal(result.retryable, false);
  }
  assert.equal(calls.length, 0);
});

test("Codex Images errors keep plan guards, terminal outcomes, and privacy", async () => {
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    throw new Error("request must not reach upstream");
  };
  const tooMany = await handleImageGeneration({
    body: { model: "codex/gpt-image-2", prompt: "kitten", n: 11 },
    credentials: { accessToken: "codex-token" },
    log: null,
  });
  assert.equal(tooMany.status, 400);
  assert.match(String(tooMany.error), /n=1/);
  assert.equal(fetchCalls, 0);

  globalThis.fetch = async () => {
    fetchCalls += 1;
    throw new Error("free-plan request must not reach upstream");
  };
  const freePlan = await handleImageGeneration({
    body: { model: "codex/gpt-image-2.5-flare", prompt: "kitten" },
    credentials: { accessToken: "codex-token", providerSpecificData: { chatgptPlanType: "free" } },
    log: null,
  });
  assert.equal(freePlan.success, false);
  assert.equal(freePlan.status, 403);
  assert.equal(freePlan.retryable, false);
  assert.equal(fetchCalls, 0);

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        detail:
          "The 'gpt-image-2.5-flare' model is not supported when using Codex with a ChatGPT account.",
      }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  const accessError = await handleImageGeneration({
    body: { model: "codex/gpt-image-2.5-flare", prompt: "kitten" },
    credentials: { accessToken: "codex-token" },
    log: null,
  });
  assert.equal(accessError.success, false);
  assert.equal(accessError.status, 400);
  assert.equal(accessError.retryable, false);

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "boom", authorization: "Bearer upstream-secret" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    });
  const upstreamError = await handleImageGeneration({
    body: { model: "codex/gpt-image-2", prompt: "kitten" },
    credentials: { accessToken: "codex-token" },
    log: null,
  });
  assert.equal(upstreamError.success, false);
  assert.equal(upstreamError.status, 403);
  assert.equal(upstreamError.retryable, false);
  assert.doesNotMatch(JSON.stringify(upstreamError.error), /upstream-secret/);

  globalThis.fetch = async () => new Response(JSON.stringify({ data: [] }), { status: 200 });
  const empty = await handleImageGeneration({
    body: { model: "codex/gpt-image-2", prompt: "kitten" },
    credentials: { accessToken: "codex-token" },
    log: null,
  });
  assert.equal(empty.success, false);
  assert.equal(empty.status, 502);
  assert.equal(empty.retryable, false);
  assert.match(String(empty.error), /no usable image data/);

  globalThis.fetch = async () =>
    ({
      ok: true,
      status: 200,
      headers: new Headers(),
      json: async () => {
        throw new Error("socket reset while reading response");
      },
    }) as unknown as Response;
  const unreadable = (await handleImageGeneration({
    body: { model: "codex/gpt-image-2", prompt: "kitten" },
    credentials: { accessToken: "codex-token" },
    log: null,
  })) as { success: false; status: number; error: unknown };
  assert.equal(unreadable.status, 502);
  assert.match(String(unreadable.error), /request or response failed/i);
});

test("v1 image generation route serves codex/gpt-image-2.5-flare from the Images route", async () => {
  await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "codex-images",
    accessToken: "codex-oauth-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  const calls: Captured[] = [];
  captureFetch(calls);

  const response = await imageRoute.POST(
    new Request("http://localhost/api/v1/images/generations", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ model: "codex/gpt-image-2.5-flare", prompt: "a ceramic teacup" }),
    })
  );
  const body = (await response.json()) as { data: Array<{ b64_json?: string; url?: string }> };

  assert.equal(response.status, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, `${IMAGES_BASE}/generations`);
  assert.equal(calls[0].body.model, "gpt-image-2.5-flare");
  assert.equal(calls[0].body.tools, undefined);
  assert.equal(calls[0].headers.Authorization, "Bearer codex-oauth-token");
  assert.equal(body.data[0].b64_json, "ZmxhcmU=");
  assert.equal(body.data[0].url, undefined);
});

test("v1 image edit route sends Codex GPT Image references to the Images edits route", async () => {
  await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "codex-images-edit",
    accessToken: "codex-oauth-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  const calls: Captured[] = [];
  captureFetch(calls, () => imagesResponse("ZWRpdGVk"));

  const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3]);
  const jpeg = new Uint8Array([0xff, 0xd8, 0xff, 0xdb, 1, 2, 3]);
  const formData = new FormData();
  formData.set("prompt", "make the cup blue");
  formData.set("model", "codex/gpt-image-2.5-flare");
  formData.append("image[]", new File([jpeg], "style.jpg", { type: "image/jpeg" }));
  formData.append("image", new File([png], "cup.png", { type: "image/png" }));

  const response = await imageEditRoute.POST(
    new Request("http://localhost/api/v1/images/edits", { method: "POST", body: formData })
  );
  const body = (await response.json()) as { data: Array<{ b64_json?: string }> };

  assert.equal(response.status, 200);
  assert.equal(calls.length, 1);
  const [call] = calls;
  assert.equal(call.url, `${IMAGES_BASE}/edits`);
  assert.equal(call.body.model, "gpt-image-2.5-flare");
  assert.equal(call.body.prompt, "make the cup blue");
  assert.equal(call.body.n, 1);
  assert.equal(call.body.tools, undefined);
  assert.deepEqual(call.body.images, [
    { image_url: `data:image/jpeg;base64,${Buffer.from(jpeg).toString("base64")}` },
    { image_url: `data:image/png;base64,${Buffer.from(png).toString("base64")}` },
  ]);
  assert.equal(call.headers.Accept, "application/json");
  assert.equal(body.data[0].b64_json, "ZWRpdGVk");
});

test("v1 image edit route sends Codex GPT Image 2.5 Sunburst references to the Images edits route", async () => {
  await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "codex-sunburst-edit",
    accessToken: "codex-oauth-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  const calls: Captured[] = [];
  captureFetch(calls, () => imagesResponse("ZWRpdGVk"));

  const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3]);
  const formData = new FormData();
  formData.set("prompt", "make the cup blue");
  formData.set("model", "codex/gpt-image-2.5-sunburst");
  formData.append("image", new File([png], "cup.png", { type: "image/png" }));

  const response = await imageEditRoute.POST(
    new Request("http://localhost/api/v1/images/edits", { method: "POST", body: formData })
  );
  const body = (await response.json()) as { data: Array<{ b64_json?: string }> };

  assert.equal(response.status, 200);
  assert.equal(calls.length, 1);
  const [call] = calls;
  assert.equal(call.url, `${IMAGES_BASE}/edits`);
  assert.equal(call.body.model, "gpt-image-2.5-sunburst");
  assert.equal(call.body.prompt, "make the cup blue");
  assert.equal(call.body.n, 1);
  assert.equal(call.body.tools, undefined);
  assert.deepEqual(call.body.images, [
    { image_url: `data:image/png;base64,${Buffer.from(png).toString("base64")}` },
  ]);
  assert.equal(call.headers.Authorization, "Bearer codex-oauth-token");
  assert.equal(call.headers.originator, "codex_cli_rs");
  assert.equal(call.headers.Accept, "application/json");
  assert.equal(body.data[0].b64_json, "ZWRpdGVk");
});

test("v1 image generation route serves codex/gpt-image-2.5-sunburst from the Images route", async () => {
  await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "codex-sunburst-generation",
    accessToken: "codex-oauth-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  const calls: Captured[] = [];
  captureFetch(calls);

  const response = await imageRoute.POST(
    new Request("http://localhost/api/v1/images/generations", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ model: "codex/gpt-image-2.5-sunburst", prompt: "a ceramic teacup" }),
    })
  );
  const body = (await response.json()) as { data: Array<{ b64_json?: string; url?: string }> };

  assert.equal(response.status, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, `${IMAGES_BASE}/generations`);
  assert.equal(calls[0].body.model, "gpt-image-2.5-sunburst");
  assert.equal(calls[0].body.tools, undefined);
  assert.equal(calls[0].headers.Authorization, "Bearer codex-oauth-token");
  assert.equal(body.data[0].b64_json, "ZmxhcmU=");
  assert.equal(body.data[0].url, undefined);
});

test("v1 image edit route rejects unregistered Codex GPT Image ids without upstream calls", async () => {
  await providersDb.createProviderConnection({
    provider: "codex",
    authType: "apikey",
    name: "codex-unknown-image-edit",
    apiKey: "codex-oauth-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  const calls: Captured[] = [];
  captureFetch(calls);

  const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3]);
  const formData = new FormData();
  formData.set("prompt", "make the cup blue");
  formData.set("model", "codex/gpt-image-9-notreal");
  formData.append("image", new File([png], "cup.png", { type: "image/png" }));

  const response = await imageEditRoute.POST(
    new Request("http://localhost/api/v1/images/edits", { method: "POST", body: formData })
  );
  const body = (await response.json()) as { error: { message: string } };

  assert.equal(response.status, 400);
  assert.match(body.error.message, /Unsupported Codex image edit model/);
  assert.equal(calls.length, 0);
});

test("GPT-5.6 Codex image ids stay on the hosted Responses tool", async () => {
  const calls: Captured[] = [];
  captureFetch(calls, () => {
    const event = {
      type: "response.output_item.done",
      item: { type: "image_generation_call", id: "ig_1", status: "completed", result: "aG9zdGVk" },
    };
    return new Response(`data: ${JSON.stringify(event)}\n\ndata: [DONE]\n\n`, { status: 200 });
  });

  const result = await handleImageGeneration({
    body: { model: "codex/gpt-5.6-sol-image", prompt: "kitten" },
    credentials: { accessToken: "codex-token" },
    log: null,
  });

  assert.equal(result.success, true);
  assert.equal(calls[0].url, "https://chatgpt.com/backend-api/codex/responses");
  assert.equal(calls[0].body.model, "gpt-5.6-sol");
  assert.deepEqual(calls[0].body.tools, [{ type: "image_generation", output_format: "png" }]);
  assert.ok(
    getAllImageModels().some((model: { id: string }) => model.id === "codex/gpt-image-2.5-flare")
  );
});
