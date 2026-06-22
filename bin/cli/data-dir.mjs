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

/**
 * #4597 — Pure data-dir precedence decision, mirroring the server resolver
 * (src/lib/dataPaths.ts `getDefaultDataDir`): DATA_DIR → existing legacy
 * ~/.omniroute → Windows APPDATA → XDG_CONFIG_HOME → legacy. The CLI previously
 * checked XDG *before* the legacy directory, so on a machine with both
 * XDG_CONFIG_HOME set and an existing ~/.omniroute the server opened the legacy
 * DB while CLI maintenance commands operated on the XDG DB — silent drift.
 *
 * Side-effect-free so it is unit-testable without mocking fs/os.
 */
export function chooseDataDir({
  dataDirEnv,
  platform,
  appData,
  xdgConfigHome,
  homeDir,
  legacyExists,
}) {
  const configured = normalizeConfiguredPath(dataDirEnv);
  if (configured) return configured;

  const legacyDir = path.join(homeDir, `.${APP_NAME}`);

  // Preserve an existing legacy directory before any XDG/APPDATA path so the
  // CLI and the server resolve to the same data directory.
  if (legacyExists) return legacyDir;

  if (platform === "win32") {
    const resolvedAppData = appData || path.join(homeDir, "AppData", "Roaming");
    return path.join(resolvedAppData, APP_NAME);
  }

  const xdg = normalizeConfiguredPath(xdgConfigHome);
  if (xdg) return path.join(xdg, APP_NAME);

  return legacyDir;
}

export function resolveDataDir() {
  const homeDir = safeHomeDir();
  const legacyDir = path.join(homeDir, `.${APP_NAME}`);

  let legacyExists = false;
  try {
    legacyExists = fs.existsSync(legacyDir) && fs.statSync(legacyDir).isDirectory();
  } catch {
    // Ignore stat errors — treat as non-existent.
  }

  return chooseDataDir({
    dataDirEnv: process.env.DATA_DIR,
    platform: process.platform,
    appData: process.env.APPDATA,
    xdgConfigHome: process.env.XDG_CONFIG_HOME,
    homeDir,
    legacyExists,
  });
}

export function resolveStoragePath(dataDir = resolveDataDir()) {
  return path.join(dataDir, "storage.sqlite");
}
