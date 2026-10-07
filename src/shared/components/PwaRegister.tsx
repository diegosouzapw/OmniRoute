"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    // Disable service worker in development to avoid chunk loading / HMR conflicts.
    // A visitor who previously loaded a production build on this origin (or an
    // older dev build from before this gate existed) can still have one left
    // over — it keeps intercepting navigations/assets, occasionally serving a
    // JS chunk that doesn't match the currently running dev server, which
    // triggers Next's dev-client auto-reload-on-chunk-mismatch recovery. Since
    // the stale worker never goes away on its own, that repeats forever
    // (visible as an unexplained refresh loop). Proactively unregister and
    // drop its caches instead of merely skipping a new registration.
    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => Promise.all(registrations.map((r) => r.unregister())))
        .catch(() => {});
      if (typeof caches !== "undefined") {
        caches
          .keys()
          .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
          .catch(() => {});
      }
      return;
    }

    // A changed query string only busts the HTTP cache; the browser installs a
    // new worker generation only when the script bytes differ. A deploy that
    // ships sw.js with the same bytes leaves the previous worker in place, and
    // that worker keeps answering /_next/static/<old-build>/ from its cache
    // long after those files are gone — the page renders blank and a reload
    // hangs, because the worker intercepts the navigation again. The cache name
    // is the build identity, so when a cache from another build is still
    // present, drop the worker and every cache, then reload exactly once.
    const workerUrl = `/sw.js?v=${process.env.NEXT_PUBLIC_SW_BUILD_ID}`;
    const RESET_FLAG = "omniroute-sw-reset";
    void (async () => {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        if (registrations.length > 0 && typeof caches !== "undefined") {
          const served = await fetch("/sw.js", { cache: "no-store" });
          const servedText = served.ok ? await served.text() : "";
          const declared = servedText.match(/CACHE_NAME\s*=\s*"([^"]+)"/);
          const cacheNames = await caches.keys();
          const foreign = declared ? cacheNames.filter((name) => name !== declared[1]) : [];
          if (foreign.length > 0 && sessionStorage.getItem(RESET_FLAG) !== "1") {
            sessionStorage.setItem(RESET_FLAG, "1");
            await Promise.all(registrations.map((r) => r.unregister()));
            await Promise.all(cacheNames.map((name) => caches.delete(name)));
            window.location.reload();
            return;
          }
        }
      } catch {
        // Detection is best-effort; fall through to a normal registration.
      }
      sessionStorage.removeItem(RESET_FLAG);
      void navigator.serviceWorker.register(workerUrl)?.catch(() => {
        // Ignore registration failures to avoid blocking app rendering.
      });
    })();
  }, []);

  return null;
}
