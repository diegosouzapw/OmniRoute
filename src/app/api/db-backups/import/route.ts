import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import { getDbInstance, resetDbInstance, SQLITE_FILE } from "@/lib/db/core";
import { backupDbFile } from "@/lib/db/backup";

const MAX_UPLOAD_SIZE = 100 * 1024 * 1024; // 100 MB

// Required tables that must exist in a valid OmniRoute database
const REQUIRED_TABLES = ["provider_connections", "provider_nodes", "combos", "api_keys"];

/**
 * POST /api/db-backups/import — Upload a .sqlite file to replace the current database.
 *
 * Accepts multipart/form-data with a single "file" field containing the .sqlite backup.
 * Validates integrity, schema, and required tables before replacing the active database.
 */
export async function POST(request: Request) {
  let tmpPath: string | null = null;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided. Upload a .sqlite file." },
        { status: 400 }
      );
    }

    // Validate filename extension
    if (!file.name.endsWith(".sqlite")) {
      return NextResponse.json(
        { error: "Invalid file type. Only .sqlite files are accepted." },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_UPLOAD_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum allowed size is ${MAX_UPLOAD_SIZE / (1024 * 1024)} MB.` },
        { status: 400 }
      );
    }

    if (file.size < 4096) {
      return NextResponse.json(
        { error: "File too small to be a valid SQLite database." },
        { status: 400 }
      );
    }

    // Write uploaded file to temp location
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    tmpPath = path.join(os.tmpdir(), `omniroute-import-${Date.now()}.sqlite`);
    fs.writeFileSync(tmpPath, buffer);

    // Validate SQLite integrity
    let testDb: InstanceType<typeof Database> | null = null;
    try {
      testDb = new Database(tmpPath, { readonly: true });
      const result = testDb.pragma("integrity_check") as any[];
      if (result[0]?.integrity_check !== "ok") {
        return NextResponse.json(
          { error: "Database integrity check failed. The file may be corrupted." },
          { status: 400 }
        );
      }

      // Validate required tables exist
      const tables = testDb
        .prepare("SELECT name FROM sqlite_master WHERE type='table'")
        .all()
        .map((row: any) => row.name);

      const missingTables = REQUIRED_TABLES.filter((t) => !tables.includes(t));
      if (missingTables.length > 0) {
        return NextResponse.json(
          {
            error: `Invalid OmniRoute database. Missing tables: ${missingTables.join(", ")}`,
          },
          { status: 400 }
        );
      }

      testDb.close();
      testDb = null;
    } catch (e) {
      if (testDb) testDb.close();
      return NextResponse.json({ error: `Invalid database file: ${e.message}` }, { status: 400 });
    }

    // Create pre-import backup
    backupDbFile("pre-import");

    // Close and reset current DB connection
    resetDbInstance();

    // Remove main file and WAL sidecars
    const sqliteFilesToReplace = [
      SQLITE_FILE,
      `${SQLITE_FILE}-wal`,
      `${SQLITE_FILE}-shm`,
      `${SQLITE_FILE}-journal`,
    ];
    for (const filePath of sqliteFilesToReplace) {
      if (!filePath) continue;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Copy imported file over current DB
    fs.copyFileSync(tmpPath, SQLITE_FILE!);

    // Reopen and verify
    const db = getDbInstance();
    const connCount =
      (db.prepare("SELECT COUNT(*) as cnt FROM provider_connections").get() as any)?.cnt || 0;
    const nodeCount =
      (db.prepare("SELECT COUNT(*) as cnt FROM provider_nodes").get() as any)?.cnt || 0;
    const comboCount = (db.prepare("SELECT COUNT(*) as cnt FROM combos").get() as any)?.cnt || 0;
    const keyCount = (db.prepare("SELECT COUNT(*) as cnt FROM api_keys").get() as any)?.cnt || 0;

    console.log(
      `[DB] Imported database from upload: ${connCount} connections, ${nodeCount} nodes, ${comboCount} combos, ${keyCount} API keys`
    );

    return NextResponse.json({
      imported: true,
      filename: file.name,
      connectionCount: connCount,
      nodeCount,
      comboCount,
      apiKeyCount: keyCount,
    });
  } catch (error) {
    console.error("[API] Error importing database:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    // Cleanup temp file
    if (tmpPath && fs.existsSync(tmpPath)) {
      try {
        fs.unlinkSync(tmpPath);
      } catch {
        /* best effort */
      }
    }
  }
}
