import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { cookies } from "next/headers";
import {
  getDashboardJwtSecret,
  verifyDashboardSessionToken,
  DASHBOARD_SESSION_COOKIE,
} from "@/shared/utils/dashboardSessionToken";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(DASHBOARD_SESSION_COOKIE)?.value;
    const secret = getDashboardJwtSecret();

    if (!token || !secret) {
      return NextResponse.json({ authenticated: false });
    }

    const payload = await verifyDashboardSessionToken(token, secret);
    return NextResponse.json({ authenticated: payload !== null });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
