import { isVisionModelId } from "@/shared/constants/visionModels";

// Vision-capability fields for catalog entries. Extracted verbatim from ./catalog.ts.
// Vision detection is centralized in `@/shared/constants/visionModels` (#4072) so this
// listing path, the routing fallback, and lite compression share one verdict.
// Re-exported (here and from ./catalog.ts) for callers/tests that imported it from there.
export { isVisionModelId };

export function getVisionCapabilityFields(modelId: string) {
  if (!isVisionModelId(modelId)) return null;
  return {
    capabilities: { vision: true },
    input_modalities: ["text", "image"],
    output_modalities: ["text"],
  };
}

/**
 * Vision-capability fields for a user-added custom chat model. Honours an
 * explicit `supportsVision` flag on the saved entry (the dashboard "vision-
 * capable" toggle) IN ADDITION TO the conservative id-based heuristic used by
 * built-in models. Without this, a user who registered e.g. `my-vision-llm`
 * and ticked vision saw no `capabilities.vision` in `/v1/models`, so the LLM
 * selector and downstream routing treated the model as text-only.
 *
 * Port of upstream decolua/9router 5e5e78d3. Conservative: an explicit
 * `supportsVision === false` wins so users can downgrade a mis-classified
 * model (same anti-FP discipline as #4071 / #4072).
 */
export function getCustomVisionCapabilityFields(
  entry: { supportsVision?: boolean } | null | undefined,
  ...candidateIds: Array<string | null | undefined>
): {
  capabilities: { vision: true };
  input_modalities: string[];
  output_modalities: string[];
} | null {
  if (entry && entry.supportsVision === false) return null;
  if (entry && entry.supportsVision === true) {
    return {
      capabilities: { vision: true },
      input_modalities: ["text", "image"],
      output_modalities: ["text"],
    };
  }
  for (const id of candidateIds) {
    if (typeof id === "string" && id) {
      const fields = getVisionCapabilityFields(id);
      if (fields) return fields;
    }
  }
  return null;
}
