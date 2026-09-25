/**
 * Resolve the better-sqlite3 prebuild target string (e.g. "linux-x64",
 * "linuxmusl-x64", "android-arm64") used by `postinstall.mjs` to pick the
 * right `prebuilds/<target>.node` binary for the running platform.
 *
 * Extracted from `postinstall.mjs` into its own module (no top-level side
 * effects) so it can be unit-tested directly — `postinstall.mjs` runs its
 * work via top-level `await`, so importing it executes the real postinstall
 * flow (spawns npm, touches ~/.omniroute) as a side effect of import.
 */
import { isTermux } from "./postinstallSupport.mjs";
import { detectRuntimeLibc } from "./wreqJsNative.mjs";

/**
 * @param {object} [options]
 * @param {string} [options.platform] defaults to `process.platform`
 * @param {string} [options.arch] defaults to `process.arch`
 * @param {NodeJS.ProcessEnv} [options.env] defaults to `process.env` (used for Termux detection)
 * @param {() => ("musl"|"gnu"|undefined)} [options.detectLibc] defaults to `detectRuntimeLibc`
 * @returns {string} e.g. "linux-x64", "linuxmusl-x64", "darwin-arm64", "android-arm64"
 */
export function getBetterSqlitePrebuildTarget({
  platform = process.platform,
  arch = process.arch,
  env = process.env,
  detectLibc = detectRuntimeLibc,
} = {}) {
  const runtimePlatform = isTermux(env) ? "android" : platform;
  let libc;
  if (runtimePlatform === "linux") {
    try {
      libc = detectLibc();
    } catch {
      libc = undefined;
    }
  }
  const targetPlatform = libc === "musl" ? "linuxmusl" : runtimePlatform;
  return `${targetPlatform}-${arch}`;
}
