/**
 * Shared helpers for /api/services/dario/* route handlers.
 * Creates a supervisor on demand if bootstrap hasn't registered one yet.
 *
 * Dario needs its DARIO_ADMIN_TOKEN (reuses getOrCreateApiKey, same mechanism
 * 9router/mux use) so the spawned proxy mounts its /admin/* control plane —
 * hence getOrInitSupervisor() is async (it resolves the key before building
 * the spawn factory).
 */

import { getSupervisor, registerSupervisor } from "@/lib/services/registry";
import { ServiceSupervisor } from "@/lib/services/ServiceSupervisor";
import { resolveSpawnArgs, DARIO_DEFAULT_PORT } from "@/lib/services/installers/dario";
import { getOrCreateApiKey } from "@/lib/services/apiKey";

const TOOL = "dario";
const PORT = parseInt(process.env.DARIO_PORT ?? String(DARIO_DEFAULT_PORT), 10);

export async function getOrInitSupervisor(): Promise<ServiceSupervisor> {
  const existing = getSupervisor(TOOL);
  if (existing) return existing;

  const apiKey = await getOrCreateApiKey(TOOL).catch(() => "placeholder");

  const sup = new ServiceSupervisor({
    tool: TOOL,
    port: PORT,
    spawnArgs: () => resolveSpawnArgs(apiKey, PORT),
    healthUrl: () => `http://127.0.0.1:${PORT}/health`,
    healthIntervalMs: 5_000,
    stopTimeoutMs: 15_000,
    logsBufferBytes: 5_242_880,
    // #6205: embedded services bind a fixed port — probe before spawning so
    // an orphaned prior instance yields adopt/clear-error instead of a raw
    // EADDRINUSE crash. Mirrors bootstrap.ts's own supervisor construction;
    // without this, on-demand creation here (e.g. from the admin import
    // route's forced restart) can't tell "already healthy" apart from
    // "actually crashed" and misreports both as a crash.
    probeBeforeSpawn: true,
  });

  registerSupervisor(sup);
  return sup;
}
