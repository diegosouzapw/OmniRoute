import { listProxies } from "@/lib/localDb";
import {
  handleProxyCreate,
  handleProxyDelete,
  handleProxyUpdate,
  resolveProxyLookupResponse,
} from "@/lib/api/proxyRegistryRouteHandlers";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { searchParams } = new URL(request.url);
    const lookupResponse = await resolveProxyLookupResponse(searchParams, "whereUsed");
    if (lookupResponse) return lookupResponse;

    const proxies = await listProxies({ includeSecrets: false });
    // #3508: expose the SOCKS5 feature flag at runtime so the dashboard reflects the live
    // ENABLE_SOCKS5_PROXY env (the UI previously gated on NEXT_PUBLIC_*, which is baked at
    // build time and ignored a runtime Docker env).
    return Response.json({
      items: proxies,
      total: proxies.length,
      // Default ON (opt-out): only an explicit falsey value disables SOCKS5.
      socks5Enabled: !["false", "0", "no", "off"].includes(
        (process.env.ENABLE_SOCKS5_PROXY ?? "").trim().toLowerCase()
      ),
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to load proxies");
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return handleProxyCreate(request);
}

export async function PATCH(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return handleProxyUpdate(request);
}

export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return handleProxyDelete(request);
}
