"use strict";

const fs = require("fs");
const path = require("path");

/**
 * remoteServerPreferences.js — pure read/write helpers for the small JSON
 * preferences file that persists desktop-shell choices needed before the
 * server-owned settings database is available.
 *
 * Deliberately a plain flat JSON file rather than the app's SQLite database:
 * this preference must be readable before deciding whether to spawn (or even
 * reach) the local server, so it cannot depend on any server-owned storage.
 *
 * Extracted as pure, dependency-injectable helpers so they can be unit-tested
 * without importing the full Electron main process.
 *
 * @param {string} prefsPath - absolute path to electron-preferences.json
 * @param {(p: string) => boolean} [existsSync]
 * @param {(p: string, enc: string) => string} [readFileSync]
 * @returns {{remoteServerUrl: string|null, closeBehavior: "keep-loaded"|"unload"}}
 */
function readPreferences(prefsPath, existsSync = fs.existsSync, readFileSync = fs.readFileSync) {
  if (!existsSync(prefsPath)) return { remoteServerUrl: null, closeBehavior: "keep-loaded" };
  try {
    const parsed = JSON.parse(readFileSync(prefsPath, "utf8"));
    const remoteServerUrl =
      typeof parsed.remoteServerUrl === "string" && parsed.remoteServerUrl.trim()
        ? parsed.remoteServerUrl.trim()
        : null;
    const closeBehavior = parsed.closeBehavior === "unload" ? "unload" : "keep-loaded";
    return { remoteServerUrl, closeBehavior };
  } catch {
    return { remoteServerUrl: null, closeBehavior: "keep-loaded" };
  }
}

/**
 * Persist the remote server URL preference. Pass `null` to clear it (reverts
 * to spawning the local embedded server on next restart).
 *
 * @param {string} prefsPath
 * @param {string|null} remoteServerUrl
 * @param {(p: string) => boolean} [existsSync]
 * @param {(p: string, enc: string) => string} [readFileSync]
 * @param {(p: string, data: string, enc: string) => void} [writeFileSync]
 * @param {(p: string, opts: object) => void} [mkdirSync]
 */
function writeRemoteServerUrl(
  prefsPath,
  remoteServerUrl,
  {
    existsSync = fs.existsSync,
    readFileSync = fs.readFileSync,
    writeFileSync = fs.writeFileSync,
    mkdirSync = fs.mkdirSync,
  } = {}
) {
  try {
    const dir = path.dirname(prefsPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    const current = readPreferences(prefsPath, existsSync, readFileSync);
    const next = { ...current, remoteServerUrl: remoteServerUrl || null };
    writeFileSync(prefsPath, JSON.stringify(next, null, 2) + "\n", "utf8");
  } catch (err) {
    console.error(
      `[remoteServerPreferences] Failed to write preferences to ${prefsPath}:`,
      err instanceof Error ? err.message : String(err)
    );
  }
}

/** Persist whether closing the dashboard hides it or unloads its renderer. */
function writeCloseBehavior(
  prefsPath,
  closeBehavior,
  {
    existsSync = fs.existsSync,
    readFileSync = fs.readFileSync,
    writeFileSync = fs.writeFileSync,
    mkdirSync = fs.mkdirSync,
  } = {}
) {
  try {
    const dir = path.dirname(prefsPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    const current = readPreferences(prefsPath, existsSync, readFileSync);
    const next = {
      ...current,
      closeBehavior: closeBehavior === "unload" ? "unload" : "keep-loaded",
    };
    writeFileSync(prefsPath, JSON.stringify(next, null, 2) + "\n", "utf8");
  } catch (err) {
    console.error(
      `[remoteServerPreferences] Failed to write preferences to ${prefsPath}:`,
      err instanceof Error ? err.message : String(err)
    );
  }
}

module.exports = { readPreferences, writeRemoteServerUrl, writeCloseBehavior };
