// Server startup script
import initializeCloudSync from "./shared/services/initializeCloudSync";
import { enforceWebRuntimeEnv } from "./lib/env/runtimeEnv";
import { enforceSecrets } from "./shared/utils/secretsValidator";
import { initAuditLog, cleanupExpiredLogs, logAuditEvent } from "./lib/compliance/index";
import { initConsoleInterceptor } from "./lib/consoleInterceptor";
import { startBudgetResetJob } from "./lib/jobs/budgetResetJob";
import { startReasoningCacheCleanupJob } from "./lib/jobs/reasoningCacheCleanupJob";
import { getSettings } from "./lib/db/settings";
import { applyRuntimeSettings } from "./lib/config/runtimeSettings";
import { startRuntimeConfigHotReload } from "./lib/config/hotReload";
import { startSpendBatchWriter } from "./lib/spend/batchWriter";
import { registerDefaultGuardrails } from "./lib/guardrails";
import { ensurePersistentManagementPasswordHash } from "./lib/auth/managementPassword";
import { skillExecutor } from "./lib/skills/executor";
import { registerBuiltinSkills } from "./lib/skills/builtins";
import { createLogger } from "./shared/utils/logger";

const startupLog = createLogger("server-init");

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

async function startServer() {
  // Trigger request-log layout migration during startup, before serving requests.
  await import("./lib/usage/migrations");

  // Console interceptor: capture all console output to log file (must be first)
  initConsoleInterceptor();

  // FASE-01: Validate required secrets before anything else (fail-fast)
  enforceSecrets();
  enforceWebRuntimeEnv();

  // Compliance: Initialize audit_log table
  try {
    initAuditLog();
    startupLog.info("Audit log table initialized");
  } catch (err) {
    startupLog.warn({ err }, "Could not initialize audit log");
  }

  // Compliance: One-time cleanup of expired logs
  try {
    const cleanup = cleanupExpiredLogs();
    if (
      cleanup.deletedUsage ||
      cleanup.deletedCallLogs ||
      cleanup.deletedProxyLogs ||
      cleanup.deletedRequestDetailLogs ||
      cleanup.deletedAuditLogs ||
      cleanup.deletedMcpAuditLogs
    ) {
      startupLog.info({ cleanup }, "Expired log cleanup completed");
    }
  } catch (err) {
    startupLog.warn({ err }, "Log cleanup failed");
  }

  startupLog.info("Starting server with cloud sync");

  try {
    let settings = await getSettings();
    const passwordState = await ensurePersistentManagementPasswordHash({
      logger: { log: (message: string) => startupLog.info(message) },
      settings,
      source: "startup",
    });
    settings = passwordState.settings;
    const runtimeChanges = await applyRuntimeSettings(settings, { force: true, source: "startup" });
    if (runtimeChanges.length > 0) {
      startupLog.info(
        { sections: runtimeChanges.map((entry) => entry.section) },
        "Runtime settings hydrated"
      );
    }

    // Initialize cloud sync
    startSpendBatchWriter();
    registerDefaultGuardrails();
    registerBuiltinSkills(skillExecutor);
    startupLog.info("Spend batch writer started");
    startupLog.info("Guardrail registry initialized");
    startupLog.info("Builtin skill handlers registered");
    await initializeCloudSync();
    startBudgetResetJob();
    startReasoningCacheCleanupJob();
    startRuntimeConfigHotReload();
    startupLog.info("Server started with cloud sync initialized");

    // Log server start event to audit log
    logAuditEvent({
      action: "server.start",
      actor: "system",
      target: "server-runtime",
      resourceType: "maintenance",
      status: "success",
      details: { timestamp: new Date().toISOString() },
    });
  } catch (error) {
    startupLog.error({ err: error }, "Error initializing cloud sync");
    process.exit(1);
  }

  // Pricing sync: opt-in external pricing data (non-blocking, never fatal)
  if (process.env.PRICING_SYNC_ENABLED === "true") {
    try {
      const { initPricingSync } = await import("./lib/pricingSync");
      await initPricingSync();
    } catch (err) {
      startupLog.warn({ error: getErrorMessage(err) }, "Pricing sync could not initialize");
    }
  }
}

// Start the server initialization
startServer().catch((err) => {
  startupLog.error({ err }, "Server initialization failed");
  process.exit(1);
});

// Export for use as module if needed
export default startServer;
