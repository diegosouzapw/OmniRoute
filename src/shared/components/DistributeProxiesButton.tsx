"use client";

import { useState, useCallback, useRef, useEffect } from "react";

type ButtonState = "idle" | "distributing" | "complete";

interface DistributeProxiesButtonProps {
  /** Async callback that performs the actual proxy distribution */
  onDistribute: () => Promise<void>;
  /** Whether the button should be disabled (e.g., during batch testing) */
  disabled?: boolean;
  /** Button label override */
  label?: string;
  /** Size variant */
  size?: "sm" | "md";
}

export default function DistributeProxiesButton({
  onDistribute,
  disabled = false,
  label = "Distribute Proxies",
  size = "md",
}: DistributeProxiesButtonProps) {
  const [state, setState] = useState<ButtonState>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = useCallback(async () => {
    if (disabled || state === "distributing") return;
    setState("distributing");
    try {
      await onDistribute();
      setState("complete");
      timerRef.current = setTimeout(() => setState("idle"), 1500);
    } catch {
      setState("idle");
    }
  }, [onDistribute, disabled, state]);

  const isDisabled = disabled || state === "distributing";

  const sizeClasses =
    size === "sm" ? "px-2 py-1 text-[11px]" : "px-3 py-1.5 text-xs";

  const stateClasses =
    state === "distributing"
      ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
      : state === "complete"
        ? "bg-green-500/15 border-green-500/40 text-green-500"
        : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40";

  const icon = state === "distributing" ? "sync" : state === "complete" ? "check" : "swap_horiz";
  const displayLabel = state === "distributing" ? "Distributing..." : state === "complete" ? "Complete" : label;

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`flex items-center gap-1.5 rounded-lg font-medium border transition-colors ${sizeClasses} ${stateClasses}`}
      title={displayLabel}
      aria-label={displayLabel}
    >
      <span className={`material-symbols-outlined text-[14px] ${state === "distributing" ? "animate-spin" : ""}`}>
        {icon}
      </span>
      {displayLabel}
    </button>
  );
}
