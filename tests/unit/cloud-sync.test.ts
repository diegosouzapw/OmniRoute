import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cloud-sync-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_CLOUD_URL = process.env.CLOUD_URL;
const ORIGINAL_PUBLIC_CLOUD_URL = process.env.NEXT_PUBLIC_CLOUD_URL;
const ORIGINAL_TIMEOUT = process.env.CLOUD_SYNC_TIMEOUT_MS;
const ORIGINAL_FETCH = globalThis.fetch;
const cloudSyncModuleUrl = pathToFileURL(path.join(process.cwd(), "src/lib/cloudSync.ts")).href;

process.env.DATA_DIR = TEST_DATA_DIR;
// FASE-01: API_KEY_SECRET is required for CRC operations (no hardcoded fallback)
if (!process.env.API_KEY_SECRET) {
  process.env.API_KEY_SECRET = "test-cloud-sync-secret-" + Date.now();
}

const coreDb = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");

function createAbortError(message = "aborted") {
  const error = new Error(message);
  error.name = "AbortError";
  return error;
}

async function loadCloudSync(label) {
  return import(`${cloudSyncModuleUrl}?case=${label}-${Date.now()}-${Math.random()}`);
}

async function resetStorage() {
  apiKeysDb.resetApiKeyState();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  globalThis.fetch = ORIGINAL_FETCH;
  delete process.env.CLOUD_URL;
  delete process.env.NEXT_PUBLIC_CLOUD_URL;
  delete process.env.CLOUD_SYNC_TIMEOUT_MS;
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  apiKeysDb.resetApiKeyState();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  globalThis.fetch = ORIGINAL_FETCH;
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  if (ORIGINAL_CLOUD_URL === undefined) {
    delete process.env.CLOUD_URL;
  } else {
    process.env.CLOUD_URL = ORIGINAL_CLOUD_URL;
  }
  if (ORIGINAL_PUBLIC_CLOUD_URL === undefined) {
    delete process.env.NEXT_PUBLIC_CLOUD_URL;
  } else {
    process.env.NEXT_PUBLIC_CLOUD_URL = ORIGINAL_PUBLIC_CLOUD_URL;
  }
  if (ORIGINAL_TIMEOUT === undefined) {
    delete process.env.CLOUD_SYNC_TIMEOUT_MS;
  } else {
    process.env.CLOUD_SYNC_TIMEOUT_MS = ORIGINAL_TIMEOUT;
  }
});

test("cloudSync returns a configuration error when the cloud URL is missing", async () => {
  const cloudSync = await loadCloudSync("no-url");

  const result = await cloudSync.syncToCloud("machine-1");

  assert.deepEqual(result, { error: "NEXT_PUBLIC_CLOUD_URL is not configured" });
});

test("fetchWithTimeout aborts when the timeout elapses", async () => {
  process.env.NEXT_PUBLIC_CLOUD_URL = "https://cloud.example";
  globalThis.fetch = (_url, options) =>
    new Promise((_, reject) => {
      options.signal.addEventListener("abort", () => reject(createAbortError()));
    });

  const cloudSync = await loadCloudSync("timeout-helper");

  await assert.rejects(cloudSync.fetchWithTimeout("https://cloud.example/ping", {}, 5), {
    name: "AbortError",
  });
});

test("cloudSync maps timeout and transport failures to stable error messages", async () => {
  process.env.NEXT_PUBLIC_CLOUD_URL = "https://cloud.example";
  process.env.CLOUD_SYNC_TIMEOUT_MS = "5";

  globalThis.fetch = (_url, options) =>
    new Promise((_, reject) => {
      options.signal.addEventListener("abort", () => reject(createAbortError("timeout")));
    });

  let cloudSync = await loadCloudSync("sync-timeout");
  assert.deepEqual(await cloudSync.syncToCloud("machine-1"), { error: "Cloud sync timeout" });

  globalThis.fetch = async () => {
    throw new Error("socket closed");
  };
  cloudSync = await loadCloudSync("sync-failure");
  assert.deepEqual(await cloudSync.syncToCloud("machine-1"), {
    error: "Cloud sync request failed",
  });
});

test("cloudSync returns a generic error when the API responds with a non-OK status", async () => {
  process.env.CLOUD_URL = "https://cloud.example";

  const originalConsoleLog = console.log;
  const logged = [];
  console.log = (...args) => logged.push(args.join(" "));
  globalThis.fetch = async () => ({
    ok: false,
    status: 503,
    text: async () => "upstream unavailable",
  });

  try {
    const cloudSync = await loadCloudSync("sync-non-ok");
    const result = await cloudSync.syncToCloud("machine-1");

    assert.deepEqual(result, { error: "Cloud sync failed" });
    assert.equal(
      logged.some((entry) => entry.includes("Cloud sync failed (503)")),
      true
    );
  } finally {
    console.log = originalConsoleLog;
  }
});

test("cloudSync syncs data upstream and refreshes only locally stale provider tokens", async () => {
  process.env.NEXT_PUBLIC_CLOUD_URL = "https://cloud.example";

  const stale = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "oauth",
    email: "stale@example.com",
    accessToken: "old-token",
    refreshToken: "old-refresh",
    providerSpecificData: { region: "us" },
  });
  const fresh = await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "oauth",
    email: "fresh@example.com",
    accessToken: "keep-token",
    refreshToken: "keep-refresh",
    providerSpecificData: { plan: "pro" },
  });
  await apiKeysDb.createApiKey("machine key", "machine-1");

  const db = coreDb.getDbInstance();
  db.prepare("UPDATE provider_connections SET updated_at = ? WHERE id = ?").run(
    "2026-01-01T00:00:00.000Z",
    stale.id
  );
  db.prepare("UPDATE provider_connections SET updated_at = ? WHERE id = ?").run(
    "2026-03-01T00:00:00.000Z",
    fresh.id
  );

  let postedBody = null;
  globalThis.fetch = async (_url, options) => {
    postedBody = JSON.parse(options.body);
    return {
      ok: true,
      json: async () => ({
        changes: { providers: 1 },
        data: {
          providers: {
            [stale.id]: {
              updatedAt: "2026-04-01T00:00:00.000Z",
              accessToken: "new-token",
              refreshToken: "new-refresh",
              expiresAt: "2026-04-02T00:00:00.000Z",
              expiresIn: 3600,
              providerSpecificData: { region: "eu" },
              status: "active",
              lastError: null,
              lastErrorAt: null,
              errorCode: null,
              rateLimitedUntil: null,
            },
            [fresh.id]: {
              updatedAt: "2026-02-01T00:00:00.000Z",
              accessToken: "should-not-overwrite",
              refreshToken: "should-not-overwrite",
            },
          },
        },
      }),
    };
  };

  const cloudSync = await loadCloudSync("sync-success");
  const result = await cloudSync.syncToCloud("machine-1", "created-key-1");
  const staleAfter = await providersDb.getProviderConnectionById((stale as any).id);
  const freshAfter = await providersDb.getProviderConnectionById((fresh as any).id);

  assert.equal(Array.isArray(postedBody.providers), true);
  assert.equal(Array.isArray(postedBody.apiKeys), true);
  assert.match(postedBody.version, /^[a-f0-9]{64}$/);
  assert.equal(postedBody.providers.length, 2);
  assert.equal(postedBody.apiKeys.length, 1);
  assert.equal(result.success, true);
  assert.equal(result.message, "Synced successfully");
  assert.deepEqual(result.changes, { providers: 1 });
  assert.equal(result.createdKey, "created-key-1");
  assert.match(result.version, /^[a-f0-9]{64}$/);
  assert.equal(staleAfter.accessToken, "new-token");
  assert.equal(staleAfter.refreshToken, "new-refresh");
  assert.equal(staleAfter.expiresIn, 3600);
  assert.deepEqual(staleAfter.providerSpecificData, { region: "eu" });
  assert.equal(staleAfter.testStatus, "active");
  assert.equal(freshAfter.accessToken, "keep-token");
  assert.deepEqual(freshAfter.providerSpecificData, { plan: "pro" });
});
