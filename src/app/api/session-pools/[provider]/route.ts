import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getWebSessionPoolHealth } from "@omniroute/open-sse/services/webSessionPoolHealth";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ provider: string }> }
): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { provider } = await params;

  try {
    const report = getWebSessionPoolHealth(provider);
    const poolData = report.providers[0];

    if (!poolData) {
      return NextResponse.json(
        { error: `No session pool found for provider '${provider}'` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      checkedAt: report.checkedAt,
      ...poolData,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to get session pool health";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
