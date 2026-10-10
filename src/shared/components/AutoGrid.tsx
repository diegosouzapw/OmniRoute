"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface AutoGridProps {
  children: ReactNode;
  /** Minimum card width from `sm` up; columns fill the row with equal widths. */
  min?: string;
  className?: string;
}

/**
 * Symmetric card grid: one column on phones, then as many equal columns as fit
 * (`repeat(auto-fill, minmax(min, 1fr))`); cards in a row share the same height.
 */
export default function AutoGrid({ children, min = "260px", className }: AutoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3 sm:[grid-template-columns:repeat(auto-fill,minmax(var(--auto-grid-min),1fr))]",
        className
      )}
      style={{ "--auto-grid-min": min } as CSSProperties}
    >
      {children}
    </div>
  );
}
