/**
 * opencodeFreeTierContract.ts — the request contract OpenCode Zen's free tier enforces.
 *
 * Measured against the live endpoint on 2026-09-17, on three models and both the Chat
 * Completions and Responses surfaces: the upstream answers 403 FreeTierError unless the
 * request carries all four of
 *
 *   1. `stream: true` in the body,
 *   2. a non-empty `tools` array (the content is not inspected),
 *   3. a session header shaped `ses_` + 12 hex + 14 base62 (the shape is checked, the
 *      value is not — 12 arbitrary hex digits pass),
 *   4. a `User-Agent` carrying `opencode/<version>` with version >= 1.17 (an older
 *      version answers 426 UpgradeRequired rather than 403).
 *
 * Removing any single one of the four turns a 200 into a 403. Paid models on the same
 * host are not gated (a paid model without tools answers 401 CreditsError), which is why
 * `requiresFreeTierRequestContract` narrows the contract to free-tier models.
 *
 * The module also owns the free-model catalog — the catalog is what decides whether the
 * contract applies, so the two belong together and the executor imports them from here —
 * and the way back: the forced stream is rebuilt into a JSON body for a caller that asked
 * for JSON, reusing the shared event-stream parsers.
 */
import { parseSSEToOpenAIResponse, parseSSEToResponsesOutput } from "../handlers/sseParser.ts";
import {
  noteRefusedBorrowedToolNames,
  recordAcceptedToolNames,
  resolvePlaceholderNames,
} from "./opencodeToolObservation.ts";
import {
  forgetAttempt,
  planShape,
  recallAttempt,
  recordInjection,
  rememberAttempt,
  shapeKeyOf,
} from "./opencodeRequestShape.ts";

/**
 * What one gated request declared, kept until its outcome is known.
 *
 * `borrowed` means the placeholder came from the observation store rather than from the
 * caller or the configuration, which is the only case where a refusal says anything about
 * that store.
 */
export interface FreeTierContractAttempt {
  readonly provider: string;
  readonly model: string;
  readonly session: string | undefined;
  readonly borrowed: boolean;
  readonly clientToolNames: readonly string[];
  /** A refusal may still be replayed in the other shape: its outcome is noted afterwards. */
  readonly probe?: boolean;
}

/**
 * Models that work WITHOUT any API key on the free/noauth opencode tier.
 *
 * The upstream free tier rotates frequently — when a `-free` suffix model is
 * delisted upstream, the upstream returns "Model X is not supported" (a separate
 * issue from this gate). The set is defined by two data sources:
 *
 *   1. **Known free models** — models explicitly listed in the noauth
 *      `opencode` provider registry (`open-sse/config/providers/registry/opencode/index.ts`).
 *      These are the canonical free models. `deepseek-v4-flash-free` appears in both
 *      the noauth AND the zen registry (it is free on both tiers).
 *   2. **`-free` suffix** — any model whose id ends in `-free`. This automatically
 *      covers upstream free-tier additions without a code deploy.
 *
 * For `opencode-go`, there is no free tier — ALL models require an API key.
 */
const OPENCODE_FREE_MODELS = new Set([
  "big-pickle",
  "deepseek-v4-flash-free",
  "mimo-v2.5-free",
  "hy3-free",
  "nemotron-3-ultra-free",
  "north-mini-code-free",
]);

/**
 * Determine whether a model requires an API key on the given opencode provider.
 *
 * - `opencode-go`: ALL models require a key (no free tier).
 * - `opencode` / `opencode-zen`: premium = any model NOT in the free set (known
 *   free models OR ending in `-free`).
 * - Unknown models are assumed premium (fail-safe).
 */
export function isPremiumOpencodeModel(model: string, provider: string): boolean {
  // opencode-go has no free tier — every model requires a key.
  if (provider === "opencode-go") return true;

  // Models ending in `-free` are always free on the noauth/zen tier.
  if (model.endsWith("-free")) return false;

  // Check the known free model catalog.
  return !OPENCODE_FREE_MODELS.has(model);
}

/**
 * The upstream surface a request is served on, as told apart by the registry `baseUrl`.
 *
 * The gate is a property of the surface, not of billing: `/zen/v1` refuses a request that
 * carries no tools, while `/zen/go/v1` refuses one that carries any (upstream
 * anomalyco/opencode#44300 and #44382, "Endpoint is unavailable" for any request
 * containing tools). Passing the surface in keeps this module free of registry imports and
 * covers every entry of the family — including the `oc` alias, which resolves to
 * `opencode` before an executor is ever picked.
 */
export type OpencodeSurface = "zen" | "go" | "other";

const ZEN_SURFACE_BASE_URL = "https://opencode.ai/zen/v1";
const GO_SURFACE_BASE_URL = "https://opencode.ai/zen/go/v1";

/** Tell the surfaces apart by registry `baseUrl`, so provider ids and aliases stay out. */
export function surfaceFromBaseUrl(baseUrl: string | null | undefined): OpencodeSurface {
  if (baseUrl === ZEN_SURFACE_BASE_URL) return "zen";
  if (baseUrl === GO_SURFACE_BASE_URL) return "go";
  return "other";
}

/**
 * Operator opt-out for the body half of the contract.
 *
 * The headers stay in place either way: they are what the upstream validates by shape, and
 * they cost nothing. The body half is the half built on an observation of someone else's
 * service, so it is the half worth being able to switch off without waiting for a release.
 * Read per call, so a change takes effect immediately.
 */
function isBodyContractEnabled(): boolean {
  return (process.env.OPENCODE_FREE_TIER_REQUEST_CONTRACT || "").trim().toLowerCase() !== "off";
}

/**
 * Whether the upstream gates this request at all.
 *
 * Scope only — it ignores the opt-out on purpose, because the headers are applied either
 * way: they are what the upstream validates by shape, they cost nothing, and switching
 * them off with the body half would turn an opt-out into a second failure mode.
 */
export function isGatedFreeTierRequest(
  surface: OpencodeSurface,
  provider: string,
  model: string
): boolean {
  if (surface !== "zen") return false;
  return !isPremiumOpencodeModel(model, provider);
}

/** Whether the body half of the contract applies: gated, and not switched off. */
export function requiresFreeTierRequestContract(
  surface: OpencodeSurface,
  provider: string,
  model: string
): boolean {
  return isGatedFreeTierRequest(surface, provider, model) && isBodyContractEnabled();
}

/** The placeholder tool name the official client uses for the same purpose. */
const PLACEHOLDER_TOOL_NAME = "_noop";
export const DEFAULT_PLACEHOLDER_TOOL_NAME = PLACEHOLDER_TOOL_NAME;

/**
 * Operator-supplied placeholder tool names, comma-separated.
 *
 * The upstream inspects which names a request declares, and what it accepts differs by
 * model and moves over time (measured 2026-09-18: one made-up name is accepted on
 * `big-pickle` and refused on two other free models that had accepted it the day before).
 * That is an observation about someone else's service, not a fact about this project, so
 * it belongs in configuration rather than in a constant that needs a release to change.
 *
 * Empty or unset falls back to the built-in name, so an install that sets nothing keeps
 * the previous behaviour. Read per call, so a change takes effect immediately.
 */
export function configuredPlaceholderToolNames(): string[] {
  const raw = process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS || "";
  const kept: string[] = [];
  for (const part of raw.split(",")) {
    const name = part.trim();
    if (kept.length >= 32) break;
    if (!/^[A-Za-z_][A-Za-z0-9_-]{0,63}$/.test(name)) continue;
    if (!kept.includes(name)) kept.push(name);
  }
  return kept;
}
const PLACEHOLDER_TOOL_DESCRIPTION =
  "Do not call this tool. It exists only for API compatibility and must never be invoked.";
const PLACEHOLDER_TOOL_PARAMETERS = { type: "object", properties: {} } as const;

/**
 * An empty `tools` array counts as no tools: it is the exact shape the upstream refuses
 * (upstream anomalyco/opencode#49433 reports it from the client's own compaction path),
 * so it has to be filled like an absent one rather than passed through.
 */
function hasTools(body: Record<string, unknown>): boolean {
  return Array.isArray(body.tools) && body.tools.length > 0;
}

/**
 * Bring a free-tier request up to the upstream contract, without overriding anything the
 * caller already decided: client tools are kept as they are, and the placeholder tool is
 * only added when the caller sent none. Idempotent.
 *
 * The placeholder differs per surface: Chat Completions takes the nested function shape,
 * the Responses surface takes the flat one. Neither carries a `tool_choice` — the upstream
 * rejects any value but "auto" (measured 2026-09-18: 400 invalid_request_error, `only
 * "auto" is supported for tool_choice`), so a `tool_choice` the caller did not send is
 * never added, and one the caller did send travels unchanged. Any other body format only
 * gets the streaming flag: injecting a tool shape blind would be a guess.
 *
 * Which names go in is resolved by `resolvePlaceholderNames`, because the upstream does
 * inspect them.
 */
export function applyFreeTierRequestContract<T>(
  body: T,
  requestFormat: string | null,
  placeholderNames: readonly string[] = [PLACEHOLDER_TOOL_NAME]
): T {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;
  const record = body as Record<string, unknown>;
  const next: Record<string, unknown> = { ...record, stream: true };

  if (hasTools(next)) return next as T;

  const names = placeholderNames.length > 0 ? placeholderNames : [PLACEHOLDER_TOOL_NAME];

  if (requestFormat === "openai-responses") {
    next.tools = names.map((name) => ({
      type: "function",
      name,
      description: PLACEHOLDER_TOOL_DESCRIPTION,
      parameters: PLACEHOLDER_TOOL_PARAMETERS,
    }));
    return next as T;
  }

  if (requestFormat === "openai" || requestFormat === null) {
    next.tools = names.map((name) => ({
      type: "function",
      function: {
        name,
        description: PLACEHOLDER_TOOL_DESCRIPTION,
        parameters: PLACEHOLDER_TOOL_PARAMETERS,
      },
    }));
    return next as T;
  }

  return next as T;
}

function clientToolNamesOf(body: unknown): string[] {
  if (!body || typeof body !== "object" || Array.isArray(body)) return [];
  const tools = (body as Record<string, unknown>).tools;
  if (!Array.isArray(tools)) return [];
  const names: string[] = [];
  for (const tool of tools) {
    if (!tool || typeof tool !== "object") continue;
    const entry = tool as { name?: unknown; function?: { name?: unknown } };
    const name = typeof entry.name === "string" ? entry.name : entry.function?.name;
    if (typeof name === "string") names.push(name);
  }
  return names;
}

/**
 * Bring one request up to the contract and report what it ended up declaring.
 *
 * Single entry point for the executor: it decides whether the contract applies to this
 * surface and model, resolves the placeholder names, applies the body changes, and hands
 * back the attempt so the outcome can be fed to `noteFreeTierOutcome`.
 */
/**
 * The attempt of the request being served, found by the identity of the body the executor was
 * handed. It cannot live on the executor: that instance is shared, and two requests in flight
 * would read each other's attempt when they finish. It is released when the request is over.
 */
export function attemptFor(origin: unknown): FreeTierContractAttempt | null {
  return recallAttempt<FreeTierContractAttempt>(origin);
}

function isTrackable(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}

export function prepareFreeTierRequest<T>(
  body: T,
  requestFormat: string | null,
  surface: OpencodeSurface,
  provider: string,
  model: string,
  session?: string,
  origin?: object
): { body: T; attempt: FreeTierContractAttempt | null } {
  const clientToolNames = clientToolNamesOf(body);
  if (!requiresFreeTierRequestContract(surface, provider, model)) {
    if (isTrackable(origin)) forgetAttempt(origin);
    return { body, attempt: null };
  }
  const eligible = isTrackable(origin) && clientToolNames.length === 0;
  const key = eligible ? shapeKeyOf(provider, model, body) : "";
  const plan =
    isTrackable(origin) && eligible
      ? planShape(origin, key)
      : { shape: "tools" as const, probe: false };
  const chosen = plan.shape;
  const names = resolvePlaceholderNames(provider, model, session, configuredPlaceholderToolNames());
  const borrowed = clientToolNames.length === 0 && names.length > 0 && chosen === "tools";
  const attempt: FreeTierContractAttempt = {
    provider,
    model,
    session,
    borrowed,
    clientToolNames,
    probe: plan.probe,
  };
  if (isTrackable(origin)) rememberAttempt(origin, attempt);
  if (isTrackable(origin) && eligible) {
    recordInjection(origin, {
      shape: chosen,
      key,
      probe: plan.probe,
      replayNote: () => noteFreeTierOutcome({ ...attempt, probe: false }, false),
    });
  }
  return {
    body:
      chosen === "bare"
        ? withStreaming(body)
        : applyFreeTierRequestContract(body, requestFormat, names),
    attempt,
  };
}

function withStreaming<T>(body: T): T {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;
  return { ...(body as Record<string, unknown>), stream: true } as T;
}

/**
 * Feed a gated request's outcome back, so the next one borrows a shape that still works.
 *
 * An accepted request teaches which names the upstream takes right now; a refused one only
 * teaches something when the names it carried came from the store.
 */
export function noteFreeTierOutcome(attempt: FreeTierContractAttempt | null, ok: boolean): void {
  if (!attempt) return;
  if (ok) {
    if (attempt.clientToolNames.length > 0) {
      recordAcceptedToolNames(
        attempt.provider,
        attempt.model,
        attempt.session,
        attempt.clientToolNames
      );
    }
    return;
  }
  if (attempt.probe) return;
  if (attempt.borrowed) {
    noteRefusedBorrowedToolNames(attempt.provider, attempt.model, attempt.session);
  }
}

/**
 * Rebuild a JSON body from the event stream the contract forced.
 *
 * The contract makes the upstream request streamed even when the caller asked for JSON, so
 * the conversion back has to happen here rather than in one caller: `handleChatCore` knows
 * how to buffer an event stream, but the other executor consumers (the compression judge,
 * token counting) call `execute()` and then read `response.json()`. Handing them the raw
 * event stream would throw on a request they explicitly asked not to stream.
 *
 * The conversion is LAZY: the returned body drains and parses the upstream only when the
 * caller reads it, so the executor never blocks on a stream that has not arrived yet — the
 * caller's own read timeout governs, and a caller that cancels pays nothing. Only a
 * successful event-stream response is converted; a streaming caller, a refusal and an
 * already-JSON body pass through untouched.
 */
export function rebuildJsonFromForcedStream(
  response: Response,
  requestFormat: string | null,
  model: string
): Response {
  if (!response.ok || !response.body) return response;
  if (!(response.headers.get("content-type") || "").includes("text/event-stream")) {
    return response;
  }
  const upstream = response;
  let drained = false;
  const body = new ReadableStream<Uint8Array>(
    {
      async pull(controller) {
        if (drained) {
          controller.close();
          return;
        }
        drained = true;
        try {
          const rawSse = await upstream.text();
          const parsed =
            requestFormat === "openai-responses"
              ? parseSSEToResponsesOutput(rawSse, model)
              : parseSSEToOpenAIResponse(rawSse, model);
          const out = parsed && typeof parsed === "object" ? JSON.stringify(parsed) : rawSse;
          controller.enqueue(new TextEncoder().encode(out));
        } catch (err) {
          controller.error(err);
          return;
        }
        controller.close();
      },
      cancel(reason) {
        // Only when nothing started draining: once `text()` holds the reader, cancelling the
        // upstream body directly throws "ReadableStream is locked".
        if (!drained && !upstream.bodyUsed && upstream.body && !upstream.body.locked) {
          void upstream.body.cancel(reason);
        }
      },
    },
    // No pull before the caller reads: a caller that never reads (or cancels) must not make
    // the executor wait on an upstream stream that may never arrive.
    { highWaterMark: 0 }
  );
  const headers = new Headers(response.headers);
  headers.set("content-type", "application/json");
  headers.delete("content-length");
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
