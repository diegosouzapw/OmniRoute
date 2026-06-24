import { getDbInstance } from "./core";
import { getApiKeyContextSource } from "./apiKeyContextSources";
import { encrypt, decrypt } from "./encryption";

const OBSIDIAN_NAMESPACE = "obsidian";
const OBSIDIAN_TOKEN_KEY = "api_key";

type KeyValueRow = {
  value?: string;
};

export function getObsidianToken(): string | null {
  try {
    const db = getDbInstance();
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get(OBSIDIAN_NAMESPACE, OBSIDIAN_TOKEN_KEY) as KeyValueRow | undefined;
    if (typeof row?.value !== "string") return null;
    const parsed = JSON.parse(row.value);
    if (typeof parsed !== "string" || parsed.length === 0) return null;
    // Graceful fallback: if decrypt fails (e.g. no key set) return as-is
    return decrypt(parsed) ?? parsed;
  } catch {
    return null;
  }
}

export function setObsidianToken(token: string): void {
  try {
    const db = getDbInstance();
    const encrypted = encrypt(token) ?? token;
    db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
      OBSIDIAN_NAMESPACE,
      OBSIDIAN_TOKEN_KEY,
      JSON.stringify(encrypted)
    );
  } catch {
    // Non-fatal — token still works in-memory if persistence fails.
  }
}

export function clearObsidianToken(): void {
  try {
    const db = getDbInstance();
    db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(
      OBSIDIAN_NAMESPACE,
      OBSIDIAN_TOKEN_KEY
    );
  } catch {
    // Non-fatal.
  }
}

export function getObsidianBaseUrl(): string {
  try {
    const db = getDbInstance();
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get(OBSIDIAN_NAMESPACE, "base_url") as KeyValueRow | undefined;
    if (typeof row?.value === "string") {
      const parsed = JSON.parse(row.value);
      return typeof parsed === "string" && parsed.length > 0 ? parsed : "http://127.0.0.1:27123";
    }
    return "http://127.0.0.1:27123";
  } catch {
    return "http://127.0.0.1:27123";
  }
}

export function setObsidianBaseUrl(url: string): void {
  try {
    const db = getDbInstance();
    db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
      OBSIDIAN_NAMESPACE,
      "base_url",
      JSON.stringify(url)
    );
  } catch {
    // Non-fatal.
  }
}

export function getObsidianVaultPath(): string | null {
  try {
    const db = getDbInstance();
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get(OBSIDIAN_NAMESPACE, "vault_path") as KeyValueRow | undefined;
    if (typeof row?.value === "string") {
      const parsed = JSON.parse(row.value);
      return typeof parsed === "string" && parsed.length > 0 ? parsed : null;
    }
    return null;
  } catch {
    return null;
  }
}

export function setObsidianVaultPath(vaultPath: string): void {
  try {
    const db = getDbInstance();
    db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
      OBSIDIAN_NAMESPACE,
      "vault_path",
      JSON.stringify(vaultPath)
    );
  } catch {
    // Non-fatal.
  }
}

export function clearObsidianVaultPath(): void {
  try {
    const db = getDbInstance();
    db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(
      OBSIDIAN_NAMESPACE,
      "vault_path"
    );
  } catch {
    // Non-fatal.
  }
}

export function getWebdavUsername(): string | null {
  try {
    const db = getDbInstance();
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get(OBSIDIAN_NAMESPACE, "webdav_username") as KeyValueRow | undefined;
    if (typeof row?.value === "string") {
      const parsed = JSON.parse(row.value);
      return typeof parsed === "string" && parsed.length > 0 ? parsed : null;
    }
    return null;
  } catch {
    return null;
  }
}

export function setWebdavUsername(username: string): void {
  try {
    const db = getDbInstance();
    db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
      OBSIDIAN_NAMESPACE,
      "webdav_username",
      JSON.stringify(username)
    );
  } catch {
    // Non-fatal.
  }
}

export function clearWebdavUsername(): void {
  try {
    const db = getDbInstance();
    db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(
      OBSIDIAN_NAMESPACE,
      "webdav_username"
    );
  } catch {
    // Non-fatal.
  }
}

export function getWebdavPassword(): string | null {
  try {
    const db = getDbInstance();
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get(OBSIDIAN_NAMESPACE, "webdav_password") as KeyValueRow | undefined;
    if (typeof row?.value === "string") {
      const parsed = JSON.parse(row.value);
      if (typeof parsed !== "string" || parsed.length === 0) return null;
      // Graceful fallback: if decrypt fails return as-is (plaintext backward compat)
      return decrypt(parsed) ?? parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function setWebdavPassword(password: string): void {
  try {
    const db = getDbInstance();
    const encrypted = encrypt(password) ?? password;
    db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
      OBSIDIAN_NAMESPACE,
      "webdav_password",
      JSON.stringify(encrypted)
    );
  } catch {
    // Non-fatal.
  }
}

export function clearWebdavPassword(): void {
  try {
    const db = getDbInstance();
    db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(
      OBSIDIAN_NAMESPACE,
      "webdav_password"
    );
  } catch {
    // Non-fatal.
  }
}

export function getWebdavEnabled(): boolean {
  try {
    const db = getDbInstance();
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get(OBSIDIAN_NAMESPACE, "webdav_enabled") as KeyValueRow | undefined;
    if (typeof row?.value === "string") {
      return JSON.parse(row.value) === true;
    }
    return false;
  } catch {
    return false;
  }
}

export function setWebdavEnabled(enabled: boolean): void {
  try {
    const db = getDbInstance();
    db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
      OBSIDIAN_NAMESPACE,
      "webdav_enabled",
      JSON.stringify(enabled)
    );
  } catch {
    // Non-fatal.
  }
}

export function clearWebdavEnabled(): void {
  try {
    const db = getDbInstance();
    db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(
      OBSIDIAN_NAMESPACE,
      "webdav_enabled"
    );
  } catch {
    // Non-fatal.
  }
}

export function getObsidianConfig(): {
  token: string | null;
  connected: boolean;
  baseUrl: string;
  vaultPath: string | null;
} {
  const token = getObsidianToken();
  const baseUrl = getObsidianBaseUrl();
  const vaultPath = getObsidianVaultPath();
  return { token, connected: token !== null && token.length > 0, baseUrl, vaultPath };
}

export function getObsidianConfigForApiKey(apiKeyId: string | null | undefined): {
  token: string | null;
  baseUrl: string;
  vaultPath: string | null;
  source: "api_key" | "global";
} {
  if (apiKeyId) {
    try {
      const perKey = getApiKeyContextSource(apiKeyId, "obsidian");
      if (perKey && perKey.enabled && perKey.token) {
        return {
          token: perKey.token,
          baseUrl: perKey.baseUrl || getObsidianBaseUrl(),
          vaultPath: perKey.vaultPath || getObsidianVaultPath(),
          source: "api_key",
        };
      }
    } catch {
      // Per-key config not available — fall through to global
    }
  }
  return {
    token: getObsidianToken(),
    baseUrl: getObsidianBaseUrl(),
    vaultPath: getObsidianVaultPath(),
    source: "global",
  };
}
