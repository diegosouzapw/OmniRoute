#!/usr/bin/env node

/**
 * playwright-core Android/Termux platform patch (#7265).
 *
 * playwright-core's bundled coreBundle.js has three IIFEs that compute the
 * browser-cache directory by checking `process.platform` for "linux", "darwin",
 * or "win32". On Android (Termux), Node.js may report process.platform as
 * "android", causing each IIFE to throw "Unsupported platform: android" at
 * module load time — crashing the entire server before any browser is launched.
 *
 * This script patches the three platform checks to also accept "android",
 * treating it identically to "linux" (same XDG_CACHE_HOME convention).
 *
 * The patch is applied to both root node_modules (for dev/build) and
 * dist/node_modules (for the standalone bundle). It is idempotent — running
 * multiple times is safe.
 *
 * Fixes: https://github.com/diegosouzapw/OmniRoute/issues/7265
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PATCHED_MARKER = "/* omniroute-android-patch */";

/**
 * Patch coreBundle.js to accept Android as a valid platform.
 * Returns true if the file was modified, false if already patched or not found.
 */
function patchCoreBundle(filePath) {
  if (!existsSync(filePath)) return false;

  let content = readFileSync(filePath, "utf8");

  // Already patched — skip
  if (content.includes(PATCHED_MARKER)) return false;

  // The three platform-check patterns in coreBundle.js:
  //   1. defaultCacheDirectory IIFE (line ~28594)
  //   2. defaultCacheDirectory2 IIFE (line ~51278)
  //   3. daemon session dir computation (line ~68847)
  //
  // Original pattern: if (process.platform === "linux")
  // Patched pattern:  if (process.platform === "linux" || process.platform === "android")
  //
  // We use a regex that matches the exact pattern and only replaces the first
  // occurrence in each of the three IIFEs. The marker comment is appended once
  // to signal idempotency.

  const original = /if \(process\.platform === "linux"\)/g;
  const patched = `if (process.platform === "linux" || process.platform === "android") ${PATCHED_MARKER}`;

  const count = (content.match(original) || []).length;
  if (count === 0) {
    // Either already patched or different version — check for our marker
    return false;
  }

  content = content.replace(original, patched);
  writeFileSync(filePath, content, "utf8");
  return true;
}

export function fixPlaywrightAndroid({ rootDir, log = (m) => console.log(m) } = {}) {
  const targets = [
    join(rootDir, "node_modules", "playwright-core", "lib", "coreBundle.js"),
    join(rootDir, "dist", "node_modules", "playwright-core", "lib", "coreBundle.js"),
  ];

  let patched = 0;
  for (const target of targets) {
    if (patchCoreBundle(target)) {
      patched++;
      log(`  ✅ Patched playwright-core for Android: ${target}`);
    }
  }

  if (patched > 0) {
    log(`  ✅ playwright-core Android patch applied (${patched} file(s))\n`);
  }

  return patched;
}

// When run directly (not imported), execute the patch
if (process.argv[1] && process.argv[1].endsWith("fixPlaywrightAndroid.mjs")) {
  const rootDir = process.argv[2] || process.cwd();
  fixPlaywrightAndroid({ rootDir });
}
