import { NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { checkQuota } from "@/lib/db/registeredKeys";

/**
 * GET /api/v1/quotas/check?provider=&accountId=
 *
 * Check if a new registered key can be issued for the given provider/account
 * without actually issuing one. Use this to pre-validate before POST /registered-keys.
 */
export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: { message: "Authentication required" } }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const provider = searchParams.get("provider") ?? "";
  const accountId = searchParams.get("accountId") ?? "";

  try {
    const result = checkQuota(provider, accountId);
    return NextResponse.json({
      allowed: result.allowed,
      ...(result.errorCode ? { errorCode: result.errorCode, reason: result.errorMessage } : {}),
      provider: provider || null,
      accountId: accountId || null,
      checkedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[quotas/check] error:", err);
    return NextResponse.json({ error: "Quota check failed" }, { status: 500 });
  }
}
