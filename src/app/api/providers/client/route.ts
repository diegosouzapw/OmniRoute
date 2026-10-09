import { NextResponse } from "next/server";
import { getProviderConnections } from "@/lib/db/providers";
import { maskStoredApiKey } from "@/lib/apiKeyExposure";
import { sanitizeProviderSpecificDataForResponse } from "@/lib/providers/requestDefaults";

// GET /api/providers/client - List connections for the dashboard widgets.
// No consumer needs credentials, and this route is reachable anonymously when
// requireLogin is off, so secrets are masked exactly like GET /api/providers
// (GHSA-qxg2-rm3h-4cxp).
export async function GET() {
  try {
    const connections = await getProviderConnections();

    const clientConnections = connections.map((c) => ({
      ...c,
      apiKey: c.apiKey ? maskStoredApiKey(c.apiKey) : undefined,
      accessToken: undefined,
      refreshToken: undefined,
      idToken: undefined,
      providerSpecificData: c.providerSpecificData
        ? sanitizeProviderSpecificDataForResponse(c.providerSpecificData)
        : undefined,
    }));

    return NextResponse.json({ connections: clientConnections });
  } catch (error) {
    console.log("Error fetching providers for client:", error);
    return NextResponse.json({ error: "Failed to fetch providers" }, { status: 500 });
  }
}
