/**
 * CCR (Content-Compression-Retrieve) engine (H4)
 *
 * Replaces large contiguous blocks of text with a content-addressed
 * retrieve marker: `[CCR retrieve hash=<24hex> chars=<N>]`
 *
 * The verbatim block is stored in a principal-scoped, bounded in-module store.
 * The store key is `${principalId ?? "__anon__"} ${contentHash}` so that one
 * principal cannot read another's stored blocks (IDOR protection).
 *
 * The `retrieve` MCP tool (or the `handleCcrRetrieve` helper exported here)
 * returns the block on demand when called with the matching callerId.
 *
 * Algorithm:
 *   - Scan non-system messages; for each `type:"text"` part or string content,
 *     find contiguous text blocks ≥ minChars characters.
 *   - Replace the block with `[CCR retrieve hash=<24hex> chars=<N>]` only if
 *     the marker is shorter than the original block.
 *   - Store the original block keyed by (principalId, hash) in the CCR store.
 *
 * Feedback (scoped by principal):
 *   - `recordRetrieval(hash, principalId)` increments a retrieval counter for
 *     that (principalId, hash) pair.
 *   - `shouldSkipCompression(hash, principalId)` returns true once the counter
 *     reaches RETRIEVAL_THRESHOLD for that principal — one principal's behaviour
 *     does not affect another's (cross-tenant state drift protection).
 *
 * Memory bound:
 *   - Both `ccrStore` and `retrievalCounts` are capped at MAX_CCR_ENTRIES
 *     entries using FIFO eviction (Map insertion-order guarantees).
 *
 * Conservative guards:
 *   - Never touch `role: "system"`.
 *   - Only replace if it shrinks (marker shorter than original).
 *   - Only replace blocks ≥ minChars (default 600).
 *   - `stackable: true`, `stackPriority: 4` (runs just after session-dedup(3)).
 */

import crypto from "node:crypto";
import { createCompressionStats } from "../../stats.ts";
import { queryBlock, type CcrQuery } from "./ccrQuery.ts";
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
/** Number of retrievals before a block is flagged "do-not-compress" for that principal. */
const RETRIEVAL_THRESHOLD = 3;
/**
 * H8 — default retrieval ramp factor. Each prior retrieval (below the threshold) raises a block's
 * effective `minChars` linearly, so hot content is compressed progressively less; `1` disables the
 * ramp (only the >= threshold cliff remains — the legacy binary behavior).
 */
const RETRIEVAL_RAMP_FACTOR_DEFAULT = 2;
/**
 * Maximum number of entries in each bounded store.
 * When inserting beyond this cap, the oldest entry (Map insertion order) is evicted.
 * 5 000 entries × ~2 KB average ≈ 10 MB upper bound for each map.
 */
export const MAX_CCR_ENTRIES = 5_000;

// ─── principal-scoped, bounded content store ──────────────────────────────────

/**
 * Store key = `${principalId ?? "__anon__"} ${contentHash}`.
 * Using a compound key scopes data to the principal that stored it.
 */
const ccrStore = new Map<string, string>();
/** Retrieval counter store — same scoping as ccrStore. */
const retrievalCounts = new Map<string, number>();

/** Sentinel used when no principalId is provided. */
const ANON = "__anon__";

function buildStoreKey(hash: string, principalId?: string): string {
  return `${principalId ?? ANON} ${hash}`;
}

/**
 * Insert a value into a bounded Map, evicting the oldest entry when over the cap.
 */
function boundedSet<V>(map: Map<string, V>, key: string, value: V): void {
  if (!map.has(key) && map.size >= MAX_CCR_ENTRIES) {
    // Map preserves insertion order — the first iterator result is the oldest entry.
    const firstKey = map.keys().next().value;
    if (firstKey !== undefined) {
      map.delete(firstKey);
    }
  }
  map.set(key, value);
}

/**
 * Compute a 24-hex content hash for a text block (SHA-256 prefix).
 * This is the hash embedded in the marker; principal scoping is internal to
 * the store key and is NOT part of the marker itself.
 */
function hashContent(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex").slice(0, 24);
}

/**
 * Store a block in the CCR store under the given principal.
 * Returns the 24-hex content hash (for embedding in the marker).
 */
export function storeBlock(text: string, principalId?: string): string {
  const hash = hashContent(text);
  const key = buildStoreKey(hash, principalId);
  if (!ccrStore.has(key)) {
    boundedSet(ccrStore, key, text);
  }
  return hash;
}

/**
 * Retrieve the verbatim block for a given hash and principal.
 * Returns null if not found or if the principal does not match the stored key.
 */
export function retrieveBlock(hash: string, principalId?: string): string | null {
  const key = buildStoreKey(hash, principalId);
  return ccrStore.get(key) ?? null;
}

/**
 * Record a retrieval event for a given (hash, principal) pair (feedback signal).
 */
export function recordRetrieval(hash: string, principalId?: string): void {
  const key = buildStoreKey(hash, principalId);
  boundedSet(retrievalCounts, key, (retrievalCounts.get(key) ?? 0) + 1);
}

/**
 * Returns true if the block has been retrieved often enough by this principal
 * that it should be excluded from compression in future requests.
 * Each principal's feedback is isolated from other principals.
 */
export function shouldSkipCompression(hash: string, principalId?: string): boolean {
  const key = buildStoreKey(hash, principalId);
  return (retrievalCounts.get(key) ?? 0) >= RETRIEVAL_THRESHOLD;
}

/**
 * H8 — retrieval-aware minimum block size (graduated feedback). A frequently-retrieved
 * `(principal, hash)` block is compressed progressively less: each prior retrieval (below the
 * threshold) raises the size bar linearly, and once the retrieval count reaches
 * `RETRIEVAL_THRESHOLD` the block is never compressed (`Infinity` — this subsumes the previous
 * binary `shouldSkipCompression` cliff). Pure function of the retrieval counter; `rampFactor <= 1`
 * disables the ramp so only the `>= threshold` cliff remains (byte-identical to the legacy path).
 */
export function effectiveMinChars(
  baseMinChars: number,
  hash: string,
  principalId: string | undefined,
  rampFactor: number
): number {
  const count = retrievalCounts.get(buildStoreKey(hash, principalId)) ?? 0;
  if (count >= RETRIEVAL_THRESHOLD) return Number.POSITIVE_INFINITY;
  if (count <= 0 || rampFactor <= 1) return baseMinChars;
  // Linear ramp: count=1 → base·rampFactor; count=2 → base·(1 + 2·(rampFactor−1)); …
  return Math.round(baseMinChars * (1 + (rampFactor - 1) * count));
}

/** Resolve the H8 ramp factor from the env (`COMPRESSION_CCR_RETRIEVAL_RAMP_FACTOR`), default 2. */
export function resolveRetrievalRampFactor(env: NodeJS.ProcessEnv = process.env): number {
  const raw = env.COMPRESSION_CCR_RETRIEVAL_RAMP_FACTOR;
  if (raw === undefined) return RETRIEVAL_RAMP_FACTOR_DEFAULT;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 1 ? n : RETRIEVAL_RAMP_FACTOR_DEFAULT;
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
 *
 * The `callerId` parameter must be the authenticated principal id derived from
 * the MCP `extra` context (see compressionTools.ts). Only the principal that
 * stored the block can retrieve it.
 *
 * Returns the verbatim block for the given hash, or an error object.
 */
export function handleCcrRetrieve(
  args: { hash: string } & CcrQuery,
  callerId?: string
): { content: string } | { error: string } {
  if (!args.hash || typeof args.hash !== "string") {
    return { error: "hash parameter is required and must be a string" };
  }

  const block = retrieveBlock(args.hash, callerId);
  if (block === null) {
    return {
      error: `CCR block not found for hash=${args.hash}. The block may have expired or the hash is invalid.`,
    };
  }

  recordRetrieval(args.hash, callerId);
  if (!args.mode || args.mode === "full") return { content: block };
  return queryBlock(block, args);
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
  minChars: number,
  principalId: string | undefined,
  rampFactor: number
): { text: string; replaced: boolean; hash: string | null } {
  // Base floor first (no hash cost for tiny blocks that could never compress anyway).
  if (text.length < minChars) {
    return { text, replaced: false, hash: null };
  }

  const hash = hashContent(text);

  // H8: retrieved blocks demand an ever-larger size before compressing; at/above the retrieval
  // threshold the effective minimum is Infinity, so the block is excluded (subsumes the former
  // binary shouldSkipCompression cliff).
  if (text.length < effectiveMinChars(minChars, hash, principalId, rampFactor)) {
    return { text, replaced: false, hash: null };
  }

  const marker = buildMarker(hash, text.length);

  // Only replace if it actually shrinks
  if (marker.length >= text.length) {
    return { text, replaced: false, hash: null };
  }

  storeBlock(text, principalId);
  return { text: marker, replaced: true, hash };
}

/**
 * Process all non-system messages: find large text blocks and replace with CCR markers.
 */
function processMessages(
  messages: MessageLike[],
  minChars: number,
  principalId: string | undefined,
  rampFactor: number
): { messages: MessageLike[]; replacedCount: number } {
  let replacedCount = 0;

  const result = messages.map((msg) => {
    if (msg.role === "system") return { ...msg };

    if (typeof msg.content === "string") {
      const { text, replaced } = maybeCcrReplace(msg.content, minChars, principalId, rampFactor);
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
        const { text, replaced } = maybeCcrReplace(
          part["text"] as string,
          minChars,
          principalId,
          rampFactor
        );
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
  {
    key: "retrievalRampFactor",
    type: "number",
    label: "Retrieval ramp factor (H8)",
    description:
      "How steeply frequently-retrieved blocks resist compression. Each prior retrieval raises " +
      "the effective minimum block size linearly; 1 disables the ramp (binary skip at the " +
      "threshold only).",
    defaultValue: RETRIEVAL_RAMP_FACTOR_DEFAULT,
    min: 1,
    max: 100,
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
  if (config["retrievalRampFactor"] !== undefined) {
    const v = config["retrievalRampFactor"];
    if (typeof v !== "number" || !Number.isFinite(v) || v < 1) {
      errors.push("retrievalRampFactor must be a number >= 1");
    }
  }
  return { valid: errors.length === 0, errors };
}

// ─── engine export ────────────────────────────────────────────────────────────

export const ccrEngine: CompressionEngine = {
  id: ENGINE_ID,
  name: "CCR (Content-Compression-Retrieve)",
  description:
    "Replaces large blocks of text with content-addressed retrieve markers " +
    "`[CCR retrieve hash=<24hex> chars=N]`. The original block is stored and " +
    "retrievable via the `omniroute_ccr_retrieve` MCP tool (H4). " +
    "Store is principal-scoped: only the storing principal can retrieve their blocks.",
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
      "Original retrievable via MCP tool (H4). Principal-scoped for tenant isolation.",
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

    // H8: retrieval-aware ramp factor — stepConfig wins, else env (default 2). 1 = binary cliff only.
    const rampFactor =
      typeof stepConfig["retrievalRampFactor"] === "number"
        ? (stepConfig["retrievalRampFactor"] as number)
        : resolveRetrievalRampFactor();

    const messages = body["messages"];
    if (!Array.isArray(messages) || messages.length === 0) {
      return { body, compressed: false, stats: null };
    }

    const start = performance.now();
    const { messages: newMessages, replacedCount } = processMessages(
      messages as MessageLike[],
      minChars,
      options?.principalId,
      rampFactor
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
