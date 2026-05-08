import Link from "next/link";
import { ReactNode, Suspense } from "react";
import { DocsSidebarClient } from "./components/DocsSidebarClient";
import { DocsLocaleSwitcher } from "./components/DocsI18n";

export const metadata = {
  title: {
    template: "%s — OmniRoute Docs",
    default: "OmniRoute Documentation",
  },
  description:
    "Comprehensive documentation for OmniRoute AI gateway — setup, API, compression, deployment, and more.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <a
        href="#docs-main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

      <aside
        className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col lg:border-r lg:border-border"
        role="navigation"
        aria-label="Documentation sidebar"
      >
        <DocsSidebarClient />
      </aside>

      <div className="lg:hidden fixed top-4 left-4 z-50">
        <DocsSidebarClient mobileOnly={true} />
      </div>

      <main id="docs-main-content" className="flex-1 overflow-y-auto bg-bg" tabIndex={-1}>
        <div className="max-w-6xl mx-auto p-4 sm:px-6 lg:px-8 lg:py-8">
          <nav
            className="flex items-center justify-between gap-4 mb-6"
            aria-label="Docs navigation"
          >
            <div className="flex items-center gap-4">
              <Link href="/docs" className="text-text-muted hover:text-text-main transition-colors">
                ← Back to Docs Overview
              </Link>
              <Link
                href="/dashboard"
                className="text-text-muted hover:text-text-main transition-colors"
              >
                ← Dashboard
              </Link>
            </div>
            <Suspense fallback={<div className="w-24 h-8" />}>
              <DocsLocaleSwitcher />
            </Suspense>
          </nav>

          {children}
        </div>
      </main>
    </div>
  );
}
