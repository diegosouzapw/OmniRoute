import { resolveSpawnArgs as nineRouterSpawnArgs } from "../installers/ninerouter";
import { SERVICE_BACKEND_MANIFEST_TEMPLATE } from "../serviceBackends";
import type { ServiceProviderPlugin } from "./types";

const NINEROUTER_PORT_ENV_VAR = "NINEROUTER_PORT";
const NINEROUTER_DEFAULT_PORT = 20130;

/**
 * Registered `ServiceProviderPlugin`s, keyed by plugin id.
 *
 * Phase 1 (#7333) deliberately types this `Record<"9router", ...>` rather than
 * `Record<ServiceBackendPluginId, ...>` — narrower than the full union on purpose, so the
 * compiler forces every future backend migration (cliproxyapi, ...) to be an explicit,
 * reviewable addition to this object rather than a silent widening that could be missed.
 *
 * Values below are relocated verbatim from `src/lib/services/bootstrap.ts`'s inline
 * `SERVICES[]` entry and `serviceBackends.ts`'s `SERVICE_BACKEND_MANIFEST_TEMPLATE["9router"]`
 * — no value changes, pure consolidation into one shape.
 */
export const SERVICE_PROVIDER_PLUGINS: Record<"9router", ServiceProviderPlugin> = {
  "9router": {
    pluginId: "9router",
    tool: "9router",
    port: {
      envVar: NINEROUTER_PORT_ENV_VAR,
      default: NINEROUTER_DEFAULT_PORT,
    },
    healthPath: "/api/health",
    healthIntervalMs: 2_000,
    stopTimeoutMs: 15_000,
    logsBufferBytes: 5_242_880,
    needsApiKey: true,
    spawnArgs: nineRouterSpawnArgs,
    manifestTemplate: SERVICE_BACKEND_MANIFEST_TEMPLATE["9router"],
  },
};

export function getServiceProviderPlugin(tool: string): ServiceProviderPlugin | undefined {
  return SERVICE_PROVIDER_PLUGINS[tool as keyof typeof SERVICE_PROVIDER_PLUGINS];
}
