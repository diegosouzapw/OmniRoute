import { createHash } from "node:crypto";

// Tool call helper functions for translator

const ALPHANUM9 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

type JsonRecord = Record<string, unknown>;
type ToolNameAliases = Map<string, string>;

interface ToolFunction extends JsonRecord {
  name?: unknown;
  arguments?: unknown;
}

interface ToolCallRecord extends JsonRecord {
  id?: unknown;
  type?: unknown;
  function?: ToolFunction;
}

interface ToolContentBlock extends JsonRecord {
  type?: unknown;
  id?: unknown;
  tool_use_id?: unknown;
}

interface ToolMessage extends JsonRecord {
  role?: unknown;
  tool_calls?: ToolCallRecord[];
  tool_call_id?: unknown;
  content?: unknown;
}

interface ToolCallBody extends JsonRecord {
  messages?: ToolMessage[];
}

function toRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function aliasOpenAIToolName(name: unknown, maxLength: number, aliases: ToolNameAliases): unknown {
  if (typeof name !== "string" || name.length === 0) return name;

  const safe = name.replace(/[^A-Za-z0-9_-]/g, "_");
  if (safe === name && safe.length <= maxLength) return safe;

  const hash = createHash("sha256").update(name).digest("hex").slice(0, 12);
  const prefixLength = Math.max(0, maxLength - hash.length - 1);
  const shortened =
    prefixLength > 0 ? `${safe.slice(0, prefixLength)}_${hash}` : hash.slice(0, maxLength);
  aliases.set(shortened, name);
  return shortened;
}

/**
 * Mutates an OpenAI-compatible request so every function name satisfies a
 * provider's maximum length and `[A-Za-z0-9_-]` character constraints.
 * Returns alias → original entries for response restoration.
 */
export function normalizeOpenAIToolNames(body: unknown, maxLength: number): ToolNameAliases {
  const aliases: ToolNameAliases = new Map();
  const root = toRecord(body);
  if (!root || !Number.isInteger(maxLength) || maxLength < 1) return aliases;

  const alias = (name: unknown): unknown => aliasOpenAIToolName(name, maxLength, aliases);

  if (Array.isArray(root.tools)) {
    for (const tool of root.tools) {
      const fn = toRecord(toRecord(tool)?.function);
      if (fn && typeof fn.name === "string") fn.name = alias(fn.name);
    }
  }

  const toolChoiceFunction = toRecord(toRecord(root.tool_choice)?.function);
  if (toolChoiceFunction && typeof toolChoiceFunction.name === "string") {
    toolChoiceFunction.name = alias(toolChoiceFunction.name);
  }

  if (Array.isArray(root.messages)) {
    for (const message of root.messages) {
      const msg = toRecord(message);
      if (!msg) continue;
      if (Array.isArray(msg.tool_calls)) {
        for (const toolCall of msg.tool_calls) {
          const fn = toRecord(toRecord(toolCall)?.function);
          if (fn && typeof fn.name === "string") fn.name = alias(fn.name);
        }
      }
      if (msg.role === "tool" && typeof msg.name === "string") {
        msg.name = alias(msg.name);
      }
    }
  }

  return aliases;
}

/**
 * Case-insensitive fallback for tool name lookups from upstream responses.
 *
 * Many upstream providers/models return tool call names in lowercase (e.g., "bash")
 * even when the tool definition used PascalCase ("Bash"). This helper tries an exact
 * match first (fast path for well-behaved providers), then falls back to a
 * case-insensitive scan over the map entries.
 *
 * Returns the mapped value on match, or `undefined` when no entry matches.
 */
export function caseInsensitiveToolNameLookup(
  name: string,
  map: Map<string, string> | null | undefined
): string | undefined {
  if (!map || !name) return undefined;

  // Fast path: exact match (PascalCase-preserving providers)
  const exact = map.get(name);
  if (exact !== undefined) return exact;

  // Fallback: case-insensitive scan
  const lowerName = name.toLowerCase();
  for (const [key, value] of map) {
    if (key.toLowerCase() === lowerName) {
      return value;
    }
  }

  return undefined;
}

/** Restore normalized function names in OpenAI Chat Completions responses. */
export function restoreOpenAIToolNames(body: unknown, aliases: unknown): boolean {
  if (!(aliases instanceof Map) || aliases.size === 0) return false;
  const root = toRecord(body);
  if (!root || !Array.isArray(root.choices)) return false;

  let changed = false;
  const restoreCalls = (calls: unknown): void => {
    if (!Array.isArray(calls)) return;
    for (const toolCall of calls) {
      const fn = toRecord(toRecord(toolCall)?.function);
      if (!fn || typeof fn.name !== "string") continue;
      const original = caseInsensitiveToolNameLookup(fn.name, aliases);
      if (typeof original !== "string" || original === fn.name) continue;
      fn.name = original;
      changed = true;
    }
  };

  for (const choice of root.choices) {
    const record = toRecord(choice);
    if (!record) continue;
    restoreCalls(toRecord(record.delta)?.tool_calls);
    restoreCalls(toRecord(record.message)?.tool_calls);
  }

  return changed;
}

// Fallback streaming tool_call id when a provider response omits one (index optional).
// `call_<ts>` when no index is given; `call_<index>_<ts>` when an index is supplied.
export function fallbackToolCallId(index?: number): string {
  return index === undefined ? `call_${Date.now()}` : `call_${index}_${Date.now()}`;
}

// Generate unique tool call ID (default long form)
export function generateToolCallId() {
  return `call_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

// Generate 9-char [a-zA-Z0-9] id for providers that require it (e.g. Mistral)
function generateToolCallId9(): string {
  let s = "";
  for (let i = 0; i < 9; i++) {
    s += ALPHANUM9[Math.floor(Math.random() * ALPHANUM9.length)];
  }
  return s;
}

/** @param options.use9CharId - When true, normalize ids to 9-char [a-zA-Z0-9] (e.g. Mistral); when false, only fix type/arguments, leave ids as-is */
export function ensureToolCallIds<T extends ToolCallBody>(
  body: T,
  options?: { use9CharId?: boolean }
): T {
  if (!body.messages || !Array.isArray(body.messages)) return body;

  const use9CharId = options?.use9CharId === true;

  for (let i = 0; i < body.messages.length; i++) {
    const msg = body.messages[i];
    if (msg.role !== "assistant" || !msg.tool_calls || !Array.isArray(msg.tool_calls)) continue;

    const used9 = new Set<string>();
    const newIdsInOrder: string[] = [];

    for (const tc of msg.tool_calls) {
      if (!tc.type) {
        tc.type = "function";
      }
      if (tc.function?.arguments && typeof tc.function.arguments !== "string") {
        tc.function.arguments = JSON.stringify(tc.function.arguments);
      }
      if (use9CharId) {
        let newId: string;
        do {
          newId = generateToolCallId9();
        } while (used9.has(newId));
        used9.add(newId);
        newIdsInOrder.push(newId);
        tc.id = newId;
      } else {
        // Leave id as-is, only ensure it exists for later tool message matching
        const id =
          tc.id != null && String(tc.id).trim() !== "" ? String(tc.id) : generateToolCallId();
        tc.id = id;
        newIdsInOrder.push(id);
      }
    }

    // Tool responses (role "tool") follow in the same order as tool_calls. Rewrite
    // every id only when the provider requires generated 9-char ids; otherwise keep
    // explicit client ids and fill only missing ones. Overwriting a compacted orphan's
    // explicit id by position can make it impersonate a different parallel call.
    // Stop at the next assistant so we only link responses belonging to this turn.
    if (newIdsInOrder.length > 0) {
      let idx = 0;
      for (let j = i + 1; j < body.messages.length; j++) {
        const later = body.messages[j];
        if (later.role === "assistant") break;
        if (later.role !== "tool") continue;
        if (idx < newIdsInOrder.length) {
          if (
            use9CharId ||
            later.tool_call_id == null ||
            String(later.tool_call_id).trim() === ""
          ) {
            later.tool_call_id = newIdsInOrder[idx];
          }
          idx++;
        }
      }
    }
  }

  return body;
}

// Get tool_call ids from assistant message (OpenAI format: tool_calls, Claude format: tool_use in content)
export function getToolCallIds(msg: ToolMessage): string[] {
  if (msg.role !== "assistant") return [];

  const ids: string[] = [];

  // OpenAI format: tool_calls array
  if (msg.tool_calls && Array.isArray(msg.tool_calls)) {
    for (const tc of msg.tool_calls) {
      if (tc.id) ids.push(String(tc.id));
    }
  }

  // Claude format: tool_use blocks in content
  if (Array.isArray(msg.content)) {
    for (const block of msg.content as ToolContentBlock[]) {
      if (block.type === "tool_use" && block.id) {
        ids.push(String(block.id));
      }
    }
  }

  return ids;
}

// Check if user message has tool_result for given ids (OpenAI format: role=tool, Claude format: tool_result in content)
export function hasToolResults(
  msg: ToolMessage | null | undefined,
  toolCallIds: string[]
): boolean {
  if (!msg || !toolCallIds.length) return false;

  // OpenAI format: role = "tool" with tool_call_id
  if (msg.role === "tool" && msg.tool_call_id) {
    return toolCallIds.includes(String(msg.tool_call_id));
  }

  // Claude format: tool_result blocks in user message content
  if (msg.role === "user" && Array.isArray(msg.content)) {
    for (const block of msg.content as ToolContentBlock[]) {
      if (
        block.type === "tool_result" &&
        block.tool_use_id &&
        toolCallIds.includes(String(block.tool_use_id))
      ) {
        return true;
      }
    }
  }

  return false;
}

// Fix missing tool responses - insert empty tool_result if assistant has tool_use but next message has no tool_result.
// Inserts in the same shape as the opening assistant message: OpenAI tool_calls → role:"tool";
// Claude tool_use blocks → role:"user" with tool_result content blocks.
export function fixMissingToolResponses<T extends ToolCallBody>(body: T): T {
  if (!body.messages || !Array.isArray(body.messages)) return body;

  const newMessages: ToolMessage[] = [];

  for (let i = 0; i < body.messages.length; i++) {
    const msg = body.messages[i];
    const nextMsg = body.messages[i + 1];

    newMessages.push(msg);

    // Check if this is assistant with tool_calls/tool_use
    const toolCallIds = getToolCallIds(msg);
    if (toolCallIds.length === 0) continue;

    // Check if next message has tool_result
    if (nextMsg && !hasToolResults(nextMsg, toolCallIds)) {
      const hasOpenAIToolCalls = Array.isArray(msg.tool_calls) && msg.tool_calls.length > 0;
      if (hasOpenAIToolCalls) {
        for (const id of toolCallIds) {
          newMessages.push({
            role: "tool",
            tool_call_id: id,
            content: "",
          });
        }
      } else {
        newMessages.push({
          role: "user",
          content: toolCallIds.map((id) => ({
            type: "tool_result",
            tool_use_id: id,
            content: "",
          })),
        });
      }
    }
  }

  body.messages = newMessages;
  return body;
}

// Strip tool-result carriers whose id has no matching tool call anywhere in the
// conversation. Mirrors fixMissingToolResponses on the result side: that helper
// ensures every call has a result; this one ensures every result has a call.
// Client-side history truncation/compaction can drop the assistant turn that
// issued a tool call while leaving its stale tool result behind, which strict
// upstream APIs reject before model execution. Handles both OpenAI-format
// role:"tool" messages and Claude-format tool_result content blocks. Drops a
// user message entirely if stripping empties its content array. Returns the
// same body reference when nothing needs to change (no-op fast path).
export function stripOrphanedToolResults<T extends ToolCallBody>(body: T): T {
  if (!body.messages || !Array.isArray(body.messages)) return body;

  const knownCallIds = new Set<string>();
  for (const msg of body.messages) {
    for (const id of getToolCallIds(msg)) {
      knownCallIds.add(id);
    }
  }

  let changed = false;
  const filteredMessages: ToolMessage[] = [];

  for (const msg of body.messages) {
    if (msg.role === "tool" && msg.tool_call_id) {
      if (knownCallIds.has(String(msg.tool_call_id))) {
        filteredMessages.push(msg);
      } else {
        changed = true;
      }
      continue;
    }

    if (Array.isArray(msg.content)) {
      const cleanedContent = (msg.content as ToolContentBlock[]).filter((block) => {
        if (block?.type !== "tool_result") return true;
        return typeof block.tool_use_id === "string" && knownCallIds.has(block.tool_use_id);
      });

      if (cleanedContent.length !== msg.content.length) {
        changed = true;
        if (cleanedContent.length === 0) continue;
        msg.content = cleanedContent;
      }
    }

    filteredMessages.push(msg);
  }

  if (!changed) return body;
  body.messages = filteredMessages;
  return body;
}
