"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

function subscribeToOnline(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

export default function OfflinePage() {
  const isOnline = useSyncExternalStore(
    subscribeToOnline,
    () => navigator.onLine,
    () => false
  );

  return (
    <main className="min-h-screen text-text-main flex items-center justify-center p-6">
      <section className="w-full max-w-xl rounded-2xl border border-border bg-surface p-8 shadow-soft text-center">
        <span className="material-symbols-outlined text-5xl text-primary mb-3" aria-hidden="true">
          wifi_off
        </span>
        <h1 className="text-2xl font-semibold">Connectivity Issue</h1>
        <p className="mt-3 text-text-muted leading-relaxed">
          OmniRoute cannot reach the network right now. Check your internet, VPN, or proxy settings.
        </p>

        <div
          className={`mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm border ${
            isOnline
              ? "border-green-500/30 text-green-600 dark:text-green-400 bg-green-500/10"
              : "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10"
          }`}
          aria-live="polite"
        >
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            {isOnline ? "wifi" : "wifi_off"}
          </span>
          <span>{isOnline ? "Connection restored" : "Offline mode detected"}</span>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white text-sm font-semibold bg-gradient-to-br from-primary to-primary-hover hover:shadow-elevated transition-all duration-200 motion-reduce:transition-none"
          >
            Retry Connection
          </button>
          <Link
            href="/status"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold border border-border hover:bg-bg-alt transition-colors duration-200 motion-reduce:transition-none"
          >
            Open Status Page
          </Link>
        </div>
      </section>
    </main>
  );
}
