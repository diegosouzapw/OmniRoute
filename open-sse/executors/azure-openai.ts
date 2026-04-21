import { DefaultExecutor } from "./default.ts";
import type { ExecuteInput } from "./base.ts";
import { usesAzureApiKeyHeader } from "./azure-ai.ts";

type JsonRecord = Record<string, unknown>;

export const AZURE_OPENAI_DEFAULT_API_VERSION = "2024-10-21";
export const AZURE_OPENAI_RESPONSES_API_VERSION = "2025-03-01-preview";

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function normalizeBaseUrl(baseUrl: string | null | undefined): string {
  return typeof baseUrl === "string" ? baseUrl.trim().replace(/\/+$/, "") : "";
}

function readString(data: JsonRecord | null | undefined, ...keys: string[]): string {
  for (const key of keys) {
    const value = data?.[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
}

function parseMaybeRecord(value: unknown): JsonRecord {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as JsonRecord;
  }
  if (typeof value === "string" && value.trim().startsWith("{")) {
    try {
      return asRecord(JSON.parse(value));
    } catch {
      return {};
    }
  }
  return {};
}

function stripExtendedContextSuffix(model: string): string {
  return model.endsWith("[1m]") ? model.slice(0, -4) : model;
}

export function stripAzureOpenAIRegionalPrefix(model: string): string {
  const normalized = stripExtendedContextSuffix(String(model || "").trim());
  for (const prefix of ["global-standard/", "global/", "us/", "eu/"]) {
    if (normalized.startsWith(prefix)) {
      return normalized.slice(prefix.length);
    }
  }
  return normalized;
}

function getAzureOpenAIDeploymentMap(
  providerSpecificData: JsonRecord | null | undefined
): JsonRecord {
  const data = asRecord(providerSpecificData);
  for (const key of ["deploymentMap", "modelDeploymentMap", "deployments", "modelDeployments"]) {
    const parsed = parseMaybeRecord(data[key]);
    if (Object.keys(parsed).length > 0) {
      return parsed;
    }
  }
  return {};
}

export function resolveAzureOpenAIDeployment(
  model: string,
  providerSpecificData: JsonRecord | null | undefined
): string {
  const data = asRecord(providerSpecificData);
  const deploymentMap = getAzureOpenAIDeploymentMap(data);
  const rawModel = stripExtendedContextSuffix(String(model || "").trim());
  const normalizedModel = stripAzureOpenAIRegionalPrefix(rawModel);
  const candidates = Array.from(new Set([rawModel, normalizedModel].filter(Boolean)));

  for (const candidate of candidates) {
    const mapped = readString(deploymentMap, candidate);
    if (mapped) return mapped;
  }

  const explicitDeployment = readString(
    data,
    "deploymentName",
    "deployment",
    "azureDeployment",
    "azureDeploymentName"
  );
  if (explicitDeployment) return explicitDeployment;

  return normalizedModel || rawModel;
}

export function getAzureOpenAIBaseUrl(
  providerSpecificData: JsonRecord | null | undefined,
  fallbackBaseUrl = ""
): string {
  return (
    readString(providerSpecificData, "baseUrl", "apiBase", "endpoint") ||
    normalizeBaseUrl(process.env.AZURE_OPENAI_API_BASE) ||
    normalizeBaseUrl(process.env.AZURE_API_BASE) ||
    normalizeBaseUrl(fallbackBaseUrl)
  );
}

export function getAzureOpenAIApiTypeFromBody(body: unknown): "chat" | "responses" {
  if (!body || typeof body !== "object") return "chat";
  const data = body as JsonRecord;
  if (
    "input" in data ||
    "previous_response_id" in data ||
    "reasoning" in data ||
    "max_output_tokens" in data
  ) {
    return "responses";
  }
  return "chat";
}

export function getAzureOpenAIApiVersion(
  providerSpecificData: JsonRecord | null | undefined,
  apiType: "chat" | "responses" = "chat"
): string {
  const data = asRecord(providerSpecificData);
  if (apiType === "responses") {
    return (
      readString(
        data,
        "responsesApiVersion",
        "responses_api_version",
        "azureResponsesApiVersion"
      ) ||
      process.env.AZURE_RESPONSES_API_VERSION ||
      readString(data, "apiVersion", "api_version", "azureApiVersion") ||
      process.env.AZURE_API_VERSION ||
      AZURE_OPENAI_RESPONSES_API_VERSION
    );
  }

  return (
    readString(data, "apiVersion", "api_version", "azureApiVersion") ||
    process.env.AZURE_API_VERSION ||
    AZURE_OPENAI_DEFAULT_API_VERSION
  );
}

export function buildAzureOpenAIUrl({
  baseUrl,
  deployment,
  apiType = "chat",
  apiVersion,
}: {
  baseUrl: string;
  deployment: string;
  apiType?: "chat" | "responses";
  apiVersion?: string;
}): string {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";
  const resolvedApiVersion =
    apiVersion ||
    (apiType === "responses"
      ? AZURE_OPENAI_RESPONSES_API_VERSION
      : AZURE_OPENAI_DEFAULT_API_VERSION);

  const url = new URL(normalized);
  const pathname = url.pathname.replace(/\/+$/, "");
  const openAiMatch = pathname.match(
    /^(.*?\/openai)(?:\/deployments\/[^/]+(?:\/(?:chat\/completions|responses))?)?$/
  );
  const prefix = openAiMatch?.[1] || `${pathname || ""}/openai`;

  url.pathname = `${prefix}/deployments/${encodeURIComponent(deployment)}/${
    apiType === "responses" ? "responses" : "chat/completions"
  }`;
  if (resolvedApiVersion && !url.searchParams.has("api-version")) {
    url.searchParams.set("api-version", resolvedApiVersion);
  }

  return url.toString();
}

export function buildAzureOpenAIHeaders({
  apiKey,
  accessToken,
  baseUrl,
  stream = true,
}: {
  apiKey?: string | null;
  accessToken?: string | null;
  baseUrl?: string | null;
  stream?: boolean;
}): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: stream ? "text/event-stream" : "application/json",
  };

  if (apiKey) {
    if (usesAzureApiKeyHeader(baseUrl)) {
      headers["api-key"] = apiKey;
    } else {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }
  } else if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return headers;
}

export class AzureOpenAIExecutor extends DefaultExecutor {
  constructor(provider = "azure-openai") {
    super(provider);
  }

  buildUrl(
    model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials: ExecuteInput["credentials"] | null = null
  ): string {
    const providerSpecificData = asRecord(credentials?.providerSpecificData);
    const baseUrl = getAzureOpenAIBaseUrl(providerSpecificData, this.config.baseUrl);
    const apiType =
      readString(providerSpecificData, "_azureOpenAIApiType") === "responses"
        ? "responses"
        : "chat";
    const deployment = resolveAzureOpenAIDeployment(model, providerSpecificData);

    return buildAzureOpenAIUrl({
      baseUrl,
      deployment,
      apiType,
      apiVersion: getAzureOpenAIApiVersion(providerSpecificData, apiType),
    });
  }

  buildHeaders(credentials: ExecuteInput["credentials"], stream = true): Record<string, string> {
    const providerSpecificData = asRecord(credentials?.providerSpecificData);
    const baseUrl = getAzureOpenAIBaseUrl(providerSpecificData, this.config.baseUrl);

    return buildAzureOpenAIHeaders({
      apiKey: credentials?.apiKey || null,
      accessToken: credentials?.accessToken || null,
      baseUrl,
      stream,
    });
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ExecuteInput["credentials"] | null
  ): unknown {
    const transformed = super.transformRequest(model, body, stream, credentials);
    if (!transformed || typeof transformed !== "object") return transformed;

    const nextBody = { ...(transformed as JsonRecord) };
    delete nextBody.model;
    return nextBody;
  }

  async execute(input: ExecuteInput) {
    const apiType = getAzureOpenAIApiTypeFromBody(input.body);
    const providerSpecificData = {
      ...(input.credentials?.providerSpecificData || {}),
      _azureOpenAIApiType: apiType,
      _azureOpenAIActiveModel: input.model,
    };

    return super.execute({
      ...input,
      credentials: {
        ...input.credentials,
        providerSpecificData,
      },
    });
  }
}

export default AzureOpenAIExecutor;
