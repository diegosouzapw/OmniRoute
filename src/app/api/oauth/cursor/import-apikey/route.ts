import { NextResponse } from "next/server";
import crypto from "crypto";
import { CursorService } from "@/lib/oauth/services/cursor";
import { createProviderConnection, isCloudEnabled, resolveProxyForProvider } from "@/models";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

/**
 * POST /api/oauth/cursor/import-apikey
 *
 * Import a Cursor "user API key" (`crsr_...`) and exchange it for a JWT.
 *
 * Why this exists:
 *   The legacy /api/oauth/cursor/import flow stores the JWT extracted from
 *   Cursor IDE's local SQLite. That JWT expires after ~1h and there is no
 *   refresh path without Cursor IDE running (the IDE renews the row
 *   in state.vscdb internally).
 *
 *   This route stores the long-lived `crsr_...` instead, allowing the
 *   CursorExecutor.refreshCredentials() to mint a fresh JWT on demand
 *   by re-calling POST https://api2.cursor.sh/auth/exchange_user_api_key
 *   — the exact same mechanism cursor-agent CLI uses internally.
 *
 * Connection identity:
 *   We store as `authType: "apikey"` and dedup by `name` (the user-supplied
 *   label), so a single Cursor account can host multiple API-key connections
 *   for load balancing. The OAuth flow (/api/oauth/cursor/import) still
 *   dedups by email and is unaffected.
 *
 * Request body:
 *   - apiKey: string  (long-lived Cursor user API key, starts with "crsr_")
 *   - label?: string  (optional display name for the connection)
 *   - machineId?: string  (optional; auto-generated UUID if absent)
 */

async function requireOAuthImportAuth(request: Request) {
  if (!(await isAuthRequired(request))) return null;
  if (await isAuthenticated(request)) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(request: Request) {
  const authResponse = await requireOAuthImportAuth(request);
  if (authResponse) return authResponse;

  let rawBody: Record<string, unknown>;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
  }

  try {
    const { apiKey, label, machineId: providedMachineId } = rawBody;

    if (!apiKey || typeof apiKey !== "string" || !apiKey.trim()) {
      return NextResponse.json({ error: "API key is required" }, { status: 400 });
    }

    const key = apiKey.trim();
    if (!key.startsWith("crsr_")) {
      return NextResponse.json(
        { error: "Invalid Cursor API key format (expected to start with 'crsr_')" },
        { status: 400 }
      );
    }

    // Resolve proxy for this provider
    const proxy = await resolveProxyForProvider("cursor");

    // 1. Exchange API key for an initial JWT to validate.
    const res = await runWithProxyContext(proxy, () =>
      fetch("https://api2.cursor.sh/auth/exchange_user_api_key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: "{}",
      })
    );

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        {
          error: `Cursor rejected the API key (HTTP ${res.status}): ${sanitizeErrorMessage(text.slice(0, 200))}`,
        },
        { status: 401 }
      );
    }

    const data = (await res.json()) as Record<string, unknown>;
    const accessToken = data?.accessToken as string | undefined;
    const refreshToken = (data?.refreshToken as string) || null;
    if (!accessToken) {
      return NextResponse.json({ error: "Cursor response missing accessToken" }, { status: 502 });
    }

    // 2. Decode JWT exp for accurate expiresAt; fall back to 1h.
    let expSeconds = Math.floor(Date.now() / 1000) + 3600;
    try {
      const payload = accessToken.split(".")[1];
      if (payload) {
        const decoded = JSON.parse(Buffer.from(payload, "base64").toString());
        if (Number.isFinite(decoded?.exp)) expSeconds = decoded.exp;
      }
    } catch {
      // non-JWT token, keep fallback
    }

    // 3. Try to extract identity (email / sub) from JWT for connection naming.
    const cursorService = new CursorService();
    const userInfo = cursorService.extractUserInfo(accessToken);

    // 4. machineId: API-key flow has no real serviceMachineId — generate a
    //    stable random UUID per connection. Cursor's checksum header only
    //    needs a UUID-shaped value; the server does not bind it to anything.
    const machineId =
      (typeof providedMachineId === "string" && providedMachineId.trim()) || crypto.randomUUID();

    // 5. Derive a unique `name` for dedup. createProviderConnection dedups
    //    apikey connections by name, so distinct labels => distinct rows,
    //    enabling multi-key load balancing under the same Cursor account.
    const trimmedLabel = typeof label === "string" && label.trim();
    const connectionName =
      trimmedLabel ||
      (userInfo?.email ? `${userInfo.email} (${key.slice(-6)})` : null) ||
      `Cursor ${key.slice(-6)}`;

    // 6. Persist. The long-lived `apiKey` lives in providerSpecificData so
    //    CursorExecutor.refreshCredentials() can re-exchange it on 401/403.
    const connection: any = await createProviderConnection({
      provider: "cursor",
      authType: "apikey",
      name: connectionName,
      accessToken,
      refreshToken,
      expiresAt: new Date(expSeconds * 1000).toISOString(),
      email: userInfo?.email || null,
      providerSpecificData: {
        machineId,
        apiKey: key,
        authMethod: "apikey",
        provider: "API Key",
        userId: userInfo?.userId || null,
      },
      testStatus: "active",
    });

    // Auto sync to Cloud if enabled
    await syncToCloudIfEnabled();

    return NextResponse.json({
      success: true,
      connection: {
        id: connection.id,
        provider: connection.provider,
        email: connection.email,
      },
    });
  } catch (error: any) {
    console.error("Cursor import-apikey error:", error);
    return NextResponse.json(
      { error: sanitizeErrorMessage(error.message || "Internal server error") },
      { status: 500 }
    );
  }
}

/**
 * GET /api/oauth/cursor/import-apikey
 * Instructions for importing a Cursor API key
 */
export async function GET(request: Request) {
  const authResponse = await requireOAuthImportAuth(request);
  if (authResponse) return authResponse;

  return NextResponse.json({
    provider: "cursor",
    method: "import_apikey",
    instructions: {
      title: "How to get your Cursor API key",
      steps: [
        "1. Open Cursor IDE and go to Settings",
        "2. Navigate to the Account or API section",
        "3. Generate or copy your API key (starts with 'crsr_')",
        "4. Paste the key below",
      ],
    },
    requiredFields: [
      {
        name: "apiKey",
        label: "Cursor API Key",
        description: "Your Cursor user API key, starting with 'crsr_'",
        type: "password",
      },
      {
        name: "label",
        label: "Display Name (optional)",
        description: "A name to help you identify this API key connection",
        type: "text",
      },
    ],
  });
}

/**
 * Sync to Cloud if enabled
 */
async function syncToCloudIfEnabled() {
  try {
    const cloudEnabled = await isCloudEnabled();
    if (!cloudEnabled) return;

    const machineId = await getConsistentMachineId();
    await syncToCloud(machineId);
  } catch (error) {
    console.log("Error syncing to cloud after Cursor apikey import:", error);
  }
}
