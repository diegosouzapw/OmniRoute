"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const TICK_MS = 150;
const STEP_MAX = 12;
const CEILING = 88;
const FINISH_DELAY_MS = 220;
const RESET_DELAY_MS = 320;

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const lastKeyRef = useRef<string>(`${pathname}?${searchParams?.toString() ?? ""}`);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const finishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (e.button !== 0) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "" && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#")) return;
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return;
      try {
        const url = new URL(anchor.href, window.location.href);
        if (url.origin !== window.location.origin) return;
        const currentKey = `${window.location.pathname}?${window.location.search}`;
        const nextKey = `${url.pathname}?${url.search}`;
        if (currentKey === nextKey) return;
      } catch {
        return;
      }
      // Defer to next microtask to avoid setState-in-handler-during-event issues.
      queueMicrotask(() => {
        setActive(true);
        setProgress(8);
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!active) return;
    tickRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= CEILING) return prev;
        const remaining = CEILING - prev;
        const next = prev + Math.min(STEP_MAX, Math.max(1, remaining * 0.18));
        return Math.min(CEILING, next);
      });
    }, TICK_MS);
    return () => {
      if (tickRef.current) {
        clearInterval(tickRef.current);
        tickRef.current = null;
      }
    };
  }, [active]);

  useEffect(() => {
    const key = `${pathname}?${searchParams?.toString() ?? ""}`;
    if (key === lastKeyRef.current) return;
    lastKeyRef.current = key;
    if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    finishTimerRef.current = setTimeout(() => {
      setProgress(100);
      resetTimerRef.current = setTimeout(() => {
        setActive(false);
        setProgress(0);
      }, RESET_DELAY_MS);
    }, FINISH_DELAY_MS);
    return () => {
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [pathname, searchParams]);

  if (!active && progress === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-0.5" aria-hidden="true">
      <div
        className="h-full origin-left bg-gradient-to-r from-primary via-accent to-primary transition-[width,opacity] duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress >= 100 ? 0 : 1,
          boxShadow: "0 0 10px rgba(99, 102, 241, 0.6), 0 0 4px rgba(229, 77, 94, 0.4)",
        }}
      />
    </div>
  );
}
