"use client";

/**
 * Custom Not Found Page — FASE-04 Error Handling
 *
 * Displayed when a user navigates to a non-existent route.
 */

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-[var(--bg-primary,#0a0a0f)] text-[var(--text-primary,#e0e0e0)] text-center"
      role="main"
      aria-labelledby="not-found-title"
    >
      <div
        className="text-[96px] font-extrabold leading-none mb-2 bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent"
        aria-hidden="true"
      >
        404
      </div>
      <h1
        id="not-found-title"
        className="text-2xl font-semibold mb-2"
      >
        Page not found
      </h1>
      <p className="text-[15px] text-[var(--text-secondary,#888)] max-w-[400px] leading-relaxed mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/dashboard"
        className="px-8 py-3 rounded-[10px] text-white text-sm font-semibold no-underline transition-all duration-200 shadow-[0_4px_16px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] focus:outline-2 focus:outline-offset-2 focus:outline-[#6366f1]"
        aria-label="Return to dashboard"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
