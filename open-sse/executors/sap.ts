import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import {
  BaseExecutor,
  applyConfiguredUserAgent,
  mergeUpstreamExtraHeaders,
  type ExecuteInput,
  type ProviderCredentials,
} from "./base.ts";
import { HTTP_STATUS, PROVIDERS } from "../config/constants.ts";

type JsonRecord = Record<string, unknown>;

type SapCredentials = {
  clientId: string;
  authUrl: string;
  baseUrl: string;
  resourceGroup: string;
  deploymentId?: string;
  deploymentUrl?: string;
  clientSecret?: string;
  certStr?: string;
  keyStr?: string;
  certFilePath?: string;
  keyFilePath?: string;
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function parseMaybeJsonRecord(value: unknown): JsonRecord {
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

function toNonEmptyString(value: unknown): string {
  return typeof value === "string" && value.trim() ? value.trim() : "";
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

function getNestedRecord(data: JsonRecord | null | undefined, key: string): JsonRecord {
  return asRecord(data?.[key]);
}

function getSapServiceKeyRecord(value: unknown): JsonRecord {
  const parsed = parseMaybeJsonRecord(value);
  return asRecord(
    parsed.credentials && typeof parsed.credentials === "object" ? parsed.credentials : parsed
  );
}

function normalizePem(value: string): string {
  return value.replace(/\\n/g, "\n").replace(/\r\n/g, "\n").trim();
}

function loadOptionalPem(path: string): string {
  return readFileSync(path, "utf8").replace(/\r\n/g, "\n").trim();
}

export function getSapBaseUrl(
  providerSpecificData: JsonRecord | null | undefined,
  fallbackBaseUrl = ""
): string {
  return (
    readString(providerSpecificData, "baseUrl", "apiBase", "endpoint", "deploymentUrl") ||
    normalizeBaseUrl(process.env.AICORE_BASE_URL) ||
    normalizeBaseUrl(fallbackBaseUrl)
  );
}

export function buildSapCompletionUrl({
  baseUrl,
  deploymentId,
}: {
  baseUrl: string;
  deploymentId?: string | null;
}): string {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";

  if (normalized.endsWith("/v2/completion")) {
    return normalized;
  }

  if (/\/v2\/inference\/deployments\/[^/]+$/.test(normalized)) {
    return `${normalized}/v2/completion`;
  }

  if (normalized.endsWith("/v2/inference/deployments") && deploymentId) {
    return `${normalized}/${encodeURIComponent(deploymentId)}/v2/completion`;
  }

  if (deploymentId) {
    return `${normalized}/v2/inference/deployments/${encodeURIComponent(deploymentId)}/v2/completion`;
  }

  return `${normalized}/v2/completion`;
}

export function parseSapCredentialInput(
  apiKey: unknown,
  providerSpecificData: JsonRecord | null | undefined
): SapCredentials | null {
  const providerData = asRecord(providerSpecificData);
  const serviceKey = getSapServiceKeyRecord(apiKey);
  const serviceUrls = getNestedRecord(serviceKey, "serviceurls");

  const clientId =
    readString(providerData, "clientId", "client_id") ||
    readString(serviceKey, "clientid", "client_id", "clientId") ||
    process.env.AICORE_CLIENT_ID ||
    "";
  const clientSecret =
    readString(providerData, "clientSecret", "client_secret") ||
    readString(serviceKey, "clientsecret", "client_secret", "clientSecret") ||
    process.env.AICORE_CLIENT_SECRET ||
    "";
  const authUrl =
    readString(providerData, "authUrl", "auth_url", "tokenUrl") ||
    readString(serviceKey, "url", "auth_url", "authUrl", "tokenUrl") ||
    process.env.AICORE_AUTH_URL ||
    "";
  const baseUrl =
    getSapBaseUrl(providerData) ||
    readString(serviceKey, "base_url", "baseUrl") ||
    readString(serviceUrls, "AI_API_URL") ||
    process.env.AICORE_BASE_URL ||
    "";
  const resourceGroup =
    readString(providerData, "resourceGroup", "resource_group") ||
    readString(serviceKey, "resource_group", "resourceGroup") ||
    process.env.AICORE_RESOURCE_GROUP ||
    "default";
  const deploymentId =
    readString(providerData, "deploymentId", "deployment_id") ||
    readString(serviceKey, "deployment_id", "deploymentId") ||
    "";
  const deploymentUrl =
    readString(providerData, "deploymentUrl", "deployment_url") ||
    readString(serviceKey, "deployment_url", "deploymentUrl") ||
    "";
  let certStr =
    readString(providerData, "certStr", "cert_str") ||
    readString(serviceKey, "certificate", "certStr", "cert_str") ||
    "";
  let keyStr =
    readString(providerData, "keyStr", "key_str") ||
    readString(serviceKey, "key", "keyStr", "key_str") ||
    "";
  const certFilePath =
    readString(providerData, "certFilePath", "cert_file_path") ||
    readString(serviceKey, "cert_file_path", "certFilePath") ||
    "";
  const keyFilePath =
    readString(providerData, "keyFilePath", "key_file_path") ||
    readString(serviceKey, "key_file_path", "keyFilePath") ||
    "";

  if (!certStr && certFilePath) {
    try {
      certStr = loadOptionalPem(certFilePath);
    } catch {
      return null;
    }
  }
  if (!keyStr && keyFilePath) {
    try {
      keyStr = loadOptionalPem(keyFilePath);
    } catch {
      return null;
    }
  }
  if (certStr) certStr = normalizePem(certStr);
  if (keyStr) keyStr = normalizePem(keyStr);

  if (!clientId || !authUrl || !baseUrl) {
    return null;
  }

  const usesSecret = Boolean(clientSecret);
  const usesCertPair = Boolean(certStr && keyStr);
  if (!usesSecret && !usesCertPair) {
    return null;
  }

  return {
    clientId,
    authUrl,
    baseUrl,
    resourceGroup,
    ...(deploymentId ? { deploymentId } : {}),
    ...(deploymentUrl ? { deploymentUrl } : {}),
    ...(clientSecret ? { clientSecret } : {}),
    ...(certStr ? { certStr } : {}),
    ...(keyStr ? { keyStr } : {}),
    ...(certFilePath ? { certFilePath } : {}),
    ...(keyFilePath ? { keyFilePath } : {}),
  };
}

function normalizeSapMessage(value: unknown): JsonRecord {
  const message = asRecord(value);
  const role = toNonEmptyString(message.role) || "user";

  if (role === "assistant") {
    return {
      role,
      content: typeof message.content === "string" ? message.content : "",
      refusal: "",
      tool_calls: Array.isArray(message.tool_calls) ? message.tool_calls : [],
    };
  }

  if (role === "tool") {
    return {
      role,
      tool_call_id: toNonEmptyString(message.tool_call_id),
      content: toNonEmptyString(message.content),
    };
  }

  if (role === "user" && Array.isArray(message.content)) {
    return {
      role,
      content: message.content
        .map((item) => asRecord(item))
        .filter((item) => {
          const type = toNonEmptyString(item.type);
          return type === "text" || type === "image_url";
        })
        .map((item) => {
          const type = toNonEmptyString(item.type);
          if (type === "text") {
            return { type: "text", text: toNonEmptyString(item.text) };
          }
          return {
            type: "image_url",
            image_url: {
              url:
                toNonEmptyString(asRecord(item.image_url).url) || toNonEmptyString(item.image_url),
              detail: toNonEmptyString(asRecord(item.image_url).detail) || "auto",
            },
          };
        }),
    };
  }

  return {
    role: role === "developer" ? "developer" : role === "system" ? "system" : "user",
    content:
      typeof message.content === "string" ? message.content : toNonEmptyString(message.content),
  };
}

function normalizeSapResponseFormat(value: unknown): JsonRecord | null {
  const format = asRecord(value);
  const type = toNonEmptyString(format.type);
  if (!type) return null;
  if (type === "json_schema") {
    return {
      type: "json_schema",
      json_schema: asRecord(format.json_schema),
    };
  }
  if (type === "json_object") {
    return { type: "json_object" };
  }
  return { type: "text" };
}

export function buildSapCompletionRequest(
  model: string,
  body: unknown,
  providerSpecificData: JsonRecord | null | undefined
): JsonRecord {
  const source = asRecord(body);
  const params: JsonRecord = {};
  const passthroughParams = [
    "frequency_penalty",
    "max_tokens",
    "n",
    "presence_penalty",
    "stop",
    "temperature",
    "top_p",
    "seed",
    "parallel_tool_calls",
  ] as const;

  for (const key of passthroughParams) {
    if (source[key] !== undefined) {
      params[key] = source[key];
    }
  }

  const request: JsonRecord = {
    config: {
      modules: {
        prompt_templating: {
          prompt: {
            template: Array.isArray(source.messages)
              ? source.messages.map((message) => normalizeSapMessage(message))
              : [],
            ...(Array.isArray(source.tools) && source.tools.length > 0
              ? { tools: source.tools }
              : {}),
            ...(normalizeSapResponseFormat(source.response_format)
              ? { response_format: normalizeSapResponseFormat(source.response_format) }
              : {}),
          },
          model: {
            name: model,
            version:
              readString(asRecord(providerSpecificData), "modelVersion", "model_version") ||
              toNonEmptyString(source.model_version) ||
              "latest",
            ...(Object.keys(params).length > 0 ? { params } : {}),
          },
        },
      },
    },
  };

  const placeholderValues = asRecord(source.placeholder_values);
  if (Object.keys(placeholderValues).length > 0) {
    request.placeholder_values = placeholderValues;
  }

  return request;
}

export function buildSapTokenRequestBody(credentials: SapCredentials): URLSearchParams {
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: credentials.clientId,
  });
  if (credentials.clientSecret) {
    body.set("client_secret", credentials.clientSecret);
  }
  return body;
}

export async function exchangeSapAccessToken(
  credentials: SapCredentials,
  signal?: AbortSignal | null
) {
  const body = buildSapTokenRequestBody(credentials);
  const init: RequestInit = {
    method: "POST",
    body,
    signal: signal || undefined,
  };

  if (credentials.certStr && credentials.keyStr) {
    const certBlob = new Blob([credentials.certStr], { type: "application/x-pem-file" });
    const keyBlob = new Blob([credentials.keyStr], { type: "application/x-pem-file" });
    const form = new FormData();
    form.set("grant_type", "client_credentials");
    form.set("client_id", credentials.clientId);
    form.set("cert", certBlob, "cert.pem");
    form.set("key", keyBlob, "key.pem");
    init.body = form;
  }

  const response = await fetch(credentials.authUrl, init);
  if (!response.ok) {
    throw new Error(`SAP token request failed with status ${response.status}`);
  }

  const payload = asRecord(await response.json());
  const accessToken = toNonEmptyString(payload.access_token);
  if (!accessToken) {
    throw new Error("SAP token response missing access_token");
  }

  return {
    accessToken: `Bearer ${accessToken}`,
    expiresAt: new Date(
      Date.now() +
        Math.max(60, (typeof payload.expires_in === "number" ? payload.expires_in : 3600) - 60) *
          1000
    ).toISOString(),
  };
}

function buildSyntheticSseResponse(
  model: string,
  payload: JsonRecord,
  status: number,
  statusText: string
) {
  const encoder = new TextEncoder();
  const responseId = toNonEmptyString(payload.id) || `chatcmpl-sap-${randomUUID()}`;
  const created =
    typeof payload.created === "number" ? payload.created : Math.floor(Date.now() / 1000);
  const choice = asRecord(Array.isArray(payload.choices) ? payload.choices[0] : null);
  const message = asRecord(choice.message);
  const text = toNonEmptyString(message.content);
  const finishReason = toNonEmptyString(choice.finish_reason) || "stop";
  const usage = asRecord(payload.usage);

  const stream = new ReadableStream({
    start(controller) {
      if (text) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              id: responseId,
              object: "chat.completion.chunk",
              created,
              model,
              choices: [
                {
                  index: 0,
                  delta: { role: "assistant", content: text },
                  finish_reason: null,
                },
              ],
            })}\n\n`
          )
        );
      }

      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            id: responseId,
            object: "chat.completion.chunk",
            created,
            model,
            choices: [{ index: 0, delta: {}, finish_reason: finishReason }],
            ...(Object.keys(usage).length > 0 ? { usage } : {}),
          })}\n\n`
        )
      );
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    status,
    statusText,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

function errorResponse(status: number, message: string) {
  return new Response(
    JSON.stringify({
      error: {
        message,
        type: status === HTTP_STATUS.UNAUTHORIZED ? "authentication_error" : "provider_error",
      },
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export class SapExecutor extends BaseExecutor {
  constructor(provider = "sap") {
    super(provider, PROVIDERS[provider] || { id: provider, baseUrl: "" });
  }

  buildHeaders(credentials: ProviderCredentials): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "AI-Client-Type": "OmniRoute",
    };
    if (credentials.accessToken) {
      headers.Authorization = credentials.accessToken;
    }
    applyConfiguredUserAgent(headers, credentials?.providerSpecificData || null);
    return headers;
  }

  buildUrl(
    _model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ) {
    const parsedCredentials = parseSapCredentialInput(
      credentials?.apiKey || credentials?.accessToken || null,
      asRecord(credentials?.providerSpecificData)
    );
    if (!parsedCredentials) return "";

    const providerSpecificData = asRecord(credentials?.providerSpecificData);
    const baseUrl =
      parsedCredentials.deploymentUrl ||
      getSapBaseUrl(providerSpecificData, parsedCredentials.baseUrl || this.config.baseUrl);
    return buildSapCompletionUrl({
      baseUrl,
      deploymentId:
        parsedCredentials.deploymentId || readString(providerSpecificData, "deploymentId"),
    });
  }

  transformRequest(
    model: string,
    body: unknown,
    _stream: boolean,
    credentials: ProviderCredentials
  ) {
    return buildSapCompletionRequest(model, body, asRecord(credentials?.providerSpecificData));
  }

  async execute({
    model,
    body,
    stream,
    credentials,
    signal,
    upstreamExtraHeaders,
    onCredentialsRefreshed,
  }: ExecuteInput) {
    const parsedCredentials = parseSapCredentialInput(
      credentials?.apiKey || credentials?.accessToken || null,
      asRecord(credentials?.providerSpecificData)
    );

    if (!parsedCredentials) {
      return {
        response: errorResponse(
          HTTP_STATUS.UNAUTHORIZED,
          "SAP credentials must include clientId, authUrl, baseUrl and either clientSecret or certificate credentials"
        ),
        url: "",
        headers: {},
        transformedBody: body,
      };
    }

    let activeCredentials: ProviderCredentials = { ...credentials };
    if (!toNonEmptyString(activeCredentials.accessToken)) {
      try {
        const refreshed = await exchangeSapAccessToken(parsedCredentials, signal);
        activeCredentials = { ...activeCredentials, ...refreshed };
        if (onCredentialsRefreshed) {
          await onCredentialsRefreshed(refreshed);
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        if (err.name === "AbortError") {
          throw err;
        }
        return {
          response: errorResponse(HTTP_STATUS.UNAUTHORIZED, err.message),
          url: "",
          headers: {},
          transformedBody: body,
        };
      }
    }

    const url = this.buildUrl(model, false, 0, activeCredentials);
    const transformedBody = this.transformRequest(model, body, false, activeCredentials);
    const bodyString = JSON.stringify(transformedBody);
    const headers = this.buildHeaders(activeCredentials);
    headers["AI-Resource-Group"] = parsedCredentials.resourceGroup;
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);

    let response: Response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers,
        body: bodyString,
        signal: signal || undefined,
      });
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      if (err.name === "AbortError") {
        throw err;
      }
      return {
        response: errorResponse(HTTP_STATUS.BAD_GATEWAY, `SAP fetch error: ${err.message}`),
        url,
        headers,
        transformedBody,
      };
    }

    if (!response.ok) {
      return { response, url, headers, transformedBody };
    }

    let jsonPayload: JsonRecord;
    try {
      jsonPayload = asRecord(await response.json());
    } catch {
      return {
        response: errorResponse(
          HTTP_STATUS.BAD_GATEWAY,
          "SAP returned a non-JSON response for v2/completion"
        ),
        url,
        headers,
        transformedBody,
      };
    }

    const finalResult = asRecord(jsonPayload.final_result);
    const translated: JsonRecord =
      Object.keys(finalResult).length > 0
        ? {
            ...finalResult,
            ...(toNonEmptyString(finalResult.model) ? {} : { model }),
          }
        : {
            id: `chatcmpl-sap-${randomUUID()}`,
            object: "chat.completion",
            created: Math.floor(Date.now() / 1000),
            model,
            choices: [
              { index: 0, message: { role: "assistant", content: null }, finish_reason: "stop" },
            ],
          };

    const responseModel = toNonEmptyString(translated.model) || model;
    const finalResponse = stream
      ? buildSyntheticSseResponse(responseModel, translated, response.status, response.statusText)
      : new Response(JSON.stringify(translated), {
          status: response.status,
          statusText: response.statusText,
          headers: { "Content-Type": "application/json" },
        });

    return {
      response: finalResponse,
      url,
      headers,
      transformedBody,
    };
  }
}

export default SapExecutor;
