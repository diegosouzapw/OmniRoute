import { isSelfHostedChatProvider } from "@/shared/constants/providers";
import type { LocalCatalogModel } from "@/lib/providers/staticModels";

export type JsonRecord = Record<string, unknown>;

// ── Generic helpers ──────────────────────────────────────────────────────────

export function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};
}

export function toNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function toGeminiCliProjectId(value: unknown): string | null {
  const normalized = toNonEmptyString(value);
  if (!normalized) return null;
  const lower = normalized.toLowerCase();
  if (lower === "default-project" || lower === "projects/default-project") return null;
  return normalized;
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

// ── Provider classification ─────────────────────────────────────────────────

export function isLocalOpenAIStyleProvider(provider: string): boolean {
  return isSelfHostedChatProvider(provider);
}

export const NAMED_OPENAI_STYLE_PROVIDERS = new Set([
  "modal",
  "reka",
  "empower",
  "nous-research",
  "poe",
  "siliconflow",
  // #3976: these carry a real modelsUrl but were not classified by any live-fetch
  // branch, so their hardcoded registry catalog was served instead of the live
  // `<baseUrl>/models` list. Live fetch falls back to the local catalog on error.
  "llm7",
  "byteplus",
  // #4202: zenmux is the same case — its free models (e.g. z-ai/glm-5.2-free,
  // moonshotai/kimi-k2.7-code-free) live only on the upstream /models list.
  "zenmux",
  // #4249: vercel-ai-gateway carries a real baseUrl (.../v1/chat/completions) but
  // was unclassified, so import served the 5-entry hardcoded catalog instead of the
  // live `https://ai-gateway.vercel.sh/v1/models` list. Falls back to local on error.
  "vercel-ai-gateway",
  // #4239 / #4155 / #3841: OpenAI-compatible aggregators whose real catalog lives
  // on the upstream `/v1/models` list — serve it live, fall back to the seeded
  // registry catalog on error (same case as zenmux).
  // escalated cmqlvxg4o: api-airforce has a live `https://api.airforce/v1/models` catalog
  // but was left out of the sweep, so it served a stale hardcoded seed (grok-3, grok-2-1212,
  // claude-3.7-sonnet …). Live fetch keeps it fresh; seed stays as the offline fallback.
  "api-airforce",
  "openadapter",
  "dit",
  "tokenrouter",
  // provider-model-sweep (2026-06-19): same class as #3976/#4202/#4249 — keyed
  // openai-style providers with a real live `<baseUrl>/models` catalog, served
  // their small hardcoded seed because unclassified. Seed stays as offline fallback.
  "venice",
  "deepinfra",
  "wandb",
  "pollinations",
  "nscale",
  "inference-net",
  "moonshot",
  // provider-model-sweep (2026-06-19) cont.: GPU-cloud / aggregator marketplaces
  // hosting large, volatile OSS catalogs. The sweep confirmed each exposes a live
  // `<baseUrl>/v1/models` endpoint (200 public or 401/403 = exists + keyed), so live
  // fetch keeps the catalog fresh; the registry seed remains the offline fallback.
  "crof",
  "featherless-ai",
  "ovhcloud",
  "sambanova",
  "orcarouter",
  "uncloseai",
  "opencode-go",
  "baseten",
  "hyperbolic",
  "nebius",
  "scaleway",
  "together",
]);

export function isNamedOpenAIStyleProvider(provider: string): boolean {
  return NAMED_OPENAI_STYLE_PROVIDERS.has(provider);
}

// ── Catalog helpers ──────────────────────────────────────────────────────────

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

// ── Header builders ─────────────────────────────────────────────────────────

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
