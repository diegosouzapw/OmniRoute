import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export const OPENCODE_JSON_FILENAME = "opencode.json";
export const OPENCODE_JSONC_FILENAME = "opencode.jsonc";

export const resolveOpencodeConfigDir = (
  env: NodeJS.ProcessEnv = process.env,
  homeDir = os.homedir()
): string => {
  const xdgConfigHome = String(env.XDG_CONFIG_HOME || "").trim();
  return path.join(xdgConfigHome || path.join(homeDir, ".config"), "opencode");
};

/**
 * Resolve the global OpenCode config file that a write should update.
 *
 * OpenCode treats `opencode.jsonc` as the preferred writable global config and
 * merges it after `opencode.json` when both exist. Match that precedence so an
 * existing JSONC document is never shadowed by a newly-created JSON file. Keep
 * `opencode.json` as OmniRoute's creation default for backwards compatibility
 * when neither native filename exists.
 */
export const resolveOpencodeConfigPath = (
  env: NodeJS.ProcessEnv = process.env,
  homeDir = os.homedir()
): string => {
  const configDir = resolveOpencodeConfigDir(env, homeDir);
  const jsoncPath = path.join(configDir, OPENCODE_JSONC_FILENAME);
  if (fs.existsSync(jsoncPath)) return jsoncPath;

  const jsonPath = path.join(configDir, OPENCODE_JSON_FILENAME);
  if (fs.existsSync(jsonPath)) return jsonPath;

  return jsonPath;
};
