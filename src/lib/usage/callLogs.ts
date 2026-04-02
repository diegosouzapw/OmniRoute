/**
 * Call Logs — extracted from usageDb.js (T-15)
 *
 * Structured call log management: save, query, rotate, and
 * unified single-artifact disk storage for the Logger UI.
 *
 * @module lib/usage/callLogs
 */

import fs from "fs";
import path from "path";
import type { RequestPipelinePayloads } from "@omniroute/open-sse/utils/requestLogger.ts";
import { getDbInstance } from "../db/core";
import { getRequestDetailLogByCallLogId } from "../db/detailedLogs";
import { shouldPersistToDisk, CALL_LOGS_DIR } from "./migrations";
import { getLoggedInputTokens, getLoggedOutputTokens } from "./tokenAccounting";
import { isNoLog } from "../compliance";
import { sanitizePII } from "../piiSanitizer";
import {
  protectPayloadForLog,
  parseStoredPayload,
  serializePayloadForStorage,
} from "../logPayloads";
import { getCallLogMaxEntries, getCallLogRetentionDays } from "../logEnv";

type JsonRecord = Record<string, unknown>;

type CallLogArtifact = {
  schemaVersion: 2;
  summary: {
    id: string;
    timestamp: string;
    method: string;
    path: string;
    status: number;
    model: string;
    requestedModel: string | null;
    provider: string;
    account: string;
    connectionId: string | null;
    duration: number;
    tokens: { in: number; out: number };
    requestType: string | null;
    sourceFormat: string | null;
    targetFormat: string | null;
    apiKeyId: string | null;
    apiKeyName: string | null;
    comboName: string | null;
  };
  requestBody: unknown;
  responseBody: unknown;
  error: unknown;
  pipeline?: RequestPipelinePayloads;
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function hasTruncatedFlag(value: unknown): boolean {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return (value as Record<string, unknown>)._truncated === true;
}

function sanitizeErrorForLog(error: unknown): unknown {
  if (error === null || error === undefined) return null;
  if (typeof error === "string") return sanitizePII(error).text;
  if (error instanceof Error) {
    return {
      message: sanitizePII(error.message).text,
      stack: sanitizePII(error.stack || "").text || undefined,
      name: error.name,
    };
  }
  return protectPayloadForLog(error);
}

function toStoredErrorString(error: unknown): string | null {
  const sanitized = sanitizeErrorForLog(error);
  if (sanitized === null || sanitized === undefined) return null;
  if (typeof sanitized === "string") return sanitized;
  try {
    return JSON.stringify(sanitized);
  } catch {
    return String(sanitized);
  }
}

function protectPipelinePayloads(payloads: unknown): RequestPipelinePayloads | null {
  if (!payloads || typeof payloads !== "object") return null;

  const protectedPayloads: RequestPipelinePayloads = {};
  for (const [key, value] of Object.entries(payloads as JsonRecord)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (key === "streamChunks" && value && typeof value === "object") {
      const chunks = value as Record<string, unknown>;
      const compacted = Object.fromEntries(
        Object.entries(chunks).filter(
          ([, chunkValue]) => Array.isArray(chunkValue) && chunkValue.length > 0
        )
      );
      if (Object.keys(compacted).length > 0) {
        protectedPayloads.streamChunks = protectPayloadForLog(
          compacted
        ) as RequestPipelinePayloads["streamChunks"];
      }
      continue;
    }

    protectedPayloads[key as keyof RequestPipelinePayloads] = protectPayloadForLog(value) as never;
  }

  return Object.keys(protectedPayloads).length > 0 ? protectedPayloads : null;
}

let logIdCounter = 0;
function generateLogId() {
  logIdCounter++;
  return `${Date.now()}-${logIdCounter}`;
}

async function resolveAccountName(connectionId: string | null | undefined) {
  let account = connectionId ? connectionId.slice(0, 8) : "-";

  if (!connectionId) {
    return account;
  }

  try {
    const { getProviderConnections } = await import("@/lib/localDb");
    const connections = await getProviderConnections();
    const conn = connections.find((item) => item.id === connectionId);
    if (conn) {
      account = conn.name || conn.email || account;
    }
  } catch {
    // Best-effort lookup only.
  }

  return account;
}

function buildArtifactRelativePath(timestamp: string, id: string) {
  const parsed = new Date(timestamp);
  const safeTimestamp = (
    Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString()
  ).replace(/[:]/g, "-");
  const dateFolder = safeTimestamp.slice(0, 10);
  return path.posix.join(dateFolder, `${safeTimestamp}_${id}.json`);
}

function buildArtifact(
  logEntry: {
    id: string;
    timestamp: string;
    method: string;
    path: string;
    status: number;
    model: string;
    requestedModel: string | null;
    provider: string;
    account: string;
    connectionId: string | null;
    duration: number;
    tokensIn: number;
    tokensOut: number;
    requestType: string | null;
    sourceFormat: string | null;
    targetFormat: string | null;
    apiKeyId: string | null;
    apiKeyName: string | null;
    comboName: string | null;
  },
  requestBody: unknown,
  responseBody: unknown,
  error: unknown,
  pipelinePayloads: RequestPipelinePayloads | null
): CallLogArtifact {
  return {
    schemaVersion: 2,
    summary: {
      id: logEntry.id,
      timestamp: logEntry.timestamp,
      method: logEntry.method,
      path: logEntry.path,
      status: logEntry.status,
      model: logEntry.model,
      requestedModel: logEntry.requestedModel,
      provider: logEntry.provider,
      account: logEntry.account,
      connectionId: logEntry.connectionId,
      duration: logEntry.duration,
      tokens: { in: logEntry.tokensIn, out: logEntry.tokensOut },
      requestType: logEntry.requestType,
      sourceFormat: logEntry.sourceFormat,
      targetFormat: logEntry.targetFormat,
      apiKeyId: logEntry.apiKeyId,
      apiKeyName: logEntry.apiKeyName,
      comboName: logEntry.comboName,
    },
    requestBody: requestBody ?? null,
    responseBody: responseBody ?? null,
    error: error ?? null,
    ...(pipelinePayloads ? { pipeline: pipelinePayloads } : {}),
  };
}

function writeCallArtifact(artifact: CallLogArtifact): string | null {
  if (!CALL_LOGS_DIR) return null;

  const relPath = buildArtifactRelativePath(artifact.summary.timestamp, artifact.summary.id);
  const absPath = path.join(CALL_LOGS_DIR, relPath);

  try {
    fs.mkdirSync(path.dirname(absPath), { recursive: true });
    fs.writeFileSync(absPath, JSON.stringify(artifact, null, 2));
    rotateCallLogs();
    return relPath;
  } catch (error) {
    console.error("[callLogs] Failed to write request artifact:", (error as Error).message);
    return null;
  }
}

function readArtifactFromDisk(relativePath: string | null) {
  if (!CALL_LOGS_DIR || !relativePath) return null;

  try {
    const absPath = path.join(CALL_LOGS_DIR, relativePath);
    if (!fs.existsSync(absPath)) return null;
    return JSON.parse(fs.readFileSync(absPath, "utf8")) as CallLogArtifact;
  } catch (error) {
    console.error("[callLogs] Failed to read request artifact:", (error as Error).message);
    return null;
  }
}

function readLegacyLogFromDisk(entry: {
  timestamp: string | null;
  model: string | null;
  status: number;
}) {
  if (!CALL_LOGS_DIR || !entry.timestamp) return null;

  try {
    const date = new Date(entry.timestamp);
    if (Number.isNaN(date.getTime())) return null;

    const dateFolder = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
    const dir = path.join(CALL_LOGS_DIR, dateFolder);
    if (!fs.existsSync(dir)) return null;

    const time = `${String(date.getHours()).padStart(2, "0")}${String(date.getMinutes()).padStart(
      2,
      "0"
    )}${String(date.getSeconds()).padStart(2, "0")}`;
    const safeModel = (entry.model || "unknown").replace(/[/:]/g, "-");
    const expectedName = `${time}_${safeModel}_${entry.status}.json`;

    const exactPath = path.join(dir, expectedName);
    if (fs.existsSync(exactPath)) {
      return JSON.parse(fs.readFileSync(exactPath, "utf8"));
    }

    const files = fs
      .readdirSync(dir)
      .filter((file) => file.startsWith(time) && file.endsWith(`_${entry.status}.json`));
    if (files.length > 0) {
      return JSON.parse(fs.readFileSync(path.join(dir, files[0]), "utf8"));
    }
  } catch (error) {
    console.error("[callLogs] Failed to read legacy disk log:", (error as Error).message);
  }

  return null;
}

function cleanupEmptyCallLogDirs() {
  if (!CALL_LOGS_DIR || !fs.existsSync(CALL_LOGS_DIR)) return;

  try {
    for (const entry of fs.readdirSync(CALL_LOGS_DIR)) {
      const entryPath = path.join(CALL_LOGS_DIR, entry);
      const stat = fs.statSync(entryPath);
      if (!stat.isDirectory()) continue;
      if (fs.readdirSync(entryPath).length === 0) {
        fs.rmSync(entryPath, { recursive: true, force: true });
      }
    }
  } catch {
    // Best effort only.
  }
}

export function cleanupOverflowCallLogFiles(baseDir = CALL_LOGS_DIR, maxEntries?: number) {
  if (!baseDir || !fs.existsSync(baseDir)) return;

  const limit = maxEntries ?? getCallLogMaxEntries();
  if (!Number.isInteger(limit) || limit < 1) return;

  try {
    const files = fs
      .readdirSync(baseDir)
      .flatMap((entry) => {
        const entryPath = path.join(baseDir, entry);
        try {
          const stat = fs.statSync(entryPath);
          if (!stat.isDirectory()) return [];

          return fs
            .readdirSync(entryPath)
            .filter((file) => file.endsWith(".json"))
            .map((file) => {
              const filePath = path.join(entryPath, file);
              const fileStat = fs.statSync(filePath);
              return { filePath, mtimeMs: fileStat.mtimeMs };
            });
        } catch {
          return [];
        }
      })
      .sort((a, b) => b.mtimeMs - a.mtimeMs);

    for (const file of files.slice(limit)) {
      try {
        fs.rmSync(file.filePath, { force: true });
      } catch {
        // Best effort only.
      }
    }

    cleanupEmptyCallLogDirs();
  } catch (error) {
    console.error(
      "[callLogs] Failed to prune overflow request artifacts:",
      (error as Error).message
    );
  }
}

export async function saveCallLog(entry: any) {
  if (!shouldPersistToDisk) return;

  try {
    const apiKeyId = entry.apiKeyId || null;
    const noLogEnabled = Boolean(entry.noLog) || (apiKeyId ? isNoLog(apiKeyId) : false);

    const protectedRequestBody = noLogEnabled ? null : protectPayloadForLog(entry.requestBody);
    const protectedResponseBody = noLogEnabled ? null : protectPayloadForLog(entry.responseBody);
    const protectedPipelinePayloads = noLogEnabled
      ? null
      : protectPipelinePayloads(entry.pipelinePayloads ?? entry.pipeline ?? null);
    const protectedError = sanitizeErrorForLog(entry.error);

    const account = await resolveAccountName(entry.connectionId || null);

    const logEntry = {
      id: typeof entry.id === "string" && entry.id.length > 0 ? entry.id : generateLogId(),
      timestamp: typeof entry.timestamp === "string" ? entry.timestamp : new Date().toISOString(),
      method: entry.method || "POST",
      path: entry.path || "/v1/chat/completions",
      status: entry.status || 0,
      model: entry.model || "-",
      requestedModel: entry.requestedModel || null,
      provider: entry.provider || "-",
      account,
      connectionId: entry.connectionId || null,
      duration: entry.duration || 0,
      tokensIn: toNumber(getLoggedInputTokens(entry.tokens)),
      tokensOut: toNumber(getLoggedOutputTokens(entry.tokens)),
      requestType: entry.requestType || null,
      sourceFormat: entry.sourceFormat || null,
      targetFormat: entry.targetFormat || null,
      apiKeyId,
      apiKeyName: entry.apiKeyName || null,
      comboName: entry.comboName || null,
      requestBody: serializePayloadForStorage(protectedRequestBody, 8192),
      responseBody: serializePayloadForStorage(protectedResponseBody, 8192),
      error: toStoredErrorString(protectedError),
    };

    const db = getDbInstance();
    db.prepare(
      `
      INSERT INTO call_logs (
        id, timestamp, method, path, status, model, requested_model, provider,
        account, connection_id, duration, tokens_in, tokens_out, request_type, source_format,
        target_format, api_key_id, api_key_name, combo_name, request_body, response_body, error,
        artifact_relpath, has_pipeline_details
      )
      VALUES (
        @id, @timestamp, @method, @path, @status, @model, @requestedModel, @provider,
        @account, @connectionId, @duration, @tokensIn, @tokensOut, @requestType, @sourceFormat,
        @targetFormat, @apiKeyId, @apiKeyName, @comboName, @requestBody, @responseBody, @error,
        NULL, 0
      )
    `
    ).run(logEntry);

    if (!noLogEnabled) {
      const artifact = buildArtifact(
        logEntry,
        protectedRequestBody,
        protectedResponseBody,
        protectedError,
        protectedPipelinePayloads
      );
      const artifactRelPath = writeCallArtifact(artifact);

      if (artifactRelPath) {
        db.prepare(
          `
          UPDATE call_logs
          SET artifact_relpath = ?, has_pipeline_details = ?
          WHERE id = ?
        `
        ).run(artifactRelPath, protectedPipelinePayloads ? 1 : 0, logEntry.id);
      }
    }
  } catch (error) {
    console.error("[callLogs] Failed to save call log:", (error as Error).message);
  }
}

export function rotateCallLogs() {
  if (!CALL_LOGS_DIR || !fs.existsSync(CALL_LOGS_DIR)) return;

  try {
    const entries = fs.readdirSync(CALL_LOGS_DIR);
    const now = Date.now();
    const retentionMs = getCallLogRetentionDays() * 24 * 60 * 60 * 1000;

    for (const entry of entries) {
      const entryPath = path.join(CALL_LOGS_DIR, entry);
      const stat = fs.statSync(entryPath);
      if (stat.isDirectory() && now - stat.mtimeMs > retentionMs) {
        fs.rmSync(entryPath, { recursive: true, force: true });
      }
    }
    cleanupOverflowCallLogFiles(CALL_LOGS_DIR, getCallLogMaxEntries());
  } catch (error) {
    console.error("[callLogs] Failed to rotate request artifacts:", (error as Error).message);
  }
}

if (shouldPersistToDisk) {
  try {
    rotateCallLogs();
  } catch {
    // Best-effort startup cleanup.
  }
}

export async function getCallLogs(filter: any = {}) {
  const db = getDbInstance();
  let sql = "SELECT * FROM call_logs";
  const conditions: string[] = [];
  const params: Record<string, unknown> = {};

  if (filter.status) {
    if (filter.status === "error") {
      conditions.push("(status >= 400 OR error IS NOT NULL)");
    } else if (filter.status === "ok") {
      conditions.push("status >= 200 AND status < 300");
    } else {
      const statusCode = parseInt(filter.status, 10);
      if (!Number.isNaN(statusCode)) {
        conditions.push("status = @statusCode");
        params.statusCode = statusCode;
      }
    }
  }

  if (filter.model) {
    conditions.push("(model LIKE @modelQ OR requested_model LIKE @modelQ)");
    params.modelQ = `%${filter.model}%`;
  }
  if (filter.provider) {
    conditions.push("provider LIKE @providerQ");
    params.providerQ = `%${filter.provider}%`;
  }
  if (filter.account) {
    conditions.push("account LIKE @accountQ");
    params.accountQ = `%${filter.account}%`;
  }
  if (filter.apiKey) {
    conditions.push("(api_key_name LIKE @apiKeyQ OR api_key_id LIKE @apiKeyQ)");
    params.apiKeyQ = `%${filter.apiKey}%`;
  }
  if (filter.combo) {
    conditions.push("combo_name IS NOT NULL");
  }
  if (filter.search) {
    conditions.push(`(
      model LIKE @searchQ OR path LIKE @searchQ OR account LIKE @searchQ OR
      requested_model LIKE @searchQ OR provider LIKE @searchQ OR
      api_key_name LIKE @searchQ OR api_key_id LIKE @searchQ OR
      combo_name LIKE @searchQ OR CAST(status AS TEXT) LIKE @searchQ
    )`);
    params.searchQ = `%${filter.search}%`;
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  const limit = filter.limit || 200;
  sql += ` ORDER BY timestamp DESC LIMIT ${limit}`;

  const rows = db.prepare(sql).all(params);

  return rows.map((row) => {
    const l = asRecord(row);
    return {
      id: toStringOrNull(l.id),
      timestamp: toStringOrNull(l.timestamp),
      method: toStringOrNull(l.method),
      path: toStringOrNull(l.path),
      status: toNumber(l.status),
      model: toStringOrNull(l.model),
      requestedModel: toStringOrNull(l.requested_model),
      provider: toStringOrNull(l.provider),
      account: toStringOrNull(l.account),
      duration: toNumber(l.duration),
      tokens: { in: toNumber(l.tokens_in), out: toNumber(l.tokens_out) },
      sourceFormat: toStringOrNull(l.source_format),
      targetFormat: toStringOrNull(l.target_format),
      error: toStringOrNull(l.error),
      comboName: toStringOrNull(l.combo_name),
      apiKeyId: toStringOrNull(l.api_key_id),
      apiKeyName: toStringOrNull(l.api_key_name),
      hasRequestBody: typeof l.request_body === "string" && l.request_body.length > 0,
      hasResponseBody: typeof l.response_body === "string" && l.response_body.length > 0,
      hasPipelineDetails: toNumber(l.has_pipeline_details) === 1,
    };
  });
}

function buildLegacyPipelinePayloads(id: string) {
  const detailed = getRequestDetailLogByCallLogId(id);
  if (!detailed) return null;

  return {
    clientRequest: detailed.client_request ?? null,
    providerRequest: detailed.translated_request ?? null,
    providerResponse: detailed.provider_response ?? null,
    clientResponse: detailed.client_response ?? null,
  };
}

export async function getCallLogById(id: string) {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM call_logs WHERE id = ?").get(id);
  if (!row) return null;

  const entryRow = asRecord(row);
  const artifactRelPath = toStringOrNull(entryRow.artifact_relpath);
  const entry = {
    id: toStringOrNull(entryRow.id),
    timestamp: toStringOrNull(entryRow.timestamp),
    method: toStringOrNull(entryRow.method),
    path: toStringOrNull(entryRow.path),
    status: toNumber(entryRow.status),
    model: toStringOrNull(entryRow.model),
    requestedModel: toStringOrNull(entryRow.requested_model),
    provider: toStringOrNull(entryRow.provider),
    account: toStringOrNull(entryRow.account),
    connectionId: toStringOrNull(entryRow.connection_id),
    duration: toNumber(entryRow.duration),
    tokens: { in: toNumber(entryRow.tokens_in), out: toNumber(entryRow.tokens_out) },
    sourceFormat: toStringOrNull(entryRow.source_format),
    targetFormat: toStringOrNull(entryRow.target_format),
    apiKeyId: toStringOrNull(entryRow.api_key_id),
    apiKeyName: toStringOrNull(entryRow.api_key_name),
    comboName: toStringOrNull(entryRow.combo_name),
    requestBody: parseStoredPayload(entryRow.request_body),
    responseBody: parseStoredPayload(entryRow.response_body),
    error: toStringOrNull(entryRow.error),
    artifactRelPath,
    hasPipelineDetails: toNumber(entryRow.has_pipeline_details) === 1,
  };

  const artifact = readArtifactFromDisk(artifactRelPath);
  if (artifact) {
    return {
      ...entry,
      requestBody: artifact.requestBody ?? entry.requestBody,
      responseBody: artifact.responseBody ?? entry.responseBody,
      error: artifact.error ?? entry.error,
      pipelinePayloads: artifact.pipeline ?? null,
      hasPipelineDetails: Boolean(artifact.pipeline) || entry.hasPipelineDetails,
    };
  }

  const needsLegacyDisk =
    hasTruncatedFlag(entry.requestBody) || hasTruncatedFlag(entry.responseBody) || !artifactRelPath;
  if (needsLegacyDisk) {
    const legacyEntry = readLegacyLogFromDisk(entry);
    if (legacyEntry) {
      const legacyPipeline = buildLegacyPipelinePayloads(id);
      return {
        ...entry,
        requestBody: legacyEntry.requestBody ?? entry.requestBody,
        responseBody: legacyEntry.responseBody ?? entry.responseBody,
        error: legacyEntry.error ?? entry.error,
        pipelinePayloads: legacyPipeline,
        hasPipelineDetails: Boolean(legacyPipeline),
      };
    }
  }

  const legacyPipeline = buildLegacyPipelinePayloads(id);
  if (legacyPipeline) {
    return {
      ...entry,
      pipelinePayloads: legacyPipeline,
      hasPipelineDetails: true,
    };
  }

  return entry;
}
