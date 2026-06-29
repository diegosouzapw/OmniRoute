// #5161 — pure leaf: compute OpenAI-shaped {context_length, max_input_tokens,
// max_output_tokens} for a /v1/models entry. Same precedence chain as
// getComboTargetCatalogMetadata in catalog.ts (synced limits → registry
// contextLength → model spec → token map). Extracted so per-platform entries
// (catalog.ts lines 830-859) can reuse it without growing the god-file past its
// frozen baseline. No DB import; unit-testable in isolation.

import { getSyncedCapability } from "@/lib/modelsDevSync";
import { getModelSpec } from "@/shared/constants/modelSpecs";
import { getTokenLimit } from "@omniroute/open-sse/services/contextManager";

function isPositive(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

export type ModelLimitFields = {
  context_length?: number;
  max_input_tokens?: number;
  max_output_tokens?: number;
};

export type ModelRegistryEntry = {
  id: string;
  contextLength?: number;
};

export function computeModelLimitFields(
  providerId: string,
  model: ModelRegistryEntry
): ModelLimitFields {
  const synced = getSyncedCapability(providerId, model.id);
  const spec = getModelSpec(model.id);

  const syncedContext = isPositive(synced?.limit_context) ? synced.limit_context : undefined;
  const registryContext = isPositive(model?.contextLength) ? model.contextLength : undefined;
  const specContext = isPositive(spec?.contextWindow) ? spec.contextWindow : undefined;
  const contextLength =
    syncedContext ??
    registryContext ??
    specContext ??
    (getTokenLimit(providerId, model.id) || undefined);

  const maxInputTokens = isPositive(synced?.limit_input) ? synced.limit_input : contextLength;
  const maxOutputTokens = isPositive(synced?.limit_output)
    ? synced.limit_output
    : isPositive(spec?.maxOutputTokens)
      ? spec.maxOutputTokens
      : undefined;

  return {
    ...(contextLength ? { context_length: contextLength } : {}),
    ...(maxInputTokens ? { max_input_tokens: maxInputTokens } : {}),
    ...(maxOutputTokens ? { max_output_tokens: maxOutputTokens } : {}),
  };
}
