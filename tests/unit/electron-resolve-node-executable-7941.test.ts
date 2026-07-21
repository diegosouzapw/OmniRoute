/**
 * Regression test for #7941 — macOS second, inert Dock icon.
 *
 * The Next.js standalone server is spawned via ELECTRON_RUN_AS_NODE. On macOS it must
 * run through the Helper binary (a background LSUIElement task) so no extra Dock icon
 * appears. resolveDarwinHelperExecutable() derives the Helper name from
 * path.basename(execPath) — electron-builder generates BOTH the main binary and the
 * Helper.app bundles from build.productName ("OmniRoute"). The old code used
 * app.getName() (package.json `name` = "omniroute-desktop"); the two diverged, so it
 * never matched a real Helper path and fell through to process.execPath — spawning the
 * main Electron binary and producing a second, inert Dock icon.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const { resolveDarwinHelperExecutable } = require("../../electron/lib/resolveNodeHelper.js");

const EXEC = "/Applications/OmniRoute.app/Contents/MacOS/OmniRoute";

describe("#7941 — resolveDarwinHelperExecutable()", () => {
  it("resolves the productName-derived framework Helper even though app.getName() would say 'omniroute-desktop'", () => {
    const frameworkHelper = path.join(
      path.dirname(EXEC),
      "..",
      "Frameworks",
      "OmniRoute Helper.app",
      "Contents",
      "MacOS",
      "OmniRoute Helper"
    );
    const result = resolveDarwinHelperExecutable({
      execPath: EXEC,
      existsSync: (p: string) => p === frameworkHelper, // only the REAL helper exists
    });
    assert.equal(
      result,
      frameworkHelper,
      "must resolve the Helper derived from basename(execPath), NOT fall back to null/execPath"
    );
    // Guard against the exact regression: it must never hand back the main binary name.
    assert.notEqual(result, EXEC);
  });

  it("prefers the sibling (unsuffixed) Helper next to the main binary when present", () => {
    const sibling = path.join(path.dirname(EXEC), "OmniRoute Helper");
    const result = resolveDarwinHelperExecutable({
      execPath: EXEC,
      existsSync: (p: string) => p === sibling,
    });
    assert.equal(result, sibling);
  });

  it("returns null when no Helper bundle exists (caller then falls back to execPath)", () => {
    const result = resolveDarwinHelperExecutable({
      execPath: EXEC,
      existsSync: () => false,
    });
    assert.equal(result, null);
  });

  it("returns null defensively when execPath is missing", () => {
    assert.equal(resolveDarwinHelperExecutable({ execPath: "" }), null);
    assert.equal(resolveDarwinHelperExecutable({}), null);
  });
});
