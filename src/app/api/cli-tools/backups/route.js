"use server";

import { NextResponse } from "next/server";
import { listBackups, restoreBackup, deleteBackup } from "@/shared/services/backupService";
import { ensureCliConfigWriteAllowed } from "@/shared/services/cliRuntime";

const VALID_TOOLS = ["claude", "codex", "droid", "openclaw"];

// GET /api/cli-tools/backups?tool=claude — list backups
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tool = searchParams.get("tool");

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
  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    const { tool, backupId } = await request.json();

    if (!tool || !backupId) {
      return NextResponse.json({ error: "tool and backupId are required" }, { status: 400 });
    }

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
  try {
    const { tool, backupId } = await request.json();

    if (!tool || !backupId) {
      return NextResponse.json({ error: "tool and backupId are required" }, { status: 400 });
    }

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
