/**
 * BifrostAdapter — wraps the bifrost gateway (KooshaPari/bifrost) as a
 * RouterPort. Bifrost exposes an OpenAI-compatible HTTP API, so this adapter
 * calls /v1/chat/completions on the configured base URL and translates the
 * response into the canonical RouteResult shape.
 *
 * ADR-001: bifrost is the default routing substrate for OmniRoute.
 * Swap to ClipproxyAdapter or NativeAdapter by injecting a different
 * RouterPort implementation.
 *
 * @module lib/adapters/bifrostAdapter
 */

import type {
  RouterPort,
  RouterConfig,
  RouteRequest,
  RouteResult,
  ProviderName,
} from "../../domain/router/port.ts";
import { DEFAULT_ROUTER_CONFIG } from "../../domain/router/port.ts";

// ---------------------------------------------------------------------------
// Config / env resolution
// ---------------------------------------------------------------------------

export interface BifrostAdapterConfig {
  /** Base URL of the running bifrost gateway (default: env BIFROST_BASE_URL). */
  baseUrl?: string;
  /** Bearer token / API key for bifrost auth (default: env BIFROST_API_KEY). */
  apiKey?: string;
  /** RouterConfig for provider priority + fallback policy. */
  router?: RouterConfig;
}

function resolveBaseUrl(cfg: BifrostAdapterConfig): string {
  return (
    cfg.baseUrl ??
    (typeof process !== "undefined" ? process.env["BIFROST_BASE_URL"] : undefined) ??
    "http://localhost:8080"
  );
}

function resolveApiKey(cfg: BifrostAdapterConfig): string | undefined {
  return (
    cfg.apiKey ??
    (typeof process !== "undefined" ? process.env["BIFROST_API_KEY"] : undefined)
  );
}

// ---------------------------------------------------------------------------
// OpenAI-compat types (minimal — bifrost follows this spec)
// ---------------------------------------------------------------------------

interface OAIChatMessage {
  role: string;
  content: string;
}

interface OAIChatRequest {
  model: string;
  messages: OAIChatMessage[];
  max_tokens?: number;
  stream?: boolean;
  [k: string]: unknown;
}

interface OAIChatResponse {
  id: string;
  choices: Array<{
    message: { role: string; content: string };
    finish_reason: string | null;
  }>;
  usage?: { prompt_tokens?: number; completion_tokens?: number };
  model?: string;
  // bifrost adds x-provider header, reflected here when available
  _provider?: string;
}

// ---------------------------------------------------------------------------
// Adapter
// ---------------------------------------------------------------------------

export class BifrostAdapter implements RouterPort {
  private readonly baseUrl: string;
  private readonly apiKey: string | undefined;
  private readonly routerConfig: RouterConfig;

  constructor(cfg: BifrostAdapterConfig = {}) {
    this.baseUrl = resolveBaseUrl(cfg).replace(/\/$/, "");
    this.apiKey = resolveApiKey(cfg);
    this.routerConfig = { ...DEFAULT_ROUTER_CONFIG, ...(cfg.router ?? {}) };
  }

  // -------------------------------------------------------------------------
  // RouterPort: route
  // -------------------------------------------------------------------------

  async route(req: RouteRequest): Promise<RouteResult> {
    const startMs = Date.now();

    // Build provider priority list: tier override → global priority
    const priority = this._resolveProviderPriority(req);
    const timeoutMs = this.routerConfig.timeoutMs ?? 30_000;

    let lastError: RouteResult["error"] | undefined;

    for (let i = 0; i < priority.length; i++) {
      const provider = priority[i]!;
      const usedFallback = i > 0;

      try {
        const body: OAIChatRequest = {
          model: req.model,
          messages: req.messages,
          ...(req.maxTokens !== undefined ? { max_tokens: req.maxTokens } : {}),
          ...(req.stream !== undefined ? { stream: req.stream } : {}),
          ...(req.params ?? {}),
        };

        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          // bifrost uses x-provider header to select the backend
          "x-provider": provider,
        };
        if (this.apiKey) {
          headers["Authorization"] = `Bearer ${this.apiKey}`;
        }

        const ac = new AbortController();
        const tid = setTimeout(() => ac.abort(), timeoutMs);

        let resp: Response;
        try {
          resp = await fetch(`${this.baseUrl}/v1/chat/completions`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
            signal: ac.signal,
          });
        } finally {
          clearTimeout(tid);
        }

        if (!resp.ok) {
          const errText = await resp.text().catch(() => resp.statusText);
          const code =
            resp.status === 429
              ? "rate_limit"
              : resp.status >= 500
              ? "provider_error"
              : "unknown";
          lastError = {
            code,
            message: `bifrost returned ${resp.status}: ${errText}`,
            provider,
            retriable: resp.status === 429 || resp.status >= 500,
          };
          if (this.routerConfig.enableFallback && lastError.retriable) {
            continue; // try next provider
          }
          return { ok: false, error: lastError };
        }

        const data = (await resp.json()) as OAIChatResponse;
        const text = data.choices[0]?.message?.content ?? "";
        const resolvedProvider: ProviderName =
          resp.headers.get("x-provider") ?? data._provider ?? provider;

        return {
          ok: true,
          value: {
            text,
            provider: resolvedProvider,
            model: data.model ?? req.model,
            inputTokens: data.usage?.prompt_tokens,
            outputTokens: data.usage?.completion_tokens,
            latencyMs: Date.now() - startMs,
            usedFallback,
            raw: data,
          },
        };
      } catch (err) {
        const isAbort =
          err instanceof Error && err.name === "AbortError";
        lastError = {
          code: isAbort ? "timeout" : "provider_error",
          message: err instanceof Error ? err.message : String(err),
          provider,
          retriable: true,
          cause: err,
        };
        if (this.routerConfig.enableFallback) {
          continue;
        }
        return { ok: false, error: lastError };
      }
    }

    return {
      ok: false,
      error: lastError ?? {
        code: "config_error",
        message: "No providers configured",
        retriable: false,
      },
    };
  }

  // -------------------------------------------------------------------------
  // RouterPort: listAvailableProviders
  // -------------------------------------------------------------------------

  async listAvailableProviders(): Promise<ProviderName[]> {
    try {
      const headers: Record<string, string> = {};
      if (this.apiKey) headers["Authorization"] = `Bearer ${this.apiKey}`;

      const resp = await fetch(`${this.baseUrl}/v1/providers`, { headers });
      if (!resp.ok) return [...this.routerConfig.providerPriority];

      const data = (await resp.json()) as { providers?: string[] };
      return data.providers ?? [...this.routerConfig.providerPriority];
    } catch {
      // bifrost not reachable — return config list
      return [...this.routerConfig.providerPriority];
    }
  }

  // -------------------------------------------------------------------------
  // RouterPort: listModels
  // -------------------------------------------------------------------------

  async listModels(provider?: ProviderName): Promise<string[]> {
    try {
      const headers: Record<string, string> = {};
      if (this.apiKey) headers["Authorization"] = `Bearer ${this.apiKey}`;
      if (provider) headers["x-provider"] = provider;

      const resp = await fetch(`${this.baseUrl}/v1/models`, { headers });
      if (!resp.ok) return [];

      const data = (await resp.json()) as { data?: Array<{ id: string }> };
      return (data.data ?? []).map((m) => m.id);
    } catch {
      return [];
    }
  }

  // -------------------------------------------------------------------------
  // Private helpers
  // -------------------------------------------------------------------------

  private _resolveProviderPriority(req: RouteRequest): ProviderName[] {
    if (req.fitnessTier && this.routerConfig.tierOverrides) {
      const override = this.routerConfig.tierOverrides[req.fitnessTier];
      if (override) {
        // Put tier-preferred provider first, rest follow
        const rest = this.routerConfig.providerPriority.filter(
          (p) => p !== override
        );
        return [override, ...rest];
      }
    }
    return [...this.routerConfig.providerPriority];
  }
}
