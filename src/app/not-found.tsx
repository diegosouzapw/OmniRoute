"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("publicSystem");
  const tc = useTranslations("common");

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-bg text-text-main text-center"
      role="main"
      aria-labelledby="not-found-title"
    >
      <div
        className="text-[96px] font-extrabold leading-none mb-2 bg-gradient-to-br from-primary to-primary-hover bg-clip-text text-transparent"
        aria-hidden="true"
      >
        404
      </div>
      <h1 id="not-found-title" className="text-2xl font-semibold mb-2">
        {t("notFound.title")}
      </h1>
      <p className="text-[15px] text-text-muted max-w-[400px] leading-relaxed mb-8">
        {t("notFound.description")}
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/dashboard"
          className="px-8 py-3 rounded-xl text-white text-sm font-medium no-underline transition-all duration-200 motion-reduce:transition-none shadow-warm hover:-translate-y-0.5 bg-gradient-to-br from-primary to-primary-hover hover:shadow-elevated focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          aria-label={t("notFound.dashboardAriaLabel")}
        >
          {tc("goToDashboard")}
        </Link>
        <Link
          href="/status"
          className="px-8 py-3 rounded-xl text-sm font-medium no-underline border border-border hover:bg-bg-alt transition-colors duration-200 motion-reduce:transition-none focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          aria-label={t("notFound.statusAriaLabel")}
        >
          {t("notFound.systemStatus")}
        </Link>
      </div>
    </div>
  );
}
