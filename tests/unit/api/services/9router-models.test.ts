/**
 * Tests for GET /api/services/9router/models
 *
 * Uses an isolated in-memory DB and mocks fetch + service registry.
 */

import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-9router-models-api-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.NINEROUTER_PORT = "20130";

// Must import db core first so the DB is initialised at the test path.
const core = await import("../../../../src/lib/db/core.ts");
const { saveServiceModels, getServiceModels } =
  await import("../../../../src/lib/db/serviceModels.ts");

// Import the route handler under test (after env is set).
const { GET } = await import("../../../../src/app/api/services/9router/models/route.ts");

const originalFetch = globalThis.fetch;

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeRequest(url: string): Request {
  return new Request(url);
}

function makeFetch(status: number, body: unknown): typeof fetch {
  return async () =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
}

beforeEach(() => {
  resetDb();
  globalThis.fetch = originalFetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe("GET /api/services/9router/models", () => {
  it("returns { data: [] } when no models are stored", async () => {
    const req = makeRequest("http://localhost/api/services/9router/models");
    const res = await GET(req);

    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok("data" in body, "response should have a data property");
    assert.deepEqual(body.data, []);
  });

  it("returns stored models as { data: [...] }", async () => {
    saveServiceModels("9router", [
      { id: "9router/cx/gpt-5-mini", name: "GPT-5 mini", available: true },
      { id: "9router/auto/sonnet", name: "Sonnet", available: true },
    ]);

    const req = makeRequest("http://localhost/api/services/9router/models");
    const res = await GET(req);

    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.data.length, 2);
    assert.equal(body.data[0].id, "9router/cx/gpt-5-mini");
    assert.equal(body.data[1].id, "9router/auto/sonnet");
  });

  it("?refresh=true triggers a sync before returning", async () => {
    // Pre-seed with one model so we can tell that the sync ran.
    saveServiceModels("9router", [{ id: "9router/old-model", available: true }]);

    let fetchCalled = false;
    globalThis.fetch = async () => {
      fetchCalled = true;
      return new Response(
        // Upstream returns an unprefixed id — sync should prefix it as "9router/new-model".
        JSON.stringify({ data: [{ id: "new-model", object: "model" }] }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    };

    const req = makeRequest("http://localhost/api/services/9router/models?refresh=true");
    const res = await GET(req);

    assert.equal(res.status, 200);
    assert.ok(fetchCalled, "?refresh=true should have triggered a fetch to the service");

    const body = await res.json();
    // After sync, new model should be present prefixed (old model pruned to unavailable).
    const ids = body.data.map((m: { id: string }) => m.id);
    assert.ok(ids.includes("9router/new-model"), "synced model should appear in response");
  });

  it("?refresh=false (default) does NOT trigger a sync", async () => {
    saveServiceModels("9router", [{ id: "9router/cached-model", available: true }]);

    let fetchCalled = false;
    globalThis.fetch = async () => {
      fetchCalled = true;
      return new Response(JSON.stringify({ data: [] }), { status: 200 });
    };

    const req = makeRequest("http://localhost/api/services/9router/models");
    const res = await GET(req);

    assert.equal(res.status, 200);
    assert.equal(fetchCalled, false, "GET without ?refresh=true should NOT call fetch");
  });

  it("response shape always has a data array", async () => {
    const req = makeRequest("http://localhost/api/services/9router/models");
    const res = await GET(req);
    const body = await res.json();

    assert.ok(Array.isArray(body.data), "data must always be an array");
  });
});
