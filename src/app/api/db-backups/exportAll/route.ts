import { NextRequest, NextResponse } from "next/server";
import { getDbInstance, SQLITE_FILE } from "@/lib/db/core";
import { exportAllSummaryRows } from "@/lib/db/backup";
import { getCallLogsDir } from "@/lib/usage/callLogArtifacts";
import fs from "fs";
import path from "path";
import os from "os";
import { execFileSync } from "node:child_process";
import {
  CREDENTIAL_EXPORT_FORBIDDEN_MESSAGE,
  requireOperatorCredential,
} from "@/lib/api/operatorCredential";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

/**
 * GET /api/db-backups/exportAll
 * Exports the entire database + settings as a tar.gz archive
 * Security: operator-only (dashboard session, local CLI, or login disabled); API keys
 * and `oma_` access tokens get 403.
 */
export async function GET(request: NextRequest) {
  // Hands out every stored credential: operator only (dashboard session, local CLI, or login
  // disabled). API keys of any scope and `oma_` access tokens get 403.
  const operatorVerdict = await requireOperatorCredential(request, {
    forbiddenMessage: CREDENTIAL_EXPORT_FORBIDDEN_MESSAGE,
  });
  if (operatorVerdict.ok === false) return operatorVerdict.response;

  return buildFullExportResponse();
}

async function buildFullExportResponse(): Promise<Response> {
  try {
    if (!SQLITE_FILE) {
      return NextResponse.json(
        { error: "Export is only available in local (non-cloud) mode" },
        { status: 400 }
      );
    }

    const db = getDbInstance();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    // Use mkdtempSync (exclusive creation, random suffix) instead of a
    // deterministic timestamp path — a predictable path lets a local
    // attacker pre-place a symlink and redirect the write (TOCTOU).
    const workDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-export-"));
    const payloadDir = path.join(workDir, path.basename(workDir));
    const archiveName = `omniroute-full-backup-${timestamp}.tar.gz`;
    const tarPath = path.join(workDir, archiveName);

    try {
      fs.mkdirSync(payloadDir);
      // 1. Export database using native backup API
      const dbBackupPath = path.join(payloadDir, "storage.sqlite");
      await db.backup(dbBackupPath);

      // 2–5. Export settings, combos, provider connections, API keys (via db module)
      const { settings, combos, providers, apiKeys, reasoningRoutingRules } =
        exportAllSummaryRows();
      fs.writeFileSync(path.join(payloadDir, "settings.json"), JSON.stringify(settings, null, 2));
      fs.writeFileSync(path.join(payloadDir, "combos.json"), JSON.stringify(combos, null, 2));
      fs.writeFileSync(path.join(payloadDir, "providers.json"), JSON.stringify(providers, null, 2));
      fs.writeFileSync(path.join(payloadDir, "api-keys.json"), JSON.stringify(apiKeys, null, 2));
      fs.writeFileSync(
        path.join(payloadDir, "reasoning-routing-rules.json"),
        JSON.stringify(reasoningRoutingRules, null, 2)
      );

      // 6. Export call log artifacts directory
      const callLogsDir = getCallLogsDir();
      if (callLogsDir && fs.existsSync(callLogsDir)) {
        fs.cpSync(callLogsDir, path.join(payloadDir, "call_logs"), { recursive: true });
      }

      // 7. Export metadata
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
          "reasoning-routing-rules.json - Reasoning routing policies",
          "call_logs/ - Detailed call log artifacts",
        ],
      };
      fs.writeFileSync(path.join(payloadDir, "metadata.json"), JSON.stringify(metadata, null, 2));

      // A bare filename avoids GNU tar interpreting a Windows drive colon as a
      // remote archive. The exclusive work directory also isolates concurrent exports.
      execFileSync("tar", ["-czf", archiveName, path.basename(payloadDir)], {
        cwd: workDir,
        timeout: 30000,
      });
      const archiveBuffer = fs.readFileSync(tarPath);

      return new NextResponse(archiveBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/gzip",
          "Content-Disposition": `attachment; filename="omniroute-full-backup-${timestamp}.tar.gz"`,
          "Content-Length": archiveBuffer.length.toString(),
        },
      });
    } finally {
      // Includes partial archives from tar failures and timeouts.
      try {
        fs.rmSync(workDir, { recursive: true, force: true });
      } catch {
        // Cleanup must not replace the original export error or response.
      }
    }
  } catch (error: unknown) {
    console.error("[ExportAll] Error:", error);
    return NextResponse.json(
      {
        error: "Failed to create full export",
        details: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)),
      },
      { status: 500 }
    );
  }
}
