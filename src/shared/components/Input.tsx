"use client";

import { useId, useState, useCallback } from "react";
import { cn } from "@/shared/utils/cn";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: React.ReactNode;
  error?: React.ReactNode;
  hint?: React.ReactNode;
  icon?: string;
  inputClassName?: string;
}

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  hint,
  icon,
  disabled = false,
  required = false,
  className,
  inputClassName,
  id: externalId,
  onKeyDown: externalOnKeyDown,
  onKeyUp: externalOnKeyUp,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = externalId || generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint && !error ? `${inputId}-hint` : undefined;
  const capsLockId = `${inputId}-capslock`;
  const isPassword = type === "password";
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const detectCapsLock = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isPassword) {
        setCapsLockOn(e.getModifierState("CapsLock"));
      }
    },
    [isPassword]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      detectCapsLock(e);
      externalOnKeyDown?.(e);
    },
    [detectCapsLock, externalOnKeyDown]
  );

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      detectCapsLock(e);
      externalOnKeyUp?.(e);
    },
    [detectCapsLock, externalOnKeyUp]
  );

  const showCapsLock = isPassword && capsLockOn && inputFocused;
  const describedBy =
    [errorId, showCapsLock ? capsLockId : undefined, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-text-main">
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-muted">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              {icon}
            </span>
          </div>
        )}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onFocus={(e) => {
            setInputFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setInputFocused(false);
            setCapsLockOn(false);
            props.onBlur?.(e);
          }}
          className={cn(
            "w-full py-2 px-3 text-sm text-text-main",
            "bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-control",
            "placeholder-text-muted/60",
            "focus:ring-1 focus:ring-accent/30 focus:border-accent/50 focus:outline-none",
            "transition-all shadow-inner disabled:opacity-50 disabled:cursor-not-allowed",
            // iOS zoom fix
            "text-[16px] sm:text-sm",
            icon && "pl-10",
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "",
            inputClassName
          )}
          {...props}
        />
      </div>
      {showCapsLock && (
        <p
          id={capsLockId}
          className="text-xs text-amber-500 dark:text-amber-400 flex items-center gap-1 animate-in fade-in duration-200"
          role="status"
          aria-live="polite"
        >
          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
            keyboard_capslock
          </span>
          Caps Lock is on
        </p>
      )}
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
