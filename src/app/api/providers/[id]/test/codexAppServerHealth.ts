/**
 * Build the structured diagnosis object the connection-test route returns.
 * Lives here (rather than inline in test/route.ts) so both the route and the
 * codex-app-server health probe share one definition. Pure.
 */
export function makeDiagnosis(
  type: string,
  source: string,
  message: string | null,
  code: string | null = null
) {
  return {
    type,
    source,
    message: message || null,
    code: code ?? null,
  };
}

export type CodexAppServerHealth = {
  valid: boolean;
  error?: string;
  diagnosis: unknown;
  refreshed: boolean;
};

/**
 * A codex "app-server" connection (providerSpecificData.codexTransport ===
 * "app-server") does NOT carry a validatable OpenAI token: it drives the codex
 * CLI's own `codex app-server` process over JSON-RPC/WebSocket, and THAT process
 * self-manages its OpenAI OAuth (its own ~/.codex/auth.json), exactly like an
 * interactive codex session. So the ordinary OAuth token probe is meaningless for
 * these connections — it validates a placeholder and reports a false "Token
 * invalid or revoked" 401 (which then trips the rate-limit cooldown on retest).
 *
 * The correct health signal for this transport is whether the app-server itself
 * is reachable and ready. The app-server exposes an unauthenticated liveness
 * endpoint at <httpBase>/readyz (200 = ready) alongside its ws:// listener, so we
 * derive the http(s) origin from the configured ws(s):// URL and probe /readyz.
 * Returns null when this connection is NOT an app-server connection (so the caller
 * falls through to the normal token validation).
 */
export async function testCodexAppServerConnection(
  connection: any
): Promise<CodexAppServerHealth | null> {
  const psd = (connection?.providerSpecificData as Record<string, unknown> | undefined) || undefined;
  // Fire the /readyz probe when EITHER (a) the connection opted into the
  // app-server transport via the per-connection flag (a `codex` provider
  // connection with codexTransport==="app-server"), OR (b) this is the
  // first-class `codex-app-server` provider, which is app-server by definition
  // and needs no flag. Otherwise return null so the caller falls through to the
  // normal OAuth/apikey token validation.
  const isAppServerProvider = connection?.provider === "codex-app-server";
  const isAppServerFlag = psd?.codexTransport === "app-server";
  if (!isAppServerProvider && !isAppServerFlag) return null;

  // Dynamic import (not a static top-level import) so this executor-config module
  // stays behind the open-sse boundary the no-restricted-imports lint rule enforces.
  const { resolveAppServerConfig } = await import(
    "@omniroute/open-sse/executors/codex/appServerConfig.ts"
  );
  const config = resolveAppServerConfig(psd);
  if (!config) {
    // Also reached when the credential/URL binding refused (env token + remote
    // psd URL) — the resolve deliberately returns null there so the token can
    // never leave the operator's network (see appServerConfig.ts).
    const error =
      "Codex app-server transport is not configured (missing url/token, or the env-token/remote-URL binding was refused)";
    return {
      valid: false,
      error,
      refreshed: false,
      diagnosis: makeDiagnosis("validation_error", "local", error, "app_server_unconfigured"),
    };
  }

  // ws://host:port → http://host:port/readyz ; wss:// → https://.
  const httpBase = config.url.replace(/^ws(s?):\/\//i, (_m, s) => `http${s}://`).replace(/\/+$/, "");
  const readyzUrl = `${httpBase}/readyz`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(readyzUrl, {
      method: "GET",
      headers: { Authorization: `Bearer ${config.token}` },
      signal: controller.signal,
      // Never follow redirects carrying the bearer token (SSRF hardening after
      // the #11205 security review): a 30x to an outside host would exfiltrate
      // the capability token. A redirect response is simply "not ready".
      redirect: "manual",
    });
    if (res.status !== 200) {
      const error = `Codex app-server not ready (${readyzUrl} → HTTP ${res.status})`;
      return {
        valid: false,
        error,
        refreshed: false,
        diagnosis: makeDiagnosis("provider_error", "app_server", error, "app_server_not_ready"),
      };
    }
    // The server PROCESS is up. Now confirm its Codex CLI is actually SIGNED IN —
    // /readyz alone would show green for a logged-out CLI, which then fails on the
    // first real turn. Probe account/read over the JSON-RPC WebSocket.
    let authStatus;
    try {
      const [{ probeCodexAppServerAuth }, { getCodexAppServerWebsocketTransport }] =
        await Promise.all([
          import("@omniroute/open-sse/executors/codex/appServerAuthProbe.ts"),
          import("@omniroute/open-sse/executors/codex.ts"),
        ]);
      authStatus = await probeCodexAppServerAuth(config, getCodexAppServerWebsocketTransport(), 8000);
    } catch (probeErr: any) {
      // If the auth probe itself fails to load/run, don't fail the whole health
      // check — the server IS reachable. Treat as unknown-but-reachable (valid).
      authStatus = { state: "unknown", reason: probeErr?.message ?? "auth probe failed" } as const;
    }

    if (authStatus.state === "logged_out") {
      const error =
        "Codex app-server is running but its Codex CLI is not signed in. Use \u201cSign in with ChatGPT\u201d to authenticate.";
      return {
        valid: false,
        error,
        refreshed: false,
        diagnosis: makeDiagnosis("auth_required", "app_server", error, "app_server_login_required"),
      };
    }
    // "authenticated" → healthy; "unknown" (probe unavailable/timed out) → treat
    // the reachable server as healthy rather than blocking on an inconclusive probe.
    return { valid: true, refreshed: false, diagnosis: null };
  } catch (err: any) {
    const reason = err?.name === "AbortError" ? "timed out" : (err?.message ?? "unreachable");
    const error = `Codex app-server unreachable (${readyzUrl}: ${reason})`;
    return {
      valid: false,
      error,
      refreshed: false,
      diagnosis: makeDiagnosis("provider_error", "app_server", error, "app_server_unreachable"),
    };
  } finally {
    clearTimeout(timer);
  }
}
