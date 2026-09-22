import { getCodexRequestDefaults } from "../../src/lib/providers/requestDefaults.ts";
import { getProviderConnections } from "../../src/lib/db/providers.ts";
import { providerLacksModelListing } from "../../src/lib/providers/modelListingCapability.ts";
import { AI_PROVIDERS, NOAUTH_PROVIDERS } from "../../src/shared/constants/providers.ts";

type JsonRecord = Record<string, unknown>;
type McpCatalogStatus = "available" | "degraded" | "unavailable";
type McpCatalogMode = "models" | "summary";

const DEFAULT_CATALOG_PAGE_SIZE = 50;
const MAX_CATALOG_PAGE_SIZE = 100;

type McpCatalogModel = {
  id: string;
  provider: string;
  capabilities: string[];
  status: McpCatalogStatus;
  thinkingEffort?: string;
  pricing?: unknown;
  context_length?: number;
};

type McpCatalogBaseResponse = {
  models: McpCatalogModel[];
  source: string;
  warning?: string;
  providerFailures?: Array<{
    provider: string;
    connectionId?: string;
    status: "unavailable";
  }>;
};

type McpCatalogResponse = McpCatalogBaseResponse & {
  mode: McpCatalogMode;
  total: number;
  returned: number;
  limit: number;
  nextCursor: string | null;
  summary?: {
    byProvider: Array<{ provider: string; count: number }>;
    byCapability: Array<{ capability: string; count: number }>;
    byStatus: Array<{ status: McpCatalogStatus; count: number }>;
  };
};

type McpCatalogArgs = {
  provider?: string;
  capability?: string;
  query?: string;
  mode?: McpCatalogMode;
  limit?: number;
  cursor?: string;
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
  connectionId?: string;
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

function providerServiceKinds(providerId: string): string[] {
  const provider = AI_PROVIDERS[providerId];
  return provider && Array.isArray(provider.serviceKinds)
    ? provider.serviceKinds.map((kind: unknown) => String(kind))
    : [];
}

function providerExposesModelCatalog(providerId: string): boolean {
  return !providerLacksModelListing(providerId, providerServiceKinds(providerId));
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

  const contextLength = typeof model.context_length === "number" ? model.context_length : undefined;

  return {
    id,
    provider: toString(model.owned_by, toString(model.provider, fallbackProvider)),
    capabilities: getCatalogModelCapabilities(model),
    status: normalizeCatalogStatus(model, source, warning),
    ...(thinkingEffort ? { thinkingEffort } : {}),
    pricing: model.pricing,
    ...(contextLength ? { context_length: contextLength } : {}),
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
    return (
      !!provider &&
      !!connection?.id &&
      connection.isActive !== false &&
      (!requestedProvider || provider === requestedProvider)
    );
  });
}

function providerModelRequestSpecs(
  connections: ProviderConnectionLike[],
  normalizeProviderId: (value: string) => string
): McpCatalogRequestSpec[] {
  return connections.flatMap((connection) => {
    const provider = normalizeProviderId(String(connection.provider));
    if (!providerExposesModelCatalog(provider)) return [];

    return [
      {
        provider,
        connectionId: String(connection.id),
        path: `/api/providers/${encodeURIComponent(String(connection.id))}/models?excludeHidden=true`,
        thinkingEffort: getConnectionThinkingEffort(connection),
      },
    ];
  });
}

function noAuthProviderSpec(requestedProvider: string): McpCatalogRequestSpec {
  return {
    provider: requestedProvider,
    path: `/api/v1/providers/${encodeURIComponent(requestedProvider)}/models`,
    thinkingEffort: undefined,
  };
}

function emptyCatalogForProvider(requestedProvider: string): McpCatalogBaseResponse {
  return {
    models: [],
    source: "provider_connections",
    warning: `No active connections found for provider '${requestedProvider}'.`,
  };
}

function compareText(left: string, right: string): number {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

function compareCatalogModels(left: McpCatalogModel, right: McpCatalogModel): number {
  return compareText(left.provider, right.provider) || compareText(left.id, right.id);
}

function compareCatalogModelToCursor(model: McpCatalogModel, cursor: McpCatalogCursor): number {
  return compareText(model.provider, cursor.provider) || compareText(model.id, cursor.id);
}

function validatePageSize(limit: number | undefined): number {
  const resolved = limit ?? DEFAULT_CATALOG_PAGE_SIZE;
  if (!Number.isInteger(resolved) || resolved < 1 || resolved > MAX_CATALOG_PAGE_SIZE) {
    throw new Error(`Catalog limit must be an integer between 1 and ${MAX_CATALOG_PAGE_SIZE}.`);
  }
  return resolved;
}

type McpCatalogCursor = Pick<McpCatalogModel, "provider" | "id">;

function encodeCursor(model: McpCatalogModel): string {
  const payload: McpCatalogCursor = { provider: model.provider, id: model.id };
  return `v1.${Buffer.from(JSON.stringify(payload), "utf8").toString("base64url")}`;
}

function decodeCursor(cursor: string | undefined): McpCatalogCursor | null {
  if (!cursor) return null;

  const match = /^v1\.([A-Za-z0-9_-]+)$/.exec(cursor);
  if (!match) throw new Error("Invalid catalog cursor.");

  try {
    const payload: unknown = JSON.parse(Buffer.from(match[1], "base64url").toString("utf8"));
    const record = toRecord(payload);
    if (typeof record.provider !== "string" || typeof record.id !== "string") {
      throw new Error("invalid payload");
    }
    return { provider: record.provider, id: record.id };
  } catch {
    throw new Error("Invalid catalog cursor.");
  }
}

function incrementCount(counts: Map<string, number>, key: string) {
  counts.set(key, (counts.get(key) ?? 0) + 1);
}

function sortedCounts<K extends string>(
  counts: Map<string, number>,
  key: K
): Array<Record<K, string> & { count: number }> {
  return [...counts.entries()]
    .sort(([left], [right]) => compareText(left, right))
    .map(([name, count]) => ({ [key]: name, count }) as Record<K, string> & { count: number });
}

function buildCatalogSummary(
  models: McpCatalogModel[]
): NonNullable<McpCatalogResponse["summary"]> {
  const providers = new Map<string, number>();
  const capabilities = new Map<string, number>();
  const statuses = new Map<string, number>();

  for (const model of models) {
    incrementCount(providers, model.provider);
    incrementCount(statuses, model.status);
    for (const capability of new Set(model.capabilities)) {
      incrementCount(capabilities, capability);
    }
  }

  return {
    byProvider: sortedCounts(providers, "provider"),
    byCapability: sortedCounts(capabilities, "capability"),
    byStatus: sortedCounts(statuses, "status") as Array<{
      status: McpCatalogStatus;
      count: number;
    }>,
  };
}

function modelMatchesQuery(model: McpCatalogModel, query: string): boolean {
  const searchable = [model.id, model.provider, ...model.capabilities];
  return searchable.some((value) => value.toLowerCase().includes(query));
}

function finalizeCatalogResponse(
  response: McpCatalogBaseResponse,
  args: McpCatalogArgs
): McpCatalogResponse {
  const mode = args.mode ?? "models";
  const limit = validatePageSize(args.limit);
  const cursor = decodeCursor(args.cursor);
  const query = args.query?.trim().toLowerCase() ?? "";
  const models = response.models
    .filter((model) => !query || modelMatchesQuery(model, query))
    .sort(compareCatalogModels);
  const total = models.length;

  if (mode === "summary") {
    return {
      ...response,
      models: [],
      mode,
      total,
      returned: 0,
      limit,
      nextCursor: null,
      summary: buildCatalogSummary(models),
    };
  }

  const start = cursor
    ? models.findIndex((model) => compareCatalogModelToCursor(model, cursor) > 0)
    : 0;
  const page = start >= 0 && start < total ? models.slice(start, start + limit) : [];
  const pageEnd = start + page.length;
  const lastModel = page.at(-1);

  return {
    ...response,
    models: page,
    mode,
    total,
    returned: page.length,
    limit,
    nextCursor: lastModel && pageEnd < total ? encodeCursor(lastModel) : null,
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
  if (spec.thinkingEffort && !normalized.thinkingEffort)
    normalized.thinkingEffort = spec.thinkingEffort;
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
  requestedCapability: string | null,
  continueOnProviderError: boolean
) {
  const collectedModels = new Map<string, McpCatalogResponse["models"][number]>();
  const warnings = new Set<string>();
  const sources = new Set<string>();
  const providerFailures: NonNullable<McpCatalogResponse["providerFailures"]> = [];

  for (const spec of requestSpecs) {
    let raw: JsonRecord;
    try {
      raw = toRecord(await fetchJson(spec.path));
    } catch (error) {
      if (!continueOnProviderError) throw error;
      providerFailures.push({
        provider: spec.provider,
        ...(spec.connectionId ? { connectionId: spec.connectionId } : {}),
        status: "unavailable",
      });
      warnings.add(`Provider '${spec.provider}' model catalog is unavailable.`);
      continue;
    }
    const source = toString(
      raw.source,
      spec.path.startsWith("/api/providers/") ? "api" : "v1_catalog"
    );
    const warning = raw.warning ? String(raw.warning) : undefined;
    if (warning) warnings.add(warning);
    sources.add(source);
    addCatalogModels(raw, spec, source, warning, requestedCapability, collectedModels);
  }

  return { collectedModels, warnings, sources, providerFailures };
}

export async function getMcpModelsCatalog(
  args: McpCatalogArgs,
  deps: {
    fetchJson?: (path: string) => Promise<unknown>;
    listProviderConnections?: () => Promise<ProviderConnectionLike[]>;
  } = {}
): Promise<McpCatalogResponse> {
  // Validate caller-controlled bounds before model discovery performs any upstream work.
  validatePageSize(args.limit);
  decodeCursor(args.cursor);

  const fetchJson =
    deps.fetchJson ?? ((path: string) => import("./server.ts").then((m) => m.omniRouteFetch(path)));
  const listProviderConnections = deps.listProviderConnections ?? getProviderConnections;
  const aliasMap = buildProviderAliasMap();
  const normalizeProviderId = (value: string) => aliasMap[value] || value;
  const requestedProvider = args.provider ? normalizeProviderId(args.provider) : null;
  const requestedCapability = args.capability ? normalizeCapability(args.capability) : null;

  if (requestedProvider && !providerExposesModelCatalog(requestedProvider)) {
    throw new Error(`Provider '${requestedProvider}' does not expose a model catalog.`);
  }

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
      return finalizeCatalogResponse(emptyCatalogForProvider(requestedProvider), args);
    }
  }

  const { collectedModels, warnings, sources, providerFailures } = await collectCatalogModels(
    requestSpecs,
    fetchJson,
    requestedCapability,
    requestedProvider === null
  );

  return finalizeCatalogResponse(
    {
      models: [...collectedModels.values()],
      source: sources.size === 1 ? [...sources][0] : "aggregated_provider_models",
      ...(warnings.size > 0 ? { warning: [...warnings].join(" | ") } : {}),
      ...(providerFailures.length > 0 ? { providerFailures } : {}),
    },
    args
  );
}
