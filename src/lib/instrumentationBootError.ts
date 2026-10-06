/**
 * Normalize any thrown/rejected value into a real `Error` instance.
 *
 * Next.js's own `registerInstrumentation()` wrapper (see
 * `node_modules/next/dist/server/lib/router-utils/instrumentation-globals.external.js`)
 * unconditionally does `err.message = \`...${err.message}\`` on whatever our
 * `register()` export (`src/instrumentation.ts`) rejects with, assuming it is
 * always an `Error`. If a raw non-Error primitive bubbles up instead (e.g.
 * sql.js's WASM adapter throws the bare string `"Database closed"` — see
 * `./db/adapters/sqljsAdapter.ts`), that assignment throws `TypeError: Cannot
 * create property 'message' on string '...'` in strict mode, masking the
 * original error and crashing the whole server on every boot (#6560).
 * Normalizing before it leaves our code guarantees Next always receives
 * something `.message`-assignable.
 *
 * Deliberately dependency-free (no imports) so both `src/instrumentation.ts`
 * (the shared Edge+Node instrumentation entry point) and
 * `src/instrumentation-node.ts` (the Node-only boot sequence) can import it
 * statically without pulling Node-specific modules (fs/path/os/better-sqlite3
 * etc.) into the Edge runtime bundle, and without relying on a dynamic
 * `import("./instrumentation-node")` that could itself be the thing that
 * failed to load (#10171).
 */
export function normalizeBootError(err: unknown): Error {
  return err instanceof Error ? err : new Error(String(err));
}
