import { getVersionManagerTool } from "@/lib/db/versionManager";
import { markAllUnavailable } from "@/lib/db/serviceModels";
import { registerSupervisor, getSupervisor } from "./registry";
import { ServiceSupervisor } from "./ServiceSupervisor";
import { resolveSpawnArgs as nineRouterSpawnArgs } from "./installers/ninerouter";
import { resolveSpawnArgs as cliproxySpawnArgs } from "./installers/cliproxy";
import { getOrCreateApiKey } from "./apiKey";
import { scheduleServiceModelSync, stopServiceModelSync } from "./modelSync";
import { buildLoopbackUrl, getRouterBackendServiceMetadata } from "./routerBackendService";
import type { ServiceStatus } from "./types";

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
    ...getRouterBackendServiceMetadata("9router"),
    healthIntervalMs: 2_000,
    stopTimeoutMs: 15_000,
    logsBufferBytes: 5_242_880,
    needsApiKey: true,
  },
  {
    ...getRouterBackendServiceMetadata("cliproxy"),
    healthIntervalMs: 5_000,
    stopTimeoutMs: 15_000,
    logsBufferBytes: 5_242_880,
    needsApiKey: false,
  },
];

function buildSpawnArgsFactory(
  cfg: ServiceEntry,
  apiKey: string
): () => ReturnType<typeof nineRouterSpawnArgs> {
  if (cfg.tool === "9router") {
    return () => nineRouterSpawnArgs(apiKey, cfg.port);
  }
  return () => cliproxySpawnArgs(cfg.port);
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
      healthUrl: () => buildLoopbackUrl(cfg.port, cfg.healthPath),
      healthIntervalMs: cfg.healthIntervalMs,
      stopTimeoutMs: cfg.stopTimeoutMs,
      logsBufferBytes: cfg.logsBufferBytes,
    });

    registerSupervisor(supervisor);

    const baseUrl = buildLoopbackUrl(cfg.port);
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
