/**
 * GET  /api/system/env/repair  — Returns OAuth env repair status
 * POST  /api/system/env/repair  — Backups .env and adds missing OAuth defaults into .env
 *
 * Security: Requires admin authentication (same as other management routes).
 * Safety: Only fills missing OAuth defaults from .env.example.
 */
import { copyFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
// @ts-expect-error - .mjs without types
import { getEnvSyncPlan, syncEnv } from "../../../../../../scripts/dev/sync-env.mjs";

async function loadSyncHelpers() {
  return { getEnvSyncPlan, syncEnv };
}

function resolveEnvTargetDir() {
  const configured = process.env.DATA_DIR?.trim();
  return configured ? resolve(configured) : process.cwd();
}

function createEnvBackup(envDir: string) {
  const envPath = join(envDir, ".env");

  if (!existsSync(envPath)) {
    return null;
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = join(envDir, `.env.backup-${timestamp}`);
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
    // The standalone server runs from dist/, which is intentionally read-only.
    // Read .env.example from there, but inspect the writable DATA_DIR/.env.
    const plan = getEnvSyncPlan({
      scope: "oauth",
      rootDir: process.cwd(),
      envDir: resolveEnvTargetDir(),
    });

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
    const envDir = resolveEnvTargetDir();
    const backupPath = createEnvBackup(envDir);
    const syncOptions = { scope: "oauth", rootDir: process.cwd(), envDir };
    const result = syncEnv({ ...syncOptions, quiet: true });
    const plan = getEnvSyncPlan(syncOptions);

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
