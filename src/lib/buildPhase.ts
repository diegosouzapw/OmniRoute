/**
 * Single source of truth for "are we running inside the Next.js production
 * build?" — a leaf module with zero imports so any layer (db/core, the driver
 * factory, lazy copilot loaders, API routes) can depend on it without creating
 * an import cycle.
 *
 * Three signals, OR'd, because no single one is reliable across every build
 * worker:
 *   - NEXT_PHASE === "phase-production-build": set by Next.js on the main build
 *     process, but Next.js build WORKERS sometimes drop it from process.env.
 *   - OMNIROUTE_BUILDING === "1": set by scripts/build/build-next-isolated.mjs
 *     and inherited by every spawned build worker, so it survives where
 *     NEXT_PHASE does not (#10060).
 *   - npm_lifecycle_event === "build": set by npm when the process was launched
 *     via `npm run build`, a backstop for direct invocations.
 *
 * Evaluated per-call (not memoized) so tests can toggle the env vars and code
 * paths that legitimately mutate them at startup are respected.
 */
export function isNextBuildPhase(): boolean {
  return (
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.OMNIROUTE_BUILDING === "1" ||
    process.env.npm_lifecycle_event === "build"
  );
}
