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

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance().exec('ALTER TABLE provider_connections ADD COLUMN "group" TEXT');
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
