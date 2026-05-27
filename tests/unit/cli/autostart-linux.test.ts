import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

let tmpDir: string;
let origHome: string | undefined;

test.before(() => {
  tmpDir = mkdtempSync(join(tmpdir(), "omniroute-autostart-linux-"));
  origHome = process.env.HOME;
  process.env.HOME = tmpDir;
});

test.after(() => {
  if (origHome === undefined) delete process.env.HOME;
  else process.env.HOME = origHome;
  try {
    rmSync(tmpDir, { recursive: true, force: true });
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
    assert.match(desktop, /Exec=.*serve --no-open/);
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
