/**
 * Shared socket idle-timeout helper for the MITM proxy + HTTP-proxy listeners.
 *
 * Mirrors ProxyBridge's 60s relay idle timeout (ProxyBridge.c uses
 * poll(..., 60000) on every relay connection) so hung / half-open tunnels —
 * dropped Wi-Fi, dead upstreams that never send FIN/RST — cannot accumulate and
 * exhaust file descriptors, wedging the proxy under real agent traffic. (Gap 10.)
 */
import type { Socket } from "node:net";

function parseEnvNumber(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export const MITM_IDLE_TIMEOUT_MS = parseEnvNumber(process.env.MITM_IDLE_TIMEOUT_MS, 60000);

/** Destroy `socket` if it is idle (no I/O) for `ms` milliseconds. */
export function applyIdleTimeout(socket: Socket, ms: number = MITM_IDLE_TIMEOUT_MS): void {
  socket.setTimeout(ms, () => {
    socket.destroy();
  });
}
