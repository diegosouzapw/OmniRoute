"use client";

import { useTranslations } from "next-intl";

export default function CombosError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("combos");

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[400px]"
      role="alert"
      aria-live="assertive"
    >
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">{t("errorTitle")}</h2>
        <p className="text-text-muted max-w-md">{t("errorDescription")}</p>
        {_error?.digest && (
          <p className="text-xs text-text-muted font-mono">{t("errorId", { id: _error.digest })}</p>
        )}
        {process.env.NODE_ENV === "development" && _error?.message && (
          <p className="text-xs text-red-600 dark:text-red-400 font-mono">{_error.message}</p>
        )}
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-primary"
        >
          {t("errorRetry")}
        </button>
      </div>
    </div>
  );
}
