import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { ensureCliConfigWriteAllowed } from "@/shared/services/cliRuntime";
import {
  GeminiAuthFileError,
  writeGeminiAuthFileToLocalCli,
} from "@/lib/oauth/utils/geminiAuthFile";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

function toErrorResponse(error: unknown) {
  if (error instanceof GeminiAuthFileError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
      },
      { status: error.status }
    );
  }

  const message = sanitizeErrorMessage(error) || "Failed to apply Gemini auth file";
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
    const result = await writeGeminiAuthFileToLocalCli(id);

    logAuditEvent({
      action: "provider.credentials.applied",
      actor: "admin",
      target: id,
      resourceType: "provider_credentials",
      status: "success",
      ipAddress: auditContext.ipAddress || undefined,
      requestId: auditContext.requestId,
      metadata: {
        provider: "gemini-cli",
        authPath: result.authPath,
        accountsPath: result.accountsPath,
        savedBakPath: result.savedBakPath,
        centralizedBackupPath: result.centralizedBackupPath,
        googleAccountsUpdated: result.googleAccountsUpdated,
      },
    });

    return NextResponse.json({
      success: true,
      connectionId: id,
      connectionLabel: result.connectionLabel,
      email: result.email,
      authPath: result.authPath,
      accountsPath: result.accountsPath,
      savedBakPath: result.savedBakPath,
      savedAccountsBakPath: result.savedAccountsBakPath,
      centralizedBackupPath: result.centralizedBackupPath,
      googleAccountsUpdated: result.googleAccountsUpdated,
      writtenAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Gemini Auth Apply] Failed:", error);
    return toErrorResponse(error);
  }
}
