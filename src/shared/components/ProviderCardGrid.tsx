"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

/** Grid of provider cards: one column on phones, two from 480px, then 3 and 4. */
export default function ProviderCardGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  );
}
