/**
 * better-sqlite3 Node-API prebuild planning (pure — import-safe for tests).
 *
 * Since better-sqlite3 v13 the packaged app no longer compiles the addon from
 * source against the Electron headers: v13 ships Node-API (NAPI_VERSION=10)
 * prebuilds for every platform we package, and Node-API addons are
 * ABI-independent, so the same prebuild runs under plain Node and under the
 * packaged app's ELECTRON_RUN_AS_NODE server (verified against electron 43 /
 * NODE_MODULE_VERSION 148 — issue #10321 Stage 6). The historical
 * `npx node-gyp rebuild` spawn plan existed because better-sqlite3@12 only
 * shipped prebuilds up to electron-v146; v13 makes it obsolete.
 *
 * This module mirrors better-sqlite3's own `lib/binding.js` selection logic so
 * the build fails fast when the prebuild the runtime loader would pick is
 * missing, instead of shipping an app that falls back to sql.js and OOMs on a
 * user machine.
 */

import { existsSync } from "node:fs";
import { join } from "node:path";

export const SQLITE_PREBUILD_PLATFORMS = ["darwin", "linux", "linuxmusl", "win32"];
export const SQLITE_PREBUILD_ARCHS = ["x64", "arm64"];

/**
 * Resolve the prebuild file name better-sqlite3's loader would pick for the
 * given platform/arch. Mirrors lib/binding.js: linux without a glibc runtime
 * version resolves to the linuxmusl prebuild.
 *
 * @param {string} platform - process.platform ("linux", "darwin", "win32")
 * @param {string} arch - process.arch ("x64", "arm64")
 * @param {{ glibcVersionRuntime?: string | null }} [reportHeader] - parsed
 *   process.report.getReport().header (injectable for tests)
 */
export function sqlitePrebuildFileName(platform, arch, reportHeader) {
  const isMusl = platform === "linux" && !reportHeader?.glibcVersionRuntime;
  const target = `${isMusl ? "linuxmusl" : platform}-${arch}`;
  return `${target}.node`;
}

/**
 * Whether a prebuild check applies for this platform/arch combination.
 * Unsupported combos (e.g. freebsd-ia32) are skipped rather than failed: the
 * runtime loader falls back to node-gyp build/ locations for those, which we
 * do not package.
 */
export function isSqlitePrebuildSupported(platform, arch) {
  return SQLITE_PREBUILD_PLATFORMS.includes(platform) && SQLITE_PREBUILD_ARCHS.includes(arch);
}

/**
 * Assert that the runtime-selected prebuild exists in a staged module.
 * Unsupported platform/arch combinations retain the historical fallback path.
 *
 * @returns {string | null} selected prebuild path, or null when unsupported
 */
export function assertSqlitePrebuildExists(moduleDir, platform, arch, reportHeader) {
  if (!isSqlitePrebuildSupported(platform, arch)) return null;

  const expected = join(
    moduleDir,
    "prebuilds",
    sqlitePrebuildFileName(platform, arch, reportHeader)
  );
  if (!existsSync(expected)) {
    throw new Error(
      `[electron] better-sqlite3 prebuild missing for ${platform}-${arch} ` +
        `(${expected}). The packaged app would fall back to sql.js and OOM. ` +
        `Restore the prebuilds/ directory (npm cache / registry tarball) before packaging.`
    );
  }
  return expected;
}
