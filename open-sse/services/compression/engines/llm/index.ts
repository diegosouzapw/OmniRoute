/**
 * LLM-tier async compression engine (T05/C3 — opt-in, default-off).
 *
 * A generic "LLM compressor" tier: it can condense the prose of non-system messages via
 * a pluggable LLM backend. It mirrors the `llmlingua` engine's contract exactly, but the
 * backend is a full chat-completion model rather than a local ONNX classifier.
 *
 * ## Safe by construction (default-off)
 * - The DEFAULT backend is a no-op (`text => text`), so out of the box the engine NEVER
 *   mutates the payload — it returns the body unchanged (`compressed:false`).
 * - It is NOT part of the default stacked pipeline; an operator must add it explicitly.
 * - `enabled` defaults to `false` in the config schema.
 * A real LLM backend is wired via `setLlmCompressorBackend()` (the same injection seam the
 * tests use). The real production model is intentionally left as a VPS-validated follow-up
 * (Hard Rule #18), exactly as the `llmlingua` worker backend is gated.
 *
 * ## Fail-open everywhere (never throws, never corrupts)
 * 1. Backend rejection/error per prose segment → segment kept as-is.
 * 2. Any unexpected error in `applyAsync` → original body, `compressed:false`, no throw.
 *
 * ## Code-block protection (inviolable)
 * Fenced code blocks (and other preserved constructs) are tombstoned via
 * `extractPreservedBlocks` and re-stitched verbatim — the engine physically never passes
 * code to the backend. System messages are never touched.
 */

import { createCompressionStats, estimateCompressionTokens } from "../../stats.ts";
import { extractPreservedBlocks } from "../../preservation.ts";
import type {
  CompressionEngine,
  CompressionEngineApplyOptions,
  EngineConfigField,
  EngineValidationResult,
} from "../types.ts";
import type { CompressionResult } from "../../types.ts";

// ─── backend abstraction ──────────────────────────────────────────────────────

export interface LlmCompressorBackendOptions {
  model?: string;
  compressionRate?: number;
}

/**
 * A backend takes a prose text segment (+ optional config) and returns a compressed
 * version. Any rejection/error MUST be caught by the caller; the engine fail-opens.
 */
export type LlmCompressorBackend = (
  text: string,
  opts?: LlmCompressorBackendOptions
) => Promise<string>;

/** The default production backend: a no-op that returns the text unchanged (pass-through). */
const noopBackend: LlmCompressorBackend = async (text) => text;

/** Module-level injectable backend (null = use the no-op default). */
let _backend: LlmCompressorBackend | null = null;

/** Override the backend — for tests and for wiring a real LLM. `null` restores the no-op. */
export function setLlmCompressorBackend(b: LlmCompressorBackend | null): void {
  _backend = b;
}

function resolveBackend(): LlmCompressorBackend {
  return _backend ?? noopBackend;
}

// ─── prose / code splitting (code is never sent to the backend) ─────────────────

interface TextSegment {
  kind: "prose" | "preserved";
  text: string;
}

function splitProseAndPreserved(text: string): TextSegment[] {
  const { text: withPlaceholders, blocks } = extractPreservedBlocks(text);
  if (blocks.length === 0) return [{ kind: "prose", text }];

  const placeholderToOriginal = new Map(blocks.map((b) => [b.placeholder, b.content]));
  const escaped = blocks.map((b) => b.placeholder.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const splitRe = new RegExp(`(${escaped.join("|")})`, "g");

  const segments: TextSegment[] = [];
  for (const part of withPlaceholders.split(splitRe)) {
    if (!part) continue;
    const original = placeholderToOriginal.get(part);
    segments.push(
      original !== undefined ? { kind: "preserved", text: original } : { kind: "prose", text: part }
    );
  }
  return segments;
}

// ─── message processing ─────────────────────────────────────────────────────────

type MessageLike = {
  role?: string;
  content?: string | Array<Record<string, unknown>>;
  [key: string]: unknown;
};

async function compressProseText(
  text: string,
  backend: LlmCompressorBackend,
  opts?: LlmCompressorBackendOptions
): Promise<{ text: string; didCompress: boolean }> {
  if (!text.trim()) return { text, didCompress: false };
  try {
    const compressed = await backend(text, opts);
    if (typeof compressed === "string" && compressed.length < text.length) {
      return { text: compressed, didCompress: true };
    }
    return { text, didCompress: false };
  } catch {
    return { text, didCompress: false };
  }
}

async function compressMessageText(
  text: string,
  backend: LlmCompressorBackend,
  opts?: LlmCompressorBackendOptions
): Promise<{ text: string; didCompress: boolean }> {
  const segments = splitProseAndPreserved(text);
  let anyCompressed = false;
  const parts: string[] = [];
  for (const seg of segments) {
    if (seg.kind === "preserved") {
      parts.push(seg.text);
    } else {
      const { text: out, didCompress } = await compressProseText(seg.text, backend, opts);
      parts.push(out);
      if (didCompress) anyCompressed = true;
    }
  }
  return { text: parts.join(""), didCompress: anyCompressed };
}

async function processMessages(
  messages: MessageLike[],
  backend: LlmCompressorBackend,
  opts?: LlmCompressorBackendOptions
): Promise<{ messages: MessageLike[]; compressedCount: number }> {
  let compressedCount = 0;
  const result: MessageLike[] = [];
  for (const msg of messages) {
    if (msg.role === "system") {
      result.push({ ...msg });
      continue;
    }
    try {
      if (typeof msg.content === "string") {
        const { text, didCompress } = await compressMessageText(msg.content, backend, opts);
        if (didCompress) {
          compressedCount++;
          result.push({ ...msg, content: text });
        } else {
          result.push({ ...msg });
        }
      } else if (Array.isArray(msg.content)) {
        let changed = false;
        const newContent: Array<Record<string, unknown>> = [];
        for (const part of msg.content) {
          if (part["type"] === "text" && typeof part["text"] === "string") {
            const { text, didCompress } = await compressMessageText(
              part["text"] as string,
              backend,
              opts
            );
            if (didCompress) {
              changed = true;
              compressedCount++;
              newContent.push({ ...part, text });
            } else {
              newContent.push(part);
            }
          } else {
            newContent.push(part);
          }
        }
        result.push(changed ? { ...msg, content: newContent } : { ...msg });
      } else {
        result.push({ ...msg });
      }
    } catch {
      result.push({ ...msg });
    }
  }
  return { messages: result, compressedCount };
}

// ─── config schema ────────────────────────────────────────────────────────────

const LLM_COMPRESSOR_SCHEMA: EngineConfigField[] = [
  // Default OFF: this tier costs an extra model call and mutates the payload, so it is
  // opt-in (Hard Rule #20 spirit) — never on by default.
  { key: "enabled", type: "boolean", label: "Enabled", defaultValue: false },
  { key: "model", type: "string", label: "Compression model", defaultValue: "" },
  {
    key: "minTokens",
    type: "number",
    label: "Min tokens (floor)",
    defaultValue: 2000,
    min: 0,
    max: 100000,
  },
  {
    key: "compressionRate",
    type: "number",
    label: "Compression rate (keep ratio)",
    defaultValue: 0.5,
    min: 0.1,
    max: 0.9,
  },
];

function validateLlmCompressorConfig(config: Record<string, unknown>): EngineValidationResult {
  const errors: string[] = [];
  if (config["enabled"] !== undefined && typeof config["enabled"] !== "boolean") {
    errors.push("enabled must be a boolean");
  }
  if (config["model"] !== undefined && typeof config["model"] !== "string") {
    errors.push("model must be a string");
  }
  if (config["minTokens"] !== undefined) {
    const v = config["minTokens"];
    if (typeof v !== "number" || Number.isNaN(v) || v < 0) errors.push("minTokens must be a number >= 0");
  }
  if (config["compressionRate"] !== undefined) {
    const v = config["compressionRate"];
    if (typeof v !== "number" || Number.isNaN(v) || v < 0.1 || v > 0.9) {
      errors.push("compressionRate must be a number between 0.1 and 0.9");
    }
  }
  return { valid: errors.length === 0, errors };
}

// ─── engine export ──────────────────────────────────────────────────────────────

const ENGINE_ID = "llm";

export const llmCompressorEngine: CompressionEngine = {
  id: ENGINE_ID,
  name: "LLM Compressor (opt-in)",
  description:
    "Opt-in LLM-tier compression: condenses the prose of non-system messages via a pluggable " +
    "chat-completion backend. Default-off and a no-op until an operator both enables it and wires " +
    "a real backend; fenced code blocks and system messages are never sent to the model. " +
    "Fail-opens on any backend error.",
  icon: "robot",
  targets: ["messages"],
  stackable: true,
  // Runs after llmlingua (35) but before ultra (40); semantic LLM rewriting is most useful
  // once cheaper structural/semantic passes have already reduced the prose.
  stackPriority: 38,
  metadata: {
    id: ENGINE_ID,
    name: "LLM Compressor (opt-in)",
    description:
      "Opt-in LLM-tier prose compression via a pluggable backend. Default-off / no-op; " +
      "code blocks and system messages are protected; fail-open on backend error.",
    inputScope: "messages",
    targetLatencyMs: 1500,
    supportsPreview: false,
    stable: true,
  },

  /** Synchronous pass-through — the real work is async-only (`applyAsync`). */
  apply(body: Record<string, unknown>): CompressionResult {
    return { body, compressed: false, stats: null };
  },

  async applyAsync(
    body: Record<string, unknown>,
    options?: CompressionEngineApplyOptions
  ): Promise<CompressionResult> {
    const stepConfig = options?.stepConfig ?? {};
    // Opt-in: only runs when explicitly enabled.
    if (stepConfig["enabled"] !== true) {
      return { body, compressed: false, stats: null };
    }

    const messages = body["messages"];
    if (!Array.isArray(messages) || messages.length === 0) {
      return { body, compressed: false, stats: null };
    }

    const minTokens =
      typeof stepConfig["minTokens"] === "number" ? (stepConfig["minTokens"] as number) : 2000;
    if (minTokens > 0) {
      const nonSystemText = (messages as MessageLike[])
        .filter((m) => m.role !== "system")
        .map((m) => (typeof m.content === "string" ? m.content : JSON.stringify(m.content ?? "")))
        .join("\n");
      if (estimateCompressionTokens(nonSystemText) < minTokens) {
        return { body, compressed: false, stats: null };
      }
    }

    const backendOpts: LlmCompressorBackendOptions = {
      model: typeof stepConfig["model"] === "string" ? (stepConfig["model"] as string) : undefined,
      compressionRate:
        typeof stepConfig["compressionRate"] === "number"
          ? (stepConfig["compressionRate"] as number)
          : undefined,
    };

    try {
      const backend = resolveBackend();
      const start = performance.now();
      const { messages: newMessages, compressedCount } = await processMessages(
        messages as MessageLike[],
        backend,
        backendOpts
      );
      if (compressedCount === 0) {
        return { body, compressed: false, stats: null };
      }
      const newBody: Record<string, unknown> = { ...body, messages: newMessages };
      const durationMs = Math.round(performance.now() - start);
      const stats = createCompressionStats(
        body,
        newBody,
        "stacked",
        [ENGINE_ID],
        [`llm-compressed-${compressedCount}-messages`],
        durationMs
      );
      return { body: newBody, compressed: true, stats };
    } catch {
      return { body, compressed: false, stats: null };
    }
  },

  compress(body: Record<string, unknown>, config?: Record<string, unknown>): CompressionResult {
    return this.apply(body, { stepConfig: config ?? {} });
  },

  getConfigSchema(): EngineConfigField[] {
    return LLM_COMPRESSOR_SCHEMA;
  },

  validateConfig(config: Record<string, unknown>): EngineValidationResult {
    return validateLlmCompressorConfig(config);
  },
};
