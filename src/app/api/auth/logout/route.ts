import { NextResponse } from "next/server";
import { methodNotAllowed } from "@/app/api/_utils/methodNotAllowed";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import { cookies } from "next/headers";

export const logoutRouteInternals = {
  getCookieStore: cookies,
};

const ALLOWED_METHODS = ["POST"];

export function TRACE() {
  return methodNotAllowed(ALLOWED_METHODS);
}

export async function POST(request) {
  const auditContext = getAuditRequestContext(request);
  const cookieStore = await logoutRouteInternals.getCookieStore();
  cookieStore.delete("auth_token");
  logAuditEvent({
    action: "auth.logout.success",
    actor: "admin",
    target: "dashboard-auth",
    resourceType: "auth_session",
    status: "success",
    ipAddress: auditContext.ipAddress || undefined,
    requestId: auditContext.requestId,
  });
  return NextResponse.json({ success: true });
}
