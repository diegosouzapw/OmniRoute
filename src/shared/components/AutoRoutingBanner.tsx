"use client";

import { useEffect, useState } from "react";

const AUTO_ROUTING_DISMISSED_KEY = "auto-routing-banner-dismissed";

export default function AutoRoutingBanner() {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(AUTO_ROUTING_DISMISSED_KEY);
      if (dismissed === "true") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsDismissed(true);
      }
    } catch {
      // localStorage unavailable (SSR or private mode) — do nothing
    }
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem(AUTO_ROUTING_DISMISSED_KEY, "true");
    } catch {
      // ignore localStorage errors (private mode, quotas)
    }

    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <div
      role="banner"
      aria-label="Auto-routing mode active"
      className="relative overflow-hidden rounded-lg border-l-4 border-blue-500 bg-blue-50/50 p-4 my-4 dark:bg-blue-950/30 transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-blue-500" />
          <span className="font-semibold text-sm text-blue-700 dark:text-blue-300">
            Auto-Routing Active
          </span>
        </div>
        <div className="text-sm leading-relaxed text-text-muted">
          OmniRoute is automatically routing requests using combo-based strategies.
          <span className="block sm:inline sm:ml-1">
            View or change your routing configuration on the{" "}
            <a
              href="/dashboard/combos"
              className="text-blue-600 hover:text-blue-800 underline dark:text-blue-400 dark:hover:text-blue-300"
            >
              Combos page
            </a>
            .
          </span>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss auto-routing banner"
          className="ml-auto flex-shrink-0 rounded-md p-1 text-text-muted hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/50 dark:hover:text-blue-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
