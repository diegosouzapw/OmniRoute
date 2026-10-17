import { NextResponse } from "next/server";
import { getCombos, importCombos } from "@/lib/db/combos";
import { getProviderConnections } from "@/lib/db/providers";
import { isCloudEnabled } from "@/lib/db/settings";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { ComboInvariantError } from "@/lib/combos/invariants";
import { combosImportFileSchema, prepareComboImport } from "@/lib/combos/portable";
import {
  formatValidationMessage,
  isValidationFailure,
  validateBody,
} from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

/**
 * POST /api/combos/import
 * Body: a combos-only export file plus optional `mode` ("merge" default, or
 * "replace"). Merge never touches existing combos (name conflicts are skipped
 * and reported); replace swaps every user-visible combo for the file inside one
 * transaction. The whole file is validated before anything is written.
 */
export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return importError("COMBO_001", "Invalid JSON body");
  }

  const validation = validateBody(combosImportFileSchema, body);
  if (isValidationFailure(validation)) {
    return NextResponse.json(
      { error: { ...validation.error, message: formatValidationMessage(validation.error) } },
      { status: 400 }
    );
  }

  try {
    const mode = validation.data.mode ?? "merge";
    const existing = await getCombos();
    const connections = await getProviderConnections();
    const knownProviders = new Set(
      connections
        .map((connection) => connection.provider)
        .filter((provider): provider is string => typeof provider === "string")
    );
    const prepared = prepareComboImport(validation.data.combos, { existing, mode, knownProviders });
    if (prepared.ok === false) {
      return importError(prepared.code, prepared.message);
    }

    const { toCreate, skipped, warnings } = prepared.value;
    const result = await importCombos(toCreate, { replaceVisible: mode === "replace" });
    await syncToCloudIfEnabled();

    return NextResponse.json({
      mode,
      created: result.created.map((combo) => combo.name),
      skipped,
      removed: result.removed,
      warnings,
    });
  } catch (error) {
    if (error instanceof ComboInvariantError) {
      return importError("COMBO_008", sanitizeErrorMessage(error.message));
    }
    console.error("[API] Error importing combos:", error);
    return NextResponse.json({ error: "Failed to import combos" }, { status: 500 });
  }
}

/** 400 envelope whose message names the offending combo (already sanitized). */
function importError(code: string, message: string) {
  return NextResponse.json({ error: { code, message } }, { status: 400 });
}

async function syncToCloudIfEnabled() {
  try {
    if (!(await isCloudEnabled())) return;
    await syncToCloud(await getConsistentMachineId());
  } catch (error) {
    console.log("Error syncing to cloud:", error);
  }
}
