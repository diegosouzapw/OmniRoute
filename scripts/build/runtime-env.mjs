import { spawn } from "node:child_process";

export function parsePort(value, fallback) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 65535 ? parsed : fallback;
}

/**
 * @param {NodeJS.ProcessEnv | Record<string, string | undefined>} [fromEnv]
 *        Defaults to process.env. Pass bootstrap `merged` so project `.env` PORT applies before spawn.
 */
export function resolveRuntimePorts(fromEnv = process.env) {
  const basePort = parsePort(fromEnv.PORT || "20128", 20128);
  const apiPort = parsePort(fromEnv.API_PORT || String(basePort), basePort);
  const dashboardPort = parsePort(fromEnv.DASHBOARD_PORT || String(basePort), basePort);

  return { basePort, apiPort, dashboardPort };
}

export function withRuntimePortEnv(env, runtimePorts) {
  const { basePort, apiPort, dashboardPort } = runtimePorts;

  return {
    ...env,
    OMNIROUTE_PORT: String(basePort),
    PORT: String(dashboardPort),
    DASHBOARD_PORT: String(dashboardPort),
    API_PORT: String(apiPort),
  };
}

export function sanitizeColorEnv(env = {}) {
  const sanitized = { ...env };

  // Node warns when both FORCE_COLOR and NO_COLOR are set.
  // Prefer NO_COLOR in test tooling to avoid noisy process warnings.
  if (typeof sanitized.FORCE_COLOR !== "undefined" && typeof sanitized.NO_COLOR !== "undefined") {
    delete sanitized.FORCE_COLOR;
  }

  return sanitized;
}

export function spawnWithForwardedSignals(command, args, options = {}) {
  const child = spawn(command, args, options);

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }
    process.exit(code ?? 0);
  });

  process.on("SIGINT", () => child.kill("SIGINT"));
  process.on("SIGTERM", () => child.kill("SIGTERM"));

  return child;
}
