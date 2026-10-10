"use client";

import { cn } from "@/shared/utils/cn";

interface ReorderControlProps {
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  upLabel?: string;
  downLabel?: string;
  className?: string;
}

/** Compact up/down pair used to change an item's priority in a list. */
export default function ReorderControl({
  onMoveUp,
  onMoveDown,
  isFirst = false,
  isLast = false,
  upLabel = "Move up",
  downLabel = "Move down",
  className,
}: ReorderControlProps) {
  const btn = (disabled: boolean) =>
    cn(
      "flex size-5 items-center justify-center rounded",
      disabled
        ? "cursor-not-allowed text-text-muted/30"
        : "text-text-muted hover:bg-sidebar hover:text-primary"
    );
  return (
    <div className={cn("flex shrink-0 flex-col", className)}>
      <button
        type="button"
        onClick={onMoveUp}
        disabled={isFirst}
        aria-label={upLabel}
        className={btn(isFirst)}
      >
        <span className="material-symbols-outlined text-[18px] leading-none">
          keyboard_arrow_up
        </span>
      </button>
      <button
        type="button"
        onClick={onMoveDown}
        disabled={isLast}
        aria-label={downLabel}
        className={btn(isLast)}
      >
        <span className="material-symbols-outlined text-[18px] leading-none">
          keyboard_arrow_down
        </span>
      </button>
    </div>
  );
}
