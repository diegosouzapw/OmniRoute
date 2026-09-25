/**
 * Server-free bounds and shape for opt-in per-model concurrency ceilings
 * (`rateLimitOverrides.modelConcurrency`).
 *
 * Lives under `@/shared` (not `@/lib/db/providers/columns`) so client-reachable
 * validation schemas can import the constants without dragging the server
 * runtime (→ ioredis) into the browser/CLI bundle — the same reason
 * `spawnCapablePrefixes.ts` lives here. `columns.ts` and the dashboard parser
 * reuse these instead of re-declaring them.
 */

/**
 * Per-model upstream concurrency ceilings, keyed by the exact model string
 * passed to the executor after routing resolution (normally the bare upstream
 * model id, e.g. "glm-5"). Values are positive-integer concurrent-request
 * ceilings. Optional; absent means no model-specific gate.
 */
export type ModelConcurrencyMap = Record<string, number>;

/**
 * Bounds for `modelConcurrency` entries. Keys are bounded so a malicious payload
 * can't bloat the DB row with megabyte-long model ids; caps are positive
 * integers with the same ceiling as the scalar `maxConcurrent` override (10_000).
 */
export const MODEL_CONCURRENCY_MAX_KEY_LENGTH = 128;
export const MODEL_CONCURRENCY_MAX_CAP = 10_000;
