import { getCodexRequestDefaults } from "../../src/lib/providers/requestDefaults.ts";
import { getProviderConnections } from "../../src/lib/db/providers.ts";
import { AI_PROVIDERS, NOAUTH_PROVIDERS } from "../../src/shared/constants/providers.ts";

type JsonRecord = Record<string, unknown>;
type McpCatalogStatus = "available" | "degraded" | "unavailable";

type McpCatalogResponse = {
  models: Array<{
    id: string;
    provider: string;
    capabilities: string[];
    status: McpCatalogStatus;
    thinkingEffort?: string;
    pricing?: unknown;
  }>;
  source: string;
  warning?: string;
};

type ProviderConnectionLike = {
  id?: string;
  provider?: string;
  isActive?: boolean;
  providerSpecificData?: unknown;
};

type McpCatalogRequestSpec = {
  provider: string;
  path: string;
  thinkingEffort?: string;
};

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function toStringArray(value: unknown, fallback: string[] = []): string[] {
  return Array.isArray(value) ? value.map((item) => String(item)) : fallback;
}

function buildProviderAliasMap(): Record<string, string> {
  const aliasMap: Record<string, string> = {};

  for (const provider of Object.values(AI_PROVIDERS)) {
    if (!provider?.id) continue;
    aliasMap[provider.id] = provider.id;
    if (typeof provider.alias === "string" && provider.alias.length > 0) {
      aliasMap[provider.alias] = provider.id;
    }
  }

  for (const provider of Object.values(NOAUTH_PROVIDERS)) {
    if (!provider?.id) continue;
    aliasMap[provider.id] = provider.id;
    if ("alias" in provider && typeof provider.alias === "string" && provider.alias.length > 0) {
      aliasMap[provider.alias] = provider.id;
    }
  }

  return aliasMap;
}

function normalizeCapability(value: string): string {
  switch (value) {
    case "embeddings":
      return "embedding";
    case "images":
      return "image";
    case "videos":
      return "video";
    case "moderations":
      return "moderation";
    case "chat-completions":
      return "chat";
    default:
      return value;
  }
}

function getCatalogModelCapabilities(model: JsonRecord): string[] {
  if (Array.isArray(model.capabilities) && model.capabilities.length > 0) {
    return toStringArray(model.capabilities, ["chat"]).map(normalizeCapability);
  }

  if (Array.isArray(model.supportedEndpoints) && model.supportedEndpoints.length > 0) {
    return toStringArray(model.supportedEndpoints, ["chat"]).map(normalizeCapability);
  }

  const type = toString(model.type);
  if (type) return [normalizeCapability(type)];

  return ["chat"];
}

function normalizeCatalogStatus(
  model: JsonRecord,
  source: string,
  warning?: string
): McpCatalogStatus {
  const explicitStatus = toString(model.status);
  if (
    explicitStatus === "available" ||
    explicitStatus === "degraded" ||
    explicitStatus === "unavailable"
  ) {
    return explicitStatus;
  }

  if (warning || source === "local_catalog") return "degraded";
  return "available";
}

function getConnectionThinkingEffort(connection: ProviderConnectionLike): string | undefined {
  const provider = typeof connection.provider === "string" ? connection.provider : null;
  const providerSpecificData = toRecord(connection.providerSpecificData);

  if (provider === "codex") {
    return getCodexRequestDefaults(providerSpecificData).reasoningEffort || "medium";
  }

  const rawThinkingEffort = toString(providerSpecificData.thinkingEffort);
  return rawThinkingEffort || undefined;
}

function normalizeProviderModelRecord(
  rawModel: unknown,
  fallbackProvider: string,
  source: string,
  warning?: string,
  thinkingEffort?: string
) {
  const model = toRecord(rawModel);
  const id = toString(model.id, "");

  return {
    id,
    provider: toString(model.owned_by, toString(model.provider, fallbackProvider)),
    capabilities: getCatalogModelCapabilities(model),
    status: normalizeCatalogStatus(model, source, warning),
    ...(thinkingEffort ? { thinkingEffort } : {}),
    pricing: model.pricing,
  };
}

function activeProviderConnections(
  connections: ProviderConnectionLike[],
  normalizeProviderId: (value: string) => string,
  requestedProvider: string | null
): ProviderConnectionLike[] {
  return connections.filter((connection) => {
    const provider =
      typeof connection?.provider === "string" ? normalizeProviderId(connection.provider) : null;
    return !!provider && !!connection?.id && connection.isActive !== false &&
      (!requestedProvider || provider === requestedProvider);
  });
}

function providerModelRequestSpecs(
  connections: ProviderConnectionLike[],
  normalizeProviderId: (value: string) => string
): McpCatalogRequestSpec[] {
  return connections.map((connection) => ({
    provider: normalizeProviderId(String(connection.provider)),
    path: `/api/providers/${encodeURIComponent(String(connection.id))}/models?excludeHidden=true`,
    thinkingEffort: getConnectionThinkingEffort(connection),
  }));
}

function noAuthProviderSpec(requestedProvider: string): McpCatalogRequestSpec {
  return {
    provider: requestedProvider,
    path: `/api/v1/providers/${encodeURIComponent(requestedProvider)}/models`,
    thinkingEffort: undefined,
  };
}

function emptyCatalogForProvider(requestedProvider: string): McpCatalogResponse {
  return {
    models: [],
    source: "provider_connections",
    warning: `No active connections found for provider '${requestedProvider}'.`,
  };
}

function rawModelsFromCatalog(raw: JsonRecord): unknown[] {
  if (Array.isArray(raw.models)) return raw.models;
  if (Array.isArray(raw.data)) return raw.data;
  return [];
}

function maybeCatalogModel(
  rawModel: unknown,
  spec: McpCatalogRequestSpec,
  source: string,
  warning: string | undefined,
  requestedCapability: string | null
): McpCatalogResponse["models"][number] | null {
  const normalized = normalizeProviderModelRecord(rawModel, spec.provider, source, warning);
  if (spec.thinkingEffort && !normalized.thinkingEffort) normalized.thinkingEffort = spec.thinkingEffort;
  if (!normalized.id) return null;
  if (requestedCapability && !normalized.capabilities.includes(requestedCapability)) return null;
  return normalized;
}

function addCatalogModels(
  raw: JsonRecord,
  spec: McpCatalogRequestSpec,
  source: string,
  warning: string | undefined,
  requestedCapability: string | null,
  collectedModels: Map<string, McpCatalogResponse["models"][number]>
) {
  for (const rawModel of rawModelsFromCatalog(raw)) {
    const normalized = maybeCatalogModel(rawModel, spec, source, warning, requestedCapability);
    if (normalized) collectedModels.set(`${normalized.provider}:${normalized.id}`, normalized);
  }
}

async function collectCatalogModels(
  requestSpecs: McpCatalogRequestSpec[],
  fetchJson: (path: string) => Promise<unknown>,
  requestedCapability: string | null
) {
  const collectedModels = new Map<string, McpCatalogResponse["models"][number]>();
  const warnings = new Set<string>();
  const sources = new Set<string>();

  for (const spec of requestSpecs) {
    const raw = toRecord(await fetchJson(spec.path));
    const source = toString(raw.source, spec.path.startsWith("/api/providers/") ? "api" : "v1_catalog");
    const warning = raw.warning ? String(raw.warning) : undefined;
    if (warning) warnings.add(warning);
    sources.add(source);
    addCatalogModels(raw, spec, source, warning, requestedCapability, collectedModels);
  }

  return { collectedModels, warnings, sources };
}

export async function getMcpModelsCatalog(
  args: { provider?: string; capability?: string },
  deps: {
    fetchJson?: (path: string) => Promise<unknown>;
    listProviderConnections?: () => Promise<ProviderConnectionLike[]>;
  } = {}
): Promise<McpCatalogResponse> {
  const fetchJson = deps.fetchJson ?? ((path: string) => import("./server.ts").then((m) => m.omniRouteFetch(path)));
  const listProviderConnections = deps.listProviderConnections ?? getProviderConnections;
  const aliasMap = buildProviderAliasMap();
  const normalizeProviderId = (value: string) => aliasMap[value] || value;
  const requestedProvider = args.provider ? normalizeProviderId(args.provider) : null;
  const requestedCapability = args.capability ? normalizeCapability(args.capability) : null;

  let connections = await listProviderConnections();
  connections = Array.isArray(connections) ? connections : [];
  const activeConnections = activeProviderConnections(
    connections,
    normalizeProviderId,
    requestedProvider
  );
  const requestSpecs = providerModelRequestSpecs(activeConnections, normalizeProviderId);

  if (requestedProvider && requestSpecs.length === 0) {
    const isNoAuthProvider = Object.values(NOAUTH_PROVIDERS).some(
      (provider) => provider.id === requestedProvider
    );
    if (isNoAuthProvider) {
      requestSpecs.push(noAuthProviderSpec(requestedProvider));
    } else {
      return emptyCatalogForProvider(requestedProvider);
    }
  }

  const { collectedModels, warnings, sources } = await collectCatalogModels(
    requestSpecs,
    fetchJson,
    requestedCapability
  );

  return {
    models: [...collectedModels.values()],
    source: sources.size === 1 ? [...sources][0] : "aggregated_provider_models",
    ...(warnings.size > 0 ? { warning: [...warnings].join(" | ") } : {}),
  };
}
