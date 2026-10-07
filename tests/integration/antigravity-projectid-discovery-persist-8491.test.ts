// #8491 — a runtime-discovered Antigravity projectId must be persisted onto the
// connection so it survives the next token refresh / process restart, instead of
// being silently rediscovered (or lost) on every subsequent request.
//
// PART A: a fresh connection with an empty projectId, a mocked loadCodeAssist that
// returns a project id — after transformRequest() resolves, the connection row must
// have the discovered id written back (both the projectId column and
// providerSpecificData.projectId).
//
// PART B: once persisted, a SECOND request that re-reads credentials from the DB
// (simulating a token refresh / new request cycle, exactly what
// getProviderCredentials does in src/sse/services/auth.ts) must find the persisted
// projectId and must NOT re-invoke loadCodeAssist — the discovery branch never
// triggers because credentials.projectId is now populated from the DB.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-8491-antigravity-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-8491-antigravity-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { AntigravityExecutor } = await import("../../open-sse/executors/antigravity.ts");
const { clearAntigravityProjectCache } =
  await import("../../open-sse/services/antigravityProjectBootstrap.ts");

test.after(() => {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

const BOOTSTRAP_URL = "https://cloudcode-pa.googleapis.com/v1internal:loadCodeAssist";
const DISCOVERED_PROJECT_ID = "discovered-project-8491";

async function seedConnection() {
  const connection = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "antigravity-8491",
    email: "antigravity-8491@example.test",
    accessToken: "fake-antigravity-8491-token",
    refreshToken: "fake-antigravity-8491-refresh",
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    providerSpecificData: { clientProfile: "ide" },
    isActive: true,
    testStatus: "active",
  });
  assert(connection && typeof connection.id === "string");
  return connection;
}

test("#8491 PART A: runtime-discovered projectId must be persisted to the connection", async () => {
  clearAntigravityProjectCache();
  const connection = await seedConnection();
  const executor = new AntigravityExecutor();

  const originalFetch = globalThis.fetch;
  let loadCodeAssistCalls = 0;
  globalThis.fetch = (async (input: string | URL | Request) => {
    const url = String(input instanceof Request ? input.url : input);
    if (url === BOOTSTRAP_URL) {
      loadCodeAssistCalls += 1;
      return new Response(JSON.stringify({ cloudaicompanionProject: DISCOVERED_PROJECT_ID }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error(`Unexpected fetch in PART A: ${url}`);
  }) as typeof fetch;

  try {
    const result = await executor.transformRequest(
      "antigravity/gemini-3.1-pro",
      { request: { contents: [] } },
      true,
      {
        accessToken: connection.accessToken as string,
        connectionId: connection.id,
        providerSpecificData: connection.providerSpecificData as Record<string, unknown>,
      }
    );

    if (result instanceof Response) {
      throw new Error(`Expected an envelope but got a ${result.status} Response`);
    }
    assert.equal(loadCodeAssistCalls, 1, "loadCodeAssist must be called to recover the project");
    assert.equal(
      result.project,
      DISCOVERED_PROJECT_ID,
      "the in-flight request uses the discovered id"
    );

    const persisted = await providersDb.getProviderConnectionById(connection.id);
    assert.equal(
      persisted?.projectId,
      DISCOVERED_PROJECT_ID,
      "discovered projectId must be persisted onto the connection"
    );
    assert.equal(
      (persisted?.providerSpecificData as Record<string, unknown> | undefined)?.projectId,
      DISCOVERED_PROJECT_ID,
      "discovered projectId must also be persisted onto providerSpecificData.projectId"
    );
    // The pre-existing providerSpecificData field must survive the persistence write.
    assert.equal(
      (persisted?.providerSpecificData as Record<string, unknown> | undefined)?.clientProfile,
      "ide"
    );
  } finally {
    globalThis.fetch = originalFetch;
    clearAntigravityProjectCache();
  }
});

test("#8491 PART B: a second request re-reading credentials from the DB must not need to re-discover", async () => {
  clearAntigravityProjectCache();
  const connection = await seedConnection();
  const executor = new AntigravityExecutor();

  const originalFetch = globalThis.fetch;
  let loadCodeAssistCalls = 0;
  globalThis.fetch = (async (input: string | URL | Request) => {
    const url = String(input instanceof Request ? input.url : input);
    if (url === BOOTSTRAP_URL) {
      loadCodeAssistCalls += 1;
      return new Response(JSON.stringify({ cloudaicompanionProject: DISCOVERED_PROJECT_ID }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error(`Unexpected fetch in PART B: ${url}`);
  }) as typeof fetch;

  try {
    // Request 1: empty projectId, discovers + persists.
    await executor.transformRequest(
      "antigravity/gemini-3.1-pro",
      { request: { contents: [] } },
      true,
      {
        accessToken: connection.accessToken as string,
        connectionId: connection.id,
        providerSpecificData: connection.providerSpecificData as Record<string, unknown>,
      }
    );
    assert.equal(loadCodeAssistCalls, 1, "first request must discover via loadCodeAssist");

    // Simulate a token refresh between requests (rotates the access token, exactly
    // what AntigravityExecutor.refreshCredentials()'s DB write does).
    await providersDb.updateProviderConnection(connection.id, {
      accessToken: "fake-antigravity-8491-token-ROTATED",
    });

    // Request 2: credentials re-read from the DB (what getProviderCredentials does
    // for every request) — the persisted projectId must already be populated.
    const refreshed = await providersDb.getProviderConnectionById(connection.id);
    assert(refreshed);
    const result2 = await executor.transformRequest(
      "antigravity/gemini-3.1-pro",
      { request: { contents: [] } },
      true,
      {
        accessToken: refreshed.accessToken as string,
        connectionId: refreshed.id,
        projectId: refreshed.projectId as string | undefined,
        providerSpecificData: refreshed.providerSpecificData as Record<string, unknown>,
      }
    );

    if (result2 instanceof Response) {
      throw new Error(`Expected an envelope but got a ${result2.status} Response`);
    }
    assert.equal(
      result2.project,
      DISCOVERED_PROJECT_ID,
      "the second request must reuse the persisted projectId"
    );
    assert.equal(
      loadCodeAssistCalls,
      1,
      "a second request with a rotated access token should not need to re-discover " +
        "(#8491 cache-key half) once the id was already persisted"
    );
  } finally {
    globalThis.fetch = originalFetch;
    clearAntigravityProjectCache();
  }
});
