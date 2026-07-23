/**
 * headroom compression engine — SmartCrusher: tabular compaction of homogeneous JSON arrays.
 *
 * Implements item H3 (SmartCrusher lossless compaction) + N5 (explicit [N rows] count marker)
 * + GP5' (columnar/tabular encoder, dependency-free) from the compression research plan:
 *   _tasks/research/compression/headroom-plano-implementacao.md
 *   _tasks/research/compression/rodada4-internet-e-coerencia.md
 *   _tasks/research/compression/gcf-proxy-relatorio-plano.md
 *
 * Algorithm:
 *   - Scans non-system message contents (string contents and ```json fenced blocks).
 *   - When content parses as a homogeneous array of objects (≥ minRows, default 8),
 *     replaces it with a compact columnar block (```omni-tabular ...```).
 *   - The columnar block carries: [N rows] count marker, type hints, a header row,
 *     and value-only data rows.
 *   - LOSSLESS: decode(encode(arr)) deep-equals the original (proven by round-trip tests).
 *   - Conservative: only replaces when the compact form is strictly smaller.
 *   - Never touches system messages.
 *
 * Encoder format: see tabular.ts (CSV-style with RFC 4180 quoting for special chars,
 * JSON-stringified nested values quoted as string cells, type-hint metadata row).
 *
 * Note: TOON (@toon-format/toon, ~24.6k★) could be a future drop-in encoder here for
 * improved compression on complex shapes. Plain columnar is used now (dep-free, zero
 * supply-chain risk, ≥30% savings on typical homogeneous arrays already met).
 */

import { createCompressionStats } from "../../stats.ts";
import type {
  CompressionEngine,
  CompressionEngineApplyOptions,
  EngineConfigField,
  EngineValidationResult,
} from "../types.ts";
import type { CompressionResult } from "../../types.ts";
import { crushMessages, DEFAULT_MIN_ROWS } from "./smartcrusher.ts";
import {
  TABULAR_FENCE_OPEN,
  TABULAR_FENCE_CLOSE,
  GCF_FENCE_OPEN,
  GCF_FENCE_CLOSE,
  decodeTabular,
} from "./tabular.ts";
import { TOON_FENCE_OPEN, TOON_FENCE_CLOSE } from "./toon.ts";

export { encodeTabular, decodeTabular } from "./tabular.ts";

// ─── constants ────────────────────────────────────────────────────────────────

const ENGINE_ID = "headroom";

// ─── schema & validation ──────────────────────────────────────────────────────

const HEADROOM_SCHEMA: EngineConfigField[] = [
  {
    key: "enabled",
    type: "boolean",
    label: "Enabled",
    defaultValue: true,
  },
  {
    key: "minRows",
    type: "number",
    label: "Minimum rows to compact",
    description:
      "Minimum number of rows in a homogeneous JSON array to trigger tabular compaction. Default: 8.",
    defaultValue: DEFAULT_MIN_ROWS,
    min: 2,
    max: 10000,
  },
];

function validateHeadroomConfig(config: Record<string, unknown>): EngineValidationResult {
  const errors: string[] = [];
  if (config["enabled"] !== undefined && typeof config["enabled"] !== "boolean") {
    errors.push("enabled must be a boolean");
  }
  if (config["minRows"] !== undefined) {
    const v = config["minRows"];
    if (typeof v !== "number" || !Number.isFinite(v) || v < 2) {
      errors.push("minRows must be a number ≥ 2");
    }
  }
  return { valid: errors.length === 0, errors };
}

// ─── engine export ────────────────────────────────────────────────────────────

export const headroomEngine: CompressionEngine = {
  id: ENGINE_ID,
  name: "Headroom SmartCrusher",
  description:
    "Lossless tabular compaction of homogeneous JSON arrays (H3 + N5 + GP5'). " +
    "Replaces repetitive JSON arrays with compact columnar blocks, " +
    "including explicit [N rows] count markers for auditability.",
  icon: "compress",
  targets: ["messages", "tool_results"],
  stackable: true,
  // stackPriority 15 = between rtk (10) and caveman (20), as specified in headroom-plano.
  stackPriority: 15,
  metadata: {
    id: ENGINE_ID,
    name: "Headroom SmartCrusher",
    description:
      "Lossless tabular compaction of homogeneous JSON arrays with [N rows] count markers.",
    inputScope: "messages",
    targetLatencyMs: 5,
    supportsPreview: true,
    stable: true,
  },

  apply(body: Record<string, unknown>, options?: CompressionEngineApplyOptions): CompressionResult {
    const stepConfig = options?.stepConfig ?? {};

    if (stepConfig["enabled"] === false) {
      return { body, compressed: false, stats: null };
    }

    const minRows =
      typeof stepConfig["minRows"] === "number"
        ? (stepConfig["minRows"] as number)
        : DEFAULT_MIN_ROWS;

    const messages = body["messages"];
    if (!Array.isArray(messages) || messages.length === 0) {
      return { body, compressed: false, stats: null };
    }

    const start = performance.now();
    const { messages: crushedMessages, changed } = crushMessages(
      messages as Array<{
        role?: string;
        content?: string | Array<Record<string, unknown>>;
        [key: string]: unknown;
      }>,
      minRows
    );

    if (!changed) {
      return { body, compressed: false, stats: null };
    }

    const newBody: Record<string, unknown> = {
      ...body,
      messages: crushedMessages,
    };

    const durationMs = Math.round(performance.now() - start);
    const stats = createCompressionStats(
      body,
      newBody,
      "stacked",
      ["headroom-smartcrusher"],
      ["tabular-compaction"],
      durationMs
    );

    return { body: newBody, compressed: true, stats };
  },

  compress(body: Record<string, unknown>, config?: Record<string, unknown>): CompressionResult {
    return this.apply(body, { stepConfig: config ?? {} });
  },

  getConfigSchema(): EngineConfigField[] {
    return HEADROOM_SCHEMA;
  },

  validateConfig(config: Record<string, unknown>): EngineValidationResult {
    return validateHeadroomConfig(config);
  },
};

// ─── reconstruction helper ────────────────────────────────────────────────────

type MessageLike = {
  role?: string;
  content?: string | Array<Record<string, unknown>>;
  [key: string]: unknown;
};

/**
 * Reverse the headroom compaction: find every ```gcf-generic or ```omni-tabular
 * block in message contents and decode it back to the original JSON string.
 *
 * No production caller by design — the compact form is sent to the provider as-is. This is
 * exported as the round-trip ORACLE that proves the GCF/tabular encoder is lossless: the
 * losslessness regression tests encode via apply() then decode here and assert deep-equal.
 *
 * Returns a new body with all compacted blocks expanded.
 */
export function reconstructHeadroom(body: Record<string, unknown>): Record<string, unknown> {
  const messages = body["messages"];
  if (!Array.isArray(messages)) return body;

  let changed = false;
  const restored = (messages as MessageLike[]).map((msg): MessageLike => {
    if (typeof msg.content === "string") {
      const reconstructed = restoreText(msg.content);
      if (reconstructed !== msg.content) {
        changed = true;
        return { ...msg, content: reconstructed };
      }
      return { ...msg };
    }

    if (Array.isArray(msg.content)) {
      let contentChanged = false;
      const newContent = msg.content.map((part: Record<string, unknown>) => {
        if (part["type"] !== "text" || typeof part["text"] !== "string") return part;
        const reconstructed = restoreText(part["text"] as string);
        if (reconstructed !== part["text"]) {
          contentChanged = true;
          return { ...part, text: reconstructed };
        }
        return part;
      });
      if (contentChanged) {
        changed = true;
        return { ...msg, content: newContent };
      }
      return { ...msg };
    }

    return { ...msg };
  });

  if (!changed) return body;
  return { ...body, messages: restored };
}

/**
 * Restore all GCF (```gcf-generic) and legacy (```omni-tabular) blocks
 * in a text string back to their original JSON.
 */
/** Map a fence-open marker to its matching close tag. */
function closeTagFor(fence: string): string {
  if (fence === GCF_FENCE_OPEN) return GCF_FENCE_CLOSE;
  if (fence === TOON_FENCE_OPEN) return TOON_FENCE_CLOSE;
  return TABULAR_FENCE_CLOSE;
}

/**
 * Decode every occurrence of one fence type in `text`, replacing each block
 * with its original JSON. Extracted from restoreText to keep that function
 * below the cognitive-complexity gate.
 */
function decodeFenceOccurrences(text: string, fence: string, closeTag: string): string {
  let result = text;
  let searchFrom = 0;
  while (true) {
    const fenceStart = result.indexOf(fence, searchFrom);
    if (fenceStart === -1) break;

    const contentStart = fenceStart + fence.length + 1; // skip "\n" after fence open
    const fenceEnd = result.indexOf("\n" + closeTag, contentStart);
    if (fenceEnd === -1) break;

    const blockContent = result.slice(contentStart, fenceEnd);
    const decoded = decodeTabular(fence + "\n" + blockContent + "\n" + closeTag);
    const jsonStr = JSON.stringify(decoded);

    const fullFence = result.slice(fenceStart, fenceEnd + closeTag.length + 1); // +1 for the "\n"
    result = result.slice(0, fenceStart) + jsonStr + result.slice(fenceStart + fullFence.length);

    searchFrom = fenceStart + jsonStr.length;
  }
  return result;
}

function restoreText(text: string): string {
  // Fast path: no fence marker present
  if (
    !text.includes(TABULAR_FENCE_OPEN) &&
    !text.includes(GCF_FENCE_OPEN) &&
    !text.includes(TOON_FENCE_OPEN)
  )
    return text;

  let result = text;
  // Process all fence types: GCF first (new format), then legacy omni-tabular, then TOON
  for (const fence of [GCF_FENCE_OPEN, TABULAR_FENCE_OPEN, TOON_FENCE_OPEN]) {
    result = decodeFenceOccurrences(result, fence, closeTagFor(fence));
  }
  return result;
}
