import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const APP_NAME = "omniroute";

function normalizeConfiguredPath(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? path.resolve(trimmed) : null;
}

function safeHomeDir() {
  try {
    return os.homedir();
  } catch {
    return process.env.HOME || process.env.USERPROFILE || os.tmpdir();
  }
}

export function getLegacyDotDataDir(homeDir = safeHomeDir()) {
  return path.join(homeDir, `.${APP_NAME}`);
}

export function getDefaultDataDir() {
  const homeDir = safeHomeDir();
  const legacyDir = getLegacyDotDataDir(homeDir);

  if (fs.existsSync(legacyDir)) {
    try {
      if (fs.statSync(legacyDir).isDirectory()) {
        return legacyDir;
      }
    } catch {
      // Ignore stat errors and continue to the platform default.
    }
  }

  if (process.platform === "win32") {
    const appData = process.env.APPDATA || path.join(homeDir, "AppData", "Roaming");
    return path.join(appData, APP_NAME);
  }

  const xdgConfigHome = normalizeConfiguredPath(process.env.XDG_CONFIG_HOME);
  if (xdgConfigHome) return path.join(xdgConfigHome, APP_NAME);

  return legacyDir;
}

export function resolveDataDir() {
  const configured = normalizeConfiguredPath(process.env.DATA_DIR);
  if (configured) return configured;

  return getDefaultDataDir();
}

export function resolveStoragePath(dataDir = resolveDataDir()) {
  return path.join(dataDir, "storage.sqlite");
}
