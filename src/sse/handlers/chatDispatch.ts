/**
 * Dispatch seam between chat.ts and executeChatWithBreaker, extracted so the
 * frozen god-file `chat.ts` does not grow (check:file-size).
 *
 * Its only job beyond forwarding the call is the #6219 follow-up: when a combo
 * per-model timeout abandons the account this session is pinned to, drop the
 * pin. See `evictSessionAffinityOnComboTimeout` for why the existing #6219
 * eviction never covers this path.
 */

import { executeChatWithBreaker } from "./chatHelpers";
import { resolveDispatchClientRawRequest } from "./chat/clientRawRequest.ts";
import { evictSessionAffinityOnComboTimeout } from "../services/sessionAffinityPin";

/** The dispatch arguments chat.ts already assembles, plus what the eviction reads. */
type DispatchArgs = {
  provider: string;
  credentials: { connectionId: string };
  clientRawRequest: any;
  [key: string]: unknown;
};

/** Runtime fields this seam consults; the rest of runtimeOptions is ignored. */
type DispatchRuntimeOptions = {
  sessionAffinityKey?: string | null;
  modelAbortSignal?: AbortSignal | null;
};

/**
 * Merge the per-model abort signal into the outgoing request, run the upstream
 * dispatch, and evict the sticky session pin when a combo per-model timeout
 * abandons it.
 *
 * The abort surfaces two ways: as a rejection out of `executeChatWithBreaker`
 * (the common case — `buildTargetTimeoutRunner` then swallows it behind its
 * synthetic 524), or as a failed result when an executor catches the abort
 * itself. Both are covered. The eviction is a no-op unless this dispatch was
 * aborted by the per-model timeout specifically.
 */
export async function dispatchChatWithAffinityEviction(
  args: DispatchArgs,
  runtimeOptions: DispatchRuntimeOptions
): Promise<Awaited<ReturnType<typeof executeChatWithBreaker>>> {
  const evict = () =>
    evictSessionAffinityOnComboTimeout({
      sessionKey: runtimeOptions.sessionAffinityKey,
      provider: args.provider,
      connectionId: args.credentials?.connectionId,
      modelAbortSignal: runtimeOptions.modelAbortSignal,
    });

  let dispatched: Awaited<ReturnType<typeof executeChatWithBreaker>>;
  try {
    dispatched = await executeChatWithBreaker({
      ...args,
      clientRawRequest: resolveDispatchClientRawRequest(
        args.clientRawRequest,
        runtimeOptions.modelAbortSignal
      ),
    });
  } catch (dispatchErr) {
    evict();
    throw dispatchErr;
  }

  // A resource-pressure short-circuit (no upstream dispatch happened) is not a
  // combo per-model timeout — never treat it as one.
  if ("localResourcePressureResult" in dispatched) return dispatched;

  if (!dispatched.result?.success) evict();
  return dispatched;
}
