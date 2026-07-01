import { isSelfHostedChatProvider } from "@/shared/constants/providers";
import type { LocalCatalogModel } from "@/lib/providers/staticModels";

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
