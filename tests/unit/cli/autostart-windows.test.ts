import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

let tmpDir: string;
let origAppData: string | undefined;

test.before(() => {
  tmpDir = mkdtempSync(join(tmpdir(), "omniroute-autostart-win-"));
  origAppData = process.env.APPDATA;
  process.env.APPDATA = tmpDir;
});

test.after(() => {
  if (origAppData === undefined) delete process.env.APPDATA;
  else process.env.APPDATA = origAppData;
  try {
    rmSync(tmpDir, { recursive: true, force: true });
  } catch {}
});

// ---------------------------------------------------------------------------
// Integration test — runs only on win32 because enable() dispatches on
// process.platform. Sets APPDATA to a temp dir so the VBS is written to a
// clean, disposable Startup folder.
// ---------------------------------------------------------------------------

test("Windows enable/disable writes and removes VBS in Startup folder", async () => {
  if (process.platform !== "win32") return;

  const { enable, disable, isAutostartEnabled } =
    await import("../../../bin/cli/tray/autostart.mjs");

  const startupDir = join(tmpDir, "Microsoft", "Windows", "Start Menu", "Programs", "Startup");
  const vbsPath = join(startupDir, "OmniRoute.vbs");

  // Should start clean.
  assert.equal(existsSync(vbsPath), false);

  const ok = enable();
  assert.equal(typeof ok, "boolean");
  assert.equal(ok, true);

  // VBS file must exist with correct content.
  assert.equal(existsSync(vbsPath), true);
  const vbs = readFileSync(vbsPath, "utf8");
  assert.match(vbs, /WScript\.Shell/, "creates WScript.Shell COM object");
  assert.match(vbs, /WshShell\.Run/, "calls Run method");
  assert.match(vbs, /serve --no-open --tray/, "launches OmniRoute tray server");
  assert.match(vbs, /, 0, False/, "uses SW_HIDE (0) and no wait");
  assert.equal(vbs.endsWith("\n"), true, "trailing newline");

  assert.equal(isAutostartEnabled(), true);

  // Disable and verify cleanup.
  const disabled = disable();
  assert.equal(typeof disabled, "boolean");
  assert.equal(disabled, true);
  assert.equal(existsSync(vbsPath), false);
  assert.equal(isAutostartEnabled(), false);
});

// ---------------------------------------------------------------------------
// Source-level assertions (run on any platform) — verify the implementation
// uses the VBS Startup-folder approach instead of the old Registry Run key.
// Mirrors the pattern used by autostart-linux.test.ts and
// autostart-macos-launchctl.test.ts.
// ---------------------------------------------------------------------------

test("Windows enableWin writes VBS to Startup folder, not reg add", () => {
  const source = readFileSync(join(process.cwd(), "bin/cli/tray/autostart.mjs"), "utf8");

  // Helper functions for the new VBS approach.
  assert.match(source, /winStartupDir/);
  assert.match(source, /winStartupPath/);
  assert.match(source, /buildWinVbsContent/);

  // VBS-runner scaffolding.
  assert.match(source, /WScript\.Shell/);
  assert.match(source, /WshShell\.Run/);

  // The old approach used `reg add ... /v WIN_REG_VALUE`.
  assert.doesNotMatch(source, /reg add.*WIN_REG_VALUE/);
});

test("Windows disableWin deletes VBS and cleans legacy registry", () => {
  const source = readFileSync(join(process.cwd(), "bin/cli/tray/autostart.mjs"), "utf8");

  assert.match(source, /unlinkSync\(vbsPath\)/);
  assert.match(source, /cleanLegacyWinReg\(\)/);
});

test("Windows isEnabledWin checks VBS first, falls back to legacy reg", () => {
  const source = readFileSync(join(process.cwd(), "bin/cli/tray/autostart.mjs"), "utf8");

  // Primary check is VBS file existence.
  assert.match(source, /existsSync\(vbsPath\)/);

  // Fallback for users still on the old Registry Run key.
  assert.match(source, /reg query.*WIN_REG_VALUE/);
});
