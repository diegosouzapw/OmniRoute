import os from "os";
import path from "path";

const APP_NAME = "omniroute";

function fallbackHomeDir(): string {
  const envHome = process.env.HOME || process.env.USERPROFILE;
  return typeof envHome === "string" && envHome.trim() ? path.resolve(envHome) : os.tmpdir();
}

function safeHomeDir(): string {
  try {
    return os.homedir();
  } catch {
    return fallbackHomeDir();
  }
}

function normalizeConfiguredPath(dir: unknown): string | null {
  if (typeof dir !== "string") return null;
  const trimmed = dir.trim();
  return trimmed ? path.resolve(trimmed) : null;
}

export function resolveMitmDataDir(): string {
  const configured = normalizeConfiguredPath(process.env.DATA_DIR);
  if (configured) return configured;

  const homeDir = safeHomeDir();
  if (process.platform === "win32") {
    const appData = process.env.APPDATA || path.join(homeDir, "AppData", "Roaming");
    return path.join(appData, APP_NAME);
  }

  const xdgConfigHome = normalizeConfiguredPath(process.env.XDG_CONFIG_HOME);
  if (xdgConfigHome) {
    return path.join(xdgConfigHome, APP_NAME);
  }

  return path.join(homeDir, `.${APP_NAME}`);
}
