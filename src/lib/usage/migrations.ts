// @ts-nocheck
/**
 * Usage Migrations — extracted from usageDb.js (T-15)
 *
 * Handles legacy file migration (.data → data/), JSON → SQLite migration,
 * and one-time archival of legacy request log layouts into a zip backup.
 *
 * @module lib/usage/migrations
 */

import fs from "fs";
import path from "path";
import { ZipFile } from "yazl";
import { getDbInstance, isCloud, isBuildPhase, DATA_DIR } from "../db/core";
import { getLegacyDotDataDir, isSamePath } from "../dataPaths";
import { protectPayloadForLog } from "../logPayloads";
import { sanitizePII } from "../piiSanitizer";
import { writeCallArtifact, type CallLogArtifact } from "./callLogArtifacts";

export const shouldPersistToDisk = !isCloud && !isBuildPhase;

const LEGACY_DATA_DIR = isCloud ? null : getLegacyDotDataDir();

export const CALL_LOGS_DIR = isCloud ? null : path.join(DATA_DIR, "call_logs");
export const LOG_ARCHIVES_DIR = isCloud ? null : path.join(DATA_DIR, "log_archives");

const LEGACY_LAYOUT_MARKER =
  isCloud || !LOG_ARCHIVES_DIR ? null : path.join(LOG_ARCHIVES_DIR, "legacy-request-logs.json");

const CURRENT_REQUEST_LOGS_DIR = isCloud ? null : path.join(DATA_DIR, "logs");
const CURRENT_REQUEST_SUMMARY_FILE = isCloud ? null : path.join(DATA_DIR, "log.txt");

// Legacy paths
const LEGACY_DB_FILE =
  isCloud || !LEGACY_DATA_DIR ? null : path.join(LEGACY_DATA_DIR, "usage.json");
const LEGACY_CALL_LOGS_DB_FILE =
  isCloud || !LEGACY_DATA_DIR ? null : path.join(LEGACY_DATA_DIR, "call_logs.json");
// Current-location JSON files (for migration into SQLite)
const USAGE_JSON_FILE = isCloud ? null : path.join(DATA_DIR, "usage.json");
const CALL_LOGS_JSON_FILE = isCloud ? null : path.join(DATA_DIR, "call_logs.json");

type ArchiveTarget = {
  sourcePath: string;
  archiveRoot: string;
  deleteAfterArchive: boolean;
};

function buildLegacyRequestSummary(requestType: unknown, requestBody: unknown) {
  if (requestType !== "search" || !requestBody || typeof requestBody !== "object") return null;

  const record = requestBody as Record<string, unknown>;
  const summary: Record<string, unknown> = {};
  if (typeof record.query === "string" && record.query.trim().length > 0) {
    summary.query = sanitizePII(record.query).text;
  }

  const filters = Object.fromEntries(
    Object.entries(record).filter(([key]) => key !== "query" && key !== "provider")
  );
  if (Object.keys(filters).length > 0) {
    summary.filters = filters;
  }

  return Object.keys(summary).length > 0 ? JSON.stringify(summary) : null;
}

function copyIfMissing(fromPath: string | null, toPath: string | null, label: string) {
  if (!fromPath || !toPath) return;
  if (!fs.existsSync(fromPath) || fs.existsSync(toPath)) return;

  if (fs.statSync(fromPath).isDirectory()) {
    fs.cpSync(fromPath, toPath, { recursive: true });
  } else {
    fs.copyFileSync(fromPath, toPath);
  }
  console.log(`[usageDb] Migrated ${label}: ${fromPath} -> ${toPath}`);
}

function containsLegacyCallLogLayout(dirPath: string | null): boolean {
  if (!dirPath || !fs.existsSync(dirPath)) return false;

  try {
    const topLevelEntries = fs.readdirSync(dirPath);
    for (const topLevelEntry of topLevelEntries) {
      const topLevelPath = path.join(dirPath, topLevelEntry);
      const stat = fs.statSync(topLevelPath);
      if (stat.isFile() && /^\d{6}_.+_\d{3}\.json$/i.test(topLevelEntry)) {
        return true;
      }
      if (!stat.isDirectory()) {
        continue;
      }

      const nestedEntries = fs.readdirSync(topLevelPath);
      for (const nestedEntry of nestedEntries) {
        if (/^\d{6}_.+_\d{3}\.json$/i.test(nestedEntry)) {
          return true;
        }
      }
    }
  } catch {
    return false;
  }

  return false;
}

function ensureArchiveDir() {
  if (!LOG_ARCHIVES_DIR) return;
  fs.mkdirSync(LOG_ARCHIVES_DIR, { recursive: true });
}

function listArchiveTargets(): ArchiveTarget[] {
  const targets: ArchiveTarget[] = [];

  if (CURRENT_REQUEST_LOGS_DIR && fs.existsSync(CURRENT_REQUEST_LOGS_DIR)) {
    targets.push({
      sourcePath: CURRENT_REQUEST_LOGS_DIR,
      archiveRoot: "data/logs",
      deleteAfterArchive: true,
    });
  }

  if (CURRENT_REQUEST_SUMMARY_FILE && fs.existsSync(CURRENT_REQUEST_SUMMARY_FILE)) {
    targets.push({
      sourcePath: CURRENT_REQUEST_SUMMARY_FILE,
      archiveRoot: "data/log.txt",
      deleteAfterArchive: true,
    });
  }

  if (CALL_LOGS_DIR && containsLegacyCallLogLayout(CALL_LOGS_DIR)) {
    targets.push({
      sourcePath: CALL_LOGS_DIR,
      archiveRoot: "data/call_logs",
      deleteAfterArchive: true,
    });
  }

  return targets;
}

function addPathToZip(zipFile: ZipFile, sourcePath: string, archivePath: string) {
  const stat = fs.statSync(sourcePath);
  if (stat.isDirectory()) {
    const entries = fs.readdirSync(sourcePath);
    if (entries.length === 0) {
      zipFile.addEmptyDirectory(archivePath);
      return;
    }

    for (const entry of entries) {
      addPathToZip(zipFile, path.join(sourcePath, entry), path.posix.join(archivePath, entry));
    }
    return;
  }

  zipFile.addFile(sourcePath, archivePath);
}

function createLegacyArchive(targets: ArchiveTarget[]): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!LOG_ARCHIVES_DIR) {
      reject(new Error("LOG_ARCHIVES_DIR is not configured"));
      return;
    }

    ensureArchiveDir();

    const timestamp = new Date().toISOString().replace(/[:]/g, "-");
    const archiveFilename = `${timestamp}_legacy-request-logs.zip`;
    const archivePath = path.join(LOG_ARCHIVES_DIR, archiveFilename);
    const zipFile = new ZipFile();
    const output = fs.createWriteStream(archivePath);

    output.on("close", () => resolve(archiveFilename));
    output.on("error", (error) => {
      fs.rmSync(archivePath, { force: true });
      reject(error);
    });
    zipFile.outputStream.pipe(output);

    try {
      for (const target of targets) {
        addPathToZip(zipFile, target.sourcePath, target.archiveRoot);
      }
      zipFile.end();
    } catch (error) {
      fs.rmSync(archivePath, { force: true });
      zipFile.end();
      reject(error);
    }
  });
}

function writeLegacyLayoutMarker(archiveFilename: string) {
  if (!LEGACY_LAYOUT_MARKER) return;
  ensureArchiveDir();
  fs.writeFileSync(
    LEGACY_LAYOUT_MARKER,
    JSON.stringify(
      {
        migratedAt: new Date().toISOString(),
        archiveFilename,
      },
      null,
      2
    )
  );
}

function deleteArchivedTargets(targets: ArchiveTarget[]) {
  for (const target of targets) {
    if (!target.deleteAfterArchive || !fs.existsSync(target.sourcePath)) {
      continue;
    }

    const stat = fs.statSync(target.sourcePath);
    if (stat.isDirectory()) {
      fs.rmSync(target.sourcePath, { recursive: true, force: true });
    } else {
      fs.rmSync(target.sourcePath, { force: true });
    }
  }
}

export function migrateLegacyUsageFiles() {
  if (!shouldPersistToDisk || !LEGACY_DATA_DIR) return;
  if (isSamePath(DATA_DIR, LEGACY_DATA_DIR)) return;

  try {
    copyIfMissing(LEGACY_DB_FILE, USAGE_JSON_FILE, "usage history");
    copyIfMissing(LEGACY_CALL_LOGS_DB_FILE, CALL_LOGS_JSON_FILE, "call log index");
  } catch (error) {
    console.error("[usageDb] Legacy migration failed:", (error as Error).message);
  }
}

export async function archiveLegacyRequestLogs() {
  if (!shouldPersistToDisk) return null;
  if (LEGACY_LAYOUT_MARKER && fs.existsSync(LEGACY_LAYOUT_MARKER)) return null;

  const targets = listArchiveTargets();
  if (targets.length === 0) return null;

  const archiveFilename = await createLegacyArchive(targets);
  deleteArchivedTargets(targets);
  writeLegacyLayoutMarker(archiveFilename);

  console.log(`[usageDb] Archived legacy request logs to ${archiveFilename}`);
  return archiveFilename;
}

export function migrateUsageJsonToSqlite() {
  if (!shouldPersistToDisk) return;
  const db = getDbInstance();

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
            status, success, latency_ms, ttft_ms, error_code, timestamp)
          VALUES (@provider, @model, @connectionId, @apiKeyId, @apiKeyName,
            @tokensInput, @tokensOutput, @tokensCacheRead, @tokensCacheCreation, @tokensReasoning,
            @status, @success, @latencyMs, @ttftMs, @errorCode, @timestamp)
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
              success: entry.success === false ? 0 : 1,
              latencyMs: Number.isFinite(Number(entry.latencyMs)) ? Number(entry.latencyMs) : 0,
              ttftMs: Number.isFinite(Number(entry.timeToFirstTokenMs))
                ? Number(entry.timeToFirstTokenMs)
                : Number.isFinite(Number(entry.latencyMs))
                  ? Number(entry.latencyMs)
                  : 0,
              errorCode: entry.errorCode || null,
              timestamp: entry.timestamp || new Date().toISOString(),
            });
          }
        });
        tx();
        console.log(`[usageDb] ✓ Migrated ${history.length} usage entries`);
      }

      fs.renameSync(USAGE_JSON_FILE, `${USAGE_JSON_FILE}.migrated`);
    } catch (error) {
      console.error("[usageDb] Failed to migrate usage.json:", (error as Error).message);
    }
  }

  if (CALL_LOGS_JSON_FILE && fs.existsSync(CALL_LOGS_JSON_FILE)) {
    try {
      const raw = fs.readFileSync(CALL_LOGS_JSON_FILE, "utf-8");
      const data = JSON.parse(raw);
      const logs = data.logs || [];

      if (logs.length > 0) {
        console.log(`[usageDb] Migrating ${logs.length} call log entries from JSON → SQLite...`);

        const insert = db.prepare(`
          INSERT OR IGNORE INTO call_logs (id, timestamp, method, path, status, model, requested_model, provider,
            account, connection_id, duration, tokens_in, tokens_out, source_format, target_format,
            api_key_id, api_key_name, combo_name, combo_step_id, combo_execution_key, error_summary,
            detail_state, artifact_relpath, artifact_size_bytes, artifact_sha256,
            has_request_body, has_response_body, has_pipeline_details, request_summary)
          VALUES (@id, @timestamp, @method, @path, @status, @model, @requestedModel, @provider,
            @account, @connectionId, @duration, @tokensIn, @tokensOut, @sourceFormat, @targetFormat,
            @apiKeyId, @apiKeyName, @comboName, @comboStepId, @comboExecutionKey, @errorSummary,
            @detailState, @artifactRelPath, @artifactSizeBytes, @artifactSha256,
            @hasRequestBody, @hasResponseBody, @hasPipelineDetails, @requestSummary)
        `);

        const tx = db.transaction(() => {
          for (const log of logs) {
            const id = log.id || `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
            const timestamp = log.timestamp || new Date().toISOString();
            const protectedRequestBody = log.requestBody
              ? protectPayloadForLog(log.requestBody)
              : null;
            const protectedResponseBody = log.responseBody
              ? protectPayloadForLog(log.responseBody)
              : null;
            const protectedError =
              log.error && typeof log.error === "object"
                ? protectPayloadForLog(log.error)
                : log.error || null;
            const detailExpected =
              protectedRequestBody !== null ||
              protectedResponseBody !== null ||
              protectedError !== null;

            let detailState: "none" | "ready" | "missing" = "none";
            let artifactRelPath: string | null = null;
            let artifactSizeBytes: number | null = null;
            let artifactSha256: string | null = null;

            if (detailExpected) {
              const artifact: CallLogArtifact = {
                schemaVersion: 5,
                summary: {
                  id,
                  timestamp,
                  method: log.method || "POST",
                  path: log.path || "/v1/chat/completions",
                  status: log.status || 0,
                  model: log.model || "-",
                  requestedModel: log.requestedModel || null,
                  provider: log.provider || "-",
                  account: log.account || "-",
                  connectionId: log.connectionId || null,
                  duration: log.duration || 0,
                  tokens: {
                    in: log.tokens?.in ?? 0,
                    out: log.tokens?.out ?? 0,
                    cacheRead: null,
                    cacheWrite: null,
                    reasoning: null,
                  },
                  requestType: log.requestType || null,
                  sourceFormat: log.sourceFormat || null,
                  targetFormat: log.targetFormat || null,
                  apiKeyId: log.apiKeyId || null,
                  apiKeyName: log.apiKeyName || null,
                  comboName: log.comboName || null,
                  comboStepId: log.comboStepId || null,
                  comboExecutionKey: log.comboExecutionKey || null,
                },
                requestBody: protectedRequestBody,
                responseBody: protectedResponseBody,
                error: protectedError,
              };
              const artifactResult = writeCallArtifact(artifact);
              if (artifactResult) {
                detailState = "ready";
                artifactRelPath = artifactResult.relPath;
                artifactSizeBytes = artifactResult.sizeBytes;
                artifactSha256 = artifactResult.sha256;
              } else {
                detailState = "missing";
              }
            }

            insert.run({
              id,
              timestamp,
              method: log.method || "POST",
              path: log.path || null,
              status: log.status || 0,
              model: log.model || null,
              requestedModel: log.requestedModel || null,
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
              comboStepId: log.comboStepId || null,
              comboExecutionKey: log.comboExecutionKey || log.comboStepId || null,
              errorSummary:
                typeof protectedError === "string"
                  ? protectedError.slice(0, 4000)
                  : protectedError
                    ? JSON.stringify(protectedError).slice(0, 4000)
                    : null,
              detailState,
              artifactRelPath,
              artifactSizeBytes,
              artifactSha256,
              hasRequestBody: protectedRequestBody ? 1 : 0,
              hasResponseBody: protectedResponseBody ? 1 : 0,
              hasPipelineDetails: 0,
              requestSummary: buildLegacyRequestSummary(log.requestType, protectedRequestBody),
            });
          }
        });
        tx();
        console.log(`[usageDb] ✓ Migrated ${logs.length} call log entries`);
      }

      fs.renameSync(CALL_LOGS_JSON_FILE, `${CALL_LOGS_JSON_FILE}.migrated`);
    } catch (error) {
      console.error("[usageDb] Failed to migrate call_logs.json:", (error as Error).message);
    }
  }
}

migrateLegacyUsageFiles();

if (shouldPersistToDisk) {
  try {
    await archiveLegacyRequestLogs();
  } catch (error) {
    console.error("[usageDb] Failed to archive legacy request logs:", (error as Error).message);
  }

  try {
    migrateUsageJsonToSqlite();
  } catch {
    // Best-effort startup migration.
  }
}
