import { describe, it, afterEach } from "node:test";
import assert from "node:assert";
import { existsSync, readFileSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { PluginLogger } from "../../src/lib/plugins/logger.ts";

describe("PluginLogger", () => {
  const testDir = join(tmpdir(), `plugin-logger-test-${Date.now()}`);

  afterEach(() => {
    try { rmSync(testDir, { recursive: true, force: true }); } catch {}
  });

  it("creates log file and writes JSON entries", () => {
    const logger = new PluginLogger("test-plugin", testDir);
    logger.info("hello world");
    const logPath = join(testDir, "test-plugin", "plugin.log");
    assert.ok(existsSync(logPath));
    const content = readFileSync(logPath, "utf-8").trim();
    const entry = JSON.parse(content);
    assert.strictEqual(entry.level, "INFO");
    assert.strictEqual(entry.message, "hello world");
    assert.ok(entry.timestamp);
  });

  it("writes error entries", () => {
    const logger = new PluginLogger("err-plugin", testDir);
    logger.error("bad thing", { code: 500 });
    const logPath = join(testDir, "err-plugin", "plugin.log");
    const entry = JSON.parse(readFileSync(logPath, "utf-8").trim());
    assert.strictEqual(entry.level, "ERROR");
    assert.deepStrictEqual(entry.data, { code: 500 });
  });

  it("appends multiple entries", () => {
    const logger = new PluginLogger("multi-plugin", testDir);
    logger.info("first");
    logger.warn("second");
    const logPath = join(testDir, "multi-plugin", "plugin.log");
    const lines = readFileSync(logPath, "utf-8").trim().split("\n");
    assert.strictEqual(lines.length, 2);
  });
});
