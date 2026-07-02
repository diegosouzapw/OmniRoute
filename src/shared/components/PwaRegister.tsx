"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      // Actively unregister any stale SW from a previous production run.
      // A lingering SW caches /_next/static/chunks/ aggressively in dev,
      // which causes "ServiceWorker intercepted the request and encountered
      // an unexpected error" when turbopack changes chunk hashes on restart.
      navigator.serviceWorker.getRegistrations().then((regs) => {
        for (const reg of regs) reg.unregister();
      });
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Ignore registration failures to avoid blocking app rendering.
    });
  }, []);

  return null;
}
