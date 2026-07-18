import fsSync from "fs";

/**
 * #6701 — 9router-parity fallback for CLI install detection.
 *
 * `getCliRuntimeStatus()` in `cliRuntime.ts` determines `installed` from
 * binary resolution alone (known install paths + a `where`/`which` PATH
 * search). If the binary is not currently resolvable — stale PATH inherited
 * by a long-running/background OmniRoute process, the binary having moved,
 * or an install method we don't enumerate yet — it used to unconditionally
 * report `installed:false`, even when the tool's own settings/config file on
 * disk proves it was installed and used before.
 *
 * Upstream 9router's equivalent route
 * (`src/app/api/cli-tools/claude-settings/route.js::checkClaudeInstalled()`)
 * has a second-chance fallback: when `where`/`which` fails, it still reports
 * `installed:true` if the settings file exists. This restores that fallback
 * for any CLI tool that declares a `settings` config path (currently
 * `claude` and `droid` — see `CLI_TOOLS` in `cliRuntime.ts`).
 *
 * Only applies when the lookup's own reason is "not_found" — i.e. the binary
 * genuinely couldn't be located on PATH/known install paths. Deliberate
 * security rejections (unsafe/relative env override paths, symlink escapes,
 * suspicious file sizes, etc.) must stay `installed:false` regardless of
 * whether a settings file happens to exist.
 */
export interface NotInstalledResult {
  installed: false;
  runnable: boolean;
  command: string | null;
  commandPath: string | null;
  reason: string;
  runtimeMode: string;
  requiresBinary: boolean;
}

export interface SettingsFallbackResult {
  installed: true;
  runnable: false;
  command: string | null;
  commandPath: null;
  reason: "settings_found_binary_unresolved";
  runtimeMode: string;
  requiresBinary: boolean;
}

/**
 * Given the resolved settings-file path for a tool (or undefined if the tool
 * has none) and the "not installed" result the binary lookup already
 * produced, return a settings-fallback result when the settings file exists
 * on disk, or the original "not installed" result unchanged otherwise.
 */
export const withSettingsFallback = (
  settingsPath: string | undefined,
  notInstalledResult: NotInstalledResult
): NotInstalledResult | SettingsFallbackResult => {
  if (notInstalledResult.reason !== "not_found") return notInstalledResult;
  if (!settingsPath || !fsSync.existsSync(settingsPath)) return notInstalledResult;

  return {
    installed: true,
    runnable: false,
    command: notInstalledResult.command,
    commandPath: null,
    reason: "settings_found_binary_unresolved",
    runtimeMode: notInstalledResult.runtimeMode,
    requiresBinary: notInstalledResult.requiresBinary,
  };
};
