import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import { mkdirSync, writeFileSync, rmSync, mkdtempSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

// Isolate to a temp DB so doctor's db check doesn't hit the production DB.
const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-doctor-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { runPluginDoctor } = await import("../../src/lib/plugins/doctor.ts");

describe("runPluginDoctor", () => {
  const testDir = join(tmpdir(), `doctor-test-${Date.now()}`);
  const pluginDir = join(testDir, "test-plugin");

  beforeEach(() => {
    resetDbInstance();
    mkdirSync(pluginDir, { recursive: true });
  });

  afterEach(() => {
    try { rmSync(testDir, { recursive: true, force: true }); } catch {}
  });

  it("healthy plugin with valid manifest and entry point", async () => {
    writeFileSync(join(pluginDir, "plugin.json"), JSON.stringify({
      name: "test-plugin", version: "1.0.0", main: "index.js",
    }));
    writeFileSync(join(pluginDir, "index.js"), "export default {}");
    const result = await runPluginDoctor(pluginDir, "test-plugin");
    // Plugin not in DB → db_status_correct is "warn" → overall "degraded"
    assert.ok(result.overall === "healthy" || result.overall === "degraded");
    assert.ok(result.checks.every((c) => c.status === "pass" || c.status === "warn"));
  });

  it("unhealthy when directory missing", async () => {
    const result = await runPluginDoctor("/nonexistent/path", "missing");
    assert.strictEqual(result.overall, "unhealthy");
    assert.ok(result.checks.some((c) => c.name === "directory_exists" && c.status === "fail"));
  });

  it("unhealthy when manifest invalid", async () => {
    writeFileSync(join(pluginDir, "plugin.json"), "not json");
    const result = await runPluginDoctor(pluginDir, "bad-plugin");
    assert.ok(result.checks.some((c) => c.name === "manifest_valid" && c.status === "fail"));
  });

  it("reports missing entry point", async () => {
    writeFileSync(join(pluginDir, "plugin.json"), JSON.stringify({
      name: "no-entry", version: "1.0.0", main: "index.js",
    }));
    const result = await runPluginDoctor(pluginDir, "no-entry");
    assert.ok(result.checks.some((c) => c.name === "entry_point_exists" && c.status === "fail"));
  });

  it("degraded when only warnings", async () => {
    writeFileSync(join(pluginDir, "plugin.json"), JSON.stringify({
      name: "warn-plugin", version: "1.0.0", main: "index.ts",
    }));
    writeFileSync(join(pluginDir, "index.ts"), "export default {}");
    const result = await runPluginDoctor(pluginDir, "warn-plugin");
    // .ts extension should produce a warn on can_spawn
    assert.ok(result.checks.some((c) => c.name === "can_spawn" && c.status === "warn"));
  });
});
