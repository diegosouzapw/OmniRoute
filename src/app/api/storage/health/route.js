import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs";
import { resolveDataDir } from "@/lib/dataPaths.js";

/**
 * GET /api/storage/health — Return database storage information.
 * Provides: driver, dbPath, sizeBytes, lastBackupAt, retentionDays
 */
export async function GET() {
  try {
    const dataDir = resolveDataDir({});
    const dbFilePath = path.join(dataDir, "storage.sqlite");
    const backupsDir = path.join(dataDir, "db_backups");

    // Get DB file size
    let sizeBytes = 0;
    try {
      if (fs.existsSync(dbFilePath)) {
        const stat = fs.statSync(dbFilePath);
        sizeBytes = stat.size;
      }
    } catch {
      /* ignore */
    }

    // Get last backup info
    let lastBackupAt = null;
    let backupCount = 0;
    try {
      if (fs.existsSync(backupsDir)) {
        const files = fs
          .readdirSync(backupsDir)
          .filter((f) => f.startsWith("db_") && f.endsWith(".sqlite"))
          .sort()
          .reverse();
        backupCount = files.length;
        if (files.length > 0) {
          const latestStat = fs.statSync(path.join(backupsDir, files[0]));
          lastBackupAt = latestStat.mtime.toISOString();
        }
      }
    } catch {
      /* ignore */
    }

    // Get the display path (abbreviated with ~)
    const homeDir = process.env.HOME || process.env.USERPROFILE || "";
    const displayPath = dbFilePath.startsWith(homeDir)
      ? "~" + dbFilePath.slice(homeDir.length)
      : dbFilePath;

    return NextResponse.json({
      driver: "sqlite",
      dbPath: displayPath,
      sizeBytes,
      lastBackupAt,
      backupCount,
      retentionDays: 90,
      dataDir: dataDir.startsWith(homeDir) ? "~" + dataDir.slice(homeDir.length) : dataDir,
    });
  } catch (error) {
    console.error("[API] Error getting storage health:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
