import { NextResponse } from "next/server";
import { getDbInstance } from "@/lib/db/core";
import { backupDbFile } from "@/lib/db/backup";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";
import { runJsonMigration, type LegacyJsonData } from "@/lib/db/jsonMigration";

/**
 * POST /api/settings/import-json
 *
 * Imports a legacy 9router / OmniRoute JSON backup into the current SQLite
 * database.  Accepts either multipart/form-data (file field) or a raw JSON body.
 *
 * 🔒 Auth-guarded.
 * 🔒 Zero-Trust: password and requireLogin keys are stripped before insertion.
 * 🔒 A pre-import backup is created automatically before any data is written.
 */
export async function POST(request: Request) {
  if (await isAuthRequired(request)) {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    let rawText: string | null = null;
    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      if (!file) return NextResponse.json({ error: "No json file provided" }, { status: 400 });
      rawText = await file.text();
    } else {
      rawText = await request.text();
    }

    if (!rawText?.trim()) {
      return NextResponse.json({ error: "Empty request payload" }, { status: 400 });
    }

    // Parse with explicit 400 on malformed JSON (Gemini suggestion)
    let data: LegacyJsonData;
    try {
      data = JSON.parse(rawText) as LegacyJsonData;
    } catch {
      return NextResponse.json(
        {
          error: "Invalid JSON: the file could not be parsed. Please upload a valid .json backup.",
        },
        { status: 400 }
      );
    }

    // 🔒 Zero-Trust: strip authentication config before migration
    if (data.settings) {
      const { password: _pw, requireLogin: _rl, ...safeSettings } = data.settings;
      data = { ...data, settings: safeSettings };
    }

    const db = getDbInstance();

    // Create a safety backup before writing anything
    backupDbFile("pre-json-import");

    // Delegate the actual migration to the shared helper (avoids duplication with core.ts)
    const counts = runJsonMigration(db, data);

    console.log(
      `[JSON Import] Imported ${counts.connections} connections, ${counts.nodes} nodes, ` +
        `${counts.combos} combos, ${counts.apiKeys} API keys, ` +
        `${counts.usageHistory} usage rows, ${counts.domainCostHistory} cost rows, ` +
        `${counts.domainBudgets} budgets`
    );

    return NextResponse.json({
      success: true,
      message: "Legacy JSON database imported successfully",
      ...counts,
    });
  } catch (err) {
    console.error("[API] Error importing JSON backup:", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
