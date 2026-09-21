"use client";

import {
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type DragEvent,
  type SetStateAction,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  COMBO_PAGE_SIZE,
  clampComboPage,
  findComboPage,
  getComboPageCount,
  getComboPageItems,
} from "./comboPagination";
import {
  filterCombosByStrategyCategory,
  normalizeIntelligentRoutingFilter,
} from "@/lib/combos/intelligentRouting";

type ComboInventoryItem = {
  id: string | number;
  strategy?: unknown;
  [key: string]: any;
};

type Translator = ((key: string, values?: Record<string, unknown>) => string) & {
  has?: (key: string) => boolean;
};

type InventoryNotification = {
  error: (message: string) => void;
};

function getI18nOrFallback(t: Translator, key: string, fallback: string): string {
  try {
    if (typeof t.has === "function" && t.has(key)) return t(key);
  } catch {}
  return fallback;
}

function moveArrayItem<T>(items: T[], fromIndex: number, toIndex: number): T[] {
  const nextItems = [...items];
  const [movedItem] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, movedItem);
  return nextItems;
}

export function useComboInventoryController<T extends ComboInventoryItem>({
  combos,
  setCombos,
  notify,
  t,
}: {
  combos: T[];
  setCombos: Dispatch<SetStateAction<T[]>>;
  notify: InventoryNotification;
  t: Translator;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFilter = normalizeIntelligentRoutingFilter(searchParams.get("filter"));
  const [comboDragIndex, setComboDragIndex] = useState<number | null>(null);
  const [comboDragOverIndex, setComboDragOverIndex] = useState<number | null>(null);
  const [savingComboOrder, setSavingComboOrder] = useState(false);
  const [comboPage, setComboPage] = useState(1);
  const [comboPaginationFilter, setComboPaginationFilter] = useState(activeFilter);
  const [reorderingAllCombos, setReorderingAllCombos] = useState(false);
  const comboDragIndexRef = useRef<number | null>(null);

  const filteredCombos = useMemo(
    () => filterCombosByStrategyCategory(combos, activeFilter),
    [combos, activeFilter]
  );
  const comboPageCount = getComboPageCount(filteredCombos.length);
  const paginationFilterChanged = comboPaginationFilter !== activeFilter;
  const visibleComboPage = paginationFilterChanged
    ? 1
    : clampComboPage(comboPage, filteredCombos.length);
  const visibleCombos = reorderingAllCombos
    ? combos
    : getComboPageItems(filteredCombos, visibleComboPage);
  const comboPageStart =
    filteredCombos.length === 0 ? 0 : (visibleComboPage - 1) * COMBO_PAGE_SIZE + 1;
  const comboPageEnd = Math.min(visibleComboPage * COMBO_PAGE_SIZE, filteredCombos.length);

  // Reconcile filter/count changes during render so the page never paints an empty,
  // out-of-range slice. This guarded adjustment preserves the pre-extraction behavior.
  if (paginationFilterChanged) {
    setComboPaginationFilter(activeFilter);
    if (comboPage !== 1) setComboPage(1);
  } else if (visibleComboPage !== comboPage) {
    setComboPage(visibleComboPage);
  }

  const resetComboDragState = () => {
    comboDragIndexRef.current = null;
    setComboDragIndex(null);
    setComboDragOverIndex(null);
  };

  const handleFilterChange = (nextFilter: string) => {
    setComboPage(1);
    setReorderingAllCombos(false);
    resetComboDragState();
    const params = new URLSearchParams(searchParams.toString());

    if (nextFilter === "all") params.delete("filter");
    else params.set("filter", nextFilter);

    const queryString = params.toString();
    router.replace(`/dashboard/combos${queryString ? `?${queryString}` : ""}`, { scroll: false });
  };

  const revealCreatedCombo = (nextCombos: T[] | null, comboId: string) => {
    if (!Array.isArray(nextCombos) || !nextCombos.some((combo) => String(combo.id) === comboId)) {
      return;
    }

    // Creation can happen under a strategy filter. Return to the complete inventory,
    // select the containing page, then wait for React to render before scrolling.
    if (activeFilter !== "all") {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("filter");
      const queryString = params.toString();
      router.replace(`/dashboard/combos${queryString ? `?${queryString}` : ""}`, {
        scroll: false,
      });
    }
    setReorderingAllCombos(false);
    setComboPage(findComboPage(nextCombos, comboId));

    let remainingFrames = 12;
    const scrollWhenRendered = () => {
      const element = document.querySelector(`[data-testid="combo-card-${comboId}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "auto", block: "center" });
        return;
      }
      remainingFrames -= 1;
      if (remainingFrames > 0) requestAnimationFrame(scrollWhenRendered);
    };
    requestAnimationFrame(scrollWhenRendered);
  };

  const handleReorderAllToggle = () => {
    resetComboDragState();
    setReorderingAllCombos((enabled) => !enabled);
  };

  const handleComboDragStart = (event: DragEvent<HTMLElement>, index: number) => {
    if (savingComboOrder || !reorderingAllCombos || combos.length < 2) {
      event.preventDefault();
      return;
    }
    comboDragIndexRef.current = index;
    setComboDragIndex(index);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(combos[index]?.id || index));
    const dragHandle = event.currentTarget;
    setTimeout(() => {
      dragHandle.style.opacity = "0.5";
    }, 0);
  };

  const handleComboDragEnd = (event: DragEvent<HTMLElement>) => {
    event.currentTarget.style.opacity = "1";
    resetComboDragState();
  };

  const handleComboDragOver = (event: DragEvent<HTMLElement>, index: number) => {
    event.preventDefault();
    const activeDragIndex = comboDragIndexRef.current ?? comboDragIndex;
    if (activeDragIndex === null || activeDragIndex === index) return;
    event.dataTransfer.dropEffect = "move";
    setComboDragOverIndex(index);
  };

  const handleComboDrop = async (event: DragEvent<HTMLElement>, dropIndex: number) => {
    event.preventDefault();
    const fromIndex = comboDragIndexRef.current ?? comboDragIndex;
    resetComboDragState();
    if (fromIndex === null || fromIndex === dropIndex) return;

    const previousCombos = combos;
    const nextCombos = moveArrayItem(combos, fromIndex, dropIndex);
    setCombos(nextCombos);
    setSavingComboOrder(true);

    try {
      const response = await fetch("/api/combos/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comboIds: nextCombos.map((combo) => combo.id) }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || data.error || "Failed to reorder combos");
      }
      if (Array.isArray(data.combos)) setCombos(data.combos);
    } catch {
      setCombos(previousCombos);
      notify.error(getI18nOrFallback(t, "failedReorder", "Failed to save combo order"));
    } finally {
      setSavingComboOrder(false);
    }
  };

  return {
    activeFilter,
    filteredCombos,
    visibleCombos,
    visibleComboPage,
    comboPageCount,
    comboPageStart,
    comboPageEnd,
    comboDragIndex,
    comboDragOverIndex,
    savingComboOrder,
    reorderingAllCombos,
    setComboPage,
    handleFilterChange,
    revealCreatedCombo,
    handleReorderAllToggle,
    handleComboDragStart,
    handleComboDragEnd,
    handleComboDragOver,
    handleComboDrop,
  };
}
