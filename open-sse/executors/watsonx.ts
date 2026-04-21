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

export const WATSONX_DEFAULT_API_VERSION = "2024-05-31";
export const WATSONX_DEFAULT_IAM_URL = "https://iam.cloud.ibm.com/identity/token";

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
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

function parseCreatedAt(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim()) {
    const parsed = Date.parse(value);
    if (Number.isFinite(parsed)) {
      return Math.floor(parsed / 1000);
    }
  }
  return Math.floor(Date.now() / 1000);
}

function normalizeToolCalls(value: unknown): JsonRecord[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => asRecord(item))
    .filter((toolCall) => {
      const fn = asRecord(toolCall.function);
      return Boolean(toNonEmptyString(fn.name));
    })
    .map((toolCall) => {
      const fn = asRecord(toolCall.function);
      return {
        id: toNonEmptyString(toolCall.id) || `chatcmpl-tool-${randomUUID()}`,
        type: "function",
        function: {
          name: toNonEmptyString(fn.name),
          arguments:
            typeof fn.arguments === "string" ? fn.arguments : JSON.stringify(fn.arguments || {}),
        },
      };
    });
}

function normalizeMessageContentBlock(item: unknown): JsonRecord | null {
  const block = asRecord(item);
  const type = toNonEmptyString(block.type);

  if ((type === "text" || type === "input_text") && toNonEmptyString(block.text)) {
    return { type: "text", text: toNonEmptyString(block.text) };
  }

  if (type === "image_url") {
    const imageUrl = toNonEmptyString(block.image_url)
      ? toNonEmptyString(block.image_url)
      : toNonEmptyString(asRecord(block.image_url).url);
    if (imageUrl) {
      return { type: "image_url", image_url: { url: imageUrl } };
    }
  }

  if (type === "input_image") {
    const imageUrl =
      toNonEmptyString(block.url) ||
      toNonEmptyString(block.image_url) ||
      toNonEmptyString(asRecord(block.image_url).url);
    if (imageUrl) {
      return { type: "image_url", image_url: { url: imageUrl } };
    }
  }

  if (type && Object.keys(block).length > 0) {
    return block;
  }

  return null;
}

function normalizeMessageContent(
  content: unknown,
  role: string
): string | JsonRecord[] | null | undefined {
  if (typeof content === "string") {
    if (role === "tool") {
      return content ? [{ type: "text", text: content }] : [];
    }
    return content;
  }

  if (!Array.isArray(content)) {
    return role === "assistant" ? undefined : null;
  }

  const blocks = content
    .map((item) => normalizeMessageContentBlock(item))
    .filter((item): item is JsonRecord => item !== null);

  if (blocks.length > 0) {
    return blocks;
  }

  return role === "assistant" ? undefined : [];
}

function normalizeWatsonxMessage(value: unknown): JsonRecord {
  const message = asRecord(value);
  const role = toNonEmptyString(message.role) || "user";
  const normalized: JsonRecord = { role };

  const content = normalizeMessageContent(message.content, role);
  if (content !== undefined) {
    normalized.content = content;
  }

  if (role === "tool") {
    const toolCallId = toNonEmptyString(message.tool_call_id);
    if (toolCallId) {
      normalized.tool_call_id = toolCallId;
    }
  }

  const toolCalls = normalizeToolCalls(message.tool_calls);
  if (toolCalls.length > 0) {
    normalized.tool_calls = toolCalls;
  }

  return normalized;
}

function normalizeAssistantContent(content: unknown): string | JsonRecord[] | null {
  if (typeof content === "string") {
    return content;
  }

  if (!Array.isArray(content)) {
    return null;
  }

  const blocks = content
    .map((item) => normalizeMessageContentBlock(item))
    .filter((item): item is JsonRecord => item !== null);

  if (blocks.length === 0) {
    return null;
  }

  const allText = blocks.every((block) => block.type === "text" && typeof block.text === "string");
  if (allText) {
    return blocks.map((block) => String(block.text || "")).join("\n");
  }

  return blocks;
}

function extractAssistantText(content: unknown): string {
  const normalized = normalizeAssistantContent(content);
  if (typeof normalized === "string") {
    return normalized;
  }
  if (!Array.isArray(normalized)) {
    return "";
  }
  return normalized
    .filter((block) => block.type === "text" && typeof block.text === "string")
    .map((block) => String(block.text || ""))
    .join("\n");
}

export function getWatsonxBaseUrl(
  providerSpecificData: JsonRecord | null | undefined,
  fallbackBaseUrl = ""
): string {
  return (
    readString(providerSpecificData, "baseUrl", "apiBase", "endpoint", "url") ||
    normalizeBaseUrl(process.env.WATSONX_API_BASE) ||
    normalizeBaseUrl(process.env.WATSONX_URL) ||
    normalizeBaseUrl(process.env.WX_URL) ||
    normalizeBaseUrl(process.env.WML_URL) ||
    normalizeBaseUrl(fallbackBaseUrl)
  );
}

export function getWatsonxApiVersion(providerSpecificData: JsonRecord | null | undefined): string {
  return (
    readString(providerSpecificData, "apiVersion", "api_version", "watsonxApiVersion") ||
    process.env.WATSONX_API_VERSION ||
    WATSONX_DEFAULT_API_VERSION
  );
}

export function getWatsonxIamUrl(providerSpecificData: JsonRecord | null | undefined): string {
  return (
    readString(providerSpecificData, "iamUrl", "tokenUrl", "authUrl") ||
    normalizeBaseUrl(process.env.WATSONX_IAM_URL) ||
    WATSONX_DEFAULT_IAM_URL
  );
}

export function resolveWatsonxProjectId(
  providerSpecificData: JsonRecord | null | undefined
): string {
  return (
    readString(
      providerSpecificData,
      "projectId",
      "project_id",
      "watsonxProject",
      "watsonx_project"
    ) ||
    process.env.WATSONX_PROJECT_ID ||
    process.env.WX_PROJECT_ID ||
    ""
  );
}

export function resolveWatsonxSpaceId(providerSpecificData: JsonRecord | null | undefined): string {
  return (
    readString(providerSpecificData, "spaceId", "space_id", "watsonxSpace", "watsonx_space") ||
    process.env.WATSONX_SPACE_ID ||
    process.env.WATSONX_DEPLOYMENT_SPACE_ID ||
    process.env.WX_SPACE_ID ||
    ""
  );
}

export function getWatsonxDeploymentId(
  model: string,
  providerSpecificData: JsonRecord | null | undefined = null
): string {
  const normalizedModel = String(model || "").trim();
  if (normalizedModel.startsWith("deployment/")) {
    return normalizedModel.slice("deployment/".length);
  }

  return readString(providerSpecificData, "deploymentId", "deployment_id", "deploymentName");
}

export function buildWatsonxUrl({
  baseUrl,
  model,
  stream = false,
  apiVersion,
}: {
  baseUrl: string;
  model: string;
  stream?: boolean;
  apiVersion?: string;
}): string {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";

  const url = new URL(normalized);
  const pathname = url.pathname.replace(/\/+$/, "");
  const mlPrefixMatch = pathname.match(/^(.*?\/ml\/v1)(?:\/.*)?$/);
  const prefix = mlPrefixMatch?.[1] || `${pathname || ""}/ml/v1`;
  const deploymentId = getWatsonxDeploymentId(model);

  url.pathname = deploymentId
    ? `${prefix}/deployments/${encodeURIComponent(deploymentId)}/text/chat${stream ? "_stream" : ""}`
    : `${prefix}/text/chat${stream ? "_stream" : ""}`;

  const resolvedApiVersion = apiVersion || WATSONX_DEFAULT_API_VERSION;
  if (resolvedApiVersion && !url.searchParams.has("version")) {
    url.searchParams.set("version", resolvedApiVersion);
  }

  return url.toString();
}

export function buildWatsonxIamRequestBody(apiKey: string): string {
  return new URLSearchParams({
    grant_type: "urn:ibm:params:oauth:grant-type:apikey",
    apikey: apiKey,
  }).toString();
}

export function buildWatsonxRequestBody(
  model: string,
  body: unknown,
  providerSpecificData: JsonRecord | null | undefined
): JsonRecord {
  const source = asRecord(body);
  const payload: JsonRecord = {
    messages: Array.isArray(source.messages)
      ? source.messages.map((message) => normalizeWatsonxMessage(message))
      : [],
  };

  if (!getWatsonxDeploymentId(model, providerSpecificData)) {
    payload.model_id = String(model || "").trim();
    const projectId = resolveWatsonxProjectId(providerSpecificData);
    const spaceId = resolveWatsonxSpaceId(providerSpecificData);
    if (projectId) {
      payload.project_id = projectId;
    } else if (spaceId) {
      payload.space_id = spaceId;
    }
  }

  if (Array.isArray(source.tools) && source.tools.length > 0) {
    payload.tools = source.tools;
  }

  const toolChoice = source.tool_choice;
  if (typeof toolChoice === "string") {
    payload.tool_choice_option = toolChoice;
  } else if (toolChoice && typeof toolChoice === "object") {
    payload.tool_choice = toolChoice;
  }

  const passthroughKeys = [
    "temperature",
    "top_p",
    "max_tokens",
    "frequency_penalty",
    "presence_penalty",
    "seed",
    "stop",
    "n",
    "logprobs",
    "top_logprobs",
    "response_format",
    "reasoning_effort",
    "time_limit",
    "metadata",
    "parallel_tool_calls",
  ] as const;

  for (const key of passthroughKeys) {
    if (source[key] !== undefined) {
      payload[key] = source[key];
    }
  }

  return payload;
}

export function translateWatsonxResponseToOpenAI(model: string, payload: unknown): JsonRecord {
  const data = asRecord(payload);
  const rawChoices = Array.isArray(data.choices)
    ? data.choices.map((choice) => asRecord(choice))
    : [];
  const choices =
    rawChoices.length > 0
      ? rawChoices.map((choice, index) => {
          const message = asRecord(choice.message);
          const toolCalls = normalizeToolCalls(message.tool_calls);
          return {
            index: typeof choice.index === "number" ? choice.index : index,
            message: {
              role: toNonEmptyString(message.role) || "assistant",
              content: normalizeAssistantContent(message.content),
              ...(toolCalls.length > 0 ? { tool_calls: toolCalls } : {}),
            },
            finish_reason:
              toNonEmptyString(choice.finish_reason) ||
              (toolCalls.length > 0 ? "tool_calls" : "stop"),
          };
        })
      : [
          {
            index: 0,
            message: { role: "assistant", content: null },
            finish_reason: "stop",
          },
        ];

  const usageSource = asRecord(data.usage);
  const promptTokens =
    typeof usageSource.prompt_tokens === "number"
      ? usageSource.prompt_tokens
      : typeof usageSource.input_tokens === "number"
        ? usageSource.input_tokens
        : 0;
  const completionTokens =
    typeof usageSource.completion_tokens === "number"
      ? usageSource.completion_tokens
      : typeof usageSource.output_tokens === "number"
        ? usageSource.output_tokens
        : 0;
  const totalTokens =
    typeof usageSource.total_tokens === "number"
      ? usageSource.total_tokens
      : promptTokens + completionTokens;

  return {
    id: toNonEmptyString(data.id) || `chatcmpl-watsonx-${randomUUID()}`,
    object: toNonEmptyString(data.object) || "chat.completion",
    created: parseCreatedAt(data.created_at ?? data.created),
    model: toNonEmptyString(data.model) || toNonEmptyString(data.model_id) || model,
    choices,
    usage: {
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: totalTokens,
    },
  };
}

async function exchangeWatsonxIamToken(
  apiKey: string,
  providerSpecificData: JsonRecord | null | undefined,
  signal?: AbortSignal | null
) {
  const tokenUrl = getWatsonxIamUrl(providerSpecificData);
  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: buildWatsonxIamRequestBody(apiKey),
    signal: signal || undefined,
  });

  if (!response.ok) {
    throw new Error(`IBM WatsonX IAM token exchange failed with status ${response.status}`);
  }

  const payload = asRecord(await response.json());
  const accessToken = toNonEmptyString(payload.access_token);
  if (!accessToken) {
    throw new Error("IBM WatsonX IAM token response missing access_token");
  }

  const expiresIn =
    typeof payload.expires_in === "number" && Number.isFinite(payload.expires_in)
      ? Math.max(60, payload.expires_in)
      : 3600;

  return {
    accessToken,
    expiresAt: new Date(Date.now() + Math.max(60, expiresIn - 60) * 1000).toISOString(),
  };
}

function buildSyntheticSseResponse(
  model: string,
  payload: JsonRecord,
  status: number,
  statusText: string
) {
  const encoder = new TextEncoder();
  const responseId = toNonEmptyString(payload.id) || `chatcmpl-watsonx-${randomUUID()}`;
  const created =
    typeof payload.created === "number" ? payload.created : Math.floor(Date.now() / 1000);
  const choice = asRecord(Array.isArray(payload.choices) ? payload.choices[0] : null);
  const message = asRecord(choice.message);
  const text = extractAssistantText(message.content);
  const toolCalls = normalizeToolCalls(message.tool_calls);
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

      for (const [index, toolCall] of toolCalls.entries()) {
        const fn = asRecord(toolCall.function);
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
                  delta: {
                    ...(text ? {} : { role: "assistant" }),
                    tool_calls: [
                      {
                        index,
                        id: toNonEmptyString(toolCall.id) || `chatcmpl-tool-${randomUUID()}`,
                        type: "function",
                        function: {
                          name: toNonEmptyString(fn.name),
                          arguments: toNonEmptyString(fn.arguments),
                        },
                      },
                    ],
                  },
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

export class WatsonxExecutor extends BaseExecutor {
  constructor(provider = "watsonx") {
    super(provider, PROVIDERS[provider] || { id: provider, baseUrl: "" });
  }

  buildHeaders(credentials: ProviderCredentials): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    const bearerToken = credentials?.accessToken || credentials?.apiKey;
    if (bearerToken) {
      headers.Authorization = `Bearer ${bearerToken}`;
    }
    applyConfiguredUserAgent(headers, credentials?.providerSpecificData || null);
    return headers;
  }

  buildUrl(
    model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ) {
    const providerSpecificData = asRecord(credentials?.providerSpecificData);
    const baseUrl = getWatsonxBaseUrl(providerSpecificData, this.config.baseUrl);
    return buildWatsonxUrl({
      baseUrl,
      model,
      stream: false,
      apiVersion: getWatsonxApiVersion(providerSpecificData),
    });
  }

  transformRequest(
    model: string,
    body: unknown,
    _stream: boolean,
    credentials: ProviderCredentials
  ): JsonRecord {
    return buildWatsonxRequestBody(model, body, asRecord(credentials?.providerSpecificData));
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
    const providerSpecificData = asRecord(credentials?.providerSpecificData);
    let activeCredentials: ProviderCredentials = { ...credentials };

    if (!toNonEmptyString(activeCredentials.accessToken)) {
      const explicitToken =
        readString(providerSpecificData, "accessToken", "token", "watsonxToken") ||
        toNonEmptyString(credentials?.accessToken);

      if (explicitToken) {
        activeCredentials = { ...activeCredentials, accessToken: explicitToken };
      } else if (toNonEmptyString(credentials?.apiKey)) {
        try {
          const refreshed = await exchangeWatsonxIamToken(
            toNonEmptyString(credentials.apiKey),
            providerSpecificData,
            signal
          );
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
      } else {
        return {
          response: errorResponse(
            HTTP_STATUS.UNAUTHORIZED,
            "IBM WatsonX requires an API key or IAM access token"
          ),
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
        response: errorResponse(HTTP_STATUS.BAD_GATEWAY, `IBM WatsonX fetch error: ${err.message}`),
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
          "IBM WatsonX returned a non-JSON response for text/chat"
        ),
        url,
        headers,
        transformedBody,
      };
    }

    const translated = translateWatsonxResponseToOpenAI(model, jsonPayload);
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

export default WatsonxExecutor;
