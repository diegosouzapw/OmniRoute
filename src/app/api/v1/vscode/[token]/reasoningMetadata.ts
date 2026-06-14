import { parseModel } from "@omniroute/open-sse/services/model";
import { supportsXHighEffort } from "@omniroute/open-sse/config/providerModels";
import { stripVscodeServiceTierVariantModelId } from "@/app/api/v1/vscode/[token]/serviceTierVariants";

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

const EFFORT_SUFFIX_PATTERN = /-(xhigh|high|medium|low|none)$/i;
const DEFAULT_REASONING_EFFORT = "none";
const KNOWN_REASONING_EFFORTS = new Set(["none", "low", "medium", "high", "xhigh"]);

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

function normalizeReasoningEffortValue(value: string) {
  const normalized = value.trim().toLowerCase().replace(/[_\s-]+/g, "");
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
      new Set(candidate.map(value => typeof value === "string" ? normalizeReasoningEffortValue(value) : undefined).filter(Boolean))
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

  return values;
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
      return "Uses the maximum available reasoning effort.";
    default:
      return `Uses ${formatReasoningEffortLabel(level)} reasoning effort.`;
  }
}

export function buildSupportedReasoningEfforts(
  supportedValues: string[]
): string[] {
  return [...supportedValues];
}

export function inferSelectedReasoningEffort(
  model: VscodeCatalogModel,
  supportedValues?: string[]
) {
  const modelId = getCatalogModelName(model);
  const match = modelId.match(EFFORT_SUFFIX_PATTERN);
  if (!match) return undefined;

  const selected = match[1]?.toLowerCase();
  if (!selected) return undefined;
  if (Array.isArray(supportedValues) && supportedValues.length > 0 && !supportedValues.includes(selected)) {
    return undefined;
  }

  return selected;
}

export function getReasoningVariantBaseModelId(modelId: string) {
  return modelId.replace(EFFORT_SUFFIX_PATTERN, "");
}

export function getDefaultReasoningEffort(
  model: VscodeCatalogModel,
  supportedValues?: string[]
) {
  return inferSelectedReasoningEffort(model, supportedValues) || DEFAULT_REASONING_EFFORT;
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
