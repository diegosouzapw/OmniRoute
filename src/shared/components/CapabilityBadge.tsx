import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface CapabilityBadgeProps {
  /** Material Symbols name shown before the label (replaces the old emoji prefixes). */
  icon?: string;
  /** Tone classes, e.g. "bg-pink-500/15 text-pink-400". */
  className?: string;
  title?: string;
  children: ReactNode;
}

/** Small pill describing a model capability (vision, images, audio…). */
export default function CapabilityBadge({
  icon,
  className,
  title,
  children,
}: CapabilityBadgeProps) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center gap-0.5 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[10px] font-medium leading-none",
        className
      )}
    >
      {icon && (
        <span className="material-symbols-outlined text-[12px] leading-none" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
