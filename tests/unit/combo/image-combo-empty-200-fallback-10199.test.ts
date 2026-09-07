/**
 * Image combo fallback on empty 2xx upstream responses (#10199)
 *
 * Repro: an OpenAI-compatible image provider (e.g. openrouter/*) can return
 * HTTP 200 with an empty or malformed image payload (no usable b64_json/url in
 * data[]). fetchImageEndpoint() used to normalize that to success:true, so
 * executeImageCombo() stopped on the first leg and the client received an
 * image-less 200. Hermes then rejected the response.
 *
 * Fix: require at least one usable image item before declaring success; an
 * empty 2xx becomes a retryable 502 so the combo advances to the next leg.
 *
 * Strategy: real isolated SQLite DATA_DIR + real combo resolution + real
 * credentials path (seeded apikey connection) + stubbed globalThis.fetch.
 * No paid requests, no module mocking (tsx loader cannot mock ESM exports).
 *
 * Run: node --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts
 *        --import ./tests/_setup/isolateDataDir.ts --test
 *        tests/unit/combo/image-combo-empty-200-fallback-10199.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-image-combo-empty-200-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-for-image-combo-empty-200-tests";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "image-combo-empty-200-test-secret";

const core = await import("@/lib/db/core.ts");
const providersDb = await import("@/lib/db/providers.ts");
const { createCombo } = await import("@/lib/db/combos");
const { executeImageCombo } = await import("@omniroute/open-sse/services/imageCombo");

const PNG_B64 = Buffer.from([0x89, 0x50, 0x4e, 0x47]).toString("base64");

const originalFetch = globalThis.fetch;

type LogEntry = { level: string; tag: unknown; msg: unknown };

function createLog() {
  const entries: LogEntry[] = [];
  const record =
    (level: string) =>
    (tag: unknown, msg: unknown): number =>
      entries.push({ level, tag, msg });
  return {
    info: record("info"),
    warn: record("warn"),
    error: record("error"),
    debug: record("debug"),
    entries,
  };
}

function createMockAuth() {
  return {
    request: new Request("http://localhost:20128/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "empty-200-combo", prompt: "a cat" }),
    }),
    policy: { apiKeyInfo: { id: "test-key", name: "test-key" } },
  };
}

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

/** Seed an active openrouter apikey connection so credential resolution succeeds. */
async function seedOpenRouterConnection() {
  return providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "openrouter-empty-200-test",
    apiKey: "sk-or-test-not-a-real-key",
    isActive: true,
    testStatus: "active",
    rateLimitedUntil: null,
  });
}

/**
 * Seed the pmoc-image-text style two-leg combo: first leg returns an empty
 * 200 (stubbed upstream), second leg returns a valid image.
 */
async function seedTwoLegCombo(name: string) {
  return createCombo({
    name,
    strategy: "priority",
    models: ["openrouter/openai/gpt-5-image-mini", "openrouter/openai/gpt-5.4-image-2"],
  });
}

/** Stub fetch: first call → empty 200, subsequent calls → valid image 200. */
function stubFetchEmptyThenValid(hitLog: Array<{ url: string; model?: string }>) {
  let callIndex = 0;
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    const index = callIndex++;
    const bodyText = typeof init?.body === "string" ? init.body : String(init?.body ?? "");
    let model: string | undefined;
    try {
      model = (JSON.parse(bodyText) as { model?: string }).model;
    } catch {
      model = undefined;
    }
    hitLog.push({ url: String(url), model });
    if (index === 0) {
      return new Response(JSON.stringify({ created: Math.floor(Date.now() / 1000), data: [] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response(
      JSON.stringify({ created: Math.floor(Date.now() / 1000), data: [{ b64_json: PNG_B64 }] }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;
}

/** Stub fetch: every call → empty 200 (all legs unusable). */
function stubFetchAlwaysEmpty() {
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ created: Math.floor(Date.now() / 1000), data: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;
}

/** Stub fetch: every call → single-leg valid image (direct-model baseline). */
function stubFetchAlwaysValid(hitLog?: Array<{ url: string; model?: string }>) {
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    if (hitLog) {
      let model: string | undefined;
      try {
        model = (
          JSON.parse(typeof init?.body === "string" ? init.body : String(init?.body ?? "")) as {
            model?: string;
          }
        ).model;
      } catch {
        model = undefined;
      }
      hitLog.push({ url: String(url), model });
    }
    return new Response(
      JSON.stringify({ created: Math.floor(Date.now() / 1000), data: [{ b64_json: PNG_B64 }] }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;
}

test("empty 200 from first leg falls back to second leg and second leg image is served", async () => {
  await resetStorage();
  await seedOpenRouterConnection();
  await seedTwoLegCombo("empty-200-combo");

  const hits: Array<{ url: string; model?: string }> = [];
  stubFetchEmptyThenValid(hits);

  const log = createLog();
  const response = await executeImageCombo(
    "empty-200-combo",
    { model: "empty-200-combo", prompt: "a cat", n: 1 },
    createMockAuth(),
    Date.now(),
    log
  );

  assert.equal(response.status, 200, "combo must ultimately succeed via leg 2");
  const body = (await response.json()) as Array<{ b64_json?: string }>;
  assert.ok(Array.isArray(body), "response body must be the image items array");
  assert.equal(body.length, 1, "exactly one image (from the second leg)");
  assert.equal(body[0]?.b64_json, PNG_B64, "served image must come from leg 2");

  // Both legs were tried: first the empty-200 stub, then the valid stub.
  assert.equal(hits.length, 2, "combo must advance to the second leg");
  assert.equal(hits[0].model, "openai/gpt-5-image-mini", "leg 1 model hit first");
  assert.equal(hits[1].model, "openai/gpt-5.4-image-2", "leg 2 model hit second");

  const warnJoined = log.entries
    .filter((e) => e.level === "warn")
    .map((e) => String(e.msg))
    .join(" ");
  assert.ok(
    warnJoined.includes("without a usable image payload"),
    "leg-1 empty 200 must be logged as unusable payload"
  );
});

test("fallback metadata reflects the additional attempt via X-OmniRoute-Fallback-Attempts", async () => {
  await resetStorage();
  await seedOpenRouterConnection();
  await seedTwoLegCombo("empty-200-fallback-meta-combo");

  const hits: Array<{ url: string; model?: string }> = [];
  stubFetchEmptyThenValid(hits);

  const response = await executeImageCombo(
    "empty-200-fallback-meta-combo",
    { model: "empty-200-fallback-meta-combo", prompt: "a cat", n: 1 },
    createMockAuth(),
    Date.now(),
    createLog()
  );

  assert.equal(response.status, 200);
  const attempts = response.headers.get("X-OmniRoute-Fallback-Attempts");
  assert.ok(attempts !== null, "fallback attempts header must be present");
  assert.equal(attempts, "1", "one leg failed over, so fallback attempts must be 1");
});

test("valid first-leg response does not invoke later legs", async () => {
  await resetStorage();
  await seedOpenRouterConnection();
  await seedTwoLegCombo("empty-200-valid-first-combo");

  const hits: Array<{ url: string; model?: string }> = [];
  stubFetchAlwaysValid(hits);

  const response = await executeImageCombo(
    "empty-200-valid-first-combo",
    { model: "empty-200-valid-first-combo", prompt: "a cat", n: 1 },
    createMockAuth(),
    Date.now(),
    createLog()
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as Array<{ b64_json?: string }>;
  assert.equal(body[0]?.b64_json, PNG_B64);
  assert.equal(hits.length, 1, "first leg success must stop the combo (no later legs hit)");
  assert.equal(hits[0].model, "openai/gpt-5-image-mini");
});

test("all legs returning empty 200 yields a retryable 502 with sanitized error", async () => {
  await resetStorage();
  await seedOpenRouterConnection();
  await createCombo({
    name: "empty-200-all-legs-combo",
    strategy: "priority",
    models: ["openrouter/openai/gpt-5-image-mini", "openrouter/openai/gpt-5.4-image-2"],
  });

  stubFetchAlwaysEmpty();

  const response = await executeImageCombo(
    "empty-200-all-legs-combo",
    { model: "empty-200-all-legs-combo", prompt: "a cat", n: 1 },
    createMockAuth(),
    Date.now(),
    createLog()
  );

  assert.equal(response.status, 502, "exhausted combo must surface the retryable 502");
  const bodyStr = JSON.stringify(await response.json());
  assert.ok(
    bodyStr.includes("image payload") || bodyStr.includes("Image provider"),
    "error must describe the unusable payload"
  );
  assert.ok(!bodyStr.includes("sk-or-test"), "error must not leak credentials");
  assert.ok(!bodyStr.includes("at "), "error must not leak stack traces");
});

test("direct image model request with empty 200 is a retryable 502 (behavior preserved for valid payloads)", async () => {
  await resetStorage();
  await seedOpenRouterConnection();

  const { handleImageGeneration } = await import("@omniroute/open-sse/handlers/imageGeneration");

  // Empty 200 → retryable 502 (previously a bogus success)
  stubFetchAlwaysEmpty();
  const emptyResult = (await handleImageGeneration({
    body: { model: "openrouter/openai/gpt-5-image-mini", prompt: "a cat", n: 1 },
    credentials: { apiKey: "sk-or-test-not-a-real-key" },
    log: createLog(),
  })) as { success: boolean; status?: number; error?: string };
  assert.equal(emptyResult.success, false);
  assert.equal(emptyResult.status, 502);
  assert.ok(
    typeof emptyResult.error === "string" && !emptyResult.error.includes("sk-or-test"),
    "sanitized error must not include credentials"
  );

  // Valid 200 → success preserved
  stubFetchAlwaysValid();
  const validResult = (await handleImageGeneration({
    body: { model: "openrouter/openai/gpt-5-image-mini", prompt: "a cat", n: 1 },
    credentials: { apiKey: "sk-or-test-not-a-real-key" },
    log: createLog(),
  })) as { success: boolean; data?: { data?: Array<{ b64_json?: string }> } };
  assert.equal(validResult.success, true, "valid payload must still succeed");
  assert.equal(validResult.data?.data?.[0]?.b64_json, PNG_B64);

  // url-style payload → success preserved
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ created: 1, data: [{ url: "https://example.test/img.png" }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;
  const urlResult = (await handleImageGeneration({
    body: { model: "openrouter/openai/gpt-5-image-mini", prompt: "a cat", n: 1 },
    credentials: { apiKey: "sk-or-test-not-a-real-key" },
    log: createLog(),
  })) as { success: boolean; data?: { data?: Array<{ url?: string }> } };
  assert.equal(urlResult.success, true, "url-bearing payload must still succeed");
  assert.equal(urlResult.data?.data?.[0]?.url, "https://example.test/img.png");

  // Malformed: 200 with non-array data → retryable 502
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ created: 1, data: "not-an-array" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;
  const malformed = (await handleImageGeneration({
    body: { model: "openrouter/openai/gpt-5-image-mini", prompt: "a cat", n: 1 },
    credentials: { apiKey: "sk-or-test-not-a-real-key" },
    log: createLog(),
  })) as { success: boolean; status?: number };
  assert.equal(malformed.success, false);
  assert.equal(malformed.status, 502);
});
