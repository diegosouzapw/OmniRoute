import { supportsXHighEffort } from "@omniroute/open-sse/config/providerModels";
import { parseModel } from "@omniroute/open-sse/services/model";
import { stripVscodeServiceTierVariantModelId } from "@/lib/vscode/serviceTierVariants";
import { extendCodexGpt56EffortValues } from "@/shared/reasoning/effortStandardization";

export type VscodeCatalogModel = {
  id?: string;
  name?: string;
  root?: string;
  owned_by?: string;
  capabilities?: Record<string, boolean>;
  supportsReasoningEffort?: string[];
  supportedReasoningEfforts?: string[];
  supports_reasoning_effort?: string[];
  defaultReasoningEffort?: string;
  default_reasoning_effort?: string;
};

const STANDARD_EFFORT_SUFFIX_PATTERN = /-(xhigh|high|medium|low|none)$/i;
const GPT_5_6_EXTENDED_EFFORT_SUFFIX_PATTERN = /^(.*gpt-5\.6-(?:sol|terra|luna))-(max|ultra)$/i;
const DEFAULT_REASONING_EFFORT = "none";
const KNOWN_REASONING_EFFORTS = new Set(["none", "low", "medium", "high", "xhigh", "max", "ultra"]);

export type VscodeModelConfigSchema = {
  type: "object";
  properties: {
    reasoningEffort: {
      type: "string";
      title: string;
      description: string;
      default: string;
      enum: string[];
      enumLabels: string[];
      enumDescriptions: string[];
    };
  };
};

export function getCatalogModelName(model: VscodeCatalogModel) {
  return stripVscodeServiceTierVariantModelId(model.id || model.name || model.root || "");
}

function matchReasoningEffortSuffix(modelId: string) {
  const extendedMatch = modelId.match(GPT_5_6_EXTENDED_EFFORT_SUFFIX_PATTERN);
  if (extendedMatch?.[1] && extendedMatch[2]) {
    return { baseModelId: extendedMatch[1], effort: extendedMatch[2].toLowerCase() };
  }

  const standardMatch = modelId.match(STANDARD_EFFORT_SUFFIX_PATTERN);
  if (!standardMatch?.[1]) return undefined;
  return {
    baseModelId: modelId.slice(0, -standardMatch[0].length),
    effort: standardMatch[1].toLowerCase(),
  };
}

function normalizeReasoningEffortValue(value: string) {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[_\s-]+/g, "");
  if (normalized === "xhigh") return "xhigh";
  if (KNOWN_REASONING_EFFORTS.has(normalized)) return normalized;
  return undefined;
}

function getNativeReasoningEffortValues(model: VscodeCatalogModel) {
  const candidates = [
    model.supportsReasoningEffort,
    model.supportedReasoningEfforts,
    model.supports_reasoning_effort,
  ];

  for (const candidate of candidates) {
    if (!Array.isArray(candidate) || candidate.length === 0) {
      continue;
    }

    const normalized = Array.from(
      new Set(
        candidate
          .map((value) =>
            typeof value === "string" ? normalizeReasoningEffortValue(value) : undefined
          )
          .filter(Boolean)
      )
    ) as string[];

    if (normalized.length > 0) {
      return normalized;
    }
  }

  return undefined;
}

export function isReasoningCapableModel(model: VscodeCatalogModel) {
  return (
    model.capabilities?.reasoning === true ||
    model.capabilities?.thinking === true ||
    (getNativeReasoningEffortValues(model)?.length || 0) > 0
  );
}

export function getReasoningEffortValues(model: VscodeCatalogModel) {
  const nativeReasoningEffortValues = getNativeReasoningEffortValues(model);
  if (nativeReasoningEffortValues && nativeReasoningEffortValues.length > 0) {
    return nativeReasoningEffortValues;
  }

  if (!isReasoningCapableModel(model)) return undefined;

  const modelId = getCatalogModelName(model);
  const parsed = parseModel(modelId, "");
  const providerId = parsed.provider || model.owned_by || "";
  const providerModelId = parsed.model || model.root || modelId.split("/").pop() || modelId;
  const values = ["none", "low", "medium", "high"];

  if (providerId && providerModelId && supportsXHighEffort(providerId, providerModelId)) {
    values.push("xhigh");
  }

  return extendCodexGpt56EffortValues(providerId, providerModelId, values);
}

export function formatReasoningEffortLabel(level: string) {
  if (level === "xhigh") return "XHigh";
  return level.charAt(0).toUpperCase() + level.slice(1);
}

function describeReasoningEffort(level: string) {
  switch (level) {
    case "none":
      return "Disables extra reasoning effort.";
    case "low":
      return "Uses a light amount of reasoning.";
    case "medium":
      return "Uses a balanced amount of reasoning.";
    case "high":
      return "Uses an extended amount of reasoning.";
    case "xhigh":
      return "Uses extra-high reasoning effort.";
    case "max":
      return "Uses the maximum available reasoning effort.";
    case "ultra":
      return "Uses the Ultra reasoning preset.";
    default:
      return `Uses ${formatReasoningEffortLabel(level)} reasoning effort.`;
  }
}

export function buildSupportedReasoningEfforts(supportedValues: string[]): string[] {
  return [...supportedValues];
}

export function inferSelectedReasoningEffort(
  model: VscodeCatalogModel,
  supportedValues?: string[]
) {
  const modelId = getCatalogModelName(model);
  const match = matchReasoningEffortSuffix(modelId);
  if (!match) return undefined;

  const selected = match.effort;
  if (
    Array.isArray(supportedValues) &&
    supportedValues.length > 0 &&
    !supportedValues.includes(selected)
  ) {
    return undefined;
  }

  return selected;
}

export function getReasoningVariantBaseModelId(modelId: string) {
  return matchReasoningEffortSuffix(modelId)?.baseModelId || modelId;
}

function getCodexGpt56DefaultReasoningEffort(model: VscodeCatalogModel) {
  const modelId = getCatalogModelName(model);
  const parsed = parseModel(modelId, "");
  const providerId = (parsed.provider || model.owned_by || "").trim().toLowerCase();
  if (providerId !== "codex" && providerId !== "cx") return undefined;

  const providerModelId = (parsed.model || model.root || modelId.split("/").pop() || modelId)
    .trim()
    .toLowerCase();
  const match = providerModelId.match(
    /^gpt-5\.6-(sol|terra|luna)(?:-(?:none|low|medium|high|xhigh|max|ultra))?$/
  );
  if (!match) return undefined;
  return match[1] === "sol" ? "low" : "medium";
}

export function getDefaultReasoningEffort(model: VscodeCatalogModel, supportedValues?: string[]) {
  return (
    inferSelectedReasoningEffort(model, supportedValues) ||
    getCodexGpt56DefaultReasoningEffort(model) ||
    DEFAULT_REASONING_EFFORT
  );
}

export function buildReasoningConfigSchema(
  supportedValues: string[],
  defaultReasoningEffort: string
): VscodeModelConfigSchema {
  return {
    type: "object",
    properties: {
      reasoningEffort: {
        type: "string",
        title: "Reasoning effort",
        description: "Controls how much reasoning effort the model uses.",
        default: defaultReasoningEffort,
        enum: supportedValues,
        enumLabels: supportedValues.map(formatReasoningEffortLabel),
        enumDescriptions: supportedValues.map(describeReasoningEffort),
      },
    },
  };
}
