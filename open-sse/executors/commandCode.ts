import { randomUUID } from "node:crypto";

import { REGISTRY } from "../config/providerRegistry.ts";
import { BaseExecutor, mergeUpstreamExtraHeaders, type ExecuteInput } from "./base.ts";

type JsonRecord = Record<string, unknown>;

const COMMAND_CODE_VERSION = "0.24.1";
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
    } catch {
      // Tool argument fragments may be incomplete in streamed deltas.
    }
  }
  return {};
}

function normalizeContentText(content: unknown): string {
  if (typeof content === "string") return content;
  return asRecordArray(content)
    .filter((part) => part.type === "text")
    .map((part) => stringValue(part.text) || "")
    .join("\n");
}

function convertTools(tools: unknown): unknown[] {
  return asRecordArray(tools).map((tool) => {
    const fn = isRecord(tool.function) ? tool.function : tool;
    return {
      type: "function",
      name: stringValue(fn.name) || "",
      description: stringValue(fn.description) || "",
      input_schema: isRecord(fn.parameters) ? fn.parameters : {},
    };
  });
}

function completeToolCallIds(messages: JsonRecord[]): Set<string> {
  const callIds = new Set<string>();
  const resultIds = new Set<string>();

  for (const message of messages) {
    if (message.role === "assistant") {
      for (const call of asRecordArray(message.tool_calls)) {
        const id = stringValue(call.id);
        if (id) callIds.add(id);
      }
    } else if (message.role === "tool") {
      const id = stringValue(message.tool_call_id);
      if (id) resultIds.add(id);
    }
  }

  return new Set([...callIds].filter((id) => resultIds.has(id)));
}

function convertMessages(messages: unknown): { system: string; messages: unknown[] } {
  const source = asRecordArray(messages);
  const pairedToolCallIds = completeToolCallIds(source);
  const out: unknown[] = [];
  const system: string[] = [];

  for (const message of source) {
    const role = stringValue(message.role);
    if (role === "system" || role === "developer") {
      const text = normalizeContentText(message.content);
      if (text) system.push(text);
      continue;
    }

    if (role === "user") {
      out.push({ role: "user", content: message.content ?? "" });
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
        parts.push({
          type: "tool-call",
          toolCallId: id,
          toolName: stringValue(fn.name) || "",
          input: recordOrEmpty(fn.arguments),
        });
      }

      if (parts.length > 0) out.push({ role: "assistant", content: parts });
      continue;
    }

    if (role === "tool") {
      const toolCallId = stringValue(message.tool_call_id) || "";
      if (!toolCallId || !pairedToolCallIds.has(toolCallId)) continue;
      out.push({
        role: "tool",
        content: [
          {
            type: "tool-result",
            toolCallId,
            toolName: stringValue(message.name) || "",
            output: { type: "text", value: normalizeContentText(message.content) },
          },
        ],
      });
    }
  }

  return { system: system.join("\n\n"), messages: out };
}

function clampMaxTokens(value: unknown): number {
  const numeric = numberValue(value) ?? MAX_COMMAND_CODE_TOKENS;
  return Math.max(1, Math.min(Math.floor(numeric), MAX_COMMAND_CODE_TOKENS));
}

function buildCommandCodeBody(model: string, body: unknown): JsonRecord {
  const input = isRecord(body) ? body : {};
  const converted = convertMessages(input.messages);
  const explicitSystem = typeof input.system === "string" ? input.system : "";
  const system = [converted.system, explicitSystem].filter(Boolean).join("\n\n");

  return {
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
    permissionMode: "standard",
    params: {
      model,
      messages: converted.messages,
      tools: convertTools(input.tools),
      system,
      max_tokens: clampMaxTokens(input.max_tokens ?? input.max_completion_tokens),
      stream: false,
    },
  };
}

function parseStreamLine(line: string): unknown | undefined {
  let trimmed = line.trim();
  if (!trimmed || trimmed.startsWith(":") || trimmed.startsWith("event:")) return undefined;
  if (trimmed.startsWith("data:")) trimmed = trimmed.slice(5).trim();
  if (!trimmed || trimmed === "[DONE]") return undefined;

  try {
    return JSON.parse(trimmed);
  } catch {
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

function applyEventToAggregate(event: JsonRecord, state: AggregateState): void {
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
          name: stringValue(event.toolName) || stringValue(event.name) || "",
          arguments: JSON.stringify(args),
        },
      });
      break;
    }
    case "finish":
      state.finishReason = mapFinishReason(event.finishReason);
      state.usage = isRecord(event.totalUsage) ? event.totalUsage : null;
      break;
  }
}

function applyEventToAggregateOrThrow(event: JsonRecord, state: AggregateState): void {
  if (event.type === "error") {
    const error = isRecord(event.error) ? event.error : {};
    throw new Error(
      stringValue(error.message) || stringValue(event.error) || "Command Code stream error"
    );
  }

  applyEventToAggregate(event, state);
}

function usageFromCommandCode(usage: JsonRecord | null) {
  if (!usage) return undefined;
  const details = isRecord(usage.inputTokenDetails) ? usage.inputTokenDetails : {};
  const prompt =
    (numberValue(usage.inputTokens) || 0) + (numberValue(details.cacheReadTokens) || 0);
  const completion = numberValue(usage.outputTokens) || 0;
  return {
    prompt_tokens: prompt,
    completion_tokens: completion,
    total_tokens: prompt + completion,
  };
}

function createStreamResponse(
  upstream: Response,
  model: string,
  signal?: AbortSignal | null
): Response {
  const id = `chatcmpl-${randomUUID()}`;
  const reader = upstream.body?.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let sentRole = false;
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
        if (!sentRole) {
          sentRole = true;
          controller.enqueue(sse(chatCompletionChunk(id, model, { role: "assistant" })));
        }

        switch (event.type) {
          case "text-delta": {
            const text = stringValue(event.text) || "";
            if (text) controller.enqueue(sse(chatCompletionChunk(id, model, { content: text })));
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
                name: stringValue(event.toolName) || stringValue(event.name) || "",
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
          case "finish": {
            state.finishReason = mapFinishReason(event.finishReason);
            state.usage = isRecord(event.totalUsage) ? event.totalUsage : null;
            controller.enqueue(sse(chatCompletionChunk(id, model, {}, state.finishReason)));
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
          } catch {
            // Reader may already be released/cancelled.
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
  signal?: AbortSignal | null
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
        applyEventToAggregateOrThrow(event, state);
      }
    }
    if (buffer.trim()) {
      const event = parseStreamLine(buffer);
      if (isRecord(event)) applyEventToAggregateOrThrow(event, state);
    }
  } finally {
    try {
      await reader.cancel();
    } catch {
      // Reader may already be closed.
    }
    try {
      reader.releaseLock();
    } catch {
      // Reader may already be released.
    }
  }

  const message: JsonRecord = { role: "assistant", content: state.content };
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

export class CommandCodeExecutor extends BaseExecutor {
  constructor(provider = "command-code") {
    super(provider, REGISTRY["command-code"]);
  }

  buildUrl() {
    const baseUrl = (this.config.baseUrl || "https://api.commandcode.ai").replace(/\/$/, "");
    return `${baseUrl}${this.config.chatPath || "/alpha/generate"}`;
  }

  async execute({ model, body, stream, credentials, signal, upstreamExtraHeaders }: ExecuteInput) {
    const apiKey = credentials?.apiKey || credentials?.accessToken;
    if (!apiKey) throw new Error("Command Code API key required");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "x-command-code-version": COMMAND_CODE_VERSION,
      "x-cli-environment": "external",
      "x-project-slug": "pi-cc",
      "x-taste-learning": "false",
      "x-co-flag": "false",
      "x-session-id": randomUUID(),
    };
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);

    const transformedBody = buildCommandCodeBody(model, body);
    const url = this.buildUrl();
    const upstream = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(transformedBody),
      signal: signal || undefined,
    });

    if (!upstream.ok) {
      const errorText = await upstream.text().catch(() => "");
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

    const response = stream
      ? createStreamResponse(upstream, model, signal)
      : await createJsonResponse(upstream, model, signal);

    return { response, url, headers, transformedBody };
  }
}
