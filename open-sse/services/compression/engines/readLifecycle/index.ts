/**
 * read-lifecycle compression engine (T08/H7 — gaps v3.8.42; opt-in, default-off).
 *
 * Agentic conversations re-Read the same files repeatedly. An earlier Read becomes **stale**
 * once the same path is Read again (superseded by a newer view) or modified by a later
 * Write/Edit. This engine collapses those superseded Read tool-results to a short stub, keeping
 * only the current (last, un-superseded) Read intact.
 *
 * Unlike `session-dedup` (content-addressed — collapses *identical* blocks) or `ccr` (reversible
 * markers), this is **semantic + lossy**: it removes stale content the later Read supersedes, so
 * it is **opt-in / default-off**. It is conservative: it matches only well-known Read/Write tool
 * names, compares exact paths, and collapses a Read only when a strictly-later invocation touches
 * the same path. Fail-open — any unexpected shape is left untouched.
 *
 * Supports both the Anthropic content-block shape (`tool_use` / `tool_result`) and the OpenAI
 * shape (assistant `tool_calls` + `role:"tool"` messages), linked by call id.
 */

import { createCompressionStats } from "../../stats.ts";
import type {
  CompressionEngine,
  CompressionEngineApplyOptions,
  EngineConfigField,
  EngineValidationResult,
} from "../types.ts";
import type { CompressionResult } from "../../types.ts";

const ENGINE_ID = "read-lifecycle";

/** Conservative tool-name classification (exact, lower-cased) — avoids false collapses. */
const READ_NAMES = new Set(["read", "read_file", "readfile", "view", "view_file", "cat"]);
const WRITE_NAMES = new Set([
  "write",
  "write_file",
  "writefile",
  "edit",
  "edit_file",
  "multiedit",
  "str_replace",
  "str_replace_editor",
  "str_replace_based_edit_tool",
  "apply_patch",
  "create_file",
  "update_file",
]);

function classifyTool(name: unknown): "read" | "write" | null {
  if (typeof name !== "string") return null;
  const lc = name.trim().toLowerCase();
  if (READ_NAMES.has(lc)) return "read";
  if (WRITE_NAMES.has(lc)) return "write";
  return null;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

/** Extract a file path from a tool input object across common field names. */
function extractPath(input: unknown): string | null {
  if (!isRecord(input)) return null;
  for (const key of ["file_path", "path", "filePath", "filename", "file", "target_file"]) {
    const v = input[key];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return null;
}

function parseMaybeJson(value: unknown): unknown {
  if (isRecord(value)) return value;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
  return null;
}

interface ToolInvocation {
  callId: string;
  kind: "read" | "write";
  path: string;
  order: number;
}

type MessageLike = { role?: string; content?: unknown; tool_calls?: unknown; [k: string]: unknown };

/**
 * Collect Read/Write tool invocations in conversation order (Anthropic `tool_use` +
 * OpenAI `tool_calls`), with a map of read call ids → path for stub rendering.
 */
export function extractInvocations(messages: MessageLike[]): {
  invocations: ToolInvocation[];
  readPathByCallId: Map<string, string>;
} {
  const invocations: ToolInvocation[] = [];
  const readPathByCallId = new Map<string, string>();
  let order = 0;

  for (const msg of messages) {
    // Anthropic: content array with tool_use blocks.
    if (Array.isArray(msg?.content)) {
      for (const block of msg.content) {
        if (!isRecord(block) || block.type !== "tool_use") continue;
        const kind = classifyTool(block.name);
        const callId = typeof block.id === "string" ? block.id : null;
        const path = extractPath(block.input);
        if (kind && callId && path) {
          invocations.push({ callId, kind, path, order: order++ });
          if (kind === "read") readPathByCallId.set(callId, path);
        }
      }
    }
    // OpenAI: assistant.tool_calls array.
    if (Array.isArray(msg?.tool_calls)) {
      for (const call of msg.tool_calls) {
        if (!isRecord(call)) continue;
        const fn = isRecord(call.function) ? call.function : null;
        const kind = classifyTool(fn?.name);
        const callId = typeof call.id === "string" ? call.id : null;
        const path = extractPath(parseMaybeJson(fn?.arguments));
        if (kind && callId && path) {
          invocations.push({ callId, kind, path, order: order++ });
          if (kind === "read") readPathByCallId.set(callId, path);
        }
      }
    }
  }
  return { invocations, readPathByCallId };
}

/**
 * A read is superseded when a strictly-later invocation (read OR write) touches the same path.
 * Returns the set of Read call ids whose tool-results can be collapsed.
 */
export function findSupersededReadCallIds(invocations: ToolInvocation[]): Set<string> {
  const superseded = new Set<string>();
  for (const inv of invocations) {
    if (inv.kind !== "read") continue;
    const hasLater = invocations.some((o) => o.path === inv.path && o.order > inv.order);
    if (hasLater) superseded.add(inv.callId);
  }
  return superseded;
}

function stubFor(path: string): string {
  return `[read superseded — "${path}" was re-read or modified later in the conversation; the current content appears below]`;
}

function replaceResultText(content: unknown, stub: string): unknown {
  if (typeof content === "string") return stub;
  if (Array.isArray(content)) {
    return content.map((part) =>
      isRecord(part) && part.type === "text" && typeof part.text === "string"
        ? { ...part, text: stub }
        : part
    );
  }
  return stub;
}

/**
 * Collapse the tool-results of superseded reads to a stub (Anthropic `tool_result` blocks +
 * OpenAI `role:"tool"` messages), keyed by call id. Returns the new messages + collapse count.
 */
export function collapseSupersededReads(
  messages: MessageLike[],
  superseded: Set<string>,
  readPathByCallId: Map<string, string>
): { messages: MessageLike[]; collapsedCount: number } {
  if (superseded.size === 0) return { messages, collapsedCount: 0 };
  let collapsedCount = 0;

  const out = messages.map((msg) => {
    // OpenAI tool result message.
    if (
      msg?.role === "tool" &&
      typeof msg.tool_call_id === "string" &&
      superseded.has(msg.tool_call_id)
    ) {
      collapsedCount++;
      const path = readPathByCallId.get(msg.tool_call_id) ?? "file";
      return { ...msg, content: stubFor(path) };
    }
    // Anthropic tool_result blocks inside a content array.
    if (Array.isArray(msg?.content)) {
      let changed = false;
      const newContent = msg.content.map((block) => {
        if (
          isRecord(block) &&
          block.type === "tool_result" &&
          typeof block.tool_use_id === "string" &&
          superseded.has(block.tool_use_id)
        ) {
          changed = true;
          collapsedCount++;
          const path = readPathByCallId.get(block.tool_use_id) ?? "file";
          return { ...block, content: replaceResultText(block.content, stubFor(path)) };
        }
        return block;
      });
      if (changed) return { ...msg, content: newContent };
    }
    return msg;
  });

  return { messages: out, collapsedCount };
}

// ─── schema ──────────────────────────────────────────────────────────────────

const SCHEMA: EngineConfigField[] = [
  { key: "enabled", type: "boolean", label: "Enabled", defaultValue: false },
];

function validate(config: Record<string, unknown>): EngineValidationResult {
  const errors: string[] = [];
  if (config["enabled"] !== undefined && typeof config["enabled"] !== "boolean") {
    errors.push("enabled must be a boolean");
  }
  return { valid: errors.length === 0, errors };
}

export const readLifecycleEngine: CompressionEngine = {
  id: ENGINE_ID,
  name: "Read Lifecycle (opt-in)",
  description:
    "Collapses stale/superseded file-Read tool results: when the same path is re-read or modified " +
    "later in the conversation, earlier Reads are replaced with a short stub, keeping the current " +
    "Read intact. Lossy + opt-in (default off). Supports Anthropic and OpenAI tool shapes.",
  icon: "history",
  targets: ["messages"],
  stackable: true,
  // Runs early (before content engines) so stale reads are gone before other passes work on them.
  stackPriority: 5,
  metadata: {
    id: ENGINE_ID,
    name: "Read Lifecycle (opt-in)",
    description:
      "Collapse superseded file-Read tool results (same path re-read/modified later). " +
      "Lossy, opt-in, default off. Anthropic + OpenAI shapes.",
    inputScope: "messages",
    targetLatencyMs: 2,
    supportsPreview: true,
    stable: true,
  },

  apply(body: Record<string, unknown>, options?: CompressionEngineApplyOptions): CompressionResult {
    const stepConfig = options?.stepConfig ?? {};
    if (stepConfig["enabled"] !== true) {
      return { body, compressed: false, stats: null };
    }
    const messages = body["messages"];
    if (!Array.isArray(messages) || messages.length === 0) {
      return { body, compressed: false, stats: null };
    }
    try {
      const start = performance.now();
      const { invocations, readPathByCallId } = extractInvocations(messages as MessageLike[]);
      const superseded = findSupersededReadCallIds(invocations);
      const { messages: newMessages, collapsedCount } = collapseSupersededReads(
        messages as MessageLike[],
        superseded,
        readPathByCallId
      );
      if (collapsedCount === 0) {
        return { body, compressed: false, stats: null };
      }
      const newBody: Record<string, unknown> = { ...body, messages: newMessages };
      const durationMs = Math.round(performance.now() - start);
      const stats = createCompressionStats(
        body,
        newBody,
        "stacked",
        [ENGINE_ID],
        [`read-lifecycle-collapsed-${collapsedCount}`],
        durationMs
      );
      return { body: newBody, compressed: true, stats };
    } catch {
      // Fail-open: any unexpected shape leaves the body untouched.
      return { body, compressed: false, stats: null };
    }
  },

  compress(body: Record<string, unknown>, config?: Record<string, unknown>): CompressionResult {
    return this.apply(body, { stepConfig: config ?? {} });
  },

  getConfigSchema(): EngineConfigField[] {
    return SCHEMA;
  },

  validateConfig(config: Record<string, unknown>): EngineValidationResult {
    return validate(config);
  },
};
