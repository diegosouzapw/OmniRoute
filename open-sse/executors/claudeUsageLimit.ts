/**
 * claudeUsageLimit.ts — executor-side glue for the Claude OAuth usage wall.
 *
 * Keeps `BaseExecutor.execute()` free of the lower-priority lane's mechanics: this guard
 * owns the per-request wait accounting, the header injection, the abort-aware sleep and the
 * decision logging. The decision itself is the pure state machine in
 * `open-sse/services/claudeLowPriority.ts`; the weekly session-limit reset lives in
 * `open-sse/services/claudeLimitReset.ts`.
 *
 * Both behaviors are opt-in per connection (`providerSpecificData.lowPriorityMode` /
 * `autoLimitReset`) and only ever act on a real 5-hour usage wall — see the module header of
 * claudeLowPriority.ts for the wire contract and the lifecycle.
 */

import { attemptClaudeLimitReset } from "../services/claudeLimitReset.ts";
import {
  CLAUDE_USAGE_LIMIT_HEADER,
  CLAUDE_USAGE_LIMIT_SLOW,
  createClaudeLowPriorityWait,
  handleClaudeUsageLimitResponse,
  isClaudeLowPriorityActive,
  readClaudeUsageLimitConfig,
  resolveClaudeUsageLimitKey,
  type ClaudeLowPriorityWait,
} from "../services/claudeLowPriority.ts";
import type { ExecutorLog, ProviderCredentials } from "./base.ts";

/** Safety margin kept between the last lane wait and the request's own upstream timeout. */
export const CLAUDE_USAGE_LIMIT_WAIT_MARGIN_MS = 5_000;

type GuardResponse = { status: number; headers: Headers };

export type ClaudeUsageLimitRetryInput = {
  credentials?: ProviderCredentials | null;
  signal?: AbortSignal | null;
  /** The request's upstream-start timeout; 0/undefined means "unbounded". */
  budgetMs?: number;
  /** Whether THIS request went out carrying the slow header (see `sentSlow` in the service). */
  sentSlow: boolean;
};

/** True for a native Claude connection authenticated with a subscription OAuth token. */
function isClaudeOAuth(provider: string, credentials?: ProviderCredentials | null): boolean {
  return (
    provider === "claude" &&
    typeof credentials?.accessToken === "string" &&
    credentials.accessToken.startsWith("sk-ant-oat") &&
    !credentials?.apiKey
  );
}

/** Sleep that rejects as soon as the request is aborted, so a lane wait never outlives it. */
function abortableSleep(delayMs: number, signal?: AbortSignal | null): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, delayMs);
    const onAbort = () => {
      clearTimeout(timer);
      reject(signal?.reason ?? new DOMException("Aborted", "AbortError"));
    };
    if (signal?.aborted) return onAbort();
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

/** One instance per `execute()` call: the wait window spans the intra-URL retries. */
export class ClaudeUsageLimitGuard {
  private readonly wait: ClaudeLowPriorityWait = createClaudeLowPriorityWait();
  private readonly startedAtMs = Date.now();
  private key: string | null = null;

  constructor(
    private readonly provider: string,
    private readonly log?: ExecutorLog | null
  ) {}

  /**
   * Stamp `anthropic-usage-limit: slow` when this connection's lane is active. Returns
   * whether the header went out, which the response side needs to tell a lane verdict from
   * a header-less sibling's outcome.
   */
  applyHeader(headers: Record<string, string>, credentials?: ProviderCredentials | null): boolean {
    this.key = isClaudeOAuth(this.provider, credentials)
      ? resolveClaudeUsageLimitKey(credentials ?? {})
      : null;
    if (this.key === null || !isClaudeLowPriorityActive(this.key)) return false;
    headers[CLAUDE_USAGE_LIMIT_HEADER] = CLAUDE_USAGE_LIMIT_SLOW;
    return true;
  }

  /**
   * Classify an upstream response. Resolves true when the caller must retry the SAME
   * account (the sleep, if any, has already happened) instead of surfacing the response.
   */
  async shouldRetry(
    response: GuardResponse,
    url: string,
    input: ClaudeUsageLimitRetryInput
  ): Promise<boolean> {
    if (this.key === null) return false;
    const key = this.key;
    const credentials = input.credentials;
    const decision = await handleClaudeUsageLimitResponse({
      key,
      config: readClaudeUsageLimitConfig(credentials?.providerSpecificData),
      response,
      wait: this.wait,
      sentSlow: input.sentSlow,
      waitCeilingMs: this.waitCeilingMs(input.budgetMs),
      claimLimitReset: () =>
        attemptClaudeLimitReset({
          key,
          accessToken: credentials?.accessToken ?? "",
          providerSpecificData: credentials?.providerSpecificData,
          log: this.log,
        }).then((attempt) => attempt.reset),
    });

    if (decision.kind === "ended") {
      this.log?.info?.("CLAUDE_LOW_PRIORITY", `lane ended (${decision.reason}) on ${url}`);
      return false;
    }
    if (decision.kind !== "retry") return false;

    this.log?.info?.(
      "CLAUDE_LOW_PRIORITY",
      `${decision.via} on ${url} — retrying same account in ${decision.delayMs}ms`
    );
    if (decision.delayMs > 0) await abortableSleep(decision.delayMs, input.signal);
    return true;
  }

  /**
   * What is left of the request's upstream timeout, minus a safety margin. Without this the
   * server-announced max-wait (20 min by default, up to 6 h) outlives the request and the
   * sleep is aborted mid-wait, surfacing a TimeoutError instead of the graceful `max_wait`
   * end plus its cool-off.
   */
  private waitCeilingMs(budgetMs?: number): number | undefined {
    if (!budgetMs || budgetMs <= 0) return undefined;
    const elapsed = Date.now() - this.startedAtMs;
    return Math.max(0, budgetMs - elapsed - CLAUDE_USAGE_LIMIT_WAIT_MARGIN_MS);
  }
}
