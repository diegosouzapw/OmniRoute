// @ts-nocheck
import {
  BedrockRuntimeClient,
  ConverseCommand,
  ConverseStreamCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { randomUUID } from "node:crypto";

import { BaseExecutor } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { buildBedrockNativeConverseUrl, resolveBedrockRegion } from "../config/bedrock.ts";

const encoder = new TextEncoder();

function asRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function getCustomUserAgent(providerSpecificData) {
  const value = asRecord(providerSpecificData).customUserAgent;
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function toText(value) {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function stripDataUrlPrefix(value) {
  if (typeof value !== "string") return null;
  const match = value.match(/^data:image\/(png|jpeg|jpg|gif|webp);base64,(.+)$/i);
  if (!match) return null;
  const format = match[1].toLowerCase() === "jpg" ? "jpeg" : match[1].toLowerCase();
  return { format, data: match[2] };
}

function decodeBase64(value) {
  return Uint8Array.from(Buffer.from(value, "base64"));
}

function normalizeRole(role) {
  if (role === "assistant") return "assistant";
  return "user";
}

function normalizeToolUseId(value) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function textBlocksFromContent(content, options = {}) {
  if (typeof content === "string") return content.trim() ? [{ text: content }] : [];
  if (!Array.isArray(content)) return [];

  const blocks = [];
  for (const part of content) {
    if (typeof part === "string") {
      if (part.trim()) blocks.push({ text: part });
      continue;
    }
    const p = asRecord(part);
    const type = typeof p.type === "string" ? p.type : "";
    if ((type === "text" || type === "input_text") && typeof p.text === "string") {
      if (p.text.trim()) blocks.push({ text: p.text });
      continue;
    }
    if (type === "image_url" || type === "input_image") {
      const url = typeof p.image_url === "string" ? p.image_url : p.image_url?.url || p.image_url;
      const image = stripDataUrlPrefix(url);
      if (image) {
        blocks.push({
          image: { format: image.format, source: { bytes: decodeBase64(image.data) } },
        });
      }
      continue;
    }
    if (type === "tool_use" && typeof p.id === "string" && typeof p.name === "string") {
      const rawId = normalizeToolUseId(p.id);
      if (rawId && options.skipToolUseIds?.has(rawId)) continue;
      if (rawId && !options.answeredToolUseIds?.has(rawId)) continue;
      blocks.push({
        toolUse: {
          toolUseId: rawId || `toolu_${randomUUID()}`,
          name: p.name,
          input: asRecord(p.input),
        },
      });
      continue;
    }
    if (type === "tool_result" && typeof p.tool_use_id === "string") {
      blocks.push({
        toolResult: {
          toolUseId: p.tool_use_id,
          content: [{ text: toText(p.content) }],
          status: p.is_error ? "error" : "success",
        },
      });
    }
  }

  return blocks;
}

function systemBlocksFromOpenAI(messages) {
  const blocks = [];
  for (const message of messages) {
    const role = message?.role;
    if (role !== "system" && role !== "developer") continue;
    const text = textBlocksFromContent(message.content)
      .map((block) => (typeof block.text === "string" ? block.text : ""))
      .filter(Boolean)
      .join("\n");
    if (text.trim()) blocks.push({ text });
  }
  return blocks;
}

function toolResultContentFromMessage(message) {
  const content = message.content;
  if (typeof content === "string") return [{ text: content || " " }];
  if (Array.isArray(content)) {
    const result = [];
    for (const part of content) {
      if (typeof part === "string") {
        result.push({ text: part || " " });
        continue;
      }
      const p = asRecord(part);
      if (typeof p.text === "string") result.push({ text: p.text || " " });
      else if (p.type === "json" && p.json !== undefined) result.push({ json: p.json });
      else if (p.content !== undefined) result.push({ text: toText(p.content) });
    }
    return result.length > 0 ? result : [{ text: " " }];
  }
  return [{ text: toText(content) || " " }];
}

function collectAnsweredToolUseIds(messages) {
  const answered = new Set();
  for (const message of messages) {
    if (!message || typeof message !== "object") continue;
    if (message.role === "tool") {
      const id = normalizeToolUseId(message.tool_call_id);
      if (id) answered.add(id);
    }
    if (!Array.isArray(message.content)) continue;
    for (const part of message.content) {
      const p = asRecord(part);
      if (p.type !== "tool_result") continue;
      const id = normalizeToolUseId(p.tool_use_id);
      if (id) answered.add(id);
    }
  }
  return answered;
}

function getToolUseIdFromBlock(block) {
  return normalizeToolUseId(block?.toolUse?.toolUseId);
}

function getToolResultIdFromBlock(block) {
  return normalizeToolUseId(block?.toolResult?.toolUseId);
}

function isToolResultOnlyMessage(message) {
  return (
    message?.role === "user" &&
    Array.isArray(message.content) &&
    message.content.length > 0 &&
    message.content.every((block) => Boolean(getToolResultIdFromBlock(block)))
  );
}

function mergeConsecutiveToolResultMessages(messages) {
  const merged = [];
  for (const message of messages) {
    const previous = merged[merged.length - 1];
    if (isToolResultOnlyMessage(previous) && isToolResultOnlyMessage(message)) {
      previous.content.push(...message.content);
      continue;
    }
    merged.push(message);
  }
  return merged;
}

function ensureNonEmptyContent(message) {
  if (!Array.isArray(message.content) || message.content.length === 0) {
    message.content = [{ text: " " }];
  }
}

function sanitizeBedrockToolPairs(messages) {
  const normalized = mergeConsecutiveToolResultMessages(messages);
  const validResultCounts = new Map();

  for (let i = 0; i < normalized.length; i++) {
    const message = normalized[i];
    if (message?.role !== "assistant" || !Array.isArray(message.content)) continue;

    const nextMessage = normalized[i + 1];
    const nextResultIds = new Set(
      nextMessage?.role === "user" && Array.isArray(nextMessage.content)
        ? nextMessage.content.map(getToolResultIdFromBlock).filter(Boolean)
        : []
    );

    const toolUseIds = message.content.map(getToolUseIdFromBlock).filter(Boolean);
    if (toolUseIds.length === 0) continue;

    const allowedIds = new Set(toolUseIds.filter((id) => nextResultIds.has(id)));
    message.content = message.content.filter((block) => {
      const toolUseId = getToolUseIdFromBlock(block);
      return !toolUseId || allowedIds.has(toolUseId);
    });
    ensureNonEmptyContent(message);
    for (const id of allowedIds) {
      validResultCounts.set(id, (validResultCounts.get(id) || 0) + 1);
    }
  }

  for (const message of normalized) {
    if (message?.role !== "user" || !Array.isArray(message.content)) continue;
    message.content = message.content.filter((block) => {
      const resultId = getToolResultIdFromBlock(block);
      if (!resultId) return true;
      const remaining = validResultCounts.get(resultId) || 0;
      if (remaining <= 0) return false;
      validResultCounts.set(resultId, remaining - 1);
      return true;
    });
    ensureNonEmptyContent(message);
  }

  return normalized;
}

function messagesFromOpenAI(messages) {
  const converted = [];
  const pendingToolUseIds = new Set();
  const answeredToolUseIds = collectAnsweredToolUseIds(messages);

  for (const message of messages) {
    if (!message || typeof message !== "object") continue;
    if (message.role === "system" || message.role === "developer") continue;

    if (message.role === "tool") {
      const toolUseId = normalizeToolUseId(message.tool_call_id) || `toolu_${randomUUID()}`;
      pendingToolUseIds.delete(toolUseId);
      answeredToolUseIds.add(toolUseId);
      converted.push({
        role: "user",
        content: [
          {
            toolResult: {
              toolUseId,
              content: toolResultContentFromMessage(message),
              status: "success",
            },
          },
        ],
      });
      continue;
    }

    const toolCalls = Array.isArray(message.tool_calls) ? message.tool_calls : [];
    const toolCallIds = new Set(
      toolCalls.map((call) => normalizeToolUseId(call?.id)).filter(Boolean)
    );
    const content = textBlocksFromContent(message.content, {
      skipToolUseIds: toolCallIds,
      answeredToolUseIds,
    });
    for (const call of toolCalls) {
      const fn = asRecord(call.function);
      const rawArgs = typeof fn.arguments === "string" ? fn.arguments : "{}";
      let input = {};
      try {
        input = rawArgs.trim() ? JSON.parse(rawArgs) : {};
      } catch {
        input = { arguments: rawArgs };
      }
      const toolUseId = normalizeToolUseId(call.id) || `toolu_${randomUUID()}`;
      if (pendingToolUseIds.has(toolUseId)) continue;
      if (!answeredToolUseIds.has(toolUseId)) continue;
      pendingToolUseIds.add(toolUseId);
      content.push({
        toolUse: {
          toolUseId,
          name: typeof fn.name === "string" && fn.name ? fn.name : "unknown_tool",
          input,
        },
      });
    }

    if (content.length === 0) {
      content.push({ text: " " });
    }

    converted.push({ role: normalizeRole(message.role), content });
  }

  if (converted.length === 0) {
    converted.push({ role: "user", content: [{ text: " " }] });
  }

  return sanitizeBedrockToolPairs(converted);
}

function toolConfigFromOpenAI(tools, toolChoice) {
  if (!Array.isArray(tools) || tools.length === 0) return undefined;
  const bedrockTools = [];
  for (const tool of tools) {
    const t = asRecord(tool);
    const fn = t.type === "function" ? asRecord(t.function) : t;
    const name = typeof fn.name === "string" ? fn.name.trim() : "";
    if (!name) continue;
    bedrockTools.push({
      toolSpec: {
        name,
        description: typeof fn.description === "string" ? fn.description : undefined,
        inputSchema: { json: asRecord(fn.parameters) },
      },
    });
  }
  if (bedrockTools.length === 0) return undefined;

  const config = { tools: bedrockTools };
  if (toolChoice === "required") config.toolChoice = { any: {} };
  else if (toolChoice === "auto") config.toolChoice = { auto: {} };
  else if (toolChoice && typeof toolChoice === "object") {
    const fn = asRecord(toolChoice.function);
    const name = typeof fn.name === "string" ? fn.name : "";
    if (name) config.toolChoice = { tool: { name } };
  }
  return config;
}

export function openAIToBedrockConverse(model, body) {
  const request = asRecord(body);
  const messages = Array.isArray(request.messages) ? request.messages : [];
  const inferenceConfig = {};

  const maxTokens = request.max_tokens ?? request.max_completion_tokens;
  if (typeof maxTokens === "number") inferenceConfig.maxTokens = Math.max(1, Math.floor(maxTokens));
  if (typeof request.temperature === "number") inferenceConfig.temperature = request.temperature;
  if (typeof request.top_p === "number") inferenceConfig.topP = request.top_p;
  if (Array.isArray(request.stop)) inferenceConfig.stopSequences = request.stop.filter(Boolean);
  else if (typeof request.stop === "string" && request.stop)
    inferenceConfig.stopSequences = [request.stop];

  const payload = {
    modelId: model,
    messages: messagesFromOpenAI(messages),
  };

  const system = systemBlocksFromOpenAI(messages);
  if (system.length > 0) payload.system = system;
  if (Object.keys(inferenceConfig).length > 0) payload.inferenceConfig = inferenceConfig;

  const toolConfig = toolConfigFromOpenAI(request.tools, request.tool_choice);
  if (toolConfig) payload.toolConfig = toolConfig;

  return payload;
}

function convertStopReason(reason) {
  switch (reason) {
    case "tool_use":
      return "tool_calls";
    case "max_tokens":
      return "length";
    case "stop_sequence":
    case "end_turn":
    default:
      return "stop";
  }
}

function usageFromBedrock(usage) {
  const input = Number(usage?.inputTokens || 0);
  const output = Number(usage?.outputTokens || 0);
  return {
    prompt_tokens: input,
    completion_tokens: output,
    total_tokens: Number(usage?.totalTokens || input + output),
  };
}

function contentBlocksToOpenAIMessage(blocks) {
  const text = [];
  const reasoning = [];
  const toolCalls = [];
  for (const block of Array.isArray(blocks) ? blocks : []) {
    if (typeof block?.text === "string") text.push(block.text);
    if (typeof block?.reasoningContent?.reasoningText?.text === "string") {
      reasoning.push(block.reasoningContent.reasoningText.text);
    }
    if (block?.toolUse) {
      toolCalls.push({
        id: block.toolUse.toolUseId,
        type: "function",
        function: {
          name: block.toolUse.name,
          arguments: JSON.stringify(block.toolUse.input || {}),
        },
      });
    }
  }

  const message = { role: "assistant", content: text.join("") };
  if (reasoning.length > 0) message.reasoning_content = reasoning.join("");
  if (toolCalls.length > 0) {
    message.content = message.content || null;
    message.tool_calls = toolCalls;
  }
  return message;
}

function openAICompletionFromConverse(output, model) {
  const message = contentBlocksToOpenAIMessage(output?.output?.message?.content || []);
  return {
    id: `chatcmpl-bedrock-${randomUUID()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        message,
        finish_reason: convertStopReason(output?.stopReason),
      },
    ],
    usage: usageFromBedrock(output?.usage),
  };
}

function sse(data) {
  return encoder.encode(`data: ${JSON.stringify(data)}\n\n`);
}

function done() {
  return encoder.encode("data: [DONE]\n\n");
}

function openAIChunk(model, delta, finishReason = null, usage = undefined) {
  const chunk = {
    id: `chatcmpl-bedrock-${model}`,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  };
  if (usage) chunk.usage = usage;
  return chunk;
}

function statusFromError(error) {
  const status = Number(error?.$metadata?.httpStatusCode || error?.statusCode || error?.status);
  return Number.isInteger(status) && status >= 400 && status <= 599 ? status : 502;
}

function errorBody(error, fallback = "Bedrock request failed") {
  const status = statusFromError(error);
  const code = typeof error?.name === "string" ? error.name : `HTTP_${status}`;
  const message = typeof error?.message === "string" && error.message ? error.message : fallback;
  return {
    error: {
      message,
      type:
        status === 429
          ? "rate_limit_error"
          : status === 401 || status === 403
            ? "auth_error"
            : "upstream_error",
      code,
      status,
    },
  };
}

function streamExceptionPayload(event) {
  const candidates = [
    event?.throttlingException,
    event?.validationException,
    event?.modelStreamErrorException,
    event?.serviceUnavailableException,
    event?.internalServerException,
  ].filter(Boolean);
  return candidates[0] || null;
}

function statusFromStreamException(exception) {
  const name = String(exception?.name || exception?.code || "");
  if (name.includes("Throttling")) return 429;
  if (name.includes("Validation")) return 400;
  if (name.includes("ServiceUnavailable")) return 503;
  if (name.includes("InternalServer")) return 500;
  return 502;
}

function createOpenAIStreamFromBedrock(stream, model) {
  const blockToolIndexes = new Map();
  let nextToolIndex = 0;
  let finishReason = "stop";
  let finalUsage = null;

  return new ReadableStream({
    async start(controller) {
      try {
        controller.enqueue(sse(openAIChunk(model, { role: "assistant" })));
        for await (const event of stream || []) {
          const exception = streamExceptionPayload(event);
          if (exception) {
            const status = statusFromStreamException(exception);
            controller.enqueue(
              sse({
                error: {
                  message: exception.message || "Bedrock stream failed",
                  type: status === 429 ? "rate_limit_error" : "upstream_error",
                  code: exception.name || "bedrock_stream_error",
                  status,
                },
              })
            );
            break;
          }

          if (event.contentBlockStart?.start?.toolUse) {
            const tool = event.contentBlockStart.start.toolUse;
            const index = nextToolIndex++;
            blockToolIndexes.set(event.contentBlockStart.contentBlockIndex, index);
            controller.enqueue(
              sse(
                openAIChunk(model, {
                  tool_calls: [
                    {
                      index,
                      id: tool.toolUseId,
                      type: "function",
                      function: { name: tool.name, arguments: "" },
                    },
                  ],
                })
              )
            );
            continue;
          }

          if (event.contentBlockDelta?.delta) {
            const delta = event.contentBlockDelta.delta;
            if (typeof delta.text === "string" && delta.text.length > 0) {
              controller.enqueue(sse(openAIChunk(model, { content: delta.text })));
            }
            if (typeof delta.reasoningContent?.text === "string" && delta.reasoningContent.text) {
              controller.enqueue(
                sse(openAIChunk(model, { reasoning_content: delta.reasoningContent.text }))
              );
            }
            if (typeof delta.toolUse?.input === "string") {
              const index = blockToolIndexes.get(event.contentBlockDelta.contentBlockIndex) ?? 0;
              controller.enqueue(
                sse(
                  openAIChunk(model, {
                    tool_calls: [{ index, function: { arguments: delta.toolUse.input } }],
                  })
                )
              );
            }
            continue;
          }

          if (event.messageStop?.stopReason) {
            finishReason = convertStopReason(event.messageStop.stopReason);
            continue;
          }

          if (event.metadata?.usage) {
            finalUsage = usageFromBedrock(event.metadata.usage);
          }
        }

        controller.enqueue(sse(openAIChunk(model, {}, finishReason, finalUsage || undefined)));
        controller.enqueue(done());
        controller.close();
      } catch (error) {
        const body = errorBody(error);
        controller.enqueue(sse(body));
        controller.enqueue(done());
        controller.close();
      }
    },
  });
}

export class BedrockExecutor extends BaseExecutor {
  constructor(clientFactory = null) {
    super("bedrock", PROVIDERS.bedrock || { format: "openai" });
    this.clientFactory = clientFactory;
  }

  buildUrl(model, stream, _urlIndex = 0, credentials = null) {
    return buildBedrockNativeConverseUrl(
      resolveBedrockRegion(credentials?.providerSpecificData),
      model,
      stream
    );
  }

  buildHeaders(credentials) {
    return {
      "Content-Type": "application/json",
      Authorization: credentials?.apiKey ? "Bearer ***" : "",
    };
  }

  createClient(credentials) {
    if (this.clientFactory) return this.clientFactory(credentials);
    const region = resolveBedrockRegion(credentials?.providerSpecificData);
    const customUserAgent = getCustomUserAgent(credentials?.providerSpecificData);
    return new BedrockRuntimeClient({
      region,
      token: { token: credentials.apiKey },
      authSchemePreference: ["httpBearerAuth"],
      maxAttempts: 1,
      ...(customUserAgent ? { customUserAgent } : {}),
    });
  }

  async execute({ model, body, stream, credentials, signal }) {
    const url = this.buildUrl(model, stream, 0, credentials);
    const headers = this.buildHeaders(credentials);

    if (!credentials?.apiKey) {
      return {
        response: new Response(
          JSON.stringify(
            errorBody({
              name: "MissingCredentials",
              message: "Missing Bedrock API key",
              $metadata: { httpStatusCode: 401 },
            })
          ),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          }
        ),
        url,
        headers,
        transformedBody: null,
      };
    }

    const cleanedBody = this.transformRequest(model, body, stream, credentials);
    const transformedBody = openAIToBedrockConverse(model, cleanedBody);

    try {
      const client = this.createClient(credentials);
      if (stream) {
        const output = await client.send(new ConverseStreamCommand(transformedBody), {
          abortSignal: signal || undefined,
        });
        return {
          response: new Response(createOpenAIStreamFromBedrock(output.stream, model), {
            status: 200,
            headers: { "Content-Type": "text/event-stream" },
          }),
          url,
          headers,
          transformedBody,
        };
      }

      const output = await client.send(new ConverseCommand(transformedBody), {
        abortSignal: signal || undefined,
      });
      return {
        response: new Response(JSON.stringify(openAICompletionFromConverse(output, model)), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
        url,
        headers,
        transformedBody,
      };
    } catch (error) {
      const status = statusFromError(error);
      return {
        response: new Response(JSON.stringify(errorBody(error)), {
          status,
          headers: { "Content-Type": "application/json" },
        }),
        url,
        headers,
        transformedBody,
      };
    }
  }
}

export default BedrockExecutor;
