"use client";

import { useState, useEffect } from "react";
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
  normalizeHiddenSidebarItems,
} from "@/shared/constants/sidebarVisibility";

const isE2EMode = process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE === "1";

type SidebarProps = {
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  isMacElectron?: boolean;
};

export default function Sidebar({
  onClose,
  collapsed = false,
  onToggleCollapse,
  isMacElectron = false,
}: SidebarProps) {
  const pathname = usePathname();
  const t = useTranslations("sidebar");
  const tc = useTranslations("common");
  const [showShutdownModal, setShowShutdownModal] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [hiddenSidebarItems, setHiddenSidebarItems] = useState<string[]>([]);
  const [customAppName, setCustomAppName] = useState<string | null>(null);
  const [customLogo, setCustomLogo] = useState<string | null>(null);

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

      if ("debugMode" in detail) {
        setShowDebug(detail.debugMode === true);
      }

      if (HIDDEN_SIDEBAR_ITEMS_SETTING_KEY in detail) {
        setHiddenSidebarItems(
          normalizeHiddenSidebarItems(detail[HIDDEN_SIDEBAR_ITEMS_SETTING_KEY])
        );
      }

      if ("instanceName" in detail) {
        setCustomAppName((detail.instanceName as string) || null);
      }

      if ("customLogoBase64" in detail) {
        setCustomLogo((detail.customLogoBase64 as string) || null);
      } else if ("customLogoUrl" in detail) {
        setCustomLogo((detail.customLogoUrl as string) || null);
      }
    };

    window.addEventListener(SIDEBAR_SETTINGS_UPDATED_EVENT, handleSettingsUpdated as EventListener);

    return () => {
      window.removeEventListener(
        SIDEBAR_SETTINGS_UPDATED_EVENT,
        handleSettingsUpdated as EventListener
      );
    };
  }, []);

  const handleShutdown = async () => {
    setIsShuttingDown(true);
    try {
      await fetch("/api/shutdown", { method: "POST" });
    } catch (e) {
      // Expected to fail as server shuts down; ignore error
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
    setTimeout(() => {
      globalThis.location.reload();
    }, 3000);
  };

  const getSidebarLabel = (key: string, fallback: string) =>
    typeof t.has === "function" && t.has(key) ? t(key) : fallback;

  const hiddenSidebarSet = new Set(hiddenSidebarItems);
  const visibleSections = SIDEBAR_SECTIONS.filter(
    (section) => section.visibility !== "debug" || showDebug
  )
    .map((section) => ({
      ...section,
      title: getSidebarLabel(section.titleKey, section.titleFallback),
      items: section.items
        .map((item) => ({ ...item, label: t(item.i18nKey) }))
        .filter((item) => !hiddenSidebarSet.has(item.id)),
    }))
    .filter((section) => section.items.length > 0);
  const activeHref = getActiveSidebarHref(
    pathname,
    visibleSections.flatMap((section) => section.items)
  );

  const renderNavLink = (item) => {
    const active = !item.external && activeHref === item.href;
    const className = cn(
      "flex items-center gap-3 rounded-lg transition-all group",
      collapsed ? "justify-center px-2 py-2.5" : "px-4 py-2",
      active
        ? "bg-primary/10 text-primary"
        : "text-text-muted hover:bg-surface/50 hover:text-text-main"
    );
    const iconClassName = cn(
      "material-symbols-outlined text-[18px]",
      active ? "fill-1" : "group-hover:text-primary transition-colors"
    );
    const content = (
      <>
        <span className={iconClassName}>{item.icon}</span>
        {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
      </>
    );

    if (item.external) {
      return (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          title={collapsed ? item.label : undefined}
          className={className}
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
        title={collapsed ? item.label : undefined}
        className={className}
      >
        {content}
      </Link>
    );
  };

  return (
    <>
      <aside
        className={cn(
          "flex h-full min-h-0 flex-col border-r border-black/5 bg-sidebar transition-all duration-300 ease-in-out dark:border-white/5",
          collapsed ? "w-16" : "w-80"
        )}
        style={{
          paddingTop: isMacElectron ? "var(--desktop-safe-top)" : undefined,
        }}
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
              collapsed ? "px-3 justify-center" : "px-6"
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

        <div className={cn("py-4", collapsed ? "px-2" : "px-6")}>
          <Link
            href="/dashboard"
            className={cn("flex items-center", collapsed ? "justify-center" : "gap-3")}
          >
            <div className="flex items-center justify-center size-9 rounded bg-linear-to-br from-[#E54D5E] to-[#C93D4E] shrink-0">
              {customLogo ? (
                <img
                  src={customLogo}
                  alt={customAppName || APP_CONFIG.name}
                  className="size-5 object-contain"
                />
              ) : (
                <OmniRouteLogo size={20} className="text-white" />
              )}
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold tracking-tight text-text-main">
                  {customAppName || APP_CONFIG.name}
                </h1>
                <span className="text-xs text-text-muted">v{APP_CONFIG.version}</span>
              </div>
            )}
          </Link>
        </div>

        <nav
          aria-label="Main navigation"
          className={cn(
            "min-h-0 flex-1 space-y-1 overflow-y-auto py-2 custom-scrollbar",
            collapsed ? "px-2" : "px-4"
          )}
        >
          {visibleSections.map((section) => {
            const showTitle = section.showTitleInSidebar !== false;

            return (
              <div key={section.id} className={showTitle ? "pt-4 mt-2" : undefined}>
                {!collapsed && showTitle && (
                  <p className="px-4 text-xs font-semibold text-text-muted/60 uppercase tracking-wider mb-2">
                    {section.title}
                  </p>
                )}
                {collapsed && showTitle && (
                  <div className="border-t border-black/5 dark:border-white/5 mb-2" />
                )}
                {section.items.map(renderNavLink)}
              </div>
            );
          })}
        </nav>

        {!isE2EMode && <CloudSyncStatus collapsed={collapsed} />}

        <div
          className={cn(
            "shrink-0 border-t border-black/5 dark:border-white/5",
            collapsed ? "p-2 flex flex-col gap-1" : "p-3 flex gap-2"
          )}
          style={{
            paddingBottom: isMacElectron ? "calc(0.75rem + var(--desktop-safe-bottom))" : undefined,
          }}
        >
          <button
            onClick={() => setShowRestartModal(true)}
            title={t("restart")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg font-medium transition-all",
              "text-amber-500 hover:bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40",
              collapsed ? "p-2" : "flex-1 min-w-0 px-3 py-2 text-xs"
            )}
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            {!collapsed && t("restart")}
          </button>
          <button
            onClick={() => setShowShutdownModal(true)}
            title={t("shutdown")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg font-medium transition-all",
              "text-red-500 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40",
              collapsed ? "p-2" : "flex-1 min-w-0 px-3 py-2 text-xs"
            )}
          >
            <span className="material-symbols-outlined text-[18px]">power_settings_new</span>
            {!collapsed && t("shutdown")}
          </button>
        </div>
      </aside>

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
