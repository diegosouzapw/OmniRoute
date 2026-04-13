import { NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getFreepikAccountInfo } from "@omniroute/open-sse/handlers/imageGeneration.ts";
import { getProviderCredentials } from "@/sse/services/auth";

/**
 * GET /api/v1/providers/freepik/account?type=wallet|limits
 *
 * Proxies Freepik Pikaso account endpoints (wallet balance, usage limits).
 * Requires a configured Freepik provider with cookie credentials.
 *
 * Query params:
 *   type: "wallet" | "limits" (default: "wallet")
 */
export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: { message: "Authentication required" } }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") === "limits" ? "limits" : "wallet";

  // Get freepik credentials from the provider store
  const credentials = await getProviderCredentials("freepik");
  const cookie = credentials?.apiKey || credentials?.accessToken;

  if (!cookie) {
    return NextResponse.json(
      { error: { message: "No Freepik credentials configured. Add a Freepik provider with your browser cookie." } },
      { status: 404 }
    );
  }

  const result = await getFreepikAccountInfo(cookie, type);

  if (result && typeof result === "object" && "error" in result) {
    return NextResponse.json({ error: { message: result.error } }, { status: 502 });
  }

  return NextResponse.json(result);
}
