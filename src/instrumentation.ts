/**
 * Next.js Instrumentation Hook
 *
 * Called once when the server starts (both dev and production).
 * All Node.js-specific logic lives in ./instrumentation-node.ts to prevent
 * Turbopack's Edge bundler from tracing into native modules (fs, path, os, etc.)
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

import { normalizeBootError } from "@/lib/instrumentationBootError";

/**
 * `registerNodejsFn` is only for tests to inject a fake without module-mocking
 * (`node:test` does not support `mock.module` reliably here) — mirrors the
 * same injection pattern as `ensureDbReadyForBoot` in `./instrumentation-node`.
 */
export async function register(registerNodejsFn?: () => Promise<void>) {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      // Literal path so Webpack emits the chunk (computed string breaks dev:
      // MODULE_NOT_FOUND for ./instrumentation-node at runtime).
      // Turbopack may still avoid tracing this into Edge when guarded by NEXT_RUNTIME.
      const registerNodejs =
        registerNodejsFn ?? (await import("./instrumentation-node")).registerNodejs;
      await registerNodejs();
    } catch (err: unknown) {
      // Outermost boot boundary (#10171): any throw during module-load of
      // ./instrumentation-node OR anywhere inside registerNodejs() runs
      // BEFORE initConsoleInterceptor() is wired up. ensureDbReadyForBoot's
      // own #7773 guard already logs one specific failure class (DB driver
      // init), but it does not cover a throw that happens before it is even
      // reached (e.g. a module-load-time error importing ./instrumentation-node
      // itself, as reported on native Windows/WSL2 boots). Without an
      // unconditional log line here, the process can keep its HTTP listener
      // up while every DB-touching route 500s forever with a permanently
      // empty app.log. This guarantees stdout/app.log is never silently
      // empty on a failed boot, regardless of platform or which step threw.
      // Reuses the same normalizeBootError() helper as ensureDbReadyForBoot
      // (./instrumentation-node) — imported from a dependency-free module so
      // this file, which also loads under the Edge runtime, never has to pull
      // in Node-only code (or risk a second failing dynamic import of
      // ./instrumentation-node itself) just to normalize the caught value.
      const normalizedError = normalizeBootError(err);
      const message = normalizedError.message;
      console.error("[STARTUP] Fatal: instrumentation hook failed during boot:", message);
      throw normalizedError;
    }
  }
}
