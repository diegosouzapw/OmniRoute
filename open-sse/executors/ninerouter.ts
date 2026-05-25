/**
 * NineRouterExecutor — routes requests to a locally-managed 9router instance.
 *
 * 9router exposes both OpenAI-compatible (/v1/chat/completions) and
 * Anthropic-compatible (/v1/messages) endpoints. The executor detects the
 * wire shape from the request body and selects the matching endpoint so the
 * response format is always consistent with what the upstream client expects.
 *
 * Auth: the 9router API key (nr_xxx) stored per-service, passed as a Bearer token.
 * The service is local-only (loopback enforced by routeGuard.ts), so no TLS or
 * identity cloaking is needed — 9router handles its own upstream auth internally.
 */

import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  mergeAbortSignals,
  type ProviderCredentials,
  type ExecuteInput,
} from "./base.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";

const DEFAULT_PORT = 20130;
const DEFAULT_HOST = "127.0.0.1";
const HEALTH_CHECK_TIMEOUT_MS = 3_000;

export function resolveNineRouterBaseUrl(): string {
  const host = process.env.NINEROUTER_HOST || DEFAULT_HOST;
  const port = parseInt(process.env.NINEROUTER_PORT || String(DEFAULT_PORT), 10);
  return `http://${host}:${port}`;
}

export class NineRouterExecutor extends BaseExecutor {
  private readonly upstreamBaseUrl: string;

  constructor(baseUrl?: string) {
    const effectiveBase = baseUrl ?? resolveNineRouterBaseUrl();
    super("9router", {
      id: "9router",
      baseUrl: `${effectiveBase}/v1/chat/completions`,
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
    return `${this.upstreamBaseUrl}/v1/chat/completions`;
  }

  /**
   * True when the body matches the Anthropic Messages wire shape.
   * The same heuristic used by CliproxyapiExecutor — see comments there for
   * the reasoning behind each signal.
   */
  private isAnthropicShape(body: unknown): boolean {
    if (!body || typeof body !== "object") return false;
    const b = body as Record<string, unknown>;
    if (b.system !== undefined) return true;
    if (b.thinking !== undefined) return true;
    if (
      b.metadata &&
      typeof b.metadata === "object" &&
      (b.metadata as Record<string, unknown>).user_id !== undefined
    )
      return true;
    const msgs = b.messages;
    if (Array.isArray(msgs) && msgs.length > 0) {
      const first = msgs[0] as Record<string, unknown>;
      if (Array.isArray(first?.content)) return true;
    }
    return false;
  }

  private selectEndpoint(body: unknown): "/v1/messages" | "/v1/chat/completions" {
    return this.isAnthropicShape(body) ? "/v1/messages" : "/v1/chat/completions";
  }

  buildHeaders(credentials: ProviderCredentials | null, stream = true): Record<string, string> {
    const key = credentials?.apiKey ?? credentials?.accessToken;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (key) headers["Authorization"] = `Bearer ${key}`;
    if (stream) headers["Accept"] = "text/event-stream";
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
    if (transformed.model !== model) transformed.model = model;
    return transformed;
  }

  async execute(input: ExecuteInput) {
    const endpoint = this.selectEndpoint(input.body);
    const url = `${this.upstreamBaseUrl}${endpoint}`;
    const shape = endpoint === "/v1/messages" ? "anthropic" : "openai";
    const headers = this.buildHeaders(input.credentials, input.stream);
    const transformedBody = this.transformRequest(
      input.model,
      input.body,
      input.stream,
      input.credentials
    );
    mergeUpstreamExtraHeaders(headers, input.upstreamExtraHeaders ?? null);

    const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
    const combinedSignal = input.signal
      ? mergeAbortSignals(input.signal, timeoutSignal)
      : timeoutSignal;

    input.log?.info?.("9ROUTER", `→ ${url} (model: ${input.model}, shape: ${shape})`);

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(transformedBody),
      signal: combinedSignal,
    });

    return { response, url, headers, transformedBody };
  }

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; error?: string }> {
    const start = Date.now();
    try {
      const res = await fetch(`${this.upstreamBaseUrl}/api/health`, {
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

export default NineRouterExecutor;
