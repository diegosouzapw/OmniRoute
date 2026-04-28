#!/usr/bin/env node
/**
 * OmniRoute — Environment Sync
 *
 * Ensures .env exists and contains the selected keys from .env.example.
 * Runs on installs and can be executed manually via `npm run env:sync`.
 *
 * Rules:
 *   - Never overwrites existing values in .env
 *   - Auto-generates cryptographic secrets if blank in .env.example
 *   - Copies default values from .env.example for new keys
 *   - Skips commented lines from .env.example
 */

import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);

const CRYPTO_SECRETS = {
  JWT_SECRET: () => randomBytes(64).toString("hex"),
  API_KEY_SECRET: () => randomBytes(32).toString("hex"),
  STORAGE_ENCRYPTION_KEY: () => randomBytes(32).toString("hex"),
  MACHINE_ID_SALT: () => `omniroute-${randomBytes(8).toString("hex")}`,
};

/**
 * Keys that MUST NOT be regenerated when existing encrypted data exists in the DB.
 * Generating a new key would make all previously-encrypted credentials unrecoverable.
 * @see https://github.com/diegosouzapw/OmniRoute/issues/1622
 */
const ENCRYPTION_BOUND_KEYS = new Set(["STORAGE_ENCRYPTION_KEY"]);

// ── Resolve DATA_DIR (mirrors bootstrap-env.mjs / dataPaths.ts) ─────────────
function resolveDataDir(env = process.env) {
  const configured = env.DATA_DIR?.trim();
  if (configured) return resolve(configured);

  if (process.platform === "win32") {
    const appData = env.APPDATA || join(homedir(), "AppData", "Roaming");
    return join(appData, "omniroute");
  }

  const xdg = env.XDG_CONFIG_HOME?.trim();
  if (xdg) return join(resolve(xdg), "omniroute");

  return join(homedir(), ".omniroute");
}

/**
 * Check whether the SQLite database already contains credentials encrypted
 * under a previous STORAGE_ENCRYPTION_KEY. If so, generating a new key would
 * make them permanently unrecoverable (AES-GCM auth-tag mismatch).
 */
function hasEncryptedCredentials(dataDir) {
  const dbPath = join(dataDir, "storage.sqlite");
  if (!existsSync(dbPath)) return false;

  try {
    const Database = require("better-sqlite3");
    const db = new Database(dbPath, { readonly: true, fileMustExist: true });
    try {
      const row = db
        .prepare(
          `SELECT 1
             FROM provider_connections
            WHERE access_token LIKE 'enc:v1:%'
               OR refresh_token LIKE 'enc:v1:%'
               OR api_key LIKE 'enc:v1:%'
               OR id_token LIKE 'enc:v1:%'
            LIMIT 1`
        )
        .get();
      return !!row;
    } finally {
      db.close();
    }
  } catch {
    // If we can't open the DB (e.g. missing better-sqlite3 during install),
    // err on the side of caution: don't block secret generation.
    return false;
  }
}

export function parseEnvFile(filePath) {
  if (!existsSync(filePath)) return new Map();

  const content = readFileSync(filePath, "utf8");
  const entries = new Map();

  for (const line of content.split(/\r?\n/)) {
    const parsed = parseEnvEntry(line);
    if (!parsed) continue;

    const [key, value] = parsed;
    entries.set(key, value);
  }

  return entries;
}

function parseEnvEntry(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;

  const eqIndex = trimmed.indexOf("=");
  if (eqIndex < 1) return null;

  const key = trimmed.slice(0, eqIndex).trim();
  const value = trimmed.slice(eqIndex + 1).trim();
  return [key, value];
}

function parseExampleEntries(content, scope = "full") {
  const entries = new Map();
  const lines = content.split(/\r?\n/);

  if (scope === "oauth") {
    let inOauthSection = false;

    for (const line of lines) {
      const trimmed = line.trim();

      if (/OAUTH PROVIDER CREDENTIALS/i.test(trimmed)) {
        inOauthSection = true;
        continue;
      }

      if (!inOauthSection) continue;

      if (/Provider User-Agent Overrides/i.test(trimmed)) break;

      const parsed = parseEnvEntry(line);
      if (!parsed) continue;

      const [key, value] = parsed;
      entries.set(key, value);
    }

    return entries;
  }

  for (const line of lines) {
    const parsed = parseEnvEntry(line);
    if (!parsed) continue;

    const [key, value] = parsed;
    entries.set(key, value);
  }

  return entries;
}

export function getEnvSyncPlan({ rootDir, scope = "full" } = {}) {
  const root = rootDir || dirname(dirname(fileURLToPath(import.meta.url)));
  const envExamplePath = join(root, ".env.example");
  const envPath = join(root, ".env");

  if (!existsSync(envExamplePath)) {
    return {
      available: false,
      created: false,
      added: 0,
      missingEntries: [],
    };
  }

  const exampleEntries = parseExampleEntries(readFileSync(envExamplePath, "utf8"), scope);
  const currentEntries = parseEnvFile(envPath);
  const missingEntries = [];

  // Check once whether encrypted data exists — avoids repeated DB opens
  let _encryptedDataExists;
  function encryptedDataExists() {
    if (_encryptedDataExists === undefined) {
      try {
        _encryptedDataExists = hasEncryptedCredentials(resolveDataDir());
      } catch {
        _encryptedDataExists = false;
      }
    }
    return _encryptedDataExists;
  }

  for (const [key, defaultValue] of exampleEntries) {
    if (currentEntries.has(key)) continue;

    if (CRYPTO_SECRETS[key] && !defaultValue) {
      // Guard: never generate a new encryption key if the DB already has
      // credentials encrypted under the previous key (#1622)
      if (ENCRYPTION_BOUND_KEYS.has(key) && encryptedDataExists()) {
        missingEntries.push({
          key,
          value: "",
          generated: false,
          blocked: true,
        });
        continue;
      }
      missingEntries.push({ key, value: CRYPTO_SECRETS[key](), generated: true });
      continue;
    }

    missingEntries.push({ key, value: defaultValue, generated: false });
  }

  return {
    available: true,
    created: !existsSync(envPath),
    added: missingEntries.length,
    missingEntries,
  };
}

function replaceBlankSecret(content, key, value) {
  const pattern = new RegExp(`^${key}=\\s*$`, "m");
  return pattern.test(content) ? content.replace(pattern, `${key}=${value}`) : content;
}

export function syncEnv({ rootDir, quiet = false, scope = "full" } = {}) {
  const log = quiet ? () => {} : (message) => process.stderr.write(`[sync-env] ${message}\n`);
  const root = rootDir || dirname(dirname(fileURLToPath(import.meta.url)));
  const envExamplePath = join(root, ".env.example");
  const envPath = join(root, ".env");

  if (!existsSync(envExamplePath)) {
    log("⚠️  .env.example not found — skipping sync");
    return { created: false, added: 0 };
  }

  const exampleEntries = parseExampleEntries(readFileSync(envExamplePath, "utf8"), scope);

  if (!existsSync(envPath)) {
    if (scope === "full") {
      copyFileSync(envExamplePath, envPath);

      let content = readFileSync(envPath, "utf8");
      let generated = 0;

      // Check once whether encrypted data exists — avoids repeated DB opens
      let dbHasEncrypted;
      try {
        dbHasEncrypted = hasEncryptedCredentials(resolveDataDir());
      } catch {
        dbHasEncrypted = false;
      }

      for (const [key, generator] of Object.entries(CRYPTO_SECRETS)) {
        // Guard: never generate a new encryption key if the DB already has
        // credentials encrypted under the previous key (#1622)
        if (ENCRYPTION_BOUND_KEYS.has(key) && dbHasEncrypted) {
          log(
            `⚠️  ${key} NOT generated — encrypted credentials exist in DB. ` +
              `Restore your previous key via ~/.omniroute/server.env, ~/.omniroute/.env, ` +
              `or the STORAGE_ENCRYPTION_KEY environment variable.`
          );
          continue;
        }
        const nextContent = replaceBlankSecret(content, key, generator());
        if (nextContent !== content) {
          content = nextContent;
          generated++;
          log(`✨ ${key} auto-generated`);
        }
      }

      writeFileSync(envPath, content, "utf8");
      log(
        `✨ Created .env from .env.example (${exampleEntries.size} keys, ${generated} secrets generated)`
      );
      return { created: true, added: exampleEntries.size };
    }

    const { missingEntries } = getEnvSyncPlan({ rootDir: root, scope });
    const content = [
      "# ── Auto-added by sync-env (oauth defaults) ──",
      ...missingEntries.map((entry) => `${entry.key}=${entry.value}`),
      "",
    ].join("\n");
    writeFileSync(envPath, content, "utf8");
    log(`✨ Created .env with oauth defaults (${missingEntries.length} keys)`);
    return { created: true, added: missingEntries.length };
  }

  const { missingEntries } = getEnvSyncPlan({ rootDir: root, scope });

  if (missingEntries.length === 0) {
    log("✅ .env is up to date (0 keys added)");
    return { created: false, added: 0 };
  }

  const appendLines = [
    "",
    `# ── Auto-added by sync-env (${new Date().toISOString().slice(0, 10)}) ──`,
  ];

  for (const entry of missingEntries) {
    if (entry.blocked) {
      log(
        `⚠️  ${entry.key} NOT generated — encrypted credentials exist in DB. ` +
          `Restore your previous key via ~/.omniroute/server.env, ~/.omniroute/.env, ` +
          `or the STORAGE_ENCRYPTION_KEY environment variable.`
      );
      continue;
    }
    appendLines.push(`${entry.key}=${entry.value}`);
    log(
      `${entry.generated ? "✨" : "📦"} ${entry.key}${entry.generated ? " (auto-generated)" : ""}`
    );
  }

  appendLines.push("");

  const currentContent = readFileSync(envPath, "utf8");
  writeFileSync(envPath, `${currentContent.trimEnd()}\n${appendLines.join("\n")}`, "utf8");
  log(`📦 Synced .env — added ${missingEntries.length} missing keys`);

  return { created: false, added: missingEntries.length };
}

if (process.argv[1]?.endsWith("sync-env.mjs")) {
  syncEnv({ scope: process.argv.includes("--oauth-only") ? "oauth" : "full" });
}
