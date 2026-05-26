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
