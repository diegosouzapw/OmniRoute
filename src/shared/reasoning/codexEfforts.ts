import { z } from "zod";

const effortSchema = z
  .string()
  .trim()
  .regex(/^[a-z][a-z0-9_]*$/);
const effortEntrySchema = z.union([effortSchema, z.object({ effort: effortSchema })]);

/** Codex catalog levels are native values, not canonical-effort synonyms. */
export function readCodexReasoningMetadata(record: Record<string, unknown>): {
  supportedThinkingEfforts?: string[];
  defaultThinkingEffort?: string;
} {
  if (!Array.isArray(record.supported_reasoning_levels)) return {};
  const efforts = new Set<string>();
  for (const entry of record.supported_reasoning_levels) {
    const parsed = effortEntrySchema.safeParse(entry);
    if (parsed.success) {
      efforts.add(typeof parsed.data === "string" ? parsed.data : parsed.data.effort);
    }
  }
  if (!efforts.size) return {};
  const defaultEffort = effortSchema.safeParse(record.default_reasoning_level);
  return {
    supportedThinkingEfforts: [...efforts],
    ...(defaultEffort.success && efforts.has(defaultEffort.data)
      ? { defaultThinkingEffort: defaultEffort.data }
      : {}),
  };
}

/**
 * Ultra in the Codex catalog is a client-side delegation preset. The Responses
 * wire enum rejects it; do not advertise a new API alias that only fails or silently
 * becomes Max. Keep the original catalog metadata and legacy aliases intact.
 */
export function getCodexWireEfforts(efforts: readonly string[]): string[] {
  return efforts.filter((effort) => effort !== "ultra");
}
