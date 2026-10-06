/**
 * Layer-2 auth-status probe for the Codex app-server transport.
 *
 * The HTTP `/readyz` endpoint only proves the app-server PROCESS is up — not that
 * its Codex CLI is signed in. A public user whose CLI is not yet authenticated
 * would otherwise see a green "ready" badge and then fail on the first turn with
 * an upstream auth error. This probe opens the same JSON-RPC/WebSocket the
 * executor uses and calls `account/read` (verified against codex 0.149.0): an
 * authenticated server returns `{ account: { type, email, planType }, ... }`;
 * a logged-out server returns no account (or an error). So the presence of
 * `result.account` is the "authenticated" signal.
 *
 * Kept separate from the executor turn path so the health check pulls in only the
 * lightweight client + transport, and so it is independently unit-testable with a
 * fake websocketFn.
 */
import {
  CodexAppServerClient,
  type CodexAppServerWebsocketFn,
} from "./appServerClient.ts";
import type { CodexAppServerConfig } from "./appServerConfig.ts";

export type CodexAppServerAuthStatus =
  | { state: "authenticated"; account: { type?: string; email?: string; planType?: string } }
  | { state: "logged_out"; reason: string }
  | { state: "unknown"; reason: string };

interface AccountReadResult {
  account?: { type?: unknown; email?: unknown; planType?: unknown } | null;
  requiresOpenaiAuth?: unknown;
}

function str(v: unknown): string | undefined {
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

/**
 * Open a short-lived WS to the app-server, initialize, and read the account.
 * Returns an auth status; never throws (maps failures to state "unknown").
 *
 * @param config resolved app-server config (url + capability token).
 * @param websocketFn the wreq-js websocket factory
 *   (getCodexAppServerWebsocketTransport()); when null, returns "unknown".
 * @param timeoutMs overall budget for connect + account/read.
 */
export async function probeCodexAppServerAuth(
  config: CodexAppServerConfig,
  websocketFn: CodexAppServerWebsocketFn | null,
  timeoutMs = 8000
): Promise<CodexAppServerAuthStatus> {
  if (!websocketFn) {
    return { state: "unknown", reason: "websocket transport unavailable" };
  }
  const client = new CodexAppServerClient({ websocketFn, defaultTimeoutMs: timeoutMs });
  const deadline = new Promise<CodexAppServerAuthStatus>((resolve) =>
    setTimeout(() => resolve({ state: "unknown", reason: "auth probe timed out" }), timeoutMs)
  );

  const run = (async (): Promise<CodexAppServerAuthStatus> => {
    try {
      await client.connect(config.url, config.token);
      await client.request(
        "initialize",
        {
          clientInfo: { name: "omniroute-codex-app-server-health", title: null, version: "1.0" },
          capabilities: null,
        },
        timeoutMs
      );
      // account/read: authenticated → { account: {...} }; logged out → no account.
      const result = (await client.request("account/read", {}, timeoutMs)) as AccountReadResult;
      const account = result?.account;
      if (account && typeof account === "object") {
        return {
          state: "authenticated",
          account: {
            type: str(account.type),
            email: str(account.email),
            planType: str(account.planType),
          },
        };
      }
      return {
        state: "logged_out",
        reason: "app-server reachable but its Codex CLI is not signed in",
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      // A JSON-RPC error on account/read (e.g. AuthRequiredError) also means
      // "up but not authenticated" — surface it as logged_out, not unknown, so
      // the dashboard offers "Sign in with ChatGPT" rather than a scary error.
      if (/auth|login|sign|unauthor|401/i.test(message)) {
        return { state: "logged_out", reason: message };
      }
      return { state: "unknown", reason: message };
    } finally {
      client.close();
    }
  })();

  return Promise.race([run, deadline]);
}
