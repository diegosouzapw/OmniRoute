import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  syncModelsDev,
  getModelsDevPricing,
  getSyncedCapabilities,
  getSyncStatus,
  startPeriodicSync,
  stopPeriodicSync,
} from "@/lib/modelsDevSync";

const modelsDevActionSchema = z.object({
  action: z.enum(["sync", "start", "stop"]),
  dryRun: z.boolean().optional(),
  syncCapabilities: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  if (action === "status") {
    const status = getSyncStatus();
    const pricing = getModelsDevPricing();
    const caps = getSyncedCapabilities();

    const providerCount = Object.keys(pricing).length;
    const modelCount = Object.values(pricing).reduce(
      (sum, models) => sum + Object.keys(models).length,
      0
    );
    const capabilityCount = Object.values(caps).reduce(
      (sum, models) => sum + Object.keys(models).length,
      0
    );

    return NextResponse.json({
      ...status,
      providerCount,
      modelCount,
      capabilityCount,
    });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(modelsDevActionSchema, rawBody);
  if (isValidationFailure(validation)) {
    return validation.response;
  }

  const { action, dryRun, syncCapabilities } = validation.data;

  if (action === "sync") {
    const result = await syncModelsDev({
      dryRun: dryRun ?? false,
      syncCapabilities: syncCapabilities !== false,
    });
    return NextResponse.json(result);
  }

  if (action === "start") {
    startPeriodicSync();
    return NextResponse.json({ success: true, message: "Periodic sync started" });
  }

  if (action === "stop") {
    stopPeriodicSync();
    return NextResponse.json({ success: true, message: "Periodic sync stopped" });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
