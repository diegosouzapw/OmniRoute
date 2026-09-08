/**
 * nadirStrategy.ts — `nadir` auto-router strategy: ask which model the PROMPT
 * needs, then let the fallback strategy pick the connection that serves it.
 *
 * Every other RouterStrategy ranks candidates by their own telemetry (quota,
 * health, price, latency, task fitness). None of them reads the request: the
 * only difficulty signal in the engine (complexityRouter.ts) is a keyword
 * heuristic feeding two low-weight scoring factors. This strategy sends the
 * last user turn plus the pool's model ids to Nadir's decision API
 * (`POST /v1/bucket`, https://getnadir.com/docs) and routes to the model Nadir
 * selects from that menu. The connection serving that model is still chosen by
 * the fallback strategy (`rules` unless injected), so quota/health/cost keep
 * deciding WHICH account and Nadir only decides WHICH model.
 *
 * Guarantees:
 *   - Opt-in: only combos with `config.routerStrategy: "nadir"` call out.
 *   - Fail-open: any error, timeout, non-2xx, missing prompt, or a selection
 *     outside the pool resolves to the fallback's decision. Never a 5xx.
 *   - Bounded: one POST per request under a hard timeout, plus a cooldown after
 *     a failure so an unreachable endpoint costs one timeout per
 *     NADIR_FAILURE_COOLDOWN_MS, not one per request.
 *   - Minimal egress: only the last user turn's text (capped) and the pool's
 *     model ids leave the box. No system prompt, no history, no tools.
 *
 * Config: combo `config.nadir = { apiKey, baseUrl, timeoutMs }`, with
 * `OMNIROUTE_NADIR_API_KEY` / `OMNIROUTE_NADIR_BASE_URL` as env fallbacks.
 */
import type { ProviderCandidate } from "./scoring.ts";
import type { RouterStrategy, RoutingContext, RoutingDecision } from "./routerStrategy.ts";

export interface NadirRoutingConfig {
  /** Nadir API key, sent as `X-API-Key`. Keyless calls land on the rate-limited anonymous tier. */
  apiKey?: string;
  /** Origin of the Nadir API. Defaults to https://api.getnadir.com; self-hosted deployments override it. */
  baseUrl?: string;
  /** Hard timeout for the decision call in ms. Default 2000, max 30000. */
  timeoutMs?: number;
}

export interface NadirTransportInit {
  method: "POST";
  headers: Record<string, string>;
  body: string;
  timeoutMs: number;
}

/** The HTTP seam: production uses safeOutboundFetch, tests inject a fake. */
export type NadirTransport = (url: string, init: NadirTransportInit) => Promise<Response>;

export interface NadirStrategyOptions {
  /** Decides the connection for the selected model and takes over on every failure. */
  fallback: RouterStrategy;
  transport?: NadirTransport;
  /** Clock seam for the failure cooldown (tests). */
  now?: () => number;
}

export const NADIR_DEFAULT_BASE_URL = "https://api.getnadir.com";
export const NADIR_DEFAULT_TIMEOUT_MS = 2000;
export const NADIR_MAX_TIMEOUT_MS = 30_000;
/** After a failed call, skip the network for this long (per base URL). */
export const NADIR_FAILURE_COOLDOWN_MS = 30_000;
/** `BucketRequest.menu` accepts at most 100 ids. */
const MAX_MENU_ITEMS = 100;
/** The classifier reads the head of the prompt; a pasted log need not travel whole. */
export const NADIR_MAX_PROMPT_CHARS = 16_000;
const ENV_API_KEY = "OMNIROUTE_NADIR_API_KEY";
const ENV_BASE_URL = "OMNIROUTE_NADIR_BASE_URL";

function readString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

/** Parse the combo's `config.nadir` block; anything that is not an object yields `undefined`. */
export function resolveNadirRoutingConfig(raw: unknown): NadirRoutingConfig | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const record = raw as Record<string, unknown>;
  const timeoutMs = Number(record.timeoutMs);
  return {
    apiKey: readString(record.apiKey),
    baseUrl: readString(record.baseUrl),
    timeoutMs: Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : undefined,
  };
}

/**
 * Normalize an operator-supplied origin. Nadir's own docs advertise the
 * OpenAI-compatible base `https://api.getnadir.com/v1`; a pasted `/v1` would
 * double up to `/v1/v1/bucket`, so it is stripped here. Returns `undefined`
 * for anything that is not an absolute http(s) URL.
 */
export function normalizeNadirBaseUrl(raw: string | undefined): string | undefined {
  const value = (raw ?? "").trim().replace(/\/+$/, "").replace(/\/v1$/, "").replace(/\/+$/, "");
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? value : undefined;
  } catch {
    return undefined;
  }
}

/** Text of the last `user` message: a string, or the joined text parts of an array. */
export function extractLastUserText(messages: unknown): string | null {
  if (!Array.isArray(messages)) return null;
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index] as { role?: unknown; content?: unknown } | null;
    if (!message || message.role !== "user") continue;
    const { content } = message;
    if (typeof content === "string") return content.trim() || null;
    if (!Array.isArray(content)) return null;
    const text = content
      .map((part) => {
        const record = part as { type?: unknown; text?: unknown } | null;
        const isText = record?.type === "text" || record?.type === "input_text";
        return isText && typeof record?.text === "string" ? record.text : "";
      })
      .filter(Boolean)
      .join("\n")
      .trim();
    return text || null;
  }
  return null;
}

function clampTimeout(value: number | undefined): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return NADIR_DEFAULT_TIMEOUT_MS;
  }
  return Math.min(NADIR_MAX_TIMEOUT_MS, value);
}

interface BucketResponse {
  selected_model?: unknown;
  bucket?: unknown;
  confidence?: unknown;
}

const defaultTransport: NadirTransport = async (url, init) => {
  // Lazy so this module stays free of the proxy/TLS fetch stack until the first call.
  const [{ safeOutboundFetch }, { getProviderOutboundGuard }] = await Promise.all([
    import("@/shared/network/safeOutboundFetch"),
    import("@/shared/network/outboundUrlGuardPolicy"),
  ]);
  return safeOutboundFetch(url, {
    method: init.method,
    headers: init.headers,
    body: init.body,
    timeoutMs: init.timeoutMs,
    retry: false,
    guard: getProviderOutboundGuard(),
  });
};

export class NadirStrategyImpl implements RouterStrategy {
  readonly name = "nadir";
  readonly description =
    "Asks Nadir's decision API which model in the pool the prompt needs; connection choice and every failure fall back to the rules strategy";

  private readonly fallback: RouterStrategy;
  private readonly transport: NadirTransport;
  private readonly now: () => number;
  private readonly cooldownUntil = new Map<string, number>();

  constructor(options: NadirStrategyOptions) {
    this.fallback = options.fallback;
    this.transport = options.transport ?? defaultTransport;
    this.now = options.now ?? Date.now;
  }

  /** Sync entry point: the decision needs I/O, so a sync caller gets the fallback's pick. */
  select(pool: ProviderCandidate[], context: RoutingContext): RoutingDecision {
    return this.fallbackDecision(pool, context, "sync caller, decision needs I/O");
  }

  async selectAsync(pool: ProviderCandidate[], context: RoutingContext): Promise<RoutingDecision> {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const candidates = healthy.length > 0 ? healthy : pool;
    if (candidates.length === 0) throw new Error("[NadirStrategy] No candidates available");

    const prompt = extractLastUserText(context.messages);
    if (!prompt) return this.fallbackDecision(candidates, context, "request carries no user text");

    const configuredBaseUrl =
      readString(context.nadir?.baseUrl) ?? readString(process.env[ENV_BASE_URL]);
    const baseUrl = configuredBaseUrl
      ? normalizeNadirBaseUrl(configuredBaseUrl)
      : NADIR_DEFAULT_BASE_URL;
    if (!baseUrl) {
      return this.fallbackDecision(candidates, context, `invalid baseUrl ${configuredBaseUrl}`);
    }
    if ((this.cooldownUntil.get(baseUrl) ?? 0) > this.now()) {
      return this.fallbackDecision(candidates, context, "cooling down after a failed call");
    }

    const apiKey = readString(context.nadir?.apiKey) ?? readString(process.env[ENV_API_KEY]);
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (apiKey) headers["X-API-Key"] = apiKey;
    const menu = [...new Set(candidates.map((c) => c.model))].slice(0, MAX_MENU_ITEMS);

    let data: BucketResponse;
    try {
      const response = await this.transport(`${baseUrl}/v1/bucket`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          prompt: prompt.slice(0, NADIR_MAX_PROMPT_CHARS),
          menu,
          source: "omniroute",
        }),
        timeoutMs: clampTimeout(context.nadir?.timeoutMs),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      data = (await response.json()) as BucketResponse;
    } catch (err) {
      this.cooldownUntil.set(baseUrl, this.now() + NADIR_FAILURE_COOLDOWN_MS);
      const message = err instanceof Error ? err.message : String(err);
      console.warn(
        `[NadirStrategy] decision call failed (${message}); using '${this.fallback.name}' for the next ${NADIR_FAILURE_COOLDOWN_MS / 1000}s`
      );
      return this.fallbackDecision(candidates, context, `call failed: ${message}`);
    }

    const selected = readString(data.selected_model);
    const matching = selected ? candidates.filter((c) => c.model === selected) : [];
    if (!selected || matching.length === 0) {
      return this.fallbackDecision(
        candidates,
        context,
        selected
          ? `selected model ${selected} is not in the pool`
          : "response carries no selected_model"
      );
    }

    const decision = this.fallback.select(matching, context);
    const confidence =
      typeof data.confidence === "number" && Number.isFinite(data.confidence)
        ? Math.min(1, Math.max(0, data.confidence))
        : undefined;
    return {
      ...decision,
      strategy: this.name,
      reason: `NadirStrategy: bucket=${readString(data.bucket) ?? "unknown"} confidence=${confidence?.toFixed(2) ?? "n/a"} model=${selected} (${decision.reason})`,
      candidatesConsidered: candidates.length,
      finalScore: confidence ?? decision.finalScore,
    };
  }

  private fallbackDecision(
    pool: ProviderCandidate[],
    context: RoutingContext,
    why: string
  ): RoutingDecision {
    const decision = this.fallback.select(pool, context);
    return { ...decision, reason: `NadirStrategy: fallback (${why}); ${decision.reason}` };
  }
}
