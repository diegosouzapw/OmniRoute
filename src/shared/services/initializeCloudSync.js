import { getCloudSyncScheduler } from "@/shared/services/cloudSyncScheduler";
import { isCloudEnabled, cleanupProviderConnections } from "@/lib/localDb";

/**
 * Initialize cloud sync scheduler
 * This should be called when the application starts
 */
export async function initializeCloudSync() {
  try {
    // Cleanup null fields from existing data
    await cleanupProviderConnections();

    // Create scheduler instance with default 15-minute interval
    const scheduler = await getCloudSyncScheduler(null, 15);

    // Start the scheduler
    await scheduler.start();

    return scheduler;
  } catch (error) {
    console.error("[CloudSync] Error initializing scheduler:", error);
    throw error;
  }
}

// For development/testing purposes
if (typeof require !== "undefined" && require.main === module) {
  initializeCloudSync().catch((err) => console.error("[CloudSync] init failed:", err));
}

export default initializeCloudSync;
