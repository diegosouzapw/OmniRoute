/**
 * CLIProxyAPI Executor — routes requests to a local CLIProxyAPI instance.
 *
 * Supports two modes:
 *   1. OpenAI-compatible (/v1/chat/completions) — default for most providers
 *   2. Native Claude (/api/provider/claude/v1/messages) — for Claude Code OAuth
 *      subscriptions where CLIProxyAPI has deeper emulation (uTLS, multi-account
 *      rotation, device profile learning, per-key config, sensitive word obfuscation)
 *
 * The mode is selected based on provider type or explicit configuration.
 * When routing Claude Code OAuth requests, CLIProxyAPI handles all 21 Claude Code
 * mechanisms (CCH signing, billing header, system prompt, tool remapping, etc.)
 * natively in Go, which may provide better fingerprint parity than the Node.js
 * implementation in OmniRoute.
 */

import { BaseExecutor, mergeUpstreamExtraHeaders, mergeAbortSignals } from "./base.ts";
import { HTTP_STATUS, FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { isClaudeCodeCompatibleProvider } from "../services/claudeCodeCompatible.ts";

const DEFAULT_PORT = 8317;
const DEFAULT_HOST = "127.0.0.1";

export type CliproxyapiMode = "openai" | "claude-native";

function resolveCliproxyapiBaseUrl(): string {
  const host = process.env.CLIPROXYAPI_HOST || DEFAULT_HOST;
  const port = parseInt(process.env.CLIPROXYAPI_PORT || String(DEFAULT_PORT), 10);
  return `http://${host}:${port}`;
}

export { resolveCliproxyapiBaseUrl };

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

  /**
   * Determine which CLIProxyAPI endpoint to use based on provider type.
   * Claude Code compatible providers use the native Claude route for
   * deeper emulation; everything else uses OpenAI-compatible.
   */
  private resolveMode(credentials: any): CliproxyapiMode {
    // Explicit mode override from provider config
    const explicitMode = credentials?.providerSpecificData?.cliproxyapiMode;
    if (explicitMode === "claude-native") return "claude-native";
    if (explicitMode === "openai") return "openai";

    // Auto-detect: if the credential looks like a Claude OAuth token, use native
    const key = credentials?.apiKey || credentials?.accessToken || "";
    if (typeof key === "string" && key.startsWith("sk-ant-oat01-")) {
      return "claude-native";
    }

    return "openai";
  }

  buildUrl(model: string, stream: boolean, _urlIndex = 0, credentials: any = null): string {
    const mode = this.resolveMode(credentials);
    if (mode === "claude-native") {
      // Route through CLIProxyAPI's dedicated Claude provider endpoint
      // which applies full CCH signing, billing header, system prompt, etc.
      return `${this.upstreamBaseUrl}/api/provider/claude/v1/messages`;
    }
    return `${this.upstreamBaseUrl}/v1/chat/completions`;
  }

  buildHeaders(credentials: any, stream = true): Record<string, string> {
    const mode = this.resolveMode(credentials);
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const key = credentials?.apiKey || credentials?.accessToken;

    if (mode === "claude-native") {
      // For Claude native mode, pass the OAuth token directly
      // CLIProxyAPI's Claude executor will handle all header injection
      if (key) {
        headers["Authorization"] = `Bearer ${key}`;
      }
      if (stream) {
        headers["Accept"] = "text/event-stream";
      }
      // Pass through anthropic-specific headers so CLIProxyAPI can use them
      headers["anthropic-version"] = "2023-06-01";
    } else {
      if (key) {
        headers["Authorization"] = `Bearer ${key}`;
      }
      if (stream) {
        headers["Accept"] = "text/event-stream";
      }
    }

    return headers;
  }

  transformRequest(
    model: string,
    body: any,
    _stream: boolean,
    _credentials: any
  ): any {
    const mode = this.resolveMode(_credentials);
    if (!body || typeof body !== "object") return body;

    const transformed = { ...body };
    if (transformed.model !== model) {
      transformed.model = model;
    }

    // For Claude native mode, ensure stream is set in body (Anthropic API reads it from body)
    if (mode === "claude-native" && _stream && !transformed.stream) {
      transformed.stream = true;
    }

    return transformed;
  }

  async execute(input: {
    model: string;
    body: unknown;
    stream: boolean;
    credentials: any;
    signal?: AbortSignal | null;
    log?: any;
    upstreamExtraHeaders?: Record<string, string> | null;
  }) {
    const mode = this.resolveMode(input.credentials);
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

    input.log?.info?.(
      "CPA",
      `CLIProxyAPI ${mode} → ${url} (model: ${input.model})`
    );

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
        signal: AbortSignal.timeout(5000),
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
