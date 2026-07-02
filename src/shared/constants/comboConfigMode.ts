export const COMBO_CONFIG_MODE_SETTING_KEY = "comboConfigMode";

export const COMBO_CONFIG_MODES = ["guided", "expert"] as const;

export type ComboConfigMode = (typeof COMBO_CONFIG_MODES)[number];

export function normalizeComboConfigMode(value: unknown): ComboConfigMode {
  return value === "expert" ? "expert" : "guided";
}
