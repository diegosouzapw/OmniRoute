"use client";

import { cn } from "@/shared/utils/cn";

interface SegmentedOption {
  value: string;
  label: string;
  icon?: string;
}

interface SegmentedControlProps {
  options?: SegmentedOption[];
  value?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  "aria-label"?: string;
}

export default function SegmentedControl({
  options = [],
  value,
  onChange,
  size = "md",
  className,
  "aria-label": ariaLabel,
}: SegmentedControlProps) {
  const sizes = {
    sm: "h-7 text-xs",
    md: "h-9 text-sm",
    lg: "h-11 text-base",
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        // Phones: full width, segments share the line and wrap; from sm up, natural width.
        "flex w-full flex-wrap items-center p-1 rounded-lg sm:inline-flex sm:w-auto",
        "bg-black/5 dark:bg-white/5",
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          role="tab"
          aria-selected={value === option.value}
          tabIndex={value === option.value ? 0 : -1}
          onClick={() => onChange(option.value)}
          className={cn(
            "grow px-3 rounded-md font-medium transition-all whitespace-nowrap flex items-center justify-center sm:grow-0 sm:px-4",
            sizes[size],
            value === option.value
              ? "bg-white dark:bg-white/10 text-text-main shadow-sm"
              : "text-text-muted hover:text-text-main"
          )}
        >
          {option.icon && (
            <span className="material-symbols-outlined text-[16px] mr-1.5" aria-hidden="true">
              {option.icon}
            </span>
          )}
          {option.label}
        </button>
      ))}
    </div>
  );
}
