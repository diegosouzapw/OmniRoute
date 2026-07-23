#!/usr/bin/env node

/**
 * OmniRoute — Dev-startup native SQLite ABI guard.
 *
 * `better-sqlite3` is a native addon compiled for a specific Node.js ABI
 * (NODE_MODULE_VERSION). This project supports both Node 22 (ABI 127) and
 * Node 24 (ABI 137); switching between them via nvm leaves the previously
 * built `better_sqlite3.node` incompatible, so `npm run dev` crashes during
 * bootstrap with:
 *
 *   "The module '…/better_sqlite3.node' was compiled against a different
 *    Node.js version using NODE_MODULE_VERSION 127. This version of Node.js
 *    requires NODE_MODULE_VERSION 137."
 *
 * `postinstall.mjs` only fixes the published standalone bundle and only runs
 * on `npm install` — it does NOT cover "cloned repo, switched Node, ran dev".
 *
 * This guard probes the root binary against the *current* Node ABI and, ONLY
 * when it detects a genuine ABI mismatch, runs `npm rebuild better-sqlite3`
 * once. The healthy path (matching ABI) does no work, so dev startup stays
 * fast. Unrelated errors are NOT swallowed — they fall through so the normal
 * bootstrap surfaces them.
 */

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");

export const SQLITE_BINARY = join(
  ROOT,
  "node_modules",
  "better-sqlite3",
  "build",
  "Release",
  "better_sqlite3.node"
);

/**
 * Whether an error message indicates a native-addon ABI / load mismatch
 * (as opposed to an unrelated runtime error such as a missing table).
 * Mirrors the detection in src/lib/db/core.ts::isNativeSqliteLoadError.
 * @param {unknown} message
 * @returns {boolean}
 */
export function isNativeAbiMismatch(message) {
  const m = String(message ?? "");
  return (
    m.includes("NODE_MODULE_VERSION") ||
    m.includes("was compiled against a different Node.js version") ||
    m.includes("Module did not self-register") ||
    m.includes("ERR_DLOPEN_FAILED") ||
    m.includes("Could not locate the bindings file")
  );
}

/** Probe a native binary against the current Node ABI without polluting the require cache. */
function probeLoad(binaryPath) {
  process.dlopen({ exports: {} }, binaryPath);
}

/** Default rebuild: `npm rebuild better-sqlite3` at the repo root (no shell interpolation). */
function defaultRebuild() {
  const npm = process.platform === "win32" ? "npm.cmd" : "npm";
  const result = spawnSync(npm, ["rebuild", "better-sqlite3"], { cwd: ROOT, stdio: "inherit" });
  return result.status === 0;
}

/**
 * Ensure better-sqlite3 loads under the current Node. Rebuilds once on ABI
 * mismatch. Returns a result object; never throws for the mismatch path.
 *
 * @param {{ logger?: Pick<Console,"warn"|"error"|"log">, rebuild?: () => boolean, probe?: (p: string) => void, binaryPath?: string }} [opts]
 * @returns {{ ok: boolean, rebuilt: boolean, error?: unknown }}
 */
export function ensureNativeSqlite(opts = {}) {
  const {
    logger = console,
    rebuild = defaultRebuild,
    probe = probeLoad,
    binaryPath = SQLITE_BINARY,
  } = opts;

  // Nothing built yet (fresh clone before install) — let install/bootstrap handle it.
  if (!existsSync(binaryPath)) return { ok: true, rebuilt: false };

  try {
    probe(binaryPath);
    return { ok: true, rebuilt: false };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!isNativeAbiMismatch(message)) {
      // Not an ABI problem — do not mask it; bootstrap will surface the real error.
      return { ok: false, rebuilt: false, error };
    }
    logger.warn(
      `[dev] better-sqlite3 was built for a different Node ABI than ${process.version} — ` +
        "rebuilding (one-time)…"
    );
    if (!rebuild()) {
      logger.error(
        "[dev] Automatic 'npm rebuild better-sqlite3' failed. Run it manually:\n" +
          "      npm rebuild better-sqlite3"
      );
      return { ok: false, rebuilt: false };
    }
    logger.log("[dev] better-sqlite3 rebuilt for the current Node. Continuing startup.");
    return { ok: true, rebuilt: true };
  }
}
