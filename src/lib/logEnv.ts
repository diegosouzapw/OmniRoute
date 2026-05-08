import path from "path";

const DEFAULT_APP_LOG_RETENTION_DAYS = 7;
const DEFAULT_CALL_LOG_RETENTION_DAYS = 7;
const DEFAULT_APP_LOG_MAX_SIZE = 50 * 1024 * 1024;
const DEFAULT_APP_LOG_MAX_FILES = 20;
const DEFAULT_CALL_LOG_MAX_ENTRIES = 10000;
const DEFAULT_CALL_LOGS_TABLE_MAX_ROWS = 100000;
const DEFAULT_CALL_LOG_PIPELINE_MAX_SIZE_KB = 512;
const DEFAULT_PROXY_LOGS_TABLE_MAX_ROWS = 100000;
const DEFAULT_APP_LOG_PATH = path.join(process.cwd(), "logs", "application", "app.log");

function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
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
  return process.env.APP_LOG_FILE_PATH || DEFAULT_APP_LOG_PATH;
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
