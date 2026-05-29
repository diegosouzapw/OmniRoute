import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, mkdir, rm } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

import { scanPluginDir, getDefaultPluginDir } from "../../src/lib/plugins/scanner.ts";

let tmpDir: string;

test.beforeEach(async () => {
  tmpDir = await mkdtemp(join(tmpdir(), "plugin-scan-test-"));
});

test.afterEach(async () => {
  await rm(tmpDir, { recursive: true, force: true });
});

// ── getDefaultPluginDir ──

test("getDefaultPluginDir returns ~/.omniroute/plugins", () => {
  const dir = getDefaultPluginDir();
  assert.ok(dir.endsWith(".omniroute/plugins"));
});

// ── scanPluginDir ──

test("returns empty for non-existent directory", async () => {
  const result = await scanPluginDir("/nonexistent/path");
  assert.deepEqual(result.plugins, []);
  assert.deepEqual(result.errors, []);
});

test("returns empty for empty directory", async () => {
  const result = await scanPluginDir(tmpDir);
  assert.deepEqual(result.plugins, []);
  assert.deepEqual(result.errors, []);
});

test("skips hidden directories", async () => {
  await mkdir(join(tmpDir, ".hidden"));
  await writeFile(
    join(tmpDir, ".hidden", "plugin.json"),
    JSON.stringify({ name: "hidden", version: "1.0.0" })
  );
  const result = await scanPluginDir(tmpDir);
  assert.equal(result.plugins.length, 0);
});

test("discovers valid plugin", async () => {
  const pluginDir = join(tmpDir, "my-plugin");
  await mkdir(pluginDir);
  await writeFile(
    join(pluginDir, "plugin.json"),
    JSON.stringify({ name: "my-plugin", version: "1.0.0" })
  );
  await writeFile(join(pluginDir, "index.js"), "module.exports = {};");
  const result = await scanPluginDir(tmpDir);
  assert.equal(result.plugins.length, 1);
  assert.equal(result.plugins[0].name, "my-plugin");
  assert.equal(result.plugins[0].manifest.version, "1.0.0");
});

test("reports error for missing plugin.json", async () => {
  await mkdir(join(tmpDir, "no-manifest"));
  const result = await scanPluginDir(tmpDir);
  assert.equal(result.plugins.length, 0);
  assert.equal(result.errors.length, 1);
  assert.ok(result.errors[0].error.includes("no plugin.json"));
});

test("reports error for invalid manifest", async () => {
  const pluginDir = join(tmpDir, "bad-manifest");
  await mkdir(pluginDir);
  await writeFile(
    join(pluginDir, "plugin.json"),
    JSON.stringify({ name: "BAD NAME!", version: "nope" })
  );
  const result = await scanPluginDir(tmpDir);
  assert.equal(result.plugins.length, 0);
  assert.equal(result.errors.length, 1);
  assert.ok(result.errors[0].error.includes("invalid manifest"));
});

test("reports error for missing entry point", async () => {
  const pluginDir = join(tmpDir, "no-entry");
  await mkdir(pluginDir);
  await writeFile(
    join(pluginDir, "plugin.json"),
    JSON.stringify({ name: "no-entry", version: "1.0.0", main: "missing.js" })
  );
  const result = await scanPluginDir(tmpDir);
  assert.equal(result.plugins.length, 0);
  assert.equal(result.errors.length, 1);
  assert.ok(result.errors[0].error.includes("entry point not found"));
});

test("discovers multiple plugins", async () => {
  for (const name of ["plugin-a", "plugin-b"]) {
    const d = join(tmpDir, name);
    await mkdir(d);
    await writeFile(join(d, "plugin.json"), JSON.stringify({ name, version: "1.0.0" }));
    await writeFile(join(d, "index.js"), "module.exports = {};");
  }
  const result = await scanPluginDir(tmpDir);
  assert.equal(result.plugins.length, 2);
});
