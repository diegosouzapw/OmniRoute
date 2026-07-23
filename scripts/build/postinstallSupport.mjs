#!/usr/bin/env node

import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Detect whether the current install tree contains the published standalone bundle.
 * Checks for dist/server.js (Layer 1: renamed from app/server.js).
 * Source checkouts will not have dist/ so postinstall skips platform-specific
 * native repairs (which only apply to the shipped pre-built bundle).
 *
 * @param {string} rootDir
 * @returns {boolean}
 */
export function hasStandaloneAppBundle(rootDir) {
  // The published bundle ships in dist/ (build-output-isolation). Also accept the
  // legacy app/ location so an upgrade over a partially-replaced install is still
  // detected as a published bundle — mirrors the serve CLI's dist/ -> app/ fallback.
  return (
    existsSync(join(rootDir, "dist", "server.js")) ||
    existsSync(join(rootDir, "app", "server.js"))
  );
}

/**
 * Returns true when running inside a Termux environment on Android.
 *
 * Node.js on Termux reports process.platform === "linux" (not "android"),
 * so OS-level platform checks are insufficient. Use Termux-specific signals:
 *   1. TERMUX_VERSION env var (set by Termux bootstrap, most reliable)
 *   2. PREFIX env var containing "com.termux"
 *   3. Filesystem probe at /data/data/com.termux (last resort, no env needed)
 *
 * @param {object} [env]  Override process.env for testing.
 * @returns {boolean}
 */
export function isTermux(env = process.env) {
  if (env.TERMUX_VERSION) return true;
  if (typeof env.PREFIX === "string" && env.PREFIX.includes("com.termux")) return true;
  try {
    return existsSync("/data/data/com.termux");
  } catch {
    return false;
  }
}
