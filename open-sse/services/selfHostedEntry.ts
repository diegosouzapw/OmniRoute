/**
 * Self-hosted unified OpenAI-compatible entry (D4 — 接入即用).
 *
 * Exposes OmniRoute's existing /v1/chat/completions route as a self-hosted
 * gateway: one OpenAI-compatible contract in, auto-route to the runtime-selected
 * provider, standard OpenAI error shape out.
 *
 * Design (KISS / RIC-738 + RIC-740):
 *  - Reuses the provider adapters from `providerAdapters.ts` (RIC-737) — no new
 *    abstraction layer. This module only orchestrates: load config → auth → pick
 *    provider → dispatch → normalize response.
 *  - Config is declarative YAML (env string or file path); credentials live in
 *    the file/env at runtime and are never logged or persisted (RIC-737 contract).
 *  - Auto-route = header override -> model-prefix match -> deterministic strategy
 *    (`routingStrategies.ts`, M2/RIC-740). Every decision is explainable via the
 *    `x-omniroute-route-decision` response header — no predictive model.
 *  - The API-key check is a scaffold reserved for the D5 quota-key system: when
 *    `OMNIROUTE_SELF_HOSTED_API_KEY` is unset the route is open (loopback /
 *    trusted-network deployment), exactly like the existing self-hosted local
 *    providers.
 */

import * as yaml from "js-yaml";
import { readFile } from "node:fs/promises";
import { errorResponse, buildErrorBody, parseUpstreamError } from "../utils/error.ts";
import { stripSensitiveResponseHeaders } from "../utils/upstreamResponseHeaders.ts";
import type { ChatRequest, ProviderConfig } from "./providerAdapters.ts";
import { ProviderRouter } from "./providerAdapters.ts";
import {
  STRATEGY_ENV,
  STRATEGY_FILE_ENV,
  DeterministicRoutingEngine,
  parseSelfHostedRoutingConfig,
  parseStrategyConfig,
  type StrategyConfig,
} from "./routingStrategies.ts";

/** Env var holding the inline YAML provider config (runtime-only credentials). */
export const CONFIG_ENV = "OMNIROUTE_SELF_HOSTED_PROVIDERS";
/** Env var pointing at a YAML file with the provider config. */
export const CONFIG_FILE_ENV = "OMNIROUTE_SELF_HOSTED_PROVIDERS_FILE";
/** Optional shared API key for the unified entry (D5 reserved). */
export const API_KEY_ENV = "OMNIROUTE_SELF_HOSTED_API_KEY";
/** Provider-selector header recognized by the unified entry. */
export const PROVIDER_SELECTOR_HEADER = "x-omniroute-provider";
/** Marker header added to responses routed through the unified entry. */
export const ROUTED_BY_HEADER = "x-omniroute-routed-by";
/** Explainability header carrying the deterministic route decision one-liner. */
export const ROUTE_DECISION_HEADER = "x-omniroute-route-decision";
const ROUTED_BY_VALUE = "self-hosted-openai-compat";

export interface SelfHostedOptions {
  providers?: string;
  providersFile?: string;
  apiKey?: string;
  /** Inline YAML `strategy:` document (M2/RIC-740, optional). */
  strategy?: string;
  /** Path to a YAML file holding the `strategy:` document (optional). */
  strategyFile?: string;
}

export interface SelfHostedRuntime {
  router: ProviderRouter;
  engine: DeterministicRoutingEngine;
}

let cachedRuntime: SelfHostedRuntime | null = null;
let cachedRuntimeSignature = "";
let failedConfigLoad: string | null = null;

interface SelfHostedSources {
  providersFile?: string;
  providersSource: string;
  strategySource: string;
}

/** Inline YAML text wins; otherwise read the file (if any); otherwise empty. */
async function resolveTextSource(
  inline: string | undefined,
  filePath: string | undefined
): Promise<string> {
  if (inline) return inline;
  return filePath ? await readFile(filePath, "utf8") : "";
}

/** Resolve the raw providers/strategy YAML text from env/file. `null` = unconfigured. */
async function resolveSelfHostedSources(
  options: SelfHostedOptions
): Promise<SelfHostedSources | null> {
  const providersYaml = options.providers ?? process.env[CONFIG_ENV] ?? undefined;
  const providersFile = options.providersFile ?? process.env[CONFIG_FILE_ENV] ?? undefined;
  const strategyInline = options.strategy ?? process.env[STRATEGY_ENV] ?? undefined;
  const strategyFile = options.strategyFile ?? process.env[STRATEGY_FILE_ENV] ?? undefined;

  if (!providersYaml && !providersFile) return null;

  const providersSource = await resolveTextSource(providersYaml, providersFile);
  const strategySource = await resolveTextSource(strategyInline, strategyFile);

  return { providersFile, providersSource, strategySource };
}

/** Content signature used to skip re-parsing when nothing has changed. */
function signatureFor(sources: SelfHostedSources): string {
  return [
    sources.providersFile ?? "",
    sources.providersSource.length,
    sources.providersSource.slice(0, 64),
    sources.strategySource.length,
    sources.strategySource.slice(0, 64),
  ].join(":");
}

/** Parse providers + strategy and build the router/engine pair. May throw. */
function buildSelfHostedRuntime(sources: SelfHostedSources): SelfHostedRuntime {
  const parsed = parseSelfHostedRoutingConfig(sources.providersSource);
  // An explicit strategy env/file overrides the inline `strategy:` block per-key.
  let strategy: StrategyConfig = parsed.strategy;
  if (sources.strategySource.trim()) {
    strategy = { ...strategy, ...parseStrategyConfig(yaml.load(sources.strategySource)) };
  }
  return {
    router: new ProviderRouter({ providers: parsed.providers }),
    engine: new DeterministicRoutingEngine(parsed.providers, strategy),
  };
}

/**
 * Resolve provider config + strategy from env/file; caches by content signature.
 * Returns `null` when no provider config is present at all.
 */
async function loadSelfHostedRuntime(
  options: SelfHostedOptions
): Promise<SelfHostedRuntime | null> {
  const sources = await resolveSelfHostedSources(options);
  if (!sources) return null;

  const signature = signatureFor(sources);
  if (cachedRuntime && cachedRuntimeSignature === signature) {
    return cachedRuntime;
  }

  try {
    cachedRuntime = buildSelfHostedRuntime(sources);
    cachedRuntimeSignature = signature;
    failedConfigLoad = null;
    return cachedRuntime;
  } catch (error) {
    failedConfigLoad = error instanceof Error ? error.message : String(error);
    return null;
  }
}

/**
 * Resolve provider config from env/file (back-compat shim — returns the router
 * only). The strategy-aware runtime is built internally by the dispatch path.
 */
export async function loadSelfHostedConfig(
  options: SelfHostedOptions = {}
): Promise<ProviderRouter | null> {
  const runtime = await loadSelfHostedRuntime(options);
  return runtime?.router ?? null;
}

/**
 * Parse the providers document. Flat `providers:` list (see providerAdapters).
 * Public because tests seed config through it directly.
 */
export function parseProvidersYaml(source: string): { providers: ProviderConfig[] } {
  const parsed = parseSelfHostedRoutingConfig(source);
  return { providers: parsed.providers };
}

/** Runtime-only API key check. `null` = no key configured (open route). */
export function resolveSelfHostedApiKey(options: SelfHostedOptions = {}): string | null {
  return options.apiKey ?? process.env[API_KEY_ENV] ?? null;
}

/**
 * Provider id normalized for auto-route matching: strips a leading provider
 * prefix separated by `/` or `::` (e.g. `openai/gpt-4o` or `local::llama3`
 * -> `gpt-4o` / `llama3`), matching the m2 deterministic-routing convention.
 */
export function splitProviderModel(value: unknown): { provider?: string; model?: string } {
  if (typeof value !== "string") return {};
  // `provider/model` (single slash) takes precedence over `provider::model`
  // (double colon) — a `local::llama3` model already contains a colon.
  const slash = value.indexOf("/");
  if (slash !== -1 && slash > 0 && slash < value.length - 1) {
    return { provider: value.slice(0, slash), model: value.slice(slash + 1) };
  }
  const doubleColon = value.indexOf("::");
  if (doubleColon !== -1 && doubleColon > 0 && doubleColon < value.length - 2) {
    return { provider: value.slice(0, doubleColon), model: value.slice(doubleColon + 2) };
  }
  return { model: value };
}

/**
 * Select the provider to route a request to (single-attempt, no fallback).
 *
 * Precedence (deterministic, documented in the README):
 *  1. `x-omniroute-provider` header (exact provider id) — remote client control.
 *  2. `model` prefix match (`provider/model` or `provider::model`).
 *  3. First configured provider (`ProviderRouter.select()` default).
 *
 * The dispatch path (`completeViaSelfHostedRouter`) uses the strategy engine for
 * the same selection + fallback; this function is kept for compatibility/tests.
 */
export function selectSelfHostedProvider(
  router: ProviderRouter,
  request: Request,
  body: { model?: unknown } | null
): ProviderConfig {
  const headerId = request.headers.get(PROVIDER_SELECTOR_HEADER)?.trim();
  if (headerId) {
    try {
      return router.select(headerId);
    } catch {
      // fall through to model-prefix / first-provider resolution
    }
  }
  const { provider } = splitProviderModel(body?.model);
  if (provider) {
    try {
      return router.select(provider);
    } catch {
      // fall through to first-provider resolution
    }
  }
  return router.select(undefined);
}

/**
 * Resolve the explicitly pinned provider id (header, then model prefix), without
 * falling through to the first provider. Unknown pins yield `undefined` — the
 * strategy engine then treats the request as unpinned and applies its full
 * candidate pipeline.
 */
function resolvePinnedProviderId(
  router: ProviderRouter,
  request: Request,
  body: { model?: unknown } | null
): string | undefined {
  const headerId = request.headers.get(PROVIDER_SELECTOR_HEADER)?.trim();
  if (headerId) {
    try {
      router.select(headerId);
      return headerId;
    } catch {
      // unknown header id — fall through to model-prefix resolution
    }
  }
  const { provider } = splitProviderModel(body?.model);
  if (provider) {
    try {
      router.select(provider);
      return provider;
    } catch {
      // unknown prefix — no pin
    }
  }
  return undefined;
}

function buildErrorResponse(statusCode: number, message: string): Response {
  return errorResponse(statusCode, message, { type: "invalid_request_error" });
}

/** Headers echoed on upstream pass-through, plus the routed-by marker. */
function passthroughHeaders(upstream: Headers): Headers {
  const headers = stripSensitiveResponseHeaders(upstream);
  headers.set(ROUTED_BY_HEADER, ROUTED_BY_VALUE);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return headers;
}

/**
 * Normalize an upstream Response into the OpenAI-compatible unified response.
 * Non-2xx upstream bodies are parsed through `parseUpstreamError` + `buildErrorBody`
 * so the client always receives a valid OpenAI-shaped JSON error (Hard Rule #12).
 * `routeDecision` (when present) is echoed as the explainability header.
 */
export async function normalizeProviderResponse(
  upstream: Response,
  routeDecision?: string
): Promise<Response> {
  const headers = passthroughHeaders(upstream.headers);
  if (routeDecision) headers.set(ROUTE_DECISION_HEADER, routeDecision);
  if (!upstream.ok) {
    const parsed = await parseUpstreamError(upstream, null);
    const errorBody = buildErrorBody(parsed.statusCode, parsed.message, parsed.responseBody);
    headers.set("Content-Type", "application/json");
    return new Response(JSON.stringify(errorBody), { status: parsed.statusCode, headers });
  }

  if (upstream.body) {
    return new Response(upstream.body, { status: upstream.status, headers });
  }

  return new Response(upstream.body, { status: upstream.status, headers });
}

/** Build the body forwarded to the selected provider (bare model, prefix stripped). */
function buildForwardedBody(body: Record<string, unknown> | null): ChatRequest {
  const baseBody = {
    messages: Array.isArray(body?.messages) ? body.messages : [],
    ...(body ?? {}),
  };
  const { provider, model } = splitProviderModel(body?.model);
  return provider ? { ...baseBody, model } : baseBody;
}

/**
 * Dispatch a chat/completions request through the deterministic routing engine:
 * build the ordered candidate list, walk it as a fallback chain, record
 * success/failure/latency per candidate, and normalize the final response.
 */
export async function completeViaSelfHostedRouter(
  config: SelfHostedOptions,
  request: Request,
  body: Record<string, unknown> | null
): Promise<Response> {
  const runtime = await loadSelfHostedRuntime(config);
  if (!runtime) {
    const detail = failedConfigLoad ? ` (${failedConfigLoad})` : "";
    return buildErrorResponse(
      500,
      `Self-hosted provider config unavailable${detail}. Set ${CONFIG_ENV} or ${CONFIG_FILE_ENV}.`
    );
  }

  const pinnedId = resolvePinnedProviderId(runtime.router, request, body);
  const decision = runtime.engine.candidates(pinnedId);

  // An explicit pin rejected by a hard filter is an error, not a silent re-route.
  if (decision.pinBlocked) {
    return errorResponse(
      400,
      `Provider "${decision.pinBlocked.providerId}" is not usable: ${decision.pinBlocked.reason}`,
      { type: "invalid_request_error" }
    );
  }

  if (decision.candidates.length === 0) {
    const explain = runtime.engine.explainCandidates([], decision.excluded);
    return errorResponse(503, `No eligible providers for this request (${explain})`, {
      type: "provider_error",
      code: "no_eligible_providers",
    });
  }

  const routeDecision = runtime.engine.explainCandidates(decision.candidates, decision.excluded);
  const forwardedBody = buildForwardedBody(body);
  let lastError: Response | null = null;

  for (const candidate of decision.candidates) {
    const attemptStart = Date.now();
    let upstream: Response;
    try {
      upstream = await runtime.router.complete(forwardedBody, candidate.provider.id);
    } catch (error) {
      // Network-level failure (connection refused / DNS / TLS) never yields an HTTP
      // status to normalize. Record the failure, keep a stable 502, and fall through
      // to the next candidate in the chain.
      runtime.engine.recordFailure(candidate.provider.id, Date.now());
      const detail = error instanceof Error ? error.message : String(error);
      lastError = buildErrorResponse(502, `Upstream provider unreachable: ${detail}`);
      continue;
    }
    runtime.engine.recordLatency(candidate.provider.id, Date.now() - attemptStart);

    if (upstream.ok) {
      runtime.engine.recordSuccess(candidate.provider.id);
      return normalizeProviderResponse(upstream, routeDecision);
    }

    // Upstream answered non-2xx — the client must never see a raw provider body,
    // and the failure feeds the cooldown breaker for the next request.
    runtime.engine.recordFailure(candidate.provider.id, Date.now());
    lastError = await normalizeProviderResponse(upstream, routeDecision);
  }

  // Every candidate exhausted — return the last normalized error.
  if (lastError) return lastError;

  return buildErrorResponse(503, "No eligible providers for this request");
}

/**
 * Route entry — the full pipeline the /v1/chat/completions divert branch calls.
 *
 * Returns `null` ONLY when no self-hosted provider config is present at all
 * (caller continues with the normal cloud pipeline). When config exists but
 * failed to load/parse, returns a 500 error instead — a misconfigured entry
 * must never silently fall through to cloud routing.
 */
export async function handleSelfHostedCompletions(
  request: Request,
  body: Record<string, unknown> | null,
  options: SelfHostedOptions = {}
): Promise<Response | null> {
  const isConfigured = Boolean(
    options.providers ??
    options.providersFile ??
    process.env[CONFIG_ENV] ??
    process.env[CONFIG_FILE_ENV]
  );
  if (!isConfigured) return null;

  const runtime = await loadSelfHostedRuntime(options);
  if (!runtime) {
    const detail = failedConfigLoad ? ` (${failedConfigLoad})` : "";
    return buildErrorResponse(
      500,
      `Self-hosted provider config unavailable${detail}. Check ${CONFIG_ENV} or ${CONFIG_FILE_ENV}.`
    );
  }

  const apiKey = resolveSelfHostedApiKey(options);
  if (apiKey) {
    const authHeader = request.headers.get("authorization") ?? "";
    const expected = `Bearer ${apiKey}`;
    if (authHeader !== expected) {
      return errorResponse(401, "Invalid API key", { type: "authentication_error" });
    }
  }

  return completeViaSelfHostedRouter(options, request, body);
}
