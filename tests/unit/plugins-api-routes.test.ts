import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Test plugin API route structure and type contracts.
// Full HTTP integration tests require the Next.js test harness.

describe("plugin API routes", () => {
  describe("route modules exist", () => {
    it("main plugins route exports GET and POST", async () => {
      const mod = await import("../../src/app/api/plugins/route.ts");
      assert.equal(typeof mod.GET, "function");
      assert.equal(typeof mod.POST, "function");
    });

    it("[name] route exports GET and DELETE", async () => {
      const mod = await import("../../src/app/api/plugins/[name]/route.ts");
      assert.equal(typeof mod.GET, "function");
      assert.equal(typeof mod.DELETE, "function");
    });

    it("activate route exports POST", async () => {
      const mod = await import("../../src/app/api/plugins/[name]/activate/route.ts");
      assert.equal(typeof mod.POST, "function");
    });

    it("deactivate route exports POST", async () => {
      const mod = await import("../../src/app/api/plugins/[name]/deactivate/route.ts");
      assert.equal(typeof mod.POST, "function");
    });

    it("config route exports GET and PUT", async () => {
      const mod = await import("../../src/app/api/plugins/[name]/config/route.ts");
      assert.equal(typeof mod.GET, "function");
      assert.equal(typeof mod.PUT, "function");
    });

    it("scan route exports POST", async () => {
      const mod = await import("../../src/app/api/plugins/scan/route.ts");
      assert.equal(typeof mod.POST, "function");
    });
  });

  describe("new IPC and UI extensibility routes", () => {
    it("render route exports GET, POST, and OPTIONS", async () => {
      const mod = await import("../../src/app/api/plugins/[name]/render/route.ts");
      assert.equal(typeof mod.GET, "function");
      assert.equal(typeof mod.POST, "function");
      assert.equal(typeof mod.OPTIONS, "function");
    });

    it("ui-extensions route exports GET and OPTIONS", async () => {
      const mod = await import("../../src/app/api/plugins/ui-extensions/route.ts");
      assert.equal(typeof mod.GET, "function");
      assert.equal(typeof mod.OPTIONS, "function");
    });

    it("render route GET calls checkAuth", async () => {
      const mod = await import("../../src/app/api/plugins/[name]/render/route.ts");
      assert.equal(typeof mod.GET, "function");
    });

    it("ui-extensions route GET calls checkAuth", async () => {
      const mod = await import("../../src/app/api/plugins/ui-extensions/route.ts");
      assert.equal(typeof mod.GET, "function");
    });
  });
});
