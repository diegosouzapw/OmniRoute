/**
 * Derive the live WebSocket path from `NEXT_PUBLIC_LIVE_WS_PUBLIC_URL`.
 *
 * Only `ws://` or `wss://` URLs are accepted (mirrors the scheme guard in
 * `getLivePublicUrl()`). The pathname is extracted and used as the WS upgrade
 * path; if the URL has no pathname (or is `/`), falls back to `/live-ws`.
 *
 * Used by:
 * - `src/app/api/v1/ws/route.ts` — handshake response `path` field
 * - `src/hooks/useLiveDashboard.ts` — build-time path constant + runtime discovery
 *
 * No env var is introduced — this reads the existing `NEXT_PUBLIC_LIVE_WS_PUBLIC_URL`.
 */
export function deriveLiveWsPath(publicUrl?: string): string {
  if (!publicUrl) return "/live-ws";
  if (!publicUrl.startsWith("ws://") && !publicUrl.startsWith("wss://")) return "/live-ws";
  try {
    const parsed = new URL(publicUrl);
    const pathname = parsed.pathname;
    return pathname && pathname !== "/" ? pathname : "/live-ws";
  } catch {
    return "/live-ws";
  }
}

/**
 * The operator-declared public WebSocket URL, resolved at RUNTIME.
 *
 * `NEXT_PUBLIC_*` is inlined into the client bundle at BUILD time, so a prebuilt
 * Docker or npm image can never carry an operator's value — which is exactly why
 * the server echoes this in `/api/v1/ws?handshake=1` for the client to discover.
 * Reading only the `NEXT_PUBLIC_`-prefixed name on the server made that echo
 * unreachable too: behind a reverse proxy the dashboard kept dialling
 * `wss://<host>:20132/live-ws` and reported "Live disabled" (#11331).
 *
 * `LIVE_WS_PUBLIC_URL` is the runtime name, alongside the existing runtime
 * `LIVE_WS_HOST` / `LIVE_WS_PORT`. The prefixed name still wins nothing and loses
 * nothing — it stays supported as the fallback so existing deployments that set it
 * (build-time or in the container) keep working.
 */
export function resolveLiveWsPublicUrl(env: NodeJS.ProcessEnv = process.env): string | null {
  const candidates = [env.LIVE_WS_PUBLIC_URL, env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL];
  for (const candidate of candidates) {
    if (typeof candidate !== "string") continue;
    const trimmed = candidate.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("ws://") || trimmed.startsWith("wss://")) return trimmed;
  }
  return null;
}

/** Convenience: read the env var at call time and derive the path. */
export function getLiveWsPath(): string {
  return deriveLiveWsPath(resolveLiveWsPublicUrl() ?? undefined);
}

export function sanitizeLiveWsPort(value: unknown): number | null {
  const port = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) return null;
  return port;
}

export function resolveLiveWsUrl({
  explicit,
  handshakeUrl,
  handshakePort,
  handshakePath,
  defaultUrl,
}: {
  explicit?: string;
  handshakeUrl?: string | null;
  handshakePort?: number | null;
  handshakePath?: string | null;
  defaultUrl: string;
}): string {
  if (explicit && (explicit.startsWith("ws://") || explicit.startsWith("wss://"))) {
    return explicit;
  }

  if (handshakeUrl && (handshakeUrl.startsWith("ws://") || handshakeUrl.startsWith("wss://"))) {
    return handshakeUrl;
  }

  if (handshakePort !== null && handshakePort !== undefined) {
    try {
      const parsed = new URL(defaultUrl);
      parsed.port = String(handshakePort);
      if (handshakePath) parsed.pathname = handshakePath;
      return parsed.toString();
    } catch {
      // Fall through to the default URL.
    }
  }

  if (handshakePath) {
    try {
      const parsed = new URL(defaultUrl);
      parsed.pathname = handshakePath;
      return parsed.toString();
    } catch {
      // Fall through to the default URL.
    }
  }

  return defaultUrl;
}
