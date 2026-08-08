/**
 * chatCore upstream-proxy executor resolver (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore: resolves the executor for a provider honoring the configured
 * upstream proxy mode. `native` / disabled → the provider's own executor; `cliproxyapi` → the
 * CLIProxyAPI passthrough executor; `dario` → the Dario passthrough executor; `fallback` → a
 * wrapper that tries the native executor first and retries via the configured fallback backend
 * (CLIProxyAPI by default, or Dario) on configured failure codes (default 5xx + 429 + network)
 * or on a thrown error.
 *
 * Dario (@askalf/dario) is wired as a parallel, independent backend choice at both levels
 * (per-connection `darioMode` + provider `mode`/`fallbackBackend`) WITHOUT changing any existing
 * CLIProxyAPI behaviour. Dario needs neither the dedicated-credential substitution nor the
 * per-provider model-mapping wrappers CLIProxyAPI uses: it authenticates via its own OAuth
 * account pool (not a configured bearer key) and has its own server-side model-alias mechanism.
 */

import { getExecutor } from "../../executors/index.ts";
import { isCliproxyapiDeepModeEnabled } from "../../executors/cliproxyapi.ts";
import { isDarioDeepModeEnabled } from "../../executors/dario.ts";
import { getCachedSettings } from "@/lib/db/readCache";
import { getUpstreamProxyConfigCached } from "./comboContextCache.ts";
import type { FallbackBackend } from "@/lib/db/upstreamProxy";
import { wrapExecutorWithCliproxyapiModelMapping } from "./cliproxyModelMapping.ts";
import {
  resolveDedicatedCliproxyapiApiKey,
  wrapExecutorWithCliproxyapiCredentials,
} from "./cliproxyapiCredentials.ts";

type LoggerLike =
  | {
      info?: (...args: unknown[]) => void;
      error?: (...args: unknown[]) => void;
      warn?: (...args: unknown[]) => void;
    }
  | null
  | undefined;

const DEFAULT_FALLBACK_CODES = [429, 500, 502, 503, 504];

function parseFallbackCodes(raw: unknown): number[] | null {
  if (typeof raw !== "string" || !raw.trim()) return null;
  const parsed = raw
    .split(",")
    .map((s) => Number.parseInt(s.trim(), 10))
    .filter((n) => !Number.isNaN(n));
  return parsed.length > 0 ? parsed : null;
}

/**
 * Reads the CLIProxyAPI-related settings shared by both the direct
 * `mode: "cliproxyapi"` passthrough leg and the `mode: "fallback"` retry leg:
 * the custom fallback status codes and the dedicated credential (#7645).
 * Falls back to defaults / no dedicated key on any read failure.
 */
async function loadCliproxyapiSettings(): Promise<{
  fallbackCodes: number[];
  dedicatedApiKey: string | null;
}> {
  try {
    const allSettings = await getCachedSettings();
    return {
      fallbackCodes: parseFallbackCodes(allSettings.cliproxyapi_fallback_codes) ?? [
        ...DEFAULT_FALLBACK_CODES,
      ],
      dedicatedApiKey: resolveDedicatedCliproxyapiApiKey(allSettings),
    };
  } catch {
    return { fallbackCodes: [...DEFAULT_FALLBACK_CODES], dedicatedApiKey: null };
  }
}

/**
 * Resolve the CLIProxyAPI passthrough executor with its model-mapping +
 * dedicated-credential wrappers applied. Used by the direct `cliproxyapi` leg
 * and the CLIProxyAPI branch of `fallback`.
 */
function resolveCliproxyapiExecutor(
  cliproxyapiModelMapping: Record<string, unknown> | null,
  dedicatedApiKey: string | null
) {
  return wrapExecutorWithCliproxyapiCredentials(
    wrapExecutorWithCliproxyapiModelMapping(getExecutor("cliproxyapi"), cliproxyapiModelMapping),
    dedicatedApiKey
  );
}

export async function resolveExecutorWithProxy(
  prov: string,
  log?: LoggerLike,
  providerSpecificData?: Record<string, unknown> | null
) {
  // Per-connection routing override (#6339): the resolved connection can opt itself
  // into the CLIProxyAPI passthrough executor via providerSpecificData.cliproxyapiMode
  // === "claude-native" (UI toggle). This takes precedence over the provider-level
  // upstream_proxy_config mode — one connection can deep-route while the provider's
  // default (and its other connections) stay native. Backward-compatible: connections
  // without the flag fall through to the existing per-provider behaviour untouched.
  if (isCliproxyapiDeepModeEnabled(providerSpecificData)) {
    log?.info?.(
      "UPSTREAM_PROXY",
      `${prov} routed through CLIProxyAPI (per-connection claude-native override)`
    );
    return getExecutor("cliproxyapi");
  }

  // Sibling per-connection override for Dario (#dario). Checked AFTER the
  // CLIProxyAPI check above by deliberate design: if a connection somehow sets
  // BOTH cliproxyapiMode and darioMode to "claude-native", CLIProxyAPI's
  // existing behaviour keeps winning — the least-surprising precedence for
  // configs that predate this field, and the simplest to reason about.
  if (isDarioDeepModeEnabled(providerSpecificData)) {
    log?.info?.(
      "UPSTREAM_PROXY",
      `${prov} routed through Dario (per-connection claude-native override)`
    );
    return getExecutor("dario");
  }

  const cfg = await getUpstreamProxyConfigCached(prov);
  if (!cfg.enabled || cfg.mode === "native") return getExecutor(prov);

  if (cfg.mode === "cliproxyapi") {
    log?.info?.("UPSTREAM_PROXY", `${prov} routed through CLIProxyAPI (passthrough)`);
    const { dedicatedApiKey } = await loadCliproxyapiSettings();
    return resolveCliproxyapiExecutor(cfg.cliproxyapiModelMapping, dedicatedApiKey);
  }

  if (cfg.mode === "dario") {
    // Direct Dario passthrough. No credential/model-mapping wrappers: Dario
    // authenticates via its own OAuth pool and has its own model-alias layer.
    log?.info?.("UPSTREAM_PROXY", `${prov} routed through Dario (passthrough)`);
    return getExecutor("dario");
  }

  // mode === "fallback": try native first, retry via the configured fallback
  // backend on specific failures. The backend defaults to CLIProxyAPI so every
  // pre-existing fallback config behaves exactly as before; fallbackBackend
  // === "dario" opts the retry leg over to Dario instead.
  const nativeExec = getExecutor(prov);
  const fallbackBackend: FallbackBackend = cfg.fallbackBackend;
  const { fallbackCodes, dedicatedApiKey } = await loadCliproxyapiSettings();

  // The model mapping applies only to the CLIProxyAPI retry leg (proxyExec) —
  // the native leg must keep seeing the original, unmapped model.
  const proxyExec =
    fallbackBackend === "dario"
      ? getExecutor("dario")
      : resolveCliproxyapiExecutor(cfg.cliproxyapiModelMapping, dedicatedApiKey);
  const backendLabel = fallbackBackend === "dario" ? "Dario" : "CLIProxyAPI";
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
      log?.info?.("UPSTREAM_PROXY", `${prov} native error (${errMsg}), retrying via ${backendLabel}`);
      try {
        return await proxyExec.execute(input);
      } catch (proxyErr) {
        const proxyMsg = proxyErr instanceof Error ? proxyErr.message : String(proxyErr);
        log?.error?.("UPSTREAM_PROXY", `${prov} ${backendLabel} fallback also failed: ${proxyMsg}`);
        throw proxyErr;
      }
    }

    if (!isRetryableStatus(result.response.status)) {
      return result;
    }
    log?.info?.(
      "UPSTREAM_PROXY",
      `${prov} native failed (${result.response.status}), retrying via ${backendLabel}`
    );
    try {
      return await proxyExec.execute(input);
    } catch (proxyErr) {
      const proxyMsg = proxyErr instanceof Error ? proxyErr.message : String(proxyErr);
      log?.error?.("UPSTREAM_PROXY", `${prov} ${backendLabel} fallback also failed: ${proxyMsg}`);
      throw proxyErr;
    }
  };
  return wrapper;
}
