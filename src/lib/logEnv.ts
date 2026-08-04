import path from "path";
import { resolveDataDir } from "@/lib/dataPaths";

const DEFAULT_APP_LOG_RETENTION_DAYS = 7;
const DEFAULT_CALL_LOG_RETENTION_DAYS = 7;
const DEFAULT_APP_LOG_MAX_SIZE = 50 * 1024 * 1024;
const DEFAULT_APP_LOG_MAX_FILES = 20;
const DEFAULT_CALL_LOG_MAX_ENTRIES = 10000;
const DEFAULT_CALL_LOGS_TABLE_MAX_ROWS = 100000;
const DEFAULT_CALL_LOG_PIPELINE_MAX_SIZE_KB = 512;
const DEFAULT_PROXY_LOGS_TABLE_MAX_ROWS = 100000;
/**
 * Default app log path, anchored to DATA_DIR (never `process.cwd()`).
 *
 * The globally-installed CLI runs from an arbitrary working directory, so anchoring
 * the default to cwd made file logging silently no-op under an unrelated directory
 * (#6197). Computed lazily so a per-process/per-test `DATA_DIR` override is honoured
 * (the env var is read at call time, not at module load). Uses the pure
 * `resolveDataDir()` resolver — no directory creation side effects in a path getter.
 */
function getDefaultAppLogPath(): string {
  return path.join(resolveDataDir(), "logs", "application", "app.log");
}

function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function parseNonNegativeInt(value: string | undefined, fallback: number): number {
  if (value === undefined || value === "") return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
}

function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  if (!value) return fallback;
  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  return fallback;
}

export function parseFileSize(raw: string | undefined): number {
  if (!raw) return DEFAULT_APP_LOG_MAX_SIZE;
  const match = raw.match(/^(\d+)\s*(k|m|g|kb|mb|gb)?$/i);
  if (!match) return DEFAULT_APP_LOG_MAX_SIZE;
  const num = parseInt(match[1], 10);
  const unit = (match[2] || "").toLowerCase();
  switch (unit) {
    case "k":
    case "kb":
      return num * 1024;
    case "m":
    case "mb":
      return num * 1024 * 1024;
    case "g":
    case "gb":
      return num * 1024 * 1024 * 1024;
    default:
      return num;
  }
}

export function getAppLogToFile(): boolean {
  return process.env.APP_LOG_TO_FILE !== "false";
}

export function getAppLogFilePath(): string {
  return process.env.APP_LOG_FILE_PATH || getDefaultAppLogPath();
}

export function getAppLogMaxFileSize(): number {
  return parseFileSize(process.env.APP_LOG_MAX_FILE_SIZE);
}

export function getAppLogRetentionDays(): number {
  return parsePositiveInt(process.env.APP_LOG_RETENTION_DAYS, DEFAULT_APP_LOG_RETENTION_DAYS);
}

export function getCallLogRetentionDays(): number {
  return parsePositiveInt(process.env.CALL_LOG_RETENTION_DAYS, DEFAULT_CALL_LOG_RETENTION_DAYS);
}

/**
 * Returns the explicit operator-set retention override (a positive integer), or `null`
 * when the env var is unset/empty/invalid. Callers give an explicit env var precedence
 * over the dashboard's database retention, while falling back to the dashboard (not the
 * hardcoded 7-day default) when the operator did not set the env var. (#4354)
 */
function parsePositiveIntOrNull(value: string | undefined): number | null {
  if (value === undefined || value === "") return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export function getAppLogRetentionDaysOverride(): number | null {
  return parsePositiveIntOrNull(process.env.APP_LOG_RETENTION_DAYS);
}

export function getCallLogRetentionDaysOverride(): number | null {
  return parsePositiveIntOrNull(process.env.CALL_LOG_RETENTION_DAYS);
}

export function getAppLogMaxFiles(): number {
  return parsePositiveInt(process.env.APP_LOG_MAX_FILES, DEFAULT_APP_LOG_MAX_FILES);
}

export function getCallLogMaxEntries(): number {
  return parsePositiveInt(process.env.CALL_LOG_MAX_ENTRIES, DEFAULT_CALL_LOG_MAX_ENTRIES);
}

export function getCallLogsTableMaxRows(): number {
  return parsePositiveInt(process.env.CALL_LOGS_TABLE_MAX_ROWS, DEFAULT_CALL_LOGS_TABLE_MAX_ROWS);
}

export function getCallLogPipelineCaptureStreamChunks(): boolean {
  return parseBoolean(process.env.CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS, true);
}

export function getCallLogPipelineMaxSizeBytes(): number {
  return (
    parsePositiveInt(
      process.env.CALL_LOG_PIPELINE_MAX_SIZE_KB,
      DEFAULT_CALL_LOG_PIPELINE_MAX_SIZE_KB
    ) * 1024
  );
}

export function getProxyLogsTableMaxRows(): number {
  return parsePositiveInt(process.env.PROXY_LOGS_TABLE_MAX_ROWS, DEFAULT_PROXY_LOGS_TABLE_MAX_ROWS);
}

export function getAppLogLevel(defaultLevel: string): string {
  return process.env.APP_LOG_LEVEL || defaultLevel;
}

export function getAppLogFormat(defaultFormat: string): string {
  return process.env.APP_LOG_FORMAT || defaultFormat;
}

// ─── Chat log truncation limits ─────────────────────────────────────────────

export function getChatLogTextLimit(): number {
  return parsePositiveInt(process.env.CHAT_LOG_TEXT_LIMIT, 64 * 1024);
}

export function getChatLogArrayTailItems(): number {
  return parsePositiveInt(process.env.CHAT_LOG_ARRAY_TAIL_ITEMS, 24);
}

export function getChatLogMaxDepth(): number {
  return parsePositiveInt(process.env.CHAT_LOG_MAX_DEPTH, 6);
}

export function getChatLogMaxObjectKeys(): number {
  return parseNonNegativeInt(process.env.CHAT_LOG_MAX_OBJECT_KEYS, 80);
}

export function isChatDebugFileEnabled(): boolean {
  if (parseBoolean(process.env.CHAT_DEBUG_FILE, false)) return true;
  return process.env.APP_LOG_LEVEL?.trim().toLowerCase() === "debug";
}
