// Server startup script
import initializeCloudSync from "./shared/services/initializeCloudSync";
import { enforceSecrets } from "./shared/utils/secretsValidator";
import { initAuditLog, cleanupExpiredLogs, logAuditEvent } from "./lib/compliance/index";

async function startServer() {
  // FASE-01: Validate required secrets before anything else (fail-fast)
  enforceSecrets();

  // Compliance: Initialize audit_log table
  try {
    initAuditLog();
    console.log("[COMPLIANCE] Audit log table initialized");
  } catch (err) {
    console.warn("[COMPLIANCE] Could not initialize audit log:", err.message);
  }

  // Compliance: One-time cleanup of expired logs
  try {
    const cleanup = cleanupExpiredLogs();
    if (cleanup.deletedUsage || cleanup.deletedCallLogs || cleanup.deletedAuditLogs) {
      console.log("[COMPLIANCE] Expired log cleanup:", cleanup);
    }
  } catch (err) {
    console.warn("[COMPLIANCE] Log cleanup failed:", err.message);
  }

  console.log("Starting server with cloud sync...");

  try {
    // Initialize cloud sync
    await initializeCloudSync();
    console.log("Server started with cloud sync initialized");

    // Log server start event to audit log
    logAuditEvent({ action: "server.start", details: { timestamp: new Date().toISOString() } });
  } catch (error) {
    console.error("[FATAL] Error initializing cloud sync:", error);
    process.exit(1);
  }
}

// Start the server initialization
startServer().catch((err) => {
  console.error("[FATAL] Server initialization failed:", err);
  process.exit(1);
});

// Export for use as module if needed
export default startServer;
