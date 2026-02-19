/**
 * Log Rotation & Cleanup — manages application log file rotation.
 *
 * Handles:
 *   - Rotating log files when they exceed max size
 *   - Cleaning up old log files past retention period
 *   - Creating the log directory on startup
 *
 * Configuration via env vars:
 *   - LOG_TO_FILE: enable file logging (default: true)
 *   - LOG_FILE_PATH: path to log file (default: logs/application/app.log)
 *   - LOG_MAX_FILE_SIZE: max file size before rotation (default: 50MB)
 *   - LOG_RETENTION_DAYS: days to keep old logs (default: 7)
 */

import { existsSync, mkdirSync, statSync, renameSync, readdirSync, unlinkSync } from "fs";
import { dirname, join, basename, extname } from "path";

const DEFAULT_LOG_PATH = "logs/application/app.log";
const DEFAULT_MAX_SIZE = 50 * 1024 * 1024; // 50MB
const DEFAULT_RETENTION_DAYS = 7;

function parseFileSize(raw: string | undefined): number {
  if (!raw) return DEFAULT_MAX_SIZE;
  const match = raw.match(/^(\d+)\s*(k|m|g|kb|mb|gb)?$/i);
  if (!match) return DEFAULT_MAX_SIZE;
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

export function getLogConfig() {
  const logToFile = process.env.LOG_TO_FILE !== "false";
  const logFilePath = process.env.LOG_FILE_PATH || join(process.cwd(), DEFAULT_LOG_PATH);
  const maxFileSize = parseFileSize(process.env.LOG_MAX_FILE_SIZE);
  const retentionDays = parseInt(
    process.env.LOG_RETENTION_DAYS || String(DEFAULT_RETENTION_DAYS),
    10
  );

  return { logToFile, logFilePath, maxFileSize, retentionDays };
}

/**
 * Ensure the log directory exists.
 */
export function ensureLogDir(logFilePath: string): void {
  const dir = dirname(logFilePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

/**
 * Rotate the log file if it exceeds the max size.
 * Renames current file to app.YYYY-MM-DD_HHmmss.log
 */
export function rotateIfNeeded(logFilePath: string, maxFileSize: number): void {
  try {
    if (!existsSync(logFilePath)) return;
    const stats = statSync(logFilePath);
    if (stats.size < maxFileSize) return;

    const dir = dirname(logFilePath);
    const ext = extname(logFilePath);
    const base = basename(logFilePath, ext);
    const now = new Date();
    const ts = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(
      now.getMinutes()
    ).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;

    const rotatedPath = join(dir, `${base}.${ts}${ext}`);
    renameSync(logFilePath, rotatedPath);
  } catch {
    // If rotation fails, continue writing to the same file
  }
}

/**
 * Remove log files older than the retention period.
 */
export function cleanupOldLogs(logFilePath: string, retentionDays: number): void {
  try {
    const dir = dirname(logFilePath);
    if (!existsSync(dir)) return;

    const ext = extname(logFilePath);
    const base = basename(logFilePath, ext);
    const files = readdirSync(dir);
    const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000;

    for (const file of files) {
      // Match rotated files like app.2026-02-19_030000.log
      if (file.startsWith(base + ".") && file.endsWith(ext) && file !== basename(logFilePath)) {
        const filePath = join(dir, file);
        try {
          const stats = statSync(filePath);
          if (stats.mtimeMs < cutoff) {
            unlinkSync(filePath);
          }
        } catch {
          // Skip files we can't stat
        }
      }
    }
  } catch {
    // Cleanup is best-effort
  }
}

/**
 * Initialize log rotation — call once at application startup.
 * Creates directories, rotates if needed, and cleans up old files.
 */
export function initLogRotation(): void {
  const config = getLogConfig();
  if (!config.logToFile) return;

  ensureLogDir(config.logFilePath);
  rotateIfNeeded(config.logFilePath, config.maxFileSize);
  cleanupOldLogs(config.logFilePath, config.retentionDays);
}
