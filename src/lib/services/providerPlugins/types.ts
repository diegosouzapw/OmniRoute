import type { ProviderPluginManifestEntry } from "@omniroute/open-sse/config/providerPluginManifest.ts";
import type { ServiceBackendPluginId } from "../serviceBackends";
import type { resolveSpawnArgs as resolveNinerouterSpawnArgs } from "../installers/ninerouter";

export type { ServiceBackendPluginId } from "../serviceBackends";

/** Manifest fields an embedded service backend contributes today, per `SERVICE_BACKEND_MANIFEST_TEMPLATE`. */
export type ServiceBackendManifestTemplateEntry = Pick<
  ProviderPluginManifestEntry,
  "format" | "executor" | "auth" | "endpoints" | "capabilities" | "passthroughModels" | "sidecar"
>;

/**
 * A pluggable provider-backend contract for embedded services (9router, cliproxyapi).
 *
 * Phase 1 (#7333): narrow, additive shape — packages what `bootstrap.ts`'s `SERVICES[]`
 * entries and `serviceBackends.ts`'s `SERVICE_BACKEND_MANIFEST_TEMPLATE` already express
 * about each backend today, across two previously-unrelated files. No new capability
 * surface is introduced.
 */
export interface ServiceProviderPlugin {
  /** Plugin id as consumed by `/v1/providers/[provider]/models` (e.g. "9router"). */
  pluginId: ServiceBackendPluginId;
  /** Internal service-supervisor tool name (e.g. "9router", "cliproxy"). */
  tool: "9router" | "cliproxy";
  port: {
    envVar: string;
    default: number;
  };
  healthPath: string;
  healthIntervalMs: number;
  stopTimeoutMs: number;
  logsBufferBytes: number;
  needsApiKey: boolean;
  spawnArgs: (apiKey: string, port: number) => ReturnType<typeof resolveNinerouterSpawnArgs>;
  manifestTemplate: ServiceBackendManifestTemplateEntry;
}
