/**
 * Client-side fetch helpers for the TPROXY decrypt capture mode (Epic A, 4c/N).
 *
 * Drive the local-only route /api/tools/agent-bridge/tproxy (#4211):
 *   - GET    → status (running / available / interceptCount / onPort)
 *   - POST   → start (apply TPROXY rules + open transparent listener + install CA)
 *   - DELETE → stop (close listener + uninstall CA + revert rules)
 *
 * Kept DOM-free so request/response/error handling is unit-testable by stubbing
 * global.fetch. The status type is imported type-only so this client bundle never
 * pulls the manager's native-addon / server dependencies.
 */
import type { CaptureManagerStatus } from "@/mitm/tproxy/captureManager";

const ROUTE = "/api/tools/agent-bridge/tproxy";

/** Extract the sanitized server error message, falling back to the status. */
async function errorMessage(res: Response): Promise<string> {
  const body = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
  return body?.error?.message ?? `HTTP ${res.status}`;
}

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(await errorMessage(res));
  return (await res.json()) as T;
}

/** Optional TPROXY config overrides + the sudo password (desktop, non-root only). */
export interface StartTproxyOptions {
  sudoPassword?: string;
  dport?: number;
  onPort?: number;
  mark?: number;
  routeTable?: number;
  bypassMark?: number;
}

/** Current decrypt-capture status (safe to poll). */
export function fetchTproxyStatus(): Promise<CaptureManagerStatus> {
  return requestJson<CaptureManagerStatus>(ROUTE);
}

/** Start decrypt capture; resolves with the resulting status. */
export function startTproxyCaptureMode(
  options: StartTproxyOptions = {}
): Promise<CaptureManagerStatus> {
  return requestJson<{ ok: boolean; status: CaptureManagerStatus }>(ROUTE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(options),
  }).then((r) => r.status);
}

/** Stop decrypt capture; resolves with the resulting status. */
export function stopTproxyCaptureMode(): Promise<CaptureManagerStatus> {
  return requestJson<{ ok: boolean; status: CaptureManagerStatus }>(ROUTE, {
    method: "DELETE",
  }).then((r) => r.status);
}
