export type RelayRoutingBackend = "ts" | "bifrost" | "auto";

const VALID_BACKENDS = new Set<RelayRoutingBackend>(["ts", "bifrost", "auto"]);

export interface BifrostRoutingConfig {
  baseUrl: string;
  apiKey?: string;
  timeoutMs: number;
  streamingEnabled: boolean;
  enabled: boolean;
}

export function getBifrostRoutingConfig(env: NodeJS.ProcessEnv = process.env): BifrostRoutingConfig | null {
  const baseUrl = env.BIFROST_BASE_URL?.replace(/\/$/, "");
  if (!baseUrl) return null;
  const timeoutMs = Number.parseInt(env.BIFROST_TIMEOUT_MS || "", 10);

  return {
    baseUrl,
    apiKey: env.BIFROST_API_KEY || env.OMNIROUTE_BIFROST_KEY || undefined,
    timeoutMs: Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : 30000,
    streamingEnabled: env.BIFROST_STREAMING_ENABLED !== "0",
    enabled: env.BIFROST_ENABLED !== "0",
  };
}

export function resolveRelayRoutingBackend(env: NodeJS.ProcessEnv = process.env): RelayRoutingBackend {
  const configured = env.OMNIROUTE_RELAY_BACKEND || env.RELAY_ROUTING_BACKEND;
  if (configured && VALID_BACKENDS.has(configured as RelayRoutingBackend)) {
    return configured as RelayRoutingBackend;
  }

  return getBifrostRoutingConfig(env)?.enabled ? "auto" : "ts";
}

export function shouldTryBifrost(
  backend: RelayRoutingBackend,
  config: BifrostRoutingConfig | null
): config is BifrostRoutingConfig {
  return Boolean(config?.enabled && backend !== "ts");
}
