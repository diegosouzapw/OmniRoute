/**
 * GET  /api/logs/detail  — List legacy detailed request logs + current enabled flag
 * POST /api/logs/detail — Enable/disable pipeline capture for unified call log artifacts
 */
import { NextRequest, NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  getRequestDetailLogs,
  getRequestDetailLogCount,
  isDetailedLoggingEnabled,
} from "@/lib/db/detailedLogs";
import { getUserDatabaseSettings, updateDatabaseSettings } from "@/lib/db/databaseSettings";
import { updateSettings } from "@/lib/db/settings";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const authError = await requireManagementAuth(req);
  if (authError) return authError;

  const url = new URL(req.url);
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 50), 200);
  const offset = Number(url.searchParams.get("offset") ?? 0);

  const logs = getRequestDetailLogs(limit, offset);
  const total = getRequestDetailLogCount();
  const enabled = await isDetailedLoggingEnabled();

  return NextResponse.json({ enabled, total, logs });
}

export async function POST(req: NextRequest) {
  const authError = await requireManagementAuth(req);
  if (authError) return authError;

  const body = await req.json();
  const enabled = body.enabled === true || body.enabled === "1";

  await updateSettings({ call_log_pipeline_enabled: enabled });
  const databaseSettings = getUserDatabaseSettings();
  updateDatabaseSettings({
    logs: {
      ...databaseSettings.logs,
      detailedLogsEnabled: enabled,
      callLogPipelineEnabled: enabled,
    },
  });

  return NextResponse.json({
    success: true,
    enabled,
    message: enabled
      ? "Pipeline capture enabled. New request artifacts will include per-stage payloads."
      : "Pipeline capture disabled.",
  });
}
