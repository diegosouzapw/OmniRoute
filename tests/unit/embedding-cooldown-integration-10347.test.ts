import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #10347 integration: exercise createEmbeddingResponse end-to-end with a
// mocked upstream that returns 402, then verify the connection gets cooled
// down. This proves the production code path actually calls
// markAccountUnavailable — the direct-call tests in
// embedding-account-cooldown-10347.test.ts would pass even if the
// production block were removed.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-embed-int-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "embed-int-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(
  provider: string,
  overrides: Record<string, unknown> = {}
): Promise<string> {
  const conn = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    apiKey: `${provider}-key`,
    isActive: true,
    testStatus: "active",
    ...overrides,
  });
  return (conn as Record<string, unknown>).id as string;
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("createEmbeddingResponse marks connection on upstream 402", async () => {
  resetStorage();
  const connId = await seedConnection("mistral");

  // Mock upstream to return 402 (subscription expired).
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({ error: "Check your subscription on https://admin.mistral.ai/subscription" }),
      { status: 402, headers: { "Content-Type": "application/json" } }
    )) as typeof globalThis.fetch;

  try {
    // Import the service AFTER seeding the DB so its module-level caches
    // see the seeded connection.
    const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");

    // Call the production path — this must exercise the markAccountUnavailable
    // block we added in #10347.
    const res = await createEmbeddingResponse(
      { model: "mistral-embed", input: "hello" },
      { connectionId: connId }
    );

    assert.equal(res.status, 402, "must return upstream status");

    // Give the fire-and-forget markAccountUnavailable call time to settle.
    await new Promise((r) => setImmediate(r));
    await new Promise((r) => setImmediate(r));

    // Verify the connection was actually marked — this is the assertion
    // that would FAIL if the production block were removed.
    const conn = await providersDb.getProviderConnectionById(connId);
    assert.equal(
      conn.testStatus,
      "credits_exhausted",
      "402 must mark connection credits_exhausted via production code path"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("cooled account is skipped on next request — second connection selected", async () => {
  resetStorage();
  const conn1 = await seedConnection("mistral", { apiKey: "mistral-key-1" });
  const conn2 = await seedConnection("mistral", { apiKey: "mistral-key-2" });

  const originalFetch = globalThis.fetch;
  let fetchCallCount = 0;

  try {
    const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");

    // First request: upstream returns 402 → conn1 gets cooled.
    globalThis.fetch = (async () => {
      fetchCallCount++;
      return new Response(JSON.stringify({ error: "subscription expired" }), {
        status: 402,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof globalThis.fetch;

    const res1 = await createEmbeddingResponse(
      { model: "mistral-embed", input: "hello" },
      { connectionId: conn1 }
    );
    assert.equal(res1.status, 402);

    // Wait for fire-and-forget cooldown write.
    await new Promise((r) => setImmediate(r));
    await new Promise((r) => setImmediate(r));

    // Verify conn1 is cooled.
    const conn1After = await providersDb.getProviderConnectionById(conn1);
    assert.equal(conn1After.testStatus, "credits_exhausted", "conn1 must be cooled");

    // Second request: upstream returns 200.
    globalThis.fetch = (async () => {
      fetchCallCount++;
      return new Response(
        JSON.stringify({
          data: [{ embedding: [0.1, 0.2], index: 0 }],
          model: "mistral-embed",
          usage: { prompt_tokens: 1, total_tokens: 1 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }) as typeof globalThis.fetch;

    // Call without specifying connectionId — credential selection should
    // skip conn1 (credits_exhausted) and pick conn2.
    const res2 = await createEmbeddingResponse({ model: "mistral-embed", input: "world" }, {});
    assert.equal(res2.status, 200, "second request must succeed via conn2");

    // Verify conn2 is still healthy.
    const conn2After = await providersDb.getProviderConnectionById(conn2);
    assert.equal(conn2After.testStatus, "active", "conn2 must remain active");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("createEmbeddingResponse skips 400 (bad request) — no cooldown", async () => {
  resetStorage();
  const connId = await seedConnection("mistral");

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ error: "Invalid embedding input format" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })) as typeof globalThis.fetch;

  try {
    const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");

    const res = await createEmbeddingResponse(
      { model: "mistral-embed", input: "hello" },
      { connectionId: connId }
    );

    assert.equal(res.status, 400, "must return upstream status");

    await new Promise((r) => setImmediate(r));
    await new Promise((r) => setImmediate(r));

    const conn = await providersDb.getProviderConnectionById(connId);
    assert.equal(
      conn.testStatus,
      "active",
      "400 must NOT mark connection — account is fine, request was wrong"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
