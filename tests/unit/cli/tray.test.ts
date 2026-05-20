import { test } from "node:test";
import assert from "node:assert/strict";
import { buildMenuItems, isTraySupported } from "../../../bin/cli/tray/tray.ts";

test("buildMenuItems contains expected entries", () => {
  const items = buildMenuItems({ port: 20128, autostartEnabled: false });
  const titles = items.map((i) => i.title);
  assert.ok(titles.includes("Open OmniRoute Dashboard"), "has Open entry");
  assert.ok(
    titles.some((t) => t.startsWith("Port: 20128")),
    "shows port"
  );
  assert.ok(titles.includes("Enable Autostart"), "shows toggle when disabled");
  assert.ok(titles.includes("Quit OmniRoute"), "has quit");
});

test("buildMenuItems shows Disable Autostart when enabled", () => {
  const items = buildMenuItems({ port: 3000, autostartEnabled: true });
  const titles = items.map((i) => i.title);
  assert.ok(titles.includes("Disable Autostart"));
  assert.ok(!titles.includes("Enable Autostart"));
});

test("isTraySupported returns false on linux without DISPLAY", () => {
  if (process.platform !== "linux") return;
  const originalDisplay = process.env.DISPLAY;
  delete process.env.DISPLAY;
  try {
    assert.equal(isTraySupported(), false);
  } finally {
    if (originalDisplay) process.env.DISPLAY = originalDisplay;
  }
});
