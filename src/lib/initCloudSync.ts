import initializeCloudSync from "@/shared/services/initializeCloudSync";
import { startModelSyncScheduler } from "@/shared/services/modelSyncScheduler";

const TRUE_ENV_VALUES = new Set(["1", "true", "yes", "on"]);

function isEnvFlagEnabled(name: string): boolean {
  const value = process.env[name];
  if (!value) return false;
  return TRUE_ENV_VALUES.has(value.trim().toLowerCase());
}

function shouldAutoInitializeInCurrentEnv() {
  if (process.env.NODE_ENV !== "development") return true;
  return isEnvFlagEnabled("CLOUD_SYNC_ENABLE_IN_DEV");
}

// Initialize background sync services when this module is imported
const globalState = globalThis as typeof globalThis & {
  __omnirouteCloudSyncInitialized?: boolean;
  __omnirouteCloudSyncInitPromise?: Promise<boolean> | null;
};

export async function ensureCloudSyncInitialized() {
  if (!shouldAutoInitializeInCurrentEnv()) {
    return false;
  }

  if (globalState.__omnirouteCloudSyncInitialized) {
    return true;
  }

  if (!globalState.__omnirouteCloudSyncInitPromise) {
    globalState.__omnirouteCloudSyncInitPromise = (async () => {
      try {
        await import("@/lib/tokenHealthCheck");
        await initializeCloudSync();
        startModelSyncScheduler();
        globalState.__omnirouteCloudSyncInitialized = true;
        return true;
      } catch (error) {
        console.error("[ServerInit] Error initializing background sync services:", error);
        return false;
      } finally {
        globalState.__omnirouteCloudSyncInitPromise = null;
      }
    })();
  }

  return globalState.__omnirouteCloudSyncInitPromise;
}

// Auto-initialize when module loads
if (shouldAutoInitializeInCurrentEnv()) {
  ensureCloudSyncInitialized().catch((err) => console.error("[CloudSync] ensure failed:", err));
} else {
  console.log(
    "[CloudSync] Auto-start disabled in development (set CLOUD_SYNC_ENABLE_IN_DEV=true to enable)"
  );
}

export default ensureCloudSyncInitialized;
