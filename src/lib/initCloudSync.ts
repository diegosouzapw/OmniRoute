import initializeCloudSync from "@/shared/services/initializeCloudSync";
import { startBudgetResetJob } from "@/lib/jobs/budgetResetJob";
import { startModelSyncScheduler } from "@/shared/services/modelSyncScheduler";

// Initialize runtime background sync services once per server process.
let initialized = false;

function isAutomatedTestProcess(
  env: NodeJS.ProcessEnv = process.env,
  argv: string[] = process.argv
): boolean {
  return (
    env.NODE_ENV === "test" || env.VITEST !== undefined || argv.some((arg) => arg.includes("test"))
  );
}

export function shouldSkipCloudSyncInitialization(
  env: NodeJS.ProcessEnv = process.env,
  argv: string[] = process.argv
): boolean {
  if (env.NEXT_PHASE === "phase-production-build") {
    return true;
  }

  const raw = env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES;
  if (raw && new Set(["1", "true", "yes", "on"]).has(raw.trim().toLowerCase())) {
    return true;
  }

  return isAutomatedTestProcess(env, argv) && env.OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS !== "1";
}

export async function ensureCloudSyncInitialized() {
  if (shouldSkipCloudSyncInitialization()) {
    return false;
  }
  if (!initialized) {
    try {
      const { initTokenHealthCheck } = await import("@/lib/tokenHealthCheck");
      initTokenHealthCheck();
      await initializeCloudSync();
      startModelSyncScheduler();
      startBudgetResetJob();
      initialized = true;
    } catch (error) {
      console.error("[ServerInit] Error initializing background sync services:", error);
    }
  }
  return initialized;
}

export default ensureCloudSyncInitialized;
