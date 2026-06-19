import { NextRequest, NextResponse } from "next/server";
import {
  listDbBackups,
  restoreDbBackup,
  backupDbFile,
  cleanupDbBackups,
  getDbBackupMaxFiles,
  setDbBackupMaxFiles,
  getDbBackupRetentionDays,
  setDbBackupRetentionDays,
} from "@/lib/localDb";
import { dbBackupCleanupSchema, dbBackupRestoreSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

async function readOptionalJsonBody(request: NextRequest | Request): Promise<unknown> {
  try {
    const text = await request.text();
    return text.trim() ? JSON.parse(text) : {};
  } catch {
    throw new Error("Invalid JSON body");
  }
}

function persistDbBackupRetentionSettings(input: { keepLatest?: number; retentionDays?: number }) {
  const keepLatest = input.keepLatest ?? getDbBackupMaxFiles();
  const retentionDays = input.retentionDays ?? getDbBackupRetentionDays();

  if (input.keepLatest !== undefined) {
    setDbBackupMaxFiles(input.keepLatest);
  }
  if (input.retentionDays !== undefined) {
    setDbBackupRetentionDays(input.retentionDays);
  }

  return { keepLatest, retentionDays };
}

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
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
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
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
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
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}

/**
 * PATCH /api/db-backups — Save database backup retention settings.
 * Body: { keepLatest?: number, retentionDays?: number }
 */
export async function PATCH(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let rawBody: unknown = {};
  try {
    rawBody = await readOptionalJsonBody(request);
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

    return NextResponse.json({
      saved: true,
      ...persistDbBackupRetentionSettings(validation.data),
    });
  } catch (error) {
    console.error("[API] Error saving DB backup retention settings:", error);
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}

/**
 * DELETE /api/db-backups — Cleanup old database backups.
 * Body: { keepLatest?: number, retentionDays?: number }
 */
export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let rawBody: unknown = {};
  try {
    rawBody = await readOptionalJsonBody(request);
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

    const { keepLatest, retentionDays } = persistDbBackupRetentionSettings(validation.data);
    const result = cleanupDbBackups({ maxFiles: keepLatest, retentionDays });
    return NextResponse.json({
      cleaned: true,
      keepLatest,
      retentionDays,
      ...result,
    });
  } catch (error) {
    console.error("[API] Error cleaning DB backups:", error);
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}
