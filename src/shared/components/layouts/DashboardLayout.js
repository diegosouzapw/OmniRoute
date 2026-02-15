"use client";

import { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";
import NotificationToast from "../NotificationToast";
import MaintenanceBanner from "../MaintenanceBanner";

const SIDEBAR_COLLAPSED_KEY = "sidebar-collapsed";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true";
    } catch {
      return false;
    }
  });

  const handleToggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex">
        <Sidebar collapsed={collapsed} onToggleCollapse={handleToggleCollapse} />
      </div>

      {/* Sidebar - Mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform lg:hidden transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main
        id="main-content"
        className="flex flex-col flex-1 h-full min-w-0 relative transition-colors duration-300"
      >
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <MaintenanceBanner />
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
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
