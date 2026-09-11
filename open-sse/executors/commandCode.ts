import { randomUUID } from "node:crypto";

import { isVisionModelId } from "@/shared/constants/visionModels";
import { MUSE_SPARK_PATTERN } from "./base/reasoningEffort.ts";
import { REGISTRY } from "../config/providerRegistry.ts";
import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  sanitizeReasoningEffortForProvider,
  type ExecuteInput,
} from "./base.ts";

type JsonRecord = Record<string, unknown>;

export const COMMAND_CODE_VERSION = process.env.COMMAND_CODE_VERSION?.trim() || "1.15.1";

// Defensive server-side ceiling for a CLIENT-SUPPLIED max_tokens:
// any request with params.max_tokens > 200_000 is rejected with a 400
// "Too big: expected number to be <=200000 at params.max_tokens". We only clamp
// a client-supplied value down; we never fabricate this number for requests
// that omit the field.
const MAX_COMMAND_CODE_TOKENS = 200_000;
const encoder = new TextEncoder();

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asRecordArray(value: unknown): JsonRecord[] {
  return Array.isArray(value) ? value.filter(isRecord) : [];
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function numberValue(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function recordOrEmpty(value: unknown): JsonRecord {
  if (isRecord(value)) return value;
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed: unknown = JSON.parse(value);
      if (isRecord(parsed)) return parsed;
    } catch (error) {
      console.warn(
        "[commandCode] tool arg parse failed:",
        error instanceof Error ? error.message : String(error)
      );
    }
  }
  return {};
}

function clampMaxTokens(value: unknown): number | undefined {
  const numeric = numberValue(value);
  if (numeric === undefined || numeric <= 0) return undefined;
  return Math.min(Math.floor(numeric), MAX_COMMAND_CODE_TOKENS);
}

/**
 * muse-spark (Meta) models are served through command-code with a hidden
 * server-side reasoning phase that consumes the entire output budget before any
 * visible content is emitted. With small caller-set budgets the upstream
 * answers HTTP 200 with an empty message and `completion_tokens == max_tokens`
 * (the symptom this fix targets: `out=64, reasoning=61` with null content);
 * chatCore then flags the fake success as "Provider returned empty content".
 *
 * Floor raised budgets only — explicit large budgets are untouched, and no
 * budget is synthesized when the caller set none. Detection is prefix-aware so
 * provider-prefixed ids (`meta/muse-spark-1.2-contributor`, `cmd/meta/muse-…`)
 * are caught, not just bare `muse-spark-*`.
 */
const MUSE_SPARK_MIN_OUTPUT_TOKENS = 512;

function applyMuseSparkMinOutputTokens(model: string, body: JsonRecord): void {
  if (!MUSE_SPARK_PATTERN.test(model)) return;
  const current = body.max_tokens;
  if (typeof current !== "number" || !Number.isFinite(current)) return;
  if (current >= MUSE_SPARK_MIN_OUTPUT_TOKENS) return;
  body.max_tokens = MUSE_SPARK_MIN_OUTPUT_TOKENS;
}

const COMMAND_CODE_PASSTHROUGH_FIELDS = [
  "reasoning_effort",
  "reasoning",
  "thinking",
  "effort",
  "output_config",
  "extra_body",
] as const;

/**
 * Command Code serves most models under a vendor-prefixed wire id (e.g.
 * `xiaomi/mimo-v2.5`, `deepseek/deepseek-v4-pro`, `moonshotai/Kimi-K2.6`).
 * The command-code registry ids already carry the vendor prefix, so a bare id
 * reaching the executor is an operator-set custom model (e.g. the Vision Bridge
 * picker, #10809). Map the small set of documented bare ids to their
 * vendor-prefixed wire form; anything with an explicit `/` (or already wired)
 * passes through untouched. Kept minimal and doc-backed.
 */
const COMMAND_CODE_BARE_MODEL_VENDOR_PREFIX: Readonly<Record<string, string>> = {
  "mimo-v2.5": "xiaomi/mimo-v2.5",
  "mimo-v2.5-pro": "xiaomi/mimo-v2.5-pro",
};

function normalizeCommandCodeWireModel(model: string): string {
  const trimmed = String(model || "").trim();
  if (!trimmed) return trimmed;
  const bare = trimmed.replace(/^(?:command-code|cmd)\//, "");
  if (bare.includes("/")) return bare;
  return COMMAND_CODE_BARE_MODEL_VENDOR_PREFIX[bare] ?? bare;
}

// ── OpenAi Flat Body Builder (/provider/v1/chat/completions) ─────────────────

function buildOpenAiBody(model: string, body: unknown, stream: boolean): { body: JsonRecord } {
  const input = isRecord(body) ? { ...(body as JsonRecord) } : {};

  const resolvedModel = normalizeCommandCodeWireModel(
    typeof input.model === "string" && input.model.trim().length > 0 ? input.model : model
  );

  const out: JsonRecord = {
    ...input,
    model: resolvedModel,
    stream: stream === true,
  };

  const maxTokens = clampMaxTokens(input.max_tokens ?? input.max_completion_tokens);
  delete out.max_tokens;
  delete out.max_completion_tokens;
  if (maxTokens !== undefined) {
    out.max_tokens = maxTokens;
  }
  applyMuseSparkMinOutputTokens(resolvedModel, out);

  return { body: out };
}

// ── CLI Body Builder & Converters (/alpha/generate fallback) ─────────────────

function toolCallArgumentsString(value: unknown): string {
  if (isRecord(value)) return JSON.stringify(value);
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed: unknown = JSON.parse(value);
      if (isRecord(parsed)) return value;
    } catch {
      return "{}";
    }
    return "{}";
  }
  return JSON.stringify(recordOrEmpty(value));
}

const COMMAND_CODE_RESERVED_TOOL_NAMES = new Set(["tool_search"]);

function wireToolName(clientName: string, toolNameMap: Map<string, string>): string {
  if (COMMAND_CODE_RESERVED_TOOL_NAMES.has(clientName)) {
    const wire = `omniroute_${clientName}`;
    toolNameMap.set(wire, clientName);
    return wire;
  }
  return clientName;
}

function clientToolName(wireName: string, toolNameMap: Map<string, string>): string {
  return toolNameMap.get(wireName) ?? wireName;
}

function normalizeContentText(content: unknown): string {
  if (typeof content === "string") return content;
  return asRecordArray(content)
    .filter((part) => part.type === "text")
    .map((part) => stringValue(part.text) || "")
    .join("\n");
}

const CC_VISION_MODEL_PATTERNS: readonly RegExp[] = [
  /kimi-k2/i,
  /qwen3\.\d/i,
  /step-?3/i,
  /claude-fable/i,
  /gpt-5/i,
  /fugu/i,
];

function isCommandCodeVisionModel(model?: string | null): boolean {
  if (!model) return false;
  if (/(?:^|\/)mimo-v2\.5-pro$/i.test(model)) return false;
  if (/(?:^|\/)mimo-v2\.5$/i.test(model)) return true;
  if (/(?:^|\/)mimo-v2-omni$/i.test(model)) return true;
  if (CC_VISION_MODEL_PATTERNS.some((pattern) => pattern.test(model))) return true;
  return isVisionModelId(model);
}

function extractImageUrl(part: JsonRecord): string | undefined {
  if (part.type === "image") {
    const direct = stringValue(part.image);
    if (direct) return direct;

    const source = isRecord(part.source) ? part.source : null;
    if (source) {
      if (source.type === "base64") {
        const mediaType = stringValue(source.media_type) || "image/png";
        const data = stringValue(source.data);
        if (data) return `data:${mediaType};base64,${data}`;
      }
      if (source.type === "url") {
        const url = stringValue(source.url);
        if (url) return url;
      }
    }
    return undefined;
  }
  if (part.type === "image_url") {
    if (isRecord(part.image_url)) return stringValue(part.image_url.url);
    return stringValue(part.image_url);
  }
  return undefined;
}

function convertUserContentParts(content: unknown, isVisionModel: boolean): string | unknown[] {
  if (!isVisionModel || typeof content === "string") {
    return normalizeContentText(content);
  }

  const parts: unknown[] = [];
  for (const part of asRecordArray(content)) {
    if (part.type === "text") {
      const text = stringValue(part.text);
      if (text) parts.push({ type: "text", text });
      continue;
    }
    const imgUrl = extractImageUrl(part);
    if (imgUrl) {
      parts.push({ type: "image", image: imgUrl });
      continue;
    }
  }

  if (parts.length === 0) parts.push({ type: "text", text: "" });
  return parts;
}

function convertTools(tools: unknown, toolNameMap: Map<string, string>): unknown[] {
  return asRecordArray(tools).map((tool) => {
    const fn = isRecord(tool.function) ? tool.function : tool;
    return {
      type: "function",
      name: wireToolName(stringValue(fn.name) || "", toolNameMap),
      description: stringValue(fn.description) || "",
      input_schema: isRecord(fn.parameters) ? fn.parameters : {},
    };
  });
}

function buildToolCallMetadata(
  messages: JsonRecord[],
  toolNameMap: Map<string, string>
): {
  pairedToolCallIds: Set<string>;
  toolCallNames: Map<string, string>;
  toolCallArgs: Map<string, string>;
} {
  const callIds = new Set<string>();
  const resultIds = new Set<string>();
  const toolCallNames = new Map<string, string>();
  const toolCallArgs = new Map<string, string>();

  for (const message of messages) {
    if (message.role === "assistant") {
      for (const call of asRecordArray(message.tool_calls)) {
        const id = stringValue(call.id);
        if (id) {
          callIds.add(id);
          const fn = isRecord(call.function) ? call.function : {};
          const name = stringValue(fn.name) || stringValue(call.name);
          if (name) toolCallNames.set(id, wireToolName(name, toolNameMap));
          toolCallArgs.set(id, toolCallArgumentsString(fn.arguments));
        }
      }
    } else if (message.role === "tool") {
      const id = stringValue(message.tool_call_id);
      if (id) resultIds.add(id);
    }
  }

  const pairedToolCallIds = new Set([...callIds].filter((id) => resultIds.has(id)));
  return { pairedToolCallIds, toolCallNames, toolCallArgs };
}

function convertMessages(
  messages: unknown,
  model?: string | null,
  toolNameMap?: Map<string, string>
): { system: string; messages: unknown[] } {
  const source = asRecordArray(messages);
  const { pairedToolCallIds, toolCallNames, toolCallArgs } = buildToolCallMetadata(
    source,
    toolNameMap ?? new Map<string, string>()
  );
  const out: unknown[] = [];
  const system: string[] = [];
  const isVision = isCommandCodeVisionModel(model);

  for (const message of source) {
    const role = stringValue(message.role);
    if (role === "system" || role === "developer") {
      const text = normalizeContentText(message.content);
      if (text) system.push(text);
      continue;
    }

    if (role === "user") {
      out.push({ role: "user", content: convertUserContentParts(message.content, isVision) });
      continue;
    }

    if (role === "assistant") {
      const parts: unknown[] = [];
      const text = normalizeContentText(message.content);
      if (text) parts.push({ type: "text", text });

      for (const call of asRecordArray(message.tool_calls)) {
        const id = stringValue(call.id) || "";
        if (!id || !pairedToolCallIds.has(id)) continue;
        const fn = isRecord(call.function) ? call.function : {};
        const parsedInput = recordOrEmpty(fn.arguments);
        parts.push({
          type: "tool-call",
          toolCallId: id,
          toolName: wireToolName(
            stringValue(fn.name) || stringValue(call.name) || "unknown",
            toolNameMap ?? new Map<string, string>()
          ),
          input: parsedInput,
          arguments: toolCallArgumentsString(fn.arguments),
        });
      }

      if (parts.length > 0) out.push({ role: "assistant", content: parts });
      continue;
    }

    if (role === "tool") {
      const toolCallId = stringValue(message.tool_call_id) || "";
      if (!toolCallId || !pairedToolCallIds.has(toolCallId)) continue;
      const toolName = wireToolName(
        stringValue(message.name) || toolCallNames.get(toolCallId) || "unknown",
        toolNameMap ?? new Map<string, string>()
      );
      out.push({
        role: "tool",
        content: [
          {
            type: "tool-result",
            toolCallId,
            toolName,
            arguments: toolCallArgs.get(toolCallId) ?? "{}",
            output: { type: "text", value: normalizeContentText(message.content) },
          },
        ],
      });
    }
  }

  return { system: system.join("\n\n"), messages: out };
}

function buildCommandCodeCliBody(
  model: string,
  body: unknown,
  _stream = false
): { body: JsonRecord; toolNameMap: Map<string, string> } {
  const input = isRecord(body) ? body : {};
  const toolNameMap = new Map<string, string>();

  const resolvedModel = normalizeCommandCodeWireModel(
    typeof input.model === "string" && input.model.trim().length > 0 ? input.model : model
  );

  const converted = convertMessages(input.messages, resolvedModel, toolNameMap);
  const explicitSystem = typeof input.system === "string" ? input.system : "";
  const system = [converted.system, explicitSystem].filter(Boolean).join("\n\n");

  const params: JsonRecord = {
    model: resolvedModel,
    messages: converted.messages,
    tools: convertTools(input.tools, toolNameMap),
    system,
    stream: true,
  };

  const maxTokens = clampMaxTokens(input.max_tokens ?? input.max_completion_tokens);
  if (maxTokens !== undefined) {
    params.max_tokens = maxTokens;
  }
  applyMuseSparkMinOutputTokens(resolvedModel, params);

  for (const field of COMMAND_CODE_PASSTHROUGH_FIELDS) {
    const value = input[field];
    if (value !== undefined && value !== null) {
      params[field] = value;
    }
  }

  return {
    body: {
      config: {
        workingDir: "/workspace",
        date: new Date().toISOString().slice(0, 10),
        environment: "external",
        structure: [],
        isGitRepo: false,
        currentBranch: "",
        mainBranch: "",
        gitStatus: "",
        recentCommits: [],
      },
      memory: "",
      taste: "",
      skills: "",
      permissionMode: "standard",
      params,
    },
    toolNameMap,
  };
}

function parseStreamLine(line: string): unknown | undefined {
  let trimmed = line.trim();
  if (!trimmed || trimmed.startsWith(":") || trimmed.startsWith("event:")) return undefined;
  if (trimmed.startsWith("data:")) trimmed = trimmed.slice(5).trim();
  if (!trimmed || trimmed === "[DONE]") return undefined;

  try {
    return JSON.parse(trimmed);
  } catch (error) {
    console.warn(
      "[commandCode] stream line parse failed:",
      error instanceof Error ? error.message : String(error)
    );
    return undefined;
  }
}

function mapFinishReason(reason: unknown): "stop" | "length" | "tool_calls" {
  if (reason === "tool-calls" || reason === "tool_calls" || reason === "toolUse")
    return "tool_calls";
  if (
    reason === "length" ||
    reason === "max_tokens" ||
    reason === "max-tokens" ||
    reason === "max_output_tokens"
  ) {
    return "length";
  }
  return "stop";
}

function chatCompletionChunk(
  id: string,
  model: string,
  delta: JsonRecord,
  finishReason: unknown = null
) {
  return {
    id,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  };
}

function sse(data: unknown): Uint8Array {
  return encoder.encode(`data: ${JSON.stringify(data)}\n\n`);
}

type AggregateState = {
  content: string;
  reasoning: string;
  toolCalls: JsonRecord[];
  finishReason: "stop" | "length" | "tool_calls";
  usage: JsonRecord | null;
};

function firstRecord(record: JsonRecord, keys: readonly string[]): JsonRecord {
  for (const key of keys) {
    const value = record[key];
    if (isRecord(value)) return value;
  }
  return {};
}

function firstNumber(record: JsonRecord, keys: readonly string[]): number | undefined {
  for (const key of keys) {
    const value = numberValue(record[key]);
    if (value !== undefined) return value;
  }
  return undefined;
}

function mergeCommandCodeUsage(previous: JsonRecord | null, next: unknown): JsonRecord | null {
  if (!isRecord(next)) return previous;

  const merged: JsonRecord = { ...(previous || {}), ...next };
  for (const key of [
    "inputTokenDetails",
    "input_token_details",
    "input_tokens_details",
    "prompt_tokens_details",
    "outputTokenDetails",
    "output_token_details",
    "output_tokens_details",
    "completion_tokens_details",
    "reasoningTokenDetails",
    "reasoning_token_details",
  ]) {
    const before = isRecord(previous?.[key]) ? previous[key] : {};
    const after = isRecord(next[key]) ? next[key] : {};
    if (Object.keys(before).length > 0 || Object.keys(after).length > 0) {
      merged[key] = { ...before, ...after };
    }
  }
  return merged;
}

function rememberCommandCodeUsage(state: AggregateState, event: JsonRecord): void {
  const usage =
    event.type === "finish-step"
      ? (event.usage ?? event.totalUsage)
      : (event.totalUsage ?? event.usage);
  state.usage = mergeCommandCodeUsage(state.usage, usage);
}

function applyEventToAggregate(
  event: JsonRecord,
  state: AggregateState,
  toolNameMap: Map<string, string>
): void {
  rememberCommandCodeUsage(state, event);

  switch (event.type) {
    case "text-delta":
      state.content += stringValue(event.text) || "";
      break;
    case "reasoning-delta":
      state.reasoning += stringValue(event.text) || "";
      break;
    case "tool-call": {
      const args = recordOrEmpty(event.input ?? event.args ?? event.arguments);
      state.toolCalls.push({
        id: stringValue(event.toolCallId) || stringValue(event.id) || randomUUID(),
        type: "function",
        function: {
          name: clientToolName(
            stringValue(event.toolName) || stringValue(event.name) || "",
            toolNameMap
          ),
          arguments: JSON.stringify(args),
        },
      });
      break;
    }
    case "finish-step":
      break;
    case "finish":
      state.finishReason = mapFinishReason(event.finishReason);
      break;
  }
}

function applyEventToAggregateOrThrow(
  event: JsonRecord,
  state: AggregateState,
  toolNameMap: Map<string, string>
): void {
  if (event.type === "error") {
    const error = isRecord(event.error) ? event.error : {};
    throw new Error(
      stringValue(error.message) || stringValue(event.error) || "Command Code stream error"
    );
  }

  applyEventToAggregate(event, state, toolNameMap);
}

function usageFromCommandCode(usage: JsonRecord | null) {
  if (!usage) return undefined;
  const inputDetails = firstRecord(usage, [
    "inputTokenDetails",
    "input_token_details",
    "input_tokens_details",
    "prompt_tokens_details",
  ]);
  const outputDetails = firstRecord(usage, [
    "outputTokenDetails",
    "output_token_details",
    "output_tokens_details",
    "completion_tokens_details",
  ]);
  const reasoningDetails = firstRecord(usage, [
    "reasoningTokenDetails",
    "reasoning_token_details",
    "reasoning_tokens_details",
  ]);
  const cacheRead =
    firstNumber(usage, [
      "cachedInputTokens",
      "cached_input_tokens",
      "cacheReadInputTokens",
      "cache_read_input_tokens",
      "cacheReadTokens",
      "cache_read_tokens",
      "cached_tokens",
    ]) ??
    firstNumber(inputDetails, [
      "cachedTokens",
      "cached_tokens",
      "cacheReadTokens",
      "cache_read_tokens",
    ]);
  const noCache = firstNumber(inputDetails, ["noCacheTokens", "no_cache_tokens"]);
  const prompt =
    firstNumber(usage, ["inputTokens", "input_tokens", "promptTokens", "prompt_tokens"]) ??
    (noCache ?? 0) + (cacheRead ?? 0);
  const reasoning =
    firstNumber(usage, ["reasoningTokens", "reasoning_tokens"]) ??
    firstNumber(outputDetails, ["reasoningTokens", "reasoning_tokens"]) ??
    firstNumber(reasoningDetails, ["reasoningTokens", "reasoning_tokens"]);
  const textOutput = firstNumber(outputDetails, ["textTokens", "text_tokens"]);
  const completion =
    firstNumber(usage, [
      "outputTokens",
      "output_tokens",
      "completionTokens",
      "completion_tokens",
    ]) ?? (textOutput ?? 0) + (reasoning ?? 0);
  const total = firstNumber(usage, ["totalTokens", "total_tokens"]) ?? prompt + completion;
  const result: JsonRecord = {
    prompt_tokens: prompt,
    prompt_tokens_details: { cached_tokens: cacheRead ?? 0 },
    completion_tokens: completion,
    completion_tokens_details: { reasoning_tokens: reasoning ?? 0 },
    total_tokens: total,
  };
  if (cacheRead !== undefined && cacheRead > 0) result.cache_read_input_tokens = cacheRead;
  if (noCache !== undefined && noCache > 0) result.no_cache_tokens = noCache;
  if (reasoning !== undefined && reasoning > 0) result.reasoning_tokens = reasoning;
  return result;
}

function createStreamResponse(
  upstream: Response,
  model: string,
  signal?: AbortSignal | null,
  toolNameMap: Map<string, string> = new Map()
): Response {
  const id = `chatcmpl-${randomUUID()}`;
  const reader = upstream.body?.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let sentRole = false;
  let sentContent = false;
  let closed = false;
  const state: AggregateState = {
    content: "",
    reasoning: "",
    toolCalls: [],
    finishReason: "stop",
    usage: null,
  };

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      if (!reader) {
        controller.error(new Error("Command Code response missing body"));
        return;
      }

      const abort = () => {
        closed = true;
        reader.cancel().catch(() => undefined);
        controller.error(new DOMException("The operation was aborted", "AbortError"));
      };
      signal?.addEventListener("abort", abort, { once: true });

      const emitEvent = (event: unknown) => {
        if (!isRecord(event) || closed) return;
        rememberCommandCodeUsage(state, event);
        if (!sentRole) {
          sentRole = true;
          controller.enqueue(sse(chatCompletionChunk(id, model, { role: "assistant" })));
        }

        switch (event.type) {
          case "text-delta": {
            const text = stringValue(event.text) || "";
            if (text) {
              sentContent = true;
              controller.enqueue(sse(chatCompletionChunk(id, model, { content: text })));
            }
            state.content += text;
            break;
          }
          case "reasoning-delta": {
            const text = stringValue(event.text) || "";
            if (text) {
              controller.enqueue(sse(chatCompletionChunk(id, model, { reasoning_content: text })));
              state.reasoning += text;
            }
            break;
          }
          case "tool-call": {
            const index = state.toolCalls.length;
            const args = recordOrEmpty(event.input ?? event.args ?? event.arguments);
            const toolCall = {
              id: stringValue(event.toolCallId) || stringValue(event.id) || randomUUID(),
              type: "function",
              function: {
                name: clientToolName(
                  stringValue(event.toolName) || stringValue(event.name) || "",
                  toolNameMap
                ),
                arguments: JSON.stringify(args),
              },
            };
            state.toolCalls.push(toolCall);
            controller.enqueue(
              sse(chatCompletionChunk(id, model, { tool_calls: [{ index, ...toolCall }] }))
            );
            break;
          }
          case "reasoning-end":
            break;
          case "finish-step":
            break;
          case "finish": {
            state.finishReason = mapFinishReason(event.finishReason);
            if (!sentContent && state.reasoning && state.toolCalls.length === 0) {
              controller.enqueue(sse(chatCompletionChunk(id, model, { content: state.reasoning })));
            }
            controller.enqueue(sse(chatCompletionChunk(id, model, {}, state.finishReason)));
            const usagePayload = usageFromCommandCode(state.usage);
            if (usagePayload) {
              controller.enqueue(
                sse({
                  id,
                  object: "chat.completion.chunk",
                  model,
                  usage: usagePayload,
                  choices: [],
                })
              );
            }
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            closed = true;
            controller.close();
            reader.cancel().catch(() => undefined);
            break;
          }
          case "error": {
            const error = isRecord(event.error) ? event.error : {};
            throw new Error(
              stringValue(error.message) || stringValue(event.error) || "Command Code stream error"
            );
          }
        }
      };

      const pump = async () => {
        try {
          for (;;) {
            if (closed) return;
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";
            for (const line of lines) emitEvent(parseStreamLine(line));
          }
          if (buffer.trim()) emitEvent(parseStreamLine(buffer));
          if (!closed) {
            if (!sentRole)
              controller.enqueue(sse(chatCompletionChunk(id, model, { role: "assistant" })));
            if (!sentContent && state.reasoning && state.toolCalls.length === 0) {
              controller.enqueue(sse(chatCompletionChunk(id, model, { content: state.reasoning })));
            }
            controller.enqueue(sse(chatCompletionChunk(id, model, {}, state.finishReason)));
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          }
        } catch (error) {
          controller.error(error);
        } finally {
          signal?.removeEventListener("abort", abort);
          try {
            reader.releaseLock();
          } catch (error) {
            console.warn(
              "[commandCode] reader releaseLock failed:",
              error instanceof Error ? error.message : String(error)
            );
          }
        }
      };

      pump();
    },
    cancel() {
      closed = true;
      return reader?.cancel();
    },
  });

  return new Response(stream, {
    status: 200,
    headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache" },
  });
}

async function createJsonResponse(
  upstream: Response,
  model: string,
  signal?: AbortSignal | null,
  toolNameMap: Map<string, string> = new Map()
): Promise<Response> {
  const reader = upstream.body?.getReader();
  if (!reader) throw new Error("Command Code response missing body");

  const decoder = new TextDecoder();
  let buffer = "";
  const state: AggregateState = {
    content: "",
    reasoning: "",
    toolCalls: [],
    finishReason: "stop",
    usage: null,
  };

  try {
    for (;;) {
      if (signal?.aborted) throw new DOMException("The operation was aborted", "AbortError");
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        const event = parseStreamLine(line);
        if (!isRecord(event)) continue;
        applyEventToAggregateOrThrow(event, state, toolNameMap);
      }
    }
    if (buffer.trim()) {
      const event = parseStreamLine(buffer);
      if (isRecord(event)) applyEventToAggregateOrThrow(event, state, toolNameMap);
    }
  } finally {
    try {
      await reader.cancel();
    } catch (error) {
      console.warn(
        "[commandCode] reader cancel failed:",
        error instanceof Error ? error.message : String(error)
      );
    }
    try {
      reader.releaseLock();
    } catch (error) {
      console.warn(
        "[commandCode] reader releaseLock failed:",
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  const message: JsonRecord = { role: "assistant", content: state.content };
  if (!state.content && state.reasoning && state.toolCalls.length === 0) {
    message.content = state.reasoning;
  }
  if (state.reasoning) message.reasoning_content = state.reasoning;
  if (state.toolCalls.length > 0) message.tool_calls = state.toolCalls;

  const payload: JsonRecord = {
    id: `chatcmpl-${randomUUID()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, message, finish_reason: state.finishReason }],
  };
  const usage = usageFromCommandCode(state.usage);
  if (usage) payload.usage = usage;

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// ── CommandCodeExecutor ──────────────────────────────────────────────────────

export class CommandCodeExecutor extends BaseExecutor {
  constructor(provider = "command-code") {
    super(provider, REGISTRY["command-code"]);
  }

  buildUrl() {
    const baseUrl = (this.config.baseUrl || "https://api.commandcode.ai").replace(/\/$/, "");
    return `${baseUrl}${this.config.chatPath || "/provider/v1/chat/completions"}`;
  }

  buildCliUrl() {
    const baseUrl = (this.config.baseUrl || "https://api.commandcode.ai").replace(/\/$/, "");
    return `${baseUrl}/alpha/generate`;
  }

  async execute({ model, body, stream, credentials, signal, upstreamExtraHeaders }: ExecuteInput) {
    const apiKey = credentials?.apiKey || credentials?.accessToken;
    if (!apiKey) throw new Error("Command Code API key required");

    const sanitizedBody = sanitizeReasoningEffortForProvider(body, this.provider, model);
    const { body: transformedBody } = buildOpenAiBody(model, sanitizedBody, stream);
    const url = this.buildUrl();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      Accept: stream ? "text/event-stream" : "application/json",
    };
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);

    const upstream = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(transformedBody),
      signal: signal || undefined,
    });

    if (upstream.ok) {
      return { response: upstream, url, headers, transformedBody };
    }

    // Fallback: If /provider/v1/chat/completions returns 403 (e.g. Go plan without Provider
    // API access) or 404, fallback to /alpha/generate (CLI endpoint).
    if (upstream.status === 403 || upstream.status === 404) {
      const cliUrl = this.buildCliUrl();
      const cliHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "x-command-code-version": COMMAND_CODE_VERSION,
        "x-cli-environment": "external",
        "x-project-slug": "pi-cc",
        "x-taste-learning": "false",
        "x-co-flag": "false",
        "x-session-id": randomUUID(),
      };
      mergeUpstreamExtraHeaders(cliHeaders, upstreamExtraHeaders);

      const { body: cliTransformedBody, toolNameMap } = buildCommandCodeCliBody(
        model,
        sanitizedBody,
        stream
      );

      const cliUpstream = await fetch(cliUrl, {
        method: "POST",
        headers: cliHeaders,
        body: JSON.stringify(cliTransformedBody),
        signal: signal || undefined,
      });

      if (!cliUpstream.ok) {
        const errorText = await cliUpstream.text().catch(() => {
          console.warn("[commandCode] cli upstream text failed");
          return "";
        });
        return {
          response: new Response(errorText || `Command Code API error ${cliUpstream.status}`, {
            status: cliUpstream.status,
            statusText: cliUpstream.statusText,
            headers: cliUpstream.headers,
          }),
          url: cliUrl,
          headers: cliHeaders,
          transformedBody: cliTransformedBody,
        };
      }

      const response = stream
        ? createStreamResponse(cliUpstream, model, signal, toolNameMap)
        : await createJsonResponse(cliUpstream, model, signal, toolNameMap);

      return { response, url: cliUrl, headers: cliHeaders, transformedBody: cliTransformedBody };
    }

    const errorText = await upstream.text().catch(() => {
      console.warn("[commandCode] upstream text failed");
      return "";
    });
    return {
      response: new Response(errorText || `Command Code API error ${upstream.status}`, {
        status: upstream.status,
        statusText: upstream.statusText,
        headers: upstream.headers,
      }),
      url,
      headers,
      transformedBody,
    };
  }
}
