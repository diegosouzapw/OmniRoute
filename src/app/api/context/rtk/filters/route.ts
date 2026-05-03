import { NextResponse } from "next/server";
import {
  getRtkFilterCatalog,
  getRtkFilterLoadDiagnostics,
} from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return NextResponse.json({
    filters: getRtkFilterCatalog(),
    diagnostics: getRtkFilterLoadDiagnostics(),
  });
}
