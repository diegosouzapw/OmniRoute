"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const ESTIMATED_ROW_HEIGHT = 48;
const OVERSCAN = 5;

export interface VirtualListState<T> {
  virtualItems: Array<{ index: number; item: T; top: number; height: number }>;
  totalHeight: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  rowRef: (index: number) => (el: HTMLDivElement | null) => void;
}

export function useVirtualList<T>(items: T[], containerHeight: number): VirtualListState<T> {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  // Heights stored in state so reads during render are tracked by React
  const [heights, setHeights] = useState<Map<number, number>>(new Map());
  const observersRef = useRef<Map<number, ResizeObserver>>(new Map());

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = () => setScrollTop(el.scrollTop);
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, []);

  // Cleanup observers on unmount
  useEffect(() => {
    const observers = observersRef.current;
    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const rowRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    const observers = observersRef.current;
    if (el) {
      const existing = observers.get(index);
      if (existing) existing.disconnect();
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const h = entry.contentRect.height;
          if (h > 0) {
            setHeights((prev) => {
              if (prev.get(index) === h) return prev;
              const next = new Map(prev);
              next.set(index, h);
              return next;
            });
          }
        }
      });
      ro.observe(el);
      observers.set(index, ro);
    } else {
      const existing = observers.get(index);
      if (existing) {
        existing.disconnect();
        observers.delete(index);
      }
    }
  }, []);

  // Compute cumulative offsets — reads heights from state (not a ref)
  const offsets: number[] = [];
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    offsets.push(total);
    total += heights.get(i) ?? ESTIMATED_ROW_HEIGHT;
  }
  const totalHeight = total;

  // Find visible range
  let startIdx = 0;
  let endIdx = items.length - 1;
  for (let i = 0; i < offsets.length; i++) {
    if ((offsets[i] ?? 0) + (heights.get(i) ?? ESTIMATED_ROW_HEIGHT) < scrollTop) {
      startIdx = i + 1;
    } else {
      break;
    }
  }
  for (let i = startIdx; i < offsets.length; i++) {
    if ((offsets[i] ?? 0) > scrollTop + containerHeight) {
      endIdx = i - 1;
      break;
    }
  }

  startIdx = Math.max(0, startIdx - OVERSCAN);
  endIdx = Math.min(items.length - 1, endIdx + OVERSCAN);

  const virtualItems: Array<{ index: number; item: T; top: number; height: number }> = [];
  for (let i = startIdx; i <= endIdx; i++) {
    virtualItems.push({
      index: i,
      item: items[i] as T,
      top: offsets[i] ?? 0,
      height: heights.get(i) ?? ESTIMATED_ROW_HEIGHT,
    });
  }

  return { virtualItems, totalHeight, containerRef, rowRef };
}
