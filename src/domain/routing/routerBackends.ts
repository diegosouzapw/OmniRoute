export type RouterBackendId = "ts" | "bifrost" | "cliproxy" | "9router" | "vibeproxy";

export type RouterBackendLifecycle = "in-process" | "external" | "supervised" | "disabled";

export type RouterBackendCapability =
  | "chat"
  | "responses"
  | "streaming"
  | "tools"
  | "vision"
  | "oauth-backed"
  | "dashboard-embed"
  | "model-sync"
  | "native-hot-path";

export interface RouterBackendHealthConfig {
  path?: string;
  envBaseUrl?: string;
}

export interface RouterBackendTelemetryConfig {
  ttft: boolean;
  tokensPerSecond: boolean;
  e2eLatency: boolean;
  failureRate: boolean;
  upstreamStatus: boolean;
  fallbackReason: boolean;
}

export interface RouterBackendDefinition {
  id: RouterBackendId;
  displayName: string;
  lifecycle: RouterBackendLifecycle;
  capabilities: readonly RouterBackendCapability[];
  defaultPort?: number;
  serviceName?: string;
  envBaseUrl?: string;
  health: RouterBackendHealthConfig;
  telemetry: RouterBackendTelemetryConfig;
}

const FULL_TELEMETRY: RouterBackendTelemetryConfig = {
  ttft: true,
  tokensPerSecond: true,
  e2eLatency: true,
  failureRate: true,
  upstreamStatus: true,
  fallbackReason: true,
};

const BASIC_TELEMETRY: RouterBackendTelemetryConfig = {
  ttft: false,
  tokensPerSecond: false,
  e2eLatency: true,
  failureRate: true,
  upstreamStatus: true,
  fallbackReason: true,
};

export const ROUTER_BACKENDS: readonly RouterBackendDefinition[] = [
  {
    id: "ts",
    displayName: "OmniRoute TypeScript",
    lifecycle: "in-process",
    capabilities: ["chat", "responses", "streaming", "tools", "vision"],
    health: {},
    telemetry: BASIC_TELEMETRY,
  },
  {
    id: "bifrost",
    displayName: "Bifrost",
    lifecycle: "external",
    capabilities: ["chat", "streaming", "native-hot-path"],
    envBaseUrl: "BIFROST_BASE_URL",
    health: { envBaseUrl: "BIFROST_BASE_URL", path: "/health" },
    telemetry: FULL_TELEMETRY,
  },
  {
    id: "cliproxy",
    displayName: "CLIProxyAPI",
    lifecycle: "supervised",
    capabilities: ["chat", "responses", "streaming", "tools", "oauth-backed", "model-sync"],
    defaultPort: 8317,
    serviceName: "cliproxy",
    health: { path: "/v1/models" },
    telemetry: FULL_TELEMETRY,
  },
  {
    id: "9router",
    displayName: "9Router",
    lifecycle: "supervised",
    capabilities: ["chat", "streaming", "dashboard-embed", "model-sync"],
    defaultPort: 20130,
    serviceName: "9router",
    health: { path: "/api/health" },
    telemetry: FULL_TELEMETRY,
  },
  {
    id: "vibeproxy",
    displayName: "VibeProxy-compatible",
    lifecycle: "external",
    capabilities: ["chat", "streaming", "oauth-backed"],
    envBaseUrl: "VIBEPROXY_BASE_URL",
    health: { envBaseUrl: "VIBEPROXY_BASE_URL", path: "/v1/models" },
    telemetry: BASIC_TELEMETRY,
  },
] as const;

const BACKENDS_BY_ID = new Map(ROUTER_BACKENDS.map((backend) => [backend.id, backend]));

export function getRouterBackend(id: string): RouterBackendDefinition | null {
  return BACKENDS_BY_ID.get(id as RouterBackendId) ?? null;
}

export function listRouterBackends(): readonly RouterBackendDefinition[] {
  return ROUTER_BACKENDS;
}

export function backendHasCapability(
  backend: RouterBackendDefinition,
  capability: RouterBackendCapability
): boolean {
  return backend.capabilities.includes(capability);
}

export function listRouterBackendsByCapability(
  capability: RouterBackendCapability
): RouterBackendDefinition[] {
  return ROUTER_BACKENDS.filter((backend) => backendHasCapability(backend, capability));
}

