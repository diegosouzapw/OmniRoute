import path from "path";
import os from "os";
import fs from "fs";

export const APP_NAME = "omniroute";

function fallbackHomeDir() {
  const envHome = process.env.HOME || process.env.USERPROFILE;
  if (typeof envHome === "string" && envHome.trim().length > 0) {
    return path.resolve(envHome);
  }

  return os.tmpdir();
}

function safeHomeDir() {
  try {
    return os.homedir();
  } catch {
    return fallbackHomeDir();
  }
}

function normalizeConfiguredPath(dir: unknown): string | null {
  if (typeof dir !== "string") return null;
  const trimmed = dir.trim();
  if (!trimmed) return null;
  return path.resolve(trimmed);
}

export function getLegacyDotDataDir() {
  return path.join(safeHomeDir(), `.${APP_NAME}`);
}

export function getDefaultDataDir() {
  const homeDir = safeHomeDir();
  const legacyDir = getLegacyDotDataDir();

  // Preserve legacy path if it exists to avoid data loss on updates (e.g., Windows migration)
  if (fs.existsSync(legacyDir)) {
    try {
      if (fs.statSync(legacyDir).isDirectory()) {
        return legacyDir;
      }
    } catch {
      // Ignore stat errors
    }
  }

  if (process.platform === "win32") {
    const appData = process.env.APPDATA || path.join(homeDir, "AppData", "Roaming");
    return path.join(appData, APP_NAME);
  }

  // Support XDG on Linux/macOS when explicitly configured.
  const xdgConfigHome = normalizeConfiguredPath(process.env.XDG_CONFIG_HOME);
  if (xdgConfigHome) {
    return path.join(xdgConfigHome, APP_NAME);
  }

  return legacyDir;
}

export function resolveDataDir({ isCloud = false }: { isCloud?: boolean } = {}): string {
  if (isCloud) return "/tmp";

  const configured = normalizeConfiguredPath(process.env.DATA_DIR);
  if (configured) return configured;

  return getDefaultDataDir();
}

/**
 * Resolve the data directory and guarantee it is writable.
 *
 * Unlike {@link resolveDataDir} (a pure, side-effect-free path resolver used by
 * many callers), this variant probes the resolved directory by attempting to
 * create it. When a configured `DATA_DIR` is not writable (`EACCES`/`EPERM`),
 * it falls back to the default user directory so the app keeps working instead
 * of crashing on an unwritable, operator-supplied path. Any other error (e.g.
 * `ENOTDIR`, `ENOSPC`) still propagates.
 *
 * Use this only at the single startup site that owns directory creation
 * (currently `db/core.ts`); everywhere else keep using the pure resolver.
 */
/**
 * #10428: true when this process looks like a test run rather than a server start.
 *
 * `NODE_TEST_CONTEXT` is set by `node --test` in every spawned test process, `VITEST` by
 * vitest, and `NODE_ENV=test` by the npm scripts — between them they cover both runners
 * plus the AGENTS.md single-file command, which does NOT load
 * `tests/_setup/isolateDataDir.ts`.
 */
export function isTestContext(): boolean {
  return (
    process.env.NODE_ENV === "test" ||
    !!process.env.VITEST ||
    !!process.env.NODE_TEST_CONTEXT ||
    process.execArgv.includes("--test") ||
    process.argv.includes("--test")
  );
}

/**
 * `node --eval` / `node -e` (and their print variants) are common shapes used by
 * one-off import probes.
 * Such a process has no application entry point from which to establish storage intent,
 * so defaulting it to the operator's durable database is unsafe. A deliberate production
 * inspection can still opt in with an explicit DATA_DIR (preferred) or
 * OMNIROUTE_ALLOW_DEFAULT_DATA_DIR=1.
 */
function isEvalProbeContext(): boolean {
  return process.execArgv.some(
    (arg) =>
      arg === "--eval" ||
      arg === "-e" ||
      arg === "-pe" ||
      arg === "-ep" ||
      arg.startsWith("--eval=") ||
      arg === "--print" ||
      arg === "-p" ||
      arg.startsWith("--print=")
  );
}

/** Process-wide redirect target, so repeated calls share one DB instead of one per call. */
let testContextDataDir: string | null = null;
let testContextCleanupRegistered = false;

export function resolveWritableDataDir({ isCloud = false }: { isCloud?: boolean } = {}): string {
  const resolved = resolveDataDir({ isCloud });
  const configured = normalizeConfiguredPath(process.env.DATA_DIR);

  // Cloud/serverless never owns a writable home dir; leave its sentinel alone.
  if (isCloud) return resolved;

  // #10428: a test/eval-probe run that never chose a DATA_DIR would otherwise open the
  // OPERATOR'S REAL database (~/.omniroute/storage.sqlite — live provider credentials).
  // Redirect to a throwaway dir instead of throwing: the documented single-file command
  // (`node --import tsx/esm --test tests/unit/x.test.ts`) does not load the isolation
  // setup, and a hard failure there would only teach people to disable the guard.
  // `OMNIROUTE_ALLOW_DEFAULT_DATA_DIR=1` opts back in, so the intent is recorded.
  if (
    !configured &&
    (isTestContext() || isEvalProbeContext()) &&
    process.env.OMNIROUTE_ALLOW_DEFAULT_DATA_DIR !== "1"
  ) {
    if (!testContextDataDir) {
      testContextDataDir = fs.mkdtempSync(path.join(os.tmpdir(), `${APP_NAME}-testctx-`));
      if (!testContextCleanupRegistered) {
        testContextCleanupRegistered = true;
        process.once("exit", () => {
          if (!testContextDataDir) return;
          try {
            fs.rmSync(testContextDataDir, {
              recursive: true,
              force: true,
              maxRetries: 5,
              retryDelay: 25,
            });
          } catch {
            // An unclean exit is left to the operating system's temp-directory policy.
          }
        });
      }
      console.warn(
        `[DATA_DIR] test/eval context without DATA_DIR → using '${testContextDataDir}' instead of ` +
          `'${resolved}'. Set DATA_DIR explicitly (or load tests/_setup/isolateDataDir.ts) to silence this.`
      );
    }
    return testContextDataDir;
  }

  // No explicit override → already the default user dir; nothing to fall back to.
  if (!configured) return resolved;

  try {
    fs.mkdirSync(resolved, { recursive: true });
    return resolved;
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "EACCES" || code === "EPERM") {
      const fallback = getDefaultDataDir();
      console.warn(
        `[DATA_DIR] '${resolved}' is not writable (${code}) → falling back to '${fallback}'`
      );
      return fallback;
    }
    throw err;
  }
}

export function isSamePath(a: string | null | undefined, b: string | null | undefined): boolean {
  if (!a || !b) return false;
  const normalizedA = path.resolve(a);
  const normalizedB = path.resolve(b);

  if (process.platform === "win32") {
    return normalizedA.toLowerCase() === normalizedB.toLowerCase();
  }

  return normalizedA === normalizedB;
}
