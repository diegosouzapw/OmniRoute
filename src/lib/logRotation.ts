/**
 * Log Rotation & Cleanup — manages application log file rotation.
 *
 * Handles:
 *   - Rotating log files when they exceed max size (startup + periodic during runtime)
 *   - Cleaning up old log files past retention period
 *   - Capping the number of rotated log files kept on disk
 *   - Creating the log directory on startup
 *
 * Configuration via env vars:
 *   - APP_LOG_TO_FILE: enable file logging (default: true)
 *   - APP_LOG_FILE_PATH: path to log file (default: logs/application/app.log)
 *   - APP_LOG_MAX_FILE_SIZE: max file size before rotation (default: 50MB)
 *   - APP_LOG_RETENTION_DAYS: days to keep old logs (default: 7)
 *   - APP_LOG_MAX_FILES: max number of rotated log files to keep (default: 20)
 *   - APP_LOG_ROTATION_CHECK_INTERVAL_MS: how often to check log size at runtime (default: 60000ms)
 */

import { existsSync, mkdirSync, statSync, renameSync, readdirSync, unlinkSync } from "fs";
import { dirname, join, basename, extname } from "path";
import {
  getAppLogFilePath,
  getAppLogMaxFiles,
  getAppLogMaxFileSize,
  getAppLogRetentionDays,
  getAppLogToFile,
} from "./logEnv";

const DEFAULT_ROTATION_CHECK_INTERVAL_MS = 60_000;

function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

/** Interval between runtime rotation checks (default: 60s). */
export function getAppLogRotationCheckInterval(): number {
  return parsePositiveInt(
    process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS,
    DEFAULT_ROTATION_CHECK_INTERVAL_MS
  );
}

interface LogRotationState {
  timer: ReturnType<typeof setInterval> | null;
}

declare global {
  var __omnirouteLogRotationState: LogRotationState | undefined;
}

/** Process-wide state survives Next.js development HMR and split server chunks. */
function getLogRotationState(): LogRotationState {
  return (globalThis.__omnirouteLogRotationState ??= { timer: null });
}

export function getLogConfig() {
  const logToFile = getAppLogToFile();
  const logFilePath = getAppLogFilePath() || join(process.cwd(), "logs/application/app.log");
  const maxFileSize = getAppLogMaxFileSize();
  const retentionDays = getAppLogRetentionDays();
  const maxFiles = getAppLogMaxFiles();

  return { logToFile, logFilePath, maxFileSize, retentionDays, maxFiles };
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
 *
 * Returns the rotated file path when a rotation happened, `null` otherwise
 * (missing file, below the size limit, or a failed rotation — the documented
 * policy keeps writing to the same file in that case).
 */

/** Listener notified with the current log path after a rotation. */
export type LogRotationListener = (currentPath: string) => void;

const rotationListeners = new Set<LogRotationListener>();

/**
 * Register a listener notified after each rotation. Returns an unsubscribe
 * function. Backed by a Set, so subscribing the same listener twice
 * notifies it once (HMR re-evaluation safety).
 */
export function onLogRotation(listener: LogRotationListener): () => void {
  rotationListeners.add(listener);
  return () => {
    rotationListeners.delete(listener);
  };
}

function notifyLogRotationListeners(currentPath: string): void {
  for (const listener of rotationListeners) {
    try {
      listener(currentPath);
    } catch (error) {
      try {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`[logRotation] rotation listener failed: ${message}`);
      } catch {
        // Never let logging break rotation.
      }
    }
  }
}

export function rotateIfNeeded(logFilePath: string, maxFileSize: number): string | null {
  try {
    if (!existsSync(logFilePath)) return null;
    const stats = statSync(logFilePath);
    if (stats.size < maxFileSize) return null;

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
    notifyLogRotationListeners(logFilePath);
    return rotatedPath;
  } catch {
    // If rotation fails, continue writing to the same file
    return null;
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
 * Keep only the newest rotated files up to the configured count limit.
 */
export function cleanupOverflowLogs(logFilePath: string, maxFiles: number): void {
  try {
    const dir = dirname(logFilePath);
    if (!existsSync(dir) || maxFiles < 1) return;

    const ext = extname(logFilePath);
    const base = basename(logFilePath, ext);
    const rotatedFiles = readdirSync(dir)
      .filter(
        (file) =>
          file !== basename(logFilePath) && file.startsWith(base + ".") && file.endsWith(ext)
      )
      .map((file) => {
        const filePath = join(dir, file);
        try {
          return { filePath, mtimeMs: statSync(filePath).mtimeMs };
        } catch {
          return null;
        }
      })
      .filter((entry): entry is { filePath: string; mtimeMs: number } => !!entry)
      .sort((a, b) => b.mtimeMs - a.mtimeMs);

    for (const entry of rotatedFiles.slice(maxFiles)) {
      try {
        unlinkSync(entry.filePath);
      } catch {
        // Best effort only.
      }
    }
  } catch {
    // Cleanup is best-effort
  }
}

/**
 * Initialize log rotation — call once at application startup.
 * Creates directories, rotates if needed, cleans up old files, and starts
 * a background timer that re-checks rotation at APP_LOG_ROTATION_CHECK_INTERVAL_MS
 * (defaults to every 60 s). This catches log growth that happens during runtime
 * — without this timer, rotation only runs once at startup.
 *
 * Call closeLogRotation() during application shutdown to clear the timer.
 */
export function initLogRotation(): void {
  const state = getLogRotationState();
  if (state.timer !== null) return;

  const config = getLogConfig();
  if (!config.logToFile) return;

  ensureLogDir(config.logFilePath);
  rotateIfNeeded(config.logFilePath, config.maxFileSize);
  cleanupOldLogs(config.logFilePath, config.retentionDays);
  cleanupOverflowLogs(config.logFilePath, config.maxFiles);

  const intervalMs = getAppLogRotationCheckInterval();
  // Tracks the last rotation this process consumed: an own rotation notifies
  // listeners directly, so the check below must not re-notify for it. Only an
  // external rotation (another process renamed the file) reopens here.
  let lastConsumedRotation: string | null = null;
  state.timer = setInterval(
    (filePath: string, maxSize: number, maxFiles: number) => {
      const rotatedPath = rotateIfNeeded(filePath, maxSize);
      if (rotatedPath !== null) {
        // Own rotation: listeners were already notified inside rotateIfNeeded.
        // Record it so the external-rotation check below skips this tick —
        // without this, an idle process would reopen once per tick (mP2).
        lastConsumedRotation = filePath;
      } else if (
        !existsSync(filePath) &&
        rotationListeners.size > 0 &&
        lastConsumedRotation !== filePath
      ) {
        // Another process rotated the file (or removed it): reopen the current
        // path instead of writing into the rotated file until our own rotation.
        // Residual window (declared): if another process rotated AND we rewrote
        // the current file between their rotation and our tick, the current
        // path exists and this check cannot tell our descriptor still points
        // at the rotated file — those lines stay in the rotated file (readable,
        // none lost) until our next own rotation rebuilds the descriptor.
        notifyLogRotationListeners(filePath);
      }
      // A recreated current file means the rotation was consumed: clear the
      // marker so the next external rotation notifies again.
      if (existsSync(filePath)) lastConsumedRotation = null;
      cleanupOverflowLogs(filePath, maxFiles);
    },
    intervalMs,
    config.logFilePath,
    config.maxFileSize,
    config.maxFiles
  );
  state.timer.unref?.();
}

/**
 * Stop the background rotation timer started by initLogRotation().
 * Idempotent — safe to call multiple times.
 */
export function closeLogRotation(): void {
  const state = getLogRotationState();
  if (state.timer !== null) {
    clearInterval(state.timer);
    state.timer = null;
  }
}
