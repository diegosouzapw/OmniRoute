"use client";

import { useTranslations } from "next-intl";

interface FeatureFlagCardProps {
  flag: {
    key: string;
    label: string;
    description: string;
    category: "security" | "network" | "policies" | "runtime" | "cli" | "health";
    type: "boolean" | "enum";
    enumValues?: string[] | null;
    effectiveValue: string;
    source: "db" | "env" | "default";
    requiresRestart: boolean;
    warningLevel?: "info" | "caution" | "danger";
  };
  onToggle: (key: string, newValue: string) => void;
  onReset: (key: string) => void;
  saving?: boolean;
}

const CATEGORY_STYLES: Record<
  FeatureFlagCardProps["flag"]["category"],
  { bg: string; border: string; text: string }
> = {
  security: {
    bg: "bg-red-50 dark:bg-red-500/15",
    border: "border-red-200 dark:border-red-500/20",
    text: "text-red-700 dark:text-red-300",
  },
  network: {
    bg: "bg-sky-50 dark:bg-blue-500/15",
    border: "border-sky-200 dark:border-blue-500/20",
    text: "text-sky-700 dark:text-blue-300",
  },
  policies: {
    bg: "bg-amber-50 dark:bg-amber-500/15",
    border: "border-amber-200 dark:border-amber-500/20",
    text: "text-amber-700 dark:text-amber-300",
  },
  runtime: {
    bg: "bg-violet-50 dark:bg-purple-500/15",
    border: "border-violet-200 dark:border-purple-500/20",
    text: "text-violet-700 dark:text-purple-300",
  },
  cli: {
    bg: "bg-emerald-50 dark:bg-green-500/15",
    border: "border-emerald-200 dark:border-green-500/20",
    text: "text-emerald-700 dark:text-green-300",
  },
  health: {
    bg: "bg-cyan-50 dark:bg-cyan-500/15",
    border: "border-cyan-200 dark:border-cyan-500/20",
    text: "text-cyan-700 dark:text-cyan-300",
  },
};

const SOURCE_STYLES: Record<
  FeatureFlagCardProps["flag"]["source"],
  { bg: string; border: string; text: string; label: string }
> = {
  db: {
    bg: "bg-sky-50 dark:bg-blue-500/20",
    border: "border-sky-200 dark:border-blue-500/30",
    text: "text-sky-700 dark:text-blue-300",
    label: "DB",
  },
  env: {
    bg: "bg-amber-50 dark:bg-amber-500/20",
    border: "border-amber-200 dark:border-amber-500/30",
    text: "text-amber-700 dark:text-amber-300",
    label: "ENV",
  },
  default: {
    bg: "bg-slate-100 dark:bg-slate-500/20",
    border: "border-slate-200 dark:border-slate-500/30",
    text: "text-slate-600 dark:text-slate-300",
    label: "DEF",
  },
};

function isEnabled(value: string): boolean {
  return value === "true" || value === "1" || value === "yes";
}

function Spinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-border border-t-text-primary"
      aria-hidden="true"
    />
  );
}

export default function FeatureFlagCard({
  flag,
  onToggle,
  onReset,
  saving = false,
}: FeatureFlagCardProps) {
  const t = useTranslations("featureFlags");
  const enabled = flag.type === "boolean" ? isEnabled(flag.effectiveValue) : false;
  const category = CATEGORY_STYLES[flag.category];
  const source = SOURCE_STYLES[flag.source];

  const cardBorder =
    flag.type === "boolean" && enabled
      ? "border-emerald-300 shadow-emerald-500/10 dark:border-green-500/30"
      : "border-border";

  return (
    <div
      role="group"
      aria-label={flag.label}
      className={`rounded-xl border bg-card p-4 shadow-soft transition-all duration-200 hover:-translate-y-px hover:border-black/15 hover:bg-bg-subtle/60 hover:shadow-elevated dark:hover:border-white/15 dark:hover:bg-surface ${cardBorder}`}
    >
      {/* Top row: category badge + toggle/select */}
      <div className="flex items-center justify-between mb-3">
        <span
          aria-label={t("categoryLabel", { category: t(`categories.${flag.category}`) })}
          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${category.bg} ${category.border} ${category.text}`}
        >
          {t(`categories.${flag.category}`)}
        </span>

        <div className="flex items-center gap-2">
          {saving && <Spinner />}

          {flag.type === "boolean" ? (
            <button
              role="switch"
              aria-checked={enabled}
              aria-label={flag.label}
              disabled={saving}
              onClick={() => onToggle(flag.key, enabled ? "false" : "true")}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 ${
                enabled ? "bg-emerald-500" : "bg-slate-300 dark:bg-white/20"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                  enabled ? "translate-x-4" : "translate-x-0.5"
                }`}
                aria-hidden="true"
              />
            </button>
          ) : (
            <select
              aria-label={flag.label}
              disabled={saving}
              value={flag.effectiveValue}
              onChange={(e) => onToggle(flag.key, e.target.value)}
              className="rounded-md border border-border bg-bg-subtle px-2 py-0.5 text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {(flag.enumValues ?? []).map((val) => (
                <option key={val} value={val} className="bg-card text-text-primary">
                  {t.has(`enumValues.${val}`) ? t(`enumValues.${val}`) : val}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Flag key + warning icon */}
      <div className="flex items-center gap-2 mb-1.5">
        <span className="flex-1 truncate font-mono text-xs font-semibold text-text-primary">
          {flag.key}
        </span>

        {flag.warningLevel === "caution" && (
          <span className="text-sm text-amber-500 dark:text-amber-300" aria-label={t("caution")}>
            ⚠️
          </span>
        )}
        {flag.warningLevel === "danger" && (
          <span className="text-sm animate-pulse" aria-label={t("danger")}>
            🔴
          </span>
        )}
        {flag.requiresRestart && (
          <span
            className="rounded border border-slate-300 bg-slate-50 px-1 text-[10px] text-slate-600 dark:border-slate-400/30 dark:bg-transparent dark:text-slate-300"
            title={t("requiresRestart")}
            aria-label={t("requiresRestart")}
          >
            restart
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mb-3 line-clamp-2 text-xs text-text-muted">{flag.description}</p>

      {/* Bottom row: source badge + reset button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-text-muted">{t("source")}:</span>
          <span
            className={`inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-xs font-medium ${source.bg} ${source.border} ${source.text}`}
          >
            {source.label}
          </span>
        </div>

        {flag.source === "db" && (
          <button
            aria-label={t("resetFlag", { label: flag.label })}
            disabled={saving}
            onClick={() => onReset(flag.key)}
            className="inline-flex items-center gap-1 rounded text-xs text-text-muted transition-colors hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              refresh
            </span>
            {t("reset")}
          </button>
        )}
      </div>
    </div>
  );
}
