"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";
import NotificationToast from "../NotificationToast";
import MaintenanceBanner from "../MaintenanceBanner";
import { SIDEBAR_SECTIONS } from "@/shared/constants/sidebarVisibility";

const SIDEBAR_COLLAPSED_KEY = "sidebar-collapsed";
const DASHBOARD_WARMUP_DELAY_MS = 150;
const DASHBOARD_WARMUP_CONCURRENCY = 4;
const DASHBOARD_PRIORITY_ROUTES = [
  "/dashboard/settings",
  "/dashboard/providers",
  "/dashboard/endpoint",
  "/dashboard/logs",
  "/dashboard/combos",
  "/dashboard/analytics",
  "/dashboard/costs",
  "/dashboard/health",
];

type WarmupWindow = Window &
  typeof globalThis & {
    __omnirouteDashboardRoutesWarmed?: boolean;
  };

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
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

  useEffect(() => {
    if (process.env.NODE_ENV !== "development" || typeof window === "undefined") return;

    const win = window as WarmupWindow;
    if (win.__omnirouteDashboardRoutesWarmed) return;
    win.__omnirouteDashboardRoutesWarmed = true;

    const routes = Array.from(
      new Set(
        SIDEBAR_SECTIONS.flatMap((section) =>
          section.items
            .filter((item) => !item.external && item.href.startsWith("/dashboard"))
            .map((item) => item.href)
        )
      )
    )
      .filter((href) => href !== pathname)
      .sort((left, right) => {
        const leftPriority = DASHBOARD_PRIORITY_ROUTES.indexOf(left);
        const rightPriority = DASHBOARD_PRIORITY_ROUTES.indexOf(right);
        const normalizedLeft = leftPriority === -1 ? Number.MAX_SAFE_INTEGER : leftPriority;
        const normalizedRight = rightPriority === -1 ? Number.MAX_SAFE_INTEGER : rightPriority;
        return normalizedLeft - normalizedRight;
      });

    let cancelled = false;

    const warmRoutes = async () => {
      let cursor = 0;

      const workers = Array.from({
        length: Math.min(DASHBOARD_WARMUP_CONCURRENCY, routes.length),
      }).map(async () => {
        while (!cancelled) {
          const href = routes[cursor];
          cursor += 1;

          if (!href) {
            return;
          }

          try {
            router.prefetch(href);
          } catch {}

          try {
            await fetch(href, {
              credentials: "same-origin",
              cache: "no-store",
              headers: { "x-omniroute-dev-warmup": "1" },
            });
          } catch {}
        }
      });

      await Promise.allSettled(workers);
    };

    const timeoutHandle = window.setTimeout(() => {
      void warmRoutes();
    }, DASHBOARD_WARMUP_DELAY_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutHandle);
    };
  }, [pathname, router]);

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

      {/* Sidebar - Mobile: full viewport height with proper scroll containment */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform lg:hidden transition-transform duration-300 ease-in-out h-dvh overflow-y-auto ${
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
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar p-4 sm:p-6 lg:p-10">
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
