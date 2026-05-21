import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { GeminiAuthFileError } from "@/lib/oauth/utils/geminiAuthFile";
import {
  parseAndValidateGeminiAuth,
  enrichWithLoadCodeAssist,
  createConnectionFromAuthFile,
} from "@/lib/oauth/utils/geminiAuthImport";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import { getProviderAuditTarget } from "@/lib/compliance/providerAudit";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { importGeminiAuthSchema } from "@/shared/validation/schemas";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { sanitizeProviderSpecificDataForResponse } from "@/lib/providers/requestDefaults";

function sanitizeConnectionForResponse(connection: Record<string, unknown>) {
  const safe = { ...connection };
  delete safe.accessToken;
  delete safe.refreshToken;
  delete safe.idToken;
  delete safe.apiKey;
  if (safe.providerSpecificData) {
    safe.providerSpecificData = sanitizeProviderSpecificDataForResponse(safe.providerSpecificData);
  }
  return safe;
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const auditContext = getAuditRequestContext(request);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsedBody = validateBody(importGeminiAuthSchema, body);
  if (isValidationFailure(parsedBody)) {
    return NextResponse.json({ error: parsedBody.error }, { status: 400 });
  }

  const { source, name, email, overwriteExisting } = parsedBody.data;

  let rawJson: unknown;
  try {
    rawJson = source.kind === "json" ? source.json : JSON.parse(source.text);
  } catch {
    return NextResponse.json(
      { error: "Could not parse the content as JSON", code: "invalid_json" },
      { status: 400 }
    );
  }

  try {
    const parsed = parseAndValidateGeminiAuth(rawJson);
    const enriched = await enrichWithLoadCodeAssist(parsed);
    const { connection, created } = await createConnectionFromAuthFile(enriched, {
      name,
      email,
      overwriteExisting,
    });

    logAuditEvent({
      action: "provider.credentials.imported",
      actor: "admin",
      target: getProviderAuditTarget(connection),
      resourceType: "provider_credentials",
      status: "success",
      ipAddress: auditContext.ipAddress || undefined,
      requestId: auditContext.requestId,
      metadata: {
        provider: "gemini-cli",
        created,
        email: enriched.email || email,
        hasProjectId: !!enriched.projectId,
      },
    });

    return NextResponse.json({
      connection: sanitizeConnectionForResponse(connection as Record<string, unknown>),
      created,
    });
  } catch (error) {
    if (error instanceof GeminiAuthFileError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { error: sanitizeErrorMessage(error) || "Failed to import Gemini auth" },
      { status: 500 }
    );
  }
}
