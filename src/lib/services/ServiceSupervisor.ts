/** Generic supervisor for embedded services (9router, CLIProxyAPI, future). */

import { EventEmitter } from "node:events";
import { spawn } from "node:child_process";
import type { ChildProcess } from "node:child_process";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { getServiceRow, updateServiceField, setToolStatus } from "@/lib/db/versionManager";
import { RingBuffer } from "./ringBuffer";
import { HealthChecker } from "./healthCheck";
import { decidePreSpawn, probeBeforeSpawn, resolvePortPid } from "./portProbe";
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
): { env: NodeJS.ProcessEnv | undefined; cwd: string | undefined; detached: boolean; stdio: ["ignore", "pipe", "pipe"]; windowsHide: boolean } {
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
  private readonly buffer: RingBuffer;
  private readonly checker: HealthChecker;
  private operationLock: Promise<void> = Promise.resolve();

  constructor(private readonly config: ServiceConfig) {
    super();
    this.buffer = new RingBuffer(config.logsBufferBytes);
    this.checker = new HealthChecker(config.healthUrl, config.healthIntervalMs, (h) => {
      this.health = h;
      this.emit("stateChange", this.getStatus());
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

      // Pre-spawn probe (#6205): avoid a raw EADDRINUSE crash when a prior
      // instance is still holding the port. A healthy instance is adopted; a
      // held-but-unhealthy port surfaces a clear error instead of a stack.
      // Opt-in per ServiceConfig so the default spawn path is unchanged.
      if (this.config.probeBeforeSpawn) {
        const probe = await probeBeforeSpawn(this.config.healthUrl(), this.config.port);
        const decision = decidePreSpawn(probe, this.config.port);

        if (decision.action === "adopt") {
          // Something healthy already serves this port — treat it as running
          // rather than spawning a duplicate that would die with EADDRINUSE.
          // We didn't spawn it, so there's no ChildProcess handle to read a
          // pid from — resolve one from the OS instead. Best-effort: if
          // resolution fails, pid stays null rather than blocking adoption,
          // but downstream liveness checks that key off pid will only trust
          // this instance once a real pid is on record.
          const adoptedPid = await resolvePortPid(this.config.port);
          this.checker.start();
          this.startedAt = new Date().toISOString();
          this.pid = adoptedPid;
          this.setState("running");
          await setToolStatus(this.config.tool, "running", adoptedPid ?? undefined);
          return this.getStatus();
        }

        if (decision.action === "error") {
          this.lastError = sanitizeErrorMessage(decision.message);
          this.setState("error");
          await setToolStatus(this.config.tool, "error", undefined, this.lastError);
          return this.getStatus();
        }
      }

      const { command, args, env, cwd } = this.config.spawnArgs();

      const child = spawn(command, args, buildServiceSpawnOptions(env, cwd));

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

      this.startedAt = new Date().toISOString();
      this.checker.start();

      await this.waitForHealthy();

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
      if (this.state === "error") throw new Error(this.lastError ?? "Service failed to start");
      await new Promise((r) => setTimeout(r, 1_000));
    }
    // Timeout reached without a healthy probe. Surface this so callers /
    // dashboards do not see "running" + "unknown" health silently. We do not
    // throw — the service may still be initializing — but we DO record a
    // degraded marker so /status returns it and operators can act.
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
