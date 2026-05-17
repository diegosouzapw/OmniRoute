import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { ensureCliConfigWriteAllowed } from "@/shared/services/cliRuntime";
import { CodexAuthFileError, writeCodexAuthFileToLocalCli } from "@/lib/oauth/utils/codexAuthFile";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

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
    const result = await writeCodexAuthFileToLocalCli(id);

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
        authPath: result.authPath,
        savedBakPath: result.savedBakPath,
      },
    });

    return NextResponse.json({
      success: true,
      connectionId: id,
      connectionLabel: result.connectionLabel,
      authPath: result.authPath,
      savedBakPath: result.savedBakPath,
      centralizedBackupPath: result.centralizedBackupPath,
      writtenAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Codex Auth Apply] Failed:", error);
    return toErrorResponse(error);
  }
}
