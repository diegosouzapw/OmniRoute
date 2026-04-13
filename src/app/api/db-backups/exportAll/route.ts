import { NextRequest, NextResponse } from "next/server";
import { getDbInstance, SQLITE_FILE } from "@/lib/db/core";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { spawnSync } from "node:child_process";
import fs from "fs";
import path from "path";
import os from "os";
/**
 * GET /api/db-backups/exportAll
 * Exports the entire database + settings as a tar.gz archive
 * Security: Requires admin authentication.
 */
export async function GET(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    if (!SQLITE_FILE) {
      return NextResponse.json(
        { error: "Export is only available in local (non-cloud) mode" },
        { status: 400 }
      );
    }

    const db = getDbInstance();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const tempDir = path.join(os.tmpdir(), `omniroute-export-${timestamp}`);
    const zipPath = path.join(os.tmpdir(), `omniroute-full-backup-${timestamp}.zip`);
    const tarPath = zipPath.replace(".zip", ".tar.gz");

    try {
      // Create temp directory
      fs.mkdirSync(tempDir, { recursive: true });

      // 1. Export database using native backup API
      const dbBackupPath = path.join(tempDir, "storage.sqlite");
      db.backup(dbBackupPath);

      // 2. Export settings as JSON
      const settings: Record<string, string> = {};
      try {
        const rows = db.prepare("SELECT key, value FROM key_value").all() as {
          key: string;
          value: string;
        }[];
        for (const row of rows) {
          settings[row.key] = row.value;
        }
      } catch {
        // key_value table might not exist
      }
      fs.writeFileSync(path.join(tempDir, "settings.json"), JSON.stringify(settings, null, 2));

      // 3. Export combos summary
      const combos: unknown[] = [];
      try {
        const rows = db.prepare("SELECT * FROM combos").all();
        combos.push(...rows);
      } catch {
        // combos table might not exist
      }
      fs.writeFileSync(path.join(tempDir, "combos.json"), JSON.stringify(combos, null, 2));

      // 4. Export provider connections (without sensitive credentials)
      const providers: unknown[] = [];
      try {
        const rows = db
          .prepare(
            "SELECT id, provider, name, auth_type, is_active, email, created_at FROM provider_connections"
          )
          .all();
        providers.push(...rows);
      } catch {
        // provider_connections table might not exist
      }
      fs.writeFileSync(path.join(tempDir, "providers.json"), JSON.stringify(providers, null, 2));

      // 5. Export API keys summary (masked)
      const apiKeys: unknown[] = [];
      try {
        const rows = db
          .prepare(
            "SELECT id, name, substr(key, 1, 8) as prefix, machine_id, created_at FROM api_keys"
          )
          .all();
        apiKeys.push(...rows);
      } catch {
        // api_keys table might not exist
      }
      fs.writeFileSync(path.join(tempDir, "api-keys.json"), JSON.stringify(apiKeys, null, 2));

      // 6. Export metadata
      const metadata = {
        exportedAt: new Date().toISOString(),
        version: process.env.npm_package_version || "unknown",
        format: "omniroute-full-backup-v1",
        contents: [
          "storage.sqlite - Full database",
          "settings.json - Key-value settings",
          "combos.json - Combo configurations",
          "providers.json - Provider connections (no credentials)",
          "api-keys.json - API key metadata (masked)",
        ],
      };
      fs.writeFileSync(path.join(tempDir, "metadata.json"), JSON.stringify(metadata, null, 2));

      // Create tar.gz archive using tar (available on Linux/macOS)
      const tarResult = spawnSync(
        "tar",
        ["-czf", tarPath, "-C", path.dirname(tempDir), path.basename(tempDir)],
        { timeout: 30000, stdio: "pipe" }
      );
      if (tarResult.status !== 0) {
        throw new Error(`tar failed: ${tarResult.stderr?.toString() ?? "unknown error"}`);
      }

      // Read the archive
      const archiveBuffer = fs.readFileSync(tarPath);

      // Cleanup
      fs.rmSync(tempDir, { recursive: true, force: true });
      fs.unlinkSync(tarPath);

      return new NextResponse(archiveBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/gzip",
          "Content-Disposition": `attachment; filename="omniroute-full-backup-${timestamp}.tar.gz"`,
          "Content-Length": archiveBuffer.length.toString(),
        },
      });
    } catch (innerError) {
      // Cleanup on error
      try {
        if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
        if (fs.existsSync(tarPath)) fs.unlinkSync(tarPath);
      } catch {
        /* ignore cleanup errors */
      }
      throw innerError;
    }
  } catch (error: unknown) {
    console.error("[ExportAll] Error:", error);
    return NextResponse.json(
      {
        error: "Failed to create full export",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
