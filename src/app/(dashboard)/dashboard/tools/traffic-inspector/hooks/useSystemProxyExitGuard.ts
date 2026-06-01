"use client";

import { useEffect, useRef } from "react";

interface UseSystemProxyExitGuardOpts {
  applied: boolean; // current state (from GET capture-modes)
  endpoint?: string; // POST /capture-modes/system-proxy
}

/**
 * On unmount / page hide / beforeunload, if system proxy is applied,
 * silently fires a revert request via navigator.sendBeacon (best-effort,
 * survives unload) AND attaches a beforeunload listener that prompts the
 * user with a native confirm dialog (browser default — text is ignored
 * by most browsers but the prompt itself appears).
 */
export function useSystemProxyExitGuard(opts: UseSystemProxyExitGuardOpts): void {
  // 1. Track latest 'applied' in a ref so the listener always sees fresh value
  const appliedRef = useRef(opts.applied);
  useEffect(() => {
    appliedRef.current = opts.applied;
  }, [opts.applied]);

  useEffect(() => {
    const endpoint =
      opts.endpoint ?? "/api/tools/traffic-inspector/capture-modes/system-proxy";
    const body = JSON.stringify({ action: "revert" });
    const blob = new Blob([body], { type: "application/json" });

    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (!appliedRef.current) return;
      // Best-effort revert via sendBeacon (survives navigation)
      try {
        navigator.sendBeacon(endpoint, blob);
      } catch {
        /* ignore */
      }
      // Show confirmation prompt
      e.preventDefault();
      e.returnValue = "System-wide proxy still active — leave page anyway?";
      return e.returnValue;
    };

    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
      // On component unmount (SPA navigation), fire revert too
      if (appliedRef.current) {
        try {
          navigator.sendBeacon(endpoint, blob);
        } catch {
          /* ignore */
        }
      }
    };
  }, [opts.endpoint]);
}
