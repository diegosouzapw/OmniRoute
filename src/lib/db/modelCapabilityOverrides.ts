import { getDbInstance } from "./core";

export type ModelCapabilityOverrideKey = "max_token";

export interface ModelCapabilityOverride {
  provider: string;
  modelId: string;
  target: string;
  key: ModelCapabilityOverrideKey;
  value: number;
  refreshedAt: string;
}

interface OverrideRow {
  provider: string;
  model_id: string;
  override_key: string;
  override_value: string;
  refreshed_at: string;
}

function isSupportedKey(value: unknown): value is ModelCapabilityOverrideKey {
  return value === "max_token";
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

export function parseModelOverrideTarget(
  target: unknown
): { provider: string; modelId: string } | null {
  const raw = typeof target === "string" ? target.trim() : "";
  const slashIndex = raw.indexOf("/");
  if (slashIndex <= 0 || slashIndex === raw.length - 1) return null;

  const provider = raw.slice(0, slashIndex).trim();
  const modelId = raw.slice(slashIndex + 1).trim();
  if (!provider || !modelId) return null;
  return { provider, modelId };
}

function toOverride(row: OverrideRow): ModelCapabilityOverride | null {
  if (!isSupportedKey(row.override_key)) return null;

  let parsedValue: unknown;
  try {
    parsedValue = JSON.parse(row.override_value);
  } catch {
    return null;
  }

  if (!isPositiveInteger(parsedValue)) return null;

  return {
    provider: row.provider,
    modelId: row.model_id,
    target: `${row.provider}/${row.model_id}`,
    key: row.override_key,
    value: parsedValue,
    refreshedAt: row.refreshed_at,
  };
}

export function getModelCapabilityOverride(
  provider: string | null | undefined,
  modelId: string | null | undefined,
  key: ModelCapabilityOverrideKey
): number | null {
  const target = parseModelOverrideTarget(`${provider || ""}/${modelId || ""}`);
  if (!target || !isSupportedKey(key)) return null;

  try {
    const row = getDbInstance()
      .prepare(
        "SELECT provider, model_id, override_key, override_value, refreshed_at " +
          "FROM model_capability_overrides WHERE provider = ? AND model_id = ? AND override_key = ?"
      )
      .get(target.provider, target.modelId, key) as OverrideRow | undefined;
    const override = row ? toOverride(row) : null;
    return override?.value ?? null;
  } catch {
    return null;
  }
}

export function setModelCapabilityOverride(
  target: string,
  key: ModelCapabilityOverrideKey,
  value: number
): boolean {
  const parsedTarget = parseModelOverrideTarget(target);
  if (!parsedTarget || !isSupportedKey(key) || !isPositiveInteger(value)) return false;

  getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO model_capability_overrides " +
        "(provider, model_id, override_key, override_value, refreshed_at) " +
        "VALUES (?, ?, ?, ?, datetime('now'))"
    )
    .run(parsedTarget.provider, parsedTarget.modelId, key, JSON.stringify(value));
  return true;
}

export function removeModelCapabilityOverride(
  target: string,
  key: ModelCapabilityOverrideKey
): boolean {
  const parsedTarget = parseModelOverrideTarget(target);
  if (!parsedTarget || !isSupportedKey(key)) return false;

  const info = getDbInstance()
    .prepare(
      "DELETE FROM model_capability_overrides " +
        "WHERE provider = ? AND model_id = ? AND override_key = ?"
    )
    .run(parsedTarget.provider, parsedTarget.modelId, key);
  return info.changes > 0;
}

export function listModelCapabilityOverrides(): ModelCapabilityOverride[] {
  try {
    const rows = getDbInstance()
      .prepare(
        "SELECT provider, model_id, override_key, override_value, refreshed_at " +
          "FROM model_capability_overrides ORDER BY refreshed_at DESC"
      )
      .all() as OverrideRow[];
    return rows.map(toOverride).filter((entry): entry is ModelCapabilityOverride => entry !== null);
  } catch {
    return [];
  }
}
