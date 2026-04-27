"use server";

import { NextResponse } from "next/server";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { listBackups, restoreBackup, deleteBackup } from "@/shared/services/backupService";
import { ensureCliConfigWriteAllowed } from "@/shared/services/cliRuntime";
import { cliBackupMutationSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const VALID_TOOLS = ["claude", "codex", "droid", "openclaw", "cline", "kilo", "qwen"];

// GET /api/cli-tools/backups?tool=claude — list backups
export async function GET(request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const tool = searchParams.get("tool") || searchParams.get("toolId");

    if (tool && !VALID_TOOLS.includes(tool)) {
      return NextResponse.json({ error: `Invalid tool: ${tool}` }, { status: 400 });
    }

    if (tool) {
      const backups = await listBackups(tool);
      return NextResponse.json({ tool, backups });
    }

    // List all tools
    const result = {};
    for (const t of VALID_TOOLS) {
      result[t] = await listBackups(t);
    }
    return NextResponse.json({ backups: result });
  } catch (error) {
    console.log("Error listing backups:", error.message);
    return NextResponse.json({ error: "Failed to list backups" }, { status: 500 });
  }
}

// POST /api/cli-tools/backups { tool, backupId } — restore a backup
export async function POST(request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

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
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    const validation = validateBody(cliBackupMutationSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const tool = validation.data.tool || validation.data.toolId;
    const { backupId } = validation.data;

    if (!VALID_TOOLS.includes(tool)) {
      return NextResponse.json({ error: `Invalid tool: ${tool}` }, { status: 400 });
    }

    const result = await restoreBackup(tool, backupId);
    return NextResponse.json({
      success: true,
      message: `Backup restored for ${tool}`,
      ...result,
    });
  } catch (error) {
    console.log("Error restoring backup:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to restore backup" },
      { status: 500 }
    );
  }
}

// DELETE /api/cli-tools/backups { tool, backupId } — delete a backup
export async function DELETE(request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

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
    const validation = validateBody(cliBackupMutationSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const tool = validation.data.tool || validation.data.toolId;
    const { backupId } = validation.data;

    if (!VALID_TOOLS.includes(tool)) {
      return NextResponse.json({ error: `Invalid tool: ${tool}` }, { status: 400 });
    }

    const result = await deleteBackup(tool, backupId);
    return NextResponse.json({
      success: true,
      message: `Backup deleted for ${tool}`,
      ...result,
    });
  } catch (error) {
    console.log("Error deleting backup:", error.message);
    return NextResponse.json({ error: "Failed to delete backup" }, { status: 500 });
  }
}
