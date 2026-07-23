/**
 * Conversation normalizer — converts OpenAI / Anthropic / Gemini request +
 * response payloads into a single provider-agnostic shape.
 *
 * MIT — port from https://github.com/chouzz/llm-interceptor (ui/utils.ts)
 *
 * Returns `null` for non-LLM requests or payloads we cannot understand —
 * never throws — so the renderer can fall back to the raw view.
 */

import { mergeStream, parseSseStream } from "./sseMerger.ts";
import type {
  InterceptedRequest,
  NormalizedBlock,
  NormalizedConversation,
  NormalizedTurn,
} from "./types.ts";

type NormalizedRole = NormalizedTurn["role"];

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function tryParseJson(value: string | null | undefined): unknown {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function normalizeRole(raw: unknown): NormalizedRole {
  if (raw === "system" || raw === "user" || raw === "assistant" || raw === "tool") {
    return raw;
  }
  if (raw === "model") return "assistant";
  if (raw === "function") return "tool";
  return "user";
}

/**
 * OpenAI / Anthropic message content can be a string, or an array of blocks.
 * Returns a list of normalized blocks.
 */
function blocksFromOpenAiContent(content: unknown): NormalizedBlock[] {
  if (content == null) return [];
  if (typeof content === "string") {
    if (content.length === 0) return [];
    return [{ type: "text", text: content }];
  }
  if (!Array.isArray(content)) return [];
  const out: NormalizedBlock[] = [];
  for (const raw of content) {
    if (typeof raw === "string") {
      out.push({ type: "text", text: raw });
      continue;
    }
    const block = asRecord(raw);
    if (!block) continue;
    const type = block.type;
    if (type === "text" || type === "output_text") {
      const text = typeof block.text === "string" ? block.text : "";
      out.push({ type: "text", text });
    } else if (type === "input_text") {
      const text = typeof block.text === "string" ? block.text : "";
      out.push({ type: "text", text });
    } else if (type === "tool_use") {
      out.push({
        type: "tool_use",
        id: typeof block.id === "string" ? block.id : "",
        name: typeof block.name === "string" ? block.name : "",
        input: block.input ?? {},
      });
    } else if (type === "tool_result") {
      out.push({
        type: "tool_result",
        tool_use_id:
          typeof block.tool_use_id === "string" ? block.tool_use_id : "",
        content: block.content ?? null,
      });
    } else if (typeof block.text === "string") {
      out.push({ type: "text", text: block.text });
    }
  }
  return out;
}

/**
 * OpenAI assistant messages may declare `tool_calls`. Each becomes a
 * `tool_use` block alongside any text content.
 */
function appendOpenAiToolCalls(
  blocks: NormalizedBlock[],
  toolCalls: unknown
): NormalizedBlock[] {
  if (!Array.isArray(toolCalls)) return blocks;
  for (const raw of toolCalls) {
    const tc = asRecord(raw);
    if (!tc) continue;
    const fn = asRecord(tc.function) ?? {};
    let parsedInput: unknown = {};
    if (typeof fn.arguments === "string") {
      try {
        parsedInput = JSON.parse(fn.arguments);
      } catch {
        parsedInput = fn.arguments;
      }
    } else if (fn.arguments != null) {
      parsedInput = fn.arguments;
    }
    blocks.push({
      type: "tool_use",
      id: typeof tc.id === "string" ? tc.id : "",
      name: typeof fn.name === "string" ? fn.name : "",
      input: parsedInput,
    });
  }
  return blocks;
}

/**
 * Build NormalizedTurn[] from OpenAI / Anthropic chat messages.
 */
function turnsFromOpenAiMessages(messages: unknown[]): NormalizedTurn[] {
  const out: NormalizedTurn[] = [];
  for (const raw of messages) {
    const msg = asRecord(raw);
    if (!msg) continue;
    const role = normalizeRole(msg.role);

    if (msg.role === "tool" || msg.role === "function") {
      const content = msg.content;
      out.push({
        role: "tool",
        blocks: [
          {
            type: "tool_result",
            tool_use_id:
              typeof msg.tool_call_id === "string"
                ? msg.tool_call_id
                : typeof msg.name === "string"
                  ? msg.name
                  : "",
            content,
          },
        ],
      });
      continue;
    }

    const blocks = blocksFromOpenAiContent(msg.content);
    if ("tool_calls" in msg) {
      appendOpenAiToolCalls(blocks, msg.tool_calls);
    }
    if (blocks.length === 0 && msg.content == null && !("tool_calls" in msg)) {
      continue;
    }
    out.push({ role, blocks });
  }
  return out;
}

/**
 * Gemini contents have a different shape: `[{role, parts: [{text|...}]}]`.
 */
function turnsFromGeminiContents(contents: unknown[]): NormalizedTurn[] {
  const out: NormalizedTurn[] = [];
  for (const raw of contents) {
    const turn = asRecord(raw);
    if (!turn) continue;
    const role = normalizeRole(turn.role);
    const blocks: NormalizedBlock[] = [];
    if (Array.isArray(turn.parts)) {
      for (const partRaw of turn.parts) {
        const part = asRecord(partRaw);
        if (!part) continue;
        if (typeof part.text === "string") {
          blocks.push({ type: "text", text: part.text });
        } else if (part.functionCall) {
          const fc = asRecord(part.functionCall) ?? {};
          blocks.push({
            type: "tool_use",
            id: typeof fc.name === "string" ? fc.name : "",
            name: typeof fc.name === "string" ? fc.name : "",
            input: fc.args ?? {},
          });
        } else if (part.functionResponse) {
          const fr = asRecord(part.functionResponse) ?? {};
          blocks.push({
            type: "tool_result",
            tool_use_id: typeof fr.name === "string" ? fr.name : "",
            content: fr.response ?? null,
          });
        }
      }
    }
    if (blocks.length > 0) out.push({ role, blocks });
  }
  return out;
}

/**
 * Anthropic Messages API requests carry a top-level `system` field (string
 * or array of `{type:"text"|text}` blocks). Convert to a `system` turn.
 */
function systemTurnFromAnthropic(system: unknown): NormalizedTurn | null {
  if (!system) return null;
  if (typeof system === "string") {
    return system.length === 0
      ? null
      : { role: "system", blocks: [{ type: "text", text: system }] };
  }
  if (!Array.isArray(system)) return null;
  const blocks: NormalizedBlock[] = [];
  for (const raw of system) {
    const item = asRecord(raw);
    if (item && typeof item.text === "string") {
      blocks.push({ type: "text", text: item.text });
    } else if (typeof raw === "string") {
      blocks.push({ type: "text", text: raw });
    }
  }
  if (blocks.length === 0) return null;
  return { role: "system", blocks };
}

function buildRequestTurns(body: unknown): NormalizedTurn[] | null {
  const obj = asRecord(body);
  if (!obj) return null;

  if (Array.isArray(obj.messages)) {
    const turns: NormalizedTurn[] = [];
    const systemTurn = systemTurnFromAnthropic(obj.system);
    if (systemTurn) turns.push(systemTurn);
    turns.push(...turnsFromOpenAiMessages(obj.messages));
    return turns;
  }

  if (Array.isArray(obj.contents)) {
    const turns: NormalizedTurn[] = [];
    const sysObj = asRecord(obj.systemInstruction);
    if (sysObj && Array.isArray(sysObj.parts)) {
      const parts: NormalizedBlock[] = [];
      for (const partRaw of sysObj.parts) {
        const p = asRecord(partRaw);
        if (p && typeof p.text === "string") parts.push({ type: "text", text: p.text });
      }
      if (parts.length > 0) turns.push({ role: "system", blocks: parts });
    }
    turns.push(...turnsFromGeminiContents(obj.contents));
    return turns;
  }

  if (typeof obj.prompt === "string") {
    return [{ role: "user", blocks: [{ type: "text", text: obj.prompt }] }];
  }
  if (typeof obj.input === "string") {
    return [{ role: "user", blocks: [{ type: "text", text: obj.input }] }];
  }
  if (Array.isArray(obj.input)) {
    return turnsFromOpenAiMessages(obj.input);
  }

  return null;
}

function isSseResponse(req: InterceptedRequest): boolean {
  const accept = req.requestHeaders["accept"] ?? req.requestHeaders["Accept"] ?? "";
  const ct = req.responseHeaders["content-type"] ?? req.responseHeaders["Content-Type"] ?? "";
  return (
    accept.includes("event-stream") ||
    ct.includes("event-stream") ||
    /^\s*event:|^\s*data:/m.test(req.responseBody ?? "")
  );
}

function extractAnthropicResponseTurn(message: unknown): NormalizedTurn | null {
  const obj = asRecord(message);
  if (!obj) return null;
  const content = obj.content;
  if (!Array.isArray(content)) return null;
  const blocks: NormalizedBlock[] = [];
  for (const raw of content) {
    const block = asRecord(raw);
    if (!block) continue;
    if (block.type === "text" && typeof block.text === "string") {
      blocks.push({ type: "text", text: block.text });
    } else if (block.type === "tool_use") {
      blocks.push({
        type: "tool_use",
        id: typeof block.id === "string" ? block.id : "",
        name: typeof block.name === "string" ? block.name : "",
        input: block.input ?? {},
      });
    } else if (block.type === "thinking" && typeof block.thinking === "string") {
      blocks.push({ type: "text", text: block.thinking });
    }
  }
  if (blocks.length === 0) return null;
  return { role: "assistant", blocks };
}

function extractOpenAiResponseTurn(message: unknown): NormalizedTurn | null {
  const obj = asRecord(message);
  if (!obj || !Array.isArray(obj.choices)) return null;
  const first = asRecord(obj.choices[0]);
  if (!first) return null;
  const msg = asRecord(first.message) ?? asRecord(first.delta);
  if (!msg) return null;
  const blocks = blocksFromOpenAiContent(msg.content);
  if ("tool_calls" in msg) appendOpenAiToolCalls(blocks, msg.tool_calls);
  if (blocks.length === 0) return null;
  return { role: "assistant", blocks };
}

function extractGeminiResponseTurn(message: unknown): NormalizedTurn | null {
  const obj = asRecord(message);
  if (!obj || !Array.isArray(obj.candidates)) return null;
  const first = asRecord(obj.candidates[0]);
  if (!first) return null;
  const content = asRecord(first.content);
  if (!content || !Array.isArray(content.parts)) return null;
  const blocks: NormalizedBlock[] = [];
  for (const partRaw of content.parts) {
    const part = asRecord(partRaw);
    if (!part) continue;
    if (typeof part.text === "string") {
      blocks.push({ type: "text", text: part.text });
    } else if (part.functionCall) {
      const fc = asRecord(part.functionCall) ?? {};
      blocks.push({
        type: "tool_use",
        id: typeof fc.name === "string" ? fc.name : "",
        name: typeof fc.name === "string" ? fc.name : "",
        input: fc.args ?? {},
      });
    }
  }
  if (blocks.length === 0) return null;
  return { role: "assistant", blocks };
}

function buildResponseTurns(req: InterceptedRequest): NormalizedTurn[] {
  const raw = req.responseBody ?? "";
  if (!raw) return [];

  let payload: unknown = null;

  if (isSseResponse(req)) {
    const merged = mergeStream(parseSseStream(raw));
    payload = merged.message ?? null;
  } else {
    payload = tryParseJson(raw);
  }

  if (!payload) return [];

  const anth = extractAnthropicResponseTurn(payload);
  if (anth) return [anth];
  const oai = extractOpenAiResponseTurn(payload);
  if (oai) return [oai];
  const gem = extractGeminiResponseTurn(payload);
  if (gem) return [gem];

  return [];
}

/**
 * Normalize an intercepted LLM request + response into a provider-agnostic
 * conversation. Returns `null` for non-LLM requests or unparseable payloads.
 */
export function normalizeConversation(
  req: InterceptedRequest
): NormalizedConversation | null {
  if (req.detectedKind !== "llm") return null;

  const requestBody = tryParseJson(req.requestBody);
  const requestTurns = buildRequestTurns(requestBody);
  if (!requestTurns) return null;

  const responseTurns = buildResponseTurns(req);

  return {
    request: requestTurns,
    response: responseTurns,
    contextKey: req.contextKey ?? null,
  };
}
