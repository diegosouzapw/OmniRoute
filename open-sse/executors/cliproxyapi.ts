/**
 * CLIProxyAPI Executor — routes requests to a local CLIProxyAPI instance.
 *
 * Always uses the OpenAI-compatible /v1/chat/completions endpoint. CLIProxyAPI
 * internally detects Claude models and routes them through its Claude executor
 * with full emulation (CCH signing, billing header, system prompt, uTLS,
 * multi-account rotation, device profile learning, etc.).
 *
 * The UI toggle (cliproxyapiMode in providerSpecificData) controls WHETHER
 * to use CLIProxyAPI as the backend, not the wire format. Response format
 * is always OpenAI-compatible, so chatCore's SSE parsing works unchanged.
 *
 * Activation:
 *   1. Per-provider upstream_proxy_config (mode=cliproxyapi or fallback)
 *   2. Per-connection cliproxyapiMode toggle in providerSpecificData (UI)
 */

import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  mergeAbortSignals,
  type ProviderCredentials,
} from "./base.ts";
import { HTTP_STATUS, FETCH_TIMEOUT_MS } from "../config/constants.ts";

const DEFAULT_PORT = 8317;
const DEFAULT_HOST = "127.0.0.1";
const HEALTH_CHECK_TIMEOUT_MS = 5000;

function resolveCliproxyapiBaseUrl(): string {
  const host = process.env.CLIPROXYAPI_HOST || DEFAULT_HOST;
  const port = parseInt(process.env.CLIPROXYAPI_PORT || String(DEFAULT_PORT), 10);
  return `http://${host}:${port}`;
}

export { resolveCliproxyapiBaseUrl };

/**
 * Check if a connection has CLIProxyAPI deep mode enabled via UI toggle.
 * Used by chatCore's resolveExecutorWithProxy to decide routing.
 */
export function isCliproxyapiDeepModeEnabled(
  providerSpecificData?: Record<string, unknown> | null
): boolean {
  return providerSpecificData?.cliproxyapiMode === "claude-native";
}

export class CliproxyapiExecutor extends BaseExecutor {
  private readonly upstreamBaseUrl: string;

  constructor(baseUrl?: string) {
    const effectiveBase = baseUrl ?? resolveCliproxyapiBaseUrl();
    super("cliproxyapi", {
      id: "cliproxyapi",
      baseUrl: effectiveBase + "/v1/chat/completions",
      headers: { "Content-Type": "application/json" },
    });
    this.upstreamBaseUrl = effectiveBase;
  }

  buildUrl(
    _model: string,
    _stream: boolean,
    _urlIndex = 0,
    _credentials: ProviderCredentials | null = null
  ): string {
    // Always OpenAI-compatible. CLIProxyAPI detects Claude models internally
    // and applies full emulation (CCH, billing header, system prompt, uTLS).
    return `${this.upstreamBaseUrl}/v1/chat/completions`;
  }

  buildHeaders(credentials: ProviderCredentials | null, stream = true): Record<string, string> {
    const key = credentials?.apiKey || credentials?.accessToken;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (key) {
      headers["Authorization"] = `Bearer ${key}`;
    }
    if (stream) {
      headers["Accept"] = "text/event-stream";
    }

    return headers;
  }

  transformRequest(
    model: string,
    body: unknown,
    _stream: boolean,
    _credentials: ProviderCredentials | null
  ): unknown {
    if (!body || typeof body !== "object") return body;

    const transformed = { ...(body as Record<string, unknown>) };
    if (transformed.model !== model) {
      transformed.model = model;
    }

    return transformed;
  }

  async execute(input: {
    model: string;
    body: unknown;
    stream: boolean;
    credentials: ProviderCredentials;
    signal?: AbortSignal | null;
    log?: any;
    upstreamExtraHeaders?: Record<string, string> | null;
  }) {
    const url = this.buildUrl(input.model, input.stream, 0, input.credentials);
    const headers = this.buildHeaders(input.credentials, input.stream);
    const transformedBody = this.transformRequest(
      input.model,
      input.body,
      input.stream,
      input.credentials
    );
    mergeUpstreamExtraHeaders(headers, input.upstreamExtraHeaders);

    const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
    const combinedSignal = input.signal
      ? mergeAbortSignals(input.signal, timeoutSignal)
      : timeoutSignal;

    input.log?.info?.("CPA", `CLIProxyAPI → ${url} (model: ${input.model})`);

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(transformedBody),
      signal: combinedSignal,
    });

    if (response.status === HTTP_STATUS.RATE_LIMITED) {
      input.log?.warn?.("CPA", `CLIProxyAPI rate limited: ${response.status}`);
    }

    return { response, url, headers, transformedBody };
  }

  /**
   * Health check — verifies CLIProxyAPI is reachable.
   */
  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; error?: string }> {
    const start = Date.now();
    try {
      const res = await fetch(`${this.upstreamBaseUrl}/health`, {
        signal: AbortSignal.timeout(HEALTH_CHECK_TIMEOUT_MS),
      });
      return {
        ok: res.ok,
        latencyMs: Date.now() - start,
        ...(!res.ok ? { error: `HTTP ${res.status}` } : {}),
      };
    } catch (err) {
      return {
        ok: false,
        latencyMs: Date.now() - start,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }
}

export default CliproxyapiExecutor;
