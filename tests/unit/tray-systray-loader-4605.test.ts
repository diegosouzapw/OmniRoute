// Regression coverage for #4605 — `omniroute server --tray` showed no tray on
// macOS/Linux with no error printed.
//
// Root cause (regressed in v3.8.34): the wired Unix tray path
// (serve.mjs → tray/index.mjs → traySystray.mjs) loaded systray2 via an inline
// loader that called `require("module")` inside an ESM `.mjs` file (package
// "type":"module"). `require` is undefined in ESM, so it threw
// `ReferenceError: require is not defined`, which a bare `catch {}` swallowed →
// `loadSystray2()` returned null → no tray, no diagnostic. Even had it loaded,
// systray2 is not in node_modules (it is lazily installed into
// ~/.omniroute/runtime by trayRuntime.ts), the icon was read from a
// non-existent "icons/icon.png" path, and `isTemplateIcon` was true on darwin
// (full-color icon → white square).
//
// The fix makes `initSystrayUnix` async and delegates loading to the runtime
// loader. We can't spawn the real native Go binary in a unit test, so — like
// cli-tray-systray2.test.ts — we drive the seam with an injected ctor loader
// and assert the menu/icon/template invariants.

import test from "node:test";
import assert from "node:assert/strict";
import { initSystrayUnix } from "../../bin/cli/tray/traySystray.mjs";

class FakeSysTray {
  static lastOpts: unknown = null;
  onClickFn: unknown = null;
  constructor(opts: unknown) {
    FakeSysTray.lastOpts = opts;
  }
  onClick(fn: unknown) {
    this.onClickFn = fn;
  }
  ready() {
    return Promise.resolve();
  }
  sendAction() {}
  kill() {}
}

const opts = {
  port: 20128,
  onQuit: () => {},
  onOpenDashboard: () => {},
  onShowLogs: () => {},
};

test("initSystrayUnix loads the injected SysTray ctor and builds the menu (#4605)", async () => {
  FakeSysTray.lastOpts = null;
  // Async loader seam — proves initSystrayUnix awaits the runtime loader instead
  // of the old broken inline `require("module")` path.
  const tray = await initSystrayUnix(opts, async () => FakeSysTray as unknown as new () => unknown);

  assert.ok(tray, "a tray instance must be created when a SysTray ctor is available");

  const menu = (FakeSysTray.lastOpts as { menu: Record<string, unknown> }).menu;
  // White-square fix: must not be a macOS template icon.
  assert.equal(menu.isTemplateIcon, false, "isTemplateIcon must be false (full-color icon)");
  // Icon-path fix: the bundled icon.png must resolve to a non-empty base64 blob.
  assert.ok(
    typeof menu.icon === "string" && (menu.icon as string).length > 0,
    "menu.icon must be a non-empty base64 string (icon.png path fix)"
  );

  const items = menu.items as Array<{ title: string }>;
  const titles = items.map((i) => i.title);
  assert.equal(items.length, 5, "menu should keep its 5 items");
  assert.ok(
    titles.includes("Show Logs"),
    `the "Show Logs" item must be preserved, got: ${titles.join(", ")}`
  );
  assert.ok(
    titles.includes("Quit OmniRoute"),
    `the Quit item must be present, got: ${titles.join(", ")}`
  );
});

test("initSystrayUnix returns null without throwing when the loader yields null (#4605)", async () => {
  const tray = await initSystrayUnix(opts, async () => null);
  assert.equal(tray, null, "must degrade to null when systray2 cannot be loaded");
});
