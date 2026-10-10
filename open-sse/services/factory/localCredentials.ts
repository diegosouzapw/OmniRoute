import { execFile } from "node:child_process";
import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";

const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
const KEY_LENGTH = 32;
const MAX_FILE_SIZE_BYTES = 1024 * 1024; // 1 MB limit to prevent unbounded memory usage

function decodeBase64(value: string): Buffer | null {
  const trimmed = value.trim();
  if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(trimmed)) {
    return null;
  }
  const decoded = Buffer.from(trimmed, "base64");
  return decoded.toString("base64") === trimmed ? decoded : null;
}

export type FactoryCliBackend = "keychain" | "file";
export type FactoryCliFileName = "auth.v2.loginkeychain" | "auth.v2.file";
export type FactoryCliSyncStatus = "updated" | "unchanged" | "conflict" | "unavailable";

export interface FactoryCliSession {
  accessToken: string;
  refreshToken: string;
  activeOrganizationId?: string;
  backend: FactoryCliBackend;
  fileName: FactoryCliFileName;
  rawPayload?: Record<string, unknown>;
}

export interface FactoryCliSyncExpected {
  backend: FactoryCliBackend;
  fileName: FactoryCliFileName;
  preRefreshAccessToken: string;
  preRefreshRefreshToken: string;
  lastSyncedFingerprint?: string;
  activeOrganizationId?: string;
}

export interface FactoryLocalSyncMarker {
  backend: FactoryCliBackend;
  fileName: FactoryCliFileName;
  tokenFingerprint: string;
  syncedAt: string;
}

export interface FactoryCliIo {
  readKeychainKey?(): Promise<Buffer | null>;
}

export function computeTokenFingerprint(accessToken: string, refreshToken: string): string {
  return crypto
    .createHash("sha256")
    .update(accessToken + "\0" + refreshToken)
    .digest("hex");
}

export function buildFactoryLocalSyncMarker(
  backend: FactoryCliBackend,
  fileName: FactoryCliFileName,
  accessToken: string,
  refreshToken: string
): FactoryLocalSyncMarker {
  return {
    backend,
    fileName,
    tokenFingerprint: computeTokenFingerprint(accessToken, refreshToken),
    syncedAt: new Date().toISOString(),
  };
}

export function decryptPayload(ciphertext: string, key: Buffer): Record<string, unknown> | null {
  if (key.length !== KEY_LENGTH) return null;
  const parts = ciphertext.trim().split(":");
  if (parts.length !== 3) return null;

  try {
    const iv = decodeBase64(parts[0]);
    const authTag = decodeBase64(parts[1]);
    const encryptedData = decodeBase64(parts[2]);

    if (
      !iv ||
      !authTag ||
      !encryptedData ||
      encryptedData.length === 0 ||
      iv.length !== IV_LENGTH ||
      authTag.length !== AUTH_TAG_LENGTH
    ) {
      return null;
    }

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
    const parsed: unknown = JSON.parse(decrypted.toString("utf8"));
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

export function encryptPayload(payload: Record<string, unknown>, key: Buffer): string | null {
  if (!payload || key.length !== KEY_LENGTH) return null;
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    const json = Buffer.from(JSON.stringify(payload), "utf8");
    const encrypted = Buffer.concat([cipher.update(json), cipher.final()]);
    const authTag = cipher.getAuthTag();
    return `${iv.toString("base64")}:${authTag.toString("base64")}:${encrypted.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function defaultReadKeychainKey(): Promise<Buffer | null> {
  if (process.platform !== "darwin") {
    return null;
  }

  const { promise, resolve } = Promise.withResolvers<Buffer | null>();
  execFile(
    "/usr/bin/security",
    ["find-generic-password", "-s", "Factory CLI", "-w"],
    { encoding: "utf8", timeout: 5000 },
    (error, stdout) => {
      if (error || !stdout) {
        resolve(null);
        return;
      }
      try {
        const trimmed = stdout.trim();
        if (trimmed.length > 0) {
          const buf = decodeBase64(trimmed);
          if (buf?.length === KEY_LENGTH) {
            resolve(buf);
            return;
          }
        }
      } catch {
        // ignore parsing error
      }
      resolve(null);
    }
  );
  return promise;
}

function safeReadFile(filePath: string): string | null {
  try {
    const stat = fs.lstatSync(filePath);
    if (stat.isSymbolicLink() || !stat.isFile() || stat.size > MAX_FILE_SIZE_BYTES) {
      return null;
    }
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

/**
 * Loads and decrypts credentials stored locally by Factory CLI.
 *
 * Checks macOS Keychain-backed storage first on darwin, then file-backed key storage.
 */
export async function loadFactoryCliCredentials(
  directory: string,
  io?: FactoryCliIo
): Promise<FactoryCliSession | null> {
  if (!directory || typeof directory !== "string") {
    return null;
  }

  const loginKeychainPath = path.join(directory, "auth.v2.loginkeychain");
  const encryptedContent = safeReadFile(loginKeychainPath);
  const keychainKey = encryptedContent
    ? io?.readKeychainKey
      ? await io.readKeychainKey()
      : await defaultReadKeychainKey()
    : null;

  if (encryptedContent && keychainKey && keychainKey.length === KEY_LENGTH) {
    const payload = decryptPayload(encryptedContent, keychainKey);
    if (
      payload &&
      typeof payload.access_token === "string" &&
      payload.access_token.trim().length > 0 &&
      typeof payload.refresh_token === "string" &&
      payload.refresh_token.trim().length > 0
    ) {
      return {
        accessToken: payload.access_token.trim(),
        refreshToken: payload.refresh_token.trim(),
        activeOrganizationId:
          typeof payload.active_organization_id === "string" &&
          payload.active_organization_id.trim().length > 0
            ? payload.active_organization_id.trim()
            : undefined,
        backend: "keychain",
        fileName: "auth.v2.loginkeychain",
        rawPayload: payload,
      };
    }
  }

  // 2. Try file-backed key (auth.v2.key)
  const keyFilePath = path.join(directory, "auth.v2.key");
  const keyFileContent = safeReadFile(keyFilePath);
  if (keyFileContent) {
    try {
      const fileKey = decodeBase64(keyFileContent);
      if (fileKey?.length === KEY_LENGTH) {
        const candidateFiles: FactoryCliFileName[] = ["auth.v2.file", "auth.v2.loginkeychain"];
        for (const fileName of candidateFiles) {
          const candidatePath = path.join(directory, fileName);
          const encrypted = safeReadFile(candidatePath);
          if (encrypted) {
            const payload = decryptPayload(encrypted, fileKey);
            if (
              payload &&
              typeof payload.access_token === "string" &&
              payload.access_token.trim().length > 0 &&
              typeof payload.refresh_token === "string" &&
              payload.refresh_token.trim().length > 0
            ) {
              return {
                accessToken: payload.access_token.trim(),
                refreshToken: payload.refresh_token.trim(),
                activeOrganizationId:
                  typeof payload.active_organization_id === "string" &&
                  payload.active_organization_id.trim().length > 0
                    ? payload.active_organization_id.trim()
                    : undefined,
                backend: "file",
                fileName,
                rawPayload: payload,
              };
            }
          }
        }
      }
    } catch {
      // Key file unreadable or invalid
    }
  }

  return null;
}

/**
 * Synchronizes newly rotated credentials back to local Factory CLI storage.
 *
 * Performs safe write-back only when:
 * 1. Target store file and key exist (never creates new Keychain items or stores).
 * 2. Current stored tokens match the pre-refresh generation OR last-synced fingerprint.
 * 3. Atomic rename via temporary file with mode 0600 prevents partial corruption.
 */
export async function syncFactoryCliCredentials(
  directory: string,
  expected: FactoryCliSyncExpected,
  next: FactoryCliSession,
  io?: FactoryCliIo
): Promise<FactoryCliSyncStatus> {
  if (!directory || typeof directory !== "string" || !expected || !next) {
    return "unavailable";
  }

  try {
    const targetPath = path.join(directory, expected.fileName);
    const currentContent = safeReadFile(targetPath);
    if (!currentContent) {
      return "unavailable";
    }

    let key: Buffer | null = null;
    if (expected.backend === "keychain") {
      key = io?.readKeychainKey ? await io.readKeychainKey() : await defaultReadKeychainKey();
    } else if (expected.backend === "file") {
      const keyFilePath = path.join(directory, "auth.v2.key");
      const keyContent = safeReadFile(keyFilePath);
      if (keyContent) {
        const buf = decodeBase64(keyContent);
        if (buf?.length === KEY_LENGTH) {
          key = buf;
        }
      }
    }

    if (!key || key.length !== KEY_LENGTH) {
      return "unavailable";
    }

    const currentPayload = decryptPayload(currentContent, key);
    if (!currentPayload) {
      return "conflict";
    }

    const currentAccess =
      typeof currentPayload.access_token === "string" ? currentPayload.access_token.trim() : "";
    const currentRefresh =
      typeof currentPayload.refresh_token === "string" ? currentPayload.refresh_token.trim() : "";

    if (!currentAccess || !currentRefresh) {
      return "conflict";
    }

    const currentFingerprint = computeTokenFingerprint(currentAccess, currentRefresh);
    const nextFingerprint = computeTokenFingerprint(next.accessToken, next.refreshToken);

    if (currentFingerprint === nextFingerprint) {
      return "unchanged";
    }

    const preRefreshFingerprint = computeTokenFingerprint(
      expected.preRefreshAccessToken,
      expected.preRefreshRefreshToken
    );
    const matchesPreRefresh = currentFingerprint === preRefreshFingerprint;
    const matchesLastSynced = Boolean(
      expected.lastSyncedFingerprint && currentFingerprint === expected.lastSyncedFingerprint
    );

    if (!matchesPreRefresh && !matchesLastSynced) {
      return "conflict";
    }

    if (
      expected.activeOrganizationId &&
      typeof currentPayload.active_organization_id === "string" &&
      currentPayload.active_organization_id.trim() !== expected.activeOrganizationId.trim()
    ) {
      return "conflict";
    }

    const updatedPayload: Record<string, unknown> = {
      ...currentPayload,
      access_token: next.accessToken,
      refresh_token: next.refreshToken,
    };
    if (next.activeOrganizationId) {
      updatedPayload.active_organization_id = next.activeOrganizationId;
    }

    const encrypted = encryptPayload(updatedPayload, key);
    if (!encrypted) {
      return "unavailable";
    }

    const tempFileName = `.auth.tmp-${crypto.randomBytes(8).toString("hex")}`;
    const tempPath = path.join(directory, tempFileName);

    try {
      fs.writeFileSync(tempPath, encrypted, { encoding: "utf8", mode: 0o600 });
      fs.renameSync(tempPath, targetPath);
      try {
        fs.chmodSync(targetPath, 0o600);
      } catch {
        // non-fatal
      }
      return "updated";
    } catch {
      try {
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
      } catch {
        // non-fatal
      }
      return "unavailable";
    }
  } catch {
    return "unavailable";
  }
}
