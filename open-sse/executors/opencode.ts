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
  noteRotationAccount,
  resolveProxyForRequest,
} from "../utils/proxyFetch.ts";
import {
  createServedAccountTracker,
  noteParkWait,
  noteReplayed,
  noteStoredFallback,
} from "./opencodeResilienceNotes.ts";
import {
  clientSuppliedOpencodeSession,
  forwardOpencodeClientHeaders,
  resolveOpencodeCliDefaults,
} from "../utils/opencodeHeaders.ts";
import { projectOpencodeSessionBody } from "../utils/opencodeSessionIdentity.ts";
import {
  listForRequest,
  releaseRequestList,
  type ScopedAccount,
  type ScopedAccountHealth,
} from "./opencodeAccountScope.ts";
import {
  type AccountProxyConfig,
  type RotationAccountSnapshot,
  pickAccount as pickRotatableAccount,
  maskAccountId,
  isNetworkErrorRotatable,
  isEmptyUpstreamRejection,
  extractChatcmplId,
  recordRotationSnapshot,
} from "./accountRotation.ts";
import {
  markCooldown,
  markOutcome,
  markSuccess,
  noteResponseServed,
} from "./opencodeAccountHealth.ts";
import {
  isOpencodeFreeTierRefusal,
  isOpencodeGeoBlocked,
  proxyKeyOf,
  isOpencodeUserBlocked,
} from "./opencodeGeoBlock.ts";
import {
  attemptFor,
  isGatedFreeTierRequest,
  isPremiumOpencodeModel,
  noteFreeTierOutcome,
  prepareFreeTierRequest,
  rebuildJsonFromForcedStream,
  surfaceFromBaseUrl,
} from "./opencodeFreeTierContract.ts";
import {
  applyMuseSparkMinOutputTokens,
  createMuseSparkStreamFinishNormalizer,
  isResponsesTerminalLine,
  normalizeMuseSparkFinishReason,
} from "./opencodeMuseSpark.ts";
import { currentRequestContext, runInRequestContext } from "./opencodeRequestContext.ts";
import {
  handleLoopFreeTierRefusal,
  retryFreeTierRefusalWithObservedTools,
} from "./opencodeFreeTierRetry.ts";
import { withRequestShapeRetry } from "./opencodeRequestShape.ts";

// Re-exported: the free-model catalog moved to the contract module (it decides whether the
// contract applies), and existing importers keep resolving it from the executor.
export { isPremiumOpencodeModel };
import {
  guardResponsesStall,
  isResponsesFirstByteTimeout,
  resolveResponsesStallWindowMs,
} from "./opencodeResponsesStall.ts";
import { discardResponseBody } from "./opencodeResponseBody.ts";
import { headersWaitDispatch, headersWaitState } from "./opencodeHeadersWait.ts";
import {
  isRetriableUpstreamFailure,
  releaseResponseBody,
  sleepAbortable,
  transientRetryDelayMs,
} from "./opencodeTransientFailure.ts";
import { isProxyAvoided } from "../utils/proxyRefusalMemory.ts";
import * as egressPacing from "./opencodeEgressThrottle.ts";
import {
  isNetworkRotationSharedEgressGuardEnabled,
  isProxySkipRecentlyFailedEnabled,
  isRotationAttributionEnabled,
  isOpencodeUserBlockedRotationEnabled,
  isOpencodeTransientFailoverBackoffEnabled,
  isOpencodeRateLimited429EarlyStopEnabled,
  isOpencodeParkAndResumeEnabled,
} from "@/shared/utils/featureFlags";
import {
  BURST_PARK_THRESHOLD,
  parkWaitMs,
  readPoolStrainMarker,
  runParkAndReplay,
} from "./opencodeParkResume.ts";

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

export type { ScopedAccount as OpencodeAccountState };

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

export {
  MUSE_SPARK_MIN_OUTPUT_TOKENS,
  applyMuseSparkMinOutputTokens,
  createMuseSparkStreamFinishNormalizer,
  normalizeMuseSparkFinishReason,
} from "./opencodeMuseSpark.ts";

export class OpencodeExecutor extends BaseExecutor {
  /** Delegates to `isPremiumOpencodeModel`. Exported for testability. */
  static isPremiumModel(model: string, provider: string): boolean {
    return isPremiumOpencodeModel(model, provider);
  }

  /**
   * The target format and the client session of the request being served. While `execute()`
   * runs they live in that request's own context (this instance is shared and requests
   * overlap); outside it they fall back to plain fields, which is how `buildHeaders`,
   * `buildUrl` and `transformRequest` are exercised on their own.
   */
  private _formatFallback: string | null = null;
  private _sessionFallback: string | undefined;
  get _requestFormat(): string | null {
    return currentRequestContext()?.format ?? this._formatFallback;
  }
  set _requestFormat(value: string | null) {
    const context = currentRequestContext();
    if (context) context.format = value;
    else this._formatFallback = value;
  }
  private get _clientSession(): string | undefined {
    const context = currentRequestContext();
    return context ? context.session : this._sessionFallback;
  }
  private set _clientSession(value: string | undefined) {
    const context = currentRequestContext();
    if (context) context.session = value;
    else this._sessionFallback = value;
  }
  private _surface = () => surfaceFromBaseUrl(this.config?.baseUrl);

  /** Free-tier retry context: the request-scoped contract state the retry helper needs. */
  private freeTierRetryCtx(input: ExecuteInput) {
    // #14148 moved the contract attempt off the executor: it is keyed by the
    // request body, so read it back from there instead of a shared field.
    const attempt = attemptFor(input.body);
    return {
      surface: this._surface(),
      provider: this.provider,
      requestFormat: this._requestFormat,
      clientSession: this._clientSession,
      borrowed: attempt?.borrowed,
      clientToolNames: attempt?.clientToolNames ?? [],
    };
  }

  // Not `private`: passed as the shared pick cursor to
  // pickRotatableAccount(), which needs a plain `{ nextAccountIdx }` shape —
  // TS's private-member nominal check rejects `this` there otherwise.
  nextAccountIdx = 0;
  // Member health shared across requests on this alias, keyed by member id.
  // Each request still walks its own list (see `opencodeAccountScope.ts`).
  accountHealth = new Map<string, ScopedAccountHealth>();
  get accounts(): ScopedAccount[] {
    const store = this.accountHealth;
    // Cold parity with the historical default direct member (read-only).
    if (store.size === 0) {
      return [{ fingerprint: "", cooldownUntil: 0, consecutiveFails: 0, proxy: null }];
    }
    const live = [...store.entries()].map(([fingerprint]) => ({
      fingerprint,
      get cooldownUntil() {
        return store.get(fingerprint)?.cooldownUntil ?? 0;
      },
      set cooldownUntil(value: number) {
        const current = store.get(fingerprint) ?? { cooldownUntil: 0, consecutiveFails: 0 };
        store.set(fingerprint, { ...current, cooldownUntil: value });
      },
      get consecutiveFails() {
        return store.get(fingerprint)?.consecutiveFails ?? 0;
      },
      set consecutiveFails(value: number) {
        const current = store.get(fingerprint) ?? { cooldownUntil: 0, consecutiveFails: 0 };
        store.set(fingerprint, { ...current, consecutiveFails: value });
      },
      proxy: null as ScopedAccount["proxy"],
    }));
    return live;
  }
  // Sleep used by the opt-in transient failover pause (#13615). Not `private`:
  // tests swap in a recording fake instead of waiting on real timers.
  transientPauseSleep: (ms: number, signal?: AbortSignal | null) => Promise<boolean> =
    sleepAbortable;
  parkSleep: (ms: number, signal?: AbortSignal | null) => Promise<boolean> = sleepAbortable;

  constructor(provider: string) {
    super(provider, PROVIDERS[provider] || PROVIDERS.openai);
  }

  /** Round-robin pick from this request's list, skipping members not ready. */
  private pickAccountWith(
    accounts: ScopedAccount[],
    isReady: (account: ScopedAccount) => boolean,
    keyOfMember?: (account: ScopedAccount) => string | null
  ): ScopedAccount {
    return pickRotatableAccount(accounts, this, isReady, keyOfMember);
  }

  /** Snapshot entries for the attribution registry — ids already masked. */
  private snapshotEntries(
    accounts: ScopedAccount[],
    nowMs: number = Date.now()
  ): RotationAccountSnapshot[] {
    return accounts.map((a) => ({
      masked: maskAccountId(a.fingerprint),
      ready: a.cooldownUntil <= nowMs,
      cooldownUntilMs: a.cooldownUntil > nowMs ? a.cooldownUntil : null,
      consecutiveFails: a.consecutiveFails,
    }));
  }

  /** Emit one info line per cooldown-skipped account seen this request. */
  private logSkippedCooldownAccounts(
    log: { info?: (...args: unknown[]) => void } | undefined,
    cid: string,
    skippedCooldown: Map<string, number>
  ): void {
    for (const [fp, until] of skippedCooldown) {
      const remainingS = Math.max(0, Math.ceil((until - Date.now()) / 1000));
      log?.info?.(
        "OPENCODE",
        `${cid}skipped account ${maskAccountId(fp)} (cooling down, ${remainingS}s remaining)`
      );
    }
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
    noteFreeTierOutcome(attemptFor(input.body), "response" in result && !!result.response?.ok);
    if (input.stream) return result;
    if (!("response" in result) || !result.response) return result;
    // Non-null exactly when the contract applied: stands in for the old surface/model guard.
    const model = attemptFor(input.body)?.model;
    if (!model) return result;
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
    try {
      return await runInRequestContext(() =>
        withRequestShapeRetry(input, (i) => this.executeOnce(i))
      );
    } finally {
      releaseRequestList(input.body, this.accountHealth);
    }
  }

  private async executeOnce(input: ExecuteInput) {
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

      const accounts = listForRequest(input.body, this.accountHealth, input.credentials);
      if (accounts.length === 1 && accounts[0]?.fingerprint === "") this.nextAccountIdx = 0;
      else if (this.nextAccountIdx >= accounts.length) this.nextAccountIdx = 0;
      const { log } = input;
      // Request-scoped attribution prefix for rotation logs: message head,
      // empty when absent (never n/a/none/fabricated). The existing motif
      // stays byte-identical after the prefix.
      const cid = input.correlationId ? `correlationId=${input.correlationId} ` : "";
      // Rotation attribution diagnostics (single flag read per request — the DB
      // override lookup is synchronous SQLite, never in the attempt loop).
      const attributionOn = isRotationAttributionEnabled();
      // Cooldown-skipped accounts seen this request, keyed by fingerprint (a
      // mask prefix could theoretically collide; masking happens at write).
      const skippedCooldown = new Map<string, number>();

      const hasProxies = accounts.some((a) => a.proxy !== null);
      // Opt-in Responses first-byte stall guard (#13484); a no-op when the window is 0.
      const stallWindowMs = resolveResponsesStallWindowMs(input.stream, this._requestFormat);
      const guardStall = <T>(r: T) => guardResponsesStall(r, stallWindowMs, input.signal);
      const headersWait = headersWaitState(
        input,
        this._requestFormat,
        this.getTimeoutMs(),
        this.config?.fetchStartTimeoutCapMs
      );
      // Fast path: no multi-account proxy wiring configured → original behavior,
      // plus exactly ONE bounded retry when the upstream answers a 400 empty
      // rejection (same predicate and logging as the rotation loop). Everything
      // else passes untouched: this path deliberately preserves BaseExecutor's
      // intra-URL 429 retries (no skipUpstreamRetry here).
      if (accounts.length === 1 && !hasProxies) {
        // #11894: a connection-level proxy assignment (proxy_assignments) reaches
        // the executor as the AMBIENT proxy context — the chat handler wraps
        // execute() in runWithProxyContext(proxyInfo.proxy, ...) before we run.
        // Only pin direct egress when no such context exists; otherwise let the
        // ambient proxy stand instead of clobbering it with the direct sentinel.
        const dispatch = () => super.execute(input);
        const single = (await guardStall(
          await (hasAmbientProxyContext() ? dispatch() : runWithDirectFetchContext(dispatch))
        )) as HttpExecuteResult;
        const retryAfterRefusal = await retryFreeTierRefusalWithObservedTools(
          this.freeTierRetryCtx(input),
          input,
          single,
          log,
          cid,
          (retryInput) =>
            guardStall(
              hasAmbientProxyContext()
                ? super.execute(retryInput)
                : runWithDirectFetchContext(() => super.execute(retryInput))
            ) as unknown as Promise<HttpExecuteResult>
        );
        if (retryAfterRefusal) {
          return this.finalizeForcedStream(
            input,
            this.normalizeMuseSparkResponse(input, retryAfterRefusal)
          );
        }
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
      const emptyRejectionBudget = accounts.length === 1 ? 1 : 0;
      // Request-local: geo/transient + 429 no-replay keys, one last resort after a 429.
      const geoTriedProxyKeys = new Set<string>(),
        rateLimitedProxyKeys = new Set<string>(),
        spare = egressPacing.lastResort429(accounts, this, geoTriedProxyKeys, rateLimitedProxyKeys);
      // Opt-in (PROXY_SKIP_RECENTLY_FAILED, default off): members the provider just refused
      // (received refusal or refused TCP probe) are skipped. Off = plain rotation.
      const skipRecentlyFailed = isProxySkipRecentlyFailedEnabled();
      let directTried = false;
      const stallCounter = { attempts: 0 }; // first-byte stalls: one rotation, then fail fast
      // A response an opt-in branch rotated away from. It stays lastResult (and
      // intact) until a newer attempt replaces it, then its body is cancelled.
      let abandonedResponse: Response | null = null;
      // OPENCODE_USER_BLOCKED_ROTATION: rotations spent on user_blocked refusals (max 1).
      let userBlockedRotations = 0;
      // Consecutive transient failures (5xx / empty 400) and the pause time spent on
      // them this request — only acted on when OPENCODE_TRANSIENT_FAILOVER_BACKOFF is on.
      let transientStreak = 0;
      let transientPausedMs = 0;
      let burstStreak = 0,
        parked = false;
      const requestPacing = egressPacing.initEgressPacingForRequest(); // Off by default.
      // served-account changes (effective-change counting) live in the leaf tracker.
      const noteServedAccount = createServedAccountTracker();
      const appliedEgress = egressPacing.createAppliedEgressTracker(
        this.buildUrl(String(input.model ?? ""), Boolean(input.stream)),
        resolveProxyForRequest
      );
      const { readAppliedKey, keyOfMember } = appliedEgress;

      for (let attempt = 0; attempt < accounts.length + emptyRejectionBudget; attempt++) {
        appliedEgress.resetAttempt();
        const isProxiedCandidate = (a: ScopedAccount): boolean => {
          if (a.cooldownUntil > Date.now()) return false;
          // Without any geo evidence this pass, every cooldown-ready account
          // stays eligible (preserves the plain round-robin first pick).
          const memberKey = keyOfMember(a);
          if (a.proxy === null) {
            if (skipRecentlyFailed && isProxyAvoided(memberKey)) return false;
            return !directTried || geoTriedProxyKeys.size === 0;
          }
          if (skipRecentlyFailed && isProxyAvoided(memberKey)) return false;
          const k = proxyKeyOf(a.proxy);
          return k !== null && !geoTriedProxyKeys.has(k) && !rateLimitedProxyKeys.has(k);
        };
        let account = this.pickAccountWith(accounts, isProxiedCandidate, keyOfMember);
        if (attributionOn) {
          const nowMs = Date.now();
          for (const a of accounts) {
            if (a.cooldownUntil > nowMs) {
              const prev = skippedCooldown.get(a.fingerprint);
              if (prev === undefined || a.cooldownUntil > prev) {
                skippedCooldown.set(a.fingerprint, a.cooldownUntil);
              }
            }
          }
          recordRotationSnapshot(
            String(input.credentials?.connectionId ?? ""),
            this.snapshotEntries(accounts, nowMs)
          );
        }
        // Last resort: one direct attempt (distinct egress) once no proxied account is a candidate.
        if (!isProxiedCandidate(account) && !directTried && geoTriedProxyKeys.size > 0) {
          const direct = accounts.find((a) => a.proxy === null && a.cooldownUntil <= Date.now());
          if (direct) account = direct;
        }
        const lastStatus = lastResult !== null ? lastResult.response.status : null;
        const lastResort = spare.take(lastStatus, account, isProxiedCandidate);
        account = lastResort ?? account;
        const lastWasGeo = lastStatus === 403 || lastStatus === 451;
        const lastWasTransient = lastStatus !== null && lastStatus >= 500 && lastStatus < 600;
        const isMonoRetryOwed = accounts.length === 1 && lastWasTransient;
        if (
          !isMonoRetryOwed &&
          lastResult !== null &&
          geoTriedProxyKeys.size + rateLimitedProxyKeys.size > 0 &&
          !(account === lastResort || isProxiedCandidate(account)) &&
          !(account.proxy === null && !directTried)
        ) {
          // Geo/transient exhaustion → surface as-is, no success mark.
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
          `${cid}dispatch via account ${masked} (idx ${attempt + 1}/${accounts.length})` +
            (account.proxy
              ? ` through proxy ${account.proxy.host}:${account.proxy.port}`
              : " direct")
        );
        // Rotation attribution: publish the masked serving id for the proxy log
        // (multi-account anonymous rotation only — a lone direct account stays
        // silent so the configured connection id keeps its meaning).
        if (attributionOn && (accounts.length > 1 || account.fingerprint !== "")) {
          noteRotationAccount(masked);
        }
        // effective-change counting on the masked id (the raw
        // fingerprint never reaches the log, just the counter).
        noteServedAccount(masked);

        // Pin egress to this account's proxy for the whole BaseExecutor dispatch
        // (incl. its intra-URL 429 retries). skipUpstreamRetry lets THIS loop own
        // the cross-account 429 fallback instead of BaseExecutor's same-key retry.
        const paced = await egressPacing.startPacedDispatch(
          requestPacing,
          account,
          isProxiedCandidate,
          () => this.pickAccountWith(accounts, isProxiedCandidate, keyOfMember),
          input.signal,
          readAppliedKey
        );
        const egressRelease = paced.release;
        account = paced.account;
        appliedEgress.rememberServed(account); // Served (post repick), never acquire-time.
        let result: HttpExecuteResult;
        try {
          const { outcome, waitMs } = await headersWaitDispatch(
            // opt-in bound on the guarded dispatch (stall guard inside the race)
            headersWait,
            account,
            accounts,
            isProxiedCandidate,
            (attemptSignal) =>
              (async () =>
                guardStall(
                  await runWithProxyContext(account.proxy, () =>
                    super.execute({
                      ...input,
                      skipUpstreamRetry: true,
                      signal: attemptSignal ?? input.signal,
                    })
                  )
                ) as Promise<HttpExecuteResult>)(),
            input.signal
          );
          if (outcome.kind !== "ok") {
            if (outcome.kind === "aborted")
              egressPacing.throwPacedError(egressRelease, outcome.reason);
            egressPacing.settleStalledDispatch(egressRelease, account, {
              tried: geoTriedProxyKeys,
              stalled: headersWait.spent,
              cooldown: markCooldown,
              markDirect: () => (directTried = true),
            }); // same settle as the stall arm
            log?.warn?.(
              "OPENCODE",
              `${cid}no response headers within ${waitMs}ms on account ${masked}, rotating to next…`
            );
            continue;
          }
          result = outcome.result;
        } catch (err) {
          if (headersWait.policy.windowMs > 0 && input.signal?.aborted)
            egressPacing.throwPacedError(egressRelease, err); // client abort never rotates, slot released
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
        if (result.response.status !== 429) burstStreak = 0;

        try {
          const status = result.response.status;
          if (status === 429) {
            markCooldown(account);
            const rateKey = proxyKeyOf(account.proxy);
            if (rateKey !== null) rateLimitedProxyKeys.add(rateKey);
            const setAsideMs = appliedEgress.noteRefused(account, skipRecentlyFailed);
            appliedEgress.rememberServed(account);
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
            if (arm === "stop") {
              if (attributionOn && skippedCooldown.size > 0) {
                this.logSkippedCooldownAccounts(log, cid, skippedCooldown);
              }
              return result;
            }
            if (arm === "park") {
              // Slot budget spent: join the park-and-replay path below
              // instead of surfacing the last 429. The park flag can still
              // veto (fail-closed: plain break).
              if (!isOpencodeParkAndResumeEnabled()) break;
              burstStreak = Math.max(burstStreak + 1, BURST_PARK_THRESHOLD);
            } else {
              burstStreak += 1;
            }
            if (!parked && isOpencodeParkAndResumeEnabled()) {
              const marker = await readPoolStrainMarker();
              if (burstStreak >= BURST_PARK_THRESHOLD || marker.fresh) {
                parked = true;
                log?.warn?.(
                  "OPENCODE",
                  `${cid}burstStreak=${burstStreak} freshD2=${marker.fresh} park`
                );
                // local monotone park measure (Date.now diff, integer ms).
                const parkStartMs = Date.now();
                const p = await runParkAndReplay(
                  {
                    execute: (i: ExecuteInput) =>
                      super.execute(i) as Promise<ExecutorExecuteResult & { response: Response }>,
                    markSuccess: (a: ScopedAccount) => markSuccess(a),
                    sleep: this.parkSleep,
                    accounts,
                    replayKeyOfMember: keyOfMember,
                  },
                  input,
                  parkWaitMs(marker.fresh ? marker.ttlLeftMs : null),
                  result,
                  log,
                  cid
                );
                noteParkWait(Date.now() - parkStartMs);
                if (p && p !== result) {
                  if (attributionOn && skippedCooldown.size > 0) {
                    this.logSkippedCooldownAccounts(log, cid, skippedCooldown);
                  }
                  noteReplayed();
                  return this.normalizeMuseSparkResponse(input, p);
                }
                if (p) {
                  discardResponseBody(abandonedResponse);
                  if (attributionOn && skippedCooldown.size > 0) {
                    this.logSkippedCooldownAccounts(log, cid, skippedCooldown);
                  }
                  noteStoredFallback();
                  return this.normalizeMuseSparkResponse(input, result);
                }
              }
            }
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
              if (accounts.length === 1) {
                if (attributionOn && skippedCooldown.size > 0) {
                  this.logSkippedCooldownAccounts(log, cid, skippedCooldown);
                }
                return result;
              }
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
              const rotate = userBlockedRotations === 0 && accounts.length > 1;
              log?.warn?.(
                "OPENCODE",
                `${cid}user_blocked ${status} on account ${masked} (proxy ${key ?? "direct"}), ${rotate ? "rotating to next account once…" : "returning the refusal"}`
              );
              if (!rotate) {
                if (attributionOn && skippedCooldown.size > 0) {
                  this.logSkippedCooldownAccounts(log, cid, skippedCooldown);
                }
                return result;
              }
              userBlockedRotations++;
              abandonedResponse = result.response;
              continue;
            }
            // Free-tier refusal: upstream rejected the REQUEST (client identity or
            // request shape), not this account. Handled in opencodeFreeTierRetry.ts
            // (one bounded retry with observed tools appended, then unchanged return).
            if (bodyText !== null && isOpencodeFreeTierRefusal(status, bodyText)) {
              if (attributionOn && skippedCooldown.size > 0) {
                this.logSkippedCooldownAccounts(log, cid, skippedCooldown);
              }
              return await handleLoopFreeTierRefusal(
                (retried) =>
                  this.finalizeForcedStream(input, this.normalizeMuseSparkResponse(input, retried)),
                input,
                result,
                this.freeTierRetryCtx(input),
                { account, masked, proxyKey: proxyKeyOf(account.proxy) ?? "direct" },
                log,
                cid,
                {
                  dispatch: (retryInput) =>
                    runWithProxyContext(account.proxy, () =>
                      super.execute({ ...retryInput, skipUpstreamRetry: true })
                    ) as Promise<HttpExecuteResult>,
                  noteServed: (a) => noteResponseServed(a as typeof account),
                }
              );
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
            if (attributionOn && skippedCooldown.size > 0) {
              this.logSkippedCooldownAccounts(log, cid, skippedCooldown);
            }
            return result;
          }

          egressPacing.observePacingSuccess(requestPacing, result.response.ok);
          markOutcome(account, result.response);
          if (attributionOn && skippedCooldown.size > 0) {
            this.logSkippedCooldownAccounts(log, cid, skippedCooldown);
          }
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
      if (attributionOn && skippedCooldown.size > 0) {
        this.logSkippedCooldownAccounts(log, cid, skippedCooldown);
      }
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

    this._clientSession = clientSuppliedOpencodeSession(clientHeaders, body);
    if (clientHeaders || cliDefaults) {
      forwardOpencodeClientHeaders(headers, clientHeaders ?? {}, {
        synthesizeRequestId: true,
        cliDefaults,
        sessionBody: projectOpencodeSessionBody(body),
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
      this._clientSession,
      body
    );
    modifiedBody = prepared.body;
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
