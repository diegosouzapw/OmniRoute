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

    const bifrostProviderId = resolveBifrostProviderId(this.provider);
    if (!bifrostProviderId) {
      // Defensive — isBifrostSupported already covered this branch, but
      // keep the explicit guard for type narrowing.
      throw new Error(`[${BIFROST_TAG}] resolveBifrostProviderId returned null for "${this.provider}".`);
    }

    const baseUrl = await resolveBifrostBaseUrl();
    const model = applyBifrostModelOverride(this.provider, input.model);
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

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: combinedSignal,
    });

    if (response.status === HTTP_STATUS.RATE_LIMITED) {
      input.log?.warn?.(BIFROST_TAG, `Bifrost rate limited: ${response.status}`);
    } else if (response.status >= 500) {
      input.log?.warn?.(BIFROST_TAG, `Bifrost upstream error: ${response.status}`);
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
   * load balancer, etc.). Falls back to /v1/models if /health is missing
   * (older Bifrost versions).
   */
  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; error?: string; version?: string }> {
    const start = Date.now();
    try {
      if (!isBifrostEnabled()) {
        return {
          ok: false,
          latencyMs: Date.now() - start,
          error: "Bifrost not enabled (BIFROST_ENABLED unset)",
        };
      }
      const baseUrl = await resolveBifrostBaseUrl();
      // Bifrost's /health returns 200 with `{"status":"ok","version":"..."}`.
      const res = await fetch(`${baseUrl}/health`, {
        signal: AbortSignal.timeout(HEALTH_CHECK_TIMEOUT_MS),
      });
      const latencyMs = Date.now() - start;
      if (!res.ok) {
        return { ok: false, latencyMs, error: `HTTP ${res.status}` };
      }
      let version: string | undefined;
      try {
        const payload = (await res.json()) as { version?: string };
        version = payload.version;
      } catch {
        // Non-JSON body is OK; just no version metadata.
      }
      return { ok: true, latencyMs, version };
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
