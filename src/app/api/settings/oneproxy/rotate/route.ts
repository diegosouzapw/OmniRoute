// Compat redirect: 1 release — /rotate foi descontinuado junto com o sistema 1proxy legado.
// O conceito mais próximo no novo sistema é forçar uma sincronização das fontes de free proxy.
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return new Response(null, {
    status: 308,
    headers: { Location: "/api/settings/free-proxies/sync" },
  });
}
