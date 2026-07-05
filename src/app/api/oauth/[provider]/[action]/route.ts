import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import {
  getProvider,
  generateAuthData,
  exchangeTokens,
  finalizeTokens,
  requestDeviceCode,
  pollForToken,
  resolveBrowserOAuthRedirectUri,
} from "@/lib/oauth/providers";
import {
  persistOAuthConnection,
  buildOAuthConnectionCreatePayload,
} from "@/lib/oauth/connectionPersistence";
import { createDeviceFlowTicket, getDeviceFlowTicketStatus } from "@/lib/oauth/deviceFlowTickets";
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
import { runWithProxyContextOrDirect } from "@omniroute/open-sse/utils/proxyFetch.ts";
import {
  jsonObjectSchema,
  oauthDeviceCompleteSchema,
  oauthExchangeSchema,
  oauthImportTokenSchema,
  oauthPollSchema,
} from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

// Use globalThis to persist callback server state across Next.js HMR reloads
if (!globalThis.__codexCallbackState) {
  globalThis.__codexCallbackState = null;
}
// Windsurf / Devin CLI PKCE callback server state (separate from Codex)
if (!globalThis.__windsurfCallbackState) {
  globalThis.__windsurfCallbackState = null;
}

/** Providers that use the PKCE browser callback flow (like Codex). */
const PKCE_CALLBACK_PROVIDERS = new Set(["codex"]);

/**
 * Providers whose device flow runs in the user's browser (auth.openai.com blocks
 * datacenter IPs but allows CORS), so the server never polls — it only persists
 * the final tokens via the `device-complete` action. See src/lib/oauth/codexDeviceFlow.ts.
 */
const BROWSER_DEVICE_FLOW_PROVIDERS = new Set(["codex"]);

/**
 * Providers whose PKCE flow has been retired but whose import-token path is
 * still active. Returning 410 Gone on `authorize` / `start-callback-server` /
 * `poll-callback` (instead of 400) tells callers the action is permanently
 * gone and points them at /import-token. windsurf/devin-cli were retired
 * 2026-05-29 because app.devin.ai/editor/signin returned 404 post-rebrand.
 * Phase 2 will reintroduce browser login via Firebase OAuth + RegisterUser.
 */
const RETIRED_PKCE_PROVIDERS = new Set(["windsurf", "devin-cli"]);

/** Providers that allow direct import of a raw API token (no OAuth exchange). */
const IMPORT_TOKEN_PROVIDERS = new Set(["windsurf", "devin-cli", "grok-cli"]);

/**
 * Providers that have NO browser OAuth flow at all — their credentials are read
 * from the OS keychain via a dedicated Import button, not an OAuth
 * authorize/exchange. They are listed in the OAuth provider *catalog*
 * (so the dashboard shows them) but have no entry in the OAuth provider
 * *handler* registry, so hitting the generic OAuth route for them threw an
 * unhandled `Unknown provider: <id>` 500 (#6041). Return a clear, actionable
 * response pointing at the Import flow instead.
 */
const KEYCHAIN_IMPORT_ONLY_PROVIDERS = new Set(["zed"]);

/** GET/POST OAuth actions that don't apply to keychain-import-only providers. */
const OAUTH_FLOW_ACTIONS = new Set([
  "authorize",
  "device-code",
  "start-callback-server",
  "poll-callback",
  "exchange",
  "poll",
  "device-complete",
]);

function keychainImportOnlyResponse(provider: string) {
  return NextResponse.json(
    {
      error:
        `${provider} has no browser OAuth flow — it imports LLM credentials from the ` +
        `OS keychain. Use the "Import" button on the ${provider} provider card in the ` +
        `dashboard to discover and import them automatically.`,
    },
    { status: 400 }
  );
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
 * Resolve the externally reachable base URL for public share links. Prefers the
 * configured public base URL; otherwise derives it from forwarded headers so the
 * link points at the host the operator actually serves (not an internal origin).
 */
function resolvePublicBaseUrl(request: Request): string {
  const env = process.env.NEXT_PUBLIC_BASE_URL || process.env.OMNIROUTE_PUBLIC_BASE_URL;
  if (env && env.trim()) return env.trim().replace(/\/+$/, "");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || "https";
  if (host) return `${proto}://${host}`;
  return new URL(request.url).origin;
}

async function requireOAuthRouteAuth(request: Request) {
  if (!(await isAuthRequired(request))) return null;
  if (await isAuthenticated(request)) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
  // Phase 1 hotfix (2026-05-29): retired PKCE flows return 410 Gone BEFORE auth.
  // The action permanently does not exist for these providers regardless of who
  // is asking — answering 401 first would mislead callers into thinking the
  // route is gated rather than gone. See spec
  // _tasks/superpowers/specs/2026-05-29-windsurf-login-fix-design.md.
  try {
    const earlyParams = await params;
    if (
      RETIRED_PKCE_PROVIDERS.has(earlyParams.provider) &&
      (earlyParams.action === "authorize" ||
        earlyParams.action === "start-callback-server" ||
        earlyParams.action === "poll-callback")
    ) {
      return NextResponse.json(
        {
          error:
            `Browser OAuth disabled for ${earlyParams.provider} — use import-token via ` +
            `/api/oauth/${earlyParams.provider}/import-token. ` +
            `In the Windsurf/VS Code IDE, run the "Windsurf: Provide Auth Token" command ` +
            `(or click the Jupyter "Get Windsurf Authentication Token" button), then copy+paste the shown token. ` +
            `Opening https://windsurf.com/show-auth-token directly only shows a "Redirecting" page — the IDE must initiate the ?state=... flow.`,
        },
        { status: 410 }
      );
    }
    // Keychain-import-only providers (e.g. zed) have no OAuth flow — return a
    // clear 400 pointing at the Import button instead of a 500 (#6041).
    if (
      KEYCHAIN_IMPORT_ONLY_PROVIDERS.has(earlyParams.provider) &&
      OAUTH_FLOW_ACTIONS.has(earlyParams.action)
    ) {
      return keychainImportOnlyResponse(earlyParams.provider);
    }
  } catch {
    /* fall through to normal handling */
  }

  const authResponse = await requireOAuthRouteAuth(request);
  if (authResponse) return authResponse;

  try {
    const { provider, action } = await params;
    const { searchParams } = new URL(request.url);

    if (action === "authorize") {
      const requestedRedirectUri =
        searchParams.get("redirect_uri") || "http://localhost:8080/callback";
      const redirectUri = resolveBrowserOAuthRedirectUri(provider, requestedRedirectUri);
      const authData = generateAuthData(provider, redirectUri);
      if (provider === "qoder" && !authData.authUrl) {
        return NextResponse.json({
          ...authData,
          supported: false,
          error:
            "Qoder browser OAuth is experimental and disabled by default. Configure QODER_OAUTH_* environment variables or use a Personal Access Token.",
        });
      }
      // #3861: GitLab Duo needs a self-registered OAuth app. Without a client_id,
      // buildAuthUrl returns null — surface a clear setup message instead of a 500.
      if (provider === "gitlab-duo" && !authData.authUrl) {
        return NextResponse.json({
          ...authData,
          supported: false,
          error:
            "GitLab Duo OAuth is not configured. Register an OAuth application at " +
            "https://gitlab.com/-/profile/applications with redirect URI " +
            'http://localhost:20128/callback and scopes "ai_features read_user", then set ' +
            "GITLAB_DUO_OAUTH_CLIENT_ID (and optionally GITLAB_DUO_OAUTH_CLIENT_SECRET) and restart.",
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
      const startUrl = searchParams.get("startUrl");
      const region = searchParams.get("region") || "us-east-1";

      // Resolve proxy for this provider (provider-level → global → direct)
      const proxy = await resolveProxyForProvider(provider);

      // Request device code (through proxy if configured)
      let deviceData;
      if (
        provider === "github" ||
        provider === "kiro" ||
        provider === "amazon-q" ||
        provider === "kimi-coding" ||
        provider === "kilocode" ||
        provider === "codebuddy-cn"
      ) {
        // GitHub, Kiro/Amazon Q, Kimi Coding, and KiloCode don't use PKCE for device code
        if ((provider === "kiro" || provider === "amazon-q") && startUrl) {
          const providerOverrideConfig = {
            ...providerData.config,
            startUrl,
            region,
            skipIssuerUrlForRegistration: true,
            registerClientUrl: `https://oidc.${region}.amazonaws.com/client/register`,
            deviceAuthUrl: `https://oidc.${region}.amazonaws.com/device_authorization`,
            tokenUrl: `https://oidc.${region}.amazonaws.com/token`,
            ssoOidcEndpoint: `https://oidc.${region}.amazonaws.com`,
          };

          deviceData = await runWithProxyContextOrDirect(proxy, () =>
            (requestDeviceCode as any)(provider, null, providerOverrideConfig)
          );
        } else {
          deviceData = await runWithProxyContextOrDirect(proxy, () =>
            (requestDeviceCode as any)(provider)
          );
        }
      } else {
        // Qwen and other providers use PKCE
        deviceData = await runWithProxyContextOrDirect(proxy, () =>
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

    if (action === "public-link-status") {
      // Dashboard polls this (authenticated) to learn when the external visitor
      // finished the device flow, so it can notify + refresh the connections.
      const token = searchParams.get("token");
      if (!token) {
        return NextResponse.json({ error: "Missing token" }, { status: 400 });
      }
      const { status, result } = getDeviceFlowTicketStatus(token);
      return NextResponse.json({ status, connection: result });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("OAuth GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * Start PKCE callback server for Codex, Windsurf, or Devin CLI.
 * Codex uses fixed port 1455; Windsurf/Devin CLI use a random free port (port 0).
 * Returns the auth URL and stores codeVerifier for later exchange.
 */
async function handleStartCallbackServer(provider: string, searchParams: URLSearchParams) {
  if (!PKCE_CALLBACK_PROVIDERS.has(provider)) {
    return NextResponse.json(
      { error: `Callback server not supported for provider: ${provider}` },
      { status: 400 }
    );
  }

  const isWindsurf = provider === "windsurf" || provider === "devin-cli";
  const stateKey = isWindsurf ? "__windsurfCallbackState" : "__codexCallbackState";

  // Clean up existing server if any
  if (globalThis[stateKey]?.close) {
    try {
      globalThis[stateKey].close();
    } catch (e) {
      /* ignore */
    }
  }
  globalThis[stateKey] = null;

  try {
    // Codex: fixed port 1455. Windsurf/Devin CLI: OS-assigned random port (0)
    const serverPort = isWindsurf ? 0 : 1455;
    const { port, close } = await startLocalServer((params) => {
      if (globalThis[stateKey]) {
        globalThis[stateKey].callbackParams = params;
      }
    }, serverPort);

    const redirectUri = `http://localhost:${port}/auth/callback`;
    const authData = generateAuthData(provider, redirectUri);

    globalThis[stateKey] = {
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
      if (globalThis[stateKey]?.startedAt === startedAt) {
        try {
          close();
        } catch (e) {
          /* ignore */
        }
        globalThis[stateKey] = null;
      }
    }, 300000);

    return NextResponse.json({
      authUrl: authData.authUrl,
      codeVerifier: authData.codeVerifier,
      redirectUri,
      serverPort: port,
    });
  } catch (error) {
    console.error("OAuth start-callback-server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/oauth/[provider]/exchange - Exchange code for tokens and save
// POST /api/oauth/[provider]/poll - Poll for token (device_code flow)
export async function POST(
  request: Request,
  { params }: { params: Promise<{ provider: string; action: string }> }
) {
  // Phase 1 hotfix (2026-05-29): retired PKCE flows return 410 Gone BEFORE auth.
  // See GET handler comment.
  try {
    const earlyParams = await params;
    if (
      RETIRED_PKCE_PROVIDERS.has(earlyParams.provider) &&
      earlyParams.action === "poll-callback"
    ) {
      return NextResponse.json(
        {
          error:
            `Browser OAuth disabled for ${earlyParams.provider} — use import-token via ` +
            `/api/oauth/${earlyParams.provider}/import-token. ` +
            `In the Windsurf/VS Code IDE, run the "Windsurf: Provide Auth Token" command ` +
            `(or click the Jupyter "Get Windsurf Authentication Token" button), then copy+paste the shown token. ` +
            `Opening https://windsurf.com/show-auth-token directly only shows a "Redirecting" page — the IDE must initiate the ?state=... flow.`,
        },
        { status: 410 }
      );
    }
    // Keychain-import-only providers (e.g. zed) have no OAuth flow (#6041).
    if (
      KEYCHAIN_IMPORT_ONLY_PROVIDERS.has(earlyParams.provider) &&
      OAUTH_FLOW_ACTIONS.has(earlyParams.action)
    ) {
      return keychainImportOnlyResponse(earlyParams.provider);
    }
  } catch {
    /* fall through to normal handling */
  }

  const authResponse = await requireOAuthRouteAuth(request);
  if (authResponse) return authResponse;

  try {
    const { provider, action } = await params;

    // Phase 1 hotfix (2026-05-29): retired PKCE flows return 410 Gone before
    // body parsing. windsurf/devin-cli `poll-callback` is permanently retired
    // because the upstream PKCE endpoint returns 404. Use /import-token
    // (handled later in this same handler) for those providers instead.
    if (RETIRED_PKCE_PROVIDERS.has(provider) && action === "poll-callback") {
      return NextResponse.json(
        {
          error:
            `Browser OAuth disabled for ${provider} — use import-token via ` +
            `/api/oauth/${provider}/import-token. ` +
            `In the Windsurf/VS Code IDE, run the "Windsurf: Provide Auth Token" command ` +
            `(or click the Jupyter "Get Windsurf Authentication Token" button), then copy+paste the shown token. ` +
            `Opening https://windsurf.com/show-auth-token directly only shows a "Redirecting" page — the IDE must initiate the ?state=... flow.`,
        },
        { status: 410 }
      );
    }

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
    } else if (action === "import-token") {
      const validation = validateBody(oauthImportTokenSchema, rawBody);
      if (isValidationFailure(validation)) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
      }
      body = validation.data;
    } else if (action === "device-complete") {
      const validation = validateBody(oauthDeviceCompleteSchema, rawBody);
      if (isValidationFailure(validation)) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
      }
      body = validation.data;
    }

    if (action === "exchange") {
      const { code, redirectUri, connectionId, codeVerifier, state } = body;
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
      const tokenData = await runWithProxyContextOrDirect(proxy, () =>
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
          if (c.id && safeEqual(connectionId, c.id)) return true;
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
        connection = await createProviderConnection(
          buildOAuthConnectionCreatePayload(provider, tokenData, expiresAt)
        );
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
      const { deviceCode, connectionId, codeVerifier, extraData } = body;

      // Resolve proxy for this provider (provider-level → global → direct)
      const proxy = await resolveProxyForProvider(provider);

      // Poll for token (through proxy if configured)
      let result;
      if (
        provider === "github" ||
        provider === "kimi-coding" ||
        provider === "kilocode" ||
        provider === "codebuddy-cn"
      ) {
        // For providers that don't use PKCE (GitHub, Kimi Coding, KiloCode), don't pass codeVerifier
        result = await runWithProxyContextOrDirect(proxy, () =>
          (pollForToken as any)(provider, deviceCode)
        );
      } else if (provider === "kiro" || provider === "amazon-q") {
        // Kiro needs extraData (clientId, clientSecret) from device code response
        result = await runWithProxyContextOrDirect(proxy, () =>
          (pollForToken as any)(provider, deviceCode, null, extraData)
        );
      } else {
        // Qwen and other providers use PKCE
        if (!codeVerifier) {
          return NextResponse.json({ error: "Missing code verifier" }, { status: 400 });
        }
        result = await runWithProxyContextOrDirect(proxy, () =>
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
            if (c.id && safeEqual(connectionId, c.id)) return true;
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
          connection = await createProviderConnection(
            buildOAuthConnectionCreatePayload(provider, result.tokens, expiresAt)
          );
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
      const { connectionId } = body;

      // poll-callback is supported for all PKCE callback providers
      if (!PKCE_CALLBACK_PROVIDERS.has(provider)) {
        return NextResponse.json(
          {
            error: `poll-callback only supported for PKCE callback providers: ${[...PKCE_CALLBACK_PROVIDERS].join(", ")}`,
          },
          { status: 400 }
        );
      }

      // Windsurf and Devin CLI share __windsurfCallbackState; Codex uses its own slot
      const stateKey = provider === "codex" ? "__codexCallbackState" : "__windsurfCallbackState";

      if (!globalThis[stateKey]) {
        return NextResponse.json({
          success: false,
          error: "no_server",
          errorDescription: "Callback server not running",
        });
      }

      if (!globalThis[stateKey].callbackParams) {
        return NextResponse.json({ success: false, pending: true });
      }

      // Callback received! Extract code and exchange for tokens
      const params = globalThis[stateKey].callbackParams;
      const { redirectUri, codeVerifier, close } = globalThis[stateKey];

      // Clean up server
      try {
        close();
      } catch (e) {
        /* ignore */
      }
      globalThis[stateKey] = null;

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
        const tokenData = await runWithProxyContextOrDirect(proxy, () =>
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
            if (c.id && safeEqual(connectionId, c.id)) return true;
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
          connection = await createProviderConnection(
            buildOAuthConnectionCreatePayload(provider, tokenData, expiresAt)
          );
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
        console.error("OAuth exchange error:", exchangeErr);
        return NextResponse.json(
          { success: false, error: "Internal server error" },
          { status: 500 }
        );
      }
    }

    if (action === "import-token") {
      const { token, connectionId } = body;

      if (!IMPORT_TOKEN_PROVIDERS.has(provider)) {
        return NextResponse.json(
          {
            error: `import-token not supported for provider: ${provider}. Supported: ${[...IMPORT_TOKEN_PROVIDERS].join(", ")}`,
          },
          { status: 400 }
        );
      }

      try {
        // Map the raw token via the provider's mapTokens() — skips the HTTP exchange entirely.
        const providerData = getProvider(provider);
        const tokenData = providerData.mapTokens({ accessToken: token });

        // Normalize: if name is missing, use email as fallback display label
        if (!tokenData.name && (tokenData.email || tokenData.displayName)) {
          tokenData.name = tokenData.email || tokenData.displayName;
        }

        const expiresAt = tokenData.expiresIn
          ? new Date(Date.now() + tokenData.expiresIn * 1000).toISOString()
          : null;

        let connection: any;
        if (tokenData.email) {
          const existing = await getProviderConnections({ provider });
          const match = existing.find((c: any) => {
            if (c.id && safeEqual(connectionId, c.id)) return true;
            if (!safeEqual(c.email, tokenData.email) || c.authType !== "oauth") return false;
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
          connection = await createProviderConnection(
            buildOAuthConnectionCreatePayload(provider, tokenData, expiresAt)
          );
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
      } catch (importErr: any) {
        return NextResponse.json(
          { success: false, error: sanitizeErrorMessage(importErr.message) || "Import failed" },
          { status: 500 }
        );
      }
    }

    if (action === "public-link") {
      // Generate a single-use, short-lived public link so a third party can
      // complete the Codex device flow in their own browser (see Fase 6).
      if (!BROWSER_DEVICE_FLOW_PROVIDERS.has(provider)) {
        return NextResponse.json(
          {
            error: `public-link not supported for provider: ${provider}. Supported: ${[...BROWSER_DEVICE_FLOW_PROVIDERS].join(", ")}`,
          },
          { status: 400 }
        );
      }

      const connectionId =
        rawBody && typeof rawBody.connectionId === "string" ? rawBody.connectionId : undefined;
      const { token, expiresAt } = createDeviceFlowTicket(provider, connectionId);

      return NextResponse.json({
        url: `${resolvePublicBaseUrl(request)}/connect/codex/${token}`,
        token,
        expiresAt: new Date(expiresAt).toISOString(),
      });
    }

    if (action === "device-complete") {
      // The browser-driven Codex device flow already performed the device
      // authorization + token exchange against auth.openai.com (the server's
      // datacenter IP is blocked by Cloudflare, so it cannot). Here we only map
      // the final tokens and persist the connection — no HTTP exchange/poll.
      if (!BROWSER_DEVICE_FLOW_PROVIDERS.has(provider)) {
        return NextResponse.json(
          {
            error: `device-complete not supported for provider: ${provider}. Supported: ${[...BROWSER_DEVICE_FLOW_PROVIDERS].join(", ")}`,
          },
          { status: 400 }
        );
      }

      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        id_token: idToken,
        expires_in: expiresIn,
        connectionId,
      } = body;

      let tokenData: any;
      try {
        tokenData = await finalizeTokens(provider, {
          access_token: accessToken,
          refresh_token: refreshToken,
          id_token: idToken,
          expires_in: expiresIn,
        });
      } catch (finalizeErr: any) {
        return NextResponse.json(
          {
            success: false,
            error: sanitizeErrorMessage(finalizeErr?.message) || "Failed to finalize tokens",
          },
          { status: 500 }
        );
      }

      const connection = await persistOAuthConnection(provider, tokenData, connectionId);

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

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("OAuth POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
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
