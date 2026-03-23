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
    // Computed path prevents Turbopack from statically resolving the import
    // for the Edge instrumentation bundle, avoiding spurious warnings about
    // Node.js modules not being available in the Edge Runtime.
    const nodeMod = "./instrumentation-" + "node";
    const { registerNodejs } = await import(nodeMod);
    await registerNodejs();
  }
}
