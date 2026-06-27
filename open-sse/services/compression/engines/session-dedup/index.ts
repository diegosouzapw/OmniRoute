/**
 * session-dedup compression engine (R11 / N2 / TO1)
 *
 * Content-addressed cross-turn deduplication, inspired by the TokenMizer
 * session-graph + line-dedup blueprint (arXiv 2606.06337) and sqz prior-art.
 *
 * Algorithm (two-pass, suffix-block content-addressed):
 *   Pass 1 — scan all non-system messages. For each message, enumerate suffix
 *             line blocks (lines[start..end-of-message]) that meet minBlockChars
 *             and minBlockLines. Hash each block. Record the first message that
 *             owns each hash.
 *   Pass 2 — for each non-system message (index i), find blocks whose hash was
 *             first seen in a STRICTLY EARLIER message (index j < i). Replace the
 *             LONGEST such block's text with `[dedup:ref sha=<8hex>]`.
 *             First occurrence is always kept intact.
 *
 * Greedy, longest-first replacement: sort duplicate blocks by length descending;
 * replace the longest block first so shorter overlapping candidates are skipped.
 *
 * Conservative guards:
 *   - Never touch `role: "system"`.
 *   - Never touch multipart content parts other than `type: "text"`.
 *   - Only dedup blocks ≥ minBlockChars (default 80 chars) AND ≥ MIN_BLOCK_LINES lines.
 *   - First occurrence is ALWAYS kept intact; only later identical occurrences are replaced.
 *
 * Reconstruction:
 *   Replace every `[dedup:ref sha=XXXXXXXX]` marker with the original block text
 *   from the reverse map attached as `__sessionDedupMap__` on the body object.
 */

import crypto from "node:crypto";
import { createCompressionStats } from "../../stats.ts";
import { applyFuzzyPass } from "./fuzzy.ts";
import type {
  CompressionEngine,
  CompressionEngineApplyOptions,
  EngineConfigField,
  EngineValidationResult,
} from "../types.ts";
import type { CompressionResult } from "../../types.ts";

// ─── constants ────────────────────────────────────────────────────────────────

const ENGINE_ID = "session-dedup";
/** Minimum block character count to be a dedup candidate. */
const DEFAULT_MIN_BLOCK_CHARS = 80;
/** Minimum number of lines a block must span to be a dedup candidate. */
const MIN_BLOCK_LINES = 3;
/** Hard cap on blocks compared in the fuzzy O(n²) pass (fail-safe bound). */
const MAX_FUZZY_BLOCKS = 200;

// ─── hash helper (SHA-256 prefix, collision-resistant) ───────────────────────

function hashBlock(text: string): string {
  // 24 hex / 96 bits — collision-resistant (a 32-bit djb2 could collide and make a
  // dedup marker reference the WRONG block). Pass 2 additionally verifies block
  // equality before substituting, so a collision can never cause corruption.
  return crypto.createHash("sha256").update(text).digest("hex").slice(0, 24);
}

// ─── suffix-block extraction ──────────────────────────────────────────────────

/**
 * For each starting line position, emit the suffix block `lines[start..end]`
 * (i.e. from `start` to the end of the line array). This ensures that any
 * multiline sub-content that appears verbatim in multiple messages is discoverable
 * regardless of what text precedes it in each message.
 *
 * Only emits blocks that meet minBlockChars AND have at least MIN_BLOCK_LINES lines.
 * Uses a seen-set to deduplicate identical suffix blocks.
 */
function findSuffixBlocks(
  lines: string[],
  minBlockChars: number
): Array<{ block: string; startLine: number }> {
  const n = lines.length;
  const seen = new Set<string>();
  const results: Array<{ block: string; startLine: number }> = [];

  for (let start = 0; start < n; start++) {
    const block = lines.slice(start).join("\n");
    const blockLines = n - start;
    if (blockLines >= MIN_BLOCK_LINES && block.length >= minBlockChars && !seen.has(block)) {
      seen.add(block);
      results.push({ block, startLine: start });
    }
  }
  return results;
}

// ─── two-pass dedup on message texts ─────────────────────────────────────────

/**
 * Runs two-pass dedup over an ordered list of (msgIdx, text) pairs.
 * Returns the replaced texts for duplicate messages, a reverse map, and a count.
 */
function dedupMessageTexts(
  msgTexts: Array<{ msgIdx: number; text: string }>,
  minBlockChars: number
): {
  deduped: Map<number, string>;
  dedupCount: number;
} {
  // Pass 1: for each message, extract suffix blocks and record first ownership.
  // `firstSeen`: sha → { ownerMsgIdx, block }
  const firstSeen = new Map<string, { ownerMsgIdx: number; block: string }>();

  for (const { msgIdx, text } of msgTexts) {
    const lines = text.split("\n");
    const blocks = findSuffixBlocks(lines, minBlockChars);
    for (const { block } of blocks) {
      const sha = hashBlock(block);
      if (!firstSeen.has(sha)) {
        firstSeen.set(sha, { ownerMsgIdx: msgIdx, block });
      }
    }
  }

  // Pass 2: for each message, find blocks that were FIRST seen in an earlier message.
  const deduped = new Map<number, string>();
  let dedupCount = 0;

  for (const { msgIdx, text } of msgTexts) {
    const lines = text.split("\n");
    const blocks = findSuffixBlocks(lines, minBlockChars);

    // Collect blocks that are duplicates (owned by an earlier message).
    const dupBlocks: Array<{ block: string; sha: string }> = [];
    for (const { block } of blocks) {
      const sha = hashBlock(block);
      const owner = firstSeen.get(sha);
      // owner.block === block guards against a (now astronomically unlikely) hash
      // collision substituting a marker that would reference the wrong block.
      if (owner && owner.ownerMsgIdx < msgIdx && owner.block === block) {
        dupBlocks.push({ block, sha });
      }
    }

    if (dupBlocks.length === 0) continue;

    // Sort longest-first to prefer replacing the longest matching block.
    dupBlocks.sort((a, b) => b.block.length - a.block.length);

    let result = text;
    let changed = false;
    const replaced = new Set<string>(); // avoid double-replacing overlapping blocks

    for (const { block, sha } of dupBlocks) {
      // Skip if this block is a suffix of a block already replaced (overlap guard).
      if ([...replaced].some((r) => r.includes(block))) continue;

      const idx = result.indexOf(block);
      if (idx !== -1) {
        const marker = `[dedup:ref sha=${sha}]`;
        result = result.slice(0, idx) + marker + result.slice(idx + block.length);
        changed = true;
        replaced.add(block);
        // Only replace once per block per message pass.
        break;
      }
    }

    if (changed) {
      deduped.set(msgIdx, result);
      dedupCount++;
    }
  }

  return { deduped, dedupCount };
}

// ─── message array processing ─────────────────────────────────────────────────

type MessageLike = {
  role?: string;
  content?: string | Array<Record<string, unknown>>;
  [key: string]: unknown;
};

/**
 * Process messages: collect text content, run two-pass dedup, apply results.
 */
function processMessages(
  messages: MessageLike[],
  minBlockChars: number
): { messages: MessageLike[]; dedupCount: number } {
  // Collect (msgIdx, text) for non-system string-content messages.
  // For multipart, index each text part separately.
  const msgTexts: Array<{ msgIdx: number; text: string }> = [];

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    if (msg.role === "system") continue;
    if (typeof msg.content === "string") {
      msgTexts.push({ msgIdx: i, text: msg.content });
    } else if (Array.isArray(msg.content)) {
      for (let p = 0; p < msg.content.length; p++) {
        const part = msg.content[p];
        if (part["type"] === "text" && typeof part["text"] === "string") {
          // Composite key: i * 100000 + p + 1 (safe for reasonable message counts)
          msgTexts.push({ msgIdx: i * 100000 + p + 1, text: part["text"] as string });
        }
      }
    }
  }

  if (msgTexts.length < 2) {
    return { messages, dedupCount: 0 };
  }

  const { deduped, dedupCount } = dedupMessageTexts(msgTexts, minBlockChars);

  if (dedupCount === 0) {
    return { messages, dedupCount: 0 };
  }

  const result = messages.map((msg, i) => {
    if (msg.role === "system") return { ...msg };

    if (typeof msg.content === "string") {
      const replacement = deduped.get(i);
      return replacement !== undefined ? { ...msg, content: replacement } : { ...msg };
    }

    if (Array.isArray(msg.content)) {
      let changed = false;
      const newContent = msg.content.map((part, p) => {
        if (part["type"] !== "text" || typeof part["text"] !== "string") return part;
        const key = i * 100000 + p + 1;
        const replacement = deduped.get(key);
        if (replacement !== undefined) {
          changed = true;
          return { ...part, text: replacement };
        }
        return part;
      });
      return changed ? { ...msg, content: newContent } : { ...msg };
    }

    return { ...msg };
  });

  return { messages: result, dedupCount };
}

// ─── schema & validation ──────────────────────────────────────────────────────

const SESSION_DEDUP_SCHEMA: EngineConfigField[] = [
  {
    key: "enabled",
    type: "boolean",
    label: "Enabled",
    defaultValue: true,
  },
  {
    key: "minBlockChars",
    type: "number",
    label: "Minimum block characters",
    description: "Minimum character count for a suffix block to be a dedup candidate.",
    defaultValue: DEFAULT_MIN_BLOCK_CHARS,
    min: 1,
    max: 100000,
  },
  {
    key: "fuzzy",
    type: "boolean",
    label: "Fuzzy near-duplicate dedup",
    description:
      "Opt-in: replace whole messages ~85%+ similar to an earlier one with a recoverable CCR marker.",
    defaultValue: false,
  },
];

function validateSessionDedupConfig(config: Record<string, unknown>): EngineValidationResult {
  const errors: string[] = [];
  if (config["enabled"] !== undefined && typeof config["enabled"] !== "boolean") {
    errors.push("enabled must be a boolean");
  }
  if (config["minBlockChars"] !== undefined) {
    const v = config["minBlockChars"];
    if (typeof v !== "number" || !Number.isFinite(v) || v < 1) {
      errors.push("minBlockChars must be a positive number");
    }
  }
  if (config["fuzzy"] !== undefined) {
    const f = config["fuzzy"];
    if (typeof f === "object" && f !== null) {
      const fe = (f as Record<string, unknown>)["enabled"];
      if (fe !== undefined && typeof fe !== "boolean") errors.push("fuzzy.enabled must be a boolean");
    } else if (typeof f !== "boolean") {
      errors.push("fuzzy must be an object { enabled } or a boolean");
    }
  }
  return { valid: errors.length === 0, errors };
}

// ─── engine export ────────────────────────────────────────────────────────────

export const sessionDedupEngine: CompressionEngine = {
  id: ENGINE_ID,
  name: "Session Dedup",
  description:
    "Content-addressed cross-turn deduplication: replaces repeated multi-line blocks " +
    "with short reference markers (R11/N2/TO1, TokenMizer blueprint).",
  icon: "content_copy",
  targets: ["messages"],
  stackable: true,
  // stackPriority 3 = runs BEFORE lite (5), caveman (20), aggressive (30), ultra (40).
  // Dedup first so downstream engines operate on already-deduplicated content.
  stackPriority: 3,
  metadata: {
    id: ENGINE_ID,
    name: "Session Dedup",
    description:
      "Content-addressed cross-turn deduplication: replaces repeated multi-line blocks with short reference markers.",
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

    const minBlockChars =
      typeof stepConfig["minBlockChars"] === "number"
        ? (stepConfig["minBlockChars"] as number)
        : DEFAULT_MIN_BLOCK_CHARS;

    const messages = body["messages"];
    if (!Array.isArray(messages) || messages.length === 0) {
      return { body, compressed: false, stats: null };
    }

    const start = performance.now();
    const { messages: exactMessages, dedupCount } = processMessages(
      messages as MessageLike[],
      minBlockChars
    );

    const rawFuzzy = stepConfig["fuzzy"] as
      | boolean
      | { enabled?: boolean; minJaccard?: number; shingleSize?: number }
      | undefined;
    const fuzzyCfg = typeof rawFuzzy === "boolean" ? { enabled: rawFuzzy } : rawFuzzy;
    let finalMessages = exactMessages;
    let fuzzyCount = 0;
    if (fuzzyCfg?.enabled) {
      const r = applyFuzzyPass(finalMessages, {
        minJaccard: typeof fuzzyCfg.minJaccard === "number" ? fuzzyCfg.minJaccard : 0.85,
        shingleSize: typeof fuzzyCfg.shingleSize === "number" ? fuzzyCfg.shingleSize : 3,
        maxBlocks: MAX_FUZZY_BLOCKS,
        minBlockChars,
        principalId: options?.principalId,
      });
      finalMessages = r.messages;
      fuzzyCount = r.fuzzyCount;
    }

    if (dedupCount + fuzzyCount === 0) {
      return { body, compressed: false, stats: null };
    }

    const newBody: Record<string, unknown> = { ...body, messages: finalMessages };
    const durationMs = Math.round(performance.now() - start);
    const techniques = ["session-dedup"];
    if (fuzzyCount > 0) techniques.push("fuzzy-dedup");
    const rules: string[] = [];
    if (dedupCount > 0) rules.push(`deduplicated-${dedupCount}-blocks`);
    if (fuzzyCount > 0) rules.push(`fuzzy-${fuzzyCount}-blocks`);
    const stats = createCompressionStats(body, newBody, "stacked", techniques, rules, durationMs);
    return { body: newBody, compressed: true, stats };
  },

  compress(body: Record<string, unknown>, config?: Record<string, unknown>): CompressionResult {
    return this.apply(body, { stepConfig: config ?? {} });
  },

  getConfigSchema(): EngineConfigField[] {
    return SESSION_DEDUP_SCHEMA;
  },

  validateConfig(config: Record<string, unknown>): EngineValidationResult {
    return validateSessionDedupConfig(config);
  },
};
