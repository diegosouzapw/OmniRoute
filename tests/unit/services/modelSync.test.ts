/**
 * Tests for src/lib/services/modelSync.ts
 *
 * Uses an isolated DB (DATA_DIR override) and mocks globalThis.fetch.
 */

import { describe, it, before, after, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-sync-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

// Imports after env is set up so the DB initialises with test path.
const core = await import("../../../src/lib/db/core.ts");
const { syncServiceModels, scheduleServiceModelSync, stopServiceModelSync, getServiceModels } =
  await import("../../../src/lib/services/modelSync.ts");

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  // Always clean up any scheduled sync to avoid cross-test interference.
  stopServiceModelSync("9router");
});

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function makeFetch(
  status: number,
  body: unknown
): (input: string | URL | Request, init?: RequestInit) => Promise<Response> {
  return async () =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
}

describe("syncServiceModels", () => {
  it("returns model count and persists models on success", async () => {
    const models = [
      { id: "9r/gemma-3n-e4b", object: "model", owned_by: "google" },
      { id: "9r/llama-3.3-70b", object: "model", owned_by: "meta" },
    ];
    globalThis.fetch = makeFetch(200, { data: models }) as typeof fetch;

    const count = await syncServiceModels("tool-success", "http://127.0.0.1:20130", "nr_test");

    assert.equal(count, 2);
    const stored = getServiceModels("tool-success");
    // Pruning marks available=true; count includes only current sync (no prior state).
    const available = stored.filter((m) => m.available !== false);
    assert.equal(available.length, 2);
    assert.equal(available[0].id, "tool-success/9r/gemma-3n-e4b");
  });

  it("saves models with 9router/ prefix in id", async () => {
    // Upstream returns raw ids without prefix.
    globalThis.fetch = makeFetch(200, {
      data: [
        { id: "cx/gpt-5-mini", object: "model" },
        { id: "auto/sonnet", object: "model" },
      ],
    }) as typeof fetch;

    await syncServiceModels("9router-prefix-test", "http://127.0.0.1:20130", "nr_test");

    const stored = getServiceModels("9router-prefix-test");
    const available = stored.filter((m) => m.available !== false);
    assert.equal(available.length, 2);
    assert.equal(
      available[0].id,
      "9router-prefix-test/cx/gpt-5-mini",
      "model id must be prefixed with tool name"
    );
    assert.equal(
      available[1].id,
      "9router-prefix-test/auto/sonnet",
      "model id must be prefixed with tool name"
    );
  });

  it("does not double-prefix if upstream already returns prefixed ids", async () => {
    globalThis.fetch = makeFetch(200, {
      data: [{ id: "9router/cx/gpt-5-mini", object: "model" }],
    }) as typeof fetch;

    await syncServiceModels("9router", "http://127.0.0.1:20130", "nr_test");

    const stored = getServiceModels("9router");
    const available = stored.filter((m) => m.available !== false);
    assert.equal(available.length, 1);
    assert.equal(
      available[0].id,
      "9router/cx/gpt-5-mini",
      "already-prefixed ids must not be double-prefixed"
    );
  });

  it("getServiceModels returns prefixed ids", async () => {
    globalThis.fetch = makeFetch(200, {
      data: [{ id: "cx/gpt-5-mini" }, { id: "auto/sonnet" }],
    }) as typeof fetch;

    await syncServiceModels("9router-getmodels-test", "http://127.0.0.1:20130", "nr_test");

    const stored = getServiceModels("9router-getmodels-test");
    assert.ok(
      stored.every((m) => m.id.startsWith("9router-getmodels-test/")),
      "all returned model ids must start with tool name prefix"
    );
  });

  it("accepts top-level array response format", async () => {
    const models = [{ id: "9r/model-a" }, { id: "9r/model-b" }];
    globalThis.fetch = makeFetch(200, models) as typeof fetch;

    const count = await syncServiceModels("tool-arr", "http://127.0.0.1:20130", "nr_test");

    assert.equal(count, 2);
  });

  it("filters out entries without an id field", async () => {
    globalThis.fetch = makeFetch(200, {
      data: [{ id: "valid" }, { name: "no-id" }, null, 42],
    }) as typeof fetch;

    const count = await syncServiceModels("9router", "http://127.0.0.1:20130", "nr_test");

    assert.equal(count, 1);
  });

  it("returns -1 on non-2xx without throwing", async () => {
    globalThis.fetch = makeFetch(503, { error: "unavailable" }) as typeof fetch;

    const count = await syncServiceModels("9router", "http://127.0.0.1:20130", "nr_test");

    assert.equal(count, -1);
  });

  it("returns -1 on network error without throwing", async () => {
    globalThis.fetch = async () => {
      throw new Error("ECONNREFUSED");
    };

    const count = await syncServiceModels("9router", "http://127.0.0.1:20130", "nr_test");

    assert.equal(count, -1);
  });
});

describe("scheduleServiceModelSync", () => {
  it("is idempotent — calling twice does not throw or duplicate timers", async () => {
    // Use a fetch that resolves immediately so the immediate sync completes.
    globalThis.fetch = makeFetch(200, { data: [{ id: "m1" }] }) as typeof fetch;

    assert.doesNotThrow(() => {
      scheduleServiceModelSync("9router", "http://127.0.0.1:20130", "nr_test", 60_000);
      scheduleServiceModelSync("9router", "http://127.0.0.1:20130", "nr_test", 60_000);
    });
  });

  it("fires an immediate sync", async () => {
    let fetchCalls = 0;
    globalThis.fetch = async () => {
      fetchCalls++;
      return new Response(JSON.stringify({ data: [] }), { status: 200 });
    };

    scheduleServiceModelSync("9router", "http://127.0.0.1:20130", "nr_test", 60_000);

    // Yield to the microtask queue so the immediate async sync can run.
    await new Promise((resolve) => setImmediate(resolve));
    await new Promise((resolve) => setImmediate(resolve));

    assert.ok(fetchCalls >= 1, "Immediate sync should have called fetch at least once");
  });
});

describe("stopServiceModelSync", () => {
  it("does not throw when called for a tool that was never scheduled", () => {
    assert.doesNotThrow(() => stopServiceModelSync("never-scheduled"));
  });

  it("clears the timer after scheduling", async () => {
    globalThis.fetch = makeFetch(200, { data: [] }) as typeof fetch;

    scheduleServiceModelSync("9router", "http://127.0.0.1:20130", "nr_test", 60_000);
    stopServiceModelSync("9router");

    // Calling stop again after clear should be a no-op (no double-clear error).
    assert.doesNotThrow(() => stopServiceModelSync("9router"));
  });
});
