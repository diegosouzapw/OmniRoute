/**
 * API: Run one log export destination now
 * POST — Drain pending call logs into this destination without waiting for the
 *        hourly job. Same code path as the scheduled run, same cursor semantics.
 */

import { NextResponse } from "next/server";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { runSingleLogExport } from "@/lib/logExport/runner";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const result = await runSingleLogExport(id);
    if (!result) {
      return NextResponse.json({ error: "Log export destination not found" }, { status: 404 });
    }
    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(error) || "Failed to run log export" },
      { status: 500 }
    );
  }
}
