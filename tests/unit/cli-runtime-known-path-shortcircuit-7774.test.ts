import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// HOME must be overridden BEFORE importing cliRuntime.ts — the module computes
// EXPECTED_PARENT_PATHS (the known-path realpath containment check) once at
// import time from os.homedir().
const fakeHome = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7774-home-"));
const realBinDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7774-realbin-"));

const savedEnv: Record<string, string | undefined> = {
  HOME: process.env.HOME,
  USERPROFILE: process.env.USERPROFILE,
  PATH: process.env.PATH,
  CLI_CLAUDE_BIN: process.env.CLI_CLAUDE_BIN,
  CLI_EXTRA_PATHS: process.env.CLI_EXTRA_PATHS,
  npm_config_prefix: process.env.npm_config_prefix,
};

process.env.HOME = fakeHome;
process.env.USERPROFILE = fakeHome;
delete process.env.CLI_CLAUDE_BIN;
delete process.env.CLI_EXTRA_PATHS;
process.env.npm_config_prefix = path.join(fakeHome, "npm-prefix-unused");

const { getCliRuntimeStatus, getKnownToolPaths } = await import(
  "../../src/shared/services/cliRuntime.ts"
);

function makeExecutable(filePath: string, content: string) {
  fs.writeFileSync(filePath, content);
  if (process.platform !== "win32") fs.chmodSync(filePath, 0o755);
}

describe("#7774 — known-path short-circuit hides a genuinely runnable Claude binary", () => {
  before(() => {
    const poisonedCandidate = path.join(fakeHome, ".local", "bin", "claude");
    fs.mkdirSync(poisonedCandidate, { recursive: true });

    const known = getKnownToolPaths("claude");
    assert.ok(known.includes(poisonedCandidate));

    const realClaude = path.join(realBinDir, "claude");
    makeExecutable(realClaude, "#!/bin/sh\necho '2.1.215 (Claude Code)'\n");
    // Prepend realBinDir rather than replacing PATH outright — locateCommand()
    // spawns `sh`/`where.exe` itself using this same PATH, so the standard
    // system bin dirs (containing `sh`) must stay resolvable too.
    process.env.PATH = [realBinDir, savedEnv.PATH].filter(Boolean).join(path.delimiter);
  });

  after(() => {
    for (const [key, value] of Object.entries(savedEnv)) {
      if (value === undefined) delete (process.env as Record<string, string | undefined>)[key];
      else process.env[key] = value;
    }
    fs.rmSync(fakeHome, { recursive: true, force: true });
    fs.rmSync(realBinDir, { recursive: true, force: true });
  });

  it("should still find and report Claude as installed+runnable via PATH fallback", async () => {
    const result = await getCliRuntimeStatus("claude");
    assert.equal(result.installed, true, `expected installed=true, got reason=${result.reason}`);
    assert.equal(result.runnable, true, `expected runnable=true, got reason=${result.reason}`);
  });
});
