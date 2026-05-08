import { isAuthRequired, isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";
import { createErrorResponse } from "@/lib/api/errorResponse";

export async function requireManagementAuth(request: Request): Promise<Response | null> {
  if (!(await isAuthRequired(request))) {
    return null;
  }

  if (await isDashboardSessionAuthenticated(request)) {
    return null;
  }

  const authHeader = request.headers.get("authorization");
  const hasBearerToken =
    typeof authHeader === "string" && authHeader.trim().toLowerCase().startsWith("bearer ");

  return createErrorResponse({
    status: hasBearerToken ? 403 : 401,
    message: hasBearerToken ? "Invalid management token" : "Authentication required",
    type: "invalid_request",
  });
}
