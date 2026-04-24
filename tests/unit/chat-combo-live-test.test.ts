import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chat-combo-live-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");
const { generateSignature, invalidateBySignature, setCachedResponse } =
  await import("../../src/lib/semanticCache.ts");
const { getCircuitBreaker, resetAllCircuitBreakers, STATE } =
  await import("../../src/shared/utils/circuitBreaker.ts");

const originalFetch = globalThis.fetch;

async function flushBackgroundWork() {
  await new Promise((resolve) => setTimeout(resolve, 50));
  await new Promise((resolve) => setImmediate(resolve));
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  resetAllCircuitBreakers();
}

async function seedSuppressedConnection() {
  return providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-live-test",
    apiKey: "sk-live-test",
    isActive: true,
    testStatus: "credits_exhausted",
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
  });
}

async function seedHealthyConnection() {
  return providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-cache-test",
    apiKey: "sk-cache-test",
    isActive: true,
    testStatus: "active",
  });
}

function makeRequest(extraHeaders = {}) {
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: "Reply with OK only." }],
      max_tokens: 16,
      stream: false,
    }),
  });
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.afterEach(async () => {
  await flushBackgroundWork();
  globalThis.fetch = originalFetch;
  resetAllCircuitBreakers();
});

test.after(async () => {
  await flushBackgroundWork();
  globalThis.fetch = originalFetch;
  resetAllCircuitBreakers();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("combo live test bypasses connection cooldown and breaker state to perform a real upstream request", async () => {
  const created = await seedSuppressedConnection();

  const fetchCalls = [];
  globalThis.fetch = async (url, init = {}) => {
    fetchCalls.push({ url: String(url), init });
    return Response.json({
      id: "chatcmpl-live-test",
      choices: [
        {
          message: {
            role: "assistant",
            content: "OK",
          },
        },
      ],
    });
  };

  const blockedByCooldown = await chatRoute.POST(makeRequest());
  assert.equal(blockedByCooldown.status, 503);
  assert.equal(fetchCalls.length, 0);

  const breaker = getCircuitBreaker("openai");
  breaker.state = STATE.OPEN;
  breaker.lastFailureTime = Date.now();
  breaker.resetTimeout = 60_000;

  const blockedByBreaker = await chatRoute.POST(makeRequest());
  assert.equal(blockedByBreaker.status, 503);
  assert.equal(fetchCalls.length, 0);

  const liveResponse = await chatRoute.POST(
    makeRequest({ "X-Internal-Test": "combo-health-check" })
  );
  const liveBody = (await liveResponse.json()) as any;

  assert.equal(liveResponse.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.match(fetchCalls[0].url, /\/chat\/completions$/);
  assert.equal(fetchCalls[0].init.headers.Authorization, "Bearer sk-live-test");
  assert.equal(liveBody.choices[0].message.content, "OK");

  const updated = await providersDb.getProviderConnectionById((created as any).id);
  assert.equal(updated.testStatus, "active");
});

test("combo live test bypasses semantic cache and forces a fresh upstream request", async () => {
  await seedHealthyConnection();

  const signature = generateSignature(
    "gpt-4o-mini",
    [{ role: "user", content: "Reply with OK only." }],
    0,
    1
  );

  setCachedResponse(signature, "gpt-4o-mini", {
    id: "chatcmpl-cached",
    choices: [
      {
        message: {
          role: "assistant",
          content: "CACHED",
        },
      },
    ],
  });

  const fetchCalls = [];
  globalThis.fetch = async (url, init = {}) => {
    fetchCalls.push({ url: String(url), init });
    return Response.json({
      id: "chatcmpl-live",
      choices: [
        {
          message: {
            role: "assistant",
            content: "LIVE",
          },
        },
      ],
    });
  };

  try {
    const cachedResponse = await chatRoute.POST(makeRequest());
    const cachedBody = (await cachedResponse.json()) as any;

    assert.equal(cachedResponse.status, 200);
    assert.equal(fetchCalls.length, 0);
    assert.equal(cachedBody.choices[0].message.content, "CACHED");

    const liveResponse = await chatRoute.POST(
      makeRequest({
        "X-Internal-Test": "combo-health-check",
        "X-OmniRoute-No-Cache": "true",
        "X-Request-Id": "combo-test-cache-bypass",
      })
    );
    const liveBody = (await liveResponse.json()) as any;

    assert.equal(liveResponse.status, 200);
    assert.equal(fetchCalls.length, 1);
    assert.match(fetchCalls[0].url, /\/chat\/completions$/);
    assert.equal(liveBody.choices[0].message.content, "LIVE");
  } finally {
    invalidateBySignature(signature);
  }
});

test("combo live test does not use cooldown-aware request retry on upstream failures", async () => {
  await seedHealthyConnection();
  await settingsDb.updateSettings({
    requestRetry: 3,
    maxRetryIntervalSec: 5,
  });

  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return Response.json(
      {
        error: {
          message: "upstream unavailable",
        },
      },
      { status: 503 }
    );
  };

  const liveResponse = await chatRoute.POST(
    makeRequest({ "X-Internal-Test": "combo-health-check" })
  );
  const liveBody = (await liveResponse.json()) as any;

  assert.equal(liveResponse.status, 503);
  assert.equal(fetchCalls, 1);
  assert.match(liveBody.error.message, /upstream unavailable/i);
});
