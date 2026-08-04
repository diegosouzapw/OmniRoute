"use strict";

const path = require("path");
const fs = require("fs");

/**
 * Resolve the macOS Helper binary used to spawn the Next.js standalone server via
 * ELECTRON_RUN_AS_NODE, so macOS treats it as a background task with no Dock icon.
 *
 * #7941: the Helper name is derived from `path.basename(execPath)` — electron-builder
 * generates BOTH the main binary and the Helper.app bundles from `build.productName`
 * ("OmniRoute"). The previous code used `app.getName()`, which reads package.json
 * `name` ("omniroute-desktop"); the two diverged, so it never matched a real Helper
 * path and the caller fell through to `process.execPath`, spawning the main Electron
 * binary and producing a second, inert Dock icon.
 *
 * @param {object} opts
 * @param {string} opts.execPath  Absolute path to the packaged Electron binary (process.execPath).
 * @param {(p: string) => boolean} [opts.existsSync]  Injectable fs.existsSync (for tests).
 * @returns {string|null}  The Helper binary path, or null when none exists (caller falls back to execPath).
 */
function resolveDarwinHelperExecutable({ execPath, existsSync = fs.existsSync } = {}) {
  if (!execPath) return null;
  const appName = path.basename(execPath);

  // Sibling Helper next to the main binary.
  const siblingHelper = path.join(path.dirname(execPath), `${appName} Helper`);
  if (existsSync(siblingHelper)) return siblingHelper;

  // Electron >= 20 ships Helper bundles under Contents/Frameworks. The unsuffixed
  // Helper (not "(Renderer)"/"(GPU)"/"(Plugin)") is the one suitable for ELECTRON_RUN_AS_NODE.
  const frameworkHelper = path.join(
    path.dirname(execPath),
    "..",
    "Frameworks",
    `${appName} Helper.app`,
    "Contents",
    "MacOS",
    `${appName} Helper`
  );
  if (existsSync(frameworkHelper)) return frameworkHelper;

  return null;
}

module.exports = { resolveDarwinHelperExecutable };
