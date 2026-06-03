import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../src/lib/db/cleanup.ts");

describe("cleanup DB module", () => {
  it("cleanupQuotaSnapshots returns result with deleted count", async () => {
    const result = await mod.cleanupQuotaSnapshots();
    assert.ok(typeof result.deleted === "number", "should have deleted count");
    assert.ok(typeof result.errors === "number", "should have errors count");
  });

  it("cleanupUsageHistory returns result", async () => {
    const result = await mod.cleanupUsageHistory();
    assert.ok(typeof result.deleted === "number");
    assert.ok(typeof result.errors === "number");
  });

  it("purgeDetailedLogs returns result", async () => {
    const result = await mod.purgeDetailedLogs();
    assert.ok(typeof result.deleted === "number");
    assert.ok(typeof result.errors === "number");
  });

  it("runAutoCleanup returns summary with totalDeleted and totalErrors", async () => {
    const result = await mod.runAutoCleanup();
    assert.ok(typeof result.totalDeleted === "number", "should have totalDeleted");
    assert.ok(typeof result.totalErrors === "number", "should have totalErrors");
    assert.ok(typeof result.results === "object", "should have results");
  });

  it("cleanupCallLogs returns result (may error if table missing)", async () => {
    const result = await mod.cleanupCallLogs();
    assert.ok(typeof result.deleted === "number");
    assert.ok(typeof result.errors === "number");
  });

  it("cleanupMcpAudit returns result (may error if table missing)", async () => {
    const result = await mod.cleanupMcpAudit();
    assert.ok(typeof result.deleted === "number");
    assert.ok(typeof result.errors === "number");
  });

  it("cleanupA2aEvents returns result (may error if table missing)", async () => {
    const result = await mod.cleanupA2aEvents();
    assert.ok(typeof result.deleted === "number");
    assert.ok(typeof result.errors === "number");
  });
});
