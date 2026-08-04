/**
 * #7785 — Auth policy inconsistency on /v1/embeddings and /v1/web/fetch.
 *
 * When REQUIRE_API_KEY=false, all client APIs should allow anonymous access.
 * However, embeddings and web-fetch routes still returned 401 for invalid
 * presented keys because the invalid-key check was NOT gated on
 * isRequireApiKeyEnabled() — unlike the combos route pattern.
 *
 * Fix: gate the route-local invalid-key check on isRequireApiKeyEnabled() in
 * both route files, matching the /api/v1/combos pattern.
 *
 * These tests verify:
 * 1. REQUIRE_API_KEY=false + invalid bearer key → NOT 401 (anonymous access)
 * 2. REQUIRE_API_KEY=true  + invalid bearer key → 401 (auth enforced)
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-auth-policy-7785-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "auth-7785-api-secret";
process.env.JWT_SECRET = "auth-7785-jwt-secret";

// Ensure no env-var API key interferes with isValidApiKey results.
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;

const core = await import("../../src/lib/db/core.ts");
const { createProviderNode } = await import("../../src/lib/db/providers/nodes.ts");
const { POST: embeddingsPOST } = await import("../../src/app/api/v1/embeddings/route.ts");
const { POST: webFetchPOST } = await import("../../src/app/api/v1/web/fetch/route.ts");

const INVALID_BEARER = "Bearer sk-invalid-key-that-does-not-exist-7785";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function embeddingsRequest(): Request {
  return new Request("http://localhost/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: INVALID_BEARER,
    },
    body: JSON.stringify({ model: "lanembed7785/nomic-embed-text", input: "hello" }),
  });
}

function webFetchRequest(): Request {
  return new Request("http://localhost/v1/web/fetch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: INVALID_BEARER,
    },
    body: JSON.stringify({ url: "https://example.com" }),
  });
}

// ── Embeddings route ──────────────────────────────────────────────────────

test("#7785 embeddings: REQUIRE_API_KEY=false + invalid key → not 401", async () => {
  process.env.REQUIRE_API_KEY = "false";

  await createProviderNode({
    type: "openai-compatible-embeddings",
    name: "LAN Embed 7785",
    prefix: "lanembed7785",
    apiType: "embeddings",
    baseUrl: "http://10.10.0.182:11434/v1",
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
        usage: { prompt_tokens: 3, total_tokens: 3 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  try {
    const res = await embeddingsPOST(embeddingsRequest(), {});
    assert.notEqual(res.status, 401, "invalid key must NOT cause 401 when REQUIRE_API_KEY=false");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#7785 embeddings: REQUIRE_API_KEY=true + invalid key → 401", async () => {
  process.env.REQUIRE_API_KEY = "true";

  const res = await embeddingsPOST(embeddingsRequest(), {});
  assert.equal(res.status, 401, "invalid key must cause 401 when REQUIRE_API_KEY=true");
});

// ── Web-fetch route ───────────────────────────────────────────────────────

test("#7785 web-fetch: REQUIRE_API_KEY=false + invalid key → not 401", async () => {
  process.env.REQUIRE_API_KEY = "false";

  const res = await webFetchPOST(webFetchRequest());
  assert.notEqual(res.status, 401, "invalid key must NOT cause 401 when REQUIRE_API_KEY=false");
});

test("#7785 web-fetch: REQUIRE_API_KEY=true + invalid key → 401", async () => {
  process.env.REQUIRE_API_KEY = "true";

  const res = await webFetchPOST(webFetchRequest());
  assert.equal(res.status, 401, "invalid key must cause 401 when REQUIRE_API_KEY=true");
});
