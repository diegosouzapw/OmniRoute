/**
 * Shared Hermes home-directory resolver (#3628).
 *
 * The Hermes PowerShell installer (Windows) writes its default config under
 * `%LOCALAPPDATA%\hermes`, exposed as the `HERMES_HOME` env var.  OmniRoute
 * previously hard-coded `~/.hermes` everywhere, so the two config files never
 * met on Windows.
 *
 * IMPORTANT: the env var MUST be read at call-time (i.e. inside a function),
 * never at module-load time.  `TOOL_CONFIG_PATHS` in index.ts is evaluated
 * eagerly — any constant defined there would freeze the path at import.
 * That's why this module exports plain functions instead of constants.
 */

import path from "node:path";
import os from "node:os";

/**
 * Returns the Hermes home directory.
 *
 * Resolution order:
 *   1. `HERMES_HOME` env var (if non-empty)
 *   2. `~/.hermes` (cross-platform fallback)
 *
 * Reads `process.env.HERMES_HOME` every call so tests can set/unset the var
 * without module-cache interference.
 */
export function getHermesHome(): string {
  const override = (process.env.HERMES_HOME || "").trim();
  return override || path.join(os.homedir(), ".hermes");
}

/**
 * Returns the canonical path to the Hermes Agent `config.yaml`.
 * Always delegates to `getHermesHome()` so it picks up `HERMES_HOME` at
 * call-time.
 */
export function getHermesConfigPath(): string {
  return path.join(getHermesHome(), "config.yaml");
}
