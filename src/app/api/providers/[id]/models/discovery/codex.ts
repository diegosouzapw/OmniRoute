import {
  CODEX_CLI_RS_ORIGINATOR,
  getCodexClientVersion,
  getCodexDefaultHeaders,
} from "@omniroute/open-sse/config/codexClient.ts";
import {
  classifyCodexDiscoveryModel,
  isCodexDiscoveryModelExcluded,
  type CodexDiscoveryMode,
  type CodexDiscoverySource,
  type CodexDiscoveryStatus,
} from "@/shared/services/codexDiscoveryPolicy";

export {
  CODEX_DISCOVERY_EXCLUDED_IDS,
  CODEX_DISCOVERY_EXCLUDED_ID_PREFIXES,
  isCodexDiscoveryModelExcluded,
} from "@/shared/services/codexDiscoveryPolicy";

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
  supportedThinkingEfforts?: string[];
  visibility?: string;
  supportedInApi?: boolean;
  minimalClientVersion?: string;
  discoverySource?: CodexDiscoverySource;
  discoveryStatus?: CodexDiscoveryStatus;
  compatibilityReason?: string;
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

function getCodexModelMetadata(record: JsonRecord): {
  visibility?: string;
  supportedInApi?: boolean;
  minimalClientVersion?: string;
} {
  const visibility = toNonEmptyString(record.visibility)?.toLowerCase();
  const supportedInApi =
    typeof record.supported_in_api === "boolean"
      ? record.supported_in_api
      : typeof record.supportedInApi === "boolean"
        ? record.supportedInApi
        : undefined;
  const minimalClientVersion =
    toNonEmptyString(record.minimal_client_version) ||
    toNonEmptyString(record.minimalClientVersion) ||
    undefined;
  return {
    ...(visibility ? { visibility } : {}),
    ...(typeof supportedInApi === "boolean" ? { supportedInApi } : {}),
    ...(minimalClientVersion ? { minimalClientVersion } : {}),
  };
}

function getCodexModelId(record: JsonRecord): string | null {
  return (
    toNonEmptyString(record.slug) || toNonEmptyString(record.id) || toNonEmptyString(record.model)
  );
}

function getCodexModelName(record: JsonRecord, id: string): string {
  return (
    toNonEmptyString(record.display_name) ||
    toNonEmptyString(record.displayName) ||
    toNonEmptyString(record.name) ||
    toNonEmptyString(record.title) ||
    id
  );
}

function recordSupportsThinking(record: JsonRecord): boolean {
  return (
    Array.isArray(record.supported_reasoning_levels) && record.supported_reasoning_levels.length > 0
  );
}

function isImageModality(modality: unknown): boolean {
  return toNonEmptyString(modality)?.toLowerCase() === "image";
}

function recordSupportsVision(record: JsonRecord): boolean {
  return Array.isArray(record.input_modalities) && record.input_modalities.some(isImageModality);
}

function supportedThinkingEfforts(record: JsonRecord): string[] | undefined {
  if (!Array.isArray(record.supported_reasoning_levels)) return undefined;
  const efforts = record.supported_reasoning_levels.filter(
    (effort): effort is string => typeof effort === "string" && effort.trim().length > 0
  );
  return efforts.length > 0 ? efforts : undefined;
}

function buildCodexDiscoveryModel(
  record: JsonRecord,
  source: CodexDiscoverySource = "live"
): CodexDiscoveryModel | null {
  const id = getCodexModelId(record);
  if (!id) return null;

  const metadata = getCodexModelMetadata(record);
  if (metadata.visibility === "hide" || metadata.supportedInApi === false) return null;

  const topProvider = asRecord(record.top_provider);
  const limits = asRecord(record.limits);
  const model: CodexDiscoveryModel = {
    id,
    name: getCodexModelName(record, id),
    owned_by: "codex",
    apiFormat: "responses",
    supportedEndpoints: ["responses"],
    ...(source === "github" ? { discoverySource: source } : {}),
    ...metadata,
  };
  // The live Codex OAuth catalog reports BOTH `context_window` (the first
  // pricing tier, ~272K) and `max_context_window` (the real usable window,
  // ~872K). Requests well past the pricing tier succeed upstream, so the max
  // window must win whenever it is present; `context_window` is only a
  // fallback for catalogs that omit the max.
  const inputTokenLimit = firstPositiveNumber(
    record.inputTokenLimit,
    record.maxInputTokens,
    record.max_input_tokens,
    record.contextLength,
    record.context_length,
    record.max_context_window,
    record.context_window,
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
  const description = toNonEmptyString(record.description);

  if (typeof inputTokenLimit === "number") model.inputTokenLimit = inputTokenLimit;
  if (typeof outputTokenLimit === "number") model.outputTokenLimit = outputTokenLimit;
  if (description) model.description = description;
  const efforts = supportedThinkingEfforts(record);
  if (recordSupportsThinking(record)) model.supportsThinking = true;
  if (efforts) model.supportedThinkingEfforts = efforts;
  if (recordSupportsVision(record)) model.supportsVision = true;

  return model;
}

export function normalizeCodexModelsResponse(
  payload: unknown,
  source: CodexDiscoverySource = "live"
): CodexDiscoveryModel[] {
  const deduped = new Map<string, CodexDiscoveryModel>();

  for (const item of getCodexModelItems(payload)) {
    const model = buildCodexDiscoveryModel(asRecord(item), source);
    if (model) deduped.set(model.id, model);
  }

  return Array.from(deduped.values());
}

export function normalizeCodexGithubCatalogResponse(payload: unknown): CodexDiscoveryModel[] {
  return normalizeCodexModelsResponse(payload, "github");
}

export function clearCodexGithubCatalogCacheForTests(): void {
  codexGithubCatalogCache = null;
}

function getFreshCodexGithubCatalogCache(
  now: number,
  cacheTtlMs: number
): CodexDiscoveryModel[] | null {
  const cache = codexGithubCatalogCache;
  if (cacheTtlMs > 0 && cache && cache.expiresAt > now) {
    return cache.models;
  }
  return null;
}

function buildCodexGithubCatalogHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (codexGithubCatalogCache?.etag) {
    headers["If-None-Match"] = codexGithubCatalogCache.etag;
  }
  return headers;
}

function getNotModifiedCodexGithubCatalog(
  response: Response,
  now: number,
  cacheTtlMs: number
): CodexDiscoveryModel[] | null {
  if (response.status !== 304 || !codexGithubCatalogCache) return null;

  codexGithubCatalogCache = {
    ...codexGithubCatalogCache,
    expiresAt: now + cacheTtlMs,
  };
  return codexGithubCatalogCache.models;
}

function storeCodexGithubCatalogCache(
  models: CodexDiscoveryModel[],
  response: Response,
  now: number,
  cacheTtlMs: number
): void {
  const etag = toNonEmptyString(response.headers.get("etag"));
  codexGithubCatalogCache = {
    models,
    ...(etag ? { etag } : {}),
    expiresAt: now + cacheTtlMs,
  };
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

/**
 * Capacity limits (input/output token caps) merge CONSERVATIVELY: the smaller
 * of the pinned local-catalog value and the live-discovery value wins, never
 * the larger. Overpromising context lets a request run past what the account
 * can actually serve — the upstream truncates mid-conversation and can burn a
 * combo fallback. Underpromising only leaves capacity on the table, which is
 * a performance loss, not a broken request. When only one side has a value,
 * that value passes through unchanged (nothing to reconcile).
 *
 * This is the ONE deliberate exception to "live wins on overlapping fields"
 * below — name/apiFormat/supportedEndpoints/supportsThinking/supportsVision
 * etc. still take the live value unconditionally. Don't extend this
 * conservative rule to other fields without updating the policy comment on
 * mergeCodexLiveModelsWithLocalCatalog (#7012).
 */
function mergeCapacityLimitConservatively(
  pinnedValue: number | undefined,
  liveValue: number | undefined
): number | undefined {
  if (typeof pinnedValue === "number" && typeof liveValue === "number") {
    return Math.min(pinnedValue, liveValue);
  }
  return typeof liveValue === "number" ? liveValue : pinnedValue;
}

function mergeLiveAndLocalCodexModel(
  liveModel: CodexDiscoveryModel,
  localModel: CodexDiscoveryModel
): CodexDiscoveryModel {
  const merged: CodexDiscoveryModel = { ...localModel, ...liveModel };
  const inputTokenLimit = mergeCapacityLimitConservatively(
    localModel.inputTokenLimit,
    liveModel.inputTokenLimit
  );
  const outputTokenLimit = mergeCapacityLimitConservatively(
    localModel.outputTokenLimit,
    liveModel.outputTokenLimit
  );
  if (typeof inputTokenLimit === "number") {
    merged.inputTokenLimit = inputTokenLimit;
  } else {
    delete merged.inputTokenLimit;
  }
  if (typeof outputTokenLimit === "number") {
    merged.outputTokenLimit = outputTokenLimit;
  } else {
    delete merged.outputTokenLimit;
  }
  return merged;
}

/**
 * Live/GitHub discovery is the source of truth for "what exists".
 * Explicit filters (denylist / predicates) are the policy layer for "what we show".
 * Live wins on overlapping fields, EXCEPT capacity limits (input/output token
 * caps) — those merge conservatively, see mergeCapacityLimitConservatively.
 * Do NOT reintroduce curated-only allowlisting as the default path (#6862 / #6859).
 */
export function mergeCodexLiveModelsWithLocalCatalog(
  liveModels: CodexDiscoveryModel[],
  localCatalogModels: CodexLocalCatalogModel[]
): CodexDiscoveryModel[] {
  const merged = new Map<string, CodexDiscoveryModel>();

  for (const liveModel of liveModels) {
    if (!liveModel?.id) continue;
    merged.set(liveModel.id, liveModel);
  }

  for (const localModel of localCatalogModels) {
    if (!localModel.id) continue;
    const normalizedLocal = localCatalogModelToCodexDiscoveryModel(localModel);
    const existing = merged.get(localModel.id);
    merged.set(
      localModel.id,
      existing ? mergeLiveAndLocalCodexModel(existing, normalizedLocal) : normalizedLocal
    );
  }

  return Array.from(merged.values());
}

/** Return true to KEEP the model. */
export type CodexDiscoveryModelFilter = (model: CodexDiscoveryModel) => boolean;

/**
 * Apply policy filters after discovery merge. Default denylist runs first;
 * extraFilters are additional keep-predicates (all must pass).
 */
export function applyCodexDiscoveryFilters(
  models: CodexDiscoveryModel[],
  extraFilters: readonly CodexDiscoveryModelFilter[] = []
): CodexDiscoveryModel[] {
  return models.filter((model) => {
    if (isCodexDiscoveryModelExcluded(model)) return false;
    return extraFilters.every((keep) => keep(model));
  });
}

export type CodexDiscoveryCatalogResult = {
  activeModels: CodexDiscoveryModel[];
  candidateModels: CodexDiscoveryModel[];
};

/** Reconciles remote metadata with the pinned local fallback without auto-trusting it. */
export function reconcileCodexDiscoveryCatalog(
  remoteModels: CodexDiscoveryModel[],
  localCatalogModels: CodexLocalCatalogModel[],
  mode: CodexDiscoveryMode = "all",
  implementedClientVersion = getCodexClientVersion(),
  extraFilters: readonly CodexDiscoveryModelFilter[] = []
): CodexDiscoveryCatalogResult {
  const activeRemoteModels: CodexDiscoveryModel[] = [];
  const candidateModels: CodexDiscoveryModel[] = [];

  for (const remoteModel of remoteModels) {
    const compatibility = classifyCodexDiscoveryModel(remoteModel, {
      source: remoteModel.discoverySource || "live",
      mode,
      implementedClientVersion,
    });
    if (compatibility.status === "active") {
      activeRemoteModels.push({ ...remoteModel, discoveryStatus: "active" });
    } else if (compatibility.status === "candidate") {
      candidateModels.push({
        ...remoteModel,
        discoveryStatus: "candidate",
        compatibilityReason: compatibility.reason,
      });
    }
  }

  return {
    activeModels: applyCodexDiscoveryFilters(
      mergeCodexLiveModelsWithLocalCatalog(activeRemoteModels, localCatalogModels),
      extraFilters
    ),
    candidateModels,
  };
}

/** Convenience: return only the active models for existing callers. */
export function buildCodexDiscoveryCatalog(
  remoteModels: CodexDiscoveryModel[],
  localCatalogModels: CodexLocalCatalogModel[],
  extraFilters: readonly CodexDiscoveryModelFilter[] = [],
  mode: CodexDiscoveryMode = "all"
): CodexDiscoveryModel[] {
  return reconcileCodexDiscoveryCatalog(
    remoteModels,
    localCatalogModels,
    mode,
    undefined,
    extraFilters
  ).activeModels;
}

export type CuratedCodexCatalogResult = {
  models: CodexDiscoveryModel[];
  candidateModels: CodexDiscoveryModel[];
};

/**
 * Optional curated-only view (allowlist). NOT used by the default Codex
 * discovery route — kept for diagnostics / explicit call sites only.
 */
export function reconcileCuratedCodexCatalog(
  remoteModels: CodexDiscoveryModel[],
  curatedModels: CodexLocalCatalogModel[]
): CuratedCodexCatalogResult {
  const remoteById = new Map(remoteModels.map((model) => [model.id, model]));
  const curatedIds = new Set<string>();
  const models: CodexDiscoveryModel[] = [];

  for (const localModel of curatedModels) {
    if (!localModel.id) continue;
    curatedIds.add(localModel.id);
    const normalizedLocal = localCatalogModelToCodexDiscoveryModel(localModel);
    const remoteModel = remoteById.get(localModel.id);
    models.push(remoteModel ? { ...remoteModel, ...normalizedLocal } : normalizedLocal);
  }

  const candidateModels = remoteModels.filter((model) => !curatedIds.has(model.id));
  return { models, candidateModels };
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
      originator: CODEX_CLI_RS_ORIGINATOR,
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
  const cachedModels = getFreshCodexGithubCatalogCache(now, cacheTtlMs);
  if (cachedModels) return cachedModels;

  try {
    const response = await fetchImpl(CODEX_GITHUB_MODELS_URL, {
      method: "GET",
      headers: buildCodexGithubCatalogHeaders(),
    });

    const notModifiedModels = getNotModifiedCodexGithubCatalog(response, now, cacheTtlMs);
    if (notModifiedModels) return notModifiedModels;

    if (!response.ok) return null;

    const models = normalizeCodexGithubCatalogResponse(await response.json());
    if (models.length === 0) return null;

    storeCodexGithubCatalogCache(models, response, now, cacheTtlMs);
    return models;
  } catch {
    return codexGithubCatalogCache?.models || null;
  }
}
