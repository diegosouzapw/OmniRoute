import type {
  ProviderModelCapabilitiesPatch,
  ProviderModelConfig,
} from "@/shared/types/modelConfig";

import {
  applyCapabilityPatchDeletes,
  cloneJsonRecord,
  normalizeModelCapabilities,
  normalizeModelCapabilitiesFromRow,
} from "./modelCompatCapabilities";
import {
  compatByProtocolHasEntries,
  sanitizeUpstreamHeadersMap,
  type CompatByProtocolMap,
} from "./modelCompat";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export function clearLegacyCapabilityFields(target: JsonRecord): void {
  for (const key of [
    "contextLength",
    "inputTokenLimit",
    "outputTokenLimit",
    "max_input_tokens",
    "max_output_tokens",
    "supportsVision",
    "supportsThinking",
    "supportsTools",
    "toolCalling",
    "supportsReasoning",
    "supportsXHighEffort",
    "supportsMaxEffort",
    "reasoningEfforts",
    "defaultThinkingBudget",
    "thinkingBudgetCap",
    "maxThinkingBudget",
    "thinkingOverhead",
    "adaptiveMaxTokens",
    "interleavedField",
  ]) {
    delete target[key];
  }
}

export function clearLegacyCompatFields(target: JsonRecord): void {
  for (const key of [
    "targetFormat",
    "unsupportedParams",
    "normalizeToolCallId",
    "preserveOpenAIDeveloperRole",
    "compatByProtocol",
    "upstreamHeaders",
  ]) {
    delete target[key];
  }
}

export function buildModelCompatFields(compat: JsonRecord): JsonRecord {
  const fields: JsonRecord = {};
  const targetFormat = typeof compat.targetFormat === "string" ? compat.targetFormat.trim() : "";
  if (targetFormat) fields.targetFormat = targetFormat;
  if (Array.isArray(compat.unsupportedParams)) {
    const unsupportedParams = Array.from(
      new Set(
        compat.unsupportedParams
          .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
          .filter(Boolean)
      )
    );
    if (unsupportedParams.length > 0) fields.unsupportedParams = unsupportedParams;
  }
  if (typeof compat.normalizeToolCallId === "boolean") {
    fields.normalizeToolCallId = compat.normalizeToolCallId;
  }
  if (typeof compat.preserveOpenAIDeveloperRole === "boolean") {
    fields.preserveOpenAIDeveloperRole = compat.preserveOpenAIDeveloperRole;
  }
  if (compat.upstreamHeaders && typeof compat.upstreamHeaders === "object") {
    const upstreamHeaders = sanitizeUpstreamHeadersMap(
      compat.upstreamHeaders as Record<string, unknown>
    );
    if (Object.keys(upstreamHeaders).length > 0) fields.upstreamHeaders = upstreamHeaders;
  }
  if (
    compat.compatByProtocol &&
    typeof compat.compatByProtocol === "object" &&
    !Array.isArray(compat.compatByProtocol) &&
    compatByProtocolHasEntries(compat.compatByProtocol as CompatByProtocolMap)
  ) {
    fields.compatByProtocol = compat.compatByProtocol;
  }
  return fields;
}

export function buildCompatConfigFromRow(
  record: JsonRecord
): ProviderModelConfig["compat"] | undefined {
  const nestedCompat = asRecord(record.compat);
  const fields = buildModelCompatFields({
    ...nestedCompat,
    ...(Object.prototype.hasOwnProperty.call(record, "targetFormat")
      ? { targetFormat: record.targetFormat }
      : {}),
    ...(Object.prototype.hasOwnProperty.call(record, "unsupportedParams")
      ? { unsupportedParams: record.unsupportedParams }
      : {}),
    ...(Object.prototype.hasOwnProperty.call(record, "normalizeToolCallId")
      ? { normalizeToolCallId: record.normalizeToolCallId }
      : {}),
    ...(Object.prototype.hasOwnProperty.call(record, "preserveOpenAIDeveloperRole")
      ? { preserveOpenAIDeveloperRole: record.preserveOpenAIDeveloperRole }
      : {}),
    ...(Object.prototype.hasOwnProperty.call(record, "upstreamHeaders")
      ? { upstreamHeaders: record.upstreamHeaders }
      : {}),
    ...(Object.prototype.hasOwnProperty.call(record, "compatByProtocol")
      ? { compatByProtocol: record.compatByProtocol }
      : {}),
  });
  return Object.keys(fields).length > 0 ? (fields as ProviderModelConfig["compat"]) : undefined;
}

function normalizeCapabilityPatchRecord(raw: unknown): ProviderModelCapabilitiesPatch | undefined {
  const record = asRecord(raw);
  const normalized = normalizeModelCapabilities(record) as JsonRecord | undefined;
  const patch = applyCapabilityPatchDeletes({ ...(normalized || {}) }, record, true);
  return Object.keys(patch).length > 0 ? (patch as ProviderModelCapabilitiesPatch) : undefined;
}

function collectCapabilityNullMarkers(records: readonly JsonRecord[]): JsonRecord {
  const markers: JsonRecord = {};
  for (const record of records) {
    applyCapabilityPatchDeletes(markers, record, true);
  }
  return markers;
}

function normalizeCapabilitiesForRow(
  record: JsonRecord
): ProviderModelCapabilitiesPatch | undefined {
  const capabilities = normalizeModelCapabilitiesFromRow(record) as JsonRecord | undefined;
  const nullMarkers = collectCapabilityNullMarkers([
    record,
    asRecord(record.capabilities),
    asRecord(record.capabilityOverrides),
  ]);
  const merged = { ...(capabilities || {}), ...nullMarkers };
  return Object.keys(merged).length > 0 ? (merged as ProviderModelCapabilitiesPatch) : undefined;
}

function normalizeCapabilityPatchRecordFromRow(
  record: JsonRecord
): ProviderModelCapabilitiesPatch | undefined {
  const nullMarkers = collectCapabilityNullMarkers([record, asRecord(record.capabilities)]);
  const explicitPatch = normalizeCapabilityPatchRecord(record.capabilityOverrides);
  const patch = { ...nullMarkers, ...(explicitPatch || {}) };
  return Object.keys(patch).length > 0 ? (patch as ProviderModelCapabilitiesPatch) : undefined;
}

export function sanitizeModelConfigBaseline(record: JsonRecord): JsonRecord {
  const next = cloneJsonRecord(record);
  const capabilities = normalizeCapabilitiesForRow(next);
  const capabilityOverrides = normalizeCapabilityPatchRecordFromRow(next);
  const compat = buildCompatConfigFromRow(next);

  clearLegacyCapabilityFields(next);
  clearLegacyCompatFields(next);
  delete next.capabilityOverrides;
  const nested = asRecord(next.capabilities);
  delete nested.supportsThinking;
  delete nested.reasoningEfforts;

  if (capabilities) next.capabilities = capabilities;
  else delete next.capabilities;
  if (capabilityOverrides) next.capabilityOverrides = capabilityOverrides;
  if (compat) next.compat = compat;
  else delete next.compat;
  return next;
}

export function canonicalizeModelConfigRow(record: JsonRecord, includeBaseline = true): JsonRecord {
  const next: JsonRecord = {
    id: record.id,
    name: record.name || record.id,
  };
  for (const key of [
    "source",
    "apiFormat",
    "supportedEndpoints",
    "description",
    "isHidden",
    "isDeleted",
  ]) {
    if (Object.prototype.hasOwnProperty.call(record, key)) next[key] = record[key];
  }
  const capabilities = normalizeCapabilitiesForRow(record);
  if (capabilities) next.capabilities = capabilities;
  const capabilityOverrides = normalizeCapabilityPatchRecordFromRow(record);
  if (capabilityOverrides) next.capabilityOverrides = capabilityOverrides;
  const compat = buildCompatConfigFromRow(record);
  if (compat) next.compat = compat;
  const baseline = asRecord(record.baseline);
  if (includeBaseline && Object.keys(baseline).length > 0) {
    next.baseline = canonicalizeModelConfigRow(baseline, false);
  }
  return next;
}
