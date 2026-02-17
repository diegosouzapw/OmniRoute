import { NextResponse } from "next/server";
import { listDbBackups, restoreDbBackup, backupDbFile } from "@/lib/localDb";

/**
 * PUT /api/db-backups — Trigger a manual backup snapshot.
 */
export async function PUT() {
  try {
    const result = backupDbFile("manual");
    if (!result) {
      return NextResponse.json({ message: "No changes since last backup (throttled)" });
    }
    return NextResponse.json({ created: true, ...result });
  } catch (error) {
    console.error("[API] Error creating manual backup:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * GET /api/db-backups — List available database backups.
 */
export async function GET() {
  try {
    const backups = await listDbBackups();
    return NextResponse.json({ backups });
  } catch (error) {
    console.error("[API] Error listing DB backups:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * POST /api/db-backups — Restore a specific backup.
 * Body: { backupId: "db_2026-02-11T14-00-00-000Z_pre-write.json" }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { backupId } = body;

    if (!backupId) {
      return NextResponse.json({ error: "backupId is required" }, { status: 400 });
    }

    const result = await restoreDbBackup(backupId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[API] Error restoring DB backup:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
