/**
 * #15212 — GET /api/v1/providers/{provider}/models filters the unified catalog
 * and rebuilds the JSON. The catalog response carries Content-Length (and
 * sometimes Content-Encoding) for the FULL catalog. Copying those headers onto
 * the smaller body makes clients that honor Content-Length wait for bytes that
 * never arrive.
 *
 * The route's catalog call is a live binding, so this test replaces it and
 * hands GET a response whose Content-Length cannot match the filtered body.
 * The #14092 suite only checks that a declared length equals the body it just
 * read, which stays green when the two sizes happen to match.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cl-15212-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const routeModule = await import("../../src/app/api/v1/providers/[provider]/models/route.ts");

const STALE_CONTENT_LENGTH = "813313";
const originalLoad = routeModule.unifiedModels.load;

test.after(() => {
  routeModule.unifiedModels.load = originalLoad;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.beforeEach(() => {
  routeModule.unifiedModels.load = originalLoad;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

function plantCatalog(body: string, headers: Record<string, string>, status = 200) {
  routeModule.unifiedModels.load = (async () =>
    new Response(body, { status, headers })) as typeof originalLoad;
}

test("#15212 filtered provider models must not forward the catalog Content-Length", async () => {
  const fullCatalog = {
    object: "list",
    data: [
      { id: "openai/gpt-4o", owned_by: "openai", object: "model" },
      { id: "openai/gpt-4o-mini", owned_by: "openai", object: "model" },
      { id: "anthropic/claude-sonnet", owned_by: "anthropic", object: "model" },
    ],
  };
  const catalogBody = JSON.stringify(fullCatalog);
  assert.notEqual(Buffer.byteLength(catalogBody), Number(STALE_CONTENT_LENGTH));

  plantCatalog(catalogBody, {
    "content-type": "application/json",
    "content-length": STALE_CONTENT_LENGTH,
    "content-encoding": "gzip",
    "x-catalog-keep": "1",
  });

  const request = new Request("http://127.0.0.1:20128/api/v1/providers/openai/models");
  const response = await routeModule.GET(request, {
    params: Promise.resolve({ provider: "openai" }),
  });

  assert.equal(response.status, 200);
  const text = await response.text();
  const payload = JSON.parse(text) as { data: Array<{ id: string }> };
  assert.deepEqual(
    payload.data.map((model) => model.id),
    ["gpt-4o", "gpt-4o-mini"]
  );
  assert.notEqual(Buffer.byteLength(text), Number(STALE_CONTENT_LENGTH));

  const declared = response.headers.get("content-length");
  assert.notEqual(
    declared,
    STALE_CONTENT_LENGTH,
    "stale catalog content-length must not be forwarded"
  );
  assert.ok(
    declared === null || Number(declared) === Buffer.byteLength(text),
    `content-length must be absent or match the rewritten body, got ${declared}`
  );
  assert.equal(response.headers.get("content-encoding"), null);
  assert.equal(response.headers.get("x-catalog-keep"), "1");
});

test("#15212 passthrough keeps upstream headers when the catalog body is not rewritten", async () => {
  plantCatalog("not-json", {
    "content-type": "text/plain",
    "content-length": "8",
    "x-catalog-keep": "passthrough",
  });

  const request = new Request("http://127.0.0.1:20128/api/v1/providers/openai/models");
  const response = await routeModule.GET(request, {
    params: Promise.resolve({ provider: "openai" }),
  });
  const text = await response.text();

  assert.equal(text, "not-json");
  assert.equal(response.headers.get("content-length"), "8");
  assert.equal(response.headers.get("x-catalog-keep"), "passthrough");
});
