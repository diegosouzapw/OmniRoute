"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  SIDEBAR_SECTIONS,
  HIDDEN_SIDEBAR_ITEMS_SETTING_KEY,
  normalizeHiddenSidebarItems,
  type SidebarItemDefinition,
  type SidebarSectionChild,
} from "@/shared/constants/sidebarVisibility";

function isSidebarGroup(
  child: SidebarSectionChild
): child is Extract<SidebarSectionChild, { type: "group" }> {
  return "type" in child && child.type === "group";
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  if (!isOpen) return null;
  return <CommandPaletteDialog onClose={onClose} />;
}

interface PaletteItem {
  id: string;
  href: string;
  icon: string;
  label: string;
  subtitle?: string;
  external: boolean;
  sectionId: string;
  sectionLabel: string;
  subgroupId?: string;
  subgroupLabel?: string;
}

interface PaletteSubgroup {
  subgroupId: string | null;
  subgroupLabel: string | null;
  items: { item: PaletteItem; flatIndex: number }[];
}

interface PaletteGroup {
  sectionId: string;
  sectionLabel: string;
  subgroups: PaletteSubgroup[];
}

function CommandPaletteDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const t = useTranslations("sidebar");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hiddenItems, setHiddenItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/settings", { signal: ctrl.signal })
      .then((res) => res.json())
      .then((data) => {
        setHiddenItems(
          new Set(normalizeHiddenSidebarItems(data?.[HIDDEN_SIDEBAR_ITEMS_SETTING_KEY]))
        );
      })
      .catch(() => {
        // ignore aborts and fetch failures; palette still works with empty hidden set
      });
    return () => ctrl.abort();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(id);
  }, []);

  const safeTranslate = useCallback(
    (key: string, fallback: string) => {
      try {
        return t(key);
      } catch {
        return fallback;
      }
    },
    [t]
  );

  const allItems = useMemo<PaletteItem[]>(
    () =>
      SIDEBAR_SECTIONS.flatMap((section) => {
        const sectionLabel = safeTranslate(section.titleKey, section.titleFallback);
        return section.children.flatMap<PaletteItem>((child) => {
          if (isSidebarGroup(child)) {
            const subgroupLabel = safeTranslate(child.titleKey, child.titleFallback);
            return child.items
              .filter((item) => !hiddenItems.has(item.id))
              .map<PaletteItem>((item) => ({
                id: item.id,
                href: item.href,
                icon: item.icon,
                label: safeTranslate(item.i18nKey, item.id),
                subtitle: item.subtitleKey ? safeTranslate(item.subtitleKey, "") : undefined,
                external: item.external ?? false,
                sectionId: section.id,
                sectionLabel,
                subgroupId: child.id,
                subgroupLabel,
              }));
          }
          const item = child as SidebarItemDefinition;
          if (hiddenItems.has(item.id)) return [];
          return [
            {
              id: item.id,
              href: item.href,
              icon: item.icon,
              label: safeTranslate(item.i18nKey, item.id),
              subtitle: item.subtitleKey ? safeTranslate(item.subtitleKey, "") : undefined,
              external: item.external ?? false,
              sectionId: section.id,
              sectionLabel,
            },
          ];
        });
      }),
    [hiddenItems, safeTranslate]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q) ||
        item.sectionLabel.toLowerCase().includes(q) ||
        item.subgroupLabel?.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  const grouped = useMemo<PaletteGroup[]>(() => {
    const groups: PaletteGroup[] = [];
    filtered.forEach((item, flatIndex) => {
      let section = groups[groups.length - 1];
      if (!section || section.sectionId !== item.sectionId) {
        section = {
          sectionId: item.sectionId,
          sectionLabel: item.sectionLabel,
          subgroups: [],
        };
        groups.push(section);
      }
      const itemSubgroupId = item.subgroupId ?? null;
      let subgroup = section.subgroups[section.subgroups.length - 1];
      if (!subgroup || subgroup.subgroupId !== itemSubgroupId) {
        subgroup = {
          subgroupId: itemSubgroupId,
          subgroupLabel: item.subgroupLabel ?? null,
          items: [],
        };
        section.subgroups.push(subgroup);
      }
      subgroup.items.push({ item, flatIndex });
    });
    return groups;
  }, [filtered]);

  const handleNavigate = useCallback(
    (href: string, external: boolean) => {
      onClose();
      if (external) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        router.push(href);
      }
    },
    [onClose, router]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + Math.max(1, filtered.length)) % Math.max(1, filtered.length)
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[selectedIndex];
        if (item) {
          handleNavigate(item.href, item.external);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [filtered, selectedIndex, onClose, handleNavigate]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLElement>(`[data-flat-index="${selectedIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh] px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative w-full max-w-3xl bg-surface border border-black/10 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="flex items-center gap-3 px-6 py-4 border-b border-black/5 dark:border-white/5">
          <span className="material-symbols-outlined text-[20px] text-text-muted shrink-0">
            search
          </span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-text placeholder:text-text-muted outline-none text-base"
            placeholder="Search pages, settings, tools..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              className="text-text-muted hover:text-text transition-colors"
              onClick={() => {
                setQuery("");
                setSelectedIndex(0);
              }}
              tabIndex={-1}
              aria-label="Clear search"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/5 dark:bg-white/5 text-text-muted border border-black/10 dark:border-white/10 shrink-0">
            Esc
          </kbd>
        </div>

        {grouped.length > 0 ? (
          <ul
            ref={listRef}
            className="py-2 max-h-[60vh] overflow-y-auto custom-scrollbar"
            role="listbox"
          >
            {grouped.map((group) => (
              <li key={group.sectionId} role="presentation">
                <div className="sticky top-0 z-10 bg-surface/95 backdrop-blur-sm px-6 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted border-b border-black/5 dark:border-white/5">
                  {group.sectionLabel}
                </div>
                <ul role="group" aria-label={group.sectionLabel}>
                  {group.subgroups.map((subgroup) => (
                    <li
                      key={`${group.sectionId}::${subgroup.subgroupId ?? "_root"}`}
                      role="presentation"
                    >
                      {subgroup.subgroupLabel && (
                        <div className="px-6 pt-2 pb-1 text-[10px] font-medium uppercase tracking-wide text-text-muted/70">
                          {subgroup.subgroupLabel}
                        </div>
                      )}
                      <ul
                        role={subgroup.subgroupLabel ? "group" : "presentation"}
                        aria-label={subgroup.subgroupLabel ?? undefined}
                      >
                        {subgroup.items.map(({ item, flatIndex }) => (
                          <li
                            key={item.id}
                            role="option"
                            aria-selected={flatIndex === selectedIndex}
                            data-flat-index={flatIndex}
                          >
                            <button
                              className={`w-full flex items-center gap-3 ${
                                subgroup.subgroupLabel ? "pl-10 pr-6" : "px-6"
                              } py-2.5 text-left transition-colors ${
                                flatIndex === selectedIndex
                                  ? "bg-accent/10 text-accent ring-1 ring-inset ring-accent/20"
                                  : "text-text hover:bg-black/5 dark:hover:bg-white/5"
                              }`}
                              onClick={() => handleNavigate(item.href, item.external)}
                              onMouseEnter={() => setSelectedIndex(flatIndex)}
                            >
                              <span
                                className={`material-symbols-outlined text-[18px] shrink-0 ${
                                  flatIndex === selectedIndex ? "text-accent" : "text-text-muted"
                                }`}
                              >
                                {item.icon}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{item.label}</p>
                                {item.subtitle && (
                                  <p
                                    className={`text-xs truncate ${
                                      flatIndex === selectedIndex
                                        ? "text-accent/70"
                                        : "text-text-muted"
                                    }`}
                                  >
                                    {item.subtitle}
                                  </p>
                                )}
                              </div>
                              {item.external && (
                                <span className="material-symbols-outlined text-[14px] text-text-muted shrink-0">
                                  open_in_new
                                </span>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-10 text-center text-text-muted text-sm">No results</div>
        )}

        <div className="flex items-center gap-4 px-4 py-2 border-t border-black/5 dark:border-white/5 text-[11px] text-text-muted">
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono">
              ↑↓
            </kbd>
            navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono">
              ↵
            </kbd>
            open
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono">
              Esc
            </kbd>
            close
          </span>
        </div>
      </div>
    </div>
  );
}
