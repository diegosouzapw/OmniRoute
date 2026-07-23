import { describe, it, afterEach } from "node:test";
import assert from "node:assert";
import { mkdirSync, writeFileSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { startDevMode, stopDevMode } from "../../src/lib/plugins/devMode.ts";

describe("devMode", () => {
  const testDir = join(tmpdir(), `devmode-test-${Date.now()}`);

  afterEach(() => {
    stopDevMode();
    try { rmSync(testDir, { recursive: true, force: true }); } catch {}
  });

  it("startDevMode creates watcher without throwing", () => {
    mkdirSync(testDir, { recursive: true });
    let reloadCalled = false;
    startDevMode(testDir, async () => { reloadCalled = true; });
    // Watcher is active — no crash
    assert.ok(true);
  });

  it("stopDevMode cleans up without throwing", () => {
    mkdirSync(testDir, { recursive: true });
    startDevMode(testDir, async () => {});
    stopDevMode();
    // Second stop is safe
    stopDevMode();
    assert.ok(true);
  });

  it("startDevMode is idempotent", () => {
    mkdirSync(testDir, { recursive: true });
    startDevMode(testDir, async () => {});
    startDevMode(testDir, async () => {}); // Should not throw
    stopDevMode();
    assert.ok(true);
  });
});
