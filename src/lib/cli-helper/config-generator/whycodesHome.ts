/**
 * WhyCodes home / config.toml resolver.
 *
 * WhyCodes (`crates/core/src/paths.rs`) uses `WHYCODES_HOME` as the instance
 * root when set; otherwise `directories::ProjectDirs::from("com",
 * "whycorporation", "whycodes")`. Those platform dirs are:
 *   - Windows: `%APPDATA%\whycorporation\whycodes`
 *   - macOS:   `~/Library/Application Support/com.whycorporation.whycodes`
 *   - Linux:   `$XDG_CONFIG_HOME/com.whycorporation.whycodes`
 *
 * Env vars are read at call-time so tests can set/unset them without a
 * module-cache freeze (same constraint as hermesHome.ts / #3628).
 */

import os from "node:os";
import path from "node:path";

export function getWhyCodesHome(
  env: NodeJS.ProcessEnv = process.env,
  homeDir: string = os.homedir(),
  platform: NodeJS.Platform = process.platform
): string {
  const override = String(env.WHYCODES_HOME || "").trim();
  if (override) return override;

  if (platform === "win32") {
    const appData = String(env.APPDATA || "").trim() || path.join(homeDir, "AppData", "Roaming");
    return path.join(appData, "whycorporation", "whycodes");
  }
  if (platform === "darwin") {
    return path.join(homeDir, "Library", "Application Support", "com.whycorporation.whycodes");
  }
  const xdg = String(env.XDG_CONFIG_HOME || "").trim();
  return path.join(xdg || path.join(homeDir, ".config"), "com.whycorporation.whycodes");
}

export function getWhyCodesConfigPath(
  env: NodeJS.ProcessEnv = process.env,
  homeDir: string = os.homedir(),
  platform: NodeJS.Platform = process.platform
): string {
  return path.join(getWhyCodesHome(env, homeDir, platform), "config.toml");
}
