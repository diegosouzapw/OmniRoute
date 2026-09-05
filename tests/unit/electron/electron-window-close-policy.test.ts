import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  CLOSE_BEHAVIOR_KEEP_LOADED,
  CLOSE_BEHAVIOR_UNLOAD,
  normalizeCloseBehavior,
  resolveRendererUrl,
} = require("../../../electron/lib/windowClosePolicy");

describe("Electron window close policy", () => {
  it("accepts only the two deliberate close behaviors", () => {
    assert.equal(normalizeCloseBehavior("keep-loaded"), CLOSE_BEHAVIOR_KEEP_LOADED);
    assert.equal(normalizeCloseBehavior("unload"), CLOSE_BEHAVIOR_UNLOAD);
    assert.equal(normalizeCloseBehavior("destroy"), null);
    assert.equal(normalizeCloseBehavior(undefined), null);
  });

  it("preserves same-origin dashboard navigation when recreating the renderer", () => {
    assert.equal(
      resolveRendererUrl(
        "http://localhost:20128/dashboard/settings?tab=providers",
        "http://localhost:20128"
      ),
      "http://localhost:20128/dashboard/settings?tab=providers"
    );
  });

  it("falls back to the active server for invalid or cross-origin URLs", () => {
    assert.equal(
      resolveRendererUrl("https://example.com/dashboard", "http://localhost:20128"),
      "http://localhost:20128/"
    );
    assert.equal(
      resolveRendererUrl("not a url", "http://localhost:20128"),
      "http://localhost:20128"
    );
  });
});

describe("Electron main-process close policy wiring", () => {
  const mainSrc = readFileSync(join(import.meta.dirname, "../../../electron/main.js"), "utf8");

  it("defaults to keeping the renderer loaded and exposes both policies in the tray", () => {
    assert.match(mainSrc, /electronPreferences\.closeBehavior/);
    assert.match(mainSrc, /Keep Loaded \(Faster Reopen\)/);
    assert.match(mainSrc, /Unload Renderer \(Lower Memory\)/);
    assert.match(mainSrc, /writeCloseBehavior\(REMOTE_SERVER_PREFS_PATH, closeBehavior\)/);
  });

  it("destroys only the renderer in unload mode and otherwise hides the window", () => {
    const closeHandler = mainSrc.slice(
      mainSrc.indexOf('window.on("close"'),
      mainSrc.indexOf('window.on("closed"')
    );
    assert.ok(closeHandler.includes("closeBehavior === CLOSE_BEHAVIOR_UNLOAD"));
    assert.ok(closeHandler.includes("window.destroy()"));
    assert.ok(closeHandler.includes("window.hide()"));
    assert.ok(!closeHandler.includes("stopNextServer"));
  });

  it("recreates the renderer from every explicit reopen path", () => {
    const secondInstanceHandler = mainSrc.slice(
      mainSrc.indexOf('app.on("second-instance"'),
      mainSrc.indexOf("// ── Environment Detection")
    );
    assert.ok(secondInstanceHandler.includes("showMainWindow()"));
    assert.ok(secondInstanceHandler.includes("if (isHeadless) return"));
    assert.match(mainSrc, /label: "Open OmniRoute",\s*click: \(\) => showMainWindow\(\)/);
    assert.match(mainSrc, /tray\.on\("double-click", \(\) => showMainWindow\(\)\)/);
    assert.match(
      mainSrc,
      /app\.on\("activate", \(\) => \{\s*if \(isHeadless\) return;\s*showMainWindow\(\);/
    );
  });

  it("keeps the non-macOS app alive when unloading its last renderer", () => {
    assert.match(
      mainSrc,
      /process\.platform !== "darwin"[\s\S]*closeBehavior !== CLOSE_BEHAVIOR_UNLOAD[\s\S]*app\.quit\(\)/
    );
  });
});
