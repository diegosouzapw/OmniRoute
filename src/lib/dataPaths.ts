import path from "path";
import os from "os";
import fs from "fs";

export const APP_NAME = "omniroute";

function fallbackHomeDir() {
  const envHome = process.env.HOME || process.env.USERPROFILE;
  if (typeof envHome === "string" && envHome.trim().length > 0) {
    return path.resolve(envHome);
  }

  return os.tmpdir();
}

function safeHomeDir() {
  try {
    return os.homedir();
  } catch {
    return fallbackHomeDir();
  }
}

function normalizeConfiguredPath(dir: unknown): string | null {
  if (typeof dir !== "string") return null;
  const trimmed = dir.trim();
  if (!trimmed) return null;
  return path.resolve(trimmed);
}

export function getLegacyDotDataDir() {
  return path.join(safeHomeDir(), `.${APP_NAME}`);
}

export function getDefaultDataDir() {
  const homeDir = safeHomeDir();
  const legacyDir = getLegacyDotDataDir();

  // Preserve legacy path if it exists to avoid data loss on updates (e.g., Windows migration)
  if (fs.existsSync(legacyDir)) {
    try {
      if (fs.statSync(legacyDir).isDirectory()) {
        return legacyDir;
      }
    } catch {
      // Ignore stat errors
    }
  }

  if (process.platform === "win32") {
    const appData = process.env.APPDATA || path.join(homeDir, "AppData", "Roaming");
    return path.join(appData, APP_NAME);
  }

  // Support XDG on Linux/macOS when explicitly configured.
  const xdgConfigHome = normalizeConfiguredPath(process.env.XDG_CONFIG_HOME);
  if (xdgConfigHome) {
    return path.join(xdgConfigHome, APP_NAME);
  }

  return legacyDir;
}

export function resolveDataDir({ isCloud = false }: { isCloud?: boolean } = {}): string {
  if (isCloud) return "/tmp";

  const configured = normalizeConfiguredPath(process.env.DATA_DIR);
  if (configured) return configured;

  return getDefaultDataDir();
}

export function isSamePath(a: string | null | undefined, b: string | null | undefined): boolean {
  if (!a || !b) return false;
  const normalizedA = path.resolve(a);
  const normalizedB = path.resolve(b);

  if (process.platform === "win32") {
    return normalizedA.toLowerCase() === normalizedB.toLowerCase();
  }

  return normalizedA === normalizedB;
}
