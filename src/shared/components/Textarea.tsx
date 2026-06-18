"use client";

import { cn } from "@/shared/utils/cn";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

/**
 * Textarea — token-driven multiline input mirroring the Input primitive (same border,
 * focus ring and control radius). Replaces ad-hoc raw `<textarea>` styling at call sites.
 */
export default function Textarea({ className, error = false, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full py-2 px-3 text-sm text-text-main",
        "bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-control",
        "placeholder-text-muted/60",
        "focus:ring-1 focus:ring-primary/30 focus:border-primary/50 focus:outline-none",
        "transition-all disabled:opacity-50 disabled:cursor-not-allowed",
        "text-[16px] sm:text-sm",
        error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "",
        className
      )}
      {...props}
    />
  );
}
