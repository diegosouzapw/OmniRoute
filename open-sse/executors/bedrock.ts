import { randomUUID } from "node:crypto";
import {
  BaseExecutor,
  applyConfiguredUserAgent,
  mergeUpstreamExtraHeaders,
  type ExecuteInput,
  type ProviderCredentials,
} from "./base.ts";
import { HTTP_STATUS, PROVIDERS } from "../config/constants.ts";
import { parseAwsCredentialInput, signAwsRequest } from "../services/awsSigV4.ts";

type JsonRecord = Record<string, unknown>;

type BedrockTextBlock = { text: string };
type BedrockToolUseBlock = {
  toolUse: {
    toolUseId: string;
    name: string;
    input: JsonRecord;
  };
};
type BedrockToolResultBlock = {
  toolResult: {
    toolUseId: string;
    content: Array<{ text: string }>;
    status?: "error";
  };
};
type BedrockContentBlock = BedrockTextBlock | BedrockToolUseBlock | BedrockToolResultBlock;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNonEmptyString(value: unknown): string {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function normalizeBaseUrl(baseUrl: string | null | undefined): string {
  return typeof baseUrl === "string" ? baseUrl.trim().replace(/\/+$/, "") : "";
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

function safeParseJsonObject(raw: unknown): JsonRecord {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return raw as JsonRecord;
  }
  if (typeof raw === "string" && raw.trim()) {
    try {
      const parsed = JSON.parse(raw);
      return asRecord(parsed);
    } catch {
      return { value: raw };
    }
  }
  return {};
}

function extractTextFragments(content: unknown): string[] {
  if (typeof content === "string" && content.trim()) {
    return [content];
  }
  if (!Array.isArray(content)) {
    return [];
  }

  const fragments: string[] = [];
  for (const item of content) {
    const block = asRecord(item);
    const type = toNonEmptyString(block.type);
    if ((type === "text" || type === "input_text") && toNonEmptyString(block.text)) {
      fragments.push(toNonEmptyString(block.text));
      continue;
    }
    if (type === "image_url") {
      const imageUrl = toNonEmptyString(asRecord(block.image_url).url);
      if (imageUrl) fragments.push(`Image URL: ${imageUrl}`);
      continue;
    }
    if (type === "input_image") {
      const imageUrl = toNonEmptyString(block.image_url) || toNonEmptyString(block.url);
      if (imageUrl) fragments.push(`Image URL: ${imageUrl}`);
    }
  }

  return fragments;
}

function contentToBedrockBlocks(content: unknown): BedrockContentBlock[] {
  const text = extractTextFragments(content).join("\n").trim();
  return text ? [{ text }] : [];
}

function roleForBedrock(role: string): "user" | "assistant" {
  return role === "assistant" ? "assistant" : "user";
}

function buildBedrockMessage(message: JsonRecord): JsonRecord | null {
  const role = toNonEmptyString(message.role);
  if (!role || role === "system") return null;

  if (role === "tool") {
    const toolUseId =
      toNonEmptyString(message.tool_call_id) || toNonEmptyString(message.name) || randomUUID();
    const contentText = extractTextFragments(message.content).join("\n").trim() || "Tool executed";
    return {
      role: "user",
      content: [
        {
          toolResult: {
            toolUseId,
            content: [{ text: contentText }],
          },
        },
      ],
    };
  }

  const contentBlocks = contentToBedrockBlocks(message.content);

  if (role === "assistant" && Array.isArray(message.tool_calls)) {
    for (const toolCall of message.tool_calls) {
      const call = asRecord(toolCall);
      const functionBlock = asRecord(call.function);
      const name = toNonEmptyString(functionBlock.name);
      if (!name) continue;

      contentBlocks.push({
        toolUse: {
          toolUseId: toNonEmptyString(call.id) || randomUUID(),
          name,
          input: safeParseJsonObject(functionBlock.arguments),
        },
      });
    }
  }

  if (contentBlocks.length === 0) {
    return null;
  }

  return {
    role: roleForBedrock(role),
    content: contentBlocks,
  };
}

function buildBedrockToolConfig(body: JsonRecord): JsonRecord | null {
  if (!Array.isArray(body.tools) || body.tools.length === 0) {
    return null;
  }

  const tools = body.tools
    .map((tool) => asRecord(tool))
    .filter((tool) => toNonEmptyString(tool.type || "function") === "function")
    .map((tool) => {
      const fn = asRecord(tool.function);
      const name = toNonEmptyString(fn.name);
      if (!name) return null;

      return {
        toolSpec: {
          name,
          ...(toNonEmptyString(fn.description)
            ? { description: toNonEmptyString(fn.description) }
            : {}),
          inputSchema: {
            json: asRecord(fn.parameters),
          },
        },
      };
    })
    .filter(Boolean);

  if (tools.length === 0) {
    return null;
  }

  const toolChoice = body.tool_choice;
  let bedrockToolChoice: JsonRecord | null = null;
  if (toolChoice === "auto") {
    bedrockToolChoice = { auto: {} };
  } else if (toolChoice === "required") {
    bedrockToolChoice = { any: {} };
  } else if (toolChoice && typeof toolChoice === "object") {
    const functionName = toNonEmptyString(asRecord(asRecord(toolChoice).function).name);
    if (functionName) {
      bedrockToolChoice = { tool: { name: functionName } };
    }
  }

  return {
    tools,
    ...(bedrockToolChoice ? { toolChoice: bedrockToolChoice } : {}),
  };
}

export function getBedrockBaseUrl(
  providerSpecificData: JsonRecord | null | undefined,
  region: string
): string {
  return (
    toNonEmptyString(providerSpecificData?.baseUrl) ||
    toNonEmptyString(providerSpecificData?.endpoint) ||
    `https://bedrock-runtime.${region}.amazonaws.com`
  );
}

export function buildBedrockUrl({
  baseUrl,
  model,
  action = "converse",
}: {
  baseUrl: string;
  model: string;
  action?: "converse" | "converse-stream";
}): string {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";

  const url = new URL(normalized);
  url.pathname = `/model/${encodeURIComponent(model)}/${action}`;
  return url.toString();
}

export function buildBedrockConverseBody(body: unknown): JsonRecord {
  const source = asRecord(body);
  const system = [];
  const messages = [];

  for (const rawMessage of Array.isArray(source.messages) ? source.messages : []) {
    const message = asRecord(rawMessage);
    if (toNonEmptyString(message.role) === "system") {
      for (const block of contentToBedrockBlocks(message.content)) {
        if ("text" in block) {
          system.push({ text: block.text });
        }
      }
      continue;
    }

    const nextMessage = buildBedrockMessage(message);
    if (nextMessage) messages.push(nextMessage);
  }

  const inferenceConfig: JsonRecord = {};
  if (typeof source.max_tokens === "number") {
    inferenceConfig.maxTokens = source.max_tokens;
  }
  if (typeof source.temperature === "number") {
    inferenceConfig.temperature = source.temperature;
  }
  if (typeof source.top_p === "number") {
    inferenceConfig.topP = source.top_p;
  }
  const stopSequences = getStringArray(source.stop);
  if (stopSequences.length > 0) {
    inferenceConfig.stopSequences = stopSequences;
  }

  const payload: JsonRecord = { messages };
  if (system.length > 0) {
    payload.system = system;
  }
  if (Object.keys(inferenceConfig).length > 0) {
    payload.inferenceConfig = inferenceConfig;
  }
  const toolConfig = buildBedrockToolConfig(source);
  if (toolConfig) {
    payload.toolConfig = toolConfig;
  }

  return payload;
}

function mapBedrockStopReason(stopReason: string, hasToolCalls: boolean): string {
  switch (stopReason) {
    case "tool_use":
      return "tool_calls";
    case "max_tokens":
      return "length";
    case "guardrail_intervened":
    case "content_filtered":
      return "content_filter";
    case "stop_sequence":
    case "end_turn":
    default:
      return hasToolCalls ? "tool_calls" : "stop";
  }
}

export function translateBedrockResponseToOpenAI(model: string, payload: unknown): JsonRecord {
  const data = asRecord(payload);
  const contentBlocks = Array.isArray(asRecord(asRecord(data.output).message).content)
    ? (asRecord(asRecord(data.output).message).content as unknown[])
    : [];

  const textParts: string[] = [];
  const toolCalls = [];

  for (const rawBlock of contentBlocks) {
    const block = asRecord(rawBlock);
    if (toNonEmptyString(block.text)) {
      textParts.push(toNonEmptyString(block.text));
      continue;
    }

    const toolUse = asRecord(block.toolUse);
    const toolName = toNonEmptyString(toolUse.name);
    if (toolName) {
      toolCalls.push({
        id: toNonEmptyString(toolUse.toolUseId) || randomUUID(),
        type: "function",
        function: {
          name: toolName,
          arguments: JSON.stringify(asRecord(toolUse.input)),
        },
      });
    }
  }

  const usageSource = asRecord(data.usage);
  const promptTokens = typeof usageSource.inputTokens === "number" ? usageSource.inputTokens : 0;
  const completionTokens =
    typeof usageSource.outputTokens === "number" ? usageSource.outputTokens : 0;
  const totalTokens =
    typeof usageSource.totalTokens === "number"
      ? usageSource.totalTokens
      : promptTokens + completionTokens;
  const text = textParts.join("\n");

  return {
    id: `chatcmpl-bedrock-${randomUUID()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: text || null,
          ...(toolCalls.length > 0 ? { tool_calls: toolCalls } : {}),
        },
        finish_reason: mapBedrockStopReason(
          toNonEmptyString(data.stopReason) || "end_turn",
          toolCalls.length > 0
        ),
      },
    ],
    usage: {
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: totalTokens,
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
  const responseId = toNonEmptyString(payload.id) || `chatcmpl-bedrock-${randomUUID()}`;
  const created =
    typeof payload.created === "number" ? payload.created : Math.floor(Date.now() / 1000);
  const message = asRecord(
    asRecord(Array.isArray(payload.choices) ? payload.choices[0] : null).message
  );
  const text = toNonEmptyString(message.content);
  const toolCalls = Array.isArray(message.tool_calls)
    ? message.tool_calls.map((item) => asRecord(item))
    : [];
  const finishReason = toNonEmptyString(
    asRecord(Array.isArray(payload.choices) ? payload.choices[0] : null).finish_reason
  );
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
                        id: toNonEmptyString(toolCall.id) || randomUUID(),
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
            choices: [{ index: 0, delta: {}, finish_reason: finishReason || "stop" }],
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

export class BedrockExecutor extends BaseExecutor {
  constructor(provider = "bedrock") {
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
    model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ) {
    const awsCredentials = parseAwsCredentialInput(
      credentials?.apiKey || credentials?.accessToken || null,
      credentials?.providerSpecificData
    );
    const region = awsCredentials?.region || "us-east-1";
    const baseUrl = getBedrockBaseUrl(asRecord(credentials?.providerSpecificData), region);
    return buildBedrockUrl({ baseUrl, model, action: "converse" });
  }

  transformRequest(model: string, body: unknown): JsonRecord {
    void model;
    return buildBedrockConverseBody(body);
  }

  async execute({ model, body, stream, credentials, signal, upstreamExtraHeaders }: ExecuteInput) {
    const awsCredentials = parseAwsCredentialInput(
      credentials?.apiKey || credentials?.accessToken || null,
      credentials?.providerSpecificData
    );

    if (!awsCredentials) {
      return {
        response: errorResponse(
          HTTP_STATUS.UNAUTHORIZED,
          "AWS Bedrock credentials must include access key and secret key"
        ),
        url: "",
        headers: {},
        transformedBody: body,
      };
    }

    const url = this.buildUrl(model, false, 0, credentials);
    const transformedBody = this.transformRequest(model, body);
    const bodyString = JSON.stringify(transformedBody);
    const unsignedHeaders = this.buildHeaders(credentials);
    mergeUpstreamExtraHeaders(unsignedHeaders, upstreamExtraHeaders);
    const headers = signAwsRequest({
      method: "POST",
      url,
      body: bodyString,
      service: "bedrock",
      region: awsCredentials.region,
      credentials: awsCredentials,
      headers: unsignedHeaders,
    });

    let response: Response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers,
        body: bodyString,
        signal,
      });
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      if (err.name === "AbortError") {
        throw err;
      }
      return {
        response: errorResponse(HTTP_STATUS.BAD_GATEWAY, `AWS Bedrock fetch error: ${err.message}`),
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
          "AWS Bedrock returned a non-JSON response for Converse"
        ),
        url,
        headers,
        transformedBody,
      };
    }

    const translated = translateBedrockResponseToOpenAI(model, jsonPayload);
    const finalResponse = stream
      ? buildSyntheticSseResponse(model, translated, response.status, response.statusText)
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

export default BedrockExecutor;
