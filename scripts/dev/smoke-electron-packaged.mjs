#!/usr/bin/env node

import { spawn } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { arch, platform, tmpdir } from "node:os";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..", "..");

const DEFAULT_TIMEOUT_MS = 45_000;
const DEFAULT_SETTLE_MS = 2_000;
const DEFAULT_URL = "http://127.0.0.1:20128/login";
export const LINUX_EXECUTABLE_NAMES = ["omniroute-desktop", "omniroute", "OmniRoute"];
export const FATAL_LOG_PATTERNS = [
  /Cannot find module/i,
  /MODULE_NOT_FOUND/,
  /ERR_DLOPEN_FAILED/,
  /Server exited with code:\s*[1-9]/,
  /Failed to start server/i,
  /Unhandled Rejection/i,
  /Uncaught Exception/i,
];

function parsePositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function sleep(ms) {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

function discoverMacExecutable() {
  const distDir = join(ROOT, "electron", "dist-electron");
  if (process.env.ELECTRON_SMOKE_APP_EXECUTABLE) {
    return process.env.ELECTRON_SMOKE_APP_EXECUTABLE;
  }

  const candidates = [
    join(
      distDir,
      arch() === "arm64" ? "mac-arm64" : "mac",
      "OmniRoute.app",
      "Contents",
      "MacOS",
      "OmniRoute"
    ),
    join(distDir, "mac", "OmniRoute.app", "Contents", "MacOS", "OmniRoute"),
    join(distDir, "mac-arm64", "OmniRoute.app", "Contents", "MacOS", "OmniRoute"),
  ];

  return candidates.find((candidate) => existsSync(candidate)) || candidates[0];
}

function findExecutableByName(rootDir, names) {
  const pending = [rootDir];
  const wanted = new Set(names.map((name) => name.toLowerCase()));

  while (pending.length > 0) {
    const dir = pending.shift();
    if (!existsSync(dir)) continue;

    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        pending.push(fullPath);
        continue;
      }

      if (!wanted.has(entry.toLowerCase())) continue;
      if (platform() === "linux" && (stat.mode & 0o111) === 0) continue;
      return fullPath;
    }
  }

  return null;
}

function discoverWindowsExecutable() {
  const distDir = join(ROOT, "electron", "dist-electron");
  const candidates = [
    join(distDir, "win-unpacked", "OmniRoute.exe"),
    join(distDir, "win-x64-unpacked", "OmniRoute.exe"),
    join(distDir, "win-arm64-unpacked", "OmniRoute.exe"),
  ];

  return (
    candidates.find((candidate) => existsSync(candidate)) ||
    findExecutableByName(distDir, ["OmniRoute.exe"]) ||
    candidates[0]
  );
}

function discoverLinuxExecutable() {
  const distDir = join(ROOT, "electron", "dist-electron");
  const unpackedDirs = ["linux-unpacked", "linux-arm64-unpacked"];
  const candidates = unpackedDirs.flatMap((dir) =>
    LINUX_EXECUTABLE_NAMES.map((name) => join(distDir, dir, name))
  );

  return (
    candidates.find((candidate) => existsSync(candidate)) ||
    findExecutableByName(distDir, LINUX_EXECUTABLE_NAMES) ||
    candidates[0]
  );
}

function discoverPackagedExecutable() {
  if (process.env.ELECTRON_SMOKE_APP_EXECUTABLE) {
    return process.env.ELECTRON_SMOKE_APP_EXECUTABLE;
  }

  if (platform() === "darwin") return discoverMacExecutable();
  if (platform() === "win32") return discoverWindowsExecutable();
  if (platform() === "linux") return discoverLinuxExecutable();

  throw new Error(`Packaged Electron smoke check does not support ${platform()}.`);
}

/**
 * The packaged app opens SQLite lazily: `/login` (the readiness URL) never touches the
 * database, so a smoke that only waits for readiness sees no `[DB]` line at all. After
 * readiness the smoke requests a DB-backed endpoint and waits for evidence that the
 * database opened. The primary open path does NOT print "[DB] Driver: ..." (only the
 * recovery path and the sql.js fallback do), so the evidence is any `[DB]`/`[Migration]`
 * startup line — and the #7592 guard below rejects the fallback's own line explicitly.
 */
export const DB_TOUCH_PATH = "/api/monitoring/health";
export const DB_OPEN_EVIDENCE_PATTERN =
  /\[DB\] (Driver: |SQLite database ready|Added [^\n]* column|Changing cache_size|cache_size changed)|\[Migration\] (Applied|Pre-migration backup)/;

export async function waitForDatabaseOpen(getLogs, { timeoutMs = 15_000, pollMs = 250 } = {}) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const logs = getLogs();
    assertNoFatalLogs(logs);
    if (DB_OPEN_EVIDENCE_PATTERN.test(logs)) return logs;
    await sleep(pollMs);
  }
  throw new Error(
    `Packaged Electron app logged no [DB]/[Migration] startup line within ${timeoutMs}ms of ` +
      `touching ${DB_TOUCH_PATH} — the database never opened, so the SQLite driver cannot be verified.`
  );
}

async function openDatabaseForSmoke({ logs, smokeUrl }) {
  const touchUrl = new URL(DB_TOUCH_PATH, smokeUrl).toString();
  try {
    const response = await fetchWithTimeout(touchUrl, 5_000);
    console.log(
      `[electron-smoke] touched ${touchUrl} (HTTP ${response.status}) to open the database`
    );
  } catch (error) {
    console.log(
      `[electron-smoke] touching ${touchUrl} failed (${error instanceof Error ? error.message : String(error)}) — waiting for the database anyway`
    );
  }
  await waitForDatabaseOpen(() => logs.value);
  console.log("[electron-smoke] database opened");
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      cache: "no-store",
      redirect: "manual",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function assertPortIsFree(url) {
  try {
    const response = await fetchWithTimeout(url, 1_000);
    throw new Error(
      `Smoke URL already responded with HTTP ${response.status}: ${url}. Stop the existing OmniRoute process before running this check.`
    );
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Smoke URL already responded")) {
      throw error;
    }
  }
}

async function waitForPortClosed(url, timeoutMs = 5_000) {
  const deadline = Date.now() + timeoutMs;
  let lastStatus = null;

  while (Date.now() < deadline) {
    try {
      const response = await fetchWithTimeout(url, 1_000);
      lastStatus = response.status;
    } catch {
      return;
    }

    await sleep(250);
  }

  throw new Error(
    `Smoke URL still responded after app shutdown${
      lastStatus === null ? "" : ` with HTTP ${lastStatus}`
    }: ${url}`
  );
}

function appendLog(buffer, chunk, prefix, streamLogs) {
  const text = chunk.toString();
  if (streamLogs) {
    process.stdout.write(`${prefix}${text}`);
  }
  const next = buffer.value + text;
  buffer.value = next.length > 40_000 ? next.slice(-40_000) : next;
}

function printLogTail(logs) {
  if (!logs.trim()) return;

  console.error("[electron-smoke] captured app log tail:");
  console.error(logs.trimEnd());
}

function assertNoFatalLogs(logs) {
  const fatalPattern = FATAL_LOG_PATTERNS.find((pattern) => pattern.test(logs));
  if (fatalPattern) {
    throw new Error(`Packaged Electron app emitted fatal startup logs matching ${fatalPattern}.`);
  }
}

async function waitForExit(child, timeoutMs) {
  if (child.exitCode !== null || child.signalCode !== null) return;

  await Promise.race([new Promise((resolve) => child.once("exit", resolve)), sleep(timeoutMs)]);
}

function isProcessGroupAlive(pid) {
  if (!pid || platform() === "win32") return false;

  try {
    process.kill(-pid, 0);
    return true;
  } catch (error) {
    if (error?.code === "ESRCH") return false;
    if (error?.code === "EPERM") return true;
    throw error;
  }
}

async function waitForProcessTreeExit(child, timeoutMs) {
  if (!child.pid || platform() === "win32") {
    await waitForExit(child, timeoutMs);
    return;
  }

  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (!isProcessGroupAlive(child.pid)) return;
    await sleep(100);
  }
}

async function runQuietly(command, args) {
  await new Promise((resolveRun) => {
    const proc = spawn(command, args, { stdio: "ignore" });
    proc.once("error", resolveRun);
    proc.once("exit", resolveRun);
  });
}

async function signalProcessTree(child, signal) {
  if (!child.pid) return;

  if (platform() === "win32") {
    if (signal === "SIGKILL") {
      await runQuietly("taskkill", ["/pid", String(child.pid), "/t", "/f"]);
    } else {
      child.kill(signal);
    }
    return;
  }

  try {
    process.kill(-child.pid, signal);
  } catch (error) {
    if (error?.code !== "ESRCH") throw error;
  }
}

export async function stopApp(
  child,
  {
    currentPlatform = platform(),
    signalProcessTreeFn = signalProcessTree,
    waitForProcessTreeExitFn = waitForProcessTreeExit,
  } = {}
) {
  if (!child.pid) return;

  // On Windows, terminating only the direct Electron process can orphan the
  // packaged server when the parent exits before the follow-up liveness check.
  // Kill the process tree in one operation while the root PID is still valid.
  if (currentPlatform === "win32") {
    await signalProcessTreeFn(child, "SIGKILL");
    await waitForProcessTreeExitFn(child, 2_000);
    return;
  }

  await signalProcessTreeFn(child, "SIGTERM");
  await waitForProcessTreeExitFn(child, 5_000);

  const isStillRunning = isProcessGroupAlive(child.pid);

  if (isStillRunning) {
    await signalProcessTreeFn(child, "SIGKILL");
    await waitForProcessTreeExitFn(child, 2_000);
  }
}

export function buildSmokeEnv({
  dataDir,
  parentEnv = process.env,
  currentPlatform = platform(),
} = {}) {
  if (!dataDir) {
    throw new Error("buildSmokeEnv requires dataDir.");
  }

  const inheritedNames = [
    "PATH",
    "Path",
    "SystemRoot",
    "WINDIR",
    "COMSPEC",
    "PATHEXT",
    "TMPDIR",
    "TMP",
    "TEMP",
    "LANG",
    "LC_ALL",
    "LC_CTYPE",
    "DISPLAY",
    "WAYLAND_DISPLAY",
    "XAUTHORITY",
    "XDG_RUNTIME_DIR",
    "DBUS_SESSION_BUS_ADDRESS",
    "ELECTRON_OZONE_PLATFORM_HINT",
  ];
  const smokeEnv = {};

  for (const name of inheritedNames) {
    if (parentEnv[name]) {
      smokeEnv[name] = parentEnv[name];
    }
  }

  if (currentPlatform === "win32") {
    smokeEnv.USERPROFILE = join(dataDir, "userprofile");
    smokeEnv.APPDATA = join(dataDir, "AppData", "Roaming");
    smokeEnv.LOCALAPPDATA = join(dataDir, "AppData", "Local");
    smokeEnv.TEMP ||= join(dataDir, "tmp");
    smokeEnv.TMP ||= smokeEnv.TEMP;
  } else {
    smokeEnv.HOME = join(dataDir, "home");
    smokeEnv.XDG_CONFIG_HOME = join(dataDir, "config");
    smokeEnv.XDG_CACHE_HOME = join(dataDir, "cache");
    smokeEnv.XDG_DATA_HOME = join(dataDir, "data");
    smokeEnv.TMPDIR ||= join(dataDir, "tmp");
  }

  const baseEnv = {
    ...smokeEnv,
    DATA_DIR: dataDir,
    ELECTRON_ENABLE_LOGGING: "1",
    ELECTRON_ENABLE_STACK_DUMPING: "1",
  };

  // CI environments need sandbox disabled (GitHub Actions runners
  // cannot configure SUID chrome-sandbox on Linux, and Windows
  // runners may exit silently without it).
  if (parentEnv.CI) {
    baseEnv.CI = parentEnv.CI;
    baseEnv.ELECTRON_DISABLE_SANDBOX = "1";
  }

  return baseEnv;
}

function isInsideDir(parentDir, candidateDir) {
  const parent = resolve(parentDir);
  const candidate = resolve(candidateDir);
  return candidate === parent || candidate.startsWith(parent + sep);
}

export async function ensureSmokeEnvDirs(smokeEnv, dataDir, { currentPlatform = platform() } = {}) {
  // The win32 branches below must key off the SMOKE TARGET's platform, not the
  // host's: tests (and any future cross-platform dry-run) inject a win32-shaped
  // smokeEnv while running on a Linux CI host, and branching on the host
  // platform() there silently skipped the USERPROFILE/APPDATA userData tree —
  // exactly what this function exists to pre-create (#7592).
  const dirNames = [
    "DATA_DIR",
    "HOME",
    "USERPROFILE",
    "APPDATA",
    "LOCALAPPDATA",
    "XDG_CONFIG_HOME",
    "XDG_CACHE_HOME",
    "XDG_DATA_HOME",
    "TMPDIR",
    "TMP",
    "TEMP",
  ];
  const dirs = [
    ...new Set(
      dirNames.map((name) => smokeEnv[name]).filter((dir) => dir && isInsideDir(dataDir, dir))
    ),
  ];

  // On Windows, Electron derives its userData from APPDATA/<productName>.
  // requestSingleInstanceLock() runs synchronously at module load and
  // fails silently if the directory doesn't exist yet — causing exit(0).
  if (currentPlatform === "win32" && smokeEnv.APPDATA) {
    for (const subdir of ["omniroute-desktop", "OmniRoute", "omniroute"]) {
      dirs.push(join(smokeEnv.APPDATA, subdir));
    }
  }
  // Electron resolves the Roaming profile from %USERPROFILE%\AppData\Roaming
  // (USERPROFILE takes precedence over the APPDATA env var) and the path
  // service throws — rather than creates — when that directory is missing,
  // which makes requestSingleInstanceLock() return false and the app exit(0)
  // before app.whenReady(). Pre-create the derived tree as well.
  if (currentPlatform === "win32" && smokeEnv.USERPROFILE) {
    for (const subdir of ["omniroute-desktop", "OmniRoute", "omniroute"]) {
      dirs.push(join(smokeEnv.USERPROFILE, "AppData", "Roaming", subdir));
    }
  }

  await Promise.all(dirs.map((dir) => mkdir(dir, { recursive: true })));
}

async function settleAfterReady({ getExitState, logs, settleMs }) {
  const deadline = Date.now() + settleMs;

  while (Date.now() < deadline) {
    assertNoFatalLogs(logs.value);

    const { exitCode, signalCode } = getExitState();
    if (exitCode !== null || signalCode !== null) {
      throw new Error(
        `Packaged Electron app exited during readiness settle: code=${exitCode} signal=${signalCode}`
      );
    }

    await sleep(Math.min(250, Math.max(0, deadline - Date.now())));
  }
}

function assertExecutableExists(appExecutable) {
  if (existsSync(appExecutable)) return;

  throw new Error(
    `Packaged OmniRoute executable not found at ${appExecutable}. Build it first with \`npm run build:<target> --prefix electron\` or set ELECTRON_SMOKE_APP_EXECUTABLE.`
  );
}

// ── CI sandbox workaround ──────────────────────────────────
// GitHub Actions runners cannot set SUID on chrome-sandbox (Linux)
// and Windows runners may fail silently without --no-sandbox.
function buildCiSpawnArgs(currentPlatform = platform()) {
  if (!process.env.CI) return [];

  const spawnArgs = ["--no-sandbox", "--disable-gpu"];
  if (currentPlatform === "linux") {
    spawnArgs.push("--disable-dev-shm-usage");
  }
  return spawnArgs;
}

const NATIVE_DRIVER_LOG_PATTERN = /\[DB\] Driver: (bun:sqlite|better-sqlite3|node:sqlite) \|/;
const SQLJS_DRIVER_LOG_PATTERN = /\[DB\] Driver: sql\.js \|/;

/**
 * Regression guard for #7592: on a packaged app's SECOND launch against an
 * already-persisted DATA_DIR, a stale-ABI better-sqlite3 binary (resolved via
 * a Turbopack-hashed import) used to fail to load and silently fall through
 * to the sql.js (WASM) driver — which then OOMs/retry-loops on real-sized
 * databases. Asserts the startup log shows a native driver was selected.
 */
export function assertNativeDriverSelected(logs) {
  if (NATIVE_DRIVER_LOG_PATTERN.test(logs)) return;

  if (SQLJS_DRIVER_LOG_PATTERN.test(logs)) {
    throw new Error(
      "Packaged Electron app fell back to the sql.js (WASM) driver instead of a native SQLite " +
        "driver — this is the regression #7592 guards against (stale-ABI better-sqlite3 binary)."
    );
  }

  // The primary open path prints no "[DB] Driver: ..." line at all (only the recovery path and
  // the sql.js fallback do), so a database that demonstrably opened WITHOUT the fallback's own
  // line is the native driver — that is exactly what #7592 guards.
  if (DB_OPEN_EVIDENCE_PATTERN.test(logs)) return;

  throw new Error(
    "Packaged Electron app logs show no database activity at all — cannot confirm which SQLite " +
      "driver loaded."
  );
}

async function waitForReady({ logs, smokeUrl, timeoutMs, settleMs, exitState }) {
  const startedAt = Date.now();
  let lastError = null;

  while (Date.now() - startedAt < timeoutMs) {
    assertNoFatalLogs(logs.value);

    if (exitState.spawnError !== null) {
      throw new Error(`Packaged Electron app failed to launch: ${exitState.spawnError.message}`);
    }
    if (exitState.exitCode !== null || exitState.signalCode !== null) {
      throw new Error(
        `Packaged Electron app exited before readiness: code=${exitState.exitCode} signal=${exitState.signalCode}`
      );
    }

    try {
      const response = await fetchWithTimeout(smokeUrl, 1_000);
      if (response.status === 200) {
        assertNoFatalLogs(logs.value);
        console.log(`[electron-smoke] ready: ${smokeUrl} returned HTTP 200`);
        await settleAfterReady({
          getExitState: () => ({ exitCode: exitState.exitCode, signalCode: exitState.signalCode }),
          logs,
          settleMs,
        });
        console.log(`[electron-smoke] stable for ${settleMs}ms after readiness`);
        return;
      }
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }

    await sleep(500);
  }

  throw new Error(
    `Packaged Electron app did not serve ${smokeUrl} within ${timeoutMs}ms. Last error: ${
      lastError instanceof Error ? lastError.message : String(lastError)
    }`
  );
}

/**
 * Launches the packaged app once against `dataDir`, waits for readiness +
 * settle, tears it down, and returns the captured stdout/stderr text. Shared
 * by the single-launch path and the cold-restart (two-launch) path so both
 * exercise identical spawn/readiness/shutdown behavior.
 */
async function launchAndCollectLogs({
  appExecutable,
  smokeUrl,
  dataDir,
  timeoutMs,
  settleMs,
  streamLogs,
}) {
  const smokeEnv = buildSmokeEnv({ dataDir });
  await assertPortIsFree(smokeUrl);
  await ensureSmokeEnvDirs(smokeEnv, dataDir);

  const spawnArgs = buildCiSpawnArgs();
  console.log(`[electron-smoke] launching ${appExecutable}`);
  if (spawnArgs.length) console.log(`[electron-smoke] CI args: ${spawnArgs.join(" ")}`);
  console.log(`[electron-smoke] DATA_DIR=${dataDir}`);
  console.log(`[electron-smoke] waiting for ${smokeUrl}`);

  const logs = { value: "" };
  const child = spawn(appExecutable, spawnArgs, {
    detached: platform() !== "win32",
    env: smokeEnv,
    stdio: ["ignore", "pipe", "pipe"],
  });

  child.stdout?.on("data", (chunk) => appendLog(logs, chunk, "[electron] ", streamLogs));
  child.stderr?.on("data", (chunk) => appendLog(logs, chunk, "[electron:err] ", streamLogs));

  const exitState = { exitCode: null, signalCode: null, spawnError: null };
  child.once("exit", (code, signal) => {
    exitState.exitCode = code;
    exitState.signalCode = signal;
  });
  child.once("error", (error) => {
    exitState.spawnError = error;
  });

  try {
    await waitForReady({ logs, smokeUrl, timeoutMs, settleMs, exitState });
    // Outside waitForReady on purpose: a missing database is a verdict, not a readiness retry.
    await openDatabaseForSmoke({ logs, smokeUrl });
    return logs.value;
  } catch (error) {
    if (!streamLogs) {
      printLogTail(logs.value);
    }
    throw error;
  } finally {
    await stopApp(child);
    await waitForPortClosed(smokeUrl);
  }
}

async function main() {
  const appExecutable = discoverPackagedExecutable();
  assertExecutableExists(appExecutable);

  const smokeUrl = process.env.ELECTRON_SMOKE_URL || DEFAULT_URL;
  const timeoutMs = parsePositiveInteger(process.env.ELECTRON_SMOKE_TIMEOUT_MS, DEFAULT_TIMEOUT_MS);
  const settleMs = parsePositiveInteger(process.env.ELECTRON_SMOKE_SETTLE_MS, DEFAULT_SETTLE_MS);
  const streamLogs = process.env.ELECTRON_SMOKE_STREAM_LOGS === "1";
  // #7592: rerun against the SAME (persisted) DATA_DIR and assert the second
  // launch selected a native SQLite driver, not the sql.js WASM fallback.
  const coldRestart = process.env.ELECTRON_SMOKE_COLD_RESTART === "1";
  const dataDir =
    process.env.ELECTRON_SMOKE_DATA_DIR ||
    (await mkdtemp(join(tmpdir(), "omniroute-electron-smoke-")));
  const removeDataDir =
    !process.env.ELECTRON_SMOKE_DATA_DIR && process.env.ELECTRON_SMOKE_KEEP_DATA !== "1";

  try {
    await launchAndCollectLogs({
      appExecutable,
      smokeUrl,
      dataDir,
      timeoutMs,
      settleMs,
      streamLogs,
    });

    if (!coldRestart) return;

    console.log("[electron-smoke] cold-restart: relaunching against the same DATA_DIR");
    const secondLaunchLogs = await launchAndCollectLogs({
      appExecutable,
      smokeUrl,
      dataDir,
      timeoutMs,
      settleMs,
      streamLogs,
    });
    assertNativeDriverSelected(secondLaunchLogs);
    console.log("[electron-smoke] cold-restart: native SQLite driver confirmed on second launch");
  } finally {
    if (removeDataDir) {
      await rm(dataDir, { recursive: true, force: true });
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(
      `[electron-smoke] failed: ${error instanceof Error ? error.message : String(error)}`
    );
    process.exit(1);
  });
}
