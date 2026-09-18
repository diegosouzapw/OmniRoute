"use client";

import { useTranslations } from "next-intl";

export type CatalogScope = "all" | "combos" | "models";

const OPTIONS: Array<{ value: CatalogScope; icon: string; labelKey: string }> = [
  { value: "all", icon: "list", labelKey: "catalogScopeAll" },
  { value: "combos", icon: "hub", labelKey: "catalogScopeCombos" },
  { value: "models", icon: "smart_toy", labelKey: "catalogScopeModels" },
];

/**
 * What a key's `/v1/models` advertises: combos, provider models, or both.
 *
 * A listing preference, not an access control — narrowing it never changes what
 * the key may dispatch. Useful for a key driving a client that builds its model
 * picker from the catalog and should only see curated combos.
 */
export function ApiKeyCatalogScopeSelect({
  value,
  onChange,
}: {
  value: CatalogScope;
  onChange: (next: CatalogScope) => void;
}) {
  const tSettings = useTranslations("settings");

  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-surface/40">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{tSettings("catalogScopeTitle")}</p>
        <p className="text-xs text-text-muted">{tSettings("catalogScopeDesc")}</p>
      </div>
      <div className="flex items-center gap-1 p-1 rounded-lg bg-black/5 dark:bg-white/5">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={value === opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              value === opt.value
                ? "bg-primary text-white"
                : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">{opt.icon}</span>
            {tSettings(opt.labelKey)}
          </button>
        ))}
      </div>
    </div>
  );
}
