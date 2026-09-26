import { getProxyHealthStats } from "@/lib/db/proxies";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getSweepVerdicts } from "@/lib/proxyHealth/sweepVerdict";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const hours = Number(searchParams.get("hours") || 24);
    const items = await getProxyHealthStats({ hours });
    const verdicts = getSweepVerdicts(items.map((item) => String(item.proxyId ?? "")));
    const now = Date.now();
    const withSweep = items.map((item) => {
      const verdict = verdicts[String(item.proxyId ?? "")];
      if (!verdict) return item;
      const sweep = { ...verdict, ageMs: Math.max(0, now - verdict.at) };
      return { ...item, sweep };
    });
    return Response.json({ items: withSweep, total: withSweep.length, windowHours: hours });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to load proxy health stats");
  }
}
