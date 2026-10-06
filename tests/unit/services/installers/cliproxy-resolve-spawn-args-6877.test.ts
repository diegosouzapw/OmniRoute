/**
 * Regression test for #6877 — cliproxy resolveSpawnArgs() must:
 *   (a) invoke the real CLIProxyAPI binary with the long-form `--config` flag
 *       (the short `-c` flag is not recognized by the upstream binary and
 *       silently falls back to its own default config, ignoring ours), and
 *   (b) never clobber an existing config.yaml — only write the default
 *       template the first time the file does not exist yet.
 *
 * Unlike the pre-existing tests/unit/services/installers/cliproxy.test.ts
 * (which only re-asserts string literals and never calls the real function),
 * this test imports and calls the real resolveSpawnArgs() against a real
 * temp-directory filesystem.
 */

import { describe, it, beforeEach, after, mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

function createTempDataDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cliproxy-6877-"));
}

// DATA_DIR is captured into a module-level const the *first* time
// src/lib/db/core.ts (transitively imported by cliproxy.ts) is loaded, and
// dynamic import() results are cached per resolved URL for the lifetime of
// the process — so the env var must be pinned to one fixed temp dir BEFORE
// the module is imported for the first time. Each test then resets the
// *contents* of that same directory rather than re-pointing DATA_DIR.
const FIXED_DATA_DIR = createTempDataDir();
process.env.DATA_DIR = FIXED_DATA_DIR;

after(() => {
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  fs.rmSync(FIXED_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

describe("resolveSpawnArgs (#6877 — real filesystem)", () => {
  const dataDir = FIXED_DATA_DIR;

  beforeEach(() => {
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.mkdirSync(dataDir, { recursive: true });
  });

  it("uses the --config long flag and never the -c short flag", async () => {
    const { resolveSpawnArgs } =
      await import("../../../../src/lib/services/installers/cliproxy.ts");

    const port = 8317;
    const result = resolveSpawnArgs(port);

    const configPath = path.join(dataDir, "services", "cliproxy", "config.yaml");

    assert.deepEqual(result.args, ["--config", configPath]);
    assert.equal(
      result.command,
      path.join(dataDir, "bin", process.platform === "win32" ? "cliproxyapi.exe" : "cliproxyapi")
    );
    assert.ok(!result.args.includes("-c"), "args must never contain the short -c flag");
  });
  it("injects the management password without persisting it in config.yaml", async () => {
    const { resolveSpawnArgs } =
      await import("../../../../src/lib/services/installers/cliproxy.ts");
    const result = resolveSpawnArgs(8317, "management-secret");
    assert.equal(result.env.MANAGEMENT_PASSWORD, "management-secret");
    const configPath = path.join(dataDir, "services", "cliproxy", "config.yaml");
    assert.equal(fs.readFileSync(configPath, "utf8").includes("management-secret"), false);
  });

  it("uses the .exe command name on Windows", async () => {
    // resolveSpawnArgs reads os.platform() at call time (#11236 — a
    // process.platform literal is constant-folded away by the Linux build of
    // the published artifact), so the Windows host is simulated through the
    // same runtime os.platform() seam binaryManager.test.ts uses for #10244.
    const platformMock = mock.method(os, "platform", () => "win32");

    try {
      const { resolveSpawnArgs } =
        await import("../../../../src/lib/services/installers/cliproxy.ts");
      const result = resolveSpawnArgs(8317);

      assert.equal(result.command, path.join(dataDir, "bin", "cliproxyapi.exe"));
    } finally {
      platformMock.mock.restore();
    }
  });

  it("writes the default config.yaml template when none exists yet", async () => {
    const { resolveSpawnArgs } =
      await import("../../../../src/lib/services/installers/cliproxy.ts");

    const port = 9123;
    const result = resolveSpawnArgs(port);

    const configPath = path.join(dataDir, "services", "cliproxy", "config.yaml");
    assert.equal(result.args[1], configPath);
    assert.ok(fs.existsSync(configPath), "config.yaml must be created on first run");

    const content = fs.readFileSync(configPath, "utf8");
    assert.equal(content, `port: ${port}\nhost: 127.0.0.1\nlog_level: warn\n`);
  });

  it("preserves a pre-existing config.yaml byte-for-byte instead of overwriting it", async () => {
    const { resolveSpawnArgs } =
      await import("../../../../src/lib/services/installers/cliproxy.ts");

    const configDir = path.join(dataDir, "services", "cliproxy");
    fs.mkdirSync(configDir, { recursive: true });
    const configPath = path.join(configDir, "config.yaml");
    const customContent =
      "port: 8317\nhost: 0.0.0.0\nlog_level: debug\n# hand-edited by the operator\napi-keys:\n  - custom-key\n";
    fs.writeFileSync(configPath, customContent, "utf8");

    resolveSpawnArgs(8317);

    const contentAfter = fs.readFileSync(configPath, "utf8");
    assert.equal(
      contentAfter,
      customContent,
      "resolveSpawnArgs must not clobber an existing, operator-customized config.yaml"
    );
  });
});
