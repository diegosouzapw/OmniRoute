import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

let tmpDir: string;
let origHome: string | undefined;
let origPath: string | undefined;

/**
 * Redirecting HOME is NOT enough to isolate this test.
 *
 * `disableLinux()` runs `systemctl --user disable --now omniroute.service` and
 * `enableLinux()` runs `systemctl --user enable` + `start`. `systemctl --user`
 * talks to the caller's systemd bus via XDG_RUNTIME_DIR and does not care about
 * HOME, so on any Linux developer machine that actually runs omniroute as a user
 * service these tests stopped and disabled the REAL service — repeatedly, since
 * the pair enable()/disable() ping-pongs it. Symptom: an ordered `Stopped` that
 * `Restart=always` will not recover from, plus a silently `disabled` unit.
 *
 * Fix: shadow `systemctl` and `loginctl` with stubs that always fail, so
 * `isSystemdUserAvailable()` returns false and the whole systemd branch is
 * skipped. The XDG desktop-file branch still runs and IS isolated by HOME, so
 * the test keeps its coverage.
 */
function installSystemctlStubs(binDir: string): void {
  mkdirSync(binDir, { recursive: true });
  for (const name of ["systemctl", "loginctl"]) {
    const stub = join(binDir, name);
    writeFileSync(stub, "#!/bin/sh\nexit 1\n", { mode: 0o755 });
  }
}

test.before(() => {
  tmpDir = mkdtempSync(join(tmpdir(), "omniroute-autostart-linux-"));
  origHome = process.env.HOME;
  process.env.HOME = tmpDir;
  origPath = process.env.PATH;
  const stubBin = join(tmpDir, "stub-bin");
  installSystemctlStubs(stubBin);
  process.env.PATH = `${stubBin}:${origPath ?? ""}`;
});

test.after(() => {
  if (origHome === undefined) delete process.env.HOME;
  else process.env.HOME = origHome;
  if (origPath === undefined) delete process.env.PATH;
  else process.env.PATH = origPath;
  try {
    rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {}
});

test("resolveCliPath finds omniroute.mjs from argv", async () => {
  const { enable, disable, getAutostartStatus } =
    await import("../../../bin/cli/tray/autostart.mjs");
  if (process.platform !== "linux") return;

  const ok = enable();
  assert.equal(typeof ok, "boolean");

  const unitPath = join(tmpDir, ".config", "systemd", "user", "omniroute.service");
  const desktopPath = join(tmpDir, ".config", "autostart", "omniroute.desktop");

  const status = getAutostartStatus();
  assert.equal(typeof status.enabled, "boolean");

  if (existsSync(unitPath)) {
    const unit = readFileSync(unitPath, "utf8");
    assert.match(unit, /^\[Unit\]/m);
    assert.match(unit, /ExecStart=.*omniroute\.mjs.*serve --no-open/m);
    assert.doesNotMatch(unit, /--tray/);
  }

  if (existsSync(desktopPath)) {
    const desktop = readFileSync(desktopPath, "utf8");
    assert.match(desktop, /Exec=.*serve --no-open --tray/);
    assert.match(desktop, /Terminal=false/);
  }

  disable();
  assert.equal(getAutostartStatus().enabled, false);
});

test("Linux autostart invokes loginctl/systemctl without shell interpolation", () => {
  const source = readFileSync(join(process.cwd(), "bin/cli/tray/autostart.mjs"), "utf8");

  assert.match(source, /execFileSync\("systemctl", \["--user", \.\.\.args\]/);
  assert.match(source, /execFileSync\("loginctl", \["enable-linger", user\]/);
  assert.match(source, /execFileSync\("loginctl", \["show-user", user, "-p", "Linger"\]/);
  assert.doesNotMatch(source, /ignoreFailure\s*\?\s*false\s*:\s*false/);
  assert.doesNotMatch(source, /execSync\(`(?:loginctl|systemctl)\b/);
});

test("Linux enable path prefers graphical desktop autostart over systemd", () => {
  const source = readFileSync(join(process.cwd(), "bin/cli/tray/autostart.mjs"), "utf8");
  const graphicalBranch = source.indexOf("if (graphicalSession)");
  const systemdBranch = source.indexOf("} else if (systemdAvailable)");

  assert.ok(graphicalBranch > -1, "expected a graphical-session branch");
  assert.ok(systemdBranch > -1, "expected a systemd fallback branch");
  assert.ok(graphicalBranch < systemdBranch, "graphical autostart should be preferred");
});

test("systemd branch writes Type=notify sd_notify directives (headless, stubs succeed)", async () => {
  if (process.platform !== "linux") return;
  const stubBin = join(tmpDir, "stub-bin");
  const unitPath = join(tmpDir, ".config", "systemd", "user", "omniroute.service");
  const envKeys = ["DISPLAY", "WAYLAND_DISPLAY", "XDG_CURRENT_DESKTOP"] as const;
  const savedEnv: Record<string, string | undefined> = {};
  for (const key of envKeys) savedEnv[key] = process.env[key];

  try {
    for (const key of envKeys) delete process.env[key];
    for (const name of ["systemctl", "loginctl"]) {
      writeFileSync(join(stubBin, name), "#!/bin/sh\nexit 0\n", { mode: 0o755 });
    }
    // autostart.mjs reads process.env / runs the stubs at call time, so a
    // cached module is fine.
    const { enable } = await import("../../../bin/cli/tray/autostart.mjs");

    const ok = enable();
    assert.equal(ok, true, "enable() should succeed through the systemd branch");
    assert.ok(existsSync(unitPath), "systemd unit should be written");

    const unit = readFileSync(unitPath, "utf8");
    assert.match(unit, /Type=notify/);
    assert.match(unit, /NotifyAccess=all/);
    assert.match(unit, /WatchdogSec=180/);
    assert.match(unit, /TimeoutStartSec=300/);
    assert.match(unit, /Restart=on-failure/);
  } finally {
    for (const key of envKeys) {
      if (savedEnv[key] === undefined) delete process.env[key];
      else process.env[key] = savedEnv[key];
    }
    for (const name of ["systemctl", "loginctl"]) {
      writeFileSync(join(stubBin, name), "#!/bin/sh\nexit 1\n", { mode: 0o755 });
    }
  }
});
