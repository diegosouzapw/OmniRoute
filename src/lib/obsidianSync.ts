import fs from "node:fs";
import path from "node:path";
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
