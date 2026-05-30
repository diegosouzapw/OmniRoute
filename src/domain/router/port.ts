/**
 * RouterPort — hexagonal port for canonical LLM routing.
 *
 * ADR-001: OmniRoute is the canonical routing project; the routing core is
 * replaced with bifrost. This port is the inbound/outbound boundary: callers
 * depend on these types only, adapters plug in at the edges.
 *
 * @module domain/router/port
 */

// ---------------------------------------------------------------------------
// Value objects
// ---------------------------------------------------------------------------

export type ProviderName =
  | "openai"
  | "anthropic"
  | "gemini"
  | "groq"
  | "mistral"
  | "azure"
  | "bedrock"
  | "vertex"
  | "ollama"
  | "openrouter"
  | string; // open for extension

export type FitnessTier = "best-reasoning" | "cheapest" | "moderate" | "balanced";

export interface RouteRequest {
  /** Canonical model string (e.g. "gpt-4o", "claude-opus-4-5"). */
  model: string;
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>;
  /** Optional hint for provider-selection policy. */
  fitnessTier?: FitnessTier;
  /** Max tokens for response. */
  maxTokens?: number;
  /** Streaming mode — adapter must honour this flag. */
  stream?: boolean;
  /** Pass-through provider overrides (e.g. temperature). */
  params?: Record<string, unknown>;
}

export interface RouteResponse {
  text: string;
  provider: ProviderName;
  model: string;
  inputTokens?: number;
  outputTokens?: number;
  latencyMs: number;
  /** True when a fallback provider was used. */
  usedFallback: boolean;
  /** Raw adapter-level response (opaque). */
  raw?: unknown;
}

export interface RouteError {
  code: "provider_error" | "timeout" | "rate_limit" | "model_unavailable" | "config_error" | "unknown";
  message: string;
  provider?: ProviderName;
  retriable: boolean;
  cause?: unknown;
}

export type RouteResult =
  | { ok: true; value: RouteResponse }
  | { ok: false; error: RouteError };

// ---------------------------------------------------------------------------
// Port interface (hexagonal outbound port)
// ---------------------------------------------------------------------------

/**
 * RouterPort is the sole routing abstraction all OmniRoute request handlers
 * depend on. Adapters (bifrost, cliproxy, native) implement this interface.
 */
export interface RouterPort {
  /**
   * Route a single chat-completion request. Returns a RouteResult so callers
   * can handle failures without exceptions.
   */
  route(req: RouteRequest): Promise<RouteResult>;

  /**
   * Return which providers are currently healthy / available.
   * Used by health-check endpoints and combo selection.
   */
  listAvailableProviders(): Promise<ProviderName[]>;

  /**
   * Optional: provider-specific model listing.
   * Returns empty array if not supported by the adapter.
   */
  listModels(provider?: ProviderName): Promise<string[]>;
}

// ---------------------------------------------------------------------------
// Provider-selection config (loaded from env / settings.json)
// ---------------------------------------------------------------------------

export interface RouterConfig {
  /** Ordered list of providers to try. First healthy one wins. */
  providerPriority: ProviderName[];
  /** Map of fitnessTier → preferred provider (overrides priority list). */
  tierOverrides?: Partial<Record<FitnessTier, ProviderName>>;
  /** Default request timeout in milliseconds. */
  timeoutMs?: number;
  /** If true, automatically try next provider on transient failure. */
  enableFallback?: boolean;
}

export const DEFAULT_ROUTER_CONFIG: RouterConfig = {
  providerPriority: ["openai", "anthropic", "groq"],
  timeoutMs: 30_000,
  enableFallback: true,
};
