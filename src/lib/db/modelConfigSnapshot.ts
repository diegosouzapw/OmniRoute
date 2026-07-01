import type {
  ProviderModelCapabilities,
  ProviderModelCapabilitiesPatch,
  ProviderModelConfig,
} from "@/shared/types/modelConfig";

import { getDbInstance } from "./core";
import {
  applyCapabilityPatchDeletes,
  getModelCompatOverrides,
  modelCapabilitiesHasEntries,
  normalizeModelCapabilities,
  normalizeModelCapabilitiesFromRow,
} from "./modelCompat";
import { buildCompatConfigFromRow, canonicalizeModelConfigRow } from "./modelConfigRows";

type JsonRecord = Record<string, unknown>;
type ModelCompatOverrideRow = ReturnType<typeof getModelCompatOverrides>[number];

export type ProviderModelConfigSnapshot = {
  source: "custom" | "synced" | "override" | null;
  capabilities?: ProviderModelCapabilities;
  capabilityOverrides?: ProviderModelCapabilitiesPatch;
  compat?: ProviderModelConfig["compat"];
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function parseJsonArray(value: string | null | undefined): unknown[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function parseJsonRecordArray(value: string | null | undefined): JsonRecord[] {
  return parseJsonArray(value).filter((entry): entry is JsonRecord =>
    Boolean(entry && typeof entry === "object" && !Array.isArray(entry))
  );
}

function getKeyValue(row: unknown): { value: string | null } {
  const record = asRecord(row);
  return { value: typeof record.value === "string" ? record.value : null };
}

export function getCustomModelRow(providerId: string, modelId: string): JsonRecord | null {
  const row = getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = 'customModels' AND key = ?")
    .get(providerId);
  return parseJsonRecordArray(getKeyValue(row).value).find((model) => model.id === modelId) ?? null;
}

function getStoredModelId(record: JsonRecord): string | null {
  for (const key of ["id", "name", "model"]) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function normalizeStoredSyncedModel(record: JsonRecord): JsonRecord | null {
  const id = getStoredModelId(record);
  if (!id) return null;
  const name =
    (typeof record.name === "string" && record.name.trim()) ||
    (typeof record.displayName === "string" && record.displayName.trim()) ||
    (typeof record.model === "string" && record.model.trim()) ||
    id;
  return canonicalizeModelConfigRow({ ...record, id, name, source: "imported" }, false);
}

export function getSyncedAvailableModelRow(providerId: string, modelId: string): JsonRecord | null {
  const rows = getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = 'syncedAvailableModels' AND key LIKE ?")
    .all(`${providerId}:%`);
  for (const row of rows) {
    for (const record of parseJsonRecordArray(getKeyValue(row).value)) {
      const normalized = normalizeStoredSyncedModel(record);
      if (normalized?.id === modelId) return normalized;
    }
  }
  return null;
}

function mergeSnapshotCapabilities(
  base: JsonRecord | null,
  rawOverrideCapabilities: JsonRecord
): ProviderModelCapabilities {
  const baseCapabilities = base ? normalizeModelCapabilitiesFromRow(base) : undefined;
  const snapshotOverrideCapabilities = { ...rawOverrideCapabilities };
  const capabilities = applyCapabilityPatchDeletes(
    { ...(baseCapabilities || {}) },
    snapshotOverrideCapabilities
  );
  const overrideCapabilities = normalizeModelCapabilities(snapshotOverrideCapabilities);
  if (overrideCapabilities) Object.assign(capabilities, overrideCapabilities);
  return capabilities;
}

function getSnapshotSource(
  custom: JsonRecord | null,
  synced: JsonRecord | null,
  override: ModelCompatOverrideRow | undefined
): ProviderModelConfigSnapshot["source"] {
  if (custom) return "custom";
  if (synced) return "synced";
  if (override) return "override";
  return null;
}

export function getProviderModelConfigSnapshot(
  providerId: string,
  modelId: string
): ProviderModelConfigSnapshot {
  const custom = getCustomModelRow(providerId, modelId);
  const override = getModelCompatOverrides(providerId).find((entry) => entry.id === modelId);
  const synced = custom ? null : getSyncedAvailableModelRow(providerId, modelId);
  const base = custom || synced;
  const rawOverrideCapabilities = {
    ...asRecord(base?.capabilityOverrides),
    ...asRecord(override?.capabilities),
  };
  const capabilities = mergeSnapshotCapabilities(base, rawOverrideCapabilities);
  const compat = {
    ...(base ? buildCompatConfigFromRow(base) : {}),
    ...(override?.targetFormat ? { targetFormat: override.targetFormat } : {}),
    ...(Array.isArray(override?.unsupportedParams)
      ? { unsupportedParams: override.unsupportedParams }
      : {}),
  };

  return {
    source: getSnapshotSource(custom, synced, override),
    ...(modelCapabilitiesHasEntries(capabilities) ? { capabilities } : {}),
    ...(Object.keys(rawOverrideCapabilities).length > 0
      ? { capabilityOverrides: rawOverrideCapabilities as ProviderModelCapabilitiesPatch }
      : {}),
    ...(Object.keys(compat).length > 0 ? { compat: compat as ProviderModelConfig["compat"] } : {}),
  };
}
