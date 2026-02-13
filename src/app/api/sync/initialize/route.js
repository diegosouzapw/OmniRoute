import { NextResponse } from "next/server";
import initializeCloudSync from "@/shared/services/initializeCloudSync";

let syncInitialized = false;

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

    return NextResponse.json({
      success: true,
      message: "Cloud sync initialized successfully",
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
    message: syncInitialized ? "Cloud sync is running" : "Cloud sync not initialized",
  });
}
