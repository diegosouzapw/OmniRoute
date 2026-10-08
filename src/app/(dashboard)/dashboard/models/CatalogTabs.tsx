"use client";

import { useRef, type KeyboardEvent } from "react";
import type { CatalogTab } from "./catalogUrlState";

const TAB_ORDER: CatalogTab[] = ["models", "combos"];

export function catalogTabId(tab: CatalogTab): string {
  return `tab-${tab}`;
}

export function catalogPanelId(tab: CatalogTab): string {
  return `panel-${tab}`;
}

/** WAI-ARIA tabs: roving tabindex, Arrow/Home/End move selection and focus together. */
export default function CatalogTabs({
  activeTab,
  onSelect,
  labels,
  ariaLabel,
}: {
  activeTab: CatalogTab;
  onSelect: (tab: CatalogTab) => void;
  labels: Record<CatalogTab, string>;
  ariaLabel: string;
}) {
  const tabRefs = useRef<Partial<Record<CatalogTab, HTMLButtonElement | null>>>({});

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    switch (event.key) {
      case "ArrowRight":
        next = (index + 1) % TAB_ORDER.length;
        break;
      case "ArrowLeft":
        next = (index - 1 + TAB_ORDER.length) % TAB_ORDER.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = TAB_ORDER.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    const tab = TAB_ORDER[next];
    onSelect(tab);
    tabRefs.current[tab]?.focus();
  };

  return (
    <div role="tablist" aria-label={ariaLabel} className="mt-2 flex border-b border-border">
      {TAB_ORDER.map((tab, index) => {
        const selected = tab === activeTab;
        return (
          <button
            key={tab}
            ref={(element) => {
              tabRefs.current[tab] = element;
            }}
            type="button"
            role="tab"
            id={catalogTabId(tab)}
            aria-selected={selected}
            aria-controls={selected ? catalogPanelId(tab) : undefined}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(tab)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              selected
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            {labels[tab]}
          </button>
        );
      })}
    </div>
  );
}
