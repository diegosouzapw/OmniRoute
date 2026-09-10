import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { writePidFile, cleanupPidFile, killAllSubprocesses, isPidRunning } from "../utils/pid.mjs";
import {
  RESTART_RESET_MS,
  DEFAULT_MAX_RESTARTS,
  shouldExitInsteadOfRestart,
  computeRestartDelayMs,
  waitUntilPortFree,
} from "./supervisorPolicy.mjs";
import { buildNodeRuntimeArgs } from "../../../scripts/build/runtime-env.mjs";
import { stopProcessGracefully } from "../../../src/shared/platform/windowsProcess.ts";
import {
  isFatalInstrumentationHookFailure,
  formatAndroidInstrumentationFailureHint,
} from "../utils/ensureAndroidCacheDir.mjs";

const CRASH_LOG_LINES = 50;

const PACKAGE_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
// Bun needs the Node-compat polyfill preloaded (#9761). The file ships at the
// package root via package.json "files" (see scripts/build/pack-artifact-policy.ts)
// and is never copied into dist/, so the path must resolve against the package
// root — resolving it next to the server bundle fails with "preload not found" (#11980).
export const BUN_PRELOAD_PATH = join(PACKAGE_ROOT, "open-sse", "utils", "setupPolyfill.ts");

/**
 * Argument vector for the server child. Kept pure so tests can assert on it
 * directly: the bare `import { spawn }` above cannot be intercepted without
 * --experimental-test-module-mocks (same seam as #8131).
 */
export function buildServerSpawnArgs(serverPath, memoryLimit, env = process.env) {
  return process.versions.bun
    ? ["--preload", BUN_PRELOAD_PATH, serverPath]
    : buildNodeRuntimeArgs(env, memoryLimit, serverPath);
}

export class ServerSupervisor {
  constructor({
    serverPath,
    env,
    maxRestarts = DEFAULT_MAX_RESTARTS,
    memoryLimit = 512,
    onCrashCallback,
  }) {
    this.serverPath = serverPath;
    this.env = env;
    this.maxRestarts = maxRestarts;
    this.memoryLimit = memoryLimit;
    this.onCrashCallback = onCrashCallback;
    this.restartCount = 0;
    this.startedAt = 0;
    this.crashLog = [];
    this.child = null;
    this.isShuttingDown = false;
    this.instrumentationFailureHintPrinted = false;
  }

  start() {
    this.startedAt = Date.now();
    this.crashLog = [];
    this.instrumentationFailureHintPrinted = false;

    const showLog = process.env.OMNIROUTE_SHOW_LOG === "1";
    // #6321: stdout used to be discarded (`"ignore"`) whenever `--log`/OMNIROUTE_SHOW_LOG
    // wasn't set (the default) — any debug/pino output written to stdout vanished
    // silently, so a boot that never becomes ready looked like a dead hang with zero
    // output even at APP_LOG_LEVEL=debug. Pipe stdout too and buffer it alongside
    // stderr so a readiness timeout can surface what the child actually printed.
    // #9156: always spawn via process.execPath (absolute path to the running
    // runtime — node or bun). Bare "node" is unresolvable under macOS launchd's
    // minimal PATH; #9761's Bun ternary accidentally regressed the Node branch.
    // Node args come from buildNodeRuntimeArgs (#9209 IPv4-first DNS + #5238
    // heap flag handling); the Bun branch keeps #9761's polyfill preload —
    // Bun does not accept the Node-only flags.
    this.child = spawn(process.execPath, buildServerSpawnArgs(this.serverPath, this.memoryLimit), {
      cwd: dirname(this.serverPath),
      env: this.env,
      stdio: showLog ? "inherit" : ["ignore", "pipe", "pipe"],
    });

    writePidFile("server", this.child.pid);

    const bufferOutput = (data) => {
      const text = data.toString();
      const lines = text.split("\n").filter(Boolean);
      this.crashLog.push(...lines);
      if (this.crashLog.length > CRASH_LOG_LINES) {
        this.crashLog = this.crashLog.slice(-CRASH_LOG_LINES);
      }
      // Surface Android/Termux instrumentation-hook failures even when --log is
      // off (output is only buffered otherwise).
      if (!this.instrumentationFailureHintPrinted && isFatalInstrumentationHookFailure(text)) {
        this.instrumentationFailureHintPrinted = true;
        process.stderr.write(
          formatAndroidInstrumentationFailureHint(
            this.env?.XDG_CACHE_HOME || process.env.XDG_CACHE_HOME
          )
        );
      }
    };

    if (this.child.stdout) {
      this.child.stdout.on("data", bufferOutput);
    }
    if (this.child.stderr) {
      this.child.stderr.on("data", bufferOutput);
    }

    this.child.on("error", (err) => this.handleExit(-1, err));
    this.child.on("exit", (code) => this.handleExit(code));

    return this.child;
  }

  handleExit(code, err) {
    // Node.js v24+ requires process.exit() to receive a number. Spawn-error events
    // deliver err.code (a string like 'ENOENT') via the 'error' listener; normalise here.
    const exitCode = typeof code === "number" ? code : null;
    cleanupPidFile("server");

    // #8091: the child's spawn 'error' listener passes `err` through as a second
    // argument, but it used to be silently dropped — the user only ever saw the
    // hardcoded "code=-1" with a permanently empty crash log, with no way to
    // diagnose why the child never started (ENOENT/EACCES/bad path/etc.). Surface
    // the real reason immediately, both on the console and in the crash-log buffer
    // so `dumpCrashLog()` shows it too.
    if (err) {
      const detail = [
        err.code && `code=${err.code}`,
        err.syscall && `syscall=${err.syscall}`,
        err.path && `path=${err.path}`,
        err.message,
      ]
        .filter(Boolean)
        .join(" ");
      const line = `⚠ Spawn error: ${detail || String(err)}`;
      console.error(line);
      this.crashLog.push(line);
    }

    // #4425: only exit on an intentional shutdown. A spontaneous code-0 exit (e.g. a
    // systemd MemoryMax cgroup kill, which reports the process exited cleanly) is anomalous
    // and must be restarted, not treated as a graceful stop that leaves the gateway dead.
    if (shouldExitInsteadOfRestart(this.isShuttingDown)) {
      process.exit(exitCode ?? 0);
      return;
    }

    const aliveMs = Date.now() - this.startedAt;
    if (aliveMs >= RESTART_RESET_MS) this.restartCount = 0;

    if (this.restartCount >= this.maxRestarts) {
      console.error(`\n⚠ Server crashed ${this.maxRestarts} times in <30s.`);
      if (this.onCrashCallback) {
        const action = this.onCrashCallback(this.crashLog);
        if (action === "disable-mitm-and-retry") {
          console.error("⚠ Disabling MITM and retrying...\n");
          this.restartCount = 0;
          this.start();
          return;
        }
      }
      this.dumpCrashLog();
      process.exit(exitCode ?? 1);
      return;
    }

    this.restartCount++;
    const delay = computeRestartDelayMs(this.restartCount);
    console.error(
      `\n⚠ Server exited (code=${code ?? "?"}). Restarting in ${delay / 1000}s... (${this.restartCount}/${this.maxRestarts})`
    );
    if (this.crashLog.length) this.dumpCrashLog();
    // #4425: after a crash the OS may not have released the listen socket yet — restarting
    // immediately produced the EADDRINUSE cascade that exhausted the restart budget. Wait
    // (bounded) for the port to free up before respawning.
    setTimeout(async () => {
      await waitUntilPortFree(process.env.PORT || 20128);
      this.start();
    }, delay);
  }

  // #6321: exposes the buffered stdout+stderr lines so a caller (e.g. a readiness
  // timeout) can print what the child actually said instead of silence.
  getRecentLog() {
    return [...this.crashLog];
  }

  dumpCrashLog() {
    console.error("\n--- Server crash log ---");
    this.crashLog.forEach((l) => console.error(l));
    console.error("--- End crash log ---\n");
  }

  stop() {
    this.isShuttingDown = true;
    if (this.child?.pid) {
      // #8045: on win32, process.kill(pid, "SIGTERM") unconditionally force-terminates
      // the target — it is never a real, interceptable signal there. The child already
      // receives the real CTRL_C_EVENT/CTRL_CLOSE_EVENT independently (it shares the
      // console) and runs its own async graceful shutdown (WAL checkpoint). Sending
      // SIGTERM immediately on win32 races and beats that cleanup. Fire-and-forget:
      // stop() itself stays sync so callers keep their existing control flow.
      void stopProcessGracefully({ pid: this.child.pid, timeoutMs: 5000, isPidRunning });
    }
    killAllSubprocesses();
  }
}

export function detectMitmCrash(crashLog) {
  const text = crashLog.join("\n").toLowerCase();
  const signals = ["mitm", "tls socket", "certificate", "hosts", "eaccess"];
  return signals.filter((s) => text.includes(s)).length >= 2;
}
