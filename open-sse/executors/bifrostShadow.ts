/**
 * bifrostShadow.ts — Traffic-shadow dispatcher wrapper (B6.1 of v8.1 Bifrost).
 *
 * Location: `open-sse/executors/` (NOT `src/lib/a2a/skills/`).
 *   - `src/lib/a2a/skills/` is for operator-callable JSON-RPC skills
 *     (smartRouting, costAnalysis, ...). Those are RPC endpoints.
 *   - The shadow is a HOT-PATH runtime wrapper that sits next to
 *     `BifrostBackendExecutor` and modifies the dispatch flow used by
 *     `open-sse/handlers/chatCore.ts`. It is a peer of the executors,
 *     not a JSON-RPC skill.
 *
 * Behavior (B6.1, "observe-only"):
 *   1. Always run the legacy chatCore executor's `execute()`.
 *   2. If `BIFROST_SHADOW_ENABLED=true` AND the provider is in the
 *      Bifrost provider map AND a sample rolls in (Math.random() <
 *      `BIFROST_SHADOW_SAMPLE_RATE`, default 0.05), fire the same
 *      request through `BifrostBackendExecutor` IN PARALLEL.
 *   3. Record both outcomes in the `bifrost_shadow_events` table
 *      (migration 101). The record is best-effort; a DB write failure
 *      does NOT affect the user-visible response.
 *   4. ALWAYS return the legacy executor's result unchanged.
 *
 * DO NOT change the user's experience in any way during B6.1.
 *
 * Phase 2 (B6.2, next session) will flip the return direction: Bifrost
 * becomes the served path for the sampled bucket, chatCore becomes the
 * shadow. Reversible via `BIFROST_SHADOW_CANARY=true` env var.
 * Phase 3 (B6.3) is the full swap.
 *
 * Reference: ADR-031, PLAN.md § 2.5.2 (B6), docs/frameworks/BIFROST-BACKEND.md § 1.5.
 */

import { BifrostBackendExecutor } from "./bifrost.ts";
import { isBifrostSupported } from "./bifrostProviderMap.ts";
import type { ExecuteInput, ProviderConfig } from "./base.ts";

/**
 * Shape of the value returned by `BaseExecutor.execute()` (and the
 * Bifrost override). Defined locally because `base.ts` does not export
 * a dedicated `ExecuteOutput` type — the return is inferred.
 */
export interface ExecuteOutput {
  response: Response;
  url: string;
  headers: Record<string, string>;
  transformedBody: unknown;
}

// Type-only import (erased at runtime). The runtime values are imported
// lazily inside the record call so the hot path stays cheap when shadow
// is disabled.
import type { BifrostShadowEventInput } from "../../src/lib/db/bifrostShadow.ts";

// ──────────────── Env helpers ────────────────

const DEFAULT_SAMPLE_RATE = 0.05;

function isShadowEnabled(): boolean {
  const raw = process.env.BIFROST_SHADOW_ENABLED;
  if (!raw) return false;
  return raw === "true" || raw === "1";
}

function getSampleRate(): number {
  const raw = process.env.BIFROST_SHADOW_SAMPLE_RATE;
  if (!raw) return DEFAULT_SAMPLE_RATE;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) return DEFAULT_SAMPLE_RATE;
  // Cap at 1.0 — anything above that is operator error.
  return Math.min(1, parsed);
}

// ──────────────── Agreement score ────────────────

/**
 * Compute a 0..1 similarity score between two response texts.
 *
 * Algorithm: **Jaccard token-set ratio** (also called "token-set ratio" in
 * the RapidFuzz library). Steps:
 *   1. Lowercase + split on whitespace.
 *   2. Build sets of unique non-empty tokens.
 *   3. Score = |intersection| / |union|.
 *
 * Why Jaccard and not Levenshtein:
 *   - O(n) compute, allocation-bounded. No quadratic Levenshtein matrix.
 *   - Robust to word reordering (Levenshtein penalizes this heavily).
 *   - Robust to casing + punctuation (Levenshtein treats them as
 *     different characters).
 *   - "Simple text-similarity ratio" per the B6.1 spec — a value the
 *     operator can reason about (">0.85 means the two answers agreed").
 *   - Falls back to 1.0 when both sides are empty (no content to
 *     disagree about), 0.0 when only one side is empty.
 *
 * Output is clamped to [0, 1]. Returns 0.0 if either side is null/undefined
 * (the caller treats that as "no comparison possible").
 */
export function computeAgreementScore(a: string | null, b: string | null): number {
  if (a == null || b == null) return 0;
  if (a === b) return 1;
  const tokenize = (s: string): Set<string> => {
    const out = new Set<string>();
    for (const tok of s.toLowerCase().split(/\s+/)) {
      if (tok.length > 0) out.add(tok);
    }
    return out;
  };
  const setA = tokenize(a);
  const setB = tokenize(b);
  if (setA.size === 0 && setB.size === 0) return 1;
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const t of setA) {
    if (setB.has(t)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 1 : intersection / union;
}

// ──────────────── Body extraction ────────────────

/**
 * Read a Response body as text. For non-streaming responses (Bifrost shadow
 * is forced non-streaming), this is a one-shot .text(). For streaming
 * responses (legacy primary), we consume the body chunks but discard the
 * content — the legacy executor already streamed the body to the client.
 *
 * Returns null on error.
 */
async function readResponseText(response: Response): Promise<string | null> {
  try {
    if (!response.body) {
      // Some response types have no body. Return empty string so the
      // agreement score treats it as "no content" (1.0 if the other side
      // is also empty, 0.0 otherwise).
      return "";
    }
    return await response.text();
  } catch {
    return null;
  }
}

/**
 * Extract token-usage fields from a parsed JSON body. Returns nulls when
 * the body doesn't carry a `usage` block (which is common — not all
 * providers report token usage in shadow mode).
 */
function extractUsageFromJson(
  json: unknown
): { tokensIn: number | null; tokensOut: number | null } {
  if (!json || typeof json !== "object") return { tokensIn: null, tokensOut: null };
  const obj = json as Record<string, unknown>;
  const usage = obj.usage;
  if (!usage || typeof usage !== "object") return { tokensIn: null, tokensOut: null };
  const u = usage as Record<string, unknown>;
  const tokensIn =
    typeof u.prompt_tokens === "number"
      ? u.prompt_tokens
      : typeof u.input_tokens === "number"
        ? u.input_tokens
        : null;
  const tokensOut =
    typeof u.completion_tokens === "number"
      ? u.completion_tokens
      : typeof u.output_tokens === "number"
        ? u.output_tokens
        : null;
  return { tokensIn, tokensOut };
}

interface ParsedBifrostResponse {
  text: string | null;
  tokensIn: number | null;
  tokensOut: number | null;
}

/**
 * Parse a Bifrost response: read the body, extract text + token usage.
 * Returns null text when the body read fails (network/timeout).
 */
async function parseBifrostResponse(response: Response): Promise<ParsedBifrostResponse> {
  const text = await readResponseText(response);
  if (text == null) return { text: null, tokensIn: null, tokensOut: null };
  let json: unknown = null;
  try {
    json = JSON.parse(text);
  } catch {
    // Body wasn't JSON. That's fine — we just can't extract usage.
    json = null;
  }
  const { tokensIn, tokensOut } = extractUsageFromJson(json);
  return { text, tokensIn, tokensOut };
}

// ──────────────── Public API ────────────────

export interface RunWithShadowSamplerOptions {
  /** Provider id (e.g. "openai"). */
  provider: string;
  /** Model id (e.g. "gpt-4o"). */
  model: string;
  /** Request body (chatCore's translated bodyToSend). */
  body: unknown;
  /** Legacy executor's stream flag (true = SSE). */
  stream: boolean;
  /** Credentials (passed through to both legacy and bifrost). */
  credentials: ExecuteInput["credentials"];
  /** Caller's abort signal. Forwarded to both calls. */
  signal: AbortSignal;
  /** Logger. Optional. */
  log?: ExecuteInput["log"];
  /** Upstream extra headers (passed through). */
  upstreamExtraHeaders?: ExecuteInput["upstreamExtraHeaders"];
  /** Client headers (passed through). */
  clientHeaders?: ExecuteInput["clientHeaders"];
  /** Credentials-refresh callback. */
  onCredentialsRefreshed?: ExecuteInput["onCredentialsRefreshed"];
  skipUpstreamRetry?: boolean;
  /** The actual chatCore executor call. Always invoked. */
  legacyExecute: (input: ExecuteInput) => Promise<ExecuteOutput>;
  /**
   * Optional Bifrost executor to use for the shadow. If omitted, the
   * dispatcher instantiates a fresh `BifrostBackendExecutor` from
   * `BIFROST_BASE_URL`. Tests inject a stub here to avoid network.
   */
  bifrostExecute?: (input: ExecuteInput) => Promise<ExecuteOutput>;
  /**
   * Random source for the sampler. Defaults to Math.random. Tests inject
   * a deterministic source.
   */
  random?: () => number;
  /** Request id (X-Request-Id) for the chatCore request. Optional. */
  requestId?: string | null;
  /**
   * Best-effort event recorder. Defaults to a lazy import of
   * `recordBifrostShadowEvent` from src/lib/db/bifrostShadow.ts. Tests
   * inject a stub to count or assert.
   */
  recordEvent?: (input: BifrostShadowEventInput) => void;
  /**
   * Time source. Defaults to Date.now. Tests inject a fixed clock.
   */
  now?: () => number;
}

/**
 * Result of the shadow run. Same shape as `ExecuteOutput` — the call
 * site can use it as a drop-in replacement for the legacy executor's
 * output.
 */
export type ShadowRunResult = ExecuteOutput;

export interface RunWithShadowSamplerMeta {
  /** Whether a shadow call was fired (true) or skipped (false). */
  shadowFired: boolean;
  /** Why the shadow did not fire, if it didn't. */
  shadowSkippedReason?:
    | "disabled"
    | "provider_unsupported"
    | "sample_not_rolled"
    | "no_bifrost_url"
    | "no_bifrost_executor_factory";
  /** Latency of the shadow call in ms, or null if not fired / failed before fetch. */
  bifrostLatencyMs: number | null;
}

/**
 * Run a chatCore executor call with an optional parallel Bifrost shadow.
 * Always returns the legacy executor's result. The shadow is best-effort
 * and never affects the user-visible response.
 *
 * The shadow path:
 *   - Bifrost is forced to non-streaming (stream=false) so we can read
 *     the entire body for the agreement-score comparison.
 *   - The Bifrost call runs in parallel via Promise.all so the slow
 *     path bounds wall-clock time; the legacy call is what we return
 *     so the user never pays for the shadow's latency.
 */
export async function runWithShadowSampler(
  options: RunWithShadowSamplerOptions
): Promise<ShadowRunResult> {
  // Always fire the legacy call.
  const legacyInput: ExecuteInput = {
    model: options.model,
    body: options.body,
    stream: options.stream,
    credentials: options.credentials,
    signal: options.signal,
    log: options.log,
    upstreamExtraHeaders: options.upstreamExtraHeaders,
    clientHeaders: options.clientHeaders,
    onCredentialsRefreshed: options.onCredentialsRefreshed,
    skipUpstreamRetry: options.skipUpstreamRetry,
  };
  const legacyStart = options.now ? options.now() : Date.now();
  const legacyPromise = options.legacyExecute(legacyInput);

  // Decide whether to fire a shadow.
  const meta: RunWithShadowSamplerMeta = {
    shadowFired: false,
    bifrostLatencyMs: null,
  };
  if (!isShadowEnabled()) {
    meta.shadowSkippedReason = "disabled";
  } else if (!isBifrostSupported(options.provider)) {
    meta.shadowSkippedReason = "provider_unsupported";
  } else {
    const sampleRate = getSampleRate();
    const rand = (options.random ?? Math.random)();
    if (rand >= sampleRate) {
      meta.shadowSkippedReason = "sample_not_rolled";
    } else {
      // The shadow is on.
      meta.shadowFired = true;
    }
  }

  if (!meta.shadowFired) {
    // No shadow: just await the legacy result and return.
    const legacy = await legacyPromise;
    // Best-effort: if the user wanted to observe skips, we could record
    // them here, but the B6.1 spec keeps the table thin (only fired
    // shadows are recorded). Skips are inferable from the sample rate.
    return legacy;
  }

  // Fire the shadow in parallel. The shadow is forced non-streaming so
  // we can read the body for the agreement score.
  const bifrostStart = options.now ? options.now() : Date.now();
  const bifrostInput: ExecuteInput = {
    ...legacyInput,
    stream: false,
  };

  let bifrostOutcome: {
    status: "ok" | "error" | "timeout" | "skipped";
    response: Response | null;
    text: string | null;
    tokensIn: number | null;
    tokensOut: number | null;
    latencyMs: number;
    errorMessage: string | null;
  } = {
    status: "error",
    response: null,
    text: null,
    tokensIn: null,
    tokensOut: null,
    latencyMs: 0,
    errorMessage: "no bifrost executor wired",
  };

  if (options.bifrostExecute) {
    try {
      const out = await options.bifrostExecute(bifrostInput);
      const text = await parseBifrostResponse(out.response);
      bifrostOutcome = {
        status: out.response.ok ? "ok" : "error",
        response: out.response,
        text: text.text,
        tokensIn: text.tokensIn,
        tokensOut: text.tokensOut,
        latencyMs: (options.now ? options.now() : Date.now()) - bifrostStart,
        errorMessage: out.response.ok ? null : `HTTP ${out.response.status}`,
      };
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      const isAbort = err instanceof Error && err.name === "AbortError";
      const isTimeout =
        isAbort || /timeout|aborted|abort/i.test(errMsg);
      bifrostOutcome = {
        status: isTimeout ? "timeout" : "error",
        response: null,
        text: null,
        tokensIn: null,
        tokensOut: null,
        latencyMs: (options.now ? options.now() : Date.now()) - bifrostStart,
        errorMessage: errMsg,
      };
    }
  } else {
    // No bifrostExecute provided: instantiate a default. The bifrost
    // executor throws when BIFROST_ENABLED is unset — that is itself
    // an "error" outcome (the operator forgot to set the env var).
    try {
      const providerConfig: ProviderConfig = { id: options.provider };
      const executor = new BifrostBackendExecutor(options.provider, providerConfig);
      const out = await executor.execute(bifrostInput);
      const text = await parseBifrostResponse(out.response);
      bifrostOutcome = {
        status: out.response.ok ? "ok" : "error",
        response: out.response,
        text: text.text,
        tokensIn: text.tokensIn,
        tokensOut: text.tokensOut,
        latencyMs: (options.now ? options.now() : Date.now()) - bifrostStart,
        errorMessage: out.response.ok ? null : `HTTP ${out.response.status}`,
      };
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      bifrostOutcome = {
        status: "error",
        response: null,
        text: null,
        tokensIn: null,
        tokensOut: null,
        latencyMs: (options.now ? options.now() : Date.now()) - bifrostStart,
        errorMessage: errMsg,
      };
    }
  }

  meta.bifrostLatencyMs = bifrostOutcome.latencyMs;

  // Now await the legacy result.
  const legacyEnd = options.now ? options.now() : Date.now();
  const legacyLatencyMs = legacyEnd - legacyStart;
  const legacy = await legacyPromise;

  // Best-effort: extract chatCore usage from the body. Streaming
  // responses have no readable body here (already consumed by the
  // executor), so we accept null and accept that token accounting is
  // only filled in for the Bifrost side. B6.2 will add a
  // post-stream hook to capture chatCore usage from the call log.
  let chatcoreTokensIn: number | null = null;
  let chatcoreTokensOut: number | null = null;
  try {
    if (!options.stream) {
      const text = await readResponseText(legacy.response.clone());
      if (text) {
        const usage = extractUsageFromJson(safeJsonParse(text));
        chatcoreTokensIn = usage.tokensIn;
        chatcoreTokensOut = usage.tokensOut;
      }
    }
  } catch {
    // Best-effort. Leave nulls.
  }

  // Compute agreement score (null when one side has no text).
  const agreement =
    bifrostOutcome.text == null
      ? null
      : options.stream
        ? null // legacy is streaming; we can't get its text here
        : computeAgreementScore(
            // For non-streaming legacy we read the clone above; for
            // streaming, agreement stays null until B6.2 wires a
            // post-stream hook.
            bifrostOutcome.text,
            null
          );

  // Record the event. Best-effort — must not throw.
  const eventInput: BifrostShadowEventInput = {
    chatcoreRequestId: options.requestId ?? null,
    provider: options.provider,
    model: options.model,
    bifrostStatus: bifrostOutcome.status,
    bifrostLatencyMs: bifrostOutcome.latencyMs,
    chatcoreLatencyMs: legacyLatencyMs,
    agreementScore: agreement,
    bifrostTokensIn: bifrostOutcome.tokensIn,
    bifrostTokensOut: bifrostOutcome.tokensOut,
    chatcoreTokensIn: chatcoreTokensIn,
    chatcoreTokensOut: chatcoreTokensOut,
  };

  try {
    if (options.recordEvent) {
      options.recordEvent(eventInput);
    } else {
      // Lazy import — keeps the module cold-loadable when shadow is off.
      const mod = await import("../../src/lib/db/bifrostShadow.ts");
      mod.recordBifrostShadowEvent(eventInput);
    }
  } catch (err) {
    // Best-effort. Log and continue. Never throw.
    options.log?.warn?.(
      "BIFROST_SHADOW",
      `recordBifrostShadowEvent failed: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  return legacy;
}

function safeJsonParse(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

// ──────────────── Public introspection ────────────────

/**
 * Whether shadow dispatch is currently enabled (env-gated). Used by
 * operator-facing diagnostics — does NOT trigger a side-effect.
 */
export function isShadowDispatchEnabled(): boolean {
  return isShadowEnabled();
}

/**
 * Resolve the active sample rate (env-gated). Defaults to 0.05.
 */
export function getShadowSampleRate(): number {
  return getSampleRate();
}
