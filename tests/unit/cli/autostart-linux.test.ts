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
