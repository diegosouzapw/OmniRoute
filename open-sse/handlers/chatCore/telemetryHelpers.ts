import { fetchLiveProviderLimits } from "@/lib/usage/providerLimits";
import { isClaudeExtraUsageBlockEnabled } from "@/lib/providers/claudeExtraUsage";

export function resolveLiveWsEventPort(): string | null {
  const configuredPort = process.env.LIVE_WS_PORT?.trim();
  if (configuredPort) {
    return configuredPort;
  }

  const enabled = process.env.OMNIROUTE_ENABLE_LIVE_WS?.trim().toLowerCase();
  return enabled === "1" || enabled === "true" ? "20129" : null;
}

export async function forwardDashboardEventToLiveWs(
  event: string,
  payload: unknown
): Promise<void> {
  const port = resolveLiveWsEventPort();
  if (!port) {
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1_500);
  try {
    await fetch(`http://127.0.0.1:${port}/__omniroute_event`, {
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
