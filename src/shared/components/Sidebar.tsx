"use client";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import { APP_CONFIG } from "@/shared/constants/config";
import OmniRouteLogo from "./OmniRouteLogo";
import Button from "./Button";
import { ConfirmModal } from "./Modal";
import CloudSyncStatus from "./CloudSyncStatus";

const navItems = [
  { href: "/dashboard", label: "Home", icon: "home", exact: true },
  { href: "/dashboard/endpoint", label: "Endpoint", icon: "api" },
  { href: "/dashboard/providers", label: "Providers", icon: "dns" },
  { href: "/dashboard/combos", label: "Combos", icon: "layers" },
  { href: "/dashboard/logs", label: "Logs", icon: "description" },
  { href: "/dashboard/costs", label: "Costs", icon: "account_balance_wallet" },
  { href: "/dashboard/analytics", label: "Analytics", icon: "analytics" },
  { href: "/dashboard/limits", label: "Limits & Quotas", icon: "tune" },
  { href: "/dashboard/health", label: "Health", icon: "health_and_safety" },
  { href: "/dashboard/cli-tools", label: "CLI Tools", icon: "terminal" },
];

// Debug items (only show when ENABLE_REQUEST_LOGS=true)
const debugItems = [{ href: "/dashboard/translator", label: "Translator", icon: "translate" }];

const systemItems = [{ href: "/dashboard/settings", label: "Settings", icon: "settings" }];

const helpItems = [
  { href: "/docs", label: "Docs", icon: "menu_book" },
  {
    href: "https://github.com/diegosouzapw/OmniRoute/issues",
    label: "Issues",
    icon: "bug_report",
    external: true,
  },
];

export default function Sidebar({
  onClose,
  collapsed = false,
  onToggleCollapse,
}: {
  onClose?: any;
  collapsed?: boolean;
  onToggleCollapse?: any;
}) {
  const pathname = usePathname();
  const [showShutdownModal, setShowShutdownModal] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  // Check if debug mode is enabled
  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setShowDebug(data?.enableRequestLogs === true))
      .catch(() => {});
  }, []);

  const isActive = (href, exact) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

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
    // Show reconnecting state, then try to reload after a delay
    setIsDisconnected(true);
    setTimeout(() => {
      globalThis.location.reload();
    }, 3000);
  };

  const renderNavLink = (item) => {
    const active = !item.external && isActive(item.href, item.exact);
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
          "flex flex-col border-r border-black/5 dark:border-white/5 bg-vibrancy backdrop-blur-xl transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-72"
        )}
      >
        {/* Skip to content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-3 focus:bg-primary focus:text-white focus:rounded-md focus:m-2"
        >
          Skip to content
        </a>
        {/* Traffic lights + collapse toggle */}
        <div
          className={cn(
            "flex items-center gap-2 pt-5 pb-2",
            collapsed ? "px-3 justify-center" : "px-6"
          )}
          aria-hidden="true"
        >
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          {!collapsed && <div className="flex-1" />}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!collapsed}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={cn(
                "p-1 rounded-md text-text-muted/50 hover:text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                collapsed && "mt-2"
              )}
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                {collapsed ? "chevron_right" : "chevron_left"}
              </span>
            </button>
          )}
        </div>

        {/* Logo */}
        <div className={cn("py-4", collapsed ? "px-2" : "px-6")}>
          <Link
            href="/dashboard"
            className={cn("flex items-center", collapsed ? "justify-center" : "gap-3")}
          >
            <div className="flex items-center justify-center size-9 rounded bg-linear-to-br from-[#E54D5E] to-[#C93D4E] shrink-0">
              <OmniRouteLogo size={20} className="text-white" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold tracking-tight text-text-main">
                  {APP_CONFIG.name}
                </h1>
                <span className="text-xs text-text-muted">v{APP_CONFIG.version}</span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className={cn(
            "flex-1 py-2 space-y-1 overflow-y-auto custom-scrollbar",
            collapsed ? "px-2" : "px-4"
          )}
        >
          {navItems.map(renderNavLink)}

          {/* Debug section */}
          {showDebug && (
            <div className="pt-4 mt-2">
              {!collapsed && (
                <p className="px-4 text-xs font-semibold text-text-muted/60 uppercase tracking-wider mb-2">
                  Debug
                </p>
              )}
              {collapsed && <div className="border-t border-black/5 dark:border-white/5 mb-2" />}
              {debugItems.map(renderNavLink)}
            </div>
          )}

          {/* System section */}
          <div className="pt-4 mt-2">
            {!collapsed && (
              <p className="px-4 text-xs font-semibold text-text-muted/60 uppercase tracking-wider mb-2">
                System
              </p>
            )}
            {collapsed && <div className="border-t border-black/5 dark:border-white/5 mb-2" />}
            {systemItems.map(renderNavLink)}
          </div>

          <div className="pt-4 mt-2">
            {!collapsed && (
              <p className="px-4 text-xs font-semibold text-text-muted/60 uppercase tracking-wider mb-2">
                Help
              </p>
            )}
            {collapsed && <div className="border-t border-black/5 dark:border-white/5 mb-2" />}
            {helpItems.map(renderNavLink)}
          </div>
        </nav>

        {/* Cloud sync status indicator */}
        <CloudSyncStatus collapsed={collapsed} />

        {/* Footer — Shutdown + Restart */}
        <div
          className={cn(
            "border-t border-black/5 dark:border-white/5",
            collapsed ? "p-2 flex flex-col gap-1" : "p-3 flex gap-2"
          )}
        >
          <button
            onClick={() => setShowRestartModal(true)}
            title="Restart server"
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg font-medium transition-all",
              "text-amber-500 hover:bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40",
              collapsed ? "p-2" : "flex-1 px-3 py-2 text-sm"
            )}
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            {!collapsed && "Restart"}
          </button>
          <button
            onClick={() => setShowShutdownModal(true)}
            title="Shutdown server"
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg font-medium transition-all",
              "text-red-500 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40",
              collapsed ? "p-2" : "flex-1 px-3 py-2 text-sm"
            )}
          >
            <span className="material-symbols-outlined text-[18px]">power_settings_new</span>
            {!collapsed && "Shutdown"}
          </button>
        </div>
      </aside>

      {/* Shutdown Confirmation Modal */}
      <ConfirmModal
        isOpen={showShutdownModal}
        onClose={() => setShowShutdownModal(false)}
        onConfirm={handleShutdown}
        title="Close Proxy"
        message="Are you sure you want to close the proxy server?"
        confirmText="Close"
        cancelText="Cancel"
        variant="danger"
        loading={isShuttingDown}
      />

      {/* Restart Confirmation Modal */}
      <ConfirmModal
        isOpen={showRestartModal}
        onClose={() => setShowRestartModal(false)}
        onConfirm={handleRestart}
        title="Restart Proxy"
        message="Are you sure you want to restart the proxy server? It will be back online in a few seconds."
        confirmText="Restart"
        cancelText="Cancel"
        variant="warning"
        loading={isRestarting}
      />

      {/* Disconnected Overlay */}
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

Sidebar.propTypes = {
  onClose: PropTypes.func,
  collapsed: PropTypes.bool,
  onToggleCollapse: PropTypes.func,
};
