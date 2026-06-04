/**
 * SSE merger — reconstructs complete LLM response from streaming SSE chunks.
 *
 * MIT — port from https://github.com/chouzz/llm-interceptor (merger.py)
 *
 * Detects API format by chunk shape (not URL — robust to URL rewrite) and
 * rebuilds Anthropic / OpenAI / Gemini responses. Falls back to a raw event
 * list when the format is unrecognised so the caller never crashes.
 */

export type ApiFormat = "anthropic" | "openai" | "gemini" | "unknown";

export interface SseEvent {
  event?: string;
  data?: string;
  // Parsed JSON payload when `data` was valid JSON.
  json?: unknown;
}

export interface MergedResponse {
  format: ApiFormat;
  message?: unknown;
  raw?: SseEvent[];
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

/**
 * Inspect chunk shapes to determine the upstream API. Matches on the first
 * recognisable hint; returns `"unknown"` if none match.
 */
export function detectApiFormat(chunks: SseEvent[]): ApiFormat {
  for (const c of chunks) {
    const j = asRecord(c.json);
    if (!j) continue;
    if (j.type === "message_start" || j.type === "content_block_delta") return "anthropic";
    if (Array.isArray(j.choices)) {
      const first = j.choices[0];
      if (first && typeof first === "object" && "delta" in first) return "openai";
    }
    if (Array.isArray(j.candidates)) return "gemini";
  }
  return "unknown";
}

/**
 * Parse a raw SSE stream (the response body string captured by the proxy)
 * into discrete events. Empty blocks and `[DONE]` terminators are skipped
 * silently; malformed JSON payloads are kept as raw `data` (no `json`).
 */
export function parseSseStream(raw: string): SseEvent[] {
  const events: SseEvent[] = [];
  if (!raw) return events;
  // SSE blocks separated by blank lines — accept both LF and CRLF.
  for (const block of raw.split(/\r?\n\r?\n/)) {
    if (!block.trim()) continue;
    const ev: SseEvent = {};
    for (const line of block.split(/\r?\n/)) {
      if (line.startsWith("event:")) {
        ev.event = line.slice(6).trim();
      } else if (line.startsWith("data:")) {
        ev.data = (ev.data ?? "") + line.slice(5).trim();
      }
    }
    if (ev.data === undefined) continue;
    if (ev.data === "[DONE]") {
      events.push(ev);
      continue;
    }
    try {
      ev.json = JSON.parse(ev.data);
    } catch {
      // keep raw data only
    }
    events.push(ev);
  }
  return events;
}

interface AnthropicBlock {
  type: string;
  text?: string;
  thinking?: string;
  id?: string;
  name?: string;
  input?: unknown;
}

/**
 * Rebuild an Anthropic Messages API response from streaming events.
 * Handles `text_delta`, `thinking_delta`, and `input_json_delta` deltas;
 * applies `JSON.parse` (best-effort) on accumulated tool-use input.
 */
export function rebuildAnthropic(chunks: SseEvent[]): MergedResponse {
  const blocks: AnthropicBlock[] = [];
  let message: Record<string, unknown> | null = null;
  const inputJsonByIndex: Record<number, string> = {};

  for (const c of chunks) {
    const j = asRecord(c.json);
    if (!j) continue;
    const t = j.type;

    if (t === "message_start") {
      const m = asRecord(j.message);
      message = m ? { ...m } : {};
    } else if (t === "content_block_start") {
      const idx = typeof j.index === "number" ? j.index : blocks.length;
      const cb = asRecord(j.content_block);
      const block: AnthropicBlock = { type: "text" };
      if (cb) {
        for (const [k, v] of Object.entries(cb)) (block as Record<string, unknown>)[k] = v;
      }
      if (block.type === "text" && block.text === undefined) block.text = "";
      if (block.type === "thinking" && block.thinking === undefined) block.thinking = "";
      if (block.type === "tool_use" && block.input === undefined) block.input = {};
      blocks[idx] = block;
    } else if (t === "content_block_delta") {
      const idx = typeof j.index === "number" ? j.index : 0;
      const d = asRecord(j.delta);
      if (!d) continue;
      // Ensure a block slot exists (some streams skip content_block_start).
      const slot = blocks[idx] ?? (blocks[idx] = { type: "text", text: "" });
      const dType = d.type;
      if (dType === "text_delta" && typeof d.text === "string") {
        slot.text = (slot.text ?? "") + d.text;
      } else if (dType === "thinking_delta" && typeof d.thinking === "string") {
        slot.thinking = (slot.thinking ?? "") + d.thinking;
      } else if (dType === "input_json_delta" && typeof d.partial_json === "string") {
        inputJsonByIndex[idx] = (inputJsonByIndex[idx] ?? "") + d.partial_json;
      }
    } else if (t === "content_block_stop") {
      const idx = typeof j.index === "number" ? j.index : 0;
      const slot = blocks[idx];
      if (slot && slot.type === "tool_use" && inputJsonByIndex[idx]) {
        try {
          slot.input = JSON.parse(inputJsonByIndex[idx]);
        } catch {
          // keep accumulated string for forensic visibility
          slot.input = inputJsonByIndex[idx];
        }
      }
    } else if (t === "message_delta") {
      if (!message) message = {};
      const d = asRecord(j.delta);
      if (d && typeof d.stop_reason === "string") {
        message.stop_reason = d.stop_reason;
      }
      const usage = asRecord(j.usage);
      if (usage) {
        const prev = asRecord(message.usage) ?? {};
        message.usage = { ...prev, ...usage };
      }
    }
  }

  const filledBlocks = blocks.filter((b) => b !== undefined);
  return {
    format: "anthropic",
    message: { ...(message ?? {}), content: filledBlocks },
  };
}

interface OpenAiToolCall {
  index: number;
  id?: string;
  type?: string;
  function: { name: string; arguments: string };
}

interface OpenAiChoice {
  index: number;
  message: {
    role: string;
    content: string;
    tool_calls?: OpenAiToolCall[];
    refusal?: string;
  };
  finish_reason: string | null;
}

/**
 * Rebuild an OpenAI Chat Completions response from streaming events.
 * Accumulates content text and tool-call fragments per choice/index.
 */
export function rebuildOpenAI(chunks: SseEvent[]): MergedResponse {
  const choicesByIdx: Record<number, OpenAiChoice> = {};
  let model: string | null = null;
  let usage: unknown = null;
  let id: string | null = null;

  for (const c of chunks) {
    const j = asRecord(c.json);
    if (!j) continue;
    if (typeof j.model === "string") model = j.model;
    if (typeof j.id === "string") id = j.id;
    if (j.usage != null) usage = j.usage;
    if (!Array.isArray(j.choices)) continue;

    for (const raw of j.choices) {
      const ch = asRecord(raw);
      if (!ch) continue;
      const idx = typeof ch.index === "number" ? ch.index : 0;
      const slot = (choicesByIdx[idx] ??= {
        index: idx,
        message: { role: "assistant", content: "" },
        finish_reason: null,
      });
      const delta = asRecord(ch.delta) ?? {};
      if (typeof delta.role === "string") slot.message.role = delta.role;
      if (typeof delta.content === "string") slot.message.content += delta.content;
      if (typeof delta.refusal === "string") {
        slot.message.refusal = (slot.message.refusal ?? "") + delta.refusal;
      }
      if (Array.isArray(delta.tool_calls)) {
        slot.message.tool_calls ??= [];
        for (const tcRaw of delta.tool_calls) {
          const tc = asRecord(tcRaw);
          if (!tc) continue;
          const ti = typeof tc.index === "number" ? tc.index : 0;
          const tcSlot =
            slot.message.tool_calls[ti] ??
            (slot.message.tool_calls[ti] = {
              index: ti,
              function: { name: "", arguments: "" },
            });
          if (typeof tc.id === "string") tcSlot.id = tc.id;
          if (typeof tc.type === "string") tcSlot.type = tc.type;
          const fn = asRecord(tc.function);
          if (fn) {
            if (typeof fn.name === "string") tcSlot.function.name += fn.name;
            if (typeof fn.arguments === "string") tcSlot.function.arguments += fn.arguments;
          }
        }
      }
      if (typeof ch.finish_reason === "string") slot.finish_reason = ch.finish_reason;
    }
  }

  return {
    format: "openai",
    message: {
      id,
      model,
      choices: Object.values(choicesByIdx).sort((a, b) => a.index - b.index),
      usage,
    },
  };
}

/**
 * Rebuild a Gemini `generateContent`-style response from streaming events.
 * Concatenates all parts across emitted candidates into a single candidate.
 */
export function rebuildGemini(chunks: SseEvent[]): MergedResponse {
  const parts: unknown[] = [];
  let usageMetadata: unknown = null;
  let finishReason: unknown = null;
  let modelVersion: string | null = null;

  for (const c of chunks) {
    const j = asRecord(c.json);
    if (!j) continue;
    if (j.usageMetadata != null) usageMetadata = j.usageMetadata;
    if (typeof j.modelVersion === "string") modelVersion = j.modelVersion;
    if (!Array.isArray(j.candidates)) continue;
    for (const candRaw of j.candidates) {
      const cand = asRecord(candRaw);
      if (!cand) continue;
      if (cand.finishReason != null) finishReason = cand.finishReason;
      const content = asRecord(cand.content);
      if (!content) continue;
      const ps = content.parts;
      if (Array.isArray(ps)) {
        for (const p of ps) parts.push(p);
      }
    }
  }

  return {
    format: "gemini",
    message: {
      candidates: [
        {
          content: { parts, role: "model" },
          ...(finishReason != null ? { finishReason } : {}),
        },
      ],
      ...(modelVersion ? { modelVersion } : {}),
      ...(usageMetadata != null ? { usageMetadata } : {}),
    },
  };
}

/**
 * Merge an array of SSE events into a single rebuilt response. Returns
 * `{ format: "unknown", raw }` (no throw) for unrecognised shapes.
 */
export function mergeStream(chunks: SseEvent[]): MergedResponse {
  const format = detectApiFormat(chunks);
  switch (format) {
    case "anthropic":
      return rebuildAnthropic(chunks);
    case "openai":
      return rebuildOpenAI(chunks);
    case "gemini":
      return rebuildGemini(chunks);
    default:
      return { format: "unknown", raw: chunks };
  }
}
