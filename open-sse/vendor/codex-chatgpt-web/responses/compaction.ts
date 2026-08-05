/* Adapted from miuuyy/codex-chatgpt-web commit 55592fca0ba19a27f1b769cec8fff61ff340a785 (MIT). */
/**
 * Remote compaction v2 support for ROUTED providers.
 *
 * Codex decides "this provider supports remote compaction" by provider name (built-in `OpenAI`),
 * and Design B points that provider at this proxy — so Codex sends remote compaction v2 requests
 * for EVERY routed model. The request is a normal /responses call whose input ends with
 * `{"type":"compaction_trigger"}`; codex-rs `collect_compaction_output` then requires the stream
 * to carry EXACTLY ONE `{"type":"compaction","encrypted_content":...}` output item
 * (compact_remote_v2.rs) or it fatals with "expected exactly one compaction output item".
 *
 * Routed models cannot produce OpenAI's encrypted blob, so the proxy runs the model as a plain
 * summarizer and wraps the summary text in a transparent envelope: `ocx1:` + base64(utf8 summary).
 * Codex stores the item and replays it in later input; the parser decodes our envelope back into
 * plain text for routed models. Real OpenAI-encrypted blobs (no `ocx1:` prefix) are opaque —
 * routed models get a short "history was compacted" note instead.
 */

export const BRIDGE_COMPACTION_PREFIX = "ocx1:";

/** Mirrors codex-rs core/templates/compact/prompt.md (the local-compaction instruction). */
export const COMPACT_PROMPT = `You are performing a CONTEXT CHECKPOINT COMPACTION. Create a handoff summary for another LLM that will resume the task.

Include:
- Current progress and key decisions made
- Important context, constraints, or user preferences
- What remains to be done (clear next steps)
- Any critical data, examples, or references needed to continue

Be concise, structured, and focused on helping the next LLM seamlessly continue the work.`;

/** Mirrors codex-rs core/templates/compact/summary_prefix.md (framing for a replayed summary). */
export const SUMMARY_PREFIX =
  "Another language model started to solve this problem and produced a summary of its thinking process. You also have access to the state of the tools that were used by that language model. Use this to build on the work that has already been done and avoid duplicating work. Here is the summary produced by the other language model, use the information in this summary to assist with your own analysis:";

export const OPAQUE_COMPACTION_NOTE =
  "[earlier conversation was compacted; the summary is stored in a format this model cannot read]";

/** Exact framing emitted by this proxy for a readable replayed Codex compaction summary. */
export function isReadableCompactionSummaryText(value: unknown): value is string {
  return typeof value === "string" && value.startsWith(`${SUMMARY_PREFIX}\n\n`);
}

export function encodeCompactionSummary(summary: string): string {
  return BRIDGE_COMPACTION_PREFIX + Buffer.from(summary, "utf-8").toString("base64");
}

/** Decode an `ocx1:` envelope; returns null for real (OpenAI-encrypted) blobs or garbage. */
export function decodeCompactionSummary(encryptedContent: string): string | null {
  if (!encryptedContent.startsWith(BRIDGE_COMPACTION_PREFIX)) return null;
  try {
    return Buffer.from(encryptedContent.slice(BRIDGE_COMPACTION_PREFIX.length), "base64").toString(
      "utf-8"
    );
  } catch {
    return null;
  }
}

/** Render a replayed compaction item as plain user-visible text for a routed model. */
export function compactionItemToText(encryptedContent: string | undefined): string {
  const decoded =
    typeof encryptedContent === "string" ? decodeCompactionSummary(encryptedContent) : null;
  return decoded ? `${SUMMARY_PREFIX}\n\n${decoded}` : OPAQUE_COMPACTION_NOTE;
}

/**
 * Remote compaction v1 (`POST /responses/compact`, unary) — codex-rs installs the returned
 * `{"output":[ResponseItem...]}` as the REPLACEMENT history (compact_remote.rs
 * process_compacted_history). Mirror codex-rs local `build_compacted_history`: recent real user
 * messages within a token budget, then one user message `SUMMARY_PREFIX\n<summary>`. Plain user
 * message items parse as real user messages on the codex side (event_mapping parse_user_message);
 * contextual wrappers are filtered there, and v2-style `compaction` items are NOT expected here.
 */

/** codex-rs compact.rs COMPACT_USER_MESSAGE_MAX_TOKENS = 20k tokens (~4 chars/token). */
const COMPACT_V1_RETAINED_CHAR_BUDGET = 20_000 * 4;

/** Extract plain-text user messages from a Responses `input` array (for v1 compact retention). */
export function extractCompactUserMessages(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  const out: string[] = [];
  for (const item of input) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const rec = item as { type?: string; role?: string; content?: unknown };
    if (rec.type !== undefined && rec.type !== "message") continue;
    if (rec.role !== "user") continue;
    let text = "";
    if (typeof rec.content === "string") text = rec.content;
    else if (Array.isArray(rec.content)) {
      text = rec.content
        .map((b) => {
          if (!b || typeof b !== "object") return "";
          const block = b as { type?: string; text?: string };
          return (block.type === "input_text" || block.type === "text") &&
            typeof block.text === "string"
            ? block.text
            : "";
        })
        .join("");
    }
    if (text.trim().length > 0) out.push(text);
  }
  return out;
}

function compactUserMessageItem(text: string): Record<string, unknown> {
  return { type: "message", role: "user", content: [{ type: "input_text", text }] };
}

/** Build the v1 compact `output` array: retained recent user messages + the summary message. */
export function buildCompactV1Output(
  userMessages: string[],
  summary: string
): Record<string, unknown>[] {
  const selected: string[] = [];
  let remaining = COMPACT_V1_RETAINED_CHAR_BUDGET;
  for (let i = userMessages.length - 1; i >= 0 && remaining > 0; i--) {
    const msg = userMessages[i];
    if (msg.length <= remaining) {
      selected.push(msg);
      remaining -= msg.length;
    } else {
      // Budget partially covers this older message: keep its tail (most recent context) and stop.
      selected.push(msg.slice(msg.length - remaining));
      break;
    }
  }
  selected.reverse();
  // codex-rs compact.rs uses "{SUMMARY_PREFIX}\n{summary}" (single newline) and detects stored
  // summaries by that exact prefix — keep the same shape.
  const summaryText =
    summary.trim().length > 0 ? `${SUMMARY_PREFIX}\n${summary}` : "(no summary available)";
  return [...selected.map(compactUserMessageItem), compactUserMessageItem(summaryText)];
}
