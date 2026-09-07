/**
 * Image combo success response must be the full OpenAI Images envelope (follow-up to #9239 / #12982)
 *
 * Repro: executeImageCombo()'s success path returned
 * JSON.stringify(successResult.data.data) — a bare items array
 * [{ b64_json }] — while the direct (non-combo) route path returns the full
 * handleImageGeneration envelope ({ created, data: [...] }). No
 * OpenAI-compatible client parses a bare array: OpenAI SDKs and the Hermes
 * omniroute image plugin read `data` from the JSON body and reject the combo
 * response with "returned no image data", and this dashboard's own media page
 * (MediaPageClient) reads `data?.data || []`, so combo-generated images never
 * rendered there either.
 *
 * Fix: return successResult.data (the full envelope) verbatim, mirroring
 * route.ts's direct path. Envelope fields (created, optional usage) are
 * preserved; meta headers are unchanged.
 *
 * Strategy: real isolated SQLite DATA_DIR + real combo resolution + real
 * credentials path (seeded apikey connection) + stubbed globalThis.fetch.
 * No paid requests, no module mocking (tsx loader cannot mock ESM exports).
 *
 * Run: node --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts
 *        --import ./tests/_setup/isolateDataDir.ts --test
 *        tests/unit/combo/image-combo-openai-envelope-10231.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-image-combo-envelope-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-for-image-combo-envelope-tests";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "image-combo-envelope-test-secret";

const core = await import("@/lib/db/core.ts");
const providersDb = await import("@/lib/db/providers.ts");
const { createCombo } = await import("@/lib/db/combos");
const { executeImageCombo } = await import("@omniroute/open-sse/services/imageCombo");

const PNG_B64 = Buffer.from([0x89, 0x50, 0x4e, 0x47]).toString("base64");
const originalFetch = globalThis.fetch;

type LogEntry = { level: string; tag: unknown; msg: unknown };

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedOpenRouterConnection() {
  return providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "openrouter-envelope-test",
    apiKey: "sk-or-test-envelope-000000000000000000",
    isActive: true,
    testStatus: "active",
    rateLimitedUntil: null,
  });
}

async function seedTwoLegCombo(name: string) {
  return createCombo({
    name,
    strategy: "priority",
    models: ["openrouter/openai/gpt-5-image-mini", "openrouter/openai/gpt-5.4-image-2"],
  });
}

function stubFetchAlwaysValid() {
  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({
        created: 1700000000,
        data: [{ b64_json: PNG_B64 }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    )) as typeof fetch;
}

function stubFetchEmptyThenValid() {
  let callIndex = 0;
  globalThis.fetch = (async () => {
    const index = callIndex++;
    if (index === 0) {
      // A genuine upstream failure (5xx) - the combo must move on to leg 2.
      // (Empty-200 fallthrough is covered by the fork's #12982 fallback fix.)
      return new Response(JSON.stringify({ error: { message: "upstream boom" } }), {
        status: 502,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ created: 1700000001, data: [{ b64_json: PNG_B64 }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
}

function createMockAuth() {
  return {
    request: new Request("http://localhost:20128/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "envelope-combo", prompt: "a cat" }),
    }),
    policy: { apiKeyInfo: { id: "test-key", name: "test-key" } },
  };
}

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

test("combo success body is the full OpenAI images envelope with created + data", async () => {
  await resetStorage();
  await seedOpenRouterConnection();
  await seedTwoLegCombo("envelope-combo");
  stubFetchAlwaysValid();

  const response = await executeImageCombo(
    "envelope-combo",
    { model: "envelope-combo", prompt: "a cat", n: 1 },
    createMockAuth(),
    Date.now(),
    createLog()
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    created?: number;
    data?: Array<{ b64_json?: string }>;
  };
  assert.ok(
    body && typeof body === "object" && !Array.isArray(body),
    "combo success body must be the OpenAI images envelope, not a bare array"
  );
  assert.equal(body.created, 1700000000, "envelope must preserve the upstream created timestamp");
  assert.ok(Array.isArray(body.data), "envelope must carry a data items array");
  assert.equal(body.data?.length, 1);
  assert.equal(body.data?.[0]?.b64_json, PNG_B64);
});

test("envelope shape survives fallback: leg-2 image served inside the envelope", async () => {
  await resetStorage();
  await seedOpenRouterConnection();
  await seedTwoLegCombo("envelope-fallback-combo");
  stubFetchEmptyThenValid();

  const response = await executeImageCombo(
    "envelope-fallback-combo",
    { model: "envelope-fallback-combo", prompt: "a cat", n: 1 },
    createMockAuth(),
    Date.now(),
    createLog()
  );

  assert.equal(response.status, 200, "combo must ultimately succeed via leg 2");
  const body = (await response.json()) as {
    created?: number;
    data?: Array<{ b64_json?: string }>;
  };
  assert.ok(body && !Array.isArray(body), "must be the envelope object");
  assert.equal(
    typeof body.created,
    "number",
    "envelope carries a numeric created timestamp on fallback success"
  );
  assert.equal(body.data?.[0]?.b64_json, PNG_B64);
});
