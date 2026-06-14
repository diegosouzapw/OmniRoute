/**
 * CCR (Content-Compression-Retrieve) engine (H4)
 *
 * Replaces large contiguous blocks of text with a content-addressed
 * retrieve marker: `[CCR retrieve hash=<24hex> chars=<N>]`
 *
 * The verbatim block is stored in an in-module content-addressed store
 * (keyed by 24-hex content hash). The `retrieve` MCP tool (or the
 * `handleCcrRetrieve` helper exported here) returns the block on demand.
 *
 * Algorithm:
 *   - Scan non-system messages; for each `type:"text"` part or string content,
 *     find contiguous text blocks ≥ minChars characters.
 *   - Replace the block with `[CCR retrieve hash=<24hex> chars=<N>]` only if
 *     the marker is shorter than the original block.
 *   - Store the original block keyed by hash in the CCR store.
 *
 * Feedback:
 *   - `recordRetrieval(hash)` increments a retrieval counter for that hash.
 *   - `shouldSkipCompression(hash)` returns true once the counter reaches
 *     RETRIEVAL_THRESHOLD, signalling "do not compress this block again".
 *
 * Conservative guards:
 *   - Never touch `role: "system"`.
 *   - Only replace if it shrinks (marker shorter than original).
 *   - Only replace blocks ≥ minChars (default 600).
 *   - `stackable: true`, `stackPriority: 4` (runs just after session-dedup(3)).
 */

import crypto from "node:crypto";
import { createCompressionStats } from "../../stats.ts";
import type {
  CompressionEngine,
  CompressionEngineApplyOptions,
  EngineConfigField,
  EngineValidationResult,
} from "../types.ts";
import type { CompressionResult } from "../../types.ts";

// ─── constants ────────────────────────────────────────────────────────────────

const ENGINE_ID = "ccr";
/** Default minimum character count for a block to be a CCR candidate. */
const DEFAULT_MIN_CHARS = 600;
/** Number of retrievals before a block is flagged "do-not-compress". */
const RETRIEVAL_THRESHOLD = 3;
/** Regex to match CCR markers for reconstruction. */
const MARKER_RE = /\[CCR retrieve hash=([0-9a-f]{24}) chars=\d+\]/g;

// ─── content-addressed store ──────────────────────────────────────────────────

/** Map from 24-hex hash → verbatim block text. */
const ccrStore = new Map<string, string>();
/** Map from 24-hex hash → retrieval count (feedback signal). */
const retrievalCounts = new Map<string, number>();

/**
 * Compute a 24-hex content hash for a text block (SHA-256 prefix).
 */
function hashContent(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex").slice(0, 24);
}

/**
 * Store a block in the CCR store, returning its hash.
 */
function storeBlock(text: string): string {
  const hash = hashContent(text);
  if (!ccrStore.has(hash)) {
    ccrStore.set(hash, text);
  }
  return hash;
}

/**
 * Retrieve the verbatim block for a given hash.
 * Returns null if not found.
 */
export function retrieveBlock(hash: string): string | null {
  return ccrStore.get(hash) ?? null;
}

/**
 * Record a retrieval event for a given hash (feedback signal).
 */
export function recordRetrieval(hash: string): void {
  retrievalCounts.set(hash, (retrievalCounts.get(hash) ?? 0) + 1);
}

/**
 * Returns true if the block has been retrieved often enough that it
 * should be excluded from compression in future requests.
 */
export function shouldSkipCompression(hash: string): boolean {
  return (retrievalCounts.get(hash) ?? 0) >= RETRIEVAL_THRESHOLD;
}

/**
 * Reset the CCR store and retrieval counts (for testing).
 */
export function resetCcrStore(): void {
  ccrStore.clear();
  retrievalCounts.clear();
}

// ─── MCP tool handler (pure function) ────────────────────────────────────────

/**
 * Handler for the `omniroute_ccr_retrieve` MCP tool.
 * Returns the verbatim block for the given hash, or an error object.
 */
export function handleCcrRetrieve(args: { hash: string }): { content: string } | { error: string } {
  if (!args.hash || typeof args.hash !== "string") {
    return { error: "hash parameter is required and must be a string" };
  }

  const block = retrieveBlock(args.hash);
  if (block === null) {
    return {
      error: `CCR block not found for hash=${args.hash}. The block may have expired or the hash is invalid.`,
    };
  }

  recordRetrieval(args.hash);
  return { content: block };
}

// ─── message content processing ──────────────────────────────────────────────

type MessageLike = {
  role?: string;
  content?: string | Array<Record<string, unknown>>;
  [key: string]: unknown;
};

/**
 * Build a CCR marker string for a block.
 */
function buildMarker(hash: string, charCount: number): string {
  return `[CCR retrieve hash=${hash} chars=${charCount}]`;
}

/**
 * Replace a large text block with a CCR marker if it shrinks the content.
 * Returns the new text and a flag indicating whether replacement happened.
 */
function maybeCcrReplace(
  text: string,
  minChars: number
): { text: string; replaced: boolean; hash: string | null } {
  if (text.length < minChars) {
    return { text, replaced: false, hash: null };
  }

  const hash = hashContent(text);

  // Skip if this hash is flagged as do-not-compress
  if (shouldSkipCompression(hash)) {
    return { text, replaced: false, hash: null };
  }

  const marker = buildMarker(hash, text.length);

  // Only replace if it actually shrinks
  if (marker.length >= text.length) {
    return { text, replaced: false, hash: null };
  }

  storeBlock(text);
  return { text: marker, replaced: true, hash };
}

/**
 * Process all non-system messages: find large text blocks and replace with CCR markers.
 */
function processMessages(
  messages: MessageLike[],
  minChars: number
): { messages: MessageLike[]; replacedCount: number } {
  let replacedCount = 0;

  const result = messages.map((msg) => {
    if (msg.role === "system") return { ...msg };

    if (typeof msg.content === "string") {
      const { text, replaced } = maybeCcrReplace(msg.content, minChars);
      if (replaced) {
        replacedCount++;
        return { ...msg, content: text };
      }
      return { ...msg };
    }

    if (Array.isArray(msg.content)) {
      let changed = false;
      const newContent = msg.content.map((part) => {
        if (part["type"] !== "text" || typeof part["text"] !== "string") return part;
        const { text, replaced } = maybeCcrReplace(part["text"] as string, minChars);
        if (replaced) {
          changed = true;
          replacedCount++;
          return { ...part, text };
        }
        return part;
      });
      if (changed) {
        return { ...msg, content: newContent };
      }
      return { ...msg };
    }

    return { ...msg };
  });

  return { messages: result, replacedCount };
}

// ─── schema & validation ──────────────────────────────────────────────────────

const CCR_SCHEMA: EngineConfigField[] = [
  {
    key: "enabled",
    type: "boolean",
    label: "Enabled",
    defaultValue: true,
  },
  {
    key: "minChars",
    type: "number",
    label: "Minimum block characters",
    description: "Minimum character count for a block to be a CCR candidate.",
    defaultValue: DEFAULT_MIN_CHARS,
    min: 100,
    max: 1_000_000,
  },
];

function validateCcrConfig(config: Record<string, unknown>): EngineValidationResult {
  const errors: string[] = [];
  if (config["enabled"] !== undefined && typeof config["enabled"] !== "boolean") {
    errors.push("enabled must be a boolean");
  }
  if (config["minChars"] !== undefined) {
    const v = config["minChars"];
    if (typeof v !== "number" || !Number.isFinite(v) || v < 1) {
      errors.push("minChars must be a positive number");
    }
  }
  return { valid: errors.length === 0, errors };
}

// ─── reconstruction helper ────────────────────────────────────────────────────

/**
 * Reconstruct a body by replacing all `[CCR retrieve hash=<24hex> chars=N]`
 * markers with the stored verbatim blocks.
 *
 * Returns a new body object with markers restored to their original text.
 */
export function reconstructCcr(body: Record<string, unknown>): Record<string, unknown> {
  const messages = body["messages"];
  if (!Array.isArray(messages)) return body;

  type MsgLike = {
    role?: string;
    content?: string | Array<Record<string, unknown>>;
    [key: string]: unknown;
  };

  const restored = (messages as MsgLike[]).map((msg) => {
    const content = msg["content"];

    if (typeof content === "string") {
      const reconstructed = content.replace(MARKER_RE, (_m, hash: string) => {
        return ccrStore.get(hash) ?? _m;
      });
      return reconstructed !== content ? { ...msg, content: reconstructed } : { ...msg };
    }

    if (Array.isArray(content)) {
      let changed = false;
      const newContent = content.map((part) => {
        if (part["type"] !== "text" || typeof part["text"] !== "string") return part;
        const reconstructed = (part["text"] as string).replace(MARKER_RE, (_m, hash: string) => {
          return ccrStore.get(hash) ?? _m;
        });
        if (reconstructed !== part["text"]) {
          changed = true;
          return { ...part, text: reconstructed };
        }
        return part;
      });
      return changed ? { ...msg, content: newContent } : { ...msg };
    }

    return { ...msg };
  });

  return { ...body, messages: restored };
}

// ─── engine export ────────────────────────────────────────────────────────────

export const ccrEngine: CompressionEngine = {
  id: ENGINE_ID,
  name: "CCR (Content-Compression-Retrieve)",
  description:
    "Replaces large blocks of text with content-addressed retrieve markers " +
    "`[CCR retrieve hash=<24hex> chars=N]`. The original block is stored and " +
    "retrievable via the `omniroute_ccr_retrieve` MCP tool (H4).",
  icon: "archive",
  targets: ["messages"],
  stackable: true,
  // stackPriority 4 = runs just after session-dedup (3), before headroom (15),
  // caveman (20), aggressive (30), ultra (40).
  stackPriority: 4,
  metadata: {
    id: ENGINE_ID,
    name: "CCR (Content-Compression-Retrieve)",
    description:
      "Reversible compression: large blocks → retrieve marker. " +
      "Original retrievable via MCP tool (H4).",
    inputScope: "messages",
    targetLatencyMs: 1,
    supportsPreview: true,
    stable: true,
  },

  apply(body: Record<string, unknown>, options?: CompressionEngineApplyOptions): CompressionResult {
    const stepConfig = options?.stepConfig ?? {};

    if (stepConfig["enabled"] === false) {
      return { body, compressed: false, stats: null };
    }

    const minChars =
      typeof stepConfig["minChars"] === "number"
        ? (stepConfig["minChars"] as number)
        : DEFAULT_MIN_CHARS;

    const messages = body["messages"];
    if (!Array.isArray(messages) || messages.length === 0) {
      return { body, compressed: false, stats: null };
    }

    const start = performance.now();
    const { messages: newMessages, replacedCount } = processMessages(
      messages as MessageLike[],
      minChars
    );

    if (replacedCount === 0) {
      return { body, compressed: false, stats: null };
    }

    const newBody: Record<string, unknown> = { ...body, messages: newMessages };
    const durationMs = Math.round(performance.now() - start);
    const stats = createCompressionStats(
      body,
      newBody,
      "stacked",
      ["ccr"],
      [`ccr-replaced-${replacedCount}-blocks`],
      durationMs
    );

    return { body: newBody, compressed: true, stats };
  },

  compress(body: Record<string, unknown>, config?: Record<string, unknown>): CompressionResult {
    return this.apply(body, { stepConfig: config ?? {} });
  },

  getConfigSchema(): EngineConfigField[] {
    return CCR_SCHEMA;
  },

  validateConfig(config: Record<string, unknown>): EngineValidationResult {
    return validateCcrConfig(config);
  },
};
