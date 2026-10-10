"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface ActionBarProps {
  children: ReactNode;
  /** Alignment from `sm` up; on phones the buttons always fill the line. */
  align?: "start" | "end";
  className?: string;
}

/**
 * Row of action buttons. On narrow screens the buttons grow to fill each line and
 * wrap; from `sm` up the bar keeps its natural width.
 */
export default function ActionBar({ children, align = "end", className }: ActionBarProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-center gap-2 sm:w-auto sm:shrink-0 [&>*]:grow [&>*]:justify-center sm:[&>*]:grow-0",
        align === "end" ? "sm:justify-end" : "sm:justify-start",
        className
      )}
    >
      {children}
    </div>
  );
}
