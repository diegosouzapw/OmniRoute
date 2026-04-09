#!/usr/bin/env node
/**
 * OmniRoute — Environment Sync
 *
 * Ensures .env exists and contains all keys from .env.example.
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
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eqIndex = trimmed.indexOf("=");
    if (eqIndex < 1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    entries.set(key, value);
  }

  return entries;
}

function replaceBlankSecret(content, key, value) {
  const pattern = new RegExp(`^${key}=\\s*$`, "m");
  return pattern.test(content) ? content.replace(pattern, `${key}=${value}`) : content;
}

export function syncEnv({ rootDir, quiet = false } = {}) {
  const log = quiet ? () => {} : (message) => process.stderr.write(`[sync-env] ${message}\n`);
  const root = rootDir || dirname(dirname(fileURLToPath(import.meta.url)));
  const envExamplePath = join(root, ".env.example");
  const envPath = join(root, ".env");

  if (!existsSync(envExamplePath)) {
    log("⚠️  .env.example not found — skipping sync");
    return { created: false, added: 0 };
  }

  const exampleEntries = parseEnvFile(envExamplePath);

  if (!existsSync(envPath)) {
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

  const currentEntries = parseEnvFile(envPath);
  const missingEntries = [];

  for (const [key, defaultValue] of exampleEntries) {
    if (currentEntries.has(key)) continue;

    if (CRYPTO_SECRETS[key] && !defaultValue) {
      missingEntries.push({
        key,
        value: CRYPTO_SECRETS[key](),
        generated: true,
      });
      continue;
    }

    missingEntries.push({
      key,
      value: defaultValue,
      generated: false,
    });
  }

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
  syncEnv();
}
