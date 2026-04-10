/**
 * GET  /api/system/env/repair  — Returns OAuth env repair status
 * POST  /api/system/env/repair  — Backups .env and adds missing OAuth defaults into .env
 *
 * Security: Requires admin authentication (same as other management routes).
 * Safety: Only fills missing OAuth defaults from .env.example.
 */
import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";

const SYNC_HELPER_PATH = join(process.cwd(), "scripts/sync-env.mjs");

async function loadSyncHelpers() {
  return import(pathToFileURL(SYNC_HELPER_PATH).href);
}

function createEnvBackup() {
  const envPath = join(process.cwd(), ".env");

  if (!existsSync(envPath)) {
    return null;
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = join(process.cwd(), `.env.backup-${timestamp}`);
  copyFileSync(envPath, backupPath);
  return backupPath;
}

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { getEnvSyncPlan } = await loadSyncHelpers();
    const plan = getEnvSyncPlan({ scope: "oauth" });

    return NextResponse.json({
      available: plan.available,
      created: plan.created,
      added: plan.added,
      missingCount: plan.missingEntries.length,
      missingKeys: plan.missingEntries.map((entry: { key: string }) => entry.key),
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error)?.message || "Failed to inspect env defaults" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { syncEnv, getEnvSyncPlan } = await loadSyncHelpers();
    const backupPath = createEnvBackup();
    const result = syncEnv({ scope: "oauth", quiet: true });
    const plan = getEnvSyncPlan({ scope: "oauth" });

    return NextResponse.json({
      success: true,
      backupPath,
      created: result.created,
      added: result.added,
      missingCount: plan.missingEntries.length,
      missingKeys: plan.missingEntries.map((entry: { key: string }) => entry.key),
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error)?.message || "Failed to repair env defaults" },
      { status: 500 }
    );
  }
}
