/**
 * Console Log Interceptor — captures console output to a log file.
 *
 * Monkey-patches console.log, console.info, console.warn, console.error,
 * and console.debug to also append JSON log entries to a file. This allows
 * the Console Log Viewer to display application logs in real-time.
 *
 * Call initConsoleInterceptor() once at server startup (before any logging).
 *
 * @module lib/consoleInterceptor
 */

import { appendFileSync, existsSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { format } from "util";
import { getAppLogFilePath, getAppLogToFile } from "./logEnv";

const logToFile = getAppLogToFile();
const logFilePath = resolve(getAppLogFilePath());

declare global {
  var __omnirouteConsoleInterceptorInit: boolean | undefined;
}

type ConsoleMethod = (...args: unknown[]) => void;

/**
 * State owned by initConsoleInterceptor, cleared by __consoleInterceptorInternals.reset().
 * Kept module-level (not inside init) so reset() can undo a previous init: `test:unit:fast`
 * runs with `--test-isolation=none`, so a patched console or a leaked stream listener would
 * otherwise persist across every subsequent test file in the process.
 */
let savedConsoleMethods: Partial<Record<string, ConsoleMethod>> | null = null;
let streamErrorHandler: ((err: unknown) => void) | null = null;

function isEpipe(error: unknown): boolean {
  return (error as NodeJS.ErrnoException | null)?.code === "EPIPE";
}

/**
 * Handle an 'error' event on process.stdout / process.stderr.
 *
 * Node only converts a stream 'error' into an uncaughtException when the emitter has no
 * listener, so simply attaching this handler is what breaks the #8181 loop.
 *
 * That also means attaching it absorbs EVERY stream error on these streams, process-wide —
 * including conditions that are fatal today (ENOSPC, EBADF, ECONNRESET). Absorb EPIPE, which
 * is the one we are here to survive, and re-raise everything else on a fresh stack so the
 * process keeps its current crash semantics.
 */
function handleStreamError(error: unknown): void {
  if (isEpipe(error)) return;
  setImmediate(() => {
    throw error;
  });
}

/**
 * Install the stdio error guard. Idempotent.
 *
 * Deliberately independent of console interception. `structuredLogger.error()`/`.fatal()`
 * write to stderr directly, and those writes happen whether or not file logging is enabled,
 * so a broken pipe can raise an async EPIPE in configurations where interception is off
 * (`APP_LOG_TO_FILE=false`, or a log directory that cannot be created). The guard has to be
 * in place for those too, otherwise the very loop this exists to prevent is still reachable.
 */
function installStdioErrorGuard(): void {
  if (streamErrorHandler) return;
  streamErrorHandler = handleStreamError;
  process.stdout.on("error", streamErrorHandler);
  process.stderr.on("error", streamErrorHandler);
}

/**
 * Map console method names to log levels.
 */
const LEVEL_MAP: Record<string, string> = {
  debug: "debug",
  log: "info",
  info: "info",
  warn: "warn",
  error: "error",
};

/**
 * Ensure the log directory exists.
 */
function ensureDir() {
  const dir = dirname(logFilePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

// Level tokens the in-repo tagged logger puts in front of the component. Keep in sync with
// LEVELS in open-sse/utils/logger.ts — that module keeps the type internal, so the list
// cannot be imported today.
const LEVEL_TOKENS = new Set(["DEBUG", "INFO", "WARN", "WARNING", "ERROR", "FATAL", "TRACE"]);

// A clock prefix carries no routing information: the entry already travels with its own
// timestamp field. Matches the two getTimeString() emitters
// (open-sse/utils/usageTracking.ts, open-sse/utils/streamHandler.ts), which both format
// the clock as HH:MM:SS. Strict on purpose: a real component shaped like a clock does not
// exist, and a loose shape would swallow one.
const CLOCK_TOKEN_RE = /^\d{2}:\d{2}:\d{2}$/;

// Local copy of the ANSI escape pattern from open-sse/utils/streamHelpers.ts
// (ANSI_ESCAPE_RE, ReDoS-safe: bounded classes, no nested quantifiers). Importing that
// module here would pull the translator formats and the provider registry into the
// startup path, so the pattern is duplicated and kept in sync by the parity test in
// tests/unit/console-interceptor-message-fidelity.test.ts.
const ANSI_PATTERN_RE =
  /\x1b(?:\[[0-9;?]*[A-Za-z]|\][^\x07\x1b]*(?:\x07|\x1b\\)|[A-Z\[\]\\^_`])|[\x00-\x08\x0b\x0c\x0e-\x1f]/;

function stripAnsi(text: string): string {
  return text.replace(new RegExp(ANSI_PATTERN_RE.source, "g"), "");
}

/**
 * Skip the decoration between two brackets on a working copy without escape codes.
 *
 * Emitters wrap the component in an emoji and color codes
 * (`[19:29:32] 📊 \x1b[32m[USAGE]`), and the escape itself holds a bracket (`[32m`),
 * so scanning the raw message would stop on the wrong bracket. Runs on the stripped
 * copy, advances over spaces and non-alphanumeric marks, and stops at the first
 * letter, digit, or bracket. Bounded so a text segment never scans the whole message.
 */
function skipDecoration(stripped: string, from: number): number {
  let pos = from;
  const limit = Math.min(stripped.length, from + 32);
  while (pos < limit) {
    const ch = stripped[pos];
    if (ch === "[" || ch === "]") break;
    if (/[A-Za-z0-9]/.test(ch)) break;
    pos++;
  }
  return pos;
}

/**
 * Try to extract component name from message patterns like [COMPONENT] or [component].
 *
 * The tagged logger emits `[LEVEL] [TAG] message` (open-sse/utils/logger.ts), so taking the
 * first bracket recorded the level as the component and dropped the real one — the log stopped
 * being filterable by component, which is the point of the field. Level tokens are skipped; the
 * level already travels in the entry's own `level` field. Clock prefixes (`HH:MM:SS`, already
 * in the entry's `timestamp` field) are skipped the same way.
 */
function extractComponent(msg: string): string {
  let stripped = stripAnsi(msg);
  // Bounded: a message never legitimately carries more than a clock, a level, and a tag.
  for (let depth = 0; depth < 3; depth++) {
    const match = stripped.match(/^\s*\[([^\]]+)\]/);
    if (!match) break;
    const token = match[1].trim();
    const isSkipped = LEVEL_TOKENS.has(token.toUpperCase()) || CLOCK_TOKEN_RE.test(token);
    if (!isSkipped) return token;
    stripped = stripped.slice(match[0].length);
    if (depth < 2) stripped = stripped.slice(skipDecoration(stripped, 0));
  }
  return "app";
}

/**
 * Convert arguments to a string message, handling objects and errors.
 *
 * `console.*` takes a printf-style format string, and first-party callers rely on it:
 * src/server/ws/liveServer.ts passes `%s`/`%d` deliberately, to keep client-supplied values out
 * of the format slot (CWE-134). Joining the arguments instead of formatting them left the
 * placeholders literal and the values trailing without their labels, so a reader had to open the
 * source to know which value was which. `util.format` appends surplus arguments exactly like the
 * join below, so calls without a format string keep their current output.
 *
 * Guarded against an Error in `rest`: many call sites build the first argument from dynamic,
 * non-format-string content (e.g. `` `[TAG] Failed to compile hook "${row.name}":` ``) that can
 * coincidentally contain a `%s`/`%d`-like substring. If a trailing arg is an Error, util.format
 * would silently consume it as a substitution value and drop its stack — skip the printf path
 * so that Error still gets the full `message\nstack` treatment below.
 */
function argsToMessage(args: unknown[]): string {
  const [first, ...rest] = args;
  const hasFormatString = typeof first === "string" && /%[sdifjoOc%]/.test(first);
  const restHasError = rest.some((arg) => arg instanceof Error);
  if (hasFormatString && !restHasError) {
    return format(first, ...rest);
  }
  return args
    .map((arg) => {
      if (arg instanceof Error) return `${arg.message}\n${arg.stack || ""}`;
      if (typeof arg === "object" && arg !== null) {
        try {
          return JSON.stringify(arg);
        } catch {
          return String(arg);
        }
      }
      return String(arg);
    })
    .join(" ");
}

// Rate limiting for interceptor disk writes, applied to `error` entries ONLY.
//
// The policy mirrors #1006's in structuredLogger (50 writes/sec, 5s dedup, bounded map) so the
// numbers are ones upstream has already accepted. The `error`-only scope is deliberate and is
// not what #1006 did by accident: structuredLogger applies its limiter solely to error() and
// fatal(), whereas writeEntry here serves all five of log/info/warn/error/debug across ~800
// non-error call sites. Applying a 50/sec cap to ordinary logging would silently drop routine
// startup and per-request lines from the Console Log Viewer's file.
const ERROR_DEDUP_WINDOW_MS = 5_000;
const ERROR_MAX_WRITES_PER_SECOND = 50;
const ERROR_MAX_TRACKED = 500;

let recentErrorEntries = new Map<string, number>();
let errorWriteCount = 0;
let errorWindowStart = Date.now();
let missingDirNoticeEmitted = false;

function shouldSuppressErrorEntry(message: string): boolean {
  const now = Date.now();

  if (now - errorWindowStart > 1000) {
    errorWriteCount = 0;
    errorWindowStart = now;
  }
  if (errorWriteCount >= ERROR_MAX_WRITES_PER_SECOND) return true;

  const firstSeen = recentErrorEntries.get(message);
  if (firstSeen !== undefined && now - firstSeen < ERROR_DEDUP_WINDOW_MS) return true;

  if (recentErrorEntries.size >= ERROR_MAX_TRACKED) {
    // Map preserves insertion order; evict oldest as a backstop against a unique-message burst.
    const oldest = recentErrorEntries.keys().next();
    if (!oldest.done) recentErrorEntries.delete(oldest.value);
  }

  recentErrorEntries.set(message, now);
  errorWriteCount++;
  return false;
}

/**
 * Report, exactly once, that the log file has become unwritable.
 *
 * Written straight to stderr rather than through console: console is patched by this module,
 * so routing it there would re-enter writeEntry and could recurse. Guarded on stream health
 * for the same reason structuredLogger's raw writes now are (#8181).
 */
function emitMissingDirNoticeOnce(): void {
  if (missingDirNoticeEmitted) return;
  missingDirNoticeEmitted = true;
  if (process.stderr.destroyed || process.stderr.writableEnded) return;
  try {
    process.stderr.write(
      `[consoleInterceptor] console file-logging is failing; log file unavailable: ${logFilePath}\n`
    );
  } catch {
    /* the notice is best-effort by definition */
  }
}

/**
 * Append a JSON log entry to the log file.
 *
 * ensureDir() runs once in initConsoleInterceptor(), so if the log directory is removed while
 * the process is alive every subsequent append throws ENOENT into the catch below and console
 * file-logging stops permanently, with nothing surfaced. Recreate the directory and retry once
 * before giving up, and say so on the first failure.
 */
function writeEntry(level: string, args: unknown[]) {
  try {
    const rawMessage = argsToMessage(args);
    // The terminal keeps the colors: original(...args) below receives the arguments
    // untouched. The file entry (and the error dedup key, which is one logical line
    // per color variant) uses the stripped message so text search and the log viewer
    // read plain text. The viewer (ConsoleLogViewer) and the log API
    // (src/app/api/logs/console/route.ts) strip nothing on display.
    const message = stripAnsi(rawMessage);
    if (level === "error" && shouldSuppressErrorEntry(message)) return;

    const entry = {
      timestamp: new Date().toISOString(),
      level,
      component: extractComponent(rawMessage),
      message,
    };
    const line = JSON.stringify(entry) + "\n";

    try {
      appendFileSync(logFilePath, line);
    } catch {
      try {
        ensureDir();
        appendFileSync(logFilePath, line);
      } catch {
        emitMissingDirNoticeOnce();
      }
    }
  } catch {
    // Silently fail — never break the app over log writing
  }
}

function shouldIgnoreConsoleWriteError(error: unknown): boolean {
  return error instanceof Error && (error as NodeJS.ErrnoException).code === "EPIPE";
}

/**
 * Initialize the console interceptor.
 * Patches console.log, console.info, console.warn, console.error, console.debug
 * to also write to the log file.
 *
 * Safe to call multiple times — only initializes once.
 */
export function initConsoleInterceptor(): void {
  // Install the stdio guard first, before any early return. It protects the raw stderr writes
  // in structuredLogger, which happen regardless of whether console interception is enabled.
  installStdioErrorGuard();

  if (!logToFile || globalThis.__omnirouteConsoleInterceptorInit) return;

  try {
    ensureDir();
  } catch {
    // Can't create log dir — skip interception
    return;
  }

  globalThis.__omnirouteConsoleInterceptorInit = true;

  // Capture the raw method references first, so reset() can restore the exact functions that
  // were installed before patching. The bound copies below are for calling, not restoring —
  // restoring a bound copy would change function identity and defeat the save/restore that
  // existing console-mocking tests rely on.
  savedConsoleMethods = {
    log: console.log as ConsoleMethod,
    info: console.info as ConsoleMethod,
    warn: console.warn as ConsoleMethod,
    error: console.error as ConsoleMethod,
    debug: console.debug as ConsoleMethod,
  };

  // Save original methods
  const originalMethods = {
    log: console.log.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    debug: console.debug.bind(console),
  };

  // Patch each console method
  for (const [method, level] of Object.entries(LEVEL_MAP)) {
    const original = originalMethods[method as keyof typeof originalMethods];
    if (!original) continue;

    (console as unknown as Record<string, unknown>)[method] = (...args: unknown[]) => {
      writeEntry(level, args);
      try {
        original(...args);
      } catch (error) {
        if (!shouldIgnoreConsoleWriteError(error)) throw error;
      }
    };
  }
}

/**
 * Test-only internals.
 *
 * `reset()` is not a convenience: `test:unit:fast` runs `--test-isolation=none`, so every unit
 * test file shares one process. Without it, an interceptor initialised by one file would leave
 * console patched and stream listeners attached for every file that follows.
 */
export const __consoleInterceptorInternals = {
  reset(): void {
    if (streamErrorHandler) {
      process.stdout.removeListener("error", streamErrorHandler);
      process.stderr.removeListener("error", streamErrorHandler);
      streamErrorHandler = null;
    }
    if (savedConsoleMethods) {
      for (const [method, fn] of Object.entries(savedConsoleMethods)) {
        if (fn) (console as unknown as Record<string, unknown>)[method] = fn;
      }
      savedConsoleMethods = null;
    }
    recentErrorEntries = new Map();
    errorWriteCount = 0;
    errorWindowStart = Date.now();
    missingDirNoticeEmitted = false;
    globalThis.__omnirouteConsoleInterceptorInit = undefined;
  },
};
