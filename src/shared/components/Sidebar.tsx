"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore, useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import { getActiveSidebarHref } from "@/shared/utils/sidebarRouteMatch";
import { filterSidebarSectionsByQuery } from "@/shared/utils/sidebarSearch";
import {
  expandActiveSection,
  hydrateExpandedSections,
  toggleExpandedSection,
} from "@/shared/utils/sidebarExpansionState";
import { APP_CONFIG } from "@/shared/constants/appConfig";
import OmniRouteLogo from "./OmniRouteLogo";
import Button from "./Button";
import Input from "./Input";
import { ConfirmModal } from "./Modal";
import CloudSyncStatus from "./CloudSyncStatus";
import { useTranslations } from "next-intl";
import {
  HIDDEN_SIDEBAR_GROUP_LABELS_SETTING_KEY,
  normalizeHiddenSidebarGroupLabels,
} from "@/shared/constants/sidebarGroupVisibility";
import {
  HIDDEN_SIDEBAR_ITEMS_SETTING_KEY,
  SIDEBAR_SETTINGS_UPDATED_EVENT,
  SIDEBAR_SECTION_ORDER_KEY,
  SIDEBAR_ITEM_ORDER_KEY,
  SIDEBAR_SECTIONS,
  normalizeHiddenSidebarItems,
  applySectionOrder,
  applyItemOrder,
  isSidebarItemVisibleForFlags,
  resolveRuntimeSidebarSections,
  type SidebarSectionId,
  type SidebarItemDefinition,
  type SidebarItemGroup,
  type SidebarItemOrder,
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

function parseStoredArray<T>(raw: string | null, fallback: T): T {
  try {
    if (raw) {
      const parsed = JSON.parse(raw);
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

// useSyncExternalStore plumbing for the one-shot localStorage hydration reads:
// nothing to subscribe to (the values are only read once, before
// sidebarExpansionLoaded flips), and the server snapshot is always null so the
// SSR/hydration render matches the server output.
const noopSubscribe = () => () => {};
const getServerSnapshotNull = () => null;
const getHydratedSnapshot = () => true;
const getServerHydratedSnapshot = () => false;
function readStoredExpandedRaw() {
  try {
    return localStorage.getItem(EXPANDED_SECTIONS_KEY);
  } catch {
    return null;
  }
}
function readStoredPinnedRaw() {
  try {
    return localStorage.getItem(PINNED_SECTIONS_KEY);
  } catch {
    return null;
  }
}

export default function Sidebar({
  onClose,
  collapsed = false,
  onToggleCollapse,
  isMacElectron = false,
}: SidebarProps) {
  const navigationId = useId();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const [groupPathname, setGroupPathname] = useState(pathname);
  if (groupPathname !== pathname) {
    setGroupPathname(pathname);
    setExpandedGroups({});
  }
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
  const [hiddenSidebarGroupLabels, setHiddenSidebarGroupLabels] = useState<string[]>([]);
  // Feature-flag map for flag-gated items (e.g. "radar" -> RADAR_ENABLED).
  // Fails open (see isSidebarItemVisibleForFlags) so a missing key never
  // hides an unrelated item — only set once /api/settings resolves.
  const [featureFlags, setFeatureFlags] = useState<Record<string, boolean>>({});
  const [radarAdminUrl, setRadarAdminUrl] = useState<unknown>(null);
  const [sidebarSectionOrder, setSidebarSectionOrder] = useState<SidebarSectionId[]>([]);
  const [sidebarItemOrder, setSidebarItemOrder] = useState<SidebarItemOrder>({});
  const [customAppName, setCustomAppName] = useState<string | null>(null);
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<SidebarSectionId>>(
    new Set([DEFAULT_EXPANDED])
  );
  const [pinnedSections, setPinnedSections] = useState<Set<SidebarSectionId>>(new Set());
  const [sidebarExpansionLoaded, setSidebarExpansionLoaded] = useState(false);
  const [skipInitialActiveExpansion, setSkipInitialActiveExpansion] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<HoveredItem>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Load persisted state once the client has hydrated. A stored [] intentionally
  // means "all sections collapsed". localStorage is read through
  // useSyncExternalStore snapshots (server snapshot: null) and the states are
  // adjusted during render (react.dev "You Might Not Need an Effect") so the
  // stored expansion applies before paint without a synchronous effect setState.
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    getHydratedSnapshot,
    getServerHydratedSnapshot
  );
  const storedExpandedRaw = useSyncExternalStore(
    noopSubscribe,
    readStoredExpandedRaw,
    getServerSnapshotNull
  );
  const storedPinnedRaw = useSyncExternalStore(
    noopSubscribe,
    readStoredPinnedRaw,
    getServerSnapshotNull
  );
  if (hydrated && !sidebarExpansionLoaded) {
    const storedExpanded = parseStoredArray<SidebarSectionId[]>(storedExpandedRaw, [
      DEFAULT_EXPANDED,
    ]);
    const storedPinned: SidebarSectionId[] =
      storedPinnedRaw !== null
        ? parseStoredArray<SidebarSectionId[]>(storedPinnedRaw, [])
        : (SIDEBAR_SECTIONS.filter((s) => s.defaultPinned).map((s) => s.id) as SidebarSectionId[]);

    const initialPinned = new Set<SidebarSectionId>(storedPinned);
    const initialExpanded = hydrateExpandedSections(storedExpanded, initialPinned);

    setSkipInitialActiveExpansion(storedExpanded.length === 0);
    setExpandedSections(initialExpanded);
    setPinnedSections(initialPinned);
    setSidebarExpansionLoaded(true);
  }

  useEffect(() => {
    const applySettings = (data) => {
      setShowDebug(data?.debugMode === true);
      setHiddenSidebarItems(normalizeHiddenSidebarItems(data?.[HIDDEN_SIDEBAR_ITEMS_SETTING_KEY]));
      setHiddenSidebarGroupLabels(
        normalizeHiddenSidebarGroupLabels(data?.[HIDDEN_SIDEBAR_GROUP_LABELS_SETTING_KEY])
      );
      setCustomAppName(data?.instanceName || null);
      setCustomLogo(data?.customLogoBase64 || data?.customLogoUrl || null);
      if (typeof data?.radarEnabled === "boolean") {
        setFeatureFlags((prev) => ({ ...prev, RADAR_ENABLED: data.radarEnabled }));
      }
      setRadarAdminUrl(data?.radarAdminUrl ?? null);
    };

    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        applySettings(data);
        if (Array.isArray(data?.[SIDEBAR_SECTION_ORDER_KEY])) {
          setSidebarSectionOrder(data[SIDEBAR_SECTION_ORDER_KEY] as SidebarSectionId[]);
        }
        if (data?.[SIDEBAR_ITEM_ORDER_KEY] && typeof data[SIDEBAR_ITEM_ORDER_KEY] === "object") {
          setSidebarItemOrder(data[SIDEBAR_ITEM_ORDER_KEY] as SidebarItemOrder);
        }
      })
      .catch(() => {});

    const handleSettingsUpdated = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail || {};
      if ("debugMode" in detail) setShowDebug(detail.debugMode === true);
      if (HIDDEN_SIDEBAR_ITEMS_SETTING_KEY in detail) {
        setHiddenSidebarItems(
          normalizeHiddenSidebarItems(detail[HIDDEN_SIDEBAR_ITEMS_SETTING_KEY])
        );
      }
      if (HIDDEN_SIDEBAR_GROUP_LABELS_SETTING_KEY in detail) {
        setHiddenSidebarGroupLabels(
          normalizeHiddenSidebarGroupLabels(detail[HIDDEN_SIDEBAR_GROUP_LABELS_SETTING_KEY])
        );
      }
      if (SIDEBAR_SECTION_ORDER_KEY in detail && Array.isArray(detail[SIDEBAR_SECTION_ORDER_KEY])) {
        setSidebarSectionOrder(detail[SIDEBAR_SECTION_ORDER_KEY] as SidebarSectionId[]);
      }
      if (
        SIDEBAR_ITEM_ORDER_KEY in detail &&
        detail[SIDEBAR_ITEM_ORDER_KEY] &&
        typeof detail[SIDEBAR_ITEM_ORDER_KEY] === "object"
      ) {
        setSidebarItemOrder(detail[SIDEBAR_ITEM_ORDER_KEY] as SidebarItemOrder);
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
    if (!isSidebarItemVisibleForFlags(item, featureFlags)) return null;
    const subtitle = item.subtitleKey
      ? getSidebarLabel(item.subtitleKey, item.subtitleFallback ?? "")
      : item.subtitleFallback;
    return {
      ...item,
      label: getSidebarLabel(item.i18nKey, item.labelFallback ?? item.id),
      subtitle: subtitle || undefined,
    };
  };

  const hiddenSidebarSet = new Set(hiddenSidebarItems);
  const hiddenSidebarGroupLabelsSet = new Set(hiddenSidebarGroupLabels);

  const runtimeSections = resolveRuntimeSidebarSections(SIDEBAR_SECTIONS, { radarAdminUrl });
  const orderedSections = applySectionOrder(
    runtimeSections.filter((section) => section.visibility !== "debug" || showDebug),
    sidebarSectionOrder
  );

  const visibleSections = orderedSections
    .map((section) => {
      const orderedChildren = applyItemOrder(
        section.children,
        sidebarItemOrder[section.id as SidebarSectionId] ?? []
      );

      const children = orderedChildren
        .map((child) => {
          if ("type" in child && child.type === "group") {
            const items = child.items
              .map((item) => resolveItem(item, hiddenSidebarSet))
              .filter(Boolean) as (SidebarItemDefinition & { label: string })[];
            if (items.length === 0) return null;
            // Smart-grouping: single visible item → inline flat (no group header)
            if (items.length === 1) return items[0];
            return {
              ...child,
              title: getSidebarLabel(child.titleKey, child.titleFallback),
              separatorHidden: hiddenSidebarGroupLabelsSet.has(child.id),
              items,
            } as SidebarItemGroup & {
              title: string;
              separatorHidden: boolean;
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

  const isSearching = searchQuery.trim().length > 0;
  const displaySections = isSearching
    ? filterSidebarSectionsByQuery(visibleSections, searchQuery)
    : visibleSections;

  // Keep the active page visible while preserving accordion semantics for
  // unpinned sections. Render-time adjustment (react.dev "You Might Not Need
  // an Effect"): the composite key mirrors the old effect's
  // [activeHref, collapsed, pinnedSections, sidebarExpansionLoaded] deps.
  const activeExpansionKey = `${collapsed}|${sidebarExpansionLoaded}|${activeHref ?? ""}|${[
    ...pinnedSections,
  ]
    .sort()
    .join(",")}`;
  const [prevActiveExpansionKey, setPrevActiveExpansionKey] = useState<string | null>(null);
  if (activeExpansionKey !== prevActiveExpansionKey) {
    setPrevActiveExpansionKey(activeExpansionKey);
    if (!collapsed && sidebarExpansionLoaded) {
      if (skipInitialActiveExpansion) {
        setSkipInitialActiveExpansion(false);
      } else {
        for (const section of visibleSections) {
          const sectionItems = section.children.flatMap((child: any) =>
            child.type === "group" ? child.items : [child]
          );
          if (sectionItems.some((item: any) => !item.external && item.href === activeHref)) {
            setExpandedSections((prev) => {
              const next = expandActiveSection(pinnedSections, section.id as SidebarSectionId);
              if ([...next].every((id) => prev.has(id)) && next.size === prev.size) return prev;
              return next;
            });
            break;
          }
        }
      }
    }
  }

  // Persist the expanded-section set whenever it changes after hydration —
  // single writer replacing the saveToStorage calls that used to run inside
  // setState updaters (side effects belong outside updaters).
  useEffect(() => {
    if (!sidebarExpansionLoaded) return;
    saveToStorage(EXPANDED_SECTIONS_KEY, [...expandedSections]);
  }, [expandedSections, sidebarExpansionLoaded]);

  // Accordion toggle: opening a section closes all non-pinned sections
  const toggleSection = useCallback(
    (sectionId: SidebarSectionId) => {
      setExpandedSections((prev) => toggleExpandedSection(prev, pinnedSections, sectionId));
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
      "relative flex min-h-10 items-center gap-3 rounded-lg transition-colors group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-main",
      collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2",
      active
        ? "bg-surface text-text-main shadow-sm ring-1 ring-border before:absolute before:start-0 before:inset-y-2.5 before:w-0.5 before:rounded-full before:bg-primary"
        : "text-text-main/75 hover:bg-surface/70 hover:text-text-main"
    );
    const iconClassName = cn(
      "material-symbols-outlined text-[18px] shrink-0",
      active ? "fill-1" : "group-hover:text-primary transition-colors"
    );
    const content = (
      <>
        <span aria-hidden="true" className={iconClassName}>
          {item.icon}
        </span>
        {!collapsed && (
          <span
            className={cn("min-w-0 text-sm leading-5", active ? "font-semibold" : "font-medium")}
          >
            {item.label}
          </span>
        )}
      </>
    );
    const sharedProps = {
      "aria-label": item.label,
      title: item.subtitle ? `${item.label} — ${item.subtitle}` : item.label,
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
        prefetch={false}
        aria-current={active ? "page" : undefined}
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
          collapsed ? "w-16" : "w-[264px] max-w-[calc(100vw-48px)]"
        )}
        style={{ paddingTop: isMacElectron ? "var(--desktop-safe-top)" : undefined }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-3 focus:bg-primary focus:text-white focus:rounded-md focus:m-2"
        >
          {t("skipToContent")}
        </a>

        <div
          className={cn(
            "flex shrink-0 items-center gap-2 py-5",
            collapsed ? "flex-col px-2" : "px-5"
          )}
        >
          <Link
            href="/home"
            prefetch={false}
            aria-label={customAppName || APP_CONFIG.name}
            className={cn(
              "flex min-w-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4",
              collapsed ? "justify-center" : "flex-1 gap-3"
            )}
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
              {customLogo ? (
                <img src={customLogo} alt="" className="size-6 object-contain" />
              ) : (
                <OmniRouteLogo size={22} />
              )}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <h1 className="truncate text-base font-semibold tracking-tight text-text-main">
                  {customAppName || APP_CONFIG.name}
                </h1>
                <span className="text-xs text-text-main/70">v{APP_CONFIG.version}</span>
              </div>
            )}
          </Link>
          {onToggleCollapse && (
            <button
              type="button"
              onClick={onToggleCollapse}
              aria-expanded={!collapsed}
              aria-label={collapsed ? t("expandSidebar") : t("collapseSidebar")}
              title={collapsed ? t("expandSidebar") : t("collapseSidebar")}
              className="flex size-8 shrink-0 items-center justify-center rounded-lg text-text-muted hover:bg-surface hover:text-text-main focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                {collapsed ? "left_panel_open" : "left_panel_close"}
              </span>
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label={tc("close")}
              className="flex size-11 shrink-0 items-center justify-center rounded-lg text-text-main hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
          )}
        </div>

        {!collapsed && (
          <div className="px-4 pb-4">
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={tc("search")}
              aria-label={tc("search")}
              icon="search"
              className="gap-0"
              inputClassName="min-h-10 py-2 text-sm bg-surface/70"
            />
          </div>
        )}

        <nav
          aria-label={t("mainNavigation")}
          className={cn(
            "min-h-0 flex-1 overflow-y-auto pb-4 custom-scrollbar",
            collapsed ? "px-2 space-y-0.5" : "px-3"
          )}
        >
          {isSearching && displaySections.length === 0 && (
            <p className="px-2 py-3 text-xs text-text-main/70">{tc("noResults")}</p>
          )}
          {displaySections.map((section, idx) => {
            const sectionId = section.id as SidebarSectionId;
            const isExpanded = isSearching || expandedSections.has(sectionId);
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
              <div
                key={section.id}
                className={isFirst ? "space-y-1" : "mt-4 border-t border-border pt-3"}
              >
                <div className="group/header flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => toggleSection(sectionId)}
                    aria-expanded={isExpanded}
                    aria-controls={`${navigationId}-${section.id}`}
                    className="flex min-h-11 min-w-0 flex-1 items-center justify-between gap-2 rounded-lg px-3 text-start text-xs font-semibold tracking-wide text-text-main/80 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {section.title}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "material-symbols-outlined text-[16px] transition-transform",
                        isExpanded && "rotate-180"
                      )}
                    >
                      expand_more
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => togglePin(sectionId)}
                    aria-label={`${isPinned ? t("unpinSection") : t("pinSectionOpen")}: ${section.title}`}
                    aria-pressed={isPinned}
                    title={isPinned ? t("unpinSection") : t("pinSectionOpen")}
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-lg transition-opacity hover:bg-surface focus-visible:opacity-100 focus-visible:outline-2",
                      isPinned
                        ? "text-text-main"
                        : "text-text-muted opacity-0 group-hover/header:opacity-100 group-focus-within/header:opacity-100"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="material-symbols-outlined text-[14px]"
                      style={isPinned ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      push_pin
                    </span>
                  </button>
                </div>

                {isExpanded && (
                  <div id={`${navigationId}-${section.id}`} className="mt-1 space-y-1">
                    {section.children.map((child: any) => {
                      if (child.type === "group") {
                        if (child.items.length === 0) return null;
                        const separatorHidden = child.separatorHidden === true;
                        const groupExpanded =
                          separatorHidden ||
                          isSearching ||
                          (expandedGroups[child.id] ??
                            child.items.some((item) => item.href === activeHref));
                        return (
                          <div key={child.id} className="mt-2">
                            {!separatorHidden && (
                              <button
                                type="button"
                                aria-expanded={groupExpanded}
                                aria-controls={`${navigationId}-${child.id}`}
                                onClick={() =>
                                  setExpandedGroups((previous) => ({
                                    ...previous,
                                    [child.id]: !groupExpanded,
                                  }))
                                }
                                className="flex min-h-10 w-full items-center justify-between gap-2 rounded-lg px-3 text-start text-xs font-semibold text-text-main/80 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2"
                              >
                                {child.title}
                                <span
                                  aria-hidden="true"
                                  className={cn(
                                    "material-symbols-outlined text-[16px] transition-transform",
                                    groupExpanded && "rotate-90"
                                  )}
                                >
                                  chevron_right
                                </span>
                              </button>
                            )}
                            {groupExpanded && (
                              <div
                                id={`${navigationId}-${child.id}`}
                                className={cn(
                                  "space-y-1",
                                  !separatorHidden && "ms-3 border-s border-border ps-2"
                                )}
                              >
                                {child.items.map(renderNavLink)}
                              </div>
                            )}
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
            aria-label={t("restart")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg font-medium transition-all",
              "text-text-main/70 hover:bg-surface hover:text-text-main",
              collapsed ? "min-h-10 p-2" : "flex-1 min-h-11 min-w-0 px-2 py-2 text-xs"
            )}
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
              restart_alt
            </span>
            {!collapsed && <span className="truncate">{t("restart")}</span>}
          </button>
          <button
            onClick={() => setShowShutdownModal(true)}
            title={t("shutdown")}
            aria-label={t("shutdown")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg font-medium transition-all",
              "text-text-main/70 hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-300",
              collapsed ? "min-h-10 p-2" : "flex-1 min-h-11 min-w-0 px-2 py-2 text-xs"
            )}
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
              power_settings_new
            </span>
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
            <h2 className="text-xl font-semibold text-white mb-2">{t("serverDisconnected")}</h2>
            <p className="text-text-muted mb-6">{t("serverDisconnectedMsg")}</p>
            <Button variant="secondary" onClick={() => globalThis.location.reload()}>
              {t("reloadPage")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
