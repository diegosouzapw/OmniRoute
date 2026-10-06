/**
 * API: Log export destination types
 * GET — Descriptors (label, docs, config field list) for every registered destination.
 *       The dashboard renders each destination's config form from this response, so a
 *       new destination needs no UI change.
 */

import { NextResponse } from "next/server";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { describeLogExportDestinationTypes } from "@/lib/logExport/registry";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    return NextResponse.json({ types: describeLogExportDestinationTypes() });
  } catch (error: any) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(error) || "Failed to list log export destination types" },
      { status: 500 }
    );
  }
}
