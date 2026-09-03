import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

const require = createRequire(import.meta.url);
const { shouldStartHidden, showOrCreateWindow } = require("../../../electron/lib/windowLifecycle");

describe("Electron hidden-start window lifecycle", () => {
  it("detects explicit hidden flags", () => {
    assert.equal(shouldStartHidden({ argv: ["electron", "--hidden"] }), true);
    assert.equal(shouldStartHidden({ argv: ["electron", "--minimized"] }), true);
    assert.equal(shouldStartHidden({ argv: ["electron"] }), false);
    assert.equal(shouldStartHidden(), false);
  });

  // Electron 44 removed `wasOpenedAsHidden` from `app.getLoginItemSettings()`, so a hidden
  // autostart is signalled ONLY by the `--hidden` argument the login item registers. Guards
  // against re-introducing a dependency on the removed field.
  it("ignores login-item settings entirely", () => {
    assert.equal(
      shouldStartHidden({ argv: ["electron"], loginItemSettings: { wasOpenedAsHidden: true } }),
      false
    );
    assert.equal(
      shouldStartHidden({ argv: ["electron", "--hidden"], loginItemSettings: {} }),
      true
    );
  });

  it("keeps the --hidden argument registered with the login item", () => {
    const mainJs = readFileSync(join(import.meta.dirname, "../../electron/main.js"), "utf8");
    assert.match(mainJs, /openAtLogin: true,\s*\n\s*args: \["--hidden"\],/);
    assert.doesNotMatch(mainJs, /openAsHidden/);
  });

  it("creates the dashboard only when an explicit open action has no live window", () => {
    const createdWindow = { id: "created" };
    let createCalls = 0;
    const result = showOrCreateWindow({
      appReady: true,
      getWindow: () => null,
      createWindow: () => {
        createCalls += 1;
        return createdWindow;
      },
    });

    assert.equal(result, createdWindow);
    assert.equal(createCalls, 1);
  });

  it("restores, shows, and focuses an existing dashboard without recreating it", () => {
    const calls: string[] = [];
    const existingWindow = {
      isDestroyed: () => false,
      isMinimized: () => true,
      restore: () => calls.push("restore"),
      show: () => calls.push("show"),
      focus: () => calls.push("focus"),
    };

    const result = showOrCreateWindow({
      appReady: true,
      getWindow: () => existingWindow,
      createWindow: () => {
        throw new Error("must not recreate a live dashboard");
      },
    });

    assert.equal(result, existingWindow);
    assert.deepEqual(calls, ["restore", "show", "focus"]);
  });

  it("does not create a BrowserWindow before Electron is ready", () => {
    let createCalls = 0;
    const result = showOrCreateWindow({
      appReady: false,
      getWindow: () => null,
      createWindow: () => {
        createCalls += 1;
      },
    });

    assert.equal(result, null);
    assert.equal(createCalls, 0);
  });

  it("routes tray, second-instance, and macOS activation opens through the lazy helper", () => {
    const mainSource = readFileSync(join(import.meta.dirname, "../../../electron/main.js"), "utf8");

    // #10328 added a headless guard ahead of the lazy-open call; second-instance
    // must still route through showMainWindow() once past that guard.
    assert.match(mainSource, /app\.on\("second-instance", \(\) => \{[\s\S]*?showMainWindow\(\);/);
    assert.match(mainSource, /label: "Open OmniRoute",\s*click: \(\) => showMainWindow\(\)/);
    assert.match(mainSource, /tray\.on\("double-click", \(\) => showMainWindow\(\)\);/);
    assert.match(mainSource, /app\.on\("activate", \(\) => \{[\s\S]*?showMainWindow\(\);/);
  });

  it("keeps hidden startup renderer-free until an explicit open action", () => {
    const mainSource = readFileSync(join(import.meta.dirname, "../../../electron/main.js"), "utf8");
    const readyBlock = mainSource.slice(mainSource.indexOf("app.whenReady().then"));

    assert.match(
      readyBlock,
      /startNextServer\(\);\s*if \(!isHeadless\) \{\s*createTray\(\);\s*\}/,
      "the server and tray must start before the hidden/visible renderer decision"
    );
    assert.match(
      readyBlock,
      /if \(isHeadless\)[\s\S]*?else if \(startHidden\)[\s\S]*?else \{\s*showMainWindow\(\);/
    );
    assert.doesNotMatch(
      readyBlock.match(/else if \(startHidden\)[\s\S]*?\} else \{/s)?.[0] ?? "",
      /createWindow\(|showMainWindow\(/
    );
    assert.match(
      readyBlock,
      /\}\s*setupIpcHandlers\(\);\s*setupAutoUpdater\(\);/,
      "IPC and updater setup must remain active when no renderer was created"
    );
  });
});
