/**
 * Graceful Shutdown — E-2 Critical Fix
 *
 * Handles SIGTERM / SIGINT to drain in-flight requests before exit.
 * Critical for Docker containers and Kubernetes pods where hard kills
 * can drop active SSE streams.
 *
 * Usage:
 *   import { initGracefulShutdown } from "@/lib/gracefulShutdown";
 *   initGracefulShutdown();
 *
 * @module lib/gracefulShutdown
 */

import { markServerStopping } from "@/lib/serverLifecycle";

/** Grace period before forced exit (default 30s, configurable) */
const SHUTDOWN_TIMEOUT_MS = parseInt(process.env.SHUTDOWN_TIMEOUT_MS || "30000", 10);

declare global {
  var __omnirouteShutdown:
    | {
        init: boolean;
        shuttingDown: boolean;
        activeRequests: number;
        shutdownPromise?: Promise<void>;
      }
    | undefined;
  var __omnirouteRequestShutdown: ((signal: string) => Promise<void>) | undefined;
  var __omnirouteCustomServerOwnsShutdown: boolean | undefined;
}

function getShutdownState() {
  if (!globalThis.__omnirouteShutdown) {
    globalThis.__omnirouteShutdown = { init: false, shuttingDown: false, activeRequests: 0 };
  }
  return globalThis.__omnirouteShutdown;
}

/**
 * Check if the server is currently shutting down.
 * Route handlers can use this to reject new requests.
 */
export function isDraining(): boolean {
  return getShutdownState().shuttingDown;
}

/**
 * Track a new in-flight request. Call `done()` when it completes.
 * Returns a done callback.
 */
export function trackRequest(): () => void {
  const state = getShutdownState();
  state.activeRequests++;
  let called = false;
  return () => {
    if (!called) {
      called = true;
      state.activeRequests--;
    }
  };
}

/**
 * Get current active request count (for monitoring/health endpoints).
 */
export function getActiveRequestCount(): number {
  return getShutdownState().activeRequests;
}

/**
 * Wait for all in-flight requests to complete, with timeout.
 */
async function waitForDrain(): Promise<void> {
  const state = getShutdownState();
  const start = Date.now();
  const CHECK_INTERVAL_MS = 250;

  return new Promise((resolve) => {
    const check = () => {
      if (state.activeRequests <= 0) {
        console.log("[Shutdown] All in-flight requests drained.");
        resolve();
        return;
      }

      if (Date.now() - start > SHUTDOWN_TIMEOUT_MS) {
        console.warn(
          `[Shutdown] Timeout after ${SHUTDOWN_TIMEOUT_MS}ms with ${state.activeRequests} active requests. Forcing exit.`
        );
        resolve();
        return;
      }

      console.log(`[Shutdown] Waiting for ${state.activeRequests} in-flight request(s)...`);
      setTimeout(check, CHECK_INTERVAL_MS);
    };

    check();
  });
}

/**
 * Perform cleanup: close DB connections, flush logs.
 */
async function cleanup(): Promise<void> {
  try {
    const [
      { closeAuditDb },
      { closeDbInstance },
      { flushSpendBatchWriter },
      { closeLogRotation },
      { closeSharedLoggerResource },
      { closeCallLogSaves },
    ] = await Promise.all([
      import("@omniroute/open-sse/mcp-server/audit.ts"),
      import("@/lib/db/core"),
      import("@/lib/spend/batchWriter"),
      import("@/lib/logRotation"),
      import("@/shared/utils/loggerResource"),
      import("@/lib/usage/callLogs"),
    ]);
    const flushResult = await flushSpendBatchWriter();
    if (flushResult.flushedEntries > 0) {
      console.log(
        `[Shutdown] Spend batch writer flushed ${flushResult.flushedEntries} pending entry(ies).`
      );
    }
    await closeCallLogSaves();
    if (closeAuditDb()) {
      console.log("[Shutdown] MCP audit database checkpointed and closed.");
    }
    if (closeDbInstance()) {
      console.log("[Shutdown] SQLite database checkpointed and closed.");
    }
    // Tear down any persistent VNC login browser containers so they don't leak
    // past the server process. Best-effort; no-op if the feature was never used
    // or the docker CLI is unavailable.
    try {
      const { stopAllSessions, listSessions } = await import("@/lib/vncSession/service");
      if (listSessions().length > 0) {
        await stopAllSessions();
        console.log("[Shutdown] VNC login sessions stopped.");
      }
    } catch {
      /* feature unused / docker missing */
    }

    try {
      const { stopChatGptWebCodexRuntime } =
        await import("@omniroute/open-sse/executors/chatgpt-web-codex/runtime.ts");
      await stopChatGptWebCodexRuntime();
      console.log("[Shutdown] ChatGPT Web (Codex) runtime stopped.");
    } catch {
      /* feature unused */
    }

    await closeSharedLoggerResource();
    closeLogRotation();
    console.log("[Shutdown] Logger transport and log rotation stopped.");
  } catch (err) {
    console.error("[Shutdown] Error during cleanup:", (err as Error).message);
  }
}

/**
 * Start the process-wide shutdown sequence, or join the sequence already in progress.
 */
export function requestGracefulShutdown(signal: string): Promise<void> {
  const state = getShutdownState();
  if (state.shutdownPromise) return state.shutdownPromise;

  state.shuttingDown = true;
  markServerStopping();
  state.shutdownPromise = (async () => {
    console.log(`\n[Shutdown] Received ${signal}. Draining ${state.activeRequests} request(s)...`);

    await waitForDrain();
    await cleanup();

    console.log("[Shutdown] Bye.");
  })();

  return state.shutdownPromise;
}

/**
 * Initialize graceful shutdown handlers.
 * Should be called once during server startup.
 */
export function initGracefulShutdown(): void {
  const state = getShutdownState();
  globalThis.__omnirouteRequestShutdown ??= requestGracefulShutdown;
  if (state.init) return;
  state.init = true;

  if (globalThis.__omnirouteCustomServerOwnsShutdown) {
    console.log("[Shutdown] Cleanup registered with the custom server shutdown owner.");
    return;
  }

  const shutdown = (signal: string) => {
    void globalThis.__omnirouteRequestShutdown?.(signal).then(() => {
      // #13306: on Windows, sql.js's Emscripten WASM build leaves pending libuv
      // async-handle teardown work in flight after a statement has run. Calling
      // process.exit() in the same tick as cleanup() resolving tears the event loop
      // down before that teardown settles, and libuv's Windows async-handle close path
      // asserts `!(handle->flags & UV_HANDLE_CLOSING)` -> hard abort. Deferring by one
      // macrotask (mirrors 9router's own shutdown call sites, e.g.
      // appUpdater.js:199, cli/cli.js:675) gives that teardown work a chance to run.
      setTimeout(() => process.exit(0), 0);
    });
  };

  process.on("SIGTERM", () => void shutdown("SIGTERM"));
  process.on("SIGINT", () => void shutdown("SIGINT"));
  // #8045: on Windows, closing the console window delivers CTRL_CLOSE_EVENT, which
  // Node/libuv maps to a JS-visible "SIGHUP" event — without this listener, closing
  // the window never runs cleanup() (WAL checkpoint + closeDbInstance()), leaving
  // storage.sqlite's WAL un-checkpointed for the next launch.
  process.on("SIGHUP", () => void shutdown("SIGHUP"));

  console.log("[Shutdown] Graceful shutdown handlers registered.");
}
