import { isSelfHostedChatProvider } from "@/shared/constants/providers";
import { getStaticModelsForProvider, type LocalCatalogModel } from "@/lib/providers/staticModels";

export type JsonRecord = Record<string, unknown>;

export function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export function toNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function getProviderBaseUrl(providerSpecificData: unknown): string | null {
  const data = asRecord(providerSpecificData);
  const baseUrl = data.baseUrl;
  return typeof baseUrl === "string" && baseUrl.trim().length > 0 ? baseUrl : null;
}

export function normalizeAzureOpenAIBaseUrl(baseUrl: string) {
  return baseUrl
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/openai$/i, "")
    .replace(/\/openai\/deployments\/[^/]+\/chat\/completions.*$/i, "");
}

export function getAzureOpenAIApiVersion(providerSpecificData: unknown) {
  const data = asRecord(providerSpecificData);
  const apiVersion =
    toNonEmptyString(data.apiVersion) || toNonEmptyString(data.validationApiVersion);
  return apiVersion || "2024-12-01-preview";
}

export function isLocalOpenAIStyleProvider(provider: string): boolean {
  return isSelfHostedChatProvider(provider);
}

export function mergeLocalCatalogModels<T extends LocalCatalogModel, U extends LocalCatalogModel>(
  registryCatalogModels: T[],
  specialtyCatalogModels: U[]
): Array<T | U> {
  if (registryCatalogModels.length === 0) return specialtyCatalogModels;

  const registryModelIds = new Set(registryCatalogModels.map((model) => model.id));
  return [
    ...registryCatalogModels,
    ...specialtyCatalogModels.filter((model) => !registryModelIds.has(model.id)),
  ];
}

// #6976 — providers whose live /v1/models endpoint is known to serve ONLY
// chat models (verified: OpenRouter's catalog is chat-only — embeddings live
// on a separate /api/v1/embeddings endpoint per
// https://openrouter.ai/docs/api/reference/embeddings) never surface their
// embedding/rerank specialty catalog once they have a live discovery config,
// because the specialty catalog is otherwise only folded in on the no-config
// local_catalog fallback. Deliberately an allowlist, not every provider with
// an embeddingRegistry/rerankRegistry entry: some providers' live /v1/models
// response legitimately DOES include embedding ids already (e.g. Gemini's
// models.list mixes generateContent and embedContent models in one response —
// see provider-models-route.test.ts pagination coverage), so blind-merging
// the curated catalog there would risk stale-duplicate/conflicting entries.
const LIVE_DISCOVERY_SPECIALTY_MERGE_PROVIDERS = new Set<string>(["openrouter"]);

// Fold the embeddings/rerank subset of the static catalog into a successful
// live-discovery response, additively and deduped by id, without touching
// chat/image/video/audio entries — scoped to
// LIVE_DISCOVERY_SPECIALTY_MERGE_PROVIDERS above.
export function mergeSpecialtyCatalogIntoLiveModels<T extends { id: string }>(
  liveModels: T[],
  provider: string
): Array<T | LocalCatalogModel> {
  if (!LIVE_DISCOVERY_SPECIALTY_MERGE_PROVIDERS.has(provider)) return liveModels;
  const specialty = (getStaticModelsForProvider(provider) || []).filter(
    (model) => model.apiFormat === "embeddings" || model.apiFormat === "rerank"
  );
  if (specialty.length === 0) return liveModels;
  return mergeLocalCatalogModels(liveModels, specialty);
}

export function buildOptionalBearerHeaders(
  token: string | null | undefined
): Record<string, string> {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export function buildNamedOpenAiStyleHeaders(
  provider: string,
  token: string | null | undefined
): Record<string, string> {
  const headers = buildOptionalBearerHeaders(token);

  if (provider === "reka" && token) {
    headers["X-Api-Key"] = token;
  }

  return headers;
}
