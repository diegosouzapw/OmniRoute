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

export function resolveDataDir() {
  const configured = normalizeConfiguredPath(process.env.DATA_DIR);
  if (configured) return configured;

  const homeDir = safeHomeDir();
  if (process.platform === "win32") {
    const appData = process.env.APPDATA || path.join(homeDir, "AppData", "Roaming");
    return path.join(appData, APP_NAME);
  }

  const xdgConfigHome = normalizeConfiguredPath(process.env.XDG_CONFIG_HOME);
  if (xdgConfigHome) return path.join(xdgConfigHome, APP_NAME);

  return path.join(homeDir, `.${APP_NAME}`);
}

export function resolveStoragePath(dataDir = resolveDataDir()) {
  return path.join(dataDir, "storage.sqlite");
}
