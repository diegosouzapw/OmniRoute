"use client";

import { useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const DISMISS_STORAGE_KEY = "omniroute-first-run-readiness-dismissed";

type FirstRunReadinessCardProps = {
  setupComplete: boolean;
};

// #9985: dismissal lives in localStorage, read via useSyncExternalStore — keeps
// the component free of setState-in-effect cascades and hydration-safe (server
// snapshot treats the card as dismissed; the client corrects after hydration).
const readinessListeners = new Set<() => void>();

function subscribeReadiness(onStoreChange: () => void): () => void {
  readinessListeners.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    readinessListeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function isReadinessDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISS_STORAGE_KEY) === "true";
  } catch {
    // Storage unavailable (private mode etc.) — never show the nagging card.
    return true;
  }
}

function getServerSnapshot(): boolean {
  return true;
}

/**
 * Soft entry path for first-run users. Replaces the hard redirect to
 * /dashboard/onboarding so returning users can dismiss and stay on Home.
 */
export default function FirstRunReadinessCard({ setupComplete }: FirstRunReadinessCardProps) {
  const t = useTranslations("home");
  const dismissed = useSyncExternalStore(subscribeReadiness, isReadinessDismissed, getServerSnapshot);

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(DISMISS_STORAGE_KEY, "true");
    } catch {
      // ignore storage failures; still hide for this session
    }
    for (const listener of readinessListeners) listener();
  }, []);

  if (setupComplete || dismissed) return null;

  const steps = [
    t("readinessStep1"),
    t("readinessStep2"),
    t("readinessStep3"),
    t("readinessStep4"),
  ];

  return (
    <div
      role="region"
      aria-label={t("readinessTitle")}
      className="mb-4 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-5 py-4"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-blue-700/80 dark:text-blue-300/80">
            {t("readinessEyebrow")}
          </p>
          <h2 className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-100">
            {t("readinessTitle")}
          </h2>
          <p className="mt-1 text-sm text-blue-900/80 dark:text-blue-200/80">
            {t("readinessSubtitle")}
          </p>
          <ol className="mt-3 space-y-1.5 text-sm text-blue-900 dark:text-blue-100">
            {steps.map((label, index) => (
              <li key={label} className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-200/80 dark:bg-blue-400/20 text-xs font-semibold text-blue-800 dark:text-blue-200">
                  {index + 1}
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/onboarding"
              className="inline-flex items-center rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              {t("readinessContinue")}
            </Link>
            <button
              type="button"
              onClick={dismiss}
              className="text-sm font-medium text-blue-800/80 hover:text-blue-950 dark:text-blue-200/80 dark:hover:text-blue-100"
            >
              {t("readinessDismiss")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
