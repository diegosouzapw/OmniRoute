import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-opencode-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// #3047 — OpenCode Free (no-auth) has no connection row, so the
// "Import from /models" button used to hit a 404 and silently no-op. The models
// route must serve a non-empty model list when called with a no-auth provider id.
// #3611 — the source may now be "upstream" (live fetch succeeded) or
// "local_catalog" (live fetch failed/unavailable); both are acceptable here.
test("models route serves models for a no-auth provider id (#3047)", async () => {
  const response = await modelsRoute.GET(
    new Request("http://localhost/api/providers/opencode/models?refresh=true"),
    { params: { id: "opencode" } }
  );
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.provider, "opencode");
  assert.ok(
    body.source === "local_catalog" || body.source === "upstream",
    `source must be 'local_catalog' or 'upstream', got '${body.source}'`
  );
  assert.ok(Array.isArray(body.models) && body.models.length > 0, "should return catalog models");
  assert.ok(
    body.models.every((m: { id?: unknown }) => typeof m.id === "string" && m.id.length > 0),
    "every model must have a non-empty id"
  );
});

test("models route still 404s for an unknown provider/connection id", async () => {
  const response = await modelsRoute.GET(
    new Request("http://localhost/api/providers/does-not-exist-xyz/models"),
    { params: { id: "does-not-exist-xyz" } }
  );
  assert.equal(response.status, 404);
});

// #3611 — OpenCode Free (noAuth + modelsUrl) must fetch live models from the
// provider's modelsUrl instead of always returning the stale local_catalog.

const LIVE_MODEL_LIST = [
  { id: "live-model-alpha", object: "model" },
  { id: "live-model-beta", object: "model" },
];

test("models route fetches live models from modelsUrl for noAuth provider with modelsUrl (#3611)", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url: string | URL, _init?: RequestInit) => {
    const urlStr = String(url);
    if (urlStr === "https://opencode.ai/zen/v1/models") {
      return Response.json({ data: LIVE_MODEL_LIST });
    }
    return new Response("unexpected fetch: " + urlStr, { status: 500 });
  };

  try {
    const response = await modelsRoute.GET(
      new Request("http://localhost/api/providers/opencode/models"),
      { params: { id: "opencode" } }
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.provider, "opencode");
    assert.equal(
      body.source,
      "upstream",
      "should report source as 'upstream' when live fetch succeeds"
    );
    assert.ok(Array.isArray(body.models), "models should be an array");
    const ids = body.models.map((m: { id: string }) => m.id);
    assert.ok(ids.includes("live-model-alpha"), "should include live model alpha");
    assert.ok(ids.includes("live-model-beta"), "should include live model beta");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("metadata-only no-auth connection row still uses public model discovery", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "opencode",
    authType: "apikey",
    name: "opencode-metadata",
    isActive: true,
    testStatus: "unknown",
    providerSpecificData: {
      fingerprints: [{ id: "fingerprint-1" }],
      accountProxies: [],
    },
  });
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url: string | URL) => {
    if (String(url) === "https://opencode.ai/zen/v1/models") {
      return Response.json({ data: LIVE_MODEL_LIST });
    }
    return new Response("unexpected", { status: 500 });
  };

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.provider, "opencode");
    assert.equal(body.connectionId, connection.id);
    assert.equal(body.source, "upstream");
    assert.ok(body.models.some((model: { id: string }) => model.id === "live-model-alpha"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("models route falls back to local_catalog when live modelsUrl fetch throws (#3611 fallback on error)", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url: string | URL, _init?: RequestInit) => {
    if (String(url) === "https://opencode.ai/zen/v1/models") {
      throw new Error("network failure");
    }
    return new Response("unexpected", { status: 500 });
  };

  try {
    const response = await modelsRoute.GET(
      new Request("http://localhost/api/providers/opencode/models"),
      { params: { id: "opencode" } }
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.provider, "opencode");
    assert.equal(body.source, "local_catalog", "should fall back to local_catalog on fetch error");
    assert.ok(Array.isArray(body.models) && body.models.length > 0, "should have catalog models");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("models route falls back to local_catalog when live modelsUrl fetch returns non-OK (#3611 fallback on non-OK)", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url: string | URL, _init?: RequestInit) => {
    if (String(url) === "https://opencode.ai/zen/v1/models") {
      return new Response("Service Unavailable", { status: 503 });
    }
    return new Response("unexpected", { status: 500 });
  };

  try {
    const response = await modelsRoute.GET(
      new Request("http://localhost/api/providers/opencode/models"),
      { params: { id: "opencode" } }
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.provider, "opencode");
    assert.equal(
      body.source,
      "local_catalog",
      "should fall back to local_catalog when upstream returns non-OK"
    );
    assert.ok(Array.isArray(body.models) && body.models.length > 0, "should have catalog models");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
