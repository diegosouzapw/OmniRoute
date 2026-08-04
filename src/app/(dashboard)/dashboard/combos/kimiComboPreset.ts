// Kimi Coding combo preset — pure data, split out of KimiComboPresetCard.tsx
// so it can be unit-tested with node:test (no DOM/next-intl needed), mirroring
// kimiSponsorBanner.ts.
//
// There is no generic preset/template picker in the combo builder today —
// AUTO_COMBO_TEMPLATES (src/domain/assessment/types.ts, surfaced by
// AutoComboCatalog.tsx) is a different mechanism: category/tier-scored
// zero-config routing, not a named provider+model pin, so it cannot express
// "kimi-k3 primary, kimi-coding/kimi-web fallback". KimiComboPresetCard.tsx is
// the minimal idiomatic addition instead: a one-click "create" card that POSTs
// this exact payload via the same handleCreate() path as every other combo.
//
// Model ids differ per provider even for the "same" underlying model:
//  - moonshot (Moonshot API):         "kimi-k3"
//  - kimi-coding (OAuth coding plan): "k3"
//  - kimi-web (web session):          "k3"
// See open-sse/config/providers/registry/{moonshot,kimi/coding,kimi/web}.
export const KIMI_CODING_PRESET_NAME = "Kimi Coding";

export interface KimiComboPresetModel {
  provider: string;
  model: string;
  weight: number;
}

export interface KimiComboPreset {
  name: string;
  strategy: "priority";
  models: KimiComboPresetModel[];
}

export const KIMI_CODING_PRESET: KimiComboPreset = {
  name: KIMI_CODING_PRESET_NAME,
  strategy: "priority",
  models: [
    { provider: "moonshot", model: "kimi-k3", weight: 100 },
    { provider: "kimi-coding", model: "k3", weight: 100 },
    { provider: "kimi-web", model: "k3", weight: 100 },
  ],
};

/** True when `combos` (as returned by GET /api/combos) already has the Kimi Coding preset. */
export function hasKimiCodingPreset(combos: Array<{ name?: string | null }>): boolean {
  return combos.some((combo) => combo?.name === KIMI_CODING_PRESET_NAME);
}
