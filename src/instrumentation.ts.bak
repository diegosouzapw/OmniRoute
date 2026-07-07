/**
 * Next.js Instrumentation Hook
 *
 * Called once when the server starts (both dev and production).
 * All Node.js-specific logic lives in ./instrumentation-node.ts to prevent
 * Turbopack's Edge bundler from tracing into native modules (fs, path, os, etc.)
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Literal path so Webpack emits the chunk (computed string breaks dev:
    // MODULE_NOT_FOUND for ./instrumentation-node at runtime).
    // Turbopack may still avoid tracing this into Edge when guarded by NEXT_RUNTIME.
    const { registerNodejs } = await import("./instrumentation-node");
    await registerNodejs();
  }
}
