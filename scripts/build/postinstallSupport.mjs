#!/usr/bin/env node

import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Detect whether the current install tree contains the published standalone app bundle.
 * Source checkouts should not create `app/` during postinstall because Next.js would
 * mis-detect it as a competing App Router root and serve 404s for the real `src/app` routes.
 *
 * @param {string} rootDir
 * @returns {boolean}
 */
export function hasStandaloneAppBundle(rootDir) {
  return existsSync(join(rootDir, "app", "server.js"));
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
