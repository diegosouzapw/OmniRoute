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
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const CRYPTO_SECRETS = {
  JWT_SECRET: () => randomBytes(64).toString("hex"),
  API_KEY_SECRET: () => randomBytes(32).toString("hex"),
  STORAGE_ENCRYPTION_KEY: () => randomBytes(32).toString("hex"),
  MACHINE_ID_SALT: () => `omniroute-${randomBytes(8).toString("hex")}`,
};

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

  for (const [key, defaultValue] of exampleEntries) {
    if (currentEntries.has(key)) continue;

    if (CRYPTO_SECRETS[key] && !defaultValue) {
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
      for (const [key, generator] of Object.entries(CRYPTO_SECRETS)) {
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
