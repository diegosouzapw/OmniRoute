/**
 * Flush-empty-retry loop, extracted from chatCore so the credential swap
 * and its rollback live in one place (#14715).
 *
 * The loop retries an empty upstream turn on a different connection. The
 * original connection must survive a retry that is rejected: the caller
 * keeps the original response in that case, so later usage, call-log, and
 * rate-limit writes have to stay on the connection that produced it.
 */
import { getProviderCredentials as defaultGetProviderCredentials } from "@/sse/services/auth";
import { maybeConvertJsonBodyToSse } from "./jsonBodyToSse.ts";
import { ensureStreamReadiness } from "../../utils/streamReadiness.ts";
import {
  formatBufferedVerdictLog,
  judgeBufferedTurn,
  readBoundedResponseOutcome,
  FLUSH_EMPTY_RETRY_MAX_BYTES,
  pickEmptyTurnRetryCredentials,
  type RetryRouting,
} from "../../utils/emptyTurnRetry.ts";
import { noteBufferedVerdictOutcome } from "./emptyTurnResilienceNotes.ts";
import { STREAM_RECOVERY } from "../../config/constants.ts";

type LoggerLike = {
  info?: (...args: unknown[]) => void;
  warn?: (...args: unknown[]) => void;
  debug?: (...args: unknown[]) => void;
} | null;

type Verdict = ReturnType<typeof judgeBufferedTurn>;

export interface EmptyTurnRetryDeps {
  providerResponse: Response;
  credentials: Record<string, unknown>;
  provider: string;
  currentModel: string;
  model: string;
  targetFormat: string;
  clientResponseFormat: string;
  /** Re-read on every iteration: the client can disconnect between retries. */
  isAborted: () => boolean;
  timeoutMs: number;
  maxTimeoutMs: number;
  maxRetries?: number;
  translatedBody: unknown;
  /** The body already captured for the original request; returned unchanged when no retry is adopted. */
  finalBody: unknown;
  providerUrl: string;
  providerHeaders: Record<string, string>;
  correlationId: string | null;
  traceId: string | null;
  log: LoggerLike;
  getProviderCredentials?: typeof defaultGetProviderCredentials;
  /**
   * Routing constraints of the original selection (#14715): a managed lease or a
   * pinned connection replays itself, and the key's connection allowlist bounds
   * the retry. Absent = no constraint (the connection that served the turn is
   * still excluded first).
   */
  routing?: RetryRouting;
  executeProviderRequest: (model: string, allowDedup: boolean) => Promise<unknown>;
  noteOutcome?: typeof noteBufferedVerdictOutcome;
  logTargetRequest: (url: string, headers: Record<string, string>, body: unknown) => void;
  captureBody: (body: unknown) => unknown;
}

export interface EmptyTurnRetryResult {
  providerResponse: Response;
  finalBody: unknown;
  adopted: boolean;
}

export async function runEmptyTurnRetryLoop(
  deps: EmptyTurnRetryDeps
): Promise<EmptyTurnRetryResult> {
  const maxRetries = deps.maxRetries ?? STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX;
  const note = deps.noteOutcome ?? noteBufferedVerdictOutcome;
  // Named `getProviderCredentials` so the hard-session-lease inventory still sees this call site.
  const getProviderCredentials = deps.getProviderCredentials ?? defaultGetProviderCredentials;
  let providerResponse = deps.providerResponse;
  let finalBody: unknown = deps.finalBody;
  let adopted = false;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const verdict = judgeBufferedTurn(
      await readBoundedResponseOutcome(
        providerResponse,
        FLUSH_EMPTY_RETRY_MAX_BYTES,
        deps.timeoutMs
      ),
      deps.targetFormat,
      deps.clientResponseFormat,
      deps.isAborted()
    );
    if (verdict.kind === "pass") {
      notePass(deps, note, verdict);
      break;
    }
    if (attempt >= maxRetries) {
      noteBudgetExhausted(deps, note, verdict);
      break;
    }
    const adoptedRetry = await attemptRetry(
      deps,
      providerResponse,
      getProviderCredentials,
      note,
      verdict
    );
    if (!adoptedRetry) break;
    providerResponse = adoptedRetry.response;
    finalBody = adoptedRetry.body;
    adopted = true;
  }

  return { providerResponse, finalBody, adopted };
}

function notePass(
  deps: EmptyTurnRetryDeps,
  note: typeof noteBufferedVerdictOutcome,
  verdict: Verdict
): void {
  const line = formatBufferedVerdictLog(verdict, deps.correlationId ?? "", deps.traceId ?? "");
  deps.log?.[line.level]?.("FLUSH_EMPTY_RETRY", line.line);
  note(verdict, null, false);
}

function noteBudgetExhausted(
  deps: EmptyTurnRetryDeps,
  note: typeof noteBufferedVerdictOutcome,
  verdict: Verdict
): void {
  deps.log?.warn?.("FLUSH_EMPTY_RETRY", "retry budget exhausted, falling back to current behavior");
  note(verdict, null, true);
}

interface AdoptedRetry {
  response: Response;
  body: unknown;
}

async function attemptRetry(
  deps: EmptyTurnRetryDeps,
  currentResponse: Response,
  getProviderCredentials: typeof defaultGetProviderCredentials,
  note: typeof noteBufferedVerdictOutcome,
  verdict: Verdict
): Promise<AdoptedRetry | null> {
  deps.log?.warn?.(
    "FLUSH_EMPTY_RETRY",
    `${"reason" in verdict ? verdict.reason : "empty turn"}, bounded retry through the normal credential path`
  );
  note(
    verdict,
    { level: "warn", line: "reason" in verdict ? verdict.reason : "empty turn" },
    false
  );

  // A direct getProviderCredentials call (not a bare reference) keeps this site in the
  // hard-session-lease inventory; the retry is fenced by executeProviderRequest().
  const selectRetryCredentials = (
    provider: string,
    excludeConnectionId: string | null,
    allowedConnections: string[] | null,
    requestedModel: string | null
  ) => getProviderCredentials(provider, excludeConnectionId, allowedConnections, requestedModel);
  const nextCreds = (await pickEmptyTurnRetryCredentials(selectRetryCredentials, {
    ...(deps.routing ?? { leased: false, forcedConnectionId: null, apiKey: null }),
    provider: deps.provider,
    model: deps.currentModel,
    current: deps.credentials,
  })) as { connectionId?: string } | null;
  if (!nextCreds?.connectionId) return null;

  const snapshot = { ...deps.credentials };
  Object.assign(deps.credentials, nextCreds);
  const retryConnectionId = String(nextCreds.connectionId);
  deps.log?.info?.("FLUSH_EMPTY_RETRY", `retrying on ${retryConnectionId}`);

  const prepared = await runRetryRequest(deps, currentResponse);
  if (!prepared) {
    restoreCredentials(deps.credentials, snapshot);
    return null;
  }
  return prepared;
}

function restoreCredentials(
  credentials: Record<string, unknown>,
  snapshot: Record<string, unknown>
): void {
  for (const key of Object.keys(credentials)) {
    if (!(key in snapshot)) delete credentials[key];
  }
  Object.assign(credentials, snapshot);
}

async function runRetryRequest(
  deps: EmptyTurnRetryDeps,
  currentResponse: Response
): Promise<AdoptedRetry | null> {
  // Cancel the response this iteration judged (the original on the first retry, the
  // previously adopted retry afterwards), not always the original one.
  await currentResponse.body?.cancel().catch(() => {});
  let retryResult: unknown = null;
  try {
    retryResult = await deps.executeProviderRequest(deps.currentModel, false);
  } catch {
    return null;
  }
  const retryResponse = (retryResult as { response?: Response })?.response;
  if (!retryResponse?.ok || !retryResponse.body) {
    if (retryResponse) await retryResponse.body?.cancel().catch(() => {});
    return null;
  }
  const prepared = await maybeConvertJsonBodyToSse(retryResponse, {
    log: deps.log,
    provider: deps.provider,
    model: deps.model,
  });
  const ready = prepared.ok
    ? await ensureStreamReadiness(prepared, {
        timeoutMs: deps.timeoutMs,
        maxTimeoutMs: deps.maxTimeoutMs,
        provider: deps.provider,
        model: deps.model,
        log: deps.log,
      })
    : null;
  const preparedStream = ready && ready.ok ? ready.response : null;
  if (!preparedStream) {
    await retryResponse.body?.cancel().catch(() => {});
    return null;
  }
  const body = deps.captureBody(
    (retryResult as { transformedBody?: unknown })?.transformedBody ?? deps.translatedBody
  );
  deps.logTargetRequest(deps.providerUrl, deps.providerHeaders, body);
  return { response: preparedStream, body };
}
