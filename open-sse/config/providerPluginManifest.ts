import type { RegistryEntry, RegistryModel } from "./providers/shared.ts";

export type ProviderPluginCapability =
  | "apikey"
  | "custom-executor"
  | "oauth"
  | "passthrough-models"
  | "responses"
  | "sidecar-candidate";

export interface ProviderPluginModel {
  id: string;
  name: string;
  contextLength?: number;
  maxOutputTokens?: number;
  toolCalling?: boolean;
  supportsReasoning?: boolean;
  supportsVision?: boolean;
  unsupportedParams?: readonly string[];
  targetFormat?: string;
}

export interface ProviderPluginManifestEntry {
  id: string;
  alias?: string;
  format: string;
  executor: string;
  auth: {
    type: string;
    header: string;
    prefix?: string;
  };
  endpoints: {
    baseUrl?: string;
    baseUrls?: string[];
    responsesBaseUrl?: string;
    chatPath?: string;
    modelsUrl?: string;
  };
  capabilities: ProviderPluginCapability[];
  passthroughModels: boolean;
  defaultContextLength?: number;
  timeoutMs?: number;
  models: ProviderPluginModel[];
  sidecar: {
    eligible: boolean;
    reasons: string[];
  };
}

export interface ProviderPluginManifest {
  schemaVersion: 1;
  generatedFrom: "open-sse/config/providers";
  providers: ProviderPluginManifestEntry[];
}

const SIDECAR_COMPATIBLE_EXECUTORS = new Set(["default"]);

function compactObject<T extends Record<string, unknown>>(value: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => entryValue !== undefined),
  ) as Partial<T>;
}

function mapModel(model: RegistryModel): ProviderPluginModel {
  return compactObject({
    id: model.id,
    name: model.name,
    contextLength: model.contextLength,
    maxOutputTokens: model.maxOutputTokens,
    toolCalling: model.toolCalling,
    supportsReasoning: model.supportsReasoning,
    supportsVision: model.supportsVision,
    unsupportedParams: model.unsupportedParams,
    targetFormat: model.targetFormat,
  }) as ProviderPluginModel;
}

function sidecarEligibility(entry: RegistryEntry): { eligible: boolean; reasons: string[] } {
  const reasons: string[] = [];

  if (!SIDECAR_COMPATIBLE_EXECUTORS.has(entry.executor)) {
    reasons.push(`custom executor: ${entry.executor}`);
  }
  if (entry.authType !== "apikey" && entry.authType !== "optional" && entry.authType !== "none") {
    reasons.push(`auth type requires TS handling: ${entry.authType}`);
  }
  if (!entry.baseUrl && !entry.baseUrls?.length && !entry.responsesBaseUrl) {
    reasons.push("no static upstream endpoint");
  }
  if (typeof entry.urlBuilder === "function") {
    reasons.push("dynamic URL builder");
  }
  if (entry.oauth) {
    reasons.push("oauth metadata");
  }
  if (entry.poolConfig) {
    reasons.push("session pool config");
  }

  return {
    eligible: reasons.length === 0,
    reasons,
  };
}

function capabilitiesFor(entry: RegistryEntry, eligible: boolean): ProviderPluginCapability[] {
  const capabilities = new Set<ProviderPluginCapability>();

  if (entry.authType === "apikey" || entry.authType === "optional") {
    capabilities.add("apikey");
  }
  if (entry.authType === "oauth" || entry.oauth) {
    capabilities.add("oauth");
  }
  if (entry.responsesBaseUrl) {
    capabilities.add("responses");
  }
  if (entry.passthroughModels) {
    capabilities.add("passthrough-models");
  }
  if (entry.executor !== "default") {
    capabilities.add("custom-executor");
  }
  if (eligible) {
    capabilities.add("sidecar-candidate");
  }

  return [...capabilities].sort();
}

export function createProviderPluginManifestEntry(
  entry: RegistryEntry,
): ProviderPluginManifestEntry {
  const sidecar = sidecarEligibility(entry);

  return {
    id: entry.id,
    ...(entry.alias ? { alias: entry.alias } : {}),
    format: entry.format,
    executor: entry.executor,
    auth: compactObject({
      type: entry.authType,
      header: entry.authHeader,
      prefix: entry.authPrefix,
    }) as ProviderPluginManifestEntry["auth"],
    endpoints: compactObject({
      baseUrl: entry.baseUrl,
      baseUrls: entry.baseUrls,
      responsesBaseUrl: entry.responsesBaseUrl,
      chatPath: entry.chatPath,
      modelsUrl: entry.modelsUrl,
    }) as ProviderPluginManifestEntry["endpoints"],
    capabilities: capabilitiesFor(entry, sidecar.eligible),
    passthroughModels: entry.passthroughModels === true,
    ...(typeof entry.defaultContextLength === "number"
      ? { defaultContextLength: entry.defaultContextLength }
      : {}),
    ...(typeof entry.timeoutMs === "number" ? { timeoutMs: entry.timeoutMs } : {}),
    models: (entry.models ?? []).map(mapModel),
    sidecar,
  };
}

export function generateProviderPluginManifestFromRegistry(
  registry: Record<string, RegistryEntry>,
): ProviderPluginManifest {
  return {
    schemaVersion: 1,
    generatedFrom: "open-sse/config/providers",
    providers: Object.values(registry)
      .map(createProviderPluginManifestEntry)
      .sort((a, b) => a.id.localeCompare(b.id)),
  };
}

export function getProviderPluginManifestEntryFromRegistry(
  registry: Record<string, RegistryEntry>,
  provider: string,
): ProviderPluginManifestEntry | null {
  const entry =
    registry[provider] ||
    Object.values(registry).find((candidate) => candidate.alias === provider);

  return entry ? createProviderPluginManifestEntry(entry) : null;
}
