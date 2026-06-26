// Regression (port of decolua/9router#1606): the SQLite and tray runtime installers
// must persist their package to the user-writable runtime dir's package.json
// (`--save-exact`) instead of using `--no-save`. Both installers write to the SAME
// runtime dir (`~/.omniroute/runtime`), so a `--no-save` install marks the other's
// package as "extraneous" and a later sibling `npm install` prunes it — reproducing
// "No SQLite driver available" after a tray install removes the just-installed
// better-sqlite3. Saving each dep with an exact version keeps both.
//
// Instead of mocking child_process, we put a fake `npm` on PATH that records its
// arguments to a log file and exits 0. This exercises the real spawnSync/execSync
// code path with zero network use.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, mkdirSync, writeFileSync, chmodSync, existsSync, readFileSync } from "node:fs";
import { join, delimiter } from "node:path";
import { tmpdir } from "node:os";

let tmpDir: string;
let binDir: string;
let logFile: string;
const original = {
  DATA_DIR: process.env.DATA_DIR,
  HOME: process.env.HOME,
  PATH: process.env.PATH,
};

function setup(): void {
  tmpDir = mkdtempSync(join(tmpdir(), "omniroute-runtime-deps-"));
  binDir = join(tmpDir, "bin");
  logFile = join(tmpDir, "npm-calls.log");
  mkdirSync(binDir, { recursive: true });
  // Fake npm: append its args to the log and succeed without doing anything.
  const npmStub = join(binDir, "npm");
  writeFileSync(npmStub, `#!/bin/sh\necho "$@" >> "${logFile}"\nexit 0\n`);
  chmodSync(npmStub, 0o755);

  // nativeDeps.mjs resolves the runtime dir from DATA_DIR; trayRuntime.ts from HOME.
  process.env.DATA_DIR = tmpDir;
  process.env.HOME = tmpDir;
  process.env.PATH = `${binDir}${delimiter}${original.PATH}`;
}

function teardown(): void {
  for (const [k, v] of Object.entries(original)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
  if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
}

function installLineFor(pkgPrefix: string): string | undefined {
  if (!existsSync(logFile)) return undefined;
  return readFileSync(logFile, "utf8")
    .split("\n")
    .find((line) => line.includes("install") && line.includes(pkgPrefix));
}

test("npmInstallRuntime saves better-sqlite3 with --save-exact (never --no-save)", async (t) => {
  if (process.platform === "win32") return; // sh stub is POSIX-only
  setup();
  t.after(teardown);

  const { npmInstallRuntime } = await import("../../bin/cli/runtime/nativeDeps.mjs");
  const ok = npmInstallRuntime(["better-sqlite3@12.9.0"], { silent: true });
  assert.equal(ok, true, "fake npm should exit 0");

  const line = installLineFor("better-sqlite3");
  assert.ok(line, "expected an npm install for better-sqlite3");
  assert.ok(!line!.includes("--no-save"), "must not use --no-save (prunes sibling runtime dep)");
  assert.ok(line!.includes("--save-exact"), "must persist with --save-exact");
});

test("installSystray saves systray2 with --save-exact (never --no-save)", async (t) => {
  if (process.platform === "win32") return; // loadSystray returns null on win32
  setup();
  t.after(teardown);

  // loadSystray() lazily installs systray2 (when not already present) then tries to
  // import it. The import fails against our fake npm (no real module), returning null —
  // but the fake npm has already recorded the install args, which is what we assert on.
  const { loadSystray } = await import("../../bin/cli/runtime/trayRuntime.ts");
  await loadSystray();

  const line = installLineFor("systray2");
  assert.ok(line, "expected an npm install for systray2");
  assert.ok(!line!.includes("--no-save"), "must not use --no-save (prunes sibling runtime dep)");
  assert.ok(line!.includes("--save-exact"), "must persist with --save-exact");
});
