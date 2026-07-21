import { listProxies } from "@/lib/localDb";
import {
  handleProxyCreate,
  handleProxyDelete,
  handleProxyUpdate,
  resolveProxyLookupResponse,
} from "@/lib/api/proxyRegistryRouteHandlers";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  isRelayAuthMissing,
  isRelayProxyType,
  redactProxySecrets,
  relayRepairMode,
} from "@/lib/db/proxies/mappers";
import { getRelayProbeStats } from "@/lib/db/relayProbeStats";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { searchParams } = new URL(request.url);
    const lookupResponse = await resolveProxyLookupResponse(searchParams, "whereUsed");
    if (lookupResponse) return lookupResponse;

    // Load with secrets so we can derive relay repair state (whether a relay's
    // auth is missing and whether it can be recovered in place vs needs a
    // redeploy). The secrets themselves never leave the server — we redact each
    // row before responding and only surface the derived relayInfo booleans.
    const rawProxies = await listProxies({ includeSecrets: true });
    const items = rawProxies.items.map((p) => ({
      ...redactProxySecrets(p),
      relayInfo: {
        isRelay: isRelayProxyType(p.type),
        authMissing: isRelayAuthMissing(p.notes, p.type),
        repairMode: relayRepairMode(p.notes, p.type),
      },
    }));
    return Response.json({
      items,
      total: rawProxies.total,
      // #5890: coarse relay health pulse for the dashboard — how many relay
      // probes have run, and how many came back alive.
      relayProbeStats: getRelayProbeStats(),
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
