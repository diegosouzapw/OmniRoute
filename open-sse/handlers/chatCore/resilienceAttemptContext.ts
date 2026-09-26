import { runWithResilienceActionsContext } from "@/lib/usage/resilienceActionsContext.ts";

/**
 * one implicit resilience store per attempt. Combo legs each run
 * handleChatCore, so each leg gets its own isolated store. The public
 * signature stays single-arg (forwarded verbatim); no per-caller change.
 */
export function withResilienceActionsContext<TArgs extends unknown[], TResult>(
  args: TArgs,
  inner: (...innerArgs: TArgs) => TResult
): TResult {
  return runWithResilienceActionsContext(() => inner(...args));
}
