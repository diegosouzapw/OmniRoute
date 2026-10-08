import path from "path";
import { execFileSync } from "child_process";

/**
 * npm global-prefix detection for cliRuntime.ts (#12563).
 *
 * Extracted so the soft-fail / retry logic does not grow the frozen
 * `cliRuntime.ts` file-size budget.
 */

const DANGEROUS_PATH_CHARS = ["&", "|", ";", "<", ">", "(", ")", "`", "$", "^", "%", "!"];
const NPM_PREFIX_RETRY_MS = 30_000;

let _npmGlobalPrefix: string | undefined;
let _npmGlobalPrefixFailAt = 0;

const isWindows = (): boolean => process.platform === "win32";

/** Test-only: clear prefix success/failure state between cases. */
export const __resetNpmGlobalPrefixCacheForTests = (): void => {
  _npmGlobalPrefix = undefined;
  _npmGlobalPrefixFailAt = 0;
};

/**
 * Detect the npm global bin directory.
 *
 * Success is cached for the process lifetime (`execFileSync` is expensive).
 * Failure is NOT cached as permanent `""` (#12563): a cold-shell timeout or
 * missing `npm` on Electron's PATH must not delete every npm-derived candidate
 * for the rest of the run. Env `npm_config_prefix` is re-read every call so it
 * can recover without waiting for the spawn retry window.
 */
export const getNpmGlobalPrefix = (): string => {
  const envPrefix = String(process.env.npm_config_prefix || "").trim();
  if (
    envPrefix &&
    path.isAbsolute(envPrefix) &&
    !DANGEROUS_PATH_CHARS.some((c) => envPrefix.includes(c))
  ) {
    _npmGlobalPrefix = envPrefix;
    _npmGlobalPrefixFailAt = 0;
    return _npmGlobalPrefix;
  }

  if (_npmGlobalPrefix !== undefined) return _npmGlobalPrefix;

  if (_npmGlobalPrefixFailAt && Date.now() - _npmGlobalPrefixFailAt < NPM_PREFIX_RETRY_MS) {
    return "";
  }

  try {
    const result = execFileSync("npm", ["config", "get", "prefix"], {
      windowsHide: true,
      timeout: 5000,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      ...(isWindows() ? { shell: true } : {}),
    });
    const prefix = result.trim();
    if (
      prefix &&
      path.isAbsolute(prefix) &&
      !DANGEROUS_PATH_CHARS.some((c) => prefix.includes(c))
    ) {
      _npmGlobalPrefix = prefix;
      _npmGlobalPrefixFailAt = 0;
      return _npmGlobalPrefix;
    }
  } catch {}

  // Soft-fail only — do not poison `_npmGlobalPrefix` with permanent "".
  _npmGlobalPrefixFailAt = Date.now();
  return "";
};
