"use client";

import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";
import NotificationToast from "../NotificationToast";
import MaintenanceBanner from "../MaintenanceBanner";
import { useIsElectron } from "@/shared/hooks/useElectron";
import AutoRoutingBanner from "../AutoRoutingBanner";

const SIDEBAR_COLLAPSED_KEY = "sidebar-collapsed";
const isE2EMode = process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE === "1";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isElectron = useIsElectron();
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true";
    } catch {
      return false;
    }
  });

  const isMacElectron =
    isElectron && typeof window !== "undefined" && window.electronAPI?.platform === "darwin";

  useEffect(() => {
    if (typeof document === "undefined") return;

    document.body.classList.toggle("electron-macos", isMacElectron);

    return () => {
      document.body.classList.remove("electron-macos");
    };
  }, [isMacElectron]);

  const handleToggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
  };

  return (
    <div className="flex h-dvh min-h-0 w-full overflow-hidden bg-bg">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      <div className="hidden min-h-0 lg:flex">
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={handleToggleCollapse}
          isMacElectron={isMacElectron}
        />
      </div>

      {/* Sidebar - Mobile: full viewport height with proper scroll containment */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform lg:hidden transition-transform duration-300 ease-in-out h-dvh overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} isMacElectron={isMacElectron} />
      </div>

      {/* Main content */}
      <main
        id="main-content"
        className="relative flex min-h-0 flex-1 min-w-0 flex-col transition-colors duration-300"
      >
        <Header onMenuClick={() => setSidebarOpen(true)} />
        {!isE2EMode && <MaintenanceBanner />}
        <AutoRoutingBanner />
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar p-4 sm:p-6 lg:p-10">
          <div className="max-w-7xl mx-auto w-full">
            <Breadcrumbs />
            {children}
          </div>
        </div>
      </main>

      {/* Global notification toast system */}
      <NotificationToast />
    </div>
  );
}
