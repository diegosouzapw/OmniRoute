"use client";

/**
 * Tooltip — Lightweight CSS-only Tooltip Component
 *
 * Uses the `title` attribute enhanced with custom CSS positioning.
 * Renders a positioned tooltip on hover with smooth fade-in.
 *
 * @module shared/components/Tooltip
 */

import { useState, useRef, useCallback } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content?: string;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export default function Tooltip({ children, content, position = "top", className = "" }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(true), 200);
  }, []);

  const hide = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <span
      className={`relative inline-flex ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && content && (
        <span
          role="tooltip"
          className={`absolute z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-gray-900/95 rounded-md shadow-lg whitespace-nowrap pointer-events-none animate-in fade-in duration-150 border border-white/10 ${positionClasses[position] || positionClasses.top}`}
        >
          {content}
        </span>
      )}
    </span>
  );
}
