/**
 * Unit tests for API key endpoint restriction enforcement through enforceApiKeyPolicy.
 *
 * These tests require the full DB stack (same pattern as api-key-policy.test.ts).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ep-policy-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "task-ep-policy-secret";

const coreDb = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const costRules = await import("../../src/domain/costRules.ts");
const rateLimiter = await import("../../src/shared/utils/rateLimiter.ts");

rateLimiter.setRateLimiterTestMode(true);

async function resetStorage() {
  apiKeysDb.resetApiKeyState();
  costRules.resetCostData();
  coreDb.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function loadPolicy(label: string) {
  const modulePath = path.join(process.cwd(), "src/shared/utils/apiKeyPolicy.ts");
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}`);
}

async function createKeyWithEndpoints(allowedEndpoints: string[]) {
  const created = await apiKeysDb.createApiKey("EP Test Key", "machine-ep");
  if (allowedEndpoints.length > 0) {
    await apiKeysDb.updateApiKeyPermissions(created.id, { allowedEndpoints });
  }
  return created;
}

function makeRequest(url: string, apiKey?: string) {
  return new Request(url, {
    method: "POST",
    headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
  });
}

async function readErrorMessage(response: Response) {
  const body = (await response.json()) as any;
  return body.error.message as string;
}

test.beforeEach(async () => {
  delete process.env.DEFAULT_RATE_LIMIT_PER_DAY;
  await resetStorage();
});

test.after(async () => {
  apiKeysDb.resetApiKeyState();
  costRules.resetCostData();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ─── Policy tests ─────────────────────────────────────────────────────────

test("no restriction — all endpoints allowed", async () => {
  const policy = await loadPolicy("no-endpoint-restriction");
  const key = await createKeyWithEndpoints([]);

  const request = makeRequest("http://localhost/v1/chat/completions", key.key);
  const result = await policy.enforceApiKeyPolicy(request, "gpt-4");

  assert.equal(result.rejection, null);
});

test("search-only key allows /v1/search", async () => {
  const policy = await loadPolicy("search-only-allowed");
  const key = await createKeyWithEndpoints(["search"]);

  const request = makeRequest("http://localhost/v1/search", key.key);
  const result = await policy.enforceApiKeyPolicy(request, "search");

  assert.equal(result.rejection, null);
});

test("search-only key blocks /v1/chat/completions", async () => {
  const policy = await loadPolicy("search-blocks-chat");
  const key = await createKeyWithEndpoints(["search"]);

  const request = makeRequest("http://localhost/v1/chat/completions", key.key);
  const result = await policy.enforceApiKeyPolicy(request, "gpt-4");

  assert.ok(result.rejection, "Should reject the request");
  assert.equal(result.rejection.status, 403);
  const msg = await readErrorMessage(result.rejection);
  assert.ok(msg.includes("chat"), `Error message should mention 'chat', got: ${msg}`);
});

test("chat+embeddings key allows /v1/embeddings", async () => {
  const policy = await loadPolicy("chat-emb-allowed");
  const key = await createKeyWithEndpoints(["chat", "embeddings"]);

  const request = makeRequest("http://localhost/v1/embeddings", key.key);
  const result = await policy.enforceApiKeyPolicy(request, "text-embedding-3");

  assert.equal(result.rejection, null);
});

test("chat-only key blocks /v1/embeddings", async () => {
  const policy = await loadPolicy("chat-blocks-emb");
  const key = await createKeyWithEndpoints(["chat"]);

  const request = makeRequest("http://localhost/v1/embeddings", key.key);
  const result = await policy.enforceApiKeyPolicy(request, "text-embedding-3");

  assert.ok(result.rejection, "Should reject the request");
  assert.equal(result.rejection.status, 403);
  const msg = await readErrorMessage(result.rejection);
  assert.ok(
    msg.includes("embeddings"),
    `Error message should mention 'embeddings', got: ${msg}`
  );
});

test("search-only key blocks /v1/images/generations", async () => {
  const policy = await loadPolicy("search-blocks-images");
  const key = await createKeyWithEndpoints(["search"]);

  const request = makeRequest("http://localhost/v1/images/generations", key.key);
  const result = await policy.enforceApiKeyPolicy(request, "dall-e-3");

  assert.ok(result.rejection, "Should reject the request");
  assert.equal(result.rejection.status, 403);
});

test("no API key — endpoint check skipped", async () => {
  const policy = await loadPolicy("no-key-endpoint");

  const request = makeRequest("http://localhost/v1/chat/completions");
  const result = await policy.enforceApiKeyPolicy(request, "gpt-4");

  assert.equal(result.rejection, null);
});

test("search-only key allows /v1/search/analytics", async () => {
  const policy = await loadPolicy("search-analytics-allowed");
  const key = await createKeyWithEndpoints(["search"]);

  const request = makeRequest("http://localhost/v1/search/analytics", key.key);
  const result = await policy.enforceApiKeyPolicy(request, "analytics");

  assert.equal(result.rejection, null);
});

// ─── DB persistence tests ──────────────────────────────────────────────────

test("updateApiKeyPermissions: persists allowedEndpoints", async () => {
  const key = await apiKeysDb.createApiKey("EP Persist Key", "machine-persist");
  await apiKeysDb.updateApiKeyPermissions(key.id, {
    allowedEndpoints: ["search", "embeddings"],
  });

  const meta = await apiKeysDb.getApiKeyMetadata(key.key);
  assert.ok(meta, "Metadata should exist");
  assert.deepEqual(meta.allowedEndpoints, ["search", "embeddings"]);
});

test("updateApiKeyPermissions: empty allowedEndpoints", async () => {
  const key = await apiKeysDb.createApiKey("EP All Key", "machine-all");
  await apiKeysDb.updateApiKeyPermissions(key.id, {
    allowedEndpoints: [],
  });

  const meta = await apiKeysDb.getApiKeyMetadata(key.key);
  assert.ok(meta, "Metadata should exist");
  assert.deepEqual(meta.allowedEndpoints, []);
});

test("getApiKeys: returns allowedEndpoints in listing", async () => {
  const key = await apiKeysDb.createApiKey("EP List Key", "machine-list");
  await apiKeysDb.updateApiKeyPermissions(key.id, {
    allowedEndpoints: ["chat"],
  });

  const keys = await apiKeysDb.getApiKeys();
  const found = keys.find((k: any) => k.id === key.id);
  assert.ok(found, "Key should be in listing");
  assert.deepEqual(found.allowedEndpoints, ["chat"]);
});
