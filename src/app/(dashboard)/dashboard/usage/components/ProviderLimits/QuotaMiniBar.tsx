"use client";

import { cn } from "@/shared/utils/cn";
import { getBarColor } from "./utils";

interface Props {
  /** Remaining percentage (0-100). Lower = worse. */
  percent: number;
  /** Visual height — h-1 (4px, default) or h-1.5 (6px). */
  size?: "xs" | "sm";
  className?: string;
}

export default function QuotaMiniBar({ percent, size = "xs", className }: Props) {
  const colors = getBarColor(percent);
  const heightCls = size === "sm" ? "h-1.5" : "h-1";
  return (
    <div
      className={cn(
        "rounded-full overflow-hidden bg-black/[0.06] dark:bg-white/[0.06]",
        heightCls,
        className
      )}
    >
      <div
        className="h-full rounded-full transition-[width] duration-300 ease-out"
        style={{
          width: `${Math.min(100, Math.max(0, percent))}%`,
          background: colors.bar,
        }}
      />
    </div>
  );
}
