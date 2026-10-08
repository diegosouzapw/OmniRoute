import { NextResponse } from "next/server";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import { getSettings, updateSettings } from "@/lib/db/settings";
import {
  DASHBOARD_SESSION_COOKIE,
  REVOKED_SESSIONS_SETTING,
  addRevokedSession,
  verifyDashboardSessionToken,
} from "@/shared/utils/dashboardSessionToken";
import { cookies } from "next/headers";

export const logoutRouteInternals = {
  getCookieStore: cookies,
};

export async function POST(request) {
  const auditContext = getAuditRequestContext(request);
  const cookieStore = await logoutRouteInternals.getCookieStore();

  // Clearing the cookie only ends the session in this browser. A copy of the token would stay
  // valid for the rest of its 30 days, so the session id is also revoked on the server.
  try {
    const payload = await verifyDashboardSessionToken(
      cookieStore.get(DASHBOARD_SESSION_COOKIE)?.value
    );
    if (payload && typeof payload.jti === "string" && typeof payload.exp === "number") {
      const settings = (await getSettings()) as Record<string, unknown>;
      await updateSettings({
        [REVOKED_SESSIONS_SETTING]: addRevokedSession(
          settings[REVOKED_SESSIONS_SETTING],
          { jti: payload.jti, exp: payload.exp },
          Math.floor(Date.now() / 1000)
        ),
      });
    }
  } catch (error) {
    console.error("[auth] Failed to revoke the signed-out session:", error);
  }

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
