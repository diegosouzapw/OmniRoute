/**
 * LLMLingua async compression engine (L1/L3 — F2.1).
 *
 * Implements the `CompressionEngine` contract with an async path (`applyAsync`)
 * that compresses prose via a pluggable backend.
 *
 * ## Design
 *
 * ### Backend abstraction
 * `LlmlinguaBackend` is a `(text: string, opts?: LlmlinguaBackendOptions) =>
 * Promise<string>` contract (the opts carry model selection / compression rate /
 * offline model-path override; single-arg fakes remain assignable).
 * Tests inject a fake backend via `setLlmlinguaBackend()`. Production code uses
 * `workerBackend` from `./worker.ts` — the real MobileBERT ONNX worker-thread backend
 * (strictly fail-open: missing optional deps or any error return the original text).
 *
 * ### Code-block protection (inviolable)
 * Before any prose segment reaches the backend, `extractPreservedBlocks` from
 * `preservation.ts` is used to tombstone fenced code blocks (and other
 * preserved constructs) into placeholder strings. The prose between placeholders
 * is what gets sent to the backend. Code blocks are re-stitched verbatim into
 * the output. This is done REGARDLESS of what the backend does — the engine
 * physically never passes code to the model.
 *
 * ### Fail-open points (all errors → original body)
 * 1. Backend rejects for a prose segment → catch → segment kept as-is.
 * 2. Any unexpected error in `applyAsync` → outer try/catch → original body,
 *    compressed:false, stats:null returned (no throw).
 *
 * ### Sync `apply` (pass-through)
 * The sync path is always a no-op (`compressed:false`, original body). The real
 * work is async-only; `applyStackedCompressionAsync` calls `applyAsync` when
 * present and falls back to `apply` otherwise.
 *
 * ### stackPriority
 * 35 — runs after structural engines (CCR=4, session-dedup=3, headroom=15,
 * caveman=20) but before ultra (40). Semantic pruning is most effective after
 * simpler structural compression has already reduced noise.
 *
 * ### Real backend
 * `./worker.ts` runs `@atjsh/llmlingua-2` (MobileBERT ONNX) in a worker_threads.Worker,
 * gated by a minimum token count and strictly fail-open. The optional deps are not
 * installed by default (CI / most installs), so the engine no-ops there; the real model
 * is exercised on the VPS behind RUN_LLMLINGUA_INT (Hard Rule #18). See `./worker.ts`.
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
import { workerBackend } from "./worker.ts";
import { LLMLINGUA_MODELS, DEFAULT_LLMLINGUA_MODEL } from "./constants.ts";

// ─── backend abstraction ──────────────────────────────────────────────────────

/** Options the real backend needs (model selection + compression rate + offline override). */
export interface LlmlinguaBackendOptions {
  model?: string;
  compressionRate?: number;
  modelPath?: string;
}

/**
 * A backend takes a prose text segment (+ optional config) and returns a compressed version.
 * Any rejection or error MUST be caught by the caller; the engine fail-opens.
 */
export type LlmlinguaBackend = (text: string, opts?: LlmlinguaBackendOptions) => Promise<string>;

/** Module-level injectable backend (null = use default production backend). */
let _backend: LlmlinguaBackend | null = null;

/**
 * Override the backend — intended for tests only.
 * Pass `null` to restore the default production backend.
 */
export function setLlmlinguaBackend(b: LlmlinguaBackend | null): void {
  _backend = b;
}

/** Resolve the active backend: injected fake (for tests) or production stub. */
function resolveBackend(): LlmlinguaBackend {
  return _backend ?? workerBackend;
}

// ─── prose/code splitting ─────────────────────────────────────────────────────

interface TextSegment {
  kind: "prose" | "preserved";
  text: string;
}

/**
 * Split `text` into alternating prose / preserved segments using
 * `extractPreservedBlocks` from preservation.ts.
 *
 * Preserved blocks (fenced code, inline code, math, headings, URLs, etc.)
 * are returned verbatim and are NEVER sent to the backend. Only the prose
 * segments between preserved blocks are eligible for compression.
 *
 * Implementation: `extractPreservedBlocks` returns a text with NUL-delimited
 * placeholder strings in place of preserved blocks, plus a `blocks` array
 * mapping placeholder → original content. We split on those placeholders to
 * interleave prose and preserved segments.
 */
function splitProseAndPreserved(text: string): TextSegment[] {
  const { text: withPlaceholders, blocks } = extractPreservedBlocks(text);

  if (blocks.length === 0) {
    return [{ kind: "prose", text }];
  }

  const segments: TextSegment[] = [];
  const placeholderToOriginal = new Map(blocks.map((b) => [b.placeholder, b.content]));

  // Build a pattern matching any placeholder. Placeholders contain NUL
  // characters so they are guaranteed not to appear in user text.
  const escapedPhs = blocks.map((b) => b.placeholder.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const splitRe = new RegExp(`(${escapedPhs.join("|")})`, "g");

  const parts = withPlaceholders.split(splitRe);
  for (const part of parts) {
    if (!part) continue;
    const original = placeholderToOriginal.get(part);
    if (original !== undefined) {
      segments.push({ kind: "preserved", text: original });
    } else {
      segments.push({ kind: "prose", text: part });
    }
  }

  return segments;
}

// ─── message processing ───────────────────────────────────────────────────────

type MessageLike = {
  role?: string;
  content?: string | Array<Record<string, unknown>>;
  [key: string]: unknown;
};

/**
 * Compress a single prose string via the backend.
 * On any error, fail-open and return the original text.
 */
async function compressProseText(
  text: string,
  backend: LlmlinguaBackend,
  opts?: LlmlinguaBackendOptions
): Promise<{ text: string; didCompress: boolean }> {
  if (!text.trim()) return { text, didCompress: false };
  try {
    const compressed = await backend(text, opts);
    // Accept only if it actually gets shorter (reject no-ops or expansions)
    if (typeof compressed === "string" && compressed.length < text.length) {
      return { text: compressed, didCompress: true };
    }
    return { text, didCompress: false };
  } catch {
    // Fail-open: backend error → original segment
    return { text, didCompress: false };
  }
}

/**
 * Process a single message text string:
 *   1. Split into prose / preserved segments.
 *   2. Compress each prose segment via the backend (fail-open per segment).
 *   3. Re-stitch with preserved segments verbatim.
 * Returns the new text and whether any compression happened.
 */
async function compressMessageText(
  text: string,
  backend: LlmlinguaBackend,
  opts?: LlmlinguaBackendOptions
): Promise<{ text: string; didCompress: boolean }> {
  const segments = splitProseAndPreserved(text);
  let anyCompressed = false;
  const parts: string[] = [];

  for (const seg of segments) {
    if (seg.kind === "preserved") {
      // Never send preserved content (code, math, etc.) to the backend
      parts.push(seg.text);
    } else {
      const { text: out, didCompress } = await compressProseText(seg.text, backend, opts);
      parts.push(out);
      if (didCompress) anyCompressed = true;
    }
  }

  return { text: parts.join(""), didCompress: anyCompressed };
}

/**
 * Process all non-system messages, compressing prose in each text content part.
 * Fail-opens per message: any unexpected error → that message kept as-is.
 */
async function processMessages(
  messages: MessageLike[],
  backend: LlmlinguaBackend,
  opts?: LlmlinguaBackendOptions
): Promise<{ messages: MessageLike[]; compressedCount: number }> {
  let compressedCount = 0;
  const result: MessageLike[] = [];

  for (const msg of messages) {
    // Never touch system messages
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
      // Fail-open per message: keep original
      result.push({ ...msg });
    }
  }

  return { messages: result, compressedCount };
}

// ─── config schema ────────────────────────────────────────────────────────────

const LLMLINGUA_SCHEMA: EngineConfigField[] = [
  { key: "enabled", type: "boolean", label: "Enabled", defaultValue: true },
  {
    key: "model",
    type: "select",
    label: "Model",
    defaultValue: DEFAULT_LLMLINGUA_MODEL,
    options: Object.values(LLMLINGUA_MODELS).map((m) => ({ value: m.id, label: m.label })),
  },
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
  { key: "modelPath", type: "string", label: "Model path (offline override)", defaultValue: "" },
];

function validateLlmlinguaConfig(config: Record<string, unknown>): EngineValidationResult {
  const errors: string[] = [];

  if (config["enabled"] !== undefined && typeof config["enabled"] !== "boolean") {
    errors.push("enabled must be a boolean");
  }

  if (config["model"] !== undefined) {
    const model = config["model"];
    if (typeof model !== "string" || !(model in LLMLINGUA_MODELS)) {
      errors.push("model must be one of: " + Object.keys(LLMLINGUA_MODELS).join(", "));
    }
  }

  if (config["minTokens"] !== undefined) {
    const minTokens = config["minTokens"];
    if (typeof minTokens !== "number" || Number.isNaN(minTokens) || minTokens < 0) {
      errors.push("minTokens must be a number >= 0");
    }
  }

  if (config["compressionRate"] !== undefined) {
    const rate = config["compressionRate"];
    if (typeof rate !== "number" || Number.isNaN(rate) || rate < 0.1 || rate > 0.9) {
      errors.push("compressionRate must be a number between 0.1 and 0.9");
    }
  }

  if (config["modelPath"] !== undefined && typeof config["modelPath"] !== "string") {
    errors.push("modelPath must be a string");
  }

  return { valid: errors.length === 0, errors };
}

// ─── engine export ─────────────────────────────────────────────────────────────

const ENGINE_ID = "llmlingua";

export const llmlinguaEngine: CompressionEngine = {
  id: ENGINE_ID,
  name: "LLMLingua-2 (Semantic Pruning)",
  description:
    "Async semantic token pruning via LLMLingua-2 (ONNX/worker-thread backend). " +
    "Compresses prose in non-system messages; fenced code blocks and other preserved " +
    "constructs are never altered. Fail-opens on any backend error. Production backend: " +
    "@atjsh/llmlingua-2 (TinyBERT 57 MB default, BERT-base optional) in a worker thread; " +
    "model lazy-downloaded to DATA_DIR. Optional deps — fail-opens if not installed.",
  icon: "brain",
  targets: ["messages"],
  stackable: true,
  // stackPriority 35: runs after structural engines (CCR=4, session-dedup=3,
  // headroom=15, caveman=20) but before ultra (40). Semantic pruning is more
  // effective on already-structurally-compressed text.
  stackPriority: 35,
  metadata: {
    id: ENGINE_ID,
    name: "LLMLingua-2 (Semantic Pruning)",
    description:
      "ONNX-based semantic token classification. Compresses prose only; " +
      "code blocks and preserved constructs are protected. Fail-open on " +
      "model/worker error.",
    inputScope: "messages",
    targetLatencyMs: 200,
    supportsPreview: false,
    // Stable. The worker model itself was VPS-validated (real prose 209→107 ch, ok=true),
    // but the EARLIER "walk-up + optional-deps gate confirmed in the bundle" claim was
    // wrong: the Next standalone bundle (webpack) froze `import.meta.url` to the build path
    // and stubbed `createRequire`, so in production the gate was always false and the worker
    // never spawned (it silently fell back to the aggressive summarizer). Fixed in B-SLM —
    // worker.ts now resolves deps + worker file from runtime anchors (cwd / argv[1]). The
    // optional deps must also be co-located into dist/node_modules (#4286) to actually run.
    stable: true,
  },

  /**
   * Synchronous pass-through.
   *
   * The real compression is async-only (worker-thread model). The sync path
   * exists only so this engine is safe in sync stacked pipelines — it does
   * nothing and returns the body unchanged. `applyStackedCompressionAsync`
   * will call `applyAsync` instead.
   */
  apply(body: Record<string, unknown>): CompressionResult {
    return { body, compressed: false, stats: null };
  },

  /**
   * Async compression path.
   *
   * For each non-system message, splits text into prose/preserved segments,
   * sends only prose to the backend, and re-stitches with preserved segments
   * (fenced code, inline code, math, etc.) untouched.
   *
   * Fail-open contract:
   *   - Backend rejection/error per prose segment → segment kept as-is.
   *   - Any unexpected outer error → original body returned, no throw.
   */
  async applyAsync(
    body: Record<string, unknown>,
    options?: CompressionEngineApplyOptions
  ): Promise<CompressionResult> {
    const stepConfig = options?.stepConfig ?? {};
    if (stepConfig["enabled"] === false) {
      return { body, compressed: false, stats: null };
    }

    const messages = body["messages"];
    if (!Array.isArray(messages) || messages.length === 0) {
      return { body, compressed: false, stats: null };
    }

    // minTokens floor: skip the model entirely on small prompts (avoid paying
    // model latency when there is little to gain). 0 disables the floor.
    const minTokens =
      typeof stepConfig["minTokens"] === "number" ? (stepConfig["minTokens"] as number) : 2000;
    if (minTokens > 0) {
      const nonSystemText = (messages as MessageLike[])
        .filter((m) => m.role !== "system")
        .map((m) => (typeof m.content === "string" ? m.content : JSON.stringify(m.content ?? "")))
        .join("\n");
      if (estimateCompressionTokens(nonSystemText) < minTokens) {
        // Below the floor — skip compression for this small prompt.
        return { body, compressed: false, stats: null };
      }
    }

    // Backend options threaded from stepConfig (model selection / rate / offline override).
    const backendOpts: LlmlinguaBackendOptions = {
      model: typeof stepConfig["model"] === "string" ? (stepConfig["model"] as string) : undefined,
      compressionRate:
        typeof stepConfig["compressionRate"] === "number"
          ? (stepConfig["compressionRate"] as number)
          : undefined,
      modelPath:
        typeof stepConfig["modelPath"] === "string" && stepConfig["modelPath"]
          ? (stepConfig["modelPath"] as string)
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
        [`llmlingua-compressed-${compressedCount}-messages`],
        durationMs
      );

      return { body: newBody, compressed: true, stats };
    } catch {
      // Outer fail-open: any unexpected error → return original body unchanged
      return { body, compressed: false, stats: null };
    }
  },

  compress(body: Record<string, unknown>, config?: Record<string, unknown>): CompressionResult {
    return this.apply(body, { stepConfig: config ?? {} });
  },

  getConfigSchema(): EngineConfigField[] {
    return LLMLINGUA_SCHEMA;
  },

  validateConfig(config: Record<string, unknown>): EngineValidationResult {
    return validateLlmlinguaConfig(config);
  },
};
