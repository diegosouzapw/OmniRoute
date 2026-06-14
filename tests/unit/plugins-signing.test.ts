import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-signing-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const hooks = await import("../../src/lib/plugins/hooks.ts");

function writePlugin(dir: string, name: string, source: string, integrity?: string) {
  const pluginDir = path.join(dir, name);
  fs.mkdirSync(pluginDir, { recursive: true });
  const manifest: Record<string, unknown> = {
    name,
    version: "1.0.0",
    main: "index.js",
    hooks: { onRequest: true },
    requires: { permissions: [] },
  };
  if (integrity) manifest.integrity = integrity;
  fs.writeFileSync(path.join(pluginDir, "plugin.json"), JSON.stringify(manifest));
  fs.writeFileSync(path.join(pluginDir, "index.js"), source);
  return { pluginDir, dir };
}

const activeDirs: string[] = [];
function cleanupDirs() {
  for (const d of activeDirs) {
    try { fs.rmSync(d, { recursive: true, force: true }); } catch {}
  }
  activeDirs.length = 0;
}

test.beforeEach(() => {
  core.resetDbInstance();
  hooks.resetHooks();
  cleanupDirs();
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  cleanupDirs();
  try { fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true }); } catch {}
});

test("computeIntegrity returns correct format", async () => {
  const loader = await import("../../src/lib/plugins/loader.ts");
  const hash = loader.computeIntegrity("module.exports = {}");
  assert.match(hash, /^sha256-[A-Za-z0-9+/=]+$/);
});

test("computeIntegrity is deterministic", async () => {
  const loader = await import("../../src/lib/plugins/loader.ts");
  const h1 = loader.computeIntegrity("console.log('hello')");
  const h2 = loader.computeIntegrity("console.log('hello')");
  assert.equal(h1, h2);
});

test("computeIntegrity differs for different content", async () => {
  const loader = await import("../../src/lib/plugins/loader.ts");
  const h1 = loader.computeIntegrity("aaa");
  const h2 = loader.computeIntegrity("bbb");
  assert.notEqual(h1, h2);
});

test("valid integrity passes loading", async () => {
  const loader = await import("../../src/lib/plugins/loader.ts");
  const source = "module.exports.onRequest = function(ctx) {}";
  const hash = loader.computeIntegrity(source);
  const { pluginDir, dir } = writePlugin(TEST_DATA_DIR, "sign-ok", source, hash);
  activeDirs.push(dir);

  const manifestMod = await import("../../src/lib/plugins/manifest.ts");
  const manifest = manifestMod.applyDefaults(
    JSON.parse(fs.readFileSync(path.join(pluginDir, "plugin.json"), "utf-8"))
  );

  const loaded = await loader.loadPlugin(path.join(pluginDir, "index.js"), manifest);
  assert.ok(loaded.plugin, "should load successfully");
  loaded.cleanup();
});

test("mismatched integrity throws", async () => {
  const loader = await import("../../src/lib/plugins/loader.ts");
  const source = "module.exports.onRequest = function(ctx) {}";
  const { pluginDir, dir } = writePlugin(TEST_DATA_DIR, "sign-bad", source, "sha256-AAAA");
  activeDirs.push(dir);

  const manifestMod = await import("../../src/lib/plugins/manifest.ts");
  const manifest = manifestMod.applyDefaults(
    JSON.parse(fs.readFileSync(path.join(pluginDir, "plugin.json"), "utf-8"))
  );

  await assert.rejects(
    () => loader.loadPlugin(path.join(pluginDir, "index.js"), manifest),
    /integrity/
  );
});

test("missing integrity field is OK (backward compat)", async () => {
  const loader = await import("../../src/lib/plugins/loader.ts");
  const source = "module.exports.onRequest = function(ctx) {}";
  const { pluginDir, dir } = writePlugin(TEST_DATA_DIR, "sign-none", source);
  activeDirs.push(dir);

  const manifestMod = await import("../../src/lib/plugins/manifest.ts");
  const manifest = manifestMod.applyDefaults(
    JSON.parse(fs.readFileSync(path.join(pluginDir, "plugin.json"), "utf-8"))
  );

  const loaded = await loader.loadPlugin(path.join(pluginDir, "index.js"), manifest);
  assert.ok(loaded.plugin, "should load without integrity field");
  loaded.cleanup();
});
