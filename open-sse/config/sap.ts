import { stripTrailingSlashes } from "../utils/urlSanitize.ts";

export const SAP_DEFAULT_BASE_URL =
  "https://example-aicore.cfapps.eu10.hana.ondemand.com/v2/lm/deployments/example-deployment";

function normalizeBaseUrl(value: string | null | undefined): string {
  return stripTrailingSlashes((value || "").trim());
}

function sanitizeUrl(value: string): string {
  try {
    const parsed = new URL(value);
    parsed.search = "";
    parsed.hash = "";
    return stripTrailingSlashes(parsed.toString());
  } catch {
    return value;
  }
}

export function normalizeSapBaseUrl(value: string | null | undefined): string {
  const normalized = normalizeBaseUrl(value || SAP_DEFAULT_BASE_URL);
  if (!normalized) return SAP_DEFAULT_BASE_URL;

  return sanitizeUrl(normalized.replace(/\/chat\/completions$/i, ""));
}

export function isSapDeploymentUrl(value: string | null | undefined): boolean {
  const normalized = normalizeSapBaseUrl(value);
  return /\/v2\/lm\/deployments\/[^/]+$/i.test(normalized);
}

export function buildSapChatUrl(value: string | null | undefined): string {
  const normalized = normalizeSapBaseUrl(value);
  if (normalized.endsWith("/chat/completions")) return normalized;
  return `${normalized}/chat/completions`;
}

export function buildSapModelsUrl(value: string | null | undefined): string {
  const normalized = normalizeSapBaseUrl(value);
  const root = normalized.replace(/\/v2\/lm\/deployments\/[^/]+$/i, "");
  return `${root}/v2/lm/scenarios/foundation-models/models`;
}

export function getSapResourceGroup(
  providerSpecificData: Record<string, unknown> | null | undefined,
  fallback = "default"
): string {
  const candidates = [
    providerSpecificData?.resourceGroup,
    providerSpecificData?.aiResourceGroup,
    providerSpecificData?.resource_group,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }
  }

  return fallback;
}
