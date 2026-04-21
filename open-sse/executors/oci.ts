import { readFileSync } from "node:fs";
import { createHash, createSign, randomUUID } from "node:crypto";
import {
  BaseExecutor,
  applyConfiguredUserAgent,
  mergeUpstreamExtraHeaders,
  type ExecuteInput,
  type ProviderCredentials,
} from "./base.ts";
import { HTTP_STATUS, PROVIDERS } from "../config/constants.ts";

type JsonRecord = Record<string, unknown>;

type OciCredentials = {
  user: string;
  fingerprint: string;
  tenancy: string;
  privateKey: string;
  compartmentId: string;
  region: string;
  servingType: "ON_DEMAND" | "DEDICATED";
  endpointId?: string;
};

type OciVendor = "COHERE" | "GENERIC";

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

function getStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === "string" && item.trim()) as string[];
  }
  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }
  return [];
}

function getOciVendor(model: string): OciVendor {
  return model.toLowerCase().startsWith("cohere.") ? "COHERE" : "GENERIC";
}

function readPrivateKeyFromPath(path: string): string {
  const raw = readFileSync(path, "utf8");
  return raw.replace(/\r\n/g, "\n").trim();
}

function normalizePrivateKey(value: string): string {
  return value.replace(/\\n/g, "\n").replace(/\r\n/g, "\n").trim();
}

function extractRegionFromBaseUrl(baseUrl: string): string {
  const match = normalizeBaseUrl(baseUrl).match(
    /inference\.generativeai\.([a-z0-9-]+)\.oci\.oraclecloud\.com/i
  );
  return match?.[1] || "";
}

export function getOciBaseUrl(
  providerSpecificData: JsonRecord | null | undefined,
  region = "us-chicago-1",
  fallbackBaseUrl = ""
): string {
  const explicit =
    readString(providerSpecificData, "baseUrl", "endpoint", "apiBase") ||
    normalizeBaseUrl(process.env.OCI_API_BASE) ||
    normalizeBaseUrl(fallbackBaseUrl);

  if (explicit) {
    return explicit;
  }

  return `https://inference.generativeai.${region}.oci.oraclecloud.com/20231130/actions/chat`;
}

export function buildOciUrl(baseUrl: string): string {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";

  const url = new URL(normalized);
  const pathname = url.pathname.replace(/\/+$/, "");
  const prefix = pathname.replace(/\/20231130\/actions\/chat$/, "").replace(/\/$/, "");
  url.pathname = `${prefix || ""}/20231130/actions/chat`.replace(/\/{2,}/g, "/");
  return url.toString();
}

export function parseOciCredentialInput(
  apiKey: unknown,
  providerSpecificData: JsonRecord | null | undefined
): OciCredentials | null {
  const parsedKey = parseMaybeJsonRecord(apiKey);
  const providerData = asRecord(providerSpecificData);

  const user =
    readString(providerData, "ociUser", "user", "userOcid") ||
    readString(parsedKey, "ociUser", "user", "userOcid") ||
    process.env.OCI_USER ||
    "";
  const fingerprint =
    readString(providerData, "ociFingerprint", "fingerprint") ||
    readString(parsedKey, "ociFingerprint", "fingerprint") ||
    process.env.OCI_FINGERPRINT ||
    "";
  const tenancy =
    readString(providerData, "ociTenancy", "tenancy", "tenancyOcid") ||
    readString(parsedKey, "ociTenancy", "tenancy", "tenancyOcid") ||
    process.env.OCI_TENANCY ||
    "";
  const compartmentId =
    readString(providerData, "ociCompartmentId", "compartmentId", "compartmentOCID") ||
    readString(parsedKey, "ociCompartmentId", "compartmentId", "compartmentOCID") ||
    process.env.OCI_COMPARTMENT_ID ||
    "";

  let privateKey =
    readString(providerData, "ociKey", "privateKey", "key") ||
    readString(parsedKey, "ociKey", "privateKey", "key") ||
    process.env.OCI_KEY ||
    "";
  const privateKeyFile =
    readString(providerData, "ociKeyFile", "privateKeyFile", "keyFile") ||
    readString(parsedKey, "ociKeyFile", "privateKeyFile", "keyFile") ||
    process.env.OCI_KEY_FILE ||
    "";

  if (!privateKey && privateKeyFile) {
    try {
      privateKey = readPrivateKeyFromPath(privateKeyFile);
    } catch {
      return null;
    }
  }

  if (privateKey) {
    privateKey = normalizePrivateKey(privateKey);
  }

  const fallbackBaseUrl = getOciBaseUrl(providerData, "us-chicago-1");
  const inferredRegion = extractRegionFromBaseUrl(fallbackBaseUrl) || "us-chicago-1";
  const region =
    readString(providerData, "ociRegion", "region") ||
    readString(parsedKey, "ociRegion", "region") ||
    process.env.OCI_REGION ||
    inferredRegion;

  const servingType =
    readString(providerData, "ociServingMode", "servingType").toUpperCase() === "DEDICATED"
      ? "DEDICATED"
      : "ON_DEMAND";
  const endpointId =
    readString(providerData, "ociEndpointId", "endpointId") ||
    readString(parsedKey, "ociEndpointId", "endpointId") ||
    "";

  if (!user || !fingerprint || !tenancy || !privateKey || !compartmentId) {
    return null;
  }

  return {
    user,
    fingerprint,
    tenancy,
    privateKey,
    compartmentId,
    region,
    servingType,
    ...(endpointId ? { endpointId } : {}),
  };
}

function normalizeGenericMessageContent(content: unknown): JsonRecord[] {
  if (typeof content === "string") {
    return [{ type: "TEXT", text: content }];
  }
  if (!Array.isArray(content)) {
    return [];
  }

  const items: JsonRecord[] = [];
  for (const rawItem of content) {
    const item = asRecord(rawItem);
    const type = toNonEmptyString(item.type);
    if ((type === "text" || type === "input_text") && toNonEmptyString(item.text)) {
      items.push({ type: "TEXT", text: toNonEmptyString(item.text) });
      continue;
    }
    if (type === "image_url") {
      const imageUrl = toNonEmptyString(item.image_url)
        ? toNonEmptyString(item.image_url)
        : toNonEmptyString(asRecord(item.image_url).url);
      if (imageUrl) {
        items.push({
          type: "IMAGE",
          imageUrl: {
            url: imageUrl,
          },
        });
      }
    }
  }

  return items;
}

function adaptMessagesToGenericOci(messages: unknown[]): JsonRecord[] {
  const roleMap: Record<string, string> = {
    system: "SYSTEM",
    user: "USER",
    assistant: "ASSISTANT",
    tool: "TOOL",
  };

  return messages.flatMap((rawMessage) => {
    const message = asRecord(rawMessage);
    const role = toNonEmptyString(message.role).toLowerCase();
    if (!roleMap[role]) return [];

    if (role === "assistant" && Array.isArray(message.tool_calls)) {
      return [
        {
          role: roleMap[role],
          toolCalls: message.tool_calls
            .map((toolCall) => asRecord(toolCall))
            .filter((toolCall) => toNonEmptyString(asRecord(toolCall.function).name))
            .map((toolCall) => ({
              id: toNonEmptyString(toolCall.id) || `call_${randomUUID()}`,
              type: "FUNCTION",
              name: toNonEmptyString(asRecord(toolCall.function).name),
              arguments:
                typeof asRecord(toolCall.function).arguments === "string"
                  ? asRecord(toolCall.function).arguments
                  : JSON.stringify(asRecord(toolCall.function).arguments || {}),
            })),
        },
      ];
    }

    if (role === "tool") {
      return [
        {
          role: roleMap[role],
          toolCallId: toNonEmptyString(message.tool_call_id),
          content: [{ type: "TEXT", text: toNonEmptyString(message.content) }],
        },
      ];
    }

    return [
      {
        role: roleMap[role],
        content: normalizeGenericMessageContent(message.content),
      },
    ];
  });
}

function extractTextContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";

  return content
    .map((item) => asRecord(item))
    .filter((item) => item.type === "text" || item.type === "input_text")
    .map((item) => toNonEmptyString(item.text))
    .join("");
}

function adaptMessagesToCohereHistory(messages: unknown[]): JsonRecord[] {
  return messages.slice(0, -1).flatMap((rawMessage) => {
    const message = asRecord(rawMessage);
    const role = toNonEmptyString(message.role).toLowerCase();
    const content = extractTextContent(
      message.content || message.content === "" ? message.content : ""
    );

    if (role === "user") {
      return [{ role: "USER", message: content }];
    }
    if (role === "assistant") {
      const toolCalls = Array.isArray(message.tool_calls)
        ? message.tool_calls
            .map((toolCall) => asRecord(toolCall))
            .filter((toolCall) => toNonEmptyString(asRecord(toolCall.function).name))
            .map((toolCall) => ({
              name: toNonEmptyString(asRecord(toolCall.function).name),
              parameters: (() => {
                const rawArguments = asRecord(toolCall.function).arguments;
                if (typeof rawArguments === "string") {
                  try {
                    return asRecord(JSON.parse(rawArguments));
                  } catch {
                    return {};
                  }
                }
                return asRecord(rawArguments);
              })(),
            }))
        : undefined;

      return [{ role: "CHATBOT", message: content, ...(toolCalls?.length ? { toolCalls } : {}) }];
    }
    if (role === "tool") {
      return [
        { role: "TOOL", message: content, toolCallId: toNonEmptyString(message.tool_call_id) },
      ];
    }
    return [];
  });
}

function adaptToolDefinitionsToGenericOci(tools: unknown[]): JsonRecord[] {
  return tools
    .map((tool) => asRecord(tool))
    .filter((tool) => toNonEmptyString(tool.type || "function") === "function")
    .map((tool) => {
      const fn = asRecord(tool.function);
      return {
        type: "FUNCTION",
        name: toNonEmptyString(fn.name),
        description: toNonEmptyString(fn.description),
        parameters: asRecord(fn.parameters),
      };
    })
    .filter((tool) => tool.name);
}

function adaptToolDefinitionsToCohere(tools: unknown[]): JsonRecord[] {
  return tools
    .map((tool) => asRecord(tool))
    .filter((tool) => toNonEmptyString(tool.type || "function") === "function")
    .map((tool) => {
      const fn = asRecord(tool.function);
      const parameters = asRecord(asRecord(fn.parameters).properties);
      const required = Array.isArray(asRecord(fn.parameters).required)
        ? (asRecord(fn.parameters).required as unknown[])
            .filter((item) => typeof item === "string")
            .map((item) => String(item))
        : [];
      const parameterDefinitions = Object.fromEntries(
        Object.entries(parameters).map(([name, schema]) => {
          const parameterSchema = asRecord(schema);
          return [
            name,
            {
              description: toNonEmptyString(parameterSchema.description),
              type: toNonEmptyString(parameterSchema.type) || "string",
              isRequired: required.includes(name),
            },
          ];
        })
      );

      return {
        name: toNonEmptyString(fn.name),
        description: toNonEmptyString(fn.description),
        parameterDefinitions,
      };
    })
    .filter((tool) => tool.name);
}

function normalizeOciResponseFormat(value: unknown, vendor: OciVendor): JsonRecord | null {
  const format = asRecord(value);
  const type = toNonEmptyString(format.type);
  if (!type) return null;

  if (vendor === "COHERE") {
    return {
      ...format,
      ...(type ? { type } : {}),
    };
  }

  const normalizedType = type === "json_object" ? "JSON_OBJECT" : type.toUpperCase();
  const payload: JsonRecord = { ...format, type: normalizedType };
  if ("json_schema" in payload && !("jsonSchema" in payload)) {
    payload.jsonSchema = payload.json_schema;
    delete payload.json_schema;
  }
  return payload;
}

export function buildOciChatPayload(
  model: string,
  body: unknown,
  credentials: OciCredentials
): JsonRecord {
  const source = asRecord(body);
  const messages = Array.isArray(source.messages) ? source.messages : [];
  const vendor = getOciVendor(model);
  const servingMode =
    credentials.servingType === "DEDICATED"
      ? {
          servingType: "DEDICATED",
          endpointId: credentials.endpointId || model,
        }
      : {
          servingType: "ON_DEMAND",
          modelId: model,
        };

  if (vendor === "COHERE") {
    const userMessages = messages.filter((message) => asRecord(message).role === "user");
    const systemMessages = messages.filter((message) => asRecord(message).role === "system");
    const lastUser = asRecord(userMessages[userMessages.length - 1] || {});

    const chatRequest: JsonRecord = {
      apiFormat: "COHERE",
      message: extractTextContent(lastUser.content),
      chatHistory: adaptMessagesToCohereHistory(messages),
      maxTokens: typeof source.max_tokens === "number" ? source.max_tokens : 600,
      temperature: typeof source.temperature === "number" ? source.temperature : 1,
      topP: typeof source.top_p === "number" ? source.top_p : 0.75,
      frequencyPenalty: typeof source.frequency_penalty === "number" ? source.frequency_penalty : 0,
      isStream: false,
    };

    const preambleOverride = systemMessages
      .map((message) => extractTextContent(asRecord(message).content))
      .join("\n")
      .trim();
    if (preambleOverride) {
      chatRequest.preambleOverride = preambleOverride;
    }

    const stopSequences = getStringArray(source.stop);
    if (stopSequences.length > 0) {
      chatRequest.stopSequences = stopSequences;
    }
    if (typeof source.seed === "number") {
      chatRequest.seed = source.seed;
    }
    if (Array.isArray(source.tools) && source.tools.length > 0) {
      chatRequest.tools = adaptToolDefinitionsToCohere(source.tools);
    }
    const responseFormat = normalizeOciResponseFormat(source.response_format, vendor);
    if (responseFormat) {
      chatRequest.responseFormat = responseFormat;
    }

    return {
      compartmentId: credentials.compartmentId,
      servingMode,
      chatRequest,
    };
  }

  const chatRequest: JsonRecord = {
    apiFormat: "GENERIC",
    messages: adaptMessagesToGenericOci(messages),
    isStream: false,
  };

  if (typeof source.max_tokens === "number") {
    chatRequest.maxTokens = source.max_tokens;
  }
  if (typeof source.temperature === "number") {
    chatRequest.temperature = source.temperature;
  }
  if (typeof source.top_p === "number") {
    chatRequest.topP = source.top_p;
  }
  if (typeof source.frequency_penalty === "number") {
    chatRequest.frequencyPenalty = source.frequency_penalty;
  }
  if (typeof source.presence_penalty === "number") {
    chatRequest.presencePenalty = source.presence_penalty;
  }
  if (typeof source.seed === "number") {
    chatRequest.seed = source.seed;
  }

  const stop = getStringArray(source.stop);
  if (stop.length > 0) {
    chatRequest.stop = stop;
  }

  const responseFormat = normalizeOciResponseFormat(source.response_format, vendor);
  if (responseFormat) {
    chatRequest.responseFormat = responseFormat;
  }

  if (Array.isArray(source.tools) && source.tools.length > 0) {
    chatRequest.tools = adaptToolDefinitionsToGenericOci(source.tools);
  }

  if (source.tool_choice && typeof source.tool_choice === "object") {
    const fn = asRecord(asRecord(source.tool_choice).function);
    const functionName = toNonEmptyString(fn.name);
    if (functionName) {
      chatRequest.toolChoice = { type: "FUNCTION", name: functionName };
    }
  } else if (typeof source.tool_choice === "string") {
    chatRequest.toolChoice = source.tool_choice;
  }

  return {
    compartmentId: credentials.compartmentId,
    servingMode,
    chatRequest,
  };
}

export function signOciRequest({
  method,
  url,
  body,
  credentials,
  headers = {},
}: {
  method: string;
  url: string;
  body: string;
  credentials: OciCredentials;
  headers?: Record<string, string>;
}): Record<string, string> {
  const parsedUrl = new URL(url);
  const pathWithQuery = `${parsedUrl.pathname}${parsedUrl.search}`;
  const contentType = headers["Content-Type"] || headers["content-type"] || "application/json";
  const contentLength = Buffer.byteLength(body, "utf8").toString();
  const date = new Date().toUTCString();
  const host = parsedUrl.host;
  const xContentSha256 = createHash("sha256").update(body).digest("base64");
  const signedHeaders = [
    "date",
    "(request-target)",
    "host",
    "content-length",
    "content-type",
    "x-content-sha256",
  ];

  const signingString = [
    `date: ${date}`,
    `(request-target): ${method.toLowerCase()} ${pathWithQuery}`,
    `host: ${host}`,
    `content-length: ${contentLength}`,
    `content-type: ${contentType}`,
    `x-content-sha256: ${xContentSha256}`,
  ].join("\n");

  const signature = createSign("RSA-SHA256")
    .update(signingString)
    .end()
    .sign(credentials.privateKey, "base64");

  return {
    ...headers,
    Date: date,
    Host: host,
    "Content-Type": contentType,
    "Content-Length": contentLength,
    "X-Content-Sha256": xContentSha256,
    Authorization: `Signature version="1",keyId="${credentials.tenancy}/${credentials.user}/${credentials.fingerprint}",algorithm="rsa-sha256",headers="${signedHeaders.join(" ")}",signature="${signature}"`,
  };
}

function translateToolCallsToOpenAI(toolCalls: unknown): JsonRecord[] {
  if (!Array.isArray(toolCalls)) return [];
  return toolCalls
    .map((toolCall) => asRecord(toolCall))
    .filter((toolCall) => toNonEmptyString(toolCall.name))
    .map((toolCall) => ({
      id: toNonEmptyString(toolCall.id) || `call_${randomUUID()}`,
      type: "function",
      function: {
        name: toNonEmptyString(toolCall.name),
        arguments:
          typeof toolCall.arguments === "string"
            ? toolCall.arguments
            : JSON.stringify(toolCall.arguments || {}),
      },
    }));
}

function mapFinishReason(reason: string, hasToolCalls: boolean): string {
  const normalized = reason.toUpperCase();
  if (normalized === "COMPLETE" || normalized === "STOP")
    return hasToolCalls ? "tool_calls" : "stop";
  if (normalized === "MAX_TOKENS" || normalized === "LENGTH") return "length";
  return hasToolCalls ? "tool_calls" : "stop";
}

function extractGenericResponseText(content: unknown): string {
  if (!Array.isArray(content)) return "";
  return content
    .map((item) => asRecord(item))
    .filter((item) => item.type === "TEXT")
    .map((item) => toNonEmptyString(item.text))
    .join("\n");
}

export function translateOciResponseToOpenAI(model: string, payload: unknown): JsonRecord {
  const data = asRecord(payload);
  const modelId = toNonEmptyString(data.modelId) || model;
  const chatResponse = asRecord(data.chatResponse);

  if (toNonEmptyString(chatResponse.apiFormat) === "COHERE") {
    const toolCalls = translateToolCallsToOpenAI(chatResponse.toolCalls);
    const usage = asRecord(chatResponse.usage);
    return {
      id: `chatcmpl-oci-${randomUUID()}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: modelId,
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: toNonEmptyString(chatResponse.text) || null,
            ...(toolCalls.length > 0 ? { tool_calls: toolCalls } : {}),
          },
          finish_reason: mapFinishReason(
            toNonEmptyString(chatResponse.finishReason),
            toolCalls.length > 0
          ),
        },
      ],
      usage: {
        prompt_tokens: Number(usage.promptTokens || 0),
        completion_tokens: Number(usage.completionTokens || 0),
        total_tokens: Number(usage.totalTokens || 0),
      },
    };
  }

  const choices = Array.isArray(chatResponse.choices)
    ? chatResponse.choices.map((choice) => asRecord(choice))
    : [];
  const firstChoice = asRecord(choices[0]);
  const responseMessage = asRecord(firstChoice.message);
  const toolCalls = translateToolCallsToOpenAI(responseMessage.toolCalls);
  const usage = asRecord(chatResponse.usage);

  return {
    id: `chatcmpl-oci-${randomUUID()}`,
    object: "chat.completion",
    created:
      Date.parse(toNonEmptyString(chatResponse.timeCreated) || new Date().toISOString()) / 1000,
    model: modelId,
    choices: [
      {
        index: typeof firstChoice.index === "number" ? firstChoice.index : 0,
        message: {
          role: "assistant",
          content: extractGenericResponseText(responseMessage.content) || null,
          ...(toolCalls.length > 0 ? { tool_calls: toolCalls } : {}),
        },
        finish_reason: mapFinishReason(
          toNonEmptyString(firstChoice.finishReason),
          toolCalls.length > 0
        ),
      },
    ],
    usage: {
      prompt_tokens: Number(usage.promptTokens || 0),
      completion_tokens: Number(usage.completionTokens || 0),
      total_tokens: Number(usage.totalTokens || 0),
    },
  };
}

function buildSyntheticSseResponse(
  model: string,
  payload: JsonRecord,
  status: number,
  statusText: string
) {
  const encoder = new TextEncoder();
  const responseId = toNonEmptyString(payload.id) || `chatcmpl-oci-${randomUUID()}`;
  const created =
    typeof payload.created === "number" ? payload.created : Math.floor(Date.now() / 1000);
  const choice = asRecord(Array.isArray(payload.choices) ? payload.choices[0] : null);
  const message = asRecord(choice.message);
  const text = toNonEmptyString(message.content);
  const toolCalls = Array.isArray(message.tool_calls)
    ? message.tool_calls.map((item) => asRecord(item))
    : [];
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
                        id: toNonEmptyString(toolCall.id) || `call_${randomUUID()}`,
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

export class OciExecutor extends BaseExecutor {
  constructor(provider = "oci") {
    super(provider, PROVIDERS[provider] || { id: provider, baseUrl: "" });
  }

  buildHeaders(credentials: ProviderCredentials): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    applyConfiguredUserAgent(headers, credentials?.providerSpecificData || null);
    return headers;
  }

  buildUrl(
    _model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ) {
    const parsedCredentials = parseOciCredentialInput(
      credentials?.apiKey || credentials?.accessToken || null,
      asRecord(credentials?.providerSpecificData)
    );
    const region = parsedCredentials?.region || "us-chicago-1";
    const baseUrl = getOciBaseUrl(
      asRecord(credentials?.providerSpecificData),
      region,
      this.config.baseUrl
    );
    return buildOciUrl(baseUrl);
  }

  transformRequest(
    model: string,
    body: unknown,
    _stream: boolean,
    credentials: ProviderCredentials
  ) {
    const parsedCredentials = parseOciCredentialInput(
      credentials?.apiKey || credentials?.accessToken || null,
      asRecord(credentials?.providerSpecificData)
    );
    if (!parsedCredentials) {
      return body;
    }
    return buildOciChatPayload(model, body, parsedCredentials);
  }

  async execute({ model, body, stream, credentials, signal, upstreamExtraHeaders }: ExecuteInput) {
    const parsedCredentials = parseOciCredentialInput(
      credentials?.apiKey || credentials?.accessToken || null,
      asRecord(credentials?.providerSpecificData)
    );

    if (!parsedCredentials) {
      return {
        response: errorResponse(
          HTTP_STATUS.UNAUTHORIZED,
          "OCI credentials must include user, fingerprint, tenancy, compartmentId, and a PEM private key"
        ),
        url: "",
        headers: {},
        transformedBody: body,
      };
    }

    const url = this.buildUrl(model, false, 0, credentials);
    const transformedBody = buildOciChatPayload(model, body, parsedCredentials);
    const bodyString = JSON.stringify(transformedBody);
    const unsignedHeaders = this.buildHeaders(credentials);
    mergeUpstreamExtraHeaders(unsignedHeaders, upstreamExtraHeaders);
    const headers = signOciRequest({
      method: "POST",
      url,
      body: bodyString,
      credentials: parsedCredentials,
      headers: unsignedHeaders,
    });

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
        response: errorResponse(HTTP_STATUS.BAD_GATEWAY, `OCI fetch error: ${err.message}`),
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
          "OCI returned a non-JSON response for /actions/chat"
        ),
        url,
        headers,
        transformedBody,
      };
    }

    const translated = translateOciResponseToOpenAI(model, jsonPayload);
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

export default OciExecutor;
