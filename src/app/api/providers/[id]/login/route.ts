import { NextResponse } from "next/server";
import { getProviderConnectionById, updateProviderConnection } from "@/models";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

export const runtime = "nodejs";

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { id } = await params;
  const connection = await getProviderConnectionById(id);
  if (!connection) {
    return NextResponse.json({ success: false, error: "Provider not found" }, { status: 404 });
  }
  if (connection.provider !== "conol-web" && connection.provider !== "cnl") {
    return NextResponse.json(
      { success: false, error: "Browser sign-in is not supported for this provider" },
      { status: 400 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const timeout = isRecord(body) ? body.timeout : undefined;

  try {
    const { startConolBrowserLogin } = await import(
      "@omniroute/open-sse/services/conolBrowserLogin.ts"
    );
    const result = await startConolBrowserLogin(timeout);
    if (!result.success || !result.credentials) {
      return NextResponse.json(result, { status: 400 });
    }

    const providerSpecificData = isRecord(connection.providerSpecificData)
      ? { ...connection.providerSpecificData, ...result.credentials }
      : { ...result.credentials };
    await updateProviderConnection(id, {
      apiKey: JSON.stringify(result.credentials),
      providerSpecificData,
    });

    return NextResponse.json({
      success: true,
      credentials: result.credentials,
      persisted: true,
    });
  } catch (error) {
    const message = sanitizeErrorMessage(error instanceof Error ? error.message : error);
    return NextResponse.json(
      { success: false, error: `Login endpoint error: ${message}` },
      { status: 500 }
    );
  }
}
