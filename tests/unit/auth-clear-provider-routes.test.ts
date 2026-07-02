import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auth-routes-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const moderationRoute = await import("../../src/app/api/v1/moderations/route.ts");
const embeddingsRoute = await import("../../src/app/api/v1/embeddings/route.ts");

async function withEnv(name, value, fn) {
  const previous = process.env[name];
  if (value === undefined) {
    delete process.env[name];
  } else {
    process.env[name] = value;
  }

  try {
    return await fn();
  } finally {
    if (previous === undefined) {
      delete process.env[name];
    } else {
      process.env[name] = previous;
    }
  }
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedOpenAIConnection(email) {
  return await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    email,
    name: email,
    apiKey: "sk-test",
    testStatus: "active",
    lastError: null,
    lastErrorType: "token_refresh_failed",
    lastErrorSource: "oauth",
    errorCode: "refresh_failed",
    rateLimitedUntil: null,
    backoffLevel: 2,
  });
}

async function readConnection(id) {
  return await providersDb.getProviderConnectionById(id);
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("moderations route clears stale provider error metadata on success", async () => {
  await resetStorage();
  const created = await seedOpenAIConnection("moderation@example.com");

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    Response.json({
      id: "modr-1",
      model: "omni-moderation-latest",
      results: [{ flagged: false }],
    });

  try {
    const request = new Request("http://localhost/v1/moderations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: "hello" }),
    });

    const response = await moderationRoute.POST(request);
    assert.equal(response.status, 200);

    const updated = await readConnection(created.id);
    assert.equal(updated.testStatus, "active");
    assert.equal(updated.errorCode, undefined);
    assert.equal(updated.lastErrorType, undefined);
    assert.equal(updated.lastErrorSource, undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("moderations route covers CORS, validation, and missing credential branches", async () => {
  await resetStorage();

  const optionsResponse = await moderationRoute.OPTIONS();
  assert.equal(optionsResponse.status, 200);
  assert.equal(optionsResponse.headers.get("Access-Control-Allow-Methods"), "POST, OPTIONS");

  const invalidJsonResponse = await moderationRoute.POST(
    new Request("http://localhost/v1/moderations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{",
    })
  );
  assert.equal(invalidJsonResponse.status, 400);
  assert.match(await invalidJsonResponse.text(), /Invalid JSON body/i);

  const invalidBodyResponse = await moderationRoute.POST(
    new Request("http://localhost/v1/moderations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
  );
  assert.equal(invalidBodyResponse.status, 400);
  assert.match(await invalidBodyResponse.text(), /Invalid request/i);

  const noCredentialsResponse = await moderationRoute.POST(
    new Request("http://localhost/v1/moderations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: "hello",
        model: "anthropic/omni-moderation-latest",
      }),
    })
  );
  assert.equal(noCredentialsResponse.status, 400);
  assert.match(await noCredentialsResponse.text(), /No credentials for provider: openai/i);
});

test("embeddings route clears stale provider error metadata on success", async () => {
  await resetStorage();
  const created = await seedOpenAIConnection("embeddings@example.com");

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    Response.json({
      data: [{ object: "embedding", index: 0, embedding: [0.1, 0.2] }],
      usage: { prompt_tokens: 3, total_tokens: 3 },
    });

  try {
    const request = new Request("http://localhost/v1/embeddings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "openai/text-embedding-3-small", input: "hello" }),
    });

    const response = await embeddingsRoute.POST(request);
    assert.equal(response.status, 200);

    const updated = await readConnection(created.id);
    assert.equal(updated.testStatus, "active");
    assert.equal(updated.errorCode, undefined);
    assert.equal(updated.lastErrorType, undefined);
    assert.equal(updated.lastErrorSource, undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("embeddings route uses provider node id for compatible provider credentials", async () => {
  await resetStorage();

  const providerNode = await providersDb.createProviderNode({
    id: "openai-compatible-responses-google-embeddings",
    type: "openai-compatible",
    name: "Gemini Embeddings",
    prefix: "google",
    apiType: "responses",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai",
  });

  const created = await providersDb.createProviderConnection({
    provider: providerNode.id,
    authType: "apikey",
    email: null,
    name: "google-compatible-key",
    apiKey: "google-compatible-test-key",
    testStatus: "active",
    lastError: null,
    lastErrorType: "token_refresh_failed",
    lastErrorSource: "oauth",
    errorCode: "refresh_failed",
    rateLimitedUntil: null,
    backoffLevel: 2,
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    assert.equal(url, "https://generativelanguage.googleapis.com/v1beta/openai/embeddings");
    assert.equal(init?.headers?.Authorization, "Bearer google-compatible-test-key");
    return Response.json({
      data: [{ object: "embedding", index: 0, embedding: [0.1, 0.2] }],
      usage: { prompt_tokens: 3, total_tokens: 3 },
    });
  };

  try {
    const request = new Request("http://localhost/v1/embeddings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "google/gemini-embedding-001", input: "hello" }),
    });

    const response = await embeddingsRoute.POST(request);
    assert.equal(response.status, 200);

    const updated = await readConnection(created.id);
    assert.equal(updated.testStatus, "active");
    assert.equal(updated.errorCode, undefined);
    assert.equal(updated.lastErrorType, undefined);
    assert.equal(updated.lastErrorSource, undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
