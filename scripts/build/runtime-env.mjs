import { spawn } from "node:child_process";

export function parsePort(value, fallback) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 65535 ? parsed : fallback;
}

/**
 * Resolve the V8 heap ceiling (MB) for the server process from
 * `OMNIROUTE_MEMORY_MB`, mirroring `omniroute serve`. Clamped to [64, 16384];
 * invalid/unset → fallback (512). The standalone launcher uses this so
 * OMNIROUTE_MEMORY_MB can override the Docker image's NODE_OPTIONS fallback
 * without clobbering any other runtime flags (#2939).
 * @param {string | number | undefined | null} value
 * @param {number} [fallback]
 */
export function resolveMaxOldSpaceMb(value, fallback = 512) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed >= 64 && parsed <= 16384 ? parsed : fallback;
}

/**
 * Derive a sane DEFAULT V8 heap ceiling (MB) from the host's physical RAM, used
 * when `OMNIROUTE_MEMORY_MB` is unset. A fixed 512MB default crashed boxes with
 * plenty of RAM under load (65 providers / 2600 models → "Ineffective
 * mark-compacts near heap limit ~500MB"); see #5172 / #5160 / #5152. Targets
 * ~35% of total RAM, clamped to [512, 4096]. Invalid/zero totalmem → 512.
 * Pass the result as the `fallback` of {@link resolveMaxOldSpaceMb} so an
 * explicit OMNIROUTE_MEMORY_MB override always wins.
 * @param {number | undefined | null} totalmemBytes — typically `os.totalmem()`
 */
export function calibrateHeapFallbackMb(totalmemBytes) {
  const totalMb = Number(totalmemBytes) / (1024 * 1024);
  if (!Number.isFinite(totalMb) || totalMb <= 0) return 512;
  const target = Math.floor(totalMb * 0.35);
  return Math.min(4096, Math.max(512, target));
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
