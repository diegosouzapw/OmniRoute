"use client";

/**
 * RequestCountDateFilter — title + single-date filter row for #4009's
 * request-count-by-provider-date table. Split out to keep the container
 * component under the max-lines-per-function complexity gate.
 */

interface RequestCountDateFilterProps {
  title: string;
  dateLabel: string;
  value: string;
  onChange: (value: string) => void;
}

export default function RequestCountDateFilter({
  title,
  dateLabel,
  value,
  onChange,
}: RequestCountDateFilterProps) {
  return (
    <div className="p-4 border-b border-border flex items-center justify-between flex-wrap gap-2">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">{title}</h3>
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={dateLabel}
          className="px-2 py-1 rounded-md text-xs bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5"
        />
        {value && (
          <button onClick={() => onChange("")} className="text-xs text-text-muted hover:text-text-main">
            <span className="material-symbols-outlined text-[14px]">close</span>
          </button>
        )}
      </div>
    </div>
  );
}
