import { NextResponse } from "next/server";
import { pluginManager } from "@/lib/plugins/manager";
import { isAuthRequired, isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";

const CORS_HEADERS = {
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

function errorResp(status: number, message: string): Response {
  return new Response(JSON.stringify(buildErrorBody(status, sanitizeErrorMessage(message))), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

async function checkAuth(request: Request): Promise<Response | null> {
  // Auth disabled globally — allow all requests
  if (!(await isAuthRequired(request))) return null;

  // Dashboard session cookie — valid for browser-based access
  if (await isDashboardSessionAuthenticated(request)) return null;

  // API key fallback for programmatic access
  const apiKeyRaw = extractApiKey(request);
  if (apiKeyRaw && (await isValidApiKey(apiKeyRaw))) return null;

  return errorResp(HTTP_STATUS.UNAUTHORIZED, "Authentication required");
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function GET(request: Request) {
  const authError = await checkAuth(request);
  if (authError) return authError;

  try {
    const extensions = pluginManager.getUiExtensions();
    return NextResponse.json(extensions);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch UI extensions" },
      { status: 500 }
    );
  }
}