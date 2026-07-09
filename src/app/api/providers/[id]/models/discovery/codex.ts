import {
  getCodexClientVersion,
  getCodexDefaultHeaders,
} from "@omniroute/open-sse/config/codexClient.ts";

export const CODEX_MODELS_URL = "https://chatgpt.com/backend-api/codex/models";
export const CODEX_GITHUB_MODELS_URL =
  "https://raw.githubusercontent.com/openai/codex/refs/heads/main/codex-rs/models-manager/models.json";
export const CODEX_GITHUB_CATALOG_CACHE_TTL_MS = 5 * 60 * 1000;

type JsonRecord = Record<string, unknown>;

export type CodexDiscoveryModel = {
  id: string;
  name: string;
  owned_by: "codex";
  apiFormat: "responses";
  supportedEndpoints: ["responses"];
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  description?: string;
  supportsThinking?: boolean;
  supportsVision?: boolean;
};

export type CodexModelsFetch = (
  input: string,
  init: {
    method: "GET";
    headers: Record<string, string>;
  }
) => Promise<Response>;

type CodexGithubCatalogCache = {
  models: CodexDiscoveryModel[];
  etag?: string;
  expiresAt: number;
};

let codexGithubCatalogCache: CodexGithubCatalogCache | null = null;

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

function parseVersionParts(version: string): number[] | null {
  const parts = version
    .trim()
    .split(".")
    .map((part) => Number(part));
  return parts.length > 0 && parts.every((part) => Number.isInteger(part) && part >= 0)
    ? parts
    : null;
}

function compareVersions(left: string, right: string): number {
  const leftParts = parseVersionParts(left);
  const rightParts = parseVersionParts(right);
  if (!leftParts || !rightParts) return 0;

  const length = Math.max(leftParts.length, rightParts.length);
  for (let index = 0; index < length; index += 1) {
    const a = leftParts[index] || 0;
    const b = rightParts[index] || 0;
    if (a !== b) return a - b;
  }
  return 0;
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

  const minimalClientVersion =
    toNonEmptyString(record.minimal_client_version) ||
    toNonEmptyString(record.minimalClientVersion);
  if (minimalClientVersion && compareVersions(minimalClientVersion, getCodexClientVersion()) > 0) {
    return false;
  }

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
      record.context_window,
      record.max_context_window,
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
      ...(toNonEmptyString(record.description)
        ? { description: toNonEmptyString(record.description)! }
        : {}),
      ...(Array.isArray(record.supported_reasoning_levels) &&
      record.supported_reasoning_levels.length > 0
        ? { supportsThinking: true }
        : {}),
      ...(Array.isArray(record.input_modalities) &&
      record.input_modalities.some(
        (modality) => toNonEmptyString(modality)?.toLowerCase() === "image"
      )
        ? { supportsVision: true }
        : {}),
    });
  }

  return Array.from(deduped.values());
}

export function normalizeCodexGithubCatalogResponse(payload: unknown): CodexDiscoveryModel[] {
  return normalizeCodexModelsResponse(payload);
}

export function clearCodexGithubCatalogCacheForTests(): void {
  codexGithubCatalogCache = null;
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

export function enrichCodexModelsFromGithubCatalog(
  models: CodexDiscoveryModel[],
  githubCatalogModels: CodexDiscoveryModel[]
): CodexDiscoveryModel[] {
  const byId = new Map(githubCatalogModels.map((model) => [model.id, model]));
  return models.map((model) => {
    const githubModel = byId.get(model.id);
    return githubModel ? { ...githubModel, ...model } : model;
  });
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

export async function fetchCodexGithubCatalogModels({
  fetchImpl,
  now = Date.now(),
  cacheTtlMs = CODEX_GITHUB_CATALOG_CACHE_TTL_MS,
}: {
  fetchImpl: CodexModelsFetch;
  now?: number;
  cacheTtlMs?: number;
}): Promise<CodexDiscoveryModel[] | null> {
  if (cacheTtlMs > 0 && codexGithubCatalogCache?.expiresAt > now) {
    return codexGithubCatalogCache.models;
  }

  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (codexGithubCatalogCache?.etag) {
      headers["If-None-Match"] = codexGithubCatalogCache.etag;
    }

    const response = await fetchImpl(CODEX_GITHUB_MODELS_URL, {
      method: "GET",
      headers,
    });

    if (response.status === 304 && codexGithubCatalogCache) {
      codexGithubCatalogCache = {
        ...codexGithubCatalogCache,
        expiresAt: now + cacheTtlMs,
      };
      return codexGithubCatalogCache.models;
    }

    if (!response.ok) return null;

    const models = normalizeCodexGithubCatalogResponse(await response.json());
    if (models.length === 0) return null;

    const etag = toNonEmptyString(response.headers.get("etag"));
    codexGithubCatalogCache = {
      models,
      ...(etag ? { etag } : {}),
      expiresAt: now + cacheTtlMs,
    };
    return models;
  } catch {
    return codexGithubCatalogCache?.models || null;
  }
}
