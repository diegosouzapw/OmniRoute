import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { getFreeProxyStats } from "@/lib/localDb";
import { getAllProviders } from "@/lib/freeProxyProviders";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const stats = await getFreeProxyStats();
    const providers = getAllProviders().map((p) => ({
      id: p.id,
      name: p.name,
      enabled: p.isEnabled(),
    }));
    return Response.json({ stats, providers });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to get free proxy stats");
  }
}
