import { getCodexDefaultHeaders } from "@omniroute/open-sse/config/codexClient.ts";

export const CODEX_MODELS_URL =
  "https://chatgpt.com/backend-api/models?history_and_training_disabled=false";

type JsonRecord = Record<string, unknown>;

export type CodexDiscoveryModel = {
  id: string;
  name: string;
  owned_by: "codex";
  apiFormat: "responses";
  supportedEndpoints: ["responses"];
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

export function normalizeCodexModelsResponse(payload: unknown): CodexDiscoveryModel[] {
  const deduped = new Map<string, CodexDiscoveryModel>();

  for (const item of getCodexModelItems(payload)) {
    const record = asRecord(item);
    const id =
      toNonEmptyString(record.id) ||
      toNonEmptyString(record.slug) ||
      toNonEmptyString(record.model);
    if (!id) continue;

    const name =
      toNonEmptyString(record.name) ||
      toNonEmptyString(record.title) ||
      toNonEmptyString(record.display_name) ||
      toNonEmptyString(record.displayName) ||
      id;

    deduped.set(id, {
      id,
      name,
      owned_by: "codex",
      apiFormat: "responses",
      supportedEndpoints: ["responses"],
    });
  }

  return Array.from(deduped.values());
}

export async function fetchCodexDiscoveryModels({
  accessToken,
  fetchImpl,
}: {
  accessToken: string | null;
  fetchImpl: CodexModelsFetch;
}): Promise<CodexDiscoveryModel[] | null> {
  if (!accessToken) return null;

  try {
    const response = await fetchImpl(CODEX_MODELS_URL, {
      method: "GET",
      headers: {
        ...getCodexDefaultHeaders(),
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) return null;

    const models = normalizeCodexModelsResponse(await response.json());
    return models.length > 0 ? models : null;
  } catch {
    return null;
  }
}
