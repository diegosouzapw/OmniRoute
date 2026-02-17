import { NextResponse } from "next/server";
import {
  getProvider,
  generateAuthData,
  exchangeTokens,
  requestDeviceCode,
  pollForToken,
} from "@/lib/oauth/providers";
import { createProviderConnection, isCloudEnabled } from "@/models";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { startLocalServer } from "@/lib/oauth/utils/server";

// Use globalThis to persist callback server state across Next.js HMR reloads
if (!globalThis.__codexCallbackState) {
  globalThis.__codexCallbackState = null;
}

/**
 * Dynamic OAuth API Route
 * Handles: authorize, exchange, device-code, poll, start-callback-server, poll-callback
 */

// GET /api/oauth/[provider]/authorize - Generate auth URL
// GET /api/oauth/[provider]/device-code - Request device code (for device_code flow)
export async function GET(request: Request, { params }: { params: Promise<{ provider: string; action: string }> }) {
  try {
    const { provider, action } = await params;
    const { searchParams } = new URL(request.url);

    if (action === "authorize") {
      const redirectUri = searchParams.get("redirect_uri") || "http://localhost:8080/callback";
      const authData = generateAuthData(provider, redirectUri);
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

      // For providers that don't use PKCE (like GitHub), don't pass codeChallenge
      let deviceData;
      if (provider === "github" || provider === "kiro" || provider === "kilocode") {
        // GitHub, Kiro, and KiloCode don't use PKCE for device code
        deviceData = await (requestDeviceCode as any)(provider);
      } else {
        // Qwen and other providers use PKCE
        deviceData = await requestDeviceCode(provider, authData.codeChallenge);
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
export async function POST(request: Request, { params }: { params: Promise<{ provider: string; action: string }> }) {
  try {
    const { provider, action } = await params;
    const body = await request.json();

    if (action === "exchange") {
      const { code, redirectUri, codeVerifier, state } = body;

      if (!code || !redirectUri || !codeVerifier) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      // Exchange code for tokens
      const tokenData = await exchangeTokens(provider, code, redirectUri, codeVerifier, state);

      // Save to database
      const connection: any = await createProviderConnection({
        provider,
        authType: "oauth",
        ...tokenData,
        expiresAt: tokenData.expiresIn
          ? new Date(Date.now() + tokenData.expiresIn * 1000).toISOString()
          : null,
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
          displayName: connection.displayName,
        },
      });
    }

    if (action === "poll") {
      const { deviceCode, codeVerifier, extraData } = body;

      if (!deviceCode) {
        return NextResponse.json({ error: "Missing device code" }, { status: 400 });
      }

      // For providers that don't use PKCE (like GitHub, Kiro, Kimi Coding), don't pass codeVerifier
      let result;
      if (provider === "github" || provider === "kimi-coding" || provider === "kilocode") {
        result = await (pollForToken as any)(provider, deviceCode);
      } else if (provider === "kiro") {
        // Kiro needs extraData (clientId, clientSecret) from device code response
        result = await (pollForToken as any)(provider, deviceCode, null, extraData);
      } else {
        // Qwen and other providers use PKCE
        if (!codeVerifier) {
          return NextResponse.json({ error: "Missing code verifier" }, { status: 400 });
        }
        result = await (pollForToken as any)(provider, deviceCode, codeVerifier);
      }

      if (result.success) {
        // Save to database
        const connection: any = await createProviderConnection({
          provider,
          authType: "oauth",
          ...result.tokens,
          expiresAt: result.tokens.expiresIn
            ? new Date(Date.now() + result.tokens.expiresIn * 1000).toISOString()
            : null,
          testStatus: "active",
        });

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
        // Exchange code for tokens
        const tokenData = await exchangeTokens(
          provider,
          params.code,
          redirectUri,
          codeVerifier,
          params.state
        );

        // Save to database
        const connection: any = await createProviderConnection({
          provider,
          authType: "oauth",
          ...tokenData,
          expiresAt: tokenData.expiresIn
            ? new Date(Date.now() + tokenData.expiresIn * 1000).toISOString()
            : null,
          testStatus: "active",
        });

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
