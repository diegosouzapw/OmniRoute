/** Shared types for the embedded-services layer (ServiceSupervisor, installers, registry). */

export interface ServiceConfig {
  tool: string;
  port: number;
  spawnArgs: () => {
    command: string;
    args: string[];
    env: NodeJS.ProcessEnv;
    cwd: string;
  };
  healthUrl: () => string;
  healthIntervalMs: number;
  stopTimeoutMs: number;
  logsBufferBytes: number;
  /**
   * When true (#6205), the supervisor probes the port + health endpoint before
   * spawning: a healthy prior instance is adopted, a held-but-unhealthy port
   * yields a clear error instead of a raw EADDRINUSE stack. Opt-in so the
   * default spawn path (and existing supervisor tests) stays byte-identical —
   * enabled for services that bind a fixed port (e.g. 9router).
   */
  probeBeforeSpawn?: boolean;
}

export type ServiceState =
  | "not_installed"
  | "stopped"
  | "starting"
  | "running"
  | "stopping"
  | "error";

export type HealthState = "healthy" | "unhealthy" | "unknown";

export interface ServiceStatus {
  tool: string;
  state: ServiceState;
  pid: number | null;
  port: number;
  health: HealthState;
  startedAt: string | null;
  lastError: string | null;
}

export interface LogLine {
  ts: number;
  stream: "stdout" | "stderr";
  line: string;
}
