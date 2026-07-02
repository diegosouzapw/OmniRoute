/**
 * chatCore upstream-error code extractor (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501, PR-020).
 *
 * Pure leaf extracted from `open-sse/handlers/chatCore.ts`. Given any error-shaped value
 * that upstream provider executors may surface (or throw) during a chat request — a real
 * `Error`, a rethrown provider response error, a manual `throw { code: "..." }`, an
 * already-parsed JSON body, or just `null`/`undefined` — it returns the upstream error
 * `code` as a non-empty `string` when one is unambiguously present, and `undefined`
 * otherwise.
 *
 * Why this exists
 * ---------------
 * Several executor failure paths need a stable, comparable identifier so they can:
 *   - log it in `failureUsage` / `log_meta` records (the dashboard picks it up as the
 *     canonical upstream-error reason),
 *   - classify the error into a `providerError` family for the resilience policy
 *     (rate-limit / quota / billing-vs-disabled / overflow / …),
 *   - propagate it to the caller as the `error.code` field of the SSE error frame.
 *
 * In each case the calling code receives the error as `unknown` (executor boundaries
 * normalize away `Error` typing), so it needs a defensive accessor. The previous inline
 * version of this helper did the same narrowing inline on every caller; lifting it here
 * removes the duplication and pins the contract in one place that the test suite can
 * exercise exhaustively.
 *
 * Contract
 * --------
 *   - `null`, `undefined`, primitives (string, number, boolean, bigint, symbol) →
 *     `undefined`.
 *   - Objects without a string-typed `code` field → `undefined`.
 *   - Objects with a `code` of non-string type (number, object, etc.) → `undefined`.
 *   - Objects with an empty-string `code` → `undefined` (the `length > 0` rule; an
 *     empty string is treated as "no code", so callers can default cleanly without an
 *     extra `|| "UNKNOWN"`).
 *   - Objects with a non-empty string `code` → that exact string, unmodified.
 *
 * Side-effect-free: does not mutate the input, does not read module-level state, does
 * not perform I/O. The signature accepts `unknown` so callers can pass `try/catch`
 * payloads (which are typed as `unknown` by TypeScript) without casting.
 *
 * @param error - Any value that may carry an upstream `code` field. Typically the
 *                unknown-shaped payload surfaced by `try { … } catch (err) { … }`, an
 *                executor's `ProviderError`, or a rethrown provider response body.
 * @returns The non-empty upstream error `code` string, or `undefined` when no usable
 *          code is present.
 */
export function getUpstreamErrorIdentifier(error: unknown): string | undefined {
  if (!error || typeof error !== "object") return undefined;
  const value = (error as { code?: unknown }).code;
  return typeof value === "string" && value.length > 0 ? value : undefined;
}
