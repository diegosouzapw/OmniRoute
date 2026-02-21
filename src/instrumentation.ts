/**
 * Next.js Instrumentation Hook
 *
 * Called once when the server starts (both dev and production).
 * Used to initialize graceful shutdown handlers, console log capture,
 * and compliance features (audit log table, expired log cleanup).
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

import crypto from "crypto";

function ensureJwtSecret(): void {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === "") {
    const generated = crypto.randomBytes(48).toString("base64");
    process.env.JWT_SECRET = generated;
    console.log("[STARTUP] JWT_SECRET auto-generated (random 64-char secret)");
  }
}

export async function register() {
  // Only run on the server (not during build or in Edge runtime)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    ensureJwtSecret();
    // Console log file capture (must be first — before any logging occurs)
    const { initConsoleInterceptor } = await import("@/lib/consoleInterceptor");
    initConsoleInterceptor();

    const { initGracefulShutdown } = await import("@/lib/gracefulShutdown");
    initGracefulShutdown();

    // Compliance: Initialize audit_log table + cleanup expired logs
    try {
      const { initAuditLog, cleanupExpiredLogs } = await import("@/lib/compliance/index");
      initAuditLog();
      console.log("[COMPLIANCE] Audit log table initialized");

      const cleanup = cleanupExpiredLogs();
      if (cleanup.deletedUsage || cleanup.deletedCallLogs || cleanup.deletedAuditLogs) {
        console.log("[COMPLIANCE] Expired log cleanup:", cleanup);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn("[COMPLIANCE] Could not initialize audit log:", msg);
    }
  }
}
