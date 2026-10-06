import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { ensureCliConfigWriteAllowed } from "@/shared/services/cliRuntime";
import {
  CodexAuthFileError,
  writeCodexAuthFileToLocalCliIfNeeded,
} from "@/lib/oauth/utils/codexAuthFile";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

// Optional body { force?: boolean }. Unknown keys are stripped rather than
// rejected so the endpoint stays tolerant of the empty/no-body calls it
// historically accepted. Non-boolean `force` is coerced away to the default.
const ApplyLocalBodySchema = z
  .object({ force: z.boolean().optional() })
  .partial()
  .passthrough();

function toErrorResponse(error: unknown) {
  if (error instanceof CodexAuthFileError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
      },
      { status: error.status }
    );
  }

  const message = sanitizeErrorMessage(error) || "Failed to apply Codex auth file";
  return NextResponse.json({ error: message }, { status: 500 });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const auditContext = getAuditRequestContext(request);

  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard, code: "writes_disabled" }, { status: 403 });
    }

    const { id } = await params;

    // Optional { force?: boolean } body. By default we DON'T clobber an existing,
    // fresh ~/.codex/auth.json (a session the user may be managing themselves);
    // force overwrites it (a backup is always taken regardless). Malformed/empty
    // bodies are tolerated — this endpoint historically took no body.
    let force = false;
    try {
      const parsed = ApplyLocalBodySchema.safeParse(await request.json());
      force = parsed.success ? parsed.data.force === true : false;
    } catch {
      /* no body — default force=false */
    }

    const applied = await writeCodexAuthFileToLocalCliIfNeeded(id, { force });
    const result = applied.result;

    logAuditEvent({
      action: "provider.credentials.applied",
      actor: "admin",
      target: id,
      resourceType: "provider_credentials",
      status: "success",
      ipAddress: auditContext.ipAddress || undefined,
      requestId: auditContext.requestId,
      metadata: {
        provider: "codex",
        decision: applied.decision,
        authPath: applied.authPath,
        savedBakPath: result?.savedBakPath,
      },
    });

    return NextResponse.json({
      success: true,
      connectionId: id,
      // "skipped_present_fresh" means an existing healthy auth.json was kept.
      decision: applied.decision,
      connectionLabel: result?.connectionLabel,
      authPath: applied.authPath,
      savedBakPath: result?.savedBakPath,
      centralizedBackupPath: result?.centralizedBackupPath,
      writtenAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Codex Auth Apply] Failed:", error);
    return toErrorResponse(error);
  }
}
