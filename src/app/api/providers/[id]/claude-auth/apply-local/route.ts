import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { ensureCliConfigWriteAllowed } from "@/shared/services/cliRuntime";
import {
  ClaudeAuthFileError,
  writeClaudeAuthFileToLocalCli,
} from "@/lib/oauth/utils/claudeAuthFile";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

function toErrorResponse(error: unknown) {
  if (error instanceof ClaudeAuthFileError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
      },
      { status: error.status }
    );
  }

  const message = sanitizeErrorMessage(error) || "Failed to apply Claude auth file";
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
    const result = await writeClaudeAuthFileToLocalCli(id);

    logAuditEvent({
      action: "provider.credentials.applied",
      actor: "admin",
      target: id,
      resourceType: "provider_credentials",
      status: "success",
      ipAddress: auditContext.ipAddress || undefined,
      requestId: auditContext.requestId,
      metadata: {
        provider: "claude",
        authPath: result.authPath,
        savedBakPath: result.savedBakPath,
        centralizedBackupPath: result.centralizedBackupPath,
        mcpOAuthPreserved: result.mcpOAuthPreserved,
      },
    });

    return NextResponse.json({
      success: true,
      connectionId: id,
      connectionLabel: result.connectionLabel,
      authPath: result.authPath,
      savedBakPath: result.savedBakPath,
      centralizedBackupPath: result.centralizedBackupPath,
      mcpOAuthPreserved: result.mcpOAuthPreserved,
      writtenAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Claude Auth Apply] Failed:", error);
    return toErrorResponse(error);
  }
}
