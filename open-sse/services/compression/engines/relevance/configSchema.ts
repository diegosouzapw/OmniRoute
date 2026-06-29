import type { EngineConfigField, EngineValidationResult } from "../types.ts";
import type { RelevanceConfig } from "../../types.ts";

export const RELEVANCE_SCHEMA: EngineConfigField[] = [
  {
    key: "enabled",
    type: "boolean",
    label: "Enabled",
    defaultValue: false,
  },
  {
    key: "overlapThreshold",
    type: "number",
    label: "Overlap threshold",
    description: "Sentences with Jaccard overlap below this are candidates for removal.",
    defaultValue: 0.1,
    min: 0,
    max: 1,
  },
  {
    key: "budgetPercent",
    type: "number",
    label: "Budget percent",
    description: "Target fraction of original character count to retain (0–1).",
    defaultValue: 0.5,
    min: 0.1,
    max: 1,
  },
  {
    key: "boilerplateWeight",
    type: "number",
    label: "Boilerplate weight",
    description: "Weight applied to boilerplate penalty when scoring sentences.",
    defaultValue: 0.5,
    min: 0,
    max: 1,
  },
];

export function validateRelevanceConfig(config: Record<string, unknown>): EngineValidationResult {
  const errors: string[] = [];
  if (config.enabled !== undefined && typeof config.enabled !== "boolean") {
    errors.push("enabled must be a boolean");
  }
  for (const key of ["overlapThreshold", "budgetPercent", "boilerplateWeight"]) {
    if (config[key] !== undefined) {
      const v = config[key];
      if (typeof v !== "number" || v < 0 || v > 1) {
        errors.push(`${key} must be a number between 0 and 1`);
      }
    }
  }
  return { valid: errors.length === 0, errors };
}

export function resolveRelevanceConfig(stepConfig: Record<string, unknown>): RelevanceConfig {
  return {
    enabled: typeof stepConfig.enabled === "boolean" ? stepConfig.enabled : false,
    overlapThreshold: typeof stepConfig.overlapThreshold === "number" ? stepConfig.overlapThreshold : 0.1,
    budgetPercent: typeof stepConfig.budgetPercent === "number" ? stepConfig.budgetPercent : 0.5,
    boilerplateWeight: typeof stepConfig.boilerplateWeight === "number" ? stepConfig.boilerplateWeight : 0.5,
  };
}
