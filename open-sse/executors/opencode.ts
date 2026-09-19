import {
  BaseExecutor,
  type ExecuteInput,
  type ExecutorExecuteResult,
  type ProviderCredentials,
} from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { getModelTargetFormat, PROVIDER_ID_TO_ALIAS } from "../config/providerModels.ts";
import {
  injectReasoningContentForThinkingModel,
  isThinkingMessageModel,
} from "../utils/reasoningContentInjector.ts";
import {
  hasAmbientProxyContext,
  runWithDirectFetchContext,
  runWithProxyContext,
} from "../utils/proxyFetch.ts";
import {
  clientSuppliedOpencodeSession,
  forwardOpencodeClientHeaders,
  resolveOpencodeCliDefaults,
} from "../utils/opencodeHeaders.ts";
import {
  type AccountProxyConfig,
  type RotatableAccount,
  pickAccount as pickRotatableAccount,
  maskAccountId,
  isNetworkErrorRotatable,
  isEmptyUpstreamRejection,
  extractChatcmplId,
} from "./accountRotation.ts";
import { markCooldown, markOutcome, noteResponseServed } from "./opencodeAccountHealth.ts";
import {
  isOpencodeFreeTierRefusal,
  isOpencodeGeoBlocked,
  proxyKeyOf,
  isOpencodeUserBlocked,
} from "./opencodeGeoBlock.ts";
import {
  isGatedFreeTierRequest,
  isPremiumOpencodeModel,
  noteFreeTierOutcome,
  prepareFreeTierRequest,
  rebuildJsonFromForcedStream,
  surfaceFromBaseUrl,
  type FreeTierContractAttempt,
} from "./opencodeFreeTierContract.ts";

// Re-exported: the free-model catalog moved to the contract module (it decides whether the
// contract applies), and existing importers keep resolving it from the executor.
export { isPremiumOpencodeModel };
import {
  guardResponsesStall,
  isResponsesFirstByteTimeout,
  resolveResponsesStallWindowMs,
} from "./opencodeResponsesStall.ts";
import { discardResponseBody } from "./opencodeResponseBody.ts";
import {
  isRetriableUpstreamFailure,
  releaseResponseBody,
  sleepAbortable,
  transientRetryDelayMs,
} from "./opencodeTransientFailure.ts";
import { isProxyAvoided, proxyEgressKey } from "../utils/proxyRefusalMemory.ts";
import * as egressPacing from "./opencodeEgressThrottle.ts";
import {
  isNetworkRotationSharedEgressGuardEnabled,
  isProxySkipRecentlyFailedEnabled,
  isOpencodeUserBlockedRotationEnabled,
  isOpencodeTransientFailoverBackoffEnabled,
  isOpencodeRateLimited429EarlyStopEnabled,
} from "@/shared/utils/featureFlags";

/**
 * The main OpenCode Zen host, shared by the `opencode` and `opencode-zen`
 * registry entries. Used to scope the `x-api-key` auth override (#12633) away
 * from `opencode-go`, which serves a different upstream (`.../zen/go/v1`).
 */
const ZEN_BASE_URL = "https://opencode.ai/zen/v1";

/**
 * Per-account proxy configuration, persisted by NoAuthAccountCard under
 * `providerSpecificData.accountProxies` (keyed by the account id, which the UI
 * stores in `providerSpecificData.fingerprints`). Same shape mimocode uses.
 */
export type OpencodeAccountProxyConfig = AccountProxyConfig;

/** Runtime rotation/cooldown state for one "OpenCode Free" account. */
interface OpencodeAccountState extends RotatableAccount {
  /** Account id (UI: providerSpecificData.fingerprints[i]); "" for the default direct account. */
  fingerprint: string;
}

const EFFORT_LEVELS = ["none", "low", "high", "max"] as const;

/**
 * Models on opencode-go that support effort-tier aliases. Each entry maps the
 * canonical base id to the set of effort suffixes the upstream supports.
 *
 * - DeepSeek V4 Pro and Flash: none/low/high/max
 * - glm-5.2: high/max only (Z.AI maps these through the reasoning plane;
 *   low/medium are not supported on the OpenAI transport)
 * - mimo-v2.5: high/max only (same reasoning; Xiaomi MiMo does not document
 *   low/medium effort tiers)
 * - #8353 OpenCode Go registry effort variants (exact suffix sets from
 *   `opencode models opencode-go --verbose`; MiniMax M3 excluded — different
 *   thinking-mode mapping):
 *   grok-4.5 low/medium/high; hy3 none/low/high; kimi-k3 max;
 *   qwen3.6-plus / qwen3.7-max / qwen3.7-plus high/max;
 *   muse-spark-1.2-contributor minimal/low/medium/high/xhigh (no max)
 * - #12674 Muse Spark 1.3 Contributor: minimal/low/medium/high/xhigh (no max),
 *   verified via `opencode models opencode-go --refresh --verbose`
 */
const EFFORT_TIERS: Record<string, readonly string[]> = {
  "deepseek-v4-pro": EFFORT_LEVELS,
  "deepseek-v4-flash": EFFORT_LEVELS,
  "glm-5.2": ["high", "max"],
  "mimo-v2.5": ["high", "max"],
  "grok-4.5": ["low", "medium", "high"],
  hy3: ["none", "low", "high"],
  "kimi-k3": ["max"],
  "qwen3.6-plus": ["high", "max"],
  "qwen3.7-max": ["high", "max"],
  "qwen3.7-plus": ["high", "max"],
  "muse-spark-1.2-contributor": ["minimal", "low", "medium", "high", "xhigh"],
  "muse-spark-1.3-contributor": ["minimal", "low", "medium", "high", "xhigh"],
};

/**
 * Parse a model string with an effort-level suffix.
 * e.g. "deepseek-v4-pro-low" → { baseModel: "deepseek-v4-pro", effort: "low" }
 *      "glm-5.2-high"         → { baseModel: "glm-5.2", effort: "high" }
 * Returns null if the model doesn't match any known effort-tier pattern.
 */
export function parseEffortLevel(model: string): { baseModel: string; effort: string } | null {
  const m = String(model || "");
  for (const [baseModel, levels] of Object.entries(EFFORT_TIERS)) {
    for (const level of levels) {
      if (m === `${baseModel}-${level}`) {
        return { baseModel, effort: level };
      }
    }
  }
  return null;
}

/**
 * Resolves the registry `targetFormat` for a model, aliasing `provider` first.
 *
 * `PROVIDER_MODELS` is keyed by the provider's public ALIAS (e.g. `"oc"`), not its
 * raw registry id (e.g. `"opencode"`) — mirrors `resolveChatCoreTargetFormat()`
 * (`handlers/chatCore/targetFormat.ts`), which already aliases before calling
 * `getModelTargetFormat()`. Calling it with the raw id here made every entry miss
 * silently (fell through to `"openai"`), while chatCore's own request-body
 * translation (correctly aliased) still switched to the Responses API shape for
 * `targetFormat:"openai-responses"` models — sending a Responses-shaped body to
 * the `/chat/completions` URL this executor's own `buildUrl()` kept selecting.
 * Exported for testability.
 */
export function resolveOpencodeTargetFormat(provider: string, model: string): string {
  const alias = PROVIDER_ID_TO_ALIAS[provider] || provider;
  return getModelTargetFormat(alias, model) || "openai";
}

/**
 * muse-spark (opencode-go) burns its entire output budget on invisible
 * server-side reasoning before emitting any content. With small caller-set
 * budgets the upstream answers HTTP 200 with an empty message
 * (`{"message":{"role":"assistant"},"finish_reason":null}` and
 * `completion_tokens == max_tokens`) — chatCore then flags the fake success as
 * "Provider returned empty content" / 502 and burns a fallback attempt.
 *
 * Verified live 2026-08-23: max_tokens=64/100 → empty content;
 * 256/512/1024 → content present (hidden reasoning consumed 196–253 of it).
 *
 * Floor raised budgets only — explicit large budgets and non-muse-spark models
 * are untouched, and no budget is synthesized when the caller set none.
 */
export const MUSE_SPARK_MIN_OUTPUT_TOKENS = 512;

export function applyMuseSparkMinOutputTokens(model: string, body: Record<string, unknown>): void {
  if (!model.startsWith("muse-spark")) return;
  const current = body.max_tokens;
  if (typeof current !== "number" || !Number.isFinite(current)) return;
  if (current >= MUSE_SPARK_MIN_OUTPUT_TOKENS) return;
  body.max_tokens = MUSE_SPARK_MIN_OUTPUT_TOKENS;
}

/**
 * muse-spark's gateway reports `finish_reason:"length"` whenever its hidden
 * reasoning consumed part of the output budget — even when the visible
 * completion is tiny relative to the requested budget (observed: ~270
 * completion tokens on a 128000-token request). OpenAI-protocol clients map a
 * "length" stop onto the caller's own max-tokens cap, so Claude Code aborts a
 * fully-delivered answer with "response exceeded the 128000 output token
 * maximum".
 *
 * Rewrite `length` → `stop` when the reported completion count proves the real
 * token limit was never reached (<90% of the caller's budget). Genuine
 * truncations at the budget are preserved. Streaming frames carry usage before
 * the terminal finish frame, so the completion count is known in time.
 */
export function normalizeMuseSparkFinishReason(
  payload: Record<string, unknown>,
  requestedBudget: number | null,
  /** Streaming: usage arrives in an earlier frame than the finish frame — caller passes the tracked count here. */
  completionOverride?: number | null
): void {
  const choices = Array.isArray(payload.choices) ? payload.choices : [];
  for (const choice of choices) {
    if (!choice || typeof choice !== "object") continue;
    const record = choice as Record<string, unknown>;
    if (record.finish_reason !== "length") continue;
    if (requestedBudget === null || requestedBudget === undefined) continue;
    const usage = payload.usage as Record<string, unknown> | undefined;
    const completion =
      typeof completionOverride === "number"
        ? completionOverride
        : typeof usage?.completion_tokens === "number"
          ? usage.completion_tokens
          : null;
    if (completion === null) continue;
    if (completion < Math.floor(requestedBudget * 0.9)) {
      record.finish_reason = "stop";
    }
  }
}

/** SSE line normalizer for muse-spark streams: tracks usage, rewrites finish frames. */
export function createMuseSparkStreamFinishNormalizer(
  requestedBudget: number | null
): (dataLine: string) => string {
  let completionTokens: number | null = null;
  return (line: string): string => {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:") || trimmed.includes("[DONE]")) return line;
    let parsed: unknown;
    try {
      parsed = JSON.parse(trimmed.slice(5).trim());
    } catch {
      return line;
    }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return line;
    const payload = parsed as Record<string, unknown>;
    const usage = payload.usage as Record<string, unknown> | undefined;
    if (usage && typeof usage.completion_tokens === "number") {
      completionTokens = usage.completion_tokens;
    }
    const hadFinish = Array.isArray(payload.choices)
      ? (payload.choices as Array<Record<string, unknown>>).some(
          (c) => c && c.finish_reason === "length"
        )
      : false;
    if (!hadFinish) return line;
    normalizeMuseSparkFinishReason(payload, requestedBudget, completionTokens);
    return `data: ${JSON.stringify(payload)}`;
  };
}

function isResponsesTerminalLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.startsWith("data:")) return false;
  try {
    const payload = JSON.parse(trimmed.slice(5).trim()) as Record<string, unknown>;
    return payload.type === "response.completed";
  } catch {
    return false;
  }
}

export class OpencodeExecutor extends BaseExecutor {
  /** Delegates to `isPremiumOpencodeModel`. Exported for testability. */
  static isPremiumModel(model: string, provider: string): boolean {
    return isPremiumOpencodeModel(model, provider);
  }

  _requestFormat: string | null = null;
  private _contractAttempt: FreeTierContractAttempt | null = null;
  /** Set in buildHeaders, which execute() runs before transformRequest. */
  private _clientSession: string | undefined;
  private _surface = () => surfaceFromBaseUrl(this.config?.baseUrl);

  /**
   * Per-account rotation state, rebuilt from credentials on each request. The
   * default entry (fingerprint "") represents the single anonymous account with
   * no configured proxy — preserves the historical direct pass-through when the
   * user has not configured any per-account proxy.
   */
  private accounts: OpencodeAccountState[] = [
    { fingerprint: "", cooldownUntil: 0, consecutiveFails: 0, proxy: null },
  ];
  // Not `private`: passed as the mutable rotation cursor to
  // pickRotatableAccount(), which needs a plain `{ nextAccountIdx }` shape —
  // TS's private-member nominal check rejects `this` there otherwise.
  nextAccountIdx = 0;
  // Sleep used by the opt-in transient failover pause (#13615). Not `private`:
  // tests swap in a recording fake instead of waiting on real timers.
  transientPauseSleep: (ms: number, signal?: AbortSignal | null) => Promise<boolean> =
    sleepAbortable;

  constructor(provider: string) {
    super(provider, PROVIDERS[provider] || PROVIDERS.openai);
  }

  /**
   * Rebuild `accounts` from `providerSpecificData.fingerprints` +
   * `providerSpecificData.accountProxies`. Each configured account id becomes a
   * rotation slot carrying its own proxy. When the user configured no accounts
   * at all, the single default direct account is kept (backward compatible).
   */
  private syncAccountsFromCredentials(credentials: ProviderCredentials): void {
    const psd = credentials?.providerSpecificData;
    const fingerprints = Array.isArray(psd?.fingerprints)
      ? (psd!.fingerprints as unknown[]).filter((f): f is string => typeof f === "string")
      : [];

    const accountProxies = psd?.accountProxies as OpencodeAccountProxyConfig[] | undefined;
    const proxyMap = Array.isArray(accountProxies)
      ? new Map(accountProxies.map((ap) => [ap.fingerprint, ap.proxy ?? null] as const))
      : null;

    if (fingerprints.length === 0) {
      // No configured accounts — keep a single direct account.
      this.accounts = [{ fingerprint: "", cooldownUntil: 0, consecutiveFails: 0, proxy: null }];
      this.nextAccountIdx = 0;
      return;
    }

    const previous = new Map(this.accounts.map((a) => [a.fingerprint, a] as const));
    this.accounts = fingerprints.map((fp) => {
      const prior = previous.get(fp);
      return {
        fingerprint: fp,
        cooldownUntil: prior?.cooldownUntil ?? 0,
        consecutiveFails: prior?.consecutiveFails ?? 0,
        proxy: proxyMap ? (proxyMap.get(fp) ?? null) : null,
      };
    });
    if (this.nextAccountIdx >= this.accounts.length) this.nextAccountIdx = 0;
  }

  /** Round-robin pick, skipping non-candidates; falls back to the next index. */
  private pickAccountWith(
    isReady: (account: OpencodeAccountState) => boolean
  ): OpencodeAccountState {
    return pickRotatableAccount(this.accounts, this, isReady);
  }

  /**
   * Rewrite muse-spark's bogus `finish_reason:"length"` (see the
   * normalizeMuseSparkFinishReason note) to `"stop"` on both streaming and
   * non-streaming success responses. Non-muse-spark models pass through
   * untouched.
   */
  /**
   * Hand a JSON caller a JSON body even though the free-tier contract forced the upstream
   * request to stream. A streaming caller, a refusal and an already-JSON body pass through.
   */
  private finalizeForcedStream(
    input: ExecuteInput,
    result: ExecutorExecuteResult
  ): ExecutorExecuteResult {
    noteFreeTierOutcome(this._contractAttempt, "response" in result && !!result.response?.ok);
    if (input.stream) return result;
    if (!("response" in result) || !result.response) return result;
    // Non-null exactly when the contract applied: stands in for the old surface/model guard.
    if (!this._contractAttempt) return result;
    const model = this._contractAttempt.model;
    const response = rebuildJsonFromForcedStream(result.response, this._requestFormat, model);
    return response === result.response ? result : { ...result, response };
  }

  private normalizeMuseSparkResponse(
    input: ExecuteInput,
    result: ExecutorExecuteResult
  ): ExecutorExecuteResult {
    const model = String(input.model ?? "");
    if (!model.startsWith("muse-spark")) return result;
    if (!("response" in result) || !result.response?.ok || !result.response.body) return result;
    const bodyObj =
      input.body && typeof input.body === "object" && !Array.isArray(input.body)
        ? (input.body as Record<string, unknown>)
        : null;
    const rawBudget = bodyObj?.max_tokens;
    const budget = typeof rawBudget === "number" && Number.isFinite(rawBudget) ? rawBudget : null;
    const response = result.response;
    const isSse = response.headers.get("content-type")?.includes("event-stream") ?? false;

    if (!isSse) {
      // Non-streaming JSON: rewrite in a buffered pass.
      const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
          try {
            const text = await response.clone().text();
            let out = text;
            try {
              const parsed = JSON.parse(text) as Record<string, unknown>;
              normalizeMuseSparkFinishReason(parsed, budget);
              out = JSON.stringify(parsed);
            } catch {
              /* not JSON — forward verbatim */
            }
            controller.enqueue(new TextEncoder().encode(out));
          } catch (err) {
            controller.error(err);
            return;
          }
          controller.close();
        },
      });
      return {
        ...result,
        response: new Response(stream, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        }),
      };
    }

    // Streaming SSE: line-buffered passthrough with finish_reason rewriting.
    const normalizer = createMuseSparkStreamFinishNormalizer(budget);
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    let buffer = "";
    const reader = response.body.getReader();
    let closed = false;
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          while (!closed) {
            const { done, value } = await reader.read();
            if (done) {
              buffer += decoder.decode();
              if (buffer.length > 0 && !closed) {
                controller.enqueue(encoder.encode(normalizer(buffer)));
              }
              if (!closed) {
                closed = true;
                controller.close();
              }
              return;
            }

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";
            for (const line of lines) {
              const normalized = normalizer(line);
              controller.enqueue(encoder.encode(normalized + "\n"));
              if (isResponsesTerminalLine(line)) {
                // OpenCode Zen sends a ping after response.completed and may keep
                // the HTTP connection alive. The Responses terminal event is
                // authoritative; do not let those post-completion pings hold Chat
                // Completions open.
                closed = true;
                void reader.cancel().catch(() => undefined);
                controller.close();
                return;
              }
            }
          }
        } catch (err) {
          if (!closed) {
            closed = true;
            controller.error(err);
          }
        }
      },
      cancel(reason) {
        closed = true;
        reader.cancel(reason).catch(() => undefined);
      },
    });
    return {
      ...result,
      response: new Response(stream, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      }),
    };
  }

  async execute(input: ExecuteInput) {
    this._requestFormat = resolveOpencodeTargetFormat(this.provider, input.model);

    // #8681: Gate premium opencode models behind a usable API key.
    // When the connection is keyless (no apiKey, no accessToken) and the model
    // is a premium model (not on the free tier), return a clear 402 error
    // instead of proxying the raw upstream 401 "Missing API key" response.
    const creds = input.credentials;
    const isKeyless =
      !creds?.apiKey && !creds?.accessToken && !creds?.providerSpecificData?.extraApiKeys;
    if (isKeyless && isPremiumOpencodeModel(input.model, this.provider)) {
      const bodyJson = JSON.stringify({
        error: {
          message: "This model requires an opencode API key — add one in Settings → Providers.",
          type: "invalid_request_error",
          code: "premium_model_requires_key",
        },
      });
      return {
        response: new Response(bodyJson, {
          status: 402,
          headers: { "Content-Type": "application/json" },
        }),
        url: "",
        headers: {} as Record<string, string>,
        transformedBody: null,
      };
    }

    try {
      // muse-spark reasoning models consume the entire output budget on hidden
      // server-side reasoning; small caller budgets come back as empty-message
      // 200s ("Provider returned empty content"). Raise tiny budgets to the
      // floor before dispatch (see MUSE_SPARK_MIN_OUTPUT_TOKENS).
      if (input.body && typeof input.body === "object" && !Array.isArray(input.body)) {
        applyMuseSparkMinOutputTokens(
          String(input.model ?? ""),
          input.body as Record<string, unknown>
        );
      }

      this.syncAccountsFromCredentials(input.credentials);
      const { log } = input;
      // Request-scoped attribution prefix for rotation logs: message head,
      // empty when absent (never n/a/none/fabricated). The existing motif
      // stays byte-identical after the prefix.
      const cid = input.correlationId ? `correlationId=${input.correlationId} ` : "";

      const hasProxies = this.accounts.some((a) => a.proxy !== null);
      // Opt-in Responses first-byte stall guard (#13484); a no-op when the window is 0.
      const stallWindowMs = resolveResponsesStallWindowMs(input.stream, this._requestFormat);
      const guardStall = <T>(r: T) => guardResponsesStall(r, stallWindowMs, input.signal);
      // Fast path: no multi-account proxy wiring configured → original behavior,
      // plus exactly ONE bounded retry when the upstream answers a 400 empty
      // rejection (same predicate and logging as the rotation loop). Everything
      // else passes untouched: this path deliberately preserves BaseExecutor's
      // intra-URL 429 retries (no skipUpstreamRetry here).
      if (this.accounts.length === 1 && !hasProxies) {
        // #11894: a connection-level proxy assignment (proxy_assignments) reaches
        // the executor as the AMBIENT proxy context — the chat handler wraps
        // execute() in runWithProxyContext(proxyInfo.proxy, ...) before we run.
        // Only pin direct egress when no such context exists; otherwise let the
        // ambient proxy stand instead of clobbering it with the direct sentinel.
        const dispatch = () => super.execute(input);
        const single = (await guardStall(
          await (hasAmbientProxyContext() ? dispatch() : runWithDirectFetchContext(dispatch))
        )) as HttpExecuteResult;
        if (single.response.status === 400) {
          let bodyText: string | null = null;
          try {
            bodyText = await single.response.clone().text();
          } catch {
            log?.debug?.("OPENCODE", "body read failed on direct account");
          }
          if (bodyText !== null) {
            if (isEmptyUpstreamRejection(400, bodyText)) {
              const chatcmplId = extractChatcmplId(bodyText);
              log?.warn?.(
                "OPENCODE",
                `${cid}upstream empty rejection on direct account (${chatcmplId}), retrying once…`
              );
              return this.finalizeForcedStream(
                input,
                this.normalizeMuseSparkResponse(input, await guardStall(await super.execute(input)))
              );
            }
            log?.debug?.(
              "OPENCODE",
              "400 without error field, signature not matched on direct account — observing"
            );
          }
        }
        return this.finalizeForcedStream(input, this.normalizeMuseSparkResponse(input, single));
      }

      // This loop only ever dispatches through super.execute() (the HTTP request
      // path), which always resolves the object-shaped arm of ExecutorExecuteResult
      // — the bare-Response arm belongs to web/scraping executors only (base.ts:290).
      type HttpExecuteResult = Extract<
        Awaited<ReturnType<BaseExecutor["execute"]>>,
        { response: Response }
      >;
      let lastResult: HttpExecuteResult | null = null;
      let lastSharedEgressError: unknown = null;
      const sharedEgressGuardEnabled = isNetworkRotationSharedEgressGuardEnabled();
      // Set once a proxy-less account's network throw reveals the shared
      // egress is down (see NETWORK_ROTATION_SHARED_EGRESS_GUARD below) —
      // subsequent proxy-less accounts this request are skipped without a
      // network call, but proxied accounts (independent egress) are still
      // tried normally.
      let sharedEgressDown = false;
      // Bounded extra attempts for empty upstream rejections: +1 for a single
      // account (retry the same one), none for a multi-account fleet (rotation
      // through the accounts is the retry). Avoids an unbounded loop on a
      // persistently malformed upstream.
      const emptyRejectionBudget = this.accounts.length === 1 ? 1 : 0;
      // Tried set: proxy keys already proven unusable for this request's
      // model (geo-blocked, or transient 5xx). Request-local only — nothing
      // persists past execute().
      const geoTriedProxyKeys = new Set<string>();
      // Opt-in (PROXY_SKIP_RECENTLY_FAILED, default off): members the provider just refused
      // (received refusal or refused TCP probe) are skipped. Off = plain rotation.
      const skipRecentlyFailed = isProxySkipRecentlyFailedEnabled();
      let directTried = false;
      // Stalls before the first Responses byte: one rotation, then fail fast.
      const stallCounter = { attempts: 0 };
      // A response an opt-in branch rotated away from. It stays lastResult (and
      // intact) until a newer attempt replaces it, then its body is cancelled.
      let abandonedResponse: Response | null = null;
      // OPENCODE_USER_BLOCKED_ROTATION: rotations spent on user_blocked refusals (max 1).
      let userBlockedRotations = 0;
      // Consecutive transient failures (5xx / empty 400) and the pause time spent on
      // them this request — only acted on when OPENCODE_TRANSIENT_FAILOVER_BACKOFF is on.
      let transientStreak = 0;
      let transientPausedMs = 0;
      const requestPacing = egressPacing.initEgressPacingForRequest(); // Off by default.

      for (let attempt = 0; attempt < this.accounts.length + emptyRejectionBudget; attempt++) {
        const isProxiedCandidate = (a: OpencodeAccountState): boolean => {
          if (a.cooldownUntil > Date.now()) return false;
          // Without any geo evidence this pass, every cooldown-ready account
          // stays eligible (preserves the plain round-robin first pick).
          if (a.proxy === null) return !directTried || geoTriedProxyKeys.size === 0;
          if (skipRecentlyFailed && isProxyAvoided(proxyEgressKey(a.proxy))) return false;
          const k = proxyKeyOf(a.proxy);
          return k !== null && !geoTriedProxyKeys.has(k);
        };
        let account = this.pickAccountWith(isProxiedCandidate);
        // Last resort: a single direct attempt (distinct egress that may
        // succeed) once no proxied account is a candidate — never before.
        if (!isProxiedCandidate(account) && !directTried && geoTriedProxyKeys.size > 0) {
          const direct = this.accounts.find(
            (a) => a.proxy === null && a.cooldownUntil <= Date.now()
          );
          if (direct) {
            account = direct;
          }
        }
        const lastStatus = lastResult !== null ? lastResult.response.status : null;
        const lastWasGeo = lastStatus === 403 || lastStatus === 451;
        const lastWasTransient = lastStatus !== null && lastStatus >= 500 && lastStatus < 600;
        const isMonoRetryOwed = this.accounts.length === 1 && lastWasTransient;
        if (
          !isMonoRetryOwed &&
          lastResult !== null &&
          geoTriedProxyKeys.size > 0 &&
          !isProxiedCandidate(account) &&
          !(account.proxy === null && !directTried)
        ) {
          // Geo exhaustion (last was 403/451) → surface as-is, no success mark.
          // Transient exhaustion (last was 5xx) → same: surface last as-is.
          // Any other last status (e.g. 429 after 403s) → skip without a call.
          if (lastWasGeo || lastWasTransient) break;
          continue;
        }
        // Commit the last-resort direct attempt so a later exclusion breaks
        // instead of retrying it. Set here (not at pick time) so the guard
        // above still lets this committed attempt through.
        if (account.proxy === null && geoTriedProxyKeys.size > 0) directTried = true;
        const masked = maskAccountId(account.fingerprint);

        if (sharedEgressGuardEnabled && sharedEgressDown && !account.proxy) {
          log?.warn?.(
            "OPENCODE",
            `${cid}skipping account ${masked} (no dedicated proxy, shared egress already down this request)`
          );
          continue;
        }

        // Opt-in (#13615): after repeated transient failures, release the failed body
        // and wait (bounded) before the next account; a client abort stops the loop.
        const pauseMs = transientRetryDelayMs(transientStreak, transientPausedMs);
        if (pauseMs > 0 && lastResult !== null && isOpencodeTransientFailoverBackoffEnabled()) {
          lastResult = { ...lastResult, response: releaseResponseBody(lastResult.response) };
          transientPausedMs += pauseMs;
          log?.info?.(
            "OPENCODE",
            `${cid}${transientStreak} transient failures, pausing ${pauseMs}ms`
          );
          if (!(await this.transientPauseSleep(pauseMs, input.signal))) break;
        }

        // #5217 (Gap 2): promoted debug→info so the per-request account/proxy
        // rotation selection is visible in the Console log view at the default
        // APP_LOG_LEVEL=info (users could not see which account/proxy was used).
        // Token stays masked — never log the full account id.
        log?.info?.(
          "OPENCODE",
          `${cid}dispatch via account ${masked} (idx ${attempt + 1}/${this.accounts.length})` +
            (account.proxy
              ? ` through proxy ${account.proxy.host}:${account.proxy.port}`
              : " direct")
        );

        // Pin egress to this account's proxy for the whole BaseExecutor dispatch
        // (incl. its intra-URL 429 retries). skipUpstreamRetry lets THIS loop own
        // the cross-account 429 fallback instead of BaseExecutor's same-key retry.
        const paced = await egressPacing.startPacedDispatch(
          requestPacing,
          account,
          isProxiedCandidate,
          () => this.pickAccountWith(isProxiedCandidate),
          input.signal
        );
        const egressRelease = paced.release;
        account = paced.account;
        let result: HttpExecuteResult;
        try {
          // super.execute() dispatches the HTTP path (never the web/scraping arm).
          result = (await guardStall(
            await runWithProxyContext(account.proxy, () =>
              super.execute({ ...input, skipUpstreamRetry: true })
            )
          )) as HttpExecuteResult;
        } catch (err) {
          const reason = err instanceof Error ? err.message : String(err);
          // Stall guard: headers arrived, so the egress works — never a shared-egress
          // outage; proxied and proxy-less accounts rotate alike. A client abort never rotates.
          if (stallWindowMs > 0 && (isResponsesFirstByteTimeout(err) || input.signal?.aborted)) {
            if (input.signal?.aborted) egressPacing.throwPacedError(egressRelease, err);
            const rotate = egressPacing.settleStalledDispatch(egressRelease, account, {
              tried: geoTriedProxyKeys,
              stalled: stallCounter,
              cooldown: markCooldown,
              markDirect: () => (directTried = true),
            });
            log?.warn?.(
              "OPENCODE",
              `${cid}stream stalled on account ${masked}, ${rotate ? "rotating…" : "not rotating again"} (${reason})`
            );
            if (!rotate) egressPacing.throwPacedError(egressRelease, err);
            continue;
          }
          transientStreak = 0;
          // A network exception (timeout, connection refused/reset) is only
          // account-scoped when this account has its OWN egress (a configured
          // proxy) — that's the case a dead/unreachable proxy justifies rotating
          // away from. Without a proxy, accounts share the same network egress:
          // the failure isn't attributable to this account. Never swallowed
          // silently either way: logged before rotating, skipping, or rethrowing.
          if (!isNetworkErrorRotatable(account)) {
            if (sharedEgressGuardEnabled) {
              markCooldown(account);
              sharedEgressDown = true;
              lastSharedEgressError = err;
              log?.warn?.(
                "OPENCODE",
                `${cid}network error on account ${masked} (no dedicated proxy, shared egress), cooldown — trying next… (${reason})`
              );
              egressPacing.releasePacingSlot(egressRelease);
              continue;
            }
            log?.warn?.(
              "OPENCODE",
              `${cid}network error on account ${masked} (no dedicated proxy, shared egress) — not rotating (${reason})`
            );
            egressPacing.throwPacedError(egressRelease, err);
          }
          markCooldown(account);
          log?.warn?.(
            "OPENCODE",
            `${cid}network error on account ${masked}, rotating to next… (${reason})`
          );
          egressPacing.releasePacingSlot(egressRelease);
          continue;
        }
        discardResponseBody(abandonedResponse);
        abandonedResponse = null;
        lastResult = result;
        const priorTransientStreak = transientStreak;
        transientStreak = 0;

        try {
          const status = result.response.status;
          if (status === 429) {
            markCooldown(account);
            const setAsideMs = egressPacing.noteRefusedMember(account.proxy, skipRecentlyFailed);
            // Opt-in (#13657): a 429 that names a real rate limit stops the wave and
            // the real upstream 429 is returned untouched (body, Retry-After, quota
            // headers), so provider error rules still apply. Flag off → rotate.
            // The settle releases the slot exactly once; a burst parks the
            // request once its slot budget is spent.
            const arm = await egressPacing.settle429Arm(
              egressRelease,
              requestPacing,
              result.response,
              isOpencodeRateLimited429EarlyStopEnabled
            );
            egressPacing.log429Outcome(log, cid, arm, masked, setAsideMs);
            if (arm === "stop") return result;
            if (arm === "park") break;
            continue;
          }

          if (isRetriableUpstreamFailure(status)) {
            const key = proxyKeyOf(account.proxy);
            if (key !== null) geoTriedProxyKeys.add(key);
            else directTried = true;
            transientStreak = priorTransientStreak + 1;
            log?.warn?.(
              "OPENCODE",
              `${cid}transient upstream ${status} on account ${masked} (proxy ${key ?? "direct"}), rotating to next…`
            );
            // Deliberately a separate branch from the 400-empty arm below,
            // not one merged `if`: this arm never touches the body, the 400
            // arm must clone-read it. Both share the predicate + tried-set.
            // Single proxied account: one retry via the existing budget (a
            // proxy-less single account takes the fast path, never the loop).
            // Transient is not deterministic like geo: upstream may recover.
            // No 0-retry guard here (it stays geo-only).
            continue;
          }

          if (status === 403 || status === 451) {
            let bodyText: string | null = null;
            try {
              bodyText = await result.response.clone().text();
            } catch {
              log?.debug?.("OPENCODE", "body read failed on geo-block check");
            }
            if (bodyText !== null && isOpencodeGeoBlocked(status, bodyText)) {
              const key = proxyKeyOf(account.proxy);
              if (key !== null) geoTriedProxyKeys.add(key);
              else directTried = true;
              log?.warn?.("OPENCODE", `${cid}geo-blocked on account ${masked}, rotating…`);
              // Single account with a proxy: 0 retries (same egress = dead latency).
              // (The fast path above already covers single-without-proxy; here length===1 WITH proxy.)
              if (this.accounts.length === 1) return result;
              continue;
            }
            // Opt-in (#13498): an upstream user_blocked refusal (403 or 451, same
            // predicate) cools the refused account down, joins the tried-set and
            // rotates at most once per request. Never a success mark. Flag off →
            // falls through to the unchanged path below.
            if (
              bodyText !== null &&
              isOpencodeUserBlocked(status, bodyText) &&
              isOpencodeUserBlockedRotationEnabled()
            ) {
              const key = proxyKeyOf(account.proxy);
              if (key !== null) geoTriedProxyKeys.add(key);
              else directTried = true;
              markCooldown(account);
              const rotate = userBlockedRotations === 0 && this.accounts.length > 1;
              log?.warn?.(
                "OPENCODE",
                `${cid}user_blocked ${status} on account ${masked} (proxy ${key ?? "direct"}), ${rotate ? "rotating to next account once…" : "returning the refusal"}`
              );
              if (!rotate) return result;
              userBlockedRotations++;
              abandonedResponse = result.response;
              continue;
            }
            // Free-tier refusal: upstream rejected the REQUEST (client identity or
            // request shape), not this account. Every sibling account gets the same
            // verdict from the same request, so rotating only adds latency; and the
            // refusal must not touch account health — markSuccess would revive an
            // evicted account. Return it untouched, health and cooldown unchanged.
            if (bodyText !== null && isOpencodeFreeTierRefusal(status, bodyText)) {
              log?.warn?.(
                "OPENCODE",
                `${cid}free-tier refusal ${status} on account ${masked} (proxy ${proxyKeyOf(account.proxy) ?? "direct"}), returning it unchanged (request-scoped, no rotation)`
              );
              noteResponseServed(account);
              return result;
            }
          }

          // Empty upstream rejection (malformed 400: no error field, no real
          // content, finish_reason null — see isEmptyUpstreamRejection). Rotate/
          // retry instead of propagating it as a fatal success: the observed
          // envelope was marking subagent sessions as failed. Read the body ONLY
          // for a 400 (never a 200/streaming — that would buffer the good path);
          // classify, log, and continue. Neitheries markCooldown nor markSuccess:
          // the failure is upstream's, not this account's.
          if (status === 400) {
            let bodyText: string | null = null;
            try {
              bodyText = await result.response.clone().text();
            } catch {
              log?.debug?.("OPENCODE", "body read failed on empty rejection check");
            }
            if (bodyText !== null && isRetriableUpstreamFailure(400, bodyText)) {
              const chatcmplId = extractChatcmplId(bodyText);
              transientStreak = priorTransientStreak + 1;
              log?.warn?.(
                "OPENCODE",
                `${cid}upstream empty rejection on account ${masked} (${chatcmplId}), rotating to next…`
              );
              continue;
            }
            // A 400 carrying a real error (or non-empty content): propagate
            // immediately, untouched — same as before this change.
            markOutcome(account, result.response);
            return result;
          }

          egressPacing.observePacingSuccess(requestPacing, result.response.ok);
          markOutcome(account, result.response);
          return this.finalizeForcedStream(input, this.normalizeMuseSparkResponse(input, result));
        } finally {
          // Single release point for every post-dispatch arm (5xx, 403/451,
          // free-tier, 429, 400, success): the released-guard makes the 429
          // internal release a harmless no-op.
          egressPacing.releasePacingSlot(egressRelease);
        }
      }

      // The loop exhausted without a result. If it's because every remaining
      // proxy-less account was skipped once the shared egress was known down
      // (rather than actually tried), propagate that original throw — an
      // extra direct call here would just be a second doomed attempt against
      // the same dead path, which is exactly the latency this guard exists
      // to avoid (see NETWORK_ROTATION_SHARED_EGRESS_GUARD).
      if (sharedEgressDown && !lastResult && lastSharedEgressError !== null) {
        throw lastSharedEgressError;
      }

      // All accounts returned 429 (or errored) — surface the last response.
      return this.finalizeForcedStream(
        input,
        this.normalizeMuseSparkResponse(
          input,
          lastResult ?? (await guardStall(await super.execute(input)))
        )
      );
    } finally {
      this._requestFormat = null;
    }
  }

  buildUrl(
    model: string,
    stream: boolean,
    urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ) {
    void urlIndex;
    void credentials;

    const base = this.config.baseUrl;
    switch (this._requestFormat) {
      case "claude":
        return `${base}/messages`;
      case "openai-responses":
        return `${base}/responses`;
      case "gemini":
        return `${base}/models/${model}:${stream ? "streamGenerateContent?alt=sse" : "generateContent"}`;
      default:
        return `${base}/chat/completions`;
    }
  }

  /**
   * #12633: OpenCode Zen's `/v1/responses` endpoint (reached when
   * `_requestFormat === "openai-responses"`, e.g. Muse Spark Contributor
   * models) requires `x-api-key`, not `Authorization: Bearer` — unlike the
   * default `/chat/completions` endpoint on the same host, which accepts
   * Bearer. Scoped by baseUrl (not provider id/alias) so this only applies to
   * the main Zen host (`opencode` / `opencode-zen`, both `https://opencode.ai/zen/v1`)
   * and never to opencode-go, which serves Responses-format models from a
   * different upstream (`https://opencode.ai/zen/go/v1`) that expects Bearer.
   */
  private usesZenApiKeyAuth(): boolean {
    return this._requestFormat === "openai-responses" && this.config?.baseUrl === ZEN_BASE_URL;
  }

  buildHeaders(
    credentials: ProviderCredentials | null,
    stream = true,
    clientHeaders?: Record<string, string> | null,
    model?: string,
    _health?: Record<string, unknown>,
    body?: unknown
  ) {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    // #8467: honor Extra API Keys rotation via BaseExecutor.resolveEffectiveKey.
    // Fall back to accessToken only when no apiKey/extras resolve to a key.
    const key = credentials
      ? this.resolveEffectiveKey(credentials) || credentials.accessToken
      : undefined;

    if (key) {
      if (this._requestFormat === "claude" || this.usesZenApiKeyAuth()) {
        headers["x-api-key"] = key;
      } else {
        headers["Authorization"] = `Bearer ${key}`;
      }
    }

    if (this._requestFormat === "claude") {
      headers["anthropic-version"] = "2023-06-01";
    }

    // The free tier only answers streamed requests (measured 2026-09-17: a non-streamed
    // body answers 403 FreeTierError), so a JSON client is served by streaming upstream and
    // rebuilding the JSON body from the event stream — the path chatCore already takes for
    // any buffered event-stream response. Announcing the stream here keeps that buffering an
    // expected outcome rather than a warning.
    const gatedScope =
      Boolean(model) && isGatedFreeTierRequest(this._surface(), this.provider, model);
    if (stream || gatedScope) {
      headers["Accept"] = "text/event-stream";
    }

    // Synthesize OpenCode CLI identity headers by default so Cloudflare in front of
    // opencode.ai/zen doesn't 429 VPS requests lacking CLI identity. Opt-out via
    // OPENCODE_SYNTHESIZE_CLI_HEADERS=false. Client-supplied headers always win;
    // User-Agent is replaced with the CLI UA unless the client already sends one that
    // looks like the OpenCode CLI. Default values match 9router's proven defaults.
    const cliDefaults = resolveOpencodeCliDefaults(
      this.config?.id || this.provider || "opencode",
      gatedScope
    );

    this._clientSession = clientSuppliedOpencodeSession(clientHeaders);
    if (clientHeaders || cliDefaults) {
      const b = body && typeof body === "object" ? (body as Record<string, unknown>) : null;
      forwardOpencodeClientHeaders(headers, clientHeaders ?? {}, {
        synthesizeRequestId: true,
        cliDefaults,
        sessionBody: b
          ? {
              model: typeof b.model === "string" ? b.model : undefined,
              system: b.system,
              messages: Array.isArray(b.messages)
                ? (b.messages as Array<{ role?: string; content?: unknown }>)
                : undefined,
              // The Responses surface carries the conversation under `input`; without it the
              // fingerprint collapses to the model alone and every conversation on that model
              // would share one upstream session.
              input: Array.isArray(b.input)
                ? (b.input as Array<{ role?: string; content?: unknown }>)
                : undefined,
              tools: Array.isArray(b.tools)
                ? (b.tools as Array<{ name?: string; function?: { name?: string } }>)
                : undefined,
            }
          : undefined,
      });
    }

    // The Muse Responses workaround that forced a UUID session here is gone: the shape it
    // produced is exactly what the upstream now refuses, and the canonical session it used
    // to overwrite is accepted on that surface (measured 2026-09-17, 200 on
    // muse-spark-1.3-contributor-free via /v1/responses).

    void model;

    return headers;
  }

  /**
   * OpenCode's free DeepSeek V4 Flash endpoint accepts json_object but
   * rejects json_schema response_format with HTTP 400. Preserve the schema
   * as an instruction and downgrade only this proven-incompatible route to
   * json_object so callers still receive structured JSON.
   */
  private applyDeepSeekJsonSchemaFallback<T>(model: string, body: T): T {
    if (
      model !== "deepseek-v4-flash-free" ||
      (this.provider !== "opencode" && this.provider !== "opencode-zen")
    ) {
      return body;
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return body;
    }

    const record = body as Record<string, unknown>;
    const responseFormat = record.response_format as
      | {
          type?: string;
          json_schema?: {
            schema?: unknown;
          };
        }
      | undefined;

    if (responseFormat?.type !== "json_schema" || !responseFormat.json_schema?.schema) {
      return body;
    }

    const schemaJson = JSON.stringify(responseFormat.json_schema.schema, null, 2);

    const prompt =
      "You must respond with valid JSON that strictly follows " +
      "this JSON schema:\\n```json\\n" +
      schemaJson +
      "\\n```\\nRespond ONLY with the JSON object, no other text.";

    const messages: Array<Record<string, unknown>> = Array.isArray(record.messages)
      ? (record.messages as Array<Record<string, unknown>>).map((message) => ({ ...message }))
      : [];

    const systemMessage = messages.find((message) => message.role === "system");

    if (systemMessage) {
      if (typeof systemMessage.content === "string") {
        systemMessage.content = `${systemMessage.content}\\n\\n${prompt}`;
      } else if (Array.isArray(systemMessage.content)) {
        systemMessage.content.push({
          type: "text",
          text: `\\n\\n${prompt}`,
        });
      }
    } else {
      messages.unshift({
        role: "system",
        content: prompt,
      });
    }

    return {
      ...record,
      messages,
      response_format: {
        type: "json_object",
      },
    } as T;
  }

  transformRequest(
    model: string,
    body: any,
    stream: boolean,
    credentials: ProviderCredentials
  ): any {
    let modifiedBody = super.transformRequest(model, body, stream, credentials);
    modifiedBody = this.applyDeepSeekJsonSchemaFallback(model, modifiedBody);
    // Free-tier request contract (see opencodeFreeTierContract.ts): streaming plus a
    // non-empty tools array, in the shape of the surface this model is served on. Paid
    // models on the same host are not gated and stay untouched.
    const prepared = prepareFreeTierRequest(
      modifiedBody,
      this._requestFormat ?? resolveOpencodeTargetFormat(this.provider, model),
      this._surface(),
      this.provider,
      model,
      this._clientSession
    );
    modifiedBody = prepared.body;
    this._contractAttempt = prepared.attempt;
    // 9router#1442: OpenCode upstreams (e.g. kimi-k2.6 via opencode-go) return
    // 400 "Extra inputs are not permitted, field: 'client_metadata'" — an
    // OpenAI-Codex/Claude-CLI passthrough field with no equivalent here. The
    // DefaultExecutor strip only covers cerebras/mistral, and OpencodeExecutor
    // extends BaseExecutor directly, so nothing removed it on this path.
    if (
      modifiedBody &&
      typeof modifiedBody === "object" &&
      !Array.isArray(modifiedBody) &&
      Object.prototype.hasOwnProperty.call(modifiedBody, "client_metadata")
    ) {
      delete (modifiedBody as Record<string, unknown>).client_metadata;
    }
    if (modifiedBody && typeof modifiedBody === "object" && !Array.isArray(modifiedBody)) {
      const mb = modifiedBody as Record<string, unknown>;
      // OpenCode accepts stream_options only on streaming Chat Completions (#13699).
      const format = this._requestFormat ?? resolveOpencodeTargetFormat(this.provider, model);
      if (format !== "openai" || mb.stream !== true) {
        delete mb.stream_options;
      }
      const parsed = parseEffortLevel(model);
      if (parsed) {
        const deepseekFamily =
          parsed.baseModel === "deepseek-v4-pro" || parsed.baseModel === "deepseek-v4-flash";
        if (deepseekFamily) {
          // DeepSeek via opencode-go proxies the native DeepSeek contract, which
          // accepts a flat reasoning_effort field (#4647).
          mb.model = parsed.baseModel;
          if (mb.reasoning_effort === undefined) {
            mb.reasoning_effort = parsed.effort;
          }
        }
        // #10788: every other family's ONLY native effort mechanism is the
        // -<tier> suffix in the model id itself (the ids `opencode models
        // opencode-go --verbose` lists). The opencode-go ChatCompletionRequest
        // carries no flat reasoning_effort field, so rewriting to the base id
        // silently dropped the tier — forward the aliased id verbatim instead.
      }
    }
    // #1543 / upstream PR #1099: thinking-mode upstreams routed through OpenCode
    // (DeepSeek V4 Flash, Kimi, MiniMax, ...) require reasoning_content echoed
    // back on assistant messages, or they 400 with "reasoning_content must be
    // passed back". OpenAI clients drop it across turns, so we inject a
    // placeholder for the affected model families.
    if (isThinkingMessageModel(model)) {
      modifiedBody = injectReasoningContentForThinkingModel(modifiedBody);
    }
    return modifiedBody;
  }
}
