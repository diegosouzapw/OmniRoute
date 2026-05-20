"use client";

/**
 * Tooltip — Lightweight hover/focus tooltip component
 *
 * Renders a positioned tooltip on hover/focus with delayed reveal.
 * Associates trigger and tooltip through aria-describedby for a11y.
 *
 * @module shared/components/Tooltip
 */

import type { ReactElement, ReactNode } from "react";
import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  children: ReactNode;
  content?: string;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
  delayMs?: number;
  /**
   * Issue #2352: Render the tooltip in a React portal so it escapes the
   * stacking context of any ancestor with `overflow:hidden` / `overflow:auto`
   * (modals, scroll containers). Without this, long labels next to a modal
   * edge are clipped. Defaults to `true` because the previous absolute
   * positioning has been the cause of every "tooltip cut off" report.
   */
  usePortal?: boolean;
  /**
   * Allow the tooltip text to wrap onto multiple lines instead of forcing a
   * single-line `whitespace-nowrap` layout. Use when the label is long.
   */
  multiline?: boolean;
}

interface AriaDescribedElement {
  "aria-describedby"?: string;
}

export default function Tooltip({
  children,
  content,
  position = "top",
  className = "",
  delayMs = 200,
  usePortal = true,
  multiline = false,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const tooltipRef = useRef<HTMLSpanElement | null>(null);

  const show = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(true), delayMs);
  }, [delayMs]);

  const hide = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  // Position the portal-rendered tooltip relative to the trigger by writing
  // directly to the DOM ref instead of round-tripping through React state.
  // Touching .style here is the canonical React-portal positioning pattern
  // and avoids the cascading-render warning we'd get from setCoords inside
  // a layout effect.
  useLayoutEffect(() => {
    if (!visible || !usePortal) return;
    const wrap = wrapperRef.current;
    const tt = tooltipRef.current;
    if (!wrap || !tt) return;
    const rect = wrap.getBoundingClientRect();
    const tRect = tt.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    let top = 0;
    let left = 0;
    switch (position) {
      case "bottom":
        top = rect.bottom + scrollY + 8;
        left = rect.left + scrollX + rect.width / 2 - tRect.width / 2;
        break;
      case "left":
        top = rect.top + scrollY + rect.height / 2 - tRect.height / 2;
        left = rect.left + scrollX - tRect.width - 8;
        break;
      case "right":
        top = rect.top + scrollY + rect.height / 2 - tRect.height / 2;
        left = rect.right + scrollX + 8;
        break;
      case "top":
      default:
        top = rect.top + scrollY - tRect.height - 8;
        left = rect.left + scrollX + rect.width / 2 - tRect.width / 2;
        break;
    }
    // Clamp horizontally inside the viewport so a trigger near the right
    // edge does not produce a tooltip that bleeds off the screen.
    const margin = 8;
    const maxLeft = window.innerWidth + scrollX - tRect.width - margin;
    const minLeft = scrollX + margin;
    if (left > maxLeft) left = maxLeft;
    if (left < minLeft) left = minLeft;
    tt.style.top = `${top}px`;
    tt.style.left = `${left}px`;
    tt.style.visibility = "visible";
  }, [visible, usePortal, position, content]);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const describedById = content ? tooltipId : undefined;
  const trigger = isValidElement(children) ? (
    (() => {
      const child = children as ReactElement<AriaDescribedElement>;
      const existingDescribedBy = child.props["aria-describedby"];
      const mergedDescribedBy = [existingDescribedBy, describedById].filter(Boolean).join(" ");
      return cloneElement(child, {
        "aria-describedby": mergedDescribedBy || undefined,
      });
    })()
  ) : (
    <span tabIndex={0} aria-describedby={describedById}>
      {children}
    </span>
  );

  const widthClass = multiline ? "max-w-xs whitespace-normal break-words" : "whitespace-nowrap";
  const baseTooltipClass =
    "z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-gray-900/95 rounded-md shadow-lg pointer-events-none animate-in fade-in duration-150 motion-reduce:transition-none motion-reduce:animate-none border border-white/10";

  const portalEnabled = usePortal && typeof window !== "undefined";

  const tooltipEl =
    visible && content ? (
      <span
        ref={tooltipRef}
        id={tooltipId}
        role="tooltip"
        className={
          portalEnabled
            ? `fixed ${baseTooltipClass} ${widthClass}`
            : `absolute ${baseTooltipClass} ${widthClass} ${positionClasses[position] || positionClasses.top}`
        }
        // For portal-rendered tooltips, mount off-screen + hidden so the
        // layout effect can measure dimensions before the user sees a flash.
        // The useLayoutEffect above promotes visibility once coords are set.
        style={portalEnabled ? { top: -9999, left: -9999, visibility: "hidden" } : undefined}
      >
        {content}
      </span>
    ) : null;

  return (
    <span
      ref={wrapperRef}
      className={`relative inline-flex ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={(event) => {
        if (event.key === "Escape") hide();
      }}
    >
      {trigger}
      {portalEnabled && tooltipEl ? createPortal(tooltipEl, document.body) : tooltipEl}
    </span>
  );
}
