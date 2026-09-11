"use client";

import type React from "react";
import type { SelectHTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/cn";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: ReactNode;
  options?: SelectOption[];
  placeholder?: string;
  error?: ReactNode;
  hint?: ReactNode;
  selectClassName?: string;
  /** Keep the placeholder selectable after a real value is chosen. */
  placeholderDisabled?: boolean;
}

export default function Select({
  label,
  options = [],
  value,
  onChange,
  placeholder,
  error,
  hint,
  disabled = false,
  required = false,
  className,
  selectClassName,
  placeholderDisabled = true,
  id: externalId,
  children,
  ...props
}: SelectProps) {
  const t = useTranslations("common");
  const generatedId = useId();
  const selectId = externalId || generatedId;
  const errorId = error ? `${selectId}-error` : undefined;
  const hintId = hint && !error ? `${selectId}-hint` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-text-main">
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "w-full py-2 px-3 pe-10 text-sm text-text-main",
            "glass-input rounded-control appearance-none cursor-pointer",
            "focus:ring-1 focus:ring-accent/30 focus:border-accent/50 focus:outline-none",
            "transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
            "text-[16px] sm:text-sm",
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "",
            selectClassName
          )}
          {...props}
        >
          {!children && (placeholder ?? t("selectOption")) && (
            <option value="" disabled={placeholderDisabled} className="bg-surface text-text-muted">
              {placeholder ?? t("selectOption")}
            </option>
          )}
          {!children &&
            options.map((option) => (
              <option key={option.value} value={option.value} className="bg-surface text-text-main">
                {option.label}
              </option>
            ))}
          {children}
        </select>
        <div
          className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none text-text-muted"
          aria-hidden="true"
        >
          <span className="material-symbols-outlined text-[20px]">expand_more</span>
        </div>
      </div>
      {error && (
        <p id={errorId} className="text-xs text-red-500 flex items-center gap-1" role="alert">
          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
            error
          </span>
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={hintId} className="text-xs text-text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
