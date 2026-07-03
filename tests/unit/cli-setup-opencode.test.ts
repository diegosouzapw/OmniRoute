/**
 * tests/unit/cli-setup-opencode.test.ts
 *
 * `omniroute setup opencode` wires the bundled @omniroute/opencode-plugin into a
 * local OpenCode install: copies the built plugin into `<config>/plugins/omniroute/`
 * and registers a tuple entry in `opencode.json` (idempotent, replacing the legacy
 * `opencode-omniroute-auth` entry from issue #3711).
 *
 * The command resolves the bundled plugin at module load, so the
 * OMNIROUTE_OPENCODE_PLUGIN_DIR fixture override MUST be set before the import.
 * `opts.configDir` keeps the test off the real OpenCode config dir on every platform.
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const FIXTURE_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omni-oc-setup-"));
const FAKE_PLUGIN_DIR = path.join(FIXTURE_ROOT, "plugin");
const CONFIG_DIR = path.join(FIXTURE_ROOT, "opencode-config");

// Must be set before the module under test is imported (resolved at load time).
process.env.OMNIROUTE_OPENCODE_PLUGIN_DIR = FAKE_PLUGIN_DIR;

const { runSetupOpenCodeCommand } = await import("../../bin/cli/commands/setup-open-code.mjs");

function makeFakePluginDist() {
  fs.mkdirSync(path.join(FAKE_PLUGIN_DIR, "dist"), { recursive: true });
  fs.writeFileSync(
    path.join(FAKE_PLUGIN_DIR, "package.json"),
    JSON.stringify({ name: "@omniroute/opencode-plugin", version: "0.0.0-test" })
  );
  fs.writeFileSync(path.join(FAKE_PLUGIN_DIR, "dist", "index.js"), "export {};\n");
  fs.writeFileSync(path.join(FAKE_PLUGIN_DIR, "dist", "index.cjs"), "module.exports = {};\n");
}

function readConfig() {
  return JSON.parse(fs.readFileSync(path.join(CONFIG_DIR, "opencode.json"), "utf8"));
}

// #5959-class deflake: the command under test prints CLI progress with multi-byte
// glyphs (printInfo/printSuccess "✔"/printError "✖" via console.log). Under the
// node:test runner those stdout writes interleave with the child's V8-serialized
// report frames and can corrupt the stream ("Unable to deserialize cloned data
// due to invalid or unsupported version"). No test here asserts on stdout, so
// silence the stdout-writing console methods for the duration of this file
// (same pattern as tests/unit/cli/setup-claude.test.ts, #6019/#6021).
const _console = { log: console.log, info: console.info, warn: console.warn };

describe("omniroute setup opencode", () => {
  before(() => {
    console.log = () => {};
    console.info = () => {};
    console.warn = () => {};
    makeFakePluginDist();
  });

  after(() => {
    console.log = _console.log;
    console.info = _console.info;
    console.warn = _console.warn;
    try {
      fs.rmSync(FIXTURE_ROOT, { recursive: true, force: true });
    } catch {
      // best-effort temp cleanup
    }
  });

  it("installs the plugin and registers a tuple entry honouring --base-url (camelCased by Commander)", async () => {
    const r = await runSetupOpenCodeCommand({
      configDir: CONFIG_DIR,
      // Commander turns `--base-url` into `baseUrl` — the runner must accept it.
      baseUrl: "http://10.0.0.5:20128",
      nonInteractive: true,
    });
    assert.equal(r.exitCode, 0);

    // dist copied into the OpenCode plugins dir
    assert.ok(fs.existsSync(path.join(CONFIG_DIR, "plugins", "omniroute", "dist", "index.js")));
    assert.ok(fs.existsSync(path.join(CONFIG_DIR, "plugins", "omniroute", "package.json")));

    const cfg = readConfig();
    assert.ok(Array.isArray(cfg.plugin));
    assert.equal(cfg.plugin.length, 1);
    const [modulePath, options] = cfg.plugin[0];
    assert.equal(modulePath, "./plugins/omniroute/dist/index.js");
    assert.equal(options.providerId, "omniroute");
    assert.equal(
      options.baseURL,
      "http://10.0.0.5:20128",
      "--base-url flag must reach the registered entry"
    );
  });

  it("is idempotent: re-running updates the entry in place instead of duplicating it", async () => {
    const r = await runSetupOpenCodeCommand({
      configDir: CONFIG_DIR,
      baseUrl: "http://10.0.0.9:20128",
      nonInteractive: true,
    });
    assert.equal(r.exitCode, 0);

    const cfg = readConfig();
    const omniEntries = cfg.plugin.filter(
      (p: unknown) =>
        Array.isArray(p) && (p[1] as { providerId?: string })?.providerId === "omniroute"
    );
    assert.equal(omniEntries.length, 1, "re-run must not duplicate the entry");
    assert.equal(
      omniEntries[0][1].baseURL,
      "http://10.0.0.9:20128",
      "re-run updates baseURL in place"
    );
  });

  it("removes the legacy opencode-omniroute-auth entry (#3711) and preserves unrelated plugins", async () => {
    const cfgPath = path.join(CONFIG_DIR, "opencode.json");
    fs.writeFileSync(
      cfgPath,
      JSON.stringify({
        plugin: [
          "opencode-omniroute-auth",
          ["./plugins/other/dist/index.js", { providerId: "other" }],
        ],
      })
    );

    const r = await runSetupOpenCodeCommand({ configDir: CONFIG_DIR, nonInteractive: true });
    assert.equal(r.exitCode, 0);

    const cfg = readConfig();
    const flat = JSON.stringify(cfg.plugin);
    assert.ok(!flat.includes("opencode-omniroute-auth"), "legacy entry must be dropped");
    assert.ok(flat.includes('"providerId":"other"'), "unrelated plugin entries must survive");
    assert.equal(cfg.plugin.length, 2, "other + omniroute");
  });

  it("fails with a clear error (exit 1) when the bundled plugin dist is missing", async () => {
    fs.rmSync(path.join(FAKE_PLUGIN_DIR, "dist"), { recursive: true, force: true });
    try {
      const r = await runSetupOpenCodeCommand({ configDir: CONFIG_DIR, nonInteractive: true });
      assert.equal(r.exitCode, 1);
    } finally {
      makeFakePluginDist();
    }
  });
});
