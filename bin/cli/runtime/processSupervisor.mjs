import { spawn } from "node:child_process";
import { dirname } from "node:path";
import { writePidFile, cleanupPidFile, killAllSubprocesses } from "../utils/pid.mjs";
import {
  RESTART_RESET_MS,
  DEFAULT_MAX_RESTARTS,
  shouldExitInsteadOfRestart,
  computeRestartDelayMs,
  waitUntilPortFree,
} from "./supervisorPolicy.mjs";

const CRASH_LOG_LINES = 50;

export class ServerSupervisor {
  constructor({ serverPath, env, maxRestarts = DEFAULT_MAX_RESTARTS, memoryLimit = 512, onCrashCallback }) {
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
  }

  start() {
    this.startedAt = Date.now();
    this.crashLog = [];

    const showLog = process.env.OMNIROUTE_SHOW_LOG === "1";
    this.child = spawn("node", [`--max-old-space-size=${this.memoryLimit}`, this.serverPath], {
      cwd: dirname(this.serverPath),
      env: this.env,
      stdio: showLog ? "inherit" : ["ignore", "ignore", "pipe"],
    });

    writePidFile("server", this.child.pid);

    if (this.child.stderr) {
      this.child.stderr.on("data", (data) => {
        const lines = data.toString().split("\n").filter(Boolean);
        this.crashLog.push(...lines);
        if (this.crashLog.length > CRASH_LOG_LINES) {
          this.crashLog = this.crashLog.slice(-CRASH_LOG_LINES);
        }
      });
    }

    this.child.on("error", (err) => this.handleExit(-1, err));
    this.child.on("exit", (code) => this.handleExit(code));

    return this.child;
  }

  handleExit(code) {
    // Node.js v24+ requires process.exit() to receive a number. Spawn-error events
    // deliver err.code (a string like 'ENOENT') via the 'error' listener; normalise here.
    const exitCode = typeof code === "number" ? code : null;
    cleanupPidFile("server");

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

  dumpCrashLog() {
    console.error("\n--- Server crash log ---");
    this.crashLog.forEach((l) => console.error(l));
    console.error("--- End crash log ---\n");
  }

  stop() {
    this.isShuttingDown = true;
    if (this.child?.pid) {
      try {
        process.kill(this.child.pid, "SIGTERM");
      } catch {}
      setTimeout(() => {
        try {
          process.kill(this.child.pid, "SIGKILL");
        } catch {}
      }, 5000);
    }
    killAllSubprocesses();
  }
}

export function detectMitmCrash(crashLog) {
  const text = crashLog.join("\n").toLowerCase();
  const signals = ["mitm", "tls socket", "certificate", "hosts", "eaccess"];
  return signals.filter((s) => text.includes(s)).length >= 2;
}
