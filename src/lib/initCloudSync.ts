import initializeCloudSync from "@/shared/services/initializeCloudSync";
import { startModelSyncScheduler } from "@/shared/services/modelSyncScheduler";
import "@/lib/tokenHealthCheck"; // Proactive token health-check scheduler

// Initialize background sync services when this module is imported
let initialized = false;

export async function ensureCloudSyncInitialized() {
  if (!initialized) {
    try {
      await initializeCloudSync();
      startModelSyncScheduler();
      initialized = true;
    } catch (error) {
      console.error("[ServerInit] Error initializing background sync services:", error);
    }
  }
  return initialized;
}

// Auto-initialize when module loads
ensureCloudSyncInitialized().catch((err) => console.error("[CloudSync] ensure failed:", err));

export default ensureCloudSyncInitialized;
