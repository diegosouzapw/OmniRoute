import initializeCloudSync from "@/shared/services/initializeCloudSync";
import "@/lib/tokenHealthCheck"; // Proactive token health-check scheduler

// Initialize cloud sync when this module is imported
let initialized = false;

export async function ensureCloudSyncInitialized() {
  if (!initialized) {
    try {
      await initializeCloudSync();
      initialized = true;
    } catch (error) {
      console.error("[ServerInit] Error initializing cloud sync:", error);
    }
  }
  return initialized;
}

// Auto-initialize when module loads
ensureCloudSyncInitialized().catch(console.log);

export default ensureCloudSyncInitialized;
