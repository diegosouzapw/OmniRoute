import { getSupervisor } from "@/lib/services/registry";
import { getProviderPluginManifestEntryForModel } from "@omniroute/open-sse/config/providerPluginManifestRegistry.ts";

export type RelayRoutingBackend = "ts" | "bifrost" | "auto";

const VALID_BACKENDS = new Set<RelayRoutingBackend>(["ts", "bifrost", "auto"]);

export interface BifrostRoutingConfig {
  baseUrl: string;
  apiKey?: string;
  timeoutMs: number;
  streamingEnabled: boolean;
  enabled: boolean;
}

export interface SidecarEligibility {
  eligible: boolean;
  reasons: readonly string[];
}

export type ProviderSidecarLookup = (model: string | undefined) => SidecarEligibility | null;

export interface BifrostRoutingDecision {
  tryBifrost: boolean;
  fallbackReason?: string;
}

export interface ActiveBifrostCooldown {
  remainingMs: number;
  reason: string;
}

const cooldowns = new Map<string, { until: number; reason: string }>();

export function getBifrostFailureCooldownMs(env: NodeJS.ProcessEnv = process.env): number {
  const parsed = Number.parseInt(env.OMNIROUTE_BIFROST_FAILURE_COOLDOWN_MS || "", 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 5000;
}

export function getActiveBifrostCooldown(
  baseUrl: string,
  now = Date.now()
): ActiveBifrostCooldown | null {
  const entry = cooldowns.get(baseUrl);
  if (!entry) return null;
  if (entry.until <= now) {
    cooldowns.delete(baseUrl);
    return null;
  }

  return {
    remainingMs: entry.until - now,
    reason: entry.reason,
  };
}

export function recordBifrostFailure(
  baseUrl: string,
  reason: string,
  now = Date.now(),
  cooldownMs = getBifrostFailureCooldownMs()
): void {
  if (cooldownMs <= 0) {
    cooldowns.delete(baseUrl);
    return;
  }
  cooldowns.set(baseUrl, {
    until: now + cooldownMs,
    reason,
  });
}

export function clearBifrostFailure(baseUrl: string): void {
  cooldowns.delete(baseUrl);
}

export function resetBifrostCooldowns(): void {
  cooldowns.clear();
}

export function getBifrostRoutingConfig(
  env: NodeJS.ProcessEnv = process.env
): BifrostRoutingConfig | null {
  const baseUrl = env.BIFROST_BASE_URL?.replace(/\/$/, "");

  // If BIFROST_BASE_URL is unset, check if supervised instance is running
  let resolvedBaseUrl = baseUrl;
  if (!resolvedBaseUrl) {
    const sup = getSupervisor("bifrost");
    if (sup?.getStatus().state === "running") {
      resolvedBaseUrl = `http://127.0.0.1:${sup.getStatus().port}`;
    }
  }

  if (!resolvedBaseUrl) return null;

  const timeoutMs = Number.parseInt(env.BIFROST_TIMEOUT_MS || "", 10);

  return {
    baseUrl: resolvedBaseUrl,
    apiKey: env.BIFROST_API_KEY || env.OMNIROUTE_BIFROST_KEY || undefined,
    timeoutMs: Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : 30000,
    streamingEnabled: env.BIFROST_STREAMING_ENABLED !== "0",
    enabled: env.BIFROST_ENABLED !== "0",
  };
}

export function resolveRelayRoutingBackend(
  env: NodeJS.ProcessEnv = process.env
): RelayRoutingBackend {
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

export function shouldTryBifrostForRequest(
  backend: RelayRoutingBackend,
  config: BifrostRoutingConfig | null,
  body: unknown,
  lookupProviderSidecar: ProviderSidecarLookup = (m) =>
    getProviderPluginManifestEntryForModel(m)?.sidecar ?? null
): BifrostRoutingDecision {
  if (!shouldTryBifrost(backend, config)) {
    return { tryBifrost: false };
  }
  if (backend === "bifrost") {
    return { tryBifrost: true };
  }

  const model =
    typeof (body as { model?: unknown } | null)?.model === "string"
      ? (body as { model: string }).model
      : undefined;
  const provider = lookupProviderSidecar(model);
  if (provider?.eligible) {
    return { tryBifrost: true };
  }

  return {
    tryBifrost: false,
    fallbackReason: provider ? "bifrost-ineligible" : "bifrost-provider-unknown",
  };
}

export function getRoutingFallbackHeader(
  backend: RelayRoutingBackend,
  config: BifrostRoutingConfig | null
): "bifrost" | undefined {
  return backend === "auto" && config?.enabled ? "bifrost" : undefined;
}

export type RoutingFallbackReasonCode =
  "bifrost-cooldown" | "bifrost-error" | "bifrost-ineligible" | "bifrost-provider-unknown";

const ROUTING_FALLBACK_REASON_CODES = new Set<RoutingFallbackReasonCode>([
  "bifrost-cooldown",
  "bifrost-error",
  "bifrost-ineligible",
  "bifrost-provider-unknown",
]);

export function getRoutingFallbackReasonHeader(
  fallbackReason: string | null | undefined
): RoutingFallbackReasonCode | undefined {
  if (!fallbackReason) return undefined;
  const code = fallbackReason.split(";", 1)[0]?.trim();
  return code && ROUTING_FALLBACK_REASON_CODES.has(code as RoutingFallbackReasonCode)
    ? (code as RoutingFallbackReasonCode)
    : undefined;
}
