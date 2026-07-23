import { AsyncLocalStorage } from "node:async_hooks";

export interface CallLogApiKeyContext {
  apiKeyId: string | null;
  apiKeyName: string | null;
}

const callLogApiKeyContext = new AsyncLocalStorage<CallLogApiKeyContext>();

/**
 * Bind API-key attribution to every call log emitted by one request.
 *
 * Modal handlers fan out into provider-specific helpers that write their own
 * call logs. Request-scoped storage keeps that attribution available without
 * threading identity parameters through every provider handler.
 */
export function runWithCallLogApiKeyContext<TResult>(
  context: CallLogApiKeyContext,
  callback: () => TResult
): TResult {
  return callLogApiKeyContext.run(context, callback);
}

export function getCallLogApiKeyContext(): CallLogApiKeyContext | null {
  return callLogApiKeyContext.getStore() ?? null;
}
