/**
 * Claude (Anthropic Messages) ↔ xAI Responses translator
 *
 * Source of truth: router-for-me/CLIProxyAPI internal/translator/claude/xai/*
 *
 * Inbound: Anthropic /v1/messages { model, system, messages, tools, ... }
 * Outbound (to xAI): xAI Responses { model, input, instructions, tools, ... }
 *
 * Reverse direction:
 *   - xAI completed → Anthropic Messages JSON (full message)
 *   - per-event xAI SSE → Anthropic SSE frames:
 *       message_start, content_block_start, content_block_delta,
 *       content_block_stop, message_delta, message_stop
 */

// ─── Types ────────────────────────────────────────────────────────────────────

interface AnthropicImageSource {
  type: "base64" | "url";
  media_type?: string;
  data?: string;
  url?: string;
}

interface AnthropicContentBlock {
  type: string;
  text?: string;
  source?: AnthropicImageSource;
  id?: string;
  name?: string;
  input?: unknown;
  tool_use_id?: string;
  content?: unknown;
  thinking?: string;
  [key: string]: unknown;
}

interface AnthropicMessage {
  role: "user" | "assistant";
  content: string | AnthropicContentBlock[];
}

interface AnthropicTool {
  name?: string;
  description?: string;
  input_schema?: unknown;
  parameters?: unknown;
  type?: string;
  function?: unknown;
  [key: string]: unknown;
}

interface AnthropicThinking {
  type?: string;
  budget_tokens?: number;
}

interface AnthropicRequest {
  model?: string;
  messages?: AnthropicMessage[];
  system?: string | Array<{ type: string; text: string }>;
  tools?: AnthropicTool[];
  tool_choice?: unknown;
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  stop_sequences?: string[];
  metadata?: unknown;
  thinking?: AnthropicThinking;
  [key: string]: unknown;
}

interface XaiInputBlock {
  type: string;
  text?: string;
  image_url?: string;
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

interface XaiTool {
  type: "function";
  function: {
    name?: string;
    description?: string;
    parameters?: unknown;
  };
}

interface XaiReasoning {
  effort: "low" | "medium" | "high";
}

interface XaiResponsesRequest {
  model?: string;
  input: XaiInputItem[];
  instructions?: string;
  tools?: XaiTool[];
  tool_choice?: unknown;
  temperature?: number;
  top_p?: number;
  max_output_tokens?: number;
  stop?: string[];
  metadata?: unknown;
  reasoning?: XaiReasoning;
  [key: string]: unknown;
}

interface XaiOutputContent {
  type: string;
  text?: string;
  refusal?: string;
}

interface XaiOutputItem {
  type: string;
  content?: XaiOutputContent[];
  call_id?: string;
  id?: string;
  name?: string;
  arguments?: string;
  summary?: Array<{ text?: string }>;
  [key: string]: unknown;
}

interface XaiUsage {
  input_tokens?: number;
  output_tokens?: number;
  prompt_tokens?: number;
  completion_tokens?: number;
}

interface XaiCompleted {
  id?: string;
  model?: string;
  output?: XaiOutputItem[];
  usage?: XaiUsage;
  [key: string]: unknown;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function genId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 14)}`;
}

/**
 * Translate Anthropic content blocks into xAI input content blocks.
 * Anthropic block types:
 *   "text", "image", "tool_use", "tool_result", "thinking"
 */
function blocksToXai(
  blocks: string | AnthropicContentBlock[],
): XaiInputBlock[] {
  if (typeof blocks === "string") return [{ type: "input_text", text: blocks }];
  if (!Array.isArray(blocks)) return [];
  const out: XaiInputBlock[] = [];
  for (const b of blocks) {
    if (!b || typeof b !== "object") continue;
    if (b.type === "text") out.push({ type: "input_text", text: b.text ?? "" });
    else if (b.type === "image" && b.source) {
      // Anthropic source { type: "base64"|"url", media_type, data | url }
      if (b.source.type === "url") {
        out.push({ type: "input_image", image_url: b.source.url });
      } else {
        const dataUrl = `data:${b.source.media_type ?? "image/png"};base64,${b.source.data ?? ""}`;
        out.push({ type: "input_image", image_url: dataUrl });
      }
    } else if (b.type === "thinking") {
      // dropped on the input side — xAI does not accept caller thinking blocks
    } else {
      out.push(b as XaiInputBlock);
    }
  }
  return out;
}

/**
 * Translate Anthropic tools[] into xAI tools[].
 * Anthropic uses { name, description, input_schema } — xAI uses
 * function-tool shape { type: "function", function: { name, description, parameters } }.
 */
function toolsAnthropicToXai(tools: AnthropicTool[]): XaiTool[] | undefined {
  if (!Array.isArray(tools)) return undefined;
  return tools.map((t) => {
    if (!t || typeof t !== "object") return t as unknown as XaiTool;
    if (t.type === "function" && t.function) return t as unknown as XaiTool;
    return {
      type: "function" as const,
      function: {
        name: t.name,
        description: t.description,
        parameters:
          (t.input_schema ?? t.parameters ?? { type: "object" }),
      },
    };
  });
}

function mapClaudeThinking(
  thinking: AnthropicThinking,
): XaiReasoning | undefined {
  if (!thinking || typeof thinking !== "object") return undefined;
  if (thinking.type === "enabled") {
    if (typeof thinking.budget_tokens === "number") {
      const b = thinking.budget_tokens;
      if (b >= 16000) return { effort: "high" };
      if (b >= 4000) return { effort: "medium" };
      if (b > 0) return { effort: "low" };
    }
    return { effort: "medium" };
  }
  return undefined;
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Translate an Anthropic Messages request body into an xAI Responses body.
 */
export function claudeRequestToXaiResponses(req: AnthropicRequest): XaiResponsesRequest {
  if (!req || typeof req !== "object") return req as unknown as XaiResponsesRequest;
  const input: XaiInputItem[] = [];

  for (const m of req.messages ?? []) {
    if (!m) continue;
    if (m.role === "user") {
      // Detect tool_result blocks → emit as function_call_output items
      const blocks: AnthropicContentBlock[] = Array.isArray(m.content)
        ? m.content
        : [{ type: "text", text: m.content as string }];
      const userBlocks: AnthropicContentBlock[] = [];
      for (const b of blocks) {
        if (b?.type === "tool_result") {
          input.push({
            type: "function_call_output",
            call_id: b.tool_use_id,
            output:
              typeof b.content === "string"
                ? b.content
                : JSON.stringify(b.content ?? ""),
          });
        } else {
          userBlocks.push(b);
        }
      }
      if (userBlocks.length) input.push({ role: "user", content: blocksToXai(userBlocks) });
      continue;
    }
    if (m.role === "assistant") {
      const blocks: AnthropicContentBlock[] = Array.isArray(m.content)
        ? m.content
        : [{ type: "text", text: m.content as string }];
      const textBlocks: AnthropicContentBlock[] = [];
      for (const b of blocks) {
        if (b?.type === "tool_use") {
          if (textBlocks.length) {
            input.push({ role: "assistant", content: blocksToXai(textBlocks.splice(0)) });
          }
          input.push({
            type: "function_call",
            call_id: b.id,
            name: b.name,
            arguments:
              typeof b.input === "string" ? b.input : JSON.stringify(b.input ?? {}),
          });
        } else {
          textBlocks.push(b);
        }
      }
      if (textBlocks.length) input.push({ role: "assistant", content: blocksToXai(textBlocks) });
      continue;
    }
  }

  const out: XaiResponsesRequest = { model: req.model, input };

  // System → instructions
  if (req.system) {
    if (typeof req.system === "string") {
      out.instructions = req.system;
    } else if (Array.isArray(req.system)) {
      out.instructions = (req.system as Array<{ text?: string }>)
        .map((b) => (typeof b === "string" ? b : (b?.text ?? "")))
        .filter(Boolean)
        .join("\n\n");
    }
  }

  if (req.temperature != null) out.temperature = req.temperature;
  if (req.top_p != null) out.top_p = req.top_p;
  if (req.max_tokens != null) out.max_output_tokens = req.max_tokens;
  if (req.stop_sequences) out.stop = req.stop_sequences;
  if (req.metadata) out.metadata = req.metadata;
  if (req.tool_choice) out.tool_choice = req.tool_choice;
  if (req.thinking) out.reasoning = mapClaudeThinking(req.thinking);

  const tools = req.tools ? toolsAnthropicToXai(req.tools) : undefined;
  if (tools) out.tools = tools;
  return out;
}

/**
 * Convert an xAI completed response into an Anthropic Messages JSON.
 */
export function xaiCompletedToClaudeJson(
  completed: XaiCompleted,
  origReq: AnthropicRequest | null = null,
): object {
  const content: unknown[] = [];
  let stopReason = "end_turn";
  for (const item of completed?.output ?? []) {
    if (!item) continue;
    if (item.type === "message" && Array.isArray(item.content)) {
      for (const c of item.content) {
        if (c?.type === "output_text") content.push({ type: "text", text: c.text ?? "" });
        if (c?.type === "refusal") content.push({ type: "text", text: c.refusal ?? "" });
      }
    } else if (item.type === "function_call") {
      stopReason = "tool_use";
      let inputObj: unknown = {};
      try {
        inputObj = item.arguments ? JSON.parse(item.arguments) : {};
      } catch {
        inputObj = { _raw: item.arguments };
      }
      content.push({
        type: "tool_use",
        id: item.call_id ?? item.id ?? genId("toolu"),
        name: item.name,
        input: inputObj,
      });
    } else if (item.type === "reasoning" && Array.isArray(item.summary)) {
      const text = (item.summary as Array<{ text?: string }>)
        .map((s) => s?.text ?? "")
        .filter(Boolean)
        .join("\n");
      if (text) content.push({ type: "thinking", thinking: text });
    }
  }
  const out: Record<string, unknown> = {
    id: completed?.id ?? genId("msg"),
    type: "message",
    role: "assistant",
    model: completed?.model ?? origReq?.model ?? null,
    content,
    stop_reason: stopReason,
    stop_sequence: null,
  };
  if (completed?.usage) {
    const u = completed.usage;
    out.usage = {
      input_tokens: u.input_tokens ?? u.prompt_tokens ?? 0,
      output_tokens: u.output_tokens ?? u.completion_tokens ?? 0,
    };
  }
  return out;
}
