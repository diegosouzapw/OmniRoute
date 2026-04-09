import { NextResponse } from "next/server";
import initializeCloudSync from "@/shared/services/initializeCloudSync";
import { startModelSyncScheduler } from "@/shared/services/modelSyncScheduler";
import { resolveOmniRouteBaseUrl } from "@/shared/utils/resolveOmniRouteBaseUrl";

let syncInitialized = false;
let modelSyncInitialized = false;

// POST /api/sync/initialize - Initialize cloud sync scheduler
export async function POST(request) {
  try {
    if (syncInitialized) {
      return NextResponse.json({
        message: "Cloud sync already initialized",
      });
    }

    await initializeCloudSync();
    syncInitialized = true;

    // (#488) Start model auto-sync scheduler (24h, configurable via MODEL_SYNC_INTERVAL_HOURS)
    if (!modelSyncInitialized) {
      const origin = request.headers.get("origin") || resolveOmniRouteBaseUrl();
      startModelSyncScheduler(origin);
      modelSyncInitialized = true;
    }

    return NextResponse.json({
      success: true,
      message: "Cloud sync initialized successfully",
      modelSyncEnabled: true,
    });
  } catch (error) {
    console.log("Error initializing cloud sync:", error);
    return NextResponse.json(
      {
        error: "Failed to initialize cloud sync",
      },
      { status: 500 }
    );
  }
}

// GET /api/sync/status - Check sync initialization status
export async function GET(request) {
  return NextResponse.json({
    initialized: syncInitialized,
    modelSyncInitialized,
    message: syncInitialized ? "Cloud sync is running" : "Cloud sync not initialized",
  });
}
