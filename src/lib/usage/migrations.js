/**
 * Usage Migrations — extracted from usageDb.js (T-15)
 *
 * Handles legacy file migration (.data → data/) and JSON → SQLite migration.
 * Runs automatically on module load when shouldPersistToDisk is true.
 *
 * @module lib/usage/migrations
 */

import path from "path";
import fs from "fs";
import { getDbInstance, isCloud, isBuildPhase, DATA_DIR } from "../db/core.js";
import { getLegacyDotDataDir, isSamePath } from "../dataPaths.js";

export const shouldPersistToDisk = !isCloud && !isBuildPhase;

// ──────────────── File Paths ────────────────

const LEGACY_DATA_DIR = isCloud ? null : getLegacyDotDataDir();

export const LOG_FILE = isCloud ? null : path.join(DATA_DIR, "log.txt");
export const CALL_LOGS_DIR = isCloud ? null : path.join(DATA_DIR, "call_logs");

// Legacy paths
const LEGACY_DB_FILE =
  isCloud || !LEGACY_DATA_DIR ? null : path.join(LEGACY_DATA_DIR, "usage.json");
const LEGACY_LOG_FILE =
  isCloud || !LEGACY_DATA_DIR ? null : path.join(LEGACY_DATA_DIR, "log.txt");
const LEGACY_CALL_LOGS_DB_FILE =
  isCloud || !LEGACY_DATA_DIR ? null : path.join(LEGACY_DATA_DIR, "call_logs.json");
const LEGACY_CALL_LOGS_DIR =
  isCloud || !LEGACY_DATA_DIR ? null : path.join(LEGACY_DATA_DIR, "call_logs");

// Current-location JSON files (for migration into SQLite)
const USAGE_JSON_FILE = isCloud ? null : path.join(DATA_DIR, "usage.json");
const CALL_LOGS_JSON_FILE = isCloud ? null : path.join(DATA_DIR, "call_logs.json");

// ──────────────── Legacy File Migration ────────────────

function copyIfMissing(fromPath, toPath, label) {
  if (!fromPath || !toPath) return;
  if (!fs.existsSync(fromPath) || fs.existsSync(toPath)) return;

  if (fs.statSync(fromPath).isDirectory()) {
    fs.cpSync(fromPath, toPath, { recursive: true });
  } else {
    fs.copyFileSync(fromPath, toPath);
  }
  console.log(`[usageDb] Migrated ${label}: ${fromPath} -> ${toPath}`);
}

export function migrateLegacyUsageFiles() {
  if (!shouldPersistToDisk || !LEGACY_DATA_DIR) return;
  if (isSamePath(DATA_DIR, LEGACY_DATA_DIR)) return;

  try {
    copyIfMissing(LEGACY_DB_FILE, USAGE_JSON_FILE, "usage history");
    copyIfMissing(LEGACY_LOG_FILE, LOG_FILE, "request log");
    copyIfMissing(LEGACY_CALL_LOGS_DB_FILE, CALL_LOGS_JSON_FILE, "call log index");
    copyIfMissing(LEGACY_CALL_LOGS_DIR, CALL_LOGS_DIR, "call log files");
  } catch (error) {
    console.error("[usageDb] Legacy migration failed:", error.message);
  }
}

// ──────────────── JSON → SQLite Migration ────────────────

export function migrateUsageJsonToSqlite() {
  if (!shouldPersistToDisk) return;
  const db = getDbInstance();

  // 1. Migrate usage.json
  if (USAGE_JSON_FILE && fs.existsSync(USAGE_JSON_FILE)) {
    try {
      const raw = fs.readFileSync(USAGE_JSON_FILE, "utf-8");
      const data = JSON.parse(raw);
      const history = data.history || [];

      if (history.length > 0) {
        console.log(`[usageDb] Migrating ${history.length} usage entries from JSON → SQLite...`);

        const insert = db.prepare(`
          INSERT INTO usage_history (provider, model, connection_id, api_key_id, api_key_name,
            tokens_input, tokens_output, tokens_cache_read, tokens_cache_creation, tokens_reasoning,
            status, timestamp)
          VALUES (@provider, @model, @connectionId, @apiKeyId, @apiKeyName,
            @tokensInput, @tokensOutput, @tokensCacheRead, @tokensCacheCreation, @tokensReasoning,
            @status, @timestamp)
        `);

        const tx = db.transaction(() => {
          for (const entry of history) {
            insert.run({
              provider: entry.provider || null,
              model: entry.model || null,
              connectionId: entry.connectionId || null,
              apiKeyId: entry.apiKeyId || null,
              apiKeyName: entry.apiKeyName || null,
              tokensInput: entry.tokens?.input ?? entry.tokens?.prompt_tokens ?? 0,
              tokensOutput: entry.tokens?.output ?? entry.tokens?.completion_tokens ?? 0,
              tokensCacheRead: entry.tokens?.cacheRead ?? entry.tokens?.cached_tokens ?? 0,
              tokensCacheCreation:
                entry.tokens?.cacheCreation ?? entry.tokens?.cache_creation_input_tokens ?? 0,
              tokensReasoning: entry.tokens?.reasoning ?? entry.tokens?.reasoning_tokens ?? 0,
              status: entry.status || null,
              timestamp: entry.timestamp || new Date().toISOString(),
            });
          }
        });
        tx();
        console.log(`[usageDb] ✓ Migrated ${history.length} usage entries`);
      }

      fs.renameSync(USAGE_JSON_FILE, USAGE_JSON_FILE + ".migrated");
    } catch (err) {
      console.error("[usageDb] Failed to migrate usage.json:", err.message);
    }
  }

  // 2. Migrate call_logs.json
  if (CALL_LOGS_JSON_FILE && fs.existsSync(CALL_LOGS_JSON_FILE)) {
    try {
      const raw = fs.readFileSync(CALL_LOGS_JSON_FILE, "utf-8");
      const data = JSON.parse(raw);
      const logs = data.logs || [];

      if (logs.length > 0) {
        console.log(`[usageDb] Migrating ${logs.length} call log entries from JSON → SQLite...`);

        const insert = db.prepare(`
          INSERT OR IGNORE INTO call_logs (id, timestamp, method, path, status, model, provider,
            account, connection_id, duration, tokens_in, tokens_out, source_format, target_format,
            api_key_id, api_key_name, combo_name, request_body, response_body, error)
          VALUES (@id, @timestamp, @method, @path, @status, @model, @provider,
            @account, @connectionId, @duration, @tokensIn, @tokensOut, @sourceFormat, @targetFormat,
            @apiKeyId, @apiKeyName, @comboName, @requestBody, @responseBody, @error)
        `);

        const tx = db.transaction(() => {
          for (const log of logs) {
            insert.run({
              id: log.id || `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              timestamp: log.timestamp || new Date().toISOString(),
              method: log.method || "POST",
              path: log.path || null,
              status: log.status || 0,
              model: log.model || null,
              provider: log.provider || null,
              account: log.account || null,
              connectionId: log.connectionId || null,
              duration: log.duration || 0,
              tokensIn: log.tokens?.in ?? 0,
              tokensOut: log.tokens?.out ?? 0,
              sourceFormat: log.sourceFormat || null,
              targetFormat: log.targetFormat || null,
              apiKeyId: log.apiKeyId || null,
              apiKeyName: log.apiKeyName || null,
              comboName: log.comboName || null,
              requestBody: log.requestBody ? JSON.stringify(log.requestBody) : null,
              responseBody: log.responseBody ? JSON.stringify(log.responseBody) : null,
              error: log.error || null,
            });
          }
        });
        tx();
        console.log(`[usageDb] ✓ Migrated ${logs.length} call log entries`);
      }

      fs.renameSync(CALL_LOGS_JSON_FILE, CALL_LOGS_JSON_FILE + ".migrated");
    } catch (err) {
      console.error("[usageDb] Failed to migrate call_logs.json:", err.message);
    }
  }
}

// ──────────────── Run on load ────────────────

migrateLegacyUsageFiles();

if (shouldPersistToDisk) {
  try {
    migrateUsageJsonToSqlite();
  } catch {
    /* ok */
  }
}
