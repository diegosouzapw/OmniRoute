"use client";
import type { SortMethod } from "@/lib/combos/comboSort";

function getI18nOrFallback(
  t: ((k: string, f: string) => string) & { has?: (k: string) => boolean },
  key: string,
  fallback: string
): string {
  try {
    if (typeof t.has === "function" && !t.has(key)) return fallback;
  } catch {}
  const out = t(key, fallback);
  return typeof out === "string" && out.length > 0 ? out : fallback;
}

const OPTIONS: { value: SortMethod; key: string; fallback: string }[] = [
  { value: "manual", key: "combo.sort.method.manual", fallback: "Manual" },
  { value: "provider", key: "combo.sort.method.provider", fallback: "Provider" },
  { value: "score", key: "combo.sort.method.score", fallback: "Score" },
  { value: "name", key: "combo.sort.method.name", fallback: "Name" },
];

export function ComboSortSelect({
  value,
  onChange,
  t,
}: {
  value: SortMethod;
  onChange: (m: SortMethod) => void;
  t: ((k: string, f: string) => string) & { has?: (k: string) => boolean };
}) {
  const scoreHint = getI18nOrFallback(
    t,
    "combo.sort.scoreHint",
    "Score ranking applies to free providers only; others stay in place."
  );
  const isScore = value === "score";
  return (
    <label>
      {getI18nOrFallback(t, "combo.sort.label", "Sort by")}
      <select
        aria-label={getI18nOrFallback(t, "combo.sort.label", "Sort by")}
        {...(isScore ? { "aria-describedby": "combo-sort-score-hint", title: scoreHint } : {})}
        value={value}
        onChange={(e) => onChange(e.target.value as SortMethod)}
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {getI18nOrFallback(t, o.key, o.fallback)}
          </option>
        ))}
      </select>
      {isScore ? (
        <p id="combo-sort-score-hint" className="mt-1 text-[10px] text-text-muted">
          {scoreHint}
        </p>
      ) : null}
    </label>
  );
}
