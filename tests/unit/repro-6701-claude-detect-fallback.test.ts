/**
 * Repro for #6701 — Claude Code CLI reported "not found" in OmniRoute's
 * dashboard even though the user has used it before (settings.json present)
 * and upstream 9router (same machine, same settings.json) reports it as
 * "Connected".
 *
 * Root cause: `getCliRuntimeStatus()` in src/shared/services/cliRuntime.ts
 * only ever answers `installed` from binary resolution (known install paths
 * + PATH lookup via `where.exe`/`command -v`). If the CLI binary is not
 * currently resolvable (stale PATH inherited by a long-running/background
 * OmniRoute process, binary moved, etc.) it unconditionally reports
 * installed:false — even when `~/.claude/settings.json` proves the tool was
 * installed and used before.
 *
 * Upstream 9router's equivalent route (src/app/api/cli-tools/claude-settings/route.js)
 * has a second-chance fallback: if `where`/`which` fails, it still reports
 * installed:true when the settings file exists on disk. OmniRoute's rewrite
 * into cliRuntime.ts dropped that fallback, which is the concrete regression
 * relative to 9router this issue's screenshots capture.
 *
 * This test forces the binary lookup to fail deterministically (CLI_CLAUDE_BIN
 * pointed at a path that does not exist) while a real settings.json sits under
 * an isolated CLI_CONFIG_HOME. Expected (post-fix, 9router-parity) behavior:
 * installed should stay true because the settings file is present. Current
 * code returns installed:false / reason:"not_found" — this is the RED proof.
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { getCliRuntimeStatus } = await import("../../src/shared/services/cliRuntime.ts");

describe("#6701 — claude detection should fall back to settings.json when binary is unresolvable", () => {
  let configHome: string;
  const prevBin = process.env.CLI_CLAUDE_BIN;
  const prevConfigHome = process.env.CLI_CONFIG_HOME;

  before(() => {
    // Isolated config home *within* os.homedir() (CLI_CONFIG_HOME validation
    // requires this) so we never touch the real ~/.claude directory.
    configHome = fs.mkdtempSync(path.join(os.homedir(), ".omniroute-test-6701-"));
    const claudeDir = path.join(configHome, ".claude");
    fs.mkdirSync(claudeDir, { recursive: true });
    fs.writeFileSync(
      path.join(claudeDir, "settings.json"),
      JSON.stringify({ env: { ANTHROPIC_BASE_URL: "http://localhost:20128" } }, null, 2)
    );

    // Force the binary lookup to fail deterministically regardless of host state.
    process.env.CLI_CLAUDE_BIN = path.join(os.tmpdir(), "definitely-not-a-real-claude-binary-6701");
    process.env.CLI_CONFIG_HOME = configHome;
  });

  after(() => {
    fs.rmSync(configHome, { recursive: true, force: true });
    if (prevBin === undefined) delete process.env.CLI_CLAUDE_BIN;
    else process.env.CLI_CLAUDE_BIN = prevBin;
    if (prevConfigHome === undefined) delete process.env.CLI_CONFIG_HOME;
    else process.env.CLI_CONFIG_HOME = prevConfigHome;
  });

  it("reports installed:true when settings.json exists, even if the binary can't be resolved", async () => {
    const result = await getCliRuntimeStatus("claude");

    assert.equal(
      result.installed,
      true,
      `Expected installed:true (9router-parity settings.json fallback), got installed:${result.installed} reason:${result.reason}`
    );
  });
});
