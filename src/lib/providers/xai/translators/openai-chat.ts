/**
 * OpenAI Chat Completions ↔ xAI Responses translator
 *
 * Source of truth: router-for-me/CLIProxyAPI internal/translator/openai/xai/*
 *
 * Inbound: OpenAI Chat Completions { model, messages, tools, ... }
 * Outbound (to xAI): xAI Responses { model, input, instructions, tools, ... }
 *
 * Reverse direction:
 *   - aggregated xAI response.completed → OpenAI ChatCompletion JSON
 *   - per-event xAI SSE → OpenAI ChatCompletion stream chunks
 */
import { normalizeXaiReasoningEffort } from "../thinking.ts";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContentPart {
  type: string;
  text?: string;
  image_url?: unknown;
  input_audio?: unknown;
  [key: string]: unknown;
}

type MessageContent = string | ContentPart[];

interface OpenAiToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

interface OpenAiMessage {
  role: string;
  content?: MessageContent;
  tool_calls?: OpenAiToolCall[];
  tool_call_id?: string;
}

interface OpenAiChatRequest {
  model?: string;
  messages?: OpenAiMessage[];
  tools?: unknown[];
  tool_choice?: unknown;
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  max_output_tokens?: number;
  stop?: string | string[];
  user?: string;
  metadata?: unknown;
  response_format?: unknown;
  parallel_tool_calls?: boolean;
  seed?: number;
  reasoning_effort?: string;
  reasoning?: unknown;
  [key: string]: unknown;
}

interface XaiInputBlock {
  type: string;
  text?: string;
  image_url?: unknown;
  input_audio?: unknown;
  [key: string]: unknown;
}

interface XaiInputItem {
  role?: string;
  content?: XaiInputBlock[];
  type?: string;
  call_id?: string;
  name?: string;
  arguments?: string;
  output?: string;
  [key: string]: unknown;
}

interface XaiResponsesRequest {
  model?: string;
  input: XaiInputItem[];
  instructions?: string;
  tools?: unknown[];
  tool_choice?: unknown;
  temperature?: number;
  top_p?: number;
  max_output_tokens?: number;
  stop?: string | string[];
  user?: string;
  metadata?: unknown;
  text?: unknown;
  parallel_tool_calls?: boolean;
  seed?: number;
  reasoning?: unknown;
  [key: string]: unknown;
}

interface XaiUsage {
  input_tokens?: number;
  output_tokens?: number;
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
}

interface XaiOutputItem {
  type: string;
  content?: Array<{ type: string; text?: string; refusal?: string }>;
  call_id?: string;
  id?: string;
  name?: string;
  arguments?: string;
  [key: string]: unknown;
}

interface XaiCompleted {
  id?: string;
  model?: string;
  created_at?: number;
  output?: XaiOutputItem[];
  usage?: XaiUsage;
  [key: string]: unknown;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function genId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 14)}`;
}

/**
 * Convert OpenAI message content (string | array of parts) into xAI input
 * content blocks. Mirrors CLIProxyAPI mapping:
 *   "text"       → { type: "input_text", text }
 *   "image_url"  → { type: "input_image", image_url }
 *   "input_audio"→ { type: "input_audio", input_audio }
 */
function messageContentToXaiBlocks(content: MessageContent): XaiInputBlock[] {
  if (typeof content === "string") {
    return [{ type: "input_text", text: content }];
  }
  if (!Array.isArray(content)) return [];
  return content
    .map((p): XaiInputBlock | null => {
      if (!p || typeof p !== "object") return null;
      if (p.type === "text") return { type: "input_text", text: p.text ?? "" };
      if (p.type === "image_url") return { type: "input_image", image_url: p.image_url };
      if (p.type === "input_audio") return { type: "input_audio", input_audio: p.input_audio };
      return p as XaiInputBlock; // passthrough unknown
    })
    .filter((b): b is XaiInputBlock => b !== null);
}

/**
 * Convert OpenAI Chat tools[] (function-calling spec) into xAI tools[].
 * xAI accepts the OpenAI function-tool shape verbatim, so passthrough.
 */
function toolsPassthrough(tools: unknown[]): unknown[] | undefined {
  if (!Array.isArray(tools)) return undefined;
  return tools.map((t) => ({ ...(t as object) }));
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Translate an inbound OpenAI Chat Completions request body into an xAI Responses body.
 */
export function chatRequestToXaiResponses(req: OpenAiChatRequest): XaiResponsesRequest {
  if (!req || typeof req !== "object") return req as unknown as XaiResponsesRequest;
  const messages: OpenAiMessage[] = Array.isArray(req.messages) ? req.messages : [];
  const instructionsParts: string[] = [];
  const input: XaiInputItem[] = [];

  for (const m of messages) {
    if (!m) continue;
    if (m.role === "system" || m.role === "developer") {
      const txt =
        typeof m.content === "string"
          ? m.content
          : Array.isArray(m.content)
            ? (m.content as ContentPart[])
                .map((p) => p?.text ?? "")
                .filter(Boolean)
                .join("\n")
            : "";
      if (txt) instructionsParts.push(txt);
      continue;
    }
    if (m.role === "tool") {
      input.push({
        type: "function_call_output",
        call_id: m.tool_call_id,
        output: typeof m.content === "string" ? m.content : JSON.stringify(m.content ?? ""),
      });
      continue;
    }
    if (m.role === "assistant" && Array.isArray(m.tool_calls) && m.tool_calls.length > 0) {
      // Emit any pre-existing assistant text first
      if (m.content) {
        input.push({ role: "assistant", content: messageContentToXaiBlocks(m.content) });
      }
      for (const tc of m.tool_calls) {
        if (tc.type !== "function" || !tc.function) continue;
        input.push({
          type: "function_call",
          call_id: tc.id,
          name: tc.function.name,
          arguments: tc.function.arguments ?? "",
        });
      }
      continue;
    }
    input.push({ role: m.role ?? "user", content: messageContentToXaiBlocks(m.content ?? "") });
  }

  const out: XaiResponsesRequest = { model: req.model, input };
  if (instructionsParts.length) out.instructions = instructionsParts.join("\n\n");

  if (req.temperature != null) out.temperature = req.temperature;
  if (req.top_p != null) out.top_p = req.top_p;
  if (req.max_tokens != null) out.max_output_tokens = req.max_tokens;
  if (req.max_output_tokens != null) out.max_output_tokens = req.max_output_tokens;
  if (req.stop != null) out.stop = req.stop;
  if (req.user) out.user = req.user;
  if (req.metadata) out.metadata = req.metadata;
  if (req.response_format) out.text = { format: req.response_format };
  if (req.parallel_tool_calls != null) out.parallel_tool_calls = req.parallel_tool_calls;
  if (req.seed != null) out.seed = req.seed;
  if (req.reasoning_effort) {
    const effort = normalizeXaiReasoningEffort(req.reasoning_effort);
    if (effort) out.reasoning = { effort };
  }
  if (req.reasoning) out.reasoning = req.reasoning;
  if (req.tool_choice) out.tool_choice = req.tool_choice;

  const tools = req.tools ? toolsPassthrough(req.tools) : undefined;
  if (tools) out.tools = tools;
  return out;
}

/**
 * Aggregate output_text content blocks from an xAI completed response.
 */
function extractAssistantTextAndCalls(completed: XaiCompleted): {
  text: string;
  toolCalls: OpenAiToolCall[];
  refusal: string | undefined;
} {
  let text = "";
  const toolCalls: OpenAiToolCall[] = [];
  const refusal: string[] = [];
  for (const item of completed?.output ?? []) {
    if (!item) continue;
    if (item.type === "message" && Array.isArray(item.content)) {
      for (const c of item.content) {
        if (c?.type === "output_text" && typeof c.text === "string") text += c.text;
        if (c?.type === "refusal" && typeof c.refusal === "string") refusal.push(c.refusal);
      }
    } else if (item.type === "function_call") {
      toolCalls.push({
        id: item.call_id ?? item.id ?? genId("call"),
        type: "function",
        function: { name: item.name ?? "", arguments: item.arguments ?? "" },
      });
    }
  }
  return { text, toolCalls, refusal: refusal.join("\n") || undefined };
}

/**
 * Convert an aggregated xAI completed response into an OpenAI ChatCompletion JSON.
 */
export function xaiCompletedToChatJson(
  completed: XaiCompleted,
  origReq: OpenAiChatRequest | null = null
): object {
  const { text, toolCalls, refusal } = extractAssistantTextAndCalls(completed);
  const finishReason = toolCalls.length ? "tool_calls" : "stop";

  const message: Record<string, unknown> = {
    role: "assistant",
    content: text || (toolCalls.length ? null : ""),
  };
  if (toolCalls.length) message.tool_calls = toolCalls;
  if (refusal) message.refusal = refusal;

  const out: Record<string, unknown> = {
    id: completed?.id ?? genId("chatcmpl"),
    object: "chat.completion",
    created: completed?.created_at ?? Math.floor(Date.now() / 1000),
    model: completed?.model ?? origReq?.model ?? null,
    choices: [{ index: 0, message, finish_reason: finishReason }],
  };
  if (completed?.usage) {
    const u = completed.usage;
    out.usage = {
      prompt_tokens: u.input_tokens ?? u.prompt_tokens ?? 0,
      completion_tokens: u.output_tokens ?? u.completion_tokens ?? 0,
      total_tokens: u.total_tokens ?? (u.input_tokens ?? 0) + (u.output_tokens ?? 0),
    };
  }
  return out;
}
