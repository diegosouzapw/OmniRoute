/**
 * Runtime state for Traffic Inspector capture modes.
 *
 * Held in module-level variables (process-singleton). Survives across route
 * handler calls for the lifetime of the process.
 *
 * Exported mutation functions are the single write path so all route handlers
 * stay stateless.
 */

import type { HttpProxyServerHandle } from "@/mitm/inspector/httpProxyServer";
import type { PreviousState } from "@/mitm/inspector/systemProxyConfig";

// ── HTTP Proxy ──────────────────────────────────────────────────────────────

let httpProxyHandle: HttpProxyServerHandle | null = null;

export function getHttpProxyHandle(): HttpProxyServerHandle | null {
  return httpProxyHandle;
}

export function setHttpProxyHandle(handle: HttpProxyServerHandle | null): void {
  httpProxyHandle = handle;
}

// ── System Proxy ────────────────────────────────────────────────────────────

interface SystemProxyState {
  applied: boolean;
  port: number | null;
  guardUntil: string | null;  // ISO 8601
  previousState: PreviousState | null;
}

let systemProxyState: SystemProxyState = {
  applied: false,
  port: null,
  guardUntil: null,
  previousState: null,
};

let guardTimer: ReturnType<typeof setTimeout> | null = null;

export function getSystemProxyState(): Readonly<SystemProxyState> {
  return { ...systemProxyState };
}

export function setSystemProxyApplied(
  port: number,
  previousState: PreviousState,
  guardMinutes: number
): void {
  if (guardTimer) clearTimeout(guardTimer);

  const guardUntil = new Date(Date.now() + guardMinutes * 60_000).toISOString();
  systemProxyState = { applied: true, port, guardUntil, previousState };

  guardTimer = setTimeout(
    () => {
      // Auto-revert after guard period — fire-and-forget.
      // Import lazily to avoid circular deps at module load.
      import("@/mitm/inspector/systemProxyConfig").then(({ revert }) => {
        const ps = systemProxyState.previousState;
        systemProxyState = { applied: false, port: null, guardUntil: null, previousState: null };
        if (ps) revert(ps).catch(() => {/* best-effort */});
      }).catch(() => {/* best-effort */});
    },
    guardMinutes * 60_000
  );
}

export function clearSystemProxy(): void {
  if (guardTimer) {
    clearTimeout(guardTimer);
    guardTimer = null;
  }
  systemProxyState = { applied: false, port: null, guardUntil: null, previousState: null };
}

// ── TLS Intercept ───────────────────────────────────────────────────────────

let tlsInterceptEnabled = process.env.INSPECTOR_TLS_INTERCEPT === "true";

export function isTlsInterceptEnabled(): boolean {
  return tlsInterceptEnabled;
}

export function setTlsIntercept(enabled: boolean): void {
  tlsInterceptEnabled = enabled;
}
