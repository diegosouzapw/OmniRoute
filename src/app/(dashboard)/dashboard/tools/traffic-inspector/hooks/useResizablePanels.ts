"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "inspector.listWidth";
const MIN_WIDTH = 280;
const MAX_WIDTH = 720;
const COLLAPSED_RAIL = 48;
const DEFAULT_WIDTH = 360;

export interface ResizablePanelsState {
  listWidth: number;
  collapsed: boolean;
}

export interface ResizablePanelsActions {
  startDrag: (e: React.MouseEvent) => void;
  toggleCollapse: () => void;
}

export function useResizablePanels(): [ResizablePanelsState, ResizablePanelsActions] {
  const [listWidth, setListWidth] = useState<number>(() => {
    if (typeof window === "undefined") return DEFAULT_WIDTH;
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? Number(stored) : NaN;
    return isNaN(parsed) ? DEFAULT_WIDTH : Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, parsed));
  });
  const [collapsed, setCollapsed] = useState(false);

  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(DEFAULT_WIDTH);
  // Store handler refs to avoid stale closure issues
  const onMouseMoveRef = useRef<(e: MouseEvent) => void>(() => {});
  const onMouseUpRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!collapsed) {
      localStorage.setItem(STORAGE_KEY, String(listWidth));
    }
  }, [listWidth, collapsed]);

  useEffect(() => {
    onMouseMoveRef.current = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const delta = e.clientX - startXRef.current;
      const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidthRef.current + delta));
      setListWidth(next);
      setCollapsed(false);
    };

    onMouseUpRef.current = () => {
      draggingRef.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", onMouseMoveRef.current);
      window.removeEventListener("mouseup", onMouseUpRef.current);
    };
  });

  const startDrag = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      draggingRef.current = true;
      startXRef.current = e.clientX;
      startWidthRef.current = collapsed ? COLLAPSED_RAIL : listWidth;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      window.addEventListener("mousemove", onMouseMoveRef.current);
      window.addEventListener("mouseup", onMouseUpRef.current);
    },
    [collapsed, listWidth]
  );

  const toggleCollapse = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const effectiveWidth = collapsed ? COLLAPSED_RAIL : listWidth;

  return [{ listWidth: effectiveWidth, collapsed }, { startDrag, toggleCollapse }];
}
