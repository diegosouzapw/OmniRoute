"use client";

import { useTranslations } from "next-intl";

export type EventCategory =
  | "all"
  | "providers"
  | "combos"
  | "apikeys"
  | "settings"
  | "quota"
  | "auth"
  | "system";

interface EventTypeFilterProps {
  value: EventCategory;
  onChange: (category: EventCategory) => void;
}

const CATEGORIES: EventCategory[] = [
  "all",
  "providers",
  "combos",
  "apikeys",
  "settings",
  "quota",
  "auth",
  "system",
];

const CATEGORY_PREFIXES: Record<EventCategory, string[]> = {
  all: [],
  providers: ["provider."],
  combos: ["combo."],
  apikeys: ["apikey."],
  settings: ["setting."],
  quota: ["quota.", "budget."],
  auth: ["auth."],
  system: ["update.", "deploy.", "skill.", "cloud_agent.", "mcp.", "webhook."],
};

export function matchesCategory(action: string, category: EventCategory): boolean {
  if (category === "all") return true;
  const prefixes = CATEGORY_PREFIXES[category];
  return prefixes.some((prefix) => action.startsWith(prefix));
}

export default function EventTypeFilter({ value, onChange }: EventTypeFilterProps) {
  const t = useTranslations("activity");

  const labelKey: Record<EventCategory, string> = {
    all: "filterAll",
    providers: "filterProviders",
    combos: "filterCombos",
    apikeys: "filterApiKeys",
    settings: "filterSettings",
    quota: "filterQuota",
    auth: "filterAuth",
    system: "filterSystem",
  };

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter by event type"
    >
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          aria-pressed={value === cat}
          className={[
            "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
            value === cat
              ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
              : "bg-[var(--color-surface)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:bg-[var(--color-bg-alt)]",
          ].join(" ")}
        >
          {t(labelKey[cat])}
        </button>
      ))}
    </div>
  );
}
