import { NextRequest, NextResponse } from "next/server";
import {
  listDbBackups,
  restoreDbBackup,
  backupDbFile,
  cleanupDbBackups,
  getDbBackupMaxFiles,
  getDbBackupRetentionDays,
} from "@/lib/localDb";
import { dbBackupCleanupSchema, dbBackupRestoreSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { isAuthenticated } from "@/shared/utils/apiAuth";

/**
 * PUT /api/db-backups — Trigger a manual backup snapshot.
 * Security: Requires admin authentication.
 */
export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
 * Security: Requires admin authentication.
 */
export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
 * Security: Requires admin authentication.
 */
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(dbBackupRestoreSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { backupId } = validation.data;

    const result = await restoreDbBackup(backupId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[API] Error restoring DB backup:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * DELETE /api/db-backups — Cleanup old database backups.
 * Body: { keepLatest?: number, retentionDays?: number }
 */
export async function DELETE(request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let rawBody = {};
  try {
    const text = await request.text();
    if (text.trim()) rawBody = JSON.parse(text);
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(dbBackupCleanupSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const keepLatest = validation.data.keepLatest ?? getDbBackupMaxFiles();
    const retentionDays = validation.data.retentionDays ?? getDbBackupRetentionDays();
    const result = cleanupDbBackups({ maxFiles: keepLatest, retentionDays });
    return NextResponse.json({
      cleaned: true,
      keepLatest,
      retentionDays,
      ...result,
    });
  } catch (error) {
    console.error("[API] Error cleaning DB backups:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
