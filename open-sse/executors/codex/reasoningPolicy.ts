import {
  CODEX_EFFORT_ORDER as EFFORT_ORDER,
  splitCodexReasoningSuffix,
  type CodexEffortLevel as EffortLevel,
} from "./reasoningSuffix.ts";

type RecordValue = Record<string, unknown>;
function asRecord(value: unknown): RecordValue {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as RecordValue) : {};
}
function effort(value: unknown): string | undefined {
  return typeof value === "string" ? value.trim().toLowerCase() || undefined : undefined;
}

/**
 * Maximum reasoning effort allowed per Codex model.
 * Fallback for legacy catalog entries only. Discovered metadata takes precedence.
 */
const MAX_EFFORT_BY_MODEL: Record<string, EffortLevel> = {
  "gpt-5.6-sol": "ultra",
  "gpt-5.6-terra": "ultra",
  "gpt-5.6-luna": "max",
  "gpt-5.3-codex": "xhigh",
  "gpt-5.1-codex-max": "xhigh",
  "gpt-5-mini": "high",
  "gpt-5.1-mini": "high",
  "gpt-4.1-mini": "high",
};

/**
 * Clamp reasoning effort to the model's maximum allowed level.
 * Returns the original value if within limits, or the cap if it exceeds it.
 */
function clampEffort(model: string, requested: string): string {
  const max = MAX_EFFORT_BY_MODEL[model];
  if (!max) return requested;
  const reqIdx = EFFORT_ORDER.indexOf(requested as EffortLevel);
  const maxIdx = EFFORT_ORDER.indexOf(max);
  if (reqIdx > maxIdx) {
    console.debug(`[Codex] clampEffort: "${requested}" → "${max}" (model: ${model})`);
    return max;
  }
  return requested;
}

/** Apply a catalog-resolved selection without parsing a real upstream ID twice. */
export function applyCodexReasoningSelection(
  model: string,
  body: RecordValue,
  metadataInput: unknown,
  connectionDefault: string | undefined,
  allowDefaults: boolean
): void {
  const metadata = asRecord(metadataInput);
  const requestedModel = typeof body.model === "string" ? body.model : model;
  const hasCatalog =
    metadata.model === requestedModel && Array.isArray(metadata.supportedThinkingEfforts);
  const split = hasCatalog
    ? { baseModel: requestedModel, effort: effort(metadata.resolvedThinkingEffort) }
    : splitCodexReasoningSuffix(requestedModel);
  if (split.effort) body.model = split.baseModel;
  const reasoning = asRecord(body.reasoning);
  // Chat→Responses translation normalizes canonical max to xhigh. Restore the
  // original choice for catalog-backed Codex models in passthrough mode; explicit
  // thinking-budget policies still own the translated value in other modes.
  const requested =
    hasCatalog && allowDefaults && Object.hasOwn(metadata, "requestedThinkingEffort")
      ? effort(metadata.requestedThinkingEffort)
      : effort(reasoning.effort) || effort(body.reasoning_effort);
  const selected =
    split.effort ||
    requested ||
    (allowDefaults
      ? connectionDefault || effort(metadata.defaultThinkingEffort) || "medium"
      : undefined);
  if (!selected) return;
  // New catalog values pass through verbatim, including upstream validation errors.
  // Only the old built-in Ultra aliases retain their historical Max wire mapping.
  const resolved = hasCatalog ? selected : clampEffort(split.baseModel, selected);
  body.reasoning = {
    ...reasoning,
    effort:
      !hasCatalog && MAX_EFFORT_BY_MODEL[split.baseModel] && resolved === "ultra"
        ? "max"
        : resolved,
  };
}
