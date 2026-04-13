/**
 * CLIProxyAPI Executor — routes requests to a local CLIProxyAPI instance.
 *
 * Supports two modes:
 *   1. OpenAI-compatible (/v1/chat/completions) — default for most providers
 *   2. Native Claude (/api/provider/claude/v1/messages) — for Claude Code OAuth
 *      subscriptions where CLIProxyAPI has deeper emulation (uTLS, multi-account
 *      rotation, device profile learning, per-key config, sensitive word obfuscation)
 *
 * Mode selection priority:
 *   1. Explicit `cliproxyapiMode` in providerSpecificData (set via Settings UI)
 *   2. Provider type: anthropic-compatible-cc-* → claude-native
 *   3. Default: openai
 *
 * Token prefix alone is NOT used for mode detection (review feedback #4):
 * a sk-ant-oat01-* key routed through an OpenAI-format provider would send
 * an OpenAI-shaped body to the Claude Messages endpoint, causing failures.
 */

import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  mergeAbortSignals,
  type ProviderCredentials,
} from "./base.ts";
import { HTTP_STATUS, FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { isClaudeCodeCompatibleProvider } from "../services/claudeCodeCompatible.ts";

const DEFAULT_PORT = 8317;
const DEFAULT_HOST = "127.0.0.1";
const HEALTH_CHECK_TIMEOUT_MS = 5000;

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
   * Determine which CLIProxyAPI endpoint to use.
   *
   * Decision order:
   *   1. Explicit override via providerSpecificData.cliproxyapiMode (Settings UI toggle)
   *   2. Provider name starts with anthropic-compatible-cc- → claude-native
   *   3. Default: openai
   *
   * Does NOT sniff token prefix (review #4): the caller's provider/format
   * must match the endpoint format. An OAuth token on an OpenAI-format
   * provider stays on the OpenAI path.
   */
  resolveMode(credentials: ProviderCredentials | null, provider?: string): CliproxyapiMode {
    // 1. Explicit per-provider toggle (set via Settings UI)
    const explicit = credentials?.providerSpecificData?.cliproxyapiMode;
    if (explicit === "claude-native") return "claude-native";
    if (explicit === "openai") return "openai";

    // 2. Provider type detection
    const providerName =
      typeof provider === "string" ? provider : String(credentials?.providerSpecificData?.providerId || "");
    if (isClaudeCodeCompatibleProvider(providerName)) return "claude-native";

    return "openai";
  }

  buildUrl(
    model: string,
    stream: boolean,
    _urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ): string {
    const mode = this.resolveMode(credentials);
    if (mode === "claude-native") {
      return `${this.upstreamBaseUrl}/api/provider/claude/v1/messages`;
    }
    return `${this.upstreamBaseUrl}/v1/chat/completions`;
  }

  buildHeaders(credentials: ProviderCredentials | null, stream = true): Record<string, string> {
    const mode = this.resolveMode(credentials);
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

    // Claude-native: pass anthropic-version so CLIProxyAPI can use it
    if (mode === "claude-native") {
      headers["anthropic-version"] = "2023-06-01";
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
    const mode = this.resolveMode(_credentials);

    const transformed = { ...(body as Record<string, unknown>) };
    if (transformed.model !== model) {
      transformed.model = model;
    }

    // Anthropic API reads stream from the body, not just the Accept header
    if (mode === "claude-native" && _stream && !transformed.stream) {
      transformed.stream = true;
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
