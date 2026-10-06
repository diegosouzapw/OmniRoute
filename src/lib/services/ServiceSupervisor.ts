/** Generic supervisor for embedded services (9router, CLIProxyAPI, future). */

import { EventEmitter } from "node:events";
import { spawn } from "node:child_process";
import type { ChildProcess } from "node:child_process";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { getServiceRow, updateServiceField, setToolStatus } from "@/lib/db/versionManager";
import { RingBuffer } from "./ringBuffer";
import { HealthChecker } from "./healthCheck";
import {
  decidePreSpawn,
  isAdoptExistingEnabled,
  probeBeforeSpawn,
  resolvePortPid,
} from "./portProbe";
import type { ServiceConfig, ServiceState, ServiceStatus, LogLine, HealthState } from "./types";

const CRASH_FAST_THRESHOLD_MS = 5_000;

/**
 * Builds the `spawn()` options for a supervised service child process.
 * `windowsHide: true` suppresses the transient conhost.exe/cmd console
 * window Windows briefly flashes open for spawned child processes (#8131).
 * Exported (rather than inlined) so a unit test can assert on it directly
 * instead of mocking `node:child_process`.
 */
export function buildServiceSpawnOptions(
  env: NodeJS.ProcessEnv | undefined,
  cwd: string | undefined
): {
  env: NodeJS.ProcessEnv | undefined;
  cwd: string | undefined;
  detached: boolean;
  stdio: ["ignore", "pipe", "pipe"];
  windowsHide: boolean;
} {
  return {
    env,
    cwd,
    detached: false,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  };
}

export class ServiceSupervisor extends EventEmitter {
  private state: ServiceState = "stopped";
  private health: HealthState = "unknown";
  private pid: number | null = null;
  private startedAt: string | null = null;
  private lastError: string | null = null;
  private childProcess: ChildProcess | null = null;
  private adopted: boolean = false;
  private spawnFailed: boolean = false;
  private readonly buffer: RingBuffer;
  private readonly checker: HealthChecker;
  private operationLock: Promise<void> = Promise.resolve();

  constructor(private readonly config: ServiceConfig) {
    super();
    this.buffer = new RingBuffer(config.logsBufferBytes);
    this.checker = new HealthChecker(config.healthUrl, config.healthIntervalMs, (h) => {
      this.health = h;
      this.emit("stateChange", this.getStatus());
      // A service that fails FAILURE_THRESHOLD consecutive health probes will
      // not recover by itself. Stop the poller and surface an explicit error
      // state instead of probing the dead port forever — every failed probe
      // fires a full ProxyFetch dispatcher+native fetch pair (e.g. against a
      // CLIProxyAPI binary that cannot execute on this platform).
      if (h === "unhealthy" && (this.state === "running" || this.state === "starting")) {
        this.checker.stop();
        this.lastError = sanitizeErrorMessage(
          `Health probe failed for ${this.config.tool} (port ${this.config.port})`
        );
        this.setState("error");
        void setToolStatus(this.config.tool, "error", undefined, this.lastError);
      }
    });
  }

  getRingBuffer(): RingBuffer {
    return this.buffer;
  }

  getStatus(): ServiceStatus {
    return {
      tool: this.config.tool,
      state: this.state,
      pid: this.pid,
      port: this.config.port,
      health: this.health,
      startedAt: this.startedAt,
      lastError: this.lastError,
      adopted: this.adopted,
    };
  }

  async start(): Promise<ServiceStatus> {
    return this.withLock(async () => {
      if (this.state === "running" || this.state === "starting") {
        return this.getStatus();
      }

      const row = await getServiceRow(this.config.tool);
      if (row && row.logsBufferPath) {
        this.buffer.setFlushPath(row.logsBufferPath);
      }

      this.setState("starting");
      this.lastError = null;
      this.adopted = false;

      // Pre-spawn probe (#6205): avoid a raw EADDRINUSE crash when a prior
      // instance is still holding the port. A healthy instance is adopted; a
      // held-but-unhealthy port surfaces a clear error instead of a stack.
      // Opt-in per ServiceConfig so the default spawn path is unchanged.
      if (this.config.probeBeforeSpawn) {
        const probe = await probeBeforeSpawn(this.config.healthUrl(), this.config.port);
        const decision = decidePreSpawn(probe, this.config.port, isAdoptExistingEnabled());

        if (decision.action === "adopt") {
          // Something healthy already serves this port. We didn't spawn it,
          // so there's no ChildProcess handle to read a pid from — resolve
          // one from the OS instead. Best-effort: if resolution fails, pid
          // stays null rather than blocking adoption, but downstream
          // liveness checks that key off pid will only trust this instance
          // once a real pid is on record.
          const adoptedPid = await resolvePortPid(this.config.port);

          // Auto-restart-adopted (opt-in, default off): instead of keeping
          // the unsupervised process, kill it and fall through to a real
          // spawn below so this supervisor actually owns the child and can
          // capture its stdout/stderr for the Logs panel. An adopted process
          // otherwise stays log-silent for its entire lifetime — adoption
          // never attaches a pipe because there's nothing to pipe from.
          if (row?.autoRestartAdopted && adoptedPid) {
            await this.killAdoptedPid(adoptedPid, this.config.stopTimeoutMs);
          } else {
            this.checker.start();
            this.startedAt = new Date().toISOString();
            this.pid = adoptedPid;
            this.adopted = true;
            this.setState("running");
            await setToolStatus(this.config.tool, "running", adoptedPid ?? undefined);
            return this.getStatus();
          }
        } else if (decision.action === "error") {
          this.lastError = sanitizeErrorMessage(decision.message);
          this.setState("error");
          await setToolStatus(this.config.tool, "error", undefined, this.lastError);
          return this.getStatus();
        }
      }

      const { command, args, env, cwd } = this.config.spawnArgs();

      // spawn() can throw SYNCHRONOUSLY on Windows when the binary is not
      // executable (EFTYPE/EINVAL for an ELF or a plain text file) instead of
      // emitting the child 'error' event. Handle both paths identically so a
      // non-spawnable service surfaces an explicit error state and the health
      // poller is stopped instead of hammering a dead port forever.
      let child: ChildProcess;
      try {
        child = spawn(command, args, buildServiceSpawnOptions(env, cwd));
      } catch (err) {
        this.checker.stop();
        this.spawnFailed = true;
        const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
        this.lastError = msg;
        this.setState("error");
        await setToolStatus(this.config.tool, "error", undefined, msg);
        return this.getStatus();
      }

      this.childProcess = child;
      this.pid = child.pid ?? null;

      if (this.pid) {
        await setToolStatus(this.config.tool, "starting", this.pid);
      }

      const processLine = (stream: "stdout" | "stderr", raw: Buffer) => {
        const lines = raw.toString("utf8").split("\n");
        for (const line of lines) {
          if (!line.trim()) continue;
          const logLine: LogLine = { ts: Date.now(), stream, line };
          this.buffer.push(logLine);
          this.emit("log", logLine);
        }
      };

      child.stdout?.on("data", (chunk: Buffer) => processLine("stdout", chunk));
      child.stderr?.on("data", (chunk: Buffer) => processLine("stderr", chunk));

      const spawnTime = Date.now();
      child.once("exit", (code, signal) => {
        void this.handleExit(code, signal, spawnTime);
      });
      // Spawn failures (ENOENT, EACCES, or a non-executable binary such as an
      // ELF on Windows) surface via the child 'error' event — NOT 'exit'.
      // Without this handler the supervisor stays in "starting" forever and
      // the health poller hammers the dead port every healthIntervalMs.
      child.once("error", (err) => {
        this.checker.stop();
        this.spawnFailed = true;
        const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
        this.lastError = msg;
        this.setState("error");
        void setToolStatus(this.config.tool, "error", undefined, msg);
      });

      this.startedAt = new Date().toISOString();
      this.checker.start();

      await this.waitForHealthy();

      // A spawn failure flips state to "error" — surface the explicit error
      // status instead of overriding it with "running".
      if (this.state === "error") {
        return this.getStatus();
      }

      this.setState("running");
      await setToolStatus(this.config.tool, "running", this.pid ?? undefined);

      return this.getStatus();
    });
  }

  async stop(): Promise<ServiceStatus> {
    return this.withLock(async () => {
      if (this.state === "stopped" || this.state === "stopping") {
        return this.getStatus();
      }

      this.setState("stopping");
      this.checker.stop();

      await this.killChild();

      this.pid = null;
      this.childProcess = null;
      this.startedAt = null;
      this.adopted = false;
      this.setState("stopped");
      await setToolStatus(this.config.tool, "stopped");

      return this.getStatus();
    });
  }

  async restart(): Promise<ServiceStatus> {
    await this.stop();
    return this.start();
  }

  private async withLock<T>(fn: () => Promise<T>): Promise<T> {
    let resolve!: () => void;
    const next = new Promise<void>((r) => (resolve = r));
    const current = this.operationLock;
    this.operationLock = current.then(() => next);

    await current;
    try {
      return await fn();
    } finally {
      resolve();
    }
  }

  private async waitForHealthy(): Promise<void> {
    const timeoutMs = this.config.healthIntervalMs * 3;
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
      if (this.checker.getHealth() === "healthy") return;
      // A spawn failure (child 'error' event or sync throw) flips state to
      // "error" — stop polling and let start() surface the explicit error
      // status as a resolve. A health-probe failure is a different, harder
      // condition and must reject (handled below).
      if (this.state === "error") {
        if (this.spawnFailed) return;
        throw new Error(this.lastError ?? "Service failed to start");
      }
      await new Promise((r) => setTimeout(r, 1_000));
    }
    // Timeout reached without a healthy probe. The health poller may have
    // flipped the state to "error" while we were waiting (FAILURE_THRESHOLD
    // consecutive failures) — surface that instead of a degraded marker.
    if (this.state === "error") {
      if (this.spawnFailed) return;
      throw new Error(this.lastError ?? "Service failed to start");
    }
    this.lastError = sanitizeErrorMessage(
      `Health probe did not succeed within ${timeoutMs}ms — service may still be initializing`
    );
    this.emit("healthDegraded", {
      tool: this.config.tool,
      timeoutMs,
      lastHealth: this.checker.getHealth(),
    });
  }

  private async killChild(): Promise<void> {
    const child = this.childProcess;
    if (!child || child.killed) return;

    child.kill("SIGTERM");

    await new Promise<void>((resolve) => {
      const timeout = setTimeout(() => {
        if (!child.killed) child.kill("SIGKILL");
        resolve();
      }, this.config.stopTimeoutMs);

      child.once("exit", () => {
        clearTimeout(timeout);
        resolve();
      });
    });
  }

  /**
   * Kill a process this supervisor did NOT spawn (no ChildProcess handle —
   * just a pid resolved from the OS during adoption). Used by the
   * auto-restart-adopted path: SIGTERM, poll for exit via the harmless
   * signal-0 existence probe, escalate to SIGKILL after `timeoutMs`. Mirrors
   * `killChild()`'s SIGTERM→SIGKILL escalation but without a `child.once("exit")`
   * event to await, since we don't own the process handle.
   */
  private async killAdoptedPid(pid: number, timeoutMs: number): Promise<void> {
    try {
      process.kill(pid, "SIGTERM");
    } catch {
      return; // already gone
    }

    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      try {
        process.kill(pid, 0); // signal 0: existence probe, throws once the process is gone
      } catch {
        return;
      }
      await new Promise((r) => setTimeout(r, 200));
    }

    try {
      process.kill(pid, "SIGKILL");
    } catch {
      // already gone
    }
  }

  private async handleExit(
    code: number | null,
    signal: NodeJS.Signals | null,
    spawnTime: number
  ): Promise<void> {
    this.checker.stop();
    this.pid = null;
    this.childProcess = null;

    if (this.state === "stopping" || this.state === "stopped") return;

    const fastCrash = Date.now() - spawnTime < CRASH_FAST_THRESHOLD_MS;
    const reason = signal ? `killed by signal ${signal}` : `exited with code ${code ?? "unknown"}`;
    const msg = fastCrash ? `Fast crash (${reason})` : reason;

    this.lastError = sanitizeErrorMessage(msg);
    this.setState("error");
    await setToolStatus(this.config.tool, "error", undefined, this.lastError);
  }

  private setState(state: ServiceState): void {
    this.state = state;
    this.emit("stateChange", this.getStatus());
  }
}
