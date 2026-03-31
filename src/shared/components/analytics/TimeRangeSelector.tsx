"use client";

import { cn } from "@/shared/utils/cn";
import type { UtilizationTimeRange } from "@/shared/types/utilization";

interface TimeRangeSelectorProps {
  value: UtilizationTimeRange;
  onChange: (range: UtilizationTimeRange) => void;
}

const OPTIONS: Array<{ value: UtilizationTimeRange; label: string }> = [
  { value: "1h", label: "1h" },
  { value: "24h", label: "24h" },
  { value: "7d", label: "7d" },
  { value: "30d", label: "30d" },
];

export default function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  return (
    <div
      role="tablist"
      aria-label="Select time range"
      className="inline-flex items-center gap-1 rounded-lg bg-black/5 p-1 dark:bg-white/5"
    >
      {OPTIONS.map((option) => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(option.value)}
            className={cn(
              "focus-ring h-9 rounded-md px-4 text-sm font-medium transition-all",
              isActive
                ? "bg-primary text-white shadow-sm hover:bg-primary-hover"
                : "text-text-muted hover:bg-black/5 hover:text-text-main dark:hover:bg-white/5"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
