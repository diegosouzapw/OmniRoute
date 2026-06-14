import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, mkdtempSync, mkdirSync, existsSync, statSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const update = await import("../../bin/cli/commands/update.mjs");

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const REAL_VERSION = JSON.parse(
  readFileSync(path.join(REPO_ROOT, "package.json"), "utf-8")
).version;

// #3295 issue 1: getCurrentVersion() must resolve package.json relative to the
// script, not process.cwd(). When OmniRoute is installed globally, the user's
// cwd is not the package root, so a cwd-relative lookup returns null →
// "Could not determine current version".
test("getCurrentVersion resolves the real version from a foreign cwd (#3295)", async () => {
  const originalCwd = process.cwd();
  const foreignCwd = mkdtempSync(path.join(tmpdir(), "omniroute-cwd-"));
  try {
    process.chdir(foreignCwd); // no package.json here → cwd-relative lookup would fail
    const version = await update.getCurrentVersion();
    assert.equal(version, REAL_VERSION);
  } finally {
    process.chdir(originalCwd);
    rmSync(foreignCwd, { recursive: true, force: true });
  }
});

// #3295 issue 2: createBackup() must (a) resolve bin/ relative to the script,
// and (b) copy the "cli" directory recursively. The old copyFileSync(dir) threw
// EISDIR which the outer catch swallowed → "Failed to create backup. Aborting".
test("createBackup resolves bin/ from a foreign cwd and copies cli/ recursively (#3295)", async () => {
  const originalCwd = process.cwd();
  const originalHome = process.env.HOME;
  const foreignCwd = mkdtempSync(path.join(tmpdir(), "omniroute-cwd-"));
  const fakeHome = mkdtempSync(path.join(tmpdir(), "omniroute-home-"));
  try {
    process.chdir(foreignCwd); // no bin/ here → cwd-relative binPath would be missing
    process.env.HOME = fakeHome; // redirect ~/.omniroute/backups
    mkdirSync(fakeHome, { recursive: true });

    const backupDir = await update.createBackup();

    assert.ok(backupDir, "createBackup must return a path (not null)");
    // omniroute.mjs is a real file in bin/ and must be copied
    assert.ok(existsSync(path.join(backupDir, "omniroute.mjs")), "omniroute.mjs copied");
    // "cli" is a directory — it must be copied recursively, not throw EISDIR
    const cliBackup = path.join(backupDir, "cli");
    assert.ok(existsSync(cliBackup), "cli/ directory copied");
    assert.ok(statSync(cliBackup).isDirectory(), "cli/ backup is a directory");
    assert.ok(
      existsSync(path.join(cliBackup, "commands")),
      "cli/ contents copied recursively"
    );
  } finally {
    process.chdir(originalCwd);
    if (originalHome === undefined) delete process.env.HOME;
    else process.env.HOME = originalHome;
    rmSync(foreignCwd, { recursive: true, force: true });
    rmSync(fakeHome, { recursive: true, force: true });
  }
});
