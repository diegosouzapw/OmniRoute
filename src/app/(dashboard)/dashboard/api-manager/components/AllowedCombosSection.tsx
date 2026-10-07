"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { listUnrenderableComboAccessRules } from "../apiManagerPageUtils";

export interface AllowedComboOption {
  id?: string;
  name: string;
  models?: unknown[];
}

const MODE_BUTTON_ACTIVE = "bg-primary text-white";
const MODE_BUTTON_IDLE = "text-text-muted hover:bg-black/5 dark:hover:bg-white/5";

function ComboAccessModeToggle({
  allowAllCombos,
  onAllowAll,
  onRestrict,
}: {
  allowAllCombos: boolean;
  onAllowAll: () => void;
  onRestrict: () => void;
}) {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");
  return (
    <div className="flex gap-1 p-0.5 bg-surface rounded-md">
      <button
        onClick={onAllowAll}
        className={`px-2 py-1 rounded text-xs font-medium transition-all ${
          allowAllCombos ? MODE_BUTTON_ACTIVE : MODE_BUTTON_IDLE
        }`}
      >
        {tc("all")}
      </button>
      <button
        onClick={onRestrict}
        className={`px-2 py-1 rounded text-xs font-medium transition-all ${
          allowAllCombos ? MODE_BUTTON_IDLE : MODE_BUTTON_ACTIVE
        }`}
      >
        {t("restrict")}
      </button>
    </div>
  );
}

function ComboOptionRow({
  combo,
  isSelected,
  onToggle,
}: {
  combo: AllowedComboOption;
  isSelected: boolean;
  onToggle: (comboName: string) => void;
}) {
  return (
    <button
      onClick={() => onToggle(combo.name)}
      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-left text-xs transition-all ${
        isSelected
          ? "bg-primary/10 text-primary"
          : "text-text-muted hover:bg-surface/50 hover:text-text-main"
      }`}
    >
      <div
        className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
          isSelected ? "bg-primary border-primary" : "border-border"
        }`}
      >
        {isSelected && (
          <span className="material-symbols-outlined text-white text-[10px]">check</span>
        )}
      </div>
      <span className="truncate flex-1">{combo.name}</span>
      {Array.isArray(combo.models) && (
        <span className="text-[10px] text-text-muted shrink-0">{combo.models.length} models</span>
      )}
    </button>
  );
}

/**
 * Read-only chips for allowedCombos entries the list above cannot render, so the
 * header count and the visible entries agree and the user sees what Save keeps.
 */
function PreservedComboRules({ rules }: { rules: string[] }) {
  const t = useTranslations("apiManager");
  if (rules.length === 0) return null;
  return (
    <div className="flex flex-col gap-1 pt-2 border-t border-border">
      <p className="text-[11px] text-text-muted">
        {t("preservedComboRules", { count: rules.length })}
      </p>
      <div className="flex flex-wrap gap-1">
        {rules.map((rule, index) => (
          <span
            key={`${rule}-${index}`}
            title={t("preservedComboRuleHint")}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-border bg-surface text-[11px] text-text-muted"
          >
            <span className="material-symbols-outlined text-[12px]">lock</span>
            <span data-testid="preserved-combo-rule" className="truncate max-w-[16rem]">
              {rule}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Allowed Combos picker for the API Key permissions modal. Extracted out of
 * ApiManagerPageClient.tsx (frozen god-file — see config/quality/file-size-baseline.json)
 * following the same pattern as UsageLimitSettings.tsx.
 *
 * `allowedCombos` may hold entries this list cannot render: routing-rule names
 * (`rt-*`) that `matchesComboAccessRule()` accepts via `rule === requestedModel`,
 * or combos that are no longer loaded. Those entries stay in the selection so Save
 * round-trips them, are shown read-only so the header count and the list agree,
 * and survive the "All" toggle — so switching back to Restrict cannot turn a
 * working key into deny-all (#12267).
 *
 * The modal owns the All/Restrict state: `onAllowAll` receives the entries this
 * picker cannot render (empty when every selected entry is a loaded combo, so the
 * "All" selection serialises exactly as before), and `onRestrict` leaves the
 * selection untouched.
 */
export function AllowedCombosSection({
  allCombos,
  allowAllCombos,
  selectedCombos,
  onAllowAll,
  onRestrict,
  onToggleCombo,
}: {
  allCombos: AllowedComboOption[];
  allowAllCombos: boolean;
  selectedCombos: string[];
  onAllowAll: (preservedRules: string[]) => void;
  onRestrict: () => void;
  onToggleCombo: (comboName: string) => void;
}) {
  const t = useTranslations("apiManager");

  const preservedRules = useMemo(
    () => listUnrenderableComboAccessRules(selectedCombos, allCombos),
    [selectedCombos, allCombos]
  );
  const sortedCombos = useMemo(
    () => allCombos.slice().sort((a, b) => a.name.localeCompare(b.name)),
    [allCombos]
  );

  if (allCombos.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-surface/40">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-text-main">{t("allowedCombos")}</p>
        <ComboAccessModeToggle
          allowAllCombos={allowAllCombos}
          onAllowAll={() => onAllowAll(preservedRules)}
          onRestrict={onRestrict}
        />
      </div>
      <p className="text-xs text-text-muted">
        {allowAllCombos
          ? t("allCombosAllowed")
          : t("restrictedComboCount", { count: selectedCombos.length })}
      </p>
      {!allowAllCombos && (
        <>
          <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
            {sortedCombos.map((combo) => (
              <ComboOptionRow
                key={combo.id || combo.name}
                combo={combo}
                isSelected={selectedCombos.includes(combo.name)}
                onToggle={onToggleCombo}
              />
            ))}
          </div>
          <PreservedComboRules rules={preservedRules} />
        </>
      )}
    </div>
  );
}
