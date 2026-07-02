"use client";

import { useTranslations } from "next-intl";

/**
 * 403 Forbidden Page — Phase 8.1
 *
 * Displayed when access is denied due to:
 * - Invalid API key
 * - IP not in allowlist
 * - Rate limit exceeded
 */

import Link from "next/link";

export default function ForbiddenPage() {
  const t = useTranslations("auth");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[var(--bg-primary,#0a0a0f)] text-[var(--text-primary,#e0e0e0)] text-center">
      <div
        className="text-[96px] font-extrabold leading-none mb-2"
        style={{
          background: "linear-gradient(135deg, #ef4444 0%, #f97316 50%, #eab308 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        403
      </div>
      <h1 className="text-2xl font-semibold mb-2">{t("accessDenied")}</h1>
      <p className="text-[15px] text-[var(--text-secondary,#888)] max-w-[400px] leading-relaxed mb-8">
        {t("accessDeniedDescription")}
      </p>
      <Link
        href="/dashboard"
        className="px-8 py-3 rounded-[10px] text-white text-sm font-semibold no-underline transition-all duration-200 shadow-[0_4px_16px_rgba(99,102,241,0.3)] hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        }}
      >
        {t("goToDashboard")}
      </Link>
    </div>
  );
}
