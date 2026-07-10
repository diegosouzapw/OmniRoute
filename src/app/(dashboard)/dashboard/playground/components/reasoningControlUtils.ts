// Playground reasoning-control helpers (#6241).
//
// The `/v1/models` catalog additively exposes per-model reasoning capability flags on each
// entry's `capabilities` object (see src/lib/modelMetadataRegistry.ts::enrichCatalogModelEntry):
//   - `supportsThinking` (boolean) — whether the model exposes a thinking/reasoning mode.
//   - `effort_tiers` (string[])     — the canonical effort vocabulary to offer, present only
//                                     when the model supports thinking.
// These pure helpers turn that capability object into (a) a spec describing which controls the
// Playground should render + the effort options, and (b) the reasoning request fields to fold
// onto the chat request body — gated so `effort`/`thinking` are emitted ONLY when the selected
// model supports thinking and the chosen values are valid. Exported + unit-tested directly.

import { CANONICAL_EFFORT_VALUES } from "@/shared/reasoning/effortStandardization";

/** Subset of a `/v1/models` entry's `capabilities` object the Playground reasoning UI reads. */
export interface ModelReasoningCapabilities {
  supportsThinking?: boolean | null;
  effort_tiers?: unknown;
}

/** What the Playground should render for the current model's reasoning support. */
export interface ReasoningControlSpec {
  /** Render the effort selector + thinking toggle only when true. */
  show: boolean;
  /** Canonical effort tiers to offer in the selector (empty when `show` is false). */
  effortOptions: string[];
}

/** The subset of playground params the reasoning request-field builder consumes. */
export interface ReasoningParams {
  effort?: string;
  thinking?: boolean;
}

const HIDDEN_SPEC: ReasoningControlSpec = { show: false, effortOptions: [] };

/**
 * Resolve which reasoning controls to render for a model's capability object.
 * - Hidden (`show: false`) when the model does not support thinking (or caps is missing).
 * - Otherwise `show: true` with the model's `effort_tiers`, falling back to the canonical
 *   effort vocabulary when the model omits or empties the tier list.
 */
export function resolveReasoningControls(
  caps: ModelReasoningCapabilities | null | undefined
): ReasoningControlSpec {
  if (!caps || caps.supportsThinking !== true) return HIDDEN_SPEC;
  const tiers = Array.isArray(caps.effort_tiers)
    ? caps.effort_tiers.filter((t): t is string => typeof t === "string" && t.length > 0)
    : [];
  return {
    show: true,
    effortOptions: tiers.length > 0 ? tiers : [...CANONICAL_EFFORT_VALUES],
  };
}

/**
 * Build the reasoning fields to fold onto the chat request body from the current params + the
 * resolved control spec. Emits nothing when the model does not support thinking; includes
 * `effort` only when it is set AND part of the offered tiers; includes `thinking` only when the
 * toggle is on. This is the single "only when set/supported" gate for the request body.
 */
export function buildReasoningRequestFields(
  params: ReasoningParams,
  spec: ReasoningControlSpec
): { effort?: string; thinking?: boolean } {
  if (!spec.show) return {};
  const out: { effort?: string; thinking?: boolean } = {};
  if (params.effort && spec.effortOptions.includes(params.effort)) {
    out.effort = params.effort;
  }
  if (params.thinking) {
    out.thinking = true;
  }
  return out;
}
