import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

/**
 * Static scan, not behavior: a new `setup-*` command that writes a CLI-tool
 * config must not silently no-op inside the OmniRoute container. Anything that
 * writes has to route through the container guard first.
 */

const COMMANDS_DIR = path.join(process.cwd(), "bin/cli/commands");
const WRITE_CALLS = /\b(writeFileSync|writeAtomic|cpSync|copyFileSync|renameSync)\s*\(/;
const GUARD_CALL = /guardHostConfigTarget\s*\(/;

/**
 * Commands whose writes never target a host CLI's own config (they write to a
 * user-chosen --out path, OmniRoute's own data dir, etc.). Keep this list tiny
 * and justified — an entry here is an opt-out from the guard.
 */
const NOT_CLI_TOOL_CONFIG = new Set<string>([]);

function setupCommandFiles(): string[] {
  return fs
    .readdirSync(COMMANDS_DIR)
    .filter((name) => name.startsWith("setup-") && name.endsWith(".mjs"))
    .sort();
}

test("every setup-* command that writes files calls the container guard", () => {
  const offenders: string[] = [];

  for (const name of setupCommandFiles()) {
    if (NOT_CLI_TOOL_CONFIG.has(name)) continue;
    const source = fs.readFileSync(path.join(COMMANDS_DIR, name), "utf8");
    if (!WRITE_CALLS.test(source)) continue;
    if (!GUARD_CALL.test(source)) offenders.push(name);
  }

  assert.deepEqual(
    offenders,
    [],
    `these setup-* commands write config without guardHostConfigTarget(): ${offenders.join(", ")}`
  );
});

test("every guarded setup-* command exposes --allow-container-write", () => {
  const offenders: string[] = [];

  for (const name of setupCommandFiles()) {
    const source = fs.readFileSync(path.join(COMMANDS_DIR, name), "utf8");
    if (!GUARD_CALL.test(source)) continue;
    if (!source.includes("--allow-container-write")) offenders.push(name);
  }

  assert.deepEqual(offenders, [], `missing the --allow-container-write escape hatch: ${offenders}`);
});

test("the scan actually sees the commands it is meant to protect", () => {
  const files = setupCommandFiles();
  assert.ok(files.length >= 12, `expected the setup-* family, found ${files.length}`);
  for (const expected of ["setup-codex.mjs", "setup-claude.mjs", "setup-crush.mjs"]) {
    assert.ok(files.includes(expected), `${expected} should be scanned`);
  }
});

test("config set and configure are guarded too", () => {
  for (const name of ["config.mjs", "configure.mjs"]) {
    const source = fs.readFileSync(path.join(COMMANDS_DIR, name), "utf8");
    assert.match(source, GUARD_CALL, `${name} should call the container guard`);
    assert.ok(
      source.includes("--allow-container-write"),
      `${name} should expose --allow-container-write`
    );
  }
});
