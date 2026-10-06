import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import os from "node:os";
import { pathToFileURL } from "node:url";
import {
  systrayModuleSpecifier,
  SYSTRAY_PACKAGE,
} from "../../../bin/cli/runtime/trayRuntime.ts";

// Regression guard for the Windows-only ESM loader failure at the lazy tray
// import in bin/cli/runtime/trayRuntime.ts (loadSystray):
//
//   Error: Only URLs with a scheme in: file, data, and node are supported by
//   the default ESM loader. On Windows, absolute paths must be valid file://
//   URLs. Received protocol 'c:'
//
// `import()` resolves its specifier as a URL. A POSIX absolute path like
// /home/x/.omniroute/runtime/node_modules/systray2 doubles as a valid relative
// URL, so passing it works by accident on Linux/macOS (and CI stays green). A
// Windows absolute path is C:\Users\x\.omniroute\runtime\node_modules\systray2,
// whose leading drive letter the loader parses as the URL scheme `c:` and
// rejects — so `omniroute server --tray` never loads the tray on Windows.
// This is the same defect as #11238 (CLI db-fallback imports), which missed
// this call site. The specifier must be a file:// URL.

test("systrayModuleSpecifier returns a file:// URL, not a raw absolute path", () => {
  const runtimeDir = path.join(os.homedir(), ".omniroute", "runtime");
  const spec = systrayModuleSpecifier(runtimeDir);

  assert.match(
    spec,
    /^file:\/\//,
    "dynamic import() of a raw absolute path fails on Windows (drive letter " +
      "parsed as a URL scheme); wrap the path in pathToFileURL(...).href",
  );
  assert.ok(spec.includes(SYSTRAY_PACKAGE), "specifier must target the systray2 package");
  // A file:// URL is a loader-acceptable specifier on every platform.
  assert.doesNotThrow(() => new URL(spec));
});

test("systrayModuleSpecifier matches pathToFileURL of the module directory", () => {
  const runtimeDir = path.join(os.tmpdir(), "omniroute-tray-spec-test");
  const expected = pathToFileURL(
    path.join(runtimeDir, "node_modules", SYSTRAY_PACKAGE),
  ).href;
  assert.equal(systrayModuleSpecifier(runtimeDir), expected);
});
