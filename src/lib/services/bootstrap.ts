import { getVersionManagerTool } from "@/lib/db/versionManager";
import { markAllUnavailable } from "@/lib/db/serviceModels";
import { registerSupervisor, getSupervisor } from "./registry";
import { ServiceSupervisor } from "./ServiceSupervisor";
import { resolveSpawnArgs as nineRouterSpawnArgs } from "./installers/ninerouter";
import {
  resolveSpawnArgs as cliproxySpawnArgs,
  CLIPROXY_DEFAULT_PORT,
} from "./installers/cliproxy";
import { resolveSpawnArgs as muxSpawnArgs, MUX_DEFAULT_PORT } from "./installers/mux";
import {
  resolveSpawnArgs as bifrostSpawnArgs,
  BIFROST_DEFAULT_PORT,
} from "./installers/bifrost";
import { resolveSpawnArgs as darioSpawnArgs, DARIO_DEFAULT_PORT } from "./installers/dario";
import { resolveSpawnArgs as openwaSpawnArgs, OPENWA_DEFAULT_PORT } from "./installers/openwa";
import { getOrCreateApiKey } from "./apiKey";
import { scheduleServiceModelSync, stopServiceModelSync } from "./modelSync";
import type { ServiceStatus } from "./types";
import { getServiceProviderPlugin } from "./providerPlugins/registry";

// 9router's port/health/lifecycle config is sourced from the plugin registry (#7333
// Phase 1) rather than an inline literal — the plugin object below must resolve to the
// exact same values the pre-migration literal expressed here.
const NINEROUTER_PLUGIN = getServiceProviderPlugin("9router");
if (!NINEROUTER_PLUGIN) {
  // Must never silently vanish from bootstrap — a missing plugin here means the
  // registry (src/lib/services/providerPlugins/registry.ts) regressed.
  throw new Error("[Services] Missing ServiceProviderPlugin registration for '9router'");
}
const NINEROUTER_PORT = parseInt(
  process.env[NINEROUTER_PLUGIN.port.envVar] ?? String(NINEROUTER_PLUGIN.port.default),
  10
);
const CLIPROXY_PORT = parseInt(process.env.CLIPROXYAPI_PORT ?? String(CLIPROXY_DEFAULT_PORT), 10);
const MUX_PORT = parseInt(process.env.MUX_SERVICE_PORT ?? String(MUX_DEFAULT_PORT), 10);
const BIFROST_PORT = parseInt(process.env.BIFROST_PORT ?? String(BIFROST_DEFAULT_PORT), 10);
const DARIO_PORT = parseInt(process.env.DARIO_PORT ?? String(DARIO_DEFAULT_PORT), 10);
const OPENWA_PORT = parseInt(process.env.OPENWA_SERVICE_PORT ?? String(OPENWA_DEFAULT_PORT), 10);

type ServiceEntry = {
  tool: string;
  port: number;
  healthPath: string;
  healthIntervalMs: number;
  stopTimeoutMs: number;
  logsBufferBytes: number;
  needsApiKey: boolean;
};

const SERVICES: ServiceEntry[] = [
  {
    tool: NINEROUTER_PLUGIN.tool,
    port: NINEROUTER_PORT,
    healthPath: NINEROUTER_PLUGIN.healthPath,
    healthIntervalMs: NINEROUTER_PLUGIN.healthIntervalMs,
    stopTimeoutMs: NINEROUTER_PLUGIN.stopTimeoutMs,
    logsBufferBytes: NINEROUTER_PLUGIN.logsBufferBytes,
    needsApiKey: NINEROUTER_PLUGIN.needsApiKey,
  },
  {
    tool: "cliproxy",
    port: CLIPROXY_PORT,
    healthPath: "/v1/models",
    healthIntervalMs: 5_000,
    stopTimeoutMs: 15_000,
    logsBufferBytes: 5_242_880,
    needsApiKey: true,
  },
  {
    tool: "mux",
    port: MUX_PORT,
    healthPath: "/health",
    healthIntervalMs: 5_000,
    stopTimeoutMs: 15_000,
    logsBufferBytes: 5_242_880,
    needsApiKey: true,
  },
  {
    tool: "bifrost",
    port: BIFROST_PORT,
    healthPath: "/v1/models",
    healthIntervalMs: 5_000,
    stopTimeoutMs: 15_000,
    logsBufferBytes: 5_242_880,
    needsApiKey: false,
  },
  {
    // Dario (@askalf/dario): Claude-subscription proxy, alternative/failover to
    // CLIProxyAPI for Claude-Code-shaped traffic. needsApiKey=true → the
    // generated key becomes DARIO_ADMIN_TOKEN (gates the /admin/* OAuth control
    // plane). /health is 503 "degraded" until the first Claude account is added,
    // which is the expected pre-OAuth state (waitForHealthy tolerates it).
    tool: "dario",
    port: DARIO_PORT,
    healthPath: "/health",
    healthIntervalMs: 5_000,
    stopTimeoutMs: 15_000,
    logsBufferBytes: 5_242_880,
    needsApiKey: true,
  },
  {
    // open-wa (@open-wa/wa-automate): WhatsApp Web automation via headless
    // Chromium. Lifecycle-managed only — like Mux, it is not an LLM proxy and
    // has no Layer 4 executor/provider entry. /api-docs/ (Swagger UI) is the
    // only documented "proof of life" route for this package version; it
    // only confirms the Express server answered, not that a WhatsApp session
    // is paired (pairing status is surfaced via the logs panel — see
    // installers/openwa.ts).
    //
    // Verified against the installed 4.76.0 source (dist/cli/index.js): the
    // HTTP server does not call `server.listen()` until AFTER the full
    // WhatsApp client handshake resolves — which, on first pairing, blocks on
    // a human scanning the QR code shown in the logs panel. Every health
    // probe before that point is a plain connection-refused, and
    // HealthChecker's FAILURE_THRESHOLD (3, src/lib/services/healthCheck.ts)
    // means the supervisor would otherwise declare "error" ~3×healthIntervalMs
    // after every legitimate start — including a normal, successful one.
    // healthIntervalMs is set high (vs. the 5s every other service uses) so
    // that grace period (3×healthIntervalMs, ServiceSupervisor.waitForHealthy)
    // is generous enough for a human to notice and scan the QR
    // (~3 minutes) instead of always racing to "error". This is a
    // ServiceSupervisor framework limitation (no separate "startup grace"
    // knob distinct from the steady-state poll interval) — a real fix
    // belongs in ServiceSupervisor/HealthChecker as a follow-up affecting
    // all 5 services, not scoped here.
    tool: "openwa",
    port: OPENWA_PORT,
    healthPath: "/api-docs/",
    healthIntervalMs: 60_000,
    stopTimeoutMs: 30_000,
    logsBufferBytes: 5_242_880,
    needsApiKey: true,
  },
];

function buildSpawnArgsFactory(
  cfg: ServiceEntry,
  apiKey: string
): () => ReturnType<typeof nineRouterSpawnArgs> {
  if (cfg.tool === "9router") {
    return () => nineRouterSpawnArgs(apiKey, cfg.port);
  }
  if (cfg.tool === "mux") {
    return () => muxSpawnArgs(apiKey, cfg.port);
  }
  if (cfg.tool === "bifrost") {
    return () => bifrostSpawnArgs(cfg.port);
  }
  if (cfg.tool === "dario") {
    return () => darioSpawnArgs(apiKey, cfg.port);
  }
  if (cfg.tool === "openwa") {
    return () => openwaSpawnArgs(apiKey, cfg.port);
  }
  return () => cliproxySpawnArgs(cfg.port, apiKey);
}

export async function bootstrapEmbeddedServices(): Promise<void> {
  for (const cfg of SERVICES) {
    if (getSupervisor(cfg.tool)) continue;

    const row = await getVersionManagerTool(cfg.tool);
    if (!row || row.status === "not_installed") continue;

    const apiKey = cfg.needsApiKey
      ? await getOrCreateApiKey(cfg.tool).catch(() => "placeholder")
      : "";

    const supervisor = new ServiceSupervisor({
      tool: cfg.tool,
      port: cfg.port,
      spawnArgs: buildSpawnArgsFactory(cfg, apiKey),
      healthUrl: () => `http://127.0.0.1:${cfg.port}${cfg.healthPath}`,
      healthIntervalMs: cfg.healthIntervalMs,
      stopTimeoutMs: cfg.stopTimeoutMs,
      logsBufferBytes: cfg.logsBufferBytes,
      // #6205: embedded services bind a fixed port — probe before spawning so
      // an orphaned prior instance yields adopt/clear-error instead of a raw
      // EADDRINUSE crash.
      probeBeforeSpawn: true,
    });

    registerSupervisor(supervisor);

    const baseUrl = `http://127.0.0.1:${cfg.port}`;
    supervisor.on("stateChange", (status: ServiceStatus) => {
      if (status.state === "running") {
        scheduleServiceModelSync(cfg.tool, baseUrl, apiKey);
      } else if (status.state === "stopped" || status.state === "error") {
        stopServiceModelSync(cfg.tool);
        markAllUnavailable(cfg.tool);
      }
    });

    if (row.autoStart) {
      supervisor.start().catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        console.warn(`[Services] Auto-start failed for ${cfg.tool}: ${msg}`);
      });
    }
  }
}
