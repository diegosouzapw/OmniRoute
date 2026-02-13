"use client";

import { cn } from "@/shared/utils/cn";

export default function Toggle({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  size = "md",
  className,
}) {
  const sizes = {
    sm: {
      track: "w-8 h-4",
      thumb: "size-3",
      translate: "translate-x-4",
    },
    md: {
      track: "w-11 h-6",
      thumb: "size-5",
      translate: "translate-x-5",
    },
    lg: {
      track: "w-14 h-7",
      thumb: "size-6",
      translate: "translate-x-7",
    },
  };

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={!label ? description || "Toggle" : undefined}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer rounded-full",
          "transition-colors duration-200 ease-in-out",
          "focus:outline-none focus:ring-1 focus:ring-primary/30",
          checked ? "bg-primary" : "bg-black/10 dark:bg-white/20",
          sizes[size].track,
          disabled && "cursor-not-allowed"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block rounded-full bg-white shadow-sm",
            "transform transition duration-200 ease-in-out",
            checked ? sizes[size].translate : "translate-x-0.5",
            sizes[size].thumb,
            "mt-0.5"
          )}
        />
      </button>
      {(label || description) && (
        <div className="flex flex-col">
          {label && <span className="text-sm font-medium text-text-main">{label}</span>}
          {description && <span className="text-xs text-text-muted">{description}</span>}
        </div>
      )}
    </div>
  );
}
