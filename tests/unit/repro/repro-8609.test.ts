import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

test("characterize: trayWindows.mjs initWinTray writes a temp .ps1 (old behavior)", async () => {
  const { initWinTray } = await import("../../../bin/cli/tray/trayWindows.mjs");
  const ORIG_PLATFORM = Object.getOwnPropertyDescriptor(process, "platform");
  Object.defineProperty(process, "platform", { value: "win32", configurable: true });
  const cleanup = () => {
    if (ORIG_PLATFORM) Object.defineProperty(process, "platform", ORIG_PLATFORM);
  };
  try {
    const proc = initWinTray({ port: 8609, onQuit() {}, onOpenDashboard() {}, onShowLogs() {} });
    if (proc && typeof proc.on === "function") proc.on("error", () => {});
    const scripts = readdirSync(tmpdir()).filter((f) => f.startsWith("omniroute-tray-") && f.endsWith(".ps1"));
    assert.ok(scripts.length > 0, "initWinTray creates a temp .ps1 (expected — that is the Norton trigger)");
    const content = readFileSync(join(tmpdir(), scripts[0]), "utf8");
    assert.ok(content.includes("System.Windows.Forms.NotifyIcon"), "temp .ps1 uses WinForms tray");
  } finally {
    cleanup();
  }
});

test("REGRESSION GUARD: index.mjs no longer imports or calls the PowerShell tray (#8609)", () => {
  const source = readFileSync(join(process.cwd(), "bin/cli/tray/index.mjs"), "utf8");
  assert.ok(!source.includes("trayWindows"), "index.mjs must not import trayWindows.mjs");
  assert.ok(!source.includes("initWinTray"), "index.mjs must not reference initWinTray");
  assert.ok(!source.includes("killWinTray"), "index.mjs must not reference killWinTray");
  assert.ok(source.includes("initSystrayUnix"), "index.mjs must still import initSystrayUnix");
});
