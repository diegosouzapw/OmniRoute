import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("processManager", () => {
  let mod;
  it("should load module", async () => {
    const loadPromise = import("../../src/lib/versionManager/processManager.ts");
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Module load timeout")), 5000)
    );
    mod = await Promise.race([loadPromise, timeoutPromise]);
    assert.ok(mod);
  });

  it("should export expected functions", () => {
    assert.equal(typeof mod.startProcess, "function");
    assert.equal(typeof mod.isProcessRunning, "function");
    assert.equal(typeof mod.stopProcess, "function");
    assert.equal(typeof mod.restartProcess, "function");
    assert.equal(typeof mod.getProcessInfo, "function");
  });

  it("isProcessRunning should return false for large invalid PID", () => {
    assert.equal(mod.isProcessRunning(999999999), false);
  });

  it("isProcessRunning should return true for current process", () => {
    assert.equal(mod.isProcessRunning(process.pid), true);
  });

  it("stopProcess should resolve immediately for non-running PID", async () => {
    const start = Date.now();
    await mod.stopProcess(999999999);
    assert.ok(Date.now() - start < 1000);
  });

  it("getProcessInfo should return alive=false for invalid PID", async () => {
    const info = await mod.getProcessInfo(999999999);
    assert.equal(info.pid, 999999999);
    assert.equal(info.alive, false);
    assert.equal(info.memoryUsage, undefined);
  });
});
