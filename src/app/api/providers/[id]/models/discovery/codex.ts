import {
  getCodexClientVersion,
  getCodexDefaultHeaders,
} from "@omniroute/open-sse/config/codexClient.ts";

export const CODEX_MODELS_URL = "https://chatgpt.com/backend-api/codex/models";

type JsonRecord = Record<string, unknown>;

export type CodexDiscoveryModel = {
  id: string;
  name: string;
  owned_by: "codex";
  apiFormat: "responses";
  supportedEndpoints: ["responses"];
  inputTokenLimit?: number;
  outputTokenLimit?: number;
};

export type CodexModelsFetch = (
  input: string,
  init: {
    method: "GET";
    headers: Record<string, string>;
  }
) => Promise<Response>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function firstPositiveNumber(...candidates: unknown[]): number | undefined {
  for (const candidate of candidates) {
    if (typeof candidate === "number" && Number.isFinite(candidate) && candidate > 0) {
      return candidate;
    }
  }
  return undefined;
}

export function buildCodexModelsUrl(clientVersion = getCodexClientVersion()): string {
  const url = new URL(CODEX_MODELS_URL);
  url.searchParams.set("client_version", clientVersion);
  return url.toString();
}

function getCodexModelItems(payload: unknown): unknown[] {
  const record = asRecord(payload);
  if (Array.isArray(record.models)) return record.models;
  if (Array.isArray(record.data)) return record.data;
  if (Array.isArray(payload)) return payload;

  const objectItems = Object.entries(record)
    .filter(([, value]) => value && typeof value === "object" && !Array.isArray(value))
    .map(([key, value]) => ({ id: key, ...asRecord(value) }));
  return objectItems.length > 0 ? objectItems : [];
}

function shouldImportCodexModel(record: JsonRecord): boolean {
  if (toNonEmptyString(record.visibility)?.toLowerCase() === "hide") return false;
  if (record.supported_in_api === false || record.supportedInApi === false) return false;
  return true;
}

export function normalizeCodexModelsResponse(payload: unknown): CodexDiscoveryModel[] {
  const deduped = new Map<string, CodexDiscoveryModel>();

  for (const item of getCodexModelItems(payload)) {
    const record = asRecord(item);
    const topProvider = asRecord(record.top_provider);
    const limits = asRecord(record.limits);
    if (!shouldImportCodexModel(record)) continue;

    const id =
      toNonEmptyString(record.slug) ||
      toNonEmptyString(record.id) ||
      toNonEmptyString(record.model);
    if (!id) continue;

    const name =
      toNonEmptyString(record.display_name) ||
      toNonEmptyString(record.displayName) ||
      toNonEmptyString(record.name) ||
      toNonEmptyString(record.title) ||
      id;
    const inputTokenLimit = firstPositiveNumber(
      record.inputTokenLimit,
      record.maxInputTokens,
      record.max_input_tokens,
      record.contextLength,
      record.context_length,
      topProvider.context_length,
      limits.input_tokens,
      limits.inputTokenLimit,
      limits.max_input_tokens
    );
    const outputTokenLimit = firstPositiveNumber(
      record.outputTokenLimit,
      record.maxOutputTokens,
      record.max_output_tokens,
      topProvider.max_completion_tokens,
      limits.output_tokens,
      limits.outputTokenLimit,
      limits.max_output_tokens
    );

    deduped.set(id, {
      id,
      name,
      owned_by: "codex",
      apiFormat: "responses",
      supportedEndpoints: ["responses"],
      ...(typeof inputTokenLimit === "number" ? { inputTokenLimit } : {}),
      ...(typeof outputTokenLimit === "number" ? { outputTokenLimit } : {}),
    });
  }

  return Array.from(deduped.values());
}

type CodexLocalCatalogModel = {
  id: string;
  name?: string;
  apiFormat?: string;
  supportedEndpoints?: string[];
  contextLength?: number;
  maxInputTokens?: number;
  maxOutputTokens?: number;
};

function localCatalogModelToCodexDiscoveryModel(
  model: CodexLocalCatalogModel
): CodexDiscoveryModel {
  const inputTokenLimit = firstPositiveNumber(model.maxInputTokens, model.contextLength);
  const outputTokenLimit = firstPositiveNumber(model.maxOutputTokens);
  return {
    id: model.id,
    name: model.name || model.id,
    owned_by: "codex",
    apiFormat: "responses",
    supportedEndpoints: ["responses"],
    ...(typeof inputTokenLimit === "number" ? { inputTokenLimit } : {}),
    ...(typeof outputTokenLimit === "number" ? { outputTokenLimit } : {}),
  };
}

export function mergeCodexLiveModelsWithLocalCatalog(
  liveModels: CodexDiscoveryModel[],
  localCatalogModels: CodexLocalCatalogModel[]
): CodexDiscoveryModel[] {
  const merged = new Map<string, CodexDiscoveryModel>();

  for (const liveModel of liveModels) {
    merged.set(liveModel.id, liveModel);
  }

  for (const localModel of localCatalogModels) {
    if (!localModel.id) continue;
    const normalizedLocal = localCatalogModelToCodexDiscoveryModel(localModel);
    const existing = merged.get(localModel.id);
    merged.set(localModel.id, existing ? { ...normalizedLocal, ...existing } : normalizedLocal);
  }

  return Array.from(merged.values());
}

export async function fetchCodexDiscoveryModels({
  accessToken,
  providerSpecificData,
  fetchImpl,
}: {
  accessToken: string | null;
  providerSpecificData?: Record<string, unknown> | null;
  fetchImpl: CodexModelsFetch;
}): Promise<CodexDiscoveryModel[] | null> {
  if (!accessToken) return null;

  try {
    const workspaceId =
      toNonEmptyString(providerSpecificData?.workspaceId) ||
      toNonEmptyString(providerSpecificData?.chatgptAccountId) ||
      toNonEmptyString(providerSpecificData?.accountId);
    const headers: Record<string, string> = {
      ...getCodexDefaultHeaders(),
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      originator: "codex_cli_rs",
    };
    if (workspaceId) headers["chatgpt-account-id"] = workspaceId;

    const response = await fetchImpl(buildCodexModelsUrl(), {
      method: "GET",
      headers,
    });

    if (!response.ok) return null;

    const models = normalizeCodexModelsResponse(await response.json());
    return models.length > 0 ? models : null;
  } catch {
    return null;
  }
}
