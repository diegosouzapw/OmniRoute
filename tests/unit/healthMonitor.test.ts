import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe("healthMonitor", () => {
  let mod;
  beforeEach(async () => {
    try {
      const prev = await import("../../src/lib/versionManager/healthMonitor.ts");
      prev.stopMonitoring("test-tool");
      prev.stopMonitoring("tool-a");
      prev.stopMonitoring("tool-b");
    } catch {}
    mod = await import("../../src/lib/versionManager/healthMonitor.ts");
  });

  afterEach(() => {
    try {
      mod.stopMonitoring("test-tool");
    } catch {}
    try {
      mod.stopMonitoring("tool-a");
    } catch {}
    try {
      mod.stopMonitoring("tool-b");
    } catch {}
  });

  describe("checkHealth", () => {
    it("should return healthy for 200 with models", async () => {
      globalThis.fetch = async () => ({
        ok: true,
        status: 200,
        json: async () => ({ data: [{ id: "m1" }, { id: "m2" }] }),
      });
      const r = await mod.checkHealth("http://127.0.0.1:8317");
      assert.equal(r.healthy, true);
      assert.equal(r.modelCount, 2);
      assert.equal(r.error, null);
      assert.ok(r.latency >= 0);
    });

    it("should return unhealthy for non-200", async () => {
      globalThis.fetch = async () => ({
        ok: false,
        status: 503,
        json: async () => ({}),
      });
      const r = await mod.checkHealth("http://127.0.0.1:8317");
      assert.equal(r.healthy, false);
      assert.equal(r.modelCount, 0);
      assert.equal(r.error, "HTTP 503");
    });

    it("should return unhealthy on network error", async () => {
      globalThis.fetch = async () => {
        throw new Error("ECONNREFUSED");
      };
      const r = await mod.checkHealth("http://127.0.0.1:8317");
      assert.equal(r.healthy, false);
      assert.ok(r.error.includes("ECONNREFUSED"));
    });

    it("should handle non-array data.data", async () => {
      globalThis.fetch = async () => ({
        ok: true,
        status: 200,
        json: async () => ({ data: "not-array" }),
      });
      const r = await mod.checkHealth("http://127.0.0.1:8317");
      assert.equal(r.healthy, true);
      assert.equal(r.modelCount, 0);
    });

    it("should use custom health path", async () => {
      let capturedUrl;
      globalThis.fetch = async (url) => {
        capturedUrl = url;
        return { ok: true, status: 200, json: async () => ({ data: [] }) };
      };
      await mod.checkHealth("http://127.0.0.1:8317", "/health");
      assert.ok(capturedUrl.includes("/health"));
    });

    it("should default to /v1/models", async () => {
      let capturedUrl;
      globalThis.fetch = async (url) => {
        capturedUrl = url;
        return { ok: true, status: 200, json: async () => ({ data: [] }) };
      };
      await mod.checkHealth("http://127.0.0.1:8317");
      assert.ok(capturedUrl.includes("/v1/models"));
    });

    it("should handle non-Error throws", async () => {
      globalThis.fetch = async () => {
        throw "string error";
      };
      const r = await mod.checkHealth("http://127.0.0.1:8317");
      assert.equal(r.healthy, false);
      assert.equal(r.error, "string error");
    });

    it("should return unhealthy for 500", async () => {
      globalThis.fetch = async () => ({
        ok: false,
        status: 500,
        json: async () => ({}),
      });
      const r = await mod.checkHealth("http://127.0.0.1:8317");
      assert.equal(r.healthy, false);
      assert.equal(r.error, "HTTP 500");
    });
  });

  describe("startMonitoring / stopMonitoring / isMonitoring", () => {
    it("should start and stop monitoring", () => {
      globalThis.fetch = async () => ({
        ok: true,
        status: 200,
        json: async () => ({ data: [] }),
      });
      mod.startMonitoring("tool-a", "http://127.0.0.1:8317", 60_000);
      assert.equal(mod.isMonitoring("tool-a"), true);
      mod.stopMonitoring("tool-a");
      assert.equal(mod.isMonitoring("tool-a"), false);
    });

    it("should replace previous monitoring on re-start", () => {
      globalThis.fetch = async () => ({
        ok: true,
        status: 200,
        json: async () => ({ data: [] }),
      });
      mod.startMonitoring("tool-b", "http://127.0.0.1:8317", 60_000);
      mod.startMonitoring("tool-b", "http://127.0.0.1:8317", 30_000);
      assert.equal(mod.isMonitoring("tool-b"), true);
      mod.stopMonitoring("tool-b");
    });

    it("should return false for non-monitored tool", () => {
      assert.equal(mod.isMonitoring("nonexistent"), false);
    });

    it("should handle stopMonitoring for non-existent tool", () => {
      assert.doesNotThrow(() => mod.stopMonitoring("ghost"));
    });
  });
});
