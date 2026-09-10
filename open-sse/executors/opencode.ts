import { randomUUID } from "node:crypto";
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
import { forwardOpencodeClientHeaders } from "../utils/opencodeHeaders.ts";
import {
  type AccountProxyConfig,
  type RotatableAccount,
  pickAccount as pickRotatableAccount,
  markCooldown as markAccountCooldown,
  markSuccess as markAccountSuccess,
  maskAccountId,
  isNetworkErrorRotatable,
  isEmptyUpstreamRejection,
  extractChatcmplId,
} from "./accountRotation.ts";
import { isNetworkRotationSharedEgressGuardEnabled } from "@/shared/utils/featureFlags";

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

  /**
   * Per-account rotation state, rebuilt from credentials on each request. The
   * default entry (fingerprint "") represents the single anonymous account with
   * no configured proxy — preserves the historical direct pass-through when the
   * user has not configured any per-account proxy.
   */
  private accounts: OpencodeAccountState[] = [
    { fingerprint: "", cooldownUntil: 0, consecutiveFails: 0, proxy: null },
  ];
  // Not `private`: passed as the mutable rotation cursor to the shared
  // pickAccount() helper, which needs a plain `{ nextAccountIdx }` shape —
  // TS's private-member nominal check rejects `this` there otherwise.
  nextAccountIdx = 0;

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

  /** Round-robin pick, skipping accounts in cooldown; falls back to the next index. */
  private pickAccount(): OpencodeAccountState {
    return pickRotatableAccount(this.accounts, this);
  }

  private markCooldown(
    account: OpencodeAccountState,
    kind: "transient" | "terminal" = "transient"
  ): void {
    markAccountCooldown(account, kind);
  }

  private markSuccess(account: OpencodeAccountState): void {
    markAccountSuccess(account);
  }

  /**
   * Rewrite muse-spark's bogus `finish_reason:"length"` (see the
   * normalizeMuseSparkFinishReason note) to `"stop"` on both streaming and
   * non-streaming success responses. Non-muse-spark models pass through
   * untouched.
   */
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

      const hasProxies = this.accounts.some((a) => a.proxy !== null);
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
        const single = (await (hasAmbientProxyContext()
          ? dispatch()
          : runWithDirectFetchContext(dispatch))) as HttpExecuteResult;
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
                `upstream empty rejection on direct account (${chatcmplId}), retrying once…`
              );
              return this.normalizeMuseSparkResponse(input, await super.execute(input));
            }
            log?.debug?.(
              "OPENCODE",
              "400 without error field, signature not matched on direct account — observing"
            );
          }
        }
        return this.normalizeMuseSparkResponse(input, single);
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

      for (let attempt = 0; attempt < this.accounts.length + emptyRejectionBudget; attempt++) {
        const account = this.pickAccount();
        const masked = maskAccountId(account.fingerprint);

        if (sharedEgressGuardEnabled && sharedEgressDown && !account.proxy) {
          log?.warn?.(
            "OPENCODE",
            `skipping account ${masked} (no dedicated proxy, shared egress already down this request)`
          );
          continue;
        }

        // #5217 (Gap 2): promoted debug→info so the per-request account/proxy
        // rotation selection is visible in the Console log view at the default
        // APP_LOG_LEVEL=info (users could not see which account/proxy was used).
        // Token stays masked — never log the full account id.
        log?.info?.(
          "OPENCODE",
          `dispatch via account ${masked} (idx ${attempt + 1}/${this.accounts.length})` +
            (account.proxy
              ? ` through proxy ${account.proxy.host}:${account.proxy.port}`
              : " direct")
        );

        // Pin egress to this account's proxy for the whole BaseExecutor dispatch
        // (incl. its intra-URL 429 retries). skipUpstreamRetry lets THIS loop own
        // the cross-account 429 fallback instead of BaseExecutor's same-key retry.
        let result: HttpExecuteResult;
        try {
          // super.execute() here always dispatches the HTTP path (opencode is an
          // OpenAI-compatible API, never the web/scraping bare-Response arm) —
          // see base.ts:290-294.
          result = (await runWithProxyContext(account.proxy, () =>
            super.execute({ ...input, skipUpstreamRetry: true })
          )) as HttpExecuteResult;
        } catch (err) {
          const reason = err instanceof Error ? err.message : String(err);
          // A network exception (timeout, connection refused/reset) is only
          // account-scoped when this account has its OWN egress (a configured
          // proxy) — that's the case a dead/unreachable proxy justifies rotating
          // away from. Without a proxy, accounts share the same network egress:
          // the failure isn't attributable to this account. Never swallowed
          // silently either way: logged before rotating, skipping, or rethrowing.
          if (!isNetworkErrorRotatable(account)) {
            if (sharedEgressGuardEnabled) {
              this.markCooldown(account);
              sharedEgressDown = true;
              lastSharedEgressError = err;
              log?.warn?.(
                "OPENCODE",
                `network error on account ${masked} (no dedicated proxy, shared egress), cooldown applied — trying next available account… (${reason})`
              );
              continue;
            }
            log?.warn?.(
              "OPENCODE",
              `network error on account ${masked} (no dedicated proxy, shared egress) — not rotating (${reason})`
            );
            throw err;
          }
          this.markCooldown(account);
          log?.warn?.(
            "OPENCODE",
            `network error on account ${masked}, rotating to next… (${reason})`
          );
          continue;
        }
        lastResult = result;

        const status = result.response.status;
        if (status === 429) {
          this.markCooldown(account);
          log?.warn?.("OPENCODE", `Rate limited (429) on account ${masked}, rotating to next…`);
          continue;
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
          if (bodyText !== null && isEmptyUpstreamRejection(400, bodyText)) {
            const chatcmplId = extractChatcmplId(bodyText);
            log?.warn?.(
              "OPENCODE",
              `upstream empty rejection on account ${masked} (${chatcmplId}), rotating to next…`
            );
            continue;
          }
          // A 400 carrying a real error (or non-empty content): propagate
          // immediately, untouched — same as before this change.
          this.markSuccess(account);
          return result;
        }

        this.markSuccess(account);
        return this.normalizeMuseSparkResponse(input, result);
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
      return this.normalizeMuseSparkResponse(input, lastResult ?? (await super.execute(input)));
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
      if (this._requestFormat === "claude") {
        headers["x-api-key"] = key;
      } else {
        headers["Authorization"] = `Bearer ${key}`;
      }
    }

    if (this._requestFormat === "claude") {
      headers["anthropic-version"] = "2023-06-01";
    }

    if (stream) {
      headers["Accept"] = "text/event-stream";
    }

    // Synthesize OpenCode CLI identity headers by default so Cloudflare in front of
    // opencode.ai/zen doesn't 429 VPS requests lacking CLI identity. Opt-out via
    // OPENCODE_SYNTHESIZE_CLI_HEADERS=false. Client-supplied headers always win;
    // User-Agent is replaced with the CLI UA unless the client already sends one that
    // looks like the OpenCode CLI. Default values match 9router's proven defaults.
    const synthesizeCli = !/^(0|false|no|off)$/i.test(
      process.env.OPENCODE_SYNTHESIZE_CLI_HEADERS?.trim() ?? ""
    );
    const cliDefaults = synthesizeCli
      ? (() => {
          const providerId = this.config?.id || this.provider || "opencode";
          const envUAKey = `${providerId.toUpperCase().replace(/[^A-Z0-9]/g, "_")}_USER_AGENT`;
          return {
            userAgent:
              process.env[envUAKey]?.trim() ||
              process.env.OPENCODE_USER_AGENT?.trim() ||
              "opencode",
            client: process.env.OPENCODE_CLIENT?.trim() || "desktop",
            project: process.env.OPENCODE_PROJECT?.trim() || "global",
          };
        })()
      : undefined;

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
              tools: Array.isArray(b.tools)
                ? (b.tools as Array<{ name?: string; function?: { name?: string } }>)
                : undefined,
            }
          : undefined,
      });
    }

    // Muse's Responses endpoint rejects the short conversation fingerprint used
    // by the Chat endpoint in practice. Keep the workaround scoped to Muse.
    if (
      this._requestFormat === "openai-responses" &&
      model.startsWith("muse-spark") &&
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        headers["x-opencode-session"] || ""
      )
    ) {
      headers["x-opencode-session"] = randomUUID();
    }

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
