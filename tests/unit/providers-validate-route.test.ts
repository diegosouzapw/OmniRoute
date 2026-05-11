import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-providers-validate-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const originalAllowPrivateProviderUrls = process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;

// Load modules at top level
const core = await import("../../src/lib/db/core.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const validateRoute = await import("../../src/app/api/providers/validate/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (originalAllowPrivateProviderUrls === undefined) {
    delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
  } else {
    process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = originalAllowPrivateProviderUrls;
  }
});

test("providers validate route returns 400 for invalid JSON", async () => {
  await resetStorage();

  const request = new Request("http://localhost/api/providers/validate", {
    method: "POST",
    body: "invalid json",
  });

  const response = await validateRoute.POST(request);

  assert.equal(response.status, 400);
  const body = (await response.json()) as any;
  assert.equal(body.error.message, "Invalid request");
});

test("providers validate route returns 400 for missing provider and apiKey", async () => {
  await resetStorage();

  // Empty body
  const request = new Request("http://localhost/api/providers/validate", {
    method: "POST",
    body: JSON.stringify({}),
  });

  const response = await validateRoute.POST(request);

  assert.equal(response.status, 400);
});

test("providers validate route returns 400 for invalid provider type", async () => {
  await resetStorage();

  // Provider validation not supported returns 400
  const request = new Request("http://localhost/api/providers/validate", {
    method: "POST",
    body: JSON.stringify({ provider: "unknown-provider", apiKey: "test-key" }),
  });

  const response = await validateRoute.POST(request);

  // Should return 400 for unsupported
  assert.equal(response.status, 400);
});

test("providers validate route forwards baseUrl to built-in specialty validators", async () => {
  await resetStorage();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    if (String(url) === "https://us.inference.heroku.com/v1/chat/completions") {
      assert.equal(init.headers.Authorization, "Bearer heroku-key");
      return new Response(JSON.stringify({ error: "bad request" }), { status: 400 });
    }
    throw new Error(`unexpected fetch: ${url}`);
  };

  try {
    const request = new Request("http://localhost/api/providers/validate", {
      method: "POST",
      body: JSON.stringify({
        provider: "heroku",
        apiKey: "heroku-key",
        baseUrl: "https://us.inference.heroku.com",
      }),
    });

    const response = await validateRoute.POST(request);
    const body = (await response.json()) as any;

    assert.equal(response.status, 200);
    assert.equal(body.valid, true);
    assert.equal(body.error, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("providers validate route blocks private baseUrl values by default", async () => {
  await resetStorage();
  delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;

  let called = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    called = true;
    return Response.json({ ok: true });
  };

  try {
    const request = new Request("http://localhost/api/providers/validate", {
      method: "POST",
      body: JSON.stringify({
        provider: "heroku",
        apiKey: "heroku-key",
        baseUrl: "http://127.0.0.1:8080",
      }),
    });

    const response = await validateRoute.POST(request);

    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      error: "Blocked private or local provider URL",
    });
    assert.equal(called, false);
    const auditEntries = compliance.getAuditLog({
      action: "provider.validation.ssrf_blocked",
      resourceType: "provider_validation",
    });
    assert.equal(auditEntries.length, 1);
    assert.equal(auditEntries[0].target, "heroku");
    assert.equal(auditEntries[0].status, "blocked");
    assert.equal(auditEntries[0].requestId, auditEntries[0].request_id);
    assert.deepEqual(auditEntries[0].metadata, {
      provider: "heroku",
      route: "/api/providers/validate",
      reason: "Blocked private or local provider URL",
      baseUrl: "http://127.0.0.1:8080",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("providers validate route allows private baseUrl values when opt-in env is enabled", async () => {
  await resetStorage();
  process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = "true";

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "http://127.0.0.1:8080/v1/chat/completions");
    assert.equal(init.headers.Authorization, "Bearer heroku-key");
    return new Response(JSON.stringify({ error: "bad request" }), { status: 400 });
  };

  try {
    const request = new Request("http://localhost/api/providers/validate", {
      method: "POST",
      body: JSON.stringify({
        provider: "heroku",
        apiKey: "heroku-key",
        baseUrl: "http://127.0.0.1:8080",
      }),
    });

    const response = await validateRoute.POST(request);
    const body = (await response.json()) as any;

    assert.equal(response.status, 200);
    assert.equal(body.valid, true);
    assert.equal(body.error, null);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalAllowPrivateProviderUrls === undefined) {
      delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
    } else {
      process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = originalAllowPrivateProviderUrls;
    }
  }
});

test("providers validate route returns 504 on controlled outbound timeout", async () => {
  await resetStorage();
  delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    const error = new Error("aborted");
    error.name = "AbortError";
    throw error;
  };

  try {
    const request = new Request("http://localhost/api/providers/validate", {
      method: "POST",
      body: JSON.stringify({
        provider: "heroku",
        apiKey: "heroku-key",
        baseUrl: "https://us.inference.heroku.com",
      }),
    });

    const response = await validateRoute.POST(request);
    const body = (await response.json()) as any;

    assert.equal(response.status, 504);
    assert.match(body.error, /timed out/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
