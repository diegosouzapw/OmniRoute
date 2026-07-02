/**
 * chatCore upstream-proxy executor resolver (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore: resolves the executor for a provider honoring the configured
 * upstream proxy mode. `native` / disabled → the provider's own executor; `cliproxyapi` → the
 * CLIProxyAPI passthrough executor; `fallback` → a wrapper that tries the native executor first and
 * retries via CLIProxyAPI on configured failure codes (default 5xx + 429 + network) or on a thrown
 * error. Behaviour is byte-identical to the previous inline closure (it only captured `log`).
 */

import { getExecutor } from "../../executors/index.ts";
import { getCachedSettings } from "@/lib/db/readCache";
import { getUpstreamProxyConfigCached } from "./comboContextCache.ts";

type LoggerLike =
  | {
      info?: (...args: unknown[]) => void;
      error?: (...args: unknown[]) => void;
      warn?: (...args: unknown[]) => void;
    }
  | null
  | undefined;

export async function resolveExecutorWithProxy(prov: string, log?: LoggerLike) {
  const cfg = await getUpstreamProxyConfigCached(prov);
  if (!cfg.enabled || cfg.mode === "native") return getExecutor(prov);

  if (cfg.mode === "cliproxyapi") {
    log?.info?.("UPSTREAM_PROXY", `${prov} routed through CLIProxyAPI (passthrough)`);
    return getExecutor("cliproxyapi");
  }

  // mode === "fallback": try native first, retry via CLIProxyAPI on specific failures
  const nativeExec = getExecutor(prov);
  const proxyExec = getExecutor("cliproxyapi");

  // Read custom fallback codes from settings. Default: 5xx + 429 + network errors.
  let fallbackCodes: number[] = [429, 500, 502, 503, 504];
  try {
    const allSettings = await getCachedSettings();
    if (
      typeof allSettings.cliproxyapi_fallback_codes === "string" &&
      allSettings.cliproxyapi_fallback_codes.trim()
    ) {
      const parsed = allSettings.cliproxyapi_fallback_codes
        .split(",")
        .map((s: string) => Number.parseInt(s.trim(), 10))
        .filter((n: number) => !Number.isNaN(n));
      if (parsed.length > 0) fallbackCodes = parsed;
    }
  } catch {
    /* use defaults */
  }
  const isRetryableStatus = (s: number) => fallbackCodes.includes(s) || s === 0;

  const wrapper = Object.create(nativeExec);
  wrapper.execute = async (input: {
    model: string;
    body: unknown;
    stream: boolean;
    credentials: unknown;
    signal?: AbortSignal | null;
    log?: unknown;
    upstreamExtraHeaders?: Record<string, string> | null;
  }) => {
    let result;
    try {
      result = await nativeExec.execute(input);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      log?.info?.("UPSTREAM_PROXY", `${prov} native error (${errMsg}), retrying via CLIProxyAPI`);
      try {
        return await proxyExec.execute(input);
      } catch (proxyErr) {
        const proxyMsg = proxyErr instanceof Error ? proxyErr.message : String(proxyErr);
        log?.error?.("UPSTREAM_PROXY", `${prov} CLIProxyAPI fallback also failed: ${proxyMsg}`);
        throw proxyErr;
      }
    }

    if (!isRetryableStatus(result.response.status)) {
      return result;
    }
    log?.info?.(
      "UPSTREAM_PROXY",
      `${prov} native failed (${result.response.status}), retrying via CLIProxyAPI`
    );
    try {
      return await proxyExec.execute(input);
    } catch (proxyErr) {
      const proxyMsg = proxyErr instanceof Error ? proxyErr.message : String(proxyErr);
      log?.error?.("UPSTREAM_PROXY", `${prov} CLIProxyAPI fallback also failed: ${proxyMsg}`);
      throw proxyErr;
    }
  };
  return wrapper;
}
