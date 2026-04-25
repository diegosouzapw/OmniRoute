import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-test-route-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_REQUIRE_API_KEY = process.env.REQUIRE_API_KEY;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/api/models/test/route.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  core.resetDbInstance();
  delete process.env.INITIAL_PASSWORD;
  delete process.env.REQUIRE_API_KEY;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeRequest(headers?: HeadersInit) {
  return new Request("http://localhost/api/models/test", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...headers,
    },
    body: JSON.stringify({ providerId: "openai", modelId: "gpt-4o-mini" }),
  });
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }

  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }

  if (ORIGINAL_REQUIRE_API_KEY === undefined) {
    delete process.env.REQUIRE_API_KEY;
  } else {
    process.env.REQUIRE_API_KEY = ORIGINAL_REQUIRE_API_KEY;
  }

  if (ORIGINAL_JWT_SECRET === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
  }
});

test("model test route requires management auth when login protection is enabled", async () => {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });

  const unauthenticated = await route.POST(makeRequest());
  const invalidToken = await route.POST(
    makeRequest({
      authorization: "Bearer sk-invalid",
    })
  );

  const unauthenticatedBody = (await unauthenticated.json()) as any;
  const invalidTokenBody = (await invalidToken.json()) as any;

  assert.equal(unauthenticated.status, 401);
  assert.equal(unauthenticatedBody.error.message, "Authentication required");
  assert.equal(invalidToken.status, 403);
  assert.equal(invalidTokenBody.error.message, "Invalid management token");
});

test("model test route ignores forwarded hosts and works in strict API-key mode", async () => {
  process.env.REQUIRE_API_KEY = "true";
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-model-test",
    apiKey: "sk-model-test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });

  const fetchCalls: string[] = [];
  globalThis.fetch = async (url) => {
    const urlString = String(url);
    fetchCalls.push(urlString);
    assert.equal(urlString.includes("evil.example"), false);
    return Response.json({
      id: "chatcmpl-model-test",
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

  const response = await route.POST(
    await makeManagementSessionRequest("http://localhost/api/models/test", {
      method: "POST",
      headers: {
        "x-forwarded-host": "evil.example",
        "x-forwarded-proto": "https",
      },
      body: { providerId: "openai", modelId: "gpt-4o-mini" },
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.status, "ok");
  assert.equal(body.responseText, "OK");
  assert.equal(fetchCalls.length, 1);
  assert.match(fetchCalls[0], /\/chat\/completions$/);
});
