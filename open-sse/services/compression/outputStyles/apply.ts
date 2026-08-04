import { SHARED_BOUNDARIES, shouldBypassCavemanOutputMode } from "../outputMode.ts";
import { OUTPUT_STYLE_IDS, outputStyleMeta } from "./catalog.ts";

export type OutputStyleLevel = "lite" | "full" | "ultra";

export interface OutputStyleSelectionEntry {
  id: string;
  level: OutputStyleLevel;
}

interface ChatMessage {
  role: string;
  content?: string | unknown[];
  [key: string]: unknown;
}

interface ChatRequestBody {
  messages?: ChatMessage[];
  instructions?: string;
  input?: unknown;
  [key: string]: unknown;
}

export interface OutputStylesResult {
  body: ChatRequestBody;
  applied: boolean;
  skippedReason?: string;
  /** The styles actually injected (after unknown/locale filtering), in catalog order. */
  appliedStyles?: OutputStyleSelectionEntry[];
}

/** Single idempotency marker guarding the unified injection (D-A: one marker for all styles). */
export const OUTPUT_STYLE_MARKER = "[OmniRoute Output Styles]";

/**
 * Resolve the selection into the ordered, locale-gated, known styles in catalog order.
 * Pure: drops unknown ids and locale-mismatched styles; never throws (D-A6 forward-compat).
 */
function resolveStyles(
  selection: OutputStyleSelectionEntry[],
  language: string
): OutputStyleSelectionEntry[] {
  const byId = new Map(selection.map((entry) => [entry.id, entry]));
  const resolved: OutputStyleSelectionEntry[] = [];
  for (const id of OUTPUT_STYLE_IDS) {
    const entry = byId.get(id);
    if (!entry) continue;
    const meta = outputStyleMeta(id);
    if (!meta) continue;
    if (meta.locale && meta.locale !== language) continue;
    resolved.push({ id, level: entry.level });
  }
  return resolved;
}

/** Build the combined instruction body (no marker, no trailing boundary). Pure / deterministic. */
function buildStyleInstructions(
  resolved: OutputStyleSelectionEntry[],
  language: string
): string {
  const parts: string[] = [];
  for (const { id, level } of resolved) {
    const meta = outputStyleMeta(id);
    const localized = meta.i18n?.[language];
    const levels = localized ?? meta.levels;
    // Strip the per-style boundary so SHARED_BOUNDARIES is appended exactly once below.
    parts.push(levels[level].replace(SHARED_BOUNDARIES, "").trim());
  }
  return parts.join("\n");
}

/**
 * Inject one or more output styles deterministically and front-loaded into the system prompt.
 * - Selection resolved in catalog order; unknown/locale-mismatched styles dropped.
 * - SHARED_BOUNDARIES applied once at the end (not per style).
 * - Single idempotency marker; re-applying is a no-op.
 * - Content bypass runs once across the whole turn (all-or-nothing); reason recorded.
 */
export function applyOutputStyles(
  body: ChatRequestBody,
  selection: OutputStyleSelectionEntry[],
  language = "en"
): OutputStylesResult {
  const resolved = resolveStyles(selection ?? [], language);
  if (resolved.length === 0) {
    return { body, applied: false, skippedReason: "no_styles" };
  }

  // Single space before the shared boundary so a legacy single-style (terse-prose)
  // injection stays byte-identical to the old caveman output mode (D-A5 back-compat).
  const combined = `${buildStyleInstructions(resolved, language)} ${SHARED_BOUNDARIES}`;
  const instruction = `${OUTPUT_STYLE_MARKER}\n${combined}`;

  const messages = Array.isArray(body.messages) ? body.messages : null;
  if (!messages || messages.length === 0) {
    if (typeof body.instructions === "string") {
      if (body.instructions.includes(OUTPUT_STYLE_MARKER)) {
        return { body, applied: false, skippedReason: "already_applied" };
      }
      return {
        body: { ...body, instructions: `${body.instructions.trim()}\n\n${instruction}` },
        applied: true,
        appliedStyles: resolved,
      };
    }
    if (typeof body.input === "string" || Array.isArray(body.input)) {
      return { body: { ...body, instructions: instruction }, applied: true, appliedStyles: resolved };
    }
    return { body, applied: false, skippedReason: "no_messages" };
  }

  // Idempotency before bypass so an already-injected marker (which contains
  // SHARED_BOUNDARIES keywords) cannot trigger a false-positive bypass.
  const alreadyApplied = messages.some(
    (message) =>
      message.role === "system" &&
      typeof message.content === "string" &&
      message.content.includes(OUTPUT_STYLE_MARKER)
  );
  if (alreadyApplied) return { body, applied: false, skippedReason: "already_applied" };

  // Content bypass (all-or-nothing for the turn): reuse the existing rules verbatim.
  const bypass = shouldBypassCavemanOutputMode(messages);
  if (bypass) return { body, applied: false, skippedReason: bypass };

  const nextMessages = [...messages];
  const first = nextMessages[0];
  if (first?.role === "system" && typeof first.content === "string") {
    nextMessages[0] = { ...first, content: `${first.content.trim()}\n\n${instruction}` };
  } else {
    nextMessages.unshift({ role: "system", content: instruction });
  }

  return { body: { ...body, messages: nextMessages }, applied: true, appliedStyles: resolved };
}
