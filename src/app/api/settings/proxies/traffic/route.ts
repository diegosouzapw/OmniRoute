import { getProxyTraffic } from "@/lib/db/proxyTraffic";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    return Response.json(getProxyTraffic(), { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to load proxy payload traffic");
  }
}
