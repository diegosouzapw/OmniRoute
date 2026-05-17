"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import { getActiveSidebarHref } from "@/shared/utils/sidebarRouteMatch";
import { APP_CONFIG } from "@/shared/constants/appConfig";
import OmniRouteLogo from "./OmniRouteLogo";
import Button from "./Button";
import { ConfirmModal } from "./Modal";
import CloudSyncStatus from "./CloudSyncStatus";
import { useTranslations } from "next-intl";
import {
  HIDDEN_SIDEBAR_ITEMS_SETTING_KEY,
  SIDEBAR_SETTINGS_UPDATED_EVENT,
  SIDEBAR_SECTIONS,
  getSectionItems,
  normalizeHiddenSidebarItems,
  type SidebarSectionId,
  type SidebarItemDefinition,
  type SidebarItemGroup,
} from "@/shared/constants/sidebarVisibility";

const isE2EMode = process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE === "1";
const DEFAULT_EXPANDED: SidebarSectionId = "omni-proxy";
const EXPANDED_SECTIONS_KEY = "sidebar-expanded-sections";
const PINNED_SECTIONS_KEY = "sidebar-pinned-sections";

type SidebarProps = {
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  isMacElectron?: boolean;
};

type HoveredItem = { id: string; label: string; x: number; y: number } | null;

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed as T;
    }
  } catch {}
  return fallback;
}

function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export default function Sidebar({
  onClose,
  collapsed = false,
  onToggleCollapse,
  isMacElectron = false,
}: SidebarProps) {
  const pathname = usePathname();
  const t = useTranslations("sidebar");
  const tc = useTranslations("common");
  const sidebarRef = useRef<HTMLElement>(null);
  const [showShutdownModal, setShowShutdownModal] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [hiddenSidebarItems, setHiddenSidebarItems] = useState<string[]>([]);
  const [customAppName, setCustomAppName] = useState<string | null>(null);
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<SidebarSectionId>>(
    new Set([DEFAULT_EXPANDED])
  );
  const [pinnedSections, setPinnedSections] = useState<Set<SidebarSectionId>>(new Set());
  const [hoveredItem, setHoveredItem] = useState<HoveredItem>(null);

  // Load persisted state on mount; OmniProxy is pinned by default on first visit
  useEffect(() => {
    const storedExpanded = loadFromStorage<SidebarSectionId[]>(EXPANDED_SECTIONS_KEY, [
      DEFAULT_EXPANDED,
    ]);
    const pinnedRaw = (() => {
      try {
        return localStorage.getItem(PINNED_SECTIONS_KEY);
      } catch {
        return null;
      }
    })();
    const storedPinned: SidebarSectionId[] =
      pinnedRaw !== null
        ? (JSON.parse(pinnedRaw) as SidebarSectionId[])
        : (SIDEBAR_SECTIONS.filter((s) => s.defaultPinned).map((s) => s.id) as SidebarSectionId[]);

    const initialExpanded = new Set<SidebarSectionId>(
      storedExpanded.length > 0 ? storedExpanded : [DEFAULT_EXPANDED]
    );
    const initialPinned = new Set<SidebarSectionId>(storedPinned);
    // Pinned sections must also be expanded
    for (const id of initialPinned) initialExpanded.add(id);

    setExpandedSections(initialExpanded);
    setPinnedSections(initialPinned);
  }, []);

  useEffect(() => {
    const applySettings = (data) => {
      setShowDebug(data?.debugMode === true);
      setHiddenSidebarItems(normalizeHiddenSidebarItems(data?.[HIDDEN_SIDEBAR_ITEMS_SETTING_KEY]));
      setCustomAppName(data?.instanceName || null);
      setCustomLogo(data?.customLogoBase64 || data?.customLogoUrl || null);
    };

    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => applySettings(data))
      .catch(() => {});

    const handleSettingsUpdated = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail || {};
      if ("debugMode" in detail) setShowDebug(detail.debugMode === true);
      if (HIDDEN_SIDEBAR_ITEMS_SETTING_KEY in detail) {
        setHiddenSidebarItems(
          normalizeHiddenSidebarItems(detail[HIDDEN_SIDEBAR_ITEMS_SETTING_KEY])
        );
      }
      if ("instanceName" in detail) setCustomAppName((detail.instanceName as string) || null);
      if ("customLogoBase64" in detail) {
        setCustomLogo((detail.customLogoBase64 as string) || null);
      } else if ("customLogoUrl" in detail) {
        setCustomLogo((detail.customLogoUrl as string) || null);
      }
    };

    window.addEventListener(SIDEBAR_SETTINGS_UPDATED_EVENT, handleSettingsUpdated as EventListener);
    return () =>
      window.removeEventListener(
        SIDEBAR_SETTINGS_UPDATED_EVENT,
        handleSettingsUpdated as EventListener
      );
  }, []);

  const getSidebarLabel = (key: string, fallback: string) =>
    typeof t.has === "function" && t.has(key) ? t(key) : fallback;

  const resolveItem = (item: SidebarItemDefinition, hidden: Set<string>) => {
    if (hidden.has(item.id)) return null;
    const subtitle = item.subtitleKey ? getSidebarLabel(item.subtitleKey, "") : undefined;
    return {
      ...item,
      label: getSidebarLabel(item.i18nKey, item.id),
      subtitle: subtitle || undefined,
    };
  };

  const hiddenSidebarSet = new Set(hiddenSidebarItems);

  const visibleSections = SIDEBAR_SECTIONS.filter(
    (section) => section.visibility !== "debug" || showDebug
  )
    .map((section) => {
      const children = section.children
        .map((child) => {
          if ("type" in child && child.type === "group") {
            const items = child.items
              .map((item) => resolveItem(item, hiddenSidebarSet))
              .filter(Boolean) as (SidebarItemDefinition & { label: string })[];
            if (items.length === 0) return null;
            return {
              ...child,
              title: getSidebarLabel(child.titleKey, child.titleFallback),
              items,
            } as SidebarItemGroup & {
              title: string;
              items: (SidebarItemDefinition & { label: string })[];
            };
          }
          return resolveItem(child as SidebarItemDefinition, hiddenSidebarSet);
        })
        .filter(Boolean);

      return {
        ...section,
        title: getSidebarLabel(section.titleKey, section.titleFallback),
        children,
      };
    })
    .filter((section) => {
      const allItems = section.children.flatMap((child: any) =>
        child.type === "group" ? child.items : [child]
      );
      return allItems.length > 0;
    });

  const allVisibleItems = visibleSections.flatMap((section) =>
    section.children.flatMap((child: any) => (child.type === "group" ? child.items : [child]))
  );

  const activeHref = getActiveSidebarHref(pathname, allVisibleItems);

  // Auto-expand the section containing the active page (without closing others)
  useEffect(() => {
    if (collapsed) return;
    for (const section of visibleSections) {
      const sectionItems = section.children.flatMap((child: any) =>
        child.type === "group" ? child.items : [child]
      );
      if (sectionItems.some((item: any) => !item.external && item.href === activeHref)) {
        setExpandedSections((prev) => {
          if (prev.has(section.id as SidebarSectionId)) return prev;
          const next = new Set(prev);
          next.add(section.id as SidebarSectionId);
          saveToStorage(EXPANDED_SECTIONS_KEY, [...next]);
          return next;
        });
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeHref, collapsed]);

  // Accordion toggle: opening a section closes all non-pinned sections
  const toggleSection = useCallback(
    (sectionId: SidebarSectionId) => {
      setExpandedSections((prev) => {
        const isOpen = prev.has(sectionId);
        let next: Set<SidebarSectionId>;
        if (isOpen) {
          // Close this section
          next = new Set(prev);
          next.delete(sectionId);
        } else {
          // Accordion: keep only pinned sections + the new one
          next = new Set<SidebarSectionId>();
          for (const id of pinnedSections) {
            next.add(id);
          }
          next.add(sectionId);
        }
        saveToStorage(EXPANDED_SECTIONS_KEY, [...next]);
        return next;
      });
    },
    [pinnedSections]
  );

  const togglePin = useCallback((sectionId: SidebarSectionId) => {
    setPinnedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
        // Ensure the section is expanded when pinned
        setExpandedSections((prevExp) => {
          if (prevExp.has(sectionId)) return prevExp;
          const nextExp = new Set(prevExp);
          nextExp.add(sectionId);
          saveToStorage(EXPANDED_SECTIONS_KEY, [...nextExp]);
          return nextExp;
        });
      }
      saveToStorage(PINNED_SECTIONS_KEY, [...next]);
      return next;
    });
  }, []);

  const handleShutdown = async () => {
    setIsShuttingDown(true);
    try {
      await fetch("/api/shutdown", { method: "POST" });
    } catch (e) {
      // Expected to fail as server shuts down
    }
    setIsShuttingDown(false);
    setShowShutdownModal(false);
    setIsDisconnected(true);
  };

  const handleRestart = async () => {
    setIsRestarting(true);
    try {
      await fetch("/api/restart", { method: "POST" });
    } catch (e) {
      // Expected to fail as server restarts
    }
    setIsRestarting(false);
    setShowRestartModal(false);
    setIsDisconnected(true);
    setTimeout(() => globalThis.location.reload(), 3000);
  };

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLElement>, id: string, label: string) => {
      if (!collapsed) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const sidebarRect = sidebarRef.current?.getBoundingClientRect();
      setHoveredItem({
        id,
        label,
        x: (sidebarRect?.right ?? 64) + 8,
        y: rect.top + rect.height / 2,
      });
    },
    [collapsed]
  );

  const handleMouseLeave = useCallback(() => setHoveredItem(null), []);

  const renderNavLink = (item) => {
    const active = !item.external && activeHref === item.href;
    const className = cn(
      "flex items-center gap-3 rounded-lg transition-all group",
      collapsed ? "justify-center px-2 py-2.5" : "px-3 py-1.5",
      active
        ? "bg-primary/10 text-primary"
        : "text-text-muted hover:bg-surface/50 hover:text-text-main"
    );
    const iconClassName = cn(
      "material-symbols-outlined text-[18px] shrink-0",
      active ? "fill-1" : "group-hover:text-primary transition-colors"
    );
    const content = (
      <>
        <span className={iconClassName}>{item.icon}</span>
        {!collapsed && (
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium">{item.label}</span>
            {item.subtitle && (
              <span className="truncate text-[10px] text-text-muted/60">{item.subtitle}</span>
            )}
          </div>
        )}
      </>
    );
    const sharedProps = {
      onMouseEnter: (e: React.MouseEvent<HTMLElement>) => handleMouseEnter(e, item.id, item.label),
      onMouseLeave: handleMouseLeave,
    };

    if (item.external) {
      return (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className={className}
          {...sharedProps}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onClose}
        className={className}
        {...sharedProps}
      >
        {content}
      </Link>
    );
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "flex h-full min-h-0 flex-col border-r border-black/5 bg-sidebar transition-all duration-300 ease-in-out dark:border-white/5",
          collapsed ? "w-16" : "w-[220px]"
        )}
        style={{ paddingTop: isMacElectron ? "var(--desktop-safe-top)" : undefined }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-3 focus:bg-primary focus:text-white focus:rounded-md focus:m-2"
        >
          Skip to content
        </a>

        {(onToggleCollapse || !isMacElectron) && (
          <div
            className={cn(
              "flex items-center gap-2 pb-2",
              isMacElectron ? "pt-3" : "pt-5",
              collapsed ? "px-3 justify-center" : "px-4"
            )}
            aria-hidden="true"
          >
            {!isMacElectron && (
              <>
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </>
            )}
            {!collapsed && <div className="flex-1" />}
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                aria-expanded={!collapsed}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                className={cn(
                  "rounded-md p-1 text-text-muted/50 transition-colors hover:bg-black/5 hover:text-text-muted dark:hover:bg-white/5",
                  collapsed && !isMacElectron && "mt-2",
                  isMacElectron && "ml-auto"
                )}
              >
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  {collapsed ? "chevron_right" : "chevron_left"}
                </span>
              </button>
            )}
          </div>
        )}

        <div className={cn("py-3", collapsed ? "px-2" : "px-4")}>
          <Link
            href="/home"
            className={cn("flex items-center", collapsed ? "justify-center" : "gap-2.5")}
          >
            <div className="flex items-center justify-center size-8 rounded bg-linear-to-br from-[#E54D5E] to-[#C93D4E] shrink-0">
              {customLogo ? (
                <img
                  src={customLogo}
                  alt={customAppName || APP_CONFIG.name}
                  className="size-5 object-contain"
                />
              ) : (
                <OmniRouteLogo size={18} className="text-white" />
              )}
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <h1 className="text-sm font-semibold tracking-tight text-text-main truncate">
                  {customAppName || APP_CONFIG.name}
                </h1>
                <span className="text-[10px] text-text-muted">v{APP_CONFIG.version}</span>
              </div>
            )}
          </Link>
        </div>

        <nav
          aria-label="Main navigation"
          className={cn(
            "min-h-0 flex-1 overflow-y-auto py-1 custom-scrollbar",
            collapsed ? "px-2 space-y-0.5" : "px-3"
          )}
        >
          {visibleSections.map((section, idx) => {
            const sectionId = section.id as SidebarSectionId;
            const isExpanded = expandedSections.has(sectionId);
            const isPinned = pinnedSections.has(sectionId);
            const isFirst = idx === 0;
            const sectionItems = section.children.flatMap((child: any) =>
              child.type === "group" ? child.items : [child]
            );

            // Collapsed (mini) mode: flat items with dividers between sections
            if (collapsed) {
              return (
                <div key={section.id}>
                  {!isFirst && (
                    <div className="border-t border-black/5 dark:border-white/5 my-1.5" />
                  )}
                  {sectionItems.map(renderNavLink)}
                </div>
              );
            }

            // Sections without a visible title (e.g. Home) render items directly
            if (section.showTitle === false) {
              return (
                <div key={section.id} className={cn("space-y-0.5", !isFirst && "mt-1")}>
                  {sectionItems.map(renderNavLink)}
                </div>
              );
            }

            // Expanded mode: collapsible section with pin
            return (
              <div key={section.id} className={isFirst ? "space-y-0.5" : "mt-2"}>
                <div
                  className="flex items-center gap-0.5 px-2 py-1 rounded-md hover:bg-surface/30 transition-colors cursor-pointer group/header"
                  onClick={() => toggleSection(sectionId)}
                  role="button"
                  aria-expanded={isExpanded}
                >
                  <span className="flex-1 text-[10px] font-semibold text-text-muted/60 uppercase tracking-wider group-hover/header:text-text-muted/90 transition-colors">
                    {section.title}
                  </span>

                  {/* Pin button — right side near chevron */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePin(sectionId);
                    }}
                    title={isPinned ? "Unpin section" : "Pin section open"}
                    className={cn(
                      "p-0.5 rounded transition-all shrink-0",
                      isPinned
                        ? "text-primary opacity-100"
                        : "text-text-muted/30 opacity-0 group-hover/header:opacity-100 hover:text-text-muted/70"
                    )}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "10px",
                        ...(isPinned ? { fontVariationSettings: "'FILL' 1" } : {}),
                      }}
                    >
                      push_pin
                    </span>
                  </button>

                  <span
                    className={cn(
                      "material-symbols-outlined text-[14px] text-text-muted/40 transition-all duration-200 group-hover/header:text-text-muted/70 shrink-0",
                      isExpanded && "rotate-180"
                    )}
                  >
                    expand_more
                  </span>
                </div>

                {isExpanded && (
                  <div className="mt-0.5 space-y-0.5">
                    {section.children.map((child: any) => {
                      if (child.type === "group") {
                        if (child.items.length === 0) return null;
                        return (
                          <div key={child.id} className="mt-2">
                            {/* Visual sub-group separator */}
                            <div className="flex items-center gap-1.5 px-2 py-0.5 mb-0.5">
                              <div className="h-px flex-1 bg-black/8 dark:bg-white/8" />
                              <span className="text-[8px] font-semibold text-text-muted/40 uppercase tracking-widest">
                                {child.title}
                              </span>
                            </div>
                            {child.items.map(renderNavLink)}
                          </div>
                        );
                      }
                      return renderNavLink(child);
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {!isE2EMode && <CloudSyncStatus collapsed={collapsed} />}

        <div
          className={cn(
            "shrink-0 border-t border-black/5 dark:border-white/5",
            collapsed ? "p-2 flex flex-col gap-1" : "p-2 flex gap-2"
          )}
          style={{
            paddingBottom: isMacElectron ? "calc(0.5rem + var(--desktop-safe-bottom))" : undefined,
          }}
        >
          <button
            onClick={() => setShowRestartModal(true)}
            title={t("restart")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg font-medium transition-all",
              "text-amber-500 hover:bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40",
              collapsed ? "p-2" : "flex-1 min-w-0 px-2 py-1.5 text-xs"
            )}
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            {!collapsed && <span className="truncate">{t("restart")}</span>}
          </button>
          <button
            onClick={() => setShowShutdownModal(true)}
            title={t("shutdown")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg font-medium transition-all",
              "text-red-500 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40",
              collapsed ? "p-2" : "flex-1 min-w-0 px-2 py-1.5 text-xs"
            )}
          >
            <span className="material-symbols-outlined text-[16px]">power_settings_new</span>
            {!collapsed && <span className="truncate">{t("shutdown")}</span>}
          </button>
        </div>
      </aside>

      {/* Styled tooltip for collapsed (mini) sidebar */}
      {collapsed && hoveredItem && (
        <div
          className="fixed z-[200] pointer-events-none flex items-center"
          style={{ left: hoveredItem.x, top: hoveredItem.y, transform: "translateY(-50%)" }}
        >
          <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-r-[6px] border-t-transparent border-b-transparent border-r-sidebar dark:border-r-sidebar" />
          <div className="px-2.5 py-1.5 bg-sidebar text-text-main text-xs font-medium rounded-md shadow-lg border border-black/10 dark:border-white/10 whitespace-nowrap">
            {hoveredItem.label}
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={showShutdownModal}
        onClose={() => setShowShutdownModal(false)}
        onConfirm={handleShutdown}
        title={t("shutdown")}
        message={t("shutdownConfirm")}
        confirmText={t("shutdown")}
        cancelText={tc("cancel")}
        variant="danger"
        loading={isShuttingDown}
      />

      <ConfirmModal
        isOpen={showRestartModal}
        onClose={() => setShowRestartModal(false)}
        onConfirm={handleRestart}
        title={t("restart")}
        message={t("restartConfirm")}
        confirmText={t("restart")}
        cancelText={tc("cancel")}
        variant="warning"
        loading={isRestarting}
      />

      {isDisconnected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="text-center p-8">
            <div className="flex items-center justify-center size-16 rounded-full bg-red-500/20 text-red-500 mx-auto mb-4">
              <span className="material-symbols-outlined text-[32px]">power_off</span>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Server Disconnected</h2>
            <p className="text-text-muted mb-6">
              The proxy server has been stopped or is restarting.
            </p>
            <Button variant="secondary" onClick={() => globalThis.location.reload()}>
              Reload Page
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
