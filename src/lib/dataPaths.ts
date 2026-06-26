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

/**
 * Resolve the data directory and guarantee it is writable.
 *
 * Unlike {@link resolveDataDir} (a pure, side-effect-free path resolver used by
 * many callers), this variant probes the resolved directory by attempting to
 * create it. When a configured `DATA_DIR` is not writable (`EACCES`/`EPERM`),
 * it falls back to the default user directory so the app keeps working instead
 * of crashing on an unwritable, operator-supplied path. Any other error (e.g.
 * `ENOTDIR`, `ENOSPC`) still propagates.
 *
 * Use this only at the single startup site that owns directory creation
 * (currently `db/core.ts`); everywhere else keep using the pure resolver.
 */
export function resolveWritableDataDir({ isCloud = false }: { isCloud?: boolean } = {}): string {
  const resolved = resolveDataDir({ isCloud });

  // Cloud/serverless never owns a writable home dir; leave its sentinel alone.
  if (isCloud) return resolved;

  // No explicit override → already the default user dir; nothing to fall back to.
  const configured = normalizeConfiguredPath(process.env.DATA_DIR);
  if (!configured) return resolved;

  try {
    fs.mkdirSync(resolved, { recursive: true });
    return resolved;
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "EACCES" || code === "EPERM") {
      const fallback = getDefaultDataDir();
      console.warn(
        `[DATA_DIR] '${resolved}' is not writable (${code}) → falling back to '${fallback}'`
      );
      return fallback;
    }
    throw err;
  }
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
