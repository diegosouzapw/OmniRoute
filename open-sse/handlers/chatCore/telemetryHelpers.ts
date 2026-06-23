import { fetchLiveProviderLimits } from "@/lib/usage/providerLimits";
import { isClaudeExtraUsageBlockEnabled } from "@/lib/providers/claudeExtraUsage";
import { getOriginalFetch } from "@omniroute/open-sse/utils/proxyFetch";

/**
 * Dependency overrides for {@link forwardDashboardEventToLiveWs}. Mirrors the
 * `ProxyFetchDeps` pattern in `open-sse/utils/proxyFetch.ts` so tests can
 * inject a stub without touching `globalThis.fetch`.
 */
export type ForwardDashboardEventDeps = {
  fetch?: typeof globalThis.fetch;
};

export async function forwardDashboardEventToLiveWs(
  event: string,
  payload: unknown,
  deps: ForwardDashboardEventDeps = {}
): Promise<void> {
  // Use the pre-proxy-patch fetch, NOT the global one. The global `fetch` is
  // wrapped by `open-sse/utils/proxyFetch.ts` to retry aggressively on
  // connection failures (undici dispatcher + native fetch fallback). When the
  // live-ws server (port 20129) is down, each chat request triggers a retry
  // storm here, consuming heap until V8 OOMs in ~20s. This call is meant to
  // be a "best-effort sidecar bridge" that does NOT affect the chat hot path,
  // so it must bypass the proxy patch entirely. The 1.5s AbortSignal already
  // provides the bound on latency; no retries are needed.
  const fetchFn = deps.fetch ?? getOriginalFetch();
  const port = process.env.LIVE_WS_PORT || "20129";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1_500);
  try {
    await fetchFn(`http://127.0.0.1:${port}/__omniroute_event`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event, payload, timestamp: Date.now() }),
      signal: controller.signal,
    });
  } catch {
    // Best-effort sidecar bridge; do not affect the chat hot path.
  } finally {
    clearTimeout(timeout);
  }
}

export async function maybeSyncClaudeExtraUsageState({
  provider,
  connectionId,
  providerSpecificData,
  log,
}: {
  provider: string | null | undefined;
  connectionId: string | null | undefined;
  providerSpecificData: unknown;
  log?: { debug?: (...args: unknown[]) => void; warn?: (...args: unknown[]) => void } | null;
}) {
  if (!connectionId || !isClaudeExtraUsageBlockEnabled(provider, providerSpecificData)) {
    return;
  }

  try {
    await fetchLiveProviderLimits(connectionId);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log?.debug?.("CLAUDE_USAGE", `Failed to sync Claude extra-usage state: ${message}`);
  }
}
