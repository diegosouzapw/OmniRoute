export const REASONING_EFFORT_OVERRIDE_VALUES = [
  "none",
  "low",
  "medium",
  "high",
  "xhigh",
  "max",
  "ultra",
] as const;

export type ReasoningEffortOverrideValue = (typeof REASONING_EFFORT_OVERRIDE_VALUES)[number];

const REASONING_EFFORT_OVERRIDE_SET = new Set<string>(REASONING_EFFORT_OVERRIDE_VALUES);
const EDGE_INVISIBLE_PATTERN =
  /^[\p{White_Space}\p{Separator}\p{Control}\p{Format}]+|[\p{White_Space}\p{Separator}\p{Control}\p{Format}]+$/gu;
const NON_ASCII_COMMA_PATTERN =
  /[،、︐︑﹐﹑，､]/u;

export type ReasoningEffortsOverrideParseResult =
  { ok: true; efforts: ReasoningEffortOverrideValue[] } | { ok: false; error: string };

function stripInvisibleEdges(value: string): string {
  return value.replace(EDGE_INVISIBLE_PATTERN, "");
}

/** Parse one ASCII-comma-separated native reasoning-effort vocabulary. */
export function parseReasoningEffortsOverride(value: unknown): ReasoningEffortsOverrideParseResult {
  if (typeof value !== "string") {
    return { ok: false, error: "reasoning_efforts must be a string" };
  }
  if (NON_ASCII_COMMA_PATTERN.test(value)) {
    return { ok: false, error: "reasoning_efforts must use English commas" };
  }

  const segments = value.split(",");

  const efforts: ReasoningEffortOverrideValue[] = [];
  const seen = new Set<string>();
  for (const segment of segments) {
    const effort = stripInvisibleEdges(segment).toLowerCase();
    if (!effort) {
      return { ok: false, error: "reasoning_efforts contains an empty item" };
    }
    if (!REASONING_EFFORT_OVERRIDE_SET.has(effort)) {
      return { ok: false, error: `Unsupported reasoning effort: ${effort}` };
    }
    if (seen.has(effort)) {
      return { ok: false, error: `Duplicate reasoning effort: ${effort}` };
    }
    seen.add(effort);
    efforts.push(effort as ReasoningEffortOverrideValue);
  }

  return { ok: true, efforts };
}
