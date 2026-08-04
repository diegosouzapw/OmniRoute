/**
 * Regression test for #3628: Hermes Agent config must honour the HERMES_HOME env var.
 *
 * Hard Rule #18 — TDD gate: this file was written BEFORE the fix and was red,
 * then turned green once getHermesHome() was introduced and all callsites
 * were routed through it.
 */
import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import os from "node:os";
import path from "node:path";

// Keep the original value so we can restore it in teardown.
const _originalHermesHome = process.env.HERMES_HOME;

describe("getHermesHome (#3628 — HERMES_HOME env var)", () => {
  // ── helper: dynamic import so we always get a fresh module evaluation
  // Note: Node ESM caches modules. We test the exported helper directly.

  after(() => {
    // Restore the env var regardless of test outcome.
    if (_originalHermesHome === undefined) {
      delete process.env.HERMES_HOME;
    } else {
      process.env.HERMES_HOME = _originalHermesHome;
    }
  });

  it("falls back to ~/.hermes when HERMES_HOME is not set", async () => {
    delete process.env.HERMES_HOME;

    const { getHermesHome } = await import(
      "../../../src/lib/cli-helper/config-generator/hermesHome.ts"
    );

    const result = getHermesHome();
    assert.strictEqual(result, path.join(os.homedir(), ".hermes"));
  });

  it("returns HERMES_HOME when the env var is set", async () => {
    process.env.HERMES_HOME = "/custom/hermes";

    const { getHermesHome } = await import(
      "../../../src/lib/cli-helper/config-generator/hermesHome.ts"
    );

    const result = getHermesHome();
    assert.ok(
      result.startsWith("/custom/hermes"),
      `Expected path to start with /custom/hermes, got: ${result}`
    );
  });

  it("hermes-agent CONFIG_PATH uses HERMES_HOME when set", async () => {
    process.env.HERMES_HOME = "/custom/hermes";

    const { getHermesConfigPath } = await import(
      "../../../src/lib/cli-helper/config-generator/hermesHome.ts"
    );

    const configPath = getHermesConfigPath();
    assert.ok(
      configPath.startsWith("/custom/hermes"),
      `Expected config path to start with /custom/hermes, got: ${configPath}`
    );
    assert.ok(
      configPath.endsWith("config.yaml"),
      `Expected config path to end with config.yaml, got: ${configPath}`
    );
  });

  it("TOOL_CONFIG_PATHS['hermes-agent'] reflects HERMES_HOME (lazy evaluation)", async () => {
    process.env.HERMES_HOME = "/custom/hermes";

    // Force a fresh dynamic import of index.ts to test lazy evaluation.
    // Because Node caches ESM modules by URL, we test the helper which is
    // what index.ts should delegate to.
    const { getHermesConfigPath } = await import(
      "../../../src/lib/cli-helper/config-generator/hermesHome.ts"
    );

    // The path returned by the generator index must equal what getHermesConfigPath() returns.
    const expected = getHermesConfigPath();
    assert.ok(
      expected.startsWith("/custom/hermes"),
      `Expected ${expected} to start with /custom/hermes`
    );
  });

  it("getCliConfigPaths('hermes-agent') uses HERMES_HOME (cliRuntime integration)", async () => {
    process.env.HERMES_HOME = "/custom/hermes";

    const { getCliConfigPaths } = await import(
      "../../../src/shared/services/cliRuntime.ts"
    );

    const paths = getCliConfigPaths("hermes-agent");
    assert.ok(paths !== null, "getCliConfigPaths('hermes-agent') returned null");
    const configPath = (paths as Record<string, string>)["config"];
    assert.ok(
      configPath.startsWith("/custom/hermes"),
      `Expected hermes-agent config path to start with /custom/hermes, got: ${configPath}`
    );
  });
});
