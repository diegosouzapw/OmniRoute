import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";

import { chooseDataDir } from "../../bin/cli/data-dir.mjs";

// #4597 — The CLI data-dir resolver picked XDG before checking an existing legacy
// ~/.omniroute, while the server (src/lib/dataPaths.ts getDefaultDataDir) preserves
// the legacy directory first. On a machine with XDG_CONFIG_HOME set AND an existing
// ~/.omniroute/storage.sqlite, the server opened the legacy DB but CLI maintenance
// commands (reset-password, sqlite) operated on the XDG DB — silent drift. These
// tests pin the CLI precedence to the server's: DATA_DIR → legacy-if-exists →
// Windows → XDG → legacy.

const HOME = "/home/tester";
const LEGACY = path.join(HOME, ".omniroute");

test("DATA_DIR always wins (highest precedence)", () => {
  const dir = chooseDataDir({
    dataDirEnv: "/custom/data",
    platform: "linux",
    xdgConfigHome: "/home/tester/.config",
    homeDir: HOME,
    legacyExists: true,
  });
  assert.equal(dir, path.resolve("/custom/data"));
});

test("existing legacy ~/.omniroute is preserved before XDG (the bug)", () => {
  const dir = chooseDataDir({
    dataDirEnv: undefined,
    platform: "linux",
    xdgConfigHome: "/home/tester/.config",
    homeDir: HOME,
    legacyExists: true,
  });
  assert.equal(dir, LEGACY);
});

test("XDG is used only when no legacy directory exists", () => {
  const dir = chooseDataDir({
    dataDirEnv: undefined,
    platform: "linux",
    xdgConfigHome: "/home/tester/.config",
    homeDir: HOME,
    legacyExists: false,
  });
  assert.equal(dir, path.join("/home/tester/.config", "omniroute"));
});

test("falls back to legacy when neither XDG nor legacy-exists apply", () => {
  const dir = chooseDataDir({
    dataDirEnv: undefined,
    platform: "linux",
    xdgConfigHome: undefined,
    homeDir: HOME,
    legacyExists: false,
  });
  assert.equal(dir, LEGACY);
});

test("Windows APPDATA path is used on win32 when no legacy dir exists", () => {
  const dir = chooseDataDir({
    dataDirEnv: undefined,
    platform: "win32",
    appData: "C:\\Users\\tester\\AppData\\Roaming",
    xdgConfigHome: undefined,
    homeDir: HOME,
    legacyExists: false,
  });
  assert.equal(dir, path.join("C:\\Users\\tester\\AppData\\Roaming", "omniroute"));
});

test("matches the server precedence: legacy beats XDG even on win32", () => {
  const dir = chooseDataDir({
    dataDirEnv: undefined,
    platform: "win32",
    appData: "C:\\Users\\tester\\AppData\\Roaming",
    xdgConfigHome: "/x",
    homeDir: HOME,
    legacyExists: true,
  });
  assert.equal(dir, LEGACY);
});
