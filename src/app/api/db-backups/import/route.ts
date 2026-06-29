import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import os from "os";
import { getDbInstance, resetDbInstance, SQLITE_FILE } from "@/lib/db/core";
import { openDatabaseAsync } from "@/lib/db/adapters/driverFactory";
import type { SqliteAdapter } from "@/lib/db/adapters/types";
import { backupDbFile, getTableNamesFromAdapter, countImportedRows } from "@/lib/db/backup";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";
import { getSettings } from "@/lib/db/settings";
import { setSystemPromptConfig } from "@omniroute/open-sse/services/systemPrompt.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const DEFAULT_MAX_UPLOAD_MB = 100;
// Hard ceiling so a misconfigured/hostile value can't ask the route to buffer an
// unbounded file into memory.
const MAX_UPLOAD_MB_CEILING = 4096;

/**
 * Resolve the maximum accepted backup size (bytes) from the environment.
 *
 * Real databases bloat well past the historical 100 MB cap (#4719 — a 156 MB file that
 * VACUUMs down to 5 MB still can't be re-imported), so the limit is now operator-tunable
 * via `OMNIROUTE_DB_IMPORT_MAX_MB`. Invalid / out-of-range values fall back to the 100 MB
 * default and are clamped to a 4 GB ceiling.
 */
export function resolveMaxUploadSizeBytes(
  env: NodeJS.ProcessEnv = process.env
): number {
  const raw = env.OMNIROUTE_DB_IMPORT_MAX_MB;
  const parsed = raw === undefined ? NaN : Number(raw);
  const mb =
    Number.isFinite(parsed) && parsed >= 1
      ? Math.min(Math.floor(parsed), MAX_UPLOAD_MB_CEILING)
      : DEFAULT_MAX_UPLOAD_MB;
  return mb * 1024 * 1024;
}

// Required tables that must exist in a valid OmniRoute database
const REQUIRED_TABLES = ["provider_connections", "provider_nodes", "combos", "api_keys"];

/**
 * POST /api/db-backups/import — Upload a .sqlite file to replace the current database.
 *
 * Accepts multipart/form-data with a single "file" field containing the .sqlite backup.
 * Validates integrity, schema, and required tables before replacing the active database.
 *
 * 🔒 Auth-guarded: requires JWT cookie or Bearer API key (finding #258-3).
 */
export async function POST(request: Request) {
  if (await isAuthRequired(request)) {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
  let tmpPath: string | null = null;

  try {
    let fileBuffer: Buffer | null = null;
    let fileName = "";
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      if (!file) {
        return NextResponse.json(
          { error: "No file provided. Upload a .sqlite file." },
          { status: 400 }
        );
      }
      fileName = file.name;
      fileBuffer = Buffer.from(await file.arrayBuffer());
    } else {
      // Direct binary transfer to bypass Reverse Proxy / Next.js FormData parsing errors under chunked encoding (Bug #770)
      const buffer = await request.arrayBuffer();
      if (!buffer || buffer.byteLength === 0) {
        return NextResponse.json({ error: "No file content provided." }, { status: 400 });
      }
      fileBuffer = Buffer.from(buffer);
      const url = new URL(request.url);
      fileName = url.searchParams.get("filename") || "import.sqlite";
    }

    // Validate filename extension
    if (!fileName.endsWith(".sqlite")) {
      return NextResponse.json(
        { error: "Invalid file type. Only .sqlite files are accepted." },
        { status: 400 }
      );
    }

    // Validate file size
    const maxUploadSize = resolveMaxUploadSizeBytes();
    const fileSize = fileBuffer.length;
    if (fileSize > maxUploadSize) {
      return NextResponse.json(
        {
          error:
            `File too large. Maximum allowed size is ${maxUploadSize / (1024 * 1024)} MB. ` +
            `Set OMNIROUTE_DB_IMPORT_MAX_MB to raise it, or VACUUM the database before exporting.`,
        },
        { status: 400 }
      );
    }

    if (fileSize < 4096) {
      return NextResponse.json(
        { error: "File too small to be a valid SQLite database." },
        { status: 400 }
      );
    }

    // Write uploaded file to temp location
    tmpPath = path.join(os.tmpdir(), `omniroute-import-${Date.now()}.sqlite`);
    fs.writeFileSync(tmpPath, fileBuffer!);

    // Validate SQLite integrity.
    // Use the resilient driver factory (better-sqlite3 → node:sqlite → sql.js) rather than
    // a direct `better-sqlite3` import: in the packaged Electron app that native module is
    // absent from the standalone server's node_modules, so a hard import crashes the route
    // with "Cannot find module 'better-sqlite3'" even though node:sqlite is available (#3025).
    let testDb: SqliteAdapter | null = null;
    try {
      testDb = await openDatabaseAsync(tmpPath, { readonly: true });
      const result = testDb.pragma("integrity_check") as any[];
      if (result[0]?.integrity_check !== "ok") {
        return NextResponse.json(
          { error: "Database integrity check failed. The file may be corrupted." },
          { status: 400 }
        );
      }

      // Validate required tables exist
      const tables = getTableNamesFromAdapter(testDb);

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
      return NextResponse.json(
        { error: `Invalid database file: ${sanitizeErrorMessage(e)}` },
        { status: 400 }
      );
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
    getDbInstance();
    const { connCount, nodeCount, comboCount, keyCount } = countImportedRows();

    console.log(
      `[DB] Imported database from upload: ${connCount} connections, ${nodeCount} nodes, ${comboCount} combos, ${keyCount} API keys`
    );

    // The DB was replaced wholesale — re-hydrate the in-memory Global System Prompt so it
    // reflects the imported settings without requiring a restart (#2470).
    try {
      const importedSettings = await getSettings();
      if (importedSettings.systemPrompt) {
        setSystemPromptConfig(importedSettings.systemPrompt);
      }
    } catch {
      // non-fatal: import succeeded; system prompt will hydrate on next restart
    }

    return NextResponse.json({
      imported: true,
      filename: fileName,
      connectionCount: connCount,
      nodeCount,
      comboCount,
      apiKeyCount: keyCount,
    });
  } catch (error) {
    console.error("[API] Error importing database:", error);
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
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
