import type { default as BaseExecutorType } from "./base.ts";
import {
  configuredPlaceholderToolNames,
  isGatedFreeTierRequest,
  mergeClientToolsWithObserved,
  type OpencodeSurface,
} from "./opencodeFreeTierContract.ts";
import { isOpencodeFreeTierRefusal } from "./opencodeGeoBlock.ts";
import { resolveOpencodeTargetFormat } from "./opencode.ts";

type ExecutorInput = Parameters<BaseExecutorType["execute"]>[0];
type ExecutorLog = ExecutorInput["log"];
type DispatchFn = (retryInput: ExecutorInput) => Promise<{ response: Response }>;

/**
 * One bounded retry after a free-tier refusal on a gated request that carried
 * the caller's own tools (not borrowed): rebuild the upstream body with the
 * observed tool names appended and dispatch once more. Returns the retry
 * result, or null when no retry applies (not a refusal, not gated, borrowed
 * tools, or nothing observed to add). A retry that also fails returns the
 * ORIGINAL refusal — and never touches the observation store, since the names
 * under test came from the client, not from the store (see
 * `noteRefusedBorrowedToolNames`, which deliberately ignores own-tools
 * refusals for the same reason).
 */
type RetryCtx = {
  surface: OpencodeSurface;
  provider: string;
  requestFormat: string | null;
  clientSession: string | undefined;
  borrowed: boolean | undefined;
  clientToolNames: readonly string[];
};

/** Scope guards: refusal status, gated surface+model, own (non-borrowed) tools, object body. */
function retryScopeApplies(
  ctx: RetryCtx,
  input: ExecutorInput,
  status: number
): boolean {
  if (status !== 403 && status !== 451) return false;
  if (!isGatedFreeTierRequest(ctx.surface, ctx.provider, String(input.model ?? ""))) return false;
  // Borrowed tools are the store's own names coming back: the retry would add
  // nothing, and the refusal is already counted by noteFreeTierOutcome below.
  if (ctx.borrowed) return false;
  return !!input.body && typeof input.body === "object" && !Array.isArray(input.body);
}

/** Read the refusal body; null when unreadable or not a free-tier refusal. */
async function readRefusalBody(
  first: { response: Response },
  status: number,
  log: ExecutorLog
): Promise<string | null> {
  try {
    const text = await first.response.clone().text();
    return isOpencodeFreeTierRefusal(status, text) ? text : null;
  } catch {
    log?.debug?.("OPENCODE", "body read failed on free-tier retry check");
    return null;
  }
}

export async function retryFreeTierRefusalWithObservedTools(
  ctx: RetryCtx,
  input: ExecutorInput,
  first: { response: Response },
  log: ExecutorLog,
  cid: string,
  dispatch: DispatchFn
): Promise<{ response: Response } | null> {
  const status = first.response.status;
  if (!retryScopeApplies(ctx, input, status)) return null;
  const merged = mergeClientToolsWithObserved(
    input.body,
    ctx.requestFormat ?? resolveOpencodeTargetFormat(ctx.provider, String(input.model ?? "")),
    ctx.provider,
    String(input.model ?? ""),
    ctx.clientSession,
    configuredPlaceholderToolNames()
  );
  if (merged === input.body) return null;
  if ((await readRefusalBody(first, status, log)) === null) return null;
  log?.warn?.(
    "OPENCODE",
    `${cid}free-tier refusal on own tools [${ctx.clientToolNames.join(",")}], retrying once with observed names appended…`
  );
  const retry = await dispatch({ ...input, body: merged });
  if (!retry.response.ok) return { response: first.response };
  return retry;
}

/**
 * Serve the rotation loop's free-tier arm: try the observed-tools retry on the
 * same account proxy, else return the refusal untouched with account health
 * unchanged (no cooldown, no success — the request, not the account, was
 * rejected; rotating would only add latency since every sibling gets the same
 * verdict). The executor callback reuses the loop's own finalize path so the
 * retry result is shaped exactly like a first-dispatch result.
 */
type ShapedResult = { response: Response } | Response;

export async function handleLoopFreeTierRefusal(
  shape: (retried: { response: Response }) => ShapedResult,
  input: ExecutorInput,
  result: { response: Response },
  ctx: RetryCtx,
  account: { account: unknown; masked: string; proxyKey: string },
  log: ExecutorLog,
  cid: string,
  hooks: {
    dispatch: (retryInput: ExecutorInput) => Promise<{ response: Response }>;
    noteServed: (account: unknown) => void;
  }
): Promise<ShapedResult> {
  const retried = await retryFreeTierRefusalWithObservedTools(
    ctx,
    input,
    result,
    log,
    cid,
    hooks.dispatch
  );
  if (retried) {
    return shape(retried);
  }
  log?.warn?.(
    "OPENCODE",
    `${cid}free-tier refusal ${result.response.status} on account ${account.masked} (proxy ${account.proxyKey}), returning it unchanged (request-scoped, no rotation)`
  );
  hooks.noteServed(account.account);
  return result;
}
