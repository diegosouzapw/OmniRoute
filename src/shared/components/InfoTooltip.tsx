"use client";

import { cn } from "@/shared/utils/cn";

interface InfoTooltipProps {
  text: string;
  className?: string;
}

export default function InfoTooltip({ text, className }: InfoTooltipProps) {
  return (
    <span className={cn("relative inline-flex group", className)}>
      <span
        className="material-symbols-outlined text-[16px] text-text-muted cursor-help"
        aria-label={text}
      >
        info
      </span>
      <span
        role="tooltip"
        className={cn(
          "absolute bottom-full left-1/2 -translate-x-1/2 mb-2",
          "px-2.5 py-1.5 text-xs font-medium text-white bg-gray-900/95 rounded-md shadow-lg",
          "whitespace-nowrap pointer-events-none",
          "border border-white/10",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-150",
          "z-50"
        )}
      >
        {text}
      </span>
    </span>
  );
}
