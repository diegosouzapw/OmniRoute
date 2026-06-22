// Regression coverage for the systray2 runtime swap (port of upstream PR #1080).
// The bug upstream: the bundled Go binary in node_modules/systray2/traybin
// sometimes ships without the executable bit on macOS/Linux, causing the tray
// to spawn() with EACCES and the icon never to appear.
//
// We can't load the real native binary in unit tests, but we can verify the
// pure helpers that drive the swap: the package + version pin and the
// chmod helper's behavior on a synthetic binary tree.

import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync, statSync, chmodSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  SYSTRAY_PACKAGE,
  SYSTRAY_VERSION,
  chmodSystrayBinAt,
  resolveSystrayBinName,
} from "../../bin/cli/runtime/trayRuntime.ts";

test("systray2 is pinned to a 2.x version (PR #1080 fix)", () => {
  assert.equal(SYSTRAY_PACKAGE, "systray2");
  // The original systray@1.0.5 binary is incompatible with modern macOS dyld;
  // upstream PR #1080 moved to the systray2 2.x line. Pin must stay ≥ 2.x.
  assert.match(SYSTRAY_VERSION, /^2\./, `expected systray2@2.x, got ${SYSTRAY_VERSION}`);
});

test("resolveSystrayBinName returns null on win32 and a *_release name elsewhere", () => {
  assert.equal(resolveSystrayBinName("win32"), null);
  assert.equal(resolveSystrayBinName("darwin"), "tray_darwin_release");
  assert.equal(resolveSystrayBinName("linux"), "tray_linux_release");
});

test("chmodSystrayBinAt sets +x on the bundled tray binary when present", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-systray-bin-"));
  try {
    const platform = process.platform === "win32" ? "linux" : process.platform;
    const binName = resolveSystrayBinName(platform)!;
    const binDir = join(root, "node_modules", "systray2", "traybin");
    mkdirSync(binDir, { recursive: true });
    const binPath = join(binDir, binName);
    writeFileSync(binPath, "#!/bin/sh\nexit 0\n", { mode: 0o644 });
    chmodSync(binPath, 0o644); // explicit: not executable
    const result = chmodSystrayBinAt(root, platform);
    assert.equal(result.changed, true, "expected chmodSystrayBinAt to chmod the bin");
    // 0o111 covers the three execute bits — assert at least one is set.
    const mode = statSync(binPath).mode & 0o777;
    assert.ok((mode & 0o111) !== 0, `expected exec bits on bin, got mode=${mode.toString(8)}`);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("chmodSystrayBinAt is a no-op when the binary doesn't exist", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-systray-bin-"));
  try {
    const result = chmodSystrayBinAt(root, "linux");
    assert.equal(result.changed, false);
    assert.equal(result.reason, "missing");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("chmodSystrayBinAt skips win32 (uses PowerShell tray, no Go binary)", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-systray-bin-"));
  try {
    const result = chmodSystrayBinAt(root, "win32");
    assert.equal(result.changed, false);
    assert.equal(result.reason, "win32-skip");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
