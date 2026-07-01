import type {
  ProviderModelCapabilities,
  ProviderModelCapabilitiesPatch,
} from "@/shared/types/modelConfig";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toCapabilityNumber(value: unknown, allowZero = false): number | undefined {
  if (
    typeof value === "number" &&
    Number.isFinite(value) &&
    (value > 0 || (allowZero && value === 0))
  ) {
    return value;
  }
  return undefined;
}

function toBooleanIfPresent(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

export function modelCapabilitiesHasEntries(value: object | undefined): boolean {
  return Boolean(value && Object.keys(value).length > 0);
}

export function capabilityPatchHasNonNull(
  rawCapabilities: JsonRecord,
  keys: readonly string[]
): boolean {
  return (
    !hasExplicitNull(rawCapabilities, keys) &&
    keys.some((key) => hasOwn(rawCapabilities, key) && rawCapabilities[key] !== null)
  );
}

function hasExplicitNull(record: JsonRecord, keys: readonly string[]): boolean {
  return keys.some(
    (key) => Object.prototype.hasOwnProperty.call(record, key) && record[key] === null
  );
}

function hasOwn(record: JsonRecord, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(record, key);
}

function pickCapabilityValue(record: JsonRecord, keys: readonly string[]): unknown {
  if (hasExplicitNull(record, keys)) return undefined;
  for (const key of keys) {
    if (hasOwn(record, key) && record[key] !== undefined) return record[key];
  }
  return undefined;
}

function markExplicitNull(
  capabilityOverrides: JsonRecord,
  records: readonly JsonRecord[],
  targetKey: string,
  sourceKeys: readonly string[] = [targetKey]
): void {
  if (records.some((record) => hasExplicitNull(record, sourceKeys))) {
    capabilityOverrides[targetKey] = null;
  }
}

export function buildTokenLimitDeleteMarkers(raw: unknown): ProviderModelCapabilitiesPatch {
  const record = asRecord(raw);
  const nestedCapabilities = asRecord(record.capabilities);
  const capabilityOverrides = { ...asRecord(record.capabilityOverrides) };
  const records = [record, nestedCapabilities];
  if (
    hasExplicitNull(record, [
      "contextWindow",
      "contextLength",
      "maxInputTokens",
      "inputTokenLimit",
      "max_input_tokens",
    ]) ||
    hasExplicitNull(nestedCapabilities, [
      "contextWindow",
      "contextLength",
      "maxInputTokens",
      "inputTokenLimit",
      "max_input_tokens",
    ])
  ) {
    capabilityOverrides.contextWindow = null;
    capabilityOverrides.maxInputTokens = null;
  }
  if (
    hasExplicitNull(record, ["maxOutputTokens", "outputTokenLimit", "max_output_tokens"]) ||
    hasExplicitNull(nestedCapabilities, [
      "maxOutputTokens",
      "outputTokenLimit",
      "max_output_tokens",
    ])
  ) {
    capabilityOverrides.maxOutputTokens = null;
  }
  markExplicitNull(capabilityOverrides, records, "supportsVision");
  markExplicitNull(capabilityOverrides, records, "supportsTools", ["supportsTools", "toolCalling"]);
  markExplicitNull(capabilityOverrides, records, "supportsReasoning", [
    "supportsReasoning",
    "supportsThinking",
  ]);
  delete capabilityOverrides.supportsThinking;
  delete capabilityOverrides.toolCalling;
  markExplicitNull(capabilityOverrides, records, "supportsXHighEffort");
  markExplicitNull(capabilityOverrides, records, "supportsMaxEffort");
  markExplicitNull(capabilityOverrides, records, "thinkingBudgetCap", [
    "thinkingBudgetCap",
    "maxThinkingBudget",
  ]);
  for (const key of [
    "defaultThinkingBudget",
    "thinkingOverhead",
    "adaptiveMaxTokens",
    "interleavedField",
  ]) {
    markExplicitNull(capabilityOverrides, records, key);
  }
  return capabilityOverrides as ProviderModelCapabilitiesPatch;
}

function assignNumberCapability(
  out: ProviderModelCapabilities,
  key: keyof ProviderModelCapabilities,
  value: unknown,
  options?: { allowZero?: boolean }
) {
  const numberValue = toCapabilityNumber(value, options?.allowZero === true);
  if (numberValue !== undefined) out[key] = numberValue as never;
}

function assignBooleanCapability(
  out: ProviderModelCapabilities,
  key: keyof ProviderModelCapabilities,
  value: unknown
) {
  const booleanValue = toBooleanIfPresent(value);
  if (booleanValue !== undefined) out[key] = booleanValue as never;
}

function assignStringCapability(
  out: ProviderModelCapabilities,
  key: keyof ProviderModelCapabilities,
  value: unknown
) {
  const stringValue = typeof value === "string" ? value.trim() : "";
  if (stringValue) out[key] = stringValue as never;
}

export function normalizeModelCapabilities(raw: unknown): ProviderModelCapabilities | undefined {
  const record = asRecord(raw);
  const out: ProviderModelCapabilities = {};

  const contextKeys = [
    "contextWindow",
    "contextLength",
    "maxInputTokens",
    "inputTokenLimit",
    "max_input_tokens",
  ];
  if (!hasExplicitNull(record, contextKeys)) {
    assignNumberCapability(
      out,
      "contextWindow",
      pickCapabilityValue(record, ["contextWindow", "contextLength", "max_input_tokens"])
    );
    assignNumberCapability(
      out,
      "maxInputTokens",
      pickCapabilityValue(record, ["maxInputTokens", "inputTokenLimit", "max_input_tokens"])
    );
  }
  assignNumberCapability(
    out,
    "maxOutputTokens",
    pickCapabilityValue(record, ["maxOutputTokens", "outputTokenLimit", "max_output_tokens"])
  );
  assignBooleanCapability(out, "supportsVision", pickCapabilityValue(record, ["supportsVision"]));
  assignBooleanCapability(
    out,
    "supportsTools",
    pickCapabilityValue(record, ["supportsTools", "toolCalling"])
  );
  assignBooleanCapability(
    out,
    "supportsReasoning",
    pickCapabilityValue(record, ["supportsReasoning", "supportsThinking"])
  );
  assignBooleanCapability(
    out,
    "supportsXHighEffort",
    pickCapabilityValue(record, ["supportsXHighEffort"])
  );
  assignBooleanCapability(
    out,
    "supportsMaxEffort",
    pickCapabilityValue(record, ["supportsMaxEffort"])
  );
  assignNumberCapability(
    out,
    "defaultThinkingBudget",
    pickCapabilityValue(record, ["defaultThinkingBudget"]),
    { allowZero: true }
  );
  assignNumberCapability(
    out,
    "thinkingBudgetCap",
    pickCapabilityValue(record, ["thinkingBudgetCap", "maxThinkingBudget"]),
    { allowZero: true }
  );
  assignNumberCapability(
    out,
    "thinkingOverhead",
    pickCapabilityValue(record, ["thinkingOverhead"])
  );
  assignNumberCapability(
    out,
    "adaptiveMaxTokens",
    pickCapabilityValue(record, ["adaptiveMaxTokens"])
  );
  assignStringCapability(
    out,
    "interleavedField",
    pickCapabilityValue(record, ["interleavedField"])
  );

  return modelCapabilitiesHasEntries(out) ? out : undefined;
}

export function normalizeModelCapabilitiesFromRow(
  row: JsonRecord
): ProviderModelCapabilities | undefined {
  const legacyRecord: JsonRecord = {};
  const contextKeys = [
    "contextWindow",
    "contextLength",
    "maxInputTokens",
    "inputTokenLimit",
    "max_input_tokens",
  ];
  if (!hasExplicitNull(row, contextKeys)) {
    legacyRecord.contextWindow = pickCapabilityValue(row, [
      "contextWindow",
      "contextLength",
      "inputTokenLimit",
      "max_input_tokens",
    ]);
    legacyRecord.maxInputTokens = pickCapabilityValue(row, [
      "maxInputTokens",
      "inputTokenLimit",
      "max_input_tokens",
    ]);
  }
  legacyRecord.maxOutputTokens = pickCapabilityValue(row, [
    "maxOutputTokens",
    "outputTokenLimit",
    "max_output_tokens",
  ]);
  legacyRecord.supportsVision = pickCapabilityValue(row, ["supportsVision"]);
  legacyRecord.supportsTools = pickCapabilityValue(row, ["supportsTools", "toolCalling"]);
  legacyRecord.supportsReasoning = pickCapabilityValue(row, [
    "supportsReasoning",
    "supportsThinking",
  ]);
  legacyRecord.supportsXHighEffort = pickCapabilityValue(row, ["supportsXHighEffort"]);
  legacyRecord.supportsMaxEffort = pickCapabilityValue(row, ["supportsMaxEffort"]);
  legacyRecord.defaultThinkingBudget = pickCapabilityValue(row, ["defaultThinkingBudget"]);
  legacyRecord.thinkingBudgetCap = pickCapabilityValue(row, [
    "thinkingBudgetCap",
    "maxThinkingBudget",
  ]);
  legacyRecord.thinkingOverhead = pickCapabilityValue(row, ["thinkingOverhead"]);
  legacyRecord.adaptiveMaxTokens = pickCapabilityValue(row, ["adaptiveMaxTokens"]);
  legacyRecord.interleavedField = pickCapabilityValue(row, ["interleavedField"]);
  const legacy = normalizeModelCapabilities(legacyRecord);
  const nested = normalizeModelCapabilities(row.capabilities);
  const merged = { ...(legacy || {}), ...(nested || {}) };
  return modelCapabilitiesHasEntries(merged) ? merged : undefined;
}

function assignLegacyCapabilityField(
  target: JsonRecord,
  key: string,
  value: unknown,
  type: "boolean" | "number" | "array" | "string"
) {
  if (type === "array" && Array.isArray(value)) target[key] = value;
  if (type !== "array" && typeof value === type) target[key] = value;
}

export function applyCapabilitiesToLegacyFields(
  target: JsonRecord,
  capabilities: ProviderModelCapabilities | undefined
): JsonRecord {
  if (!capabilities) return target;
  const inputLimit = capabilities.contextWindow ?? capabilities.maxInputTokens;
  assignLegacyCapabilityField(target, "inputTokenLimit", inputLimit, "number");
  assignLegacyCapabilityField(target, "outputTokenLimit", capabilities.maxOutputTokens, "number");
  assignLegacyCapabilityField(target, "supportsVision", capabilities.supportsVision, "boolean");
  assignLegacyCapabilityField(target, "supportsTools", capabilities.supportsTools, "boolean");
  assignLegacyCapabilityField(
    target,
    "supportsReasoning",
    capabilities.supportsReasoning,
    "boolean"
  );
  assignLegacyCapabilityField(
    target,
    "supportsXHighEffort",
    capabilities.supportsXHighEffort,
    "boolean"
  );
  assignLegacyCapabilityField(
    target,
    "supportsMaxEffort",
    capabilities.supportsMaxEffort,
    "boolean"
  );
  assignLegacyCapabilityField(
    target,
    "defaultThinkingBudget",
    capabilities.defaultThinkingBudget,
    "number"
  );
  assignLegacyCapabilityField(
    target,
    "thinkingBudgetCap",
    capabilities.thinkingBudgetCap,
    "number"
  );
  assignLegacyCapabilityField(target, "thinkingOverhead", capabilities.thinkingOverhead, "number");
  assignLegacyCapabilityField(
    target,
    "adaptiveMaxTokens",
    capabilities.adaptiveMaxTokens,
    "number"
  );
  assignLegacyCapabilityField(target, "interleavedField", capabilities.interleavedField, "string");
  return target;
}

function hasNullCapability(rawCapabilities: JsonRecord, keys: readonly string[]): boolean {
  return keys.some((key) => rawCapabilities[key] === null);
}

function deleteCapabilityGroup(
  target: JsonRecord,
  rawCapabilities: JsonRecord,
  sourceKeys: readonly string[],
  deleteKeys: readonly string[],
  markerKeys: readonly string[],
  preserveDeleteMarkers: boolean
) {
  if (!hasNullCapability(rawCapabilities, sourceKeys)) return;
  for (const key of deleteKeys) delete target[key];
  if (!preserveDeleteMarkers) return;
  for (const key of markerKeys) target[key] = null;
}

export function applyCapabilityPatchDeletes(
  target: JsonRecord,
  rawCapabilities: JsonRecord,
  preserveDeleteMarkers = false
): JsonRecord {
  deleteCapabilityGroup(
    target,
    rawCapabilities,
    ["contextWindow", "contextLength", "maxInputTokens", "inputTokenLimit", "max_input_tokens"],
    ["contextWindow", "maxInputTokens"],
    ["contextWindow", "maxInputTokens"],
    preserveDeleteMarkers
  );
  deleteCapabilityGroup(
    target,
    rawCapabilities,
    ["maxOutputTokens", "outputTokenLimit", "max_output_tokens"],
    ["maxOutputTokens"],
    ["maxOutputTokens"],
    preserveDeleteMarkers
  );
  deleteCapabilityGroup(
    target,
    rawCapabilities,
    ["supportsTools", "toolCalling"],
    ["supportsTools", "toolCalling"],
    ["supportsTools"],
    preserveDeleteMarkers
  );
  deleteCapabilityGroup(
    target,
    rawCapabilities,
    ["supportsReasoning", "supportsThinking"],
    ["supportsReasoning", "supportsThinking"],
    ["supportsReasoning"],
    preserveDeleteMarkers
  );
  deleteCapabilityGroup(
    target,
    rawCapabilities,
    ["thinkingBudgetCap", "maxThinkingBudget"],
    ["thinkingBudgetCap", "maxThinkingBudget"],
    ["thinkingBudgetCap"],
    preserveDeleteMarkers
  );
  for (const key of [
    "supportsVision",
    "supportsXHighEffort",
    "supportsMaxEffort",
    "defaultThinkingBudget",
    "thinkingOverhead",
    "adaptiveMaxTokens",
    "interleavedField",
  ]) {
    if (rawCapabilities[key] === null) {
      delete target[key];
      if (preserveDeleteMarkers) target[key] = null;
    }
  }
  return target;
}

export function cloneJsonRecord(record: JsonRecord): JsonRecord {
  return JSON.parse(JSON.stringify(record));
}
