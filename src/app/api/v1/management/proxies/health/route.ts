import { getProxyHealthStats } from "@/lib/db/proxies";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getSweepVerdicts } from "@/lib/proxyHealth/sweepVerdict";
import { getBlockedHistory } from "@/lib/proxyHealth/blockedHistory";

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
      const id = String(item.proxyId ?? "");
      const verdict = verdicts[id];
      const out: Record<string, unknown> = { ...item };
      if (verdict) out.sweep = { ...verdict, ageMs: Math.max(0, now - verdict.at) };
      const history = getBlockedHistory(id);
      if (history) out.blockedHistory = { ...history, ageMs: Math.max(0, now - history.lastSeen) };
      return out;
    });
    return Response.json({ items: withSweep, total: withSweep.length, windowHours: hours });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to load proxy health stats");
  }
}
