"use strict";

const fs = require("fs");

/**
 * resolveRemoteServerUrl.js — pure helper for resolving an operator-configured
 * remote OmniRoute server URL, so the Electron shell can attach to an
 * already-running instance (e.g. a Docker/OrbStack container, or a server on
 * another machine on the LAN) instead of spawning its own bundled Next.js
 * server.
 *
 * Some environments make the bundled local server impractical — for example,
 * a host that injects provider API keys via a secrets manager in a way the
 * packaged app's env-file loading doesn't expect. Running the real server in
 * an isolated container and pointing the desktop shell at it sidesteps that
 * entirely.
 *
 * Precedence:
 *   1. OMNIROUTE_REMOTE_URL env var (explicit, session-scoped override)
 *   2. `remoteServerUrl` key in <dataDir>/electron-preferences.json (persisted
 *      via the tray menu's "Connect to Remote Server…" prompt)
 *   3. null — caller falls back to spawning the local embedded server
 *
 * Extracted as a pure helper (env + fs injectable) so it can be unit-tested
 * without importing the full Electron main process (which requires the
 * Electron binary).
 *
 * @param {object} opts
 * @param {NodeJS.ProcessEnv} opts.env - injectable process.env (for tests)
 * @param {string} opts.prefsPath - absolute path to electron-preferences.json
 * @param {(p: string) => boolean} [opts.existsSync] - injectable fs.existsSync
 * @param {(p: string, enc: string) => string} [opts.readFileSync] - injectable fs.readFileSync
 * @returns {string|null} the validated http(s) remote URL (no trailing slash), or null if none configured
 */
function resolveRemoteServerUrl({
  env,
  prefsPath,
  existsSync = fs.existsSync,
  readFileSync = fs.readFileSync,
}) {
  const candidate = readCandidate({ env, prefsPath, existsSync, readFileSync });
  if (!candidate) return null;
  return isValidHttpUrl(candidate) ? stripTrailingSlash(candidate) : null;
}

function readCandidate({ env, prefsPath, existsSync, readFileSync }) {
  const fromEnv = (env.OMNIROUTE_REMOTE_URL || "").trim();
  if (fromEnv) return fromEnv;

  if (!prefsPath || !existsSync(prefsPath)) return null;
  try {
    const prefs = JSON.parse(readFileSync(prefsPath, "utf8"));
    const fromPrefs = typeof prefs.remoteServerUrl === "string" ? prefs.remoteServerUrl.trim() : "";
    return fromPrefs || null;
  } catch {
    // Corrupt/partial prefs file — fall back to spawning the local server
    // rather than crashing the app on startup.
    return null;
  }
}

/**
 * @param {string} candidate
 * @returns {boolean}
 */
function isValidHttpUrl(candidate) {
  try {
    const parsed = new URL(candidate);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function stripTrailingSlash(url) {
  return url.replace(/\/+$/, "");
}

module.exports = { resolveRemoteServerUrl, isValidHttpUrl };
