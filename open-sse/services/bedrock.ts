import {
  buildBedrockNativeInferenceProfilesUrl,
  buildBedrockNativeModelsUrl,
  normalizeBedrockDiscoveredModels,
  resolveBedrockRegion,
  type BedrockDiscoveredModel,
} from "../config/bedrock.ts";

export type BedrockNativeFetch = (url: string, init: RequestInit) => Promise<Response>;

export type BedrockNativeDiscoveryResult = {
  region: string;
  models: BedrockDiscoveredModel[];
  foundationModelsResponse: unknown;
  inferenceProfilesResponse: unknown;
  warnings: string[];
};

export class BedrockNativeApiError extends Error {
  readonly status: number | null;
  readonly url: string;
  readonly body: unknown;

  constructor(message: string, options: { status?: number | null; url: string; body?: unknown }) {
    super(message);
    this.name = "BedrockNativeApiError";
    this.status = typeof options.status === "number" ? options.status : null;
    this.url = options.url;
    this.body = options.body ?? null;
  }
}

export function isBedrockNativeApiError(error: unknown): error is BedrockNativeApiError {
  return error instanceof BedrockNativeApiError;
}

export function isBedrockNativeAuthError(error: unknown): boolean {
  return isBedrockNativeApiError(error) && (error.status === 401 || error.status === 403);
}

export function buildBedrockNativeHeaders(
  apiKey: string | null | undefined,
  extraHeaders: Record<string, string> = {}
): Record<string, string> {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(apiKey ? { Authorization: "Bearer " + apiKey } : {}),
    ...extraHeaders,
  };
}

async function readJsonOrText(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function getErrorMessage(body: unknown, fallback: string): string {
  if (body && typeof body === "object") {
    const record = body as Record<string, unknown>;
    const message = record.message || record.Message || record.error || record.errorMessage;
    if (typeof message === "string" && message.trim()) return message.trim();
  }
  if (typeof body === "string" && body.trim()) return body.trim();
  return fallback;
}

async function fetchBedrockJson(
  fetcher: BedrockNativeFetch,
  url: string,
  apiKey: string,
  init: RequestInit = {}
): Promise<unknown> {
  const headers = buildBedrockNativeHeaders(apiKey, {
    ...((init.headers as Record<string, string> | undefined) || {}),
  });
  const response = await fetcher(url, {
    ...init,
    method: init.method || "GET",
    headers,
  });
  const body = await readJsonOrText(response);

  if (!response.ok) {
    throw new BedrockNativeApiError(
      getErrorMessage(body, "Bedrock API request failed with " + response.status),
      { status: response.status, url, body }
    );
  }

  return body;
}

async function fetchInferenceProfiles(
  fetcher: BedrockNativeFetch,
  region: string,
  apiKey: string
): Promise<{ inferenceProfileSummaries: unknown[] }> {
  const summaries: unknown[] = [];
  let nextToken: string | null = null;

  do {
    const data = await fetchBedrockJson(
      fetcher,
      buildBedrockNativeInferenceProfilesUrl(region, { nextToken }),
      apiKey
    );
    const record = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
    const pageSummaries = Array.isArray(record.inferenceProfileSummaries)
      ? record.inferenceProfileSummaries
      : [];
    summaries.push(...pageSummaries);
    nextToken = typeof record.nextToken === "string" && record.nextToken ? record.nextToken : null;
  } while (nextToken);

  return { inferenceProfileSummaries: summaries };
}

export async function discoverBedrockNativeModels({
  apiKey,
  providerSpecificData,
  fetcher = fetch,
}: {
  apiKey: string;
  providerSpecificData?: unknown;
  fetcher?: BedrockNativeFetch;
}): Promise<BedrockNativeDiscoveryResult> {
  const region = resolveBedrockRegion(providerSpecificData);
  const foundationModelsResponse = await fetchBedrockJson(
    fetcher,
    buildBedrockNativeModelsUrl(region),
    apiKey
  );

  let inferenceProfilesResponse: unknown = { inferenceProfileSummaries: [] };
  const warnings: string[] = [];

  try {
    inferenceProfilesResponse = await fetchInferenceProfiles(fetcher, region, apiKey);
  } catch (error) {
    if (isBedrockNativeAuthError(error)) {
      throw error;
    }
    const message = error instanceof Error ? error.message : String(error || "unknown error");
    warnings.push("Bedrock inference profiles unavailable: " + message);
  }

  return {
    region,
    foundationModelsResponse,
    inferenceProfilesResponse,
    models: normalizeBedrockDiscoveredModels(foundationModelsResponse, inferenceProfilesResponse),
    warnings,
  };
}
