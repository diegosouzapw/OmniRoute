"use client";

import { cn } from "@/shared/utils/cn";

export interface FilterPillOption {
  value: string;
  label: string;
  icon?: string;
  count?: number;
}

interface FilterPillsProps {
  options: FilterPillOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  "aria-label"?: string;
}

/**
 * Filter chips that wrap instead of overflowing. On narrow screens each line is
 * stretched to the full width (pills grow), from `sm` up they keep their natural size.
 */
export default function FilterPills({
  options,
  value,
  onChange,
  className,
  "aria-label": ariaLabel,
}: FilterPillsProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn("flex w-full flex-wrap items-center gap-1.5 sm:w-auto", className)}
    >
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "inline-flex grow items-center justify-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium transition-colors sm:grow-0",
              active ? "bg-primary text-white" : "bg-muted/60 text-text-muted hover:bg-muted"
            )}
          >
            {opt.icon && (
              <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                {opt.icon}
              </span>
            )}
            {opt.label}
            {opt.count !== undefined && (
              <span className={active ? "text-white/80" : "text-text-muted/70"}>{opt.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
