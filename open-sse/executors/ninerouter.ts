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
 *
 * G-01: port and apiKey are re-read per request from the supervisor registry
 * and DB respectively — never cached in the constructor — because rotate-key
 * and update (new port) can change them between calls.
 *
 * G-02: when the supervisor is not running, the executor returns a 503 with
 * header X-Omni-Fallback-Hint: connection_cooldown so accountFallback.ts
 * applies a short 5s cooldown without tripping the provider circuit breaker.
 */

import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  mergeAbortSignals,
  type ProviderCredentials,
  type ExecuteInput,
} from "./base.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { buildErrorBody } from "../utils/error.ts";
import { getSupervisor } from "@/lib/services/registry";
import { getOrCreateApiKey } from "@/lib/services/apiKey";

const DEFAULT_PORT = 20130;
const DEFAULT_HOST = "127.0.0.1";
const HEALTH_CHECK_TIMEOUT_MS = 3_000;

/** Fallback hint header value that tells accountFallback.ts to use 5s cooldown, no breaker trip. */
export const NINEROUTER_FALLBACK_HINT = "connection_cooldown";
export const NINEROUTER_FALLBACK_HINT_HEADER = "X-Omni-Fallback-Hint";

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
   * Build a 503 service_not_running Response with the fallback hint header.
   * Message goes through buildErrorBody to satisfy hard rule #12 (no raw err.message).
   */
  private buildServiceUnavailableResponse(message: string): Response {
    const body = buildErrorBody(503, message);
    body.error.code = "service_not_running";
    return new Response(JSON.stringify(body), {
      status: 503,
      headers: {
        "Content-Type": "application/json",
        [NINEROUTER_FALLBACK_HINT_HEADER]: NINEROUTER_FALLBACK_HINT,
      },
    });
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
    // G-01: re-lookup supervisor state per request (port may change on restart/update)
    const supervisor = getSupervisor("9router");
    const status = supervisor?.getStatus();
    if (!supervisor || status?.state !== "running") {
      const stateLabel = status?.state ?? "unknown";
      const msg = `9router is not running (state: ${stateLabel})`;
      input.log?.warn?.("9ROUTER", msg);
      return {
        response: this.buildServiceUnavailableResponse(msg),
        url: "",
        headers: {},
        transformedBody: null,
      };
    }
    const dynamicPort = status.port;
    const dynamicBaseUrl = `http://127.0.0.1:${dynamicPort}`;

    // G-01: re-read apiKey per request — never cached in constructor
    const apiKey = await getOrCreateApiKey("9router");
    const dynamicCredentials: ProviderCredentials = { ...input.credentials, apiKey };

    // G-01: strip "9router/" prefix before forwarding to upstream
    const innerModel = input.model.replace(/^9router\//, "");

    const endpoint = this.selectEndpoint(input.body);
    const url = `${dynamicBaseUrl}${endpoint}`;
    const shape = endpoint === "/v1/messages" ? "anthropic" : "openai";
    const headers = this.buildHeaders(dynamicCredentials, input.stream);
    const transformedBody = this.transformRequest(
      innerModel,
      input.body,
      input.stream,
      dynamicCredentials
    );
    mergeUpstreamExtraHeaders(headers, input.upstreamExtraHeaders ?? null);

    const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
    const combinedSignal = input.signal
      ? mergeAbortSignals(input.signal, timeoutSignal)
      : timeoutSignal;

    input.log?.info?.(
      "9ROUTER",
      `→ ${url} (model: ${innerModel}, shape: ${shape}, port: ${dynamicPort})`
    );

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
