import { spawn } from "node:child_process";
import { dirname } from "node:path";
import { writePidFile, cleanupPidFile, killAllSubprocesses } from "../utils/pid.mjs";
import { isPortFree } from "../utils/portCheck.mjs";

const CRASH_LOG_LINES = 50;
const RESTART_RESET_MS = 60_000;
/** Default port to check before restarting (matches serve.mjs default). */
const DEFAULT_PORT = parseInt(process.env.PORT || process.env.DASHBOARD_PORT || "20128", 10);
/** How long to wait for port release after a crash before giving up (ms). */
const PORT_WAIT_TIMEOUT_MS = 20_000;
/** How often to poll port availability (ms). */
const PORT_WAIT_POLL_MS = 500;
/** RSS memory threshold (bytes) above which we log a warning. Default: 80% of 6G cgroup limit. */
const RSS_WARN_BYTES = (() => {
  const raw = parseInt(process.env.OMNIROUTE_RSS_WARN_MB || "4915", 10); // ~80% of 6G
  return (Number.isFinite(raw) && raw > 0 ? raw : 4915) * 1024 * 1024;
})();
/** RSS threshold above which we force a graceful restart. Default: 90% of 6G. */
const RSS_RESTART_BYTES = (() => {
  const raw = parseInt(process.env.OMNIROUTE_RSS_RESTART_MB || "5530", 10); // ~90% of 6G
  return (Number.isFinite(raw) && raw > 0 ? raw : 5530) * 1024 * 1024;
})();

export class ServerSupervisor {
  constructor({ serverPath, env, maxRestarts = 3, memoryLimit = 512, onCrashCallback, port }) {
    this.serverPath = serverPath;
    this.env = env;
    this.maxRestarts = maxRestarts;
    this.memoryLimit = memoryLimit;
    this.onCrashCallback = onCrashCallback;
    this.port = port || DEFAULT_PORT;
    this.restartCount = 0;
    this.startedAt = 0;
    this.crashLog = [];
    this.child = null;
    this.isShuttingDown = false;
    this._memoryTimer = null;
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
    this.child.on("exit", (code, signal) => this.handleExit(code, signal));

    // Start periodic RSS monitoring on the PARENT process.
    // The supervisor itself barely uses memory, but the child's native
    // allocations (SQLite, TLS, workers) are attributed to the cgroup
    // and can push the whole group past systemd's MemoryMax without
    // V8 ever hitting --max-old-space-size.
    this._startMemoryMonitor();

    return this.child;
  }

  /**
   * Monitor RSS of this (supervisor) process. When the child is spawned
   * under systemd the cgroup RSS includes the child, so we read
   * /proc/self/statm via process.memoryUsage() which reflects the
   * supervisor's own RSS — the child's RSS is NOT included here.
   *
   * For cgroup-level monitoring the systemd MemoryMax + OOM killer
   * remain the source of truth. This monitor is a TEHEMETRY aid that
   * logs warnings so operators know when the service is approaching its
   * cgroup ceiling and can increase the limit proactively.
   */
  _startMemoryMonitor() {
    this._stopMemoryMonitor();
    const CHECK_INTERVAL_MS = 30_000;
    this._memoryTimer = setInterval(() => {
      try {
        const { rss } = process.memoryUsage();
        if (rss > RSS_RESTART_BYTES) {
          console.error(
            `\n⚠ Supervisor RSS ${Math.round(rss / 1024 / 1024)}MB exceeds restart threshold ` +
            `${Math.round(RSS_RESTART_BYTES / 1024 / 1024)}MB. Sending SIGTERM to child for graceful restart.`
          );
          if (this.child?.pid) {
            try { process.kill(this.child.pid, "SIGTERM"); } catch {}
          }
        } else if (rss > RSS_WARN_BYTES) {
          console.warn(
            `[memory] Supervisor RSS ${Math.round(rss / 1024 / 1024)}MB — approaching cgroup limit.`
          );
        }
      } catch {}
    }, CHECK_INTERVAL_MS);
    // Don't keep the process alive solely for memory monitoring.
    if (this._memoryTimer && typeof this._memoryTimer.unref === "function") {
      this._memoryTimer.unref();
    }
  }

  _stopMemoryMonitor() {
    if (this._memoryTimer) {
      clearInterval(this._memoryTimer);
      this._memoryTimer = null;
    }
  }

  async handleExit(code, signal) {
    // Node.js v24+ requires process.exit() to receive a number. Spawn-error events
    // deliver err.code (a string like 'ENOENT') via the 'error' listener; normalise here.
    const exitCode = typeof code === "number" ? code : null;
    cleanupPidFile("server");

    // Cleanly exiting while shutting down → propagate exit code.
    if (this.isShuttingDown) {
      process.exit(exitCode ?? 0);
      return;
    }

    // Exit code 0 without an explicit shutdown request is SUSPICIOUS.
    // It typically means Next.js / the server exited cleanly after an OOM
    // or a SIGTERM from systemd's cgroup controller. Treat it as restartable
    // (the parent process — this supervisor — will keep running).
    // Only propagate exit 0 if the child was alive for a meaningful time
    // AND the supervisor itself is shutting down.
    if (exitCode === 0) {
      const aliveMs = Date.now() - this.startedAt;
      if (aliveMs < 5000) {
        // Very short-lived clean exit — likely a startup one-shot (e.g. --help).
        // Don't restart; propagate the exit code.
        process.exit(0);
        return;
      }
      // Long-running clean exit — log and restart. The child likely hit the
      // cgroup MemoryMax and was killed cleanly by the kernel.
      console.warn(
        `\n⚠ Server exited cleanly (code=0, signal=${signal ?? "none"}, ` +
        `uptime=${Math.round(aliveMs / 1000)}s, memoryPeak=${this._getMemoryPeakLabel()}). ` +
        `Restarting — this may indicate OOM.`
      );
      // Don't bump restartCount — this is not a crash; it's a clean restart.
      // Use a longer delay to let the OS release the port.
      await this._waitAndRestart(2000);
      return;
    }

    const aliveMs = Date.now() - this.startedAt;
    if (aliveMs >= RESTART_RESET_MS) this.restartCount = 0;

    if (this.restartCount >= this.maxRestarts) {
      console.error(`\n⚠ Server crashed ${this.maxRestarts} times in <${RESTART_RESET_MS / 1000}s.`);
      if (this.onCrashCallback) {
        const action = this.onCrashCallback(this.crashLog);
        if (action === "disable-mitm-and-retry") {
          console.error("⚠ Disabling MITM and retrying...\n");
          this.restartCount = 0;
          await this._waitAndRestart(0);
          return;
        }
      }
      this.dumpCrashLog();
      process.exit(exitCode ?? 1);
      return;
    }

    this.restartCount++;
    const delay = Math.min(1000 * 2 ** (this.restartCount - 1), 10_000);
    console.error(
      `\n⚠ Server exited (code=${code ?? "?"}, signal=${signal ?? "none"}). ` +
      `Restarting in ${delay / 1000}s... (${this.restartCount}/${this.maxRestarts})`
    );
    if (this.crashLog.length) this.dumpCrashLog();
    await this._waitAndRestart(delay);
  }

  /**
   * Wait for the port to become free, then restart the server.
   * Prevents EADDRINUSE cascades that exhaust the supervisor's restart budget.
   */
  async _waitAndRestart(baseDelay) {
    // Apply the exponential backoff delay first.
    if (baseDelay > 0) {
      await new Promise((r) => setTimeout(r, baseDelay));
    }

    // Then wait for the port to actually be free.
    try {
      const port = this.port;
      if (port > 0) {
        const free = await isPortFree(port);
        if (!free) {
          console.error(`[supervisor] Port ${port} still in use; waiting up to ${PORT_WAIT_TIMEOUT_MS / 1000}s...`);
          const { waitUntilPortFree } = await import("../utils/portCheck.mjs");
          await waitUntilPortFree(port, { timeoutMs: PORT_WAIT_TIMEOUT_MS, intervalMs: PORT_WAIT_POLL_MS });
          console.error(`[supervisor] Port ${port} is now free.`);
        }
      }
    } catch (err) {
      console.error(`[supervisor] Port wait failed: ${err.message}. Attempting restart anyway.`);
    }

    this.start();
  }

  _getMemoryPeakLabel() {
    try {
      const { rss, heapUsed, heapTotal } = process.memoryUsage();
      return `rss=${Math.round(rss / 1024 / 1024)}MB,heap=${Math.round(heapUsed / 1024 / 1024)}MB`;
    } catch {
      return "unknown";
    }
  }

  dumpCrashLog() {
    console.error("\n--- Server crash log ---");
    this.crashLog.forEach((l) => console.error(l));
    console.error("--- End crash log ---\n");
  }

  stop() {
    this.isShuttingDown = true;
    this._stopMemoryMonitor();
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
