import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import {
  getProvider,
  generateAuthData,
  exchangeTokens,
  requestDeviceCode,
  pollForToken,
} from "@/lib/oauth/providers";
import {
  createProviderConnection,
  updateProviderConnection,
  getProviderConnections,
  isCloudEnabled,
  resolveProxyForProvider,
} from "@/models";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { startLocalServer } from "@/lib/oauth/utils/server";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import {
  jsonObjectSchema,
  oauthExchangeSchema,
  oauthPollSchema,
} from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

// Use globalThis to persist callback server state across Next.js HMR reloads
if (!globalThis.__codexCallbackState) {
  globalThis.__codexCallbackState = null;
}

/**
 * Constant-time string comparison to prevent timing-oracle attacks (CWE-208).
 * Handles null/undefined safely and different-length strings.
 */
function safeEqual(a: string | null | undefined, b: string | null | undefined): boolean {
  if (a == null || b == null) return a === b;
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/**
 * Dynamic OAuth API Route
 * Handles: authorize, exchange, device-code, poll, start-callback-server, poll-callback
 */

// GET /api/oauth/[provider]/authorize - Generate auth URL
// GET /api/oauth/[provider]/device-code - Request device code (for device_code flow)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ provider: string; action: string }> }
) {
  try {
    const { provider, action } = await params;
    const { searchParams } = new URL(request.url);

    if (action === "authorize") {
      const redirectUri = searchParams.get("redirect_uri") || "http://localhost:8080/callback";
      const authData = generateAuthData(provider, redirectUri);
      if (provider === "qoder" && !authData.authUrl) {
        return NextResponse.json({
          ...authData,
          supported: false,
          error:
            "Qoder browser OAuth is experimental and disabled by default. Configure QODER_OAUTH_* environment variables or use a Personal Access Token.",
        });
      }
      return NextResponse.json(authData);
    }

    if (action === "device-code") {
      const providerData = getProvider(provider);
      if (providerData.flowType !== "device_code") {
        return NextResponse.json(
          { error: "Provider does not support device code flow" },
          { status: 400 }
        );
      }

      const authData = generateAuthData(provider, null);

      // Resolve proxy for this provider (provider-level → global → direct)
      const proxy = await resolveProxyForProvider(provider);

      // Request device code (through proxy if configured)
      let deviceData;
      if (
        provider === "github" ||
        provider === "kiro" ||
        provider === "amazon-q" ||
        provider === "kimi-coding" ||
        provider === "kilocode"
      ) {
        // GitHub, Kiro/Amazon Q, Kimi Coding, and KiloCode don't use PKCE for device code
        deviceData = await runWithProxyContext(proxy, () => (requestDeviceCode as any)(provider));
      } else {
        // Qwen and other providers use PKCE
        deviceData = await runWithProxyContext(proxy, () =>
          requestDeviceCode(provider, authData.codeChallenge)
        );
      }

      return NextResponse.json({
        ...deviceData,
        codeVerifier: authData.codeVerifier,
      });
    }

    if (action === "start-callback-server") {
      return await handleStartCallbackServer(provider, searchParams);
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.log("OAuth GET error:", error);
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}

/**
 * Start Codex callback server on port 1455
 * Returns the auth URL and stores codeVerifier for later exchange
 */
async function handleStartCallbackServer(provider: string, searchParams: URLSearchParams) {
  if (provider !== "codex") {
    return NextResponse.json(
      { error: "Callback server only supported for codex" },
      { status: 400 }
    );
  }

  // Clean up existing server if any
  if (globalThis.__codexCallbackState?.close) {
    try {
      globalThis.__codexCallbackState.close();
    } catch (e) {
      /* ignore */
    }
  }
  globalThis.__codexCallbackState = null;

  try {
    // Start temp server on port 1455
    const { port, close } = await startLocalServer((params) => {
      // Write directly to globalThis so it survives module reloads
      if (globalThis.__codexCallbackState) {
        globalThis.__codexCallbackState.callbackParams = params;
      }
    }, 1455);

    const redirectUri = `http://localhost:${port}/auth/callback`;
    const authData = generateAuthData(provider, redirectUri);

    globalThis.__codexCallbackState = {
      callbackParams: null,
      close,
      port,
      redirectUri,
      codeVerifier: authData.codeVerifier,
      startedAt: Date.now(),
    };

    // Auto-cleanup after 5 minutes
    const startedAt = Date.now();
    setTimeout(() => {
      if (globalThis.__codexCallbackState?.startedAt === startedAt) {
        try {
          close();
        } catch (e) {
          /* ignore */
        }
        globalThis.__codexCallbackState = null;
      }
    }, 300000);

    return NextResponse.json({
      authUrl: authData.authUrl,
      codeVerifier: authData.codeVerifier,
      redirectUri,
      serverPort: port,
    });
  } catch (error) {
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}

// POST /api/oauth/[provider]/exchange - Exchange code for tokens and save
// POST /api/oauth/[provider]/poll - Poll for token (device_code flow)
export async function POST(
  request: Request,
  { params }: { params: Promise<{ provider: string; action: string }> }
) {
  try {
    const { provider, action } = await params;
    let rawBody: any = {};
    try {
      rawBody = await request.json();
    } catch {
      if (action !== "poll-callback") {
        return NextResponse.json(
          {
            error: {
              message: "Invalid request",
              details: [{ field: "body", message: "Invalid JSON body" }],
            },
          },
          { status: 400 }
        );
      }
    }

    let body: any = rawBody;
    if (action === "exchange") {
      const validation = validateBody(oauthExchangeSchema, rawBody);
      if (isValidationFailure(validation)) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
      }
      body = validation.data;
    } else if (action === "poll") {
      const validation = validateBody(oauthPollSchema, rawBody);
      if (isValidationFailure(validation)) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
      }
      body = validation.data;
    } else if (action === "poll-callback") {
      const validation = validateBody(jsonObjectSchema, rawBody || {});
      if (isValidationFailure(validation)) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
      }
      body = validation.data;
    }

    if (action === "exchange") {
      const { code, redirectUri, codeVerifier, state } = body;
      const normalizedState = typeof state === "string" && state.length > 0 ? state : undefined;
      const providerData = getProvider(provider);

      if (providerData.flowType === "authorization_code_pkce" && !codeVerifier) {
        return NextResponse.json(
          {
            error: {
              message: "Invalid request",
              details: [
                {
                  field: "codeVerifier",
                  message: `Code verifier is required for ${provider} OAuth exchange`,
                },
              ],
            },
          },
          { status: 400 }
        );
      }

      // Resolve proxy for this provider (provider-level → global → direct)
      const proxy = await resolveProxyForProvider(provider);

      // Exchange code for tokens (through proxy if configured)
      const tokenData = await runWithProxyContext(proxy, () =>
        exchangeTokens(provider, code, redirectUri, codeVerifier, normalizedState)
      );

      // Normalize: if name is missing, use email or displayName as fallback so accounts
      // always show a real label (e.g. user@gmail.com) instead of "Account #abc123"
      if (!tokenData.name && (tokenData.email || tokenData.displayName)) {
        tokenData.name = tokenData.email || tokenData.displayName;
      }

      // Upsert: update existing connection if same provider+email, else create new
      const expiresAt = tokenData.expiresIn
        ? new Date(Date.now() + tokenData.expiresIn * 1000).toISOString()
        : null;

      let connection: any;
      if (tokenData.email) {
        const existing = await getProviderConnections({ provider });
        const match = existing.find((c: any) => {
          // safeEqual: constant-time comparison to prevent timing attacks (CWE-208, finding #258-6/7)
          if (!safeEqual(c.email, tokenData.email) || c.authType !== "oauth") return false;
          // For Codex, also check workspaceId to avoid overwriting different workspace connections
          if (provider === "codex" && tokenData.providerSpecificData?.workspaceId) {
            const existingWorkspace = c.providerSpecificData?.workspaceId;
            return safeEqual(existingWorkspace, tokenData.providerSpecificData.workspaceId);
          }
          return true;
        });
        const matchId = typeof match?.id === "string" ? match.id : null;
        if (matchId) {
          connection = await updateProviderConnection(matchId, {
            ...tokenData,
            expiresAt,
            testStatus: "active",
            isActive: true,
          });
        }
      }
      if (!connection) {
        connection = await createProviderConnection({
          provider,
          authType: "oauth",
          ...tokenData,
          expiresAt,
          testStatus: "active",
        });
      }

      // Auto sync to Cloud if enabled
      await syncToCloudIfEnabled();

      return NextResponse.json({
        success: true,
        connection: {
          id: connection.id,
          provider: connection.provider,
          email: connection.email,
          displayName: connection.displayName,
        },
      });
    }

    if (action === "poll") {
      const { deviceCode, codeVerifier, extraData } = body;

      // Resolve proxy for this provider (provider-level → global → direct)
      const proxy = await resolveProxyForProvider(provider);

      // Poll for token (through proxy if configured)
      let result;
      if (provider === "github" || provider === "kimi-coding" || provider === "kilocode") {
        // For providers that don't use PKCE (GitHub, Kimi Coding, KiloCode), don't pass codeVerifier
        result = await runWithProxyContext(proxy, () =>
          (pollForToken as any)(provider, deviceCode)
        );
      } else if (provider === "kiro" || provider === "amazon-q") {
        // Kiro needs extraData (clientId, clientSecret) from device code response
        result = await runWithProxyContext(proxy, () =>
          (pollForToken as any)(provider, deviceCode, null, extraData)
        );
      } else {
        // Qwen and other providers use PKCE
        if (!codeVerifier) {
          return NextResponse.json({ error: "Missing code verifier" }, { status: 400 });
        }
        result = await runWithProxyContext(proxy, () =>
          (pollForToken as any)(provider, deviceCode, codeVerifier)
        );
      }

      if (result.success) {
        // Normalize: if name is missing, use email as fallback display label
        if (!result.tokens.name && (result.tokens.email || result.tokens.displayName)) {
          result.tokens.name = result.tokens.email || result.tokens.displayName;
        }

        // Upsert: update existing connection if same provider+email, else create new
        const expiresAt = result.tokens.expiresIn
          ? new Date(Date.now() + result.tokens.expiresIn * 1000).toISOString()
          : null;

        let connection: any;
        if (result.tokens.email) {
          const existing = await getProviderConnections({ provider });
          const match = existing.find((c: any) => {
            // safeEqual: constant-time comparison to prevent timing attacks (CWE-208, finding #258-8/9)
            if (!safeEqual(c.email, result.tokens.email) || c.authType !== "oauth") return false;
            // For Codex, also check workspaceId to avoid overwriting different workspace connections
            if (provider === "codex" && result.tokens.providerSpecificData?.workspaceId) {
              const existingWorkspace = c.providerSpecificData?.workspaceId;
              return safeEqual(existingWorkspace, result.tokens.providerSpecificData.workspaceId);
            }
            return true;
          });
          const matchId = typeof match?.id === "string" ? match.id : null;
          if (matchId) {
            connection = await updateProviderConnection(matchId, {
              ...result.tokens,
              expiresAt,
              testStatus: "active",
              isActive: true,
            });
          }
        }
        if (!connection) {
          connection = await createProviderConnection({
            provider,
            authType: "oauth",
            ...result.tokens,
            expiresAt,
            testStatus: "active",
          });
        }

        // Auto sync to Cloud if enabled
        await syncToCloudIfEnabled();

        return NextResponse.json({
          success: true,
          connection: {
            id: connection.id,
            provider: connection.provider,
          },
        });
      }

      // Still pending or error - don't create connection for pending states
      const isPending =
        result.pending || result.error === "authorization_pending" || result.error === "slow_down";

      return NextResponse.json({
        success: false,
        error: result.error,
        errorDescription: result.errorDescription,
        pending: isPending,
      });
    }

    if (action === "poll-callback") {
      // Poll for Codex callback server result
      if (provider !== "codex") {
        return NextResponse.json(
          { error: "poll-callback only supported for codex" },
          { status: 400 }
        );
      }

      if (!globalThis.__codexCallbackState) {
        return NextResponse.json({
          success: false,
          error: "no_server",
          errorDescription: "Callback server not running",
        });
      }

      if (!globalThis.__codexCallbackState.callbackParams) {
        return NextResponse.json({ success: false, pending: true });
      }

      // Callback received! Extract code and exchange for tokens
      const params = globalThis.__codexCallbackState.callbackParams;
      const { redirectUri, codeVerifier, close } = globalThis.__codexCallbackState;

      // Clean up server
      try {
        close();
      } catch (e) {
        /* ignore */
      }
      globalThis.__codexCallbackState = null;

      if (params.error) {
        return NextResponse.json({
          success: false,
          error: params.error,
          errorDescription: params.error_description,
        });
      }

      if (!params.code) {
        return NextResponse.json({
          success: false,
          error: "no_code",
          errorDescription: "No authorization code received",
        });
      }

      try {
        // Resolve proxy for this provider
        const proxy = await resolveProxyForProvider(provider);

        // Exchange code for tokens (through proxy if configured)
        const tokenData = await runWithProxyContext(proxy, () =>
          exchangeTokens(provider, params.code, redirectUri, codeVerifier, params.state)
        );

        // Normalize: if name is missing, use email as fallback display label
        if (!tokenData.name && (tokenData.email || tokenData.displayName)) {
          tokenData.name = tokenData.email || tokenData.displayName;
        }

        // Upsert: update existing connection if same provider+email, else create new
        const expiresAt = tokenData.expiresIn
          ? new Date(Date.now() + tokenData.expiresIn * 1000).toISOString()
          : null;

        let connection: any;
        if (tokenData.email) {
          const existing = await getProviderConnections({ provider });
          const match = existing.find((c: any) => {
            // safeEqual: constant-time comparison to prevent timing attacks (CWE-208, finding #258-6/7)
            if (!safeEqual(c.email, tokenData.email) || c.authType !== "oauth") return false;
            // For Codex, also check workspaceId to avoid overwriting different workspace connections
            if (provider === "codex" && tokenData.providerSpecificData?.workspaceId) {
              const existingWorkspace = c.providerSpecificData?.workspaceId;
              return safeEqual(existingWorkspace, tokenData.providerSpecificData.workspaceId);
            }
            return true;
          });
          const matchId = typeof match?.id === "string" ? match.id : null;
          if (matchId) {
            connection = await updateProviderConnection(matchId, {
              ...tokenData,
              expiresAt,
              testStatus: "active",
              isActive: true,
            });
          }
        }
        if (!connection) {
          connection = await createProviderConnection({
            provider,
            authType: "oauth",
            ...tokenData,
            expiresAt,
            testStatus: "active",
          });
        }

        await syncToCloudIfEnabled();

        return NextResponse.json({
          success: true,
          connection: {
            id: connection.id,
            provider: connection.provider,
            email: connection.email,
            displayName: connection.displayName,
          },
        });
      } catch (exchangeErr: any) {
        return NextResponse.json({ success: false, error: exchangeErr.message }, { status: 500 });
      }
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.log("OAuth POST error:", error);
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
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
    console.log("Error syncing to cloud after OAuth:", error);
  }
}
