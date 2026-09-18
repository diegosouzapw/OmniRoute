import {
  placeSystemInstruction,
  SHARED_BOUNDARIES,
  shouldBypassCavemanOutputMode,
  systemFieldIncludesMarker,
} from "../outputMode.ts";
import { detectCompressionLanguage } from "../languageDetector.ts";
import { OUTPUT_STYLE_IDS, outputStyleMeta, type OutputStyle } from "./catalog.ts";

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

interface OutputStyleLanguageConfig {
  enabled?: boolean;
  autoDetect?: boolean;
  defaultLanguage?: string;
}

function lastUserText(body: ChatRequestBody): string {
  const messages = Array.isArray(body.messages) ? body.messages : [];
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    if (message?.role !== "user") continue;
    if (typeof message.content === "string" && message.content.trim()) return message.content;
    if (Array.isArray(message.content)) {
      const text = message.content
        .map((part) =>
          part && typeof part === "object" && typeof (part as { text?: unknown }).text === "string"
            ? (part as { text: string }).text
            : ""
        )
        .join(" ")
        .trim();
      if (text) return text;
    }
  }
  return "";
}

/**
 * Resolve which language the output-style instructions inject in.
 * Disabled → en. autoDetect → language of the latest user message (the input
 * engines already use the same detector); otherwise the configured default.
 */
export function resolveOutputStyleLanguage(
  languageConfig: OutputStyleLanguageConfig | undefined,
  body: ChatRequestBody
): string {
  if (languageConfig?.enabled !== true) return "en";
  if (languageConfig.autoDetect === true) {
    const text = lastUserText(body);
    if (text) return detectCompressionLanguage(text);
  }
  return languageConfig.defaultLanguage || "en";
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
function buildStyleInstructions(resolved: OutputStyleSelectionEntry[], language: string): string {
  const parts: string[] = [];
  for (const { id, level } of resolved) {
    const meta = outputStyleMeta(id);
    const localized = meta.i18n?.[language];
    const levels = localized ?? meta.levels;
    // Strip the per-style boundary so the combined boundary block is appended once below.
    parts.push(levels[level].replace(SHARED_BOUNDARIES, "").trim());
  }
  return parts.join("\n");
}

/**
 * Resolve the combined boundary block for a resolved selection, in catalog
 * order. SHARED_BOUNDARIES is always the base clause — every style keeps it —
 * and a style that declares `boundaries` contributes its own clause on top
 * (localized via `boundariesI18n` when available). The two ADD rather than
 * replace, so a code-shaping style never loses the shared guarantee (e.g.
 * "keep code blocks, file paths, commands, errors, URLs exact") while gaining
 * its carve-out. Pure / deterministic (D-A4: static per (selection, language)
 * so the injected prefix stays prompt-cache-stable).
 */
function buildStyleBoundaries(resolved: OutputStyleSelectionEntry[], language: string): string {
  const clauses: string[] = [SHARED_BOUNDARIES];
  for (const { id } of resolved) {
    const meta: OutputStyle = outputStyleMeta(id);
    const localized = meta.boundariesI18n?.[language];
    clauses.push(localized ?? meta.boundaries ?? SHARED_BOUNDARIES);
  }
  // Deduplicate repeated clauses (e.g. two styles sharing the same carve-out)
  // while preserving catalog order — keeps the injection minimal and stable.
  return [...new Set(clauses)].join("\n");
}

/**
 * Inject one or more output styles deterministically and front-loaded into the system prompt.
 * - Selection resolved in catalog order; unknown/locale-mismatched styles dropped.
 * - Boundary block appended once at the end: SHARED_BOUNDARIES plus the
 *   `boundaries` clause of every style that declares one (localized via
 *   `boundariesI18n`). Duplicates collapse; catalog order preserved.
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

  // Single space before the boundary block so a legacy single-style
  // (terse-prose) injection stays byte-identical to the old caveman output mode
  // (D-A5 back-compat): terse-prose declares no `boundaries`, so its block is
  // exactly SHARED_BOUNDARIES as before. A style that declares one gets the
  // shared clause AND its own, in catalog order.
  const combined = `${buildStyleInstructions(resolved, language)} ${buildStyleBoundaries(resolved, language)}`;
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
      return {
        body: { ...body, instructions: instruction },
        applied: true,
        appliedStyles: resolved,
      };
    }
    return { body, applied: false, skippedReason: "no_messages" };
  }

  // Idempotency before bypass so an already-injected marker (which contains
  // SHARED_BOUNDARIES keywords) cannot trigger a false-positive bypass.
  const alreadyApplied =
    systemFieldIncludesMarker(body.system, OUTPUT_STYLE_MARKER) ||
    messages.some(
      (message) =>
        message.role === "system" &&
        typeof message.content === "string" &&
        message.content.includes(OUTPUT_STYLE_MARKER)
    );
  if (alreadyApplied) return { body, applied: false, skippedReason: "already_applied" };

  // Content bypass (all-or-nothing for the turn): reuse the existing rules verbatim.
  const bypass = shouldBypassCavemanOutputMode(messages);
  if (bypass) return { body, applied: false, skippedReason: bypass };

  return {
    body: { ...body, ...placeSystemInstruction(messages, body.system, instruction) },
    applied: true,
    appliedStyles: resolved,
  };
}
