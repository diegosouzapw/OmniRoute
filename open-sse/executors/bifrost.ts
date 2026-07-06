/**
 * BifrostBackend Executor — Tier-1 router bridge to maximhq/bifrost (Go).
 *
 * Routes OmniRoute requests through a local Bifrost AI gateway process,
 * which handles provider dispatch, format translation, fallback, load
 * balancing, virtual keys, budget management, semantic cache, MCP client,
 * and observability.
 *
 * Wire format: OpenAI-compatible. Bifrost exposes /v1/chat/completions,
 * /v1/responses, /v1/embeddings, etc., and accepts the same JSON shape
 * that the rest of OmniRoute uses. This means chatCore's SSE parsing,
 * tokenizer, and response post-processing work unchanged.
 *
 * Activation:
 *   1. Per-provider upstream_proxy_config with type="bifrost" (preferred
 *      for clean drop-in swap), OR
 *   2. Per-connection bifrostMode toggle in providerSpecificData (UI).
 *
 * Default (Phase 1, this turn): backwards-compat. If BIFROST_ENABLED env
 * var is unset or "false", the executor throws at execute() time and the
 * caller falls back to the legacy chatCore path. This lets us ship the
 * executor without changing routing behavior, and flip individual
 * providers to Bifrost-backed mode by env var or provider config.
 *
 * Reference: ADR-031 (Tier-1 router decision), docs/adr/0031-bifrost-tier1-router.md,
 * PLAN.md § 2.5 (v8.1 Bifrost track).
 *
 * @module open-sse/executors/bifrost
 */

import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  mergeAbortSignals,
  type ExecuteInput,
} from "./base.ts";
import { HTTP_STATUS, FETCH_TIMEOUT_MS } from "../config/constants.ts";
import {
  applyBifrostModelOverride,
  isBifrostSupported,
  resolveBifrostProviderId,
} from "./bifrostProviderMap.ts";
import {
  getBifrostModel,
  listBifrostModelsForProvider,
  refreshBifrostModels,
  type BifrostFetcher,
  type BifrostModelListEntry,
} from "../../src/lib/db/bifrostModels.ts";
import {
  isActive as killSwitchIsActive,
  recordObservation,
  getState as killSwitchGetState,
  type KillSwitchState,
} from "../services/bifrostKillSwitch.ts";
import {
  BifrostKillSwitchActiveError,
  BIFROST_KILLSWITCH_ACTIVE,
} from "../services/bifrostKillSwitch.ts";
import { withBifrostSpan } from "../observability/bifrostSpan.ts";

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 8080;
const DEFAULT_BASE_URL = `http://${DEFAULT_HOST}:${DEFAULT_PORT}`;
const HEALTH_CHECK_TIMEOUT_MS = 5000;
const BIFROST_TAG = "BIFROST";

/**
 * Resolve the Bifrost base URL. Reads from env, falls back to the
 * default localhost:8080 (which is Bifrost's documented default).
 */
async function resolveBifrostBaseUrl(): Promise<string> {
  const envUrl = process.env.BIFROST_BASE_URL;
  if (envUrl && typeof envUrl === "string") return envUrl.replace(/\/+$/, "");
  return DEFAULT_BASE_URL;
}

/**
 * Whether Bifrost integration is enabled. Disabled by default in Phase 1;
 * flip via env var to opt a deployment into Bifrost-backed routing.
 */
function isBifrostEnabled(): boolean {
  const flag = process.env.BIFROST_ENABLED;
  if (!flag) return false;
  return flag === "true" || flag === "1";
}

/**
<<<<<<< ours
 * Escape hatch: BIFROST_KILLSWITCH_DISABLED=true bypasses the kill switch
 * entirely. Useful for operators who need Bifrost to keep serving even
 * when the kill switch is tripped, or for testing the kill-switch path
 * in isolation. Default behavior (env unset / "false") honors the kill
 * switch.
 *
 * Reference: PLAN.md § 2.5.2 (B9.1) — "kill switch must be defeatable
 * via env var for emergency operation".
 */
function isKillSwitchDisabled(): boolean {
  const flag = process.env.BIFROST_KILLSWITCH_DISABLED;
  if (!flag) return false;
  return flag === "true" || flag === "1";
}

/**
 * Look up the current kill switch state for this provider, or undefined
 * if no observations have been recorded yet (i.e. no state in the map).
 * Wraps `getState` so callers can treat the absence of state as a
 * non-tripped condition without a try/catch.
 */
function killSwitchStateFor(provider: string): KillSwitchState | undefined {
  try {
    return killSwitchGetState(provider);
  } catch {
    return undefined;
  }
}

/**
 * Thrown when a provider has `bifrostNoFallback` set and there is no legacy
 * path to fall back to. Callers can `instanceof` check this to surface a
 * clean 503 ("service unavailable — no fallback") rather than a generic 500.
 */
export class BifrostNoFallbackError extends Error {
  constructor(provider: string, reason: string) {
    super(`Bifrost: no fallback available for provider "${provider}": ${reason}`);
    this.name = "BifrostNoFallbackError";
    // Maintain proper prototype chain for instanceof in transpiled environments
    Object.setPrototypeOf(this, BifrostNoFallbackError.prototype);
  }
=======
 * Whether the executor must consult the local `bifrost_models` cache before
 * dispatching and throw if the requested model is missing. Off by default
 * (zero overhead in the steady state). Set `BIFROST_MODEL_CACHE_REQUIRED=1`
 * for strict-mode deployments that want to guarantee Bifrost serves only
 * models it has advertised. Companion flag `BIFROST_MODEL_CACHE_REFRESH_ON_MISS=1`
 * triggers a one-roundtrip refresh from `/v1/models` on a miss before
 * deciding whether to throw.
 */
function isBifrostCacheRequired(): boolean {
  const flag = process.env.BIFROST_MODEL_CACHE_REQUIRED;
  return flag === "1" || flag === "true";
}

/**
 * Whether to refresh the `bifrost_models` cache on a miss (one roundtrip
 * to Bifrost's `/v1/models`) before re-checking. Useful in two modes:
 *   - With `BIFROST_MODEL_CACHE_REQUIRED=1`: populate the cache lazily,
 *     then throw if still missing.
 *   - Standalone: warm the cache opportunistically without blocking the
 *     request (a refresh failure logs but does not throw).
 */
function isBifrostCacheRefreshOnMiss(): boolean {
  const flag = process.env.BIFROST_MODEL_CACHE_REFRESH_ON_MISS;
  return flag === "1" || flag === "true";
}

/**
 * Internal helper. Consults the `bifrost_models` cache for (provider, model)
 * and enforces optional strict-mode + refresh-on-miss behavior. Throws on
 * strict-mode miss-after-refresh; logs + returns otherwise.
 *
 * Insertion point in `execute()`: after the model override is applied so
 * the cache key reflects the post-override id (Azure deployment-name →
 * model-id normalization is the canonical case).
 *
 * Behavior matrix:
 *   - Both toggles off (default): early return, zero overhead.
 *   - Hit (cached + not expired): log info + return.
 *   - Miss + REQUIRED + REFRESH_ON_MISS: refresh → re-check; throw if still missing.
 *   - Miss + REQUIRED + no REFRESH: throw "not in cache".
 *   - Miss + no REQUIRED + REFRESH: refresh best-effort; never throw.
 *
 * @returns void on success; throws on strict-mode miss or refresh-failure-while-required.
 */
async function enforceBifrostModelCache(
  provider: string,
  model: string,
  baseUrl: string,
  log?: {
    info?: (tag: string, msg: string) => void;
    warn?: (tag: string, msg: string) => void;
  },
): Promise<void> {
  const required = isBifrostCacheRequired();
  const refreshOnMiss = isBifrostCacheRefreshOnMiss();
  if (!required && !refreshOnMiss) return; // fast-path: feature off, no DB hit

  const cached = getBifrostModel(provider, model);
  if (cached) {
    log?.info?.(
      BIFROST_TAG,
      `bifrost_models cache hit for ${provider}/${model} (fetched ${cached.fetchedAt})`,
    );
    return;
  }

  // Cache miss. If REFRESH_ON_MISS is set, try to populate before deciding.
  if (refreshOnMiss) {
    log?.info?.(
      BIFROST_TAG,
      `bifrost_models cache miss for ${provider}/${model} — refreshing from ${baseUrl}/v1/models`,
    );
    const fetcher: BifrostFetcher = async (prov: string) => {
      const url = `${baseUrl}/v1/models?provider=${encodeURIComponent(prov)}`;
      const r = await fetch(url, {
        signal: AbortSignal.timeout(HEALTH_CHECK_TIMEOUT_MS),
      });
      if (!r.ok) throw new Error(`Bifrost /v1/models HTTP ${r.status}`);
      const body = (await r.json()) as { data?: BifrostModelListEntry[] };
      return Array.isArray(body.data) ? body.data : [];
    };
    try {
      await refreshBifrostModels(provider, fetcher, {
        ttlSeconds: 60 * 60,
      });
    } catch (refreshErr) {
      const msg = refreshErr instanceof Error ? refreshErr.message : String(refreshErr);
      log?.warn?.(BIFROST_TAG, `Cache refresh failed for ${provider}: ${msg}`);
      if (required) {
        throw new Error(
          `[${BIFROST_TAG}] BIFROST_MODEL_CACHE_REQUIRED=1 and cache refresh failed for ` +
            `${provider}/${model}. Underlying: ${msg}. ` +
            `Disable the cache toggle or fix the Bifrost /v1/models endpoint.`,
        );
      }
      // Refresh failed but not required: continue with stale (or absent) cache.
      return;
    }
    const postRefresh = getBifrostModel(provider, model);
    if (postRefresh) {
      log?.info?.(
        BIFROST_TAG,
        `bifrost_models cache hit for ${provider}/${model} after refresh`,
      );
      return;
    }
  }

  if (required) {
    throw new Error(
      `[${BIFROST_TAG}] BIFROST_MODEL_CACHE_REQUIRED=1 and model "${model}" ` +
        `is not in the bifrost_models cache for provider "${provider}". ` +
        `Set BIFROST_MODEL_CACHE_REFRESH_ON_MISS=1 to populate lazily, or refresh manually ` +
        `(see refreshBifrostModels in src/lib/db/bifrostModels.ts).`,
    );
  }
  log?.warn?.(
    BIFROST_TAG,
    `bifrost_models cache miss for ${provider}/${model} — proceeding without cache enforcement`,
  );
>>>>>>> theirs
}

/**
 * BifrostBackend — Tier-1 router executor.
 *
 * Extends BaseExecutor but overrides `execute()` entirely. Does NOT use
 * BaseExecutor's session pool / API key rotator / token refresh, because
 * Bifrost manages all of that internally. The executor's only job is to
 * forward the request to the local Bifrost process.
 */
export class BifrostBackendExecutor extends BaseExecutor {
  constructor(provider: string, config: ConstructorParameters<typeof BaseExecutor>[1]) {
    super(provider, config);
  }

  /**
   * Execute — forward the request to Bifrost's OpenAI-compatible endpoint.
   *
   * Behavior:
   *  - If Bifrost is not enabled (env var off), throws so the caller can
   *    fall back to the legacy chatCore path.
   *  - If the OmniRoute provider is not in the Bifrost provider map (e.g.
   *    web-cookie providers), throws — the legacy executor should handle it.
   *  - Otherwise, resolves the Bifrost provider ID + model override, and
   *    POSTs to `${baseUrl}/v1/chat/completions` with the rewritten body.
   *  - Returns the standard `{ response, url, headers, transformedBody }`
   *    shape so chatCore's SSE parsing + response post-processing work
   *    unchanged.
   */
  async execute(input: ExecuteInput): Promise<{
    response: Response;
    url: string;
    headers: Record<string, string>;
    transformedBody: unknown;
  }> {
    if (!isBifrostEnabled()) {
      throw new Error(
        `[${BIFROST_TAG}] Bifrost is not enabled. Set BIFROST_ENABLED=1 and BIFROST_BASE_URL to use the Tier-1 router. ` +
          `Provider "${this.provider}" stays on the legacy chatCore path.`
      );
    }

    if (!isBifrostSupported(this.provider)) {
      throw new Error(
        `[${BIFROST_TAG}] Provider "${this.provider}" is not in the Bifrost provider map. ` +
          `Stay on the legacy executor (open-sse/handlers/chatCore.ts).`
      );
    }

    // ── Kill switch pre-check (B9.1) ─────────────────────────────
    // If the kill switch is active for this provider, throw
    // BifrostKillSwitchActiveError. The dispatcher catches this and falls
    // back to the legacy chatCore path. The env var
    // BIFROST_KILLSWITCH_DISABLED=true is an escape hatch for emergency
    // operation (operators who need Bifrost to keep serving even when
    // tripped).
    if (!isKillSwitchDisabled() && killSwitchIsActive(this.provider)) {
      const state = killSwitchStateFor(this.provider);
      input.log?.warn?.(
        BIFROST_TAG,
        `Kill switch active for "${this.provider}" ` +
          `(reason=${state?.reason ?? "unknown"}, severity=${state?.severity ?? "warn"}). ` +
          `Falling back to legacy chatCore path.`
      );
      if (state) {
        throw new BifrostKillSwitchActiveError(this.provider, state);
      }
      // Defensive: if isActive() returns true but we can't read state,
      // throw a generic error with the canonical code so dispatchers
      // can still match on it.
      const err = new Error(
        `[${BIFROST_TAG}] Bifrost kill switch is active for provider "${this.provider}".`
      );
      (err as Error & { code?: string }).code = BIFROST_KILLSWITCH_ACTIVE;
      throw err;
    }

    const bifrostProviderId = resolveBifrostProviderId(this.provider);
    if (!bifrostProviderId) {
      // Defensive — isBifrostSupported already covered this branch, but
      // keep the explicit guard for type narrowing.
      throw new Error(`[${BIFROST_TAG}] resolveBifrostProviderId returned null for "${this.provider}".`);
    }

    const baseUrl = await resolveBifrostBaseUrl();
    const model = applyBifrostModelOverride(this.provider, input.model);

    // L1c: model-cache enforcement. Off by default; opt in via
    // BIFROST_MODEL_CACHE_REQUIRED=1 (strict) and/or
    // BIFROST_MODEL_CACHE_REFRESH_ON_MISS=1 (lazy populate on miss).
    // No-op when both toggles are unset.
    await enforceBifrostModelCache(this.provider, model, baseUrl, input.log);

    const url = `${baseUrl}/v1/chat/completions`;

    // Transform body: rewrite the `model` field if the override function
    // changed it (e.g. Azure deployment-name → model-id normalization).
    // We do NOT rewrite the provider field because Bifrost inspects the
    // model's vendor prefix (gpt-*, claude-*, gemini-*) to pick the
    // provider — provider-id is informational only.
    const body =
      input.body && typeof input.body === "object"
        ? { ...(input.body as Record<string, unknown>), model }
        : { model };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-Bifrost-Provider": bifrostProviderId,
      // Echo the original OmniRoute provider ID so Bifrost's audit log
      // and dashboards can show the originating OmniRoute context.
      "X-OmniRoute-Provider": this.provider,
    };

    // Forward the API key (if present) as the Bifrost virtual-key bearer.
    // Bifrost's auth layer will validate against its own key store and
    // bill against the upstream provider key configured there.
    if (input.credentials?.apiKey) {
      headers["Authorization"] = `Bearer ${input.credentials.apiKey}`;
    } else if (input.credentials?.accessToken) {
      // OAuth-style: forward as bearer if no API key.
      headers["Authorization"] = `Bearer ${input.credentials.accessToken}`;
    }

    // Merge in any upstreamExtraHeaders the caller supplied. These can
    // override our defaults above if explicitly set (e.g. a per-tenant
    // virtual key header). The helper mutates `headers` in place and
    // returns void.
    mergeUpstreamExtraHeaders(headers, input.upstreamExtraHeaders ?? null);

    // Merge abort signals: caller's signal OR fetch timeout, whichever
    // fires first.
    const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
    const combinedSignal = input.signal
      ? mergeAbortSignals(input.signal, timeoutSignal)
      : timeoutSignal;

    input.log?.info?.(
      BIFROST_TAG,
      `Bifrost → ${url} (omniProvider: ${this.provider}, bifrostProvider: ${bifrostProviderId}, model: ${model})`
    );

    // ── execute + record observation (B9.1) ──────────────────────
    // We measure latency around the fetch and always record an
    // observation. `ok` is true on 2xx and false on any other status or
    // thrown error. The kill switch uses these to auto-trip when
    // thresholds (p99 latency, error rate, cost ratio) are exceeded. The
    // fetch itself is wrapped in a Bifrost OTel span (B10) so Tier-1/Tier-2
    // traces stay unified via the injected `traceparent`.
    const startTime = Date.now();
    let response: Response;
    try {
      const { result } = await withBifrostSpan(
        {
          provider: this.provider,
          bifrostProvider: bifrostProviderId,
          model,
          baseUrl,
          headers,
        },
        async (span) => {
          const upstreamResponse = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
            signal: combinedSignal,
          });
          span.setAttribute("http.status_code", upstreamResponse.status);
          return upstreamResponse;
        }
      );
      response = result;
    } catch (err) {
      // Fetch threw (network error, abort, timeout). Record a failed
      // observation and re-throw. The dispatcher will handle the error.
      if (!isKillSwitchDisabled()) {
        recordObservation({
          timestamp: Date.now(),
          provider: this.provider,
          latencyMs: Date.now() - startTime,
          ok: false,
        });
      }
      throw err;
    }

    if (response.status === HTTP_STATUS.RATE_LIMITED) {
      input.log?.warn?.(BIFROST_TAG, `Bifrost rate limited: ${response.status}`);
    } else if (response.status >= 500) {
      input.log?.warn?.(BIFROST_TAG, `Bifrost upstream error: ${response.status}`);
    }

    // Record a successful (2xx) or failed (non-2xx) observation. Cost
    // fields are optional — callers that have them can wire them in via
    // input.killSwitchCost if/when that field is added.
    if (!isKillSwitchDisabled()) {
      const cost = (input as { killSwitchCost?: { costUsd?: number; legacyCostUsd?: number } })
        .killSwitchCost;
      recordObservation({
        timestamp: Date.now(),
        provider: this.provider,
        latencyMs: Date.now() - startTime,
        ok: response.ok,
        costUsd: cost?.costUsd,
        legacyCostUsd: cost?.legacyCostUsd,
      });
    }

    return {
      response,
      url,
      headers,
      transformedBody: body,
    };
  }

  /**
   * Health check — probes Bifrost's /health endpoint. Bifrost exposes
   * this in its default deployment for orchestrator probes (k8s liveness,
   * load balancer, etc.).
   *
   * Fallback (older Bifrost versions without /health): use the local
   * `bifrost_models` cache via listBifrostModelsForProvider(); if the
   * cache is empty or stale, refresh it by hitting /v1/models once
   * (via refreshBifrostModels). This is the B4 wiring: sub-millisecond
   * lookup in the steady state, network roundtrip only on cache miss.
   */
  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; error?: string; version?: string }> {
    const start = Date.now();
    if (!isBifrostEnabled()) {
      return {
        ok: false,
        latencyMs: Date.now() - start,
        error: "Bifrost not enabled (BIFROST_ENABLED unset)",
      };
    }

    // ── Kill switch healthCheck propagation (B9.1) ──────────────
    // If the kill switch is active, surface it as a failed health check
    // with reason='kill_switch_active'. This lets orchestrators and
    // dashboards see the tripped state without needing to query the
    // kill switch directly. BIFROST_KILLSWITCH_DISABLED=true bypasses
    // this propagation (escape hatch).
    if (!isKillSwitchDisabled() && killSwitchIsActive(this.provider)) {
      const state = killSwitchStateFor(this.provider);
      return {
        ok: false,
        latencyMs: Date.now() - start,
        error: "kill_switch_active",
        version: state?.reason ?? undefined,
      };
    }

    const baseUrl = await resolveBifrostBaseUrl();

    // 1. Probe /health first.
    try {
      const res = await fetch(`${baseUrl}/health`, {
        signal: AbortSignal.timeout(HEALTH_CHECK_TIMEOUT_MS),
      });
      const latencyMs = Date.now() - start;
      if (res.ok) {
        let version: string | undefined;
        try {
          const payload = (await res.json()) as { version?: string };
          version = payload.version;
        } catch {
          // Non-JSON body is OK; just no version metadata.
        }
        return { ok: true, latencyMs, version };
      }
      // 404 means no /health; fall through to the cache-wired /v1/models
      // path. Other non-2xx codes are real errors and surface immediately.
      if (res.status !== HTTP_STATUS.NOT_FOUND) {
        return { ok: false, latencyMs, error: `HTTP ${res.status}` };
      }
    } catch {
      // /health probe failed (network/timeout); fall through to cache path.
    }

    // 2. /health missing or unreachable: try the cache, then /v1/models.
    try {
      const cached = listBifrostModelsForProvider(this.provider);
      if (cached.length > 0) {
        return {
          ok: true,
          latencyMs: Date.now() - start,
          version: cached.length.toString(),
        };
      }
      // Cache miss: hit Bifrost's /v1/models once and refresh.
      const fetcher: BifrostFetcher = async (prov: string) => {
        const url = `${baseUrl}/v1/models?provider=${encodeURIComponent(prov)}`;
        const r = await fetch(url, {
          signal: AbortSignal.timeout(HEALTH_CHECK_TIMEOUT_MS),
        });
        if (!r.ok) {
          throw new Error(`Bifrost /v1/models HTTP ${r.status}`);
        }
        const body = (await r.json()) as { data?: BifrostModelListEntry[] };
        return Array.isArray(body.data) ? body.data : [];
      };
      await refreshBifrostModels(this.provider, fetcher, {
        ttlSeconds: 60 * 60,
      });
      return { ok: true, latencyMs: Date.now() - start };
    } catch (err) {
      return {
        ok: false,
        latencyMs: Date.now() - start,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }
}

export default BifrostBackendExecutor;

// ── Dispatcher-facing executor factory (L1a) ──────────────────────

/**
 * Whether Bifrost integration should route a given provider through the
 * BifrostBackendExecutor instead of the legacy `getExecutor()` path.
 *
 * Two activation paths (per docs/frameworks/BIFROST-BACKEND.md):
 *   1. Global env switch:  `BIFROST_ENABLED=1` routes ALL providers
 *      (with per-provider fallback to legacy on kill-switch / unsupported).
 *   2. Per-connection toggle: `providerSpecificData.bifrostMode === true`
 *      routes only that specific connection.
 *
 * L1a implements path (1) only; path (2) requires the upstreamProxy.ts
 * module that this fork is missing (fork drift — see DAG S6 P6d).
 */
export function shouldRouteViaBifrost(provider: string, opts?: {
  providerSpecificData?: { bifrostMode?: boolean | null } | null;
}): boolean {
  if (process.env.BIFROST_ENABLED === "1" || process.env.BIFROST_ENABLED === "true") {
    return true;
  }
  if (opts?.providerSpecificData?.bifrostMode === true) {
    return true;
  }
  void provider;
  return false;
}

/**
 * Build a dispatcher-shaped executor that forwards `.execute(input)` calls
 * to `dispatchBifrostWithFallback(new BifrostBackendExecutor(provider, {}), input)`.
 *
 * Returned object mimics the BaseExecutor surface (just `.execute` +
 * `.getProvider`) so it can be returned from `resolveExecutorWithProxy()`
 * in place of `getExecutor(provider)` without any downstream changes.
 *
 * The empty `{} as ProviderConfig` is safe because BifrostBackendExecutor
 * does not consult `this.config` for URL construction (it derives the URL
 * from the BIFROST_BASE_URL env var); see bifrost.ts:90-92.
 */
/**
 * Execute a request through the Bifrost executor with automatic fallback to
 * the legacy `getExecutor(provider)` path when the kill switch is active.
 *
 * Falls back ONLY on `BifrostKillSwitchActiveError`. All other errors
 * (e.g. "Bifrost is not enabled", network failures) are re-thrown as-is
 * so callers can surface them as appropriate HTTP errors.
 *
 * Uses a lazy dynamic import of the executor registry (`./index.ts`) to
 * avoid a circular module dependency (index.ts imports bifrost.ts).
 *
 * Reference: ADR-031 § Dispatcher Fallback, PLAN.md § 2.5.2 (B9.1).
 */
export async function dispatchBifrostWithFallback(
  exec: BifrostBackendExecutor,
  input: ExecuteInput,
): ReturnType<BifrostBackendExecutor["execute"]> {
  try {
    return await exec.execute(input);
  } catch (err) {
    // Only fall back on kill switch errors. Any other failure propagates.
    if (
      err instanceof Error &&
      (err as { code?: string }).code !== BIFROST_KILLSWITCH_ACTIVE &&
      !(err instanceof BifrostKillSwitchActiveError)
    ) {
      throw err;
    }
    // Kill switch active: fall through to legacy executor.
    const provider = exec.getProvider();
    // Lazy import to avoid circular dependency (index.ts → bifrost.ts → index.ts)
    const { getExecutor } = await import("./index.ts");
    const legacyExec = getExecutor(provider);
    return legacyExec.execute(input);
  }
}

export function createBifrostBackedExecutor(
  provider: string,
  log?: {
    info?: (tag: string, msg: string) => void;
    warn?: (tag: string, msg: string) => void;
  },
): {
  execute: (input: ExecuteInput) => ReturnType<BifrostBackendExecutor["execute"]>;
  getProvider: () => string;
} {
  log?.info?.(
    BIFROST_TAG,
    `${provider} → BifrostBackendExecutor (Tier-1 router, fallback-wrapped)`,
  );
  const bifrost = new BifrostBackendExecutor(provider, {} as ConstructorParameters<typeof BaseExecutor>[1]);
  return {
    getProvider: () => bifrost.getProvider(),
    execute: (input) => dispatchBifrostWithFallback(bifrost, input),
  };
}
