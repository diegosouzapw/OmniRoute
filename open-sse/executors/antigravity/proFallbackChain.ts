// Pure Pro-family fallback-chain decision helpers for the Antigravity executor (#7290):
// decide what execute()'s per-candidate loop does after executeOnce() throws or
// returns a 400, without depending on executor instance state (no `this`).
// Extracted from antigravity.ts (file-size cap) -- mirrors the existing
// antigravity/sseCollect.ts submodule pattern.
import type { ExecuteInput } from "../base.ts";

/** Shape of one execute()/executeOnce() result (kept local to avoid importing the class). */
export type AntigravityExecuteResult = {
  response: Response;
  url: string;
  headers: Record<string, string>;
  transformedBody: unknown;
};

/** True for an aborted request (caller disconnect) — never retried across candidates. */
export function isAntigravityAbortError(input: ExecuteInput, error: unknown): boolean {
  return Boolean(
    input.signal?.aborted ||
      (error instanceof DOMException && error.name === "AbortError") ||
      (error instanceof Error && error.name === "AbortError")
  );
}

export type AntigravityFallbackChainErrorOutcome =
  | { action: "throw"; error: unknown }
  | { action: "return"; result: AntigravityExecuteResult }
  | { action: "continue" };

/**
 * Decide what execute()'s Pro-fallback loop does after executeOnce() THROWS for one
 * candidate: propagate an abort immediately, retry the next candidate, surface the
 * first 400 if the chain is exhausted, or throw a chain-exhausted error.
 */
export function handleAntigravityFallbackChainError(
  input: ExecuteInput,
  error: unknown,
  candidate: string,
  i: number,
  chain: readonly string[],
  firstResult: AntigravityExecuteResult | null,
  resolvedUpstreamId: string
): AntigravityFallbackChainErrorOutcome {
  // Abort signal (user disconnect) — propagate immediately, do not retry.
  if (isAntigravityAbortError(input, error)) {
    return { action: "throw", error };
  }
  if (i < chain.length - 1) {
    input.log?.debug?.(
      "AG_PRO_FALLBACK",
      `Exception on "${candidate}" (${error instanceof Error ? error.message : String(error)}) -- retrying with next Pro candidate "${chain[i + 1]}"`
    );
    return { action: "continue" };
  }
  // Last candidate also threw -- return original 400 if available, otherwise throw.
  if (firstResult) {
    input.log?.warn?.(
      "AG_PRO_FALLBACK",
      `Pro fallback chain exhausted (last candidate threw, but first candidate returned 400) for "${resolvedUpstreamId}". Returning original 400.`
    );
    return { action: "return", result: firstResult };
  }
  return {
    action: "throw",
    error: new Error(
      `Pro fallback chain exhausted (all ${chain.length} candidates failed). Last error: ${error instanceof Error ? error.message : String(error)}`
    ),
  };
}

export type AntigravityFallback400Outcome =
  | { action: "return"; result: AntigravityExecuteResult }
  | { action: "continue" };

/**
 * Decide what execute()'s Pro-fallback loop does after one candidate returns a 400:
 * retry the next candidate, or (chain exhausted) surface the first candidate's
 * sanitized 400.
 */
export function handleAntigravityFallback400(
  input: ExecuteInput,
  result: AntigravityExecuteResult,
  firstResult: AntigravityExecuteResult | null,
  candidate: string,
  i: number,
  chain: readonly string[],
  resolvedUpstreamId: string
): AntigravityFallback400Outcome {
  const isLast = i === chain.length - 1;
  if (!isLast) {
    input.log?.debug?.(
      "AG_PRO_FALLBACK",
      `400 on "${candidate}" — retrying with next Pro candidate "${chain[i + 1]}"`
    );
    return { action: "continue" };
  }

  // Chain exhausted: surface the FIRST candidate's sanitized 400.
  input.log?.warn?.(
    "AG_PRO_FALLBACK",
    `Pro fallback chain exhausted (all ${chain.length} candidates 400'd) for "${resolvedUpstreamId}"`
  );
  return { action: "return", result: firstResult ?? result };
}
