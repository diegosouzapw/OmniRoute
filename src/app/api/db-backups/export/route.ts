import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import { getDbInstance, SQLITE_FILE } from "@/lib/db/core";

/**
 * GET /api/db-backups/export — Download the current database as a .sqlite file.
 *
 * Uses SQLite's native backup API to create a consistent snapshot,
 * then streams it as a downloadable attachment.
 */
export async function GET() {
  try {
    if (!SQLITE_FILE || !fs.existsSync(SQLITE_FILE)) {
      return NextResponse.json({ error: "Database file not found" }, { status: 404 });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const exportFilename = `omniroute-backup-${timestamp}.sqlite`;
    const tmpDir = os.tmpdir();
    const tmpPath = path.join(tmpDir, exportFilename);

    // Use native SQLite backup API for a consistent snapshot
    const db = getDbInstance();
    await db.backup(tmpPath);

    const fileBuffer = fs.readFileSync(tmpPath);

    // Cleanup temp file
    try {
      fs.unlinkSync(tmpPath);
    } catch {
      /* best effort */
    }

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${exportFilename}"`,
        "Content-Length": String(fileBuffer.length),
        "Cache-Control": "no-cache, no-store",
      },
    });
  } catch (error) {
    console.error("[API] Error exporting database:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
