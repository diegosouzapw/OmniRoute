import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

const require = createRequire(import.meta.url);
const { buildReadinessUrl, waitForServer } = require("../../../electron/lib/serverReadiness");

describe("Electron server readiness", () => {
  it("builds the lightweight readiness URL from local and remote base URLs", () => {
    assert.equal(
      buildReadinessUrl("http://localhost:20128"),
      "http://localhost:20128/api/health/ping"
    );
    assert.equal(
      buildReadinessUrl("https://omniroute.example.com/"),
      "https://omniroute.example.com/api/health/ping"
    );
  });

  it("accepts only a successful HTTP response", async () => {
    let attempts = 0;
    const ready = await waitForServer("http://localhost/api/health/ping", 100, {
      fetchFn: async () => ({ ok: ++attempts === 2 }),
      pollIntervalMs: 1,
      requestTimeoutMs: 20,
      warnFn: () => {},
    });

    assert.equal(ready, true);
    assert.equal(attempts, 2);
  });

  it("returns false after repeated unsuccessful responses", async () => {
    const ready = await waitForServer("http://localhost/api/health/ping", 20, {
      fetchFn: async () => ({ ok: false }),
      pollIntervalMs: 1,
      requestTimeoutMs: 5,
      warnFn: () => {},
    });

    assert.equal(ready, false);
  });

  it("bounds a stalled request by both the attempt and overall deadlines", async () => {
    const startedAt = Date.now();
    const ready = await waitForServer("http://localhost/api/health/ping", 35, {
      fetchFn: () => new Promise(() => {}),
      pollIntervalMs: 1,
      requestTimeoutMs: 10,
      warnFn: () => {},
    });
    const elapsedMs = Date.now() - startedAt;

    assert.equal(ready, false);
    assert.ok(elapsedMs < 150, `stalled readiness probe took ${elapsedMs}ms`);
  });
});
