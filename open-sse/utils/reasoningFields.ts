import { stripInternalReasoningPlaceholder } from "./reasoningPlaceholder.ts";

type JsonRecord = Record<string, unknown>;

export function asReasoningRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function nonEmptyString(value: unknown): string {
  return typeof value === "string" && value.length > 0 ? value : "";
}

export function extractReasoningDetailsText(value: unknown): string {
  const record = asReasoningRecord(value);
  if (!Array.isArray(record.reasoning_details)) return "";
  return record.reasoning_details
    .map((detail) => {
      const item = asReasoningRecord(detail);
      return nonEmptyString(item.text) || nonEmptyString(item.content);
    })
    .join("");
}

/**
 * Consolidated reasoning field extraction - single pass returns all categories
 * to avoid 3-5 separate object traversals per chunk.
 */
export interface ReasoningFields {
  readable: string;
  unsupported: string;
  any: string;
  hasUnsupportedSignal: boolean;
  hasAnySignal: boolean;
}

export function extractReasoningFields(value: unknown): ReasoningFields {
  const record = asReasoningRecord(value);

  const readable = nonEmptyString(record.reasoning_content) || nonEmptyString(record.reasoning);
  const reasoningText = nonEmptyString(record.reasoning_text);
  const thinking = nonEmptyString(record.thinking);
  const thought = nonEmptyString(record.thought);
  const details = extractReasoningDetailsText(record);

  const unsupported = reasoningText || thinking || thought || details;
  const any = readable || unsupported;

  const hasUnsupportedSignal = !!(
    !readable &&
    (reasoningText ||
      thinking ||
      thought ||
      (Array.isArray(record.reasoning_details) && record.reasoning_details.length > 0))
  );
  const hasAnySignal = !!any;

  return { readable, unsupported, any, hasUnsupportedSignal, hasAnySignal };
}

/** Back-compat wrappers for existing callers - delegate to consolidated extractor. */
export function getReadableReasoningValue(value: unknown): string {
  return extractReasoningFields(value).readable;
}

export function getUnsupportedReasoningValue(value: unknown): string {
  return extractReasoningFields(value).unsupported;
}

export function getAnyReasoningValue(value: unknown): string {
  return extractReasoningFields(value).any;
}

export function hasUnsupportedReasoningSignal(value: unknown): boolean {
  return extractReasoningFields(value).hasUnsupportedSignal;
}

export function hasAnyReasoningSignal(value: unknown): boolean {
  return extractReasoningFields(value).hasAnySignal;
}

const STRIPPABLE_REASONING_FIELDS = [
  "reasoning_content",
  "reasoning",
  "reasoning_text",
  "thinking",
  "thought",
] as const;

/**
 * Strip the internal replay placeholder from a single string reasoning field,
 * deleting the field when nothing meaningful remains. Returns true only when a
 * present string field was fully stripped to empty (absent/non-string fields
 * return false so callers can distinguish "removed" from "never had text").
 */
function stripPlaceholderFromField(target: JsonRecord, field: string): boolean {
  const value = target[field];
  if (typeof value !== "string") return false;
  const stripped = stripInternalReasoningPlaceholder(value);
  if (stripped === "") {
    delete target[field];
    return true;
  }
  if (stripped !== value) target[field] = stripped;
  return false;
}

export function copyOpenAICompatibleReasoningFields(source: JsonRecord, target: JsonRecord) {
  if (source.reasoning_content !== undefined) target.reasoning_content = source.reasoning_content;
  if (source.reasoning !== undefined) target.reasoning = source.reasoning;
  if (source.reasoning_text !== undefined) target.reasoning_text = source.reasoning_text;
  if (source.thinking !== undefined) target.thinking = source.thinking;
  if (source.thought !== undefined) target.thought = source.thought;
  if (Array.isArray(source.reasoning_details)) target.reasoning_details = source.reasoning_details;
  if (!getReadableReasoningValue(target)) {
    const mirrored = getUnsupportedReasoningValue(source);
    if (mirrored) target.reasoning_content = mirrored;
  }
  // ponytail: the internal replay placeholder is request scaffolding, never
  // real reasoning — models echo it and it poisons client history + the cache
  // (#8081 echo). Strip it from anything we forward to the client, including
  // non-standard reasoning fields (reasoning_text / thinking / thought) and
  // reasoning_details items that non-OpenAI-compatible upstreams (e.g.
  // Venice) use (#9765 uncovered path).
  for (const field of STRIPPABLE_REASONING_FIELDS) {
    stripPlaceholderFromField(target, field);
  }
  if (Array.isArray(target.reasoning_details)) {
    const cleaned: unknown[] = [];
    for (const detail of target.reasoning_details) {
      const record = asReasoningRecord(detail);
      const next: JsonRecord = { ...record };
      // Track whether the item originally carried text/content at all so
      // non-text details (e.g. `reasoning.encrypted` carrying only `data`)
      // survive untouched.
      const hadText = typeof next.text === "string";
      const hadContent = typeof next.content === "string";
      stripPlaceholderFromField(next, "text");
      stripPlaceholderFromField(next, "content");
      const textGone = next.text === undefined;
      const contentGone = next.content === undefined;
      if ((hadText || hadContent) && textGone && contentGone) continue;
      cleaned.push(next);
    }
    if (cleaned.length === 0) delete target.reasoning_details;
    else target.reasoning_details = cleaned;
  }
}
