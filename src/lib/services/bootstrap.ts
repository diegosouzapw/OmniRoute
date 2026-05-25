import { getVersionManagerTool } from "@/lib/db/versionManager";
import { registerSupervisor, getSupervisor } from "./registry";
import { ServiceSupervisor } from "./ServiceSupervisor";
import { resolveSpawnArgs } from "./installers/ninerouter";
import { getOrCreateApiKey } from "./apiKey";
import { scheduleServiceModelSync, stopServiceModelSync } from "./modelSync";
import type { ServiceStatus } from "./types";

const SERVICES = [
  {
    tool: "9router",
    port: 20130,
    healthIntervalMs: 2_000,
    stopTimeoutMs: 15_000,
    logsBufferBytes: 5_242_880,
  },
] as const;

export async function bootstrapEmbeddedServices(): Promise<void> {
  for (const cfg of SERVICES) {
    if (getSupervisor(cfg.tool)) continue;

    const row = await getVersionManagerTool(cfg.tool);
    if (!row || row.status === "not_installed") continue;

    const apiKey = await getOrCreateApiKey(cfg.tool).catch(() => "placeholder");

    const supervisor = new ServiceSupervisor({
      tool: cfg.tool,
      port: cfg.port,
      spawnArgs: () => resolveSpawnArgs(apiKey, cfg.port),
      healthUrl: () => `http://127.0.0.1:${cfg.port}/api/health`,
      healthIntervalMs: cfg.healthIntervalMs,
      stopTimeoutMs: cfg.stopTimeoutMs,
      logsBufferBytes: cfg.logsBufferBytes,
    });

    registerSupervisor(supervisor);

    const baseUrl = `http://127.0.0.1:${cfg.port}`;
    supervisor.on("stateChange", (status: ServiceStatus) => {
      if (status.state === "running") {
        scheduleServiceModelSync(cfg.tool, baseUrl, apiKey);
      } else if (status.state === "stopped" || status.state === "error") {
        stopServiceModelSync(cfg.tool);
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
