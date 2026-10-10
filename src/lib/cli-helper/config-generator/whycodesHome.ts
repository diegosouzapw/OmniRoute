/**
 * WhyCodes home / config.toml resolver.
 *
 * WhyCodes (`crates/core/src/paths.rs`) uses `WHYCODES_HOME` as the instance
 * root when set and non-empty; otherwise `$HOME/.whycodes`, falling back to
 * `%USERPROFILE%\.whycodes` (same lookup order as WhyCodes' `user_home()`).
 * WhyCodes 0.6.5 moved here from the `directories::ProjectDirs` platform dirs
 * and migrates an old install on first load, so we never write the old path.
 *
 * Env vars are read at call-time so tests can set/unset them without a
 * module-cache freeze (same constraint as hermesHome.ts / #3628).
 */

import os from "node:os";
import path from "node:path";

export function getWhyCodesHome(
  env: NodeJS.ProcessEnv = process.env,
  homeDir: string = os.homedir()
): string {
  const override = String(env.WHYCODES_HOME || "").trim();
  if (override) return override;

  const userHome = String(env.HOME || "").trim() || String(env.USERPROFILE || "").trim() || homeDir;
  return path.join(userHome, ".whycodes");
}

export function getWhyCodesConfigPath(
  env: NodeJS.ProcessEnv = process.env,
  homeDir: string = os.homedir()
): string {
  return path.join(getWhyCodesHome(env, homeDir), "config.toml");
}
