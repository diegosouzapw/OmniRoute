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

export const REPLICATE_DEFAULT_BASE_URL = "https://api.replicate.com/v1";
export const REPLICATE_DEFAULT_POLL_INTERVAL_MS = 1000;
export const REPLICATE_DEFAULT_MAX_POLL_ATTEMPTS = 120;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
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

function toNonEmptyString(value: unknown): string {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function toFiniteNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function toPositiveInteger(value: unknown, fallback: number): number {
  const parsed = toFiniteNumber(value);
  if (parsed === null) return fallback;
  return Math.max(1, Math.floor(parsed));
}

function normalizeBaseUrl(baseUrl: string | null | undefined): string {
  return typeof baseUrl === "string" && baseUrl.trim()
    ? baseUrl.trim().replace(/\/+$/, "")
    : REPLICATE_DEFAULT_BASE_URL;
}

function normalizeModelId(model: string): string {
  const trimmed = String(model || "").trim();
  return trimmed.startsWith("replicate/") ? trimmed.slice("replicate/".length) : trimmed;
}

function createdAtToUnix(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.floor(value);
  }
  if (typeof value === "string" && value.trim()) {
    const parsed = Date.parse(value);
    if (Number.isFinite(parsed)) {
      return Math.floor(parsed / 1000);
    }
  }
  return Math.floor(Date.now() / 1000);
}

function encodePathSegments(path: string): string {
  return path
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function isVersionSuffix(version: string): boolean {
  return /^[a-f0-9]{8,}$/i.test(version);
}

function splitModelVersion(model: string): { modelPath: string; version: string } {
  const normalized = normalizeModelId(model);
  const slashIndex = normalized.lastIndexOf("/");
  const colonIndex = normalized.lastIndexOf(":");
  if (colonIndex > slashIndex) {
    const modelPath = normalized.slice(0, colonIndex).trim();
    const version = normalized.slice(colonIndex + 1).trim();
    if (modelPath && version) {
      return { modelPath, version };
    }
  }
  return { modelPath: normalized, version: "" };
}

function getMessageTextParts(content: unknown): string[] {
  if (typeof content === "string" && content.trim()) {
    return [content.trim()];
  }
  if (!Array.isArray(content)) return [];

  const fragments: string[] = [];
  for (const rawItem of content) {
    const item = asRecord(rawItem);
    const type = toNonEmptyString(item.type);
    if ((type === "text" || type === "input_text") && toNonEmptyString(item.text)) {
      fragments.push(toNonEmptyString(item.text));
      continue;
    }

    if (type === "image_url") {
      const imageUrl = toNonEmptyString(asRecord(item.image_url).url) || toNonEmptyString(item.url);
      if (imageUrl) {
        fragments.push(`Image URL: ${imageUrl}`);
      }
      continue;
    }

    if (type === "input_image") {
      const imageUrl = toNonEmptyString(item.image_url) || toNonEmptyString(item.url);
      if (imageUrl) {
        fragments.push(`Image URL: ${imageUrl}`);
      }
    }
  }

  return fragments;
}

function extractImageInputs(messages: unknown[]): string[] {
  const images: string[] = [];
  for (const rawMessage of messages) {
    const message = asRecord(rawMessage);
    const content = message.content;

    if (!Array.isArray(content)) continue;
    for (const rawItem of content) {
      const item = asRecord(rawItem);
      const type = toNonEmptyString(item.type);
      if (type === "image_url") {
        const imageUrl =
          toNonEmptyString(asRecord(item.image_url).url) || toNonEmptyString(item.url);
        if (imageUrl) images.push(imageUrl);
        continue;
      }
      if (type === "input_image") {
        const imageUrl = toNonEmptyString(item.image_url) || toNonEmptyString(item.url);
        if (imageUrl) images.push(imageUrl);
      }
    }
  }

  return Array.from(new Set(images));
}

function buildPromptFromMessages(messages: unknown[]): { prompt: string; systemPrompt: string } {
  const promptLines: string[] = [];
  const systemLines: string[] = [];

  for (const rawMessage of messages) {
    const message = asRecord(rawMessage);
    const role = toNonEmptyString(message.role).toLowerCase();
    const text = getMessageTextParts(message.content).join("\n").trim();

    if (role === "system") {
      if (text) systemLines.push(text);
      continue;
    }

    if (role === "assistant" && Array.isArray(message.tool_calls)) {
      const toolCalls = message.tool_calls
        .map((toolCall) => asRecord(toolCall))
        .map((toolCall) => {
          const fn = asRecord(toolCall.function);
          const name = toNonEmptyString(fn.name) || "tool";
          const args = toNonEmptyString(fn.arguments) || "{}";
          return `Assistant called tool ${name} with arguments ${args}`;
        })
        .filter(Boolean);
      if (toolCalls.length > 0) {
        promptLines.push(...toolCalls);
      }
    }

    if (role === "tool") {
      const toolCallId = toNonEmptyString(message.tool_call_id);
      if (text) {
        promptLines.push(`Tool${toolCallId ? ` (${toolCallId})` : ""}: ${text}`);
      }
      continue;
    }

    if (!text) continue;

    const label = role === "assistant" ? "Assistant" : role === "user" ? "User" : "Message";
    promptLines.push(`${label}: ${text}`);
  }

  if (promptLines.length === 0 && systemLines.length > 0) {
    promptLines.push(systemLines.join("\n"));
  }

  return {
    prompt: promptLines.join("\n\n").trim(),
    systemPrompt: systemLines.join("\n\n").trim(),
  };
}

function normalizeReplicateMessages(messages: unknown[]): JsonRecord[] {
  const normalized: JsonRecord[] = [];

  for (const rawMessage of messages) {
    const message = asRecord(rawMessage);
    const role = toNonEmptyString(message.role).toLowerCase();
    if (!role) continue;

    const content = getMessageTextParts(message.content).join("\n").trim();
    const nextMessage: JsonRecord = {
      role,
      content,
    };

    if (role === "assistant" && Array.isArray(message.tool_calls)) {
      nextMessage.tool_calls = message.tool_calls;
    }
    if (role === "tool" && toNonEmptyString(message.tool_call_id)) {
      nextMessage.tool_call_id = toNonEmptyString(message.tool_call_id);
    }

    normalized.push(nextMessage);
  }

  return normalized;
}

function shouldUseMessagesInput(
  model: string,
  body: JsonRecord,
  providerSpecificData: JsonRecord
): boolean {
  const explicitMode = toNonEmptyString(providerSpecificData.inputMode).toLowerCase();
  if (explicitMode === "prompt") return false;
  if (explicitMode === "messages") return true;
  if (providerSpecificData.useMessagesInput === true) return true;
  if (providerSpecificData.useMessagesInput === false) return false;

  const { modelPath } = splitModelVersion(model);
  const owner = modelPath.split("/")[0]?.toLowerCase() || "";

  return owner === "openai";
}

function readReasoningEffort(body: JsonRecord): string {
  const nested = toNonEmptyString(asRecord(body.reasoning).effort);
  if (nested) return nested;
  return toNonEmptyString(body.reasoning_effort);
}

export function getReplicateBaseUrl(
  providerSpecificData: JsonRecord | null | undefined,
  fallbackBaseUrl = REPLICATE_DEFAULT_BASE_URL
): string {
  return normalizeBaseUrl(
    toNonEmptyString(providerSpecificData?.baseUrl) ||
      toNonEmptyString(providerSpecificData?.endpoint) ||
      fallbackBaseUrl ||
      REPLICATE_DEFAULT_BASE_URL
  );
}

export function buildReplicateAccountUrl(baseUrl: string): string {
  const url = new URL(getReplicateBaseUrl({ baseUrl }));
  url.pathname = "/v1/account";
  return url.toString();
}

export function buildReplicatePredictionUrl({
  baseUrl,
  model,
}: {
  baseUrl: string;
  model: string;
}): string {
  const { modelPath } = splitModelVersion(model);
  const normalizedBaseUrl = getReplicateBaseUrl({ baseUrl });
  const url = new URL(normalizedBaseUrl);
  const cleanedPath = modelPath.replace(/^\/+/, "");

  if (cleanedPath.startsWith("deployments/")) {
    const deploymentPath = cleanedPath.slice("deployments/".length);
    url.pathname = `/v1/deployments/${encodePathSegments(deploymentPath)}/predictions`;
    return url.toString();
  }

  if (cleanedPath.startsWith("deployment/")) {
    const deploymentPath = cleanedPath.slice("deployment/".length);
    url.pathname = `/v1/deployments/${encodePathSegments(deploymentPath)}/predictions`;
    return url.toString();
  }

  url.pathname = `/v1/models/${encodePathSegments(cleanedPath)}/predictions`;
  return url.toString();
}

export function buildReplicateHeaders(
  credentials: Pick<ProviderCredentials, "apiKey" | "accessToken" | "providerSpecificData">,
  stream = false
): Record<string, string> {
  const token = toNonEmptyString(credentials.apiKey) || toNonEmptyString(credentials.accessToken);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: stream ? "text/event-stream" : "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  applyConfiguredUserAgent(headers, credentials.providerSpecificData || null);
  return headers;
}

export function buildReplicatePredictionRequest(
  model: string,
  body: unknown,
  stream: boolean,
  providerSpecificData: JsonRecord | null | undefined = null
): JsonRecord {
  const source = asRecord(body);
  const psd = asRecord(providerSpecificData);
  const messages = Array.isArray(source.messages) ? source.messages : [];
  const { prompt, systemPrompt } = buildPromptFromMessages(messages);
  const useMessagesInput = shouldUseMessagesInput(model, source, psd);
  const inputOverrides = parseMaybeRecord(psd.inputOverrides);
  const input: JsonRecord = {};

  if (useMessagesInput) {
    const normalizedMessages = normalizeReplicateMessages(messages);
    if (normalizedMessages.length > 0) {
      input.messages = normalizedMessages;
    }
    if (Array.isArray(source.tools) && source.tools.length > 0) {
      input.tools = source.tools;
    }
    if (source.tool_choice !== undefined) {
      input.tool_choice = source.tool_choice;
    }
  } else {
    const fallbackPrompt = prompt || toNonEmptyString(source.prompt);
    if (fallbackPrompt) {
      input.prompt = fallbackPrompt;
    }
    if (systemPrompt) {
      input.system_prompt = systemPrompt;
    }
  }

  const imageInputs = extractImageInputs(messages);
  if (imageInputs.length > 0) {
    input.image_input = imageInputs;
  }

  const { version } = splitModelVersion(model);
  const owner = splitModelVersion(model).modelPath.split("/")[0]?.toLowerCase() || "";
  const maxTokens =
    toFiniteNumber(source.max_completion_tokens) ??
    toFiniteNumber(source.max_output_tokens) ??
    toFiniteNumber(source.max_tokens);

  if (maxTokens !== null) {
    if (owner === "openai" && useMessagesInput) {
      input.max_completion_tokens = Math.max(1, Math.floor(maxTokens));
    } else {
      input.max_tokens = Math.max(1, Math.floor(maxTokens));
    }
  }

  const temperature = toFiniteNumber(source.temperature);
  if (temperature !== null) input.temperature = temperature;

  const topP = toFiniteNumber(source.top_p);
  if (topP !== null) input.top_p = topP;

  const topK = toFiniteNumber(source.top_k);
  if (topK !== null) input.top_k = Math.floor(topK);

  const presencePenalty = toFiniteNumber(source.presence_penalty);
  if (presencePenalty !== null) input.presence_penalty = presencePenalty;

  const frequencyPenalty = toFiniteNumber(source.frequency_penalty);
  if (frequencyPenalty !== null) input.frequency_penalty = frequencyPenalty;

  const seed = toFiniteNumber(source.seed);
  if (seed !== null) input.seed = Math.floor(seed);

  const reasoningEffort = readReasoningEffort(source);
  if (reasoningEffort && owner === "openai") {
    input.reasoning_effort = reasoningEffort;
  }

  const verbosity =
    toNonEmptyString(asRecord(source.text).verbosity) || toNonEmptyString(source.verbosity);
  if (verbosity && owner === "openai") {
    input.verbosity = verbosity;
  }

  Object.assign(input, inputOverrides);

  const request: JsonRecord = {
    input,
    stream,
  };

  if (version && isVersionSuffix(version)) {
    request.version = version;
  }

  return request;
}

function extractTextFromOutput(output: unknown): string {
  if (typeof output === "string") return output;
  if (Array.isArray(output)) {
    return output.map((item) => extractTextFromOutput(item)).join("");
  }
  const data = asRecord(output);
  if (typeof data.content === "string") return data.content;
  if (typeof data.text === "string") return data.text;
  if (typeof data.output_text === "string") return data.output_text;
  if (data.message) {
    const message = asRecord(data.message);
    if (typeof message.content === "string") return message.content;
    if (Array.isArray(message.content)) {
      return message.content
        .map((item) => {
          const block = asRecord(item);
          return toNonEmptyString(block.text) || extractTextFromOutput(block);
        })
        .join("");
    }
  }
  return "";
}

function buildUsage(prediction: JsonRecord): JsonRecord {
  const output = asRecord(prediction.output);
  const usage = asRecord(output.usage);
  if (Object.keys(usage).length > 0) {
    return usage;
  }

  const metrics = asRecord(prediction.metrics);
  const promptTokens =
    toFiniteNumber(metrics.prompt_tokens) ??
    toFiniteNumber(metrics.input_tokens) ??
    toFiniteNumber(metrics.inputTokenCount) ??
    0;
  const completionTokens =
    toFiniteNumber(metrics.completion_tokens) ??
    toFiniteNumber(metrics.output_tokens) ??
    toFiniteNumber(metrics.outputTokenCount) ??
    0;
  const totalTokens = toFiniteNumber(metrics.total_tokens) ?? promptTokens + completionTokens;

  return {
    prompt_tokens: promptTokens,
    completion_tokens: completionTokens,
    total_tokens: totalTokens,
  };
}

export function normalizeReplicatePredictionToOpenAI(
  model: string,
  prediction: unknown
): JsonRecord {
  const data = asRecord(prediction);
  const output = data.output;
  const created = createdAtToUnix(data.created_at);
  const modelId = normalizeModelId(model);

  if (output && typeof output === "object" && !Array.isArray(output)) {
    const outputRecord = asRecord(output);
    if (Array.isArray(outputRecord.choices)) {
      return {
        ...outputRecord,
        id:
          toNonEmptyString(outputRecord.id) ||
          `chatcmpl-replicate-${toNonEmptyString(data.id) || randomUUID()}`,
        object: toNonEmptyString(outputRecord.object) || "chat.completion",
        created: typeof outputRecord.created === "number" ? outputRecord.created : created,
        model: toNonEmptyString(outputRecord.model) || modelId,
        ...(outputRecord.usage ? {} : { usage: buildUsage(data) }),
      };
    }
  }

  const toolCalls = Array.isArray(asRecord(asRecord(output).message).tool_calls)
    ? (asRecord(asRecord(output).message).tool_calls as unknown[])
    : Array.isArray(asRecord(output).tool_calls)
      ? (asRecord(output).tool_calls as unknown[])
      : [];

  return {
    id: `chatcmpl-replicate-${toNonEmptyString(data.id) || randomUUID()}`,
    object: "chat.completion",
    created,
    model: modelId,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: extractTextFromOutput(output) || null,
          ...(toolCalls.length > 0 ? { tool_calls: toolCalls } : {}),
        },
        finish_reason: toolCalls.length > 0 ? "tool_calls" : "stop",
      },
    ],
    usage: buildUsage(data),
  };
}

function isTerminalStatus(status: string): boolean {
  return ["succeeded", "failed", "canceled", "cancelled", "aborted"].includes(status);
}

function predictionErrorMessage(prediction: JsonRecord): string {
  return (
    toNonEmptyString(prediction.error) ||
    toNonEmptyString(asRecord(prediction.output).error) ||
    `Replicate prediction ended with status ${toNonEmptyString(prediction.status) || "unknown"}`
  );
}

function buildStreamingChunk({
  id,
  created,
  model,
  delta,
  includeRole,
}: {
  id: string;
  created: number;
  model: string;
  delta?: string;
  includeRole?: boolean;
}): string {
  return `data: ${JSON.stringify({
    id,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [
      {
        index: 0,
        delta: {
          ...(includeRole ? { role: "assistant" } : {}),
          ...(delta ? { content: delta } : {}),
        },
        finish_reason: null,
      },
    ],
  })}\n\n`;
}

function buildFinalStreamingChunk({
  id,
  created,
  model,
  finishReason,
  usage,
  toolCalls,
}: {
  id: string;
  created: number;
  model: string;
  finishReason: string;
  usage: JsonRecord;
  toolCalls: unknown[];
}): string[] {
  const chunks: string[] = [];

  if (toolCalls.length > 0) {
    for (const [index, rawToolCall] of toolCalls.entries()) {
      const toolCall = asRecord(rawToolCall);
      const fn = asRecord(toolCall.function);
      chunks.push(
        `data: ${JSON.stringify({
          id,
          object: "chat.completion.chunk",
          created,
          model,
          choices: [
            {
              index: 0,
              delta: {
                ...(index === 0 ? { role: "assistant" } : {}),
                tool_calls: [
                  {
                    index,
                    id: toNonEmptyString(toolCall.id) || `call_${randomUUID()}`,
                    type: "function",
                    function: {
                      name: toNonEmptyString(fn.name),
                      arguments:
                        typeof fn.arguments === "string"
                          ? fn.arguments
                          : JSON.stringify(fn.arguments || {}),
                    },
                  },
                ],
              },
              finish_reason: null,
            },
          ],
        })}\n\n`
      );
    }
  }

  chunks.push(
    `data: ${JSON.stringify({
      id,
      object: "chat.completion.chunk",
      created,
      model,
      choices: [{ index: 0, delta: {}, finish_reason: finishReason }],
      ...(Object.keys(usage).length > 0 ? { usage } : {}),
    })}\n\n`
  );
  chunks.push("data: [DONE]\n\n");
  return chunks;
}

function waitFor(ms: number, signal?: AbortSignal | null) {
  if (signal?.aborted) {
    return Promise.reject(signal.reason || new Error("Aborted"));
  }

  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      resolve();
    }, ms);

    const onAbort = () => {
      cleanup();
      reject(signal?.reason || new Error("Aborted"));
    };

    const cleanup = () => {
      clearTimeout(timer);
      signal?.removeEventListener("abort", onAbort);
    };

    signal?.addEventListener("abort", onAbort, { once: true });
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

async function fetchPrediction(
  predictionUrl: string,
  headers: Record<string, string>,
  signal?: AbortSignal | null
): Promise<JsonRecord> {
  const response = await fetch(predictionUrl, {
    method: "GET",
    headers,
    signal: signal || undefined,
  });

  if (!response.ok) {
    const raw = await response.text().catch(() => "");
    throw new Error(raw || `Replicate polling failed with status ${response.status}`);
  }

  const payload = await response.json().catch(() => ({}));
  return asRecord(payload);
}

function buildReplicateStreamingResponse({
  model,
  predictionUrl,
  headers,
  initialPrediction,
  signal,
  pollIntervalMs,
  maxPollAttempts,
}: {
  model: string;
  predictionUrl: string;
  headers: Record<string, string>;
  initialPrediction: JsonRecord;
  signal?: AbortSignal | null;
  pollIntervalMs: number;
  maxPollAttempts: number;
}) {
  const encoder = new TextEncoder();
  const responseId = `chatcmpl-replicate-${toNonEmptyString(initialPrediction.id) || randomUUID()}`;
  const created = createdAtToUnix(initialPrediction.created_at);
  const normalizedModel = normalizeModelId(model);

  const stream = new ReadableStream({
    async start(controller) {
      let attempts = 0;
      let previousText = "";
      let emittedRole = false;
      let currentPrediction = initialPrediction;

      try {
        while (attempts <= maxPollAttempts) {
          const normalized = normalizeReplicatePredictionToOpenAI(
            normalizedModel,
            currentPrediction
          );
          const choice = asRecord(Array.isArray(normalized.choices) ? normalized.choices[0] : null);
          const message = asRecord(choice.message);
          const currentText = toNonEmptyString(message.content);
          const delta = currentText.slice(previousText.length);

          if (delta) {
            controller.enqueue(
              encoder.encode(
                buildStreamingChunk({
                  id: responseId,
                  created,
                  model: normalizedModel,
                  delta,
                  includeRole: !emittedRole,
                })
              )
            );
            emittedRole = true;
            previousText = currentText;
          }

          const status = toNonEmptyString(currentPrediction.status).toLowerCase();
          if (isTerminalStatus(status)) {
            if (status !== "succeeded") {
              throw new Error(predictionErrorMessage(currentPrediction));
            }

            const toolCalls = Array.isArray(message.tool_calls) ? message.tool_calls : [];
            const usage = asRecord(normalized.usage);
            const finishReason =
              toNonEmptyString(choice.finish_reason) ||
              (toolCalls.length > 0 ? "tool_calls" : "stop");
            for (const chunk of buildFinalStreamingChunk({
              id: responseId,
              created,
              model: normalizedModel,
              finishReason,
              usage,
              toolCalls,
            })) {
              controller.enqueue(encoder.encode(chunk));
            }
            controller.close();
            return;
          }

          attempts += 1;
          if (attempts > maxPollAttempts) {
            throw new Error("Replicate polling timed out before prediction completed");
          }

          await waitFor(pollIntervalMs, signal);
          currentPrediction = await fetchPrediction(predictionUrl, headers, signal);
        }
      } catch (error) {
        controller.error(error instanceof Error ? error : new Error(String(error)));
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export class ReplicateExecutor extends BaseExecutor {
  constructor(provider = "replicate") {
    super(provider, PROVIDERS[provider] || { id: provider, baseUrl: REPLICATE_DEFAULT_BASE_URL });
  }

  buildUrl(
    model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ): string {
    const baseUrl = getReplicateBaseUrl(
      asRecord(credentials?.providerSpecificData),
      this.config.baseUrl
    );
    return buildReplicatePredictionUrl({ baseUrl, model });
  }

  buildHeaders(credentials: ProviderCredentials, stream = false): Record<string, string> {
    return buildReplicateHeaders(credentials, stream);
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials | null = null
  ): JsonRecord {
    return buildReplicatePredictionRequest(
      model,
      body,
      stream,
      asRecord(credentials?.providerSpecificData)
    );
  }

  async execute({ model, body, stream, credentials, signal, upstreamExtraHeaders }: ExecuteInput) {
    const token =
      toNonEmptyString(credentials?.apiKey) || toNonEmptyString(credentials?.accessToken);
    if (!token) {
      return {
        response: errorResponse(HTTP_STATUS.UNAUTHORIZED, "Replicate requires an API token"),
        url: "",
        headers: {},
        transformedBody: body,
      };
    }

    const providerSpecificData = asRecord(credentials?.providerSpecificData);
    const url = this.buildUrl(model, false, 0, credentials);
    const transformedBody = this.transformRequest(model, body, stream, credentials);
    const bodyString = JSON.stringify(transformedBody);
    const headers = this.buildHeaders(credentials, false);
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);
    applyConfiguredUserAgent(headers, providerSpecificData);

    let createResponse: Response;
    try {
      createResponse = await fetch(url, {
        method: "POST",
        headers,
        body: bodyString,
        signal: signal || undefined,
      });
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      if (err.name === "AbortError") throw err;
      return {
        response: errorResponse(HTTP_STATUS.BAD_GATEWAY, `Replicate fetch error: ${err.message}`),
        url,
        headers,
        transformedBody,
      };
    }

    if (!createResponse.ok) {
      return { response: createResponse, url, headers, transformedBody };
    }

    const createdPrediction = asRecord(await createResponse.json().catch(() => ({})));
    if (Object.keys(createdPrediction).length === 0) {
      return {
        response: errorResponse(
          HTTP_STATUS.BAD_GATEWAY,
          "Replicate returned a non-JSON prediction response"
        ),
        url,
        headers,
        transformedBody,
      };
    }

    const predictionUrl =
      toNonEmptyString(asRecord(createdPrediction.urls).get) ||
      `${getReplicateBaseUrl(providerSpecificData, this.config.baseUrl)}/predictions/${toNonEmptyString(createdPrediction.id)}`;
    const pollIntervalMs = toPositiveInteger(
      providerSpecificData.pollIntervalMs,
      REPLICATE_DEFAULT_POLL_INTERVAL_MS
    );
    const maxPollAttempts = toPositiveInteger(
      providerSpecificData.maxPollAttempts,
      REPLICATE_DEFAULT_MAX_POLL_ATTEMPTS
    );

    if (stream) {
      return {
        response: buildReplicateStreamingResponse({
          model,
          predictionUrl,
          headers,
          initialPrediction: createdPrediction,
          signal,
          pollIntervalMs,
          maxPollAttempts,
        }),
        url,
        headers,
        transformedBody,
      };
    }

    let currentPrediction = createdPrediction;
    let attempts = 0;
    while (!isTerminalStatus(toNonEmptyString(currentPrediction.status).toLowerCase())) {
      attempts += 1;
      if (attempts > maxPollAttempts) {
        return {
          response: errorResponse(
            HTTP_STATUS.BAD_GATEWAY,
            "Replicate polling timed out before prediction completed"
          ),
          url,
          headers,
          transformedBody,
        };
      }

      await waitFor(pollIntervalMs, signal);
      try {
        currentPrediction = await fetchPrediction(predictionUrl, headers, signal);
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        if (err.name === "AbortError") throw err;
        return {
          response: errorResponse(HTTP_STATUS.BAD_GATEWAY, err.message),
          url,
          headers,
          transformedBody,
        };
      }
    }

    if (toNonEmptyString(currentPrediction.status).toLowerCase() !== "succeeded") {
      return {
        response: errorResponse(HTTP_STATUS.BAD_GATEWAY, predictionErrorMessage(currentPrediction)),
        url,
        headers,
        transformedBody,
      };
    }

    const normalized = normalizeReplicatePredictionToOpenAI(model, currentPrediction);
    return {
      response: new Response(JSON.stringify(normalized), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
      url,
      headers,
      transformedBody,
    };
  }
}

export default ReplicateExecutor;
