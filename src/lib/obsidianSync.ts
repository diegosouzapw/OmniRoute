import fs from "node:fs";
import path from "node:path";
import { resolveDataDir } from "./dataPaths";
import {
  getObsidianVaultPath,
  setObsidianVaultPath,
  clearObsidianVaultPath,
  getWebdavUsername,
  setWebdavUsername,
  getWebdavPassword,
  setWebdavPassword,
  clearWebdavUsername,
  clearWebdavPassword,
  getWebdavEnabled,
  setWebdavEnabled,
  clearWebdavEnabled,
} from "./db/obsidian";

export type ObsidianSyncStatus = {
  vaultPath: string | null;
  webdavEnabled: boolean;
  webdavUsername: string | null;
  webdavPassword: string | null;
};

export type ObsidianSyncEnableResult =
  | { success: true; vaultPath: string; username: string; password: string }
  | { success: false; error: string };

export async function getObsidianSyncStatus(): Promise<ObsidianSyncStatus> {
  const vaultPath = getObsidianVaultPath();
  const webdavEnabled = getWebdavEnabled();
  const webdavUsername = getWebdavUsername();
  const webdavPassword = getWebdavPassword();

  return { vaultPath, webdavEnabled, webdavUsername, webdavPassword };
}

/** Canonical (symlink-resolved) form of a path; falls back to the lexical resolve. */
function canonicalPath(target: string): string {
  try {
    return fs.realpathSync.native(target);
  } catch {
    return path.resolve(target);
  }
}

/** True when `child` is `parent` itself or lives anywhere below it. */
function isSameOrInside(parent: string, child: string): boolean {
  const rel = path.relative(parent, child);
  if (rel === "") return true;
  if (path.isAbsolute(rel)) return false; // different drive (win32)
  return rel !== ".." && !rel.startsWith(`..${path.sep}`);
}

/**
 * GHSA-7pq4-8pvv-rx7r: the WebDAV file service (scripts/dev/webdav-handler.mjs)
 * serves the vault root to anyone holding the Basic credentials, before Next.js
 * and outside the authz pipeline. A vault that IS the data directory, sits
 * inside it, or CONTAINS it turns that service into a reader for server.env
 * (JWT_SECRET / STORAGE_ENCRYPTION_KEY / API_KEY_SECRET) and storage.sqlite.
 * Both sides are realpath-resolved so a symlink cannot dodge the comparison.
 */
export function vaultPathOverlapsDataDir(resolvedVaultPath: string): boolean {
  const vault = canonicalPath(resolvedVaultPath);
  const dataDir = canonicalPath(resolveDataDir());
  return isSameOrInside(dataDir, vault) || isSameOrInside(vault, dataDir);
}

export const VAULT_OVERLAPS_DATA_DIR_ERROR =
  "Vault path must not be the OmniRoute data directory, a directory inside it, or a directory that contains it";

export async function enableObsidianVaultSync(
  vaultPath: string
): Promise<ObsidianSyncEnableResult> {
  const resolvedPath = path.resolve(vaultPath);

  if (!fs.existsSync(resolvedPath)) {
    return { success: false, error: `Vault directory not found: ${resolvedPath}` };
  }

  const stat = fs.statSync(resolvedPath);
  if (!stat.isDirectory()) {
    return { success: false, error: `Path is not a directory: ${resolvedPath}` };
  }

  if (vaultPathOverlapsDataDir(resolvedPath)) {
    return { success: false, error: VAULT_OVERLAPS_DATA_DIR_ERROR };
  }

  try {
    setObsidianVaultPath(resolvedPath);

    const username = generateRandomString(12);
    const password = generateRandomString(24);

    setWebdavUsername(username);
    setWebdavPassword(password);
    setWebdavEnabled(true);

    return { success: true, vaultPath: resolvedPath, username, password };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return { success: false, error: msg };
  }
}

export async function disableObsidianVaultSync(): Promise<{ success: boolean; error?: string }> {
  try {
    const vaultPath = getObsidianVaultPath();
    if (vaultPath) {
      removeStignore(vaultPath);
    }
    clearObsidianVaultPath();
    clearWebdavUsername();
    clearWebdavPassword();
    clearWebdavEnabled();
    return { success: true };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return { success: false, error: msg };
  }
}

function removeStignore(vaultPath: string): void {
  try {
    const stignorePath = path.join(vaultPath, ".stignore");
    if (fs.existsSync(stignorePath)) {
      const content = fs.readFileSync(stignorePath, "utf-8");
      const marker = "# Managed by OmniRoute";
      if (content.includes(marker)) {
        fs.unlinkSync(stignorePath);
      }
    }
  } catch {
    // Non-critical
  }
}

function generateRandomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const buf = new Uint8Array(length);
  crypto.getRandomValues(buf);
  for (let i = 0; i < length; i++) {
    result += chars[buf[i] % chars.length];
  }
  return result;
}
