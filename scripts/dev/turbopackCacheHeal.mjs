// Best-effort self-heal for a corrupted Turbopack persistent dev cache.
//
// Context (#6289): on Windows, `pnpm dev` can fail at startup when Turbopack
// mmaps a persistent-cache SST file and the OS refuses the mapping
// ("os error 1455" — "paging file too small"). Turbopack then surfaces a
// misleading `Module not found: Can't resolve '@/shared/utils/machine'`.
// This is a known UPSTREAM Turbopack cache-corruption bug — NOT our code.
// The reliable remedy is deleting the Turbopack cache dir; this module lets
// the dev launcher attempt that automatically once before giving up.
//
// Pure + side-effect-isolated so it can be unit-tested without booting Next.

import fs from "node:fs";
import path from "node:path";

// Signature of the corrupted-cache failure. Kept intentionally broad because
// the same corruption surfaces through several messages (the raw mmap/SST
// error, the Windows paging-file error code, and the misleading module-resolve
// error emitted by Turbopack's "restore task data" step).
const CORRUPTION_SIGNATURE = /restore task data|mmap .*SST|os error 1455|paging file/i;

/**
 * True when an error message looks like a corrupted Turbopack persistent cache.
 * @param {unknown} message
 * @returns {boolean}
 */
export function isTurbopackCacheCorruption(message) {
  if (message == null) return false;
  return CORRUPTION_SIGNATURE.test(String(message));
}

/**
 * Candidate Turbopack cache directories for a given Next dist dir. Next has
 * placed the persistent cache under both `<distDir>/cache/turbopack` and
 * `<distDir>/dev/cache/turbopack` across versions, so purge both.
 * @param {string} [distDir]
 * @param {string} [cwd]
 * @returns {string[]}
 */
export function turbopackCacheDirs(
  distDir = process.env.NEXT_DIST_DIR || ".build/next",
  cwd = process.cwd()
) {
  const base = path.isAbsolute(distDir) ? distDir : path.join(cwd, distDir);
  return [
    path.join(base, "cache", "turbopack"),
    path.join(base, "dev", "cache", "turbopack"),
  ];
}

/**
 * Recursively remove a single Turbopack cache directory.
 * @param {string} dir
 * @returns {boolean} true if the directory existed and was removed
 */
export function purgeTurbopackCache(dir) {
  if (!dir || !fs.existsSync(dir)) return false;
  fs.rmSync(dir, { recursive: true, force: true });
  return true;
}

/**
 * Purge every candidate Turbopack cache directory for the given dist dir.
 * @param {string} [distDir]
 * @param {string} [cwd]
 * @returns {string[]} the directories that existed and were removed
 */
export function purgeAllTurbopackCaches(distDir, cwd) {
  const removed = [];
  for (const dir of turbopackCacheDirs(distDir, cwd)) {
    if (purgeTurbopackCache(dir)) removed.push(dir);
  }
  return removed;
}
